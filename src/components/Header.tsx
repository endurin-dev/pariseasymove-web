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
    en: {
      home: "Home",
      destinations: "Destinations",
      rates: "Rates",
      reservation: "Reservation",
      contact: "Contact",
      bookNow: "Reserve Your Journey",
      callUs: "Speak With Us",
    },
    fr: {
      home: "Accueil",
      destinations: "Destinations",
      rates: "Tarifs",
      reservation: "Réservation",
      contact: "Contact",
      bookNow: "Réservez Votre Voyage",
      callUs: "Contactez-nous",
    },
  };

  const navLinks = [
    { href: "/", label: t[lang].home },
    { href: "/destinations", label: t[lang].destinations },
    { href: "/rates", label: t[lang].rates },
    { href: "/reservation", label: t[lang].reservation },
    { href: "/contact-us", label: t[lang].contact },
  ];

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,400;0,500;0,600;0,700;1,400&family=Playfair+Display:ital,wght@0,400;0,500;0,600;0,700;1,400&family=Montserrat:wght@400;500;600;700&display=swap');

        :root {
          --bg:            #0a1425;
          --surface:       rgba(255,255,255,0.035);
          --surface2:      rgba(255,255,255,0.07);
          --border:        rgba(255,255,255,0.085);
          --gold:          #c9a347;
          --gold-dim:      rgba(201,163,71,0.16);
          --gold-glow:     rgba(201,163,71,0.26);
          --text:          #f8f8f8;
          --text-dim:      rgba(248,248,248,0.78);
          --emerald:       #1a6b52;
        }

        * { box-sizing: border-box; margin: 0; padding: 0; }

        .h-root {
          position: fixed;
          top: 0; left: 0; right: 0;
          z-index: 9999;
          background: var(--bg);
          backdrop-filter: blur(18px) saturate(1.85);
          border-bottom: 1px solid var(--border);
          transition: all 0.5s ease;
        }

        .h-root.scrolled {
          background: rgba(10,20,37,0.94);
          border-bottom-color: rgba(201,163,71,0.22);
          box-shadow: 0 6px 32px rgba(0,0,0,0.42);
        }

        .h-inner {
          max-width: 1520px;
          margin: 0 auto;
          padding: 0 4vw;
          height: 92px;
          display: flex;
          align-items: center;
          justify-content: space-between;
        }

        /* Logo */
        .h-logo {
          display: flex;
          align-items: center;
          gap: 14px;
          text-decoration: none;
          transition: transform 0.4s ease;
        }

        .h-logo:hover { transform: translateY(-1px); }

        .h-logo-mark {
          position: relative;
          width: 42px;
          height: 42px;
          flex-shrink: 0;
        }

        .h-logo-mark-ring {
          position: absolute;
          inset: -5px;
          border: 1px solid var(--gold-dim);
          border-radius: 50%;
          opacity: 0.5;
          transition: all 0.6s cubic-bezier(0.23,1,0.32,1);
        }

        .h-logo:hover .h-logo-mark-ring {
          inset: -9px;
          opacity: 0.75;
          transform: scale(1.12);
        }

        .h-logo-mark-inner {
          position: absolute;
          inset: 0;
          background: radial-gradient(circle at 30% 30%, var(--gold-dim) 0%, transparent 70%);
          border-radius: 50%;
          display: flex;
          align-items: center;
          justify-content: center;
        }

        .h-logo-mark svg {
          width: 20px;
          height: 20px;
          color: var(--gold);
          stroke-width: 1.7;
        }

        .h-logo-text {
          display: flex;
          flex-direction: column;
          gap: 2px;
        }

        .h-logo-name {
          font-family: 'Playfair Display', serif;
          font-size: 29px;
          font-weight: 600;
          color: var(--text);
          letter-spacing: -0.025em;
          line-height: 1;
          white-space: nowrap;
        }

        .h-logo-name em {
          font-style: italic;
          color: var(--gold);
          font-weight: 500;
        }

        .h-logo-sub {
          font-family: 'Montserrat', sans-serif;
          font-size: 9.5px;
          font-weight: 500;
          letter-spacing: 0.24em;
          text-transform: uppercase;
          color: var(--text-dim);
          white-space: nowrap;
        }

        /* Navigation – luxury serif font */
        .h-nav {
          display: none;
          align-items: center;
          gap: 6px;           /* slightly increased from previous tight version for better readability */
        }

        @media (min-width: 1080px) {
          .h-nav { display: flex; }
        }

        .h-navlink {
          font-family: 'Cormorant Garamond', serif;
          font-size: 16px;
          font-weight: 500;
          font-style: normal;
          color: var(--text-dim);
          text-decoration: none;
          padding: 6px 14px;
          letter-spacing: 0.05em;
          transition: all 0.3s ease;
          border-radius: 6px;
          white-space: nowrap;
          position: relative;
        }

        .h-navlink:hover {
          color: var(--text);
          background: var(--surface);
          letter-spacing: 0.07em;
        }

        .h-navlink::after {
          content: '';
          position: absolute;
          width: 0;
          height: 1px;
          bottom: 4px;
          left: 50%;
          background: var(--gold);
          transition: width 0.4s ease;
          transform: translateX(-50%);
        }

        .h-navlink:hover::after {
          width: 65%;
        }

        /* Right controls – no social icons */
        .h-controls {
          display: flex;
          align-items: center;
          gap: 18px;
          flex-shrink: 0;
        }

        @media (max-width: 1079px) {
          .h-controls { display: none; }
        }

        .h-divider {
          width: 1px;
          height: 28px;
          background: linear-gradient(to bottom, transparent, var(--border), transparent);
          opacity: 0.5;
        }

        .h-lang {
          display: flex;
          background: var(--surface);
          border: 1px solid var(--border);
          border-radius: 7px;
          padding: 2px;
        }

        .h-lang-btn {
          background: none;
          border: none;
          padding: 5px 11px;
          font-family: 'Montserrat', sans-serif;
          font-size: 10.8px;
          font-weight: 600;
          color: var(--text-dim);
          cursor: pointer;
          transition: all 0.25s ease;
          text-transform: uppercase;
          letter-spacing: 0.09em;
        }

        .h-lang-btn.active {
          background: var(--gold-dim);
          color: var(--gold);
        }

        .h-phone {
          display: flex;
          align-items: center;
          gap: 12px;
          padding: 8px 17px;
          border: 1px solid var(--border);
          border-radius: 9px;
          text-decoration: none;
          transition: all 0.32s ease;
          white-space: nowrap;
        }

        .h-phone:hover {
          border-color: var(--gold-dim);
          background: var(--surface2);
        }

        .h-phone-pulse {
          width: 8px;
          height: 8px;
          background: var(--emerald);
          border-radius: 50%;
          box-shadow: 0 0 12px rgba(26,107,82,0.5);
          animation: pulse-lux 2.8s infinite ease-in-out;
        }

        @keyframes pulse-lux {
          0%, 100% { box-shadow: 0 0 6px rgba(26,107,82,0.35); }
          50%      { box-shadow: 0 0 16px rgba(26,107,82,0.7); }
        }

        .h-phone-label {
          font-family: 'Montserrat', sans-serif;
          font-size: 9px;
          font-weight: 600;
          letter-spacing: 0.14em;
          text-transform: uppercase;
          color: var(--text-dim);
        }

        .h-phone-num {
          font-family: 'Playfair Display', serif;
          font-size: 16.5px;
          font-weight: 500;
          color: var(--text);
          letter-spacing: -0.01em;
        }

        .h-cta {
          display: inline-flex;
          align-items: center;
          gap: 10px;
          padding: 0 26px;
          height: 46px;
          background: var(--gold);
          color: #0a1425;
          font-family: 'Montserrat', sans-serif;
          font-size: 13.2px;
          font-weight: 600;
          letter-spacing: 0.08em;
          text-transform: uppercase;
          border-radius: 9px;
          text-decoration: none;
          box-shadow: 0 4px 18px var(--gold-dim);
          transition: all 0.38s cubic-bezier(0.22,1,0.36,1);
        }

        .h-cta:hover {
          transform: translateY(-2px);
          box-shadow: 0 12px 34px rgba(201,163,71,0.36);
        }

        /* Mobile burger */
        .h-burger {
          display: flex;
          flex-direction: column;
          gap: 5px;
          width: 42px;
          height: 42px;
          background: var(--surface);
          border: 1px solid var(--border);
          border-radius: 9px;
          cursor: pointer;
          transition: all 0.3s;
        }

        @media (min-width: 1080px) {
          .h-burger { display: none; }
        }

        .h-burger:hover {
          background: var(--surface2);
          border-color: var(--gold-dim);
        }

        .h-bline {
          height: 1.8px;
          background: var(--text-dim);
          border-radius: 1px;
          transition: all 0.4s;
        }

        .h-bline:nth-child(1) { width: 20px; }
        .h-bline:nth-child(2) { width: 14px; }
        .h-bline:nth-child(3) { width: 20px; }

        .h-burger.open .h-bline:nth-child(1) {
          transform: translateY(6.5px) rotate(45deg);
          width: 20px;
        }

        .h-burger.open .h-bline:nth-child(2) {
          opacity: 0;
          width: 0;
        }

        .h-burger.open .h-bline:nth-child(3) {
          transform: translateY(-6.5px) rotate(-45deg);
          width: 20px;
        }

        /* Mobile menu placeholder */
        .h-mobile {
          position: fixed;
          top: 92px;
          left: 0;
          right: 0;
          bottom: 0;
          background: var(--bg);
          transform: translateY(-100%);
          transition: transform 0.45s cubic-bezier(0.4, 0, 0.2, 1);
          overflow-y: auto;
        }

        .h-mobile.open {
          transform: translateY(0);
        }
      `}</style>

      <header className={`h-root${scrolled ? " scrolled" : ""}`}>
        <div className="h-inner">
          {/* Logo */}
          <Link href="/" className="h-logo">
            <div className="h-logo-mark">
              <div className="h-logo-mark-ring" />
              <div className="h-logo-mark-inner">
                <svg fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="1.7">
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M5 8h14M5 8a2 2 0 110-4h14a2 2 0 110 4M5 8v10a2 2 0 002 2h10a2 2 0 002-2V8m-9 4h4"
                  />
                </svg>
              </div>
            </div>
            <div className="h-logo-text">
              <span className="h-logo-name">
                Paris <em>Easy</em> Move
              </span>
              <span className="h-logo-sub">Luxury Relocation · Paris</span>
            </div>
          </Link>

          {/* Desktop Navigation – luxury serif */}
          <nav className="h-nav">
            {navLinks.map((link) => (
              <Link key={link.href} href={link.href} className="h-navlink">
                {link.label}
              </Link>
            ))}
          </nav>

          {/* Right Controls – NO social icons */}
          <div className="h-controls">
            <div className="h-lang">
              <button
                onClick={() => setLang("en")}
                className={`h-lang-btn${lang === "en" ? " active" : ""}`}
              >
                EN
              </button>
              <button
                onClick={() => setLang("fr")}
                className={`h-lang-btn${lang === "fr" ? " active" : ""}`}
              >
                FR
              </button>
            </div>

            <div className="h-divider" />

            <a href="tel:+33123456789" className="h-phone">
              <span className="h-phone-pulse" />
              <div>
                <div className="h-phone-label">{t[lang].callUs}</div>
                <div className="h-phone-num">+33 1 23 45 67 89</div>
              </div>
            </a>

            <Link href="/reservation" className="h-cta">
              {t[lang].bookNow}
            </Link>
          </div>

          {/* Mobile Burger */}
          <button
            className={`h-burger${isOpen ? " open" : ""}`}
            onClick={() => setIsOpen(!isOpen)}
            aria-label="Toggle menu"
          >
            <span className="h-bline" />
            <span className="h-bline" />
            <span className="h-bline" />
          </button>
        </div>

        {/* Mobile Menu – placeholder (add your mobile nav content here) */}
        <div className={`h-mobile${isOpen ? " open" : ""}`}>
          {/* Your mobile menu content goes here */}
        </div>
      </header>
    </>
  );
}