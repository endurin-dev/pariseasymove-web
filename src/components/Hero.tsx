"use client";

import { useState } from "react";

export default function HeroSection() {
  const [tripType, setTripType] = useState<"one-way" | "round-trip" | "hourly">("one-way");
  const [pickup, setPickup] = useState("");
  const [dropoff, setDropoff] = useState("");
  const [date, setDate] = useState("");
  const [time, setTime] = useState("");
  const [adults, setAdults] = useState(1);
  const [kids, setKids] = useState(0);
  const [showPrice, setShowPrice] = useState(false);

  const basePrices: Record<string, Record<string, number>> = {
    CDG:      { Orly: 90,  Disneyland: 75,  Paris: 65,  Beauvais: 120 },
    Orly:     { CDG: 90,   Disneyland: 60,  Paris: 50,  Beauvais: 130 },
    Beauvais: { CDG: 120,  Disneyland: 95,  Paris: 110, Orly: 130 },
    Paris:    { CDG: 65,   Disneyland: 55,  Orly: 50,   Beauvais: 110 },
    Disneyland:{ CDG: 75,  Orly: 60,        Paris: 55,  Beauvais: 95 },
  };
  const getPrice = () => {
    const base = basePrices[pickup]?.[dropoff] ?? 70;
    const pax = adults + kids * 0.5;
    const multi = pax > 4 ? 1.3 : pax > 2 ? 1.1 : 1;
    const roundMult = tripType === "round-trip" ? 1.85 : tripType === "hourly" ? 2.2 : 1;
    return Math.round(base * multi * roundMult);
  };

  return (
    <div className="hero-root">
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,300;0,400;0,500;0,600;0,700;1,300;1,400;1,500&family=DM+Sans:wght@300;400;500;600&display=swap');

        .hero-root {
          --h-ink:          #0c0d0f;
          --h-ink-soft:     #16181d;
          --h-gold:         #c9a84c;
          --h-gold-light:   #e8c97a;
          --h-gold-pale:    rgba(201,168,76,0.12);
          --h-gold-glow:    rgba(201,168,76,0.22);
          --h-ivory:        #f5f0e8;
          --h-ivory-dim:    rgba(245,240,232,0.72);
          --h-ivory-faint:  rgba(245,240,232,0.38);
          --h-stroke:       rgba(245,240,232,0.10);
          --h-stroke-gold:  rgba(201,168,76,0.28);
          --h-ease:         cubic-bezier(0.25, 0.1, 0.25, 1);
        }

        .hero-root *, .hero-root *::before, .hero-root *::after { box-sizing: border-box; margin: 0; padding: 0; }

        /* ─── HERO SHELL ─── */
        .hero {
          position: relative;
          min-height: 70vh;
          background: var(--h-ink);
          overflow: hidden;
          font-family: 'DM Sans', sans-serif;
          color: var(--h-ivory);
          display: flex;
          flex-direction: column;
        }

        /* Cinematic background layers */
        .hero-bg {
          position: absolute;
          inset: 0;
          z-index: 0;
        }
        .hero-bg-img {
          position: absolute;
          inset: 0;
          background: url('/images/banner.webp') center/cover no-repeat;
          opacity: 0.28;
        }
        /* Layered vignettes for cinematic depth */
        .hero-bg-vignette {
          position: absolute;
          inset: 0;
          background:
            radial-gradient(ellipse 80% 70% at 50% 110%, rgba(12,13,15,0.95) 0%, transparent 70%),
            radial-gradient(ellipse 100% 100% at 100% 50%, rgba(12,13,15,0.7) 0%, transparent 60%),
            radial-gradient(ellipse 50% 60% at 0% 50%, rgba(12,13,15,0.5) 0%, transparent 70%);
        }
        /* Subtle noise grain */
        .hero-bg-noise {
          position: absolute;
          inset: 0;
          opacity: 0.035;
          background-image: url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E");
          background-size: 200px;
        }
        /* Decorative gold rule, diagonal */
        .hero-bg-rule {
          position: absolute;
          top: 0;
          right: 30%;
          width: 1px;
          height: 100%;
          background: linear-gradient(180deg, transparent 0%, var(--h-stroke-gold) 30%, var(--h-stroke-gold) 70%, transparent 100%);
        }

        /* ─── CONTENT ─── */
        .hero-body {
          position: relative;
          z-index: 1;
          flex: 1;
          display: flex;
          align-items: center;
          padding: 80px 5vw 40px;
          max-width: 1480px;
          margin: 0 auto;
          width: 100%;
          gap: 5vw;
        }

        /* ─── LEFT ─── */
        .hero-left {
          flex: 1.1;
          max-width: 680px;
          animation: fadeUp 0.9s var(--h-ease) both;
        }

        @keyframes fadeUp {
          from { opacity: 0; transform: translateY(28px); }
          to   { opacity: 1; transform: translateY(0); }
        }

        .eyebrow {
          display: inline-flex;
          align-items: center;
          gap: 12px;
          margin-bottom: 28px;
          animation: fadeUp 0.9s 0.1s var(--h-ease) both;
        }
        .eyebrow-line {
          width: 32px;
          height: 1px;
          background: var(--h-gold);
        }
        .eyebrow-text {
          font-family: 'DM Sans', sans-serif;
          font-size: 11px;
          font-weight: 500;
          letter-spacing: 0.22em;
          text-transform: uppercase;
          color: var(--h-gold);
        }

        .hero-h1 {
          font-family: 'Cormorant Garamond', serif;
          font-size: clamp(52px, 6.8vw, 90px);
          font-weight: 400;
          line-height: 0.96;
          letter-spacing: -0.01em;
          margin-bottom: 10px;
          animation: fadeUp 0.9s 0.15s var(--h-ease) both;
        }
        .hero-h1 em {
          font-style: italic;
          color: var(--h-gold);
          font-weight: 300;
        }
        .hero-h1-sub {
          font-family: 'Cormorant Garamond', serif;
          font-size: clamp(34px, 4.2vw, 58px);
          font-weight: 300;
          line-height: 1.05;
          color: var(--h-ivory-dim);
          margin-bottom: 36px;
          letter-spacing: 0.01em;
          animation: fadeUp 0.9s 0.2s var(--h-ease) both;
        }

        .hero-rule {
          width: 60px;
          height: 1px;
          background: linear-gradient(90deg, var(--h-gold), transparent);
          margin-bottom: 28px;
          animation: fadeUp 0.9s 0.25s var(--h-ease) both;
        }

        .hero-desc {
          font-size: 15px;
          font-weight: 300;
          line-height: 1.75;
          color: var(--h-ivory-faint);
          max-width: 460px;
          margin-bottom: 44px;
          animation: fadeUp 0.9s 0.3s var(--h-ease) both;
        }
        .hero-desc strong {
          color: var(--h-ivory-dim);
          font-weight: 400;
        }

        /* Pillars */
        .pillars {
          display: flex;
          flex-wrap: wrap;
          gap: 0;
          margin-bottom: 44px;
          border: 1px solid var(--h-stroke);
          border-radius: 4px;
          overflow: hidden;
          animation: fadeUp 0.9s 0.35s var(--h-ease) both;
        }
        .pillar {
          flex: 1;
          min-width: 120px;
          padding: 16px 20px;
          border-right: 1px solid var(--h-stroke);
          display: flex;
          flex-direction: column;
          gap: 4px;
          transition: background 0.25s;
        }
        .pillar:last-child { border-right: none; }
        .pillar:hover { background: var(--h-gold-pale); }
        .pillar-value {
          font-family: 'Cormorant Garamond', serif;
          font-size: 26px;
          font-weight: 500;
          color: var(--h-gold);
          line-height: 1;
        }
        .pillar-label {
          font-size: 11px;
          font-weight: 400;
          letter-spacing: 0.10em;
          text-transform: uppercase;
          color: var(--h-ivory-faint);
        }

        /* CTAs */
        .hero-ctas {
          display: flex;
          gap: 16px;
          flex-wrap: wrap;
          animation: fadeUp 0.9s 0.4s var(--h-ease) both;
        }

        .cta-primary {
          display: inline-flex;
          align-items: center;
          gap: 10px;
          background: var(--h-gold);
          color: var(--h-ink);
          font-family: 'DM Sans', sans-serif;
          font-size: 11.5px;
          font-weight: 600;
          letter-spacing: 0.16em;
          text-transform: uppercase;
          text-decoration: none;
          padding: 13px 28px;
          border-radius: 2px;
          transition: background 0.25s, transform 0.2s, box-shadow 0.25s;
          box-shadow: 0 4px 24px rgba(201,168,76,0.25);
        }
        .cta-primary:hover {
          background: var(--h-gold-light);
          transform: translateY(-2px);
          box-shadow: 0 8px 32px rgba(201,168,76,0.35);
        }
        .cta-primary svg { width: 16px; height: 16px; }

        .cta-ghost {
          display: inline-flex;
          align-items: center;
          gap: 10px;
          background: transparent;
          color: var(--h-ivory-dim);
          font-family: 'DM Sans', sans-serif;
          font-size: 11.5px;
          font-weight: 400;
          letter-spacing: 0.16em;
          text-transform: uppercase;
          text-decoration: none;
          padding: 12px 24px;
          border: 1px solid var(--h-stroke);
          border-radius: 2px;
          transition: border-color 0.25s, color 0.25s, background 0.25s;
        }
        .cta-ghost:hover {
          border-color: var(--h-stroke-gold);
          color: var(--h-gold);
          background: var(--h-gold-pale);
        }

        /* ─── BOOKING CARD ─── */
        .booking-wrap {
          flex: 0 0 auto;
          width: clamp(300px, 28vw, 410px);
          animation: fadeUp 0.9s 0.2s var(--h-ease) both;
        }

        .booking-card {
          border-radius: 20px;
          overflow: hidden;
          backdrop-filter: blur(40px) saturate(180%);
          -webkit-backdrop-filter: blur(40px) saturate(180%);
          border: 1px solid rgba(255,255,255,0.08);
          background: rgba(10,11,14,0.82);
        }

        .card-band {
          position: relative;
          padding: 22px 24px 20px;
          border-bottom: 1px solid rgba(255,255,255,0.10);
          background: rgba(255,255,255,0.07);
          backdrop-filter: blur(24px) saturate(200%) brightness(1.15);
          -webkit-backdrop-filter: blur(24px) saturate(200%) brightness(1.15);
          overflow: hidden;
        }
        .card-band::before {
          content: '';
          position: absolute;
          top: 0; left: 0; right: 0;
          height: 52%;
          background: linear-gradient(
            180deg,
            rgba(255,255,255,0.13) 0%,
            rgba(255,255,255,0.04) 60%,
            rgba(255,255,255,0.00) 100%
          );
          border-radius: 20px 20px 60% 60% / 0px 0px 28px 28px;
          pointer-events: none;
        }
        .card-band::after {
          content: '';
          position: absolute;
          bottom: 0; left: 0; right: 0;
          height: 1px;
          background: linear-gradient(
            90deg,
            transparent 0%,
            rgba(255,255,255,0.18) 30%,
            rgba(255,255,255,0.22) 50%,
            rgba(255,255,255,0.18) 70%,
            transparent 100%
          );
          pointer-events: none;
        }
        .card-band-label {
          position: relative;
          font-size: 10px;
          font-weight: 600;
          letter-spacing: 0.22em;
          text-transform: uppercase;
          color: var(--h-gold);
          margin-bottom: 4px;
        }
        .card-band-title {
          position: relative;
          font-family: 'Cormorant Garamond', serif;
          font-size: 28px;
          font-weight: 600;
          color: var(--h-ivory);
          line-height: 1;
        }

        /* trip type pills */
        .ttabs {
          display: flex;
          gap: 6px;
          padding: 20px 24px 0;
        }
        .ttab {
          flex: 1;
          padding: 7px 6px;
          font-family: 'DM Sans', sans-serif;
          font-size: 11px;
          font-weight: 500;
          letter-spacing: 0.10em;
          text-transform: uppercase;
          text-align: center;
          color: var(--h-ivory-faint);
          cursor: pointer;
          border-radius: 100px;
          border: 1px solid var(--h-stroke);
          transition: all 0.22s var(--h-ease);
        }
        .ttab:hover { color: var(--h-ivory-dim); border-color: var(--h-stroke-gold); }
        .ttab.active {
          background: var(--h-gold);
          border-color: var(--h-gold);
          color: var(--h-ink);
          font-weight: 600;
        }

        /* route block */
        .card-body { padding: 16px 24px 24px; }

        .route-block {
          background: rgba(255,255,255,0.04);
          border: 1px solid var(--h-stroke);
          border-radius: 14px;
          overflow: hidden;
          margin-bottom: 14px;
        }
        .route-row {
          display: flex;
          align-items: center;
          padding: 13px 16px;
          gap: 12px;
          transition: background 0.18s;
        }
        .route-row:hover { background: rgba(255,255,255,0.03); }
        .route-row + .route-row {
          border-top: 1px solid var(--h-stroke);
        }
        .route-dot {
          width: 10px; height: 10px;
          border-radius: 50%;
          flex-shrink: 0;
        }
        .route-dot.origin { background: var(--h-gold); }
        .route-dot.dest {
          background: transparent;
          border: 2px solid var(--h-gold);
        }
        .route-select {
          flex: 1;
          background: transparent;
          border: none;
          outline: none;
          font-family: 'DM Sans', sans-serif;
          font-size: 13.5px;
          font-weight: 300;
          color: var(--h-ivory);
          appearance: none;
          -webkit-appearance: none;
          cursor: pointer;
        }
        .route-select option { background: #16181d; }
        .route-label {
          font-size: 10px;
          font-weight: 500;
          letter-spacing: 0.16em;
          text-transform: uppercase;
          color: var(--h-ivory-faint);
          flex-shrink: 0;
          width: 36px;
          text-align: right;
        }

        .route-swap {
          display: flex;
          justify-content: center;
          align-items: center;
          height: 0;
          position: relative;
          z-index: 1;
        }
        .route-swap-btn {
          position: absolute;
          right: 14px;
          width: 26px; height: 26px;
          border-radius: 50%;
          background: var(--h-ink-soft);
          border: 1px solid var(--h-stroke-gold);
          display: flex;
          align-items: center;
          justify-content: center;
          cursor: pointer;
          transition: background 0.2s, transform 0.2s;
        }
        .route-swap-btn:hover { background: var(--h-gold-pale); transform: rotate(180deg); }
        .route-swap-btn svg { width: 12px; height: 12px; fill: var(--h-gold); }

        /* datetime + pax row */
        .card-row {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 10px;
          margin-bottom: 14px;
        }

        .mini-field {
          background: rgba(255,255,255,0.04);
          border: 1px solid var(--h-stroke);
          border-radius: 12px;
          padding: 10px 14px;
          display: flex;
          flex-direction: column;
          gap: 3px;
          transition: border-color 0.2s;
        }
        .mini-field:focus-within {
          border-color: var(--h-stroke-gold);
        }
        .mini-field-label {
          font-size: 9.5px;
          font-weight: 500;
          letter-spacing: 0.18em;
          text-transform: uppercase;
          color: var(--h-ivory-faint);
        }
        .mini-field input,
        .mini-field select {
          background: transparent;
          border: none;
          outline: none;
          font-family: 'DM Sans', sans-serif;
          font-size: 13px;
          font-weight: 400;
          color: var(--h-ivory);
          width: 100%;
          appearance: none;
          -webkit-appearance: none;
          padding: 0;
        }
        .mini-field select option { background: #16181d; }

        /* pax counter */
        .pax-row {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 10px;
          margin-bottom: 16px;
        }
        .pax-block {
          background: rgba(255,255,255,0.04);
          border: 1px solid var(--h-stroke);
          border-radius: 12px;
          padding: 10px 14px;
          display: flex;
          align-items: center;
          justify-content: space-between;
          transition: border-color 0.2s;
        }
        .pax-block:focus-within { border-color: var(--h-stroke-gold); }
        .pax-info { display: flex; flex-direction: column; gap: 2px; }
        .pax-label {
          font-size: 9.5px;
          font-weight: 500;
          letter-spacing: 0.16em;
          text-transform: uppercase;
          color: var(--h-ivory-faint);
        }
        .pax-val {
          font-size: 16px;
          font-weight: 500;
          color: var(--h-ivory);
          font-family: 'Cormorant Garamond', serif;
        }
        .pax-controls { display: flex; gap: 4px; align-items: center; }
        .pax-btn {
          width: 24px; height: 24px;
          border-radius: 50%;
          border: 1px solid var(--h-stroke-gold);
          background: transparent;
          color: var(--h-gold);
          font-size: 16px;
          line-height: 1;
          cursor: pointer;
          display: flex;
          align-items: center;
          justify-content: center;
          transition: background 0.18s, transform 0.15s;
          font-family: 'DM Sans', sans-serif;
        }
        .pax-btn:hover { background: var(--h-gold-pale); transform: scale(1.1); }
        .pax-btn:active { transform: scale(0.92); }

        /* submit */
        .card-submit {
          width: 100%;
          padding: 14px;
          background: var(--h-gold);
          border: none;
          border-radius: 12px;
          font-family: 'DM Sans', sans-serif;
          font-size: 12px;
          font-weight: 700;
          letter-spacing: 0.18em;
          text-transform: uppercase;
          color: var(--h-ink);
          cursor: pointer;
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 10px;
          transition: background 0.22s, transform 0.2s;
          position: relative;
          overflow: hidden;
        }
        .card-submit:hover { background: var(--h-gold-light); transform: translateY(-2px); }
        .card-submit:active { transform: translateY(0); }
        .card-submit svg { width: 16px; height: 16px; flex-shrink: 0; }

        .card-note {
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 14px;
          margin-top: 14px;
        }
        .card-note-item {
          display: flex;
          align-items: center;
          gap: 5px;
          font-size: 10.5px;
          color: var(--h-ivory-faint);
        }
        .card-note-item svg { width: 12px; height: 12px; fill: var(--h-gold); }

        /* price reveal panel */
        .price-panel {
          background: rgba(201,168,76,0.08);
          border: 1px solid var(--h-stroke-gold);
          border-radius: 12px;
          padding: 14px 18px;
          margin-bottom: 12px;
          display: flex;
          align-items: center;
          justify-content: space-between;
          animation: priceFade 0.35s var(--h-ease) both;
        }
        @keyframes priceFade {
          from { opacity: 0; transform: translateY(6px); }
          to   { opacity: 1; transform: translateY(0); }
        }
        .price-panel-label {
          font-size: 11px;
          font-weight: 500;
          letter-spacing: 0.14em;
          text-transform: uppercase;
          color: var(--h-ivory-faint);
        }
        .price-panel-amount {
          font-family: 'Cormorant Garamond', serif;
          font-size: 34px;
          font-weight: 600;
          color: var(--h-gold);
          line-height: 1;
        }
        .price-panel-amount sup {
          font-size: 16px;
          font-weight: 400;
          vertical-align: super;
          margin-right: 2px;
        }
        .price-panel-note {
          font-size: 10px;
          color: var(--h-ivory-faint);
          margin-top: 2px;
        }

        .card-submit-book {
          width: 100%;
          padding: 14px;
          background: transparent;
          border: 1.5px solid var(--h-gold);
          border-radius: 12px;
          font-family: 'DM Sans', sans-serif;
          font-size: 12px;
          font-weight: 700;
          letter-spacing: 0.18em;
          text-transform: uppercase;
          color: var(--h-gold);
          cursor: pointer;
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 10px;
          transition: background 0.22s, color 0.22s, transform 0.2s;
          text-decoration: none;
        }
        .card-submit-book:hover {
          background: var(--h-gold);
          color: var(--h-ink);
          transform: translateY(-2px);
        }
        .card-submit-book svg { width: 16px; height: 16px; flex-shrink: 0; }

        /* ─── BOTTOM BAR ─── */
        .hero-foot {
          position: relative;
          z-index: 1;
          padding: 22px 5vw;
          border-top: 1px solid var(--h-stroke);
          display: flex;
          align-items: center;
          justify-content: space-between;
          flex-wrap: wrap;
          gap: 16px;
          max-width: 1480px;
          margin: 0 auto;
          width: 100%;
        }

        .foot-phone {
          display: flex;
          align-items: center;
          gap: 12px;
          text-decoration: none;
          color: var(--h-ivory);
          transition: color 0.2s;
        }
        .foot-phone:hover { color: var(--h-gold); }
        .phone-icon {
          width: 36px;
          height: 36px;
          border: 1px solid var(--h-stroke-gold);
          border-radius: 50%;
          display: flex;
          align-items: center;
          justify-content: center;
          flex-shrink: 0;
        }
        .phone-icon svg { width: 16px; height: 16px; fill: var(--h-gold); }
        .phone-detail { display: flex; flex-direction: column; }
        .phone-detail-label { font-size: 10px; letter-spacing: 0.16em; text-transform: uppercase; color: var(--h-ivory-faint); }
        .phone-detail-number { font-family: 'Cormorant Garamond', serif; font-size: 18px; font-weight: 500; }

        .foot-badges {
          display: flex;
          gap: 20px;
          align-items: center;
        }
        .foot-badge {
          display: flex;
          align-items: center;
          gap: 6px;
          font-size: 11.5px;
          color: var(--h-ivory-faint);
        }
        .foot-badge svg { width: 14px; height: 14px; fill: var(--h-gold); }

        .foot-rating {
          display: flex;
          align-items: center;
          gap: 8px;
        }
        .stars {
          display: flex;
          gap: 2px;
        }
        .stars svg { width: 13px; height: 13px; fill: var(--h-gold); }
        .rating-text { font-size: 12px; color: var(--h-ivory-faint); }

        /* ─── WhatsApp Float ─── */
        .wa-float {
          position: fixed;
          bottom: 28px;
          right: 28px;
          z-index: 999;
          width: 54px;
          height: 54px;
          background: #25D366;
          border-radius: 50%;
          display: flex;
          align-items: center;
          justify-content: center;
          box-shadow: 0 6px 24px rgba(0,0,0,0.4);
          transition: transform 0.25s, box-shadow 0.25s;
        }
        .wa-float:hover {
          transform: scale(1.1) translateY(-2px);
          box-shadow: 0 12px 32px rgba(0,0,0,0.5);
        }
        .wa-float svg { width: 30px; height: 30px; fill: white; }

        /* ─── RESPONSIVE ─── */
        @media (max-width: 1023px) {
          .hero-body {
            flex-direction: column;
            padding-top: 110px;
            padding-bottom: 40px;
            align-items: flex-start;
          }
          .hero-bg-rule { display: none; }
          .booking-wrap { width: 100%; max-width: 480px; }
        }
        @media (max-width: 768px) {
          .pillars { display: grid; grid-template-columns: repeat(2, 1fr); }
          .pillar { border-right: none; border-bottom: 1px solid var(--h-stroke); }
          .pillar:nth-child(odd) { border-right: 1px solid var(--h-stroke); }
          .pillar:nth-last-child(-n+2) { border-bottom: none; }
          .foot-badges { display: none; }
        }
        @media (max-width: 480px) {
          .field-grid { grid-template-columns: 1fr; }
          .hero-ctas { flex-direction: column; }
          .cta-primary, .cta-ghost { justify-content: center; }
        }
      `}</style>

      {/* ── HERO ── */}
      <section className="hero">
        <div className="hero-bg">
          <div className="hero-bg-img" />
          <div className="hero-bg-vignette" />
          <div className="hero-bg-noise" />
          <div className="hero-bg-rule" />
        </div>

        <div className="hero-body">

          {/* LEFT COLUMN */}
          <div className="hero-left">
            <div className="eyebrow">
              <div className="eyebrow-line" />
              <span className="eyebrow-text">Paris · CDG · Orly · Beauvais</span>
            </div>

            <h1 className="hero-h1">
              Arrive in<br /><em>Pure Elegance</em>
            </h1>
            <div className="hero-h1-sub">
              Private Transfers<br />& Disneyland Paris
            </div>

            <div className="hero-rule" />

            <p className="hero-desc">
              <strong>Door-to-door chauffeur service</strong> from all Paris airports.
              Fixed fares, complimentary child seats, and the assurance that your
              driver is waiting — however long your flight takes.
            </p>

            <div className="pillars">
              <div className="pillar">
                <span className="pillar-value">4.9★</span>
                <span className="pillar-label">Guest Rating</span>
              </div>
              <div className="pillar">
                <span className="pillar-value">Free</span>
                <span className="pillar-label">Child Seats</span>
              </div>
              <div className="pillar">
                <span className="pillar-value">Fixed</span>
                <span className="pillar-label">Fare · No Surprises</span>
              </div>
              <div className="pillar">
                <span className="pillar-value">24/7</span>
                <span className="pillar-label">Support</span>
              </div>
            </div>
          </div>

          {/* BOOKING CARD */}
          <div className="booking-wrap">
            <div className="booking-card">

              {/* Gold header band */}
              <div className="card-band">
                <div className="card-band-label">Instant Booking</div>
                <div className="card-band-title">Your Transfer</div>
              </div>

              {/* Trip type pills */}
              <div className="ttabs">
                {(["one-way","round-trip","hourly"] as const).map(t => (
                  <div
                    key={t}
                    className={`ttab${tripType === t ? " active" : ""}`}
                    onClick={() => { setTripType(t); setShowPrice(false); }}
                  >
                    {t === "one-way" ? "One-Way" : t === "round-trip" ? "Return" : "Hourly"}
                  </div>
                ))}
              </div>

              <div className="card-body">

                {/* Route block */}
                <div className="route-block">
                  <div className="route-row">
                    <div className="route-dot origin" />
                    <span className="route-label">From</span>
                    <select
                      className="route-select"
                      value={pickup}
                      onChange={e => { setPickup(e.target.value); setShowPrice(false); }}
                    >
                      <option value="">Select pickup</option>
                      <option value="CDG">CDG Airport</option>
                      <option value="Orly">Orly Airport</option>
                      <option value="Beauvais">Beauvais Airport</option>
                      <option value="Paris">Paris City Centre</option>
                    </select>
                  </div>

                  <div className="route-swap">
                    <div className="route-swap-btn" onClick={() => {
                      const tmp = pickup;
                      setPickup(dropoff);
                      setDropoff(tmp);
                    }}>
                      <svg viewBox="0 0 24 24">
                        <path d="M7 16V4m0 12l-3-3m3 3l3-3M17 8v12m0-12l3 3m-3-3l-3 3"/>
                      </svg>
                    </div>
                  </div>

                  <div className="route-row">
                    <div className="route-dot dest" />
                    <span className="route-label">To</span>
                    <select
                      className="route-select"
                      value={dropoff}
                      onChange={e => { setDropoff(e.target.value); setShowPrice(false); }}
                    >
                      <option value="">Select drop-off</option>
                      <option value="CDG">CDG Airport</option>
                      <option value="Orly">Orly Airport</option>
                      <option value="Disneyland">Disneyland Paris</option>
                      <option value="Paris">Paris City Centre</option>
                    </select>
                  </div>
                </div>

                {/* Date & Time */}
                <div className="card-row">
                  <div className="mini-field">
                    <span className="mini-field-label">Date</span>
                    <input type="date" value={date} onChange={e => setDate(e.target.value)} />
                  </div>
                  <div className="mini-field">
                    <span className="mini-field-label">Time</span>
                    <input type="time" value={time} onChange={e => setTime(e.target.value)} />
                  </div>
                </div>

                {/* Passengers */}
                <div className="pax-row">
                  <div className="pax-block">
                    <div className="pax-info">
                      <span className="pax-label">Adults</span>
                      <span className="pax-val">{adults}</span>
                    </div>
                    <div className="pax-controls">
                      <button className="pax-btn" onClick={() => setAdults(Math.max(1, adults - 1))}>−</button>
                      <button className="pax-btn" onClick={() => setAdults(Math.min(8, adults + 1))}>+</button>
                    </div>
                  </div>
                  <div className="pax-block">
                    <div className="pax-info">
                      <span className="pax-label">Children</span>
                      <span className="pax-val">{kids}</span>
                    </div>
                    <div className="pax-controls">
                      <button className="pax-btn" onClick={() => setKids(Math.max(0, kids - 1))}>−</button>
                      <button className="pax-btn" onClick={() => setKids(Math.min(4, kids + 1))}>+</button>
                    </div>
                  </div>
                </div>

                {showPrice && (
                  <div className="price-panel">
                    <div>
                      <div className="price-panel-label">Fixed fare</div>
                      <div className="price-panel-note">{tripType === "round-trip" ? "Return journey" : tripType === "hourly" ? "2-hour hire" : "One-way transfer"}</div>
                    </div>
                    <div style={{textAlign: "right"}}>
                      <div className="price-panel-amount"><sup>€</sup>{getPrice()}</div>
                      <div className="price-panel-note">incl. all fees</div>
                    </div>
                  </div>
                )}

                {!showPrice ? (
                  <button className="card-submit" onClick={() => setShowPrice(true)}>
                    <svg viewBox="0 0 24 24" fill="currentColor">
                      <path d="M11.8 10.9c-2.27-.59-3-1.2-3-2.15 0-1.09 1.01-1.85 2.7-1.85 1.78 0 2.44.85 2.5 2.1h2.21c-.07-1.72-1.12-3.3-3.21-3.81V3h-3v2.16c-1.94.42-3.5 1.68-3.5 3.61 0 2.31 1.91 3.46 4.7 4.13 2.5.6 3 1.48 3 2.41 0 .69-.49 1.79-2.7 1.79-2.06 0-2.87-.92-2.98-2.1h-2.2c.12 2.19 1.76 3.42 3.68 3.83V21h3v-2.15c1.95-.37 3.5-1.5 3.5-3.55 0-2.84-2.43-3.81-4.7-4.4z"/>
                    </svg>
                    See Price
                  </button>
                ) : (
                  <a href="/reservation" className="card-submit-book">
                    <svg viewBox="0 0 24 24" fill="currentColor">
                      <path d="M21 3L3 10.5v1l6.5 2.5 2.5 6.5h1L21 3z"/>
                    </svg>
                    Book Now
                  </a>
                )}

                <div className="card-note">
                  <span className="card-note-item">
                    <svg viewBox="0 0 24 24"><path d="M9 16.17L4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41z"/></svg>
                    Free cancellation
                  </span>
                  <span className="card-note-item">
                    <svg viewBox="0 0 24 24"><path d="M20 4H4c-1.11 0-2 .89-2 2v12c0 1.11.89 2 2 2h16c1.11 0 2-.89 2-2V6c0-1.11-.89-2-2-2zm0 14H4v-6h16v6zm0-10H4V6h16v2z"/></svg>
                    Pay on card or cash on arrival
                  </span>
                </div>

              </div>
            </div>
          </div>

        </div>
      </section>

      {/* WhatsApp float */}
      <a href="https://wa.me/33763519524" target="_blank" rel="noopener noreferrer" className="wa-float">
        <svg viewBox="0 0 24 24">
          <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.198-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.297-.497.099-.198.05-.371-.025-.52-.074-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.29.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L0 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
        </svg>
      </a>
    </div>
  );
}