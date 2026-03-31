import Link from "next/link";
import Image from "next/image";

const LINKS = [
  { label: "Book a Transfer", href: "/reservation" },
  { label: "FAQ",             href: "/faq" },
  { label: "Terms & Conditions", href: "/terms" },
  { label: "Privacy Policy", href: "/privacy-policy" },
];

const SOCIALS = [
  {
    label: "Facebook",
    href: "https://facebook.com/ParisEasyMove",
    icon: (
      <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
        <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"/>
      </svg>
    ),
  },
  {
    label: "Instagram",
    href: "https://instagram.com/ParisEasyMove",
    icon: (
      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <rect x="2" y="2" width="20" height="20" rx="5" ry="5"/>
        <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"/>
        <line x1="17.5" y1="6.5" x2="17.51" y2="6.5"/>
      </svg>
    ),
  },
  {
    label: "WhatsApp",
    href: "https://wa.me/33652466694",
    icon: (
      <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
        <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
      </svg>
    ),
  },
  {
    label: "TripAdvisor",
    href: "https://tripadvisor.com",
    icon: (
      <svg width="16" height="16" viewBox="0 0 40 40" fill="none">
        <circle cx="14" cy="20" r="5" fill="currentColor" opacity="0.9"/>
        <circle cx="26" cy="20" r="5" fill="currentColor" opacity="0.9"/>
        <circle cx="14" cy="20" r="2.2" fill="#080808"/>
        <circle cx="26" cy="20" r="2.2" fill="#080808"/>
        <path d="M8 16 Q14 9 20 13 Q26 9 32 16" stroke="currentColor" strokeWidth="2.2" fill="none" strokeLinecap="round"/>
      </svg>
    ),
  },
];

function StarIcon() {
  return (
    <svg width="11" height="11" viewBox="0 0 24 24" fill="#FBBC04">
      <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/>
    </svg>
  );
}

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Cinzel:wght@400;500;600&family=Raleway:wght@300;400;500;600&display=swap');

        .ft-root {
          background: #080f1e;
          font-family: 'Raleway', sans-serif;
          position: relative;
        }

        .ft-topbar {
          height: 1px;
          background: linear-gradient(to right, transparent 0%, rgba(200,169,110,0.6) 30%, rgba(200,169,110,0.6) 70%, transparent 100%);
        }

        .ft-inner {
          max-width: 1200px;
          margin: 0 auto;
          padding: 56px 48px 40px;
        }

        /* Main row */
        .ft-body {
          display: grid;
          grid-template-columns: 1fr auto 1fr;
          align-items: start;
          gap: 64px;
          padding-bottom: 40px;
          border-bottom: 1px solid rgba(200,169,110,0.1);
          margin-bottom: 32px;
        }
        @media (max-width: 860px) {
          .ft-body { grid-template-columns: 1fr; gap: 40px; }
          .ft-divider-v { display: none !important; }
          .ft-links-col { align-items: flex-start !important; }
          .ft-inner { padding: 40px 24px 32px; }
        }

        /* ── Logo circle ── */
        .ft-logo-row {
          display: flex;
          align-items: center;
          gap: 14px;
          margin-bottom: 20px;
        }
        .ft-logo-circle {
          width: 54px;
          height: 54px;
          border-radius: 50%;
          border: 1.5px solid rgba(200,169,110,0.45);
          background: rgba(255,255,255,0.04);
          box-shadow: 0 0 0 4px rgba(200,169,110,0.07), inset 0 0 12px rgba(200,169,110,0.06);
          overflow: hidden;
          flex-shrink: 0;
          display: flex;
          align-items: center;
          justify-content: center;
          position: relative;
        }

        /* Brand */
        .ft-brand-name {
          font-family: 'Cinzel', serif;
          font-size: 20px;
          font-weight: 600;
          color: #ffffff;
          letter-spacing: 0.1em;
          text-transform: uppercase;
          margin-bottom: 4px;
        }
        .ft-brand-tagline {
          font-family: 'Raleway', sans-serif;
          font-size: 11px;
          font-weight: 500;
          letter-spacing: 0.22em;
          text-transform: uppercase;
          color: rgba(200,169,110,0.7);
        }
        .ft-brand-desc {
          font-size: 13px;
          font-weight: 400;
          color: rgba(240,244,255,0.4);
          line-height: 1.8;
          max-width: 300px;
          margin-bottom: 24px;
        }

        /* Ratings */
        .ft-ratings { display: flex; gap: 10px; margin-bottom: 24px; flex-wrap: wrap; }
        .ft-chip {
          display: flex; align-items: center; gap: 6px;
          background: rgba(255,255,255,0.03);
          border: 1px solid rgba(200,169,110,0.15);
          border-radius: 8px; padding: 7px 12px;
          font-size: 11px; font-weight: 600;
          color: rgba(240,244,255,0.45);
          letter-spacing: 0.04em;
        }
        .ft-chip-score {
          font-family: 'Cinzel', serif;
          font-size: 15px; font-weight: 600;
          color: rgba(200,169,110,0.9);
          line-height: 1;
        }
        .ft-stars { display: flex; gap: 1px; }

        /* Socials */
        .ft-socials { display: flex; gap: 8px; }
        .ft-social {
          width: 36px; height: 36px; border-radius: 9px;
          background: rgba(255,255,255,0.03);
          border: 1px solid rgba(255,255,255,0.08);
          display: flex; align-items: center; justify-content: center;
          color: rgba(240,244,255,0.4); text-decoration: none;
          transition: background 0.2s, color 0.2s, border-color 0.2s, transform 0.15s;
        }
        .ft-social:hover {
          background: rgba(200,169,110,0.12);
          color: rgba(200,169,110,0.9);
          border-color: rgba(200,169,110,0.35);
          transform: translateY(-2px);
        }

        /* Vertical divider */
        .ft-divider-v {
          width: 1px;
          align-self: stretch;
          background: linear-gradient(to bottom, transparent, rgba(200,169,110,0.2), transparent);
        }

        /* Links column */
        .ft-links-col {
          display: flex;
          flex-direction: column;
          align-items: flex-end;
          gap: 0;
        }
        .ft-links-heading {
          font-size: 9px; font-weight: 700;
          letter-spacing: 0.22em; text-transform: uppercase;
          color: rgba(200,169,110,0.7);
          margin-bottom: 18px;
        }
        .ft-links-list {
          list-style: none; padding: 0; margin: 0;
          display: flex; flex-direction: column; gap: 12px;
          align-items: flex-end;
          margin-bottom: 32px;
        }
        .ft-nav-link {
          font-size: 13px; font-weight: 500;
          color: rgba(240,244,255,0.45);
          text-decoration: none;
          letter-spacing: 0.02em;
          transition: color 0.2s;
          position: relative;
        }
        .ft-nav-link::after {
          content: '';
          position: absolute; bottom: -2px; right: 0;
          width: 0; height: 1px;
          background: rgba(200,169,110,0.7);
          transition: width 0.25s ease;
        }
        .ft-nav-link:hover { color: #ffffff; }
        .ft-nav-link:hover::after { width: 100%; }

        /* Book CTA link */
        .ft-book-link {
          display: inline-flex; align-items: center; gap: 8px;
          padding: 10px 22px;
          background: transparent;
          border: 1px solid rgba(200,169,110,0.4);
          border-radius: 8px;
          font-family: 'Cinzel', serif;
          font-size: 10px; font-weight: 600;
          letter-spacing: 0.14em; text-transform: uppercase;
          color: rgba(200,169,110,0.85);
          text-decoration: none;
          transition: background 0.25s, border-color 0.25s, color 0.25s, transform 0.15s;
        }
        .ft-book-link:hover {
          background: rgba(200,169,110,0.1);
          border-color: rgba(200,169,110,0.7);
          color: #ffffff;
          transform: translateY(-1px);
        }

        /* Bottom bar */
        .ft-bottom {
          display: flex; align-items: center;
          justify-content: space-between;
          flex-wrap: wrap; gap: 16px;
        }
        .ft-copy {
          font-size: 11px; font-weight: 400;
          color: rgba(240,244,255,0.25);
          letter-spacing: 0.04em;
        }
        .ft-pay { display: flex; align-items: center; gap: 6px; }
        .ft-pay-label {
          font-size: 9px; font-weight: 600;
          letter-spacing: 0.14em; text-transform: uppercase;
          color: rgba(240,244,255,0.2); margin-right: 2px;
        }
        .ft-pay-chip {
          background: rgba(255,255,255,0.04);
          border: 1px solid rgba(255,255,255,0.08);
          border-radius: 5px; padding: 3px 9px;
          font-size: 10px; font-weight: 600;
          color: rgba(240,244,255,0.3);
        }

        /* ── Registration badge (image version) ── */
        .ft-reg-badge {
          display: flex;
          align-items: center;
          gap: 14px;
          background: rgba(255,255,255,0.02);
          border: 1px solid rgba(200,169,110,0.18);
          border-radius: 14px;
          padding: 10px 18px 10px 10px;
        }
        .ft-reg-img-wrap {
          width: 72px;
          height: 72px;
          border-radius: 10px;
          overflow: hidden;
          flex-shrink: 0;
          border: 1px solid rgba(200,169,110,0.3);
          position: relative;
          box-shadow: 0 2px 12px rgba(0,0,0,0.35);
        }
        .ft-reg-text {
          display: flex;
          flex-direction: column;
          gap: 5px;
        }
        .ft-reg-label {
          font-size: 10px;
          font-weight: 700;
          letter-spacing: 0.14em;
          text-transform: uppercase;
          color: rgba(200,169,110,0.75);
          line-height: 1;
        }
        .ft-reg-value {
          font-size: 12px;
          font-weight: 500;
          color: rgba(240,244,255,0.4);
          letter-spacing: 0.04em;
          line-height: 1;
        }
      `}</style>

      <footer className="ft-root">
        <div className="ft-topbar" />
        <div className="ft-inner">

          <div className="ft-body">

            {/* ── Left: Brand ── */}
            <div>
              {/* Logo + name row */}
              <div className="ft-logo-row">
                <div className="ft-logo-circle">
                  <Image
                    src="/images/logo.png"
                    alt="Paris Easy Move logo"
                    fill
                    style={{ objectFit: "contain", padding: "6px" }}
                  />
                </div>
                <div>
                  <div className="ft-brand-name">Paris Easy Move</div>
                  <div className="ft-brand-tagline">Prestige Chauffeur · Paris</div>
                </div>
              </div>

              <p className="ft-brand-desc">
                Premium private transfers across Paris and Île-de-France. Airport pickups, Disneyland runs, Versailles day trips — fixed pricing, professional drivers, 24/7.
              </p>

              <div className="ft-ratings">
                <div className="ft-chip">
                  <span className="ft-chip-score">4.9</span>
                  <div className="ft-stars">
                    {[1,2,3,4,5].map(i => <StarIcon key={i} />)}
                  </div>
                  <span>Google</span>
                </div>
                <div className="ft-chip">
                  <span className="ft-chip-score">5.0</span>
                  <div className="ft-stars">
                    {[1,2,3,4,5].map(i => (
                      <svg key={i} width="11" height="11" viewBox="0 0 24 24" fill="#00AA6C">
                        <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/>
                      </svg>
                    ))}
                  </div>
                  <span>TripAdvisor</span>
                </div>
              </div>

              <div className="ft-socials">
                {SOCIALS.map(s => (
                  <a key={s.label} href={s.href} className="ft-social" aria-label={s.label} target="_blank" rel="noopener noreferrer">
                    {s.icon}
                  </a>
                ))}
              </div>
            </div>

            {/* ── Vertical divider ── */}
            <div className="ft-divider-v" />

            {/* ── Right: Links ── */}
            <div className="ft-links-col">
              <div className="ft-links-heading">Quick Links</div>
              <ul className="ft-links-list">
                {LINKS.slice(1).map(link => (
                  <li key={link.href}>
                    <Link href={link.href} className="ft-nav-link">{link.label}</Link>
                  </li>
                ))}
              </ul>
              <Link href="/reservation" className="ft-book-link">
                Reserve a Transfer →
              </Link>
            </div>

          </div>

          {/* ── Bottom bar ── */}
          <div className="ft-bottom">
            <p className="ft-copy">© {currentYear} Paris Easy Move. All rights reserved.</p>

            <div className="ft-pay">
              <span className="ft-pay-label">Accepts</span>
              {["Cash", "Visa", "Mastercard", "Amex"].map(p => (
                <span key={p} className="ft-pay-chip">{p}</span>
              ))}
            </div>

            {/* Registration badge with image */}
            <div className="ft-reg-badge">
              <div className="ft-reg-img-wrap">
                <Image
                  src="/images/registration.webp"
                  alt="VTC Registration"
                  fill
                  style={{ objectFit: "cover" }}
                />
              </div>
              <div className="ft-reg-text">
                <span className="ft-reg-label">Licensed VTC</span>
                <span className="ft-reg-value">Île-de-France · SIRET verified</span>
              </div>
            </div>
          </div>

        </div>
      </footer>
    </>
  );
}