export default function ReadyToBook() {
  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Space+Grotesk:wght@400;500;600;700;800&family=Space+Mono:wght@400;700&display=swap');

        .rtb-section {
          background: #080808;
          font-family: 'Space Grotesk', sans-serif;
          position: relative;
          overflow: hidden;
          padding: 100px 48px;
        }

        /* Background image with overlay */
        .rtb-bg {
          position: absolute; inset: 0;
          background-image: url('https://images.unsplash.com/photo-1502602898657-3e91760cbb34?auto=format&fit=crop&q=80&w=1800');
          background-size: cover; background-position: center;
          opacity: 0.18;
        }

        /* Green radial glow */
        .rtb-glow {
          position: absolute; inset: 0;
          background: radial-gradient(ellipse 70% 80% at 50% 50%, rgba(0,168,84,0.14) 0%, transparent 70%);
          pointer-events: none;
        }

        /* Dot grid */
        .rtb-dots {
          position: absolute; inset: 0;
          background-image: radial-gradient(circle, rgba(255,255,255,0.05) 1px, transparent 1px);
          background-size: 28px 28px; pointer-events: none;
        }

        /* Green top border */
        .rtb-topline {
          position: absolute; top: 0; left: 0; right: 0; height: 3px;
          background: linear-gradient(to right, transparent 0%, #00A854 30%, #00A854 70%, transparent 100%);
        }

        .rtb-inner {
          position: relative;
          max-width: 900px;
          margin: 0 auto;
          text-align: center;
        }

        /* Eyebrow */
        .rtb-eyebrow {
          display: inline-flex; align-items: center; gap: 8px;
          font-family: 'Space Mono', monospace; font-size: 9.5px; font-weight: 700;
          letter-spacing: 0.18em; text-transform: uppercase; color: #00A854;
          background: rgba(0,168,84,0.1); border: 1px solid rgba(0,168,84,0.25);
          border-radius: 6px; padding: 6px 14px; margin-bottom: 28px;
        }
        .rtb-eyebrow-dot {
          width: 6px; height: 6px; border-radius: 50%; background: #00A854;
          animation: rtb-pulse 2s ease-in-out infinite; flex-shrink: 0;
        }
        @keyframes rtb-pulse {
          0%,100% { box-shadow: 0 0 4px rgba(0,168,84,0.5); }
          50%      { box-shadow: 0 0 12px rgba(0,168,84,0.9); }
        }

        /* Heading */
        .rtb-heading {
          font-size: clamp(38px, 6vw, 72px);
          font-weight: 800; color: white;
          letter-spacing: -0.04em; line-height: 1.02;
          margin-bottom: 22px;
          animation: rtb-fadeup 0.6s ease both;
        }
        .rtb-heading em { font-style: normal; color: #00A854; }

        .rtb-sub {
          font-size: 17px; font-weight: 500;
          color: rgba(255,255,255,0.48); line-height: 1.7;
          max-width: 580px; margin: 0 auto 52px;
          animation: rtb-fadeup 0.6s 0.1s ease both;
        }

        /* Trust pills row */
        .rtb-trust {
          display: flex; align-items: center; justify-content: center;
          gap: 12px; flex-wrap: wrap; margin-bottom: 48px;
          animation: rtb-fadeup 0.6s 0.15s ease both;
        }
        .rtb-trust-pill {
          display: flex; align-items: center; gap: 7px;
          background: rgba(255,255,255,0.06); border: 1px solid rgba(255,255,255,0.1);
          border-radius: 100px; padding: 8px 16px;
          font-family: 'Space Mono', monospace; font-size: 9px; font-weight: 700;
          letter-spacing: 0.1em; text-transform: uppercase; color: rgba(255,255,255,0.45);
        }
        .rtb-trust-pill svg { width: 13px; height: 13px; color: #00A854; flex-shrink: 0; }

        /* CTA buttons */
        .rtb-ctas {
          display: flex; align-items: center; justify-content: center;
          gap: 14px; flex-wrap: wrap;
          animation: rtb-fadeup 0.6s 0.2s ease both;
        }
        .rtb-btn-primary {
          display: inline-flex; align-items: center; gap: 10px;
          background: #00A854; color: white; text-decoration: none;
          font-family: 'Space Grotesk', sans-serif;
          font-size: 16px; font-weight: 700; letter-spacing: -0.01em;
          padding: 18px 36px; border-radius: 14px; border: none; cursor: pointer;
          position: relative; overflow: hidden;
          transition: background 0.2s, transform 0.15s, box-shadow 0.2s;
        }
        .rtb-btn-primary::before {
          content: ''; position: absolute; inset: 0;
          background: linear-gradient(135deg, rgba(255,255,255,0.15) 0%, transparent 60%);
          pointer-events: none;
        }
        .rtb-btn-primary:hover {
          background: #008F47; transform: translateY(-2px);
          box-shadow: 0 8px 32px rgba(0,168,84,0.4);
        }
        .rtb-btn-primary svg { width: 18px; height: 18px; transition: transform 0.2s; }
        .rtb-btn-primary:hover svg { transform: translateX(3px); }

        .rtb-btn-secondary {
          display: inline-flex; align-items: center; gap: 10px;
          background: rgba(255,255,255,0.07); color: white; text-decoration: none;
          font-family: 'Space Grotesk', sans-serif;
          font-size: 16px; font-weight: 700; letter-spacing: -0.01em;
          padding: 18px 32px; border-radius: 14px;
          border: 1.5px solid rgba(255,255,255,0.15); cursor: pointer;
          transition: background 0.2s, border-color 0.2s, transform 0.15s;
        }
        .rtb-btn-secondary:hover {
          background: rgba(255,255,255,0.12); border-color: rgba(255,255,255,0.3);
          transform: translateY(-2px);
        }
        .rtb-btn-secondary svg { width: 18px; height: 18px; }

        /* Divider */
        .rtb-or {
          font-family: 'Space Mono', monospace; font-size: 9px; font-weight: 700;
          letter-spacing: 0.14em; text-transform: uppercase; color: rgba(255,255,255,0.2);
        }

        /* Stats strip */
        .rtb-stats {
          display: flex; justify-content: center; gap: 0;
          margin-top: 64px;
          border: 1px solid rgba(255,255,255,0.08); border-radius: 16px;
          overflow: hidden; backdrop-filter: blur(12px);
          background: rgba(255,255,255,0.04);
          animation: rtb-fadeup 0.6s 0.28s ease both;
        }
        .rtb-stat {
          flex: 1; padding: 24px 20px; text-align: center;
          border-right: 1px solid rgba(255,255,255,0.08);
          transition: background 0.2s;
        }
        .rtb-stat:last-child { border-right: none; }
        .rtb-stat:hover { background: rgba(0,168,84,0.06); }
        .rtb-stat-num {
          font-size: 30px; font-weight: 800; color: white;
          letter-spacing: -0.04em; line-height: 1; margin-bottom: 6px;
        }
        .rtb-stat-num span { color: #00A854; }
        .rtb-stat-label {
          font-family: 'Space Mono', monospace; font-size: 8.5px; font-weight: 700;
          letter-spacing: 0.12em; text-transform: uppercase; color: rgba(255,255,255,0.3);
        }

        @keyframes rtb-fadeup {
          from { opacity: 0; transform: translateY(20px); }
          to   { opacity: 1; transform: translateY(0); }
        }

        @media (max-width: 600px) {
          .rtb-section { padding: 80px 24px; }
          .rtb-stats { flex-wrap: wrap; }
          .rtb-stat { flex: 1 1 45%; border-right: none; border-bottom: 1px solid rgba(255,255,255,0.08); }
        }
      `}</style>

      <section className="rtb-section">
        <div className="rtb-bg" />
        <div className="rtb-glow" />
        <div className="rtb-dots" />
        <div className="rtb-topline" />

        <div className="rtb-inner">

          {/* Eyebrow */}
          <div className="rtb-eyebrow">
            <span className="rtb-eyebrow-dot" />
            Book your transfer
          </div>

          {/* Heading */}
          <h2 className="rtb-heading">
            Your Paris ride,<br /><em>ready in seconds.</em>
          </h2>
          <p className="rtb-sub">
            Fixed fares, professional drivers, door-to-door comfort. No prepayment required — just book and we'll take care of the rest.
          </p>

          {/* Trust pills */}
          <div className="rtb-trust">
            {[
              { label: "Fixed pricing", icon: <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.2" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z"/> },
              { label: "Pay on arrival", icon: <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.2" d="M3 10h18M7 15h1m4 0h1m-7 4h12a3 3 0 003-3V8a3 3 0 00-3-3H6a3 3 0 00-3 3v8a3 3 0 003 3z"/> },
              { label: "Free cancellation", icon: <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.2" d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z"/> },
              { label: "24 / 7 support", icon: <><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.2" d="M18.364 5.636l-3.536 3.536m0 5.656l3.536 3.536M9.172 9.172L5.636 5.636m3.536 9.192l-3.536 3.536M21 12a9 9 0 11-18 0 9 9 0 0118 0zm-5 0a4 4 0 11-8 0 4 4 0 018 0z"/></> },
              { label: "Flight tracking", icon: <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.2" d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8"/> },
            ].map((t, i) => (
              <div key={i} className="rtb-trust-pill">
                <svg fill="none" viewBox="0 0 24 24" stroke="currentColor">{t.icon}</svg>
                {t.label}
              </div>
            ))}
          </div>

          {/* CTAs */}
          <div className="rtb-ctas">
            <a href="/booking" className="rtb-btn-primary">
              Book your transfer
              <svg fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2.5">
                <path strokeLinecap="round" strokeLinejoin="round" d="M13 7l5 5m0 0l-5 5m5-5H6"/>
              </svg>
            </a>
            <span className="rtb-or">or</span>
            <a href="tel:+33652466694" className="rtb-btn-secondary">
              <svg fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                <path strokeLinecap="round" strokeLinejoin="round" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"/>
              </svg>
              +33 6 52 46 66 94
            </a>
            <a href="https://wa.me/33652466694" className="rtb-btn-secondary" target="_blank" rel="noopener noreferrer">
              <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
                <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
              </svg>
              WhatsApp us
            </a>
          </div>

          {/* Stats */}
          <div className="rtb-stats">
            {[
              { num: "1,200", suffix: "+", label: "Rides Completed" },
              { num: "4.9", suffix: "★", label: "Average Rating" },
              { num: "24", suffix: "/7", label: "Always Available" },
              { num: "0", suffix: "€", label: "Hidden Fees" },
              { num: "15", suffix: "min", label: "Avg. Response Time" },
            ].map((s, i) => (
              <div key={i} className="rtb-stat">
                <div className="rtb-stat-num">{s.num}<span>{s.suffix}</span></div>
                <div className="rtb-stat-label">{s.label}</div>
              </div>
            ))}
          </div>

        </div>
      </section>
    </>
  );
}