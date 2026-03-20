"use client";
// app/admin/RatesTab.tsx
// Replace the inline RatesTab in Dashboard.tsx with this import

import { useState, useRef } from "react";

interface Rate {
  id: string;
  fromLocId: string; toLocId: string; vehicleId: string;
  fromLocName: string; toLocName: string; vehicleName: string;
  price: number | null;
  onDemand: boolean; active: boolean;
}
interface Location { id: string; name: string; categoryIcon: string; active: boolean; }
interface Vehicle  { id: string; name: string; tag: string; active: boolean; }

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

const IS: React.CSSProperties = {
  width:"100%", border:"1.5px solid #e5e7eb", borderRadius:8,
  padding:"10px 12px", fontSize:13, color:"#111827",
  outline:"none", fontFamily:"inherit", background:"#fff",
  boxSizing:"border-box" as const,
};
const LS: React.CSSProperties = {
  fontSize:11, fontWeight:600, color:"#374151",
  marginBottom:4, display:"block", letterSpacing:"0.05em",
  textTransform:"uppercase" as const,
};

function Toggle({ on, onChange }: { on: boolean; onChange: () => void }) {
  return (
    <label style={{ position:"relative", display:"inline-block", width:40, height:22, cursor:"pointer" }}>
      <input type="checkbox" checked={on} onChange={onChange} style={{ opacity:0, width:0, height:0 }} />
      <span style={{ position:"absolute", inset:0, background:on?"#16a34a":"#d1d5db", borderRadius:22, transition:".2s" }}>
        <span style={{ position:"absolute", width:16, height:16, left:on?21:3, bottom:3, background:"#fff", borderRadius:"50%", transition:".2s" }} />
      </span>
    </label>
  );
}

export default function RatesTab({
  rates, setRates, locations, vehicles, showToast,
}: {
  rates: Rate[];
  setRates: React.Dispatch<React.SetStateAction<Rate[]>>;
  locations: Location[];
  vehicles: Vehicle[];
  showToast: (m: string, t?: "success"|"error") => void;
}) {
  const fileRef = useRef<HTMLInputElement>(null);
  const [modal,       setModal]       = useState<"add"|"edit"|"bulk"|null>(null);
  const [edit,        setEdit]        = useState<Rate|null>(null);
  const [search,      setSearch]      = useState("");
  const [filterFrom,  setFilterFrom]  = useState("All");
  const [filterVeh,   setFilterVeh]   = useState("All");

  const emptyForm = {
    fromLocId:"", toLocId:"", vehicleId:"",
    price: null as number|null, onDemand:false, active:true,
  };
  const [form, setForm] = useState<typeof emptyForm>(emptyForm);
  const f = (k: string, v: any) => setForm(p => ({ ...p, [k]: v }));

  // Bulk add — add a route for ALL vehicles at once
  const [bulkForm, setBulkForm] = useState({
    fromLocId:"", toLocId:"",
    sedan_price:"", van_price:"", suv_price:"", minibus_price:"",
    onDemand: false, active: true,
  });

  const openAdd  = () => { setForm(emptyForm); setEdit(null); setModal("add"); };
  const openEdit = (r: Rate) => {
    setForm({ fromLocId:r.fromLocId, toLocId:r.toLocId, vehicleId:r.vehicleId, price:r.price, onDemand:r.onDemand, active:r.active });
    setEdit(r); setModal("edit");
  };
  const openBulk = () => {
    setBulkForm({ fromLocId:"", toLocId:"", sedan_price:"", van_price:"", suv_price:"", minibus_price:"", onDemand:false, active:true });
    setModal("bulk");
  };

  const save = async () => {
    if (!form.fromLocId||!form.toLocId) return showToast("From and To required","error");
    if (form.fromLocId===form.toLocId)  return showToast("Cannot be the same location","error");
    if (!form.vehicleId)                return showToast("Vehicle required","error");
    if (!form.onDemand&&!form.price)    return showToast("Enter price or mark On Demand","error");
    try {
      if (modal==="add") {
        const saved = await api("/api/rates","POST",{ ...form, id:uid() });
        setRates(rs => {
          const exists = rs.find(r => r.fromLocId===form.fromLocId && r.toLocId===form.toLocId && r.vehicleId===form.vehicleId);
          return exists ? rs.map(r => r.fromLocId===form.fromLocId && r.toLocId===form.toLocId && r.vehicleId===form.vehicleId ? saved : r) : [...rs, saved];
        });
        showToast("Rate added");
      } else if (edit) {
        const saved = await api("/api/rates","PUT",{ ...edit,...form });
        setRates(rs => rs.map(r => r.id===edit.id ? saved : r));
        showToast("Rate updated");
      }
      setModal(null);
    } catch { showToast("Save failed","error"); }
  };

  const saveBulk = async () => {
    if (!bulkForm.fromLocId||!bulkForm.toLocId) return showToast("From and To required","error");
    if (bulkForm.fromLocId===bulkForm.toLocId)  return showToast("Cannot be the same location","error");
    if (!bulkForm.onDemand && !bulkForm.sedan_price && !bulkForm.van_price && !bulkForm.suv_price && !bulkForm.minibus_price)
      return showToast("Enter at least one price","error");

    const entries = [
      { vehicleId:"sedan",   price: bulkForm.sedan_price },
      { vehicleId:"van",     price: bulkForm.van_price },
      { vehicleId:"suv",     price: bulkForm.suv_price },
      { vehicleId:"minibus", price: bulkForm.minibus_price },
    ];

    let added = 0;
    for (const e of entries) {
      const priceVal = e.price ? parseInt(e.price) : null;
      if (!bulkForm.onDemand && !priceVal) continue; // skip blank prices unless on_demand
      try {
        const saved = await api("/api/rates","POST",{
          id: uid(),
          fromLocId:  bulkForm.fromLocId,
          toLocId:    bulkForm.toLocId,
          vehicleId:  e.vehicleId,
          price:      priceVal,
          onDemand:   bulkForm.onDemand,
          active:     bulkForm.active,
        });
        setRates(rs => {
          const exists = rs.find(r => r.fromLocId===bulkForm.fromLocId && r.toLocId===bulkForm.toLocId && r.vehicleId===e.vehicleId);
          return exists ? rs.map(r => r.fromLocId===bulkForm.fromLocId && r.toLocId===bulkForm.toLocId && r.vehicleId===e.vehicleId ? saved : r) : [...rs, saved];
        });
        added++;
      } catch {}
    }
    showToast(`Added/updated ${added} rates`);
    setModal(null);
  };

  const del = async (id: string) => {
    if (!confirm("Delete this rate?")) return;
    try { await api(`/api/rates?id=${id}`,"DELETE"); setRates(rs => rs.filter(r => r.id!==id)); showToast("Deleted"); }
    catch { showToast("Delete failed","error"); }
  };

  const tog = async (r: Rate) => {
    const u = { ...r, active:!r.active };
    await api("/api/rates","PUT",u);
    setRates(rs => rs.map(x => x.id===r.id ? u : x));
  };

  // Excel import — now expects VEHICLE column too
  const handleImport = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]; if (!file) return;
    try {
      const XLSX = await import("xlsx");
      const data = await file.arrayBuffer();
      const rows: any[] = XLSX.utils.sheet_to_json(XLSX.read(data).Sheets[XLSX.read(data).SheetNames[0]]);
      let n = 0;
      const p = (v: any) => { if (!v||String(v).toLowerCase().includes("demand")) return null; const x=parseInt(String(v).replace(/[€\s]/g,"")); return isNaN(x)?null:x; };
      for (const row of rows) {
        const fromName   = (row["DEPART"] ?? row["From"] ?? "").toString().trim();
        const toName     = (row["ARRIVAL"] ?? row["To"] ?? "").toString().trim();
        const vehicleName= (row["VEHICLE"] ?? row["Vehicle"] ?? "").toString().trim();
        const priceVal   = p(row["PRICE"] ?? row["Price"]);
        if (!fromName||!toName||!vehicleName) continue;

        const fromLoc  = locations.find(l => l.name.toLowerCase()===fromName.toLowerCase());
        const toLoc    = locations.find(l => l.name.toLowerCase()===toName.toLowerCase());
        const veh      = vehicles.find(v => v.name.toLowerCase().includes(vehicleName.toLowerCase()) || vehicleName.toLowerCase().includes(v.id));
        if (!fromLoc||!toLoc||!veh) { console.warn(`Skipping: "${fromName}" → "${toName}" (${vehicleName}) not found`); continue; }

        try {
          const saved = await api("/api/rates","POST",{ id:uid(), fromLocId:fromLoc.id, toLocId:toLoc.id, vehicleId:veh.id, price:priceVal, onDemand:priceVal===null, active:true });
          setRates(rs => { const ex=rs.find(r=>r.fromLocId===fromLoc.id&&r.toLocId===toLoc.id&&r.vehicleId===veh.id); return ex?rs.map(r=>r.fromLocId===fromLoc.id&&r.toLocId===toLoc.id&&r.vehicleId===veh.id?saved:r):[...rs,saved]; });
          n++;
        } catch {}
      }
      showToast(`Imported ${n} rates`);
    } catch { showToast("Import failed","error"); }
    if (fileRef.current) fileRef.current.value="";
  };

  // Group rates by route for display
  const uniqueFroms = ["All",...Array.from(new Set(rates.map(r=>r.fromLocName))).sort()];
  const uniqueVehs  = ["All",...Array.from(new Set(rates.map(r=>r.vehicleName))).sort()];

  const shown = rates.filter(r => {
    if (filterFrom!=="All" && r.fromLocName!==filterFrom) return false;
    if (filterVeh!=="All"  && r.vehicleName!==filterVeh)  return false;
    if (search && !`${r.fromLocName} ${r.toLocName} ${r.vehicleName}`.toLowerCase().includes(search.toLowerCase())) return false;
    return true;
  });

  // Vehicle color badges
  const vehColor: Record<string, { bg:string; c:string }> = {
    sedan:   { bg:"#dbeafe", c:"#2563eb" },
    van:     { bg:"#dcfce7", c:"#16a34a" },
    suv:     { bg:"#fef3c7", c:"#d97706" },
    minibus: { bg:"#ede9fe", c:"#7c3aed" },
  };
  const vBadge = (vehicleId: string, name: string) => {
    const s = vehColor[vehicleId] ?? { bg:"#f3f4f6", c:"#6b7280" };
    return <span style={{ background:s.bg, color:s.c, fontSize:11, fontWeight:700, padding:"2px 8px", borderRadius:999 }}>{name}</span>;
  };

  return (
    <div>
      {/* Toolbar */}
      <div style={{ display:"flex", gap:8, flexWrap:"wrap", marginBottom:14, alignItems:"center" }}>
        <input value={search} onChange={e=>setSearch(e.target.value)} placeholder="Search routes…"
          style={{...IS, width:180, padding:"8px 11px"}}/>
        <select value={filterFrom} onChange={e=>setFilterFrom(e.target.value)}
          style={{...IS, width:170, padding:"8px 11px", cursor:"pointer"}}>
          {uniqueFroms.map(f=><option key={f}>{f}</option>)}
        </select>
        <select value={filterVeh} onChange={e=>setFilterVeh(e.target.value)}
          style={{...IS, width:160, padding:"8px 11px", cursor:"pointer"}}>
          {uniqueVehs.map(v=><option key={v}>{v}</option>)}
        </select>

        <div style={{ marginLeft:"auto", display:"flex", gap:8 }}>
          {/* Excel import */}
          <label style={{ display:"inline-flex", alignItems:"center", gap:5, padding:"7px 13px", borderRadius:7, fontSize:12, fontWeight:600, cursor:"pointer", background:"#dbeafe", color:"#2563eb", border:"none" }}>
            ↑ Import Excel
            <input ref={fileRef} type="file" accept=".xlsx,.xls,.csv" onChange={handleImport} style={{ display:"none" }}/>
          </label>
          {/* Add single rate */}
          <button onClick={openBulk}
            style={{ display:"inline-flex", alignItems:"center", gap:5, padding:"7px 13px", borderRadius:7, fontSize:12, fontWeight:600, cursor:"pointer", background:"#f0fdf4", color:"#16a34a", border:"1px solid #bbf7d0" }}>
            ⚡ Add Route (All Vehicles)
          </button>
          <button onClick={openAdd}
            style={{ display:"inline-flex", alignItems:"center", gap:5, padding:"7px 13px", borderRadius:7, fontSize:12, fontWeight:600, cursor:"pointer", background:"#c9a347", color:"#0a0f1a", border:"none" }}>
            + Add Single Rate
          </button>
        </div>
      </div>

      {/* Stats */}
      <div style={{ display:"flex", gap:10, marginBottom:14, flexWrap:"wrap" }}>
        {[
          { l:"Total Rates",  v:rates.length,                         c:"#111827" },
          { l:"Active",       v:rates.filter(r=>r.active).length,     c:"#16a34a" },
          { l:"On Demand",    v:rates.filter(r=>r.onDemand).length,   c:"#d97706" },
          { l:"Routes",       v:new Set(rates.map(r=>`${r.fromLocId}-${r.toLocId}`)).size, c:"#2563eb" },
        ].map(s=>(
          <div key={s.l} style={{ background:"#fff", border:"1px solid #f0f0f0", borderRadius:10, padding:"10px 16px", minWidth:100 }}>
            <div style={{ fontSize:22, fontWeight:800, color:s.c }}>{s.v}</div>
            <div style={{ fontSize:11, color:"#9ca3af", marginTop:1 }}>{s.l}</div>
          </div>
        ))}
      </div>

      {/* Import format hint */}
      <div style={{ background:"#fffbeb", border:"1px solid #fde68a", borderRadius:9, padding:"10px 14px", fontSize:12, color:"#92400e", marginBottom:14 }}>
        📋 Excel import expects columns: <strong>DEPART, ARRIVAL, VEHICLE, PRICE</strong> — one row per route+vehicle combination. VEHICLE should match vehicle name or ID (sedan, van, suv, minibus).
      </div>

      {/* Table */}
      <div style={{ background:"#fff", border:"1px solid #f0f0f0", borderRadius:14, overflow:"hidden" }}>
        <div style={{ overflowX:"auto" }}>
          <table style={{ width:"100%", borderCollapse:"collapse", fontSize:13 }}>
            <thead>
              <tr style={{ background:"#f8f9fb" }}>
                <th style={{ padding:"9px 12px", textAlign:"left", fontSize:11, fontWeight:700, letterSpacing:".07em", textTransform:"uppercase" as const, color:"#9ca3af", borderBottom:"1px solid #f0f0f0" }}>From</th>
                <th style={{ padding:"9px 12px", textAlign:"left", fontSize:11, fontWeight:700, letterSpacing:".07em", textTransform:"uppercase" as const, color:"#9ca3af", borderBottom:"1px solid #f0f0f0" }}>To</th>
                <th style={{ padding:"9px 12px", textAlign:"left", fontSize:11, fontWeight:700, letterSpacing:".07em", textTransform:"uppercase" as const, color:"#9ca3af", borderBottom:"1px solid #f0f0f0" }}>Vehicle</th>
                <th style={{ padding:"9px 12px", textAlign:"center", fontSize:11, fontWeight:700, letterSpacing:".07em", textTransform:"uppercase" as const, color:"#9ca3af", borderBottom:"1px solid #f0f0f0" }}>Price</th>
                <th style={{ padding:"9px 12px", textAlign:"center", fontSize:11, fontWeight:700, letterSpacing:".07em", textTransform:"uppercase" as const, color:"#9ca3af", borderBottom:"1px solid #f0f0f0" }}>Active</th>
                <th style={{ padding:"9px 12px", textAlign:"left", fontSize:11, fontWeight:700, letterSpacing:".07em", textTransform:"uppercase" as const, color:"#9ca3af", borderBottom:"1px solid #f0f0f0" }}>Actions</th>
              </tr>
            </thead>
            <tbody>
              {shown.length===0 && <tr><td colSpan={6} style={{ padding:28, textAlign:"center", color:"#9ca3af" }}>No rates found</td></tr>}
              {shown.map(r => (
                <tr key={r.id} style={{ borderBottom:"1px solid #f8f9fb", opacity:r.active?1:0.5 }}>
                  <td style={{ padding:"11px 12px" }}>
                    <span style={{ background:"#f3f4f6", padding:"2px 8px", borderRadius:6, fontSize:11, fontWeight:700 }}>{r.fromLocName}</span>
                  </td>
                  <td style={{ padding:"11px 12px", fontSize:13 }}>{r.toLocName}</td>
                  <td style={{ padding:"11px 12px" }}>{vBadge(r.vehicleId, r.vehicleName)}</td>
                  <td style={{ padding:"11px 12px", textAlign:"center" }}>
                    {r.onDemand
                      ? <span style={{ fontSize:11, color:"#9ca3af", fontStyle:"italic" }}>On demand</span>
                      : r.price===null
                        ? <span style={{ color:"#d1d5db" }}>—</span>
                        : <span style={{ fontWeight:700, fontSize:15 }}>€{r.price}</span>
                    }
                  </td>
                  <td style={{ padding:"11px 12px", textAlign:"center" }}>
                    <Toggle on={r.active} onChange={()=>tog(r)}/>
                  </td>
                  <td style={{ padding:"11px 12px" }}>
                    <div style={{ display:"flex", gap:4 }}>
                      <button onClick={()=>openEdit(r)} style={{ padding:"4px 9px", borderRadius:6, fontSize:11, fontWeight:600, cursor:"pointer", background:"#f3f4f6", color:"#374151", border:"none" }}>Edit</button>
                      <button onClick={()=>del(r.id)}   style={{ padding:"4px 9px", borderRadius:6, fontSize:11, fontWeight:600, cursor:"pointer", background:"#fee2e2", color:"#dc2626", border:"none" }}>Del</button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* ── BULK ADD MODAL (route × all vehicles) ── */}
      {modal==="bulk" && (
        <div style={{ position:"fixed", inset:0, zIndex:9999, display:"flex", alignItems:"center", justifyContent:"center", padding:16 }}>
          <div style={{ position:"absolute", inset:0, background:"rgba(0,0,0,.55)", backdropFilter:"blur(4px)" }} onClick={()=>setModal(null)}/>
          <div style={{ position:"relative", background:"#fff", borderRadius:16, width:"100%", maxWidth:560, maxHeight:"92vh", overflow:"auto", boxShadow:"0 24px 80px rgba(0,0,0,.2)" }}>
            <div style={{ display:"flex", alignItems:"center", justifyContent:"space-between", padding:"18px 24px", borderBottom:"1px solid #f0f0f0", position:"sticky", top:0, background:"#fff", zIndex:1 }}>
              <h3 style={{ fontSize:16, fontWeight:700, color:"#111827", margin:0 }}>Add Route — All Vehicles</h3>
              <button onClick={()=>setModal(null)} style={{ background:"none", border:"none", fontSize:22, cursor:"pointer", color:"#9ca3af" }}>×</button>
            </div>
            <div style={{ padding:24 }}>
              {/* Route */}
              <div style={{ display:"grid", gridTemplateColumns:"1fr 1fr", gap:12, marginBottom:14 }}>
                <div>
                  <label style={LS}>Departure *</label>
                  <select style={IS} value={bulkForm.fromLocId} onChange={e=>setBulkForm(f=>({...f,fromLocId:e.target.value}))}>
                    <option value="">— Select —</option>
                    {locations.filter(l=>l.active).map(l=><option key={l.id} value={l.id}>{l.categoryIcon} {l.name}</option>)}
                  </select>
                </div>
                <div>
                  <label style={LS}>Destination *</label>
                  <select style={IS} value={bulkForm.toLocId} onChange={e=>setBulkForm(f=>({...f,toLocId:e.target.value}))}>
                    <option value="">— Select —</option>
                    {locations.filter(l=>l.active).map(l=><option key={l.id} value={l.id} disabled={l.id===bulkForm.fromLocId}>{l.categoryIcon} {l.name}</option>)}
                  </select>
                </div>
              </div>

              {/* On Demand toggle */}
              <label style={{ display:"flex", alignItems:"center", gap:10, marginBottom:16, cursor:"pointer" }}>
                <Toggle on={bulkForm.onDemand} onChange={()=>setBulkForm(f=>({...f,onDemand:!f.onDemand}))}/>
                <span style={{ fontSize:13, fontWeight:600, color:bulkForm.onDemand?"#d97706":"#374151" }}>On Demand — contact us for price</span>
              </label>

              {/* Price per vehicle */}
              {!bulkForm.onDemand && (
                <>
                  <div style={{ fontSize:11, fontWeight:700, letterSpacing:".08em", textTransform:"uppercase" as const, color:"#9ca3af", marginBottom:10 }}>
                    Price per vehicle (€) — leave blank to skip that vehicle
                  </div>
                  <div style={{ display:"grid", gridTemplateColumns:"1fr 1fr", gap:12, marginBottom:14 }}>
                    {[
                      { key:"sedan_price",   label:"Business Class Car",  color:"#2563eb" },
                      { key:"van_price",     label:"Business Class Van",  color:"#16a34a" },
                      { key:"suv_price",     label:"Luxury SUV",          color:"#d97706" },
                      { key:"minibus_price", label:"Minibus",             color:"#7c3aed" },
                    ].map(v=>(
                      <div key={v.key}>
                        <label style={{ ...LS, color:v.color }}>{v.label}</label>
                        <input
                          style={{ ...IS, textAlign:"center" as const }}
                          type="number" min={0} placeholder="€"
                          value={(bulkForm as any)[v.key]}
                          onChange={e=>setBulkForm(f=>({...f,[v.key]:e.target.value}))}
                        />
                      </div>
                    ))}
                  </div>
                </>
              )}

              {/* Active */}
              <label style={{ display:"flex", alignItems:"center", gap:10, marginBottom:20, cursor:"pointer" }}>
                <Toggle on={bulkForm.active} onChange={()=>setBulkForm(f=>({...f,active:!f.active}))}/>
                <span style={{ fontSize:13, fontWeight:500 }}>Active (visible on rates page)</span>
              </label>

              <div style={{ display:"flex", gap:8 }}>
                <button onClick={()=>setModal(null)} style={{ flex:1, padding:"12px", borderRadius:9, fontSize:13, fontWeight:600, cursor:"pointer", background:"#f3f4f6", color:"#374151", border:"none" }}>Cancel</button>
                <button onClick={saveBulk} style={{ flex:2, padding:"12px", borderRadius:9, fontSize:13, fontWeight:700, cursor:"pointer", background:"#111827", color:"#fff", border:"none" }}>Add Rates for All Vehicles</button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* ── SINGLE ADD / EDIT MODAL ── */}
      {(modal==="add"||modal==="edit") && (
        <div style={{ position:"fixed", inset:0, zIndex:9999, display:"flex", alignItems:"center", justifyContent:"center", padding:16 }}>
          <div style={{ position:"absolute", inset:0, background:"rgba(0,0,0,.55)", backdropFilter:"blur(4px)" }} onClick={()=>setModal(null)}/>
          <div style={{ position:"relative", background:"#fff", borderRadius:16, width:"100%", maxWidth:500, maxHeight:"92vh", overflow:"auto", boxShadow:"0 24px 80px rgba(0,0,0,.2)" }}>
            <div style={{ display:"flex", alignItems:"center", justifyContent:"space-between", padding:"18px 24px", borderBottom:"1px solid #f0f0f0", position:"sticky", top:0, background:"#fff", zIndex:1 }}>
              <h3 style={{ fontSize:16, fontWeight:700, color:"#111827", margin:0 }}>{modal==="add"?"Add Single Rate":`Edit — ${edit?.fromLocName} → ${edit?.toLocName}`}</h3>
              <button onClick={()=>setModal(null)} style={{ background:"none", border:"none", fontSize:22, cursor:"pointer", color:"#9ca3af" }}>×</button>
            </div>
            <div style={{ padding:24 }}>
              <div style={{ display:"grid", gridTemplateColumns:"1fr 1fr", gap:12, marginBottom:14 }}>
                <div>
                  <label style={LS}>Departure *</label>
                  <select style={IS} value={form.fromLocId} onChange={e=>f("fromLocId",e.target.value)}>
                    <option value="">— Select —</option>
                    {locations.filter(l=>l.active).map(l=><option key={l.id} value={l.id}>{l.categoryIcon} {l.name}</option>)}
                  </select>
                </div>
                <div>
                  <label style={LS}>Destination *</label>
                  <select style={IS} value={form.toLocId} onChange={e=>f("toLocId",e.target.value)}>
                    <option value="">— Select —</option>
                    {locations.filter(l=>l.active).map(l=><option key={l.id} value={l.id} disabled={l.id===form.fromLocId}>{l.categoryIcon} {l.name}</option>)}
                  </select>
                </div>
              </div>

              <div style={{ marginBottom:14 }}>
                <label style={LS}>Vehicle *</label>
                <select style={IS} value={form.vehicleId} onChange={e=>f("vehicleId",e.target.value)}>
                  <option value="">— Select vehicle —</option>
                  {vehicles.filter(v=>v.active).map(v=><option key={v.id} value={v.id}>{v.name}{v.tag?` — ${v.tag}`:""}</option>)}
                </select>
              </div>

              <label style={{ display:"flex", alignItems:"center", gap:10, marginBottom:14, cursor:"pointer" }}>
                <Toggle on={form.onDemand} onChange={()=>f("onDemand",!form.onDemand)}/>
                <span style={{ fontSize:13, fontWeight:600, color:form.onDemand?"#d97706":"#374151" }}>On Demand</span>
              </label>

              {!form.onDemand && (
                <div style={{ marginBottom:14 }}>
                  <label style={LS}>Price (€) *</label>
                  <input style={{ ...IS, textAlign:"center" as const }} type="number" min={0} placeholder="e.g. 80"
                    value={form.price ?? ""}
                    onChange={e=>f("price",e.target.value===""?null:+e.target.value)}/>
                </div>
              )}

              <label style={{ display:"flex", alignItems:"center", gap:10, marginBottom:20, cursor:"pointer" }}>
                <Toggle on={form.active} onChange={()=>f("active",!form.active)}/>
                <span style={{ fontSize:13, fontWeight:500 }}>Active</span>
              </label>

              <div style={{ display:"flex", gap:8 }}>
                <button onClick={()=>setModal(null)} style={{ flex:1, padding:"12px", borderRadius:9, fontSize:13, fontWeight:600, cursor:"pointer", background:"#f3f4f6", color:"#374151", border:"none" }}>Cancel</button>
                <button onClick={save} style={{ flex:2, padding:"12px", borderRadius:9, fontSize:13, fontWeight:700, cursor:"pointer", background:"#111827", color:"#fff", border:"none" }}>{modal==="add"?"Add Rate":"Save Changes"}</button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}