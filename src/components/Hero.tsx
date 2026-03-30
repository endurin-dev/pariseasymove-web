"use client";
import { useState, useEffect } from "react";

interface Rate {
  fromLocId: string; toLocId: string; vehicleId: string;
  p1: number|null; p2: number|null; p3: number|null; p4: number|null;
  p5: number|null; p6: number|null; p7: number|null; p8: number|null;
  onDemand: boolean; active: boolean;
}
interface Location {
  id: string; name: string; categoryIcon: string; categoryName: string; active: boolean;
}

export default function HeroSection() {
  const [tripType, setTripType] = useState<"one-way"|"round-trip">("one-way");
  const [fromId, setFromId] = useState("");
  const [toId, setToId] = useState("");
  const [date, setDate] = useState("");
  const [time, setTime] = useState("");
  const [adults, setAdults] = useState(1);
  const [kids, setKids] = useState(0);
  const [showPrice, setShowPrice] = useState(false);
  const [locations, setLocations] = useState<Location[]>([]);
  const [allRates, setAllRates] = useState<Rate[]>([]);

  useEffect(() => {
    Promise.all([fetch("/api/locations"), fetch("/api/rates")])
      .then(async ([lr, rr]) => {
        if (lr.ok) { const d = await lr.json(); setLocations(d.filter((l:any) => l.active)); }
        if (rr.ok) { const d = await rr.json(); setAllRates(d.filter((r:any) => r.active)); }
      }).catch(() => {});
  }, []);

  const grouped = locations.reduce<Record<string, Location[]>>((acc, l) => {
    const k = `${l.categoryIcon} ${l.categoryName}`;
    if (!acc[k]) acc[k] = [];
    acc[k].push(l);
    return acc;
  }, {});

  const fromName = locations.find(l => l.id === fromId)?.name ?? "";
  const toName   = locations.find(l => l.id === toId)?.name   ?? "";
  const totalPax = adults + kids;

  const getLowestPrice = (): number | null => {
    if (!fromId || !toId) return null;
    const routeRates = allRates.filter(r =>
      r.fromLocId === fromId && r.toLocId === toId && !r.onDemand
    );
    if (routeRates.length === 0) return null;
    const pax = Math.min(totalPax, 9);
    const prices: number[] = [];
    routeRates.forEach(r => {
      let p: number|null = null;
      if (pax >= 9) p = r.p8 ? r.p8 * 2 : null;
      else {
        const map: Record<number, number|null> = {1:r.p1,2:r.p2,3:r.p3,4:r.p4,5:r.p5,6:r.p6,7:r.p7,8:r.p8};
        p = map[pax] ?? null;
      }
      if (p !== null) prices.push(p);
    });
    if (prices.length === 0) return null;
    const base = Math.min(...prices);
    return tripType === "round-trip" ? base * 2 : base;
  };

  const lowestPrice = getLowestPrice();
  const isOnDemand  = !!(fromId && toId && lowestPrice === null &&
    allRates.some(r => r.fromLocId===fromId && r.toLocId===toId && r.onDemand));

  const bookingUrl = () => {
    const params = new URLSearchParams();
    if (fromId) params.set("from", fromId);
    if (toId)   params.set("to",   toId);
    if (date)   params.set("date", date);
    if (time)   params.set("time", time);
    params.set("passengers", String(adults));
    params.set("kids",       String(kids));
    params.set("tripType",   tripType);
    return `/reservation?${params.toString()}`;
  };

  return (
    <div className="hero-root">
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,300;0,400;0,500;0,600;0,700;1,300;1,400;1,500&family=DM+Sans:wght@300;400;500;600&display=swap');

        /* ── CSS variables ── */
        .hero-root {
          --h-ink:           #0c0d0f;
          --h-ink-soft:      #16181d;
          --h-gold:          #c9a84c;
          --h-gold-light:    #e8c97a;
          --h-gold-pale:     rgba(201,168,76,0.12);
          --h-gold-glow:     rgba(201,168,76,0.22);
          --h-ivory:         #f5f0e8;
          --h-ivory-dim:     rgba(245,240,232,0.72);
          --h-ivory-faint:   rgba(245,240,232,0.38);
          --h-stroke:        rgba(245,240,232,0.10);
          --h-stroke-gold:   rgba(201,168,76,0.28);
          --h-ease:          cubic-bezier(0.25,0.1,0.25,1);
        }

        .hero-root *, .hero-root *::before, .hero-root *::after {
          box-sizing: border-box; margin: 0; padding: 0;
        }

        /* ════════════════════════════════════════════════════
           HERO WRAPPER
           min-height: 100dvh so it always fills the viewport
           on every screen size without cutting content
        ════════════════════════════════════════════════════ */
        .hero {
          position: relative;
          min-height: 100dvh;           /* full viewport, respects mobile chrome */
          background: var(--h-ink);
          overflow: hidden;
          font-family: 'DM Sans', sans-serif;
          color: var(--h-ivory);
          display: flex;
          flex-direction: column;
        }

        /* ── Background layers ── */
        .hero-bg { position: absolute; inset: 0; z-index: 0; }
        .hero-bg-img {
          position: absolute; inset: 0;
          background: url('/images/banner.webp') center / cover no-repeat;
          opacity: .28;
        }
        .hero-bg-vignette {
          position: absolute; inset: 0;
          background:
            radial-gradient(ellipse 80% 70%  at 50% 110%, rgba(12,13,15,.95)  0%, transparent 70%),
            radial-gradient(ellipse 100% 100% at 100% 50%, rgba(12,13,15,.70) 0%, transparent 60%),
            radial-gradient(ellipse 50%  60%  at 0%   50%, rgba(12,13,15,.50) 0%, transparent 70%);
        }
        .hero-bg-noise {
          position: absolute; inset: 0; opacity: .035;
          background-image: url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E");
          background-size: 200px;
        }
        /* decorative vertical rule — only on very wide screens */
        .hero-bg-rule {
          position: absolute; top: 0; right: 30%; width: 1px; height: 100%;
          background: linear-gradient(180deg, transparent 0%, var(--h-stroke-gold) 30%, var(--h-stroke-gold) 70%, transparent 100%);
        }

        /* ════════════════════════════════════════════════════
           MAIN BODY  (left copy + right card, side-by-side)
           padding-top accounts for the fixed header (~90px)
        ════════════════════════════════════════════════════ */
        .hero-body {
          position: relative; z-index: 1;
          flex: 1;
          display: flex;
          align-items: center;          /* vertically centre both columns */
          padding: 110px 5vw 48px;      /* top = header height + breathing room */
          max-width: 1480px;
          margin: 0 auto;
          width: 100%;
          gap: 4vw;
        }

        /* ── Left copy column ── */
        .hero-left {
          flex: 1 1 0;                  /* grow to fill remaining space */
          min-width: 0;                 /* allow shrink below natural size */
          max-width: 680px;
          animation: fadeUp .9s var(--h-ease) both;
        }

        @keyframes fadeUp {
          from { opacity: 0; transform: translateY(28px); }
          to   { opacity: 1; transform: translateY(0); }
        }

        .eyebrow {
          display: inline-flex; align-items: center; gap: 12px;
          margin-bottom: 24px;
          animation: fadeUp .9s .1s var(--h-ease) both;
        }
        .eyebrow-line { width: 32px; height: 1px; background: var(--h-gold); }
        .eyebrow-text {
          font-size: 10.5px; font-weight: 500;
          letter-spacing: .22em; text-transform: uppercase; color: var(--h-gold);
        }

        .hero-h1 {
          font-family: 'Cormorant Garamond', serif;
          /* clamp: 42px floor → fluid → 82px ceiling */
          font-size: clamp(42px, 5.8vw, 82px);
          font-weight: 400; line-height: .96; letter-spacing: -.01em;
          margin-bottom: 10px;
          animation: fadeUp .9s .15s var(--h-ease) both;
        }
        .hero-h1 em { font-style: italic; color: var(--h-gold); font-weight: 300; }

        .hero-h1-sub {
          font-family: 'Cormorant Garamond', serif;
          font-size: clamp(28px, 3.6vw, 52px);
          font-weight: 300; line-height: 1.1;
          color: var(--h-ivory-dim); margin-bottom: 32px; letter-spacing: .01em;
          animation: fadeUp .9s .2s var(--h-ease) both;
        }

        .hero-rule {
          width: 56px; height: 1px;
          background: linear-gradient(90deg, var(--h-gold), transparent);
          margin-bottom: 24px;
          animation: fadeUp .9s .25s var(--h-ease) both;
        }

        .hero-desc {
          font-size: 14.5px; font-weight: 300; line-height: 1.78;
          color: var(--h-ivory-faint); max-width: 440px; margin-bottom: 36px;
          animation: fadeUp .9s .3s var(--h-ease) both;
        }
        .hero-desc strong { color: var(--h-ivory-dim); font-weight: 400; }

        /* ── Stat pillars ── */
        .pillars {
          display: flex; flex-wrap: wrap; gap: 0; margin-bottom: 36px;
          border: 1px solid var(--h-stroke); border-radius: 4px; overflow: hidden;
          animation: fadeUp .9s .35s var(--h-ease) both;
        }
        .pillar {
          flex: 1; min-width: 110px; padding: 14px 18px;
          border-right: 1px solid var(--h-stroke);
          display: flex; flex-direction: column; gap: 4px;
          transition: background .25s;
        }
        .pillar:last-child { border-right: none; }
        .pillar:hover { background: var(--h-gold-pale); }
        .pillar-value {
          font-family: 'Cormorant Garamond', serif;
          font-size: clamp(20px, 2.2vw, 26px);
          font-weight: 500; color: var(--h-gold); line-height: 1;
        }
        .pillar-label {
          font-size: 10.5px; font-weight: 400;
          letter-spacing: .10em; text-transform: uppercase; color: var(--h-ivory-faint);
        }

        /* ── CTA row ── */
        .hero-ctas {
          display: flex; gap: 14px; flex-wrap: wrap;
          animation: fadeUp .9s .4s var(--h-ease) both;
        }
        .cta-primary {
          display: inline-flex; align-items: center; gap: 10px;
          background: var(--h-gold); color: var(--h-ink);
          font-size: 11.5px; font-weight: 600; letter-spacing: .16em; text-transform: uppercase;
          text-decoration: none; padding: 13px 28px; border-radius: 2px;
          transition: background .25s, transform .2s, box-shadow .25s;
          box-shadow: 0 4px 24px rgba(201,168,76,.25);
          white-space: nowrap;
        }
        .cta-primary:hover { background: var(--h-gold-light); transform: translateY(-2px); box-shadow: 0 8px 32px rgba(201,168,76,.35); }
        .cta-ghost {
          display: inline-flex; align-items: center; gap: 10px;
          background: transparent; color: var(--h-ivory-dim);
          font-size: 11.5px; font-weight: 400; letter-spacing: .16em; text-transform: uppercase;
          text-decoration: none; padding: 12px 24px;
          border: 1px solid var(--h-stroke); border-radius: 2px;
          transition: border-color .25s, color .25s, background .25s;
          white-space: nowrap;
        }
        .cta-ghost:hover { border-color: var(--h-stroke-gold); color: var(--h-gold); background: var(--h-gold-pale); }

        /* ════════════════════════════════════════════════════
           BOOKING CARD  — fixed intrinsic width, never shrinks
           below 300px, never grows beyond 400px
        ════════════════════════════════════════════════════ */
        .booking-wrap {
          flex: 0 0 clamp(300px, 27vw, 400px);   /* fixed flex-basis, no shrink/grow */
          width:   clamp(300px, 27vw, 400px);
          animation: fadeUp .9s .2s var(--h-ease) both;
        }

        .booking-card {
          border-radius: 18px; overflow: hidden;
          backdrop-filter: blur(40px) saturate(180%);
          -webkit-backdrop-filter: blur(40px) saturate(180%);
          border: 1px solid rgba(255,255,255,.08);
          background: rgba(10,11,14,.84);
        }

        /* Card header band */
        .card-band {
          position: relative; padding: 20px 22px 18px;
          border-bottom: 1px solid rgba(255,255,255,.10);
          background: rgba(255,255,255,.07);
          backdrop-filter: blur(24px) saturate(200%) brightness(1.15);
          -webkit-backdrop-filter: blur(24px) saturate(200%) brightness(1.15);
          overflow: hidden;
        }
        .card-band::before {
          content: ''; position: absolute; top: 0; left: 0; right: 0; height: 52%;
          background: linear-gradient(180deg, rgba(255,255,255,.13) 0%, rgba(255,255,255,.04) 60%, transparent 100%);
          border-radius: 18px 18px 60% 60% / 0px 0px 24px 24px;
          pointer-events: none;
        }
        .card-band::after {
          content: ''; position: absolute; bottom: 0; left: 0; right: 0; height: 1px;
          background: linear-gradient(90deg, transparent, rgba(255,255,255,.22), transparent);
          pointer-events: none;
        }
        .card-band-label {
          position: relative; font-size: 9.5px; font-weight: 600;
          letter-spacing: .22em; text-transform: uppercase; color: var(--h-gold); margin-bottom: 3px;
        }
        .card-band-title {
          position: relative;
          font-family: 'Cormorant Garamond', serif;
          font-size: 26px; font-weight: 600; color: var(--h-ivory); line-height: 1;
        }

        /* Trip-type tabs */
        .ttabs { display: flex; gap: 6px; padding: 16px 20px 0; }
        .ttab {
          flex: 1; padding: 7px 4px; font-size: 10.5px; font-weight: 500;
          letter-spacing: .10em; text-transform: uppercase; text-align: center;
          color: var(--h-ivory-faint); cursor: pointer;
          border-radius: 100px; border: 1px solid var(--h-stroke);
          transition: all .22s var(--h-ease);
        }
        .ttab:hover { color: var(--h-ivory-dim); border-color: var(--h-stroke-gold); }
        .ttab.active { background: var(--h-gold); border-color: var(--h-gold); color: var(--h-ink); font-weight: 600; }

        /* Card body — tighter padding so it never overflows */
        .card-body { padding: 14px 20px 20px; }

        /* Route block */
        .route-block {
          background: rgba(255,255,255,.04);
          border: 1px solid var(--h-stroke);
          border-radius: 12px; overflow: hidden; margin-bottom: 12px;
        }
        .route-row {
          display: flex; align-items: center;
          padding: 11px 14px; gap: 10px; transition: background .18s;
        }
        .route-row:hover { background: rgba(255,255,255,.03); }
        .route-row + .route-row { border-top: 1px solid var(--h-stroke); }
        .route-icon { width: 18px; height: 18px; display: flex; align-items: center; justify-content: center; flex-shrink: 0; }
        .route-label { font-size: 9.5px; font-weight: 500; letter-spacing: .16em; text-transform: uppercase; color: var(--h-ivory-faint); flex-shrink: 0; width: 32px; text-align: right; }
        .route-select {
          flex: 1; min-width: 0;           /* allow text to truncate */
          background: transparent; border: none; outline: none;
          font-family: 'DM Sans', sans-serif; font-size: 13px; font-weight: 300;
          color: var(--h-ivory); appearance: none; -webkit-appearance: none;
          cursor: pointer; overflow: hidden; text-overflow: ellipsis; white-space: nowrap;
        }
        .route-select option    { background: #16181d; color: #f5f0e8; }
        .route-select optgroup  { background: #0a1f44; color: rgba(245,240,232,.5); font-size: 11px; }

        /* Date / time row */
        .card-row { display: grid; grid-template-columns: 1fr 1fr; gap: 8px; margin-bottom: 10px; }
        .mini-field {
          background: rgba(255,255,255,.04);
          border: 1px solid var(--h-stroke); border-radius: 10px;
          padding: 9px 12px; display: flex; align-items: center; gap: 8px;
          transition: border-color .2s;
        }
        .mini-field:focus-within { border-color: var(--h-stroke-gold); }
        .mini-field-icon { width: 15px; height: 15px; flex-shrink: 0; display: flex; align-items: center; justify-content: center; opacity: .55; }
        .mini-field-inner { display: flex; flex-direction: column; gap: 2px; flex: 1; min-width: 0; }
        .mini-field-label { font-size: 9px; font-weight: 500; letter-spacing: .18em; text-transform: uppercase; color: var(--h-ivory-faint); }
        .mini-field input {
          background: transparent; border: none; outline: none;
          font-family: 'DM Sans', sans-serif; font-size: 12.5px; font-weight: 400;
          color: var(--h-ivory); width: 100%; appearance: none; -webkit-appearance: none; padding: 0;
        }

        /* Passenger row */
        .pax-row { display: grid; grid-template-columns: 1fr 1fr; gap: 8px; margin-bottom: 14px; }
        .pax-block {
          background: rgba(255,255,255,.04);
          border: 1px solid var(--h-stroke); border-radius: 10px;
          padding: 9px 12px; display: flex; align-items: center; justify-content: space-between; gap: 6px;
        }
        .pax-icon { width: 15px; height: 15px; flex-shrink: 0; opacity: .5; display: flex; align-items: center; justify-content: center; }
        .pax-info { display: flex; flex-direction: column; gap: 1px; flex: 1; }
        .pax-label { font-size: 9px; font-weight: 500; letter-spacing: .16em; text-transform: uppercase; color: var(--h-ivory-faint); }
        .pax-val   { font-family: 'Cormorant Garamond', serif; font-size: 15px; font-weight: 500; color: var(--h-ivory); line-height: 1.2; }
        .pax-controls { display: flex; gap: 3px; align-items: center; }
        .pax-btn {
          width: 24px; height: 24px; border-radius: 50%;
          border: 1px solid var(--h-stroke-gold); background: transparent; color: var(--h-gold);
          font-size: 17px; line-height: 1; cursor: pointer;
          display: flex; align-items: center; justify-content: center;
          transition: background .18s, transform .15s; padding: 0;
        }
        .pax-btn:hover { background: var(--h-gold-pale); transform: scale(1.12); }

        /* Price panel */
        .price-panel {
          background: rgba(201,168,76,.08);
          border: 1px solid var(--h-stroke-gold); border-radius: 10px;
          padding: 12px 16px; margin-bottom: 10px;
          display: flex; align-items: center; justify-content: space-between;
          animation: priceFade .35s var(--h-ease) both;
        }
        @keyframes priceFade { from { opacity: 0; transform: translateY(6px); } to { opacity: 1; transform: translateY(0); } }
        .price-panel-label { font-size: 10.5px; font-weight: 500; letter-spacing: .14em; text-transform: uppercase; color: var(--h-ivory-faint); }
        .price-panel-amount { font-family: 'Cormorant Garamond', serif; font-size: 32px; font-weight: 600; color: var(--h-gold); line-height: 1; }
        .price-panel-amount sup { font-size: 14px; font-weight: 400; vertical-align: super; margin-right: 2px; }
        .price-panel-note   { font-size: 9.5px; color: var(--h-ivory-faint); margin-top: 2px; }
        .price-from-label   { font-size: 8.5px; text-transform: uppercase; letter-spacing: .1em; color: var(--h-gold); opacity: .6; margin-bottom: 1px; }

        /* Buttons */
        .card-submit {
          width: 100%; padding: 13px;
          background: var(--h-gold); border: none; border-radius: 10px;
          font-family: 'DM Sans', sans-serif; font-size: 11.5px; font-weight: 700;
          letter-spacing: .18em; text-transform: uppercase; color: var(--h-ink);
          cursor: pointer; display: flex; align-items: center; justify-content: center; gap: 10px;
          transition: background .22s, transform .2s;
        }
        .card-submit:hover { background: var(--h-gold-light); transform: translateY(-2px); }

        .card-submit-book {
          width: 100%; padding: 13px;
          background: transparent; border: 1.5px solid var(--h-gold); border-radius: 10px;
          font-family: 'DM Sans', sans-serif; font-size: 11.5px; font-weight: 700;
          letter-spacing: .18em; text-transform: uppercase; color: var(--h-gold);
          cursor: pointer; display: flex; align-items: center; justify-content: center; gap: 10px;
          transition: background .22s, color .22s, transform .2s; text-decoration: none;
        }
        .card-submit-book:hover { background: var(--h-gold); color: var(--h-ink); transform: translateY(-2px); }

        /* Trust notes */
        .card-note { display: flex; align-items: center; justify-content: center; gap: 14px; margin-top: 12px; flex-wrap: wrap; }
        .card-note-item { display: flex; align-items: center; gap: 5px; font-size: 10px; color: var(--h-ivory-faint); }

        /* Round-trip notice */
        .rt-notice {
          display: flex; align-items: center; gap: 8px;
          padding: 8px 12px; border-radius: 8px; margin-bottom: 10px;
          font-size: 10.5px; color: rgba(245,240,232,.5);
          background: rgba(245,158,11,.08); border: 1px solid rgba(245,158,11,.2);
        }
        .rt-notice strong { color: rgba(245,158,11,.8); }

        /* ════════════════════════════════════════════════════
           FOOTER BAR
        ════════════════════════════════════════════════════ */
        .hero-foot {
          position: relative; z-index: 1;
          padding: 20px 5vw; border-top: 1px solid var(--h-stroke);
          display: flex; align-items: center; justify-content: space-between;
          flex-wrap: wrap; gap: 16px;
          max-width: 1480px; margin: 0 auto; width: 100%;
        }
        .foot-phone {
          display: flex; align-items: center; gap: 12px;
          text-decoration: none; color: var(--h-ivory); transition: color .2s;
        }
        .foot-phone:hover { color: var(--h-gold); }
        .phone-icon {
          width: 34px; height: 34px; border: 1px solid var(--h-stroke-gold);
          border-radius: 50%; display: flex; align-items: center; justify-content: center; flex-shrink: 0;
        }
        .phone-detail { display: flex; flex-direction: column; }
        .phone-detail-label  { font-size: 9.5px; letter-spacing: .16em; text-transform: uppercase; color: var(--h-ivory-faint); }
        .phone-detail-number { font-family: 'Cormorant Garamond', serif; font-size: 17px; font-weight: 500; }
        .foot-badges { display: flex; gap: 20px; align-items: center; }
        .foot-badge  { display: flex; align-items: center; gap: 6px; font-size: 11px; color: var(--h-ivory-faint); }

        /* WhatsApp floating button */
        .wa-float {
          position: fixed; bottom: 28px; right: 28px; z-index: 999;
          width: 52px; height: 52px; background: #25D366; border-radius: 50%;
          display: flex; align-items: center; justify-content: center;
          box-shadow: 0 6px 24px rgba(0,0,0,.4); transition: transform .25s, box-shadow .25s;
        }
        .wa-float:hover { transform: scale(1.1) translateY(-2px); box-shadow: 0 12px 32px rgba(0,0,0,.5); }

        /* ════════════════════════════════════════════════════
           RESPONSIVE BREAKPOINTS
        ════════════════════════════════════════════════════ */

        /* ── Tablet: 768 – 1199px ── */
        @media (max-width: 1199px) {
          .hero-bg-rule { display: none; }

          .hero-body {
            flex-direction: column;
            align-items: flex-start;
            padding-top: 106px;      /* exact header height */
            padding-bottom: 36px;
            gap: 36px;
          }

          .hero-left { max-width: 100%; }

          /* Card goes full width up to 560px */
          .booking-wrap {
            flex: 0 0 auto;
            width: 100%;
            max-width: 560px;
          }

          .pillars { display: grid; grid-template-columns: repeat(4, 1fr); }
          .pillar  { border-right: 1px solid var(--h-stroke); border-bottom: none; }
          .pillar:last-child { border-right: none; }
        }

        /* ── Mobile: up to 767px ── */
        @media (max-width: 767px) {
          .hero-body {
            padding: 96px 4vw 32px;
            gap: 32px;
          }

          .hero-h1     { font-size: clamp(38px, 11vw, 56px); }
          .hero-h1-sub { font-size: clamp(24px, 7.5vw, 38px); margin-bottom: 22px; }
          .hero-desc   { font-size: 14px; margin-bottom: 28px; }

          /* 2×2 pillar grid on small screens */
          .pillars { display: grid; grid-template-columns: repeat(2, 1fr); margin-bottom: 28px; }
          .pillar  { border-right: none; border-bottom: 1px solid var(--h-stroke); }
          .pillar:nth-child(odd)           { border-right: 1px solid var(--h-stroke); }
          .pillar:nth-last-child(-n + 2)   { border-bottom: none; }

          .booking-wrap { max-width: 100%; }

          /* Stack CTAs vertically on tiny phones */
          .hero-ctas     { flex-direction: column; }
          .cta-primary,
          .cta-ghost     { justify-content: center; text-align: center; }

          /* Footer: hide badges, keep phone */
          .foot-badges { display: none; }
          .hero-foot   { padding: 16px 4vw; }
        }

        /* ── Very small phones: up to 400px ── */
        @media (max-width: 400px) {
          .hero-body   { padding: 90px 4vw 24px; }
          .card-body   { padding: 12px 14px 16px; }
          .card-row,
          .pax-row     { grid-template-columns: 1fr; gap: 8px; }
          .ttabs       { padding: 12px 14px 0; }
          .ttab        { font-size: 9.5px; padding: 6px 4px; }
          .wa-float    { bottom: 18px; right: 18px; width: 46px; height: 46px; }
        }
      `}</style>

      <section className="hero">
        <div className="hero-bg">
          <div className="hero-bg-img" />
          <div className="hero-bg-vignette" />
          <div className="hero-bg-noise" />
          <div className="hero-bg-rule" />
        </div>

        <div className="hero-body">

          {/* ══ Left copy column ══ */}
          <div className="hero-left">
            <div className="eyebrow">
              <div className="eyebrow-line" />
              <span className="eyebrow-text">Paris · CDG · Orly · Beauvais</span>
            </div>

            <h1 className="hero-h1">Arrive in<br /><em>Pure Elegance</em></h1>
            <div className="hero-h1-sub">Private Transfers<br />&amp; Disneyland Paris</div>
            <div className="hero-rule" />

            <p className="hero-desc">
              <strong>Door-to-door chauffeur service</strong> from all Paris airports.
              Fixed fares, complimentary child seats, and the assurance that your
              driver is waiting — however long your flight takes.
            </p>

            <div className="pillars">
              <div className="pillar"><span className="pillar-value">4.9★</span><span className="pillar-label">Guest Rating</span></div>
              <div className="pillar"><span className="pillar-value">Free</span><span className="pillar-label">Child Seats</span></div>
              <div className="pillar"><span className="pillar-value">Fixed</span><span className="pillar-label">Fare · No Surprises</span></div>
              <div className="pillar"><span className="pillar-value">24/7</span><span className="pillar-label">Support</span></div>
            </div>

            <div className="hero-ctas">
              <a href="/reservation" className="cta-primary">
                <svg width={15} height={15} viewBox="0 0 24 24" fill="var(--h-ink)">
                  <path d="M2.01 21L23 12 2.01 3 2 10l15 2-15 2z" />
                </svg>
                Book Transfer
              </a>
              <a href="/rates" className="cta-ghost">View All Rates</a>
            </div>
          </div>

          {/* ══ Booking card ══ */}
          <div className="booking-wrap">
            <div className="booking-card">

              <div className="card-band">
                <div className="card-band-label">Instant Booking</div>
                <div className="card-band-title">Your Transfer</div>
              </div>

              <div className="ttabs">
                {(["one-way", "round-trip"] as const).map(t => (
                  <div key={t} className={`ttab${tripType === t ? " active" : ""}`}
                    onClick={() => { setTripType(t); setShowPrice(false); }}>
                    {t === "one-way" ? "→ One Way" : "⇄ Round Trip"}
                  </div>
                ))}
              </div>

              <div className="card-body">
                {tripType === "round-trip" && (
                  <div className="rt-notice">
                    <svg width={13} height={13} viewBox="0 0 24 24" fill="rgba(245,158,11,0.7)">
                      <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm1 15h-2v-6h2v6zm0-8h-2V7h2v2z" />
                    </svg>
                    <span>Round trip = one-way <strong>× 2</strong>. Return details in notes.</span>
                  </div>
                )}

                {/* Route */}
                <div className="route-block">
                  <div className="route-row">
                    <div className="route-icon">
                      <svg width={15} height={15} viewBox="0 0 24 24" fill="var(--h-gold)">
                        <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5c-1.38 0-2.5-1.12-2.5-2.5S10.62 6.5 12 6.5s2.5 1.12 2.5 2.5S13.38 11.5 12 11.5z" />
                      </svg>
                    </div>
                    <span className="route-label">From</span>
                    <select className="route-select" value={fromId}
                      onChange={e => { setFromId(e.target.value); setShowPrice(false); }}>
                      <option value="">Select pickup…</option>
                      {Object.entries(grouped).map(([cat, locs]) => (
                        <optgroup key={cat} label={cat}>
                          {locs.filter(l => l.id !== toId).map(l => (
                            <option key={l.id} value={l.id}>{l.name}</option>
                          ))}
                        </optgroup>
                      ))}
                    </select>
                  </div>

                  <div className="route-row">
                    <div className="route-icon">
                      <svg width={15} height={15} viewBox="0 0 24 24" fill="none" stroke="var(--h-gold)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7z" />
                        <circle cx="12" cy="9" r="2.5" />
                      </svg>
                    </div>
                    <span className="route-label">To</span>
                    <select className="route-select" value={toId}
                      onChange={e => { setToId(e.target.value); setShowPrice(false); }}>
                      <option value="">Select drop-off…</option>
                      {Object.entries(grouped).map(([cat, locs]) => (
                        <optgroup key={cat} label={cat}>
                          {locs.filter(l => l.id !== fromId).map(l => (
                            <option key={l.id} value={l.id}>{l.name}</option>
                          ))}
                        </optgroup>
                      ))}
                    </select>
                  </div>
                </div>

                {/* Date & Time */}
                <div className="card-row">
                  <div className="mini-field">
                    <div className="mini-field-icon">
                      <svg width={15} height={15} viewBox="0 0 24 24" fill="var(--h-gold)">
                        <path d="M19 3h-1V1h-2v2H8V1H6v2H5c-1.1 0-2 .9-2 2v16c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2zm0 18H5V8h14v13zM7 10h5v5H7z" />
                      </svg>
                    </div>
                    <div className="mini-field-inner">
                      <span className="mini-field-label">Date</span>
                      <input type="date" value={date} min={new Date().toISOString().split("T")[0]}
                        onChange={e => setDate(e.target.value)} />
                    </div>
                  </div>
                  <div className="mini-field">
                    <div className="mini-field-icon">
                      <svg width={15} height={15} viewBox="0 0 24 24" fill="var(--h-gold)">
                        <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm.5 11H11V7h1.5v4.79l4.12 2.45-.75 1.26L12.5 13z" />
                      </svg>
                    </div>
                    <div className="mini-field-inner">
                      <span className="mini-field-label">Time</span>
                      <input type="time" value={time} onChange={e => setTime(e.target.value)} />
                    </div>
                  </div>
                </div>

                {/* Passengers */}
                <div className="pax-row">
                  <div className="pax-block">
                    <div className="pax-icon">
                      <svg width={15} height={15} viewBox="0 0 24 24" fill="var(--h-gold)">
                        <path d="M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm0 2c-2.67 0-8 1.34-8 4v1h16v-1c0-2.66-5.33-4-8-4z" />
                      </svg>
                    </div>
                    <div className="pax-info">
                      <span className="pax-label">Adults</span>
                      <span className="pax-val">{adults}</span>
                    </div>
                    <div className="pax-controls">
                      <button className="pax-btn" onClick={() => setAdults(Math.max(1, adults - 1))}>−</button>
                      <button className="pax-btn" onClick={() => setAdults(Math.min(16, adults + 1))}>+</button>
                    </div>
                  </div>

                  <div className="pax-block">
                    <div className="pax-icon">
                      <svg width={13} height={13} viewBox="0 0 24 24" fill="var(--h-gold)">
                        <circle cx="12" cy="4" r="2" />
                        <path d="M15.89 8.11A4.005 4.005 0 0012 6c-1.55 0-2.91.89-3.62 2.19L6 12h2.5l1 4H10v4h4v-4h.5l1-4H18l-2.11-3.89z" />
                      </svg>
                    </div>
                    <div className="pax-info">
                      <span className="pax-label">Children</span>
                      <span className="pax-val">{kids}</span>
                    </div>
                    <div className="pax-controls">
                      <button className="pax-btn" onClick={() => setKids(Math.max(0, kids - 1))}>−</button>
                      <button className="pax-btn" onClick={() => setKids(Math.min(6, kids + 1))}>+</button>
                    </div>
                  </div>
                </div>

                {/* Price panel */}
                {showPrice && (
                  <div className="price-panel">
                    <div>
                      <div className="price-panel-label">
                        {tripType === "round-trip" ? "Round Trip · Fixed fare" : "One Way · Fixed fare"}
                      </div>
                      <div className="price-panel-note">
                        {fromName} → {toName}
                        {totalPax > 1 && ` · ${totalPax} pax`}
                        {totalPax >= 9 && " · 9+ rate (×2)"}
                      </div>
                    </div>
                    <div style={{ textAlign: "right" }}>
                      {isOnDemand ? (
                        <div style={{ fontFamily: "'Cormorant Garamond',serif", fontSize: 19, color: "var(--h-gold)" }}>On Demand</div>
                      ) : lowestPrice !== null ? (
                        <>
                          <div className="price-from-label">From</div>
                          <div className="price-panel-amount"><sup>€</sup>{lowestPrice}</div>
                          <div className="price-panel-note">incl. all fees</div>
                        </>
                      ) : (
                        <div style={{ fontSize: 11.5, color: "var(--h-ivory-faint)" }}>Select route</div>
                      )}
                    </div>
                  </div>
                )}

                {/* CTA button */}
                {!showPrice ? (
                  <button className="card-submit" onClick={() => setShowPrice(true)}>
                    <svg width={15} height={15} viewBox="0 0 24 24" fill="var(--h-ink)">
                      <path d="M21.41 11.58l-9-9A2 2 0 0011 2H4a2 2 0 00-2 2v7a2 2 0 00.59 1.42l9 9A2 2 0 0013 22a2 2 0 001.41-.59l7-7A2 2 0 0022 13a2 2 0 00-.59-1.42zM5.5 7A1.5 1.5 0 114 5.5 1.5 1.5 0 015.5 7z" />
                    </svg>
                    See Price
                  </button>
                ) : (
                  <a href={bookingUrl()} className="card-submit-book">
                    <svg width={15} height={15} viewBox="0 0 24 24" fill="currentColor">
                      <path d="M2.01 21L23 12 2.01 3 2 10l15 2-15 2z" />
                    </svg>
                    Book Now →
                  </a>
                )}

                {/* Trust notes */}
                <div className="card-note">
                  <span className="card-note-item">
                    <svg width={12} height={12} viewBox="0 0 24 24" fill="var(--h-gold)">
                      <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z" />
                    </svg>
                    Free cancellation
                  </span>
                  <span className="card-note-item">
                    <svg width={12} height={12} viewBox="0 0 24 24" fill="var(--h-gold)">
                      <path d="M20 4H4c-1.11 0-2 .89-2 2v12c0 1.11.89 2 2 2h16c1.11 0 2-.89 2-2V6c0-1.11-.89-2-2-2zm0 14H4v-6h16v6zm0-10H4V6h16v2z" />
                    </svg>
                    Pay on arrival
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Footer bar */}
        <div className="hero-foot">
          <a href="tel:+33652466694" className="foot-phone">
            <div className="phone-icon">
              <svg width={16} height={16} viewBox="0 0 24 24" fill="var(--h-gold)">
                <path d="M6.62 10.79a15.05 15.05 0 006.59 6.59l2.2-2.2a1 1 0 011.01-.24c1.12.37 2.33.57 3.58.57a1 1 0 011 1V20a1 1 0 01-1 1C10.18 21 3 13.82 3 5a1 1 0 011-1h3.5a1 1 0 011 1c0 1.25.2 2.46.57 3.58a1 1 0 01-.25 1.01l-2.2 2.2z" />
              </svg>
            </div>
            <div className="phone-detail">
              <span className="phone-detail-label">24/7 Support</span>
              <span className="phone-detail-number">+33 6 52 46 66 94</span>
            </div>
          </a>
          <div className="foot-badges">
            {([
              ["Meet & Greet", "M22 9V7h-2V5c0-1.1-.9-2-2-2H4c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2v-2h2v-2h-2v-2h2v-2h-2V9h2zm-4 10H4V5h14v14zM6 13h5v4H6zm6-6h3v3h-3zM6 7h5v5H6zm6 4h3v6h-3z"],
              ["Flight Tracking", "M21 16v-2l-8-5V3.5c0-.83-.67-1.5-1.5-1.5S10 2.67 10 3.5V9l-8 5v2l8-2.5V19l-2 1.5V22l3.5-1 3.5 1v-1.5L13 19v-5.5l8 2.5z"],
              ["Free Child Seats", "M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm0 2c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z"],
            ] as [string, string][]).map(([label, d]) => (
              <span key={label} className="foot-badge">
                <svg width={13} height={13} viewBox="0 0 24 24" fill="var(--h-gold)"><path d={d} /></svg>
                {label}
              </span>
            ))}
          </div>
        </div>
      </section>

      {/* WhatsApp floating button */}
      <a href="https://wa.me/33652466694" target="_blank" rel="noopener noreferrer" className="wa-float">
        <svg width={28} height={28} viewBox="0 0 24 24" fill="white">
          <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.198-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.297-.497.099-.198.05-.371-.025-.52-.074-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.29.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L0 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
        </svg>
      </a>
    </div>
  );
}