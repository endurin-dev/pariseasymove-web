"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import Header from "@/components/Header";

const sections = [
  {
    num: "01",
    title: "Information We Collect",
    content: (
      <>
        <p>We collect the following categories of information:</p>
        <ul>
          <li><strong>Personal &amp; Booking Information</strong>: Full name, email address, phone number, pickup and drop-off addresses, flight numbers, travel dates/times, number of passengers, and any special requests (child seats, luggage, etc.).</li>
          <li><strong>Payment Information</strong>: Processed securely through our payment partners — we do not store full card details.</li>
          <li><strong>Technical &amp; Usage Data</strong>: IP address, browser type, device information, pages visited, and cookies when you use our website.</li>
          <li><strong>Communication Data</strong>: Messages sent through our contact form, WhatsApp, or booking inquiries.</li>
        </ul>
      </>
    ),
  },
  {
    num: "02",
    title: "How We Use Your Information",
    content: (
      <>
        <p>We use your data to:</p>
        <ul>
          <li>Process and confirm your airport transfers (CDG, Orly, Beauvais), Disneyland Paris transfers, Versailles day trips, or Paris city tours</li>
          <li>Provide meet &amp; greet service, flight tracking, and door-to-door premium chauffeur service</li>
          <li>Communicate with you about your booking and send important updates</li>
          <li>Improve our services and website experience</li>
          <li>Send occasional travel tips and exclusive offers — you can unsubscribe at any time</li>
          <li>Comply with legal and regulatory requirements as a licensed VTC operator in France</li>
        </ul>
      </>
    ),
  },
  {
    num: "03",
    title: "Legal Basis for Processing (GDPR)",
    content: (
      <>
        <p>As a French company, we process your data in accordance with the General Data Protection Regulation (GDPR) on the following bases:</p>
        <ul>
          <li>Performance of a contract (your booking and transfer service)</li>
          <li>Legitimate business interests (service improvement and communication)</li>
          <li>Your consent (for marketing emails and non-essential cookies)</li>
          <li>Legal obligations (accounting, tax, and VTC licensing requirements)</li>
        </ul>
      </>
    ),
  },
  {
    num: "04",
    title: "Sharing Your Information",
    content: (
      <>
        <p>We never sell your personal data. We only share information when strictly necessary:</p>
        <ul>
          <li>With our licensed, insured professional chauffeurs — only the minimum data needed to complete your transfer</li>
          <li>With trusted service providers (booking system, payment processors, email services)</li>
          <li>When required by law or French authorities</li>
        </ul>
      </>
    ),
  },
  {
    num: "05",
    title: "Cookies and Tracking",
    content: (
      <p>We use essential cookies to enable bookings and website functionality. Analytics cookies help us understand visitor behaviour. You can manage or disable cookies through your browser settings at any time.</p>
    ),
  },
  {
    num: "06",
    title: "Data Security",
    content: (
      <p>We use industry-standard security measures — encryption, secure servers, access controls — to protect your information. As an officially licensed and insured VTC operator, we take data protection very seriously.</p>
    ),
  },
  {
    num: "07",
    title: "Your GDPR Rights",
    content: (
      <>
        <p>You have the right to:</p>
        <ul>
          <li>Access, rectify, or delete your personal data</li>
          <li>Object to or restrict processing</li>
          <li>Withdraw consent at any time</li>
          <li>Data portability</li>
          <li>Lodge a complaint with the French Data Protection Authority (CNIL)</li>
        </ul>
        <p style={{ marginTop: "1rem" }}>To exercise any of these rights, simply contact us using the details below.</p>
      </>
    ),
  },
  {
    num: "08",
    title: "Data Retention",
    content: (
      <p>We retain your data only for as long as necessary to fulfil your booking, meet legal obligations (typically 3–7 years for accounting and VTC records), or resolve any disputes.</p>
    ),
  },
  {
    num: "09",
    title: "International Transfers",
    content: (
      <p>Your data is primarily processed in France. If any third-party processors are located outside the EU, we ensure appropriate safeguards (standard contractual clauses) are in place.</p>
    ),
  },
  {
    num: "10",
    title: "Children's Privacy",
    content: (
      <p>Our services are not directed at children under 16. We do not knowingly collect personal data from minors.</p>
    ),
  },
  {
    num: "11",
    title: "Changes to This Policy",
    content: (
      <p>We may update this Privacy Policy from time to time. The "Last updated" date at the top of this page will always reflect the most recent version.</p>
    ),
  },
];

export default function PrivacyPolicy() {
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

        .pp-root {
          background: #060d1a;
          color: #d8dff0;
          min-height: 100vh;
          font-family: 'Inter', system-ui, sans-serif;
        }

        /* ── Hero ── */
        .pp-hero {
          position: relative;
          text-align: center;
          padding: 120px 24px 80px;
          overflow: hidden;
        }
        .pp-hero::before {
          content: '';
          position: absolute;
          inset: 0;
          background:
            radial-gradient(ellipse 70% 50% at 50% 0%, rgba(200,169,110,0.08) 0%, transparent 70%),
            radial-gradient(ellipse 40% 30% at 80% 80%, rgba(13,30,60,0.6) 0%, transparent 60%);
          pointer-events: none;
        }
        .pp-eyebrow {
          font-family: 'Inter', sans-serif;
          font-size: 11px;
          font-weight: 600;
          letter-spacing: 0.3em;
          text-transform: uppercase;
          color: #c8a96e;
          margin-bottom: 20px;
          opacity: 0.8;
        }
        .pp-title {
          font-family: 'Cinzel', serif;
          font-size: clamp(2.4rem, 6vw, 4.2rem);
          font-weight: 500;
          letter-spacing: 0.12em;
          color: #f5f0e8;
          margin: 0 0 20px;
          line-height: 1.1;
        }
        .pp-subtitle {
          font-size: 14px;
          color: rgba(200,169,110,0.65);
          letter-spacing: 0.12em;
          text-transform: uppercase;
          font-weight: 500;
        }
        .pp-hero-rule {
          width: 1px;
          height: 56px;
          background: linear-gradient(to bottom, rgba(200,169,110,0.5), transparent);
          margin: 32px auto 0;
        }

        /* ── Layout ── */
        .pp-layout {
          max-width: 1180px;
          margin: 0 auto;
          padding: 60px 24px 100px;
          display: grid;
          grid-template-columns: 220px 1fr;
          gap: 64px;
          align-items: start;
        }

        /* ── Sidebar TOC ── */
        .pp-toc {
          position: sticky;
          top: 100px;
        }
        .pp-toc-label {
          font-size: 10px;
          font-weight: 600;
          letter-spacing: 0.25em;
          text-transform: uppercase;
          color: rgba(200,169,110,0.5);
          margin-bottom: 20px;
          padding-bottom: 12px;
          border-bottom: 1px solid rgba(200,169,110,0.12);
        }
        .pp-toc-item {
          display: flex;
          align-items: flex-start;
          gap: 10px;
          padding: 8px 0;
          cursor: pointer;
          transition: all 0.2s;
          text-decoration: none;
          border: none;
          background: none;
          width: 100%;
          text-align: left;
        }
        .pp-toc-item:hover .pp-toc-text { color: #c8a96e; }
        .pp-toc-num {
          font-size: 10px;
          color: rgba(200,169,110,0.35);
          font-weight: 600;
          letter-spacing: 0.05em;
          flex-shrink: 0;
          margin-top: 1px;
          transition: color 0.2s;
        }
        .pp-toc-text {
          font-size: 12px;
          color: rgba(200,169,110,0.4);
          line-height: 1.4;
          transition: color 0.2s;
        }
        .pp-toc-item.active .pp-toc-num,
        .pp-toc-item.active .pp-toc-text {
          color: #c8a96e;
        }
        .pp-toc-item.active .pp-toc-text {
          font-weight: 500;
        }

        /* ── Intro ── */
        .pp-intro {
          font-family: 'EB Garamond', serif;
          font-size: clamp(1.05rem, 1.3vw, 1.2rem);
          line-height: 1.85;
          color: rgba(216,223,240,0.8);
          margin-bottom: 64px;
          padding-bottom: 48px;
          border-bottom: 1px solid rgba(200,169,110,0.1);
        }
        .pp-intro strong { color: #c8a96e; font-weight: 500; }

        /* ── Sections ── */
        .pp-section {
          margin-bottom: 56px;
          padding-bottom: 56px;
          border-bottom: 1px solid rgba(200,169,110,0.07);
        }
        .pp-section:last-of-type {
          border-bottom: none;
        }
        .pp-section-header {
          display: flex;
          align-items: center;
          gap: 18px;
          margin-bottom: 24px;
        }
        .pp-section-num {
          font-family: 'Cinzel', serif;
          font-size: 11px;
          color: rgba(200,169,110,0.4);
          letter-spacing: 0.1em;
          flex-shrink: 0;
        }
        .pp-section-rule {
          flex: 1;
          height: 1px;
          background: linear-gradient(to right, rgba(200,169,110,0.25), transparent);
        }
        .pp-section-title {
          font-family: 'Cinzel', serif;
          font-size: clamp(1rem, 1.4vw, 1.15rem);
          font-weight: 500;
          color: #f0e8d8;
          letter-spacing: 0.06em;
          margin: 0 0 18px;
        }
        .pp-section-body {
          font-family: 'EB Garamond', serif;
          font-size: clamp(1rem, 1.2vw, 1.1rem);
          line-height: 1.85;
          color: rgba(216,223,240,0.72);
        }
        .pp-section-body p { margin: 0 0 14px; }
        .pp-section-body p:last-child { margin-bottom: 0; }
        .pp-section-body strong { color: rgba(240,232,216,0.9); font-weight: 500; }
        .pp-section-body ul {
          list-style: none;
          padding: 0;
          margin: 16px 0 0;
          display: flex;
          flex-direction: column;
          gap: 10px;
        }
        .pp-section-body ul li {
          display: flex;
          gap: 14px;
          align-items: flex-start;
          line-height: 1.65;
        }
        .pp-section-body ul li::before {
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

        /* ── Contact card ── */
        .pp-contact {
          background: linear-gradient(135deg, rgba(13,26,51,0.9), rgba(8,15,30,0.95));
          border: 1px solid rgba(200,169,110,0.18);
          border-radius: 20px;
          padding: 40px 44px;
          position: relative;
          overflow: hidden;
        }
        .pp-contact::before {
          content: '';
          position: absolute;
          top: 0; left: 0; right: 0;
          height: 2px;
          background: linear-gradient(90deg, transparent, #c8a96e, transparent);
        }
        .pp-contact-title {
          font-family: 'Cinzel', serif;
          font-size: 1rem;
          font-weight: 500;
          color: #c8a96e;
          letter-spacing: 0.1em;
          margin-bottom: 24px;
        }
        .pp-contact-row {
          display: flex;
          align-items: flex-start;
          gap: 14px;
          margin-bottom: 14px;
          font-family: 'EB Garamond', serif;
          font-size: 1.05rem;
          color: rgba(216,223,240,0.75);
          line-height: 1.5;
        }
        .pp-contact-row:last-of-type { margin-bottom: 0; }
        .pp-contact-icon {
          font-size: 15px;
          flex-shrink: 0;
          margin-top: 2px;
          opacity: 0.7;
        }
        .pp-contact-row a {
          color: rgba(216,223,240,0.75);
          text-decoration: none;
          border-bottom: 1px solid rgba(200,169,110,0.2);
          transition: color 0.2s, border-color 0.2s;
        }
        .pp-contact-row a:hover {
          color: #c8a96e;
          border-color: #c8a96e;
        }
        .pp-contact-badges {
          display: flex;
          flex-wrap: wrap;
          gap: 10px;
          margin-top: 28px;
          padding-top: 24px;
          border-top: 1px solid rgba(200,169,110,0.1);
        }
        .pp-badge {
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
        .pp-foot {
          border-top: 1px solid rgba(200,169,110,0.08);
          padding: 32px 24px;
          text-align: center;
        }
        .pp-foot-text {
          font-size: 11px;
          color: rgba(200,169,110,0.35);
          letter-spacing: 0.08em;
          line-height: 1.9;
        }
        .pp-foot-link {
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
        .pp-foot-link:hover { color: #c8a96e; }

        /* ── Mobile ── */
        @media (max-width: 860px) {
          .pp-layout {
            grid-template-columns: 1fr;
            gap: 0;
            padding: 40px 20px 80px;
          }
          .pp-toc { display: none; }
          .pp-hero { padding: 100px 20px 60px; }
          .pp-contact { padding: 28px 24px; }
          .pp-contact-badges { gap: 8px; }
        }
        @media (max-width: 480px) {
          .pp-hero { padding: 88px 16px 48px; }
          .pp-layout { padding: 32px 16px 64px; }
          .pp-section { margin-bottom: 40px; padding-bottom: 40px; }
        }
      `}</style>

      <div className="pp-root">
        {/* Hero */}
        <div className="pp-hero">
          <div className="pp-eyebrow">Paris Easy Move · Legal Documents</div>
          <h1 className="pp-title">Privacy Policy</h1>
          <p className="pp-subtitle">Last updated: March 31, 2026</p>
          <div className="pp-hero-rule" />
        </div>

        {/* Body */}
        <div className="pp-layout">
          {/* Sidebar TOC */}
          <nav className="pp-toc" aria-label="Table of contents">
            <div className="pp-toc-label">Contents</div>
            {sections.map((s) => (
              <a
                key={s.num}
                href={`#section-${s.num}`}
                className={`pp-toc-item${activeSection === `section-${s.num}` ? " active" : ""}`}
              >
                <span className="pp-toc-num">{s.num}</span>
                <span className="pp-toc-text">{s.title}</span>
              </a>
            ))}
            <a href="#section-12" className={`pp-toc-item${activeSection === "section-12" ? " active" : ""}`}>
              <span className="pp-toc-num">12</span>
              <span className="pp-toc-text">Contact Us</span>
            </a>
          </nav>

          {/* Main content */}
          <main>
            {/* Intro */}
            <p className="pp-intro">
              At <strong>Paris Easy Move</strong> (Premium Private Chauffeur Service), we are fully committed to protecting your privacy.
              This Privacy Policy explains how we collect, use, disclose, and protect your personal information when you visit{" "}
              <strong>pariseasymove.com</strong>, make a booking, or use our airport transfer, Disneyland, Versailles, or city tour services.
            </p>

            {/* Sections */}
            {sections.map((s) => (
              <div
                key={s.num}
                id={`section-${s.num}`}
                data-section
                className="pp-section"
              >
                <div className="pp-section-header">
                  <span className="pp-section-num">{s.num}</span>
                  <div className="pp-section-rule" />
                </div>
                <h2 className="pp-section-title">{s.title}</h2>
                <div className="pp-section-body">{s.content}</div>
              </div>
            ))}

            {/* Contact */}
            <div id="section-12" data-section className="pp-section">
              <div className="pp-section-header">
                <span className="pp-section-num">12</span>
                <div className="pp-section-rule" />
              </div>
              <h2 className="pp-section-title">Contact Us</h2>
              <div className="pp-contact">
                <div className="pp-contact-title">Paris Easy Move — Premium Private Chauffeur</div>
                <div className="pp-contact-row">
                  <span className="pp-contact-icon">📍</span>
                  <span>11 square de l'avre, 92100 Boulogne-Billancourt, France</span>
                </div>
                <div className="pp-contact-row">
                  <span className="pp-contact-icon">📞</span>
                  <span>
                    <a href="tel:+33652466694">+33 6 52 46 66 94</a>
                    <span style={{ opacity: 0.4, margin: "0 8px" }}>·</span>
                    <span style={{ fontSize: "0.92em", opacity: 0.6 }}>WhatsApp available</span>
                  </span>
                </div>
                <div className="pp-contact-row">
                  <span className="pp-contact-icon">✉️</span>
                  <a href="mailto:contact@pariseasymove.com">contact@pariseasymove.com</a>
                </div>
                <div className="pp-contact-badges">
                  <span className="pp-badge">24 / 7 Support</span>
                  <span className="pp-badge">Licensed VTC Operator</span>
                  <span className="pp-badge">Fully Insured</span>
                  <span className="pp-badge">GDPR Compliant</span>
                </div>
              </div>
            </div>

            {/* Footer note */}
            <p style={{ fontSize: 12, color: "rgba(200,169,110,0.3)", textAlign: "center", marginTop: 48, lineHeight: 1.9, letterSpacing: "0.06em" }}>
              This Privacy Policy is governed by French and EU law (GDPR).<br />
              © 2026 Paris Easy Move — All Rights Reserved.
            </p>
          </main>
        </div>

        {/* Footer */}
        <footer className="pp-foot">
          <div>
            <Link href="/" className="pp-foot-link">
              ← Back to Home
            </Link>
          </div>
          <p className="pp-foot-text">
            Paris Easy Move · pariseasymove.com · Boulogne-Billancourt, France
          </p>
        </footer>
      </div>
    </>
  );
}