import Link from "next/link";

const NAV_LINKS = {
  Services: [
    { label: "CDG Airport Transfers", href: "/services/cdg" },
    { label: "Orly Airport Transfers", href: "/services/orly" },
    { label: "Beauvais Airport Transfers", href: "/services/beauvais" },
    { label: "Disneyland Paris", href: "/services/disney" },
    { label: "Versailles Day Trips", href: "/services/versailles" },
    { label: "Paris City Tours", href: "/services/city-tours" },
  ],
  Company: [
    { label: "About Us", href: "/about" },
    { label: "Our Fleet", href: "/fleet" },
    { label: "Reviews", href: "/reviews" },
    { label: "Blog", href: "/blog" },
    { label: "Careers", href: "/careers" },
    { label: "Contact", href: "/contact" },
  ],
  Support: [
    { label: "Book a Transfer", href: "/booking" },
    { label: "Manage Booking", href: "/manage" },
    { label: "Cancellation Policy", href: "/cancellation" },
    { label: "FAQ", href: "/faq" },
    { label: "Privacy Policy", href: "/privacy" },
    { label: "Terms & Conditions", href: "/terms" },
  ],
};

const SOCIALS = [
  {
    label: "Facebook",
    href: "https://facebook.com/ParisEasyMove",
    icon: (
      <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
        <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"/>
      </svg>
    ),
  },
  {
    label: "Instagram",
    href: "https://instagram.com/ParisEasyMove",
    icon: (
      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
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
      <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
        <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
      </svg>
    ),
  },
  {
    label: "TripAdvisor",
    href: "https://tripadvisor.com",
    icon: (
      <svg width="18" height="18" viewBox="0 0 40 40" fill="none">
        <circle cx="14" cy="20" r="5" fill="currentColor" opacity="0.9"/>
        <circle cx="26" cy="20" r="5" fill="currentColor" opacity="0.9"/>
        <circle cx="14" cy="20" r="2.2" fill="#0a1f44"/>
        <circle cx="26" cy="20" r="2.2" fill="#0a1f44"/>
        <path d="M8 16 Q14 9 20 13 Q26 9 32 16" stroke="currentColor" strokeWidth="2.2" fill="none" strokeLinecap="round"/>
      </svg>
    ),
  },
];

function GoogleLogo() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
      <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4"/>
      <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853"/>
      <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l3.66-2.84z" fill="#FBBC05"/>
      <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335"/>
    </svg>
  );
}

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,400;0,500;0,600;1,400&family=Montserrat:wght@400;500;600;700&display=swap');

        .ft-root {
          background: #080808;
          font-family: 'Montserrat', sans-serif;
          color: rgba(245,240,232,0.65);
          position: relative;
          overflow: hidden;
        }

        .ft-root::before {
          content: ''; position: absolute; inset: 0;
          background-image:
            linear-gradient(rgba(255,255,255,0.03) 1px, transparent 1px),
            linear-gradient(90deg, rgba(255,255,255,0.03) 1px, transparent 1px);
          background-size: 48px 48px;
          pointer-events: none;
        }

        .ft-topbar {
          height: 2px;
          background: linear-gradient(to right, transparent 0%, #c9a347 30%, #c9a347 70%, transparent 100%);
          opacity: 0.7;
        }

        .ft-main {
          max-width: 1200px; margin: 0 auto;
          padding: 72px 48px 56px;
          position: relative;
        }

        /* registration image — small card */
        .ft-reg-card {
          display: flex; align-items: center; gap: 20px;
          background: rgba(255,255,255,0.03);
          border: 1px solid rgba(201,163,71,0.2);
          border-radius: 14px; padding: 18px 24px;
          margin-bottom: 56px;
        }
        .ft-reg-img {
          width: 90px; height: 64px; border-radius: 8px;
          object-fit: cover; object-position: center;
          flex-shrink: 0;
          border: 1px solid rgba(201,163,71,0.15);
        }
        .ft-reg-label {
          font-size: 9px; font-weight: 600; letter-spacing: 0.22em;
          text-transform: uppercase; color: #c9a347; margin-bottom: 4px;
        }
        .ft-reg-title {
          font-family: 'Cormorant Garamond', serif;
          font-size: 18px; font-weight: 500; color: #f5f0e8; line-height: 1.2;
        }
        .ft-reg-sub {
          font-size: 11px; font-weight: 500; color: rgba(245,240,232,0.4);
          margin-top: 3px; letter-spacing: 0.03em;
        }

        /* Top row: brand + newsletter */
        .ft-top {
          display: grid;
          grid-template-columns: 1.4fr 1fr;
          gap: 64px;
          padding-bottom: 52px;
          border-bottom: 1px solid rgba(245,240,232,0.08);
          margin-bottom: 52px;
        }
        @media (max-width: 860px) { .ft-top { grid-template-columns: 1fr; gap: 40px; } }

        .ft-brand-logo {
          display: flex; align-items: center; gap: 12px; margin-bottom: 18px;
        }
        .ft-brand-icon {
          width: 40px; height: 40px; border-radius: 10px;
          background: rgba(201,163,71,0.15);
          border: 1px solid rgba(201,163,71,0.3);
          display: flex; align-items: center; justify-content: center; flex-shrink: 0;
        }
        .ft-brand-icon svg { width: 20px; height: 20px; color: #c9a347; }
        .ft-brand-name {
          font-family: 'Cormorant Garamond', serif;
          font-size: 24px; font-weight: 600; color: #f5f0e8; letter-spacing: -0.01em;
        }
        .ft-brand-name span { color: #c9a347; font-style: italic; }
        .ft-brand-desc {
          font-size: 13.5px; font-weight: 500; color: rgba(245,240,232,0.42);
          line-height: 1.75; max-width: 380px; margin-bottom: 28px;
        }

        .ft-ratings { display: flex; gap: 12px; flex-wrap: wrap; margin-bottom: 28px; }
        .ft-rating-chip {
          display: flex; align-items: center; gap: 7px;
          background: rgba(245,240,232,0.04); border: 1px solid rgba(245,240,232,0.1);
          border-radius: 10px; padding: 8px 14px;
          font-size: 9px; font-weight: 600;
          letter-spacing: 0.1em; text-transform: uppercase; color: rgba(245,240,232,0.4);
          transition: border-color 0.2s;
        }
        .ft-rating-chip:hover { border-color: rgba(201,163,71,0.3); }
        .ft-rating-num { font-family: 'Cormorant Garamond', serif; font-size: 18px; font-weight: 600; color: #c9a347; letter-spacing: -0.02em; line-height: 1; }
        .ft-stars { display: flex; gap: 1px; }
        .ft-stars svg { width: 11px; height: 11px; }

        .ft-socials { display: flex; gap: 10px; }
        .ft-social {
          width: 38px; height: 38px; border-radius: 10px;
          background: rgba(245,240,232,0.04); border: 1px solid rgba(245,240,232,0.1);
          display: flex; align-items: center; justify-content: center;
          color: rgba(245,240,232,0.45); text-decoration: none;
          transition: background 0.2s, color 0.2s, border-color 0.2s, transform 0.15s;
        }
        .ft-social:hover {
          background: rgba(201,163,71,0.15); color: #c9a347; border-color: rgba(201,163,71,0.4);
          transform: translateY(-2px);
        }

        /* Newsletter */
        .ft-newsletter-label {
          font-size: 9px; font-weight: 600;
          letter-spacing: 0.22em; text-transform: uppercase; color: #c9a347;
          margin-bottom: 10px; display: block;
        }
        .ft-newsletter-heading {
          font-family: 'Cormorant Garamond', serif;
          font-size: 28px; font-weight: 500; color: #f5f0e8;
          letter-spacing: -0.01em; line-height: 1.15; margin-bottom: 8px;
        }
        .ft-newsletter-sub {
          font-size: 13px; font-weight: 500; color: rgba(245,240,232,0.38);
          line-height: 1.65; margin-bottom: 22px;
        }
        .ft-newsletter-form { display: flex; gap: 8px; flex-wrap: wrap; }
        .ft-newsletter-input {
          flex: 1; min-width: 180px;
          background: rgba(245,240,232,0.05); border: 1px solid rgba(245,240,232,0.12);
          border-radius: 8px; padding: 13px 16px;
          font-family: 'Montserrat', sans-serif; font-size: 13px; font-weight: 500;
          color: #f5f0e8; outline: none;
          transition: border-color 0.2s, background 0.2s;
        }
        .ft-newsletter-input::placeholder { color: rgba(245,240,232,0.22); }
        .ft-newsletter-input:focus { border-color: rgba(201,163,71,0.5); background: rgba(201,163,71,0.05); }
        .ft-newsletter-btn {
          background: #c9a347; color: #0a1f44; border: none; border-radius: 8px;
          padding: 13px 22px; font-family: 'Montserrat', sans-serif;
          font-size: 13px; font-weight: 700; cursor: pointer; white-space: nowrap;
          transition: background 0.2s, transform 0.15s;
        }
        .ft-newsletter-btn:hover { background: #e8c97a; transform: translateY(-1px); }

        /* Nav */
        .ft-nav {
          display: grid; grid-template-columns: repeat(3, 1fr);
          gap: 40px; padding-bottom: 52px;
          border-bottom: 1px solid rgba(245,240,232,0.08);
          margin-bottom: 40px;
        }
        @media (max-width: 700px) { .ft-nav { grid-template-columns: 1fr 1fr; } }
        @media (max-width: 440px) { .ft-nav { grid-template-columns: 1fr; } }

        .ft-nav-heading {
          font-size: 9px; font-weight: 700;
          letter-spacing: 0.2em; text-transform: uppercase;
          color: #c9a347; margin-bottom: 18px; display: block;
        }
        .ft-nav-list { display: flex; flex-direction: column; gap: 10px; list-style: none; padding: 0; margin: 0; }
        .ft-nav-link {
          font-size: 13px; font-weight: 500; color: rgba(245,240,232,0.42);
          text-decoration: none; transition: color 0.18s;
          display: flex; align-items: center; gap: 6px;
        }
        .ft-nav-link::before {
          content: ''; width: 4px; height: 4px; border-radius: 50%;
          background: #c9a347; flex-shrink: 0; opacity: 0;
          transition: opacity 0.18s, transform 0.18s; transform: scale(0);
        }
        .ft-nav-link:hover { color: #f5f0e8; }
        .ft-nav-link:hover::before { opacity: 1; transform: scale(1); }

        /* Contact */
        .ft-contact {
          display: flex; gap: 16px; flex-wrap: wrap;
          padding-bottom: 52px;
          border-bottom: 1px solid rgba(245,240,232,0.08);
          margin-bottom: 36px;
        }
        .ft-contact-item {
          display: flex; align-items: center; gap: 12px;
          background: rgba(245,240,232,0.03); border: 1px solid rgba(245,240,232,0.08);
          border-radius: 12px; padding: 14px 20px; text-decoration: none;
          transition: background 0.2s, border-color 0.2s;
        }
        .ft-contact-item:hover { background: rgba(201,163,71,0.07); border-color: rgba(201,163,71,0.25); }
        .ft-contact-icon {
          width: 36px; height: 36px; border-radius: 9px;
          background: rgba(201,163,71,0.1); border: 1px solid rgba(201,163,71,0.2);
          display: flex; align-items: center; justify-content: center; flex-shrink: 0;
          color: #c9a347;
        }
        .ft-contact-icon svg { width: 16px; height: 16px; }
        .ft-contact-label {
          font-size: 8px; font-weight: 600;
          letter-spacing: 0.16em; text-transform: uppercase; color: rgba(245,240,232,0.28);
          margin-bottom: 3px;
        }
        .ft-contact-value { font-size: 14px; font-weight: 600; color: #f5f0e8; letter-spacing: -0.01em; }

        /* Bottom */
        .ft-bottom {
          display: flex; align-items: center; justify-content: space-between;
          gap: 20px; flex-wrap: wrap;
        }
        .ft-copy {
          font-size: 11px; font-weight: 500;
          color: rgba(245,240,232,0.28); letter-spacing: 0.04em;
        }
        .ft-copy a { color: rgba(245,240,232,0.4); text-decoration: none; transition: color 0.18s; }
        .ft-copy a:hover { color: #c9a347; }
        .ft-bottom-links { display: flex; gap: 20px; flex-wrap: wrap; }
        .ft-bottom-link {
          font-size: 10px; font-weight: 600;
          letter-spacing: 0.14em; text-transform: uppercase;
          color: rgba(245,240,232,0.28); text-decoration: none;
          transition: color 0.18s;
        }
        .ft-bottom-link:hover { color: #c9a347; }

        .ft-pay { display: flex; align-items: center; gap: 8px; flex-wrap: wrap; }
        .ft-pay-label {
          font-size: 9px; font-weight: 600;
          letter-spacing: 0.14em; text-transform: uppercase; color: rgba(245,240,232,0.25);
          margin-right: 4px;
        }
        .ft-pay-chip {
          background: rgba(245,240,232,0.05); border: 1px solid rgba(245,240,232,0.1);
          border-radius: 6px; padding: 4px 10px;
          font-size: 11px; font-weight: 600; color: rgba(245,240,232,0.38);
          letter-spacing: 0.02em;
        }

        @media (max-width: 640px) {
          .ft-main { padding: 48px 24px 40px; }
          .ft-reg-card { flex-direction: column; align-items: flex-start; gap: 14px; }
          .ft-reg-img { width: 100%; height: 80px; }
        }
      `}</style>

      <footer className="ft-root">
        <div className="ft-topbar" />
        <div className="ft-main">

          {/* Registration image — small card */}
          <div className="ft-reg-card">
            <img src="/images/registration.webp" alt="Official VTC registration" className="ft-reg-img" />
            <div>
              <div className="ft-reg-label">Officially Licensed & Insured</div>
              <div className="ft-reg-title">Registered VTC Operator</div>
              <div className="ft-reg-sub">Île-de-France · SIRET verified · VTC licensed</div>
            </div>
          </div>

          {/* Top: Brand + Newsletter */}
          <div className="ft-top">
            <div>
              <div className="ft-brand-logo">
                <div className="ft-brand-icon">
                  <svg fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="1.8">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"/>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"/>
                  </svg>
                </div>
                <span className="ft-brand-name">Paris <span>Easy</span> Move</span>
              </div>
              <p className="ft-brand-desc">
                Premium private transfers across Paris and Île-de-France. Airport pickups, Disney runs, Versailles day trips — handled with care, fixed pricing, and a driver who actually shows up.
              </p>

              <div className="ft-ratings">
                <div className="ft-rating-chip">
                  <GoogleLogo />
                  <span className="ft-rating-num">4.9</span>
                  <div className="ft-stars">
                    {[1,2,3,4,5].map(i => (
                      <svg key={i} viewBox="0 0 24 24" fill="#FBBC04"><path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/></svg>
                    ))}
                  </div>
                  <span>Google</span>
                </div>
                <div className="ft-rating-chip">
                  <svg width="14" height="14" viewBox="0 0 40 40" fill="none">
                    <circle cx="14" cy="20" r="5" fill="#00AA6C"/>
                    <circle cx="26" cy="20" r="5" fill="#00AA6C"/>
                    <circle cx="14" cy="20" r="2.2" fill="white"/>
                    <circle cx="26" cy="20" r="2.2" fill="white"/>
                  </svg>
                  <span className="ft-rating-num">5.0</span>
                  <div className="ft-stars">
                    {[1,2,3,4,5].map(i => (
                      <svg key={i} viewBox="0 0 24 24" fill="#00AA6C"><path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/></svg>
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

            {/* Newsletter */}
            <div>
              <span className="ft-newsletter-label">Stay in the loop</span>
              <h3 className="ft-newsletter-heading">Travel tips &<br />exclusive offers.</h3>
              <p className="ft-newsletter-sub">
                Get Paris travel guides, transfer deals, and seasonal promotions delivered straight to your inbox. No spam, ever.
              </p>
              <div className="ft-newsletter-form">
                <input type="email" placeholder="your@email.com" className="ft-newsletter-input" />
                <button className="ft-newsletter-btn">Subscribe →</button>
              </div>
            </div>
          </div>

          {/* Nav columns */}
          <div className="ft-nav">
            {Object.entries(NAV_LINKS).map(([section, links]) => (
              <div key={section}>
                <span className="ft-nav-heading">{section}</span>
                <ul className="ft-nav-list">
                  {links.map(link => (
                    <li key={link.href}>
                      <Link href={link.href} className="ft-nav-link">{link.label}</Link>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>

          {/* Contact */}
          <div className="ft-contact">
            <div className="ft-contact-item" style={{ cursor: "default" }}>
              <div className="ft-contact-icon">
                <svg fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"/>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"/>
                </svg>
              </div>
              <div>
                <div className="ft-contact-label">Address</div>
                <div className="ft-contact-value">10 rue Pierre Sarrazin</div>
                <div style={{ fontSize: 11, color: "rgba(245,240,232,0.4)", marginTop: 2 }}>95190 Goussainville · CDG Airport · Paris, France</div>
              </div>
            </div>
            <a href="tel:+33652466694" className="ft-contact-item">
              <div className="ft-contact-icon">
                <svg fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"/>
                </svg>
              </div>
              <div>
                <div className="ft-contact-label">Phone / WhatsApp</div>
                <div className="ft-contact-value">+33 6 52 46 66 94</div>
              </div>
            </a>
            <a href="mailto:booking@pariseasymove.com" className="ft-contact-item">
              <div className="ft-contact-icon">
                <svg fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"/>
                </svg>
              </div>
              <div>
                <div className="ft-contact-label">Email</div>
                <div className="ft-contact-value">booking@pariseasymove.com</div>
              </div>
            </a>
            <a href="https://pariseasymove.com" target="_blank" rel="noopener noreferrer" className="ft-contact-item">
              <div className="ft-contact-icon">
                <svg fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M21 12a9 9 0 01-9 9m9-9a9 9 0 00-9-9m9 9H3m9 9a9 9 0 01-9-9m9 9c1.657 0 3-4.03 3-9s-1.343-9-3-9m0 18c-1.657 0-3-4.03-3-9s1.343-9 3-9"/>
                </svg>
              </div>
              <div>
                <div className="ft-contact-label">Website</div>
                <div className="ft-contact-value">pariseasymove.com</div>
              </div>
            </a>
            <div className="ft-contact-item" style={{ cursor: "default" }}>
              <div className="ft-contact-icon">
                <svg fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"/>
                </svg>
              </div>
              <div>
                <div className="ft-contact-label">Availability</div>
                <div className="ft-contact-value">24 / 7 — Every day</div>
              </div>
            </div>
          </div>

          {/* Bottom bar */}
          <div className="ft-bottom">
            <p className="ft-copy">
              © {currentYear} Paris Easy Move. All rights reserved.
            </p>
            <div className="ft-pay">
              <span className="ft-pay-label">We accept</span>
              {["Cash", "Visa", "Mastercard", "Amex", "PayPal"].map(p => (
                <span key={p} className="ft-pay-chip">{p}</span>
              ))}
            </div>
            <div className="ft-bottom-links">
              <Link href="/privacy" className="ft-bottom-link">Privacy</Link>
              <Link href="/terms" className="ft-bottom-link">Terms</Link>
              <Link href="/cookies" className="ft-bottom-link">Cookies</Link>
              <Link href="/sitemap" className="ft-bottom-link">Sitemap</Link>
            </div>
          </div>

        </div>
      </footer>
    </>
  );
}