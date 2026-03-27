// app/api/send-booking-email/route.ts

import { NextRequest, NextResponse } from "next/server";

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

// ─── Shared row builder ───────────────────────────────────────────────────────
function buildRow(label: string, value: string, accent = false): string {
  return `
  <tr>
    <td style="padding:11px 24px;border-bottom:1px solid #f0f0f0;width:40%;">
      <span style="font-size:11px;font-weight:700;text-transform:uppercase;letter-spacing:0.08em;color:#9ca3af;">${label}</span>
    </td>
    <td style="padding:11px 24px;border-bottom:1px solid #f0f0f0;text-align:right;">
      <span style="font-size:13px;font-weight:700;color:${accent ? "#c9a347" : "#111827"};">${value || "—"}</span>
    </td>
  </tr>`;
}

// ─── CUSTOMER EMAIL ───────────────────────────────────────────────────────────
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
  const year = new Date().getFullYear();

  return `<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="UTF-8"/>
<meta name="viewport" content="width=device-width,initial-scale=1"/>
<title>Booking Confirmed — Paris Easy Move</title>
</head>
<body style="margin:0;padding:0;background:#0f0f0f;font-family:Georgia,'Times New Roman',serif;">

<table width="100%" cellpadding="0" cellspacing="0" style="background:#0f0f0f;padding:48px 0 64px;">
<tr><td align="center">
<table width="620" cellpadding="0" cellspacing="0" style="max-width:620px;width:100%;">

  <!-- ═══ HEADER BRAND BAR ═══ -->
  <tr><td style="padding:0 0 28px;">
    <table width="100%" cellpadding="0" cellspacing="0"><tr>
      <td>
        <span style="font-size:11px;font-weight:700;letter-spacing:0.2em;text-transform:uppercase;color:#c9a347;">Paris Easy Move</span>
      </td>
      <td style="text-align:right;">
        <span style="font-size:11px;letter-spacing:0.1em;text-transform:uppercase;color:#555;">Premium Transfer</span>
      </td>
    </tr></table>
  </td></tr>

  <!-- ═══ HERO CARD ═══ -->
  <tr><td style="background:linear-gradient(160deg,#1a1200 0%,#0f0f0f 40%,#0a1a0a 100%);border-radius:20px;border:1px solid #2a2200;overflow:hidden;">

    <!-- Gold top accent line -->
    <div style="height:3px;background:linear-gradient(90deg,transparent,#c9a347,#e8c97a,#c9a347,transparent);"></div>

    <!-- Hero content -->
    <table width="100%" cellpadding="0" cellspacing="0">
      <tr><td style="padding:52px 48px 40px;text-align:center;">

        <!-- Checkmark circle -->
        <div style="display:inline-block;width:80px;height:80px;border-radius:50%;border:2px solid #c9a347;background:rgba(201,163,71,0.08);margin-bottom:28px;">
          <table width="80" height="80" cellpadding="0" cellspacing="0"><tr><td align="center" valign="middle">
            <svg width="32" height="32" fill="none" viewBox="0 0 24 24">
              <path stroke="#c9a347" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" d="M5 13l4 4L19 7"/>
            </svg>
          </td></tr></table>
        </div>

        <p style="margin:0 0 10px;font-size:11px;font-weight:700;letter-spacing:0.25em;text-transform:uppercase;color:#c9a347;">Your Journey is Confirmed</p>
        <h1 style="margin:0 0 16px;font-size:38px;font-weight:400;color:#f5f0e8;line-height:1.1;font-style:italic;">Merci, ${name}.</h1>
        <p style="margin:0 0 32px;font-size:15px;color:rgba(245,240,232,0.5);line-height:1.7;max-width:420px;margin-left:auto;margin-right:auto;">
          Your luxury transfer has been arranged. A professional chauffeur will meet you at the designated point.
        </p>

        <!-- Booking Ref Badge -->
        <div style="display:inline-block;border:1px solid rgba(201,163,71,0.4);border-radius:4px;padding:14px 32px;background:rgba(201,163,71,0.06);">
          <div style="font-size:10px;font-weight:700;letter-spacing:0.2em;text-transform:uppercase;color:#c9a347;margin-bottom:6px;">Booking Reference</div>
          <div style="font-size:26px;font-weight:700;color:#e8c97a;letter-spacing:0.15em;font-family:'Courier New',monospace;">${bookingRef}</div>
        </div>

      </td></tr>

      <!-- ─── ROUTE STRIP ─── -->
      <tr><td style="padding:0 48px 40px;">
        <table width="100%" cellpadding="0" cellspacing="0" style="border-top:1px solid rgba(201,163,71,0.15);border-bottom:1px solid rgba(201,163,71,0.15);padding:24px 0;">
          <tr>
            <td style="text-align:center;width:42%;">
              <div style="font-size:10px;font-weight:700;letter-spacing:0.15em;text-transform:uppercase;color:#c9a347;margin-bottom:8px;">From</div>
              <div style="font-size:17px;font-weight:700;color:#f5f0e8;line-height:1.3;">${fromName}</div>
            </td>
            <td style="text-align:center;width:16%;">
              <div style="border-top:1px solid rgba(201,163,71,0.4);position:relative;margin:0 8px;">
                <div style="position:absolute;top:-8px;left:50%;transform:translateX(-50%);background:#1a1200;padding:0 6px;">
                  <svg width="14" height="14" fill="none" viewBox="0 0 24 24" style="display:block;">
                    <path stroke="#c9a347" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" d="M17 8l4 4m0 0l-4 4m4-4H3"/>
                  </svg>
                </div>
              </div>
              ${isRoundTrip ? `<div style="margin-top:14px;font-size:9px;font-weight:700;letter-spacing:0.1em;text-transform:uppercase;color:#ea580c;">Round Trip</div>` : ""}
            </td>
            <td style="text-align:center;width:42%;">
              <div style="font-size:10px;font-weight:700;letter-spacing:0.15em;text-transform:uppercase;color:#c9a347;margin-bottom:8px;">To</div>
              <div style="font-size:17px;font-weight:700;color:#f5f0e8;line-height:1.3;">${toName}</div>
            </td>
          </tr>
        </table>
      </td></tr>

      <!-- ─── QUICK STATS ─── -->
      <tr><td style="padding:0 48px 40px;">
        <table width="100%" cellpadding="0" cellspacing="0">
          <tr>
            ${[
              { label: "Date", value: date, icon: "📅" },
              { label: "Pickup Time", value: time + (nightSurcharge > 0 ? " 🌙" : ""), icon: "🕐" },
              { label: "Passengers", value: `${totalPax}`, icon: "👤" },
              { label: "Luggage", value: `${bags} bag${bags !== 1 ? "s" : ""}`, icon: "🧳" },
            ].map((s, i) => `
            <td style="text-align:center;padding:18px 8px;background:rgba(255,255,255,0.03);border-radius:10px;${i > 0 ? "margin-left:8px;" : ""}">
              <div style="font-size:18px;margin-bottom:8px;">${s.icon}</div>
              <div style="font-size:10px;font-weight:700;text-transform:uppercase;letter-spacing:0.1em;color:#666;margin-bottom:4px;">${s.label}</div>
              <div style="font-size:13px;font-weight:700;color:#f5f0e8;">${s.value}</div>
            </td>
            <td width="6px"></td>`).join("")}
          </tr>
        </table>
      </td></tr>

    </table>
  </td></tr>

  <!-- ═══ DETAILS CARDS ═══ -->
  <tr><td style="padding:24px 0 0;">

    <!-- Trip Details -->
    <table width="100%" cellpadding="0" cellspacing="0" style="background:#fff;border-radius:16px;overflow:hidden;margin-bottom:16px;">
      <tr><td style="padding:18px 24px;background:#f9f7f4;border-bottom:2px solid #e8e0d0;">
        <span style="font-size:10px;font-weight:700;letter-spacing:0.18em;text-transform:uppercase;color:#92784a;">Trip Details</span>
      </td></tr>
      ${buildRow("Trip Type", isRoundTrip ? "🔄 Round Trip (×2 price)" : "→ One Way")}
      ${buildRow("Pickup", fromName)}
      ${buildRow("Drop-off", toName)}
      ${buildRow("Date", date)}
      ${buildRow("Pickup Time", time + (nightSurcharge > 0 ? "  🌙 Night fare" : ""))}
      ${buildRow("Adults", `${passengers}`)}
      ${kids > 0 ? buildRow("Children", `${kids}`) : ""}
      ${buildRow("Luggage", `${bags} bag${bags !== 1 ? "s" : ""}`)}
      ${flightTrain ? buildRow("Flight / Train No.", flightTrain) : ""}
      ${address ? buildRow("Address", address) : ""}
      ${notes ? buildRow("Special Requests", notes) : ""}
    </table>

    <!-- Vehicle -->
    <table width="100%" cellpadding="0" cellspacing="0" style="background:#fff;border-radius:16px;overflow:hidden;margin-bottom:16px;">
      <tr><td style="padding:18px 24px;background:#f9f7f4;border-bottom:2px solid #e8e0d0;">
        <span style="font-size:10px;font-weight:700;letter-spacing:0.18em;text-transform:uppercase;color:#92784a;">Vehicle</span>
      </td></tr>
      <tr><td style="padding:20px 24px;">
        <table width="100%" cellpadding="0" cellspacing="0"><tr>
          <td>
            <div style="font-size:16px;font-weight:700;color:#111827;margin-bottom:4px;text-transform:uppercase;letter-spacing:0.04em;">${vehicleName}</div>
            <div style="font-size:12px;color:#9ca3af;font-style:italic;">${vehicleModel}</div>
          </td>
          <td style="text-align:right;vertical-align:top;">
            <div style="font-size:11px;color:#9ca3af;margin-bottom:4px;">${isRoundTrip ? "Round trip total" : "One way total"}</div>
            <div style="font-size:28px;font-weight:700;color:${onDemand ? "#d97706" : "#111827"};">${onDemand ? "On Demand" : `€${totalPrice}`}</div>
          </td>
        </tr></table>
      </td></tr>
    </table>

    <!-- Fare Breakdown -->
    <table width="100%" cellpadding="0" cellspacing="0" style="background:#fff;border-radius:16px;overflow:hidden;margin-bottom:16px;">
      <tr><td style="padding:18px 24px;background:#f9f7f4;border-bottom:2px solid #e8e0d0;">
        <span style="font-size:10px;font-weight:700;letter-spacing:0.18em;text-transform:uppercase;color:#92784a;">Fare Breakdown</span>
      </td></tr>
      ${buildRow(`Base fare${isRoundTrip ? " (×2 round trip)" : ""}`, onDemand ? "On Demand" : `€${basePrice}`)}
      ${nightSurcharge > 0 ? buildRow("🌙 Night Surcharge (10 PM – 6 AM)", `+€${nightSurcharge}`) : ""}
      <tr>
        <td colspan="2" style="padding:16px 24px;background:#fafaf8;border-top:2px solid #e8e0d0;">
          <table width="100%" cellpadding="0" cellspacing="0"><tr>
            <td style="font-size:14px;font-weight:700;color:#111827;text-transform:uppercase;letter-spacing:0.06em;">Total</td>
            <td style="text-align:right;font-size:28px;font-weight:700;color:#16a34a;">${onDemand ? "On Demand" : `€${totalPrice}`}</td>
          </tr></table>
        </td>
      </tr>
    </table>

    <!-- Your Details -->
    <table width="100%" cellpadding="0" cellspacing="0" style="background:#fff;border-radius:16px;overflow:hidden;margin-bottom:16px;">
      <tr><td style="padding:18px 24px;background:#f9f7f4;border-bottom:2px solid #e8e0d0;">
        <span style="font-size:10px;font-weight:700;letter-spacing:0.18em;text-transform:uppercase;color:#92784a;">Your Details</span>
      </td></tr>
      ${buildRow("Name", name)}
      ${buildRow("Country", country)}
      ${buildRow("WhatsApp", whatsapp)}
      ${buildRow("Email", email)}
      ${buildRow("Payment", paymentMethod === "cash" ? "💵 Cash to driver" : "💳 Card to driver")}
    </table>

  </td></tr>

  <!-- ═══ PAYMENT NOTICE ═══ -->
  <tr><td style="padding:8px 0 0;">
    <table width="100%" cellpadding="0" cellspacing="0" style="background:linear-gradient(135deg,#0a1a0a,#0d200d);border-radius:16px;border:1px solid rgba(22,163,74,0.3);overflow:hidden;">
      <tr><td style="padding:28px 32px;">
        <table width="100%" cellpadding="0" cellspacing="0"><tr>
          <td>
            <div style="font-size:11px;font-weight:700;letter-spacing:0.15em;text-transform:uppercase;color:#4ade80;margin-bottom:8px;">Fixed Price Guarantee</div>
            <div style="font-size:14px;color:rgba(245,240,232,0.7);line-height:1.7;">Your fare is locked. No surge pricing, no hidden fees.<br/>Pay your chauffeur directly upon arrival — ${paymentMethod === "cash" ? "cash" : "card"} accepted.</div>
          </td>
          <td style="text-align:right;vertical-align:middle;padding-left:24px;white-space:nowrap;">
            <div style="font-size:32px;font-weight:700;color:#4ade80;">${onDemand ? "On Demand" : `€${totalPrice}`}</div>
            <div style="font-size:10px;color:rgba(74,222,128,0.5);letter-spacing:0.08em;text-transform:uppercase;">incl. VAT</div>
          </td>
        </tr></table>
      </td></tr>
    </table>
  </td></tr>

  <!-- ═══ WHAT TO EXPECT ═══ -->
  <tr><td style="padding:24px 0 0;">
    <table width="100%" cellpadding="0" cellspacing="0" style="background:#fff;border-radius:16px;overflow:hidden;">
      <tr><td style="padding:18px 24px;background:#f9f7f4;border-bottom:2px solid #e8e0d0;">
        <span style="font-size:10px;font-weight:700;letter-spacing:0.18em;text-transform:uppercase;color:#92784a;">What to Expect</span>
      </td></tr>
      <tr><td style="padding:24px;">
        <table width="100%" cellpadding="0" cellspacing="0">
          ${[
            ["🚘", "Professional Chauffeur", "A licensed, vetted driver in a pristine vehicle awaits you."],
            ["📍", "Meet & Greet Service", "Your chauffeur holds a name sign at arrivals — no searching required."],
            ["📱", "Driver Will Contact You", "Expect a call or WhatsApp message before your pickup time."],
            ["🔄", "Free Cancellation", "Cancel or modify your booking up to 24 hours before pickup."],
            ["🧳", "Porter Service Included", "Your driver will assist with your luggage at no extra charge."],
          ].map(([icon, title, sub]) => `
          <tr>
            <td width="44" style="vertical-align:top;padding:8px 14px 8px 0;">
              <div style="width:40px;height:40px;border-radius:10px;background:#f5f0e8;text-align:center;line-height:40px;font-size:18px;">${icon}</div>
            </td>
            <td style="vertical-align:top;padding:8px 0 8px;border-bottom:1px solid #f3f4f6;">
              <div style="font-size:13px;font-weight:700;color:#111827;margin-bottom:3px;">${title}</div>
              <div style="font-size:12px;color:#6b7280;line-height:1.5;">${sub}</div>
            </td>
          </tr>`).join("")}
        </table>
      </td></tr>
    </table>
  </td></tr>

  <!-- ═══ CONTACT CARD ═══ -->
  <tr><td style="padding:16px 0 0;">
    <table width="100%" cellpadding="0" cellspacing="0" style="background:linear-gradient(135deg,#1a1200,#0f0f0f);border-radius:16px;border:1px solid #2a2200;overflow:hidden;">
      <tr><td style="padding:28px 32px;">
        <table width="100%" cellpadding="0" cellspacing="0"><tr>
          <td>
            <div style="font-size:11px;font-weight:700;letter-spacing:0.15em;text-transform:uppercase;color:#c9a347;margin-bottom:10px;">Need to Modify Your Booking?</div>
            <div style="font-size:13px;color:rgba(245,240,232,0.5);line-height:1.9;">
              📧 <a href="mailto:booking@pariseasymove.com" style="color:#c9a347;text-decoration:none;">booking@pariseasymove.com</a><br/>
              📞 <a href="tel:+33652466694" style="color:#c9a347;text-decoration:none;">+33 6 52 46 66 94</a>
            </div>
          </td>
          <td style="text-align:right;vertical-align:middle;">
            <div style="font-size:18px;font-weight:400;color:#f5f0e8;font-style:italic;">Paris <span style="color:#c9a347;font-style:normal;font-weight:700;">Easy</span> Move</div>
          </td>
        </tr></table>
      </td></tr>
    </table>
  </td></tr>

  <!-- ═══ FOOTER ═══ -->
  <tr><td style="padding:32px 0 0;text-align:center;">
    <div style="height:1px;background:linear-gradient(90deg,transparent,#2a2200,transparent);margin-bottom:24px;"></div>
    <p style="margin:0 0 6px;font-size:11px;color:#444;letter-spacing:0.06em;">© ${year} Paris Easy Move · 10 rue Pierre Sarrazin, 95190 Goussainville</p>
    <p style="margin:0;font-size:11px;color:#333;">Booking reference: <span style="color:#c9a347;font-family:'Courier New',monospace;font-weight:700;">${bookingRef}</span></p>
  </td></tr>

</table>
</td></tr>
</table>

</body>
</html>`;
}

// ─── ADMIN EMAIL ──────────────────────────────────────────────────────────────
function buildAdminEmail(data: BookingEmailData): string {
  const {
    bookingRef, name, email, whatsapp, country,
    fromName, toName, date, time,
    passengers, kids, bags,
    vehicleName, vehicleModel,
    isRoundTrip, flightTrain, address, notes,
    nightSurcharge, basePrice, totalPrice, onDemand,
    paymentMethod,
  } = data;

  const totalPax = passengers + kids;
  const year = new Date().getFullYear();
  const now = new Date().toUTCString();
  const isNight = nightSurcharge > 0;

  return `<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="UTF-8"/>
<meta name="viewport" content="width=device-width,initial-scale=1"/>
<title>New Booking — ${bookingRef}</title>
</head>
<body style="margin:0;padding:0;background:#f1f3f5;font-family:'Helvetica Neue',Helvetica,Arial,sans-serif;">

<table width="100%" cellpadding="0" cellspacing="0" style="background:#f1f3f5;padding:40px 0 60px;">
<tr><td align="center">
<table width="640" cellpadding="0" cellspacing="0" style="max-width:640px;width:100%;">

  <!-- ═══ TOP ALERT HEADER ═══ -->
  <tr><td style="background:#111827;border-radius:18px 18px 0 0;padding:0;overflow:hidden;">

    <!-- Colored urgency bar -->
    <div style="height:4px;background:linear-gradient(90deg,#16a34a,#4ade80,#16a34a);"></div>

    <table width="100%" cellpadding="0" cellspacing="0">
      <tr><td style="padding:24px 32px 20px;">
        <table width="100%" cellpadding="0" cellspacing="0"><tr>
          <td style="vertical-align:middle;">
            <div style="display:inline-block;background:rgba(74,222,128,0.15);border:1px solid rgba(74,222,128,0.3);border-radius:6px;padding:4px 12px;margin-bottom:10px;">
              <span style="font-size:10px;font-weight:700;letter-spacing:0.18em;text-transform:uppercase;color:#4ade80;">🚨 New Booking Alert</span>
            </div>
            <div style="font-size:24px;font-weight:800;color:#ffffff;margin-bottom:4px;">${name}</div>
            <div style="font-size:13px;color:rgba(255,255,255,0.45);">${email} &nbsp;·&nbsp; ${whatsapp} &nbsp;·&nbsp; ${country}</div>
          </td>
          <td style="text-align:right;vertical-align:middle;">
            <div style="background:rgba(201,163,71,0.1);border:1.5px solid rgba(201,163,71,0.35);border-radius:10px;padding:12px 20px;display:inline-block;">
              <div style="font-size:9px;font-weight:700;letter-spacing:0.15em;text-transform:uppercase;color:#c9a347;margin-bottom:4px;">Ref No.</div>
              <div style="font-size:20px;font-weight:900;color:#e8c97a;letter-spacing:0.1em;font-family:'Courier New',monospace;">${bookingRef}</div>
            </div>
          </td>
        </tr></table>
      </td></tr>
    </table>
  </td></tr>

  <!-- ═══ ROUTE + DATE BANNER ═══ -->
  <tr><td style="background:#1e293b;padding:18px 32px;">
    <table width="100%" cellpadding="0" cellspacing="0"><tr>
      <td>
        <div style="font-size:16px;font-weight:800;color:#fff;">
          ${fromName}
          <span style="color:#c9a347;margin:0 10px;">→</span>
          ${toName}
          ${isRoundTrip ? `<span style="display:inline-block;margin-left:8px;background:#7c2d12;color:#fed7aa;font-size:9px;font-weight:700;letter-spacing:0.1em;text-transform:uppercase;padding:3px 8px;border-radius:4px;">Round Trip</span>` : ""}
        </div>
      </td>
      <td style="text-align:right;white-space:nowrap;">
        <div style="font-size:14px;font-weight:700;color:#c9a347;">${date}</div>
        <div style="font-size:13px;color:rgba(255,255,255,0.5);">${time}${isNight ? " 🌙" : ""}</div>
      </td>
    </tr></table>
  </td></tr>

  <!-- ═══ KEY STATS ROW ═══ -->
  <tr><td style="background:#fff;padding:0;">
    <table width="100%" cellpadding="0" cellspacing="0">
      <tr>
        ${[
          { label: "Passengers", value: `${totalPax}`, sub: `${passengers} adult${passengers!==1?"s":""}${kids>0?` + ${kids} child${kids!==1?"ren":""}":""}` },
          { label: "Luggage", value: `${bags}`, sub: `bag${bags!==1?"s":""}` },
          { label: "Vehicle", value: vehicleName.split(" ").slice(0,2).join(" "), sub: vehicleModel.split(" ").slice(0,3).join(" ") },
          { label: "Total Fare", value: onDemand ? "On Demand" : `€${totalPrice}`, sub: paymentMethod === "cash" ? "💵 Cash" : "💳 Card" },
        ].map((s, i) => `
        <td style="text-align:center;padding:22px 12px;border-right:1px solid #f3f4f6;${i===3?"border-right:none;":""}">
          <div style="font-size:10px;font-weight:700;text-transform:uppercase;letter-spacing:0.1em;color:#9ca3af;margin-bottom:6px;">${s.label}</div>
          <div style="font-size:18px;font-weight:800;color:#111827;margin-bottom:3px;">${s.value}</div>
          <div style="font-size:11px;color:#9ca3af;">${s.sub}</div>
        </td>`).join("")}
      </tr>
    </table>
  </td></tr>

  <!-- ═══ FULL DETAILS TABLE ═══ -->
  <tr><td style="background:#fff;padding:0 0 0;border-top:2px solid #f3f4f6;">
    <table width="100%" cellpadding="0" cellspacing="0">

      <!-- Section: Booking Info -->
      <tr><td colspan="2" style="padding:16px 24px 8px;background:#f9fafb;border-top:1px solid #f3f4f6;border-bottom:1px solid #f3f4f6;">
        <span style="font-size:10px;font-weight:700;text-transform:uppercase;letter-spacing:0.15em;color:#6b7280;">📋 Booking Information</span>
      </td></tr>
      ${buildRow("Trip Type", isRoundTrip ? "🔄 Round Trip (×2 price)" : "→ One Way")}
      ${buildRow("Pickup Location", fromName)}
      ${buildRow("Drop-off Location", toName)}
      ${buildRow("Date", date)}
      ${buildRow("Pickup Time", time + (isNight ? "  🌙 Night surcharge applies" : ""))}
      ${buildRow("Adults", `${passengers}`)}
      ${kids > 0 ? buildRow("Children", `${kids}`) : ""}
      ${buildRow("Total Passengers", `${totalPax}`)}
      ${buildRow("Luggage Bags", `${bags}`)}
      ${flightTrain ? buildRow("Flight / Train No.", flightTrain, true) : ""}
      ${address ? buildRow("Address", address, true) : ""}

      <!-- Section: Vehicle -->
      <tr><td colspan="2" style="padding:16px 24px 8px;background:#f9fafb;border-top:1px solid #f3f4f6;border-bottom:1px solid #f3f4f6;">
        <span style="font-size:10px;font-weight:700;text-transform:uppercase;letter-spacing:0.15em;color:#6b7280;">🚘 Vehicle</span>
      </td></tr>
      ${buildRow("Vehicle Type", vehicleName)}
      ${buildRow("Model", vehicleModel)}

      <!-- Section: Fare -->
      <tr><td colspan="2" style="padding:16px 24px 8px;background:#f9fafb;border-top:1px solid #f3f4f6;border-bottom:1px solid #f3f4f6;">
        <span style="font-size:10px;font-weight:700;text-transform:uppercase;letter-spacing:0.15em;color:#6b7280;">💶 Fare</span>
      </td></tr>
      ${buildRow(`Base Fare${isRoundTrip ? " (×2 round trip)" : ""}`, onDemand ? "On Demand" : `€${basePrice}`)}
      ${isNight ? buildRow("🌙 Night Surcharge", `+€${nightSurcharge}`) : ""}
      <tr>
        <td style="padding:14px 24px;border-bottom:1px solid #f0f0f0;border-top:2px solid #111827;background:#f0fdf4;" width="40%">
          <span style="font-size:12px;font-weight:800;text-transform:uppercase;letter-spacing:0.08em;color:#15803d;">Total Charged</span>
        </td>
        <td style="padding:14px 24px;border-bottom:1px solid #f0f0f0;border-top:2px solid #111827;background:#f0fdf4;text-align:right;">
          <span style="font-size:22px;font-weight:900;color:#16a34a;">${onDemand ? "On Demand" : `€${totalPrice}`}</span>
        </td>
      </tr>
      ${buildRow("Payment Method", paymentMethod === "cash" ? "💵 Cash to driver" : "💳 Card to driver")}

      <!-- Section: Customer -->
      <tr><td colspan="2" style="padding:16px 24px 8px;background:#f9fafb;border-top:1px solid #f3f4f6;border-bottom:1px solid #f3f4f6;">
        <span style="font-size:10px;font-weight:700;text-transform:uppercase;letter-spacing:0.15em;color:#6b7280;">👤 Customer</span>
      </td></tr>
      ${buildRow("Full Name", name)}
      ${buildRow("Country", country)}
      ${buildRow("WhatsApp", whatsapp)}
      ${buildRow("Email", email)}
      ${notes ? buildRow("Special Requests", notes, true) : ""}

      <!-- Received at -->
      <tr><td colspan="2" style="padding:10px 24px;background:#fafafa;border-top:1px solid #f3f4f6;">
        <span style="font-size:10px;color:#d1d5db;">Received: ${now}</span>
      </td></tr>

    </table>
  </td></tr>

  <!-- ═══ ACTION BUTTONS ═══ -->
  <tr><td style="background:#fff;padding:20px 24px 28px;border-top:1px solid #f3f4f6;border-radius:0 0 18px 18px;">
    <table width="100%" cellpadding="0" cellspacing="0">
      <tr>
        <td style="padding-right:8px;">
          <a href="mailto:${email}?subject=Re:%20Your%20Paris%20Easy%20Move%20Booking%20${bookingRef}&body=Dear%20${encodeURIComponent(name)},%0A%0AThank%20you%20for%20booking%20with%20Paris%20Easy%20Move.%0A%0AYour%20booking%20reference%20is%20${bookingRef}.%0A%0A"
            style="display:block;text-align:center;padding:14px 20px;background:#111827;color:#fff;border-radius:10px;font-size:12px;font-weight:700;text-decoration:none;letter-spacing:0.05em;text-transform:uppercase;">
            ✉️ &nbsp;Reply to Client
          </a>
        </td>
        <td style="padding:0 8px;">
          <a href="https://wa.me/${whatsapp.replace(/\D/g, "")}"
            style="display:block;text-align:center;padding:14px 20px;background:#16a34a;color:#fff;border-radius:10px;font-size:12px;font-weight:700;text-decoration:none;letter-spacing:0.05em;text-transform:uppercase;">
            💬 &nbsp;WhatsApp Client
          </a>
        </td>
        <td style="padding-left:8px;">
          <a href="tel:${whatsapp.replace(/\D/g, "")}"
            style="display:block;text-align:center;padding:14px 20px;background:#2563eb;color:#fff;border-radius:10px;font-size:12px;font-weight:700;text-decoration:none;letter-spacing:0.05em;text-transform:uppercase;">
            📞 &nbsp;Call Client
          </a>
        </td>
      </tr>
    </table>
  </td></tr>

  <!-- ═══ FOOTER ═══ -->
  <tr><td style="padding:20px 0 0;text-align:center;">
    <p style="margin:0;font-size:11px;color:#9ca3af;">Paris Easy Move Admin System &nbsp;·&nbsp; booking@pariseasymove.com &nbsp;·&nbsp; Ref: <strong>${bookingRef}</strong></p>
  </td></tr>

</table>
</td></tr>
</table>

</body>
</html>`;
}

// ─── ROUTE HANDLER ────────────────────────────────────────────────────────────
export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const data = body as BookingEmailData;

    const customerHtml = buildCustomerEmail(data);
    const adminHtml    = buildAdminEmail(data);

    // ── OPTION A: Resend (recommended) ───────────────────────────────────────
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

    // ── OPTION B: Nodemailer SMTP ─────────────────────────────────────────────
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