"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";

type Language = "en" | "fr";

export default function Header() {
  const [isOpen, setIsOpen] = useState(false);
  const [lang, setLang] = useState<Language>("en");
  const [scrolled, setScrolled] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 32);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Close menu on route change
  useEffect(() => { setIsOpen(false); }, [pathname]);

  const t = {
    en: { home: "Home", disney: "DisneyLand", rates: "Rates", reservation: "Reservation", contact: "Contact", bookNow: "Reserve Now", callUs: "Speak With Us" },
    fr: { home: "Accueil", disney: "DisneyLand", rates: "Tarifs", reservation: "Réservation", contact: "Contact", bookNow: "Réserver", callUs: "Contactez-nous" },
  };

  const navLinks = [
    { href: "/", label: t[lang].home, disney: false },
    { href: "/disney", label: t[lang].disney, disney: true },
    { href: "/rates", label: t[lang].rates, disney: false },
    { href: "/reservation", label: t[lang].reservation, disney: false },
    { href: "/contact-us", label: t[lang].contact, disney: false },
  ];

  const GOLD = "#c9a347";
  const TEXT = "#f8f8f8";
  const TEXT_DIM = "rgba(248,248,248,0.78)";
  const BORDER = "rgba(255,255,255,0.085)";
  const SURFACE = "rgba(255,255,255,0.035)";

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Cinzel+Decorative:wght@400;700&family=Cormorant+Garamond:ital,wght@0,400;0,500;0,600;0,700;1,400&family=Playfair+Display:ital,wght@0,400;0,500;0,600;0,700;1,400&family=Montserrat:wght@400;500;600;700&display=swap');

        /* ── Nav links ── */
        .h-navlink-u {
          position: relative;
          font-family: 'Cormorant Garamond', serif;
          font-size: 16px; font-weight: 500;
          color: rgba(248,248,248,0.78);
          text-decoration: none;
          padding: 6px 14px;
          letter-spacing: 0.05em;
          border-radius: 6px;
          white-space: nowrap;
          transition: all 0.3s ease;
        }
        .h-navlink-u::after {
          content: '';
          position: absolute;
          width: 0; height: 1px;
          bottom: 4px; left: 50%;
          background: #c9a347;
          transition: width 0.4s ease;
          transform: translateX(-50%);
        }
        .h-navlink-u:hover { background: rgba(255,255,255,0.035); color: #f8f8f8; }
        .h-navlink-u:hover::after { width: 65%; }

        /* ── Disney special tab ── */
        .h-disney-wrap {
          position: relative;
          display: inline-flex;
          align-items: center;
        }

        .h-disney-link {
          position: relative;
          font-family: 'Cinzel Decorative', cursive;
          font-size: 12px; font-weight: 400;
          text-decoration: none;
          padding: 7px 16px;
          letter-spacing: 0.08em;
          white-space: nowrap;
          border-radius: 8px;
          transition: all 0.3s ease;
          color: #ff9540;
          background: rgba(255,140,50,0.07);
          border: 1px solid rgba(255,140,50,0.25);
          z-index: 1;
        }
        .h-disney-link:hover {
          background: rgba(255,140,50,0.13);
          border-color: rgba(255,140,50,0.45);
          color: #ffb870;
          transform: translateY(-1px);
        }

        /* SVG ring that orbits around the button */
        .h-disney-ring {
          position: absolute;
          inset: -10px;
          pointer-events: none;
        }
        .h-disney-ring svg {
          width: 100%; height: 100%;
          overflow: visible;
        }

        /* The travelling dot on the path */
        .h-magic-dot {
          fill: #ff9540;
          filter: drop-shadow(0 0 3px #ff9540) drop-shadow(0 0 6px rgba(255,149,64,0.6));
          animation: none;
        }

        /* Tiny trailing dots */
        .h-magic-trail-1 { fill: #ffb870; opacity: 0.7; filter: drop-shadow(0 0 2px #ffb870); }
        .h-magic-trail-2 { fill: #ffd4a0; opacity: 0.4; filter: drop-shadow(0 0 1px #ffd4a0); }

        /* Offset animation on each circle element */
        .h-ring-dot-1 { animation: ring-travel 2.8s linear infinite 0s; }
        .h-ring-dot-2 { animation: ring-travel 2.8s linear infinite -0.18s; }
        .h-ring-dot-3 { animation: ring-travel 2.8s linear infinite -0.32s; }

        @keyframes ring-travel {
          0%   { offset-distance: 0%; opacity: 0; }
          5%   { opacity: 1; }
          90%  { opacity: 0.8; }
          100% { offset-distance: 100%; opacity: 0; }
        }

        /* Fallback: CSS custom property animation on stroke-dashoffset */
        .h-magic-path-anim {
          stroke: #ff9540;
          stroke-width: 1.5;
          fill: none;
          stroke-dasharray: 6 999;
          stroke-dashoffset: 0;
          stroke-linecap: round;
          filter: drop-shadow(0 0 3px rgba(255,149,64,0.8));
          animation: dash-travel 2.8s linear infinite;
          opacity: 0.9;
        }
        .h-magic-path-anim-2 {
          stroke: #ffb870;
          stroke-width: 1;
          fill: none;
          stroke-dasharray: 3 999;
          stroke-dashoffset: 0;
          stroke-linecap: round;
          filter: drop-shadow(0 0 2px rgba(255,184,112,0.6));
          animation: dash-travel 2.8s linear infinite -0.2s;
          opacity: 0.6;
        }
        .h-magic-path-anim-3 {
          stroke: #ffd4a0;
          stroke-width: 0.8;
          fill: none;
          stroke-dasharray: 2 999;
          stroke-dashoffset: 0;
          stroke-linecap: round;
          filter: drop-shadow(0 0 1px rgba(255,212,160,0.5));
          animation: dash-travel 2.8s linear infinite -0.38s;
          opacity: 0.4;
        }

        @keyframes dash-travel {
          0%   { stroke-dashoffset: 0; }
          100% { stroke-dashoffset: -600; }
        }

        /* Small sparkle stars that pop */
        .h-disney-star {
          position: absolute;
          pointer-events: none;
          color: #ff9540;
          font-size: 8px;
          opacity: 0;
          line-height: 1;
        }
        .h-disney-star-1 { top: -6px; left: 18%; animation: star-pop 2.4s ease-in-out infinite 0s; }
        .h-disney-star-2 { top: -6px; right: 22%; animation: star-pop 2.4s ease-in-out infinite -0.8s; color: #ffb870; }
        .h-disney-star-3 { bottom: -6px; left: 30%; animation: star-pop 2.4s ease-in-out infinite -1.6s; font-size: 6px; }
        .h-disney-star-4 { top: 40%; right: -6px; animation: star-pop 2.4s ease-in-out infinite -0.4s; font-size: 7px; color: #ffd4a0; }
        .h-disney-star-5 { top: 40%; left: -6px; animation: star-pop 2.4s ease-in-out infinite -1.2s; font-size: 7px; }

        @keyframes star-pop {
          0%   { opacity: 0; transform: scale(0) rotate(0deg); }
          25%  { opacity: 1; transform: scale(1.3) rotate(20deg); }
          55%  { opacity: 0.7; transform: scale(1) rotate(0deg); }
          100% { opacity: 0; transform: scale(0) rotate(-20deg); }
        }

        /* ── Burger lines ── */
        .h-burger-line { height: 1.8px; background: rgba(248,248,248,0.78); border-radius: 1px; transition: all 0.4s cubic-bezier(0.23,1,0.32,1); display: block; }
        .h-burger-line:nth-child(1) { width: 22px; }
        .h-burger-line:nth-child(2) { width: 15px; }
        .h-burger-line:nth-child(3) { width: 22px; }
        .h-burger-open .h-burger-line:nth-child(1) { transform: translateY(7px) rotate(45deg); width: 22px; }
        .h-burger-open .h-burger-line:nth-child(2) { opacity: 0; width: 0; transform: scaleX(0); }
        .h-burger-open .h-burger-line:nth-child(3) { transform: translateY(-7px) rotate(-45deg); width: 22px; }

        /* ── Lang buttons ── */
        .h-lang-btn-s {
          background: none; border: none;
          padding: 5px 11px;
          font-family: 'Montserrat', sans-serif; font-size: 10.8px; font-weight: 600;
          color: rgba(248,248,248,0.78); cursor: pointer;
          text-transform: uppercase; letter-spacing: 0.09em;
          transition: all 0.2s;
        }
        .h-lang-btn-s.active { background: rgba(201,163,71,0.16); color: #c9a347; border-radius: 5px; }

        /* ── Pulse animation ── */
        @keyframes h-pulse { 0%,100%{box-shadow:0 0 6px rgba(26,107,82,0.35)} 50%{box-shadow:0 0 16px rgba(26,107,82,0.7)} }

        /* ── Desktop/mobile visibility ── */
        @media (max-width: 1079px) { .h-desktop { display: none !important; } }
        @media (min-width: 1080px) { .h-mobile-btn { display: none !important; } }

        /* ── Mobile drawer ── */
        .h-drawer {
          position: fixed;
          top: 0; left: 0; right: 0; bottom: 0;
          z-index: 9998;
          display: flex;
        }
        .h-drawer-backdrop {
          position: absolute; inset: 0;
          background: rgba(0,0,0,0.6);
          backdrop-filter: blur(4px);
          animation: fadeIn 0.3s ease both;
        }
        .h-drawer-panel {
          position: relative; z-index: 1;
          width: min(340px, 88vw);
          height: 100%;
          background: #0a0a0a;
          border-right: 1px solid rgba(201,163,71,0.15);
          display: flex; flex-direction: column;
          animation: slideIn 0.35s cubic-bezier(0.22,1,0.36,1) both;
          overflow-y: auto;
        }
        @keyframes fadeIn { from { opacity: 0; } to { opacity: 1; } }
        @keyframes slideIn { from { transform: translateX(-100%); } to { transform: translateX(0); } }

        .h-drawer-top {
          padding: 28px 24px 20px;
          border-bottom: 1px solid rgba(255,255,255,0.06);
          display: flex; align-items: center; justify-content: space-between;
        }
        .h-drawer-logo-name {
          font-family: 'Playfair Display', serif;
          font-size: 22px; font-weight: 600; color: #f8f8f8; line-height: 1;
        }
        .h-drawer-logo-sub {
          font-family: 'Montserrat', sans-serif;
          font-size: 8px; font-weight: 500; letter-spacing: 0.22em;
          text-transform: uppercase; color: rgba(248,248,248,0.4); margin-top: 3px;
        }
        .h-drawer-close {
          width: 36px; height: 36px; border-radius: 8px;
          background: rgba(255,255,255,0.06); border: 1px solid rgba(255,255,255,0.1);
          display: flex; align-items: center; justify-content: center;
          cursor: pointer; color: rgba(255,255,255,0.6);
          transition: all 0.2s;
          flex-shrink: 0;
        }
        .h-drawer-close:hover { background: rgba(255,255,255,0.1); color: #fff; }
        .h-drawer-close svg { width: 16px; height: 16px; }

        .h-drawer-nav {
          padding: 16px 0; flex: 1;
        }
        .h-drawer-link {
          display: flex; align-items: center; gap: 12px;
          padding: 14px 24px;
          font-family: 'Cormorant Garamond', serif;
          font-size: 22px; font-weight: 500;
          color: rgba(248,248,248,0.75);
          text-decoration: none;
          border-left: 3px solid transparent;
          transition: all 0.22s;
        }
        .h-drawer-link:hover { color: #f8f8f8; background: rgba(255,255,255,0.04); border-left-color: rgba(201,163,71,0.4); }
        .h-drawer-link-num {
          font-family: 'Montserrat', sans-serif;
          font-size: 10px; font-weight: 600; color: rgba(201,163,71,0.5);
          letter-spacing: 0.1em; min-width: 20px;
        }

        .h-drawer-disney-link {
          display: flex; align-items: center; gap: 12px;
          padding: 14px 24px;
          font-family: 'Cormorant Garamond', serif;
          font-size: 22px; font-weight: 600;
          color: #ff8c2a;
          text-decoration: none;
          border-left: 3px solid rgba(255,120,30,0.4);
          background: rgba(255,200,0,0.05);
          transition: all 0.22s;
          position: relative;
        }
        .h-drawer-disney-link:hover { background: rgba(255,120,30,0.1); border-left-color: rgba(255,120,30,0.7); }
        .h-drawer-disney-stars {
          font-size: 10px; opacity: 0.7;
          animation: sparkle 2s ease-in-out infinite;
        }

        .h-drawer-bottom {
          padding: 20px 24px;
          border-top: 1px solid rgba(255,255,255,0.06);
          display: flex; flex-direction: column; gap: 12px;
        }
        .h-drawer-phone {
          display: flex; align-items: center; gap: 10px;
          font-family: 'Playfair Display', serif;
          font-size: 18px; font-weight: 500; color: #f8f8f8;
          text-decoration: none;
        }
        .h-drawer-phone-pulse {
          width: 8px; height: 8px; border-radius: 50%;
          background: #1a6b52; flex-shrink: 0;
          animation: h-pulse 2.8s infinite ease-in-out;
        }
        .h-drawer-cta {
          display: flex; align-items: center; justify-content: center;
          padding: 13px 20px; border-radius: 9px;
          background: #c9a347; color: #0a0a0a;
          font-family: 'Montserrat', sans-serif;
          font-size: 12px; font-weight: 700;
          letter-spacing: 0.1em; text-transform: uppercase;
          text-decoration: none; transition: background 0.2s;
        }
        .h-drawer-cta:hover { background: #e8c97a; }

        .h-drawer-lang {
          display: flex; gap: 6px;
        }
        .h-drawer-lang-btn {
          flex: 1; padding: 8px;
          background: rgba(255,255,255,0.04); border: 1px solid rgba(255,255,255,0.1);
          border-radius: 6px;
          font-family: 'Montserrat', sans-serif; font-size: 11px; font-weight: 700;
          color: rgba(248,248,248,0.5); cursor: pointer;
          text-transform: uppercase; letter-spacing: 0.1em; transition: all 0.2s;
        }
        .h-drawer-lang-btn.active { background: rgba(201,163,71,0.15); border-color: rgba(201,163,71,0.3); color: #c9a347; }
      `}</style>

      <header style={{
        position: "fixed",
        top: 0, left: 0, right: 0,
        zIndex: 9999,
        background: scrolled ? "rgba(10,10,10,0.55)" : "#0a0a0a",
        backdropFilter: scrolled ? "blur(20px)" : "none",
        WebkitBackdropFilter: scrolled ? "blur(20px)" : "none",
        borderBottom: `1px solid ${scrolled ? "rgba(201,163,71,0.2)" : BORDER}`,
        boxShadow: scrolled ? "0 6px 32px rgba(0,0,0,0.4)" : "none",
        transition: "all 0.4s ease",
        fontFamily: "'Montserrat', sans-serif",
      }}>
        <div style={{
          maxWidth: 1520,
          margin: "0 auto",
          padding: "0 4vw",
          height: 92,
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          boxSizing: "border-box",
        }}>

          {/* ── Logo ── */}
          <Link href="/" style={{ display: "flex", alignItems: "center", gap: 14, textDecoration: "none" }}>
            <div style={{ position: "relative", width: 42, height: 42, flexShrink: 0 }}>
              <div style={{ position: "absolute", inset: -5, border: "1px solid rgba(201,163,71,0.16)", borderRadius: "50%", opacity: 0.5 }} />
              <div style={{ position: "absolute", inset: 0, background: "radial-gradient(circle at 30% 30%, rgba(201,163,71,0.16) 0%, transparent 70%)", borderRadius: "50%", display: "flex", alignItems: "center", justifyContent: "center" }}>
                <svg fill="none" viewBox="0 0 24 24" stroke={GOLD} strokeWidth="1.7" width={20} height={20}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M5 8h14M5 8a2 2 0 110-4h14a2 2 0 110 4M5 8v10a2 2 0 002 2h10a2 2 0 002-2V8m-9 4h4" />
                </svg>
              </div>
            </div>
            <div style={{ display: "flex", flexDirection: "column", gap: 2 }}>
              <span style={{ fontFamily: "'Playfair Display', serif", fontSize: 29, fontWeight: 600, color: TEXT, letterSpacing: "-0.025em", lineHeight: 1, whiteSpace: "nowrap" }}>
                Paris <em style={{ fontStyle: "italic", color: GOLD, fontWeight: 500 }}>Easy</em> Move
              </span>
              <span style={{ fontFamily: "'Montserrat', sans-serif", fontSize: 9.5, fontWeight: 500, letterSpacing: "0.24em", textTransform: "uppercase", color: TEXT_DIM, whiteSpace: "nowrap" }}>
                Paris journey starts here
              </span>
            </div>
          </Link>

          {/* ── Desktop Nav ── */}
          <nav className="h-desktop" style={{ display: "flex", alignItems: "center", gap: 4 }}>
            {navLinks.map((link) =>
              link.disney ? (
                <Link key={link.href} href={link.href} className="h-disney-link">{link.label}</Link>
              ) : (
                <Link key={link.href} href={link.href} className="h-navlink-u">{link.label}</Link>
              )
            )}
          </nav>

          {/* ── Desktop Right Controls ── */}
          <div className="h-desktop" style={{ display: "flex", alignItems: "center", gap: 18, flexShrink: 0 }}>
            <div style={{ display: "flex", background: SURFACE, border: `1px solid ${BORDER}`, borderRadius: 7, padding: 2 }}>
              <button onClick={() => setLang("en")} className={`h-lang-btn-s${lang === "en" ? " active" : ""}`}>EN</button>
              <button onClick={() => setLang("fr")} className={`h-lang-btn-s${lang === "fr" ? " active" : ""}`}>FR</button>
            </div>
            <div style={{ width: 1, height: 28, background: `linear-gradient(to bottom, transparent, ${BORDER}, transparent)`, opacity: 0.5 }} />
            <a href="tel:+33652466694" style={{ display: "flex", alignItems: "center", gap: 12, padding: "8px 17px", border: `1px solid ${BORDER}`, borderRadius: 9, textDecoration: "none", whiteSpace: "nowrap" }}>
              <span style={{ width: 8, height: 8, background: "#1a6b52", borderRadius: "50%", boxShadow: "0 0 12px rgba(26,107,82,0.5)", animation: "h-pulse 2.8s infinite ease-in-out", flexShrink: 0 }} />
              <div>
                <div style={{ fontFamily: "'Montserrat', sans-serif", fontSize: 9, fontWeight: 600, letterSpacing: "0.14em", textTransform: "uppercase", color: TEXT_DIM }}>{t[lang].callUs}</div>
                <div style={{ fontFamily: "'Playfair Display', serif", fontSize: 16.5, fontWeight: 500, color: TEXT, letterSpacing: "-0.01em" }}>+33 6 52 46 66 94</div>
              </div>
            </a>
            <Link href="/reservation" style={{ display: "inline-flex", alignItems: "center", gap: 10, padding: "0 26px", height: 46, background: GOLD, color: "#0a0a0a", fontFamily: "'Montserrat', sans-serif", fontSize: 13.2, fontWeight: 600, letterSpacing: "0.08em", textTransform: "uppercase", borderRadius: 9, textDecoration: "none", boxShadow: "0 4px 18px rgba(201,163,71,0.25)", whiteSpace: "nowrap" }}>
              {t[lang].bookNow}
            </Link>
          </div>

          {/* ── Mobile Burger ── */}
          <button
            className={`h-mobile-btn${isOpen ? " h-burger-open" : ""}`}
            onClick={() => setIsOpen(!isOpen)}
            aria-label="Toggle menu"
            style={{ display: "flex", flexDirection: "column", gap: 5, width: 42, height: 42, alignItems: "center", justifyContent: "center", background: isOpen ? "rgba(201,163,71,0.12)" : SURFACE, border: `1px solid ${isOpen ? "rgba(201,163,71,0.3)" : BORDER}`, borderRadius: 9, cursor: "pointer", transition: "all 0.3s" }}
          >
            <span className="h-burger-line" />
            <span className="h-burger-line" />
            <span className="h-burger-line" />
          </button>
        </div>
      </header>

      {/* ── Mobile Drawer ── */}
      {isOpen && (
        <div className="h-drawer">
          <div className="h-drawer-backdrop" onClick={() => setIsOpen(false)} />
          <div className="h-drawer-panel">

            {/* Drawer header */}
            <div className="h-drawer-top">
              <div>
                <div className="h-drawer-logo-name">Paris <em style={{ fontStyle: "italic", color: GOLD }}>Easy</em> Move</div>
                <div className="h-drawer-logo-sub">Paris journey starts here</div>
              </div>
              <button className="h-drawer-close" onClick={() => setIsOpen(false)}>
                <svg fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>

            {/* Nav links */}
            <nav className="h-drawer-nav">
              {navLinks.map((link, i) =>
                link.disney ? (
                  <Link key={link.href} href={link.href} className="h-drawer-disney-link" onClick={() => setIsOpen(false)}>
                    <span className="h-drawer-link-num">0{i + 1}</span>
                    <span className="h-drawer-disney-stars">✦</span>
                    {link.label}
                    <span className="h-drawer-disney-stars" style={{ marginLeft: 4 }}>✦</span>
                  </Link>
                ) : (
                  <Link key={link.href} href={link.href} className="h-drawer-link" onClick={() => setIsOpen(false)}>
                    <span className="h-drawer-link-num">0{i + 1}</span>
                    {link.label}
                  </Link>
                )
              )}
            </nav>

            {/* Drawer bottom */}
            <div className="h-drawer-bottom">
              <div className="h-drawer-lang">
                <button onClick={() => setLang("en")} className={`h-drawer-lang-btn${lang === "en" ? " active" : ""}`}>EN — English</button>
                <button onClick={() => setLang("fr")} className={`h-drawer-lang-btn${lang === "fr" ? " active" : ""}`}>FR — Français</button>
              </div>
              <a href="tel:+33652466694" className="h-drawer-phone">
                <span className="h-drawer-phone-pulse" />
                +33 6 52 46 66 94
              </a>
              <Link href="/reservation" className="h-drawer-cta" onClick={() => setIsOpen(false)}>
                {t[lang].bookNow}
              </Link>
            </div>

          </div>
        </div>
      )}
    </>
  );
}