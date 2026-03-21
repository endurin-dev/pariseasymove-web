"use client";

import { useState, useEffect, useMemo } from "react";

interface Rate {
  id: string;
  fromLocId: string;
  toLocId: string;
  vehicleId: string;
  fromLocName: string;
  toLocName: string;
  vehicleName: string;
  price: number | null;
  onDemand: boolean;
  active: boolean;
}

interface Vehicle {
  id: string;
  name: string;
  model: string;
  maxPassengers: number;
  img: string;
  tag: string;
  active: boolean;
  sortOrder: number;
}

// ── Group rates by route, vehicles become columns ──────────────
interface RouteGroup {
  fromLocId: string;
  toLocId: string;
  fromLocName: string;
  toLocName: string;
  prices: Record<string, { price: number | null; onDemand: boolean }>;
}

export default function RatesPage() {
  const [rates,    setRates]    = useState<Rate[]>([]);
  const [vehicles, setVehicles] = useState<Vehicle[]>([]);
  const [loading,  setLoading]  = useState(true);
  const [error,    setError]    = useState(false);

  const [fromSearch, setFromSearch] = useState("");
  const [toSearch,   setToSearch]   = useState("");
  const [vehFilter,  setVehFilter]  = useState("all");

  // ── Fetch from DB ─────────────────────────────────────────────
  useEffect(() => {
    (async () => {
      try {
        const [rr, vr] = await Promise.all([
          fetch("/api/rates"),
          fetch("/api/vehicles"),
        ]);
        if (rr.ok) {
          const d: Rate[] = await rr.json();
          setRates(d.filter(r => r.active));
        }
        if (vr.ok) {
          const d: Vehicle[] = await vr.json();
          setVehicles(d.filter(v => v.active).sort((a, b) => a.sortOrder - b.sortOrder));
        }
      } catch {
        setError(true);
      } finally {
        setLoading(false);
      }
    })();
  }, []);

  // ── Group rates by route ──────────────────────────────────────
  const routeGroups = useMemo<RouteGroup[]>(() => {
    const map = new Map<string, RouteGroup>();
    rates.forEach(r => {
      const key = `${r.fromLocId}__${r.toLocId}`;
      if (!map.has(key)) {
        map.set(key, {
          fromLocId: r.fromLocId,
          toLocId:   r.toLocId,
          fromLocName: r.fromLocName,
          toLocName:   r.toLocName,
          prices: {},
        });
      }
      map.get(key)!.prices[r.vehicleId] = { price: r.price, onDemand: r.onDemand };
    });
    return Array.from(map.values());
  }, [rates]);

  // ── Unique from/to for dropdowns ──────────────────────────────
  const fromOptions = useMemo(() =>
    Array.from(new Map(routeGroups.map(r => [r.fromLocId, r.fromLocName])).entries())
      .sort((a, b) => a[1].localeCompare(b[1])),
    [routeGroups]
  );
  const toOptions = useMemo(() =>
    Array.from(new Map(routeGroups.map(r => [r.toLocId, r.toLocName])).entries())
      .sort((a, b) => a[1].localeCompare(b[1])),
    [routeGroups]
  );

  // ── Filter ────────────────────────────────────────────────────
  const filtered = useMemo(() =>
    routeGroups.filter(r => {
      if (fromSearch && r.fromLocId !== fromSearch) return false;
      if (toSearch   && r.toLocId   !== toSearch)   return false;
      return true;
    }),
    [routeGroups, fromSearch, toSearch]
  );

  // ── Vehicles to show as columns ───────────────────────────────
  const colVehicles = vehFilter === "all"
    ? vehicles
    : vehicles.filter(v => v.id === vehFilter);

  // ── Format price cell ─────────────────────────────────────────
  const priceCell = (group: RouteGroup, vId: string) => {
    const entry = group.prices[vId];
    if (!entry) return { type: "none" as const };
    if (entry.onDemand) return { type: "demand" as const };
    if (entry.price === null) return { type: "none" as const };
    return { type: "price" as const, value: entry.price };
  };

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,300;0,400;0,500;0,600;1,300;1,400;1,500&family=Montserrat:wght@300;400;500;600;700&display=swap');

        .rp-root {
          --rp-navy:       #0a1f44;
          --rp-navy-deep:  #071533;
          --rp-gold:       #c9a347;
          --rp-gold-light: #e8c97a;
          --rp-gold-pale:  rgba(201,163,71,0.09);
          --rp-gold-bdr:   rgba(201,163,71,0.22);
          --rp-ivory:      #f5f0e8;
          --rp-ivory-dim:  rgba(245,240,232,0.68);
          --rp-ivory-faint:rgba(245,240,232,0.35);
          --rp-stroke:     rgba(245,240,232,0.07);
        }
        .rp-root * { box-sizing: border-box; }

        /* ── BODY ── */
        .rp-body { background: #080808; padding: 64px 5vw 80px; min-height: 70vh; }
        .rp-body-inner { max-width: 1280px; margin: 0 auto; }

        /* ── SEARCH PANEL ── */
        .rp-search-panel {
          background: rgba(255,255,255,0.03);
          border: 1px solid rgba(201,163,71,0.15);
          border-radius: 16px; padding: 28px 32px; margin-bottom: 36px;
          position: relative; overflow: hidden;
        }
        .rp-search-panel::before {
          content: ''; position: absolute; top: 0; left: 0; right: 0; height: 2px;
          background: linear-gradient(90deg, transparent, var(--rp-gold) 50%, transparent);
          opacity: 0.4;
        }
        .rp-search-title {
          font-family: 'Cormorant Garamond', serif;
          font-size: 1.35rem; font-weight: 500; color: var(--rp-ivory); margin-bottom: 20px;
        }
        .rp-search-grid {
          display: grid; grid-template-columns: 1fr 1fr 1fr auto;
          gap: 14px; align-items: end;
        }
        @media(max-width:900px){ .rp-search-grid { grid-template-columns: 1fr 1fr; } }
        @media(max-width:580px){ .rp-search-grid { grid-template-columns: 1fr; } }

        .rp-field { display: flex; flex-direction: column; gap: 6px; }
        .rp-label {
          font-family: 'Montserrat', sans-serif;
          font-size: 9px; font-weight: 700; letter-spacing: 0.2em; text-transform: uppercase;
          color: rgba(245,240,232,0.3);
        }
        .rp-select {
          background: rgba(255,255,255,0.05);
          border: 1px solid rgba(245,240,232,0.1); border-radius: 9px;
          padding: 11px 32px 11px 14px;
          font-family: 'Montserrat', sans-serif; font-size: 12.5px;
          color: var(--rp-ivory); outline: none; cursor: pointer;
          appearance: none; -webkit-appearance: none; width: 100%;
          background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='12' height='12' viewBox='0 0 24 24' fill='none' stroke='rgba(245,240,232,0.3)' stroke-width='2'%3E%3Cpath d='M6 9l6 6 6-6'/%3E%3C/svg%3E");
          background-repeat: no-repeat; background-position: right 12px center;
          transition: border-color .2s, background .2s;
        }
        .rp-select option { background: #0a1f44; color: #f5f0e8; }
        .rp-select:focus { border-color: rgba(201,163,71,.45); background: rgba(201,163,71,.04); }
        .rp-clear-btn {
          padding: 11px 18px; border-radius: 9px;
          background: transparent; border: 1px solid rgba(245,240,232,0.1);
          font-family: 'Montserrat', sans-serif; font-size: 10px; font-weight: 700;
          letter-spacing: .12em; text-transform: uppercase;
          color: rgba(245,240,232,.35); cursor: pointer; white-space: nowrap; transition: all .2s;
        }
        .rp-clear-btn:hover { border-color: rgba(201,163,71,.3); color: var(--rp-gold); }

        /* ── META BAR ── */
        .rp-meta {
          display: flex; align-items: center; justify-content: space-between;
          flex-wrap: wrap; gap: 10px; margin-bottom: 18px;
        }
        .rp-count {
          font-family: 'Montserrat', sans-serif; font-size: 11px;
          color: rgba(245,240,232,.3); letter-spacing: .06em;
        }
        .rp-count strong { color: var(--rp-gold); font-weight: 700; }

        /* ── VEHICLE FILTER PILLS ── */
        .rp-veh-pills { display: flex; flex-wrap: wrap; gap: 8px; }
        .rp-pill {
          padding: 5px 14px; border-radius: 999px;
          font-family: 'Montserrat', sans-serif; font-size: 10px; font-weight: 600;
          letter-spacing: .08em; text-transform: uppercase; cursor: pointer;
          border: 1px solid rgba(245,240,232,.1); color: rgba(245,240,232,.4);
          background: transparent; transition: all .2s;
        }
        .rp-pill:hover { border-color: rgba(201,163,71,.3); color: var(--rp-gold); }
        .rp-pill.active { background: rgba(201,163,71,.12); border-color: rgba(201,163,71,.35); color: var(--rp-gold); }

        /* ── TABLE ── */
        .rp-table-wrap {
          border-radius: 14px; overflow: hidden;
          border: 1px solid rgba(245,240,232,.07);
        }
        .rp-table { width: 100%; border-collapse: collapse; font-family: 'Montserrat', sans-serif; }

        .rp-table thead tr {
          background: rgba(201,163,71,.08);
          border-bottom: 1px solid rgba(201,163,71,.2);
        }
        .rp-table thead th {
          padding: 0; text-align: center;
        }
        .rp-th-inner {
          display: flex; flex-direction: column; align-items: center; gap: 4px;
          padding: 14px 16px;
        }
        .rp-th-route { text-align: left; }
        .rp-th-route .rp-th-inner { align-items: flex-start; }
        .rp-th-label {
          font-size: 9px; font-weight: 700; letter-spacing: .18em; text-transform: uppercase;
          color: var(--rp-gold);
        }
        .rp-th-sub {
          font-size: 9px; font-weight: 400; color: rgba(245,240,232,.3);
          letter-spacing: .04em;
        }
        .rp-th-veh-img {
          width: 44px; height: 30px; border-radius: 5px; object-fit: cover;
          background: rgba(255,255,255,.05); margin-bottom: 2px;
        }

        .rp-table tbody tr {
          border-bottom: 1px solid rgba(245,240,232,.04); transition: background .15s;
        }
        .rp-table tbody tr:last-child { border-bottom: none; }
        .rp-table tbody tr:hover { background: rgba(201,163,71,.04); }
        .rp-table tbody tr:nth-child(even) { background: rgba(255,255,255,.015); }
        .rp-table tbody tr:nth-child(even):hover { background: rgba(201,163,71,.05); }

        .rp-table td { padding: 14px 16px; vertical-align: middle; }

        .rp-route-from {
          display: inline-flex; align-items: center; gap: 6px;
          padding: 3px 9px; border-radius: 5px;
          background: rgba(201,163,71,.08); border: 1px solid rgba(201,163,71,.15);
          font-size: 10px; font-weight: 700; letter-spacing: .1em; text-transform: uppercase;
          color: var(--rp-gold); white-space: nowrap; margin-bottom: 3px;
        }
        .rp-route-full {
          font-size: 11px; color: rgba(245,240,232,.35); font-weight: 400;
        }
        .rp-route-to {
          font-size: 13px; font-weight: 600; color: var(--rp-ivory); line-height: 1.3;
        }
        .rp-route-to-sub {
          font-size: 10px; color: rgba(245,240,232,.28); text-transform: uppercase; letter-spacing: .07em; margin-top: 1px;
        }
        .rp-arrow-cell {
          text-align: center; color: rgba(245,240,232,.15); font-size: 16px; padding: 14px 8px;
        }

        /* Price cells */
        .rp-price-cell { text-align: center; }
        .rp-price-val {
          font-size: 15px; font-weight: 700; color: var(--rp-ivory); letter-spacing: -.01em;
        }
        .rp-price-eur { font-size: 11px; font-weight: 500; color: var(--rp-gold); margin-left: 1px; }
        .rp-price-demand {
          font-size: 10px; font-style: italic; color: rgba(245,240,232,.3); letter-spacing: .04em;
        }
        .rp-price-none { color: rgba(245,240,232,.12); font-size: 14px; }

        /* ── LOADING / ERROR ── */
        .rp-state-box {
          padding: 80px 20px; text-align: center;
          font-family: 'Cormorant Garamond', serif;
          font-size: 1.4rem; color: rgba(245,240,232,.3);
        }
        .rp-state-icon { font-size: 36px; margin-bottom: 12px; }
        .rp-loading-dots span {
          display: inline-block; width: 6px; height: 6px; border-radius: 50%;
          background: var(--rp-gold); margin: 0 3px; opacity: .3;
          animation: rp-bounce .8s ease-in-out infinite;
        }
        .rp-loading-dots span:nth-child(2){ animation-delay: .15s; }
        .rp-loading-dots span:nth-child(3){ animation-delay: .3s; }
        @keyframes rp-bounce { 0%,80%,100%{transform:translateY(0);opacity:.3} 40%{transform:translateY(-8px);opacity:1} }

        /* ── INFO CHIPS ── */
        .rp-info-strip { display: flex; flex-wrap: wrap; gap: 10px; margin-top: 28px; }
        .rp-info-chip {
          display: flex; align-items: center; gap: 8px;
          padding: 9px 14px; border-radius: 8px;
          background: rgba(255,255,255,.03); border: 1px solid rgba(245,240,232,.07);
          font-family: 'Montserrat', sans-serif; font-size: 11px;
          color: rgba(245,240,232,.38); font-weight: 500;
        }
        .rp-info-chip svg { width: 13px; height: 13px; color: var(--rp-gold); flex-shrink: 0; }

        /* ── CTA ── */
        .rp-cta-strip {
          background: var(--rp-navy-deep); border-top: 1px solid rgba(201,163,71,.12);
          padding: 48px 5vw;
        }
        .rp-cta-inner {
          max-width: 1280px; margin: 0 auto;
          display: flex; align-items: center; justify-content: space-between;
          flex-wrap: wrap; gap: 24px;
        }
        .rp-cta-text {
          font-family: 'Cormorant Garamond', serif;
          font-size: clamp(1.4rem,3vw,2rem); font-weight: 400; color: var(--rp-ivory);
        }
        .rp-cta-text em { font-style: italic; color: var(--rp-gold); }
        .rp-cta-btns { display: flex; gap: 12px; flex-wrap: wrap; }
        .rp-btn {
          display: inline-flex; align-items: center; gap: 8px;
          padding: 13px 28px; border-radius: 6px;
          font-family: 'Montserrat', sans-serif; font-size: 11px; font-weight: 700;
          letter-spacing: .14em; text-transform: uppercase;
          text-decoration: none; transition: all .25s; cursor: pointer; border: none;
        }
        .rp-btn-primary { background: var(--rp-gold); color: #080808; box-shadow: 0 4px 20px rgba(201,163,71,.25); }
        .rp-btn-primary:hover { background: var(--rp-gold-light); transform: translateY(-2px); }
        .rp-btn-ghost { background: transparent; color: var(--rp-ivory-dim); border: 1px solid rgba(245,240,232,.12); }
        .rp-btn-ghost:hover { border-color: rgba(201,163,71,.3); color: var(--rp-gold); background: rgba(201,163,71,.06); }

        @keyframes rp-fadeup { from{opacity:0;transform:translateY(20px)} to{opacity:1;transform:translateY(0)} }
        .rp-anim { animation: rp-fadeup .55s .1s both; }

        @media(max-width:768px){
          .rp-table td, .rp-table th { padding: 10px 10px; }
          .rp-price-val { font-size: 13px; }
          .rp-route-to { font-size: 12px; }
        }
        @media(max-width:640px){
          /* hide vehicle sub-labels on tiny screens */
          .rp-th-sub { display: none; }
          .rp-th-veh-img { display: none; }
        }
      `}</style>

      <div className="rp-root">
        <div className="rp-body">
          <div className="rp-body-inner rp-anim">

            {/* ── Search panel ── */}
            <div className="rp-search-panel">
              <div className="rp-search-title">Find Your Rate</div>
              <div className="rp-search-grid">
                {/* From */}
                <div className="rp-field">
                  <label className="rp-label">Departure</label>
                  <select className="rp-select" value={fromSearch} onChange={e=>setFromSearch(e.target.value)}>
                    <option value="">All departure points</option>
                    {fromOptions.map(([id, name]) => (
                      <option key={id} value={id}>{name}</option>
                    ))}
                  </select>
                </div>
                {/* To */}
                <div className="rp-field">
                  <label className="rp-label">Destination</label>
                  <select className="rp-select" value={toSearch} onChange={e=>setToSearch(e.target.value)}>
                    <option value="">All destinations</option>
                    {toOptions.map(([id, name]) => (
                      <option key={id} value={id}>{name}</option>
                    ))}
                  </select>
                </div>
                {/* Vehicle */}
                <div className="rp-field">
                  <label className="rp-label">Vehicle Class</label>
                  <select className="rp-select" value={vehFilter} onChange={e=>setVehFilter(e.target.value)}>
                    <option value="all">All vehicles</option>
                    {vehicles.map(v => (
                      <option key={v.id} value={v.id}>{v.name}</option>
                    ))}
                  </select>
                </div>
                {/* Clear */}
                {(fromSearch || toSearch || vehFilter !== "all") && (
                  <button className="rp-clear-btn"
                    onClick={()=>{ setFromSearch(""); setToSearch(""); setVehFilter("all"); }}>
                    Clear
                  </button>
                )}
              </div>
            </div>

            {/* ── Meta + vehicle pills ── */}
            <div className="rp-meta">
              <div className="rp-count">
                Showing <strong>{filtered.length}</strong> of {routeGroups.length} routes
              </div>
              <div className="rp-veh-pills">
                <button className={`rp-pill${vehFilter==="all"?" active":""}`} onClick={()=>setVehFilter("all")}>
                  All
                </button>
                {vehicles.map(v => (
                  <button key={v.id} className={`rp-pill${vehFilter===v.id?" active":""}`}
                    onClick={()=>setVehFilter(v.id)}>
                    {v.name}
                  </button>
                ))}
              </div>
            </div>

            {/* ── Table ── */}
            {loading ? (
              <div className="rp-state-box">
                <div className="rp-state-icon">
                  <div className="rp-loading-dots">
                    <span/><span/><span/>
                  </div>
                </div>
                Loading rates…
              </div>
            ) : error ? (
              <div className="rp-state-box">
                <div className="rp-state-icon">⚠️</div>
                Could not load rates. Please refresh or contact us.
              </div>
            ) : filtered.length === 0 ? (
              <div className="rp-table-wrap">
                <div className="rp-state-box">
                  <div className="rp-state-icon">✦</div>
                  No routes match your search
                </div>
              </div>
            ) : (
              <div className="rp-table-wrap" style={{ overflowX:"auto" }}>
                <table className="rp-table">
                  <thead>
                    <tr>
                      {/* From column */}
                      <th className="rp-th-route">
                        <div className="rp-th-inner">
                          <span className="rp-th-label">From</span>
                        </div>
                      </th>
                      {/* Arrow */}
                      <th style={{ width:32 }}/>
                      {/* To column */}
                      <th className="rp-th-route">
                        <div className="rp-th-inner">
                          <span className="rp-th-label">To</span>
                        </div>
                      </th>
                      {/* One column per vehicle */}
                      {colVehicles.map(v => (
                        <th key={v.id}>
                          <div className="rp-th-inner">
                            <img
                              src={v.img || "/images/car.png"}
                              alt={v.name}
                              className="rp-th-veh-img"
                              onError={e => { (e.currentTarget as HTMLImageElement).style.display="none"; }}
                            />
                            <span className="rp-th-label">{v.name}</span>
                            <span className="rp-th-sub">
                              {v.tag || `Max ${v.maxPassengers} pax`}
                            </span>
                          </div>
                        </th>
                      ))}
                    </tr>
                  </thead>
                  <tbody>
                    {filtered.map((group, i) => (
                      <tr key={`${group.fromLocId}-${group.toLocId}-${i}`}>
                        {/* From */}
                        <td style={{ minWidth:160 }}>
                          <div className="rp-route-from">{group.fromLocName.split("(")[0].trim()}</div>
                          <div className="rp-route-full">{group.fromLocName}</div>
                        </td>
                        {/* Arrow */}
                        <td className="rp-arrow-cell">→</td>
                        {/* To */}
                        <td style={{ minWidth:180 }}>
                          <div className="rp-route-to">{group.toLocName.split("(")[0].trim()}</div>
                          <div className="rp-route-to-sub">{group.toLocName}</div>
                        </td>
                        {/* Price per vehicle */}
                        {colVehicles.map(v => {
                          const cell = priceCell(group, v.id);
                          return (
                            <td key={v.id} className="rp-price-cell">
                              {cell.type === "price" && (
                                <span className="rp-price-val">
                                  {cell.value}<span className="rp-price-eur">€</span>
                                </span>
                              )}
                              {cell.type === "demand" && (
                                <span className="rp-price-demand">On demand</span>
                              )}
                              {cell.type === "none" && (
                                <span className="rp-price-none">—</span>
                              )}
                            </td>
                          );
                        })}
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}

            {/* ── Info chips ── */}
            {!loading && !error && (
              <div className="rp-info-strip">
                {[
                  { d:"M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622z", text:"All prices are fixed — no surge, no hidden fees" },
                  { d:"M17 9V7a5 5 0 00-10 0v2m-3 0h16a2 2 0 012 2v9a2 2 0 01-2 2H6a2 2 0 01-2-2v-9a2 2 0 012-2z", text:"Pay on card or cash on arrival" },
                  { d:"M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z", text:"24 / 7 availability" },
                  { d:"M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z", text:"Contact us for on-demand routes" },
                  { d:"M17 21v-2a4 4 0 00-4-4H5a4 4 0 00-4 4v2", text:"Free child seats included" },
                ].map((c,i) => (
                  <div key={i} className="rp-info-chip">
                    <svg fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.8}>
                      <path strokeLinecap="round" strokeLinejoin="round" d={c.d}/>
                    </svg>
                    {c.text}
                  </div>
                ))}
              </div>
            )}

          </div>
        </div>

        {/* ── CTA strip ── */}
        <div className="rp-cta-strip">
          <div className="rp-cta-inner">
            <div className="rp-cta-text">
              Ready to book your<br/><em>transfer?</em>
            </div>
            <div className="rp-cta-btns">
              <a href="/reservation" className="rp-btn rp-btn-primary">Book Now</a>
              <a href="https://wa.me/33652466694" target="_blank" rel="noopener noreferrer" className="rp-btn rp-btn-ghost">
                WhatsApp Us
              </a>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}