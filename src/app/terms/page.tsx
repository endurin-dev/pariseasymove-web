"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import Header from "@/components/Header";

const sections = [
  {
    num: "01",
    title: "Definitions",
    content: (
      <>
        <p>In these Terms and Conditions, the following definitions apply:</p>
        <ul>
          <li><strong>"Company"</strong> refers to Paris Easy Move, a licensed VTC (Voiture de Tourisme avec Chauffeur) operator registered in France.</li>
          <li><strong>"Client"</strong> refers to any individual or entity who makes a booking with Paris Easy Move.</li>
          <li><strong>"Service"</strong> refers to any private chauffeur transfer, airport pickup or drop-off, Disneyland Paris transfer, Versailles excursion, city tour, or any other transportation service provided by the Company.</li>
          <li><strong>"Booking"</strong> refers to a confirmed reservation made via the website, phone, email, or WhatsApp.</li>
          <li><strong>"Driver"</strong> refers to any licensed, insured chauffeur operating on behalf of the Company.</li>
          <li><strong>"Vehicle"</strong> refers to any private car, van, SUV, or minibus operated under a Paris Easy Move booking.</li>
        </ul>
      </>
    ),
  },
  {
    num: "02",
    title: "Scope of Services",
    content: (
      <>
        <p>Paris Easy Move provides private chauffeur transfer services including but not limited to:</p>
        <ul>
          <li>Airport transfers to and from Charles de Gaulle (CDG), Orly (ORY), and Beauvais (BVA)</li>
          <li>Disneyland Paris transfers from any Paris address or airport</li>
          <li>Palace of Versailles transfers and day trips</li>
          <li>Paris city-to-city and inter-hotel transfers</li>
          <li>Train station pickups and drop-offs (Gare du Nord, Gare de Lyon, etc.)</li>
          <li>Custom point-to-point private transfers in and around the Île-de-France region</li>
        </ul>
        <p>All services are strictly private — vehicles are never shared with other passengers without prior agreement.</p>
      </>
    ),
  },
  {
    num: "03",
    title: "Booking & Confirmation",
    content: (
      <>
        <p>A booking is considered confirmed only when the Client receives a written confirmation (email or WhatsApp message) containing a booking reference number from Paris Easy Move.</p>
        <ul>
          <li>Bookings made via the website are confirmed automatically upon successful submission and receipt of confirmation email.</li>
          <li>The Client is responsible for providing accurate pickup and drop-off details, flight or train numbers, passenger count, and luggage information at the time of booking.</li>
          <li>Paris Easy Move reserves the right to decline a booking at its discretion, in which case any payment received will be fully refunded.</li>
          <li>The Company may contact the Client to verify booking details before confirming the reservation.</li>
        </ul>
      </>
    ),
  },
  {
    num: "04",
    title: "Pricing & Payment",
    content: (
      <>
        <p>All prices quoted are fixed and inclusive of VAT, tolls, fuel, and standard waiting time. Prices are displayed in Euros (€).</p>
        <ul>
          <li><strong>Fixed Pricing</strong>: The quoted price is guaranteed at the time of booking. No surge pricing, no hidden fees.</li>
          <li><strong>Night Surcharge</strong>: A surcharge of €15 applies to pickups between 22:00 and 06:00.</li>
          <li><strong>Round Trips</strong>: Round-trip bookings are charged at twice the one-way fare.</li>
          <li><strong>Large Groups</strong>: For groups of 9 or more passengers, the applicable rate is double the 8-passenger fare.</li>
          <li><strong>Payment Methods</strong>: Payment is made directly to the driver upon completion of the journey, by cash or card (Visa, Mastercard, Amex).</li>
          <li><strong>On-Demand Pricing</strong>: Certain routes or bespoke services may be quoted on request. These prices are confirmed in writing before the booking is finalised.</li>
          <li>The Company reserves the right to adjust pricing at any time. Changes do not affect confirmed bookings.</li>
        </ul>
      </>
    ),
  },
  {
    num: "05",
    title: "Cancellation & Modification Policy",
    content: (
      <>
        <p>We understand that travel plans can change. Our cancellation and modification policy is as follows:</p>
        <ul>
          <li><strong>Free Cancellation</strong>: Cancellations made more than 24 hours before the scheduled pickup time incur no charge.</li>
          <li><strong>Late Cancellation</strong>: Cancellations made within 24 hours of the scheduled pickup may be subject to a cancellation fee of up to 50% of the booking value.</li>
          <li><strong>No-Show</strong>: If the Client fails to appear at the agreed pickup location without prior notice, the full fare may be charged.</li>
          <li><strong>Modifications</strong>: Changes to pickup time, location, or passenger count can be requested by contacting us at least 12 hours in advance. We will confirm whether the modification is possible.</li>
          <li>Cancellations and modifications must be communicated in writing via email or WhatsApp to be considered valid.</li>
        </ul>
      </>
    ),
  },
  {
    num: "06",
    title: "Flight Monitoring & Waiting Time",
    content: (
      <>
        <p>Paris Easy Move monitors all incoming flights in real time using live flight tracking systems.</p>
        <ul>
          <li><strong>Airport Pickups</strong>: The driver will track your flight and adjust pickup time accordingly at no extra charge. Standard complimentary waiting time is 60 minutes after the scheduled landing time.</li>
          <li><strong>Train Station Pickups</strong>: Complimentary waiting time is 30 minutes after the confirmed arrival time.</li>
          <li><strong>Other Pickups</strong>: Complimentary waiting time is 15 minutes from the scheduled pickup time.</li>
          <li>Waiting time beyond the complimentary period may be charged at €10 per additional 15 minutes.</li>
          <li>The Client should provide their flight or train number at the time of booking to enable tracking. The Company is not liable for delays caused by incorrect or missing flight/train information.</li>
        </ul>
      </>
    ),
  },
  {
    num: "07",
    title: "Meet & Greet Service",
    content: (
      <>
        <p>For airport and train station pickups, Paris Easy Move provides a professional meet & greet service as standard:</p>
        <ul>
          <li>The driver will be present in the arrivals hall holding a personalised name sign with the Client's name.</li>
          <li>The driver will assist with luggage from the arrivals hall to the vehicle.</li>
          <li>The exact meeting point will be confirmed in the booking confirmation email.</li>
          <li>In the event the Client cannot locate the driver, they should call or WhatsApp the number provided in the confirmation without delay.</li>
        </ul>
      </>
    ),
  },
  {
    num: "08",
    title: "Luggage, Child Seats & Special Requests",
    content: (
      <>
        <p>Paris Easy Move endeavours to accommodate all reasonable special requests subject to availability.</p>
        <ul>
          <li><strong>Luggage</strong>: The Client must declare the number and size of bags at the time of booking. Excess luggage beyond the declared amount may require a vehicle upgrade at additional cost, subject to availability.</li>
          <li><strong>Child Seats</strong>: Baby seats, child booster seats, and ISOFIX child seats are available free of charge. Requests must be made at the time of booking.</li>
          <li><strong>Wheelchair & Accessibility</strong>: Wheelchair-accessible vehicles and assistance for passengers with reduced mobility are available on request. Please advise us at the time of booking.</li>
          <li><strong>Pets</strong>: Small pets in a carrier are permitted subject to prior notification. Additional cleaning charges may apply.</li>
          <li><strong>Disney Entertainment</strong>: Select vehicles are equipped with an in-vehicle screen for Disney films, available for families travelling with young children on applicable routes.</li>
        </ul>
      </>
    ),
  },
  {
    num: "09",
    title: "Client Obligations",
    content: (
      <>
        <p>The Client agrees to the following obligations when using Paris Easy Move services:</p>
        <ul>
          <li>Be ready at the designated pickup location at the confirmed time.</li>
          <li>Provide accurate booking information including correct addresses, passenger numbers, and flight details.</li>
          <li>Ensure all passengers behave in a respectful manner towards the driver and do not damage the vehicle.</li>
          <li>Refrain from consuming food, alcohol, or smoking in any vehicle. Violation may result in additional cleaning charges.</li>
          <li>Notify the Company promptly of any changes to travel plans.</li>
          <li>Ensure children are accompanied by a responsible adult at all times.</li>
        </ul>
      </>
    ),
  },
  {
    num: "10",
    title: "Liability & Limitations",
    content: (
      <>
        <p>Paris Easy Move operates as a fully insured and licensed VTC operator. The following limitations of liability apply:</p>
        <ul>
          <li>The Company is not liable for delays caused by traffic, weather conditions, road closures, strikes, or any circumstances beyond its control.</li>
          <li>The Company is not liable for missed flights, trains, or connections due to events outside its control, including exceptional traffic or force majeure events.</li>
          <li>The Company's liability for any claim shall not exceed the total value of the booking in question.</li>
          <li>The Company is not responsible for items left in the vehicle. Lost property found will be held for 14 days and arrangements made for collection or return.</li>
          <li>The Client is liable for any damage caused to the vehicle through negligence or deliberate action.</li>
        </ul>
      </>
    ),
  },
  {
    num: "11",
    title: "Force Majeure",
    content: (
      <p>Paris Easy Move shall not be held liable for any failure to perform its obligations due to events beyond its reasonable control, including but not limited to natural disasters, government restrictions, strikes, severe weather, pandemic measures, or acts of war. In such cases, the Company will endeavour to provide an alternative solution or issue a full refund at its discretion.</p>
    ),
  },
  {
    num: "12",
    title: "Privacy & Data Protection",
    content: (
      <p>The collection, use, and storage of personal data is governed by our Privacy Policy, available at <Link href="/privacy" style={{ color: "#c8a96e", borderBottom: "1px solid rgba(200,169,110,0.3)" }}>pariseasymove.com/privacy</Link>. By making a booking, the Client consents to the processing of their personal data as described therein, in accordance with the GDPR.</p>
    ),
  },
  {
    num: "13",
    title: "Complaints & Dispute Resolution",
    content: (
      <>
        <p>Paris Easy Move is committed to providing an exceptional service. In the event of a complaint:</p>
        <ul>
          <li>Complaints should be submitted in writing to <a href="mailto:contact@pariseasymove.com" style={{ color: "#c8a96e", borderBottom: "1px solid rgba(200,169,110,0.3)" }}>contact@pariseasymove.com</a> within 7 days of the service date.</li>
          <li>We will acknowledge your complaint within 48 hours and aim to resolve it within 14 days.</li>
          <li>If a resolution cannot be reached, the Client may refer the matter to a recognised French consumer mediation service.</li>
        </ul>
      </>
    ),
  },
  {
    num: "14",
    title: "Governing Law",
    content: (
      <p>These Terms and Conditions are governed by and construed in accordance with French law. Any disputes arising from these Terms shall be subject to the exclusive jurisdiction of the courts of France.</p>
    ),
  },
  {
    num: "15",
    title: "Amendments",
    content: (
      <p>Paris Easy Move reserves the right to amend these Terms and Conditions at any time. The most current version will always be published on our website. Continued use of our services following any amendments constitutes acceptance of the revised Terms.</p>
    ),
  },
];

export default function TermsAndConditions() {
  const [activeSection, setActiveSection] = useState<string | null>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) setActiveSection(entry.target.id);
        });
      },
      { rootMargin: "-30% 0px -60% 0px" }
    );
    document.querySelectorAll("[data-section]").forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, []);

  return (
    <>
      <Header />

      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Cinzel:wght@400;500;600&family=EB+Garamond:ital,wght@0,400;0,500;1,400&family=Inter:wght@400;500;600&display=swap');

        .tc-root {
          background: #060d1a;
          color: #d8dff0;
          min-height: 100vh;
          font-family: 'Inter', system-ui, sans-serif;
        }

        /* ── Hero ── */
        .tc-hero {
          position: relative;
          text-align: center;
          padding: 120px 24px 80px;
          overflow: hidden;
        }
        .tc-hero::before {
          content: '';
          position: absolute;
          inset: 0;
          background:
            radial-gradient(ellipse 70% 50% at 50% 0%, rgba(200,169,110,0.08) 0%, transparent 70%),
            radial-gradient(ellipse 40% 30% at 80% 80%, rgba(13,30,60,0.6) 0%, transparent 60%);
          pointer-events: none;
        }
        .tc-eyebrow {
          font-family: 'Inter', sans-serif;
          font-size: 11px;
          font-weight: 600;
          letter-spacing: 0.3em;
          text-transform: uppercase;
          color: #c8a96e;
          margin-bottom: 20px;
          opacity: 0.8;
        }
        .tc-title {
          font-family: 'Cinzel', serif;
          font-size: clamp(2.4rem, 6vw, 4.2rem);
          font-weight: 500;
          letter-spacing: 0.12em;
          color: #f5f0e8;
          margin: 0 0 20px;
          line-height: 1.1;
        }
        .tc-subtitle {
          font-size: 14px;
          color: rgba(200,169,110,0.65);
          letter-spacing: 0.12em;
          text-transform: uppercase;
          font-weight: 500;
        }
        .tc-hero-rule {
          width: 1px;
          height: 56px;
          background: linear-gradient(to bottom, rgba(200,169,110,0.5), transparent);
          margin: 32px auto 0;
        }

        /* ── Layout ── */
        .tc-layout {
          max-width: 1180px;
          margin: 0 auto;
          padding: 60px 24px 100px;
          display: grid;
          grid-template-columns: 220px 1fr;
          gap: 64px;
          align-items: start;
        }

        /* ── Sidebar TOC ── */
        .tc-toc {
          position: sticky;
          top: 100px;
          max-height: calc(100vh - 120px);
          overflow-y: auto;
          scrollbar-width: none;
        }
        .tc-toc::-webkit-scrollbar { display: none; }
        .tc-toc-label {
          font-size: 10px;
          font-weight: 600;
          letter-spacing: 0.25em;
          text-transform: uppercase;
          color: rgba(200,169,110,0.5);
          margin-bottom: 20px;
          padding-bottom: 12px;
          border-bottom: 1px solid rgba(200,169,110,0.12);
        }
        .tc-toc-item {
          display: flex;
          align-items: flex-start;
          gap: 10px;
          padding: 7px 0;
          cursor: pointer;
          text-decoration: none;
          border: none;
          background: none;
          width: 100%;
          text-align: left;
        }
        .tc-toc-item:hover .tc-toc-text { color: #c8a96e; }
        .tc-toc-num {
          font-size: 10px;
          color: rgba(200,169,110,0.3);
          font-weight: 600;
          letter-spacing: 0.05em;
          flex-shrink: 0;
          margin-top: 1px;
          transition: color 0.2s;
        }
        .tc-toc-text {
          font-size: 11.5px;
          color: rgba(200,169,110,0.35);
          line-height: 1.4;
          transition: color 0.2s;
        }
        .tc-toc-item.active .tc-toc-num,
        .tc-toc-item.active .tc-toc-text { color: #c8a96e; }
        .tc-toc-item.active .tc-toc-text { font-weight: 500; }

        /* ── Intro ── */
        .tc-intro {
          font-family: 'EB Garamond', serif;
          font-size: clamp(1.05rem, 1.3vw, 1.2rem);
          line-height: 1.85;
          color: rgba(216,223,240,0.8);
          margin-bottom: 64px;
          padding-bottom: 48px;
          border-bottom: 1px solid rgba(200,169,110,0.1);
        }
        .tc-intro strong { color: #c8a96e; font-weight: 500; }

        /* ── Sections ── */
        .tc-section {
          margin-bottom: 56px;
          padding-bottom: 56px;
          border-bottom: 1px solid rgba(200,169,110,0.07);
        }
        .tc-section:last-of-type { border-bottom: none; }
        .tc-section-header {
          display: flex;
          align-items: center;
          gap: 18px;
          margin-bottom: 24px;
        }
        .tc-section-num {
          font-family: 'Cinzel', serif;
          font-size: 11px;
          color: rgba(200,169,110,0.4);
          letter-spacing: 0.1em;
          flex-shrink: 0;
        }
        .tc-section-rule {
          flex: 1;
          height: 1px;
          background: linear-gradient(to right, rgba(200,169,110,0.25), transparent);
        }
        .tc-section-title {
          font-family: 'Cinzel', serif;
          font-size: clamp(1rem, 1.4vw, 1.15rem);
          font-weight: 500;
          color: #f0e8d8;
          letter-spacing: 0.06em;
          margin: 0 0 18px;
        }
        .tc-section-body {
          font-family: 'EB Garamond', serif;
          font-size: clamp(1rem, 1.2vw, 1.1rem);
          line-height: 1.85;
          color: rgba(216,223,240,0.72);
        }
        .tc-section-body p { margin: 0 0 14px; }
        .tc-section-body p:last-child { margin-bottom: 0; }
        .tc-section-body strong { color: rgba(240,232,216,0.9); font-weight: 500; }
        .tc-section-body ul {
          list-style: none;
          padding: 0;
          margin: 16px 0 0;
          display: flex;
          flex-direction: column;
          gap: 10px;
        }
        .tc-section-body ul li {
          display: flex;
          gap: 14px;
          align-items: flex-start;
          line-height: 1.65;
        }
        .tc-section-body ul li::before {
          content: '';
          display: block;
          width: 4px;
          height: 4px;
          border-radius: 50%;
          background: #c8a96e;
          opacity: 0.5;
          flex-shrink: 0;
          margin-top: 10px;
        }

        /* ── Highlight box ── */
        .tc-highlight {
          background: linear-gradient(135deg, rgba(200,169,110,0.06), rgba(200,169,110,0.02));
          border: 1px solid rgba(200,169,110,0.16);
          border-left: 3px solid rgba(200,169,110,0.5);
          border-radius: 0 12px 12px 0;
          padding: 20px 24px;
          margin-bottom: 48px;
          font-family: 'EB Garamond', serif;
          font-size: clamp(0.95rem, 1.1vw, 1.05rem);
          line-height: 1.75;
          color: rgba(200,169,110,0.75);
        }

        /* ── Contact card ── */
        .tc-contact {
          background: linear-gradient(135deg, rgba(13,26,51,0.9), rgba(8,15,30,0.95));
          border: 1px solid rgba(200,169,110,0.18);
          border-radius: 20px;
          padding: 40px 44px;
          position: relative;
          overflow: hidden;
        }
        .tc-contact::before {
          content: '';
          position: absolute;
          top: 0; left: 0; right: 0;
          height: 2px;
          background: linear-gradient(90deg, transparent, #c8a96e, transparent);
        }
        .tc-contact-title {
          font-family: 'Cinzel', serif;
          font-size: 1rem;
          font-weight: 500;
          color: #c8a96e;
          letter-spacing: 0.1em;
          margin-bottom: 24px;
        }
        .tc-contact-row {
          display: flex;
          align-items: flex-start;
          gap: 14px;
          margin-bottom: 14px;
          font-family: 'EB Garamond', serif;
          font-size: 1.05rem;
          color: rgba(216,223,240,0.75);
          line-height: 1.5;
        }
        .tc-contact-row:last-of-type { margin-bottom: 0; }
        .tc-contact-icon { font-size: 15px; flex-shrink: 0; margin-top: 2px; opacity: 0.7; }
        .tc-contact-row a {
          color: rgba(216,223,240,0.75);
          text-decoration: none;
          border-bottom: 1px solid rgba(200,169,110,0.2);
          transition: color 0.2s, border-color 0.2s;
        }
        .tc-contact-row a:hover { color: #c8a96e; border-color: #c8a96e; }
        .tc-contact-badges {
          display: flex;
          flex-wrap: wrap;
          gap: 10px;
          margin-top: 28px;
          padding-top: 24px;
          border-top: 1px solid rgba(200,169,110,0.1);
        }
        .tc-badge {
          font-size: 10px;
          font-weight: 600;
          letter-spacing: 0.18em;
          text-transform: uppercase;
          color: rgba(200,169,110,0.6);
          padding: 5px 12px;
          border: 1px solid rgba(200,169,110,0.18);
          border-radius: 999px;
        }

        /* ── Footer ── */
        .tc-foot {
          border-top: 1px solid rgba(200,169,110,0.08);
          padding: 32px 24px;
          text-align: center;
        }
        .tc-foot-text {
          font-size: 11px;
          color: rgba(200,169,110,0.35);
          letter-spacing: 0.08em;
          line-height: 1.9;
        }
        .tc-foot-link {
          display: inline-flex;
          align-items: center;
          gap: 6px;
          font-size: 12px;
          font-weight: 500;
          color: rgba(200,169,110,0.5);
          text-decoration: none;
          letter-spacing: 0.1em;
          text-transform: uppercase;
          transition: color 0.2s;
          margin-bottom: 20px;
        }
        .tc-foot-link:hover { color: #c8a96e; }

        /* ── Mobile ── */
        @media (max-width: 860px) {
          .tc-layout { grid-template-columns: 1fr; gap: 0; padding: 40px 20px 80px; }
          .tc-toc { display: none; }
          .tc-hero { padding: 100px 20px 60px; }
          .tc-contact { padding: 28px 24px; }
        }
        @media (max-width: 480px) {
          .tc-hero { padding: 88px 16px 48px; }
          .tc-layout { padding: 32px 16px 64px; }
          .tc-section { margin-bottom: 40px; padding-bottom: 40px; }
          .tc-highlight { padding: 16px 18px; }
        }
      `}</style>

      <div className="tc-root">
        {/* Hero */}
        <div className="tc-hero">
          <div className="tc-eyebrow">Paris Easy Move · Legal Documents</div>
          <h1 className="tc-title">Terms & Conditions</h1>
          <p className="tc-subtitle">Last updated: March 31, 2026</p>
          <div className="tc-hero-rule" />
        </div>

        {/* Body */}
        <div className="tc-layout">
          {/* Sidebar TOC */}
          <nav className="tc-toc" aria-label="Table of contents">
            <div className="tc-toc-label">Contents</div>
            {sections.map((s) => (
              <a
                key={s.num}
                href={`#section-${s.num}`}
                className={`tc-toc-item${activeSection === `section-${s.num}` ? " active" : ""}`}
              >
                <span className="tc-toc-num">{s.num}</span>
                <span className="tc-toc-text">{s.title}</span>
              </a>
            ))}
            <a
              href="#section-contact"
              className={`tc-toc-item${activeSection === "section-contact" ? " active" : ""}`}
            >
              <span className="tc-toc-num">16</span>
              <span className="tc-toc-text">Contact Us</span>
            </a>
          </nav>

          {/* Main */}
          <main>
            {/* Intro */}
            <p className="tc-intro">
              Please read these Terms and Conditions carefully before using the services of{" "}
              <strong>Paris Easy Move</strong>. By making a booking with us, you confirm that you have read, understood, and agreed to be bound by these Terms. These Terms constitute a legally binding agreement between you (the Client) and Paris Easy Move, a licensed VTC operator based in France.
            </p>

            {/* Important notice */}
            <div className="tc-highlight">
              These Terms apply to all bookings made via <strong style={{ color: "#c8a96e" }}>pariseasymove.com</strong>, by phone, email, or WhatsApp. If you do not agree with any part of these Terms, please do not proceed with a booking.
            </div>

            {/* Sections */}
            {sections.map((s) => (
              <div
                key={s.num}
                id={`section-${s.num}`}
                data-section
                className="tc-section"
              >
                <div className="tc-section-header">
                  <span className="tc-section-num">{s.num}</span>
                  <div className="tc-section-rule" />
                </div>
                <h2 className="tc-section-title">{s.title}</h2>
                <div className="tc-section-body">{s.content}</div>
              </div>
            ))}

            {/* Contact */}
            <div id="section-contact" data-section className="tc-section">
              <div className="tc-section-header">
                <span className="tc-section-num">16</span>
                <div className="tc-section-rule" />
              </div>
              <h2 className="tc-section-title">Contact Us</h2>
              <p className="tc-section-body" style={{ marginBottom: 24 }}>
                For any questions, booking amendments, complaints, or general enquiries regarding these Terms, please reach us through the following channels:
              </p>
              <div className="tc-contact">
                <div className="tc-contact-title">Paris Easy Move — Premium Private Chauffeur</div>
                <div className="tc-contact-row">
                  <span className="tc-contact-icon">📍</span>
                  <span>11 square de l'avre, 92100 Boulogne-Billancourt, France</span>
                </div>
                <div className="tc-contact-row">
                  <span className="tc-contact-icon">📞</span>
                  <span>
                    <a href="tel:+33652466694">+33 6 52 46 66 94</a>
                    <span style={{ opacity: 0.4, margin: "0 8px" }}>·</span>
                    <span style={{ fontSize: "0.92em", opacity: 0.6 }}>WhatsApp available</span>
                  </span>
                </div>
                <div className="tc-contact-row">
                  <span className="tc-contact-icon">✉️</span>
                  <a href="mailto:contact@pariseasymove.com">contact@pariseasymove.com</a>
                </div>
                <div className="tc-contact-row">
                  <span className="tc-contact-icon">🌐</span>
                  <a href="https://pariseasymove.com">pariseasymove.com</a>
                </div>
                <div className="tc-contact-badges">
                  <span className="tc-badge">24 / 7 Support</span>
                  <span className="tc-badge">Licensed VTC Operator</span>
                  <span className="tc-badge">Fully Insured</span>
                  <span className="tc-badge">GDPR Compliant</span>
                </div>
              </div>
            </div>

            {/* Footer note */}
            <p style={{ fontSize: 12, color: "rgba(200,169,110,0.3)", textAlign: "center", marginTop: 48, lineHeight: 1.9, letterSpacing: "0.06em" }}>
              These Terms and Conditions are governed by French law.<br />
              © 2026 Paris Easy Move — All Rights Reserved.
            </p>
          </main>
        </div>

        {/* Footer */}
        <footer className="tc-foot">
          <div>
            <Link href="/" className="tc-foot-link">← Back to Home</Link>
          </div>
          <p className="tc-foot-text">
            Paris Easy Move · pariseasymove.com · Boulogne-Billancourt, France
          </p>
        </footer>
      </div>
    </>
  );
}