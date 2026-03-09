const googleReviews = [
  {
    name: "Sarah Mitchell",
    avatar: "SM",
    color: "#4285F4",
    date: "2 weeks ago",
    rating: 5,
    text: "Absolutely seamless experience from CDG to our Disney hotel. Driver was waiting at arrivals with a sign, helped with all our luggage, and the car was spotless. Kids loved it. Will 100% book again.",
    trip: "CDG → Disneyland Paris",
  },
  {
    name: "James Thornton",
    avatar: "JT",
    color: "#EA4335",
    date: "1 month ago",
    rating: 5,
    text: "Used this service for our Versailles day trip. On time, professional, and the driver gave us tips on the best entrance to use. Fixed price meant no nasty surprises. Highly recommend.",
    trip: "Paris → Versailles",
  },
  {
    name: "Amélie Dubois",
    avatar: "AD",
    color: "#34A853",
    date: "3 weeks ago",
    rating: 5,
    text: "Parfait! Booked for a group of 6 from Orly. The van was clean, comfortable and the driver was incredibly friendly. Much better than the shuttle buses. Merci!",
    trip: "Orly → Disneyland Paris",
  },
  {
    name: "Marco Russo",
    avatar: "MR",
    color: "#FBBC04",
    date: "5 days ago",
    rating: 5,
    text: "Third time using this company. Always punctual, always professional. Late-night flight arrival and the driver was there without any issue. This is the only way to travel in Paris.",
    trip: "CDG → Paris Centre",
  },
];

const taReviews = [
  {
    name: "TravellerLondon22",
    avatar: "TL",
    color: "#00AA6C",
    date: "October 2024",
    rating: 5,
    text: "Booked the Beauvais to Disney transfer for our family of four. The driver was professional and the price was very fair. No hidden charges. Our holiday started perfectly!",
    trip: "Beauvais → Disneyland Paris",
    helpful: 14,
  },
  {
    name: "NYC_Explorer",
    avatar: "NE",
    color: "#589442",
    date: "September 2024",
    rating: 5,
    text: "Outstanding service. I travel to Paris frequently for work and always use this for airport transfers. Consistent quality every single time. Nothing but praise.",
    trip: "CDG → Paris Centre",
    helpful: 9,
  },
  {
    name: "FamilyFunParis",
    avatar: "FF",
    color: "#00AA6C",
    date: "August 2024",
    rating: 5,
    text: "Wonderful experience with two young children. Driver helped us install the car seat and was incredibly patient. Stress-free from start to finish. Couldn't ask for more.",
    trip: "Orly → Disneyland Paris",
    helpful: 21,
  },
  {
    name: "WanderlustCouple",
    avatar: "WC",
    color: "#589442",
    date: "July 2024",
    rating: 5,
    text: "We were nervous about navigating Paris with all our bags. This service made everything so easy. Friendly driver, clean car, great value. A must-book for any Paris visitor.",
    trip: "CDG → Versailles",
    helpful: 17,
  },
];

function Stars({ count, color }: { count: number; color: string }) {
  return (
    <div style={{ display: "flex", gap: "2px" }}>
      {Array.from({ length: 5 }).map((_, i) => (
        <svg
          key={i}
          width="14" height="14" viewBox="0 0 24 24"
          fill={i < count ? color : "none"}
          stroke={i < count ? color : "rgba(0,0,0,0.2)"}
          strokeWidth="1.5"
        >
          <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
        </svg>
      ))}
    </div>
  );
}

function GoogleLogo() {
  return (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
      <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4"/>
      <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853"/>
      <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l3.66-2.84z" fill="#FBBC05"/>
      <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335"/>
    </svg>
  );
}

function TripAdvisorLogo() {
  return (
    <svg width="22" height="22" viewBox="0 0 40 40" fill="none">
      <circle cx="20" cy="20" r="20" fill="#00AA6C"/>
      <circle cx="14" cy="20" r="5" fill="white"/>
      <circle cx="26" cy="20" r="5" fill="white"/>
      <circle cx="14" cy="20" r="2.5" fill="#00AA6C"/>
      <circle cx="26" cy="20" r="2.5" fill="#00AA6C"/>
      <path d="M9 16 Q14 10 20 13 Q26 10 31 16" stroke="white" strokeWidth="2" fill="none" strokeLinecap="round"/>
    </svg>
  );
}

export default function Reviews() {
  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Space+Grotesk:wght@400;500;600;700;800&family=Space+Mono:wght@400;700&display=swap');

        .rv-section {
          background: #ffffff;
          padding: 100px 0 112px;
          font-family: 'Space Grotesk', sans-serif;
          position: relative; overflow: hidden;
        }
        .rv-section::before {
          content: ''; position: absolute; inset: 0;
          background-image: radial-gradient(circle, rgba(0,0,0,0.05) 1px, transparent 1px);
          background-size: 28px 28px; pointer-events: none;
        }
        .rv-inner { max-width: 1200px; margin: 0 auto; padding: 0 48px; position: relative; }

        /* Header */
        .rv-header {
          display: flex; align-items: flex-end; justify-content: space-between;
          margin-bottom: 56px; gap: 32px; flex-wrap: wrap;
        }
        .rv-eyebrow {
          display: inline-flex; align-items: center; gap: 8px;
          font-family: 'Space Mono', monospace; font-size: 9.5px; font-weight: 700;
          letter-spacing: 0.18em; text-transform: uppercase; color: #00A854;
          background: rgba(0,168,84,0.08); border: 1px solid rgba(0,168,84,0.2);
          border-radius: 6px; padding: 5px 12px; margin-bottom: 16px;
        }
        .rv-eyebrow-dot {
          width: 6px; height: 6px; border-radius: 50%; background: #00A854;
          animation: rv-pulse 2s ease-in-out infinite;
        }
        @keyframes rv-pulse {
          0%,100% { box-shadow: 0 0 4px rgba(0,168,84,0.4); }
          50%      { box-shadow: 0 0 10px rgba(0,168,84,0.7); }
        }
        .rv-heading {
          font-size: clamp(32px, 4vw, 54px); font-weight: 800;
          color: #080808; line-height: 1.05; letter-spacing: -0.035em;
        }
        .rv-heading em { font-style: normal; color: #00A854; }
        .rv-sub {
          font-size: 15px; font-weight: 500; color: rgba(0,0,0,0.5);
          line-height: 1.7; max-width: 300px; text-align: right;
        }

        /* Score badges */
        .rv-scores {
          display: flex; gap: 14px; margin-bottom: 52px; flex-wrap: wrap;
        }
        .rv-score-badge {
          display: flex; align-items: center; gap: 14px;
          background: #fff; border: 1.5px solid rgba(0,0,0,0.09);
          border-radius: 16px; padding: 18px 24px; flex: 1; min-width: 220px;
          transition: box-shadow 0.2s, border-color 0.2s;
        }
        .rv-score-badge:hover { box-shadow: 0 8px 32px rgba(0,0,0,0.08); border-color: rgba(0,0,0,0.15); }
        .rv-score-logo { flex-shrink: 0; }
        .rv-score-info { display: flex; flex-direction: column; gap: 3px; }
        .rv-score-platform {
          font-family: 'Space Mono', monospace; font-size: 8.5px; font-weight: 700;
          letter-spacing: 0.14em; text-transform: uppercase; color: rgba(0,0,0,0.4);
        }
        .rv-score-num {
          font-size: 28px; font-weight: 800; color: #080808; letter-spacing: -0.04em; line-height: 1;
        }
        .rv-score-num span { font-size: 13px; font-weight: 600; color: rgba(0,0,0,0.4); margin-left: 2px; }
        .rv-score-count {
          font-family: 'Space Mono', monospace; font-size: 8px; color: rgba(0,0,0,0.35);
          letter-spacing: 0.06em;
        }

        /* Platform block */
        .rv-platform { margin-bottom: 52px; }
        .rv-platform:last-child { margin-bottom: 0; }

        .rv-platform-header {
          display: flex; align-items: center; gap: 12px; margin-bottom: 22px;
        }
        .rv-platform-name {
          font-size: 16px; font-weight: 800; color: #080808; letter-spacing: -0.02em;
        }
        .rv-platform-line {
          flex: 1; height: 1.5px; background: rgba(0,0,0,0.08); border-radius: 2px;
        }
        .rv-platform-count {
          font-family: 'Space Mono', monospace; font-size: 9px; font-weight: 700;
          letter-spacing: 0.12em; text-transform: uppercase; color: rgba(0,0,0,0.3);
        }

        /* Cards grid */
        .rv-grid {
          display: grid;
          grid-template-columns: repeat(4, 1fr);
          gap: 16px;
        }
        @media (max-width: 1100px) { .rv-grid { grid-template-columns: repeat(2, 1fr); } }
        @media (max-width: 600px)  { .rv-grid { grid-template-columns: 1fr; } }

        /* Review card */
        .rv-card {
          background: #fff; border: 1.5px solid rgba(0,0,0,0.09);
          border-radius: 18px; padding: 22px; display: flex; flex-direction: column;
          gap: 14px; transition: transform 0.25s, box-shadow 0.25s, border-color 0.25s;
          animation: rv-fadeup 0.5s ease both;
        }
        .rv-card:nth-child(1) { animation-delay: 0.05s; }
        .rv-card:nth-child(2) { animation-delay: 0.10s; }
        .rv-card:nth-child(3) { animation-delay: 0.15s; }
        .rv-card:nth-child(4) { animation-delay: 0.20s; }
        @keyframes rv-fadeup {
          from { opacity: 0; transform: translateY(20px); }
          to   { opacity: 1; transform: translateY(0); }
        }
        .rv-card:hover {
          transform: translateY(-4px);
          box-shadow: 0 16px 48px rgba(0,0,0,0.09);
          border-color: rgba(0,168,84,0.25);
        }

        /* Card top row */
        .rv-card-top { display: flex; align-items: center; gap: 12px; }
        .rv-avatar {
          width: 40px; height: 40px; border-radius: 50%; flex-shrink: 0;
          display: flex; align-items: center; justify-content: center;
          font-family: 'Space Mono', monospace; font-size: 12px; font-weight: 700;
          color: white; letter-spacing: 0.02em;
        }
        .rv-card-meta { flex: 1; min-width: 0; }
        .rv-card-name {
          font-size: 14px; font-weight: 700; color: #080808;
          letter-spacing: -0.01em; white-space: nowrap; overflow: hidden; text-overflow: ellipsis;
        }
        .rv-card-date {
          font-family: 'Space Mono', monospace; font-size: 8.5px;
          color: rgba(0,0,0,0.35); letter-spacing: 0.06em; margin-top: 2px;
        }

        /* Quote icon */
        .rv-quote {
          flex-shrink: 0; color: rgba(0,0,0,0.1);
          font-size: 36px; line-height: 1; font-family: Georgia, serif;
          font-weight: 700; margin-top: -4px;
        }

        .rv-card-text {
          font-size: 13.5px; font-weight: 500; color: rgba(0,0,0,0.65);
          line-height: 1.72; flex: 1;
        }

        /* Trip chip */
        .rv-trip-chip {
          display: inline-flex; align-items: center; gap: 5px;
          font-family: 'Space Mono', monospace; font-size: 8px; font-weight: 700;
          letter-spacing: 0.1em; text-transform: uppercase;
          color: #00A854; background: rgba(0,168,84,0.07);
          border: 1px solid rgba(0,168,84,0.18); border-radius: 8px; padding: 5px 10px;
          align-self: flex-start;
        }
        .rv-trip-chip svg { width: 10px; height: 10px; }

        /* TA helpful */
        .rv-helpful {
          display: flex; align-items: center; gap: 6px;
          font-family: 'Space Mono', monospace; font-size: 8.5px;
          color: rgba(0,0,0,0.3); letter-spacing: 0.06em; margin-top: -4px;
        }
        .rv-helpful svg { width: 12px; height: 12px; }
      `}</style>

      <section className="rv-section">
        <div className="rv-inner">

          {/* Header */}
          <div className="rv-header">
            <div>
              <div className="rv-eyebrow">
                <span className="rv-eyebrow-dot" />
                Verified Reviews
              </div>
              <h2 className="rv-heading">
                Trusted by<br /><em>thousands of travellers.</em>
              </h2>
            </div>
            <p className="rv-sub">
              Real reviews from Google and TripAdvisor. No filters, no cherry-picking — just honest experiences.
            </p>
          </div>

          {/* Score badges */}
          <div className="rv-scores">
            <div className="rv-score-badge">
              <div className="rv-score-logo"><GoogleLogo /></div>
              <div className="rv-score-info">
                <span className="rv-score-platform">Google Reviews</span>
                <span className="rv-score-num">4.9<span>/ 5</span></span>
                <Stars count={5} color="#FBBC04" />
                <span className="rv-score-count">Based on 340+ reviews</span>
              </div>
            </div>
            <div className="rv-score-badge">
              <div className="rv-score-logo"><TripAdvisorLogo /></div>
              <div className="rv-score-info">
                <span className="rv-score-platform">TripAdvisor</span>
                <span className="rv-score-num">5.0<span>/ 5</span></span>
                <Stars count={5} color="#00AA6C" />
                <span className="rv-score-count">Based on 180+ reviews</span>
              </div>
            </div>
            <div className="rv-score-badge" style={{ background: "rgba(0,168,84,0.04)", borderColor: "rgba(0,168,84,0.2)" }}>
              <div className="rv-score-info">
                <span className="rv-score-platform">Overall Score</span>
                <span className="rv-score-num" style={{ color: "#00A854" }}>4.9<span>/ 5</span></span>
                <Stars count={5} color="#00A854" />
                <span className="rv-score-count">520+ verified rides reviewed</span>
              </div>
            </div>
          </div>

          {/* Google Reviews */}
          <div className="rv-platform">
            <div className="rv-platform-header">
              <GoogleLogo />
              <span className="rv-platform-name">Google Reviews</span>
              <div className="rv-platform-line" />
              <span className="rv-platform-count">340+ reviews</span>
            </div>
            <div className="rv-grid">
              {googleReviews.map((r, i) => (
                <div key={i} className="rv-card">
                  <div className="rv-card-top">
                    <div className="rv-avatar" style={{ background: r.color }}>{r.avatar}</div>
                    <div className="rv-card-meta">
                      <div className="rv-card-name">{r.name}</div>
                      <div className="rv-card-date">{r.date}</div>
                    </div>
                    <span className="rv-quote">"</span>
                  </div>
                  <Stars count={r.rating} color="#FBBC04" />
                  <p className="rv-card-text">{r.text}</p>
                  <div className="rv-trip-chip">
                    <svg fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2.5">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"/>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"/>
                    </svg>
                    {r.trip}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* TripAdvisor Reviews */}
          <div className="rv-platform">
            <div className="rv-platform-header">
              <TripAdvisorLogo />
              <span className="rv-platform-name">TripAdvisor</span>
              <div className="rv-platform-line" />
              <span className="rv-platform-count">180+ reviews</span>
            </div>
            <div className="rv-grid">
              {taReviews.map((r, i) => (
                <div key={i} className="rv-card">
                  <div className="rv-card-top">
                    <div className="rv-avatar" style={{ background: r.color }}>{r.avatar}</div>
                    <div className="rv-card-meta">
                      <div className="rv-card-name">{r.name}</div>
                      <div className="rv-card-date">{r.date}</div>
                    </div>
                    <span className="rv-quote">"</span>
                  </div>
                  <Stars count={r.rating} color="#00AA6C" />
                  <p className="rv-card-text">{r.text}</p>
                  <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", flexWrap: "wrap", gap: 8 }}>
                    <div className="rv-trip-chip">
                      <svg fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2.5">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"/>
                        <path strokeLinecap="round" strokeLinejoin="round" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"/>
                      </svg>
                      {r.trip}
                    </div>
                    <div className="rv-helpful">
                      <svg fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M14 10h4.764a2 2 0 011.789 2.894l-3.5 7A2 2 0 0115.263 21h-4.017c-.163 0-.326-.02-.485-.06L7 20m7-10V5a2 2 0 00-2-2h-.095c-.5 0-.905.405-.905.905 0 .714-.211 1.412-.608 2.006L7 11v9m7-10h-2M7 20H5a2 2 0 01-2-2v-6a2 2 0 012-2h2.5"/>
                      </svg>
                      {r.helpful} found this helpful
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

        </div>
      </section>
    </>
  );
}