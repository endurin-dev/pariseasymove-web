"use client";

import { useState } from "react";

const PARIS_SPOTS = [
  {
    id: "eiffel",
    name: "Eiffel Tower",
    area: "7th arrondissement",
    tag: "Iconic",
    tagColor: "#00A854",
    desc: "The iron lady at golden hour — Paris' most beloved silhouette.",
    time: "~25 min from CDG",
    img: "https://images.unsplash.com/photo-1511739001486-6bfe10ce785f?auto=format&fit=crop&q=80&w=800",
    fare: "from €85",
  },
  {
    id: "louvre",
    name: "Louvre Museum",
    area: "1st arrondissement",
    tag: "Culture",
    tagColor: "#7C5CBF",
    desc: "8.9M artworks, one pyramid. The world's largest art museum.",
    time: "~28 min from CDG",
    img: "https://images.unsplash.com/photo-1499856871958-5b9627545d1a?auto=format&fit=crop&q=80&w=800",
    fare: "from €88",
  },
  {
    id: "versailles",
    name: "Versailles Palace",
    area: "Yvelines, Île-de-France",
    tag: "Day Trip",
    tagColor: "#D4880A",
    desc: "Royal grandeur — baroque gardens, Hall of Mirrors, and opulence.",
    time: "~55 min from CDG",
    img: "https://images.unsplash.com/photo-1597598425700-88c56c85a1df?auto=format&fit=crop&q=80&w=800",
    fare: "from €120",
  },
  {
    id: "disney",
    name: "Disneyland Paris",
    area: "Marne-la-Vallée",
    tag: "Family",
    tagColor: "#E0415A",
    desc: "Magic for all ages — Europe's most visited theme park.",
    time: "~45 min from CDG",
    img: "https://images.unsplash.com/photo-1587825140708-dfaf72ae4b04?auto=format&fit=crop&q=80&w=800",
    fare: "from €105",
  },
  {
    id: "montmartre",
    name: "Montmartre & Sacré-Cœur",
    area: "18th arrondissement",
    tag: "Scenic",
    tagColor: "#1A8AC4",
    desc: "Cobblestones, artists, and a view that forgives everything.",
    time: "~35 min from CDG",
    img: "https://images.unsplash.com/photo-1551622757-2b9e3c4e4950?auto=format&fit=crop&q=80&w=800",
    fare: "from €92",
  },
];

const STEPS = [
  {
    num: "01",
    title: "Pick your route",
    desc: "Choose your pickup point, destination, travel date, and number of passengers.",
  },
  {
    num: "02",
    title: "Get your price",
    desc: "Receive an instant fixed fare — no surge pricing, no hidden fees, ever.",
  },
  {
    num: "03",
    title: "Ride & pay",
    desc: "Your driver arrives on time. Pay comfortably by cash or card on arrival.",
  },
];

export default function HeroBooking() {
  const [pickup, setPickup] = useState("");
  const [dropoff, setDropoff] = useState("");
  const [passengers, setPassengers] = useState(1);
  const [date, setDate] = useState("");
  const [estimatedPrice, setEstimatedPrice] = useState<number | null>(null);
  const [calculating, setCalculating] = useState(false);
  const [activeCard, setActiveCard] = useState(0);

  const calculatePrice = () => {
    if (!pickup || !dropoff) return;
    setCalculating(true);
    setTimeout(() => {
      const base = 80;
      const multiplier = pickup.includes("CDG") && dropoff.includes("Disney") ? 1.6 : 1.2;
      const paxFactor = passengers > 4 ? 1.4 : 1;
      setEstimatedPrice(Math.round(base * multiplier * paxFactor * 1.15));
      setCalculating(false);
    }, 600);
  };

  const spot = PARIS_SPOTS[activeCard];

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Space+Grotesk:wght@400;500;600;700;800&family=Space+Mono:wght@400;700&display=swap');

        :root {
          --bg:         #FFFFFF;
          --surface:    #F5F5F5;
          --surface2:   #EEEEEE;
          --border:     rgba(0,0,0,0.10);
          --border2:    rgba(0,0,0,0.18);
          --ink:        #080808;
          --dim:        rgba(0,0,0,0.62);
          --dim2:       rgba(0,0,0,0.40);
          --green:      #00A854;
          --green-dim:  rgba(0,168,84,0.10);
          --green-glow: rgba(0,168,84,0.22);
          --input-bg:   #F8F8F8;
          --input-hover:#F2F2F2;
          --focus-ring: rgba(0,168,84,0.28);
        }
        * { box-sizing: border-box; margin: 0; padding: 0; }

        .hero {
          min-height: 100vh;
          background: var(--bg);
          font-family: 'Space Grotesk', sans-serif;
          display: grid;
          grid-template-columns: 1fr 1fr;
          padding-top: 68px;
          overflow: hidden;
        }
        @media (max-width: 900px) {
          .hero { grid-template-columns: 1fr; }
          .hero-visual { display: none; }
        }

        .hero-left {
          display: flex; flex-direction: column; justify-content: center;
          padding: 72px 56px 72px 72px;
        }
        @media (max-width: 1100px) { .hero-left { padding: 56px 36px 56px 48px; } }
        @media (max-width: 900px)  { .hero-left { padding: 48px 24px; } }

        .hero-eyebrow { display: flex; align-items: center; gap: 10px; margin-bottom: 26px; animation: fadeUp 0.55s ease both; }
        .eyebrow-badge {
          display: inline-flex; align-items: center; gap: 7px;
          background: var(--green-dim); color: var(--green);
          font-family: 'Space Mono', monospace; font-size: 9.5px; font-weight: 700;
          letter-spacing: 0.12em; text-transform: uppercase;
          padding: 5px 12px; border-radius: 6px; border: 1px solid rgba(0,168,84,0.2);
        }
        .eyebrow-dot {
          width: 6px; height: 6px; background: var(--green);
          border-radius: 50%; flex-shrink: 0; animation: glow-pulse 2s ease-in-out infinite;
        }
        @keyframes glow-pulse {
          0%,100% { box-shadow: 0 0 4px var(--green-glow); }
          50%      { box-shadow: 0 0 10px var(--green-glow); }
        }
        .eyebrow-route { font-family: 'Space Mono', monospace; font-size: 9px; letter-spacing: 0.1em; color: var(--dim2); }

        .hero-h1 {
          font-size: clamp(40px, 5vw, 70px); font-weight: 800; color: var(--ink);
          line-height: 1.05; letter-spacing: -0.035em; margin-bottom: 18px; animation: fadeUp 0.6s 0.08s ease both;
        }
        .h1-highlight { color: var(--green); }
        .hero-sub {
          font-size: 16px; font-weight: 500; color: var(--dim); line-height: 1.65;
          max-width: 400px; margin-bottom: 44px; animation: fadeUp 0.6s 0.14s ease both;
        }

        .form-wrap { animation: fadeUp 0.6s 0.22s ease both; }
        .form-label-row {
          font-family: 'Space Mono', monospace; font-size: 9.5px; font-weight: 700;
          letter-spacing: 0.18em; text-transform: uppercase; color: var(--ink); margin-bottom: 14px;
        }
        .form-stack { display: flex; flex-direction: column; gap: 8px; margin-bottom: 12px; }
        .form-row {
          display: flex; align-items: center; background: var(--input-bg);
          border: 1.5px solid var(--border); border-radius: 12px; overflow: hidden;
          transition: border-color 0.2s, background 0.2s, box-shadow 0.2s;
        }
        .form-row:hover { background: var(--input-hover); border-color: var(--border2); }
        .form-row:focus-within { border-color: var(--green); background: #fff; box-shadow: 0 0 0 3px var(--focus-ring); }
        .form-icon {
          width: 52px; height: 56px; display: flex; align-items: center; justify-content: center;
          flex-shrink: 0; color: var(--dim2); transition: color 0.2s;
        }
        .form-row:focus-within .form-icon { color: var(--green); }
        .form-icon svg { width: 18px; height: 18px; }
        .form-icon-sep { width: 1px; height: 28px; background: var(--border); flex-shrink: 0; }
        .form-field { flex: 1; display: flex; flex-direction: column; padding: 10px 16px; }
        .field-label {
          font-family: 'Space Mono', monospace; font-size: 8px; font-weight: 700;
          letter-spacing: 0.14em; text-transform: uppercase; color: var(--dim2); margin-bottom: 3px; transition: color 0.2s;
        }
        .form-row:focus-within .field-label { color: var(--green); }
        .field-input {
          background: none; border: none; outline: none;
          font-family: 'Space Grotesk', sans-serif; font-size: 15px; font-weight: 700;
          color: var(--ink); width: 100%; appearance: none; -webkit-appearance: none; cursor: pointer;
        }
        .field-input::placeholder { color: rgba(0,0,0,0.22); font-weight: 500; }
        .field-input option { background: white; color: var(--ink); }
        input[type="date"].field-input::-webkit-calendar-picker-indicator { opacity: 0.3; cursor: pointer; }
        .form-row-split { display: grid; grid-template-columns: 1fr 1fr; gap: 8px; }
        .form-actions { display: flex; gap: 10px; margin-top: 4px; }
        .btn-estimate {
          flex: 1; background: var(--green); color: #fff; border: none; border-radius: 12px;
          font-family: 'Space Grotesk', sans-serif; font-size: 15px; font-weight: 700;
          letter-spacing: -0.01em; padding: 15px 24px; cursor: pointer;
          display: flex; align-items: center; justify-content: center; gap: 8px;
          transition: background 0.2s, box-shadow 0.2s, transform 0.15s; position: relative; overflow: hidden;
        }
        .btn-estimate::before {
          content: ''; position: absolute; inset: 0;
          background: linear-gradient(135deg, rgba(255,255,255,0.15) 0%, transparent 60%); pointer-events: none;
        }
        .btn-estimate:hover:not(:disabled) { background: #008F47; box-shadow: 0 4px 20px var(--green-glow); transform: translateY(-1px); }
        .btn-estimate:disabled { opacity: 0.38; cursor: not-allowed; }
        .btn-reserve {
          padding: 15px 24px; border-radius: 12px; border: 1.5px solid var(--border2);
          background: var(--surface); font-family: 'Space Grotesk', sans-serif;
          font-size: 15px; font-weight: 700; color: var(--dim); cursor: pointer;
          text-decoration: none; display: flex; align-items: center; white-space: nowrap;
          transition: border-color 0.2s, color 0.2s, background 0.2s;
        }
        .btn-reserve:hover { border-color: var(--ink); color: var(--ink); background: var(--surface2); }
        .price-result {
          margin-top: 10px; padding: 20px 24px; border: 1.5px solid var(--green); border-radius: 12px;
          background: rgba(0,168,84,0.04); display: flex; align-items: center;
          justify-content: space-between; gap: 16px; animation: fadeUp 0.35s ease both;
        }
        .price-tag {
          font-family: 'Space Mono', monospace; font-size: 8.5px; font-weight: 700;
          letter-spacing: 0.14em; color: var(--green); text-transform: uppercase; margin-bottom: 5px;
        }
        .price-number { font-size: 48px; font-weight: 800; color: var(--ink); line-height: 1; letter-spacing: -0.04em; }
        .price-note { font-family: 'Space Mono', monospace; font-size: 9.5px; color: var(--dim2); line-height: 1.8; text-align: right; letter-spacing: 0.04em; }
        .trust-strip { display: flex; gap: 20px; margin-top: 32px; flex-wrap: wrap; animation: fadeUp 0.6s 0.30s ease both; }
        .trust-item {
          display: flex; align-items: center; gap: 7px;
          font-family: 'Space Mono', monospace; font-size: 9px; font-weight: 700;
          letter-spacing: 0.1em; color: var(--dim2); text-transform: uppercase;
        }
        .trust-dot { width: 5px; height: 5px; border-radius: 50%; background: var(--green); flex-shrink: 0; box-shadow: 0 0 4px var(--green-glow); }

        /* RIGHT PANEL */
        .hero-visual {
          background: #FFFFFF; display: flex; flex-direction: column;
          padding: 48px 40px 40px 32px; overflow-y: auto;
        }
        .visual-header { margin-bottom: 20px; flex-shrink: 0; }
        .visual-label {
          font-family: 'Space Mono', monospace; font-size: 9px; font-weight: 700;
          letter-spacing: 0.18em; text-transform: uppercase; color: var(--dim2); margin-bottom: 6px; display: block;
        }
        .visual-title { font-size: 22px; font-weight: 800; color: var(--ink); letter-spacing: -0.03em; line-height: 1.1; }
        .visual-title span { color: var(--green); }
        .spots-nav { display: flex; gap: 6px; flex-wrap: wrap; margin-bottom: 16px; flex-shrink: 0; }
        .spot-pill {
          padding: 6px 12px; border-radius: 100px; font-family: 'Space Mono', monospace;
          font-size: 8.5px; font-weight: 700; letter-spacing: 0.1em; text-transform: uppercase;
          border: 1.5px solid var(--border2); background: white; color: var(--dim2);
          cursor: pointer; transition: all 0.18s;
        }
        .spot-pill:hover { border-color: var(--ink); color: var(--ink); }
        .spot-pill.active { background: var(--ink); color: white; border-color: var(--ink); }

        .spot-card-main {
          position: relative; border-radius: 18px; overflow: hidden;
          height: 240px; cursor: pointer; flex-shrink: 0;
          box-shadow: 0 8px 40px rgba(0,0,0,0.12);
          transition: transform 0.3s ease, box-shadow 0.3s ease;
        }
        .spot-card-main:hover { transform: translateY(-3px); box-shadow: 0 16px 56px rgba(0,0,0,0.18); }
        .spot-card-img { position: absolute; inset: 0; background-size: cover; background-position: center; transition: transform 0.5s ease; }
        .spot-card-main:hover .spot-card-img { transform: scale(1.04); }
        .spot-card-overlay { position: absolute; inset: 0; background: linear-gradient(to top, rgba(0,0,0,0.82) 0%, rgba(0,0,0,0.3) 45%, transparent 75%); }
        .spot-card-content { position: absolute; bottom: 0; left: 0; right: 0; padding: 20px; }
        .spot-card-tag {
          display: inline-flex; align-items: center; padding: 4px 10px; border-radius: 100px;
          font-family: 'Space Mono', monospace; font-size: 8px; font-weight: 700;
          letter-spacing: 0.12em; text-transform: uppercase; color: white;
          margin-bottom: 8px; backdrop-filter: blur(8px);
        }
        .spot-card-name { font-size: 22px; font-weight: 800; color: white; letter-spacing: -0.03em; line-height: 1.05; margin-bottom: 3px; }
        .spot-card-area { font-family: 'Space Mono', monospace; font-size: 9px; color: rgba(255,255,255,0.6); letter-spacing: 0.08em; margin-bottom: 8px; }
        .spot-card-desc { font-size: 12px; font-weight: 500; color: rgba(255,255,255,0.82); line-height: 1.5; margin-bottom: 12px; }
        .spot-card-footer { display: flex; align-items: center; justify-content: space-between; }
        .spot-card-time { display: flex; align-items: center; gap: 6px; font-family: 'Space Mono', monospace; font-size: 9px; color: rgba(255,255,255,0.55); letter-spacing: 0.06em; }
        .spot-card-time svg { width: 12px; height: 12px; }
        .spot-card-fare {
          background: rgba(255,255,255,0.15); backdrop-filter: blur(8px);
          border: 1px solid rgba(255,255,255,0.22); border-radius: 8px; padding: 5px 10px;
          font-family: 'Space Mono', monospace; font-size: 10px; font-weight: 700; color: white; letter-spacing: 0.06em;
        }

        .spot-mini-strip { display: flex; gap: 8px; margin-top: 10px; flex-shrink: 0; }
        .spot-mini {
          flex: 1; border-radius: 10px; overflow: hidden; height: 60px; cursor: pointer;
          position: relative; border: 2px solid transparent; transition: border-color 0.18s, transform 0.18s;
        }
        .spot-mini:hover { transform: translateY(-2px); }
        .spot-mini.active { border-color: var(--green); }
        .spot-mini-img { position: absolute; inset: 0; background-size: cover; background-position: center; }
        .spot-mini-overlay { position: absolute; inset: 0; background: rgba(0,0,0,0.38); transition: background 0.18s; }
        .spot-mini:hover .spot-mini-overlay, .spot-mini.active .spot-mini-overlay { background: rgba(0,0,0,0.18); }
        .spot-mini-label { position: absolute; bottom: 5px; left: 6px; right: 6px; font-size: 8px; font-weight: 700; color: white; white-space: nowrap; overflow: hidden; text-overflow: ellipsis; }

        /* 3-STEP SECTION */
        .steps-section {
          margin-top: 18px; flex-shrink: 0;
          padding: 24px 26px;
          background: var(--surface);
          border-radius: 16px;
          border: 1.5px solid var(--border);
        }
        .steps-top {
          display: flex; align-items: center; justify-content: space-between; margin-bottom: 22px;
        }
        .steps-heading { font-size: 17px; font-weight: 800; color: var(--ink); letter-spacing: -0.02em; }
        .steps-mono {
          font-family: 'Space Mono', monospace; font-size: 10px; font-weight: 700;
          letter-spacing: 0.14em; text-transform: uppercase; color: var(--green);
        }
        .steps-row { display: flex; align-items: flex-start; }
        .step-item { flex: 1; display: flex; flex-direction: column; align-items: center; text-align: center; }
        .step-track { display: flex; align-items: center; width: 100%; margin-bottom: 12px; }
        .step-line { flex: 1; height: 1.5px; background: var(--border2); }
        .step-line.hidden { background: transparent; }
        .step-circle {
          width: 38px; height: 38px; border-radius: 50%;
          background: var(--green); color: white;
          font-family: 'Space Mono', monospace; font-size: 11px; font-weight: 700;
          display: flex; align-items: center; justify-content: center; flex-shrink: 0;
          box-shadow: 0 2px 10px var(--green-glow);
        }
        .step-body { padding: 0 8px; }
        .step-title { font-size: 14px; font-weight: 800; color: var(--ink); margin-bottom: 5px; letter-spacing: -0.02em; }
        .step-desc { font-size: 12.5px; font-weight: 500; color: var(--dim); line-height: 1.6; }

        .spinner {
          width: 14px; height: 14px; border: 2px solid rgba(255,255,255,0.35);
          border-top-color: white; border-radius: 50%; animation: spin 0.6s linear infinite; flex-shrink: 0;
        }
        @keyframes fadeUp { from { opacity: 0; transform: translateY(18px); } to { opacity: 1; transform: translateY(0); } }
        @keyframes spin { to { transform: rotate(360deg); } }
        @keyframes cardIn { from { opacity: 0; transform: translateY(10px) scale(0.98); } to { opacity: 1; transform: translateY(0) scale(1); } }
        .card-anim { animation: cardIn 0.3s ease both; }
      `}</style>

      <section className="hero">

        {/* LEFT */}
        <div className="hero-left">
          <div className="hero-eyebrow">
            <span className="eyebrow-badge">
              <span className="eyebrow-dot" />Paris Transfers
            </span>
            <span className="eyebrow-route">CDG · Orly · Disney · Versailles</span>
          </div>

          <h1 className="hero-h1">
            Every journey,<br />
            <span className="h1-highlight">effortless.</span>
          </h1>

          <p className="hero-sub">
            Private airport transfers and day trips around Paris — handled with care, fixed pricing, and a driver who actually shows up.
          </p>

          <div className="form-wrap">
            <div className="form-label-row">Get an instant estimate</div>
            <div className="form-stack">
              <div className="form-row">
                <div className="form-icon">
                  <svg fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2.2">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"/>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"/>
                  </svg>
                </div>
                <div className="form-icon-sep" />
                <div className="form-field">
                  <span className="field-label">From</span>
                  <select value={pickup} onChange={e => { setPickup(e.target.value); setEstimatedPrice(null); }} className="field-input">
                    <option value="">Select pickup…</option>
                    <option value="CDG">Charles de Gaulle (CDG)</option>
                    <option value="Orly">Orly Airport</option>
                    <option value="Beauvais">Beauvais–Tillé Airport</option>
                    <option value="Paris">Paris City Centre</option>
                  </select>
                </div>
              </div>

              <div className="form-row">
                <div className="form-icon">
                  <svg fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2.2">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6"/>
                  </svg>
                </div>
                <div className="form-icon-sep" />
                <div className="form-field">
                  <span className="field-label">To</span>
                  <select value={dropoff} onChange={e => { setDropoff(e.target.value); setEstimatedPrice(null); }} className="field-input">
                    <option value="">Select destination…</option>
                    <option value="Disney">Disneyland Paris</option>
                    <option value="Versailles">Versailles Palace</option>
                    <option value="Paris">Paris City / Hotel</option>
                    <option value="CDG">Charles de Gaulle (CDG)</option>
                    <option value="Orly">Orly Airport</option>
                  </select>
                </div>
              </div>

              <div className="form-row-split">
                <div className="form-row">
                  <div className="form-icon">
                    <svg fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2.2">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"/>
                    </svg>
                  </div>
                  <div className="form-icon-sep" />
                  <div className="form-field">
                    <span className="field-label">Date</span>
                    <input type="date" value={date} onChange={e => setDate(e.target.value)} className="field-input" />
                  </div>
                </div>
                <div className="form-row">
                  <div className="form-icon">
                    <svg fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2.2">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0z"/>
                    </svg>
                  </div>
                  <div className="form-icon-sep" />
                  <div className="form-field">
                    <span className="field-label">Passengers</span>
                    <input type="number" min={1} max={8} value={passengers}
                      onChange={e => { setPassengers(Number(e.target.value)); setEstimatedPrice(null); }}
                      className="field-input" placeholder="1" />
                  </div>
                </div>
              </div>
            </div>

            <div className="form-actions">
              <button onClick={calculatePrice} disabled={!pickup || !dropoff || calculating} className="btn-estimate">
                {calculating ? <><div className="spinner" />Calculating…</> : <>Estimate price →</>}
              </button>
              <a href="/reservation" className="btn-reserve">Reserve now</a>
            </div>

            {estimatedPrice && (
              <div className="price-result">
                <div>
                  <div className="price-tag">Estimated fare</div>
                  <div className="price-number">€{estimatedPrice}</div>
                </div>
                <div className="price-note">
                  No prepayment required<br />
                  Pay after · No hidden fees
                </div>
              </div>
            )}
          </div>

          <div className="trust-strip">
            {["Fixed pricing", "Pay on arrival", "Free cancellation", "24 / 7"].map(t => (
              <div key={t} className="trust-item"><span className="trust-dot" />{t}</div>
            ))}
          </div>
        </div>

        {/* RIGHT */}
        <div className="hero-visual">

          <div className="visual-header">
            <span className="visual-label">Popular destinations</span>
            <div className="visual-title">Where will <span>Paris</span><br />take you?</div>
          </div>

          <div className="spots-nav">
            {PARIS_SPOTS.map((s, i) => (
              <button
                key={s.id}
                className={"spot-pill" + (activeCard === i ? " active" : "")}
                onClick={() => setActiveCard(i)}
              >
                {s.name.split(" ")[0]}
              </button>
            ))}
          </div>

          <div key={spot.id} className="spot-card-main card-anim">
            <div className="spot-card-img" style={{ backgroundImage: "url(" + spot.img + ")" }} />
            <div className="spot-card-overlay" />
            <div className="spot-card-content">
              <div className="spot-card-tag" style={{ background: spot.tagColor + "CC" }}>
                {spot.tag}
              </div>
              <div className="spot-card-name">{spot.name}</div>
              <div className="spot-card-area">{spot.area}</div>
              <div className="spot-card-desc">{spot.desc}</div>
              <div className="spot-card-footer">
                <div className="spot-card-time">
                  <svg fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2.5">
                    <circle cx="12" cy="12" r="10" /><path strokeLinecap="round" d="M12 6v6l4 2" />
                  </svg>
                  {spot.time}
                </div>
                <div className="spot-card-fare">{spot.fare}</div>
              </div>
            </div>
          </div>

          <div className="spot-mini-strip">
            {PARIS_SPOTS.map((s, i) => (
              <div
                key={s.id}
                className={"spot-mini" + (activeCard === i ? " active" : "")}
                onClick={() => setActiveCard(i)}
              >
                <div className="spot-mini-img" style={{ backgroundImage: "url(" + s.img + ")" }} />
                <div className="spot-mini-overlay" />
                <div className="spot-mini-label">{s.name.split(" ")[0]}</div>
              </div>
            ))}
          </div>

          {/* 3-STEP BOOKING PROCESS */}
          <div className="steps-section">
            <div className="steps-top">
              <span className="steps-heading">How to book your ride</span>
              <span className="steps-mono">3 easy steps</span>
            </div>
            <div className="steps-row">
              {STEPS.map((step, i) => (
                <div key={step.num} className="step-item">
                  <div className="step-track">
                    <div className={"step-line" + (i === 0 ? " hidden" : "")} />
                    <div className="step-circle">{step.num}</div>
                    <div className={"step-line" + (i === STEPS.length - 1 ? " hidden" : "")} />
                  </div>
                  <div className="step-body">
                    <div className="step-title">{step.title}</div>
                    <div className="step-desc">{step.desc}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>

        </div>
      </section>
    </>
  );
}