"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";

export default function Header() {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 32);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Close drawer on route change
  useEffect(() => {
    setIsOpen(false);
  }, [pathname]);

  // Lock body scroll while drawer is open + close on Escape
  useEffect(() => {
    if (!isOpen) return;
    const prevOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setIsOpen(false);
    };
    window.addEventListener("keydown", onKey);
    return () => {
      document.body.style.overflow = prevOverflow;
      window.removeEventListener("keydown", onKey);
    };
  }, [isOpen]);

  // Close drawer if viewport grows to desktop size
  useEffect(() => {
    const mq = window.matchMedia("(min-width: 1180px)");
    const onChange = () => {
      if (mq.matches) setIsOpen(false);
    };
    mq.addEventListener("change", onChange);
    return () => mq.removeEventListener("change", onChange);
  }, []);

  // ── Obfuscated phone — assembled at runtime, invisible to scrapers ──
  const PHONE_PARTS = ["+33", "652", "466", "694"];
  const phoneDisplay = PHONE_PARTS.join(" ");
  const phoneHref = "tel:" + PHONE_PARTS.join("");

  const navLinks = [
    { href: "/",            label: "Home",        disney: false, blog: false },
    { href: "/disney",      label: "DisneyLand",  disney: true,  blog: false },
    { href: "/rates",       label: "Rates",       disney: false, blog: false },
    { href: "/reservation", label: "Reservation", disney: false, blog: false },
    { href: "/faq",         label: "FAQ",         disney: false, blog: false },
    { href: "/blog",        label: "Blog",        disney: false, blog: true  },
    { href: "/events",      label: "Events",      disney: false, blog: false },
    { href: "/contact-us",  label: "Contact",     disney: false, blog: false },
  ];

  const NAVY_DEEP    = "#080f1e";
  const NAVY_MID     = "#0d1a33";
  const NAVY_SURFACE = "rgba(13,26,51,0.6)";
  const GOLD         = "#c8a96e";
  const GOLD_DIM     = "rgba(200,169,110,0.65)";
  const GOLD_GLOW    = "rgba(200,169,110,0.18)";
  const WHITE        = "#f0f4ff";
  const WHITE_DIM    = "rgba(240,244,255,0.65)";
  const BORDER       = "rgba(200,169,110,0.14)";
  const BORDER_MID   = "rgba(200,169,110,0.28)";

  const isBlogActive = pathname === "/blog" || pathname.startsWith("/blog/");

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Playfair+Display:ital,wght@0,400;0,500;0,700;1,400;1,500&family=Cormorant+Garamond:ital,wght@0,300;0,400;0,600;1,400;1,600&family=Cinzel:wght@400;500;600;700&family=Cinzel+Decorative:wght@400;700&family=Raleway:wght@300;400;500;600;700&family=Roboto+Mono:wght@300;400;500&display=swap');

        :root {
          --h-height: 88px;
          --h-height-scrolled: 72px;
        }

        .h-header-inner {
          max-width: 1520px;
          margin: 0 auto;
          padding-left: max(3vw, env(safe-area-inset-left, 0px));
          padding-right: max(3vw, env(safe-area-inset-right, 0px));
          display: flex;
          align-items: center;
          justify-content: space-between;
          box-sizing: border-box;
          gap: 12px;
          transition: height 0.4s ease;
        }

        .h-logo-group { min-width: 0; -webkit-tap-highlight-color: transparent; }

        .h-logo-circle {
          border-radius: 50%;
          overflow: hidden;
          flex-shrink: 0;
          border: 1.5px solid ${BORDER_MID};
          box-shadow: 0 0 0 3px rgba(200,169,110,0.08), 0 4px 20px rgba(8,15,30,0.7);
          transition: all 0.4s cubic-bezier(0.23, 1, 0.32, 1);
          background: #080f1e;
          position: relative;
        }
        .h-logo-circle:hover {
          border-color: rgba(200,169,110,0.55);
          box-shadow: 0 0 0 4px rgba(200,169,110,0.12), 0 6px 28px rgba(8,15,30,0.9);
          transform: scale(1.03);
        }
        .h-logo-circle::after {
          content: '';
          position: absolute; inset: 0; border-radius: 50%;
          background: linear-gradient(130deg, transparent 30%, rgba(200,169,110,0.18) 50%, transparent 70%);
          background-size: 250% 100%;
          background-position: 200% 0;
          transition: background-position 0.6s ease;
          pointer-events: none; z-index: 2;
        }
        .h-logo-circle:hover::after { background-position: -50% 0; }

        .h-brand-name {
          font-family: 'Cinzel', serif;
          font-weight: 600;
          letter-spacing: 0.12em;
          line-height: 1.15;
          color: #ffffff;
          text-shadow: 0 1px 12px rgba(200,169,110,0.25);
          transition: color 0.3s ease, text-shadow 0.3s ease;
          white-space: nowrap;
          text-transform: uppercase;
        }
        .h-logo-group:hover .h-brand-name {
          color: #ffffff;
          text-shadow: 0 1px 18px rgba(200,169,110,0.45);
        }
        .h-brand-slogan {
          font-family: 'Cinzel', serif;
          font-size: 11px;
          font-weight: 400;
          letter-spacing: 0.22em;
          text-transform: uppercase;
          color: ${GOLD};
          margin-top: 2px;
          white-space: nowrap;
          transition: color 0.3s ease;
          opacity: 0.85;
        }
        .h-logo-group:hover .h-brand-slogan { opacity: 1; }

        /* ── Desktop nav links (compact) ── */
        .h-navlink-u {
          position: relative;
          font-family: 'Cinzel', serif;
          font-size: 10.5px; font-weight: 500;
          color: ${WHITE_DIM};
          text-decoration: none; padding: 7px 9px;
          letter-spacing: 0.06em; text-transform: uppercase;
          border-radius: 5px; white-space: nowrap;
          transition: all 0.28s ease;
        }
        .h-navlink-u::after {
          content: ''; position: absolute; width: 0; height: 1px;
          bottom: 3px; left: 50%;
          background: ${GOLD}; transition: width 0.35s ease;
          transform: translateX(-50%);
        }
        .h-navlink-u:hover { background: ${GOLD_GLOW}; color: ${WHITE}; }
        .h-navlink-u:hover::after { width: 55%; }

        .h-blog-link {
          position: relative; font-family: 'Cinzel', serif;
          font-size: 10.5px; font-weight: 500; color: ${WHITE_DIM};
          text-decoration: none; padding: 7px 9px; letter-spacing: 0.06em;
          text-transform: uppercase; border-radius: 5px; white-space: nowrap;
          transition: all 0.28s ease; display: inline-flex; align-items: center; gap: 5px;
        }
        .h-blog-link::after {
          content: ''; position: absolute; width: 0; height: 1px;
          bottom: 3px; left: 50%;
          background: ${GOLD}; transition: width 0.35s ease; transform: translateX(-50%);
        }
        .h-blog-link:hover { background: ${GOLD_GLOW}; color: ${WHITE}; }
        .h-blog-link:hover::after { width: 55%; }
        .h-blog-link.active { color: ${GOLD}; }
        .h-blog-link.active::after { width: 55%; }
        .h-blog-dot {
          width: 5px; height: 5px; border-radius: 50%;
          background: ${GOLD}; opacity: 0.7; flex-shrink: 0;
          animation: blog-dot-pulse 3s infinite ease-in-out;
        }
        @keyframes blog-dot-pulse {
          0%, 100% { opacity: 0.4; transform: scale(1); }
          50% { opacity: 0.9; transform: scale(1.4); }
        }

        .h-disney-link {
          position: relative; font-family: 'Cinzel Decorative', cursive;
          font-size: 9px; font-weight: 400; text-decoration: none;
          padding: 7px 10px; letter-spacing: 0.04em; white-space: nowrap;
          border-radius: 6px; transition: all 0.3s ease; color: #ffb06a;
          background: rgba(255,160,80,0.06); border: 1px solid rgba(255,160,80,0.2);
        }
        .h-disney-link:hover { background: rgba(255,160,80,0.12); color: #ffc990; transform: translateY(-1px); }

        .h-book-btn {
          transition: all 0.38s cubic-bezier(0.23, 1, 0.32, 1) !important;
          position: relative; overflow: hidden;
          background: linear-gradient(135deg, #c8a96e 0%, #a8832e 100%) !important;
          border: 1px solid rgba(200,169,110,0.7) !important;
          box-shadow: 0 4px 18px rgba(200,169,110,0.3) !important;
          color: #080f1e !important;
          -webkit-tap-highlight-color: transparent;
        }
        .h-book-btn::before {
          content: '';
          position: absolute; inset: 0;
          background: linear-gradient(135deg, rgba(255,255,255,0.18) 0%, transparent 60%);
          opacity: 0; transition: opacity 0.3s ease;
        }
        .h-book-btn:hover {
          transform: translateY(-2px) !important;
          background: linear-gradient(135deg, #d9bb80 0%, #b8921e 100%) !important;
          box-shadow: 0 10px 32px rgba(200,169,110,0.5), 0 0 0 1px rgba(200,169,110,0.8) !important;
        }
        .h-book-btn:hover::before { opacity: 1; }

        @keyframes h-pulse {
          0%,100% { box-shadow: 0 0 5px rgba(31,190,130,0.4); }
          50%      { box-shadow: 0 0 14px rgba(31,190,130,0.75); }
        }

        .h-phone-link {
          display: flex;
          align-items: center;
          gap: 10px;
          padding: 0 14px;
          border: 1px solid ${BORDER};
          border-radius: 10px;
          text-decoration: none;
          white-space: nowrap;
          background: rgba(13,26,51,0.3);
          transition: background 0.25s, border-color 0.25s;
          align-self: stretch;
        }
        .h-phone-link:hover {
          background: rgba(200,169,110,0.06);
          border-color: rgba(200,169,110,0.3);
        }

        .h-phone-number {
          font-family: 'Roboto Mono', monospace !important;
          font-weight: 400 !important;
          letter-spacing: 0.04em !important;
          color: ${WHITE} !important;
          font-variant-numeric: tabular-nums !important;
          transition: font-size 0.4s ease;
        }

        /* ── Breakpoints: burger below 1180px, full nav above ── */
        .h-mobile-group { display: none; align-items: center; gap: 10px; flex-shrink: 0; }
        @media (max-width: 1179px) {
          .h-desktop { display: none !important; }
          .h-mobile-group { display: flex; }
        }

        /* Mobile round icon buttons (call + burger) */
        .h-icon-btn {
          display: flex; align-items: center; justify-content: center;
          width: 44px; height: 44px; /* ≥44px touch target */
          border-radius: 10px;
          background: ${NAVY_SURFACE};
          border: 1px solid ${BORDER};
          cursor: pointer; padding: 0;
          text-decoration: none;
          color: ${GOLD};
          -webkit-tap-highlight-color: transparent;
          touch-action: manipulation;
          transition: background 0.25s, border-color 0.25s;
        }
        .h-icon-btn:active { background: rgba(200,169,110,0.14); border-color: rgba(200,169,110,0.4); }

        .h-burger { flex-direction: column; gap: 5px; }
        .h-burger-line { height: 1.8px; background: ${WHITE_DIM}; border-radius: 1px; transition: all 0.4s cubic-bezier(0.23,1,0.32,1); display: block; }
        .h-burger-line:nth-child(1) { width: 22px; }
        .h-burger-line:nth-child(2) { width: 15px; }
        .h-burger-line:nth-child(3) { width: 22px; }
        .h-burger-open .h-burger-line:nth-child(1) { transform: translateY(6.8px) rotate(45deg); width: 22px; }
        .h-burger-open .h-burger-line:nth-child(2) { opacity: 0; width: 0; transform: scaleX(0); }
        .h-burger-open .h-burger-line:nth-child(3) { transform: translateY(-6.8px) rotate(-45deg); width: 22px; }

        /* ── Drawer ── */
        .h-drawer { position: fixed; inset: 0; z-index: 10000; display: flex; }
        .h-drawer-backdrop { position: absolute; inset: 0; background: rgba(4,8,18,0.82); backdrop-filter: blur(6px); -webkit-backdrop-filter: blur(6px); animation: fadeIn 0.3s ease both; }
        .h-drawer-panel {
          position: relative; z-index: 1;
          width: min(300px, 84vw);
          height: 100vh;
          height: 100dvh;
          background: ${NAVY_MID};
          border-right: 1px solid rgba(200,169,110,0.12);
          display: flex; flex-direction: column;
          animation: slideIn 0.35s cubic-bezier(0.22,1,0.36,1) both;
          overflow-y: auto;
          overscroll-behavior: contain;
          -webkit-overflow-scrolling: touch;
          padding-top: env(safe-area-inset-top, 0px);
          padding-left: env(safe-area-inset-left, 0px);
        }
        @keyframes fadeIn { from { opacity: 0; } to { opacity: 1; } }
        @keyframes slideIn { from { transform: translateX(-100%); } to { transform: translateX(0); } }
        .h-drawer-top { padding: 20px 20px 18px; border-bottom: 1px solid rgba(200,169,110,0.1); display: flex; align-items: center; justify-content: space-between; gap: 12px; }
        .h-drawer-nav { padding: 8px 0; flex: 1; }
        .h-drawer-link {
          display: flex; align-items: center; gap: 12px;
          min-height: 48px; padding: 12px 20px;
          font-family: 'Cinzel', serif; font-size: 12.5px; font-weight: 500;
          letter-spacing: 0.08em; text-transform: uppercase;
          color: rgba(240,244,255,0.65); text-decoration: none;
          border-left: 3px solid transparent; transition: all 0.22s;
          -webkit-tap-highlight-color: transparent;
          touch-action: manipulation;
        }
        .h-drawer-link:hover,
        .h-drawer-link:active { color: ${WHITE}; background: rgba(200,169,110,0.05); border-left-color: rgba(200,169,110,0.45); }
        .h-drawer-link.current { color: ${GOLD}; border-left-color: rgba(200,169,110,0.5); background: rgba(200,169,110,0.04); }
        .h-drawer-bottom {
          padding: 16px 20px calc(16px + env(safe-area-inset-bottom, 0px));
          border-top: 1px solid rgba(200,169,110,0.1);
          display: flex; flex-direction: column; gap: 12px;
        }

        .h-gold-sep {
          width: 1px; height: 26px;
          background: linear-gradient(to bottom, transparent, rgba(200,169,110,0.3), transparent);
          flex-shrink: 0;
        }

        /* ── Small phones ── */
        @media (max-width: 1179px) {
          .h-header-inner {
            height: 68px !important;
            padding-left: max(16px, env(safe-area-inset-left, 0px));
            padding-right: max(16px, env(safe-area-inset-right, 0px));
          }
          .h-header-safe { padding-top: env(safe-area-inset-top, 0px); }
        }
        @media (max-width: 480px) {
          .h-header-inner { height: 60px !important; gap: 8px; }
          .h-logo-circle { width: 42px !important; height: 42px !important; }
          .h-brand-name { font-size: 13.5px !important; letter-spacing: 0.08em; }
          .h-brand-slogan { font-size: 8.5px; letter-spacing: 0.16em; }
          .h-mobile-group { gap: 8px; }
          .h-icon-btn { width: 42px; height: 42px; }
        }
        @media (max-width: 360px) {
          .h-brand-slogan { display: none; }
          .h-brand-name { font-size: 12.5px !important; }
        }

        @media (prefers-reduced-motion: reduce) {
          .h-blog-dot, .h-drawer-panel, .h-drawer-backdrop { animation: none !important; }
          * { transition-duration: 0.01ms !important; }
        }

        .h-header-inner a:focus-visible,
        .h-header-inner button:focus-visible,
        .h-drawer a:focus-visible,
        .h-drawer button:focus-visible {
          outline: 2px solid ${GOLD};
          outline-offset: 2px;
        }
      `}</style>

      <header
        className="h-header-safe"
        style={{
          position: "fixed", top: 0, left: 0, right: 0, zIndex: 9999,
          background: scrolled || isOpen ? "rgba(8,15,30,0.92)" : NAVY_DEEP,
          backdropFilter: scrolled ? "blur(22px)" : "none",
          WebkitBackdropFilter: scrolled ? "blur(22px)" : "none",
          borderBottom: `1px solid ${scrolled ? "rgba(200,169,110,0.2)" : BORDER}`,
          boxShadow: scrolled
            ? `0 8px 40px rgba(4,8,18,0.75), inset 0 -1px 0 rgba(200,169,110,0.1)`
            : "none",
          transition: "all 0.4s cubic-bezier(0.23, 1, 0.32, 1)",
        }}
      >
        <div
          className="h-header-inner"
          style={{ height: scrolled ? 72 : 88 }}
        >
          {/* ── Logo ── */}
          <Link
            href="/"
            style={{ display: "flex", alignItems: "center", textDecoration: "none", gap: 12 }}
            className="h-logo-group"
          >
            <div
              className="h-logo-circle"
              style={{
                width: scrolled ? 48 : 58,
                height: scrolled ? 48 : 58,
                transition: "all 0.4s ease",
              }}
            >
              <Image
                src="/images/logo.jpg"
                alt="Paris Easy Move"
                fill
                sizes="58px"
                style={{ objectFit: "cover", objectPosition: "center" }}
                priority
              />
            </div>
            <div style={{ display: "flex", flexDirection: "column", gap: 0, minWidth: 0 }}>
              <span className="h-brand-name" style={{ fontSize: scrolled ? 16 : 18 }}>
                Paris Easy Move
              </span>
              <span className="h-brand-slogan">Prestige Chauffeur</span>
            </div>
          </Link>

          {/* ── Desktop Nav ── */}
          <nav className="h-desktop" aria-label="Main navigation" style={{ display: "flex", alignItems: "center", gap: 0 }}>
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
          <div
            className="h-desktop"
            style={{
              display: "flex",
              alignItems: "stretch",
              gap: 10,
              flexShrink: 0,
              height: scrolled ? 40 : 46,
              transition: "height 0.4s ease",
            }}
          >
            <div className="h-gold-sep" style={{ alignSelf: "center" }} />

            <a href={phoneHref} className="h-phone-link">
              <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 4 }}>
                <span style={{
                  width: 7, height: 7, background: "#1fbe82", borderRadius: "50%",
                  boxShadow: "0 0 8px rgba(31,190,130,0.6)",
                  animation: "h-pulse 2.8s infinite ease-in-out",
                  flexShrink: 0, display: "block",
                }} />
                <span style={{
                  fontSize: 8, fontWeight: 600, letterSpacing: "0.1em",
                  textTransform: "uppercase", color: GOLD_DIM,
                  fontFamily: "'Raleway', sans-serif",
                }}>Live</span>
              </div>

              <div style={{ width: 1, height: 28, background: BORDER_MID, flexShrink: 0 }} />

              <div>
                <div style={{
                  fontSize: 8, fontWeight: 500, letterSpacing: "0.2em",
                  textTransform: "uppercase", color: GOLD_DIM,
                  fontFamily: "'Raleway', sans-serif", marginBottom: 4,
                }}>
                  Call us now
                </div>
                <div className="h-phone-number" style={{ fontSize: scrolled ? 14 : 15 }}>
                  {phoneDisplay}
                </div>
              </div>
            </a>

            <Link
              href="/reservation"
              className="h-book-btn"
              style={{
                display: "inline-flex", alignItems: "center",
                padding: "0 18px",
                color: "#080f1e",
                fontFamily: "'Cinzel', serif", fontSize: 10.5, fontWeight: 700,
                letterSpacing: "0.1em", textTransform: "uppercase",
                borderRadius: 7, textDecoration: "none", whiteSpace: "nowrap",
              }}
            >
              Reserve Now
            </Link>
          </div>

          {/* ── Mobile: quick-call + burger ── */}
          <div className="h-mobile-group">
            <a href={phoneHref} className="h-icon-btn" aria-label="Call us now">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72c.13.96.36 1.9.7 2.81a2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45c.91.34 1.85.57 2.81.7A2 2 0 0 1 22 16.92z" />
              </svg>
            </a>
            <button
              type="button"
              className={`h-icon-btn h-burger${isOpen ? " h-burger-open" : ""}`}
              onClick={() => setIsOpen((v) => !v)}
              aria-label={isOpen ? "Close menu" : "Open menu"}
              aria-expanded={isOpen}
              aria-controls="mobile-drawer"
            >
              <span className="h-burger-line" />
              <span className="h-burger-line" />
              <span className="h-burger-line" />
            </button>
          </div>
        </div>
      </header>

      {/* ── Mobile Drawer ── */}
      {isOpen && (
        <div className="h-drawer" id="mobile-drawer" role="dialog" aria-modal="true" aria-label="Menu">
          <div className="h-drawer-backdrop" onClick={() => setIsOpen(false)} />
          <div className="h-drawer-panel">

            <div className="h-drawer-top">
              <div style={{ display: "flex", alignItems: "center", gap: 12, minWidth: 0 }}>
                <div style={{
                  position: "relative", width: 42, height: 42, flexShrink: 0,
                  borderRadius: "50%", overflow: "hidden",
                  border: `1.5px solid rgba(200,169,110,0.3)`,
                  background: NAVY_DEEP,
                }}>
                  <Image
                    src="/images/logo.jpg"
                    alt="Paris Easy Move"
                    fill
                    sizes="42px"
                    style={{ objectFit: "cover", objectPosition: "center" }}
                  />
                </div>
                <div style={{ minWidth: 0 }}>
                  <div style={{
                    fontFamily: "'Cinzel', serif", fontWeight: 600,
                    fontSize: 14, color: WHITE, letterSpacing: "0.08em",
                    textTransform: "uppercase", lineHeight: 1.1, whiteSpace: "nowrap",
                  }}>
                    Paris Easy Move
                  </div>
                  <div style={{
                    fontFamily: "'Raleway', sans-serif", fontWeight: 500,
                    fontSize: 9.5, color: GOLD_DIM, letterSpacing: "0.18em",
                    textTransform: "uppercase", marginTop: 3, whiteSpace: "nowrap",
                  }}>
                    Prestige Chauffeur
                  </div>
                </div>
              </div>

              <button
                type="button"
                aria-label="Close menu"
                className="h-icon-btn"
                style={{ background: "none", border: "none", color: WHITE_DIM, width: 44, height: 44 }}
                onClick={() => setIsOpen(false)}
              >
                <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
                  <path d="M18 6L6 18M6 6l12 12" />
                </svg>
              </button>
            </div>

            <nav className="h-drawer-nav" aria-label="Mobile navigation">
              {navLinks.map((link, i) => {
                const isCurrent = link.blog
                  ? isBlogActive
                  : link.href === "/"
                  ? pathname === "/"
                  : pathname === link.href || pathname.startsWith(link.href + "/");
                return (
                  <Link
                    key={link.href}
                    href={link.href}
                    className={`h-drawer-link${isCurrent ? " current" : ""}`}
                    onClick={() => setIsOpen(false)}
                    aria-current={isCurrent ? "page" : undefined}
                    style={link.disney ? {
                      color: "#ffb06a",
                      fontFamily: "'Cinzel Decorative', cursive",
                      fontSize: 11,
                    } : undefined}
                  >
                    <span style={{
                      fontSize: 9, color: GOLD, opacity: isCurrent ? 1 : 0.4,
                      fontFamily: "'Raleway', sans-serif", fontWeight: 700,
                      letterSpacing: ".12em", flexShrink: 0, width: 16,
                    }}>
                      0{i + 1}
                    </span>
                    {link.label}
                    {link.blog && (
                      <span style={{
                        marginLeft: "auto", fontSize: 8,
                        fontFamily: "'Raleway', sans-serif", fontWeight: 700,
                        letterSpacing: ".14em", textTransform: "uppercase",
                        color: GOLD, opacity: 0.75,
                        padding: "2px 8px",
                        border: `1px solid rgba(200,169,110,0.25)`,
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
              <a href={phoneHref} style={{
                display: "flex", alignItems: "center", gap: 14,
                padding: "12px 16px",
                border: `1px solid rgba(200,169,110,0.15)`,
                borderRadius: 10, textDecoration: "none",
                background: "rgba(200,169,110,0.04)",
                WebkitTapHighlightColor: "transparent",
              }}>
                <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 4 }}>
                  <span style={{
                    width: 7, height: 7, background: "#1fbe82", borderRadius: "50%",
                    boxShadow: "0 0 8px rgba(31,190,130,0.6)",
                    animation: "h-pulse 2.8s infinite ease-in-out",
                    flexShrink: 0, display: "block",
                  }} />
                  <span style={{
                    fontSize: 8, fontWeight: 600, letterSpacing: "0.1em",
                    textTransform: "uppercase", color: GOLD_DIM,
                    fontFamily: "'Raleway', sans-serif",
                  }}>Live</span>
                </div>

                <div style={{ width: 1, height: 28, background: BORDER_MID, flexShrink: 0 }} />

                <div>
                  <div style={{
                    fontSize: 8, fontWeight: 500, letterSpacing: "0.2em",
                    textTransform: "uppercase", color: GOLD_DIM,
                    fontFamily: "'Raleway', sans-serif", marginBottom: 4,
                  }}>
                    Call us now
                  </div>
                  <div className="h-phone-number" style={{ fontSize: 16 }}>
                    {phoneDisplay}
                  </div>
                </div>
              </a>

              <Link href="/reservation" className="h-book-btn" style={{
                textAlign: "center", padding: "15px", borderRadius: 7,
                fontFamily: "'Cinzel', serif", fontSize: 11, fontWeight: 700,
                letterSpacing: "0.12em", textTransform: "uppercase",
                color: "#080f1e", textDecoration: "none",
              }}>
                Reserve Now
              </Link>
            </div>

          </div>
        </div>
      )}
    </>
  );
}