"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
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

        /* ── Logo & Global Animations ── */
        .h-logo-container { position: relative; transition: all 0.4s cubic-bezier(0.23, 1, 0.32, 1); }
        .h-logo-ring {
          position: absolute; inset: -4px; border: 1px solid rgba(201,163,71,0.3);
          border-radius: 50%; animation: logo-pulse 4s infinite ease-in-out;
        }
        @keyframes logo-pulse {
          0%, 100% { opacity: 0.4; transform: scale(1); }
          50% { opacity: 0.8; transform: scale(1.08); border-color: rgba(201,163,71,0.6); }
        }
        .h-shimmer-effect {
          position: absolute; inset: 0;
          background: linear-gradient(135deg, transparent 45%, rgba(255,255,255,0.3) 50%, transparent 55%);
          background-size: 300% 300%; animation: shimmer 6s infinite linear;
          pointer-events: none; z-index: 2;
        }
        @keyframes shimmer {
          0% { background-position: -200% -200%; }
          100% { background-position: 200% 200%; }
        }

        /* ── Nav links ── */
        .h-navlink-u {
          position: relative; font-family: 'Cormorant Garamond', serif;
          font-size: 16px; font-weight: 500; color: rgba(248,248,248,0.78);
          text-decoration: none; padding: 6px 14px; letter-spacing: 0.05em;
          border-radius: 6px; white-space: nowrap; transition: all 0.3s ease;
        }
        .h-navlink-u::after {
          content: ''; position: absolute; width: 0; height: 1px; bottom: 4px; left: 50%;
          background: #c9a347; transition: width 0.4s ease; transform: translateX(-50%);
        }
        .h-navlink-u:hover { background: rgba(255,255,255,0.035); color: #f8f8f8; }
        .h-navlink-u:hover::after { width: 65%; }

        /* ── Disney ── */
        .h-disney-link {
          position: relative; font-family: 'Cinzel Decorative', cursive;
          font-size: 11px; font-weight: 400; text-decoration: none;
          padding: 7px 16px; letter-spacing: 0.08em; white-space: nowrap;
          border-radius: 8px; transition: all 0.3s ease; color: #ff9540;
          background: rgba(255,140,50,0.07); border: 1px solid rgba(255,140,50,0.25);
        }
        .h-disney-link:hover { background: rgba(255,140,50,0.13); color: #ffb870; transform: translateY(-1px); }

        /* ── CTA Button ── */
        .h-book-btn {
          transition: all 0.4s cubic-bezier(0.23, 1, 0.32, 1) !important;
          position: relative; overflow: hidden;
        }
        .h-book-btn:hover {
          background: #e8c97a !important; transform: translateY(-2px);
          box-shadow: 0 8px 25px rgba(201,163,71,0.4) !important;
        }

        /* ── Burger ── */
        .h-burger-line { height: 1.8px; background: rgba(248,248,248,0.78); border-radius: 1px; transition: all 0.4s cubic-bezier(0.23,1,0.32,1); display: block; }
        .h-burger-line:nth-child(1) { width: 22px; }
        .h-burger-line:nth-child(2) { width: 15px; }
        .h-burger-line:nth-child(3) { width: 22px; }
        .h-burger-open .h-burger-line:nth-child(1) { transform: translateY(7px) rotate(45deg); width: 22px; }
        .h-burger-open .h-burger-line:nth-child(2) { opacity: 0; width: 0; transform: scaleX(0); }
        .h-burger-open .h-burger-line:nth-child(3) { transform: translateY(-7px) rotate(-45deg); width: 22px; }

        .h-lang-btn-s {
          background: none; border: none; padding: 5px 11px; font-family: 'Montserrat', sans-serif;
          font-size: 10.8px; font-weight: 600; color: rgba(248,248,248,0.78); cursor: pointer;
          text-transform: uppercase; letter-spacing: 0.09em; transition: all 0.2s;
        }
        .h-lang-btn-s.active { background: rgba(201,163,71,0.16); color: #c9a347; border-radius: 5px; }

        @keyframes h-pulse { 0%,100%{box-shadow:0 0 6px rgba(26,107,82,0.35)} 50%{box-shadow:0 0 16px rgba(26,107,82,0.7)} }
        @media (max-width: 1079px) { .h-desktop { display: none !important; } }
        @media (min-width: 1080px) { .h-mobile-btn { display: none !important; } }

        /* ── Drawer ── */
        .h-drawer { position: fixed; inset: 0; z-index: 9998; display: flex; }
        .h-drawer-backdrop { position: absolute; inset: 0; background: rgba(0,0,0,0.6); backdrop-filter: blur(4px); animation: fadeIn 0.3s ease both; }
        .h-drawer-panel { position: relative; z-index: 1; width: min(340px, 88vw); height: 100%; background: #0a0a0a; border-right: 1px solid rgba(201,163,71,0.15); display: flex; flex-direction: column; animation: slideIn 0.35s cubic-bezier(0.22,1,0.36,1) both; overflow-y: auto; }
        @keyframes fadeIn { from { opacity: 0; } to { opacity: 1; } }
        @keyframes slideIn { from { transform: translateX(-100%); } to { transform: translateX(0); } }
        .h-drawer-top { padding: 28px 24px 20px; border-bottom: 1px solid rgba(255,255,255,0.06); display: flex; align-items: center; justify-content: space-between; }
        .h-drawer-logo-name { font-family: 'Playfair Display', serif; font-size: 22px; font-weight: 600; color: #f8f8f8; line-height: 1; }
        .h-drawer-nav { padding: 16px 0; flex: 1; }
        .h-drawer-link { display: flex; align-items: center; gap: 12px; padding: 14px 24px; font-family: 'Cormorant Garamond', serif; font-size: 22px; font-weight: 500; color: rgba(248,248,248,0.75); text-decoration: none; border-left: 3px solid transparent; transition: all 0.22s; }
        .h-drawer-link:hover { color: #f8f8f8; background: rgba(255,255,255,0.04); border-left-color: rgba(201,163,71,0.4); }
        .h-drawer-bottom { padding: 20px 24px; border-top: 1px solid rgba(255,255,255,0.06); display: flex; flex-direction: column; gap: 12px; }
      `}</style>

      <header style={{
        position: "fixed", top: 0, left: 0, right: 0, zIndex: 9999,
        background: scrolled ? "rgba(10,10,10,0.75)" : "#0a0a0a",
        backdropFilter: scrolled ? "blur(20px)" : "none",
        WebkitBackdropFilter: scrolled ? "blur(20px)" : "none",
        borderBottom: `1px solid ${scrolled ? "rgba(201,163,71,0.2)" : BORDER}`,
        boxShadow: scrolled ? "0 10px 40px rgba(0,0,0,0.5)" : "none",
        transition: "all 0.4s cubic-bezier(0.23, 1, 0.32, 1)",
      }}>
        <div style={{ 
          maxWidth: 1520, margin: "0 auto", padding: "0 4vw", 
          height: scrolled ? 76 : 92, 
          display: "flex", alignItems: "center", justifyContent: "space-between", 
          boxSizing: "border-box", transition: "height 0.4s ease" 
        }}>

          {/* ── Logo ── */}
          <Link href="/" style={{ display: "flex", alignItems: "center", gap: 14, textDecoration: "none" }}>
            <div className="h-logo-container" style={{ width: scrolled ? 40 : 48, height: scrolled ? 40 : 48, transition: "all 0.4s ease" }}>
              <div className="h-logo-ring" />
              <div style={{ position: "relative", width: "100%", height: "100%", borderRadius: "50%", overflow: "hidden", background: "rgba(255,255,255,0.05)" }}>
                <div className="h-shimmer-effect" />
                <Image 
                  src="/images/logo.webp" 
                  alt="Paris Easy Move Logo" 
                  fill 
                  sizes="48px" 
                  style={{ objectFit: "cover" }} 
                  priority
                />
              </div>
            </div>
            <div style={{ display: "flex", flexDirection: "column", gap: 1 }}>
              <span style={{ 
                fontFamily: "'Playfair Display', serif", fontSize: scrolled ? 24 : 29, 
                fontWeight: 600, color: TEXT, letterSpacing: "-0.01em", lineHeight: 1, 
                whiteSpace: "nowrap", transition: "font-size 0.4s ease" 
              }}>
                Paris <em style={{ fontStyle: "italic", color: GOLD, fontWeight: 500 }}>Easy</em> Move
              </span>
              <span style={{ 
                fontFamily: "'Montserrat', sans-serif", fontSize: scrolled ? 8.5 : 9.5, 
                fontWeight: 500, letterSpacing: "0.22em", textTransform: "uppercase", 
                color: TEXT_DIM, whiteSpace: "nowrap", transition: "font-size 0.4s ease" 
              }}>
                Luxe Transportation
              </span>
            </div>
          </Link>

          {/* ── Desktop Nav ── */}
          <nav className="h-desktop" style={{ display: "flex", alignItems: "center", gap: 4 }}>
            {navLinks.map((link) => (
              <Link key={link.href} href={link.href} className={link.disney ? "h-disney-link" : "h-navlink-u"}>
                {link.label}
              </Link>
            ))}
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
                <div style={{ fontFamily: "'Playfair Display', serif", fontSize: scrolled ? 15 : 16.5, fontWeight: 500, color: TEXT, transition: "font-size 0.4s ease" }}>+33 6 52 46 66 94</div>
              </div>
            </a>
            <Link href="/reservation" className="h-book-btn" style={{ 
              display: "inline-flex", alignItems: "center", gap: 10, padding: "0 26px", 
              height: scrolled ? 40 : 46, background: GOLD, color: "#0a0a0a", 
              fontFamily: "'Montserrat', sans-serif", fontSize: 13.2, fontWeight: 700, 
              letterSpacing: "0.08em", textTransform: "uppercase", borderRadius: 9, 
              textDecoration: "none", boxShadow: "0 4px 18px rgba(201,163,71,0.25)", 
              whiteSpace: "nowrap"
            }}>
              {t[lang].bookNow}
            </Link>
          </div>

          {/* ── Mobile Burger ── */}
          <button
            className={`h-mobile-btn${isOpen ? " h-burger-open" : ""}`}
            onClick={() => setIsOpen(!isOpen)}
            aria-label="Toggle menu"
            style={{ display: "flex", flexDirection: "column", gap: 5, width: 42, height: 42, alignItems: "center", justifyContent: "center", background: SURFACE, border: `1px solid ${BORDER}`, borderRadius: 9, cursor: "pointer" }}
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
            <div className="h-drawer-top">
              <div>
                <div className="h-drawer-logo-name">Paris <em style={{ fontStyle: "italic", color: GOLD }}>Easy</em> Move</div>
                <div style={{ fontSize: 9, color: TEXT_DIM, letterSpacing: '0.1em' }}>Luxe Transportation</div>
              </div>
              <button style={{ background: 'none', border: 'none', color: TEXT_DIM }} onClick={() => setIsOpen(false)}>
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M18 6L6 18M6 6l12 12"/></svg>
              </button>
            </div>
            <nav className="h-drawer-nav">
              {navLinks.map((link, i) => (
                <Link key={link.href} href={link.href} className={link.disney ? "h-drawer-disney-link" : "h-drawer-link"} onClick={() => setIsOpen(false)}>
                  <span style={{ fontSize: 10, color: GOLD, marginRight: 15, opacity: 0.6 }}>0{i + 1}</span>
                  {link.label}
                </Link>
              ))}
            </nav>
            <div className="h-drawer-bottom">
              <div style={{ display: 'flex', gap: 8 }}>
                <button onClick={() => setLang("en")} className={`h-lang-btn-s ${lang === "en" ? "active" : ""}`} style={{ flex: 1, border: `1px solid ${BORDER}` }}>EN</button>
                <button onClick={() => setLang("fr")} className={`h-lang-btn-s ${lang === "fr" ? "active" : ""}`} style={{ flex: 1, border: `1px solid ${BORDER}` }}>FR</button>
              </div>
              <Link href="/reservation" className="h-book-btn" style={{ background: GOLD, color: '#0a0a0a', textAlign: 'center', padding: '14px', borderRadius: 8, fontWeight: 700, textDecoration: 'none' }}>
                {t[lang].bookNow}
              </Link>
            </div>
          </div>
        </div>
      )}
    </>
  );
}