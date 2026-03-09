import {
  CurrencyDollarIcon,
  ClockIcon,
  ShieldCheckIcon,
  MapPinIcon,
  UserGroupIcon,
  FaceSmileIcon,
} from "@heroicons/react/24/outline";

const benefits = [
  {
    icon: CurrencyDollarIcon,
    tag: "01",
    title: "Affordable Rates",
    desc: "Competitive and transparent pricing with no surprises — just great value, every ride.",
  },
  {
    icon: ClockIcon,
    tag: "02",
    title: "Reliability",
    desc: "Punctuality is non-negotiable. We show up on time, every time — whether it's a meeting or a getaway.",
  },
  {
    icon: ShieldCheckIcon,
    tag: "03",
    title: "Safety First",
    desc: "Experienced drivers, well-maintained vehicles, and your peace of mind at the heart of every journey.",
  },
  {
    icon: MapPinIcon,
    tag: "04",
    title: "Convenience",
    desc: "Book in seconds via app or phone. A driver at your doorstep, exactly when you need one.",
  },
  {
    icon: UserGroupIcon,
    tag: "05",
    title: "Local Knowledge",
    desc: "Our drivers know every shortcut. Best routes, even during rush hour — because local expertise matters.",
  },
  {
    icon: FaceSmileIcon,
    tag: "06",
    title: "Customer Satisfaction",
    desc: "Your satisfaction is our destination. We go the extra mile so every ride feels effortless.",
  },
];

export default function WhyChooseUs() {
  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Space+Grotesk:wght@400;500;600;700;800&family=Space+Mono:wght@400;700&display=swap');

        .wcu-section {
          background: #ffffff;
          padding: 100px 0 112px;
          font-family: 'Space Grotesk', sans-serif;
          position: relative;
          overflow: hidden;
        }

        /* Subtle dot-grid background */
        .wcu-section::before {
          content: '';
          position: absolute;
          inset: 0;
          background-image: radial-gradient(circle, rgba(0,0,0,0.055) 1px, transparent 1px);
          background-size: 28px 28px;
          pointer-events: none;
        }

        .wcu-inner {
          max-width: 1200px;
          margin: 0 auto;
          padding: 0 48px;
          position: relative;
        }

        /* Header */
        .wcu-header {
          display: flex;
          align-items: flex-end;
          justify-content: space-between;
          margin-bottom: 64px;
          gap: 32px;
          flex-wrap: wrap;
        }
        .wcu-eyebrow {
          display: inline-flex;
          align-items: center;
          gap: 8px;
          font-family: 'Space Mono', monospace;
          font-size: 9.5px;
          font-weight: 700;
          letter-spacing: 0.18em;
          text-transform: uppercase;
          color: #00A854;
          background: rgba(0,168,84,0.08);
          border: 1px solid rgba(0,168,84,0.2);
          border-radius: 6px;
          padding: 5px 12px;
          margin-bottom: 16px;
        }
        .wcu-eyebrow-dot {
          width: 6px; height: 6px;
          border-radius: 50%;
          background: #00A854;
          box-shadow: 0 0 6px rgba(0,168,84,0.5);
          animation: wcu-pulse 2s ease-in-out infinite;
        }
        @keyframes wcu-pulse {
          0%,100% { box-shadow: 0 0 4px rgba(0,168,84,0.4); }
          50%      { box-shadow: 0 0 10px rgba(0,168,84,0.7); }
        }
        .wcu-heading {
          font-size: clamp(34px, 4vw, 56px);
          font-weight: 800;
          color: #080808;
          line-height: 1.05;
          letter-spacing: -0.035em;
        }
        .wcu-heading em {
          font-style: normal;
          color: #00A854;
        }
        .wcu-sub {
          font-size: 15px;
          font-weight: 500;
          color: rgba(0,0,0,0.5);
          line-height: 1.7;
          max-width: 320px;
          text-align: right;
        }

        /* Grid */
        .wcu-grid {
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          gap: 20px;
        }
        @media (max-width: 900px) { .wcu-grid { grid-template-columns: repeat(2, 1fr); } }
        @media (max-width: 560px) { .wcu-grid { grid-template-columns: 1fr; } }

        /* Card */
        .wcu-card {
          background: #ffffff;
          border: 1.5px solid rgba(0,0,0,0.09);
          border-radius: 20px;
          padding: 32px 28px 28px;
          position: relative;
          overflow: hidden;
          transition: transform 0.25s ease, box-shadow 0.25s ease, border-color 0.25s ease;
          cursor: default;
        }
        .wcu-card::before {
          content: '';
          position: absolute;
          top: 0; left: 0; right: 0;
          height: 3px;
          background: #00A854;
          transform: scaleX(0);
          transform-origin: left;
          transition: transform 0.3s ease;
          border-radius: 20px 20px 0 0;
        }
        .wcu-card:hover {
          transform: translateY(-5px);
          box-shadow: 0 20px 60px rgba(0,0,0,0.10);
          border-color: rgba(0,168,84,0.25);
        }
        .wcu-card:hover::before {
          transform: scaleX(1);
        }

        /* Card number tag */
        .wcu-card-tag {
          position: absolute;
          top: 24px;
          right: 24px;
          font-family: 'Space Mono', monospace;
          font-size: 11px;
          font-weight: 700;
          letter-spacing: 0.1em;
          color: rgba(0,0,0,0.15);
        }

        /* Icon wrapper */
        .wcu-icon-wrap {
          width: 52px;
          height: 52px;
          border-radius: 14px;
          background: rgba(0,168,84,0.08);
          border: 1.5px solid rgba(0,168,84,0.15);
          display: flex;
          align-items: center;
          justify-content: center;
          margin-bottom: 22px;
          transition: background 0.25s, border-color 0.25s, transform 0.25s;
        }
        .wcu-card:hover .wcu-icon-wrap {
          background: rgba(0,168,84,0.14);
          border-color: rgba(0,168,84,0.3);
          transform: scale(1.08);
        }
        .wcu-icon-wrap svg {
          width: 24px;
          height: 24px;
          color: #00A854;
          stroke-width: 1.8;
        }

        /* Text */
        .wcu-card-title {
          font-size: 18px;
          font-weight: 800;
          color: #080808;
          letter-spacing: -0.025em;
          margin-bottom: 10px;
        }
        .wcu-card-desc {
          font-size: 14px;
          font-weight: 500;
          color: rgba(0,0,0,0.55);
          line-height: 1.7;
        }

        /* Divider line */
        .wcu-card-divider {
          width: 32px;
          height: 2px;
          background: rgba(0,168,84,0.3);
          border-radius: 2px;
          margin: 16px 0;
          transition: width 0.3s ease, background 0.3s ease;
        }
        .wcu-card:hover .wcu-card-divider {
          width: 52px;
          background: #00A854;
        }

        /* Staggered animation on load */
        .wcu-card { animation: wcu-fadeup 0.5s ease both; }
        .wcu-card:nth-child(1) { animation-delay: 0.05s; }
        .wcu-card:nth-child(2) { animation-delay: 0.10s; }
        .wcu-card:nth-child(3) { animation-delay: 0.15s; }
        .wcu-card:nth-child(4) { animation-delay: 0.20s; }
        .wcu-card:nth-child(5) { animation-delay: 0.25s; }
        .wcu-card:nth-child(6) { animation-delay: 0.30s; }
        @keyframes wcu-fadeup {
          from { opacity: 0; transform: translateY(22px); }
          to   { opacity: 1; transform: translateY(0); }
        }

        /* Bottom stat bar */
        .wcu-stats {
          display: flex;
          gap: 0;
          margin-top: 56px;
          border: 1.5px solid rgba(0,0,0,0.09);
          border-radius: 16px;
          overflow: hidden;
        }
        .wcu-stat {
          flex: 1;
          padding: 28px 24px;
          text-align: center;
          border-right: 1.5px solid rgba(0,0,0,0.09);
          background: #ffffff;
          transition: background 0.2s;
        }
        .wcu-stat:last-child { border-right: none; }
        .wcu-stat:hover { background: rgba(0,168,84,0.04); }
        .wcu-stat-num {
          font-size: 36px;
          font-weight: 800;
          color: #080808;
          letter-spacing: -0.04em;
          line-height: 1;
          margin-bottom: 6px;
        }
        .wcu-stat-num span { color: #00A854; }
        .wcu-stat-label {
          font-family: 'Space Mono', monospace;
          font-size: 9px;
          font-weight: 700;
          letter-spacing: 0.14em;
          text-transform: uppercase;
          color: rgba(0,0,0,0.4);
        }
      `}</style>

      <section className="wcu-section">
        <div className="wcu-inner">

          {/* Header */}
          <div className="wcu-header">
            <div>
              <div className="wcu-eyebrow">
                <span className="wcu-eyebrow-dot" />
                Why Choose Us
              </div>
              <h2 className="wcu-heading">
                More than just<br />a <em>taxi service.</em>
              </h2>
            </div>
            <p className="wcu-sub">
              Six reasons why thousands of travellers choose us for every trip across Paris and beyond.
            </p>
          </div>

          {/* Cards */}
          <div className="wcu-grid">
            {benefits.map((item, index) => (
              <div key={index} className="wcu-card">
                <span className="wcu-card-tag">{item.tag}</span>
                <div className="wcu-icon-wrap">
                  <item.icon aria-hidden="true" />
                </div>
                <h3 className="wcu-card-title">{item.title}</h3>
                <div className="wcu-card-divider" />
                <p className="wcu-card-desc">{item.desc}</p>
              </div>
            ))}
          </div>

          {/* Stats bar */}
          <div className="wcu-stats">
            {[
              { num: "4.9", suffix: "★", label: "Average Rating" },
              { num: "1,200", suffix: "+", label: "Verified Rides" },
              { num: "24", suffix: "/7", label: "Availability" },
              { num: "0", suffix: "€", label: "Hidden Fees" },
            ].map((s, i) => (
              <div key={i} className="wcu-stat">
                <div className="wcu-stat-num">{s.num}<span>{s.suffix}</span></div>
                <div className="wcu-stat-label">{s.label}</div>
              </div>
            ))}
          </div>

        </div>
      </section>
    </>
  );
}