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

  useEffect(() => { setIsOpen(false); }, [pathname]);

  const t = {
    en: { home: "Home", disney: "DisneyLand", rates: "Rates", blog: "Blog", reservation: "Reservation", contact: "Contact", bookNow: "Reserve Now", callUs: "Speak With Us" },
    fr: { home: "Accueil", disney: "DisneyLand", rates: "Tarifs", blog: "Blog", reservation: "Réservation", contact: "Contact", bookNow: "Réserver", callUs: "Contactez-nous" },
  };

  const navLinks = [
    { href: "/", label: t[lang].home, disney: false, blog: false },
    { href: "/disney", label: t[lang].disney, disney: true, blog: false },
    { href: "/rates", label: t[lang].rates, disney: false, blog: false },
    { href: "/reservation", label: t[lang].reservation, disney: false, blog: false },
    { href: "/blog", label: t[lang].blog, disney: false, blog: true },
    { href: "/contact-us", label: t[lang].contact, disney: false, blog: false },
  ];

  // ── Brand colors pulled from the PEM logo ──────────────────────────────
  // Logo: deep teal bg (#0d3d4a / #0a2e38), crisp white letterforms, dark navy base
  const TEAL_DEEP   = "#0d3d4a";   // dominant logo bg teal
  const TEAL_MID    = "#0f4d5e";   // slightly lighter teal for hover surfaces
  const TEAL_GLOW   = "rgba(13,61,74,0.55)"; // translucent teal for backdrops
  const WHITE       = "#f4f8f9";   // crisp off-white matching logo text
  const WHITE_DIM   = "rgba(244,248,249,0.7)";
  const BORDER      = "rgba(244,248,249,0.1)";
  const BORDER_MID  = "rgba(244,248,249,0.18)";
  const ACCENT      = "#7ecfdf";   // light teal highlight (drawn from lighter tones in logo gradient)
  const SURFACE     = "rgba(13,61,74,0.35)";

  const isBlogActive = pathname === "/blog" || pathname.startsWith("/blog/");

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Cinzel:wght@400;500;600;700&family=Cinzel+Decorative:wght@400;700&family=Cormorant+Garamond:ital,wght@0,400;0,500;0,600;1,400;1,600&family=Montserrat:wght@400;500;600;700&display=swap');

        /* ── Logo image ── */
        .h-logo-wrap {
          position: relative;
          overflow: hidden;
          border-radius: 4px;
          transition: all 0.4s cubic-bezier(0.23, 1, 0.32, 1);
          /* Subtle teal glow matching the logo's deep teal bg */
          box-shadow: 0 0 0 1px rgba(126,207,223,0.18), 0 4px 20px rgba(13,61,74,0.5);
        }
        .h-logo-wrap:hover {
          box-shadow: 0 0 0 1px rgba(126,207,223,0.35), 0 6px 28px rgba(13,61,74,0.8);
          transform: translateY(-1px);
        }
        /* Shimmer sweep across logo on hover */
        .h-logo-wrap::after {
          content: '';
          position: absolute; inset: 0;
          background: linear-gradient(110deg, transparent 30%, rgba(126,207,223,0.22) 50%, transparent 70%);
          background-size: 250% 100%;
          background-position: 200% 0;
          transition: background-position 0.55s ease;
          pointer-events: none;
          z-index: 2;
        }
        .h-logo-wrap:hover::after { background-position: -50% 0; }

        /* ── Nav links ── */
        .h-navlink-u {
          position: relative;
          font-family: 'Cinzel', serif;
          font-size: 11.5px; font-weight: 500;
          color: ${WHITE_DIM};
          text-decoration: none; padding: 7px 15px;
          letter-spacing: 0.09em; text-transform: uppercase;
          border-radius: 5px; white-space: nowrap;
          transition: all 0.28s ease;
        }
        .h-navlink-u::after {
          content: ''; position: absolute; width: 0; height: 1px;
          bottom: 3px; left: 50%;
          background: ${ACCENT}; transition: width 0.35s ease;
          transform: translateX(-50%);
        }
        .h-navlink-u:hover { background: rgba(126,207,223,0.07); color: ${WHITE}; }
        .h-navlink-u:hover::after { width: 60%; }

        /* ── Blog link ── */
        .h-blog-link {
          position: relative; font-family: 'Cinzel', serif;
          font-size: 11.5px; font-weight: 500; color: ${WHITE_DIM};
          text-decoration: none; padding: 7px 15px; letter-spacing: 0.09em;
          text-transform: uppercase; border-radius: 5px; white-space: nowrap;
          transition: all 0.28s ease; display: inline-flex; align-items: center; gap: 7px;
        }
        .h-blog-link::after {
          content: ''; position: absolute; width: 0; height: 1px;
          bottom: 3px; left: 50%;
          background: ${ACCENT}; transition: width 0.35s ease; transform: translateX(-50%);
        }
        .h-blog-link:hover { background: rgba(126,207,223,0.07); color: ${WHITE}; }
        .h-blog-link:hover::after { width: 60%; }
        .h-blog-link.active { color: ${ACCENT}; }
        .h-blog-link.active::after { width: 60%; }
        .h-blog-dot {
          width: 5px; height: 5px; border-radius: 50%;
          background: ${ACCENT}; opacity: 0.8; flex-shrink: 0;
          animation: blog-dot-pulse 3s infinite ease-in-out;
        }
        @keyframes blog-dot-pulse {
          0%, 100% { opacity: 0.5; transform: scale(1); }
          50% { opacity: 1; transform: scale(1.35); }
        }

        /* ── Disney ── */
        .h-disney-link {
          position: relative; font-family: 'Cinzel Decorative', cursive;
          font-size: 10px; font-weight: 400; text-decoration: none;
          padding: 7px 16px; letter-spacing: 0.07em; white-space: nowrap;
          border-radius: 6px; transition: all 0.3s ease; color: #ffb06a;
          background: rgba(255,160,80,0.07); border: 1px solid rgba(255,160,80,0.22);
        }
        .h-disney-link:hover { background: rgba(255,160,80,0.13); color: #ffc990; transform: translateY(-1px); }

        /* ── CTA Button — teal-to-teal gradient from logo palette ── */
        .h-book-btn {
          transition: all 0.38s cubic-bezier(0.23, 1, 0.32, 1) !important;
          position: relative; overflow: hidden;
          background: linear-gradient(135deg, #0f5060 0%, #0d3d4a 60%, #0a2e38 100%) !important;
          border: 1px solid rgba(126,207,223,0.35) !important;
        }
        .h-book-btn::before {
          content: '';
          position: absolute; inset: 0;
          background: linear-gradient(135deg, rgba(126,207,223,0.15) 0%, transparent 60%);
          opacity: 0; transition: opacity 0.3s ease;
        }
        .h-book-btn:hover { transform: translateY(-2px) !important; box-shadow: 0 8px 28px rgba(13,61,74,0.7), 0 0 0 1px rgba(126,207,223,0.5) !important; }
        .h-book-btn:hover::before { opacity: 1; }

        /* ── Lang toggle ── */
        .h-lang-btn-s {
          background: none; border: none; padding: 5px 11px;
          font-family: 'Montserrat', sans-serif;
          font-size: 10.5px; font-weight: 600; color: ${WHITE_DIM};
          cursor: pointer; text-transform: uppercase; letter-spacing: 0.1em;
          transition: all 0.22s;
        }
        .h-lang-btn-s.active { background: rgba(126,207,223,0.14); color: ${ACCENT}; border-radius: 5px; }

        /* ── Call pulse ── */
        @keyframes h-pulse { 0%,100%{box-shadow:0 0 5px rgba(26,140,100,0.4)} 50%{box-shadow:0 0 14px rgba(26,140,100,0.75)} }

        /* ── Divider ── */
        @media (max-width: 1079px) { .h-desktop { display: none !important; } }
        @media (min-width: 1080px) { .h-mobile-btn { display: none !important; } }

        /* ── Burger ── */
        .h-burger-line { height: 1.8px; background: ${WHITE_DIM}; border-radius: 1px; transition: all 0.4s cubic-bezier(0.23,1,0.32,1); display: block; }
        .h-burger-line:nth-child(1) { width: 22px; }
        .h-burger-line:nth-child(2) { width: 15px; }
        .h-burger-line:nth-child(3) { width: 22px; }
        .h-burger-open .h-burger-line:nth-child(1) { transform: translateY(7px) rotate(45deg); width: 22px; }
        .h-burger-open .h-burger-line:nth-child(2) { opacity: 0; width: 0; transform: scaleX(0); }
        .h-burger-open .h-burger-line:nth-child(3) { transform: translateY(-7px) rotate(-45deg); width: 22px; }

        /* ── Mobile Drawer ── */
        .h-drawer { position: fixed; inset: 0; z-index: 9998; display: flex; }
        .h-drawer-backdrop { position: absolute; inset: 0; background: rgba(5,18,22,0.75); backdrop-filter: blur(6px); animation: fadeIn 0.3s ease both; }
        .h-drawer-panel { position: relative; z-index: 1; width: min(340px, 88vw); height: 100%; background: #050f12; border-right: 1px solid rgba(126,207,223,0.12); display: flex; flex-direction: column; animation: slideIn 0.35s cubic-bezier(0.22,1,0.36,1) both; overflow-y: auto; }
        @keyframes fadeIn { from { opacity: 0; } to { opacity: 1; } }
        @keyframes slideIn { from { transform: translateX(-100%); } to { transform: translateX(0); } }
        .h-drawer-top { padding: 28px 24px 22px; border-bottom: 1px solid rgba(126,207,223,0.1); display: flex; align-items: center; justify-content: space-between; gap: 16px; }
        .h-drawer-nav { padding: 12px 0; flex: 1; }
        .h-drawer-link { display: flex; align-items: center; gap: 12px; padding: 14px 24px; font-family: 'Cinzel', serif; font-size: 13px; font-weight: 500; letter-spacing: 0.08em; text-transform: uppercase; color: rgba(244,248,249,0.7); text-decoration: none; border-left: 3px solid transparent; transition: all 0.22s; }
        .h-drawer-link:hover { color: ${WHITE}; background: rgba(126,207,223,0.05); border-left-color: rgba(126,207,223,0.4); }
        .h-drawer-link.blog-active { color: ${ACCENT}; border-left-color: rgba(126,207,223,0.5); background: rgba(126,207,223,0.04); }
        .h-drawer-bottom { padding: 20px 24px; border-top: 1px solid rgba(126,207,223,0.1); display: flex; flex-direction: column; gap: 12px; }
      `}</style>

      <header style={{
        position: "fixed", top: 0, left: 0, right: 0, zIndex: 9999,
        background: scrolled
          ? "rgba(5,18,22,0.82)"
          : "#050f12",
        backdropFilter: scrolled ? "blur(22px)" : "none",
        WebkitBackdropFilter: scrolled ? "blur(22px)" : "none",
        borderBottom: `1px solid ${scrolled ? "rgba(126,207,223,0.18)" : BORDER}`,
        boxShadow: scrolled ? `0 8px 36px rgba(5,18,22,0.7), inset 0 -1px 0 rgba(126,207,223,0.1)` : "none",
        transition: "all 0.4s cubic-bezier(0.23, 1, 0.32, 1)",
      }}>
        <div style={{
          maxWidth: 1520, margin: "0 auto", padding: "0 4vw",
          height: scrolled ? 74 : 90,
          display: "flex", alignItems: "center", justifyContent: "space-between",
          boxSizing: "border-box", transition: "height 0.4s ease",
        }}>

          {/* ── Logo (image only — the image IS the brand name) ── */}
          <Link href="/" style={{ display: "flex", alignItems: "center", textDecoration: "none" }}>
            <div
              className="h-logo-wrap"
              style={{
                width: scrolled ? 180 : 218,
                height: scrolled ? 46 : 56,
                transition: "all 0.4s ease",
                flexShrink: 0,
              }}
            >
              <Image
                src="/images/logo.png"
                alt="Paris Easy Move"
                fill
                sizes="218px"
                style={{ objectFit: "contain", objectPosition: "left center" }}
                priority
              />
            </div>
          </Link>

          {/* ── Desktop Nav ── */}
          <nav className="h-desktop" style={{ display: "flex", alignItems: "center", gap: 2 }}>
            {navLinks.map((link) => {
              if (link.disney) {
                return (
                  <Link key={link.href} href={link.href} className="h-disney-link">
                    {link.label}
                  </Link>
                );
              }
              if (link.blog) {
                return (
                  <Link
                    key={link.href}
                    href={link.href}
                    className={`h-blog-link${isBlogActive ? " active" : ""}`}
                  >
                    {link.label}
                    <span className="h-blog-dot" />
                  </Link>
                );
              }
              return (
                <Link key={link.href} href={link.href} className="h-navlink-u">
                  {link.label}
                </Link>
              );
            })}
          </nav>

          {/* ── Desktop Right Controls ── */}
          <div className="h-desktop" style={{ display: "flex", alignItems: "center", gap: 16, flexShrink: 0 }}>
            {/* Language toggle */}
            <div style={{ display: "flex", background: SURFACE, border: `1px solid ${BORDER}`, borderRadius: 7, padding: 2 }}>
              <button onClick={() => setLang("en")} className={`h-lang-btn-s${lang === "en" ? " active" : ""}`}>EN</button>
              <button onClick={() => setLang("fr")} className={`h-lang-btn-s${lang === "fr" ? " active" : ""}`}>FR</button>
            </div>

            {/* Vertical divider */}
            <div style={{ width: 1, height: 28, background: `linear-gradient(to bottom, transparent, ${BORDER_MID}, transparent)` }} />

            {/* Phone */}
            <a href="tel:+33652466694" style={{
              display: "flex", alignItems: "center", gap: 11,
              padding: "8px 16px", border: `1px solid ${BORDER}`, borderRadius: 8,
              textDecoration: "none", whiteSpace: "nowrap",
              background: "rgba(13,61,74,0.2)", transition: "background 0.25s",
            }}>
              <span style={{
                width: 8, height: 8, background: "#1fbe82", borderRadius: "50%",
                boxShadow: "0 0 10px rgba(31,190,130,0.6)",
                animation: "h-pulse 2.8s infinite ease-in-out", flexShrink: 0
              }} />
              <div>
                <div style={{
                  fontFamily: "'Montserrat', sans-serif", fontSize: 8.5, fontWeight: 600,
                  letterSpacing: "0.15em", textTransform: "uppercase", color: WHITE_DIM
                }}>{t[lang].callUs}</div>
                <div style={{
                  fontFamily: "'Montserrat', sans-serif",
                  fontSize: scrolled ? 15 : 16.5,
                  fontWeight: 600, letterSpacing: "0.03em",
                  color: WHITE, transition: "font-size 0.4s ease"
                }}>
                  +33 6 52 46 66 94
                </div>
              </div>
            </a>

            {/* Reserve CTA */}
            <Link href="/reservation" className="h-book-btn" style={{
              display: "inline-flex", alignItems: "center", gap: 8,
              padding: "0 26px",
              height: scrolled ? 40 : 46,
              color: WHITE,
              fontFamily: "'Cinzel', serif", fontSize: 11, fontWeight: 600,
              letterSpacing: "0.14em", textTransform: "uppercase", borderRadius: 7,
              textDecoration: "none",
              whiteSpace: "nowrap",
            }}>
              {t[lang].bookNow}
            </Link>
          </div>

          {/* ── Mobile Burger ── */}
          <button
            className={`h-mobile-btn${isOpen ? " h-burger-open" : ""}`}
            onClick={() => setIsOpen(!isOpen)}
            aria-label="Toggle menu"
            style={{
              display: "flex", flexDirection: "column", gap: 5,
              width: 42, height: 42, alignItems: "center", justifyContent: "center",
              background: SURFACE, border: `1px solid ${BORDER}`,
              borderRadius: 8, cursor: "pointer"
            }}
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
              {/* Logo image in drawer */}
              <div style={{ position: "relative", width: 160, height: 42, flexShrink: 0 }}>
                <Image
                  src="/images/logo.png"
                  alt="Paris Easy Move"
                  fill
                  sizes="160px"
                  style={{ objectFit: "contain", objectPosition: "left center" }}
                />
              </div>
              <button
                style={{ background: "none", border: "none", color: WHITE_DIM, cursor: "pointer", flexShrink: 0 }}
                onClick={() => setIsOpen(false)}
              >
                <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M18 6L6 18M6 6l12 12"/>
                </svg>
              </button>
            </div>

            <nav className="h-drawer-nav">
              {navLinks.map((link, i) => {
                const isCurrentBlog = link.blog && isBlogActive;
                return (
                  <Link
                    key={link.href}
                    href={link.href}
                    className={`h-drawer-link${isCurrentBlog ? " blog-active" : ""}`}
                    onClick={() => setIsOpen(false)}
                    style={link.disney ? {
                      color: "#ffb06a",
                      fontFamily: "'Cinzel Decorative', cursive",
                      fontSize: 11,
                    } : undefined}
                  >
                    <span style={{ fontSize: 9.5, color: ACCENT, marginRight: 12, opacity: isCurrentBlog ? 1 : 0.5, fontFamily: "'Montserrat', sans-serif", fontWeight: 600 }}>
                      0{i + 1}
                    </span>
                    {link.label}
                    {link.blog && (
                      <span style={{
                        marginLeft: "auto", fontSize: 8.5,
                        fontFamily: "'Montserrat', sans-serif", fontWeight: 700,
                        letterSpacing: ".14em", textTransform: "uppercase",
                        color: ACCENT, opacity: 0.75,
                        padding: "2px 8px",
                        border: `1px solid rgba(126,207,223,0.25)`,
                        borderRadius: 4,
                      }}>
                        New
                      </span>
                    )}
                  </Link>
                );
              })}
            </nav>

            <div className="h-drawer-bottom">
              <div style={{ display: "flex", gap: 8 }}>
                <button onClick={() => setLang("en")} className={`h-lang-btn-s${lang === "en" ? " active" : ""}`} style={{ flex: 1, border: `1px solid ${BORDER}`, borderRadius: 6 }}>EN</button>
                <button onClick={() => setLang("fr")} className={`h-lang-btn-s${lang === "fr" ? " active" : ""}`} style={{ flex: 1, border: `1px solid ${BORDER}`, borderRadius: 6 }}>FR</button>
              </div>
              <Link href="/reservation" className="h-book-btn" style={{
                textAlign: "center", padding: "14px", borderRadius: 7,
                fontFamily: "'Cinzel', serif", fontSize: 11, fontWeight: 600,
                letterSpacing: "0.12em", textTransform: "uppercase",
                color: WHITE, textDecoration: "none",
              }}>
                {t[lang].bookNow}
              </Link>
            </div>
          </div>
        </div>
      )}
    </>
  );
}