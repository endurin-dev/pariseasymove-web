"use client";

import { useState, useEffect } from "react";

interface TripDetails {
  fromId: string; toId: string;
  fromName: string; toName: string;
  date: string; time: string;
  passengers: number; kids: number; bags: number;
}
interface Vehicle {
  id: string; name: string; model: string;
  maxPassengers: number; maxLuggage: number;
  img: string; price: number; special?: string; tag?: string;
  active: boolean;
}
interface Location {
  id: string; name: string; categoryIcon: string; categoryName: string; active: boolean;
}
interface Rate {
  fromLocId: string; toLocId: string; vehicleId: string;
  price: number | null; onDemand: boolean; active: boolean;
}
interface Personal {
  name: string; country: string; whatsapp: string; email: string; notes: string;
}

const COUNTRIES = [
  "Afghanistan","Albania","Algeria","Andorra","Angola","Argentina","Armenia","Australia","Austria",
  "Azerbaijan","Bahrain","Bangladesh","Belarus","Belgium","Bolivia","Bosnia and Herzegovina","Brazil",
  "Bulgaria","Cambodia","Cameroon","Canada","Chile","China","Colombia","Croatia","Cuba","Cyprus",
  "Czech Republic","Denmark","Ecuador","Egypt","Estonia","Ethiopia","Finland","France","Georgia",
  "Germany","Ghana","Greece","Guatemala","Hungary","India","Indonesia","Iran","Iraq","Ireland",
  "Israel","Italy","Japan","Jordan","Kazakhstan","Kenya","Kuwait","Latvia","Lebanon","Libya",
  "Lithuania","Luxembourg","Malaysia","Mexico","Morocco","Netherlands","New Zealand","Nigeria",
  "Norway","Oman","Pakistan","Palestine","Peru","Philippines","Poland","Portugal","Qatar",
  "Romania","Russia","Saudi Arabia","Senegal","Serbia","Singapore","Slovakia","South Africa",
  "South Korea","Spain","Sri Lanka","Sweden","Switzerland","Syria","Taiwan","Thailand","Tunisia",
  "Turkey","Ukraine","United Arab Emirates","United Kingdom","United States","Uruguay",
  "Uzbekistan","Venezuela","Vietnam","Yemen",
];

const DEFAULT_LOCATIONS: Location[] = [
  { id:"l1", name:"Charles de Gaulle (CDG)", categoryIcon:"✈️", categoryName:"Airport",    active:true },
  { id:"l2", name:"Orly Airport",            categoryIcon:"✈️", categoryName:"Airport",    active:true },
  { id:"l4", name:"Paris City Centre",       categoryIcon:"🏙️", categoryName:"City",       active:true },
  { id:"l5", name:"Disneyland Paris",        categoryIcon:"🎡", categoryName:"Attraction", active:true },
];
const DEFAULT_VEHICLES: Vehicle[] = [
  { id:"sedan",   name:"BUSINESS CLASS CAR", model:"Mercedes-Benz E-Class or similar",  maxPassengers:3,  maxLuggage:2,  img:"/images/car.png", price:80,  tag:"Most Popular", active:true },
  { id:"van",     name:"BUSINESS CLASS VAN", model:"Mercedes-Benz V-Class or similar",  maxPassengers:8,  maxLuggage:8,  img:"/images/car.png", price:80,  tag:"Best for Groups", special:"Can accommodate your stroller", active:true },
  { id:"suv",     name:"LUXURY SUV",         model:"Mercedes-Benz GLE or similar",      maxPassengers:5,  maxLuggage:5,  img:"/images/car.png", price:110, tag:"Premium", active:true },
  { id:"minibus", name:"MINIBUS",            model:"Mercedes-Benz Sprinter or similar", maxPassengers:16, maxLuggage:16, img:"/images/car.png", price:150, tag:"Large Groups", special:"Can accommodate multiple strollers & wheelchairs", active:true },
];
const DEFAULT_FEATURES = ["Meet & Greet included","Door-to-door","Porter service","Free child seats & boosters"];

const STEPS = ["Trip Details","Choose Vehicle","Your Details","Summary"];
const GREEN = "#16a34a";
const AMBER = "#f59e0b";
const DARK  = "#111827";

function SummaryCard({ title, rows }: { title: string; rows: [string,string][] }) {
  return (
    <div style={{ border:"1px solid #e5e7eb", borderRadius:14, overflow:"hidden" }}>
      <div style={{ background:"#f9fafb", padding:"12px 20px", borderBottom:"1px solid #e5e7eb" }}>
        <span style={{ fontSize:13, fontWeight:700, color:DARK }}>{title}</span>
      </div>
      {rows.map(([label, value]) => (
        <div key={label} style={{ display:"flex", justifyContent:"space-between", alignItems:"flex-start", padding:"10px 20px", borderBottom:"1px solid #f3f4f6", fontSize:14 }}>
          <span style={{ color:"#6b7280", flexShrink:0 }}>{label}</span>
          <span style={{ fontWeight:600, color:DARK, textAlign:"right", marginLeft:16 }}>{value || "—"}</span>
        </div>
      ))}
    </div>
  );
}

export default function ReservationPage() {
  // ── Data from DB ─────────────────────────────────────────────
  const [locations, setLocations] = useState<Location[]>(DEFAULT_LOCATIONS);
  const [vehicles,  setVehicles]  = useState<Vehicle[]>(DEFAULT_VEHICLES);
  const [features,  setFeatures]  = useState<string[]>(DEFAULT_FEATURES);
  const [allRates,  setAllRates]  = useState<Rate[]>([]);
  const [dataReady, setDataReady] = useState(false);

  // ── Form state ───────────────────────────────────────────────
  const [step,      setStep]      = useState(0);
  const [trip,      setTrip]      = useState<TripDetails>({ fromId:"", toId:"", fromName:"", toName:"", date:"", time:"", passengers:1, kids:0, bags:1 });
  const [vehicleId, setVehicleId] = useState("");
  const [personal,  setPersonal]  = useState<Personal>({ name:"", country:"", whatsapp:"", email:"", notes:"" });
  const [sending,   setSending]   = useState(false);
  const [done,      setDone]      = useState(false);
  const [bookingRef,setBookingRef]= useState("");
  const [errors,    setErrors]    = useState<Record<string,string>>({});

  // ── Fetch all data on mount ───────────────────────────────────
  useEffect(() => {
    (async () => {
      try {
        const [lr, vr, fr, rr] = await Promise.all([
          fetch("/api/locations"),
          fetch("/api/vehicles"),
          fetch("/api/features"),
          fetch("/api/rates"),
        ]);
        if (lr.ok) { const d = await lr.json(); const a = d.filter((l:any)=>l.active); if (a.length) setLocations(a); }
        if (vr.ok) { const d = await vr.json(); const a = d.filter((v:any)=>v.active); if (a.length) setVehicles(a); }
        if (fr.ok) { const d = await fr.json(); const a = d.filter((f:any)=>f.active).map((f:any)=>f.text); if (a.length) setFeatures(a); }
        if (rr.ok) { const d = await rr.json(); setAllRates(d); }
      } catch { /* use defaults */ }
      finally { setDataReady(true); }
    })();
  }, []);

  // ── Get the rate for a specific route + vehicle ───────────────
  // Returns: { price: number, onDemand: false } | { price: null, onDemand: true } | null (no rate = not available)
  const getRate = (vId: string): { price: number | null; onDemand: boolean } | null => {
    if (!trip.fromId || !trip.toId) return null;
    const rate = allRates.find(r =>
      r.fromLocId === trip.fromId &&
      r.toLocId   === trip.toId   &&
      r.vehicleId === vId &&
      r.active
    );
    if (!rate) return null; // no rate = vehicle not available on this route
    return { price: rate.price, onDemand: rate.onDemand };
  };

  // ── Vehicles with route-aware price ──────────────────────────
  // Returns vehicles enriched with price from rates table.
  // If no rate exists for this route, the vehicle shows as unavailable.
  const vehiclesWithPrice = vehicles.map(v => {
    if (!trip.fromId || !trip.toId) {
      // No route selected yet — show default price from vehicle table
      return { ...v, routePrice: v.price, onDemand: false, noRate: false };
    }
    const rate = getRate(v.id);
    if (rate === null) {
      // No rate configured for this route+vehicle → hide it
      return { ...v, routePrice: null, onDemand: false, noRate: true };
    }
    return { ...v, routePrice: rate.price, onDemand: rate.onDemand, noRate: false };
  }).filter(v => !v.noRate); // hide vehicles with no rate for selected route

  // Price to use in summary/confirmation (from rate, not vehicle default)
  const vehicle = vehiclesWithPrice.find(v => v.id === vehicleId) ?? null;
  const confirmedPrice = vehicle?.routePrice ?? vehicle?.price ?? 0;

  // ── Reset vehicle selection if it's no longer available ──────
  useEffect(() => {
    if (vehicleId && trip.fromId && trip.toId) {
      const stillAvailable = vehiclesWithPrice.some(v => v.id === vehicleId);
      if (!stillAvailable) setVehicleId("");
    }
  }, [trip.fromId, trip.toId]);

  // ── Handlers ─────────────────────────────────────────────────
  const setFrom = (id: string) => {
    const l = locations.find(x => x.id === id);
    setTrip(t => ({ ...t, fromId:id, fromName:l?.name??"" }));
    setVehicleId(""); // reset vehicle when route changes
  };
  const setTo = (id: string) => {
    const l = locations.find(x => x.id === id);
    setTrip(t => ({ ...t, toId:id, toName:l?.name??"" }));
    setVehicleId(""); // reset vehicle when route changes
  };

  const validate = () => {
    const e: Record<string,string> = {};
    if (step===0) {
      if (!trip.fromId)  e.from="Required";
      if (!trip.toId)    e.to="Required";
      if (trip.fromId && trip.toId && trip.fromId===trip.toId) e.to="Must differ from pickup";
      if (!trip.date)    e.date="Required";
      if (!trip.time)    e.time="Required";
    }
    if (step===1 && !vehicleId) e.vehicle="Please select a vehicle";
    if (step===2) {
      if (!personal.name.trim())     e.name="Required";
      if (!personal.country.trim())  e.country="Required";
      if (!personal.whatsapp.trim()) e.whatsapp="Required";
      if (!personal.email.trim())    e.email="Required";
      else if (!/\S+@\S+\.\S+/.test(personal.email)) e.email="Invalid email";
    }
    setErrors(e);
    return Object.keys(e).length===0;
  };

  const next = () => { if (validate()) setStep(s=>s+1); };
  const back = () => { setStep(s=>s-1); setErrors({}); };

  const submit = async () => {
    setSending(true);
    try {
      const res = await fetch("/api/bookings", {
        method:"POST",
        headers:{"Content-Type":"application/json"},
        body: JSON.stringify({
          fromLocId:  trip.fromId,
          toLocId:    trip.toId,
          date:       trip.date,
          time:       trip.time,
          passengers: trip.passengers,
          kids:       trip.kids,
          bags:       trip.bags,
          vehicleId,
          name:       personal.name,
          country:    personal.country,
          whatsapp:   personal.whatsapp,
          email:      personal.email,
          notes:      personal.notes,
          status:     "new",
        }),
      });
      if (res.ok) {
        const b = await res.json();
        setBookingRef((b.id ?? "PEM-"+Date.now().toString(36)).toUpperCase());
        setDone(true);
      } else {
        alert("Something went wrong. Please try again.");
      }
    } catch {
      alert("Network error. Please try again.");
    } finally {
      setSending(false);
    }
  };

  // ── Style helpers ─────────────────────────────────────────────
  const S: Record<string,React.CSSProperties> = {
    label:  { fontSize:13, fontWeight:600, color:"#374151", marginBottom:6, display:"block" },
    input:  { width:"100%", border:"none", outline:"none", padding:"13px 14px", fontSize:14, background:"transparent", color:DARK, fontFamily:"inherit", boxSizing:"border-box" as const },
    select: { width:"100%", border:"none", outline:"none", padding:"13px 14px", fontSize:14, background:"transparent", color:DARK, appearance:"none" as const, cursor:"pointer", fontFamily:"inherit" },
  };
  const wrap = (e?: string): React.CSSProperties => ({ border:`1.5px solid ${e?"#dc2626":"#e5e7eb"}`, borderRadius:10, background:"#fff", display:"flex", alignItems:"center", overflow:"hidden" });
  const errEl = (m?: string) => m ? <div style={{ fontSize:12, color:"#dc2626", marginTop:4 }}>{m}</div> : null;
  const field = (c: React.ReactNode) => <div style={{ display:"flex", flexDirection:"column" }}>{c}</div>;
  const counter = (key:"passengers"|"kids"|"bags", min:number, max:number, label:string) => (
    <div style={{ display:"flex", flexDirection:"column", gap:6 }}>
      <label style={S.label}>{label}</label>
      <div style={{ display:"flex", border:"1.5px solid #e5e7eb", borderRadius:10, overflow:"hidden", background:"#fff" }}>
        <button type="button" onClick={()=>setTrip(t=>({...t,[key]:Math.max(min,t[key]-1)}))} style={{ width:48,height:48,fontSize:22,background:"none",border:"none",cursor:"pointer",color:"#6b7280" }}>−</button>
        <div style={{ flex:1,display:"flex",alignItems:"center",justifyContent:"center",fontWeight:700,fontSize:16,background:"#f9fafb" }}>{trip[key]}</div>
        <button type="button" onClick={()=>setTrip(t=>({...t,[key]:Math.min(max,t[key]+1)}))} style={{ width:48,height:48,fontSize:22,background:"none",border:"none",cursor:"pointer",color:"#6b7280" }}>+</button>
      </div>
    </div>
  );

  // ── DONE screen ───────────────────────────────────────────────
  if (done) return (
    <div style={{ display:"flex", alignItems:"center", justifyContent:"center", padding:40, background:"#f4f5f7", minHeight:"60vh" }}>
      <div style={{ maxWidth:520, width:"100%", background:"#fff", borderRadius:20, boxShadow:"0 8px 40px rgba(0,0,0,0.10)", padding:"48px 40px", textAlign:"center" }}>
        <div style={{ width:72,height:72,borderRadius:"50%",background:"#dcfce7",display:"flex",alignItems:"center",justifyContent:"center",margin:"0 auto 20px" }}>
          <svg width={36} height={36} fill="none" viewBox="0 0 24 24" stroke={GREEN} strokeWidth={2.5}><path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7"/></svg>
        </div>
        <h2 style={{ fontSize:28, fontWeight:800, color:DARK, marginBottom:10 }}>Booking Confirmed!</h2>
        <div style={{ display:"inline-block", background:"#f0fdf4", border:"1px solid #bbf7d0", color:GREEN, fontWeight:700, fontSize:13, padding:"5px 14px", borderRadius:8, marginBottom:12 }}>
          Ref: {bookingRef}
        </div>
        <p style={{ color:"#6b7280", marginBottom:28, fontSize:15 }}>Confirmation sent to <strong>{personal.email}</strong></p>
        <div style={{ background:"#f9fafb", borderRadius:12, padding:20, marginBottom:28, textAlign:"left" }}>
          {([
            ["Route",      `${trip.fromName} → ${trip.toName}`],
            ["Date & Time",`${trip.date} at ${trip.time}`],
            ["Vehicle",     vehicle?.name ?? "—"],
          ] as [string,string][]).map(([l,v])=>(
            <div key={l} style={{ display:"flex", justifyContent:"space-between", padding:"8px 0", borderBottom:"1px solid #e5e7eb", fontSize:14 }}>
              <span style={{ color:"#6b7280" }}>{l}</span>
              <span style={{ fontWeight:600, color:DARK }}>{v}</span>
            </div>
          ))}
          <div style={{ display:"flex", justifyContent:"space-between", paddingTop:12, fontSize:18, fontWeight:800 }}>
            <span>Total</span>
            <span style={{ color:GREEN }}>€{confirmedPrice}</span>
          </div>
        </div>
        <a href="/" style={{ display:"inline-block", padding:"14px 32px", background:DARK, color:"#fff", borderRadius:12, fontWeight:700, textDecoration:"none", fontSize:15 }}>← Back to Home</a>
      </div>
    </div>
  );

  // ── MAIN ──────────────────────────────────────────────────────
  return (
    <>
      <style>{`
        .rp{background:#f4f5f7;padding:40px 0 80px}
        .rp-inner{max-width:1280px;margin:0 auto;padding:0 24px;display:flex;gap:32px;align-items:flex-start}
        .rp-side{display:none}
        @media(min-width:1024px){.rp-side{display:flex;flex-direction:column;width:272px;min-width:272px;flex-shrink:0;background:#111827;color:#fff;border-radius:18px;padding:28px;position:sticky;top:108px}}
        .rp-body{flex:1;min-width:0}
        .rp-card{background:#fff;border-radius:18px;box-shadow:0 2px 24px rgba(0,0,0,0.08);padding:40px}
        @media(max-width:640px){.rp-card{padding:20px}.rp-inner{padding:0 12px}}
        .rp-grid{display:grid;grid-template-columns:1fr 1fr;gap:16px}
        @media(max-width:600px){.rp-grid{grid-template-columns:1fr}}
        .rp-input-wrap:focus-within{border-color:#16a34a!important;box-shadow:0 0 0 3px rgba(22,163,74,0.1)}
        .rp-step-active{background:#16a34a;border-color:#16a34a;color:#fff}
        .rp-step-done{background:rgba(74,222,128,0.15);border-color:#4ade80;color:#4ade80}
        .rp-step-idle{background:rgba(255,255,255,0.05);border-color:rgba(255,255,255,0.12);color:rgba(255,255,255,0.3)}
        .rp-vehicle{display:flex;border:2px solid #e5e7eb;border-radius:14px;overflow:hidden;cursor:pointer;background:#fff;transition:border-color .2s,box-shadow .2s}
        .rp-vehicle:hover:not(.exceeded){border-color:#f59e0b;box-shadow:0 4px 20px rgba(0,0,0,0.08)}
        .rp-vehicle.sel{border-color:#f59e0b;box-shadow:0 0 0 3px rgba(245,158,11,0.18)}
        .rp-vehicle.exceeded{opacity:.55;cursor:not-allowed}
        .rp-badge{display:inline-flex;align-items:center;padding:3px 9px;border-radius:6px;background:#f3f4f6;border:1px solid #e5e7eb;font-size:11px;color:#4b5563;font-weight:500;white-space:nowrap}
        .rp-btn-back{padding:14px 24px;border:2px solid #e5e7eb;border-radius:12px;font-size:15px;font-weight:600;color:#374151;background:#fff;cursor:pointer}
        .rp-btn-back:hover{background:#f9fafb}
        .rp-btn-next{flex:1;padding:14px 24px;border-radius:12px;font-size:15px;font-weight:700;color:#fff;background:#111827;border:none;cursor:pointer}
        .rp-btn-next:hover{background:#1f2937}
        .rp-btn-ok{flex:1;padding:14px 24px;border-radius:12px;font-size:15px;font-weight:700;color:#fff;background:#16a34a;border:none;cursor:pointer;display:flex;align-items:center;justify-content:center;gap:8px}
        .rp-btn-ok:hover:not(:disabled){background:#15803d}
        .rp-btn-ok:disabled{opacity:.55;cursor:not-allowed}
        .rp-pills{display:flex;flex-wrap:wrap;gap:8px;margin-bottom:20px}
        @media(min-width:1024px){.rp-pills{display:none}}
        @keyframes spin{to{transform:rotate(360deg)}}
        .rp-spin{width:18px;height:18px;border:2px solid rgba(255,255,255,.3);border-top-color:#fff;border-radius:50%;animation:spin .7s linear infinite}
        .rp-dots{display:inline-block;width:10px;height:10px;border:2px solid rgba(22,163,74,0.3);border-top-color:#16a34a;border-radius:50%;animation:spin .7s linear infinite;margin-left:8px;vertical-align:middle}
      `}</style>

      <div className="rp">
        <div className="rp-inner">

          {/* ── Sidebar ── */}
          <aside className="rp-side">
            <div style={{ display:"flex",flexDirection:"column",gap:10,marginBottom:28 }}>
              {STEPS.map((s,i)=>(
                <div key={s} style={{ display:"flex",alignItems:"center",gap:12 }}>
                  <div className={`rp-step-${i===step?"active":i<step?"done":"idle"}`}
                    style={{ width:30,height:30,borderRadius:"50%",border:"2px solid",display:"flex",alignItems:"center",justifyContent:"center",fontSize:12,fontWeight:700,flexShrink:0 }}>
                    {i<step?<svg width={13} height={13} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={3}><path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7"/></svg>:i+1}
                  </div>
                  <span style={{ fontSize:14,fontWeight:i===step?700:500,color:i===step?"#fff":i<step?"#4ade80":"rgba(255,255,255,.4)" }}>{s}</span>
                </div>
              ))}
            </div>

            {vehicle && (
              <div style={{ borderTop:"1px solid rgba(255,255,255,.1)",paddingTop:18,marginBottom:20 }}>
                <div style={{ fontSize:10,fontWeight:700,letterSpacing:"0.1em",textTransform:"uppercase",color:"#4ade80",marginBottom:10 }}>Selected Vehicle</div>
                <div style={{ display:"flex",gap:10,alignItems:"center" }}>
                  <img src={vehicle.img} alt={vehicle.name} style={{ width:60,height:42,borderRadius:7,objectFit:"cover",flexShrink:0 }}/>
                  <div>
                    <div style={{ fontSize:12,fontWeight:700 }}>{vehicle.name}</div>
                    <div style={{ fontSize:15,fontWeight:800,color:"#4ade80",marginTop:2 }}>
                      {vehicle.onDemand ? "On Demand" : `€${vehicle.routePrice ?? vehicle.price}`}
                    </div>
                  </div>
                </div>
              </div>
            )}

            {trip.fromName && trip.toName && (
              <div style={{ borderTop:"1px solid rgba(255,255,255,.08)",paddingTop:16,marginBottom:16 }}>
                <div style={{ fontSize:10,fontWeight:700,letterSpacing:"0.1em",textTransform:"uppercase",color:"rgba(255,255,255,.4)",marginBottom:8 }}>Route</div>
                <div style={{ fontSize:12,color:"rgba(255,255,255,.7)",lineHeight:1.8 }}>
                  <div>📍 {trip.fromName}</div>
                  <div style={{ color:"rgba(255,255,255,.3)",marginLeft:6 }}>↓</div>
                  <div>🏁 {trip.toName}</div>
                </div>
              </div>
            )}

            <div style={{ display:"flex",flexDirection:"column",gap:8,marginTop:"auto",paddingTop:16 }}>
              {["Fixed pricing","Pay on arrival","Free cancellation"].map(t=>(
                <div key={t} style={{ display:"flex",alignItems:"center",gap:8,fontSize:13,color:"rgba(255,255,255,.5)" }}>
                  <div style={{ width:6,height:6,borderRadius:"50%",background:GREEN,flexShrink:0 }}/>{t}
                </div>
              ))}
            </div>
          </aside>

          <main className="rp-body">
            <div className="rp-pills">
              {STEPS.map((s,i)=>(
                <div key={s} style={{ display:"flex",alignItems:"center",gap:6,padding:"5px 12px",borderRadius:999,fontSize:11,fontWeight:600,background:i===step?"#dcfce7":i<step?GREEN:"#e5e7eb",color:i===step?GREEN:i<step?"#fff":"#6b7280" }}>
                  {i<step?"✓":i+1} {s}
                </div>
              ))}
            </div>

            <div className="rp-card">
              <div style={{ marginBottom:32 }}>
                <div style={{ fontSize:11,fontWeight:700,letterSpacing:"0.12em",textTransform:"uppercase",color:GREEN,marginBottom:8 }}>
                  Step {step+1} of {STEPS.length}
                  {!dataReady && <span className="rp-dots"/>}
                </div>
                <h1 style={{ fontSize:28,fontWeight:800,color:DARK,marginBottom:8,lineHeight:1.2 }}>
                  {["Trip Details","Choose Your Vehicle","Personal Details","Review & Confirm"][step]}
                </h1>
                <p style={{ fontSize:14,color:"#6b7280",lineHeight:1.6,margin:0 }}>
                  {["Tell us about your journey — where, when, and how many.",
                    trip.fromId && trip.toId
                      ? `Prices shown are for the ${trip.fromName} → ${trip.toName} route.`
                      : "Select the vehicle that fits your needs and budget.",
                    "Almost there — we just need your contact details.",
                    "Double-check everything before we confirm your booking."][step]}
                </p>
              </div>

              {/* ══ STEP 0 — Trip Details ══ */}
              {step===0 && (
                <div style={{ display:"flex",flexDirection:"column",gap:16 }}>
                  {field(<>
                    <label style={S.label}>Pickup Location <span style={{ color:GREEN }}>*</span></label>
                    <div className="rp-input-wrap" style={wrap(errors.from)}>
                      <select value={trip.fromId} onChange={e=>setFrom(e.target.value)} style={S.select}>
                        <option value="">Select pickup location…</option>
                        {locations.map(l=><option key={l.id} value={l.id}>{l.categoryIcon} {l.name}</option>)}
                      </select>
                    </div>
                    {errEl(errors.from)}
                  </>)}

                  {field(<>
                    <label style={S.label}>Drop-off Location <span style={{ color:GREEN }}>*</span></label>
                    <div className="rp-input-wrap" style={wrap(errors.to)}>
                      <select value={trip.toId} onChange={e=>setTo(e.target.value)} style={S.select}>
                        <option value="">Select drop-off location…</option>
                        {locations.map(l=><option key={l.id} value={l.id} disabled={l.id===trip.fromId}>{l.categoryIcon} {l.name}</option>)}
                      </select>
                    </div>
                    {errEl(errors.to)}
                  </>)}

                  <div className="rp-grid">
                    {field(<>
                      <label style={S.label}>Travel Date <span style={{ color:GREEN }}>*</span></label>
                      <div className="rp-input-wrap" style={wrap(errors.date)}>
                        <input type="date" value={trip.date} min={new Date().toISOString().split("T")[0]} onChange={e=>setTrip(t=>({...t,date:e.target.value}))} style={S.input}/>
                      </div>
                      {errEl(errors.date)}
                    </>)}
                    {field(<>
                      <label style={S.label}>Pickup Time <span style={{ color:GREEN }}>*</span></label>
                      <div className="rp-input-wrap" style={wrap(errors.time)}>
                        <input type="time" value={trip.time} onChange={e=>setTrip(t=>({...t,time:e.target.value}))} style={S.input}/>
                      </div>
                      {errEl(errors.time)}
                    </>)}
                  </div>

                  <div className="rp-grid">
                    {counter("passengers",1,16,"Passengers")}
                    {counter("kids",0,6,"Children (under 12)")}
                    {counter("bags",0,16,"Luggage Bags")}
                  </div>
                </div>
              )}

              {/* ══ STEP 1 — Choose Vehicle ══ */}
              {step===1 && (
                <div style={{ display:"flex",flexDirection:"column",gap:14 }}>
                  {errors.vehicle && (
                    <div style={{ background:"#fef2f2",border:"1px solid #fecaca",color:"#dc2626",padding:"10px 16px",borderRadius:10,fontSize:14,fontWeight:600 }}>
                      {errors.vehicle}
                    </div>
                  )}

                  {/* No vehicles available for this route */}
                  {vehiclesWithPrice.length === 0 && (
                    <div style={{ background:"#fffbeb",border:"1px solid #fde68a",color:"#92400e",padding:"16px 20px",borderRadius:12,fontSize:14,textAlign:"center" }}>
                      ⚠️ No vehicles are currently available for this route. Please contact us directly.
                    </div>
                  )}

                  {vehiclesWithPrice.map(v => {
                    const sel    = vehicleId === v.id;
                    const lugEx  = trip.bags > v.maxLuggage;
                    const paxEx  = (trip.passengers + trip.kids) > v.maxPassengers;
                    const exc    = lugEx || paxEx;
                    const displayPrice = v.onDemand ? null : (v.routePrice ?? v.price);

                    return (
                      <div key={v.id}
                        className={`rp-vehicle${sel?" sel":""}${exc?" exceeded":""}`}
                        onClick={()=>!exc&&setVehicleId(v.id)}>
                        {/* Image */}
                        <div style={{ width:180,minWidth:180,flexShrink:0,position:"relative",overflow:"hidden" }}>
                          <img src={v.img} alt={v.name} style={{ width:"100%",height:"100%",minHeight:140,objectFit:"cover",display:"block" }}/>
                          {sel && (
                            <div style={{ position:"absolute",top:8,right:8,width:22,height:22,borderRadius:"50%",background:AMBER,display:"flex",alignItems:"center",justifyContent:"center" }}>
                              <svg width={11} height={11} fill="none" viewBox="0 0 24 24" stroke="#fff" strokeWidth={3}><path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7"/></svg>
                            </div>
                          )}
                        </div>

                        {/* Info */}
                        <div style={{ flex:1,padding:"14px 18px",display:"flex",flexDirection:"column",justifyContent:"space-between" }}>
                          <div>
                            <div style={{ display:"flex",justifyContent:"space-between",alignItems:"center",marginBottom:4 }}>
                              <span style={{ fontSize:13,fontWeight:800,textTransform:"uppercase",letterSpacing:"0.04em",color:DARK }}>{v.name}</span>
                              {v.tag && <span style={{ fontSize:10,fontWeight:700,background:GREEN,color:"#fff",padding:"2px 8px",borderRadius:999 }}>{v.tag}</span>}
                            </div>
                            <div style={{ fontSize:11,color:"#9ca3af",fontStyle:"italic",marginBottom:8 }}>{v.model}</div>
                            <div style={{ display:"flex",gap:14,fontSize:10,fontWeight:700,textTransform:"uppercase",letterSpacing:"0.07em",color:"#6b7280",marginBottom:8 }}>
                              <span style={{ color:paxEx?"#dc2626":undefined }}>👤 Max {v.maxPassengers} pax</span>
                              <span style={{ color:lugEx?"#dc2626":undefined }}>🧳 Max {v.maxLuggage} bags</span>
                            </div>
                            <div style={{ display:"flex",flexWrap:"wrap",gap:5,marginBottom:6 }}>
                              {features.map(f=><span key={f} className="rp-badge">{f}</span>)}
                            </div>
                            {v.special && (
                              <div style={{ background:"#fffbeb",border:"1px solid #fde68a",color:"#92400e",padding:"5px 10px",borderRadius:7,fontSize:11,fontWeight:600,marginTop:4 }}>
                                ⚠️ {v.special}
                              </div>
                            )}
                          </div>

                          <div style={{ display:"flex",alignItems:"center",justifyContent:"space-between",marginTop:12,paddingTop:10,borderTop:"1px solid #f3f4f6" }}>
                            <div>
                              {v.onDemand ? (
                                <>
                                  <div style={{ fontSize:16,fontWeight:800,color:"#d97706",lineHeight:1 }}>On Demand</div>
                                  <div style={{ fontSize:10,color:"#9ca3af",marginTop:2 }}>Contact us for price</div>
                                </>
                              ) : (
                                <>
                                  <div style={{ fontSize:22,fontWeight:900,color:DARK,lineHeight:1 }}>
                                    {displayPrice} <span style={{ fontSize:13,fontWeight:700 }}>EUR</span>
                                  </div>
                                  <div style={{ fontSize:10,color:"#9ca3af",marginTop:2 }}>✓ Fixed price · incl. VAT</div>
                                </>
                              )}
                            </div>

                            {exc ? (
                              <span style={{ fontSize:11,fontWeight:600,color:"#9ca3af",background:"#f3f4f6",border:"1px solid #e5e7eb",padding:"5px 10px",borderRadius:7 }}>
                                {lugEx?"Luggage limit exceeded":"Passenger limit exceeded"}
                              </span>
                            ) : (
                              <button type="button"
                                onClick={e=>{e.stopPropagation();setVehicleId(v.id);}}
                                style={{ padding:"9px 16px",borderRadius:9,fontWeight:800,fontSize:11,textTransform:"uppercase",letterSpacing:"0.06em",border:"none",cursor:"pointer",background:sel?"#d97706":AMBER,color:DARK }}>
                                {sel?"✓ Selected":"Book Now →"}
                              </button>
                            )}
                          </div>
                        </div>
                      </div>
                    );
                  })}
                </div>
              )}

              {/* ══ STEP 2 — Personal Details ══ */}
              {step===2 && (
                <div style={{ display:"flex",flexDirection:"column",gap:16 }}>
                  {field(<><label style={S.label}>Full Name <span style={{ color:GREEN }}>*</span></label><div className="rp-input-wrap" style={wrap(errors.name)}><input type="text" placeholder="e.g. John Smith" value={personal.name} onChange={e=>setPersonal(p=>({...p,name:e.target.value}))} style={S.input}/></div>{errEl(errors.name)}</>)}
                  {field(<><label style={S.label}>Country <span style={{ color:GREEN }}>*</span></label><div className="rp-input-wrap" style={wrap(errors.country)}><select value={personal.country} onChange={e=>setPersonal(p=>({...p,country:e.target.value}))} style={S.select}><option value="">Select your country…</option>{COUNTRIES.map(c=><option key={c}>{c}</option>)}</select></div>{errEl(errors.country)}</>)}
                  <div className="rp-grid">
                    {field(<><label style={S.label}>WhatsApp Number <span style={{ color:GREEN }}>*</span></label><div className="rp-input-wrap" style={wrap(errors.whatsapp)}><input type="tel" placeholder="+33 6 12 34 56 78" value={personal.whatsapp} onChange={e=>setPersonal(p=>({...p,whatsapp:e.target.value}))} style={S.input}/></div>{errEl(errors.whatsapp)}<span style={{ fontSize:11,color:"#9ca3af",marginTop:3 }}>Include country code</span></>)}
                    {field(<><label style={S.label}>Email Address <span style={{ color:GREEN }}>*</span></label><div className="rp-input-wrap" style={wrap(errors.email)}><input type="email" placeholder="you@example.com" value={personal.email} onChange={e=>setPersonal(p=>({...p,email:e.target.value}))} style={S.input}/></div>{errEl(errors.email)}</>)}
                  </div>
                  {field(<><label style={S.label}>Special Requests <span style={{ fontSize:12,color:"#9ca3af",fontWeight:400 }}>(optional)</span></label><textarea rows={4} placeholder="Flight number, special assistance, child seat size…" value={personal.notes} onChange={e=>setPersonal(p=>({...p,notes:e.target.value}))} style={{ width:"100%",border:"1.5px solid #e5e7eb",borderRadius:10,padding:"12px 14px",fontSize:14,color:DARK,resize:"none",outline:"none",fontFamily:"inherit",boxSizing:"border-box" }}/></>)}
                </div>
              )}

              {/* ══ STEP 3 — Summary ══ */}
              {step===3 && (
                <div style={{ display:"flex",flexDirection:"column",gap:14 }}>
                  <SummaryCard title="Trip Details" rows={[
                    ["Pickup",   trip.fromName],
                    ["Drop-off", trip.toName],
                    ["Date",     trip.date],
                    ["Time",     trip.time],
                    ["Passengers", `${trip.passengers} adult${trip.passengers!==1?"s":""}${trip.kids>0?`, ${trip.kids} child${trip.kids!==1?"ren":""}`:"" }`],
                    ["Luggage",  `${trip.bags} bag${trip.bags!==1?"s":""}`],
                  ]}/>

                  {vehicle && (
                    <div style={{ border:"1px solid #e5e7eb",borderRadius:14,overflow:"hidden" }}>
                      <div style={{ background:"#f9fafb",padding:"12px 20px",borderBottom:"1px solid #e5e7eb" }}>
                        <span style={{ fontSize:13,fontWeight:700,color:DARK }}>Vehicle</span>
                      </div>
                      <div style={{ display:"flex",alignItems:"center",gap:14,padding:"14px 20px" }}>
                        <img src={vehicle.img} alt={vehicle.name} style={{ width:64,height:46,borderRadius:7,objectFit:"cover" }}/>
                        <div>
                          <div style={{ fontWeight:700,color:DARK,fontSize:14 }}>{vehicle.name}</div>
                          <div style={{ fontSize:12,color:"#9ca3af" }}>{vehicle.model}</div>
                        </div>
                      </div>
                    </div>
                  )}

                  <SummaryCard title="Your Details" rows={[
                    ["Name",     personal.name],
                    ["Country",  personal.country],
                    ["WhatsApp", personal.whatsapp],
                    ["Email",    personal.email],
                    ...(personal.notes?[["Notes",personal.notes] as [string,string]]:[]),
                  ]}/>

                  <div style={{ background:DARK,borderRadius:14,padding:"18px 24px",display:"flex",justifyContent:"space-between",alignItems:"center" }}>
                    <div>
                      <div style={{ fontSize:13,color:"rgba(255,255,255,.45)",marginBottom:3 }}>Total Fare</div>
                      <div style={{ fontSize:11,color:"rgba(255,255,255,.25)" }}>Fixed · incl. VAT · Pay on arrival</div>
                    </div>
                    <div style={{ fontSize:34,fontWeight:900,color:"#4ade80" }}>
                      {vehicle?.onDemand ? (
                        <span style={{ fontSize:20 }}>On Demand</span>
                      ) : (
                        `€${confirmedPrice}`
                      )}
                    </div>
                  </div>
                </div>
              )}

              {/* Navigation */}
              <div style={{ display:"flex",gap:12,marginTop:32 }}>
                {step>0 && <button type="button" onClick={back} className="rp-btn-back">← Back</button>}
                {step<3
                  ? <button type="button" onClick={next} className="rp-btn-next">{step===2?"Review Booking →":"Continue →"}</button>
                  : <button type="button" onClick={submit} disabled={sending} className="rp-btn-ok">
                      {sending
                        ? <><div className="rp-spin"/> Sending…</>
                        : <><svg width={17} height={17} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}><path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7"/></svg> Confirm Booking</>
                      }
                    </button>
                }
              </div>
            </div>
          </main>
        </div>
      </div>
    </>
  );
}