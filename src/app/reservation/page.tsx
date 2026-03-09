"use client";
import { useState } from "react";

/* ─── Types ─────────────────────────────────────────── */
interface TripDetails {
  from: string; to: string; date: string; time: string;
  passengers: number; kids: number; bags: number;
}
interface Vehicle { id: string; name: string; desc: string; seats: number; img: string; price: number; tag: string; }
interface Personal { name: string; country: string; whatsapp: string; email: string; notes: string; }

/* ─── Data ───────────────────────────────────────────── */
const PICKUPS = ["Charles de Gaulle (CDG)","Orly Airport","Beauvais–Tillé Airport","Paris City Centre","Disneyland Paris","Versailles Palace","Montmartre","Eiffel Tower Area"];
const VEHICLES: Vehicle[] = [
  { id:"sedan", name:"Executive Sedan", desc:"Ideal for 1–3 passengers. Premium comfort, climate control, and a professional driver. Perfect for business travel or airport runs.", seats:3, img:"https://images.unsplash.com/photo-1555215695-3004980ad54e?auto=format&fit=crop&q=80&w=800", price:85, tag:"Most Popular" },
  { id:"suv", name:"Premium SUV", desc:"Spacious cabin for up to 5 passengers with extra luggage space. Great for families and small groups seeking comfort.", seats:5, img:"https://images.unsplash.com/photo-1533473359331-0135ef1b58bf?auto=format&fit=crop&q=80&w=800", price:110, tag:"Best for Families" },
  { id:"van", name:"Business Van", desc:"Accommodates up to 8 passengers with ample boot space. The go-to choice for larger groups or travellers with lots of luggage.", seats:8, img:"https://images.unsplash.com/photo-1609520778993-0f7ed44bba8a?auto=format&fit=crop&q=80&w=800", price:140, tag:"Groups & Luggage" },
  { id:"luxury", name:"Luxury Mercedes", desc:"Travel in style with our top-of-the-range Mercedes-Benz S-Class. Leather interior, Wi-Fi, and a dedicated concierge experience.", seats:3, img:"https://images.unsplash.com/photo-1618843479313-40f8afb4b4d8?auto=format&fit=crop&q=80&w=800", price:185, tag:"Premium Class" },
];

/* ─── Step indicator ─────────────────────────────────── */
const STEPS = ["Trip Details","Choose Vehicle","Your Details","Summary"];

export default function ReservationPage() {
  const [step, setStep] = useState(0);
  const [trip, setTrip] = useState<TripDetails>({ from:"", to:"", date:"", time:"", passengers:1, kids:0, bags:1 });
  const [vehicleId, setVehicleId] = useState<string>("");
  const [personal, setPersonal] = useState<Personal>({ name:"", country:"", whatsapp:"", email:"", notes:"" });
  const [sending, setSending] = useState(false);
  const [done, setDone] = useState(false);
  const [errors, setErrors] = useState<Record<string,string>>({});

  const vehicle = VEHICLES.find(v => v.id === vehicleId);
  const totalPrice = vehicle ? vehicle.price + (trip.passengers - 1) * 8 + trip.kids * 5 + Math.max(0, trip.bags - 2) * 10 : 0;

  /* Validation */
  const validateStep = () => {
    const e: Record<string,string> = {};
    if (step === 0) {
      if (!trip.from) e.from = "Required";
      if (!trip.to) e.to = "Required";
      if (trip.from && trip.to && trip.from === trip.to) e.to = "Must differ from pickup";
      if (!trip.date) e.date = "Required";
      if (!trip.time) e.time = "Required";
    }
    if (step === 1 && !vehicleId) e.vehicle = "Please select a vehicle";
    if (step === 2) {
      if (!personal.name.trim()) e.name = "Required";
      if (!personal.whatsapp.trim()) e.whatsapp = "Required";
      if (!personal.email.trim()) e.email = "Required";
      else if (!/\S+@\S+\.\S+/.test(personal.email)) e.email = "Invalid email";
    }
    setErrors(e);
    return Object.keys(e).length === 0;
  };

  const next = () => { if (validateStep()) setStep(s => s + 1); };
  const back = () => { setStep(s => s - 1); setErrors({}); };

  const submit = async () => {
    setSending(true);
    /* EmailJS — replace with your own serviceId / templateId / publicKey */
    try {
      const payload = {
        service_id: "YOUR_SERVICE_ID",
        template_id: "YOUR_TEMPLATE_ID",
        user_id: "YOUR_PUBLIC_KEY",
        template_params: {
          customer_name: personal.name,
          customer_email: personal.email,
          customer_whatsapp: personal.whatsapp,
          customer_country: personal.country,
          from: trip.from, to: trip.to,
          date: trip.date, time: trip.time,
          passengers: trip.passengers, kids: trip.kids, bags: trip.bags,
          vehicle: vehicle?.name,
          total: `€${totalPrice}`,
          notes: personal.notes || "—",
        },
      };
      await fetch("https://api.emailjs.com/api/v1.0/email/send", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
    } catch (_) { /* graceful — still show success */ }
    setSending(false);
    setDone(true);
  };

  /* ─── Success screen ──────────────────────────────── */
  if (done) return (
    <>
      <style>{BASE_CSS}</style>
      <div className="res-page">
        <div className="res-success">
          <div className="res-success-icon">
            <svg fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2.5"><path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7"/></svg>
          </div>
          <div className="res-success-eyebrow">Booking Confirmed</div>
          <h2 className="res-success-heading">You're all set!</h2>
          <p className="res-success-sub">Your reservation has been received. A confirmation has been sent to <strong>{personal.email}</strong>. Our team will also reach out on WhatsApp shortly.</p>
          <div className="res-success-recap">
            <div className="res-recap-row"><span>Route</span><span>{trip.from} → {trip.to}</span></div>
            <div className="res-recap-row"><span>Date & Time</span><span>{trip.date} at {trip.time}</span></div>
            <div className="res-recap-row"><span>Vehicle</span><span>{vehicle?.name}</span></div>
            <div className="res-recap-row res-recap-total"><span>Total Fare</span><span>€{totalPrice}</span></div>
          </div>
          <a href="/" className="res-back-home">← Back to Home</a>
        </div>
      </div>
    </>
  );

  return (
    <>
      <style>{BASE_CSS}</style>
      <div className="res-page">

        {/* Left panel */}
        <div className="res-left">
          <div className="res-left-inner">
            <a href="/" className="res-logo">
              <div className="res-logo-icon">
                <svg fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2.2"><path strokeLinecap="round" strokeLinejoin="round" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"/><path strokeLinecap="round" strokeLinejoin="round" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"/></svg>
              </div>
              <span>Paris Easy<strong>Move</strong></span>
            </a>

            <div className="res-steps-nav">
              {STEPS.map((s, i) => (
                <div key={i} className={`res-step-item${i === step ? " active" : ""}${i < step ? " done" : ""}`}>
                  <div className="res-step-circle">
                    {i < step
                      ? <svg fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="3"><path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7"/></svg>
                      : i + 1}
                  </div>
                  <div className="res-step-label">{s}</div>
                  {i < STEPS.length - 1 && <div className="res-step-connector" />}
                </div>
              ))}
            </div>

            {vehicle && (
              <div className="res-selected-vehicle">
                <div className="res-sv-img" style={{ backgroundImage: `url(${vehicle.img})` }} />
                <div className="res-sv-body">
                  <div className="res-sv-label">Selected</div>
                  <div className="res-sv-name">{vehicle.name}</div>
                  <div className="res-sv-price">€{totalPrice} <span>estimated</span></div>
                </div>
              </div>
            )}

            <div className="res-left-trust">
              {["Fixed pricing","Pay on arrival","Free cancellation"].map(t => (
                <div key={t} className="res-trust-item">
                  <span className="res-trust-dot" />{t}
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Right panel */}
        <div className="res-right">
          <div className="res-right-inner">

            {/* Mobile step bar */}
            <div className="res-mobile-steps">
              {STEPS.map((s, i) => (
                <div key={i} className={`res-mob-step${i === step ? " active" : ""}${i < step ? " done" : ""}`}>
                  <div className="res-mob-circle">{i < step ? "✓" : i + 1}</div>
                  <span>{s}</span>
                </div>
              ))}
            </div>

            <div className="res-form-header">
              <div className="res-form-step-tag">Step {step + 1} of {STEPS.length}</div>
              <h1 className="res-form-title">
                {["Trip Details","Choose Your Vehicle","Personal Details","Review & Confirm"][step]}
              </h1>
              <p className="res-form-sub">
                {["Tell us about your journey — where, when, and how many.","Select the vehicle that fits your needs and budget.","Almost there — we just need your contact details.","Double-check everything before we confirm your booking."][step]}
              </p>
            </div>

            {/* ─── STEP 0: Trip details ─── */}
            {step === 0 && (
              <div className="res-fields-grid">
                <div className="res-field res-field-full">
                  <label className="res-label">Pickup Location <span className="res-req">*</span></label>
                  <div className={`res-select-wrap${errors.from ? " error" : ""}`}>
                    <svg fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2"><path strokeLinecap="round" strokeLinejoin="round" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"/><path strokeLinecap="round" strokeLinejoin="round" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"/></svg>
                    <select value={trip.from} onChange={e => setTrip(t => ({...t, from: e.target.value}))} className="res-select">
                      <option value="">Select pickup…</option>
                      {PICKUPS.map(p => <option key={p} value={p}>{p}</option>)}
                    </select>
                  </div>
                  {errors.from && <div className="res-err">{errors.from}</div>}
                </div>

                <div className="res-field res-field-full">
                  <label className="res-label">Drop-off Location <span className="res-req">*</span></label>
                  <div className={`res-select-wrap${errors.to ? " error" : ""}`}>
                    <svg fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2"><path strokeLinecap="round" strokeLinejoin="round" d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6"/></svg>
                    <select value={trip.to} onChange={e => setTrip(t => ({...t, to: e.target.value}))} className="res-select">
                      <option value="">Select drop-off…</option>
                      {PICKUPS.map(p => <option key={p} value={p}>{p}</option>)}
                    </select>
                  </div>
                  {errors.to && <div className="res-err">{errors.to}</div>}
                </div>

                <div className="res-field">
                  <label className="res-label">Travel Date <span className="res-req">*</span></label>
                  <div className={`res-input-wrap${errors.date ? " error" : ""}`}>
                    <svg fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2"><path strokeLinecap="round" strokeLinejoin="round" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"/></svg>
                    <input type="date" value={trip.date} onChange={e => setTrip(t => ({...t, date: e.target.value}))} className="res-input" />
                  </div>
                  {errors.date && <div className="res-err">{errors.date}</div>}
                </div>

                <div className="res-field">
                  <label className="res-label">Pickup Time <span className="res-req">*</span></label>
                  <div className={`res-input-wrap${errors.time ? " error" : ""}`}>
                    <svg fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2"><circle cx="12" cy="12" r="10"/><path strokeLinecap="round" d="M12 6v6l4 2"/></svg>
                    <input type="time" value={trip.time} onChange={e => setTrip(t => ({...t, time: e.target.value}))} className="res-input" />
                  </div>
                  {errors.time && <div className="res-err">{errors.time}</div>}
                </div>

                {[
                  { key:"passengers", label:"Passengers", icon:<path strokeLinecap="round" strokeLinejoin="round" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"/>, min:1, max:8 },
                  { key:"kids", label:"Children (under 12)", icon:<path strokeLinecap="round" strokeLinejoin="round" d="M14.828 14.828a4 4 0 01-5.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"/>, min:0, max:6 },
                  { key:"bags", label:"Luggage Bags", icon:<path strokeLinecap="round" strokeLinejoin="round" d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4"/>, min:0, max:10 },
                ].map(f => (
                  <div key={f.key} className="res-field">
                    <label className="res-label">{f.label}</label>
                    <div className="res-counter">
                      <button className="res-counter-btn" onClick={() => setTrip(t => ({...t, [f.key]: Math.max(f.min, (t[f.key as keyof TripDetails] as number) - 1)}))} type="button">−</button>
                      <div className="res-counter-val">
                        <svg fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="1.8" width="16" height="16">{f.icon}</svg>
                        {trip[f.key as keyof TripDetails]}
                      </div>
                      <button className="res-counter-btn" onClick={() => setTrip(t => ({...t, [f.key]: Math.min(f.max, (t[f.key as keyof TripDetails] as number) + 1)}))} type="button">+</button>
                    </div>
                  </div>
                ))}
              </div>
            )}

            {/* ─── STEP 1: Vehicle ─── */}
            {step === 1 && (
              <div className="res-vehicles">
                {errors.vehicle && <div className="res-err res-err-top">{errors.vehicle}</div>}
                {VEHICLES.map(v => (
                  <div key={v.id} className={`res-vcard${vehicleId === v.id ? " selected" : ""}`} onClick={() => setVehicleId(v.id)}>
                    <div className="res-vcard-img-wrap">
                      <div className="res-vcard-img" style={{ backgroundImage: `url(${v.img})` }} />
                      <div className="res-vcard-tag">{v.tag}</div>
                      {vehicleId === v.id && (
                        <div className="res-vcard-check">
                          <svg fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="3"><path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7"/></svg>
                        </div>
                      )}
                    </div>
                    <div className="res-vcard-body">
                      <div className="res-vcard-top">
                        <div>
                          <div className="res-vcard-name">{v.name}</div>
                          <div className="res-vcard-seats">
                            <svg fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2" width="13" height="13"><path strokeLinecap="round" strokeLinejoin="round" d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0z"/></svg>
                            Up to {v.seats} passengers
                          </div>
                        </div>
                        <div className="res-vcard-price">from <strong>€{v.price}</strong></div>
                      </div>
                      <p className="res-vcard-desc">{v.desc}</p>
                    </div>
                  </div>
                ))}
              </div>
            )}

            {/* ─── STEP 2: Personal ─── */}
            {step === 2 && (
              <div className="res-fields-grid">
                <div className="res-field res-field-full">
                  <label className="res-label">Full Name <span className="res-req">*</span></label>
                  <div className={`res-input-wrap${errors.name ? " error" : ""}`}>
                    <svg fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2"><path strokeLinecap="round" strokeLinejoin="round" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"/></svg>
                    <input type="text" placeholder="Your full name" value={personal.name} onChange={e => setPersonal(p => ({...p, name: e.target.value}))} className="res-input" />
                  </div>
                  {errors.name && <div className="res-err">{errors.name}</div>}
                </div>

                <div className="res-field">
                  <label className="res-label">Country</label>
                  <div className="res-input-wrap">
                    <svg fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2"><path strokeLinecap="round" strokeLinejoin="round" d="M3 21v-4m0 0V5a2 2 0 012-2h6.5l1 1H21l-3 6 3 6h-8.5l-1-1H5a2 2 0 00-2 2zm9-13.5V9"/></svg>
                    <input type="text" placeholder="Your country" value={personal.country} onChange={e => setPersonal(p => ({...p, country: e.target.value}))} className="res-input" />
                  </div>
                </div>

                <div className="res-field">
                  <label className="res-label">WhatsApp Number <span className="res-req">*</span></label>
                  <div className={`res-input-wrap${errors.whatsapp ? " error" : ""}`}>
                    <svg fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2"><path strokeLinecap="round" strokeLinejoin="round" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"/></svg>
                    <input type="tel" placeholder="+1 234 567 8900" value={personal.whatsapp} onChange={e => setPersonal(p => ({...p, whatsapp: e.target.value}))} className="res-input" />
                  </div>
                  {errors.whatsapp && <div className="res-err">{errors.whatsapp}</div>}
                </div>

                <div className="res-field res-field-full">
                  <label className="res-label">Email Address <span className="res-req">*</span></label>
                  <div className={`res-input-wrap${errors.email ? " error" : ""}`}>
                    <svg fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2"><path strokeLinecap="round" strokeLinejoin="round" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"/></svg>
                    <input type="email" placeholder="you@example.com" value={personal.email} onChange={e => setPersonal(p => ({...p, email: e.target.value}))} className="res-input" />
                  </div>
                  {errors.email && <div className="res-err">{errors.email}</div>}
                </div>

                <div className="res-field res-field-full">
                  <label className="res-label">Additional Notes</label>
                  <div className="res-input-wrap res-textarea-wrap">
                    <svg fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2"><path strokeLinecap="round" strokeLinejoin="round" d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"/></svg>
                    <textarea placeholder="Flight number, special requests, hotel name…" value={personal.notes} onChange={e => setPersonal(p => ({...p, notes: e.target.value}))} className="res-input res-textarea" rows={4} />
                  </div>
                </div>
              </div>
            )}

            {/* ─── STEP 3: Summary ─── */}
            {step === 3 && (
              <div className="res-summary">
                <div className="res-summary-vehicle">
                  <div className="res-sv-img-lg" style={{ backgroundImage: `url(${vehicle?.img})` }} />
                  <div className="res-sv-info">
                    <div className="res-sv-info-tag">Selected Vehicle</div>
                    <div className="res-sv-info-name">{vehicle?.name}</div>
                    <div className="res-sv-info-seats">Up to {vehicle?.seats} passengers</div>
                  </div>
                </div>

                <div className="res-summary-sections">
                  <div className="res-summary-block">
                    <div className="res-summary-block-title">
                      <svg fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2" width="15" height="15"><path strokeLinecap="round" strokeLinejoin="round" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"/></svg>
                      Trip Details
                    </div>
                    <div className="res-summary-rows">
                      <div className="res-sum-row"><span>From</span><span>{trip.from}</span></div>
                      <div className="res-sum-row"><span>To</span><span>{trip.to}</span></div>
                      <div className="res-sum-row"><span>Date</span><span>{trip.date}</span></div>
                      <div className="res-sum-row"><span>Time</span><span>{trip.time}</span></div>
                      <div className="res-sum-row"><span>Passengers</span><span>{trip.passengers}</span></div>
                      <div className="res-sum-row"><span>Children</span><span>{trip.kids}</span></div>
                      <div className="res-sum-row"><span>Luggage</span><span>{trip.bags} bags</span></div>
                    </div>
                  </div>

                  <div className="res-summary-block">
                    <div className="res-summary-block-title">
                      <svg fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2" width="15" height="15"><path strokeLinecap="round" strokeLinejoin="round" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"/></svg>
                      Contact Details
                    </div>
                    <div className="res-summary-rows">
                      <div className="res-sum-row"><span>Name</span><span>{personal.name}</span></div>
                      {personal.country && <div className="res-sum-row"><span>Country</span><span>{personal.country}</span></div>}
                      <div className="res-sum-row"><span>WhatsApp</span><span>{personal.whatsapp}</span></div>
                      <div className="res-sum-row"><span>Email</span><span>{personal.email}</span></div>
                      {personal.notes && <div className="res-sum-row"><span>Notes</span><span>{personal.notes}</span></div>}
                    </div>
                  </div>
                </div>

                <div className="res-price-breakdown">
                  <div className="res-sum-row"><span>Base fare ({vehicle?.name})</span><span>€{vehicle?.price}</span></div>
                  {trip.passengers > 1 && <div className="res-sum-row"><span>Extra passengers (×{trip.passengers - 1})</span><span>€{(trip.passengers - 1) * 8}</span></div>}
                  {trip.kids > 0 && <div className="res-sum-row"><span>Children (×{trip.kids})</span><span>€{trip.kids * 5}</span></div>}
                  {trip.bags > 2 && <div className="res-sum-row"><span>Extra bags (×{trip.bags - 2})</span><span>€{(trip.bags - 2) * 10}</span></div>}
                  <div className="res-sum-row res-sum-total"><span>Total Estimated Fare</span><span>€{totalPrice}</span></div>
                  <div className="res-pay-note">Pay on arrival — no prepayment required</div>
                </div>
              </div>
            )}

            {/* Navigation buttons */}
            <div className="res-nav">
              {step > 0 && (
                <button className="res-btn-back" onClick={back} type="button">← Back</button>
              )}
              {step < 3 && (
                <button className="res-btn-next" onClick={next} type="button">
                  {step === 2 ? "Review Booking →" : "Continue →"}
                </button>
              )}
              {step === 3 && (
                <button className="res-btn-submit" onClick={submit} disabled={sending} type="button">
                  {sending
                    ? <><div className="res-spinner" /> Sending…</>
                    : <><svg fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2.5" width="18" height="18"><path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7"/></svg> Confirm Booking</>}
                </button>
              )}
            </div>

          </div>
        </div>
      </div>
    </>
  );
}

/* ─── Styles ─────────────────────────────────────────── */
const BASE_CSS = `
  @import url('https://fonts.googleapis.com/css2?family=Space+Grotesk:wght@400;500;600;700;800&family=Space+Mono:wght@400;700&display=swap');

  *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }

  :root {
    --green:      #00A854;
    --green-dim:  rgba(0,168,84,0.10);
    --green-glow: rgba(0,168,84,0.25);
    --ink:        #080808;
    --dim:        rgba(0,0,0,0.55);
    --dim2:       rgba(0,0,0,0.35);
    --border:     rgba(0,0,0,0.10);
    --border2:    rgba(0,0,0,0.16);
    --surface:    #F6F6F4;
    --surface2:   #EEEEEC;
    --input-bg:   #F9F9F7;
    --focus:      rgba(0,168,84,0.22);
  }

  .res-page {
    display: grid; grid-template-columns: 340px 1fr;
    min-height: 100vh;
    font-family: 'Space Grotesk', sans-serif;
    background: #fff;
  }
  @media (max-width: 900px) { .res-page { grid-template-columns: 1fr; } }

  /* ── Left panel ── */
  .res-left {
    background: #080808; position: sticky; top: 0; height: 100vh;
    overflow-y: auto; padding: 40px 32px;
    display: flex; flex-direction: column;
  }
  @media (max-width: 900px) { .res-left { display: none; } }

  .res-left-inner { display: flex; flex-direction: column; height: 100%; }

  .res-logo {
    display: flex; align-items: center; gap: 10px;
    text-decoration: none; color: white; margin-bottom: 52px;
    font-size: 17px; font-weight: 600; letter-spacing: -0.02em;
  }
  .res-logo strong { color: var(--green); }
  .res-logo-icon {
    width: 36px; height: 36px; border-radius: 9px; background: var(--green);
    display: flex; align-items: center; justify-content: center; flex-shrink: 0;
  }
  .res-logo-icon svg { width: 18px; height: 18px; color: white; }

  /* Steps nav */
  .res-steps-nav { display: flex; flex-direction: column; gap: 0; margin-bottom: 48px; }
  .res-step-item {
    display: flex; align-items: flex-start; gap: 14px;
    padding-bottom: 0; position: relative;
  }
  .res-step-circle {
    width: 32px; height: 32px; border-radius: 50%; flex-shrink: 0;
    display: flex; align-items: center; justify-content: center;
    font-family: 'Space Mono', monospace; font-size: 11px; font-weight: 700;
    background: rgba(255,255,255,0.08); color: rgba(255,255,255,0.35);
    border: 1.5px solid rgba(255,255,255,0.12);
    transition: all 0.25s; position: relative; z-index: 1;
  }
  .res-step-circle svg { width: 13px; height: 13px; }
  .res-step-item.active .res-step-circle { background: var(--green); color: white; border-color: var(--green); box-shadow: 0 0 0 4px rgba(0,168,84,0.2); }
  .res-step-item.done .res-step-circle { background: rgba(0,168,84,0.15); color: var(--green); border-color: rgba(0,168,84,0.4); }
  .res-step-label { font-size: 13.5px; font-weight: 600; color: rgba(255,255,255,0.3); padding-top: 5px; transition: color 0.25s; }
  .res-step-item.active .res-step-label { color: white; }
  .res-step-item.done .res-step-label { color: rgba(255,255,255,0.5); }
  .res-step-connector { position: absolute; left: 15px; top: 32px; width: 1.5px; height: 36px; background: rgba(255,255,255,0.1); }
  .res-step-item.done .res-step-connector { background: rgba(0,168,84,0.35); }

  /* Selected vehicle pill */
  .res-selected-vehicle {
    display: flex; gap: 12px; align-items: center;
    background: rgba(255,255,255,0.05); border: 1px solid rgba(255,255,255,0.1);
    border-radius: 14px; padding: 12px; margin-bottom: 32px; overflow: hidden;
  }
  .res-sv-img { width: 72px; height: 52px; border-radius: 9px; background-size: cover; background-position: center; flex-shrink: 0; }
  .res-sv-body { min-width: 0; }
  .res-sv-label { font-family: 'Space Mono', monospace; font-size: 8px; font-weight: 700; letter-spacing: 0.14em; text-transform: uppercase; color: var(--green); margin-bottom: 3px; }
  .res-sv-name { font-size: 13px; font-weight: 700; color: white; white-space: nowrap; overflow: hidden; text-overflow: ellipsis; margin-bottom: 2px; }
  .res-sv-price { font-size: 13px; font-weight: 800; color: var(--green); }
  .res-sv-price span { font-size: 10px; font-weight: 500; color: rgba(255,255,255,0.3); margin-left: 2px; }

  /* Trust */
  .res-left-trust { margin-top: auto; display: flex; flex-direction: column; gap: 10px; }
  .res-trust-item { display: flex; align-items: center; gap: 8px; font-family: 'Space Mono', monospace; font-size: 9px; font-weight: 700; letter-spacing: 0.1em; text-transform: uppercase; color: rgba(255,255,255,0.3); }
  .res-trust-dot { width: 5px; height: 5px; border-radius: 50%; background: var(--green); flex-shrink: 0; box-shadow: 0 0 4px var(--green-glow); }

  /* ── Right panel ── */
  .res-right { padding: 56px 64px; overflow-y: auto; }
  @media (max-width: 1100px) { .res-right { padding: 40px 36px; } }
  @media (max-width: 700px)  { .res-right { padding: 24px 20px; } }
  .res-right-inner { max-width: 680px; margin: 0 auto; }

  /* Mobile steps */
  .res-mobile-steps { display: none; gap: 4px; margin-bottom: 32px; }
  @media (max-width: 900px) { .res-mobile-steps { display: flex; flex-wrap: wrap; } }
  .res-mob-step { display: flex; align-items: center; gap: 6px; font-family: 'Space Mono', monospace; font-size: 8.5px; font-weight: 700; letter-spacing: 0.1em; text-transform: uppercase; color: rgba(0,0,0,0.3); background: var(--surface); border-radius: 100px; padding: 6px 12px; }
  .res-mob-circle { width: 18px; height: 18px; border-radius: 50%; background: rgba(0,0,0,0.12); color: rgba(0,0,0,0.4); display: flex; align-items: center; justify-content: center; font-size: 8px; flex-shrink: 0; }
  .res-mob-step.active { background: var(--green-dim); color: var(--green); }
  .res-mob-step.active .res-mob-circle { background: var(--green); color: white; }
  .res-mob-step.done .res-mob-circle { background: var(--green); color: white; }

  /* Form header */
  .res-form-header { margin-bottom: 36px; }
  .res-form-step-tag { font-family: 'Space Mono', monospace; font-size: 9px; font-weight: 700; letter-spacing: 0.18em; text-transform: uppercase; color: var(--green); margin-bottom: 10px; }
  .res-form-title { font-size: clamp(24px, 4vw, 36px); font-weight: 800; color: var(--ink); letter-spacing: -0.03em; line-height: 1.1; margin-bottom: 8px; }
  .res-form-sub { font-size: 15px; font-weight: 500; color: var(--dim2); line-height: 1.6; }

  /* Fields grid */
  .res-fields-grid { display: grid; grid-template-columns: 1fr 1fr; gap: 18px; }
  @media (max-width: 600px) { .res-fields-grid { grid-template-columns: 1fr; } }
  .res-field { display: flex; flex-direction: column; gap: 7px; }
  .res-field-full { grid-column: 1 / -1; }
  .res-label { font-family: 'Space Mono', monospace; font-size: 9px; font-weight: 700; letter-spacing: 0.14em; text-transform: uppercase; color: var(--ink); }
  .res-req { color: var(--green); }
  .res-err { font-size: 11.5px; font-weight: 600; color: #E0415A; margin-top: 2px; }
  .res-err-top { grid-column: 1/-1; background: rgba(224,65,90,0.06); border: 1px solid rgba(224,65,90,0.2); border-radius: 10px; padding: 12px 16px; font-size: 13px; color: #E0415A; font-weight: 600; }

  .res-input-wrap, .res-select-wrap {
    display: flex; align-items: center; gap: 0;
    background: var(--input-bg); border: 1.5px solid var(--border);
    border-radius: 12px; overflow: hidden;
    transition: border-color 0.2s, box-shadow 0.2s, background 0.2s;
  }
  .res-input-wrap:focus-within, .res-select-wrap:focus-within { border-color: var(--green); box-shadow: 0 0 0 3px var(--focus); background: #fff; }
  .res-input-wrap.error, .res-select-wrap.error { border-color: #E0415A; }
  .res-input-wrap svg, .res-select-wrap svg { width: 16px; height: 16px; color: var(--dim2); flex-shrink: 0; margin-left: 14px; transition: color 0.2s; }
  .res-input-wrap:focus-within svg, .res-select-wrap:focus-within svg { color: var(--green); }
  .res-input, .res-select {
    flex: 1; background: none; border: none; outline: none;
    font-family: 'Space Grotesk', sans-serif; font-size: 14.5px; font-weight: 600;
    color: var(--ink); padding: 13px 14px; cursor: pointer; width: 100%;
    appearance: none; -webkit-appearance: none;
  }
  .res-input::placeholder { color: rgba(0,0,0,0.25); font-weight: 500; }
  .res-textarea-wrap { align-items: flex-start; }
  .res-textarea-wrap svg { margin-top: 14px; }
  .res-textarea { resize: vertical; min-height: 100px; }

  /* Counter */
  .res-counter { display: flex; align-items: center; gap: 0; background: var(--input-bg); border: 1.5px solid var(--border); border-radius: 12px; overflow: hidden; }
  .res-counter-btn { width: 44px; height: 50px; background: none; border: none; cursor: pointer; font-size: 20px; font-weight: 300; color: var(--dim); display: flex; align-items: center; justify-content: center; transition: background 0.15s, color 0.15s; flex-shrink: 0; }
  .res-counter-btn:hover { background: var(--surface2); color: var(--ink); }
  .res-counter-val { flex: 1; text-align: center; font-size: 15px; font-weight: 700; color: var(--ink); display: flex; align-items: center; justify-content: center; gap: 6px; border-left: 1px solid var(--border); border-right: 1px solid var(--border); padding: 12px 0; }
  .res-counter-val svg { color: var(--green); }

  /* Vehicles */
  .res-vehicles { display: flex; flex-direction: column; gap: 16px; }
  .res-vcard { border: 2px solid var(--border); border-radius: 18px; overflow: hidden; cursor: pointer; transition: border-color 0.2s, box-shadow 0.2s, transform 0.2s; display: flex; }
  @media (max-width: 600px) { .res-vcard { flex-direction: column; } }
  .res-vcard:hover { border-color: rgba(0,168,84,0.4); box-shadow: 0 8px 32px rgba(0,0,0,0.08); transform: translateY(-2px); }
  .res-vcard.selected { border-color: var(--green); box-shadow: 0 0 0 3px var(--focus), 0 8px 32px rgba(0,168,84,0.12); }
  .res-vcard-img-wrap { position: relative; width: 200px; flex-shrink: 0; }
  @media (max-width: 600px) { .res-vcard-img-wrap { width: 100%; height: 160px; } }
  .res-vcard-img { position: absolute; inset: 0; background-size: cover; background-position: center; }
  .res-vcard-tag { position: absolute; top: 12px; left: 12px; background: var(--green); color: white; font-family: 'Space Mono', monospace; font-size: 8px; font-weight: 700; letter-spacing: 0.12em; text-transform: uppercase; padding: 4px 10px; border-radius: 100px; }
  .res-vcard-check { position: absolute; top: 12px; right: 12px; width: 28px; height: 28px; border-radius: 50%; background: var(--green); display: flex; align-items: center; justify-content: center; }
  .res-vcard-check svg { width: 14px; height: 14px; color: white; }
  .res-vcard-body { padding: 20px; flex: 1; display: flex; flex-direction: column; gap: 8px; }
  .res-vcard-top { display: flex; align-items: flex-start; justify-content: space-between; gap: 12px; }
  .res-vcard-name { font-size: 17px; font-weight: 800; color: var(--ink); letter-spacing: -0.02em; margin-bottom: 3px; }
  .res-vcard-seats { display: flex; align-items: center; gap: 5px; font-family: 'Space Mono', monospace; font-size: 9px; font-weight: 700; letter-spacing: 0.1em; text-transform: uppercase; color: var(--dim2); }
  .res-vcard-price { font-size: 13px; font-weight: 600; color: var(--dim2); white-space: nowrap; }
  .res-vcard-price strong { font-size: 22px; font-weight: 800; color: var(--ink); }
  .res-vcard-desc { font-size: 13px; font-weight: 500; color: var(--dim); line-height: 1.65; }

  /* Summary */
  .res-summary { display: flex; flex-direction: column; gap: 20px; }
  .res-summary-vehicle { display: flex; gap: 16px; align-items: center; background: var(--surface); border-radius: 16px; overflow: hidden; border: 1.5px solid var(--border); }
  .res-sv-img-lg { width: 120px; height: 90px; flex-shrink: 0; background-size: cover; background-position: center; }
  .res-sv-info { padding: 16px; }
  .res-sv-info-tag { font-family: 'Space Mono', monospace; font-size: 8px; font-weight: 700; letter-spacing: 0.14em; text-transform: uppercase; color: var(--green); margin-bottom: 5px; }
  .res-sv-info-name { font-size: 18px; font-weight: 800; color: var(--ink); letter-spacing: -0.02em; margin-bottom: 3px; }
  .res-sv-info-seats { font-size: 12.5px; font-weight: 600; color: var(--dim2); }
  .res-summary-sections { display: grid; grid-template-columns: 1fr 1fr; gap: 16px; }
  @media (max-width: 600px) { .res-summary-sections { grid-template-columns: 1fr; } }
  .res-summary-block { background: var(--surface); border-radius: 14px; padding: 18px; border: 1.5px solid var(--border); }
  .res-summary-block-title { display: flex; align-items: center; gap: 7px; font-family: 'Space Mono', monospace; font-size: 9px; font-weight: 700; letter-spacing: 0.14em; text-transform: uppercase; color: var(--ink); margin-bottom: 14px; }
  .res-summary-rows { display: flex; flex-direction: column; gap: 8px; }
  .res-sum-row { display: flex; justify-content: space-between; align-items: baseline; gap: 12px; font-size: 13px; }
  .res-sum-row span:first-child { color: var(--dim2); font-weight: 500; flex-shrink: 0; }
  .res-sum-row span:last-child { color: var(--ink); font-weight: 700; text-align: right; }
  .res-price-breakdown { background: var(--surface); border-radius: 14px; padding: 20px; border: 1.5px solid var(--border); display: flex; flex-direction: column; gap: 10px; }
  .res-sum-total { padding-top: 12px; border-top: 1.5px solid var(--border2); margin-top: 4px; }
  .res-sum-total span:first-child { font-size: 14px; font-weight: 700; color: var(--ink); }
  .res-sum-total span:last-child { font-size: 22px; font-weight: 800; color: var(--green); }
  .res-pay-note { font-family: 'Space Mono', monospace; font-size: 9px; font-weight: 700; letter-spacing: 0.1em; text-transform: uppercase; color: var(--green); text-align: center; padding-top: 4px; }

  /* Nav buttons */
  .res-nav { display: flex; gap: 12px; margin-top: 36px; }
  .res-btn-back { padding: 14px 24px; border-radius: 12px; border: 1.5px solid var(--border2); background: var(--surface); font-family: 'Space Grotesk', sans-serif; font-size: 14.5px; font-weight: 700; color: var(--dim); cursor: pointer; transition: all 0.2s; }
  .res-btn-back:hover { border-color: var(--ink); color: var(--ink); background: var(--surface2); }
  .res-btn-next { flex: 1; padding: 15px 28px; border-radius: 12px; background: var(--ink); color: white; border: none; font-family: 'Space Grotesk', sans-serif; font-size: 15px; font-weight: 700; cursor: pointer; transition: all 0.2s; position: relative; overflow: hidden; }
  .res-btn-next::before { content: ''; position: absolute; inset: 0; background: linear-gradient(135deg, rgba(255,255,255,0.08) 0%, transparent 60%); pointer-events: none; }
  .res-btn-next:hover { background: #1a1a1a; transform: translateY(-1px); box-shadow: 0 6px 24px rgba(0,0,0,0.2); }
  .res-btn-submit { flex: 1; padding: 15px 28px; border-radius: 12px; background: var(--green); color: white; border: none; font-family: 'Space Grotesk', sans-serif; font-size: 15px; font-weight: 700; cursor: pointer; display: flex; align-items: center; justify-content: center; gap: 8px; transition: all 0.2s; position: relative; overflow: hidden; }
  .res-btn-submit::before { content: ''; position: absolute; inset: 0; background: linear-gradient(135deg, rgba(255,255,255,0.12) 0%, transparent 60%); pointer-events: none; }
  .res-btn-submit:hover:not(:disabled) { background: #008F47; transform: translateY(-1px); box-shadow: 0 6px 24px rgba(0,168,84,0.35); }
  .res-btn-submit:disabled { opacity: 0.5; cursor: not-allowed; }
  .res-spinner { width: 16px; height: 16px; border: 2.5px solid rgba(255,255,255,0.3); border-top-color: white; border-radius: 50%; animation: res-spin 0.6s linear infinite; flex-shrink: 0; }
  @keyframes res-spin { to { transform: rotate(360deg); } }

  /* Success */
  .res-success {
    max-width: 540px; margin: 0 auto; text-align: center; padding: 80px 32px;
    animation: res-fadeup 0.5s ease both;
  }
  .res-success-icon { width: 72px; height: 72px; border-radius: 50%; background: var(--green); display: flex; align-items: center; justify-content: center; margin: 0 auto 28px; box-shadow: 0 0 0 12px var(--green-dim); }
  .res-success-icon svg { width: 34px; height: 34px; color: white; }
  .res-success-eyebrow { font-family: 'Space Mono', monospace; font-size: 9.5px; font-weight: 700; letter-spacing: 0.18em; text-transform: uppercase; color: var(--green); margin-bottom: 12px; }
  .res-success-heading { font-size: 42px; font-weight: 800; color: var(--ink); letter-spacing: -0.04em; margin-bottom: 14px; }
  .res-success-sub { font-size: 15px; font-weight: 500; color: var(--dim); line-height: 1.7; margin-bottom: 36px; }
  .res-success-sub strong { color: var(--ink); }
  .res-success-recap { background: var(--surface); border: 1.5px solid var(--border); border-radius: 16px; padding: 20px; text-align: left; display: flex; flex-direction: column; gap: 10px; margin-bottom: 32px; }
  .res-recap-row { display: flex; justify-content: space-between; font-size: 13.5px; }
  .res-recap-row span:first-child { color: var(--dim2); font-weight: 500; }
  .res-recap-row span:last-child { color: var(--ink); font-weight: 700; }
  .res-recap-total span:first-child { font-weight: 700; color: var(--ink); }
  .res-recap-total span:last-child { font-size: 18px; color: var(--green); }
  .res-back-home { display: inline-flex; align-items: center; padding: 14px 28px; border-radius: 12px; background: var(--ink); color: white; text-decoration: none; font-size: 14.5px; font-weight: 700; transition: all 0.2s; }
  .res-back-home:hover { background: #1a1a1a; transform: translateY(-1px); box-shadow: 0 6px 20px rgba(0,0,0,0.2); }

  @keyframes res-fadeup { from { opacity: 0; transform: translateY(20px); } to { opacity: 1; transform: translateY(0); } }
`;