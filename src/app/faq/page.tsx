"use client";

import { useState } from "react";

const faqs = [
  {
    category: "Booking & Reservations",
    icon: "📋",
    items: [
      {
        q: "How do I book a transfer with Paris Easy Move?",
        a: "You can book your private transfer quickly through our website, via our user-friendly app, or simply by calling us directly. The process takes just a few minutes — choose your route, select your vehicle, confirm your details, and you're all set.",
      },
      {
        q: "How far in advance should I book?",
        a: "We recommend booking as early as possible, especially during peak travel seasons, school holidays, and major Paris events. However, we also accommodate last-minute bookings subject to vehicle availability. For airport transfers, at least 24 hours in advance is ideal.",
      },
      {
        q: "Can I modify or cancel my booking?",
        a: "Yes. We offer flexible booking management. You can modify your booking details (date, time, pickup address) or cancel by contacting us. Please review our cancellation policy at the time of booking for specific conditions.",
      },
      {
        q: "Do you provide a booking confirmation?",
        a: "Absolutely. Once your booking is confirmed, you will receive a full confirmation with your driver's details, vehicle information, pickup instructions, and a contact number — so you always know what to expect.",
      },
    ],
  },
  {
    category: "Airport Transfers",
    icon: "✈️",
    items: [
      {
        q: "Which airports do you serve?",
        a: "We operate transfers to and from all three major Paris-area airports: Charles de Gaulle (CDG), Orly Airport (ORY), and Beauvais–Tillé Airport (BVA). We cover all terminals at each airport.",
      },
      {
        q: "How do I find my driver at the airport?",
        a: "Your driver will be waiting for you in the arrivals hall with a sign displaying your name. For CDG and Orly, we use the standard meet-and-greet meeting points. You'll also receive your driver's contact details in advance so you can reach them directly.",
      },
      {
        q: "What happens if my flight is delayed?",
        a: "We track your flight in real time. If your flight is delayed, your driver will automatically adjust their arrival time at no extra cost. You don't need to worry about calling us — we monitor your flight status from the moment you book.",
      },
      {
        q: "Do you offer early morning or late-night airport transfers?",
        a: "Yes — we operate 24 hours a day, 7 days a week, 365 days a year. Whether your flight lands at 3 AM or departs at 5 AM, we will be there on time.",
      },
    ],
  },
  {
    category: "Disneyland Paris Transfers",
    icon: "🏰",
    items: [
      {
        q: "Do you offer transfers to Disneyland Paris?",
        a: "Yes! We specialize in door-to-door private transfers between all Paris airports (CDG, Orly, Beauvais) and Disneyland Paris. This is one of our most popular routes, especially for families.",
      },
      {
        q: "Can you accommodate families with young children?",
        a: "Absolutely. We have spacious vans perfect for families with children and large amounts of luggage. We can also provide child seats and booster seats upon request — just mention this when booking.",
      },
      {
        q: "Can you pick us up from the Disneyland Hotel?",
        a: "Yes. We offer pickups from any hotel within the Disneyland Paris resort area. Simply provide your hotel name and we'll coordinate a seamless pickup directly at your door.",
      },
    ],
  },
  {
    category: "Vehicles & Comfort",
    icon: "🚐",
    items: [
      {
        q: "What types of vehicles do you offer?",
        a: "Our fleet includes comfortable saloon cars for individuals and couples, and luxury vans for families or groups of up to 8 people. All vehicles are modern, air-conditioned, and immaculately maintained.",
      },
      {
        q: "Are your vehicles equipped with amenities?",
        a: "Yes. Our vehicles come equipped with air conditioning, free Wi-Fi, bottled water, phone chargers, and entertainment screens on some models. We aim to make every journey feel like a first-class experience.",
      },
      {
        q: "How much luggage can I bring?",
        a: "Standard transfers allow for one large suitcase and one carry-on per passenger. If you have extra or oversized luggage, please let us know at booking and we'll allocate the right vehicle for your needs.",
      },
      {
        q: "Are your vehicles wheelchair accessible?",
        a: "We offer wheelchair-accessible vehicles. Please contact us at the time of booking to confirm availability and provide any special requirements so we can prepare accordingly.",
      },
    ],
  },
  {
    category: "Pricing & Payment",
    icon: "💳",
    items: [
      {
        q: "How is pricing calculated?",
        a: "Our pricing is fixed and transparent — calculated based on your route and vehicle type. There are no hidden fees, no surge pricing, and no surprises. The price you see at booking is the price you pay.",
      },
      {
        q: "What payment methods do you accept?",
        a: "We accept major credit and debit cards, bank transfers, and cash payments. Online payment at the time of booking is also available for your convenience.",
      },
      {
        q: "Are tolls and parking fees included in the price?",
        a: "Yes. All motorway tolls and airport parking fees are included in your quoted price. You will never be asked to pay additional charges upon arrival at your destination.",
      },
      {
        q: "Do you offer corporate or group discounts?",
        a: "Yes. We provide tailored pricing for corporate clients, frequent travelers, and large group bookings. Contact our team directly to discuss a bespoke arrangement.",
      },
    ],
  },
  {
    category: "Safety & Drivers",
    icon: "🛡️",
    items: [
      {
        q: "Are your drivers licensed and professional?",
        a: "All our drivers are fully licensed, professionally trained, and undergo thorough background checks. They are fluent in English and French, courteous, punctual, and deeply familiar with Paris and the surrounding region.",
      },
      {
        q: "How do you ensure passenger safety?",
        a: "Safety is our top priority. Our vehicles are regularly serviced and inspected. All drivers follow strict safety protocols, and our vehicles are fully insured. We comply with all French transportation regulations.",
      },
      {
        q: "What COVID-19 or hygiene measures are in place?",
        a: "Our vehicles are thoroughly cleaned and sanitized between every journey. Hand sanitizer is available in all vehicles, and drivers maintain high standards of personal hygiene. We continue to adapt our protocols in line with current health guidelines.",
      },
    ],
  },
];

export default function FAQPage() {
  const [openItem, setOpenItem] = useState<string | null>(null);
  const [activeCategory, setActiveCategory] = useState<string>("All");

  const toggle = (key: string) => {
    setOpenItem(openItem === key ? null : key);
  };

  const categories = ["All", ...faqs.map((f) => f.category)];

  const visibleFaqs =
    activeCategory === "All"
      ? faqs
      : faqs.filter((f) => f.category === activeCategory);

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,300;0,400;0,600;1,300;1,400&family=DM+Sans:wght@300;400;500&display=swap');

        *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }

        :root {
          --gold: #c9a84c;
          --gold-light: #e8c97a;
          --navy: #0d1b2e;
          --navy-mid: #152540;
          --cream: #f9f5ef;
          --cream-dark: #ede8df;
          --text: #1a1a2e;
          --muted: #6b7280;
        }

        body {
          font-family: 'DM Sans', sans-serif;
          background: var(--cream);
          color: var(--text);
          min-height: 100vh;
        }

        /* NAV */
        .nav {
          position: sticky;
          top: 0;
          z-index: 50;
          background: var(--navy);
          padding: 0 2rem;
          display: flex;
          align-items: center;
          justify-content: space-between;
          height: 68px;
          border-bottom: 1px solid rgba(201,168,76,0.25);
        }
        .nav-logo {
          font-family: 'Cormorant Garamond', serif;
          font-size: 1.4rem;
          font-weight: 600;
          color: var(--gold);
          letter-spacing: 0.04em;
          text-decoration: none;
        }
        .nav-logo span { color: #fff; }
        .nav-link {
          color: rgba(255,255,255,0.65);
          font-size: 0.85rem;
          text-decoration: none;
          letter-spacing: 0.05em;
          transition: color 0.2s;
        }
        .nav-link:hover { color: var(--gold-light); }

        /* HERO */
        .hero {
          background: var(--navy);
          padding: 5rem 2rem 4rem;
          text-align: center;
          position: relative;
          overflow: hidden;
        }
        .hero::before {
          content: '';
          position: absolute;
          inset: 0;
          background: radial-gradient(ellipse 80% 60% at 50% 100%, rgba(201,168,76,0.12) 0%, transparent 70%);
        }
        .hero-eyebrow {
          display: inline-flex;
          align-items: center;
          gap: 0.6rem;
          font-size: 0.75rem;
          font-weight: 500;
          letter-spacing: 0.18em;
          text-transform: uppercase;
          color: var(--gold);
          margin-bottom: 1.4rem;
          position: relative;
        }
        .hero-eyebrow::before, .hero-eyebrow::after {
          content: '';
          width: 28px;
          height: 1px;
          background: var(--gold);
          opacity: 0.6;
        }
        .hero h1 {
          font-family: 'Cormorant Garamond', serif;
          font-size: clamp(2.8rem, 6vw, 4.5rem);
          font-weight: 300;
          color: #fff;
          line-height: 1.1;
          letter-spacing: -0.01em;
          position: relative;
          margin-bottom: 1.2rem;
        }
        .hero h1 em {
          font-style: italic;
          color: var(--gold-light);
        }
        .hero-sub {
          font-size: 1rem;
          color: rgba(255,255,255,0.55);
          font-weight: 300;
          max-width: 520px;
          margin: 0 auto;
          line-height: 1.7;
          position: relative;
        }
        .hero-divider {
          width: 48px;
          height: 2px;
          background: linear-gradient(90deg, var(--gold), transparent);
          margin: 2rem auto 0;
          position: relative;
        }

        /* FILTER TABS */
        .filter-wrap {
          padding: 2.5rem 2rem 0;
          max-width: 980px;
          margin: 0 auto;
        }
        .filter-scroll {
          display: flex;
          gap: 0.6rem;
          overflow-x: auto;
          padding-bottom: 0.5rem;
          scrollbar-width: none;
        }
        .filter-scroll::-webkit-scrollbar { display: none; }
        .filter-btn {
          flex-shrink: 0;
          padding: 0.45rem 1.1rem;
          border-radius: 100px;
          border: 1px solid var(--cream-dark);
          background: #fff;
          font-family: 'DM Sans', sans-serif;
          font-size: 0.8rem;
          font-weight: 400;
          color: var(--muted);
          cursor: pointer;
          transition: all 0.2s;
          letter-spacing: 0.01em;
          white-space: nowrap;
        }
        .filter-btn:hover {
          border-color: var(--gold);
          color: var(--navy);
        }
        .filter-btn.active {
          background: var(--navy);
          border-color: var(--navy);
          color: var(--gold-light);
          font-weight: 500;
        }

        /* MAIN CONTENT */
        .content {
          max-width: 980px;
          margin: 0 auto;
          padding: 3rem 2rem 5rem;
        }

        /* CATEGORY SECTION */
        .category-block {
          margin-bottom: 3rem;
          animation: fadeUp 0.4s ease both;
        }
        @keyframes fadeUp {
          from { opacity: 0; transform: translateY(14px); }
          to   { opacity: 1; transform: translateY(0); }
        }
        .cat-header {
          display: flex;
          align-items: center;
          gap: 0.75rem;
          margin-bottom: 1.2rem;
          padding-bottom: 0.8rem;
          border-bottom: 1px solid var(--cream-dark);
        }
        .cat-icon {
          width: 38px;
          height: 38px;
          background: var(--navy);
          border-radius: 10px;
          display: flex;
          align-items: center;
          justify-content: center;
          font-size: 1.05rem;
          flex-shrink: 0;
        }
        .cat-title {
          font-family: 'Cormorant Garamond', serif;
          font-size: 1.35rem;
          font-weight: 600;
          color: var(--navy);
          letter-spacing: 0.01em;
        }
        .cat-count {
          margin-left: auto;
          font-size: 0.75rem;
          color: var(--muted);
          font-weight: 400;
        }

        /* ACCORDION */
        .accordion-item {
          border: 1px solid var(--cream-dark);
          border-radius: 12px;
          background: #fff;
          margin-bottom: 0.6rem;
          overflow: hidden;
          transition: box-shadow 0.2s, border-color 0.2s;
        }
        .accordion-item:hover {
          border-color: rgba(201,168,76,0.4);
          box-shadow: 0 2px 16px rgba(201,168,76,0.08);
        }
        .accordion-item.open {
          border-color: rgba(201,168,76,0.5);
          box-shadow: 0 4px 24px rgba(13,27,46,0.07);
        }
        .accordion-btn {
          width: 100%;
          background: none;
          border: none;
          padding: 1.1rem 1.4rem;
          display: flex;
          align-items: flex-start;
          gap: 1rem;
          cursor: pointer;
          text-align: left;
        }
        .accordion-q {
          font-size: 0.93rem;
          font-weight: 500;
          color: var(--navy);
          line-height: 1.5;
          flex: 1;
          transition: color 0.2s;
        }
        .accordion-item.open .accordion-q { color: var(--gold); }
        .accordion-icon {
          width: 22px;
          height: 22px;
          border-radius: 50%;
          border: 1px solid var(--cream-dark);
          display: flex;
          align-items: center;
          justify-content: center;
          flex-shrink: 0;
          transition: all 0.25s;
          margin-top: 1px;
        }
        .accordion-item.open .accordion-icon {
          background: var(--navy);
          border-color: var(--navy);
          transform: rotate(45deg);
        }
        .chevron {
          width: 10px;
          height: 10px;
          border-right: 1.5px solid var(--muted);
          border-bottom: 1.5px solid var(--muted);
          transform: rotate(45deg) translateY(-2px);
          transition: transform 0.25s, border-color 0.25s;
        }
        .accordion-item.open .chevron {
          border-color: #fff;
          transform: rotate(225deg) translateY(-2px);
        }
        .accordion-body {
          max-height: 0;
          overflow: hidden;
          transition: max-height 0.35s cubic-bezier(0.4,0,0.2,1);
        }
        .accordion-item.open .accordion-body {
          max-height: 400px;
        }
        .accordion-answer {
          padding: 0 1.4rem 1.3rem 1.4rem;
          font-size: 0.88rem;
          color: var(--muted);
          line-height: 1.75;
          border-top: 1px solid var(--cream-dark);
          padding-top: 1rem;
        }

        /* CTA BANNER */
        .cta-banner {
          background: var(--navy);
          border-radius: 20px;
          padding: 3rem 2.5rem;
          text-align: center;
          margin-top: 2rem;
          position: relative;
          overflow: hidden;
        }
        .cta-banner::before {
          content: '';
          position: absolute;
          inset: 0;
          background: radial-gradient(circle at 70% 30%, rgba(201,168,76,0.15), transparent 60%);
        }
        .cta-banner h2 {
          font-family: 'Cormorant Garamond', serif;
          font-size: 2rem;
          font-weight: 300;
          color: #fff;
          margin-bottom: 0.6rem;
          position: relative;
        }
        .cta-banner h2 em { font-style: italic; color: var(--gold-light); }
        .cta-banner p {
          color: rgba(255,255,255,0.5);
          font-size: 0.9rem;
          margin-bottom: 1.8rem;
          position: relative;
        }
        .cta-btns {
          display: flex;
          gap: 0.75rem;
          justify-content: center;
          flex-wrap: wrap;
          position: relative;
        }
        .btn-primary {
          padding: 0.7rem 1.8rem;
          background: linear-gradient(135deg, var(--gold), #a87c2a);
          color: var(--navy);
          border: none;
          border-radius: 8px;
          font-family: 'DM Sans', sans-serif;
          font-size: 0.85rem;
          font-weight: 500;
          cursor: pointer;
          letter-spacing: 0.03em;
          transition: opacity 0.2s, transform 0.15s;
          text-decoration: none;
          display: inline-block;
        }
        .btn-primary:hover { opacity: 0.9; transform: translateY(-1px); }
        .btn-ghost {
          padding: 0.7rem 1.8rem;
          background: transparent;
          color: rgba(255,255,255,0.75);
          border: 1px solid rgba(255,255,255,0.2);
          border-radius: 8px;
          font-family: 'DM Sans', sans-serif;
          font-size: 0.85rem;
          font-weight: 400;
          cursor: pointer;
          transition: border-color 0.2s, color 0.2s;
          text-decoration: none;
          display: inline-block;
        }
        .btn-ghost:hover { border-color: var(--gold); color: var(--gold-light); }

        /* FOOTER NOTE */
        .footer-note {
          text-align: center;
          padding: 2rem;
          font-size: 0.78rem;
          color: var(--muted);
          border-top: 1px solid var(--cream-dark);
          margin-top: 3rem;
        }

        @media (max-width: 600px) {
          .hero { padding: 3.5rem 1.2rem 3rem; }
          .content { padding: 2rem 1.2rem 4rem; }
          .filter-wrap { padding: 2rem 1.2rem 0; }
          .cta-banner { padding: 2.2rem 1.4rem; }
        }
      `}</style>



      {/* HERO */}
      <header className="hero">
        <div className="hero-eyebrow">Help Centre</div>
        <h1>Frequently Asked <em>Questions</em></h1>
        <p className="hero-sub">Everything you need to know about your private transfer in Paris — airports, Disneyland, pricing, and more.</p>
        <div className="hero-divider" />
      </header>

      {/* CATEGORY FILTER */}
      <div className="filter-wrap">
        <div className="filter-scroll">
          {categories.map((cat) => (
            <button
              key={cat}
              className={`filter-btn${activeCategory === cat ? " active" : ""}`}
              onClick={() => setActiveCategory(cat)}
            >
              {cat}
            </button>
          ))}
        </div>
      </div>

      {/* FAQ CONTENT */}
      <main className="content">
        {visibleFaqs.map((section) => (
          <div className="category-block" key={section.category}>
            <div className="cat-header">
              <div className="cat-icon">{section.icon}</div>
              <span className="cat-title">{section.category}</span>
              <span className="cat-count">{section.items.length} questions</span>
            </div>

            {section.items.map((item, i) => {
              const key = `${section.category}-${i}`;
              const isOpen = openItem === key;
              return (
                <div className={`accordion-item${isOpen ? " open" : ""}`} key={key}>
                  <button className="accordion-btn" onClick={() => toggle(key)}>
                    <span className="accordion-q">{item.q}</span>
                    <span className="accordion-icon">
                      <span className="chevron" />
                    </span>
                  </button>
                  <div className="accordion-body">
                    <div className="accordion-answer">{item.a}</div>
                  </div>
                </div>
              );
            })}
          </div>
        ))}

        {/* CTA */}
        <div className="cta-banner">
          <h2>Still have a <em>question?</em></h2>
          <p>Our team is available 24/7 — reach out and we'll be happy to help.</p>
          <div className="cta-btns">
            <a href="tel:+33" className="btn-primary">Call Us Now</a>
            <a href="https://pariseasymove.com/reservation" className="btn-ghost">Book a Transfer</a>
          </div>
        </div>
      </main>

      <footer className="footer-note">
        © {new Date().getFullYear()} Paris Easy Move · Private Transfer Service · Paris, France
      </footer>
    </>
  );
}