"use client";

import { useState, useEffect } from "react";
import Link from "next/link";

type Language = "en" | "fr";

export default function Header() {
  const [isOpen, setIsOpen] = useState(false);
  const [lang, setLang] = useState<Language>("en");
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 10);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const t = {
    en: {
      home: "Home", destinations: "Destinations", rates: "Rates",
      reservation: "Reservation", contact: "Contact",
      bookNow: "Get Started", callUs: "Call Us",
    },
    fr: {
      home: "Accueil", destinations: "Destinations", rates: "Tarifs",
      reservation: "Réservation", contact: "Contact",
      bookNow: "Commencer", callUs: "Appelez",
    },
  };

  const navLinks = [
    { href: "/", label: t[lang].home },
    { href: "/destinations", label: t[lang].destinations },
    { href: "/rates", label: t[lang].rates },
    { href: "/reservation", label: t[lang].reservation },
    { href: "/contact-us", label: t[lang].contact },
  ];

  const socialPaths = [
    { label: "Instagram", d: "M12 2.163c3.204 0 3.584.012 4.85.07 1.366.062 2.633.326 3.608 1.301.975.975 1.24 2.242 1.301 3.608.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.062 1.366-.326 2.633-1.301 3.608-.975.975-2.242 1.24-3.608 1.301-1.265.058-1.645.069-4.849.069-3.205 0-3.584-.012-4.849-.069-1.366-.062-2.633-.326-3.608-1.301-.975-.975-1.24-2.242-1.301-3.608C2.175 15.747 2.163 15.367 2.163 12c0-3.204.012-3.584.069-4.849.062-1.366.326-2.633 1.301-3.608.975-.975 2.242-1.24 3.608-1.301 1.265-.058 1.645-.069 4.849-.069zM12 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zm0 10.162a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 11-2.88 0 1.44 1.44 0 012.88 0z", href: "https://instagram.com/pariseasymove" },
    { label: "Facebook", d: "M22 12c0-5.523-4.477-10-10-10S2 6.477 2 12c0 4.991 3.657 9.128 8.438 9.878v-6.987h-2.54V12h2.54V9.797c0-2.506 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.26c-1.243 0-1.63.771-1.63 1.562V12h2.773l-.443 2.89h-2.33v6.988C18.343 21.128 22 16.991 22 12z", href: "https://facebook.com/pariseasymove" },
    { label: "WhatsApp", d: "M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.198-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.297-.497.099-.198.05-.371-.025-.52-.074-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.29.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L0 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z", href: "https://wa.me/33123456789" },
  ];

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Space+Grotesk:wght@300;400;500;600;700&family=Space+Mono:wght@400;700&display=swap');

        :root {
          --bg:        #FFFFFF;
          --surface:   rgba(0,0,0,0.04);
          --surface2:  rgba(0,0,0,0.07);
          --border:    rgba(0,0,0,0.09);
          --border2:   rgba(0,0,0,0.16);
          --white:     #0A0A0A;
          --dim:       rgba(0,0,0,0.58);
          --dim2:      rgba(0,0,0,0.82);
          --green:     #00A854;
          --green-dim: rgba(0,168,84,0.10);
          --green-glow:rgba(0,168,84,0.22);
          --orange:    #E84B2A;
        }

        * { box-sizing: border-box; margin: 0; padding: 0; }

        .h-root {
          position: fixed;
          top: 0; left: 0; right: 0;
          z-index: 999;
          background: rgba(255,255,255,0.88);
          backdrop-filter: blur(28px) saturate(1.6);
          -webkit-backdrop-filter: blur(28px) saturate(1.6);
          border-bottom: 1px solid var(--border);
          transition: border-color 0.3s, background 0.3s, box-shadow 0.3s;
        }
        .h-root.scrolled {
          background: rgba(255,255,255,0.97);
          border-bottom-color: var(--border2);
          box-shadow: 0 2px 24px rgba(0,0,0,0.07);
        }

        /* Subtle green glow line at top */
        .h-glow-line {
          position: absolute;
          top: 0; left: 0; right: 0;
          height: 1px;
          background: linear-gradient(90deg, transparent 0%, var(--green) 40%, var(--green) 60%, transparent 100%);
          opacity: 0.35;
        }

        .h-inner {
          max-width: 1440px;
          margin: 0 auto;
          padding: 0 32px;
          height: 68px;
          display: grid;
          grid-template-columns: auto 1fr auto;
          align-items: center;
          gap: 24px;
        }

        /* ── LOGO ── */
        .h-logo {
          text-decoration: none;
          display: flex;
          align-items: center;
          gap: 12px;
          flex-shrink: 0;
        }

        /* Animated logo mark */
        .h-logo-mark {
          position: relative;
          width: 38px; height: 38px;
          flex-shrink: 0;
        }
        .h-logo-mark-ring {
          position: absolute;
          inset: 0;
          border-radius: 10px;
          border: 1.5px solid var(--green);
          opacity: 0.6;
          transition: opacity 0.3s, transform 0.3s;
        }
        .h-logo:hover .h-logo-mark-ring {
          opacity: 1;
          transform: scale(1.1);
        }
        .h-logo-mark-inner {
          position: absolute;
          inset: 5px;
          background: var(--green-dim);
          border-radius: 6px;
          display: flex; align-items: center; justify-content: center;
          transition: background 0.3s;
        }
        .h-logo:hover .h-logo-mark-inner { background: rgba(0,230,118,0.2); }
        .h-logo-mark-inner svg { width: 16px; height: 16px; color: var(--green); }

        .h-logo-text { display: flex; flex-direction: column; gap: 2px; }
        .h-logo-name {
          font-family: 'Space Grotesk', sans-serif;
          font-size: 19px; font-weight: 700;
          color: #0A0A0A;
          letter-spacing: -0.02em;
          line-height: 1;
          white-space: nowrap;
        }
        .h-logo-name em {
          font-style: normal;
          color: var(--green);
        }
        .h-logo-sub {
          font-family: 'Space Mono', monospace;
          font-size: 9.5px; font-weight: 500;
          color: rgba(0,0,0,0.48);
          letter-spacing: 0.12em;
          text-transform: uppercase;
        }

        /* ── NAV ── */
        .h-nav {
          display: none;
          align-items: center;
          justify-content: center;
          gap: 2px;
        }
        @media (min-width: 960px) { .h-nav { display: flex; } }

        .h-navlink {
          font-family: 'Space Grotesk', sans-serif;
          font-size: 14.5px; font-weight: 600;
          color: rgba(0,0,0,0.55);
          text-decoration: none;
          padding: 7px 14px;
          border-radius: 8px;
          border: 1px solid transparent;
          transition: color 0.2s, background 0.2s, border-color 0.2s;
          white-space: nowrap;
        }
        .h-navlink:hover {
          color: #0A0A0A;
          background: var(--surface2);
          border-color: var(--border);
        }

        /* ── RIGHT CONTROLS ── */
        .h-right {
          display: none;
          align-items: center;
          gap: 10px;
          flex-shrink: 0;
        }
        @media (min-width: 960px) { .h-right { display: flex; } }

        /* Socials */
        .h-socials { display: flex; gap: 4px; }
        .h-social {
          width: 32px; height: 32px;
          display: flex; align-items: center; justify-content: center;
          color: var(--dim); border-radius: 8px; text-decoration: none;
          border: 1px solid transparent;
          transition: color 0.2s, border-color 0.2s, background 0.2s;
        }
        .h-social:hover {
          color: var(--white);
          border-color: var(--border);
          background: var(--surface2);
        }
        .h-social svg { width: 14px; height: 14px; }

        /* Separator */
        .h-sep {
          width: 1px; height: 20px;
          background: var(--border2);
          flex-shrink: 0;
        }

        /* Lang */
        .h-lang {
          display: flex;
          background: var(--surface);
          border: 1px solid var(--border);
          border-radius: 8px;
          padding: 3px;
          gap: 2px;
        }
        .h-lang-btn {
          background: none; border: none; cursor: pointer;
          font-family: 'Space Mono', monospace;
          font-size: 10px; font-weight: 700;
          color: var(--dim);
          padding: 5px 10px; border-radius: 5px;
          transition: background 0.2s, color 0.2s;
          letter-spacing: 0.06em;
        }
        .h-lang-btn.active {
          background: var(--surface2);
          color: var(--white);
          border: 1px solid var(--border2);
        }

        /* Phone */
        .h-phone {
          display: flex; align-items: center; gap: 8px;
          text-decoration: none;
          background: var(--surface);
          border: 1px solid var(--border);
          border-radius: 10px;
          padding: 7px 13px;
          transition: border-color 0.2s, background 0.2s;
          flex-shrink: 0;
          white-space: nowrap;
        }
        .h-phone:hover {
          background: var(--surface2);
          border-color: var(--border2);
        }
        .h-phone-pulse {
          width: 7px; height: 7px;
          background: var(--green);
          border-radius: 50%;
          flex-shrink: 0;
          box-shadow: 0 0 6px var(--green-glow);
          animation: glow-pulse 2s ease-in-out infinite;
        }
        @keyframes glow-pulse {
          0%,100% { box-shadow: 0 0 4px var(--green-glow); }
          50%      { box-shadow: 0 0 12px var(--green-glow), 0 0 20px rgba(0,230,118,0.12); }
        }
        .h-phone-info { display: flex; flex-direction: column; gap: 1px; }
        .h-phone-label {
          font-family: 'Space Mono', monospace;
          font-size: 8px; color: var(--dim);
          letter-spacing: 0.1em; text-transform: uppercase; white-space: nowrap;
        }
        .h-phone-num {
          font-family: 'Space Grotesk', sans-serif;
          font-size: 12.5px; font-weight: 600;
          color: var(--white); white-space: nowrap; letter-spacing: 0.01em;
        }

        /* CTA */
        .h-cta {
          position: relative;
          display: flex; align-items: center; gap: 7px;
          text-decoration: none;
          font-family: 'Space Grotesk', sans-serif;
          font-size: 13px; font-weight: 600;
          color: #fff;
          background: var(--green);
          padding: 0 20px; height: 40px;
          border-radius: 10px;
          white-space: nowrap; flex-shrink: 0;
          overflow: hidden;
          transition: box-shadow 0.25s, transform 0.2s;
          letter-spacing: -0.01em;
        }
        .h-cta::before {
          content: '';
          position: absolute;
          inset: 0;
          background: linear-gradient(135deg, rgba(255,255,255,0.2) 0%, transparent 60%);
          pointer-events: none;
        }
        .h-cta:hover {
          box-shadow: 0 0 20px var(--green-glow), 0 4px 12px rgba(0,0,0,0.3);
          transform: translateY(-1px);
        }
        .h-cta-arrow { font-size: 15px; transition: transform 0.2s; }
        .h-cta:hover .h-cta-arrow { transform: translateX(3px); }

        /* ── BURGER ── */
        .h-burger {
          display: none;
          flex-direction: column; align-items: center; justify-content: center;
          gap: 5px; width: 40px; height: 40px;
          background: var(--surface); border: 1px solid var(--border);
          border-radius: 10px; cursor: pointer;
          transition: background 0.2s, border-color 0.2s;
        }
        @media (max-width: 959px) { .h-burger { display: flex; } }
        .h-burger:hover { background: var(--surface2); border-color: var(--border2); }

        .h-bline {
          display: block; height: 1.5px; background: var(--dim2);
          border-radius: 2px; transform-origin: center;
          transition: transform 0.3s, opacity 0.3s, width 0.3s;
        }
        .h-bline:nth-child(1) { width: 18px; }
        .h-bline:nth-child(2) { width: 12px; }
        .h-bline:nth-child(3) { width: 18px; }
        .h-burger.open .h-bline:nth-child(1) { transform: translateY(6.5px) rotate(45deg); width: 18px; }
        .h-burger.open .h-bline:nth-child(2) { opacity: 0; }
        .h-burger.open .h-bline:nth-child(3) { transform: translateY(-6.5px) rotate(-45deg); width: 18px; }

        /* ── MOBILE DRAWER ── */
        .h-mobile {
          background: rgba(255,255,255,0.99);
          border-top: 1px solid var(--border);
          overflow: hidden; max-height: 0;
          transition: max-height 0.42s cubic-bezier(0.4,0,0.2,1);
        }
        .h-mobile.open { max-height: 600px; }
        @media (min-width: 960px) { .h-mobile { display: none; } }

        .h-mob-inner { padding: 12px 24px 8px; }

        .h-mob-link {
          display: flex; align-items: center; justify-content: space-between;
          font-family: 'Space Grotesk', sans-serif;
          font-size: 22px; font-weight: 600;
          color: var(--dim2);
          text-decoration: none;
          padding: 12px 0;
          border-bottom: 1px solid var(--border);
          letter-spacing: -0.02em;
          transition: color 0.2s;
        }
        .h-mob-link:hover { color: var(--green); }

        .h-mob-bottom {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 10px;
          padding: 18px 24px;
        }
        .h-mob-cta {
          display: flex; align-items: center; justify-content: center; gap: 7px;
          text-decoration: none;
          font-family: 'Space Grotesk', sans-serif;
          font-size: 13px; font-weight: 600;
          color: #fff; background: var(--green);
          padding: 14px; border-radius: 10px;
          transition: box-shadow 0.2s;
        }
        .h-mob-cta:hover { box-shadow: 0 0 20px var(--green-glow); }

        .h-mob-phone {
          display: flex; align-items: center; gap: 10px;
          text-decoration: none;
          background: var(--surface);
          border: 1px solid var(--border);
          padding: 12px 16px; border-radius: 10px;
          transition: border-color 0.2s;
        }
        .h-mob-phone:hover { border-color: var(--border2); }

        .h-mob-foot {
          display: flex; align-items: center; justify-content: space-between;
          padding: 0 24px 20px;
        }
        .h-mob-socials { display: flex; gap: 6px; }
        .h-mob-social {
          width: 36px; height: 36px;
          display: flex; align-items: center; justify-content: center;
          background: var(--surface); border: 1px solid var(--border);
          border-radius: 8px; color: var(--dim);
          text-decoration: none; transition: color 0.2s, border-color 0.2s;
        }
        .h-mob-social:hover { color: var(--white); border-color: var(--border2); }
        .h-mob-social svg { width: 15px; height: 15px; }
      `}</style>

      <header className={`h-root${scrolled ? " scrolled" : ""}`}>
        <div className="h-glow-line" />

        <div className="h-inner">
          {/* Logo */}
          <Link href="/" className="h-logo">
            <div className="h-logo-mark">
              <div className="h-logo-mark-ring" />
              <div className="h-logo-mark-inner">
                <svg fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M5 8h14M5 8a2 2 0 110-4h14a2 2 0 110 4M5 8v10a2 2 0 002 2h10a2 2 0 002-2V8m-9 4h4"/>
                </svg>
              </div>
            </div>
            <div className="h-logo-text">
              <span className="h-logo-name">Paris <em>Easy</em> Move</span>
              <span className="h-logo-sub">Premium Moving · Paris</span>
            </div>
          </Link>

          {/* Nav */}
          <nav className="h-nav">
            {navLinks.map(link => (
              <Link key={link.href} href={link.href} className="h-navlink">{link.label}</Link>
            ))}
          </nav>

          {/* Right controls */}
          <div className="h-right">
            <div className="h-socials">
              {socialPaths.map(s => (
                <a key={s.label} href={s.href} target="_blank" rel="noopener noreferrer" className="h-social" aria-label={s.label}>
                  <svg fill="currentColor" viewBox="0 0 24 24"><path d={s.d}/></svg>
                </a>
              ))}
            </div>

            <div className="h-sep" />

            <div className="h-lang">
              <button onClick={() => setLang("en")} className={`h-lang-btn${lang==="en"?" active":""}`}>EN</button>
              <button onClick={() => setLang("fr")} className={`h-lang-btn${lang==="fr"?" active":""}`}>FR</button>
            </div>

            <div className="h-sep" />

            <a href="tel:+33123456789" className="h-phone">
              <span className="h-phone-pulse" />
              <div className="h-phone-info">
                <span className="h-phone-label">{t[lang].callUs}</span>
                <span className="h-phone-num">+33 1 23 45 67 89</span>
              </div>
            </a>

            <Link href="/reservation" className="h-cta">
              {t[lang].bookNow}
              <span className="h-cta-arrow">→</span>
            </Link>
          </div>

          {/* Burger */}
          <button className={`h-burger${isOpen?" open":""}`} onClick={() => setIsOpen(!isOpen)} aria-label="Toggle menu">
            <span className="h-bline"/><span className="h-bline"/><span className="h-bline"/>
          </button>
        </div>

        {/* Mobile drawer */}
        <div className={`h-mobile${isOpen?" open":""}`}>
          <div className="h-mob-inner">
            {navLinks.map(link => (
              <Link key={link.href} href={link.href} className="h-mob-link" onClick={() => setIsOpen(false)}>
                {link.label}
                <span style={{fontSize:16, color:"rgba(0,0,0,0.18)"}}>→</span>
              </Link>
            ))}
          </div>
          <div className="h-mob-bottom">
            <Link href="/reservation" className="h-mob-cta" onClick={() => setIsOpen(false)}>
              {t[lang].bookNow} →
            </Link>
            <a href="tel:+33123456789" className="h-mob-phone">
              <span className="h-phone-pulse" />
              <div className="h-phone-info">
                <span className="h-phone-label">{t[lang].callUs}</span>
                <span className="h-phone-num">+33 1 23 45 67 89</span>
              </div>
            </a>
          </div>
          <div className="h-mob-foot">
            <div className="h-mob-socials">
              {socialPaths.map(s => (
                <a key={s.label} href={s.href} target="_blank" rel="noopener noreferrer" className="h-mob-social" aria-label={s.label}>
                  <svg fill="currentColor" viewBox="0 0 24 24"><path d={s.d}/></svg>
                </a>
              ))}
            </div>
            <div className="h-lang">
              <button onClick={() => setLang("en")} className={`h-lang-btn${lang==="en"?" active":""}`}>EN</button>
              <button onClick={() => setLang("fr")} className={`h-lang-btn${lang==="fr"?" active":""}`}>FR</button>
            </div>
          </div>
        </div>
      </header>
    </>
  );
}