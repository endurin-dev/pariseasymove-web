"use client";
// app/admin/Dashboard.tsx

import { useState, useEffect, useRef } from "react";
import RatesTab from "./RatesTab";

// ─── Types ───────────────────────────────────────────────────────────────────
interface Category { id:string; name:string; icon:string; sortOrder:number; active:boolean; }
interface Location { id:string; name:string; categoryId:string|null; categoryName:string; categoryIcon:string; active:boolean; }
interface Vehicle  { id:string; name:string; model:string; maxPassengers:number; maxLuggage:number; img:string; price:number; tag:string; special:string; active:boolean; sortOrder:number; }
interface Feature  { id:string; text:string; active:boolean; sort_order:number; }
interface Rate     { id:string; fromLocId:string; toLocId:string; vehicleId:string; fromLocName:string; toLocName:string; vehicleName:string; price:number|null; onDemand:boolean; active:boolean; }
interface Booking  { id:string; from:string; to:string; fromLocId?:string; toLocId?:string; date:string; time:string; passengers:number; kids:number; bags:number; vehicleId:string; name:string; country:string; whatsapp:string; email:string; notes:string; status:"new"|"confirmed"|"cancelled"; createdAt:string; }

// ─── Helpers ─────────────────────────────────────────────────────────────────
const uid = () => Math.random().toString(36).slice(2, 9);

const api = async (url: string, method = "GET", body?: unknown) => {
  const res = await fetch(url, {
    method,
    headers: body ? { "Content-Type": "application/json" } : {},
    body: body ? JSON.stringify(body) : undefined,
  });
  if (!res.ok) throw new Error(await res.text());
  return res.json();
};

// ─── Reusable UI atoms ───────────────────────────────────────────────────────
const IS: React.CSSProperties = {
  width:"100%", border:"1.5px solid #e5e7eb", borderRadius:8,
  padding:"10px 12px", fontSize:13, color:"#111827",
  outline:"none", fontFamily:"inherit", background:"#fff",
  boxSizing:"border-box" as const,
};
const LS: React.CSSProperties = {
  fontSize:11, fontWeight:600, color:"#374151", marginBottom:4,
  display:"block", letterSpacing:"0.05em", textTransform:"uppercase" as const,
};

function Toggle({ on, onChange }: { on: boolean; onChange: () => void }) {
  return (
    <label style={{ position:"relative", display:"inline-block", width:40, height:22, cursor:"pointer", flexShrink:0 }}>
      <input type="checkbox" checked={on} onChange={onChange} style={{ opacity:0, width:0, height:0 }} />
      <span style={{ position:"absolute", inset:0, background:on ? "#16a34a" : "#d1d5db", borderRadius:22, transition:".2s" }}>
        <span style={{ position:"absolute", width:16, height:16, left:on ? 21 : 3, bottom:3, background:"#fff", borderRadius:"50%", transition:".2s" }} />
      </span>
    </label>
  );
}

function Chip({ color, children }: { color: string; children: React.ReactNode }) {
  const map: Record<string, string[]> = {
    green: ["#dcfce7","#16a34a"], red:  ["#fee2e2","#dc2626"],
    amber: ["#fef3c7","#d97706"], blue: ["#dbeafe","#2563eb"],
    purple:["#ede9fe","#7c3aed"], gray: ["#f3f4f6","#6b7280"],
  };
  const [bg, c] = map[color] ?? map.gray;
  return <span style={{ background:bg, color:c, fontSize:11, fontWeight:700, padding:"3px 9px", borderRadius:999, whiteSpace:"nowrap" }}>{children}</span>;
}

function Modal({ title, width = 540, onClose, children }: { title:string; width?:number; onClose:()=>void; children:React.ReactNode }) {
  return (
    <div style={{ position:"fixed", inset:0, zIndex:9999, display:"flex", alignItems:"center", justifyContent:"center", padding:16 }}>
      <div style={{ position:"absolute", inset:0, background:"rgba(0,0,0,.55)", backdropFilter:"blur(4px)" }} onClick={onClose} />
      <div style={{ position:"relative", background:"#fff", borderRadius:16, width:"100%", maxWidth:width, maxHeight:"92vh", overflow:"auto", boxShadow:"0 24px 80px rgba(0,0,0,.2)" }}>
        <div style={{ display:"flex", alignItems:"center", justifyContent:"space-between", padding:"18px 24px", borderBottom:"1px solid #f0f0f0", position:"sticky", top:0, background:"#fff", zIndex:1 }}>
          <h3 style={{ fontSize:16, fontWeight:700, color:"#111827", margin:0 }}>{title}</h3>
          <button onClick={onClose} style={{ background:"none", border:"none", fontSize:22, cursor:"pointer", color:"#9ca3af", lineHeight:1 }}>×</button>
        </div>
        <div style={{ padding:24 }}>{children}</div>
      </div>
    </div>
  );
}

function Toast({ msg, type }: { msg:string; type:"success"|"error" }) {
  return (
    <div style={{ position:"fixed", bottom:24, right:24, zIndex:99999, background:type==="success" ? "#16a34a" : "#dc2626", color:"#fff", padding:"12px 20px", borderRadius:10, fontWeight:600, fontSize:14, boxShadow:"0 8px 24px rgba(0,0,0,.2)", animation:"toastIn .3s ease" }}>
      {type==="success" ? "✓" : "✗"} {msg}
    </div>
  );
}

// ─── DASHBOARD ───────────────────────────────────────────────────────────────
type Tab = "overview"|"bookings"|"categories"|"locations"|"vehicles"|"features"|"rates"|"settings";

export default function Dashboard({ onLogout }: { onLogout: () => void }) {
  const [tab, setTab]             = useState<Tab>("overview");
  const [toast, setToast]         = useState<{ msg:string; type:"success"|"error" } | null>(null);
  const [categories, setCategories] = useState<Category[]>([]);
  const [locations,  setLocations]  = useState<Location[]>([]);
  const [vehicles,   setVehicles]   = useState<Vehicle[]>([]);
  const [features,   setFeatures]   = useState<Feature[]>([]);
  const [rates,      setRates]      = useState<Rate[]>([]);
  const [bookings,   setBookings]   = useState<Booking[]>([]);
  const [loaded,     setLoaded]     = useState(false);

  const showToast = (msg: string, type: "success"|"error" = "success") => {
    setToast({ msg, type });
    setTimeout(() => setToast(null), 3200);
  };

  useEffect(() => {
    Promise.all([
      api("/api/location-categories"),
      api("/api/locations"),
      api("/api/vehicles"),
      api("/api/features"),
      api("/api/rates"),
      api("/api/bookings"),
    ]).then(([cats, locs, vehs, feats, rts, books]) => {
      setCategories(cats); setLocations(locs); setVehicles(vehs);
      setFeatures(feats); setRates(rts); setBookings(books);
      setLoaded(true);
    }).catch(() => { showToast("Failed to load data from database", "error"); setLoaded(true); });
  }, []);

  const NAV: { id: Tab; label: string; icon: string }[] = [
    { id:"overview",   label:"Overview",    icon:"M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" },
    { id:"bookings",   label:"Bookings",    icon:"M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" },
    { id:"categories", label:"Categories",  icon:"M7 7h.01M7 3h5c.512 0 1.024.195 1.414.586l7 7a2 2 0 010 2.828l-7 7a2 2 0 01-2.828 0l-7-7A1.994 1.994 0 013 12V7a4 4 0 014-4z" },
    { id:"locations",  label:"Locations",   icon:"M17.657 16.657L13.414 20.9a2 2 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0zM15 11a3 3 0 11-6 0 3 3 0 016 0z" },
    { id:"vehicles",   label:"Vehicles",    icon:"M9 17a2 2 0 11-4 0 2 2 0 014 0zM19 17a2 2 0 11-4 0 2 2 0 014 0zM13 16V6a1 1 0 00-1-1H4a1 1 0 00-1 1v10a1 1 0 001 1h1m8-1a1 1 0 01-1 1H9m4-1V8a1 1 0 011-1h2.586a1 1 0 01.707.293l3.414 3.414a1 1 0 01.293.707V16a1 1 0 01-1 1h-1" },
    { id:"features",   label:"Features",    icon:"M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" },
    { id:"rates",      label:"Rates",       icon:"M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" },
    { id:"settings",   label:"Settings",    icon:"M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065zM15 12a3 3 0 11-6 0 3 3 0 016 0z" },
  ];

  const newCount = bookings.filter(b => b.status === "new").length;

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Sora:wght@300;400;500;600;700;800&display=swap');
        *{box-sizing:border-box;margin:0;padding:0}
        body{font-family:'Sora',sans-serif;background:#f8f9fb;color:#111827}
        .db{display:flex;min-height:100vh}
        .db-side{width:220px;min-width:220px;background:#111827;display:flex;flex-direction:column;position:sticky;top:0;height:100vh;overflow-y:auto;flex-shrink:0}
        .db-main{flex:1;min-width:0;display:flex;flex-direction:column}
        .db-topbar{background:#fff;border-bottom:1px solid #f0f0f0;padding:0 24px;height:60px;display:flex;align-items:center;justify-content:space-between;position:sticky;top:0;z-index:100}
        .db-body{flex:1;padding:24px;overflow-y:auto}
        .ni{display:flex;align-items:center;gap:9px;padding:9px 12px;margin:1px 8px;border-radius:8px;font-size:13px;font-weight:500;cursor:pointer;transition:all .18s;color:rgba(255,255,255,.5)}
        .ni:hover{background:rgba(255,255,255,.07);color:rgba(255,255,255,.85)}
        .ni.on{background:rgba(201,163,71,.15);color:#c9a347}
        .ni svg{width:15px;height:15px;flex-shrink:0}
        .card{background:#fff;border:1px solid #f0f0f0;border-radius:14px;overflow:hidden}
        .card-hdr{padding:14px 18px;border-bottom:1px solid #f0f0f0;display:flex;align-items:center;justify-content:space-between}
        .t{width:100%;border-collapse:collapse;font-size:13px}
        .t th{background:#f8f9fb;padding:9px 12px;text-align:left;font-size:11px;font-weight:700;letter-spacing:.07em;text-transform:uppercase;color:#9ca3af;border-bottom:1px solid #f0f0f0;white-space:nowrap}
        .t td{padding:11px 12px;border-bottom:1px solid #f8f9fb;vertical-align:middle;color:#374151}
        .t tr:last-child td{border-bottom:none}
        .t tr:hover td{background:#fafafa}
        .btn{display:inline-flex;align-items:center;gap:5px;padding:7px 13px;border-radius:7px;font-size:12px;font-weight:600;cursor:pointer;border:none;font-family:'Sora',sans-serif;transition:all .15s;white-space:nowrap}
        .b-dark{background:#111827;color:#fff}.b-dark:hover{background:#1f2937}
        .b-gold{background:#c9a347;color:#0a0f1a}.b-gold:hover{background:#e8c97a}
        .b-ghost{background:#f3f4f6;color:#374151}.b-ghost:hover{background:#e5e7eb}
        .b-red{background:#fee2e2;color:#dc2626}.b-red:hover{background:#fecaca}
        .b-blue{background:#dbeafe;color:#2563eb}.b-blue:hover{background:#bfdbfe}
        .b-sm{padding:4px 9px;font-size:11px;border-radius:6px}
        .fg{display:flex;flex-direction:column;gap:4px;margin-bottom:12px}
        .fg2{display:grid;grid-template-columns:1fr 1fr;gap:12px}
        input:focus,select:focus,textarea:focus{border-color:#c9a347!important;box-shadow:0 0 0 3px rgba(201,163,71,.12)!important;outline:none!important}
        @keyframes toastIn{from{transform:translateY(16px);opacity:0}to{transform:translateY(0);opacity:1}}
        @media(max-width:768px){.db-side{width:54px;min-width:54px}.nlabel{display:none}.slogo{display:none}}
      `}</style>

      <div className="db">
        {toast && <Toast msg={toast.msg} type={toast.type} />}

        {/* ── Sidebar ── */}
        <aside className="db-side">
          <div className="slogo" style={{ padding:"18px 16px 14px", borderBottom:"1px solid rgba(255,255,255,.07)" }}>
            <div style={{ fontSize:15, fontWeight:800, color:"#f5f0e8" }}>Paris <span style={{ color:"#c9a347" }}>Easy</span> Move</div>
            <div style={{ fontSize:9, color:"rgba(255,255,255,.25)", letterSpacing:".14em", textTransform:"uppercase", marginTop:2 }}>Admin Panel</div>
          </div>

          <nav style={{ padding:"10px 0", flex:1 }}>
            <div className="nlabel" style={{ fontSize:9, fontWeight:700, color:"rgba(255,255,255,.2)", letterSpacing:".14em", textTransform:"uppercase", padding:"6px 20px 4px" }}>Management</div>
            {NAV.map(n => (
              <div key={n.id} className={`ni${tab === n.id ? " on" : ""}`} onClick={() => setTab(n.id)}>
                <svg fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="1.8">
                  <path strokeLinecap="round" strokeLinejoin="round" d={n.icon} />
                </svg>
                <span className="nlabel">{n.label}</span>
                {n.id === "bookings" && newCount > 0 && (
                  <span className="nlabel" style={{ marginLeft:"auto", background:"#ef4444", color:"#fff", fontSize:9, fontWeight:800, padding:"1px 5px", borderRadius:999 }}>{newCount}</span>
                )}
              </div>
            ))}
          </nav>

          <div style={{ padding:"10px 8px", borderTop:"1px solid rgba(255,255,255,.07)" }}>
            <div className="ni" onClick={onLogout}>
              <svg fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="1.8" style={{ width:15, height:15 }}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
              </svg>
              <span className="nlabel">Logout</span>
            </div>
          </div>
        </aside>

        {/* ── Main ── */}
        <div className="db-main">
          <div className="db-topbar">
            <div>
              <div style={{ fontSize:15, fontWeight:700 }}>{NAV.find(n => n.id === tab)?.label}</div>
              <div style={{ fontSize:11, color:"#9ca3af" }}>Paris Easy Move · Admin</div>
            </div>
            <div style={{ display:"flex", alignItems:"center", gap:10 }}>
              <span style={{ fontSize:12, color:"#9ca3af" }}>admin</span>
              <div style={{ width:32, height:32, borderRadius:"50%", background:"#c9a347", display:"flex", alignItems:"center", justifyContent:"center", fontSize:13, fontWeight:700, color:"#0a0f1a" }}>A</div>
            </div>
          </div>

          <div className="db-body">
            {!loaded && <div style={{ padding:48, textAlign:"center", color:"#9ca3af", fontSize:14 }}>Loading data from database…</div>}
            {loaded && tab === "overview"   && <OverviewTab   bookings={bookings} locations={locations} vehicles={vehicles} rates={rates} features={features} categories={categories} />}
            {loaded && tab === "bookings"   && <BookingsTab   bookings={bookings}  setBookings={setBookings}   vehicles={vehicles}  rates={rates}  showToast={showToast} />}
            {loaded && tab === "categories" && <CategoriesTab categories={categories} setCategories={setCategories} showToast={showToast} />}
            {loaded && tab === "locations"  && <LocationsTab  locations={locations}   setLocations={setLocations}   categories={categories} showToast={showToast} />}
            {loaded && tab === "vehicles"   && <VehiclesTab   vehicles={vehicles}     setVehicles={setVehicles}     showToast={showToast} />}
            {loaded && tab === "features"   && <FeaturesTab   features={features}     setFeatures={setFeatures}     showToast={showToast} />}
            {loaded && tab === "rates"      && (
              <RatesTab
                rates={rates}
                setRates={setRates}
                locations={locations}
                vehicles={vehicles}
                showToast={showToast}
              />
            )}
            {loaded && tab === "settings"   && <SettingsTab   showToast={showToast} />}
          </div>
        </div>
      </div>
    </>
  );
}

// ════════════════════════════════════════════════════════════════
//  OVERVIEW
// ════════════════════════════════════════════════════════════════
function OverviewTab({ bookings, locations, vehicles, rates, features, categories }: any) {
  const sc: Record<string, string> = { new:"amber", confirmed:"green", cancelled:"red" };
  const stats = [
    { label:"Total Bookings",   val:bookings.length,                              sub:`${bookings.filter((b:any)=>b.status==="new").length} awaiting confirmation`, color:"#111827" },
    { label:"Active Locations", val:locations.filter((l:any)=>l.active).length,   sub:`of ${locations.length} total`,     color:"#2563eb" },
    { label:"Active Vehicles",  val:vehicles.filter((v:any)=>v.active).length,    sub:`of ${vehicles.length} total`,      color:"#16a34a" },
    { label:"Active Routes",    val:rates.filter((r:any)=>r.active).length,       sub:`of ${rates.length} total`,         color:"#d97706" },
    { label:"Categories",       val:categories.filter((c:any)=>c.active).length,  sub:`${categories.length} total`,       color:"#7c3aed" },
    { label:"Features",         val:features.filter((f:any)=>f.active).length,    sub:"shown on vehicle cards",           color:"#0891b2" },
  ];
  return (
    <div>
      <div style={{ display:"flex", gap:12, flexWrap:"wrap", marginBottom:24 }}>
        {stats.map(s => (
          <div key={s.label} style={{ background:"#fff", border:"1px solid #f0f0f0", borderRadius:12, padding:"16px 20px", flex:"1 1 160px" }}>
            <div style={{ fontSize:28, fontWeight:800, color:s.color, lineHeight:1 }}>{s.val}</div>
            <div style={{ fontSize:13, fontWeight:600, color:"#111827", marginTop:6 }}>{s.label}</div>
            <div style={{ fontSize:11, color:"#9ca3af", marginTop:2 }}>{s.sub}</div>
          </div>
        ))}
      </div>
      <div className="card">
        <div className="card-hdr"><span style={{ fontWeight:700, fontSize:14 }}>Recent Bookings</span></div>
        <div style={{ overflowX:"auto" }}>
          <table className="t">
            <thead><tr><th>Client</th><th>Route</th><th>Date & Time</th><th>Status</th></tr></thead>
            <tbody>
              {bookings.length === 0 && <tr><td colSpan={4} style={{ padding:28, textAlign:"center", color:"#9ca3af" }}>No bookings yet</td></tr>}
              {bookings.slice(0, 8).map((b: Booking) => (
                <tr key={b.id}>
                  <td><div style={{ fontWeight:600 }}>{b.name}</div><div style={{ fontSize:11, color:"#9ca3af" }}>{b.email}</div></td>
                  <td style={{ fontSize:12 }}>{b.from} → {b.to}</td>
                  <td style={{ fontSize:12 }}>{b.date} {b.time}</td>
                  <td><Chip color={sc[b.status]}>{b.status}</Chip></td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

// ════════════════════════════════════════════════════════════════
//  BOOKINGS
// ════════════════════════════════════════════════════════════════
function BookingsTab({ bookings, setBookings, vehicles, rates, showToast }: { bookings:Booking[]; setBookings:any; vehicles:Vehicle[]; rates:Rate[]; showToast:any }) {
  const [sel,    setSel]    = useState<Booking | null>(null);
  const [filter, setFilter] = useState("all");
  const [search, setSearch] = useState("");

  const sc: Record<string, { chip:string; label:string; icon:string; bg:string; bar:string }> = {
    new:       { chip:"amber",  label:"Awaiting",  icon:"⏳", bg:"#fffbeb", bar:"#f59e0b" },
    confirmed: { chip:"green",  label:"Confirmed", icon:"✅", bg:"#f0fdf4", bar:"#16a34a" },
    cancelled: { chip:"red",    label:"Cancelled", icon:"❌", bg:"#fef2f2", bar:"#dc2626" },
  };

  const vName  = (id: string) => vehicles.find(v => v.id === id)?.name ?? id;
  const vModel = (id: string) => vehicles.find(v => v.id === id)?.model ?? "";
  const vImg   = (id: string) => vehicles.find(v => v.id === id)?.img ?? "/images/car.png";

  // Look up price from rates table for a booking
  const getPrice = (b: Booking): string => {
    const rate = rates.find(r => r.fromLocId === (b as any).fromLocId && r.toLocId === (b as any).toLocId && r.vehicleId === b.vehicleId);
    if (!rate) return "—";
    if (rate.onDemand) return "On Demand";
    return rate.price ? `€${rate.price}` : "—";
  };

  // Short ref from booking ID
  const ref = (id: string) => id.slice(0,8).toUpperCase();

  const rows = bookings.filter(b => {
    if (filter !== "all" && b.status !== filter) return false;
    if (search && !`${b.name} ${b.from} ${b.to} ${b.email} ${b.id}`.toLowerCase().includes(search.toLowerCase())) return false;
    return true;
  });

  const upd = async (id: string, status: Booking["status"]) => {
    try { await api("/api/bookings","PUT",{id,status}); setBookings((bs:Booking[])=>bs.map(b=>b.id===id?{...b,status}:b)); showToast(`Marked ${status}`); }
    catch { showToast("Update failed","error"); }
  };
  const del = async (id: string) => {
    if (!confirm("Permanently delete this booking?")) return;
    try { await api(`/api/bookings?id=${id}`,"DELETE"); setBookings((bs:Booking[])=>bs.filter(b=>b.id!==id)); setSel(null); showToast("Deleted"); }
    catch { showToast("Delete failed","error"); }
  };

  // Stats bar
  const stats = [
    { label:"Total",     val:bookings.length,                                  color:"#111827", bg:"#f8f9fb" },
    { label:"New",       val:bookings.filter(b=>b.status==="new").length,       color:"#d97706", bg:"#fffbeb" },
    { label:"Confirmed", val:bookings.filter(b=>b.status==="confirmed").length, color:"#16a34a", bg:"#f0fdf4" },
    { label:"Cancelled", val:bookings.filter(b=>b.status==="cancelled").length, color:"#dc2626", bg:"#fef2f2" },
  ];

  return (
    <div>
      {/* ── Stats row ── */}
      <div style={{ display:"flex", gap:10, marginBottom:18, flexWrap:"wrap" }}>
        {stats.map(s => (
          <div key={s.label} style={{ background:s.bg, border:"1px solid #f0f0f0", borderRadius:12, padding:"12px 20px", flex:"1 1 100px", cursor:"pointer" }}
            onClick={()=>setFilter(s.label.toLowerCase()==="total"?"all":s.label.toLowerCase())}>
            <div style={{ fontSize:26, fontWeight:800, color:s.color, lineHeight:1 }}>{s.val}</div>
            <div style={{ fontSize:11, color:"#9ca3af", marginTop:3, fontWeight:600, textTransform:"uppercase", letterSpacing:".06em" }}>{s.label}</div>
          </div>
        ))}
      </div>

      {/* ── Toolbar ── */}
      <div style={{ display:"flex", gap:8, flexWrap:"wrap", marginBottom:14, alignItems:"center" }}>
        <input value={search} onChange={e=>setSearch(e.target.value)} placeholder="Search name, ref, route, email…"
          style={{...IS, width:240, padding:"8px 11px"}}/>
        <div style={{ display:"flex", gap:5 }}>
          {(["all","new","confirmed","cancelled"] as const).map(f => (
            <button key={f} className={`btn b-sm ${filter===f?"b-dark":"b-ghost"}`} onClick={()=>setFilter(f)}>
              {f.charAt(0).toUpperCase()+f.slice(1)}
              {f==="new" && bookings.filter(b=>b.status==="new").length > 0 && (
                <span style={{ background:"#ef4444", color:"#fff", fontSize:9, borderRadius:999, padding:"0 4px", marginLeft:3 }}>
                  {bookings.filter(b=>b.status==="new").length}
                </span>
              )}
            </button>
          ))}
        </div>
        <span style={{ marginLeft:"auto", fontSize:11, color:"#9ca3af" }}>{rows.length} result{rows.length!==1?"s":""}</span>
      </div>

      {/* ── Table ── */}
      <div className="card">
        <div style={{ overflowX:"auto" }}>
          <table className="t">
            <thead>
              <tr>
                <th>Ref</th>
                <th>Client</th>
                <th>Route</th>
                <th>Date / Time</th>
                <th>Vehicle</th>
                <th>Pax</th>
                <th style={{textAlign:"right"}}>Price</th>
                <th>Status</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {rows.length===0 && (
                <tr><td colSpan={9} style={{ padding:40, textAlign:"center", color:"#9ca3af" }}>
                  <div style={{ fontSize:32, marginBottom:8 }}>📭</div>
                  No bookings found
                </td></tr>
              )}
              {rows.map(b => {
                const s = sc[b.status];
                const price = getPrice(b);
                return (
                  <tr key={b.id} style={{ borderLeft:`3px solid ${s.bar}` }}>
                    <td>
                      <span style={{ fontFamily:"monospace", fontSize:11, fontWeight:700, background:"#f3f4f6", padding:"3px 7px", borderRadius:5, color:"#374151", letterSpacing:".06em" }}>
                        {ref(b.id)}
                      </span>
                    </td>
                    <td>
                      <div style={{ fontWeight:600, fontSize:13 }}>{b.name}</div>
                      <div style={{ fontSize:11, color:"#9ca3af" }}>{b.email}</div>
                    </td>
                    <td>
                      <div style={{ fontSize:12, fontWeight:500 }}>{b.from}</div>
                      <div style={{ fontSize:11, color:"#9ca3af" }}>→ {b.to}</div>
                    </td>
                    <td>
                      <div style={{ fontSize:12 }}>{b.date}</div>
                      <div style={{ fontSize:11, color:"#9ca3af" }}>{b.time}</div>
                    </td>
                    <td style={{ fontSize:11, maxWidth:130 }}>
                      <div style={{ fontWeight:600, fontSize:12 }}>{vName(b.vehicleId)}</div>
                      <div style={{ fontSize:10, color:"#9ca3af" }}>{vModel(b.vehicleId)}</div>
                    </td>
                    <td style={{ fontSize:12, whiteSpace:"nowrap" }}>
                      {b.passengers+b.kids} 👤&nbsp;&nbsp;{b.bags} 🧳
                    </td>
                    <td style={{ textAlign:"right" }}>
                      <span style={{ fontWeight:800, fontSize:14, color: price==="On Demand"?"#d97706":price==="—"?"#d1d5db":"#111827" }}>
                        {price}
                      </span>
                    </td>
                    <td><Chip color={s.chip}>{s.icon} {s.label}</Chip></td>
                    <td>
                      <div style={{ display:"flex", gap:4 }}>
                        <button className="btn b-ghost b-sm" onClick={()=>setSel(b)}>View</button>
                        {b.status==="new" && (
                          <button className="btn b-sm" style={{ background:"#dcfce7", color:"#16a34a" }} onClick={()=>upd(b.id,"confirmed")}>✓</button>
                        )}
                        {b.status!=="cancelled" && (
                          <button className="btn b-red b-sm" onClick={()=>upd(b.id,"cancelled")}>✗</button>
                        )}
                      </div>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>

      {/* ── BOOKING DETAIL MODAL — luxury voucher style ── */}
      {sel && (() => {
        const s   = sc[sel.status];
        const price = getPrice(sel);
        const veh = vehicles.find(v => v.id === sel.vehicleId);
        return (
          <div style={{ position:"fixed", inset:0, zIndex:9999, display:"flex", alignItems:"center", justifyContent:"center", padding:16 }}>
            <div style={{ position:"absolute", inset:0, background:"rgba(0,0,0,.65)", backdropFilter:"blur(6px)" }} onClick={()=>setSel(null)}/>

            <div style={{ position:"relative", width:"100%", maxWidth:580, maxHeight:"94vh", overflow:"auto", borderRadius:20, boxShadow:"0 32px 100px rgba(0,0,0,.35)" }}>

              {/* ── Header band ── */}
              <div style={{ background:"linear-gradient(135deg,#0a1f44 0%,#1a3a6e 100%)", padding:"28px 28px 22px", position:"relative", overflow:"hidden" }}>
                {/* decorative circles */}
                <div style={{ position:"absolute", top:-40, right:-40, width:160, height:160, borderRadius:"50%", background:"rgba(255,255,255,.04)" }}/>
                <div style={{ position:"absolute", bottom:-30, left:60, width:100, height:100, borderRadius:"50%", background:"rgba(201,163,71,.08)" }}/>

                <div style={{ display:"flex", justifyContent:"space-between", alignItems:"flex-start", position:"relative" }}>
                  <div>
                    <div style={{ fontSize:10, fontWeight:700, letterSpacing:".14em", textTransform:"uppercase", color:"rgba(255,255,255,.4)", marginBottom:6 }}>
                      Booking Voucher
                    </div>
                    <div style={{ fontSize:22, fontWeight:800, color:"#fff", lineHeight:1.2, marginBottom:4 }}>
                      {sel.name}
                    </div>
                    <div style={{ fontSize:12, color:"rgba(255,255,255,.5)" }}>{sel.email}</div>
                  </div>
                  <div style={{ display:"flex", flexDirection:"column", alignItems:"flex-end", gap:8 }}>
                    <button onClick={()=>setSel(null)} style={{ background:"rgba(255,255,255,.1)", border:"none", color:"rgba(255,255,255,.7)", width:30, height:30, borderRadius:"50%", fontSize:18, cursor:"pointer", display:"flex", alignItems:"center", justifyContent:"center", lineHeight:1 }}>×</button>
                    <div style={{ background: s.bar, color:"#fff", fontSize:11, fontWeight:700, padding:"4px 12px", borderRadius:999, letterSpacing:".06em", textTransform:"uppercase" }}>
                      {s.icon} {s.label}
                    </div>
                  </div>
                </div>

                {/* Ref + price strip */}
                <div style={{ display:"flex", gap:0, marginTop:20, background:"rgba(0,0,0,.2)", borderRadius:12, overflow:"hidden" }}>
                  <div style={{ flex:1, padding:"12px 18px", borderRight:"1px solid rgba(255,255,255,.07)" }}>
                    <div style={{ fontSize:9, fontWeight:700, color:"rgba(255,255,255,.35)", letterSpacing:".12em", textTransform:"uppercase", marginBottom:4 }}>Reference</div>
                    <div style={{ fontFamily:"monospace", fontSize:15, fontWeight:800, color:"#c9a347", letterSpacing:".1em" }}>
                      PEM-{ref(sel.id)}
                    </div>
                  </div>
                  <div style={{ flex:1, padding:"12px 18px", borderRight:"1px solid rgba(255,255,255,.07)" }}>
                    <div style={{ fontSize:9, fontWeight:700, color:"rgba(255,255,255,.35)", letterSpacing:".12em", textTransform:"uppercase", marginBottom:4 }}>Total Fare</div>
                    <div style={{ fontSize:18, fontWeight:900, color: price==="On Demand"?"#fbbf24":"#4ade80" }}>{price}</div>
                  </div>
                  <div style={{ flex:1, padding:"12px 18px" }}>
                    <div style={{ fontSize:9, fontWeight:700, color:"rgba(255,255,255,.35)", letterSpacing:".12em", textTransform:"uppercase", marginBottom:4 }}>Booked On</div>
                    <div style={{ fontSize:11, fontWeight:600, color:"rgba(255,255,255,.7)" }}>
                      {new Date(sel.createdAt).toLocaleDateString("en-GB",{day:"2-digit",month:"short",year:"numeric"})}
                    </div>
                  </div>
                </div>
              </div>

              {/* ── Body ── */}
              <div style={{ background:"#fff", padding:"0 0 24px" }}>

                {/* Route card */}
                <div style={{ background:"linear-gradient(135deg,#f8faff,#f0f4ff)", borderBottom:"1px solid #e8edf5", padding:"18px 28px" }}>
                  <div style={{ display:"flex", alignItems:"center", gap:0 }}>
                    <div style={{ flex:1 }}>
                      <div style={{ fontSize:9, fontWeight:700, color:"#9ca3af", letterSpacing:".1em", textTransform:"uppercase", marginBottom:4 }}>From</div>
                      <div style={{ fontWeight:800, fontSize:15, color:"#111827" }}>{sel.from}</div>
                    </div>
                    <div style={{ padding:"0 16px", display:"flex", flexDirection:"column", alignItems:"center", gap:4 }}>
                      <div style={{ width:32, height:32, borderRadius:"50%", background:"#0a1f44", display:"flex", alignItems:"center", justifyContent:"center" }}>
                        <svg width={14} height={14} fill="none" viewBox="0 0 24 24" stroke="#c9a347" strokeWidth={2.5}>
                          <path strokeLinecap="round" strokeLinejoin="round" d="M17 8l4 4m0 0l-4 4m4-4H3"/>
                        </svg>
                      </div>
                    </div>
                    <div style={{ flex:1, textAlign:"right" }}>
                      <div style={{ fontSize:9, fontWeight:700, color:"#9ca3af", letterSpacing:".1em", textTransform:"uppercase", marginBottom:4 }}>To</div>
                      <div style={{ fontWeight:800, fontSize:15, color:"#111827" }}>{sel.to}</div>
                    </div>
                  </div>
                </div>

                <div style={{ padding:"20px 28px 0" }}>
                  {/* Two-col trip info */}
                  <div style={{ display:"grid", gridTemplateColumns:"1fr 1fr", gap:12, marginBottom:16 }}>
                    {[
                      { icon:"📅", label:"Date",        val:sel.date },
                      { icon:"🕐", label:"Pickup Time",  val:sel.time },
                      { icon:"👤", label:"Passengers",   val:`${sel.passengers} adults · ${sel.kids} children` },
                      { icon:"🧳", label:"Luggage",       val:`${sel.bags} bag${sel.bags!==1?"s":""}` },
                    ].map(r => (
                      <div key={r.label} style={{ background:"#f8f9fb", borderRadius:10, padding:"10px 14px", display:"flex", alignItems:"center", gap:10 }}>
                        <span style={{ fontSize:18 }}>{r.icon}</span>
                        <div>
                          <div style={{ fontSize:9, fontWeight:700, color:"#9ca3af", textTransform:"uppercase", letterSpacing:".08em" }}>{r.label}</div>
                          <div style={{ fontSize:13, fontWeight:600, color:"#111827", marginTop:1 }}>{r.val}</div>
                        </div>
                      </div>
                    ))}
                  </div>

                  {/* Vehicle card */}
                  {veh && (
                    <div style={{ border:"1.5px solid #e5e7eb", borderRadius:12, overflow:"hidden", marginBottom:16, display:"flex", alignItems:"center" }}>
                      <img src={veh.img} alt={veh.name} style={{ width:90, height:66, objectFit:"cover", flexShrink:0, background:"#f3f4f6" }}/>
                      <div style={{ padding:"10px 14px", flex:1 }}>
                        <div style={{ fontSize:11, fontWeight:800, textTransform:"uppercase", letterSpacing:".06em", color:"#111827" }}>{veh.name}</div>
                        <div style={{ fontSize:11, color:"#9ca3af", marginTop:2 }}>{veh.model}</div>
                        <div style={{ display:"flex", gap:10, marginTop:4, fontSize:10, color:"#6b7280", fontWeight:600 }}>
                          <span>👤 Max {veh.maxPassengers}</span>
                          <span>🧳 Max {veh.maxLuggage}</span>
                        </div>
                      </div>
                      <div style={{ padding:"0 18px", textAlign:"center" }}>
                        <div style={{ fontSize:20, fontWeight:900, color:"#111827" }}>{price}</div>
                        <div style={{ fontSize:9, color:"#9ca3af", marginTop:2, textTransform:"uppercase", letterSpacing:".06em" }}>Fixed fare</div>
                      </div>
                    </div>
                  )}

                  {/* Divider with scissors */}
                  <div style={{ display:"flex", alignItems:"center", gap:8, margin:"4px 0 16px", color:"#d1d5db", fontSize:11 }}>
                    <div style={{ flex:1, height:1, background:"repeating-linear-gradient(90deg,#d1d5db 0,#d1d5db 6px,transparent 6px,transparent 12px)" }}/>
                    <span style={{ fontSize:14 }}>✂</span>
                    <div style={{ flex:1, height:1, background:"repeating-linear-gradient(90deg,#d1d5db 0,#d1d5db 6px,transparent 6px,transparent 12px)" }}/>
                  </div>

                  {/* Contact info */}
                  <div style={{ display:"grid", gridTemplateColumns:"1fr 1fr", gap:10, marginBottom:16 }}>
                    {[
                      { label:"Country",  val:sel.country,  icon:"🌍" },
                      { label:"WhatsApp", val:sel.whatsapp, icon:"💬" },
                      { label:"Email",    val:sel.email,    icon:"✉️" },
                      ...(sel.notes ? [{ label:"Notes", val:sel.notes, icon:"📝" }] : []),
                    ].map(r => (
                      <div key={r.label} style={{ display:"flex", alignItems:"flex-start", gap:8, padding:"8px 12px", background:"#fafafa", borderRadius:9, border:"1px solid #f0f0f0" }}>
                        <span style={{ fontSize:14, marginTop:1 }}>{r.icon}</span>
                        <div style={{ minWidth:0 }}>
                          <div style={{ fontSize:9, fontWeight:700, color:"#9ca3af", textTransform:"uppercase", letterSpacing:".08em" }}>{r.label}</div>
                          <div style={{ fontSize:12, fontWeight:600, color:"#111827", marginTop:1, wordBreak:"break-all" }}>{r.val}</div>
                        </div>
                      </div>
                    ))}
                  </div>

                  {/* Action buttons */}
                  <div style={{ display:"flex", gap:8 }}>
                    {sel.status!=="confirmed" && (
                      <button className="btn b-dark" style={{ flex:1, justifyContent:"center", padding:"11px" }}
                        onClick={()=>{upd(sel.id,"confirmed");setSel(null);}}>
                        ✓ Confirm Booking
                      </button>
                    )}
                    {sel.status!=="cancelled" && (
                      <button className="btn" style={{ flex:1, justifyContent:"center", padding:"11px", background:"#fff7ed", color:"#c2410c", border:"1.5px solid #fed7aa" }}
                        onClick={()=>{upd(sel.id,"cancelled");setSel(null);}}>
                        ✗ Cancel
                      </button>
                    )}
                    <button className="btn b-red" style={{ padding:"11px 14px" }} onClick={()=>del(sel.id)}>
                      🗑
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        );
      })()}
    </div>
  );
}

// ════════════════════════════════════════════════════════════════
//  CATEGORIES
// ════════════════════════════════════════════════════════════════
function CategoriesTab({ categories, setCategories, showToast }: { categories:Category[]; setCategories:any; showToast:any }) {
  const [modal, setModal]   = useState<"add"|"edit"|null>(null);
  const [edit,  setEdit]    = useState<Category|null>(null);
  const [form,  setForm]    = useState({ name:"", icon:"📍", sortOrder:0 });

  const openAdd  = () => { setForm({ name:"", icon:"📍", sortOrder:categories.length }); setEdit(null); setModal("add"); };
  const openEdit = (c:Category) => { setForm({ name:c.name, icon:c.icon, sortOrder:c.sortOrder }); setEdit(c); setModal("edit"); };

  const save = async () => {
    if (!form.name.trim()) return showToast("Name required","error");
    try {
      if (modal==="add") { const s=await api("/api/location-categories","POST",{id:uid(),...form,active:true}); setCategories((cs:Category[])=>[...cs,s]); showToast("Category added"); }
      else if (edit)     { const s=await api("/api/location-categories","PUT",{...edit,...form}); setCategories((cs:Category[])=>cs.map(c=>c.id===edit.id?s:c)); showToast("Updated"); }
      setModal(null);
    } catch { showToast("Save failed","error"); }
  };
  const del = async (id:string) => { try { await api(`/api/location-categories?id=${id}`,"DELETE"); setCategories((cs:Category[])=>cs.filter(c=>c.id!==id)); showToast("Deleted"); } catch { showToast("Delete failed","error"); } };
  const tog = async (c:Category) => { const u={...c,active:!c.active}; await api("/api/location-categories","PUT",u); setCategories((cs:Category[])=>cs.map(x=>x.id===c.id?u:x)); };

  return (
    <div>
      <div style={{ display:"flex", justifyContent:"flex-end", marginBottom:14 }}>
        <button className="btn b-gold" onClick={openAdd}>+ Add Category</button>
      </div>
      <div className="card">
        <table className="t">
          <thead><tr><th>Icon</th><th>Name</th><th>Sort Order</th><th>Active</th><th>Actions</th></tr></thead>
          <tbody>
            {categories.length===0 && <tr><td colSpan={5} style={{ padding:24, textAlign:"center", color:"#9ca3af" }}>No categories yet</td></tr>}
            {categories.map((c:Category) => (
              <tr key={c.id}>
                <td style={{ fontSize:22 }}>{c.icon}</td>
                <td style={{ fontWeight:600 }}>{c.name}</td>
                <td style={{ color:"#9ca3af" }}>{c.sortOrder}</td>
                <td><Toggle on={c.active} onChange={()=>tog(c)} /></td>
                <td><div style={{ display:"flex", gap:4 }}><button className="btn b-ghost b-sm" onClick={()=>openEdit(c)}>Edit</button><button className="btn b-red b-sm" onClick={()=>del(c.id)}>Del</button></div></td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      {modal && (
        <Modal title={modal==="add"?"Add Category":"Edit Category"} onClose={()=>setModal(null)}>
          <div className="fg2" style={{ marginBottom:12 }}>
            <div className="fg" style={{ marginBottom:0 }}><label style={LS}>Name *</label><input style={IS} value={form.name} onChange={e=>setForm(f=>({...f,name:e.target.value}))} placeholder="e.g. Airport"/></div>
            <div className="fg" style={{ marginBottom:0 }}><label style={LS}>Icon (emoji)</label><input style={IS} value={form.icon} onChange={e=>setForm(f=>({...f,icon:e.target.value}))} placeholder="✈️"/></div>
          </div>
          <div className="fg"><label style={LS}>Sort Order</label><input style={IS} type="number" value={form.sortOrder} onChange={e=>setForm(f=>({...f,sortOrder:+e.target.value}))}/></div>
          <div style={{ display:"flex", gap:8 }}>
            <button className="btn b-ghost" style={{ flex:1 }} onClick={()=>setModal(null)}>Cancel</button>
            <button className="btn b-dark"  style={{ flex:1 }} onClick={save}>{modal==="add"?"Add Category":"Save Changes"}</button>
          </div>
        </Modal>
      )}
    </div>
  );
}

// ════════════════════════════════════════════════════════════════
//  LOCATIONS
// ════════════════════════════════════════════════════════════════
function LocationsTab({ locations, setLocations, categories, showToast }: { locations:Location[]; setLocations:any; categories:Category[]; showToast:any }) {
  const [modal, setModal] = useState<"add"|"edit"|null>(null);
  const [edit,  setEdit]  = useState<Location|null>(null);
  const [form,  setForm]  = useState({ name:"", categoryId:"" });
  const [fcat,  setFcat]  = useState("All");

  const openAdd  = () => { setForm({ name:"", categoryId:categories[0]?.id??"" }); setEdit(null); setModal("add"); };
  const openEdit = (l:Location) => { setForm({ name:l.name, categoryId:l.categoryId??"" }); setEdit(l); setModal("edit"); };

  const save = async () => {
    if (!form.name.trim()) return showToast("Name required","error");
    try {
      if (modal==="add") { const s=await api("/api/locations","POST",{id:uid(),...form,active:true}); setLocations((ls:Location[])=>[...ls,s]); showToast("Location added"); }
      else if (edit)     { const s=await api("/api/locations","PUT",{...edit,...form}); setLocations((ls:Location[])=>ls.map(l=>l.id===edit.id?s:l)); showToast("Updated"); }
      setModal(null);
    } catch { showToast("Save failed","error"); }
  };
  const del = async (id:string) => { try { await api(`/api/locations?id=${id}`,"DELETE"); setLocations((ls:Location[])=>ls.filter(l=>l.id!==id)); showToast("Deleted"); } catch { showToast("Delete failed","error"); } };
  const tog = async (l:Location) => { const u={...l,active:!l.active}; await api("/api/locations","PUT",u); setLocations((ls:Location[])=>ls.map(x=>x.id===l.id?u:x)); };

  const catNames = ["All",...Array.from(new Set(locations.map(l=>l.categoryName))).sort()];
  const shown    = fcat==="All" ? locations : locations.filter(l=>l.categoryName===fcat);

  return (
    <div>
      <div style={{ display:"flex", gap:8, flexWrap:"wrap", marginBottom:14, alignItems:"center" }}>
        {catNames.map(c => <button key={c} className={`btn b-sm ${fcat===c?"b-dark":"b-ghost"}`} onClick={()=>setFcat(c)}>{c}</button>)}
        <button className="btn b-gold" style={{ marginLeft:"auto" }} onClick={openAdd}>+ Add Location</button>
      </div>
      <div className="card">
        <table className="t">
          <thead><tr><th>Name</th><th>Category</th><th>Active</th><th>Actions</th></tr></thead>
          <tbody>
            {shown.length===0 && <tr><td colSpan={4} style={{ padding:24, textAlign:"center", color:"#9ca3af" }}>No locations</td></tr>}
            {shown.map((l:Location) => (
              <tr key={l.id}>
                <td style={{ fontWeight:500 }}>{l.name}</td>
                <td><span style={{ marginRight:5 }}>{l.categoryIcon}</span>{l.categoryName}</td>
                <td><Toggle on={l.active} onChange={()=>tog(l)} /></td>
                <td><div style={{ display:"flex", gap:4 }}><button className="btn b-ghost b-sm" onClick={()=>openEdit(l)}>Edit</button><button className="btn b-red b-sm" onClick={()=>del(l.id)}>Del</button></div></td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      {modal && (
        <Modal title={modal==="add"?"Add Location":"Edit Location"} onClose={()=>setModal(null)}>
          <div className="fg"><label style={LS}>Location Name *</label><input style={IS} value={form.name} onChange={e=>setForm(f=>({...f,name:e.target.value}))} placeholder="e.g. Charles de Gaulle Airport"/></div>
          <div className="fg">
            <label style={LS}>Category</label>
            <select style={IS} value={form.categoryId} onChange={e=>setForm(f=>({...f,categoryId:e.target.value}))}>
              <option value="">— No category —</option>
              {categories.map((c:Category) => <option key={c.id} value={c.id}>{c.icon} {c.name}</option>)}
            </select>
          </div>
          <div style={{ display:"flex", gap:8 }}>
            <button className="btn b-ghost" style={{ flex:1 }} onClick={()=>setModal(null)}>Cancel</button>
            <button className="btn b-dark"  style={{ flex:1 }} onClick={save}>{modal==="add"?"Add Location":"Save Changes"}</button>
          </div>
        </Modal>
      )}
    </div>
  );
}

// ════════════════════════════════════════════════════════════════
//  VEHICLES
// ════════════════════════════════════════════════════════════════
function VehiclesTab({ vehicles, setVehicles, showToast }: { vehicles:Vehicle[]; setVehicles:any; showToast:any }) {
  const empty = { name:"", model:"", maxPassengers:4, maxLuggage:4, img:"/images/car.png", price:80, tag:"", special:"", active:true, sortOrder:0 };
  const [modal, setModal] = useState<"add"|"edit"|null>(null);
  const [edit,  setEdit]  = useState<Vehicle|null>(null);
  const [form,  setForm]  = useState<typeof empty>(empty);
  const f = (k:string,v:any) => setForm(p=>({...p,[k]:v}));

  const openAdd  = () => { setForm({...empty,sortOrder:vehicles.length}); setEdit(null); setModal("add"); };
  const openEdit = (v:Vehicle) => { setForm({ name:v.name, model:v.model, maxPassengers:v.maxPassengers, maxLuggage:v.maxLuggage, img:v.img, price:v.price, tag:v.tag, special:v.special, active:v.active, sortOrder:v.sortOrder }); setEdit(v); setModal("edit"); };

  const save = async () => {
    if (!form.name.trim()||!form.model.trim()) return showToast("Name and model required","error");
    try {
      if (modal==="add") { const s=await api("/api/vehicles","POST",{...form,id:uid()}); setVehicles((vs:Vehicle[])=>[...vs,s]); showToast("Vehicle added"); }
      else if (edit)     { const s=await api("/api/vehicles","PUT",{...edit,...form}); setVehicles((vs:Vehicle[])=>vs.map(v=>v.id===edit.id?s:v)); showToast("Updated"); }
      setModal(null);
    } catch { showToast("Save failed","error"); }
  };
  const del = async (id:string) => { try { await api(`/api/vehicles?id=${id}`,"DELETE"); setVehicles((vs:Vehicle[])=>vs.filter(v=>v.id!==id)); showToast("Deleted"); } catch { showToast("Delete failed","error"); } };
  const tog = async (v:Vehicle) => { const u={...v,active:!v.active}; await api("/api/vehicles","PUT",u); setVehicles((vs:Vehicle[])=>vs.map(x=>x.id===v.id?u:x)); };

  return (
    <div>
      <div style={{ display:"flex", justifyContent:"flex-end", marginBottom:14 }}>
        <button className="btn b-gold" onClick={openAdd}>+ Add Vehicle</button>
      </div>
      <div className="card">
        <div style={{ overflowX:"auto" }}>
          <table className="t">
            <thead><tr><th>Vehicle</th><th>Capacity</th><th>Price</th><th>Tag</th><th>Active</th><th>Actions</th></tr></thead>
            <tbody>
              {vehicles.length===0 && <tr><td colSpan={6} style={{ padding:24,textAlign:"center",color:"#9ca3af" }}>No vehicles</td></tr>}
              {vehicles.map((v:Vehicle) => (
                <tr key={v.id}>
                  <td>
                    <div style={{ display:"flex", gap:10, alignItems:"center" }}>
                      <img src={v.img} alt={v.name} style={{ width:64, height:44, borderRadius:7, objectFit:"cover", background:"#f3f4f6", flexShrink:0 }} onError={e=>{(e.currentTarget as any).style.background="#f3f4f6";}}/>
                      <div><div style={{ fontWeight:700, fontSize:12, textTransform:"uppercase", letterSpacing:".04em" }}>{v.name}</div><div style={{ fontSize:11, color:"#9ca3af" }}>{v.model}</div></div>
                    </div>
                  </td>
                  <td style={{ fontSize:12 }}>👤 {v.maxPassengers} · 🧳 {v.maxLuggage}</td>
                  <td style={{ fontWeight:700, fontSize:14 }}>€{v.price}</td>
                  <td>{v.tag ? <Chip color="amber">{v.tag}</Chip> : <span style={{ color:"#d1d5db" }}>—</span>}</td>
                  <td><Toggle on={v.active} onChange={()=>tog(v)} /></td>
                  <td><div style={{ display:"flex", gap:4 }}><button className="btn b-ghost b-sm" onClick={()=>openEdit(v)}>Edit</button><button className="btn b-red b-sm" onClick={()=>del(v.id)}>Del</button></div></td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
      {modal && (
        <Modal title={modal==="add"?"Add Vehicle":"Edit Vehicle"} onClose={()=>setModal(null)}>
          <div className="fg2"><div className="fg" style={{marginBottom:0}}><label style={LS}>Name *</label><input style={IS} value={form.name} onChange={e=>f("name",e.target.value)} placeholder="BUSINESS CLASS CAR"/></div><div className="fg" style={{marginBottom:0}}><label style={LS}>Model *</label><input style={IS} value={form.model} onChange={e=>f("model",e.target.value)} placeholder="Mercedes-Benz E-Class"/></div></div>
          <div className="fg2" style={{marginTop:12}}><div className="fg" style={{marginBottom:0}}><label style={LS}>Max Passengers</label><input style={IS} type="number" min={1} value={form.maxPassengers} onChange={e=>f("maxPassengers",+e.target.value)}/></div><div className="fg" style={{marginBottom:0}}><label style={LS}>Max Luggage Bags</label><input style={IS} type="number" min={0} value={form.maxLuggage} onChange={e=>f("maxLuggage",+e.target.value)}/></div></div>
          <div className="fg2" style={{marginTop:12}}><div className="fg" style={{marginBottom:0}}><label style={LS}>Base Price (€)</label><input style={IS} type="number" min={0} value={form.price} onChange={e=>f("price",+e.target.value)}/></div><div className="fg" style={{marginBottom:0}}><label style={LS}>Tag Label</label><input style={IS} value={form.tag} onChange={e=>f("tag",e.target.value)} placeholder="Most Popular"/></div></div>
          <div className="fg" style={{marginTop:12}}><label style={LS}>Image Path</label><input style={IS} value={form.img} onChange={e=>f("img",e.target.value)} placeholder="/images/car.png"/></div>
          <div className="fg"><label style={LS}>Special Note (optional)</label><input style={IS} value={form.special} onChange={e=>f("special",e.target.value)} placeholder="Accommodates strollers"/></div>
          <div className="fg"><label style={LS}>Sort Order</label><input style={IS} type="number" value={form.sortOrder} onChange={e=>f("sortOrder",+e.target.value)}/></div>
          <label style={{ display:"flex", alignItems:"center", gap:10, marginBottom:18, cursor:"pointer" }}>
            <Toggle on={form.active} onChange={()=>f("active",!form.active)}/><span style={{ fontSize:13,fontWeight:500 }}>Active (visible on reservation page)</span>
          </label>
          <div style={{ display:"flex", gap:8 }}><button className="btn b-ghost" style={{flex:1}} onClick={()=>setModal(null)}>Cancel</button><button className="btn b-dark" style={{flex:2}} onClick={save}>{modal==="add"?"Add Vehicle":"Save Changes"}</button></div>
        </Modal>
      )}
    </div>
  );
}

// ════════════════════════════════════════════════════════════════
//  FEATURES
// ════════════════════════════════════════════════════════════════
function FeaturesTab({ features, setFeatures, showToast }: { features:Feature[]; setFeatures:any; showToast:any }) {
  const [text,   setText]   = useState("");
  const [editId, setEditId] = useState<string|null>(null);
  const [editTx, setEditTx] = useState("");

  const add = async () => {
    if (!text.trim()) return showToast("Text required","error");
    try { const s=await api("/api/features","POST",{id:uid(),text:text.trim(),active:true,sort_order:features.length}); setFeatures((fs:Feature[])=>[...fs,s]); setText(""); showToast("Feature added"); }
    catch { showToast("Add failed","error"); }
  };
  const del = async (id:string) => { try { await api(`/api/features?id=${id}`,"DELETE"); setFeatures((fs:Feature[])=>fs.filter(f=>f.id!==id)); showToast("Removed"); } catch { showToast("Delete failed","error"); } };
  const tog = async (feat:Feature) => { const u={...feat,active:!feat.active}; await api("/api/features","PUT",u); setFeatures((fs:Feature[])=>fs.map(f=>f.id===feat.id?u:f)); };
  const saveEdit = async (id:string) => {
    if (!editTx.trim()) return;
    const feat=features.find((f:Feature)=>f.id===id); if(!feat) return;
    const u={...feat,text:editTx.trim()};
    await api("/api/features","PUT",u); setFeatures((fs:Feature[])=>fs.map(f=>f.id===id?u:f)); setEditId(null); showToast("Updated");
  };

  return (
    <div>
      <div style={{ display:"flex", gap:8, marginBottom:14 }}>
        <input style={{...IS,flex:1,padding:"9px 12px"}} value={text} onChange={e=>setText(e.target.value)} placeholder="e.g. Complimentary water bottles" onKeyDown={e=>e.key==="Enter"&&add()}/>
        <button className="btn b-gold" onClick={add}>Add Feature</button>
      </div>
      <div className="card">
        <table className="t">
          <thead><tr><th>#</th><th>Feature Text</th><th>Visible</th><th>Actions</th></tr></thead>
          <tbody>
            {features.length===0 && <tr><td colSpan={4} style={{ padding:24,textAlign:"center",color:"#9ca3af" }}>No features</td></tr>}
            {features.map((f:Feature,i:number) => (
              <tr key={f.id}>
                <td style={{ color:"#9ca3af", fontSize:12 }}>{i+1}</td>
                <td>{editId===f.id ? <input style={{...IS,padding:"6px 9px",fontSize:13}} value={editTx} onChange={e=>setEditTx(e.target.value)} onKeyDown={e=>{if(e.key==="Enter")saveEdit(f.id);if(e.key==="Escape")setEditId(null);}} autoFocus/> : <span style={{ fontWeight:500 }}>{f.text}</span>}</td>
                <td><Toggle on={f.active} onChange={()=>tog(f)} /></td>
                <td>
                  <div style={{ display:"flex", gap:4 }}>
                    {editId===f.id
                      ? <><button className="btn b-dark b-sm" onClick={()=>saveEdit(f.id)}>Save</button><button className="btn b-ghost b-sm" onClick={()=>setEditId(null)}>Cancel</button></>
                      : <><button className="btn b-ghost b-sm" onClick={()=>{setEditId(f.id);setEditTx(f.text);}}>Edit</button><button className="btn b-red b-sm" onClick={()=>del(f.id)}>Del</button></>
                    }
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <div style={{ marginTop:10, padding:"10px 14px", background:"#fffbeb", border:"1px solid #fde68a", borderRadius:9, fontSize:12, color:"#92400e" }}>
        ⚠️ These features appear on every vehicle card on the reservation page. Toggle to show/hide without deleting.
      </div>
    </div>
  );
}

// ════════════════════════════════════════════════════════════════
//  SETTINGS
// ════════════════════════════════════════════════════════════════
function SettingsTab({ showToast }: { showToast:any }) {
  const [pw, setPw] = useState({ cur:"", nw:"", cf:"" });
  const [co, setCo] = useState({ name:"Paris Easy Move", phone:"+33 6 52 46 66 94", email:"booking@pariseasymove.com", address:"10 rue Pierre Sarrazin, 95190 Goussainville" });

  const changePw = () => {
    if (pw.cur !== "paris2024") return showToast("Current password incorrect","error");
    if (pw.nw.length < 6)       return showToast("New password too short (min 6)","error");
    if (pw.nw !== pw.cf)        return showToast("Passwords don't match","error");
    showToast("Password updated — update ADMIN_PASS constant in page.tsx to persist");
    setPw({ cur:"", nw:"", cf:"" });
  };

  return (
    <div style={{ display:"flex", flexDirection:"column", gap:18, maxWidth:560 }}>
      <div className="card">
        <div className="card-hdr"><span style={{ fontWeight:700 }}>Company Information</span></div>
        <div style={{ padding:20, display:"flex", flexDirection:"column", gap:10 }}>
          {(["name","phone","email","address"] as const).map(k=>(
            <div key={k} className="fg" style={{ marginBottom:0 }}>
              <label style={LS}>{k.charAt(0).toUpperCase()+k.slice(1)}</label>
              <input style={IS} value={co[k]} onChange={e=>setCo(c=>({...c,[k]:e.target.value}))}/>
            </div>
          ))}
          <button className="btn b-dark" style={{ alignSelf:"flex-start", marginTop:4 }} onClick={()=>showToast("Saved")}>Save Info</button>
        </div>
      </div>
      <div className="card">
        <div className="card-hdr"><span style={{ fontWeight:700 }}>Change Password</span></div>
        <div style={{ padding:20, display:"flex", flexDirection:"column", gap:10 }}>
          {([["cur","Current Password"],["nw","New Password"],["cf","Confirm New Password"]] as const).map(([k,l])=>(
            <div key={k} className="fg" style={{ marginBottom:0 }}>
              <label style={LS}>{l}</label>
              <input style={IS} type="password" value={pw[k]} onChange={e=>setPw(p=>({...p,[k]:e.target.value}))}/>
            </div>
          ))}
          <button className="btn b-dark" style={{ alignSelf:"flex-start", marginTop:4 }} onClick={changePw}>Update Password</button>
        </div>
      </div>
      <div className="card" style={{ border:"1px solid #fecaca" }}>
        <div className="card-hdr" style={{ background:"#fef2f2" }}><span style={{ fontWeight:700, color:"#dc2626" }}>Danger Zone</span></div>
        <div style={{ padding:20 }}>
          <p style={{ fontSize:13, color:"#6b7280", marginBottom:12 }}>Re-run schema.sql on your database to reset all tables to defaults.</p>
          <code style={{ display:"block", background:"#f8f9fb", border:"1px solid #e5e7eb", borderRadius:8, padding:"10px 14px", fontSize:12, color:"#374151", marginBottom:12 }}>
            psql -U parisadmin -d pariseasymove -f schema.sql
          </code>
        </div>
      </div>
    </div>
  );
}