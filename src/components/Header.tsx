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
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => { setIsOpen(false); }, [pathname]);

  const navLinks = [
    { href: "/",            label: "Home",        disney: false, blog: false },
    { href: "/disney",      label: "DisneyLand",  disney: true,  blog: false },
    { href: "/rates",       label: "Rates",       disney: false, blog: false },
    { href: "/reservation", label: "Reservation", disney: false, blog: false },
    { href: "/faq",         label: "FAQ",         disney: false, blog: false },
    { href: "/blog",        label: "Blog",        disney: false, blog: true  },
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

        .h-navlink-u {
          position: relative;
          font-family: 'Cinzel', serif;
          font-size: 11px; font-weight: 500;
          color: ${WHITE_DIM};
          text-decoration: none; padding: 7px 14px;
          letter-spacing: 0.1em; text-transform: uppercase;
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
          font-size: 11px; font-weight: 500; color: ${WHITE_DIM};
          text-decoration: none; padding: 7px 14px; letter-spacing: 0.1em;
          text-transform: uppercase; border-radius: 5px; white-space: nowrap;
          transition: all 0.28s ease; display: inline-flex; align-items: center; gap: 7px;
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
          font-size: 9.5px; font-weight: 400; text-decoration: none;
          padding: 7px 14px; letter-spacing: 0.06em; white-space: nowrap;
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
          gap: 14px;
          padding: 0 20px;
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

        /* Roboto Mono is a Google Font — guaranteed to load and look distinct */
        .h-phone-number {
          font-family: 'Roboto Mono', monospace !important;
          font-weight: 400 !important;
          letter-spacing: 0.06em !important;
          color: ${WHITE} !important;
          font-variant-numeric: tabular-nums !important;
          transition: font-size 0.4s ease;
        }

        @media (max-width: 1079px) { .h-desktop { display: none !important; } }
        @media (min-width: 1080px) { .h-mobile-btn { display: none !important; } }

        .h-burger-line { height: 1.8px; background: ${WHITE_DIM}; border-radius: 1px; transition: all 0.4s cubic-bezier(0.23,1,0.32,1); display: block; }
        .h-burger-line:nth-child(1) { width: 22px; }
        .h-burger-line:nth-child(2) { width: 15px; }
        .h-burger-line:nth-child(3) { width: 22px; }
        .h-burger-open .h-burger-line:nth-child(1) { transform: translateY(7px) rotate(45deg); width: 22px; }
        .h-burger-open .h-burger-line:nth-child(2) { opacity: 0; width: 0; transform: scaleX(0); }
        .h-burger-open .h-burger-line:nth-child(3) { transform: translateY(-7px) rotate(-45deg); width: 22px; }

        .h-drawer { position: fixed; inset: 0; z-index: 9998; display: flex; }
        .h-drawer-backdrop { position: absolute; inset: 0; background: rgba(4,8,18,0.82); backdrop-filter: blur(6px); animation: fadeIn 0.3s ease both; }
        .h-drawer-panel { position: relative; z-index: 1; width: min(340px, 88vw); height: 100%; background: ${NAVY_MID}; border-right: 1px solid rgba(200,169,110,0.12); display: flex; flex-direction: column; animation: slideIn 0.35s cubic-bezier(0.22,1,0.36,1) both; overflow-y: auto; }
        @keyframes fadeIn { from { opacity: 0; } to { opacity: 1; } }
        @keyframes slideIn { from { transform: translateX(-100%); } to { transform: translateX(0); } }
        .h-drawer-top { padding: 28px 24px 22px; border-bottom: 1px solid rgba(200,169,110,0.1); display: flex; align-items: center; justify-content: space-between; gap: 16px; }
        .h-drawer-nav { padding: 12px 0; flex: 1; }
        .h-drawer-link { display: flex; align-items: center; gap: 12px; padding: 14px 24px; font-family: 'Cinzel', serif; font-size: 12.5px; font-weight: 500; letter-spacing: 0.08em; text-transform: uppercase; color: rgba(240,244,255,0.65); text-decoration: none; border-left: 3px solid transparent; transition: all 0.22s; }
        .h-drawer-link:hover { color: ${WHITE}; background: rgba(200,169,110,0.05); border-left-color: rgba(200,169,110,0.45); }
        .h-drawer-link.blog-active { color: ${GOLD}; border-left-color: rgba(200,169,110,0.5); background: rgba(200,169,110,0.04); }
        .h-drawer-bottom { padding: 20px 24px; border-top: 1px solid rgba(200,169,110,0.1); display: flex; flex-direction: column; gap: 12px; }

        .h-gold-sep {
          width: 1px; height: 26px;
          background: linear-gradient(to bottom, transparent, rgba(200,169,110,0.3), transparent);
          flex-shrink: 0;
        }
      `}</style>

      <header style={{
        position: "fixed", top: 0, left: 0, right: 0, zIndex: 9999,
        background: scrolled ? "rgba(8,15,30,0.88)" : NAVY_DEEP,
        backdropFilter: scrolled ? "blur(22px)" : "none",
        WebkitBackdropFilter: scrolled ? "blur(22px)" : "none",
        borderBottom: `1px solid ${scrolled ? "rgba(200,169,110,0.2)" : BORDER}`,
        boxShadow: scrolled
          ? `0 8px 40px rgba(4,8,18,0.75), inset 0 -1px 0 rgba(200,169,110,0.1)`
          : "none",
        transition: "all 0.4s cubic-bezier(0.23, 1, 0.32, 1)",
      }}>
        <div style={{
          maxWidth: 1520, margin: "0 auto", padding: "0 4vw",
          height: scrolled ? 72 : 88,
          display: "flex", alignItems: "center", justifyContent: "space-between",
          boxSizing: "border-box", transition: "height 0.4s ease",
        }}>

          {/* ── Logo ── */}
          <Link href="/" style={{ display: "flex", alignItems: "center", textDecoration: "none", gap: 14 }} className="h-logo-group">
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
            <div style={{ display: "flex", flexDirection: "column", gap: 0 }}>
              <span className="h-brand-name" style={{ fontSize: scrolled ? 16 : 18 }}>
                Paris Easy Move
              </span>
              <span className="h-brand-slogan">Prestige Chauffeur</span>
            </div>
          </Link>

          {/* ── Desktop Nav ── */}
          <nav className="h-desktop" style={{ display: "flex", alignItems: "center", gap: 1 }}>
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
              gap: 14,
              flexShrink: 0,
              height: scrolled ? 40 : 46,
              transition: "height 0.4s ease",
            }}
          >
            <div className="h-gold-sep" style={{ alignSelf: "center" }} />

            {/* Phone */}
            <a href="tel:+33652466694" className="h-phone-link">
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
                <div className="h-phone-number" style={{ fontSize: scrolled ? 15 : 17 }}>
                     +33 652 466 694
                </div>
              </div>
            </a>

            {/* Reserve CTA */}
            <Link
              href="/reservation"
              className="h-book-btn"
              style={{
                display: "inline-flex", alignItems: "center",
                padding: "0 26px",
                color: "#080f1e",
                fontFamily: "'Cinzel', serif", fontSize: 10.5, fontWeight: 700,
                letterSpacing: "0.15em", textTransform: "uppercase",
                borderRadius: 7, textDecoration: "none", whiteSpace: "nowrap",
              }}
            >
              Reserve Now
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
              background: NAVY_SURFACE,
              border: `1px solid ${BORDER}`,
              borderRadius: 8, cursor: "pointer",
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
              <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
                <div style={{
                  position: "relative", width: 44, height: 44, flexShrink: 0,
                  borderRadius: "50%", overflow: "hidden",
                  border: `1.5px solid rgba(200,169,110,0.3)`,
                  background: NAVY_DEEP,
                }}>
                  <Image
                    src="/images/logo.jpg"
                    alt="Paris Easy Move"
                    fill
                    sizes="44px"
                    style={{ objectFit: "cover", objectPosition: "center" }}
                  />
                </div>
                <div>
                  <div style={{
                    fontFamily: "'Cinzel', serif", fontWeight: 600,
                    fontSize: 15, color: WHITE, letterSpacing: "0.08em",
                    textTransform: "uppercase", lineHeight: 1.1,
                  }}>
                    Paris Easy Move
                  </div>
                  <div style={{
                    fontFamily: "'Raleway', sans-serif", fontWeight: 500,
                    fontSize: 10, color: GOLD_DIM, letterSpacing: "0.2em",
                    textTransform: "uppercase", marginTop: 3,
                  }}>
                    Prestige Chauffeur
                  </div>
                </div>
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
                      fontSize: 10.5,
                    } : undefined}
                  >
                    <span style={{
                      fontSize: 9, color: GOLD, opacity: isCurrentBlog ? 1 : 0.4,
                      fontFamily: "'Raleway', sans-serif", fontWeight: 700,
                      letterSpacing: ".12em", flexShrink: 0,
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
              {/* Phone in drawer */}
              <a href="tel:+33652466694" style={{
                display: "flex", alignItems: "center", gap: 14,
                padding: "12px 16px",
                border: `1px solid rgba(200,169,110,0.15)`,
                borderRadius: 10, textDecoration: "none",
                background: "rgba(200,169,110,0.04)",
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
                  {/* Same class as desktop — Roboto Mono applied consistently */}
                  <div className="h-phone-number" style={{ fontSize: 18 }}>
                    +33 652 466 694
                  </div>
                </div>
              </a>

              <Link href="/reservation" className="h-book-btn" style={{
                textAlign: "center", padding: "14px", borderRadius: 7,
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