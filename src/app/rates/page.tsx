"use client";

import { useState, useEffect, useMemo } from "react";

interface Rate {
  id: string;
  fromLocId: string; toLocId: string; vehicleId: string;
  fromLocName: string; toLocName: string; vehicleName: string;
  p1: number|null; p2: number|null; p3: number|null; p4: number|null;
  p5: number|null; p6: number|null; p7: number|null; p8: number|null;
  onDemand: boolean; active: boolean;
}
interface Vehicle {
  id: string; name: string; model: string;
  maxPassengers: number; img: string; tag: string;
  active: boolean; sortOrder: number;
}

const PAX_COLS = [
  { key:"p1", label:"1 Pax" },
  { key:"p2", label:"2 Pax" },
  { key:"p3", label:"3 Pax" },
  { key:"p4", label:"4 Pax" },
  { key:"p5", label:"5 Pax" },
  { key:"p6", label:"6 Pax" },
  { key:"p7", label:"7 Pax" },
  { key:"p8", label:"8 Pax" },
] as const;

// ── Per-route, per-vehicle entry ──────────────────────────────
interface RouteVehicle {
  fromLocId: string; toLocId: string;
  fromLocName: string; toLocName: string;
  vehicleId: string; vehicleName: string; vehicleImg: string; vehicleTag: string;
  p1:number|null; p2:number|null; p3:number|null; p4:number|null;
  p5:number|null; p6:number|null; p7:number|null; p8:number|null;
  p9plus: number|null; // auto = p8 * 2
  onDemand: boolean;
}

export default function RatesPage() {
  const [rates,    setRates]    = useState<Rate[]>([]);
  const [vehicles, setVehicles] = useState<Vehicle[]>([]);
  const [loading,  setLoading]  = useState(true);
  const [error,    setError]    = useState(false);

  const [fromSearch, setFromSearch] = useState("");
  const [toSearch,   setToSearch]   = useState("");
  const [vehFilter,  setVehFilter]  = useState("all");
  const [paxView,    setPaxView]    = useState<"all"|string>("all");
  const [expandedRoute, setExpandedRoute] = useState<string|null>(null);

  useEffect(() => {
    (async () => {
      try {
        const [rr, vr] = await Promise.all([fetch("/api/rates"), fetch("/api/vehicles")]);
        if (rr.ok) { const d: Rate[] = await rr.json(); setRates(d.filter(r => r.active)); }
        if (vr.ok) { const d: Vehicle[] = await vr.json(); setVehicles(d.filter(v => v.active).sort((a,b) => a.sortOrder - b.sortOrder)); }
      } catch { setError(true); }
      finally { setLoading(false); }
    })();
  }, []);

  // ── Flat list: one row per route+vehicle ──────────────────────
  const rows = useMemo<RouteVehicle[]>(() => {
    const vMap = new Map(vehicles.map(v => [v.id, v]));
    return rates.map(r => {
      const v = vMap.get(r.vehicleId);
      return {
        fromLocId: r.fromLocId, toLocId: r.toLocId,
        fromLocName: r.fromLocName, toLocName: r.toLocName,
        vehicleId: r.vehicleId,
        vehicleName: v?.name ?? r.vehicleName,
        vehicleImg:  v?.img  ?? "/images/car.png",
        vehicleTag:  v?.tag  ?? "",
        p1:r.p1, p2:r.p2, p3:r.p3, p4:r.p4,
        p5:r.p5, p6:r.p6, p7:r.p7, p8:r.p8,
        p9plus: r.p8 ? r.p8 * 2 : null,
        onDemand: r.onDemand,
      };
    });
  }, [rates, vehicles]);

  // ── Group by route for the route-card view ────────────────────
  const routeGroups = useMemo(() => {
    const map = new Map<string, RouteVehicle[]>();
    rows.forEach(r => {
      const k = `${r.fromLocId}__${r.toLocId}`;
      if (!map.has(k)) map.set(k, []);
      map.get(k)!.push(r);
    });
    return Array.from(map.entries()).map(([key, items]) => ({
      key,
      fromLocId:   items[0].fromLocId,
      toLocId:     items[0].toLocId,
      fromLocName: items[0].fromLocName,
      toLocName:   items[0].toLocName,
      items,
    }));
  }, [rows]);

  // ── Dropdowns ─────────────────────────────────────────────────
  const fromOptions = useMemo(() =>
    Array.from(new Map(routeGroups.map(r => [r.fromLocId, r.fromLocName])).entries()).sort((a,b)=>a[1].localeCompare(b[1])),
    [routeGroups]);
  const toOptions = useMemo(() =>
    Array.from(new Map(routeGroups.map(r => [r.toLocId, r.toLocName])).entries()).sort((a,b)=>a[1].localeCompare(b[1])),
    [routeGroups]);

  // ── Filter ────────────────────────────────────────────────────
  const filteredGroups = useMemo(() =>
    routeGroups
      .filter(g => {
        if (fromSearch && g.fromLocId !== fromSearch) return false;
        if (toSearch   && g.toLocId   !== toSearch)   return false;
        return true;
      })
      .map(g => ({
        ...g,
        items: g.items.filter(r => vehFilter === "all" || r.vehicleId === vehFilter),
      }))
      .filter(g => g.items.length > 0),
    [routeGroups, fromSearch, toSearch, vehFilter]);

  // ── Visible pax columns ───────────────────────────────────────
  const visiblePax = paxView === "all" ? PAX_COLS : PAX_COLS.filter(c => c.key === paxView);
  const showNinePlus = paxView === "all" || paxView === "p8"; // show 9+ when all or 8-pax selected

  const fmt = (v: number|null) => v !== null ? `€${v}` : "—";

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,300;0,400;0,500;0,600;1,300;1,400;1,500&family=Montserrat:wght@300;400;500;600;700&display=swap');
        .rp-root {
          --rp-navy:#0a1f44; --rp-navy-deep:#071533; --rp-gold:#c9a347;
          --rp-gold-light:#e8c97a; --rp-ivory:#f5f0e8;
          --rp-ivory-dim:rgba(245,240,232,0.68); --rp-ivory-faint:rgba(245,240,232,0.35);
        }
        .rp-root * { box-sizing:border-box; }
        .rp-body { background:#080808; padding:64px 5vw 80px; min-height:70vh; }
        .rp-body-inner { max-width:1280px; margin:0 auto; }

        .rp-panel {
          background:rgba(255,255,255,.03); border:1px solid rgba(201,163,71,.15);
          border-radius:16px; padding:28px 32px; margin-bottom:28px; position:relative; overflow:hidden;
        }
        .rp-panel::before { content:''; position:absolute; top:0; left:0; right:0; height:2px;
          background:linear-gradient(90deg,transparent,var(--rp-gold) 50%,transparent); opacity:.4; }
        .rp-panel-title { font-family:'Cormorant Garamond',serif; font-size:1.35rem; font-weight:500; color:var(--rp-ivory); margin-bottom:18px; }

        .rp-grid3 { display:grid; grid-template-columns:1fr 1fr 1fr auto; gap:12px; align-items:end; }
        @media(max-width:900px){ .rp-grid3 { grid-template-columns:1fr 1fr; } }
        @media(max-width:580px){ .rp-grid3 { grid-template-columns:1fr; } }

        .rp-label { font-family:'Montserrat',sans-serif; font-size:9px; font-weight:700;
          letter-spacing:.2em; text-transform:uppercase; color:rgba(245,240,232,.3); display:block; margin-bottom:5px; }
        .rp-select {
          width:100%; background:rgba(255,255,255,.05); border:1px solid rgba(245,240,232,.1);
          border-radius:9px; padding:10px 32px 10px 13px; font-family:'Montserrat',sans-serif;
          font-size:12.5px; color:var(--rp-ivory); outline:none; cursor:pointer;
          appearance:none; -webkit-appearance:none;
          background-image:url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='12' height='12' viewBox='0 0 24 24' fill='none' stroke='rgba(245,240,232,0.3)' stroke-width='2'%3E%3Cpath d='M6 9l6 6 6-6'/%3E%3C/svg%3E");
          background-repeat:no-repeat; background-position:right 11px center; transition:border-color .2s;
        }
        .rp-select option { background:#0a1f44; color:#f5f0e8; }
        .rp-select:focus { border-color:rgba(201,163,71,.45); }

        .rp-clear { padding:10px 16px; border-radius:9px; background:transparent;
          border:1px solid rgba(245,240,232,.1); font-family:'Montserrat',sans-serif;
          font-size:10px; font-weight:700; letter-spacing:.12em; text-transform:uppercase;
          color:rgba(245,240,232,.35); cursor:pointer; white-space:nowrap; transition:all .2s; }
        .rp-clear:hover { border-color:rgba(201,163,71,.3); color:var(--rp-gold); }

        /* Pax pills */
        .rp-pax-pills { display:flex; flex-wrap:wrap; gap:7px; margin-top:14px; }
        .rp-pax-pill { padding:5px 13px; border-radius:999px; font-family:'Montserrat',sans-serif;
          font-size:10px; font-weight:600; letter-spacing:.07em; cursor:pointer;
          border:1px solid rgba(245,240,232,.1); color:rgba(245,240,232,.4); background:transparent; transition:all .2s; }
        .rp-pax-pill:hover { border-color:rgba(201,163,71,.3); color:var(--rp-gold); }
        .rp-pax-pill.on { background:rgba(201,163,71,.12); border-color:rgba(201,163,71,.35); color:var(--rp-gold); }
        .rp-pax-pill.nine { border-color:rgba(245,158,11,.3); color:#f59e0b; }
        .rp-pax-pill.nine.on { background:rgba(245,158,11,.12); }

        /* Vehicle pills */
        .rp-veh-pills { display:flex; flex-wrap:wrap; gap:7px; }
        .rp-veh-pill { padding:5px 13px; border-radius:999px; font-family:'Montserrat',sans-serif;
          font-size:10px; font-weight:600; letter-spacing:.07em; cursor:pointer;
          border:1px solid rgba(245,240,232,.1); color:rgba(245,240,232,.4); background:transparent; transition:all .2s; }
        .rp-veh-pill:hover { border-color:rgba(201,163,71,.3); color:var(--rp-gold); }
        .rp-veh-pill.on { background:rgba(201,163,71,.12); border-color:rgba(201,163,71,.35); color:var(--rp-gold); }

        /* Meta */
        .rp-meta { display:flex; align-items:center; justify-content:space-between; flex-wrap:wrap; gap:10px; margin-bottom:16px; }
        .rp-count { font-family:'Montserrat',sans-serif; font-size:11px; color:rgba(245,240,232,.3); }
        .rp-count strong { color:var(--rp-gold); font-weight:700; }

        /* Route cards */
        .rp-route-card { border:1px solid rgba(245,240,232,.06); border-radius:14px; overflow:hidden; margin-bottom:12px; transition:border-color .2s; }
        .rp-route-card:hover { border-color:rgba(201,163,71,.2); }

        /* Route header */
        .rp-route-hdr { display:flex; align-items:center; justify-content:space-between; padding:14px 20px;
          background:rgba(255,255,255,.025); cursor:pointer; gap:12px; }
        .rp-route-hdr:hover { background:rgba(255,255,255,.04); }
        .rp-from-badge { display:inline-flex; align-items:center; padding:3px 10px; border-radius:5px;
          background:rgba(201,163,71,.1); border:1px solid rgba(201,163,71,.2);
          font-family:'Montserrat',sans-serif; font-size:10px; font-weight:700;
          letter-spacing:.1em; text-transform:uppercase; color:var(--rp-gold); white-space:nowrap; }
        .rp-to-name { font-family:'Montserrat',sans-serif; font-size:13px; font-weight:600; color:var(--rp-ivory); }
        .rp-route-arrow { color:rgba(245,240,232,.2); font-size:18px; flex-shrink:0; }
        .rp-veh-count { font-family:'Montserrat',sans-serif; font-size:10px; color:rgba(245,240,232,.3); white-space:nowrap; }
        .rp-chevron { color:rgba(245,240,232,.3); font-size:14px; flex-shrink:0; transition:transform .2s; }
        .rp-chevron.open { transform:rotate(180deg); }

        /* Vehicle rows inside card */
        .rp-veh-rows { border-top:1px solid rgba(245,240,232,.05); }
        .rp-veh-row { display:flex; align-items:stretch; border-bottom:1px solid rgba(245,240,232,.04); }
        .rp-veh-row:last-child { border-bottom:none; }
        .rp-veh-info { display:flex; align-items:center; gap:12px; padding:12px 20px; min-width:220px; flex-shrink:0; border-right:1px solid rgba(245,240,232,.04); }
        .rp-veh-img-sm { width:56px; height:38px; border-radius:6px; object-fit:cover; background:rgba(255,255,255,.05); flex-shrink:0; }
        .rp-veh-name { font-family:'Montserrat',sans-serif; font-size:11px; font-weight:700; text-transform:uppercase; letter-spacing:.06em; color:var(--rp-ivory); }
        .rp-veh-tag { font-family:'Montserrat',sans-serif; font-size:9px; font-weight:600; color:var(--rp-gold); margin-top:2px; }

        /* Price grid */
        .rp-price-grid { display:flex; flex:1; overflow-x:auto; }
        .rp-price-col { display:flex; flex-direction:column; align-items:center; justify-content:center;
          min-width:72px; padding:10px 8px; border-right:1px solid rgba(245,240,232,.04); flex:1; }
        .rp-price-col:last-child { border-right:none; }
        .rp-price-col.nine-col { background:rgba(245,158,11,.04); }
        .rp-pax-lbl { font-family:'Montserrat',sans-serif; font-size:8px; font-weight:700;
          letter-spacing:.12em; text-transform:uppercase; color:rgba(245,240,232,.25); margin-bottom:5px; white-space:nowrap; }
        .rp-pax-lbl.nine-lbl { color:rgba(245,158,11,.5); }
        .rp-price-num { font-family:'Montserrat',sans-serif; font-size:14px; font-weight:700; color:var(--rp-ivory); }
        .rp-price-num.nine-price { color:#f59e0b; }
        .rp-price-eur { font-size:9px; font-weight:500; color:var(--rp-gold); margin-left:1px; }
        .rp-price-dash { color:rgba(245,240,232,.12); font-size:13px; }
        .rp-on-demand { font-family:'Montserrat',sans-serif; font-size:9px; font-style:italic; color:rgba(245,240,232,.3); }
        .rp-auto-badge { font-size:8px; color:rgba(245,158,11,.6); margin-top:2px; font-family:'Montserrat',sans-serif; }

        /* State boxes */
        .rp-state { padding:80px 20px; text-align:center; font-family:'Cormorant Garamond',serif;
          font-size:1.4rem; color:rgba(245,240,232,.3); }
        .rp-dots span { display:inline-block; width:6px; height:6px; border-radius:50%;
          background:var(--rp-gold); margin:0 3px; opacity:.3; animation:bounce .8s ease-in-out infinite; }
        .rp-dots span:nth-child(2){animation-delay:.15s} .rp-dots span:nth-child(3){animation-delay:.3s}
        @keyframes bounce{0%,80%,100%{transform:translateY(0);opacity:.3}40%{transform:translateY(-8px);opacity:1}}

        /* Info chips */
        .rp-chips { display:flex; flex-wrap:wrap; gap:10px; margin-top:28px; }
        .rp-chip { display:flex; align-items:center; gap:8px; padding:9px 14px; border-radius:8px;
          background:rgba(255,255,255,.03); border:1px solid rgba(245,240,232,.07);
          font-family:'Montserrat',sans-serif; font-size:11px; color:rgba(245,240,232,.38); font-weight:500; }
        .rp-chip svg { width:13px; height:13px; color:var(--rp-gold); flex-shrink:0; }

        /* CTA */
        .rp-cta { background:var(--rp-navy-deep); border-top:1px solid rgba(201,163,71,.12); padding:48px 5vw; }
        .rp-cta-inner { max-width:1280px; margin:0 auto; display:flex; align-items:center; justify-content:space-between; flex-wrap:wrap; gap:24px; }
        .rp-cta-text { font-family:'Cormorant Garamond',serif; font-size:clamp(1.4rem,3vw,2rem); font-weight:400; color:var(--rp-ivory); }
        .rp-cta-text em { font-style:italic; color:var(--rp-gold); }
        .rp-btns { display:flex; gap:12px; flex-wrap:wrap; }
        .rp-btn { display:inline-flex; align-items:center; gap:8px; padding:13px 28px; border-radius:6px;
          font-family:'Montserrat',sans-serif; font-size:11px; font-weight:700; letter-spacing:.14em;
          text-transform:uppercase; text-decoration:none; transition:all .25s; cursor:pointer; border:none; }
        .rp-btn-p { background:var(--rp-gold); color:#080808; }
        .rp-btn-p:hover { background:var(--rp-gold-light); transform:translateY(-2px); }
        .rp-btn-g { background:transparent; color:var(--rp-ivory-dim); border:1px solid rgba(245,240,232,.12); }
        .rp-btn-g:hover { border-color:rgba(201,163,71,.3); color:var(--rp-gold); background:rgba(201,163,71,.06); }

        @keyframes fadeup{from{opacity:0;transform:translateY(20px)}to{opacity:1;transform:translateY(0)}}
        .rp-anim { animation:fadeup .55s .1s both; }

        @media(max-width:640px){ .rp-veh-info{min-width:160px} .rp-price-col{min-width:58px;padding:8px 5px} }
      `}</style>

      <div className="rp-root">
        <div className="rp-body">
          <div className="rp-body-inner rp-anim">

            {/* ── Filter panel ── */}
            <div className="rp-panel">
              <div className="rp-panel-title">Find Your Rate</div>

              {/* Row 1: route + vehicle filters */}
              <div className="rp-grid3">
                <div>
                  <label className="rp-label">Departure</label>
                  <select className="rp-select" value={fromSearch} onChange={e=>setFromSearch(e.target.value)}>
                    <option value="">All departure points</option>
                    {fromOptions.map(([id,name]) => <option key={id} value={id}>{name}</option>)}
                  </select>
                </div>
                <div>
                  <label className="rp-label">Destination</label>
                  <select className="rp-select" value={toSearch} onChange={e=>setToSearch(e.target.value)}>
                    <option value="">All destinations</option>
                    {toOptions.map(([id,name]) => <option key={id} value={id}>{name}</option>)}
                  </select>
                </div>
                <div>
                  <label className="rp-label">Vehicle Class</label>
                  <select className="rp-select" value={vehFilter} onChange={e=>setVehFilter(e.target.value)}>
                    <option value="all">All vehicles</option>
                    {vehicles.map(v => <option key={v.id} value={v.id}>{v.name}</option>)}
                  </select>
                </div>
                {(fromSearch||toSearch||vehFilter!=="all") && (
                  <button className="rp-clear" onClick={()=>{setFromSearch("");setToSearch("");setVehFilter("all");}}>Clear</button>
                )}
              </div>

              {/* Row 2: pax filter pills */}
              <div className="rp-pax-pills">
                <label className="rp-label" style={{alignSelf:"center",marginBottom:0,marginRight:4}}>Passengers:</label>
                <button className={`rp-pax-pill${paxView==="all"?" on":""}`} onClick={()=>setPaxView("all")}>All</button>
                {PAX_COLS.map(c => (
                  <button key={c.key} className={`rp-pax-pill${paxView===c.key?" on":""}`} onClick={()=>setPaxView(c.key)}>
                    {c.label}
                  </button>
                ))}
                <button className={`rp-pax-pill nine${paxView==="p9"?" on":""}`} onClick={()=>setPaxView("p9")}>
                  9+ ×2
                </button>
              </div>

              {/* Row 3: vehicle pills */}
              <div className="rp-veh-pills" style={{marginTop:10}}>
                <button className={`rp-veh-pill${vehFilter==="all"?" on":""}`} onClick={()=>setVehFilter("all")}>All</button>
                {vehicles.map(v => (
                  <button key={v.id} className={`rp-veh-pill${vehFilter===v.id?" on":""}`} onClick={()=>setVehFilter(v.id)}>
                    {v.name}
                  </button>
                ))}
              </div>
            </div>

            {/* ── Meta ── */}
            <div className="rp-meta">
              <div className="rp-count">
                Showing <strong>{filteredGroups.length}</strong> of {routeGroups.length} routes
                {paxView !== "all" && paxView !== "p9" && (
                  <span style={{marginLeft:8,color:"var(--rp-gold)"}}>· {PAX_COLS.find(c=>c.key===paxView)?.label}</span>
                )}
                {paxView === "p9" && (
                  <span style={{marginLeft:8,color:"#f59e0b"}}>· 9+ pax (doubled)</span>
                )}
              </div>
              {paxView === "p9" && (
                <div style={{fontSize:11,color:"rgba(245,158,11,.7)",fontFamily:"'Montserrat',sans-serif",fontWeight:600}}>
                  ⚡ 9+ pax prices = 8-pax × 2
                </div>
              )}
            </div>

            {/* ── Content ── */}
            {loading ? (
              <div className="rp-state">
                <div className="rp-dots"><span/><span/><span/></div>
                <div style={{marginTop:12}}>Loading rates…</div>
              </div>
            ) : error ? (
              <div className="rp-state">⚠️<br/>Could not load rates. Please refresh.</div>
            ) : filteredGroups.length === 0 ? (
              <div className="rp-state">✦<br/>No routes match your search</div>
            ) : (
              filteredGroups.map(group => {
                const isOpen = expandedRoute === group.key || (fromSearch !== "" || toSearch !== "");
                return (
                  <div key={group.key} className="rp-route-card">
                    {/* Route header */}
                    <div className="rp-route-hdr"
                      onClick={()=>setExpandedRoute(isOpen && expandedRoute===group.key ? null : group.key)}>
                      <div style={{display:"flex",alignItems:"center",gap:12,flex:1,minWidth:0}}>
                        <span className="rp-from-badge">{group.fromLocName.split("(")[0].trim()}</span>
                        <span className="rp-route-arrow">→</span>
                        <span className="rp-to-name">{group.toLocName}</span>
                      </div>
                      <div style={{display:"flex",alignItems:"center",gap:12,flexShrink:0}}>
                        <span className="rp-veh-count">{group.items.length} vehicle{group.items.length!==1?"s":""}</span>
                        <span className={`rp-chevron${isOpen?" open":""}`}>▾</span>
                      </div>
                    </div>

                    {/* Vehicle rows */}
                    {isOpen && (
                      <div className="rp-veh-rows">
                        {/* Column header */}
                        <div className="rp-veh-row" style={{background:"rgba(201,163,71,.04)"}}>
                          <div className="rp-veh-info" style={{justifyContent:"flex-end"}}>
                            <span style={{fontSize:9,fontWeight:700,letterSpacing:".12em",textTransform:"uppercase",color:"rgba(245,240,232,.2)",fontFamily:"'Montserrat',sans-serif"}}>
                              Vehicle
                            </span>
                          </div>
                          <div className="rp-price-grid">
                            {paxView === "p9" ? (
                              <div className="rp-price-col nine-col" style={{flex:"none",minWidth:100}}>
                                <div className="rp-pax-lbl nine-lbl">9+ Pax</div>
                                <div style={{fontSize:9,color:"rgba(245,158,11,.4)",fontFamily:"'Montserrat',sans-serif"}}>8-pax × 2</div>
                              </div>
                            ) : (
                              <>
                                {visiblePax.map(c => (
                                  <div key={c.key} className="rp-price-col">
                                    <div className="rp-pax-lbl">{c.label}</div>
                                  </div>
                                ))}
                                {showNinePlus && paxView === "all" && (
                                  <div className="rp-price-col nine-col">
                                    <div className="rp-pax-lbl nine-lbl">9+ Pax</div>
                                    <div style={{fontSize:8,color:"rgba(245,158,11,.3)",fontFamily:"'Montserrat',sans-serif"}}>auto ×2</div>
                                  </div>
                                )}
                              </>
                            )}
                          </div>
                        </div>

                        {/* One row per vehicle */}
                        {group.items.map(item => (
                          <div key={item.vehicleId} className="rp-veh-row">
                            <div className="rp-veh-info">
                              <img src={item.vehicleImg} alt={item.vehicleName}
                                className="rp-veh-img-sm"
                                onError={e=>{(e.currentTarget as HTMLImageElement).src="/images/car.png";}}/>
                              <div>
                                <div className="rp-veh-name">{item.vehicleName}</div>
                                {item.vehicleTag && <div className="rp-veh-tag">{item.vehicleTag}</div>}
                              </div>
                            </div>
                            <div className="rp-price-grid">
                              {item.onDemand ? (
                                <div className="rp-price-col" style={{flex:1}}>
                                  <span className="rp-on-demand">On demand</span>
                                </div>
                              ) : paxView === "p9" ? (
                                <div className="rp-price-col nine-col" style={{flex:"none",minWidth:100}}>
                                  {item.p9plus !== null ? (
                                    <>
                                      <span className="rp-price-num nine-price">{item.p9plus}<span className="rp-price-eur">€</span></span>
                                      <span className="rp-auto-badge">= €{item.p8} × 2</span>
                                    </>
                                  ) : <span className="rp-price-dash">—</span>}
                                </div>
                              ) : (
                                <>
                                  {visiblePax.map(c => {
                                    const val = item[c.key];
                                    return (
                                      <div key={c.key} className="rp-price-col">
                                        {val !== null
                                          ? <span className="rp-price-num">{val}<span className="rp-price-eur">€</span></span>
                                          : <span className="rp-price-dash">—</span>
                                        }
                                      </div>
                                    );
                                  })}
                                  {showNinePlus && paxView === "all" && (
                                    <div className="rp-price-col nine-col">
                                      {item.p9plus !== null ? (
                                        <>
                                          <span className="rp-price-num nine-price">{item.p9plus}<span className="rp-price-eur">€</span></span>
                                          <span className="rp-auto-badge">×2</span>
                                        </>
                                      ) : <span className="rp-price-dash">—</span>}
                                    </div>
                                  )}
                                </>
                              )}
                            </div>
                          </div>
                        ))}
                      </div>
                    )}
                  </div>
                );
              })
            )}

            {/* ── Info chips ── */}
            {!loading && !error && (
              <div className="rp-chips">
                {[
                  {d:"M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622z",t:"All prices are fixed — no surge, no hidden fees"},
                  {d:"M17 9V7a5 5 0 00-10 0v2m-3 0h16a2 2 0 012 2v9a2 2 0 01-2 2H6a2 2 0 01-2-2v-9a2 2 0 012-2z",t:"Pay on card or cash on arrival"},
                  {d:"M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z",t:"24 / 7 availability"},
                  {d:"M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z",t:"Contact us for on-demand routes"},
                  {d:"M17 21v-2a4 4 0 00-4-4H5a4 4 0 00-4 4v2",t:"Free child seats included"},
                ].map((c,i)=>(
                  <div key={i} className="rp-chip">
                    <svg fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.8}>
                      <path strokeLinecap="round" strokeLinejoin="round" d={c.d}/>
                    </svg>
                    {c.t}
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>

        {/* ── CTA ── */}
        <div className="rp-cta">
          <div className="rp-cta-inner">
            <div className="rp-cta-text">Ready to book your<br/><em>transfer?</em></div>
            <div className="rp-btns">
              <a href="/reservation" className="rp-btn rp-btn-p">Book Now</a>
              <a href="https://wa.me/33652466694" target="_blank" rel="noopener noreferrer" className="rp-btn rp-btn-g">WhatsApp Us</a>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}