"use client";

import { useState, useMemo } from "react";

const LOCATION_NAMES: Record<string, string> = {
  CDG: "Charles de Gaulle Airport (CDG)",
  ORLY: "Orly Airport (ORY)",
  PARIS: "Paris City Centre",
  DISNEY: "Disneyland Paris",
  VERSAILLES: "Palace of Versailles",
  "PARIS HOTELS & Appartements": "Paris Hotels & Apartments",
  "PARIS GARES": "Paris Train Stations (Gares)",
  Beauvais: "Beauvais Airport (BVA)",
  "BEAUVAIS airport": "Beauvais Airport (BVA)",
  BEAUVAIS: "Beauvais Airport (BVA)",
  "PARC Asterix": "Parc Astérix",
  "VERSAILLE PALACE": "Palace of Versailles",
};

const fullName = (key: string) => LOCATION_NAMES[key] || key;

const RATES = [
  { from: "CDG", to: "PARIS HOTELS & Appartements", p13: "€80", p4: "€85", p5: "€90", p6: "€95", p7: "€100", p8: "€110", p9: "€170" },
  { from: "CDG", to: "PARIS GARES", p13: "€80", p4: "€85", p5: "€90", p6: "€95", p7: "€100", p8: "€110", p9: "€170" },
  { from: "CDG", to: "ORLY", p13: "€100", p4: "€110", p5: "€110", p6: "€120", p7: "€120", p8: "€140", p9: "€200" },
  { from: "CDG", to: "DISNEY", p13: "€70", p4: "€75", p5: "€80", p6: "€85", p7: "€90", p8: "€100", p9: "€160" },
  { from: "CDG", to: "Beauvais", p13: "€140", p4: "€150", p5: "€150", p6: "€160", p7: "€170", p8: "€180", p9: "€300" },
  { from: "CDG", to: "PARC Asterix", p13: "€80", p4: "€90", p5: "€90", p6: "€100", p7: "€100", p8: "€110", p9: "€160" },
  { from: "ORLY", to: "CDG", p13: "€100", p4: "€110", p5: "€110", p6: "€120", p7: "€120", p8: "€140", p9: "€200" },
  { from: "ORLY", to: "PARIS HOTELS & Appartements", p13: "€75", p4: "€80", p5: "€85", p6: "€90", p7: "€95", p8: "€100", p9: "€155" },
  { from: "ORLY", to: "PARIS GARES", p13: "€75", p4: "€80", p5: "€85", p6: "€90", p7: "€95", p8: "€100", p9: "€155" },
  { from: "ORLY", to: "DISNEY", p13: "€75", p4: "€80", p5: "€85", p6: "€90", p7: "€90", p8: "€100", p9: "€180" },
  { from: "ORLY", to: "BEAUVAIS airport", p13: "€170", p4: "€180", p5: "€180", p6: "€190", p7: "€190", p8: "€200", p9: "€330" },
  { from: "ORLY", to: "PARC Asterix", p13: "€100", p4: "€110", p5: "€110", p6: "€120", p7: "€120", p8: "€130", p9: "€200" },
  { from: "PARIS", to: "CDG", p13: "€80", p4: "€85", p5: "€90", p6: "€95", p7: "€100", p8: "€110", p9: "€170" },
  { from: "PARIS", to: "ORLY", p13: "€75", p4: "€80", p5: "€85", p6: "€90", p7: "€95", p8: "€100", p9: "€155" },
  { from: "PARIS", to: "DISNEY", p13: "€80", p4: "€85", p5: "€85", p6: "€90", p7: "€95", p8: "€105", p9: "€190" },
  { from: "PARIS", to: "BEAUVAIS", p13: "€150", p4: "€160", p5: "€160", p6: "€170", p7: "€170", p8: "€180", p9: "€320" },
  { from: "PARIS", to: "VERSAILLE PALACE", p13: "€80", p4: "€90", p5: "€90", p6: "€100", p7: "€100", p8: "€110", p9: "€180" },
  { from: "PARIS", to: "PARC Asterix", p13: "€80", p4: "€90", p5: "€90", p6: "€100", p7: "€100", p8: "€110", p9: "€170" },
  { from: "DISNEY", to: "ORLY", p13: "€75", p4: "€80", p5: "€85", p6: "€90", p7: "€90", p8: "€100", p9: "€180" },
  { from: "DISNEY", to: "CDG", p13: "€75", p4: "€80", p5: "€80", p6: "€85", p7: "€90", p8: "€100", p9: "€155" },
  { from: "DISNEY", to: "BEAUVAIS", p13: "€150", p4: "€160", p5: "€160", p6: "€170", p7: "€170", p8: "€180", p9: "€320" },
  { from: "DISNEY", to: "PARIS", p13: "€80", p4: "€85", p5: "€85", p6: "€90", p7: "€95", p8: "€105", p9: "€190" },
  { from: "DISNEY", to: "PARC Asterix", p13: "On demand", p4: "—", p5: "—", p6: "—", p7: "—", p8: "—", p9: "—" },
  { from: "VERSAILLES", to: "PARIS", p13: "€80", p4: "€90", p5: "€90", p6: "€100", p7: "€100", p8: "€110", p9: "€180" },
  { from: "VERSAILLES", to: "CDG", p13: "€130", p4: "€140", p5: "€140", p6: "€150", p7: "€150", p8: "€160", p9: "€280" },
  { from: "VERSAILLES", to: "ORLY", p13: "€80", p4: "€90", p5: "€90", p6: "€100", p7: "€100", p8: "€110", p9: "€170" },
  { from: "VERSAILLES", to: "PARC Asterix", p13: "On demand", p4: "—", p5: "—", p6: "—", p7: "—", p8: "—", p9: "—" },
];

const ALL_LOCATIONS = [
  "CDG", "ORLY", "PARIS", "DISNEY", "VERSAILLES",
  "PARIS HOTELS & Appartements", "PARIS GARES", "Beauvais",
  "BEAUVAIS airport", "BEAUVAIS", "PARC Asterix", "VERSAILLE PALACE",
];

const UNIQUE_LOCATIONS = [
  { key: "CDG", label: "Charles de Gaulle Airport (CDG)" },
  { key: "ORLY", label: "Orly Airport (ORY)" },
  { key: "PARIS", label: "Paris City Centre" },
  { key: "DISNEY", label: "Disneyland Paris" },
  { key: "VERSAILLES", label: "Palace of Versailles" },
  { key: "PARIS HOTELS & Appartements", label: "Paris Hotels & Apartments" },
  { key: "PARIS GARES", label: "Paris Train Stations (Gares)" },
  { key: "Beauvais", label: "Beauvais Airport (BVA)" },
  { key: "PARC Asterix", label: "Parc Astérix" },
];

export default function RatesPage() {
  const [fromSearch, setFromSearch] = useState("");
  const [toSearch, setToSearch] = useState("");
  const [paxFilter, setPaxFilter] = useState("all");

  const filtered = useMemo(() => {
    return RATES.filter((r) => {
      const fromFull = fullName(r.from).toLowerCase();
      const toFull = fullName(r.to).toLowerCase();
      const fromKey = r.from.toLowerCase();
      const toKey = r.to.toLowerCase();
      const fromMatch = !fromSearch ||
        fromFull.includes(fromSearch.toLowerCase()) ||
        fromKey.includes(fromSearch.toLowerCase());
      const toMatch = !toSearch ||
        toFull.includes(toSearch.toLowerCase()) ||
        toKey.includes(toSearch.toLowerCase());
      return fromMatch && toMatch;
    });
  }, [fromSearch, toSearch]);

  const paxCols = [
    { key: "p13", label: "1–3 Pax" },
    { key: "p4", label: "4 Pax" },
    { key: "p5", label: "5 Pax" },
    { key: "p6", label: "6 Pax" },
    { key: "p7", label: "7 Pax" },
    { key: "p8", label: "8 Pax" },
    { key: "p9", label: "9 Pax" },
  ];

  const visibleCols = paxFilter === "all" ? paxCols : paxCols.filter(c => c.key === paxFilter);

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

        /* HERO */
        .rp-hero {
          position: relative;
          background: var(--rp-navy-deep);
          min-height: 46vh;
          display: flex; align-items: flex-end;
          padding: 120px 5vw 60px;
          overflow: hidden;
        }
        .rp-hero-bg {
          position: absolute; inset: 0;
          background: url('/images/banner.webp') center/cover no-repeat;
          opacity: 0.18;
        }
        .rp-hero-overlay {
          position: absolute; inset: 0;
          background:
            linear-gradient(to top, rgba(7,21,51,0.98) 0%, rgba(7,21,51,0.55) 55%, rgba(7,21,51,0.25) 100%),
            linear-gradient(to right, rgba(7,21,51,0.8) 0%, transparent 60%);
        }
        .rp-hero-grid {
          position: absolute; inset: 0;
          background-image:
            linear-gradient(rgba(245,240,232,0.025) 1px, transparent 1px),
            linear-gradient(90deg, rgba(245,240,232,0.025) 1px, transparent 1px);
          background-size: 48px 48px;
        }
        .rp-hero-topline {
          position: absolute; top: 0; left: 0; right: 0; height: 2px;
          background: linear-gradient(90deg, transparent, var(--rp-gold) 35%, var(--rp-gold) 65%, transparent);
          opacity: 0.6;
        }
        .rp-hero-inner { position: relative; z-index: 1; max-width: 1200px; width: 100%; margin: 0 auto; }
        .rp-eyebrow {
          display: inline-flex; align-items: center; gap: 10px;
          font-family: 'Montserrat', sans-serif;
          font-size: 10px; font-weight: 600; letter-spacing: 0.26em; text-transform: uppercase;
          color: var(--rp-gold); margin-bottom: 18px;
        }
        .rp-eyebrow-line { width: 28px; height: 1px; background: var(--rp-gold); }
        .rp-hero-title {
          font-family: 'Cormorant Garamond', serif;
          font-size: clamp(3rem, 6.5vw, 5.5rem);
          font-weight: 400; line-height: 0.95; letter-spacing: -0.02em;
          color: var(--rp-ivory); margin: 0 0 18px;
        }
        .rp-hero-title em { font-style: italic; color: var(--rp-gold); font-weight: 300; }
        .rp-hero-sub {
          font-family: 'Montserrat', sans-serif;
          font-size: 13px; font-weight: 400; line-height: 1.7;
          color: var(--rp-ivory-faint); max-width: 500px;
        }

        /* BODY */
        .rp-body { background: #080808; padding: 64px 5vw 80px; }
        .rp-body-inner { max-width: 1200px; margin: 0 auto; }

        /* SEARCH PANEL */
        .rp-search-panel {
          background: rgba(255,255,255,0.03);
          border: 1px solid rgba(201,163,71,0.15);
          border-radius: 16px;
          padding: 28px 32px;
          margin-bottom: 40px;
          position: relative;
          overflow: hidden;
        }
        .rp-search-panel::before {
          content: '';
          position: absolute; top: 0; left: 0; right: 0; height: 2px;
          background: linear-gradient(90deg, transparent, var(--rp-gold) 50%, transparent);
          opacity: 0.4;
        }
        .rp-search-title {
          font-family: 'Cormorant Garamond', serif;
          font-size: 1.4rem; font-weight: 500; color: var(--rp-ivory);
          margin-bottom: 20px;
        }
        .rp-search-grid {
          display: grid;
          grid-template-columns: 1fr 1fr 1fr;
          gap: 16px;
        }
        @media (max-width: 768px) { .rp-search-grid { grid-template-columns: 1fr; } }
        @media (max-width: 1024px) { .rp-search-grid { grid-template-columns: 1fr 1fr; } }

        .rp-field { display: flex; flex-direction: column; gap: 6px; }
        .rp-label {
          font-family: 'Montserrat', sans-serif;
          font-size: 9px; font-weight: 700; letter-spacing: 0.2em; text-transform: uppercase;
          color: rgba(245,240,232,0.3);
        }
        .rp-select, .rp-input {
          background: rgba(255,255,255,0.05);
          border: 1px solid rgba(245,240,232,0.1);
          border-radius: 9px; padding: 11px 14px;
          font-family: 'Montserrat', sans-serif;
          font-size: 13px; font-weight: 400; color: var(--rp-ivory);
          outline: none; transition: border-color 0.2s, background 0.2s;
          width: 100%;
        }
        .rp-select {
          appearance: none; -webkit-appearance: none; cursor: pointer;
          background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='12' height='12' viewBox='0 0 24 24' fill='none' stroke='rgba(245,240,232,0.3)' stroke-width='2'%3E%3Cpath d='M6 9l6 6 6-6'/%3E%3C/svg%3E");
          background-repeat: no-repeat; background-position: right 12px center; padding-right: 32px;
          background-color: rgba(255,255,255,0.05);
        }
        .rp-select option { background: #0a1f44; color: #f5f0e8; }
        .rp-input::placeholder { color: rgba(245,240,232,0.2); }
        .rp-input:focus, .rp-select:focus {
          border-color: rgba(201,163,71,0.45);
          background: rgba(201,163,71,0.04);
        }
        .rp-clear-btn {
          align-self: flex-end;
          padding: 11px 20px; border-radius: 9px;
          background: transparent; border: 1px solid rgba(245,240,232,0.1);
          font-family: 'Montserrat', sans-serif;
          font-size: 11px; font-weight: 600; letter-spacing: 0.12em; text-transform: uppercase;
          color: rgba(245,240,232,0.35); cursor: pointer;
          transition: all 0.2s;
        }
        .rp-clear-btn:hover { border-color: rgba(201,163,71,0.3); color: var(--rp-gold); }

        /* RESULTS COUNT */
        .rp-meta {
          display: flex; align-items: center; justify-content: space-between;
          flex-wrap: wrap; gap: 12px; margin-bottom: 20px;
        }
        .rp-count {
          font-family: 'Montserrat', sans-serif;
          font-size: 11px; font-weight: 500; color: rgba(245,240,232,0.3);
          letter-spacing: 0.06em;
        }
        .rp-count strong { color: var(--rp-gold); font-weight: 700; }

        /* TABLE */
        .rp-table-wrap {
          border-radius: 14px; overflow: hidden;
          border: 1px solid rgba(245,240,232,0.07);
        }
        .rp-table {
          width: 100%; border-collapse: collapse;
          font-family: 'Montserrat', sans-serif;
        }
        .rp-table thead tr {
          background: rgba(201,163,71,0.08);
          border-bottom: 1px solid rgba(201,163,71,0.2);
        }
        .rp-table thead th {
          padding: 14px 18px;
          font-size: 9px; font-weight: 700; letter-spacing: 0.18em; text-transform: uppercase;
          color: var(--rp-gold); text-align: left; white-space: nowrap;
        }
        .rp-table thead th.center { text-align: center; }
        .rp-table tbody tr {
          border-bottom: 1px solid rgba(245,240,232,0.04);
          transition: background 0.18s;
        }
        .rp-table tbody tr:last-child { border-bottom: none; }
        .rp-table tbody tr:hover { background: rgba(201,163,71,0.04); }
        .rp-table tbody tr:nth-child(even) { background: rgba(255,255,255,0.015); }
        .rp-table tbody tr:nth-child(even):hover { background: rgba(201,163,71,0.05); }

        .rp-table td {
          padding: 14px 18px;
          font-size: 12.5px; font-weight: 400; color: rgba(245,240,232,0.65);
          vertical-align: middle;
        }
        .rp-table td.location-cell { font-weight: 500; color: var(--rp-ivory); }
        .rp-table td.price-cell {
          text-align: center; font-weight: 600;
          color: var(--rp-ivory); font-size: 13px;
        }
        .rp-table td.price-demand {
          text-align: center; font-size: 11px;
          color: rgba(245,240,232,0.3); font-style: italic;
        }
        .rp-table td.price-dash {
          text-align: center; color: rgba(245,240,232,0.15);
        }

        .rp-location-badge {
          display: inline-flex; align-items: center; gap: 6px;
          padding: 4px 10px; border-radius: 6px;
          background: rgba(201,163,71,0.08);
          border: 1px solid rgba(201,163,71,0.15);
          font-size: 10px; font-weight: 700; letter-spacing: 0.1em; text-transform: uppercase;
          color: var(--rp-gold);
        }

        .rp-arrow {
          color: rgba(245,240,232,0.2);
          font-size: 14px; margin: 0 4px;
        }

        /* EMPTY STATE */
        .rp-empty {
          padding: 60px 20px; text-align: center;
          background: rgba(255,255,255,0.02);
        }
        .rp-empty-icon { font-size: 36px; margin-bottom: 12px; opacity: 0.3; }
        .rp-empty-text {
          font-family: 'Cormorant Garamond', serif;
          font-size: 1.3rem; color: rgba(245,240,232,0.3); font-weight: 400;
        }

        /* INFO STRIP */
        .rp-info-strip {
          display: flex; flex-wrap: wrap; gap: 12px; margin-top: 32px;
        }
        .rp-info-chip {
          display: flex; align-items: center; gap: 8px;
          padding: 10px 16px; border-radius: 8px;
          background: rgba(255,255,255,0.03);
          border: 1px solid rgba(245,240,232,0.07);
          font-family: 'Montserrat', sans-serif;
          font-size: 11px; font-weight: 500; color: rgba(245,240,232,0.4);
        }
        .rp-info-chip svg { width: 14px; height: 14px; color: var(--rp-gold); flex-shrink: 0; }

        /* CTA STRIP */
        .rp-cta-strip {
          background: var(--rp-navy-deep);
          border-top: 1px solid rgba(201,163,71,0.12);
          padding: 48px 5vw;
        }
        .rp-cta-inner {
          max-width: 1200px; margin: 0 auto;
          display: flex; align-items: center; justify-content: space-between;
          flex-wrap: wrap; gap: 24px;
        }
        .rp-cta-text {
          font-family: 'Cormorant Garamond', serif;
          font-size: clamp(1.4rem, 3vw, 2rem); font-weight: 400; color: var(--rp-ivory);
        }
        .rp-cta-text em { font-style: italic; color: var(--rp-gold); }
        .rp-cta-btns { display: flex; gap: 12px; flex-wrap: wrap; }
        .rp-btn {
          display: inline-flex; align-items: center; gap: 8px;
          padding: 13px 28px; border-radius: 6px;
          font-family: 'Montserrat', sans-serif;
          font-size: 11px; font-weight: 700; letter-spacing: 0.14em; text-transform: uppercase;
          text-decoration: none; transition: all 0.25s; cursor: pointer; border: none;
        }
        .rp-btn-primary { background: var(--rp-gold); color: #080808; box-shadow: 0 4px 20px rgba(201,163,71,0.25); }
        .rp-btn-primary:hover { background: var(--rp-gold-light); transform: translateY(-2px); }
        .rp-btn-ghost { background: transparent; color: var(--rp-ivory-dim); border: 1px solid rgba(245,240,232,0.12); }
        .rp-btn-ghost:hover { border-color: rgba(201,163,71,0.3); color: var(--rp-gold); background: rgba(201,163,71,0.06); }

        @keyframes rp-fadeup { from { opacity:0; transform:translateY(20px); } to { opacity:1; transform:translateY(0); } }
        .rp-anim { animation: rp-fadeup 0.6s 0.15s both; }

        @media (max-width: 768px) {
          .rp-table { font-size: 11px; }
          .rp-table td, .rp-table th { padding: 10px 12px; }
          .rp-search-panel { padding: 20px; }
        }
      `}</style>

      <div className="rp-root">



        {/* BODY */}
        <div className="rp-body">
          <div className="rp-body-inner rp-anim">

            {/* SEARCH PANEL */}
            <div className="rp-search-panel">
              <div className="rp-search-title">Find Your Rate</div>
              <div className="rp-search-grid">
                <div className="rp-field">
                  <label className="rp-label">Departure</label>
                  <select
                    className="rp-select"
                    value={fromSearch}
                    onChange={e => setFromSearch(e.target.value)}
                  >
                    <option value="">All departure points</option>
                    {UNIQUE_LOCATIONS.filter(l =>
                      RATES.some(r => r.from === l.key)
                    ).map(l => (
                      <option key={l.key} value={l.key}>{l.label}</option>
                    ))}
                  </select>
                </div>
                <div className="rp-field">
                  <label className="rp-label">Destination</label>
                  <select
                    className="rp-select"
                    value={toSearch}
                    onChange={e => setToSearch(e.target.value)}
                  >
                    <option value="">All destinations</option>
                    {UNIQUE_LOCATIONS.filter(l =>
                      RATES.some(r => r.to === l.key || r.to.toLowerCase().includes(l.key.toLowerCase()))
                    ).map(l => (
                      <option key={l.key} value={l.key}>{l.label}</option>
                    ))}
                  </select>
                </div>
                <div className="rp-field">
                  <label className="rp-label">Show Prices For</label>
                  <select
                    className="rp-select"
                    value={paxFilter}
                    onChange={e => setPaxFilter(e.target.value)}
                  >
                    <option value="all">All passenger counts</option>
                    <option value="p13">1–3 Passengers</option>
                    <option value="p4">4 Passengers</option>
                    <option value="p5">5 Passengers</option>
                    <option value="p6">6 Passengers</option>
                    <option value="p7">7 Passengers</option>
                    <option value="p8">8 Passengers</option>
                    <option value="p9">9 Passengers</option>
                  </select>
                </div>
              </div>
              {(fromSearch || toSearch || paxFilter !== "all") && (
                <button
                  className="rp-clear-btn"
                  style={{ marginTop: 14 }}
                  onClick={() => { setFromSearch(""); setToSearch(""); setPaxFilter("all"); }}
                >
                  Clear filters
                </button>
              )}
            </div>

            {/* META */}
            <div className="rp-meta">
              <div className="rp-count">
                Showing <strong>{filtered.length}</strong> of {RATES.length} routes
              </div>
            </div>

            {/* TABLE */}
            <div className="rp-table-wrap">
              {filtered.length === 0 ? (
                <div className="rp-empty">
                  <div className="rp-empty-icon">✦</div>
                  <div className="rp-empty-text">No routes found for this search</div>
                </div>
              ) : (
                <table className="rp-table">
                  <thead>
                    <tr>
                      <th>From</th>
                      <th>To</th>
                      {visibleCols.map(c => (
                        <th key={c.key} className="center">{c.label}</th>
                      ))}
                    </tr>
                  </thead>
                  <tbody>
                    {filtered.map((r, i) => (
                      <tr key={i}>
                        <td className="location-cell">
                          <span className="rp-location-badge">{r.from}</span>
                          <div style={{ marginTop: 4, fontSize: 11, color: "rgba(245,240,232,0.38)", fontWeight: 400 }}>
                            {fullName(r.from)}
                          </div>
                        </td>
                        <td className="location-cell">
                          <div style={{ fontWeight: 600, color: "#f5f0e8" }}>{fullName(r.to)}</div>
                          <div style={{ marginTop: 2, fontSize: 10, color: "rgba(245,240,232,0.28)", fontWeight: 400, textTransform: "uppercase", letterSpacing: "0.08em" }}>
                            {r.to}
                          </div>
                        </td>
                        {visibleCols.map(c => {
                          const val = r[c.key as keyof typeof r];
                          if (val === "On demand") return <td key={c.key} className="price-demand">On demand</td>;
                          if (val === "—") return <td key={c.key} className="price-dash">—</td>;
                          return <td key={c.key} className="price-cell">{val}</td>;
                        })}
                      </tr>
                    ))}
                  </tbody>
                </table>
              )}
            </div>

            {/* INFO CHIPS */}
            <div className="rp-info-strip">
              {[
                { icon: "M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622z", text: "All prices are fixed — no surge, no hidden fees" },
                { icon: "M17 9V7a5 5 0 00-10 0v2m-3 0h16a2 2 0 012 2v9a2 2 0 01-2 2H6a2 2 0 01-2-2v-9a2 2 0 012-2z", text: "Pay on card or cash on arrival" },
                { icon: "M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2 M23 21v-2a4 4 0 0 0-3-3.87 M16 3.13a4 4 0 0 1 0 7.75", text: "Free child seats included" },
                { icon: "M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z", text: "24 / 7 availability" },
                { icon: "M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z", text: "Contact us for on-demand routes" },
              ].map((chip, i) => (
                <div key={i} className="rp-info-chip">
                  <svg fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                    <path strokeLinecap="round" strokeLinejoin="round" d={chip.icon} />
                  </svg>
                  {chip.text}
                </div>
              ))}
            </div>

          </div>
        </div>

        {/* CTA STRIP */}
        <div className="rp-cta-strip">
          <div className="rp-cta-inner">
            <div className="rp-cta-text">
              Ready to book your<br /><em>transfer?</em>
            </div>
            <div className="rp-cta-btns">
              <a href="/reservation" className="rp-btn rp-btn-primary">Book Now</a>
              <a href="https://wa.me/33652466694" target="_blank" rel="noopener noreferrer" className="rp-btn rp-btn-ghost">WhatsApp Us</a>
            </div>
          </div>
        </div>

      </div>
    </>
  );
}