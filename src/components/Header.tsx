"use client";

import { useState, useEffect } from "react";
import Link from "next/link";

type Language = "en" | "fr";

export default function Header() {
  const [isOpen, setIsOpen] = useState(false);
  const [lang, setLang] = useState<Language>("en");
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 32);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const t = {
    en: { home: "Home", destinations: "Destinations", rates: "Rates", reservation: "Reservation", contact: "Contact", bookNow: "Reserve Your Journey", callUs: "Speak With Us" },
    fr: { home: "Accueil", destinations: "Destinations", rates: "Tarifs", reservation: "Réservation", contact: "Contact", bookNow: "Réservez Votre Voyage", callUs: "Contactez-nous" },
  };

  const navLinks = [
    { href: "/", label: t[lang].home },
    { href: "/destinations", label: t[lang].destinations },
    { href: "/rates", label: t[lang].rates },
    { href: "/reservation", label: t[lang].reservation },
    { href: "/contact-us", label: t[lang].contact },
  ];

  const GOLD = "#c9a347";
  const TEXT = "#f8f8f8";
  const TEXT_DIM = "rgba(248,248,248,0.78)";
  const BORDER = "rgba(255,255,255,0.085)";
  const SURFACE = "rgba(255,255,255,0.035)";

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,400;0,500;0,600;0,700;1,400&family=Playfair+Display:ital,wght@0,400;0,500;0,600;0,700;1,400&family=Montserrat:wght@400;500;600;700&display=swap');

        .h-navlink-u::after {
          content: '';
          position: absolute;
          width: 0;
          height: 1px;
          bottom: 4px;
          left: 50%;
          background: #c9a347;
          transition: width 0.4s ease;
          transform: translateX(-50%);
        }
        .h-navlink-u:hover::after { width: 65%; }
        .h-navlink-u:hover { background: rgba(255,255,255,0.035) !important; color: #f8f8f8 !important; }

        .h-burger-line { height: 1.8px; background: rgba(248,248,248,0.78); border-radius: 1px; transition: all 0.4s; }
        .h-burger-line:nth-child(1) { width: 20px; }
        .h-burger-line:nth-child(2) { width: 14px; }
        .h-burger-line:nth-child(3) { width: 20px; }

        .h-lang-btn-s { background: none; border: none; padding: 5px 11px; font-family: 'Montserrat', sans-serif; font-size: 10.8px; font-weight: 600; color: rgba(248,248,248,0.78); cursor: pointer; text-transform: uppercase; letter-spacing: 0.09em; }
        .h-lang-btn-s.active { background: rgba(201,163,71,0.16); color: #c9a347; border-radius: 5px; }

        @keyframes h-pulse { 0%,100%{box-shadow:0 0 6px rgba(26,107,82,0.35)} 50%{box-shadow:0 0 16px rgba(26,107,82,0.7)} }

        @media (max-width: 1079px) { .h-desktop { display: none !important; } }
        @media (min-width: 1080px) { .h-mobile-btn { display: none !important; } }
      `}</style>

      <header style={{
        position: "fixed",
        top: 0, left: 0, right: 0,
        zIndex: 9999,
        background: scrolled ? "rgba(10,10,10,0.5)" : "#0a0a0a",
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

          {/* Logo */}
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
                Paris <em style={{ fontStyle: "italic", color: GOLD, fontWeight: 500 }}>Easy</em> Dan
              </span>
              <span style={{ fontFamily: "'Montserrat', sans-serif", fontSize: 9.5, fontWeight: 500, letterSpacing: "0.24em", textTransform: "uppercase", color: TEXT_DIM, whiteSpace: "nowrap" }}>
                Paris journey starts here
              </span>
            </div>
          </Link>

          {/* Desktop Nav */}
          <nav className="h-desktop" style={{ display: "flex", alignItems: "center", gap: 6 }}>
            {navLinks.map((link) => (
              <Link key={link.href} href={link.href} className="h-navlink-u" style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: 16, fontWeight: 500, color: TEXT_DIM, textDecoration: "none", padding: "6px 14px", letterSpacing: "0.05em", borderRadius: 6, whiteSpace: "nowrap", position: "relative", transition: "all 0.3s ease" }}>
                {link.label}
              </Link>
            ))}
          </nav>

          {/* Right Controls */}
          <div className="h-desktop" style={{ display: "flex", alignItems: "center", gap: 18, flexShrink: 0 }}>
            {/* Lang */}
            <div style={{ display: "flex", background: SURFACE, border: `1px solid ${BORDER}`, borderRadius: 7, padding: 2 }}>
              <button onClick={() => setLang("en")} className={`h-lang-btn-s${lang === "en" ? " active" : ""}`}>EN</button>
              <button onClick={() => setLang("fr")} className={`h-lang-btn-s${lang === "fr" ? " active" : ""}`}>FR</button>
            </div>

            {/* Divider */}
            <div style={{ width: 1, height: 28, background: `linear-gradient(to bottom, transparent, ${BORDER}, transparent)`, opacity: 0.5 }} />

            {/* Phone */}
            <a href="tel:+33123456789" style={{ display: "flex", alignItems: "center", gap: 12, padding: "8px 17px", border: `1px solid ${BORDER}`, borderRadius: 9, textDecoration: "none", whiteSpace: "nowrap" }}>
              <span style={{ width: 8, height: 8, background: "#1a6b52", borderRadius: "50%", boxShadow: "0 0 12px rgba(26,107,82,0.5)", animation: "h-pulse 2.8s infinite ease-in-out", flexShrink: 0 }} />
              <div>
                <div style={{ fontFamily: "'Montserrat', sans-serif", fontSize: 9, fontWeight: 600, letterSpacing: "0.14em", textTransform: "uppercase", color: TEXT_DIM }}>{t[lang].callUs}</div>
                <div style={{ fontFamily: "'Playfair Display', serif", fontSize: 16.5, fontWeight: 500, color: TEXT, letterSpacing: "-0.01em" }}>+33 1 23 45 67 89</div>
              </div>
            </a>

            {/* CTA */}
            <Link href="/reservation" style={{ display: "inline-flex", alignItems: "center", gap: 10, padding: "0 26px", height: 46, background: GOLD, color: "#0a0a0a", fontFamily: "'Montserrat', sans-serif", fontSize: 13.2, fontWeight: 600, letterSpacing: "0.08em", textTransform: "uppercase", borderRadius: 9, textDecoration: "none", boxShadow: "0 4px 18px rgba(201,163,71,0.25)", whiteSpace: "nowrap" }}>
              {t[lang].bookNow}
            </Link>
          </div>

          {/* Mobile Burger */}
          <button className="h-mobile-btn" onClick={() => setIsOpen(!isOpen)} aria-label="Toggle menu" style={{ display: "flex", flexDirection: "column", gap: 5, width: 42, height: 42, alignItems: "center", justifyContent: "center", background: SURFACE, border: `1px solid ${BORDER}`, borderRadius: 9, cursor: "pointer" }}>
            <span className="h-burger-line" />
            <span className="h-burger-line" />
            <span className="h-burger-line" />
          </button>
        </div>

        {/* Mobile Menu */}
        {isOpen && (
          <div style={{ position: "fixed", top: 92, left: 0, right: 0, bottom: 0, background: "#0a0a0a", overflowY: "auto", padding: "32px 6vw" }}>
            {navLinks.map((link) => (
              <Link key={link.href} href={link.href} onClick={() => setIsOpen(false)} style={{ display: "block", fontFamily: "'Cormorant Garamond', serif", fontSize: 28, fontWeight: 400, color: TEXT, textDecoration: "none", padding: "16px 0", borderBottom: `1px solid ${BORDER}` }}>
                {link.label}
              </Link>
            ))}
            <div style={{ marginTop: 32, display: "flex", flexDirection: "column", gap: 16 }}>
              <a href="tel:+33123456789" style={{ fontFamily: "'Playfair Display', serif", fontSize: 22, color: TEXT, textDecoration: "none" }}>+33 1 23 45 67 89</a>
              <Link href="/reservation" onClick={() => setIsOpen(false)} style={{ display: "inline-flex", alignItems: "center", justifyContent: "center", padding: "14px 28px", background: GOLD, color: "#0a0a0a", fontFamily: "'Montserrat', sans-serif", fontSize: 13, fontWeight: 600, letterSpacing: "0.08em", textTransform: "uppercase", borderRadius: 9, textDecoration: "none" }}>
                {t[lang].bookNow}
              </Link>
            </div>
          </div>
        )}
      </header>
    </>
  );
}