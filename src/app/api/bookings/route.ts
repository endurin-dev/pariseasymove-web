// app/api/bookings/route.ts
import { NextRequest, NextResponse } from "next/server";
import pool from "@/lib/db";

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

export async function POST(req: NextRequest) {
  try {
    const b = await req.json();

    // Quote requests (no vehicle) skip the DB entirely —
    // the email is sent directly from the frontend.
    // This guard is a safety net in case the frontend ever
    // calls this endpoint for a quote request by mistake.
    if (!b.vehicleId) {
      return NextResponse.json(
        { error: "Quote requests do not get saved to the database." },
        { status: 422 }
      );
    }

    const id = b.id ?? Math.random().toString(36).slice(2, 9);

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

    const { rows: full } = await pool.query(
      JOIN_QUERY + " WHERE b.id=$1",
      [rows[0].id]
    );
    return NextResponse.json(shape(full[0]), { status: 201 });

  } catch (err: any) {
    console.error("[POST /api/bookings] error:", err);
    return NextResponse.json(
      { error: err?.message ?? "Unknown database error" },
      { status: 500 }
    );
  }
}

export async function PUT(req: NextRequest) {
  const { id, status } = await req.json();
  await pool.query("UPDATE bookings SET status=$2 WHERE id=$1", [id, status]);
  const { rows } = await pool.query(JOIN_QUERY + " WHERE b.id=$1", [id]);
  return NextResponse.json(shape(rows[0]));
}

export async function DELETE(req: NextRequest) {
  const id = new URL(req.url).searchParams.get("id");
  await pool.query("DELETE FROM bookings WHERE id=$1", [id]);
  return NextResponse.json({ success: true });
}