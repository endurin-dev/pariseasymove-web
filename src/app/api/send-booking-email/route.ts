// app/api/send-booking-email/route.ts
// Install: npm install nodemailer
// Or use Resend: npm install resend
//
// Set these env vars in .env.local:
//   EMAIL_FROM=noreply@pariseasymove.com
//   EMAIL_PASS=your_smtp_password  (if using SMTP)
//   RESEND_API_KEY=re_xxxx         (if using Resend — recommended)
//   ADMIN_EMAIL=booking@pariseasymove.com

import { NextRequest, NextResponse } from "next/server";

// ─── Tiny helper to build the HTML email ─────────────────────────────────────
function buildCustomerEmail(data: BookingEmailData): string {
  const {
    bookingRef, name, email, country, whatsapp,
    fromName, toName, date, time,
    passengers, kids, bags, vehicleName, vehicleModel,
    isRoundTrip, flightTrain, address, notes,
    nightSurcharge, basePrice, totalPrice, onDemand,
    paymentMethod,
  } = data;

  const totalPax = passengers + kids;
  const nightBadge = nightSurcharge > 0
    ? `<span style="display:inline-block;background:#312e81;color:#a5f3fc;font-size:11px;font-weight:700;padding:3px 10px;border-radius:6px;margin-left:8px;">🌙 +€${nightSurcharge} night fee</span>`
    : "";
  const rtBadge = isRoundTrip
    ? `<span style="display:inline-block;background:#fff7ed;color:#ea580c;font-size:11px;font-weight:700;padding:3px 10px;border-radius:6px;margin-left:8px;border:1px solid #fed7aa;">🔄 Round Trip</span>`
    : "";

  return `<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="UTF-8"/>
<meta name="viewport" content="width=device-width,initial-scale=1"/>
<title>Booking Confirmation — Paris Easy Move</title>
</head>
<body style="margin:0;padding:0;background:#f4f5f7;font-family:'Helvetica Neue',Helvetica,Arial,sans-serif;">

<!-- Wrapper -->
<table width="100%" cellpadding="0" cellspacing="0" style="background:#f4f5f7;padding:40px 0;">
<tr><td align="center">
<table width="600" cellpadding="0" cellspacing="0" style="max-width:600px;width:100%;">

  <!-- HERO HEADER -->
  <tr><td style="background:linear-gradient(135deg,#0a1525 0%,#111827 60%,#1a2a3e 100%);border-radius:20px 20px 0 0;padding:40px 40px 32px;text-align:center;position:relative;">
    <!-- Logo row -->
    <p style="margin:0 0 24px;font-size:13px;font-weight:700;letter-spacing:0.15em;text-transform:uppercase;color:rgba(255,255,255,0.35);">PARIS EASY MOVE</p>
    <!-- Big checkmark -->
    <div style="width:72px;height:72px;border-radius:50%;background:#dcfce7;display:inline-flex;align-items:center;justify-content:center;margin-bottom:20px;">
      <svg width="36" height="36" fill="none" viewBox="0 0 24 24" style="display:block;margin:auto;">
        <path stroke="#16a34a" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round" d="M5 13l4 4L19 7"/>
      </svg>
    </div>
    <h1 style="margin:0 0 8px;font-size:30px;font-weight:800;color:#ffffff;line-height:1.15;">Booking Confirmed!</h1>
    <p style="margin:0 0 20px;font-size:15px;color:rgba(255,255,255,0.55);">Thank you, <strong style="color:#fff;">${name}</strong>. Your transfer is all set.</p>
    <!-- Ref badge -->
    <div style="display:inline-block;background:rgba(201,163,71,0.15);border:1.5px solid rgba(201,163,71,0.4);border-radius:10px;padding:8px 22px;">
      <span style="font-size:11px;font-weight:700;letter-spacing:0.12em;text-transform:uppercase;color:#c9a347;">Booking Reference</span><br/>
      <span style="font-size:22px;font-weight:900;color:#e8c97a;letter-spacing:0.08em;font-family:monospace;">${bookingRef}</span>
    </div>
  </td></tr>

  <!-- ROUTE BANNER -->
  <tr><td style="background:#1e293b;padding:20px 40px;">
    <table width="100%" cellpadding="0" cellspacing="0">
      <tr>
        <td style="text-align:center;">
          <p style="margin:0 0 4px;font-size:10px;font-weight:700;letter-spacing:0.1em;text-transform:uppercase;color:rgba(255,255,255,0.35);">FROM</p>
          <p style="margin:0;font-size:16px;font-weight:800;color:#ffffff;">${fromName}</p>
        </td>
        <td style="text-align:center;width:60px;">
          <div style="width:36px;height:36px;border-radius:50%;background:rgba(201,163,71,0.2);border:1px solid rgba(201,163,71,0.35);display:inline-flex;align-items:center;justify-content:center;">
            <svg width="16" height="16" fill="none" viewBox="0 0 24 24" style="display:block;">
              <path stroke="#c9a347" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round" d="M17 8l4 4m0 0l-4 4m4-4H3"/>
            </svg>
          </div>
          ${isRoundTrip ? `<p style="margin:4px 0 0;font-size:9px;color:#ea580c;font-weight:700;text-transform:uppercase;">+ Return</p>` : ""}
        </td>
        <td style="text-align:center;">
          <p style="margin:0 0 4px;font-size:10px;font-weight:700;letter-spacing:0.1em;text-transform:uppercase;color:rgba(255,255,255,0.35);">TO</p>
          <p style="margin:0;font-size:16px;font-weight:800;color:#ffffff;">${toName}</p>
        </td>
      </tr>
    </table>
  </td></tr>

  <!-- MAIN CONTENT CARD -->
  <tr><td style="background:#ffffff;padding:32px 40px 0;">

    <!-- Date/Time/Pax row -->
    <table width="100%" cellpadding="0" cellspacing="0" style="margin-bottom:24px;">
      <tr>
        ${[
          { icon:"📅", label:"Date", val: date },
          { icon:"🕐", label:"Pickup Time", val: time + (nightSurcharge > 0 ? " 🌙" : "") },
          { icon:"👥", label:"Passengers", val: `${totalPax} total` },
          { icon:"🧳", label:"Luggage", val: `${bags} bag${bags !== 1 ? "s" : ""}` },
        ].map(c => `
        <td style="text-align:center;padding:14px 8px;background:#f8f9fb;border-radius:10px;" width="25%">
          <div style="font-size:20px;margin-bottom:4px;">${c.icon}</div>
          <div style="font-size:10px;font-weight:700;text-transform:uppercase;letter-spacing:0.07em;color:#9ca3af;margin-bottom:2px;">${c.label}</div>
          <div style="font-size:13px;font-weight:700;color:#111827;">${c.val}</div>
        </td>
        `).join(`<td width="8px"></td>`)}
      </tr>
    </table>

    <!-- Trip details block -->
    <table width="100%" cellpadding="0" cellspacing="0" style="border:1px solid #e5e7eb;border-radius:12px;overflow:hidden;margin-bottom:20px;">
      <tr><td style="background:#f9fafb;padding:10px 18px;border-bottom:1px solid #e5e7eb;">
        <span style="font-size:12px;font-weight:700;color:#374151;text-transform:uppercase;letter-spacing:0.06em;">Trip Details</span>
      </td></tr>
      ${buildRow("Trip Type", isRoundTrip ? "🔄 Round Trip (×2 price)" : "→ One Way")}
      ${buildRow("Passengers", `${passengers} adult${passengers !== 1 ? "s" : ""}${kids > 0 ? ` + ${kids} child${kids !== 1 ? "ren" : ""}` : ""}`)}
      ${flightTrain ? buildRow("Flight / Train No.", flightTrain) : ""}
      ${address     ? buildRow("Address", address) : ""}
    </table>

    <!-- Vehicle block -->
    <table width="100%" cellpadding="0" cellspacing="0" style="border:1.5px solid #e5e7eb;border-radius:12px;overflow:hidden;margin-bottom:20px;">
      <tr><td style="background:#f9fafb;padding:10px 18px;border-bottom:1px solid #e5e7eb;">
        <span style="font-size:12px;font-weight:700;color:#374151;text-transform:uppercase;letter-spacing:0.06em;">Vehicle</span>
      </td></tr>
      <tr><td style="padding:16px 18px;">
        <table width="100%" cellpadding="0" cellspacing="0"><tr>
          <td>
            <div style="font-size:14px;font-weight:800;text-transform:uppercase;letter-spacing:0.04em;color:#111827;">${vehicleName}</div>
            <div style="font-size:12px;color:#9ca3af;font-style:italic;margin-top:2px;">${vehicleModel}</div>
          </td>
          <td style="text-align:right;">
            <div style="font-size:11px;color:#9ca3af;margin-bottom:3px;">${isRoundTrip ? "Round trip fare" : "One way fare"}</div>
            <div style="font-size:24px;font-weight:900;color:${onDemand ? "#d97706" : "#111827"};">
              ${onDemand ? "On Demand" : `€${totalPrice}`}
            </div>
          </td>
        </tr></table>
      </td></tr>
    </table>

    <!-- Fare breakdown -->
    <table width="100%" cellpadding="0" cellspacing="0" style="border:1px solid #e5e7eb;border-radius:12px;overflow:hidden;margin-bottom:20px;">
      <tr><td style="background:#f9fafb;padding:10px 18px;border-bottom:1px solid #e5e7eb;">
        <span style="font-size:12px;font-weight:700;color:#374151;text-transform:uppercase;letter-spacing:0.06em;">Fare Breakdown</span>
      </td></tr>
      ${buildRow("Base fare" + (isRoundTrip ? " (×2 round trip)" : ""), onDemand ? "On Demand" : `€${basePrice}`)}
      ${nightSurcharge > 0 ? `
      <tr><td colspan="2" style="padding:10px 18px;background:#f5f3ff;border-top:1px dashed #ddd6fe;border-bottom:1px dashed #ddd6fe;">
        <table width="100%" cellpadding="0" cellspacing="0"><tr>
          <td style="font-size:13px;font-weight:600;color:#7c3aed;">🌙 Night Surcharge (10 PM – 6 AM)</td>
          <td style="text-align:right;font-size:13px;font-weight:700;color:#7c3aed;">+€${nightSurcharge}</td>
        </tr></table>
      </td></tr>` : ""}
      <tr><td colspan="2" style="padding:14px 18px;border-top:2px solid #e5e7eb;">
        <table width="100%" cellpadding="0" cellspacing="0"><tr>
          <td style="font-size:16px;font-weight:800;color:#111827;">Total</td>
          <td style="text-align:right;font-size:22px;font-weight:900;color:#16a34a;">${onDemand ? "On Demand" : `€${totalPrice}`}</td>
        </tr></table>
      </td></tr>
    </table>

    <!-- Contact / Payment block -->
    <table width="100%" cellpadding="0" cellspacing="0" style="border:1px solid #e5e7eb;border-radius:12px;overflow:hidden;margin-bottom:20px;">
      <tr><td style="background:#f9fafb;padding:10px 18px;border-bottom:1px solid #e5e7eb;">
        <span style="font-size:12px;font-weight:700;color:#374151;text-transform:uppercase;letter-spacing:0.06em;">Your Details</span>
      </td></tr>
      ${buildRow("Name", name)}
      ${buildRow("Country", country)}
      ${buildRow("WhatsApp", whatsapp)}
      ${buildRow("Email", email)}
      ${buildRow("Payment", paymentMethod === "cash" ? "💵 Cash to driver" : "💳 Card to driver")}
      ${notes ? buildRow("Notes", notes) : ""}
    </table>

  </td></tr>

  <!-- PAY ON ARRIVAL NOTICE -->
  <tr><td style="background:#fff;padding:0 40px 24px;">
    <table width="100%" cellpadding="0" cellspacing="0" style="background:#f0fdf4;border:1.5px solid #bbf7d0;border-radius:12px;padding:16px 20px;">
      <tr>
        <td width="36" style="vertical-align:top;padding-top:2px;">
          <svg width="20" height="20" fill="none" viewBox="0 0 24 24" style="display:block;">
            <path stroke="#16a34a" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"/>
          </svg>
        </td>
        <td style="padding-left:10px;">
          <div style="font-size:13px;font-weight:700;color:#14532d;margin-bottom:4px;">Fixed Price — Pay on Arrival</div>
          <div style="font-size:12px;color:#166534;line-height:1.5;">Your price is locked in and guaranteed. No hidden fees. Pay your driver directly upon arrival — ${paymentMethod === "cash" ? "cash" : "card"} accepted.</div>
        </td>
      </tr>
    </table>
  </td></tr>

  <!-- WHAT TO EXPECT -->
  <tr><td style="background:#fff;padding:0 40px 32px;">
    <p style="margin:0 0 14px;font-size:13px;font-weight:700;color:#374151;text-transform:uppercase;letter-spacing:0.07em;">What to Expect</p>
    <table width="100%" cellpadding="0" cellspacing="0">
      ${[
        ["🚗", "Professional driver", "Your driver will be waiting at the designated pickup point."],
        ["📱", "Driver will contact you", "You'll receive a call or WhatsApp before pickup."],
        ["♻️", "Free cancellation", "Cancel or modify up to 24 hours before your pickup."],
        ["⭐", "Meet & Greet", "Your driver will hold a name sign at airports and stations."],
      ].map(([icon, title, sub]) => `
      <tr>
        <td width="36" style="vertical-align:top;padding:6px 10px 6px 0;">
          <div style="width:32px;height:32px;border-radius:8px;background:#f3f4f6;text-align:center;line-height:32px;font-size:16px;">${icon}</div>
        </td>
        <td style="padding:6px 0;">
          <div style="font-size:13px;font-weight:700;color:#111827;margin-bottom:1px;">${title}</div>
          <div style="font-size:12px;color:#6b7280;">${sub}</div>
        </td>
      </tr>`).join("")}
    </table>
  </td></tr>

  <!-- CONTACT US FOOTER CARD -->
  <tr><td style="background:#fff;padding:0 40px 32px;">
    <table width="100%" cellpadding="0" cellspacing="0" style="background:#111827;border-radius:14px;padding:20px 24px;">
      <tr>
        <td>
          <div style="font-size:14px;font-weight:700;color:#fff;margin-bottom:6px;">Need to make changes?</div>
          <div style="font-size:12px;color:rgba(255,255,255,0.5);line-height:1.6;">
            📧 <a href="mailto:booking@pariseasymove.com" style="color:#c9a347;text-decoration:none;">booking@pariseasymove.com</a><br/>
            📞 <a href="tel:+33652466694" style="color:#c9a347;text-decoration:none;">+33 6 52 46 66 94</a>
          </div>
        </td>
        <td style="text-align:right;vertical-align:middle;">
          <div style="font-size:15px;font-weight:800;color:#f5f0e8;">Paris <span style="color:#c9a347;">Easy</span> Move</div>
        </td>
      </tr>
    </table>
  </td></tr>

  <!-- FOOTER -->
  <tr><td style="background:#f4f5f7;padding:20px 40px 40px;text-align:center;border-radius:0 0 20px 20px;">
    <p style="margin:0 0 4px;font-size:11px;color:#9ca3af;">© ${new Date().getFullYear()} Paris Easy Move · 10 rue Pierre Sarrazin, 95190 Goussainville</p>
    <p style="margin:0;font-size:11px;color:#9ca3af;">This is an automated confirmation. Booking ref: <strong>${bookingRef}</strong></p>
  </td></tr>

</table>
</td></tr>
</table>

</body>
</html>`;
}

function buildRow(label: string, value: string): string {
  return `<tr><td style="padding:9px 18px;border-bottom:1px solid #f3f4f6;">
    <table width="100%" cellpadding="0" cellspacing="0"><tr>
      <td style="font-size:13px;color:#6b7280;">${label}</td>
      <td style="text-align:right;font-size:13px;font-weight:600;color:#111827;">${value || "—"}</td>
    </tr></table>
  </td></tr>`;
}

// ─── Admin email (compact ops-style) ─────────────────────────────────────────
function buildAdminEmail(data: BookingEmailData): string {
  const { bookingRef, name, email, whatsapp, country, fromName, toName, date, time,
    passengers, kids, bags, vehicleName, vehicleModel, isRoundTrip, flightTrain,
    address, notes, nightSurcharge, totalPrice, onDemand, paymentMethod } = data;
  const totalPax = passengers + kids;

  return `<!DOCTYPE html>
<html><head><meta charset="UTF-8"/></head>
<body style="margin:0;padding:0;background:#f4f5f7;font-family:'Helvetica Neue',Helvetica,Arial,sans-serif;">
<table width="100%" cellpadding="0" cellspacing="0" style="background:#f4f5f7;padding:32px 0;">
<tr><td align="center">
<table width="600" cellpadding="0" cellspacing="0" style="max-width:600px;width:100%;">

  <!-- Admin header -->
  <tr><td style="background:#0a1525;border-radius:14px 14px 0 0;padding:22px 32px;">
    <table width="100%" cellpadding="0" cellspacing="0"><tr>
      <td>
        <div style="font-size:10px;font-weight:700;letter-spacing:0.14em;text-transform:uppercase;color:rgba(255,255,255,0.3);margin-bottom:4px;">NEW BOOKING ALERT</div>
        <div style="font-size:20px;font-weight:800;color:#fff;">${name}</div>
        <div style="font-size:12px;color:rgba(255,255,255,0.45);margin-top:2px;">${email} · ${whatsapp}</div>
      </td>
      <td style="text-align:right;vertical-align:middle;">
        <div style="background:rgba(201,163,71,0.15);border:1px solid rgba(201,163,71,0.4);border-radius:8px;padding:8px 16px;display:inline-block;">
          <div style="font-size:9px;font-weight:700;letter-spacing:0.1em;text-transform:uppercase;color:#c9a347;margin-bottom:2px;">Ref</div>
          <div style="font-size:16px;font-weight:900;color:#e8c97a;font-family:monospace;">${bookingRef}</div>
        </div>
      </td>
    </tr></table>
  </td></tr>

  <!-- Route + date strip -->
  <tr><td style="background:#1e293b;padding:14px 32px;">
    <table width="100%" cellpadding="0" cellspacing="0"><tr>
      <td style="font-size:13px;font-weight:700;color:#fff;">${fromName} → ${toName}${isRoundTrip ? " 🔄" : ""}</td>
      <td style="text-align:right;font-size:13px;color:rgba(255,255,255,0.55);">${date} at ${time}${nightSurcharge > 0 ? " 🌙" : ""}</td>
    </tr></table>
  </td></tr>

  <!-- Details grid -->
  <tr><td style="background:#fff;padding:24px 32px;">
    <table width="100%" cellpadding="0" cellspacing="0" style="border:1px solid #e5e7eb;border-radius:10px;overflow:hidden;margin-bottom:16px;">
      ${buildRow("Vehicle", `${vehicleName} — ${vehicleModel}`)}
      ${buildRow("Passengers", `${passengers} adult${passengers !== 1 ? "s" : ""}${kids > 0 ? ` + ${kids} children` : ""} (${totalPax} total)`)}
      ${buildRow("Luggage", `${bags} bag${bags !== 1 ? "s" : ""}`)}
      ${buildRow("Trip Type", isRoundTrip ? "🔄 Round Trip (×2)" : "→ One Way")}
      ${buildRow("Country", country)}
      ${buildRow("Payment", paymentMethod === "cash" ? "💵 Cash to driver" : "💳 Card to driver")}
      ${nightSurcharge > 0 ? buildRow("Night Surcharge", `+€${nightSurcharge}`) : ""}
      ${buildRow("Total Fare", onDemand ? "On Demand" : `€${totalPrice}`)}
      ${flightTrain ? buildRow("Flight / Train", flightTrain) : ""}
      ${address     ? buildRow("Address", address) : ""}
      ${notes       ? buildRow("Notes", notes) : ""}
    </table>

    <!-- Quick action buttons -->
    <table width="100%" cellpadding="0" cellspacing="0">
      <tr>
        <td style="padding-right:6px;">
          <a href="mailto:${email}?subject=Re: Your Paris Easy Move Booking ${bookingRef}" style="display:block;text-align:center;padding:11px;background:#111827;color:#fff;border-radius:8px;font-size:12px;font-weight:700;text-decoration:none;">✉ Reply to Client</a>
        </td>
        <td style="padding-left:6px;">
          <a href="https://wa.me/${whatsapp.replace(/\D/g,"")}" style="display:block;text-align:center;padding:11px;background:#16a34a;color:#fff;border-radius:8px;font-size:12px;font-weight:700;text-decoration:none;">💬 WhatsApp Client</a>
        </td>
      </tr>
    </table>
  </td></tr>

  <tr><td style="background:#f4f5f7;border-radius:0 0 14px 14px;padding:14px 32px;text-align:center;">
    <p style="margin:0;font-size:11px;color:#9ca3af;">Paris Easy Move Admin · booking@pariseasymove.com</p>
  </td></tr>

</table>
</td></tr>
</table>
</body></html>`;
}

// ─── Types ────────────────────────────────────────────────────────────────────
interface BookingEmailData {
  bookingRef: string;
  name: string; email: string; country: string; whatsapp: string;
  fromName: string; toName: string;
  date: string; time: string;
  passengers: number; kids: number; bags: number;
  vehicleName: string; vehicleModel: string;
  isRoundTrip: boolean;
  flightTrain: string; address: string; notes: string;
  nightSurcharge: number;
  basePrice: number | null;
  totalPrice: number | null;
  onDemand: boolean;
  paymentMethod: string;
}

// ─── ROUTE HANDLER ────────────────────────────────────────────────────────────
export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const data = body as BookingEmailData;

    const customerHtml = buildCustomerEmail(data);
    const adminHtml    = buildAdminEmail(data);

    // ── OPTION A: Resend (recommended — just set RESEND_API_KEY) ──────────────
    if (process.env.RESEND_API_KEY) {
      const { Resend } = await import("resend");
      const resend = new Resend(process.env.RESEND_API_KEY);

      const [customerResult, adminResult] = await Promise.all([
        resend.emails.send({
          from: `Paris Easy Move <${process.env.EMAIL_FROM ?? "noreply@pariseasymove.com"}>`,
          to: data.email,
          subject: `✅ Booking Confirmed — ${data.fromName} → ${data.toName} · Ref: ${data.bookingRef}`,
          html: customerHtml,
        }),
        resend.emails.send({
          from: `Paris Easy Move <${process.env.EMAIL_FROM ?? "noreply@pariseasymove.com"}>`,
          to: process.env.ADMIN_EMAIL ?? "booking@pariseasymove.com",
          subject: `🚖 New Booking: ${data.name} — ${data.fromName} → ${data.toName} · ${data.date} ${data.time} · ${data.bookingRef}`,
          html: adminHtml,
        }),
      ]);
      return NextResponse.json({ ok: true, customer: customerResult, admin: adminResult });
    }

    // ── OPTION B: Nodemailer SMTP (set EMAIL_HOST, EMAIL_USER, EMAIL_PASS) ────
    const nodemailer = await import("nodemailer");
    const transporter = nodemailer.default.createTransport({
      host:   process.env.EMAIL_HOST   ?? "smtp.gmail.com",
      port:   parseInt(process.env.EMAIL_PORT ?? "587"),
      secure: process.env.EMAIL_SECURE === "true",
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
      },
    });

    await Promise.all([
      transporter.sendMail({
        from: `"Paris Easy Move" <${process.env.EMAIL_FROM ?? process.env.EMAIL_USER}>`,
        to: data.email,
        subject: `✅ Booking Confirmed — ${data.fromName} → ${data.toName} · Ref: ${data.bookingRef}`,
        html: customerHtml,
      }),
      transporter.sendMail({
        from: `"Paris Easy Move Bookings" <${process.env.EMAIL_FROM ?? process.env.EMAIL_USER}>`,
        to: process.env.ADMIN_EMAIL ?? "booking@pariseasymove.com",
        subject: `🚖 New Booking: ${data.name} — ${data.fromName} → ${data.toName} · ${data.date} ${data.time} · ${data.bookingRef}`,
        html: adminHtml,
      }),
    ]);

    return NextResponse.json({ ok: true });
  } catch (err: any) {
    console.error("[send-booking-email] error:", err);
    return NextResponse.json({ ok: false, error: err.message }, { status: 500 });
  }
}