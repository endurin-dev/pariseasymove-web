"use client";

import { useState, useEffect } from "react";

interface TripDetails {
  fromId: string; toId: string;
  fromName: string; toName: string;
  tripType: "one-way" | "round-trip";
  date: string; time: string;
  returnDate: string; returnTime: string;
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

function LocationSelect({ value, onChange, locations, placeholder, error }: {
  value: string; onChange: (id: string) => void; locations: Location[];
  placeholder: string; error?: string;
}) {
  const groups = groupByCategory(locations.filter(l => l.active));
  return (
    <div style={{ display:"flex",flexDirection:"column" }}>
      <div style={{ border:`1.5px solid ${error?"#dc2626":"#e5e7eb"}`,borderRadius:10,background:"#fff",display:"flex",alignItems:"center",overflow:"hidden" }}>
        <select value={value} onChange={e => onChange(e.target.value)}
          style={{ width:"100%",border:"none",outline:"none",padding:"13px 14px",fontSize:14,background:"transparent",color:value?DARK:"#9ca3af",appearance:"none",cursor:"pointer",fontFamily:"inherit" }}>
          <option value="" disabled>{placeholder}</option>
          {Array.from(groups.entries()).map(([cat, locs]) => (
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
    date:"",time:"",returnDate:"",returnTime:"",
    passengers:1,kids:0,bags:1,flightOrTrain:"",dropoffAddress:"",
  });
  const [vehicleId,setVehicleId] = useState("");
  const [personal, setPersonal]  = useState<Personal>({ name:"",country:"",whatsapp:"",email:"",notes:"" });
  const [paymentMethod, setPaymentMethod] = useState<"cash"|"card"|"">("");
  const [sending,  setSending]   = useState(false);
  const [done,     setDone]      = useState(false);
  const [bookingRef,setBookingRef]= useState("");
  const [errors,   setErrors]    = useState<Record<string,string>>({});

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
        const fromParam = sp.get("from"), toParam = sp.get("to");
        const dateParam = sp.get("date"), timeParam = sp.get("time");
        const paxParam  = sp.get("passengers"), kidsParam = sp.get("kids");
        const typeParam = sp.get("tripType");
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

  useEffect(() => {
    if (!personal.country) return;
    setPersonal(p => ({ ...p, whatsapp:p.whatsapp.replace(/^\+\d{1,4}\s?/,"").replace(/^\+/,"") }));
  }, [personal.country]);

  const totalPax    = trip.passengers + trip.kids;
  const isRoundTrip = trip.tripType === "round-trip";
  const nightSurcharge       = isNightTime(trip.time) ? NIGHT_SURCHARGE : 0;
  const returnNightSurcharge = isRoundTrip && isNightTime(trip.returnTime) ? NIGHT_SURCHARGE : 0;

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
      return {...v,routePrice:routeBase+nightSurcharge+returnNightSurcharge,baseRoutePrice:routeBase,onDemand:false,noRate:false,paxExceeded,lugExceeded,isDoubled:false};
    }
    const rate=getRateRecord(v.id);
    if (!rate) return {...v,routePrice:null,baseRoutePrice:null,onDemand:false,noRate:true,paxExceeded,lugExceeded,isDoubled:false};
    if (rate.onDemand) return {...v,routePrice:null,baseRoutePrice:null,onDemand:true,noRate:false,paxExceeded,lugExceeded,isDoubled:false};
    const base=calcPrice(rate,totalPax);
    const routeBase=base!==null&&isRoundTrip?base*2:base;
    const final=routeBase!==null?routeBase+nightSurcharge+returnNightSurcharge:null;
    return {...v,routePrice:final,baseRoutePrice:routeBase,onDemand:false,noRate:false,paxExceeded,lugExceeded,isDoubled:totalPax>=9};
  }).filter(v=>!v.noRate);

  const noVehiclesForRoute = !!(trip.fromId && trip.toId && dataReady && vehiclesWithPrice.length === 0);
  const isQuoteRequest = noVehiclesForRoute;

  const recommendedVehicle = vehiclesWithPrice.filter(v=>!v.paxExceeded&&!v.lugExceeded).sort((a,b)=>a.maxPassengers-b.maxPassengers)[0]??null;
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
      if (!trip.date) e.date="Required";
      if (!trip.time) e.time="Required";
      if (isRoundTrip) {
        if (!trip.returnDate) e.returnDate="Required for round trip";
        if (!trip.returnTime) e.returnTime="Required for round trip";
        if (trip.returnDate&&trip.date&&trip.returnDate<trip.date) e.returnDate="Return date must be on or after departure date";
      }
    }
    if (step===1&&!vehicleId&&!isQuoteRequest) e.vehicle="Please select a vehicle";
    if (step===2) {
      if (!personal.name.trim())     e.name="Required";
      if (!personal.country.trim())  e.country="Required";
      if (!personal.whatsapp.trim()) e.whatsapp="Required";
      if (!personal.email.trim())    e.email="Required";
      else if (!/\S+@\S+\.\S+/.test(personal.email)) e.email="Invalid email";
      if (!paymentMethod && !isQuoteRequest) e.paymentMethod="Please select a payment method";
    }
    setErrors(e);
    return Object.keys(e).length===0;
  };

  const scrollToTop = () => { window.scrollTo({ top: 0, behavior: "smooth" }); };
  const next = () => { if (validate()) { setStep(s=>s+1); scrollToTop(); } };
  const back = () => { setStep(s=>s-1); setErrors({}); scrollToTop(); };

  const submit = async () => {
    setSending(true);
    const code = COUNTRY_CODES[personal.country] ?? "";
    const rawNumber = personal.whatsapp.trim().replace(/^\+\d{1,4}\s?/, "").replace(/^\+/, "");
    const fullWhatsapp = code ? `${code}${rawNumber}` : personal.whatsapp;
    const noteParts = [
      isQuoteRequest ? "⚠️ QUOTE REQUEST — no rate on file for this route" : "",
      isRoundTrip ? "ROUND TRIP" : "",
      isRoundTrip && trip.returnDate ? `Return Date: ${trip.returnDate}` : "",
      isRoundTrip && trip.returnTime ? `Return Time: ${trip.returnTime}` : "",
      trip.flightOrTrain ? `Flight/Train: ${trip.flightOrTrain}` : "",
      trip.dropoffAddress ? `Address: ${trip.dropoffAddress}` : "",
      nightSurcharge > 0 ? "OUTBOUND NIGHT SURCHARGE (+€15)" : "",
      returnNightSurcharge > 0 ? "RETURN NIGHT SURCHARGE (+€15)" : "",
      !isQuoteRequest ? `Payment: ${paymentMethod === "cash" ? "Cash to driver" : "Card to driver"}` : "",
      personal.notes,
    ].filter(Boolean).join(" | ");

    try {
      // ── Quote request: skip DB entirely, just send email ──
      if (isQuoteRequest) {
        const ref = "PEM-" + Date.now().toString(36).toUpperCase();
        try {
          await fetch("/api/send-booking-email", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
              bookingRef: ref,
              name: personal.name,
              email: personal.email,
              country: personal.country,
              whatsapp: fullWhatsapp,
              fromName: trip.fromName,
              toName: trip.toName,
              date: trip.date,
              time: trip.time,
              returnDate: isRoundTrip ? trip.returnDate : null,
              returnTime: isRoundTrip ? trip.returnTime : null,
              passengers: trip.passengers,
              kids: trip.kids,
              bags: trip.bags,
              vehicleName: "Quote Request",
              vehicleModel: "",
              isRoundTrip,
              flightTrain: trip.flightOrTrain,
              address: trip.dropoffAddress,
              notes: noteParts,
              nightSurcharge,
              returnNightSurcharge,
              basePrice: null,
              totalPrice: null,
              onDemand: true,
              paymentMethod: null,
              isQuoteRequest: true,
            }),
          });
        } catch (emailErr) {
          console.error("Quote email send failed:", emailErr);
        }
        const dataLayer = (window as any).dataLayer || [];
        (window as any).dataLayer = dataLayer;
        dataLayer.push({ event: "quote_requested", booking_id: ref, value: 0, currency: "EUR" });
        setBookingRef(ref);
        setDone(true);
        return;
      }

      // ── Normal booking: save to DB then send email ──
      const res = await fetch("/api/bookings", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          fromLocId: trip.fromId,
          toLocId: trip.toId,
          date: trip.date,
          time: trip.time,
          returnDate: isRoundTrip ? trip.returnDate : null,
          returnTime: isRoundTrip ? trip.returnTime : null,
          passengers: trip.passengers,
          kids: trip.kids,
          bags: trip.bags,
          vehicleId: vehicleId,
          name: personal.name,
          country: personal.country,
          whatsapp: fullWhatsapp,
          email: personal.email,
          notes: noteParts,
          status: "new",
        }),
      });

      if (res.ok) {
        const b = await res.json();
        const ref = (b.id ?? "PEM-" + Date.now().toString(36)).toUpperCase();
        setBookingRef(ref);
        try {
          await fetch("/api/send-booking-email", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
              bookingRef: ref,
              name: personal.name,
              email: personal.email,
              country: personal.country,
              whatsapp: fullWhatsapp,
              fromName: trip.fromName,
              toName: trip.toName,
              date: trip.date,
              time: trip.time,
              returnDate: isRoundTrip ? trip.returnDate : null,
              returnTime: isRoundTrip ? trip.returnTime : null,
              passengers: trip.passengers,
              kids: trip.kids,
              bags: trip.bags,
              vehicleName: vehicle?.name ?? "",
              vehicleModel: vehicle?.model ?? "",
              isRoundTrip,
              flightTrain: trip.flightOrTrain,
              address: trip.dropoffAddress,
              notes: personal.notes,
              nightSurcharge,
              returnNightSurcharge,
              basePrice: vehicle?.baseRoutePrice ?? null,
              totalPrice: confirmedPrice,
              onDemand: vehicle?.onDemand ?? false,
              paymentMethod,
              isQuoteRequest: false,
            }),
          });
        } catch (emailErr) {
          console.error("Email send failed:", emailErr);
        }
        const dataLayer = (window as any).dataLayer || [];
        (window as any).dataLayer = dataLayer;
        dataLayer.push({ event: "booking_confirmed", booking_id: ref, value: confirmedPrice, currency: "EUR" });
        setDone(true);
      } else {
        alert("Something went wrong saving your booking. Please try again.");
      }
    } catch {
      alert("Network error. Please try again.");
    } finally {
      setSending(false);
    }
  };

  const S: Record<string,React.CSSProperties> = {
    label:  { fontSize:13,fontWeight:600,color:"#374151",marginBottom:6,display:"block" },
    input:  { width:"100%",border:"none",outline:"none",padding:"13px 14px",fontSize:14,background:"transparent",color:DARK,fontFamily:"inherit",boxSizing:"border-box" as const },
    select: { width:"100%",border:"none",outline:"none",padding:"13px 14px",fontSize:14,background:"transparent",color:DARK,appearance:"none" as const,cursor:"pointer",fontFamily:"inherit" },
  };
  const wrap  = (e?:string): React.CSSProperties => ({ border:`1.5px solid ${e?"#dc2626":"#e5e7eb"}`,borderRadius:10,background:"#fff",display:"flex",alignItems:"center",overflow:"hidden" });
  const errEl = (m?:string) => m ? <div style={{ fontSize:12,color:"#dc2626",marginTop:4 }}>{m}</div> : null;
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

  const dialCode = COUNTRY_CODES[personal.country] ?? "";

  // ── DONE SCREEN ──────────────────────────────────────────────
  if (done) return (
    <div style={{ display:"flex",alignItems:"center",justifyContent:"center",padding:40,background:"#f4f5f7",minHeight:"60vh" }}>
      <div style={{ maxWidth:520,width:"100%",background:"#fff",borderRadius:20,boxShadow:"0 8px 40px rgba(0,0,0,0.10)",padding:"48px 40px",textAlign:"center" }}>
        <div style={{ width:72,height:72,borderRadius:"50%",background: isQuoteRequest ? "#fef3c7" : "#dcfce7",display:"flex",alignItems:"center",justifyContent:"center",margin:"0 auto 20px" }}>
          {isQuoteRequest
            ? <span style={{ fontSize:34 }}>✉️</span>
            : <svg width={36} height={36} fill="none" viewBox="0 0 24 24" stroke={GREEN} strokeWidth={2.5}><path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7"/></svg>
          }
        </div>
        <h2 style={{ fontSize:28,fontWeight:800,color:DARK,marginBottom:10 }}>
          {isQuoteRequest ? "Quote Request Sent!" : "Booking Confirmed!"}
        </h2>
        <div style={{ display:"inline-block",background: isQuoteRequest ? "#fffbeb" : "#f0fdf4",border:`1px solid ${isQuoteRequest?"#fcd34d":"#bbf7d0"}`,color: isQuoteRequest ? "#92400e" : GREEN,fontWeight:700,fontSize:13,padding:"5px 14px",borderRadius:8,marginBottom:12 }}>
          Ref: {bookingRef}
        </div>
        {isQuoteRequest
          ? <p style={{ color:"#6b7280",marginBottom:28,fontSize:15,lineHeight:1.6 }}>
              We don't have a fixed rate for this route yet, but we've received your request. <strong>We'll send you a personalised quote to {personal.email}</strong> shortly — usually within a few hours.
            </p>
          : <p style={{ color:"#6b7280",marginBottom:28,fontSize:15 }}>Confirmation sent to <strong>{personal.email}</strong></p>
        }
        <div style={{ background:"#f9fafb",borderRadius:12,padding:20,marginBottom:28,textAlign:"left" }}>
          {([
            ["Trip Type", isRoundTrip?"🔄 Round Trip":"→ One Way"],
            ["Route",`${trip.fromName} → ${trip.toName}`],
            ["Departure",`${trip.date} at ${trip.time}`],
            ...(isRoundTrip ? [["Return", `${trip.returnDate} at ${trip.returnTime}`] as [string,string]] : []),
            ["Passengers",`${totalPax} pax`],
            ...(!isQuoteRequest ? [["Vehicle", vehicle?.name??"—"] as [string,string]] : []),
            ...(!isQuoteRequest ? [["Payment",paymentMethod==="cash"?"💵 Cash to driver":"💳 Card to driver"] as [string,string]] : []),
          ] as [string,string][]).map(([l,v])=>(
            <div key={l} style={{ display:"flex",justifyContent:"space-between",padding:"8px 0",borderBottom:"1px solid #e5e7eb",fontSize:14 }}>
              <span style={{ color:"#6b7280" }}>{l}</span>
              <span style={{ fontWeight:600,color:DARK }}>{v}</span>
            </div>
          ))}
          {!isQuoteRequest && nightSurcharge>0&&<div style={{ display:"flex",justifyContent:"space-between",padding:"8px 0",borderBottom:"1px solid #e5e7eb",fontSize:14 }}><span style={{ color:"#6b7280" }}>🌙 Outbound Night Surcharge</span><span style={{ fontWeight:600,color:"#7c3aed" }}>+€{NIGHT_SURCHARGE}</span></div>}
          {!isQuoteRequest && returnNightSurcharge>0&&<div style={{ display:"flex",justifyContent:"space-between",padding:"8px 0",borderBottom:"1px solid #e5e7eb",fontSize:14 }}><span style={{ color:"#6b7280" }}>🌙 Return Night Surcharge</span><span style={{ fontWeight:600,color:"#7c3aed" }}>+€{NIGHT_SURCHARGE}</span></div>}
          <div style={{ display:"flex",justifyContent:"space-between",paddingTop:12,fontSize:18,fontWeight:800 }}>
            <span>{isQuoteRequest ? "Price" : "Total"}</span>
            <span style={{ color: isQuoteRequest ? "#d97706" : GREEN }}>
              {isQuoteRequest ? "Quote to follow by email" : (vehicle?.onDemand?"On Demand":`€${confirmedPrice}`)}
            </span>
          </div>
        </div>
        {isQuoteRequest && (
          <div style={{ background:"#fffbeb",border:"1px solid #fde68a",borderRadius:12,padding:"14px 18px",marginBottom:24,fontSize:13,color:"#92400e",lineHeight:1.6,textAlign:"left" }}>
            💡 <strong>What happens next?</strong> Our team will review your route and send you a personalised fare to <strong>{personal.email}</strong> and via WhatsApp if provided. You're under no obligation until you confirm.
          </div>
        )}
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
        @media(max-width:480px){.rp-card{padding:16px}}
        .rp-grid{display:grid;grid-template-columns:1fr 1fr;gap:16px}
        @media(max-width:600px){.rp-grid{grid-template-columns:1fr}}
        .rp-input-wrap:focus-within{border-color:#16a34a!important;box-shadow:0 0 0 3px rgba(22,163,74,0.1)}
        .rp-step-active{background:#16a34a;border-color:#16a34a;color:#fff}
        .rp-step-done{background:rgba(74,222,128,0.15);border-color:#4ade80;color:#4ade80}
        .rp-step-idle{background:rgba(255,255,255,0.05);border-color:rgba(255,255,255,0.12);color:rgba(255,255,255,0.3)}
        .rp-vc{background:#fff;border-radius:16px;overflow:hidden;cursor:pointer;border:2px solid #e5e7eb;transition:border-color .18s,box-shadow .18s;position:relative}
        .rp-vc:hover:not(.rp-vc-locked){border-color:#f59e0b;box-shadow:0 4px 20px rgba(0,0,0,0.08)}
        .rp-vc.rp-vc-sel{border-color:#f59e0b;box-shadow:0 0 0 4px rgba(245,158,11,0.18)}
        .rp-vc.rp-vc-recom{border-color:#16a34a}
        .rp-vc.rp-vc-locked{opacity:.68;cursor:not-allowed}
        .rp-vc-selbar{height:34px;background:#f59e0b;display:flex;align-items:center;justify-content:center;gap:6px;font-size:11px;font-weight:800;color:#111;letter-spacing:.07em;text-transform:uppercase}
        .rp-vc-photo{position:relative;width:100%;aspect-ratio:16/7;overflow:hidden;background:#1a1a2e}
        @media(min-width:600px){.rp-vc-photo{aspect-ratio:16/6}}
        .rp-vc-photo img{width:100%;height:100%;object-fit:cover;display:block}
        .rp-vc-overlay{position:absolute;inset:0;background:linear-gradient(to top,rgba(0,0,0,0.75) 0%,rgba(0,0,0,0.08) 55%,transparent 100%)}
        .rp-vc-badges{position:absolute;top:12px;left:12px;display:flex;gap:6px;flex-wrap:wrap}
        .rp-vc-badge{display:inline-flex;align-items:center;padding:4px 10px;border-radius:999px;font-size:11px;font-weight:600;white-space:nowrap}
        .rp-vc-badge-green{background:#16a34a;color:#fff}
        .rp-vc-badge-amber{background:#f59e0b;color:#111}
        .rp-vc-badge-dark{background:rgba(17,24,39,0.82);color:#fff}
        .rp-vc-badge-night{background:rgba(49,46,129,0.88);color:#a5f3fc}
        .rp-vc-badge-orange{background:#d97706;color:#fff}
        .rp-vc-photobottom{position:absolute;bottom:0;left:0;right:0;padding:14px 16px;display:flex;align-items:flex-end;justify-content:space-between;gap:12px}
        .rp-vc-vname{color:#fff;font-size:17px;font-weight:800;letter-spacing:.02em;text-shadow:0 1px 4px rgba(0,0,0,0.5);line-height:1.2}
        @media(min-width:600px){.rp-vc-vname{font-size:20px}}
        .rp-vc-vmodel{color:rgba(255,255,255,.6);font-size:12px;margin-top:2px;font-style:italic}
        .rp-vc-price-wrap{text-align:right;flex-shrink:0}
        .rp-vc-price-big{color:#4ade80;font-size:26px;font-weight:900;line-height:1;text-shadow:0 1px 6px rgba(0,0,0,0.5)}
        @media(min-width:600px){.rp-vc-price-big{font-size:30px}}
        .rp-vc-price-label{color:rgba(255,255,255,.5);font-size:10px;margin-top:2px}
        .rp-vc-details{padding:14px 16px 16px}
        .rp-vc-bars{display:grid;grid-template-columns:1fr 1fr;gap:10px;margin-bottom:12px}
        .rp-vc-bar-header{display:flex;justify-content:space-between;font-size:10px;font-weight:700;text-transform:uppercase;letter-spacing:.07em;color:#9ca3af;margin-bottom:4px}
        .rp-vc-bar-track{height:5px;background:#f3f4f6;border-radius:99px;overflow:hidden}
        .rp-vc-bar-fill{height:100%;border-radius:99px;transition:width .3s}
        .rp-vc-features{display:flex;flex-wrap:wrap;gap:6px;margin-bottom:10px}
        .rp-vc-feat{display:inline-flex;align-items:center;padding:3px 9px;border-radius:6px;background:#f3f4f6;border:0.5px solid #e5e7eb;font-size:11px;color:#4b5563}
        .rp-vc-special{background:#fffbeb;border:1px solid #fde68a;color:#92400e;padding:6px 10px;border-radius:8px;font-size:11px;font-weight:600;margin-bottom:10px}
        .rp-vc-action{display:flex;align-items:center;justify-content:space-between;padding-top:10px;border-top:0.5px solid #e5e7eb;gap:12px}
        .rp-vc-sel .rp-vc-action{border-top-color:#fde68a}
        .rp-vc-bookbtn{padding:9px 18px;border-radius:10px;font-size:12px;font-weight:800;text-transform:uppercase;letter-spacing:.06em;border:none;cursor:pointer;background:#f59e0b;color:#111;transition:background .15s;flex-shrink:0;white-space:nowrap}
        .rp-vc-bookbtn:hover{background:#d97706}
        .rp-vc-bookbtn.sel{background:#d97706;color:#111}
        .rp-vc-lockoverlay{position:absolute;inset:0;background:rgba(248,249,251,0.92);display:flex;flex-direction:column;align-items:center;justify-content:center;gap:8px;z-index:5;border-radius:14px}
        .rp-vc-lockcircle{width:44px;height:44px;border-radius:50%;background:#fee2e2;display:flex;align-items:center;justify-content:center;font-size:20px}
        .rp-vc-lockswitch{padding:6px 14px;border-radius:8px;font-size:11px;font-weight:700;background:#16a34a;color:#fff;border:none;cursor:pointer;margin-top:2px}
        .rp-trip-toggle{display:flex;border:1.5px solid #e5e7eb;border-radius:12px;overflow:hidden;background:#f9fafb}
        .rp-trip-opt{flex:1;padding:12px 16px;text-align:center;cursor:pointer;font-size:13px;font-weight:600;color:#6b7280;border:none;background:transparent;transition:all .18s;font-family:inherit}
        .rp-trip-opt.active{background:#111827;color:#fff}
        .rp-trip-opt:first-child{border-right:1px solid #e5e7eb}
        .rp-btn-back{padding:14px 24px;border:2px solid #e5e7eb;border-radius:12px;font-size:15px;font-weight:600;color:#374151;background:#fff;cursor:pointer}
        .rp-btn-back:hover{background:#f9fafb}
        .rp-btn-next{flex:1;padding:14px 24px;border-radius:12px;font-size:15px;font-weight:700;color:#fff;background:#111827;border:none;cursor:pointer}
        .rp-btn-next:hover{background:#1f2937}
        .rp-btn-ok{flex:1;padding:14px 24px;border-radius:12px;font-size:15px;font-weight:700;color:#fff;background:#16a34a;border:none;cursor:pointer;display:flex;align-items:center;justify-content:center;gap:8px}
        .rp-btn-ok:hover:not(:disabled){background:#15803d}
        .rp-btn-ok:disabled{opacity:.55;cursor:not-allowed}
        .rp-btn-ok.quote{background:#d97706}
        .rp-btn-ok.quote:hover:not(:disabled){background:#b45309}
        .rp-pills{display:flex;flex-wrap:wrap;gap:8px;margin-bottom:20px}
        @media(min-width:1024px){.rp-pills{display:none}}
        @keyframes spin{to{transform:rotate(360deg)}}
        .rp-spin{width:18px;height:18px;border:2px solid rgba(255,255,255,.3);border-top-color:#fff;border-radius:50%;animation:spin .7s linear infinite}
        .rp-dots{display:inline-block;width:10px;height:10px;border:2px solid rgba(22,163,74,0.3);border-top-color:#16a34a;border-radius:50%;animation:spin .7s linear infinite;margin-left:8px;vertical-align:middle}
        .rp-night-banner{background:linear-gradient(135deg,#1e1b4b,#312e81);border:1.5px solid #4338ca;border-radius:12px;padding:14px 18px;display:flex;align-items:center;gap:14px;margin-top:8px}
        @keyframes nightPulse{0%,100%{opacity:1}50%{opacity:.7}}
        .rp-night-star{animation:nightPulse 2s ease-in-out infinite}
        .dial-prefix{display:flex;align-items:center;padding:0 12px;background:#f9fafb;border-right:1px solid #e5e7eb;font-size:14px;font-weight:700;color:#374151;white-space:nowrap;flex-shrink:0;min-width:56px;justify-content:center}
        optgroup{font-weight:700;color:#374151}
        option{font-weight:400;color:#111827}
        .rp-return-box{background:linear-gradient(135deg,#fffbeb,#fef9ec);border:1.5px solid #fcd34d;border-radius:14px;padding:18px 20px;display:flex;flex-direction:column;gap:14px;margin-top:4px}
        .rp-return-header{display:flex;align-items:center;gap:10px}
        .rp-return-icon{width:34px;height:34px;border-radius:10px;background:#f59e0b;display:flex;align-items:center;justify-content:center;font-size:16px;flex-shrink:0}
        .rp-return-title{font-size:13px;font-weight:700;color:#92400e}
        .rp-return-sub{font-size:11px;color:#b45309;margin-top:1px}
        .rp-payment-grid{display:grid;grid-template-columns:1fr 1fr;gap:12px}
        @media(max-width:480px){.rp-payment-grid{grid-template-columns:1fr;gap:10px}}
        .rp-pay-opt{position:relative;display:flex;flex-direction:column;align-items:center;justify-content:center;gap:10px;padding:20px 16px;border:2px solid #e5e7eb;border-radius:16px;cursor:pointer;background:#fff;transition:all .2s ease;text-align:center;min-height:120px;-webkit-tap-highlight-color:transparent;user-select:none;}
        .rp-pay-opt:active{transform:scale(0.97)}
        .rp-pay-opt:hover{border-color:#d1d5db;background:#fafafa;box-shadow:0 2px 12px rgba(0,0,0,0.06)}
        .rp-pay-opt.selected{border-color:#111827;background:#f9fafb;box-shadow:0 0 0 3px rgba(17,24,39,0.08),0 4px 16px rgba(0,0,0,0.08);}
        .rp-pay-check{position:absolute;top:10px;right:10px;width:20px;height:20px;border-radius:50%;border:2px solid #d1d5db;display:flex;align-items:center;justify-content:center;transition:all .2s;background:#fff;flex-shrink:0;}
        .rp-pay-opt.selected .rp-pay-check{border-color:#111827;background:#111827}
        .rp-pay-icon{width:52px;height:52px;border-radius:14px;background:#f3f4f6;display:flex;align-items:center;justify-content:center;font-size:26px;transition:background .2s;flex-shrink:0;}
        .rp-pay-opt.selected .rp-pay-icon{background:#111827}
        .rp-pay-label{font-size:14px;font-weight:700;color:#111827;line-height:1.2}
        .rp-pay-sub{font-size:11px;color:#6b7280;line-height:1.4;max-width:140px}
        @media(max-width:480px){
          .rp-pay-opt{flex-direction:row;text-align:left;min-height:unset;padding:16px 14px;gap:14px;align-items:center}
          .rp-pay-icon{width:46px;height:46px;font-size:22px;flex-shrink:0}
          .rp-pay-sub{max-width:none}
          .rp-pay-check{position:static;margin-left:auto;flex-shrink:0}
        }
        .rp-quote-banner{background:linear-gradient(135deg,#fff7ed,#fffbeb);border:2px solid #fed7aa;border-radius:16px;padding:28px 24px;display:flex;flex-direction:column;align-items:center;text-align:center;gap:16px}
        .rp-quote-icon{width:64px;height:64px;border-radius:50%;background:#ffedd5;display:flex;align-items:center;justify-content:center;font-size:30px}
        .rp-quote-steps{display:flex;flex-direction:column;gap:10px;width:100%;max-width:360px;margin-top:4px}
        .rp-quote-step{display:flex;align-items:center;gap:12px;background:#fff;border:1px solid #fed7aa;border-radius:10px;padding:10px 14px;font-size:13px;color:#92400e;text-align:left}
        .rp-quote-step-num{width:24px;height:24px;border-radius:50%;background:#f59e0b;color:#fff;font-size:11px;font-weight:800;display:flex;align-items:center;justify-content:center;flex-shrink:0}
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
                  <span style={{ fontSize:14,fontWeight:i===step?700:500,color:i===step?"#fff":i<step?"#4ade80":"rgba(255,255,255,.4)" }}>
                    {s}{i===1&&isQuoteRequest?" (Quote)":""}
                  </span>
                </div>
              ))}
            </div>

            {isQuoteRequest&&step>=1&&(
              <div style={{ marginBottom:16,padding:"10px 12px",borderRadius:9,background:"rgba(245,158,11,.15)",border:"1px solid rgba(245,158,11,.3)",fontSize:12,fontWeight:700,color:"#f59e0b",display:"flex",alignItems:"center",gap:6 }}>
                ✉️ Quote request — we'll email you rates
              </div>
            )}

            {trip.tripType&&!isQuoteRequest&&(
              <div style={{ marginBottom:16,padding:"8px 12px",borderRadius:9,background:isRoundTrip?"rgba(245,158,11,.15)":"rgba(22,163,74,.1)",border:`1px solid ${isRoundTrip?"rgba(245,158,11,.3)":"rgba(22,163,74,.25)"}`,fontSize:12,fontWeight:700,color:isRoundTrip?"#f59e0b":"#4ade80",display:"flex",alignItems:"center",gap:6 }}>
                {isRoundTrip?"🔄 Round Trip":"→ One Way"}
                {isRoundTrip&&<span style={{ fontSize:10,color:"rgba(245,158,11,.7)",marginLeft:"auto" }}>×2 price</span>}
              </div>
            )}
            {nightSurcharge>0&&(
              <div style={{ marginBottom:8,padding:"8px 12px",borderRadius:9,background:"rgba(99,102,241,.15)",border:"1px solid rgba(99,102,241,.3)",fontSize:12,fontWeight:700,color:"#a5b4fc",display:"flex",alignItems:"center",gap:6 }}>
                <span className="rp-night-star">🌙</span>
                Outbound night surcharge <span style={{ marginLeft:"auto",color:"#c4b5fd" }}>+€{NIGHT_SURCHARGE}</span>
              </div>
            )}
            {returnNightSurcharge>0&&(
              <div style={{ marginBottom:16,padding:"8px 12px",borderRadius:9,background:"rgba(99,102,241,.15)",border:"1px solid rgba(99,102,241,.3)",fontSize:12,fontWeight:700,color:"#a5b4fc",display:"flex",alignItems:"center",gap:6 }}>
                <span className="rp-night-star">🌙</span>
                Return night surcharge <span style={{ marginLeft:"auto",color:"#c4b5fd" }}>+€{NIGHT_SURCHARGE}</span>
              </div>
            )}

            {vehicle&&!isQuoteRequest&&(
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
                  {recommendedVehicle&&!vehicleId&&totalPax<9&&!isQuoteRequest&&<div style={{ marginTop:6,background:"rgba(22,163,74,.15)",border:"1px solid rgba(22,163,74,.3)",borderRadius:7,padding:"6px 10px",fontSize:11,color:"#4ade80",fontWeight:600 }}>✦ We suggest: {recommendedVehicle.name}</div>}
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
                {isRoundTrip&&trip.returnDate&&trip.returnTime&&(
                  <div style={{ marginTop:8,padding:"6px 10px",borderRadius:8,background:"rgba(245,158,11,.1)",border:"1px solid rgba(245,158,11,.2)",fontSize:11,color:"#f59e0b" }}>
                    🔄 Return: {trip.returnDate} at {trip.returnTime}
                  </div>
                )}
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
                  {i<step?"✓":i+1} {s}{i===1&&isQuoteRequest?" (Quote)":""}
                </div>
              ))}
            </div>

            <div className="rp-card">
              <div style={{ marginBottom:32 }}>
                <div style={{ fontSize:11,fontWeight:700,letterSpacing:"0.12em",textTransform:"uppercase",color: isQuoteRequest&&step===1?"#d97706":GREEN,marginBottom:8 }}>
                  Step {step+1} of {STEPS.length}
                  {!dataReady&&<span className="rp-dots"/>}
                </div>
                <h1 style={{ fontSize:28,fontWeight:800,color:DARK,marginBottom:8,lineHeight:1.2 }}>
                  {step===0?"Trip Details":step===1?(isQuoteRequest?"Request a Quote":"Choose Your Vehicle"):step===2?"Personal Details":"Review & Confirm"}
                </h1>
                <p style={{ fontSize:14,color:"#6b7280",lineHeight:1.6,margin:0 }}>
                  {step===0?"Tell us about your journey — where, when, and how many."
                   :step===1?(isQuoteRequest
                      ? `We don't have a fixed rate for ${trip.fromName} → ${trip.toName} yet, but you can request a personalised quote below.`
                      : (trip.fromId&&trip.toId?`Prices for ${trip.fromName} → ${trip.toName} · ${totalPax} pax${isRoundTrip?" · Round trip (×2)":""}${totalPax>=9?" · 9+ rate (×2)":""}.`:"Select the vehicle that fits your needs and budget."))
                   :step===2?"Almost there — we just need your contact details."
                   :"Double-check everything before we confirm your booking."}
                </p>
              </div>

              {/* ══ STEP 0 ══ */}
              {step===0&&(
                <div style={{ display:"flex",flexDirection:"column",gap:20 }}>
                  <div>
                    <label style={S.label}>Trip Type</label>
                    <div className="rp-trip-toggle">
                      <button type="button" className={`rp-trip-opt${trip.tripType==="one-way"?" active":""}`}
                        onClick={()=>{setTrip(t=>({...t,tripType:"one-way",returnDate:"",returnTime:""}));setVehicleId("");}}>→ One Way</button>
                      <button type="button" className={`rp-trip-opt${trip.tripType==="round-trip"?" active":""}`}
                        onClick={()=>{setTrip(t=>({...t,tripType:"round-trip"}));setVehicleId("");}}>
                        🔄 Round Trip <span style={{ fontSize:11,opacity:.7,marginLeft:4 }}>(price ×2)</span>
                      </button>
                    </div>
                  </div>

                  <div>
                    <label style={S.label}>Pickup Location <span style={{ color:GREEN }}>*</span></label>
                    <LocationSelect value={trip.fromId} onChange={setFrom} locations={locations} placeholder="Select pickup location…" error={errors.from}/>
                  </div>
                  <div>
                    <label style={S.label}>Drop-off Location <span style={{ color:GREEN }}>*</span></label>
                    <LocationSelect value={trip.toId} onChange={setTo} locations={locations} placeholder="Select drop-off location…" error={errors.to}/>
                  </div>

                  {showFlightBox&&(
                    <div>
                      <label style={S.label}>✈️ {flightLabel} <span style={{ fontSize:11,color:"#9ca3af",fontWeight:400 }}>(optional)</span></label>
                      <div className="rp-input-wrap" style={wrap()}>
                        <input type="text" placeholder="e.g. AF1234 or TGV 6201" value={trip.flightOrTrain} onChange={e=>setTrip(t=>({...t,flightOrTrain:e.target.value}))} style={S.input}/>
                      </div>
                    </div>
                  )}

                  {showAddressBox&&(
                    <div>
                      <label style={S.label}>📍 {addressLabel} <span style={{ fontSize:11,color:"#9ca3af",fontWeight:400 }}>(optional)</span></label>
                      <div className="rp-input-wrap" style={wrap()}>
                        <input type="text" placeholder="e.g. 10 Rue de Rivoli, 75001 Paris" value={trip.dropoffAddress} onChange={e=>setTrip(t=>({...t,dropoffAddress:e.target.value}))} style={S.input}/>
                      </div>
                    </div>
                  )}

                  <div className="rp-grid">
                    {field(<>
                      <label style={S.label}>{isRoundTrip?"Departure Date":"Travel Date"} <span style={{ color:GREEN }}>*</span></label>
                      <div className="rp-input-wrap" style={wrap(errors.date)}>
                        <input type="date" value={trip.date} min={new Date().toISOString().split("T")[0]} onChange={e=>setTrip(t=>({...t,date:e.target.value}))} style={S.input}/>
                      </div>
                      {errEl(errors.date)}
                    </>)}
                    {field(<>
                      <label style={S.label}>{isRoundTrip?"Departure Time":"Pickup Time"} <span style={{ color:GREEN }}>*</span></label>
                      <div className="rp-input-wrap" style={wrap(errors.time)}>
                        <input type="time" value={trip.time} onChange={e=>setTrip(t=>({...t,time:e.target.value}))} style={S.input}/>
                      </div>
                      {errEl(errors.time)}
                      {isNightTime(trip.time)&&(
                        <div className="rp-night-banner" style={{ marginTop:10 }}>
                          <div style={{ fontSize:26,flexShrink:0,lineHeight:1 }} className="rp-night-star">🌙</div>
                          <div style={{ flex:1 }}>
                            <div style={{ fontSize:13,fontWeight:800,color:"#e0e7ff",marginBottom:3 }}>Night Surcharge Applied</div>
                            <div style={{ fontSize:11,color:"rgba(196,181,253,.8)",lineHeight:1.5 }}>
                              Pickups between <strong style={{ color:"#c4b5fd" }}>10:00 PM – 6:00 AM</strong> include a surcharge of <strong style={{ color:"#a5f3fc" }}>+€{NIGHT_SURCHARGE}</strong>.
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

                  {isRoundTrip&&(
                    <div className="rp-return-box">
                      <div className="rp-return-header">
                        <div className="rp-return-icon">🔄</div>
                        <div>
                          <div className="rp-return-title">Return Journey Details</div>
                          <div className="rp-return-sub">When should we pick you up for the return trip?</div>
                        </div>
                      </div>
                      <div className="rp-grid">
                        {field(<>
                          <label style={S.label}>Return Date <span style={{ color:"#d97706" }}>*</span></label>
                          <div className="rp-input-wrap" style={wrap(errors.returnDate)}>
                            <input type="date" value={trip.returnDate} min={trip.date||new Date().toISOString().split("T")[0]} onChange={e=>setTrip(t=>({...t,returnDate:e.target.value}))} style={S.input}/>
                          </div>
                          {errEl(errors.returnDate)}
                        </>)}
                        {field(<>
                          <label style={S.label}>Return Pickup Time <span style={{ color:"#d97706" }}>*</span></label>
                          <div className="rp-input-wrap" style={wrap(errors.returnTime)}>
                            <input type="time" value={trip.returnTime} onChange={e=>setTrip(t=>({...t,returnTime:e.target.value}))} style={S.input}/>
                          </div>
                          {errEl(errors.returnTime)}
                          {isNightTime(trip.returnTime)&&(
                            <div className="rp-night-banner" style={{ marginTop:10 }}>
                              <div style={{ fontSize:22,flexShrink:0,lineHeight:1 }} className="rp-night-star">🌙</div>
                              <div style={{ flex:1 }}>
                                <div style={{ fontSize:12,fontWeight:800,color:"#e0e7ff",marginBottom:2 }}>Return Night Surcharge</div>
                                <div style={{ fontSize:11,color:"rgba(196,181,253,.8)" }}>+€{NIGHT_SURCHARGE} will be added for return pickup.</div>
                              </div>
                              <div style={{ flexShrink:0,background:"rgba(165,243,252,.15)",border:"1px solid rgba(165,243,252,.3)",borderRadius:9,padding:"6px 12px",textAlign:"center" }}>
                                <div style={{ fontSize:9,color:"rgba(165,243,252,.7)",fontWeight:700,letterSpacing:".08em",textTransform:"uppercase",marginBottom:1 }}>Extra</div>
                                <div style={{ fontSize:18,fontWeight:900,color:"#a5f3fc",lineHeight:1 }}>+€{NIGHT_SURCHARGE}</div>
                              </div>
                            </div>
                          )}
                        </>)}
                      </div>
                      <div style={{ background:"rgba(245,158,11,.08)",border:"1px solid rgba(245,158,11,.25)",borderRadius:9,padding:"8px 12px",fontSize:11,color:"#92400e",fontWeight:500,lineHeight:1.5 }}>
                        💡 The return trip is from <strong>{trip.toName||"your drop-off"}</strong> back to <strong>{trip.fromName||"your pickup"}</strong>. Return details can also be added in Special Requests.
                      </div>
                    </div>
                  )}

                  <div className="rp-grid">
                    {counter("passengers",1,16,"Passengers")}
                    {counter("kids",0,6,"Children (under 12)")}
                    {counter("bags",0,16,"Luggage Bags")}
                  </div>

                  {totalPax>=9&&(
                    <div style={{ background:"linear-gradient(135deg,#fffbeb,#fef3c7)",border:"1.5px solid #fcd34d",borderRadius:12,padding:"12px 16px",display:"flex",alignItems:"center",gap:12 }}>
                      <span style={{ fontSize:22,flexShrink:0 }}>⚡</span>
                      <div>
                        <div style={{ fontWeight:700,color:"#92400e",fontSize:13 }}>Large group — {totalPax} passengers</div>
                        <div style={{ color:"#b45309",fontSize:12,marginTop:2 }}>9+ pax price = 8-pax price × 2{isRoundTrip?" · then ×2 for round trip":""}.</div>
                      </div>
                    </div>
                  )}

                  {totalPax>0&&totalPax<9&&(()=>{
                    const fits=vehiclesWithPrice.filter(v=>!v.paxExceeded&&!v.lugExceeded);
                    const smallest=fits.sort((a,b)=>a.maxPassengers-b.maxPassengers)[0];
                    if(!smallest||isQuoteRequest) return null;
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

              {/* ══ STEP 1 — QUOTE REQUEST ══ */}
              {step===1&&isQuoteRequest&&(
                <div style={{ display:"flex",flexDirection:"column",gap:20 }}>
                  <div className="rp-quote-banner">
                    <div className="rp-quote-icon">✉️</div>
                    <div>
                      <div style={{ fontSize:18,fontWeight:800,color:"#92400e",marginBottom:6 }}>We'll find you the best rate</div>
                      <div style={{ fontSize:14,color:"#b45309",lineHeight:1.6,maxWidth:400 }}>
                        We don't have a pre-set fare for <strong>{trip.fromName} → {trip.toName}</strong> yet.
                        Leave your details in the next step and we'll send you a personalised quote — usually within a few hours.
                      </div>
                    </div>
                    <div className="rp-quote-steps">
                      {[
                        ["1","You fill in your details on the next screen"],
                        ["2","We review your route and group size"],
                        ["3","You receive a tailored fare by email & WhatsApp"],
                        ["4","Confirm when you're happy — no obligation"],
                      ].map(([num,text])=>(
                        <div key={num} className="rp-quote-step">
                          <div className="rp-quote-step-num">{num}</div>
                          <span>{text}</span>
                        </div>
                      ))}
                    </div>
                    <div style={{ background:"#fff7ed",border:"1px solid #fed7aa",borderRadius:10,padding:"10px 16px",fontSize:12,color:"#92400e",display:"flex",gap:8,alignItems:"flex-start",textAlign:"left",width:"100%",maxWidth:400,boxSizing:"border-box" as const }}>
                      <span style={{ fontSize:16,flexShrink:0 }}>💡</span>
                      <span>Your trip details — <strong>{totalPax} passenger{totalPax!==1?"s":""}</strong>, <strong>{trip.bags} bag{trip.bags!==1?"s":""}</strong>, <strong>{trip.date} at {trip.time}</strong>{isRoundTrip?`, return ${trip.returnDate} at ${trip.returnTime}`:""} — are already saved and will be included in your quote request.</span>
                    </div>
                  </div>
                </div>
              )}

              {/* ══ STEP 1 — VEHICLE SELECTION ══ */}
              {step===1&&!isQuoteRequest&&(
                <div style={{ display:"flex",flexDirection:"column",gap:14 }}>
                  {errors.vehicle&&<div style={{ background:"#fef2f2",border:"1px solid #fecaca",color:"#dc2626",padding:"10px 16px",borderRadius:10,fontSize:14,fontWeight:600 }}>{errors.vehicle}</div>}

                  {isRoundTrip&&(
                    <div style={{ background:"linear-gradient(135deg,#fffbeb,#fef3c7)",border:"1.5px solid #fcd34d",borderRadius:12,padding:"12px 16px",display:"flex",gap:12,alignItems:"flex-start" }}>
                      <span style={{ fontSize:20,flexShrink:0,marginTop:1 }}>🔄</span>
                      <div>
                        <div style={{ fontWeight:700,color:"#92400e",fontSize:13 }}>Round trip — all base prices doubled</div>
                        <div style={{ fontSize:12,color:"#b45309",marginTop:1 }}>
                          Outbound: {trip.date} {trip.time} · Return: {trip.returnDate||"—"} {trip.returnTime||"—"}
                          {returnNightSurcharge>0?" + return night surcharge":""}
                        </div>
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

                  {(nightSurcharge>0||returnNightSurcharge>0)&&(
                    <div className="rp-night-banner">
                      <div style={{ fontSize:22,flexShrink:0 }} className="rp-night-star">🌙</div>
                      <div style={{ flex:1 }}>
                        <div style={{ fontSize:13,fontWeight:800,color:"#e0e7ff",marginBottom:2 }}>Night Surcharge Included in Prices</div>
                        <div style={{ fontSize:11,color:"rgba(196,181,253,.8)" }}>
                          {nightSurcharge>0&&`Outbound +€${NIGHT_SURCHARGE}`}
                          {nightSurcharge>0&&returnNightSurcharge>0&&" · "}
                          {returnNightSurcharge>0&&`Return +€${NIGHT_SURCHARGE}`}
                        </div>
                      </div>
                      <div style={{ flexShrink:0,background:"rgba(165,243,252,.15)",border:"1px solid rgba(165,243,252,.3)",borderRadius:9,padding:"6px 12px",textAlign:"center" }}>
                        <div style={{ fontSize:9,color:"rgba(165,243,252,.7)",fontWeight:700,letterSpacing:".08em",textTransform:"uppercase",marginBottom:1 }}>Total Added</div>
                        <div style={{ fontSize:18,fontWeight:900,color:"#a5f3fc",lineHeight:1 }}>+€{nightSurcharge+returnNightSurcharge}</div>
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
                          <div style={{ fontSize:12,color:"#c2410c",lineHeight:1.5 }}>
                            {locked.length} vehicle{locked.length!==1?" types are":" type is"} locked below.
                            {suggest&&<> We recommend the <strong>{suggest.name}</strong> (up to {suggest.maxPassengers} pax · {suggest.maxLuggage} bags).</>}
                          </div>
                        </div>
                      </div>
                    );
                  })()}

                  {vehiclesWithPrice.map(v => {
                    const sel=vehicleId===v.id;
                    const isLocked=v.paxExceeded||v.lugExceeded;
                    const isRecom=recommendedVehicle?.id===v.id&&!sel;
                    const lockReasons:string[]=[];
                    if(v.paxExceeded) lockReasons.push(`${totalPax} pax exceeds ${v.maxPassengers}-pax limit`);
                    if(v.lugExceeded) lockReasons.push(`${trip.bags} bags exceeds ${v.maxLuggage}-bag limit`);
                    const nextFit=vehiclesWithPrice.filter(x=>!x.paxExceeded&&!x.lugExceeded&&x.id!==v.id).sort((a,b)=>a.maxPassengers-b.maxPassengers)[0];
                    const paxPct=Math.min(100,(totalPax/v.maxPassengers)*100);
                    const lugPct=Math.min(100,(trip.bags/v.maxLuggage)*100);
                    const paxColor=v.paxExceeded?"#ef4444":paxPct>80?"#f59e0b":"#22c55e";
                    const lugColor=v.lugExceeded?"#ef4444":lugPct>80?"#f59e0b":"#22c55e";
                    return (
                      <div key={v.id} className={`rp-vc${sel?" rp-vc-sel":""}${isLocked?" rp-vc-locked":""}${isRecom?" rp-vc-recom":""}`} onClick={()=>{ if(!isLocked) setVehicleId(v.id); }}>
                        {sel&&<div className="rp-vc-selbar"><svg width={13} height={13} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={3}><path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7"/></svg> Selected</div>}
                        <div className="rp-vc-photo">
                          <img src={v.img} alt={v.name}/>
                          <div className="rp-vc-overlay"/>
                          <div className="rp-vc-badges">
                            {isRecom&&!sel&&<span className="rp-vc-badge rp-vc-badge-green">✦ Best fit</span>}
                            {v.tag&&<span className="rp-vc-badge rp-vc-badge-amber">{v.tag}</span>}
                            {(nightSurcharge>0||returnNightSurcharge>0)&&<span className="rp-vc-badge rp-vc-badge-night">🌙 +€{nightSurcharge+returnNightSurcharge}</span>}
                            {isRoundTrip&&<span className="rp-vc-badge rp-vc-badge-dark">RT ×2</span>}
                            {v.isDoubled&&<span className="rp-vc-badge rp-vc-badge-orange">⚡ ×2 rate</span>}
                          </div>
                          <div className="rp-vc-photobottom">
                            <div>
                              <div className="rp-vc-vname">{v.name}</div>
                              <div className="rp-vc-vmodel">{v.model}</div>
                            </div>
                            <div className="rp-vc-price-wrap">
                              {v.onDemand?<div style={{ color:"#fbbf24",fontSize:18,fontWeight:900,lineHeight:1,textShadow:"0 1px 6px rgba(0,0,0,0.5)" }}>On Demand</div>
                               :v.routePrice!==null?<><div className="rp-vc-price-big">€{v.routePrice}</div><div className="rp-vc-price-label">{isRoundTrip?"round trip":"one way"} · {totalPax} pax</div></>
                               :<div style={{ color:"rgba(255,255,255,.5)",fontSize:14 }}>—</div>}
                            </div>
                          </div>
                        </div>
                        <div className="rp-vc-details">
                          <div className="rp-vc-bars">
                            {[{label:"👤 Passengers",val:totalPax,max:v.maxPassengers,pct:paxPct,color:paxColor,exceeded:v.paxExceeded},{label:"🧳 Luggage",val:trip.bags,max:v.maxLuggage,pct:lugPct,color:lugColor,exceeded:v.lugExceeded}].map(b=>(
                              <div key={b.label}>
                                <div className="rp-vc-bar-header" style={{ color:b.exceeded?"#dc2626":"#9ca3af" }}><span>{b.label}</span><span style={{ color:b.exceeded?"#dc2626":b.val>0?"#374151":"#9ca3af" }}>{b.val}/{b.max}</span></div>
                                <div className="rp-vc-bar-track"><div className="rp-vc-bar-fill" style={{ width:`${b.pct}%`,background:b.color }}/></div>
                              </div>
                            ))}
                          </div>
                          <div className="rp-vc-features">{features.map(f=><span key={f} className="rp-vc-feat">{f}</span>)}</div>
                          {v.special&&<div className="rp-vc-special">⚠️ {v.special}</div>}
                          <div className="rp-vc-action">
                            <div>
                              {v.onDemand?<><div style={{ fontSize:16,fontWeight:800,color:"#d97706",lineHeight:1 }}>On Demand</div><div style={{ fontSize:10,color:"#9ca3af",marginTop:2 }}>Contact us for pricing</div></>
                               :v.routePrice!==null?<>
                                <div style={{ display:"flex",alignItems:"baseline",gap:6,flexWrap:"wrap" }}>
                                  <span style={{ fontSize:20,fontWeight:900,color:sel?"#d97706":DARK }}>€{v.routePrice}</span>
                                  <span style={{ fontSize:13,fontWeight:600,color:"#6b7280" }}>EUR</span>
                                  {v.isDoubled&&<span style={{ fontSize:10,fontWeight:700,background:"#fef3c7",color:"#d97706",padding:"2px 6px",borderRadius:5,border:"1px solid #fcd34d" }}>×2</span>}
                                  {isRoundTrip&&<span style={{ fontSize:10,fontWeight:700,background:"#fff7ed",color:"#ea580c",padding:"2px 6px",borderRadius:5,border:"1px solid #fed7aa" }}>RT</span>}
                                </div>
                                <div style={{ fontSize:10,color:"#9ca3af",marginTop:2 }}>✓ {totalPax} pax · {isRoundTrip?"round trip":"one way"} · fixed · incl. VAT{(nightSurcharge+returnNightSurcharge)>0?" · incl. night fee(s)":""}</div>
                               </>:<div style={{ fontSize:14,color:"#9ca3af" }}>Price unavailable</div>}
                            </div>
                            {!isLocked&&<button type="button" className={`rp-vc-bookbtn${sel?" sel":""}`} onClick={e=>{ e.stopPropagation(); setVehicleId(sel?"":v.id); }}>{sel?"✓ Selected":"Book Now →"}</button>}
                          </div>
                        </div>
                        {isLocked&&(
                          <div className="rp-vc-lockoverlay">
                            <div className="rp-vc-lockcircle">🔒</div>
                            <div style={{ fontSize:13,fontWeight:700,color:"#dc2626" }}>Not available for your group</div>
                            <div style={{ fontSize:11,color:"#b91c1c",textAlign:"center",lineHeight:1.5,maxWidth:220,padding:"0 16px" }}>{lockReasons.join(" · ")}</div>
                            {nextFit&&<button type="button" className="rp-vc-lockswitch" onClick={e=>{ e.stopPropagation(); setVehicleId(nextFit.id); }}>Switch to {nextFit.name} →</button>}
                          </div>
                        )}
                      </div>
                    );
                  })}
                </div>
              )}

              {/* ══ STEP 2 ══ */}
              {step===2&&(
                <div style={{ display:"flex",flexDirection:"column",gap:16 }}>
                  {isQuoteRequest&&(
                    <div style={{ background:"#fff7ed",border:"1.5px solid #fed7aa",borderRadius:12,padding:"12px 16px",display:"flex",gap:10,alignItems:"flex-start",fontSize:13,color:"#92400e",lineHeight:1.5 }}>
                      <span style={{ fontSize:18,flexShrink:0 }}>✉️</span>
                      <span>We'll send your personalised quote to the email and WhatsApp you provide below. Usually arrives within a few hours.</span>
                    </div>
                  )}
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
                  {field(<><label style={S.label}>Special Requests <span style={{ fontSize:12,color:"#9ca3af",fontWeight:400 }}>(optional)</span></label><textarea rows={4} placeholder="Special assistance, accessibility needs, extra stops…" value={personal.notes} onChange={e=>setPersonal(p=>({...p,notes:e.target.value}))} style={{ width:"100%",border:"1.5px solid #e5e7eb",borderRadius:10,padding:"12px 14px",fontSize:14,color:DARK,resize:"none",outline:"none",fontFamily:"inherit",boxSizing:"border-box" }}/></>)}
                  {!isQuoteRequest&&(
                    <div>
                      <label style={{ ...S.label,marginBottom:12 }}>Payment Method <span style={{ color:GREEN }}>*</span></label>
                      <div className="rp-payment-grid">
                        <div className={`rp-pay-opt${paymentMethod==="cash"?" selected":""}`} onClick={()=>setPaymentMethod("cash")} role="radio" aria-checked={paymentMethod==="cash"}>
                          <div className="rp-pay-icon"><span style={{ filter:paymentMethod==="cash"?"invert(1) brightness(2)":"none",transition:"filter .2s" }}>💵</span></div>
                          <div style={{ display:"flex",flexDirection:"column",gap:2,flex:1,minWidth:0 }}><div className="rp-pay-label">Cash to Driver</div><div className="rp-pay-sub">Pay in cash on arrival</div></div>
                          <div className="rp-pay-check">{paymentMethod==="cash"&&<svg width={10} height={10} fill="none" viewBox="0 0 24 24" stroke="#fff" strokeWidth={3.5}><path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7"/></svg>}</div>
                        </div>
                        <div className={`rp-pay-opt${paymentMethod==="card"?" selected":""}`} onClick={()=>setPaymentMethod("card")} role="radio" aria-checked={paymentMethod==="card"}>
                          <div className="rp-pay-icon"><span style={{ filter:paymentMethod==="card"?"invert(1) brightness(2)":"none",transition:"filter .2s" }}>💳</span></div>
                          <div style={{ display:"flex",flexDirection:"column",gap:2,flex:1,minWidth:0 }}><div className="rp-pay-label">Card to Driver</div><div className="rp-pay-sub">Visa & Mastercard accepted</div></div>
                          <div className="rp-pay-check">{paymentMethod==="card"&&<svg width={10} height={10} fill="none" viewBox="0 0 24 24" stroke="#fff" strokeWidth={3.5}><path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7"/></svg>}</div>
                        </div>
                      </div>
                      {errEl(errors.paymentMethod)}
                      {paymentMethod&&<div style={{ marginTop:10,padding:"9px 14px",background:"#f0fdf4",border:"1px solid #bbf7d0",borderRadius:9,fontSize:12,color:"#166534",fontWeight:600,display:"flex",alignItems:"center",gap:8 }}><svg width={14} height={14} fill="none" viewBox="0 0 24 24" stroke={GREEN} strokeWidth={2.5}><path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7"/></svg>{paymentMethod==="cash"?"You'll pay cash directly to your driver upon arrival.":"You'll pay by card directly to your driver upon arrival."}</div>}
                    </div>
                  )}
                </div>
              )}

              {/* ══ STEP 3 ══ */}
              {step===3&&(
                <div style={{ display:"flex",flexDirection:"column",gap:14 }}>
                  {isQuoteRequest&&(
                    <div style={{ background:"linear-gradient(135deg,#fff7ed,#fffbeb)",border:"2px solid #fed7aa",borderRadius:14,padding:"16px 20px",display:"flex",gap:14,alignItems:"center" }}>
                      <div style={{ width:44,height:44,borderRadius:"50%",background:"#ffedd5",display:"flex",alignItems:"center",justifyContent:"center",fontSize:22,flexShrink:0 }}>✉️</div>
                      <div>
                        <div style={{ fontWeight:700,color:"#92400e",fontSize:14,marginBottom:3 }}>This is a quote request</div>
                        <div style={{ fontSize:13,color:"#b45309",lineHeight:1.5 }}>No payment is taken now. We'll email you a personalised fare for this route and you can confirm once you're happy.</div>
                      </div>
                    </div>
                  )}
                  <SummaryCard title="Trip Details" rows={[
                    ["Trip Type", isRoundTrip?"🔄 Round Trip (×2 price)":"→ One Way"],
                    ["Pickup", trip.fromName],["Drop-off",trip.toName],
                    ["Departure Date", trip.date],["Departure Time", trip.time],
                    ...(isRoundTrip?[["Return Date",trip.returnDate] as [string,string],["Return Time",trip.returnTime] as [string,string]]:[]),
                    ["Passengers",`${trip.passengers} adult${trip.passengers!==1?"s":""}${trip.kids>0?`, ${trip.kids} child${trip.kids!==1?"ren":""}`:""} (${totalPax} total)`],
                    ["Luggage",`${trip.bags} bag${trip.bags!==1?"s":""}`],
                    ...(trip.flightOrTrain?[["Flight/Train",trip.flightOrTrain] as [string,string]]:[]),
                    ...(trip.dropoffAddress?[["Address",trip.dropoffAddress] as [string,string]]:[]),
                  ]}/>
                  {vehicle&&!isQuoteRequest&&(
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
                    ...(!isQuoteRequest?[["Payment",paymentMethod==="cash"?"💵 Cash to driver":"💳 Card to driver"] as [string,string]]:[]),
                    ...(personal.notes?[["Notes",personal.notes] as [string,string]]:[]),
                  ]}/>
                  {!isQuoteRequest&&(
                    <div style={{ border:"1px solid #e5e7eb",borderRadius:14,overflow:"hidden" }}>
                      <div style={{ background:"#f9fafb",padding:"12px 20px",borderBottom:"1px solid #e5e7eb" }}><span style={{ fontSize:13,fontWeight:700,color:DARK }}>Fare Breakdown</span></div>
                      <div style={{ padding:"4px 0" }}>
                        <div style={{ display:"flex",justifyContent:"space-between",alignItems:"center",padding:"10px 20px",fontSize:14 }}>
                          <span style={{ color:"#6b7280" }}>Base fare {isRoundTrip?"(×2 round trip)":""}{vehicle?.isDoubled?" (×2 9+ pax)":""}</span>
                          <span style={{ fontWeight:600,color:DARK }}>{vehicle?.onDemand?"On Demand":vehicle?.baseRoutePrice!==null?`€${vehicle?.baseRoutePrice}`:"—"}</span>
                        </div>
                        {nightSurcharge>0&&<div style={{ display:"flex",justifyContent:"space-between",alignItems:"center",padding:"10px 20px",fontSize:14,background:"#f5f3ff",borderTop:"1px dashed #ddd6fe",borderBottom:"1px dashed #ddd6fe" }}><span style={{ color:"#7c3aed",display:"flex",alignItems:"center",gap:6,fontWeight:600 }}><span>🌙</span> Outbound Night Surcharge</span><span style={{ fontWeight:700,color:"#7c3aed" }}>+€{NIGHT_SURCHARGE}</span></div>}
                        {returnNightSurcharge>0&&<div style={{ display:"flex",justifyContent:"space-between",alignItems:"center",padding:"10px 20px",fontSize:14,background:"#f5f3ff",borderTop:"1px dashed #ddd6fe",borderBottom:"1px dashed #ddd6fe" }}><span style={{ color:"#7c3aed",display:"flex",alignItems:"center",gap:6,fontWeight:600 }}><span>🌙</span> Return Night Surcharge</span><span style={{ fontWeight:700,color:"#7c3aed" }}>+€{NIGHT_SURCHARGE}</span></div>}
                        <div style={{ display:"flex",justifyContent:"space-between",alignItems:"center",padding:"14px 20px",fontSize:17,fontWeight:800,borderTop:"2px solid #e5e7eb" }}>
                          <span style={{ color:DARK }}>Total</span>
                          <span style={{ color:GREEN }}>{vehicle?.onDemand?"On Demand":`€${confirmedPrice}`}</span>
                        </div>
                      </div>
                    </div>
                  )}
                  <div style={{ background: isQuoteRequest?"linear-gradient(135deg,#78350f,#92400e)":DARK,borderRadius:14,padding:"18px 24px",display:"flex",justifyContent:"space-between",alignItems:"center",gap:12 }}>
                    <div>
                      <div style={{ fontSize:13,color:"rgba(255,255,255,.45)",marginBottom:3 }}>
                        {isQuoteRequest?"Quote for":"Total Fare ·"} {totalPax} pax · {isRoundTrip?"Round Trip":"One Way"}
                      </div>
                      <div style={{ fontSize:11,color:"rgba(255,255,255,.25)" }}>
                        {isQuoteRequest?"Personalised rate will be sent to your email":"Fixed · incl. VAT · Pay on arrival"}
                        {!isQuoteRequest&&isRoundTrip?" · RT ×2":""}
                        {!isQuoteRequest&&vehicle?.isDoubled?" · 9+pax ×2":""}
                        {!isQuoteRequest&&nightSurcharge>0?" · 🌙 outbound":""}
                        {!isQuoteRequest&&returnNightSurcharge>0?" · 🌙 return":""}
                      </div>
                    </div>
                    <div style={{ textAlign:"right",flexShrink:0 }}>
                      <div style={{ fontSize: isQuoteRequest?20:34,fontWeight:900,color: isQuoteRequest?"#fbbf24":"#4ade80",lineHeight:1 }}>
                        {isQuoteRequest?"Quote by email":(vehicle?.onDemand?<span style={{ fontSize:20 }}>On Demand</span>:`€${confirmedPrice}`)}
                      </div>
                    </div>
                  </div>
                </div>
              )}

              <div style={{ display:"flex",gap:12,marginTop:32 }}>
                {step>0&&<button type="button" onClick={back} className="rp-btn-back">← Back</button>}
                {step<3
                  ?<button type="button" onClick={next} className="rp-btn-next">
                    {step===1&&isQuoteRequest?"Continue with Quote Request →":step===2?"Review Booking →":"Continue →"}
                  </button>
                  :<button type="button" onClick={submit} disabled={sending} className={`rp-btn-ok${isQuoteRequest?" quote":""}`}>
                    {sending?<><div className="rp-spin"/> Sending…</>
                      :isQuoteRequest
                        ?<><span>✉️</span> Send Quote Request</>
                        :<><svg width={17} height={17} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}><path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7"/></svg> Confirm Booking</>
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