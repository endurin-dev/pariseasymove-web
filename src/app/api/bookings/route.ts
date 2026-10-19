import { NextRequest, NextResponse } from "next/server";
import pool from "@/lib/db";
import { google } from "googleapis";

// 1. Initialize Google Calendar API Client
const calendar = google.calendar("v3");
const auth = new google.auth.JWT({
  email: process.env.GOOGLE_CLIENT_EMAIL,
  key: process.env.GOOGLE_PRIVATE_KEY?.replace(/\\n/g, "\n"), // Fixes newline parsing across host environments
  scopes: ["https://www.googleapis.com/auth/calendar"],
});

// Helper function to map database columns to clean frontend naming conventions
const shape = (r: any) => ({
  id:          r.id,
  fromLocId:   r.from_loc_id,
  toLocId:     r.to_loc_id,
  from:        r.from_loc_name ?? r.from_loc_id,
  to:          r.to_loc_name   ?? r.to_loc_id,
  date:        r.date,
  time:        r.time,
  passengers:  r.passengers,
  kids:        r.kids,
  bags:        r.bags,
  vehicleId:   r.vehicle_id,
  vehicleName: r.vehicle_name ?? r.vehicle_id,
  name:        r.name,
  country:     r.country,
  whatsapp:    r.whatsapp,
  email:       r.email,
  notes:       r.notes,
  status:      r.status,
  createdAt:   r.created_at,
});

const buildCalendarDescription = (
  booking: ReturnType<typeof shape>,
  details: {
    date: string | Date;
    startDateTime: Date;
    endDateTime: Date;
    pickup: string;
    dropoff: string;
    flightOrTrain?: string;
    address?: string;
    totalPrice?: number;
    paymentMethod?: string;
    specialRequests?: string;
  }
) => {
  const dateString = typeof details.date === "string"
    ? details.date.split("T")[0]
    : details.date.toISOString().split("T")[0];
  const dateLabel = new Intl.DateTimeFormat("en-GB", {
    weekday: "long",
    day: "numeric",
    month: "long",
    year: "numeric",
    timeZone: "UTC",
  }).format(new Date(`${dateString}T00:00:00Z`));
  const formatTime = (date: Date) =>
    date.toLocaleTimeString("en-GB", { hour: "2-digit", minute: "2-digit", hourCycle: "h23" });
  const paymentLabel = details.paymentMethod === "cash"
    ? "Cash to driver"
    : details.paymentMethod === "card"
      ? "Card to driver"
      : details.paymentMethod;
  const totalPassengers = Number(booking.passengers ?? 0) + Number(booking.kids ?? 0);

  return [
    "🚘 BOOKING DETAILS",
    "",
    "🗓️ TRIP",
    `Date: ${dateLabel}`,
    `Departure time: ${formatTime(details.startDateTime)}`,
    `Calendar slot: ${formatTime(details.startDateTime)}–${formatTime(details.endDateTime)}`,
    "",
    "📍 ROUTE",
    `Pickup: ${details.pickup}`,
    ...(details.flightOrTrain ? [`Flight / train: ${details.flightOrTrain}`] : []),
    `Drop-off: ${details.dropoff}`,
    ...(details.address ? [`Address: ${details.address}`] : []),
    "",
    "👥 PASSENGERS & LUGGAGE",
    `Adults: ${booking.passengers}`,
    `Children: ${booking.kids}`,
    `Total passengers: ${totalPassengers}`,
    `Luggage bags: ${booking.bags}`,
    `Vehicle: ${booking.vehicleName}`,
    "",
    "💶 PAYMENT",
    ...(typeof details.totalPrice === "number"
      ? [`Total charged: ${new Intl.NumberFormat("en-IE", { style: "currency", currency: "EUR" }).format(details.totalPrice)}`]
      : []),
    ...(paymentLabel ? [`Method: ${paymentLabel}`] : []),
    "",
    "👤 CUSTOMER",
    `Name: ${booking.name}`,
    `WhatsApp: ${booking.whatsapp}`,
    ...(booking.email ? [`Email: ${booking.email}`] : []),
    "",
    "📝 SPECIAL REQUESTS",
    details.specialRequests?.trim() || "None provided",
  ].join("\n");
};

const JOIN_QUERY = `
  SELECT
    b.*,
    fl.name AS from_loc_name,
    tl.name AS to_loc_name,
    v.name  AS vehicle_name
  FROM bookings b
  LEFT JOIN locations fl ON b.from_loc_id = fl.id
  LEFT JOIN locations tl ON b.to_loc_id   = tl.id
  LEFT JOIN vehicles  v  ON b.vehicle_id  = v.id
`;

// GET: Fetch Bookings
export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url);
  const status = searchParams.get("status");

  let q = JOIN_QUERY;
  const params: string[] = [];
  if (status && status !== "all") {
    q += " WHERE b.status=$1";
    params.push(status);
  }
  q += " ORDER BY b.created_at DESC";

  const { rows } = await pool.query(q, params);
  return NextResponse.json(rows.map(shape));
}

// POST: Create Booking & Inject into Google Calendar
export async function POST(req: NextRequest) {
  try {
    const b = await req.json();

    if (!b.vehicleId) {
      return NextResponse.json(
        { error: "Quote requests do not get saved to the database." },
        { status: 422 }
      );
    }

    const id = b.id ?? Math.random().toString(36).slice(2, 9);

    // Save to PostgreSQL
    const { rows } = await pool.query(
      `INSERT INTO bookings
         (id, from_loc_id, to_loc_id, date, time,
          passengers, kids, bags, vehicle_id,
          name, country, whatsapp, email, notes, status)
       VALUES ($1,$2,$3,$4,$5,$6,$7,$8,$9,$10,$11,$12,$13,$14,$15)
       RETURNING id`,
      [
        id,
        b.fromLocId  || null,
        b.toLocId    || null,
        b.date,
        b.time,
        b.passengers ?? 1,
        b.kids       ?? 0,
        b.bags       ?? 1,
        b.vehicleId,
        b.name,
        b.country    ?? "",
        b.whatsapp   ?? "",
        b.email      ?? "",
        b.notes      ?? "",
        b.status     ?? "new",
      ]
    );

    // Fetch newly created entry with relational names (Vehicle Name, Location names)
    const { rows: full } = await pool.query(
      JOIN_QUERY + " WHERE b.id=$1",
      [rows[0].id]
    );
    
    const savedBooking = shape(full[0]);

    // --- GOOGLE CALENDAR INTEGRATION ---
    try {
      // 1. Build a clean JS Date Object from strings
      // Handles both ISO strings and standard 'YYYY-MM-DD' dates safely
      const cleanDateStr = typeof savedBooking.date === 'string' ? savedBooking.date.split("T")[0] : savedBooking.date;
      const startDateTime = new Date(`${cleanDateStr}T${savedBooking.time}`);
      
      // 2. Set event duration to default 1 hour ride time
      const endDateTime = new Date(startDateTime.getTime() + 60 * 60 * 1000); 

      // 3. Insert directly to the calendar
      await calendar.events.insert({
        auth,
        calendarId: process.env.GOOGLE_CALENDAR_ID,
        requestBody: {
          summary: `🚗 Ride for ${savedBooking.name} (${savedBooking.vehicleName})`,
          description: buildCalendarDescription(savedBooking, {
            date: savedBooking.date,
            startDateTime,
            endDateTime,
            pickup: savedBooking.from,
            dropoff: savedBooking.to,
            flightOrTrain: b.flightOrTrain,
            address: b.address,
            totalPrice: b.totalPrice,
            paymentMethod: b.paymentMethod,
            specialRequests: b.specialRequests,
          }),
          start: {
            dateTime: startDateTime.toISOString(),
            timeZone: "UTC", // Update to matching local company timezone if preferred (e.g., "America/New_York")
          },
          end: {
            dateTime: endDateTime.toISOString(),
            timeZone: "UTC",
          },
          reminders: {
            useDefault: false,
            overrides: [
              { method: "popup", minutes: 1440 },
              { method: "popup", minutes: 120 },
            ],
          },
        },
      });

      if (b.returnDate && b.returnTime) {
        const cleanReturnDateStr = typeof b.returnDate === "string" ? b.returnDate.split("T")[0] : b.returnDate;
        const returnStartDateTime = new Date(`${cleanReturnDateStr}T${b.returnTime}`);
        const returnEndDateTime = new Date(returnStartDateTime.getTime() + 60 * 60 * 1000);

        await calendar.events.insert({
          auth,
          calendarId: process.env.GOOGLE_CALENDAR_ID,
          requestBody: {
            summary: `↩️ Return ride for ${savedBooking.name} (${savedBooking.vehicleName})`,
            description: buildCalendarDescription(savedBooking, {
              date: b.returnDate,
              startDateTime: returnStartDateTime,
              endDateTime: returnEndDateTime,
              pickup: savedBooking.to,
              dropoff: savedBooking.from,
              flightOrTrain: b.flightOrTrain,
              address: b.address,
              totalPrice: b.totalPrice,
              paymentMethod: b.paymentMethod,
              specialRequests: b.specialRequests,
            }),
            start: {
              dateTime: returnStartDateTime.toISOString(),
              timeZone: "UTC",
            },
            end: {
              dateTime: returnEndDateTime.toISOString(),
              timeZone: "UTC",
            },
            reminders: {
              useDefault: false,
              overrides: [
                { method: "popup", minutes: 1440 },
                { method: "popup", minutes: 120 },
              ],
            },
          },
        });
      }
    } catch (calErr) {
      // We log calendar integration faults separately. This isolates dependencies 
      // ensuring that database-saved bookings don't drop out if external APIs face downtime.
      console.error("⚠️ Google Calendar sync failed:", calErr);
    }
    // -----------------------------------

    return NextResponse.json(savedBooking, { status: 201 });

  } catch (err: any) {
    console.error("[POST /api/bookings] error:", err);
    return NextResponse.json(
      { error: err?.message ?? "Unknown database error" },
      { status: 500 }
    );
  }
}

// PUT: Update Booking Status
export async function PUT(req: NextRequest) {
  const { id, status } = await req.json();
  await pool.query("UPDATE bookings SET status=$2 WHERE id=$1", [id, status]);
  const { rows } = await pool.query(JOIN_QUERY + " WHERE b.id=$1", [id]);
  return NextResponse.json(shape(rows[0]));
}

// DELETE: Cancel/Remove Booking
export async function DELETE(req: NextRequest) {
  const id = new URL(req.url).searchParams.get("id");
  await pool.query("DELETE FROM bookings WHERE id=$1", [id]);
  return NextResponse.json({ success: true });
}