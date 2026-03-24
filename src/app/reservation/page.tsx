"use client";

import { useState, useEffect } from "react";

interface TripDetails {
  fromId: string; toId: string;
  fromName: string; toName: string;
  tripType: "one-way" | "round-trip";
  date: string; time: string;
  passengers: number; kids: number; bags: number;
  flightOrTrain: string;
  dropoffAddress: string;
}
interface Vehicle {
  id: string; name: string; model: string;
  maxPassengers: number; maxLuggage: number;
  img: string; price: number; special?: string; tag?: string;
  active: boolean; sortOrder?: number;
}
interface Location {
  id: string; name: string; categoryIcon: string; categoryName: string; active: boolean;
}
interface Rate {
  fromLocId: string; toLocId: string; vehicleId: string;
  p1: number|null; p2: number|null; p3: number|null; p4: number|null;
  p5: number|null; p6: number|null; p7: number|null; p8: number|null;
  onDemand: boolean; active: boolean;
}
interface Personal {
  name: string; country: string; whatsapp: string; email: string; notes: string;
}

const NIGHT_SURCHARGE = 15;

const isNightTime = (time: string): boolean => {
  if (!time) return false;
  const [h] = time.split(":").map(Number);
  return h >= 22 || h < 6;
};

const calcPrice = (rate: Rate, pax: number): number | null => {
  if (rate.onDemand) return null;
  if (pax >= 9) return rate.p8 ? rate.p8 * 2 : null;
  const map: Record<number, number|null> = {
    1:rate.p1,2:rate.p2,3:rate.p3,4:rate.p4,
    5:rate.p5,6:rate.p6,7:rate.p7,8:rate.p8,
  };
  return map[pax] ?? null;
};

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

const COUNTRY_CODES: Record<string, string> = {
  Afghanistan:"+93",Albania:"+355",Algeria:"+213",Andorra:"+376",Angola:"+244",Argentina:"+54",
  Armenia:"+374",Australia:"+61",Austria:"+43",Azerbaijan:"+994",Bahrain:"+973",Bangladesh:"+880",
  Belarus:"+375",Belgium:"+32",Bolivia:"+591","Bosnia and Herzegovina":"+387",Brazil:"+55",
  Bulgaria:"+359",Cambodia:"+855",Cameroon:"+237",Canada:"+1",Chile:"+56",China:"+86",
  Colombia:"+57",Croatia:"+385",Cuba:"+53",Cyprus:"+357","Czech Republic":"+420",Denmark:"+45",
  Ecuador:"+593",Egypt:"+20",Estonia:"+372",Ethiopia:"+251",Finland:"+358",France:"+33",
  Georgia:"+995",Germany:"+49",Ghana:"+233",Greece:"+30",Guatemala:"+502",Hungary:"+36",
  India:"+91",Indonesia:"+62",Iran:"+98",Iraq:"+964",Ireland:"+353",Israel:"+972",Italy:"+39",
  Japan:"+81",Jordan:"+962",Kazakhstan:"+7",Kenya:"+254",Kuwait:"+965",Latvia:"+371",
  Lebanon:"+961",Libya:"+218",Lithuania:"+370",Luxembourg:"+352",Malaysia:"+60",Mexico:"+52",
  Morocco:"+212",Netherlands:"+31","New Zealand":"+64",Nigeria:"+234",Norway:"+47",Oman:"+968",
  Pakistan:"+92",Palestine:"+970",Peru:"+51",Philippines:"+63",Poland:"+48",Portugal:"+351",
  Qatar:"+974",Romania:"+40",Russia:"+7","Saudi Arabia":"+966",Senegal:"+221",Serbia:"+381",
  Singapore:"+65",Slovakia:"+421","South Africa":"+27","South Korea":"+82",Spain:"+34",
  "Sri Lanka":"+94",Sweden:"+46",Switzerland:"+41",Syria:"+963",Taiwan:"+886",Thailand:"+66",
  Tunisia:"+216",Turkey:"+90",Ukraine:"+380","United Arab Emirates":"+971","United Kingdom":"+44",
  "United States":"+1",Uruguay:"+598",Uzbekistan:"+998",Venezuela:"+58",Vietnam:"+84",Yemen:"+967",
};

const DEFAULT_LOCATIONS: Location[] = [
  { id:"l1",name:"Charles de Gaulle (CDG)",categoryIcon:"✈️",categoryName:"Airport",active:true },
  { id:"l2",name:"Orly Airport",categoryIcon:"✈️",categoryName:"Airport",active:true },
  { id:"l4",name:"Paris City Centre",categoryIcon:"🏙️",categoryName:"City",active:true },
  { id:"l5",name:"Disneyland Paris",categoryIcon:"🎡",categoryName:"Attraction",active:true },
];
const DEFAULT_VEHICLES: Vehicle[] = [
  { id:"sedan",name:"BUSINESS CLASS CAR",model:"Mercedes-Benz E-Class or similar",maxPassengers:3,maxLuggage:2,img:"/images/car.png",price:80,tag:"Most Popular",active:true,sortOrder:1 },
  { id:"van",name:"BUSINESS CLASS VAN",model:"Mercedes-Benz V-Class or similar",maxPassengers:8,maxLuggage:8,img:"/images/car.png",price:80,tag:"Best for Groups",special:"Can accommodate your stroller",active:true,sortOrder:2 },
  { id:"suv",name:"LUXURY SUV",model:"Mercedes-Benz GLE or similar",maxPassengers:5,maxLuggage:5,img:"/images/car.png",price:110,tag:"Premium",active:true,sortOrder:3 },
  { id:"minibus",name:"MINIBUS",model:"Mercedes-Benz Sprinter or similar",maxPassengers:16,maxLuggage:16,img:"/images/car.png",price:150,tag:"Large Groups",special:"Can accommodate multiple strollers & wheelchairs",active:true,sortOrder:4 },
];
const DEFAULT_FEATURES = ["Meet & Greet included","Door-to-door","Porter service","Free child seats & boosters"];

const STEPS = ["Trip Details","Choose Vehicle","Your Details","Summary"];
const GREEN = "#16a34a";
const AMBER = "#f59e0b";
const DARK  = "#111827";

function groupByCategory(locs: Location[]) {
  const map = new Map<string, Location[]>();
  locs.forEach(l => {
    const k = `${l.categoryIcon} ${l.categoryName}`;
    if (!map.has(k)) map.set(k, []);
    map.get(k)!.push(l);
  });
  return map;
}

function SummaryCard({ title, rows }: { title: string; rows: [string,string][] }) {
  return (
    <div style={{ border:"1px solid #e5e7eb",borderRadius:14,overflow:"hidden" }}>
      <div style={{ background:"#f9fafb",padding:"12px 20px",borderBottom:"1px solid #e5e7eb" }}>
        <span style={{ fontSize:13,fontWeight:700,color:DARK }}>{title}</span>
      </div>
      {rows.map(([label,value]) => (
        <div key={label} style={{ display:"flex",justifyContent:"space-between",alignItems:"flex-start",padding:"10px 20px",borderBottom:"1px solid #f3f4f6",fontSize:14 }}>
          <span style={{ color:"#6b7280",flexShrink:0 }}>{label}</span>
          <span style={{ fontWeight:600,color:DARK,textAlign:"right",marginLeft:16 }}>{value||"—"}</span>
        </div>
      ))}
    </div>
  );
}

function LocationSelect({ value,onChange,locations,placeholder,error,excludeId }: {
  value:string; onChange:(id:string)=>void; locations:Location[]; placeholder:string; error?:string; excludeId?:string;
}) {
  const groups = groupByCategory(locations.filter(l=>l.active&&l.id!==excludeId));
  return (
    <div style={{ display:"flex",flexDirection:"column" }}>
      <div style={{ border:`1.5px solid ${error?"#dc2626":"#e5e7eb"}`,borderRadius:10,background:"#fff",display:"flex",alignItems:"center",overflow:"hidden" }}>
        <select value={value} onChange={e=>onChange(e.target.value)}
          style={{ width:"100%",border:"none",outline:"none",padding:"13px 14px",fontSize:14,background:"transparent",color:value?DARK:"#9ca3af",appearance:"none",cursor:"pointer",fontFamily:"inherit" }}>
          <option value="" disabled>{placeholder}</option>
          {Array.from(groups.entries()).map(([cat,locs]) => (
            <optgroup key={cat} label={cat}>
              {locs.map(l => <option key={l.id} value={l.id}>{l.name}</option>)}
            </optgroup>
          ))}
        </select>
        <span style={{ paddingRight:12,color:"#9ca3af",pointerEvents:"none",flexShrink:0 }}>▾</span>
      </div>
      {error && <div style={{ fontSize:12,color:"#dc2626",marginTop:4 }}>{error}</div>}
    </div>
  );
}

export default function ReservationPage() {
  const [locations,setLocations] = useState<Location[]>(DEFAULT_LOCATIONS);
  const [vehicles, setVehicles]  = useState<Vehicle[]>(DEFAULT_VEHICLES);
  const [features, setFeatures]  = useState<string[]>(DEFAULT_FEATURES);
  const [allRates, setAllRates]  = useState<Rate[]>([]);
  const [dataReady,setDataReady] = useState(false);

  const [step,     setStep]      = useState(0);
  const [trip,     setTrip]      = useState<TripDetails>({
    fromId:"",toId:"",fromName:"",toName:"",tripType:"one-way",
    date:"",time:"",passengers:1,kids:0,bags:1,
    flightOrTrain:"",dropoffAddress:"",
  });
  const [vehicleId,setVehicleId] = useState("");
  const [personal, setPersonal]  = useState<Personal>({ name:"",country:"",whatsapp:"",email:"",notes:"" });
  const [paymentMethod, setPaymentMethod] = useState<"cash"|"card"|"">("");
  const [sending,  setSending]   = useState(false);
  const [done,     setDone]      = useState(false);
  const [bookingRef,setBookingRef]= useState("");
  const [errors,   setErrors]    = useState<Record<string,string>>({});

  // ── Fetch all data + read URL params ─────────────────────────
  useEffect(() => {
    (async () => {
      try {
        const [lr,vr,fr,rr] = await Promise.all([
          fetch("/api/locations"),fetch("/api/vehicles"),
          fetch("/api/features"),fetch("/api/rates"),
        ]);
        let loadedLocs: Location[] = DEFAULT_LOCATIONS;
        if (lr.ok) { const d=await lr.json(); const a=d.filter((l:any)=>l.active); if(a.length){setLocations(a); loadedLocs=a;} }
        if (vr.ok) { const d=await vr.json(); const a=d.filter((v:any)=>v.active).sort((a:any,b:any)=>(a.sortOrder??0)-(b.sortOrder??0)); if(a.length) setVehicles(a); }
        if (fr.ok) { const d=await fr.json(); const a=d.filter((f:any)=>f.active).map((f:any)=>f.text); if(a.length) setFeatures(a); }
        if (rr.ok) { const d=await rr.json(); setAllRates(d); }

        const sp = new URLSearchParams(window.location.search);
        const fromParam  = sp.get("from");
        const toParam    = sp.get("to");
        const dateParam  = sp.get("date");
        const timeParam  = sp.get("time");
        const paxParam   = sp.get("passengers");
        const kidsParam  = sp.get("kids");
        const typeParam  = sp.get("tripType");

        if (fromParam||toParam||dateParam||timeParam||paxParam||kidsParam||typeParam) {
          const fromName = loadedLocs.find(l=>l.id===fromParam)?.name ?? "";
          const toName   = loadedLocs.find(l=>l.id===toParam)?.name   ?? "";
          setTrip(t => ({
            ...t,
            ...(fromParam ? { fromId:fromParam, fromName } : {}),
            ...(toParam   ? { toId:toParam,     toName   } : {}),
            ...(dateParam ? { date:dateParam }   : {}),
            ...(timeParam ? { time:timeParam }   : {}),
            ...(paxParam  ? { passengers:Math.max(1,parseInt(paxParam)||1) } : {}),
            ...(kidsParam ? { kids:Math.max(0,parseInt(kidsParam)||0) }       : {}),
            ...(typeParam==="round-trip" ? { tripType:"round-trip" as const } : {}),
          }));
        }
      } catch {}
      finally { setDataReady(true); }
    })();
  }, []);

  // Auto-strip country code when country changes
  useEffect(() => {
    if (!personal.country) return;
    setPersonal(p => ({ ...p, whatsapp:p.whatsapp.replace(/^\+\d{1,4}\s?/,"").replace(/^\+/,"") }));
  }, [personal.country]);

  const totalPax    = trip.passengers + trip.kids;
  const isRoundTrip = trip.tripType === "round-trip";
  const nightSurcharge = isNightTime(trip.time) ? NIGHT_SURCHARGE : 0;

  const getRateRecord = (vId:string): Rate|null => {
    if (!trip.fromId||!trip.toId) return null;
    return allRates.find(r=>r.fromLocId===trip.fromId&&r.toLocId===trip.toId&&r.vehicleId===vId&&r.active)??null;
  };

  const vehiclesWithPrice = vehicles.map(v => {
    const paxExceeded = totalPax>v.maxPassengers;
    const lugExceeded = trip.bags>v.maxLuggage;
    if (!trip.fromId||!trip.toId) {
      const base=v.price;
      const routeBase = isRoundTrip?base*2:base as number;
      return {...v,routePrice:routeBase + nightSurcharge,baseRoutePrice:routeBase,onDemand:false,noRate:false,paxExceeded,lugExceeded,isDoubled:false};
    }
    const rate=getRateRecord(v.id);
    if (!rate) return {...v,routePrice:null,baseRoutePrice:null,onDemand:false,noRate:true,paxExceeded,lugExceeded,isDoubled:false};
    if (rate.onDemand) return {...v,routePrice:null,baseRoutePrice:null,onDemand:true,noRate:false,paxExceeded,lugExceeded,isDoubled:false};
    const base=calcPrice(rate,totalPax);
    const routeBase=base!==null&&isRoundTrip?base*2:base;
    const final=routeBase!==null?routeBase+nightSurcharge:null;
    return {...v,routePrice:final,baseRoutePrice:routeBase,onDemand:false,noRate:false,paxExceeded,lugExceeded,isDoubled:totalPax>=9};
  }).filter(v=>!v.noRate);

  const recommendedVehicle = vehiclesWithPrice
    .filter(v=>!v.paxExceeded&&!v.lugExceeded)
    .sort((a,b)=>a.maxPassengers-b.maxPassengers)[0]??null;

  const vehicle = vehiclesWithPrice.find(v=>v.id===vehicleId)??null;
  const confirmedPrice = vehicle?.routePrice??0;

  useEffect(() => {
    if (vehicleId&&trip.fromId&&trip.toId&&!vehiclesWithPrice.some(v=>v.id===vehicleId)) setVehicleId("");
  }, [trip.fromId,trip.toId]);

  const setFrom = (id:string) => { const l=locations.find(x=>x.id===id); setTrip(t=>({...t,fromId:id,fromName:l?.name??"",flightOrTrain:"",dropoffAddress:""})); setVehicleId(""); };
  const setTo   = (id:string) => { const l=locations.find(x=>x.id===id); setTrip(t=>({...t,toId:id,toName:l?.name??"",flightOrTrain:"",dropoffAddress:""})); setVehicleId(""); };

  const handleTripChange = (key:"passengers"|"kids"|"bags",val:number) => {
    setTrip(t=>({...t,[key]:val}));
    if (vehicleId) {
      const v=vehicles.find(x=>x.id===vehicleId);
      if (v) {
        const newPax=key==="passengers"?val+trip.kids:key==="kids"?trip.passengers+val:totalPax;
        const newBags=key==="bags"?val:trip.bags;
        if (newPax>v.maxPassengers||newBags>v.maxLuggage) setVehicleId("");
      }
    }
  };

  const fromLoc=locations.find(l=>l.id===trip.fromId);
  const toLoc  =locations.find(l=>l.id===trip.toId);
  const isFromAirport=fromLoc?.categoryName?.toLowerCase().includes("airport")||fromLoc?.categoryName?.toLowerCase().includes("station");
  const isToAirport  =toLoc?.categoryName?.toLowerCase().includes("airport")  ||toLoc?.categoryName?.toLowerCase().includes("station");
  const isFromCity   =fromLoc?.categoryName?.toLowerCase().includes("city")   ||fromLoc?.categoryName?.toLowerCase().includes("hotel");
  const isToCity     =toLoc?.categoryName?.toLowerCase().includes("city")     ||toLoc?.categoryName?.toLowerCase().includes("hotel");
  const showFlightBox  = !!(trip.fromId&&trip.toId&&(isFromAirport||isToAirport));
  const showAddressBox = !!(trip.fromId&&trip.toId&&(isFromCity||isToCity));
  const flightLabel    = isFromAirport?"Flight / Train No. (at pickup)":"Flight / Train No. (at drop-off)";
  const addressLabel   = isToCity?"Drop-off Address":isFromCity?"Pickup Address":"Address";

  const validate = () => {
    const e: Record<string,string> = {};
    if (step===0) {
      if (!trip.fromId) e.from="Required";
      if (!trip.toId)   e.to="Required";
      if (trip.fromId&&trip.toId&&trip.fromId===trip.toId) e.to="Must differ from pickup";
      if (!trip.date)   e.date="Required";
      if (!trip.time)   e.time="Required";
    }
    if (step===1&&!vehicleId) e.vehicle="Please select a vehicle";
    if (step===2) {
      if (!personal.name.trim())    e.name="Required";
      if (!personal.country.trim()) e.country="Required";
      if (!personal.whatsapp.trim())e.whatsapp="Required";
      if (!personal.email.trim())   e.email="Required";
      else if (!/\S+@\S+\.\S+/.test(personal.email)) e.email="Invalid email";
      if (!paymentMethod) e.paymentMethod="Please select a payment method";
    }
    setErrors(e);
    return Object.keys(e).length===0;
  };

  const next = () => { if (validate()) setStep(s=>s+1); };
  const back = () => { setStep(s=>s-1); setErrors({}); };

  const submit = async () => {
    setSending(true);
    const code=COUNTRY_CODES[personal.country]??"";
    const rawNumber=personal.whatsapp.trim().replace(/^\+\d{1,4}\s?/,"");
    const fullWhatsapp=code?`${code}${rawNumber}`:personal.whatsapp;
    try {
      const res=await fetch("/api/bookings",{
        method:"POST",headers:{"Content-Type":"application/json"},
        body:JSON.stringify({
          fromLocId:trip.fromId,toLocId:trip.toId,
          date:trip.date,time:trip.time,
          passengers:trip.passengers,kids:trip.kids,bags:trip.bags,
          vehicleId,name:personal.name,country:personal.country,
          whatsapp:fullWhatsapp,email:personal.email,
          notes:[
            trip.tripType==="round-trip"?"ROUND TRIP":"",
            trip.flightOrTrain?`Flight/Train: ${trip.flightOrTrain}`:"",
            trip.dropoffAddress?`Address: ${trip.dropoffAddress}`:"",
            nightSurcharge>0?"NIGHT SURCHARGE (+€15)":"",
            `Payment: ${paymentMethod==="cash"?"Cash to driver":"Card to driver"}`,
            personal.notes,
          ].filter(Boolean).join(" | "),
          status:"new",
        }),
      });
      if (res.ok) {
        const b=await res.json();
        setBookingRef((b.id??"PEM-"+Date.now().toString(36)).toUpperCase());
        setDone(true);
      } else { alert("Something went wrong. Please try again."); }
    } catch { alert("Network error. Please try again."); }
    finally { setSending(false); }
  };

  const S: Record<string,React.CSSProperties> = {
    label:  { fontSize:13,fontWeight:600,color:"#374151",marginBottom:6,display:"block" },
    input:  { width:"100%",border:"none",outline:"none",padding:"13px 14px",fontSize:14,background:"transparent",color:DARK,fontFamily:"inherit",boxSizing:"border-box" as const },
    select: { width:"100%",border:"none",outline:"none",padding:"13px 14px",fontSize:14,background:"transparent",color:DARK,appearance:"none" as const,cursor:"pointer",fontFamily:"inherit" },
  };
  const wrap = (e?:string): React.CSSProperties => ({ border:`1.5px solid ${e?"#dc2626":"#e5e7eb"}`,borderRadius:10,background:"#fff",display:"flex",alignItems:"center",overflow:"hidden" });
  const errEl = (m?:string) => m?<div style={{ fontSize:12,color:"#dc2626",marginTop:4 }}>{m}</div>:null;
  const field = (c:React.ReactNode) => <div style={{ display:"flex",flexDirection:"column" }}>{c}</div>;

  const counter = (key:"passengers"|"kids"|"bags",min:number,max:number,label:string) => (
    <div style={{ display:"flex",flexDirection:"column",gap:6 }}>
      <label style={S.label}>{label}</label>
      <div style={{ display:"flex",border:"1.5px solid #e5e7eb",borderRadius:10,overflow:"hidden",background:"#fff" }}>
        <button type="button" onClick={()=>handleTripChange(key,Math.max(min,trip[key]-1))}
          style={{ width:48,height:48,fontSize:22,background:"none",border:"none",cursor:"pointer",color:"#6b7280" }}>−</button>
        <div style={{ flex:1,display:"flex",alignItems:"center",justifyContent:"center",fontWeight:700,fontSize:16,background:"#f9fafb" }}>{trip[key]}</div>
        <button type="button" onClick={()=>handleTripChange(key,Math.min(max,trip[key]+1))}
          style={{ width:48,height:48,fontSize:22,background:"none",border:"none",cursor:"pointer",color:"#6b7280" }}>+</button>
      </div>
    </div>
  );

  const dialCode = COUNTRY_CODES[personal.country]??"";

  // ── DONE ─────────────────────────────────────────────────────
  if (done) return (
    <div style={{ display:"flex",alignItems:"center",justifyContent:"center",padding:40,background:"#f4f5f7",minHeight:"60vh" }}>
      <div style={{ maxWidth:520,width:"100%",background:"#fff",borderRadius:20,boxShadow:"0 8px 40px rgba(0,0,0,0.10)",padding:"48px 40px",textAlign:"center" }}>
        <div style={{ width:72,height:72,borderRadius:"50%",background:"#dcfce7",display:"flex",alignItems:"center",justifyContent:"center",margin:"0 auto 20px" }}>
          <svg width={36} height={36} fill="none" viewBox="0 0 24 24" stroke={GREEN} strokeWidth={2.5}><path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7"/></svg>
        </div>
        <h2 style={{ fontSize:28,fontWeight:800,color:DARK,marginBottom:10 }}>Booking Confirmed!</h2>
        <div style={{ display:"inline-block",background:"#f0fdf4",border:"1px solid #bbf7d0",color:GREEN,fontWeight:700,fontSize:13,padding:"5px 14px",borderRadius:8,marginBottom:12 }}>
          Ref: {bookingRef}
        </div>
        <p style={{ color:"#6b7280",marginBottom:28,fontSize:15 }}>Confirmation sent to <strong>{personal.email}</strong></p>
        <div style={{ background:"#f9fafb",borderRadius:12,padding:20,marginBottom:28,textAlign:"left" }}>
          {([
            ["Trip Type", isRoundTrip?"🔄 Round Trip":"→ One Way"],
            ["Route",`${trip.fromName} → ${trip.toName}`],
            ["Date & Time",`${trip.date} at ${trip.time}`],
            ["Vehicle",vehicle?.name??"—"],
            ["Passengers",`${totalPax} pax${vehicle?.isDoubled?" (×2 rate)":""}`],
            ["Payment",paymentMethod==="cash"?"💵 Cash to driver":"💳 Card to driver"],
          ] as [string,string][]).map(([l,v])=>(
            <div key={l} style={{ display:"flex",justifyContent:"space-between",padding:"8px 0",borderBottom:"1px solid #e5e7eb",fontSize:14 }}>
              <span style={{ color:"#6b7280" }}>{l}</span>
              <span style={{ fontWeight:600,color:DARK }}>{v}</span>
            </div>
          ))}
          {nightSurcharge>0&&(
            <div style={{ display:"flex",justifyContent:"space-between",padding:"8px 0",borderBottom:"1px solid #e5e7eb",fontSize:14 }}>
              <span style={{ color:"#6b7280" }}>🌙 Night Surcharge</span>
              <span style={{ fontWeight:600,color:"#7c3aed" }}>+€{NIGHT_SURCHARGE}</span>
            </div>
          )}
          <div style={{ display:"flex",justifyContent:"space-between",paddingTop:12,fontSize:18,fontWeight:800 }}>
            <span>Total</span>
            <span style={{ color:GREEN }}>{vehicle?.onDemand?"On Demand":`€${confirmedPrice}`}</span>
          </div>
        </div>
        <a href="/" style={{ display:"inline-block",padding:"14px 32px",background:DARK,color:"#fff",borderRadius:12,fontWeight:700,textDecoration:"none",fontSize:15 }}>← Back to Home</a>
      </div>
    </div>
  );

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
        .rp-vehicle{display:flex;border:2px solid #e5e7eb;border-radius:14px;overflow:hidden;cursor:pointer;background:#fff;transition:all .2s;position:relative}
        .rp-vehicle:hover:not(.rp-locked){border-color:#f59e0b;box-shadow:0 4px 20px rgba(0,0,0,0.08)}
        .rp-vehicle.sel{border-color:#f59e0b;box-shadow:0 0 0 4px rgba(245,158,11,0.2);background:#fffbeb}
        .rp-vehicle.rp-locked{cursor:not-allowed;border-color:#f3f4f6;opacity:.7}
        .rp-vehicle.rp-recommended{border-color:#16a34a;box-shadow:0 0 0 2px rgba(22,163,74,0.15)}
        .rp-trip-toggle{display:flex;border:1.5px solid #e5e7eb;border-radius:12px;overflow:hidden;background:#f9fafb}
        .rp-trip-opt{flex:1;padding:12px 16px;text-align:center;cursor:pointer;font-size:13px;font-weight:600;color:#6b7280;border:none;background:transparent;transition:all .18s;font-family:inherit}
        .rp-trip-opt.active{background:#111827;color:#fff}
        .rp-trip-opt:first-child{border-right:1px solid #e5e7eb}
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
        .rp-lock-overlay{position:absolute;inset:0;background:rgba(248,249,251,0.92);display:flex;flex-direction:column;align-items:center;justify-content:center;gap:8px;z-index:2;border-radius:12px;backdrop-filter:blur(2px)}
        .rp-vehicle.sel::before{content:"";position:absolute;left:0;top:0;bottom:0;width:4px;background:#f59e0b}
        optgroup{font-weight:700;color:#374151}
        option{font-weight:400;color:#111827}
        .dial-prefix{display:flex;align-items:center;padding:0 12px;background:#f9fafb;border-right:1px solid #e5e7eb;font-size:14px;font-weight:700;color:#374151;white-space:nowrap;flex-shrink:0;min-width:56px;justify-content:center}
        .rp-payment-opt{display:flex;align-items:center;gap:14px;border:2px solid #e5e7eb;border-radius:12px;padding:16px 20px;cursor:pointer;background:#fff;transition:all .2s;flex:1;min-width:0}
        .rp-payment-opt:hover{border-color:#d1d5db;background:#f9fafb}
        .rp-payment-opt.selected{border-color:#111827;background:#f9fafb;box-shadow:0 0 0 3px rgba(17,24,39,0.08)}
        .rp-night-banner{background:linear-gradient(135deg,#1e1b4b,#312e81);border:1.5px solid #4338ca;border-radius:12px;padding:14px 18px;display:flex;align-items:center;gap:14px;margin-top:8px}
        @keyframes nightPulse{0%,100%{opacity:1}50%{opacity:.7}}
        .rp-night-star{animation:nightPulse 2s ease-in-out infinite}
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

            {trip.tripType&&(
              <div style={{ marginBottom:16,padding:"8px 12px",borderRadius:9,background:isRoundTrip?"rgba(245,158,11,.15)":"rgba(22,163,74,.1)",border:`1px solid ${isRoundTrip?"rgba(245,158,11,.3)":"rgba(22,163,74,.25)"}`,fontSize:12,fontWeight:700,color:isRoundTrip?"#f59e0b":"#4ade80",display:"flex",alignItems:"center",gap:6 }}>
                {isRoundTrip?"🔄 Round Trip":"→ One Way"}
                {isRoundTrip&&<span style={{ fontSize:10,color:"rgba(245,158,11,.7)",marginLeft:"auto" }}>×2 price</span>}
              </div>
            )}

            {/* Night surcharge indicator in sidebar */}
            {nightSurcharge>0&&(
              <div style={{ marginBottom:16,padding:"8px 12px",borderRadius:9,background:"rgba(99,102,241,.15)",border:"1px solid rgba(99,102,241,.3)",fontSize:12,fontWeight:700,color:"#a5b4fc",display:"flex",alignItems:"center",gap:6 }}>
                <span className="rp-night-star">🌙</span>
                Night surcharge <span style={{ marginLeft:"auto",color:"#c4b5fd" }}>+€{NIGHT_SURCHARGE}</span>
              </div>
            )}

            {vehicle&&(
              <div style={{ borderTop:"1px solid rgba(255,255,255,.1)",paddingTop:18,marginBottom:20 }}>
                <div style={{ fontSize:10,fontWeight:700,letterSpacing:"0.1em",textTransform:"uppercase",color:"#4ade80",marginBottom:10 }}>Selected Vehicle</div>
                <div style={{ background:"rgba(255,255,255,.06)",borderRadius:10,padding:12,border:"1px solid rgba(255,255,255,.08)" }}>
                  <div style={{ display:"flex",gap:10,alignItems:"center",marginBottom:8 }}>
                    <img src={vehicle.img} alt={vehicle.name} style={{ width:56,height:40,borderRadius:7,objectFit:"cover",flexShrink:0 }}/>
                    <div>
                      <div style={{ fontSize:11,fontWeight:800,textTransform:"uppercase",letterSpacing:".04em" }}>{vehicle.name}</div>
                      <div style={{ fontSize:10,color:"rgba(255,255,255,.4)",marginTop:1 }}>{vehicle.model}</div>
                    </div>
                  </div>
                  <div style={{ borderTop:"1px solid rgba(255,255,255,.08)",paddingTop:8,display:"flex",justifyContent:"space-between",alignItems:"center" }}>
                    <div style={{ fontSize:10,color:"rgba(255,255,255,.4)" }}>{isRoundTrip?"Round trip fare":"One way fare"}</div>
                    <div style={{ fontSize:18,fontWeight:900,color:"#4ade80" }}>
                      {vehicle.onDemand?"On Demand":vehicle.routePrice!==null?`€${vehicle.routePrice}`:"—"}
                      {vehicle.isDoubled&&<span style={{ fontSize:10,color:"#f59e0b",marginLeft:4 }}>×2</span>}
                    </div>
                  </div>
                </div>
              </div>
            )}

            {(trip.passengers>1||trip.kids>0||trip.bags>1)&&step>=1&&(
              <div style={{ borderTop:"1px solid rgba(255,255,255,.08)",paddingTop:14,marginBottom:16 }}>
                <div style={{ fontSize:10,fontWeight:700,letterSpacing:"0.1em",textTransform:"uppercase",color:"rgba(255,255,255,.4)",marginBottom:8 }}>Your Group</div>
                <div style={{ display:"flex",flexDirection:"column",gap:4,fontSize:12,color:"rgba(255,255,255,.6)" }}>
                  <div>👤 {trip.passengers} adult{trip.passengers!==1?"s":""}{trip.kids>0?` + ${trip.kids} child${trip.kids!==1?"ren":""}`:""}</div>
                  <div>🧳 {trip.bags} bag{trip.bags!==1?"s":""}</div>
                  {totalPax>=9&&<div style={{ marginTop:4,background:"rgba(245,158,11,.15)",border:"1px solid rgba(245,158,11,.3)",borderRadius:7,padding:"5px 9px",fontSize:10,color:"#f59e0b",fontWeight:700 }}>⚡ 9+ pax — price doubled</div>}
                  {recommendedVehicle&&!vehicleId&&totalPax<9&&<div style={{ marginTop:6,background:"rgba(22,163,74,.15)",border:"1px solid rgba(22,163,74,.3)",borderRadius:7,padding:"6px 10px",fontSize:11,color:"#4ade80",fontWeight:600 }}>✦ We suggest: {recommendedVehicle.name}</div>}
                </div>
              </div>
            )}

            {trip.fromName&&trip.toName&&(
              <div style={{ borderTop:"1px solid rgba(255,255,255,.08)",paddingTop:16,marginBottom:16 }}>
                <div style={{ fontSize:10,fontWeight:700,letterSpacing:"0.1em",textTransform:"uppercase",color:"rgba(255,255,255,.4)",marginBottom:8 }}>Route</div>
                <div style={{ fontSize:12,color:"rgba(255,255,255,.7)",lineHeight:1.8 }}>
                  <div>📍 {trip.fromName}</div>
                  <div style={{ color:"rgba(255,255,255,.3)",marginLeft:6 }}>↓</div>
                  <div>🏁 {trip.toName}</div>
                  {isRoundTrip&&<><div style={{ color:"rgba(255,255,255,.3)",marginLeft:6 }}>↓</div><div style={{ color:"rgba(245,158,11,.7)" }}>🔄 {trip.fromName}</div></>}
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
                  {!dataReady&&<span className="rp-dots"/>}
                </div>
                <h1 style={{ fontSize:28,fontWeight:800,color:DARK,marginBottom:8,lineHeight:1.2 }}>
                  {["Trip Details","Choose Your Vehicle","Personal Details","Review & Confirm"][step]}
                </h1>
                <p style={{ fontSize:14,color:"#6b7280",lineHeight:1.6,margin:0 }}>
                  {["Tell us about your journey — where, when, and how many.",
                    trip.fromId&&trip.toId?`Prices for ${trip.fromName} → ${trip.toName} · ${totalPax} pax${isRoundTrip?" · Round trip (×2)":""}${totalPax>=9?" · 9+ rate (×2)":""}.`:"Select the vehicle that fits your needs and budget.",
                    "Almost there — we just need your contact details.",
                    "Double-check everything before we confirm your booking."][step]}
                </p>
              </div>

              {/* ══ STEP 0 ══ */}
              {step===0&&(
                <div style={{ display:"flex",flexDirection:"column",gap:20 }}>
                  {/* Trip type */}
                  <div>
                    <label style={S.label}>Trip Type</label>
                    <div className="rp-trip-toggle">
                      <button type="button" className={`rp-trip-opt${trip.tripType==="one-way"?" active":""}`}
                        onClick={()=>{setTrip(t=>({...t,tripType:"one-way"}));setVehicleId("");}}>→ One Way</button>
                      <button type="button" className={`rp-trip-opt${trip.tripType==="round-trip"?" active":""}`}
                        onClick={()=>{setTrip(t=>({...t,tripType:"round-trip"}));setVehicleId("");}}>
                        🔄 Round Trip <span style={{ fontSize:11,opacity:.7,marginLeft:4 }}>(price ×2)</span>
                      </button>
                    </div>
                    {isRoundTrip&&(
                      <div style={{ marginTop:8,padding:"8px 14px",background:"#fffbeb",border:"1px solid #fde68a",borderRadius:9,fontSize:12,color:"#92400e",fontWeight:600 }}>
                        💡 Round trip price = one-way price × 2. Return journey details can be added in Special Requests.
                      </div>
                    )}
                  </div>

                  {/* Pickup / Dropoff */}
                  <div>
                    <label style={S.label}>Pickup Location <span style={{ color:GREEN }}>*</span></label>
                    <LocationSelect value={trip.fromId} onChange={setFrom} locations={locations} placeholder="Select pickup location…" error={errors.from} excludeId={trip.toId}/>
                  </div>
                  <div>
                    <label style={S.label}>Drop-off Location <span style={{ color:GREEN }}>*</span></label>
                    <LocationSelect value={trip.toId} onChange={setTo} locations={locations} placeholder="Select drop-off location…" error={errors.to} excludeId={trip.fromId}/>
                  </div>

                  {/* Flight / Train */}
                  {showFlightBox&&(
                    <div>
                      <label style={S.label}>✈️ {flightLabel} <span style={{ fontSize:11,color:"#9ca3af",fontWeight:400 }}>(optional)</span></label>
                      <div className="rp-input-wrap" style={wrap()}>
                        <input type="text" placeholder="e.g. AF1234 or TGV 6201" value={trip.flightOrTrain} onChange={e=>setTrip(t=>({...t,flightOrTrain:e.target.value}))} style={S.input}/>
                      </div>
                    </div>
                  )}

                  {/* Address */}
                  {showAddressBox&&(
                    <div>
                      <label style={S.label}>📍 {addressLabel} <span style={{ fontSize:11,color:"#9ca3af",fontWeight:400 }}>(optional)</span></label>
                      <div className="rp-input-wrap" style={wrap()}>
                        <input type="text" placeholder="e.g. 10 Rue de Rivoli, 75001 Paris" value={trip.dropoffAddress} onChange={e=>setTrip(t=>({...t,dropoffAddress:e.target.value}))} style={S.input}/>
                      </div>
                    </div>
                  )}

                  {/* Date / Time */}
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
                      {/* Night surcharge banner — shows right under the time picker */}
                      {isNightTime(trip.time)&&(
                        <div className="rp-night-banner" style={{ marginTop:10 }}>
                          <div style={{ fontSize:26,flexShrink:0,lineHeight:1 }} className="rp-night-star">🌙</div>
                          <div style={{ flex:1 }}>
                            <div style={{ fontSize:13,fontWeight:800,color:"#e0e7ff",marginBottom:3 }}>Night Surcharge Applied</div>
                            <div style={{ fontSize:11,color:"rgba(196,181,253,.8)",lineHeight:1.5 }}>
                              Pickups between <strong style={{ color:"#c4b5fd" }}>10:00 PM – 6:00 AM</strong> include a night surcharge of <strong style={{ color:"#a5f3fc" }}>+€{NIGHT_SURCHARGE}</strong> added to your fare.
                            </div>
                          </div>
                          <div style={{ flexShrink:0,background:"rgba(165,243,252,.15)",border:"1px solid rgba(165,243,252,.3)",borderRadius:10,padding:"8px 14px",textAlign:"center" }}>
                            <div style={{ fontSize:10,color:"rgba(165,243,252,.7)",fontWeight:700,letterSpacing:".08em",textTransform:"uppercase",marginBottom:2 }}>Extra</div>
                            <div style={{ fontSize:22,fontWeight:900,color:"#a5f3fc",lineHeight:1 }}>+€{NIGHT_SURCHARGE}</div>
                          </div>
                        </div>
                      )}
                    </>)}
                  </div>

                  {/* Counters */}
                  <div className="rp-grid">
                    {counter("passengers",1,16,"Passengers")}
                    {counter("kids",0,6,"Children (under 12)")}
                    {counter("bags",0,16,"Luggage Bags")}
                  </div>

                  {/* 9+ notice */}
                  {totalPax>=9&&(
                    <div style={{ background:"linear-gradient(135deg,#fffbeb,#fef3c7)",border:"1.5px solid #fcd34d",borderRadius:12,padding:"12px 16px",display:"flex",alignItems:"center",gap:12 }}>
                      <span style={{ fontSize:22,flexShrink:0 }}>⚡</span>
                      <div>
                        <div style={{ fontWeight:700,color:"#92400e",fontSize:13 }}>Large group — {totalPax} passengers</div>
                        <div style={{ color:"#b45309",fontSize:12,marginTop:2 }}>9+ pax price = 8-pax price × 2{isRoundTrip?" · then ×2 for round trip":""}.</div>
                      </div>
                    </div>
                  )}

                  {/* Suggestion */}
                  {totalPax>0&&totalPax<9&&(()=>{
                    const fits=vehiclesWithPrice.filter(v=>!v.paxExceeded&&!v.lugExceeded);
                    const smallest=fits.sort((a,b)=>a.maxPassengers-b.maxPassengers)[0];
                    if(!smallest) return null;
                    return (
                      <div style={{ background:"#f0fdf4",border:"1px solid #bbf7d0",borderRadius:12,padding:"12px 16px",display:"flex",alignItems:"center",gap:12,fontSize:13 }}>
                        <div style={{ width:32,height:32,borderRadius:"50%",background:"#dcfce7",display:"flex",alignItems:"center",justifyContent:"center",flexShrink:0 }}>
                          <svg width={16} height={16} fill="none" viewBox="0 0 24 24" stroke={GREEN} strokeWidth={2.5}><path strokeLinecap="round" strokeLinejoin="round" d="M9 12l2 2 4-4"/></svg>
                        </div>
                        <div>
                          <span style={{ fontWeight:700,color:"#14532d" }}>For {totalPax} passenger{totalPax!==1?"s":""}:</span>
                          <span style={{ color:"#166534",marginLeft:6 }}>We suggest the <strong>{smallest.name}</strong> (fits up to {smallest.maxPassengers} pax)</span>
                        </div>
                      </div>
                    );
                  })()}
                </div>
              )}

              {/* ══ STEP 1 ══ */}
              {step===1&&(
                <div style={{ display:"flex",flexDirection:"column",gap:14 }}>
                  {errors.vehicle&&<div style={{ background:"#fef2f2",border:"1px solid #fecaca",color:"#dc2626",padding:"10px 16px",borderRadius:10,fontSize:14,fontWeight:600 }}>{errors.vehicle}</div>}

                  {isRoundTrip&&(
                    <div style={{ background:"linear-gradient(135deg,#fffbeb,#fef3c7)",border:"1.5px solid #fcd34d",borderRadius:12,padding:"12px 16px",display:"flex",gap:12,alignItems:"center" }}>
                      <span style={{ fontSize:20 }}>🔄</span>
                      <div>
                        <div style={{ fontWeight:700,color:"#92400e",fontSize:13 }}>Round trip — all prices doubled</div>
                        <div style={{ fontSize:12,color:"#b45309",marginTop:1 }}>Prices shown include both outbound and return journeys</div>
                      </div>
                    </div>
                  )}

                  {totalPax>=9&&(
                    <div style={{ background:"linear-gradient(135deg,#fffbeb,#fef3c7)",border:"1.5px solid #fcd34d",borderRadius:12,padding:"12px 16px",display:"flex",gap:12,alignItems:"center" }}>
                      <span style={{ fontSize:20 }}>⚡</span>
                      <div>
                        <div style={{ fontWeight:700,color:"#92400e",fontSize:13 }}>{totalPax} passengers — 9+ pax rate applies</div>
                        <div style={{ fontSize:12,color:"#b45309",marginTop:1 }}>Base price = 8-pax price × 2{isRoundTrip?" · then ×2 for round trip":""}</div>
                      </div>
                    </div>
                  )}

                  {/* Night surcharge notice on vehicle step */}
                  {nightSurcharge>0&&(
                    <div className="rp-night-banner">
                      <div style={{ fontSize:22,flexShrink:0 }} className="rp-night-star">🌙</div>
                      <div style={{ flex:1 }}>
                        <div style={{ fontSize:13,fontWeight:800,color:"#e0e7ff",marginBottom:2 }}>Night Surcharge Included in All Prices</div>
                        <div style={{ fontSize:11,color:"rgba(196,181,253,.8)" }}>+€{NIGHT_SURCHARGE} night fee (10 PM–6 AM) has been added to each fare shown below</div>
                      </div>
                      <div style={{ flexShrink:0,background:"rgba(165,243,252,.15)",border:"1px solid rgba(165,243,252,.3)",borderRadius:9,padding:"6px 12px",textAlign:"center" }}>
                        <div style={{ fontSize:9,color:"rgba(165,243,252,.7)",fontWeight:700,letterSpacing:".08em",textTransform:"uppercase",marginBottom:1 }}>Added</div>
                        <div style={{ fontSize:18,fontWeight:900,color:"#a5f3fc",lineHeight:1 }}>+€{NIGHT_SURCHARGE}</div>
                      </div>
                    </div>
                  )}

                  {(()=>{
                    const locked=vehiclesWithPrice.filter(v=>v.paxExceeded||v.lugExceeded);
                    const available=vehiclesWithPrice.filter(v=>!v.paxExceeded&&!v.lugExceeded);
                    if(locked.length===0||available.length===0) return null;
                    const suggest=available.sort((a,b)=>a.maxPassengers-b.maxPassengers)[0];
                    const reason=locked.some(v=>v.paxExceeded)&&locked.some(v=>v.lugExceeded)?`${totalPax} passengers and ${trip.bags} bags`:locked.some(v=>v.paxExceeded)?`${totalPax} passenger${totalPax!==1?"s":""}`: `${trip.bags} bag${trip.bags!==1?"s":""}`;
                    return (
                      <div style={{ background:"linear-gradient(135deg,#fff7ed,#fffbeb)",border:"1.5px solid #fed7aa",borderRadius:14,padding:"14px 18px",display:"flex",gap:14,alignItems:"flex-start" }}>
                        <div style={{ width:36,height:36,borderRadius:"50%",background:"#ffedd5",display:"flex",alignItems:"center",justifyContent:"center",flexShrink:0,marginTop:1 }}><span style={{ fontSize:18 }}>🚐</span></div>
                        <div>
                          <div style={{ fontWeight:700,color:"#9a3412",fontSize:13,marginBottom:3 }}>Some vehicles can't fit your group of {reason}</div>
                          <div style={{ fontSize:12,color:"#c2410c",lineHeight:1.5 }}>{locked.length} vehicle{locked.length!==1?" types are":" type is"} locked below.{suggest&&<> We recommend the <strong>{suggest.name}</strong> (up to {suggest.maxPassengers} pax · {suggest.maxLuggage} bags).</>}</div>
                        </div>
                      </div>
                    );
                  })()}

                  {vehiclesWithPrice.length===0&&(
                    <div style={{ background:"#fffbeb",border:"1px solid #fde68a",color:"#92400e",padding:"16px 20px",borderRadius:12,fontSize:14,textAlign:"center" }}>
                      ⚠️ No vehicles available for this route. Please contact us directly.
                    </div>
                  )}

                  {vehiclesWithPrice.map(v=>{
                    const sel=vehicleId===v.id;
                    const isLocked=v.paxExceeded||v.lugExceeded;
                    const isRecom=recommendedVehicle?.id===v.id&&!sel;
                    const lockReasons:string[]=[];
                    if(v.paxExceeded) lockReasons.push(`${totalPax} pax exceeds ${v.maxPassengers}-pax limit`);
                    if(v.lugExceeded) lockReasons.push(`${trip.bags} bags exceeds ${v.maxLuggage}-bag limit`);
                    const nextFit=vehiclesWithPrice.filter(x=>!x.paxExceeded&&!x.lugExceeded&&x.id!==v.id).sort((a,b)=>a.maxPassengers-b.maxPassengers)[0];
                    return (
                      <div key={v.id} className={`rp-vehicle${sel?" sel":""}${isLocked?" rp-locked":""}${isRecom?" rp-recommended":""}`}
                        onClick={()=>{ if(!isLocked) setVehicleId(v.id); }}>
                        {sel&&<div style={{ position:"absolute",top:0,left:0,right:0,height:36,background:"#f59e0b",display:"flex",alignItems:"center",justifyContent:"center",gap:6,zIndex:3 }}>
                          <svg width={14} height={14} fill="none" viewBox="0 0 24 24" stroke="#fff" strokeWidth={3}><path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7"/></svg>
                          <span style={{ fontSize:11,fontWeight:800,color:"#fff",letterSpacing:".08em",textTransform:"uppercase" }}>Selected</span>
                        </div>}
                        {isLocked&&(
                          <div className="rp-lock-overlay">
                            <div style={{ width:40,height:40,borderRadius:"50%",background:"#fee2e2",display:"flex",alignItems:"center",justifyContent:"center" }}>
                              <svg width={20} height={20} fill="none" viewBox="0 0 24 24" stroke="#dc2626" strokeWidth={2.5}><path strokeLinecap="round" strokeLinejoin="round" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"/></svg>
                            </div>
                            <div style={{ textAlign:"center",padding:"0 16px" }}>
                              <div style={{ fontSize:12,fontWeight:700,color:"#dc2626",marginBottom:4 }}>Not available for your group</div>
                              <div style={{ fontSize:11,color:"#b91c1c",lineHeight:1.5,marginBottom:6 }}>{lockReasons.join(" · ")}</div>
                              {nextFit&&<button type="button" onClick={e=>{e.stopPropagation();setVehicleId(nextFit.id);}} style={{ padding:"6px 14px",borderRadius:8,fontSize:11,fontWeight:700,background:"#16a34a",color:"#fff",border:"none",cursor:"pointer" }}>Switch to {nextFit.name} →</button>}
                            </div>
                          </div>
                        )}
                        <div style={{ width:180,minWidth:180,flexShrink:0,position:"relative",overflow:"hidden",opacity:isLocked?.35:1,marginTop:sel?36:0 }}>
                          <img src={v.img} alt={v.name} style={{ width:"100%",height:"100%",minHeight:sel?110:140,objectFit:"cover",display:"block" }}/>
                          {isRecom&&!isLocked&&!sel&&<div style={{ position:"absolute",top:8,left:8,background:"#16a34a",color:"#fff",fontSize:9,fontWeight:800,padding:"3px 7px",borderRadius:5,letterSpacing:".08em",textTransform:"uppercase" }}>✦ Best fit</div>}
                          {v.isDoubled&&!isLocked&&<div style={{ position:"absolute",bottom:8,left:8,background:"#d97706",color:"#fff",fontSize:9,fontWeight:800,padding:"3px 7px",borderRadius:5 }}>×2 RATE</div>}
                          {isRoundTrip&&!isLocked&&<div style={{ position:"absolute",bottom:8,right:8,background:"#111827",color:"#f59e0b",fontSize:9,fontWeight:800,padding:"3px 7px",borderRadius:5 }}>RT ×2</div>}
                          {nightSurcharge>0&&!isLocked&&<div style={{ position:"absolute",top:8,right:8,background:"#312e81",color:"#a5f3fc",fontSize:9,fontWeight:800,padding:"3px 7px",borderRadius:5 }}>🌙 +€{NIGHT_SURCHARGE}</div>}
                        </div>
                        <div style={{ flex:1,padding:"14px 18px",display:"flex",flexDirection:"column",justifyContent:"space-between",opacity:isLocked?.4:1,marginTop:sel?36:0 }}>
                          <div>
                            <div style={{ display:"flex",justifyContent:"space-between",alignItems:"center",marginBottom:4 }}>
                              <span style={{ fontSize:13,fontWeight:800,textTransform:"uppercase",letterSpacing:"0.04em",color:DARK }}>{v.name}</span>
                              <div style={{ display:"flex",gap:5,flexWrap:"wrap",justifyContent:"flex-end" }}>
                                {v.tag&&<span style={{ fontSize:10,fontWeight:700,background:sel?AMBER:GREEN,color:"#fff",padding:"2px 8px",borderRadius:999 }}>{v.tag}</span>}
                                {isRecom&&!sel&&<span style={{ fontSize:10,fontWeight:700,background:"#dcfce7",color:"#16a34a",padding:"2px 8px",borderRadius:999,border:"1px solid #bbf7d0" }}>Recommended</span>}
                              </div>
                            </div>
                            <div style={{ fontSize:11,color:"#9ca3af",fontStyle:"italic",marginBottom:8 }}>{v.model}</div>
                            <div style={{ display:"flex",gap:12,marginBottom:8 }}>
                              <div style={{ flex:1 }}>
                                <div style={{ display:"flex",justifyContent:"space-between",fontSize:9,fontWeight:700,textTransform:"uppercase",letterSpacing:".07em",color:v.paxExceeded?"#dc2626":"#9ca3af",marginBottom:3 }}>
                                  <span>👤 Passengers</span><span style={{ color:v.paxExceeded?"#dc2626":totalPax>0?"#374151":"#9ca3af" }}>{totalPax}/{v.maxPassengers}</span>
                                </div>
                                <div style={{ height:5,background:"#f3f4f6",borderRadius:99,overflow:"hidden" }}>
                                  <div style={{ height:"100%",width:`${Math.min(100,(totalPax/v.maxPassengers)*100)}%`,background:v.paxExceeded?"#ef4444":totalPax/v.maxPassengers>0.8?"#f59e0b":"#22c55e",borderRadius:99,transition:"width .3s" }}/>
                                </div>
                              </div>
                              <div style={{ flex:1 }}>
                                <div style={{ display:"flex",justifyContent:"space-between",fontSize:9,fontWeight:700,textTransform:"uppercase",letterSpacing:".07em",color:v.lugExceeded?"#dc2626":"#9ca3af",marginBottom:3 }}>
                                  <span>🧳 Luggage</span><span style={{ color:v.lugExceeded?"#dc2626":trip.bags>0?"#374151":"#9ca3af" }}>{trip.bags}/{v.maxLuggage}</span>
                                </div>
                                <div style={{ height:5,background:"#f3f4f6",borderRadius:99,overflow:"hidden" }}>
                                  <div style={{ height:"100%",width:`${Math.min(100,(trip.bags/v.maxLuggage)*100)}%`,background:v.lugExceeded?"#ef4444":trip.bags/v.maxLuggage>0.8?"#f59e0b":"#22c55e",borderRadius:99,transition:"width .3s" }}/>
                                </div>
                              </div>
                            </div>
                            <div style={{ display:"flex",flexWrap:"wrap",gap:5,marginBottom:6 }}>
                              {features.map(f=><span key={f} className="rp-badge">{f}</span>)}
                            </div>
                            {v.special&&<div style={{ background:"#fffbeb",border:"1px solid #fde68a",color:"#92400e",padding:"5px 10px",borderRadius:7,fontSize:11,fontWeight:600,marginTop:4 }}>⚠️ {v.special}</div>}
                          </div>
                          <div style={{ display:"flex",alignItems:"center",justifyContent:"space-between",marginTop:12,paddingTop:10,borderTop:`1px solid ${sel?"#fde68a":"#f3f4f6"}` }}>
                            <div>
                              {v.onDemand?(<><div style={{ fontSize:16,fontWeight:800,color:"#d97706",lineHeight:1 }}>On Demand</div><div style={{ fontSize:10,color:"#9ca3af",marginTop:2 }}>Contact us for price</div></>):
                              v.routePrice!==null?(<>
                                <div style={{ display:"flex",alignItems:"baseline",gap:6,flexWrap:"wrap" }}>
                                  <div style={{ fontSize:22,fontWeight:900,color:sel?"#d97706":DARK,lineHeight:1 }}>{v.routePrice} <span style={{ fontSize:13,fontWeight:700 }}>EUR</span></div>
                                  {v.isDoubled&&<span style={{ fontSize:10,fontWeight:700,background:"#fef3c7",color:"#d97706",padding:"2px 6px",borderRadius:5,border:"1px solid #fcd34d" }}>×2</span>}
                                  {isRoundTrip&&<span style={{ fontSize:10,fontWeight:700,background:"#fff7ed",color:"#ea580c",padding:"2px 6px",borderRadius:5,border:"1px solid #fed7aa" }}>RT</span>}
                                  {nightSurcharge>0&&<span style={{ fontSize:10,fontWeight:700,background:"#ede9fe",color:"#7c3aed",padding:"2px 6px",borderRadius:5,border:"1px solid #ddd6fe" }}>🌙 +€{NIGHT_SURCHARGE}</span>}
                                </div>
                                <div style={{ fontSize:10,color:"#9ca3af",marginTop:2 }}>✓ {totalPax} pax · {isRoundTrip?"round trip":"one way"} · fixed · incl. VAT{nightSurcharge>0?" · incl. night fee":""}</div>
                              </>):(<div style={{ fontSize:14,color:"#9ca3af" }}>Price unavailable</div>)}
                            </div>
                            {!isLocked&&(
                              <button type="button" onClick={e=>{e.stopPropagation();setVehicleId(sel?"":v.id);}}
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

              {/* ══ STEP 2 ══ */}
              {step===2&&(
                <div style={{ display:"flex",flexDirection:"column",gap:16 }}>
                  {field(<><label style={S.label}>Full Name <span style={{ color:GREEN }}>*</span></label><div className="rp-input-wrap" style={wrap(errors.name)}><input type="text" placeholder="e.g. John Smith" value={personal.name} onChange={e=>setPersonal(p=>({...p,name:e.target.value}))} style={S.input}/></div>{errEl(errors.name)}</>)}
                  {field(<><label style={S.label}>Country <span style={{ color:GREEN }}>*</span></label><div className="rp-input-wrap" style={wrap(errors.country)}><select value={personal.country} onChange={e=>setPersonal(p=>({...p,country:e.target.value}))} style={S.select}><option value="">Select your country…</option>{COUNTRIES.map(c=><option key={c}>{c}</option>)}</select></div>{errEl(errors.country)}</>)}
                  <div className="rp-grid">
                    {field(<>
                      <label style={S.label}>WhatsApp Number <span style={{ color:GREEN }}>*</span></label>
                      <div className="rp-input-wrap" style={wrap(errors.whatsapp)}>
                        {dialCode&&<div className="dial-prefix">{dialCode}</div>}
                        <input type="tel" placeholder={dialCode?"6 12 34 56 78":"Select country first…"} value={personal.whatsapp} onChange={e=>setPersonal(p=>({...p,whatsapp:e.target.value}))} style={S.input}/>
                      </div>
                      {errEl(errors.whatsapp)}
                      <span style={{ fontSize:11,color:dialCode?"#16a34a":"#9ca3af",marginTop:3,fontWeight:dialCode?600:400 }}>
                        {dialCode?`✓ Country code ${dialCode} will be added automatically`:"Select a country above to auto-add the country code"}
                      </span>
                    </>)}
                    {field(<><label style={S.label}>Email Address <span style={{ color:GREEN }}>*</span></label><div className="rp-input-wrap" style={wrap(errors.email)}><input type="email" placeholder="you@example.com" value={personal.email} onChange={e=>setPersonal(p=>({...p,email:e.target.value}))} style={S.input}/></div>{errEl(errors.email)}</>)}
                  </div>
                  {field(<><label style={S.label}>Special Requests <span style={{ fontSize:12,color:"#9ca3af",fontWeight:400 }}>(optional)</span></label><textarea rows={4} placeholder="Return date/time for round trip, flight number, special assistance…" value={personal.notes} onChange={e=>setPersonal(p=>({...p,notes:e.target.value}))} style={{ width:"100%",border:"1.5px solid #e5e7eb",borderRadius:10,padding:"12px 14px",fontSize:14,color:DARK,resize:"none",outline:"none",fontFamily:"inherit",boxSizing:"border-box" }}/></>)}

                  {/* ── Payment Method ── */}
                  <div>
                    <label style={{ ...S.label,marginBottom:10 }}>
                      Payment Method <span style={{ color:GREEN }}>*</span>
                    </label>
                    <div style={{ display:"flex",gap:12,flexWrap:"wrap" }}>
                      {/* Cash option */}
                      <div
                        className={`rp-payment-opt${paymentMethod==="cash"?" selected":""}`}
                        onClick={()=>setPaymentMethod("cash")}
                        style={{ border:`2px solid ${paymentMethod==="cash"?"#111827":"#e5e7eb"}` }}
                      >
                        <div style={{ width:44,height:44,borderRadius:12,background:paymentMethod==="cash"?"#111827":"#f3f4f6",display:"flex",alignItems:"center",justifyContent:"center",flexShrink:0,transition:"background .2s",fontSize:22 }}>
                          💵
                        </div>
                        <div style={{ flex:1,minWidth:0 }}>
                          <div style={{ fontSize:14,fontWeight:700,color:DARK,marginBottom:2 }}>Cash to Driver</div>
                          <div style={{ fontSize:11,color:"#6b7280",lineHeight:1.4 }}>Pay in cash on arrival — no card needed</div>
                        </div>
                        <div style={{ width:20,height:20,borderRadius:"50%",border:`2px solid ${paymentMethod==="cash"?"#111827":"#d1d5db"}`,display:"flex",alignItems:"center",justifyContent:"center",flexShrink:0,transition:"all .2s" }}>
                          {paymentMethod==="cash"&&<div style={{ width:10,height:10,borderRadius:"50%",background:"#111827" }}/>}
                        </div>
                      </div>

                      {/* Card option */}
                      <div
                        className={`rp-payment-opt${paymentMethod==="card"?" selected":""}`}
                        onClick={()=>setPaymentMethod("card")}
                        style={{ border:`2px solid ${paymentMethod==="card"?"#111827":"#e5e7eb"}` }}
                      >
                        <div style={{ width:44,height:44,borderRadius:12,background:paymentMethod==="card"?"#111827":"#f3f4f6",display:"flex",alignItems:"center",justifyContent:"center",flexShrink:0,transition:"background .2s",fontSize:22 }}>
                          💳
                        </div>
                        <div style={{ flex:1,minWidth:0 }}>
                          <div style={{ fontSize:14,fontWeight:700,color:DARK,marginBottom:2 }}>Card to Driver</div>
                          <div style={{ fontSize:11,color:"#6b7280",lineHeight:1.4 }}>Pay by card on arrival — Visa, Mastercard accepted</div>
                        </div>
                        <div style={{ width:20,height:20,borderRadius:"50%",border:`2px solid ${paymentMethod==="card"?"#111827":"#d1d5db"}`,display:"flex",alignItems:"center",justifyContent:"center",flexShrink:0,transition:"all .2s" }}>
                          {paymentMethod==="card"&&<div style={{ width:10,height:10,borderRadius:"50%",background:"#111827" }}/>}
                        </div>
                      </div>
                    </div>
                    {errEl(errors.paymentMethod)}
                    {paymentMethod&&(
                      <div style={{ marginTop:10,padding:"8px 14px",background:"#f0fdf4",border:"1px solid #bbf7d0",borderRadius:9,fontSize:12,color:"#166534",fontWeight:600,display:"flex",alignItems:"center",gap:8 }}>
                        <svg width={14} height={14} fill="none" viewBox="0 0 24 24" stroke={GREEN} strokeWidth={2.5}><path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7"/></svg>
                        {paymentMethod==="cash"?"You'll pay cash directly to your driver upon arrival.":"You'll pay by card directly to your driver upon arrival."}
                      </div>
                    )}
                  </div>
                </div>
              )}

              {/* ══ STEP 3 ══ */}
              {step===3&&(
                <div style={{ display:"flex",flexDirection:"column",gap:14 }}>
                  <SummaryCard title="Trip Details" rows={[
                    ["Trip Type", isRoundTrip?"🔄 Round Trip (×2 price)":"→ One Way"],
                    ["Pickup",    trip.fromName],["Drop-off",trip.toName],
                    ["Date",     trip.date],["Time",trip.time],
                    ["Passengers",`${trip.passengers} adult${trip.passengers!==1?"s":""}${trip.kids>0?`, ${trip.kids} child${trip.kids!==1?"ren":""}`:""} (${totalPax} total)`],
                    ["Luggage",  `${trip.bags} bag${trip.bags!==1?"s":""}`],
                    ...(trip.flightOrTrain?[["Flight/Train",trip.flightOrTrain] as [string,string]]:[]),
                    ...(trip.dropoffAddress?[["Address",trip.dropoffAddress] as [string,string]]:[]),
                  ]}/>
                  {vehicle&&(
                    <div style={{ border:"1px solid #e5e7eb",borderRadius:14,overflow:"hidden" }}>
                      <div style={{ background:"#f9fafb",padding:"12px 20px",borderBottom:"1px solid #e5e7eb" }}><span style={{ fontSize:13,fontWeight:700,color:DARK }}>Vehicle</span></div>
                      <div style={{ display:"flex",alignItems:"center",gap:14,padding:"14px 20px" }}>
                        <img src={vehicle.img} alt={vehicle.name} style={{ width:64,height:46,borderRadius:7,objectFit:"cover" }}/>
                        <div><div style={{ fontWeight:700,color:DARK,fontSize:14 }}>{vehicle.name}</div><div style={{ fontSize:12,color:"#9ca3af" }}>{vehicle.model}</div></div>
                      </div>
                    </div>
                  )}
                  <SummaryCard title="Your Details" rows={[
                    ["Name",personal.name],["Country",personal.country],
                    ["WhatsApp",`${dialCode}${personal.whatsapp}`],["Email",personal.email],
                    ["Payment",paymentMethod==="cash"?"💵 Cash to driver":"💳 Card to driver"],
                    ...(personal.notes?[["Notes",personal.notes] as [string,string]]:[]),
                  ]}/>

                  {/* Fare breakdown */}
                  <div style={{ border:"1px solid #e5e7eb",borderRadius:14,overflow:"hidden" }}>
                    <div style={{ background:"#f9fafb",padding:"12px 20px",borderBottom:"1px solid #e5e7eb" }}>
                      <span style={{ fontSize:13,fontWeight:700,color:DARK }}>Fare Breakdown</span>
                    </div>
                    <div style={{ padding:"4px 0" }}>
                      <div style={{ display:"flex",justifyContent:"space-between",alignItems:"center",padding:"10px 20px",fontSize:14 }}>
                        <span style={{ color:"#6b7280" }}>Base fare {isRoundTrip?"(×2 round trip)":""}{vehicle?.isDoubled?" (×2 9+ pax)":""}</span>
                        <span style={{ fontWeight:600,color:DARK }}>{vehicle?.onDemand?"On Demand":vehicle?.baseRoutePrice!==null?`€${vehicle?.baseRoutePrice}`:"—"}</span>
                      </div>
                      {nightSurcharge>0&&(
                        <div style={{ display:"flex",justifyContent:"space-between",alignItems:"center",padding:"10px 20px",fontSize:14,background:"#f5f3ff",borderTop:"1px dashed #ddd6fe",borderBottom:"1px dashed #ddd6fe" }}>
                          <span style={{ color:"#7c3aed",display:"flex",alignItems:"center",gap:6,fontWeight:600 }}>
                            <span>🌙</span> Night Surcharge (10 PM – 6 AM)
                          </span>
                          <span style={{ fontWeight:700,color:"#7c3aed" }}>+€{NIGHT_SURCHARGE}</span>
                        </div>
                      )}
                      <div style={{ display:"flex",justifyContent:"space-between",alignItems:"center",padding:"14px 20px",fontSize:17,fontWeight:800,borderTop:"2px solid #e5e7eb" }}>
                        <span style={{ color:DARK }}>Total</span>
                        <span style={{ color:GREEN }}>{vehicle?.onDemand?"On Demand":`€${confirmedPrice}`}</span>
                      </div>
                    </div>
                  </div>

                  <div style={{ background:DARK,borderRadius:14,padding:"18px 24px",display:"flex",justifyContent:"space-between",alignItems:"center" }}>
                    <div>
                      <div style={{ fontSize:13,color:"rgba(255,255,255,.45)",marginBottom:3 }}>Total Fare · {totalPax} pax · {isRoundTrip?"Round Trip":"One Way"}</div>
                      <div style={{ fontSize:11,color:"rgba(255,255,255,.25)" }}>Fixed · incl. VAT · Pay on arrival{isRoundTrip?" · round trip ×2":""}{vehicle?.isDoubled?" · 9+ pax ×2":""}{nightSurcharge>0?" · incl. 🌙 night fee":""}</div>
                    </div>
                    <div style={{ textAlign:"right" }}>
                      <div style={{ fontSize:34,fontWeight:900,color:"#4ade80" }}>
                        {vehicle?.onDemand?<span style={{ fontSize:20 }}>On Demand</span>:`€${confirmedPrice}`}
                      </div>
                      {(isRoundTrip||vehicle?.isDoubled||nightSurcharge>0)&&<div style={{ fontSize:10,color:"#f59e0b",marginTop:2 }}>{[isRoundTrip?"RT ×2":"",vehicle?.isDoubled?"9+pax ×2":"",nightSurcharge>0?"🌙 +€15":""].filter(Boolean).join(" · ")}</div>}
                    </div>
                  </div>
                </div>
              )}

              <div style={{ display:"flex",gap:12,marginTop:32 }}>
                {step>0&&<button type="button" onClick={back} className="rp-btn-back">← Back</button>}
                {step<3
                  ?<button type="button" onClick={next} className="rp-btn-next">{step===2?"Review Booking →":"Continue →"}</button>
                  :<button type="button" onClick={submit} disabled={sending} className="rp-btn-ok">
                    {sending?<><div className="rp-spin"/> Sending…</>:<><svg width={17} height={17} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}><path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7"/></svg> Confirm Booking</>}
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