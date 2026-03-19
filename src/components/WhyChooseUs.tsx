"use client";

import React from "react";

const benefits = [
  {
    num: "01",
    icon: (
      <svg viewBox="0 0 24 24" width={36} height={36} fill="none" stroke="currentColor" strokeWidth={1.6}>
        <path d="M12 2C8 2 4.5 5 4.5 9c0 5.25 7.5 13 7.5 13s7.5-7.75 7.5-13c0-4-3.5-7-7.5-7z" />
        <path d="M9 9l2 2 4-4" />
      </svg>
    ),
    title: "Punctual Every Time",
    desc: "We monitor your flight live — your driver is always there, on time, no matter what.",
    featured: true,
  },
  {
    num: "02",
    icon: (
      <svg viewBox="0 0 24 24" width={36} height={36} fill="none" stroke="currentColor" strokeWidth={1.6}>
        <rect x="3" y="6" width="18" height="12" rx="2" />
        <line x1="3" y1="11" x2="21" y2="11" />
      </svg>
    ),
    title: "Transparent Fixed Pricing",
    desc: "All-inclusive quote — no surprises, no surge, no hidden charges.",
    featured: true,
  },
  {
    num: "03",
    icon: (
      <svg viewBox="0 0 24 24" width={36} height={36} fill="none" stroke="currentColor" strokeWidth={1.6}>
        <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
      </svg>
    ),
    title: "Absolute Safety",
    desc: "Professionally screened drivers, meticulously maintained vehicles.",
  },
  {
    num: "04",
    icon: (
      <svg viewBox="0 0 24 24" width={36} height={36} fill="none" stroke="currentColor" strokeWidth={1.6}>
        <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z" />
        <circle cx="12" cy="10" r="3" />
      </svg>
    ),
    title: "Seamless Door-to-Door",
    desc: "Meet & greet inside terminal → direct to your destination.",
  },
  {
    num: "05",
    icon: (
      <svg viewBox="0 0 24 24" width={36} height={36} fill="none" stroke="currentColor" strokeWidth={1.6}>
        <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" />
        <circle cx="9" cy="7" r="4" />
        <path d="M23 21v-2a4 4 0 0 0-3-3.87" />
      </svg>
    ),
    title: "Family & Group Comfort",
    desc: "Free child seats · Mercedes vans up to 8 passengers · Disney films on board for the little ones.",
  },
  {
    num: "06",
    icon: (
      <svg viewBox="0 0 24 24" width={36} height={36} fill="none" stroke="currentColor" strokeWidth={1.6}>
        <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" />
      </svg>
    ),
    title: "24/7 Concierge",
    desc: "Personal human support — changes, requests, questions, anytime.",
  },
  {
    num: "07",
    icon: (
      <svg viewBox="0 0 24 24" width={36} height={36} fill="none" stroke="currentColor" strokeWidth={1.6}>
        <circle cx="12" cy="12" r="10" />
        <path d="M2 12h20M12 2a15.3 15.3 0 0 1 0 20M12 2a15.3 15.3 0 0 0 0 20" />
      </svg>
    ),
    title: "English-Speaking Drivers",
    desc: "Fluent English-speaking chauffeurs — communicate comfortably from the moment you land.",
  },
  {
    num: "08",
    icon: (
      <svg viewBox="0 0 24 24" width={36} height={36} fill="none" stroke="currentColor" strokeWidth={1.6}>
        <rect x="2" y="4" width="20" height="14" rx="2" />
        <path d="M8 20h8M12 18v2" />
        <path d="M10 9l5 3-5 3V9z" />
      </svg>
    ),
    title: "Disney Films On Board",
    desc: "In-vehicle screen with Disney films to keep the little ones entertained throughout the journey.",
  },
  {
    num: "09",
    icon: (
      <svg viewBox="0 0 24 24" width={36} height={36} fill="none" stroke="currentColor" strokeWidth={1.6}>
        <circle cx="12" cy="8" r="4" />
        <path d="M4 20c0-4 3.6-7 8-7s8 3 8 7" />
        <path d="M16 11l1.5 1.5L20 10" />
      </svg>
    ),
    title: "Friendly & Welcoming Service",
    desc: "Warm, attentive chauffeurs who go the extra mile — making every passenger feel at home.",
  },
];

const stats = [
  { value: "4.9", label: "Client Rating" },
  { value: "4,200+", label: "Journeys" },
  { value: "24/7", label: "Concierge" },
  { value: "€0", label: "Hidden Fees" },
];

const paymentMethods = [
  {
    label: "Credit Card",
    icon: (
      <svg viewBox="0 0 24 24" width={28} height={28} fill="none" stroke="currentColor" strokeWidth={1.5}>
        <rect x="2" y="5" width="20" height="14" rx="2" />
        <line x1="2" y1="10" x2="22" y2="10" />
      </svg>
    ),
  },
  {
    label: "Cash",
    icon: (
      <svg viewBox="0 0 24 24" width={28} height={28} fill="none" stroke="currentColor" strokeWidth={1.5}>
        <rect x="2" y="6" width="20" height="12" rx="2" />
        <circle cx="12" cy="12" r="3" />
        <line x1="6" y1="12" x2="6" y2="12" strokeLinecap="round" strokeWidth={2} />
        <line x1="18" y1="12" x2="18" y2="12" strokeLinecap="round" strokeWidth={2} />
      </svg>
    ),
  },
  {
    label: "PayPal",
    icon: (
      <svg viewBox="0 0 24 24" width={28} height={28} fill="currentColor">
        <path d="M7.076 21.337H4.23a.641.641 0 0 1-.633-.74L6.54 3.67a.77.77 0 0 1 .761-.65h5.358c2.42 0 4.1.835 4.76 2.43.295.71.37 1.43.24 2.23-.02.11-.04.22-.07.34l-.01.06c-.6 3.08-2.65 4.65-6.08 4.65H9.19a.64.64 0 0 0-.632.54l-.81 5.13a.64.64 0 0 1-.633.54H7.08l-.004.367zm9.196-12.18c-.7 3.6-3.18 5.43-7.39 5.43H6.73l-1.1 6.96h1.9l.81-5.13a1.28 1.28 0 0 1 1.264-1.08h2.31c3.88 0 6.21-1.88 6.9-5.6.34-1.78.02-3.15-.86-4.07.47.79.63 1.76.32 3.49z" />
      </svg>
    ),
  },
  {
    label: "Amex",
    icon: (
      <svg viewBox="0 0 24 24" width={28} height={28} fill="none" stroke="currentColor" strokeWidth={1.5}>
        <rect x="2" y="5" width="20" height="14" rx="2" />
        <path d="M6 12h3l1-2 1 4 1-2h3" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    ),
  },
];

export default function WhyChooseUs() {
  return (
    <section style={styles.section}>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,400;0,500;0,600;1,400&family=Inter:wght@400;500;600;700&display=swap');

        .benefit-card {
          background: white;
          border: 1px solid rgba(201,163,71,0.14);
          border-radius: 14px;
          padding: 36px 32px 28px;
          transition: all 0.35s ease;
          position: relative;
        }

        .benefit-card:hover {
          transform: translateY(-6px);
          box-shadow: 0 16px 48px rgba(10,31,68,0.1);
          border-color: #c9a34766;
        }

        .benefit-num {
          position: absolute;
          top: -18px;
          left: 32px;
          width: 52px;
          height: 52px;
          background: #0a1f44;
          color: #c9a347;
          font-weight: 700;
          font-size: 1.35rem;
          display: flex;
          align-items: center;
          justify-content: center;
          border-radius: 50%;
          border: 3px solid #c9a347;
          box-shadow: 0 4px 12px rgba(10,31,68,0.15);
        }

        .featured {
          background: linear-gradient(145deg, #ffffff, #fdfaf4);
          border-color: #c9a34740;
        }

        .stat-card {
          background: #0a1f44;
          color: white;
          border-radius: 12px;
          padding: 28px 20px;
          text-align: center;
        }

        .payment-section {
          padding: 50px 5vw;
          border-top: 1px solid rgba(201,163,71,0.1);
          border-bottom: 1px solid rgba(201,163,71,0.1);
          text-align: center;
        }

        .payment-label {
          font-size: 11px;
          font-weight: 600;
          letter-spacing: 0.24em;
          text-transform: uppercase;
          color: #c9a347;
          margin-bottom: 28px;
        }

        .payment-methods {
          display: flex;
          justify-content: center;
          flex-wrap: wrap;
          gap: 14px;
        }

        .payment-pill {
          display: flex;
          align-items: center;
          gap: 10px;
          padding: 12px 22px;
          border: 1px solid rgba(201,163,71,0.25);
          border-radius: 50px;
          background: #fafaf8;
          color: #0a1f44;
          font-size: 13px;
          font-weight: 500;
          transition: all 0.25s ease;
        }

        .payment-pill:hover {
          border-color: #c9a347;
          background: #fdfaf4;
          transform: translateY(-2px);
          box-shadow: 0 6px 18px rgba(201,163,71,0.15);
        }

        .payment-pill svg { color: #c9a347; flex-shrink: 0; }

        .cta-btn {
          padding: 14px 48px;
          background: #0a1f44;
          color: #c9a347;
          border: 2px solid #c9a347;
          border-radius: 50px;
          font-weight: 600;
          font-size: 0.95rem;
          letter-spacing: 1px;
          text-transform: uppercase;
          transition: all 0.3s ease;
          cursor: pointer;
        }

        .cta-btn:hover {
          background: #c9a347;
          color: #0a1f44;
          transform: translateY(-2px);
        }

        @media (max-width: 1024px) {
          .stats-grid { grid-template-columns: repeat(2, 1fr); gap: 20px; }
        }

        @media (max-width: 640px) {
          .benefit-card { padding: 32px 24px 24px; }
          .benefit-num { left: 24px; width: 46px; height: 46px; font-size: 1.2rem; }
          .stat-card { padding: 24px 16px; }
          .payment-methods { gap: 10px; }
          .payment-pill { padding: 10px 16px; font-size: 12px; }
        }
      `}</style>

      {/* Hero */}
      <div style={styles.hero}>
        <div style={styles.eyebrow}>Paris Private Transfers</div>
        <h1 style={styles.heroTitle}>Luxury Redefined</h1>
        <p style={styles.heroDesc}>
          Discreet, punctual, elegantly executed airport transfers — CDG & ORY
        </p>
      </div>

      {/* Stats */}
      <div style={styles.statsGrid}>
        {stats.map((s, i) => (
          <div key={i} className="stat-card">
            <div style={styles.statValue}>{s.value}</div>
            <div style={styles.statLabel}>{s.label}</div>
          </div>
        ))}
      </div>

      {/* Benefits */}
      <div style={styles.benefitsGrid}>
        {benefits.map((b, i) => (
          <div
            key={i}
            className={`benefit-card${b.featured ? " featured" : ""}`}
            style={styles.benefitCard}
          >
            <div className="benefit-num">{b.num}</div>
            <div style={{ ...styles.iconContainer, color: "#c9a347" }}>
              {b.icon}
            </div>
            <h3 style={styles.benefitTitle}>{b.title}</h3>
            <p style={styles.benefitDesc}>{b.desc}</p>
          </div>
        ))}
      </div>

      {/* Payment Methods */}
      <div className="payment-section">
        <div className="payment-label">Accepted Payment Methods</div>
        <div className="payment-methods">
          {paymentMethods.map((p, i) => (
            <div key={i} className="payment-pill">
              {p.icon}
              {p.label}
            </div>
          ))}
        </div>
      </div>

      {/* CTA */}
      <div style={styles.ctaSection}>
        <p style={styles.ctaText}>Begin your journey with effortless elegance</p>
        <button className="cta-btn">Reserve Your Transfer</button>
      </div>
    </section>
  );
}

const styles: Record<string, React.CSSProperties> = {
  section: {
    background: "#ffffff",
    color: "#0a1f44",
    fontFamily: "'Inter', system-ui, sans-serif",
  },
  hero: {
    padding: "70px 5vw 40px",
    textAlign: "center",
    maxWidth: 1000,
    margin: "0 auto",
    borderBottom: "1px solid rgba(201,163,71,0.1)",
  },
  eyebrow: {
    fontSize: "clamp(13px, 1vw, 14px)",
    fontWeight: 600,
    letterSpacing: "0.25em",
    color: "#c9a347",
    textTransform: "uppercase",
    marginBottom: 12,
  },
  heroTitle: {
    fontFamily: "'Cormorant Garamond', serif",
    fontSize: "clamp(3.2rem, 7vw, 5.4rem)",
    fontWeight: 500,
    lineHeight: 1.02,
    margin: "0 0 16px",
    color: "#0a1f44",
  },
  heroDesc: {
    fontSize: "clamp(1.05rem, 1.4vw, 1.18rem)",
    lineHeight: 1.6,
    color: "#334155",
    maxWidth: 640,
    margin: "0 auto",
  },
  statsGrid: {
    display: "grid",
    gridTemplateColumns: "repeat(4, 1fr)",
    gap: 20,
    padding: "50px 5vw",
    borderBottom: "1px solid rgba(201,163,71,0.1)",
  },
  statValue: {
    fontSize: "clamp(2.6rem, 5vw, 3.8rem)",
    fontWeight: 700,
    color: "#c9a347",
    lineHeight: 1,
    marginBottom: 6,
  },
  statLabel: {
    fontSize: "clamp(13px, 0.95vw, 14px)",
    color: "#94a3b8",
    fontWeight: 500,
  },
  benefitsGrid: {
    display: "grid",
    gridTemplateColumns: "repeat(auto-fit, minmax(340px, 1fr))",
    gap: 24,
    padding: "50px 5vw",
  },
  benefitCard: {
    position: "relative",
  },
  iconContainer: {
    marginBottom: 20,
  },
  benefitTitle: {
    fontFamily: "'Cormorant Garamond', serif",
    fontSize: "clamp(1.6rem, 2.2vw, 1.95rem)",
    fontWeight: 500,
    lineHeight: 1.2,
    marginBottom: 10,
    color: "#0a1f44",
  },
  benefitDesc: {
    fontSize: "clamp(0.97rem, 1.15vw, 1.03rem)",
    lineHeight: 1.65,
    color: "#475569",
  },
  ctaSection: {
    padding: "50px 5vw",
    textAlign: "center",
  },
  ctaText: {
    fontSize: "clamp(1.4rem, 2.6vw, 1.8rem)",
    fontWeight: 500,
    color: "#0a1f44",
    marginBottom: 20,
  },
};