const packages = [
  {
    num: "01",
    tag: "Airport → Disney",
    title: "Charles de Gaulle to Disneyland",
    desc: "Private door-to-door transfer from <strong>CDG Airport</strong> to <strong>Disneyland Paris</strong>. Pre-book a car or van for a stress-free, direct ride — ideal for families or groups.",
    time: "~45 min",
    fare: "from €105",
    bg: "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?auto=format&fit=crop&q=80&w=900",
  },
  {
    num: "02",
    tag: "Airport → Disney",
    title: "Orly Airport to Disneyland",
    desc: "A comfortable and direct journey from <strong>Orly Airport</strong> to <strong>Disneyland Paris</strong> with a dedicated driver — ensuring a stress-free start to your Disney experience.",
    time: "~40 min",
    fare: "from €95",
    bg: "https://images.unsplash.com/photo-1502602898657-3e91760cbb34?auto=format&fit=crop&q=80&w=900",
  },
  {
    num: "03",
    tag: "Airport → Disney",
    title: "Beauvais–Tillé to Disneyland",
    desc: "Seamless private transfer from <strong>Beauvais–Tillé Airport</strong> to <strong>Disneyland Paris</strong> in a comfortable, air-conditioned vehicle. Door-to-door, no waiting.",
    time: "~90 min",
    fare: "from €145",
    bg: "https://images.unsplash.com/photo-1499856871958-5b9627545d1a?auto=format&fit=crop&q=80&w=900",
  },
  {
    num: "04",
    tag: "City → Palace",
    title: "Paris City to Versailles",
    desc: "Elegant private transfer from <strong>central Paris</strong> to the <strong>Palace of Versailles</strong>. Skip the crowded trains and arrive refreshed for one of France's most breathtaking landmarks.",
    time: "~50 min",
    fare: "from €110",
    bg: "https://images.unsplash.com/photo-1597598425700-88c56c85a1df?auto=format&fit=crop&q=80&w=900",
  },
  {
    num: "05",
    tag: "Airport → City",
    title: "CDG Airport to Paris Centre",
    desc: "Start your Paris stay the right way — a <strong>direct private transfer</strong> from <strong>Charles de Gaulle</strong> straight to your hotel in the heart of the city, no detours, no stress.",
    time: "~35 min",
    fare: "from €85",
    bg: "https://images.unsplash.com/photo-1511739001486-6bfe10ce785f?auto=format&fit=crop&q=80&w=900",
  },
];

export default function Packages() {
  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Space+Grotesk:wght@400;500;600;700;800&family=Space+Mono:wght@400;700&display=swap');

        .pkg-section {
          background: #ffffff;
          padding: 100px 0 112px;
          font-family: 'Space Grotesk', sans-serif;
          position: relative;
          overflow: hidden;
        }
        .pkg-section::before {
          content: '';
          position: absolute; inset: 0;
          background-image: radial-gradient(circle, rgba(0,0,0,0.05) 1px, transparent 1px);
          background-size: 28px 28px;
          pointer-events: none;
        }

        .pkg-inner {
          max-width: 1200px;
          margin: 0 auto;
          padding: 0 48px;
          position: relative;
        }

        /* Header */
        .pkg-header {
          display: flex; align-items: flex-end; justify-content: space-between;
          margin-bottom: 60px; gap: 32px; flex-wrap: wrap;
        }
        .pkg-eyebrow {
          display: inline-flex; align-items: center; gap: 8px;
          font-family: 'Space Mono', monospace; font-size: 9.5px; font-weight: 700;
          letter-spacing: 0.18em; text-transform: uppercase; color: #00A854;
          background: rgba(0,168,84,0.08); border: 1px solid rgba(0,168,84,0.2);
          border-radius: 6px; padding: 5px 12px; margin-bottom: 16px;
        }
        .pkg-eyebrow-dot {
          width: 6px; height: 6px; border-radius: 50%; background: #00A854;
          animation: pkg-pulse 2s ease-in-out infinite;
        }
        @keyframes pkg-pulse {
          0%,100% { box-shadow: 0 0 4px rgba(0,168,84,0.4); }
          50%      { box-shadow: 0 0 10px rgba(0,168,84,0.7); }
        }
        .pkg-heading {
          font-size: clamp(32px, 4vw, 54px); font-weight: 800;
          color: #080808; line-height: 1.05; letter-spacing: -0.035em;
        }
        .pkg-heading em { font-style: normal; color: #00A854; }
        .pkg-sub {
          font-size: 15px; font-weight: 500; color: rgba(0,0,0,0.5);
          line-height: 1.7; max-width: 300px; text-align: right;
        }

        /* Grid */
        .pkg-grid {
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          gap: 22px;
        }
        @media (max-width: 900px) { .pkg-grid { grid-template-columns: 1fr; max-width: 480px; margin: 0 auto; } }

        /* last row: 2 cards centered */
        .pkg-grid .pkg-card:nth-child(4) { grid-column: 1 / 2; margin-left: auto; width: 100%; }
        .pkg-grid .pkg-card:nth-child(5) { grid-column: 2 / 3; margin-right: auto; width: 100%; }

        /* Card */
        .pkg-card {
          border-radius: 22px; overflow: hidden;
          border: 1.5px solid rgba(0,0,0,0.09);
          background: #fff;
          display: flex; flex-direction: column;
          transition: transform 0.28s ease, box-shadow 0.28s ease, border-color 0.28s ease;
          animation: pkg-fadeup 0.5s ease both;
        }
        .pkg-card:nth-child(1) { animation-delay: 0.06s; }
        .pkg-card:nth-child(2) { animation-delay: 0.13s; }
        .pkg-card:nth-child(3) { animation-delay: 0.20s; }
        .pkg-card:nth-child(4) { animation-delay: 0.27s; }
        .pkg-card:nth-child(5) { animation-delay: 0.34s; }
        @keyframes pkg-fadeup {
          from { opacity: 0; transform: translateY(24px); }
          to   { opacity: 1; transform: translateY(0); }
        }
        .pkg-card:hover {
          transform: translateY(-6px);
          box-shadow: 0 24px 64px rgba(0,0,0,0.11);
          border-color: rgba(0,168,84,0.3);
        }

        /* Image area */
        .pkg-img-wrap {
          position: relative; height: 210px; overflow: hidden; flex-shrink: 0;
        }
        .pkg-img {
          position: absolute; inset: 0;
          background-size: cover; background-position: center;
          transition: transform 0.5s ease;
        }
        .pkg-card:hover .pkg-img { transform: scale(1.06); }
        .pkg-img-overlay {
          position: absolute; inset: 0;
          background: linear-gradient(to bottom, rgba(0,0,0,0.15) 0%, rgba(0,0,0,0.55) 100%);
        }

        /* Floating badges on image */
        .pkg-img-badges {
          position: absolute; bottom: 16px; left: 16px; right: 16px;
          display: flex; align-items: center; justify-content: space-between;
        }
        .pkg-img-tag {
          font-family: 'Space Mono', monospace; font-size: 8px; font-weight: 700;
          letter-spacing: 0.14em; text-transform: uppercase; color: white;
          background: rgba(0,168,84,0.85); backdrop-filter: blur(8px);
          border-radius: 100px; padding: 5px 12px;
        }
        .pkg-img-num {
          font-family: 'Space Mono', monospace; font-size: 11px; font-weight: 700;
          color: rgba(255,255,255,0.5); letter-spacing: 0.08em;
        }

        /* Body */
        .pkg-body {
          padding: 28px 26px 26px; display: flex; flex-direction: column; flex: 1;
        }
        .pkg-title {
          font-size: 19px; font-weight: 800; color: #080808;
          letter-spacing: -0.025em; line-height: 1.15; margin-bottom: 8px;
        }

        .pkg-divider {
          width: 28px; height: 2px; background: rgba(0,168,84,0.35);
          border-radius: 2px; margin-bottom: 14px;
          transition: width 0.3s ease, background 0.3s ease;
        }
        .pkg-card:hover .pkg-divider { width: 48px; background: #00A854; }

        .pkg-desc {
          font-size: 14px; font-weight: 500; color: rgba(0,0,0,0.55);
          line-height: 1.72; margin-bottom: 22px; flex: 1;
        }
        .pkg-desc strong { color: rgba(0,0,0,0.78); font-weight: 700; }

        /* Meta row */
        .pkg-meta {
          display: flex; align-items: center; gap: 10px; margin-bottom: 22px;
        }
        .pkg-meta-chip {
          display: flex; align-items: center; gap: 5px;
          font-family: 'Space Mono', monospace; font-size: 9px; font-weight: 700;
          letter-spacing: 0.1em; text-transform: uppercase;
          color: rgba(0,0,0,0.45); background: #F5F5F5;
          border: 1.5px solid rgba(0,0,0,0.08); border-radius: 8px;
          padding: 6px 10px;
        }
        .pkg-meta-chip svg { width: 11px; height: 11px; opacity: 0.6; }
        .pkg-fare {
          margin-left: auto;
          font-size: 18px; font-weight: 800; color: #080808; letter-spacing: -0.02em;
        }
        .pkg-fare span { font-size: 11px; font-weight: 600; color: rgba(0,0,0,0.4); margin-right: 2px; }

        /* CTA */
        .pkg-cta {
          display: flex; align-items: center; justify-content: center; gap: 8px;
          background: #080808; color: #fff;
          font-family: 'Space Grotesk', sans-serif; font-size: 14px; font-weight: 700;
          letter-spacing: -0.01em; border-radius: 12px; padding: 14px 20px;
          text-decoration: none; border: none; cursor: pointer;
          transition: background 0.2s, transform 0.15s, box-shadow 0.2s;
          position: relative; overflow: hidden;
        }
        .pkg-cta::before {
          content: ''; position: absolute; inset: 0;
          background: linear-gradient(135deg, rgba(255,255,255,0.08) 0%, transparent 60%);
          pointer-events: none;
        }
        .pkg-cta:hover {
          background: #00A854;
          box-shadow: 0 6px 24px rgba(0,168,84,0.3);
          transform: translateY(-1px);
        }
        .pkg-cta-arrow {
          transition: transform 0.2s ease;
          font-size: 16px; line-height: 1;
        }
        .pkg-cta:hover .pkg-cta-arrow { transform: translateX(3px); }
      `}</style>

      <section className="pkg-section">
        <div className="pkg-inner">

          {/* Header */}
          <div className="pkg-header">
            <div>
              <div className="pkg-eyebrow">
                <span className="pkg-eyebrow-dot" />
                Our Packages
              </div>
              <h2 className="pkg-heading">
                Famous routes,<br /><em>fixed prices.</em>
              </h2>
            </div>
            <p className="pkg-sub">
              The most popular airport-to-Disney transfers — booked in seconds, no surprises on arrival.
            </p>
          </div>

          {/* Cards */}
          <div className="pkg-grid">
            {packages.map((pkg, i) => (
              <div key={i} className="pkg-card">

                {/* Image */}
                <div className="pkg-img-wrap">
                  <div className="pkg-img" style={{ backgroundImage: `url(${pkg.bg})` }} />
                  <div className="pkg-img-overlay" />
                  <div className="pkg-img-badges">
                    <span className="pkg-img-tag">{pkg.tag}</span>
                    <span className="pkg-img-num">{pkg.num}</span>
                  </div>
                </div>

                {/* Body */}
                <div className="pkg-body">
                  <h3 className="pkg-title">{pkg.title}</h3>
                  <div className="pkg-divider" />
                  <p className="pkg-desc" dangerouslySetInnerHTML={{ __html: pkg.desc }} />

                  {/* Meta */}
                  <div className="pkg-meta">
                    <span className="pkg-meta-chip">
                      <svg fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2.2">
                        <circle cx="12" cy="12" r="10"/><path strokeLinecap="round" d="M12 6v6l4 2"/>
                      </svg>
                      {pkg.time}
                    </span>
                    <span className="pkg-meta-chip">
                      <svg fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2.2">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z"/>
                      </svg>
                      Fixed fare
                    </span>
                    <span className="pkg-fare"><span>from</span>{pkg.fare.replace("from ", "")}</span>
                  </div>

                  <a href="#booking" className="pkg-cta">
                    Book this transfer
                    <span className="pkg-cta-arrow">→</span>
                  </a>
                </div>

              </div>
            ))}
          </div>

        </div>
      </section>
    </>
  );
}