import Link from "next/link";

export default function ContactUs() {
  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,300;0,400;0,500;0,600;1,300;1,400;1,500&family=Montserrat:wght@300;400;500;600;700&display=swap');

        .cp-root {
          --cp-navy:        #0a1f44;
          --cp-navy-deep:   #071533;
          --cp-gold:        #c9a347;
          --cp-gold-light:  #e8c97a;
          --cp-gold-pale:   rgba(201,163,71,0.10);
          --cp-gold-border: rgba(201,163,71,0.22);
          --cp-ivory:       #f5f0e8;
          --cp-ivory-dim:   rgba(245,240,232,0.70);
          --cp-ivory-faint: rgba(245,240,232,0.38);
          --cp-stroke:      rgba(245,240,232,0.08);
          --cp-ease:        cubic-bezier(0.25, 0.1, 0.25, 1);
        }

        .cp-root * { box-sizing: border-box; }

        /* ── HERO ── */
        .cp-hero {
          position: relative;
          background: var(--cp-navy-deep);
          min-height: 52vh;
          display: flex;
          align-items: flex-end;
          overflow: hidden;
          padding: 120px 5vw 64px;
        }

        .cp-hero-bg {
          position: absolute; inset: 0;
          background: url('/images/contactus.webp') center/cover no-repeat;
          opacity: 0.75;
        }

        .cp-hero-overlay {
          position: absolute; inset: 0;
          background:
            linear-gradient(to top, rgba(7,21,51,0.98) 0%, rgba(7,21,51,0.55) 50%, rgba(7,21,51,0.25) 100%),
            linear-gradient(to right, rgba(7,21,51,0.75) 0%, transparent 65%);
        }

        .cp-hero-grid {
          position: absolute; inset: 0;
          background-image:
            linear-gradient(rgba(245,240,232,0.03) 1px, transparent 1px),
            linear-gradient(90deg, rgba(245,240,232,0.03) 1px, transparent 1px);
          background-size: 48px 48px;
        }

        .cp-hero-glow {
          position: absolute;
          top: -30%; right: -10%;
          width: 600px; height: 600px;
          border-radius: 50%;
          background: radial-gradient(circle, rgba(201,163,71,0.08) 0%, transparent 65%);
          pointer-events: none;
        }

        .cp-hero-topline {
          position: absolute; top: 0; left: 0; right: 0; height: 2px;
          background: linear-gradient(90deg, transparent, var(--cp-gold) 30%, var(--cp-gold) 70%, transparent);
          opacity: 0.6;
        }

        .cp-hero-inner {
          position: relative; z-index: 1;
          max-width: 1200px; width: 100%; margin: 0 auto;
        }

        .cp-eyebrow {
          display: inline-flex; align-items: center; gap: 10px;
          font-family: 'Montserrat', sans-serif;
          font-size: 10px; font-weight: 600; letter-spacing: 0.26em;
          text-transform: uppercase; color: var(--cp-gold);
          margin-bottom: 20px;
        }

        .cp-eyebrow-line { width: 28px; height: 1px; background: var(--cp-gold); }

        .cp-hero-title {
          font-family: 'Cormorant Garamond', serif;
          font-size: clamp(3.2rem, 7vw, 6rem);
          font-weight: 400; line-height: 0.95;
          letter-spacing: -0.02em;
          color: var(--cp-ivory);
          margin: 0 0 20px;
        }

        .cp-hero-title em {
          font-style: italic; color: var(--cp-gold); font-weight: 300;
        }

        .cp-hero-sub {
          font-family: 'Montserrat', sans-serif;
          font-size: 14px; font-weight: 400; line-height: 1.7;
          color: var(--cp-ivory-faint);
          max-width: 520px;
        }

        /* ── MAIN BODY ── */
        .cp-body {
          background: #080808;
          padding: 80px 5vw;
        }

        .cp-body-inner {
          max-width: 1200px; margin: 0 auto;
          display: grid;
          grid-template-columns: 1fr 1.1fr;
          gap: 64px;
          align-items: start;
        }

        @media (max-width: 900px) {
          .cp-body-inner { grid-template-columns: 1fr; gap: 48px; }
          .cp-hero { min-height: 40vh; padding: 100px 5vw 48px; }
        }

        /* ── LEFT: contact info ── */
        .cp-info {}

        .cp-section-label {
          font-family: 'Montserrat', sans-serif;
          font-size: 9px; font-weight: 700; letter-spacing: 0.26em;
          text-transform: uppercase; color: var(--cp-gold);
          margin-bottom: 32px; display: block;
        }

        .cp-info-cards { display: flex; flex-direction: column; gap: 2px; }

        .cp-info-card {
          display: flex; align-items: flex-start; gap: 18px;
          padding: 22px 24px;
          background: rgba(255,255,255,0.025);
          border: 1px solid rgba(245,240,232,0.06);
          border-radius: 0;
          text-decoration: none;
          transition: background 0.25s, border-color 0.25s;
          position: relative;
        }

        .cp-info-card:first-child { border-radius: 12px 12px 0 0; }
        .cp-info-card:last-child { border-radius: 0 0 12px 12px; }

        .cp-info-card::before {
          content: '';
          position: absolute; left: 0; top: 0; bottom: 0;
          width: 2px;
          background: var(--cp-gold);
          opacity: 0;
          transition: opacity 0.25s;
          border-radius: 2px 0 0 2px;
        }

        .cp-info-card:hover {
          background: rgba(201,163,71,0.06);
          border-color: rgba(201,163,71,0.18);
        }
        .cp-info-card:hover::before { opacity: 1; }

        .cp-info-icon {
          width: 40px; height: 40px; border-radius: 10px;
          background: rgba(201,163,71,0.08);
          border: 1px solid rgba(201,163,71,0.2);
          display: flex; align-items: center; justify-content: center;
          flex-shrink: 0; color: var(--cp-gold);
        }
        .cp-info-icon svg { width: 18px; height: 18px; }

        .cp-info-content {}
        .cp-info-label {
          font-family: 'Montserrat', sans-serif;
          font-size: 9px; font-weight: 700; letter-spacing: 0.18em;
          text-transform: uppercase; color: rgba(245,240,232,0.28);
          margin-bottom: 5px;
        }
        .cp-info-value {
          font-family: 'Montserrat', sans-serif;
          font-size: 14px; font-weight: 500;
          color: var(--cp-ivory); line-height: 1.5;
        }
        .cp-info-value a {
          color: var(--cp-ivory); text-decoration: none;
          transition: color 0.2s;
        }
        .cp-info-value a:hover { color: var(--cp-gold); }
        .cp-info-sub {
          font-size: 12px; font-weight: 400;
          color: rgba(245,240,232,0.35);
          margin-top: 2px; line-height: 1.5;
        }

        /* socials row */
        .cp-socials {
          display: flex; gap: 10px; margin-top: 24px;
        }
        .cp-social {
          display: flex; align-items: center; gap: 8px;
          padding: 10px 18px;
          background: rgba(255,255,255,0.03);
          border: 1px solid rgba(245,240,232,0.08);
          border-radius: 8px;
          text-decoration: none;
          font-family: 'Montserrat', sans-serif;
          font-size: 11px; font-weight: 600;
          color: rgba(245,240,232,0.5);
          transition: all 0.22s;
        }
        .cp-social:hover {
          background: rgba(201,163,71,0.08);
          border-color: rgba(201,163,71,0.3);
          color: var(--cp-gold);
        }
        .cp-social svg { width: 15px; height: 15px; }

        /* map placeholder */
        .cp-map {
          margin-top: 28px;
          border-radius: 12px; overflow: hidden;
          border: 1px solid rgba(201,163,71,0.15);
          height: 180px;
          background: rgba(255,255,255,0.025);
          display: flex; align-items: center; justify-content: center;
          flex-direction: column; gap: 10px;
          color: rgba(245,240,232,0.25);
          font-family: 'Montserrat', sans-serif;
          font-size: 11px; font-weight: 500; letter-spacing: 0.1em;
          text-transform: uppercase;
          position: relative; overflow: hidden;
        }
        .cp-map iframe {
          position: absolute; inset: 0;
          width: 100%; height: 100%;
          border: none; filter: grayscale(80%) invert(90%) contrast(0.85);
          opacity: 0.7;
        }
        .cp-map-label {
          position: relative; z-index: 1;
          background: rgba(8,8,8,0.75);
          padding: 6px 14px; border-radius: 6px;
          font-size: 10px; color: var(--cp-gold); font-weight: 600;
          letter-spacing: 0.14em; text-transform: uppercase;
        }

        /* ── RIGHT: form ── */
        .cp-form-wrap {}

        .cp-form {
          background: rgba(255,255,255,0.025);
          border: 1px solid rgba(245,240,232,0.07);
          border-radius: 20px;
          padding: 40px;
          position: relative;
          overflow: hidden;
        }

        .cp-form::before {
          content: '';
          position: absolute; top: 0; left: 0; right: 0; height: 2px;
          background: linear-gradient(90deg, transparent, var(--cp-gold) 50%, transparent);
          opacity: 0.5;
        }

        .cp-form-title {
          font-family: 'Cormorant Garamond', serif;
          font-size: 2rem; font-weight: 500;
          color: var(--cp-ivory); line-height: 1.15;
          margin-bottom: 6px;
        }
        .cp-form-sub {
          font-family: 'Montserrat', sans-serif;
          font-size: 12px; font-weight: 400;
          color: rgba(245,240,232,0.35);
          margin-bottom: 32px; line-height: 1.6;
        }

        .cp-field-row {
          display: grid; grid-template-columns: 1fr 1fr; gap: 14px;
          margin-bottom: 14px;
        }
        @media (max-width: 500px) { .cp-field-row { grid-template-columns: 1fr; } }

        .cp-field {
          display: flex; flex-direction: column; gap: 6px;
          margin-bottom: 14px;
        }

        .cp-label {
          font-family: 'Montserrat', sans-serif;
          font-size: 9px; font-weight: 700; letter-spacing: 0.2em;
          text-transform: uppercase; color: rgba(245,240,232,0.35);
        }

        .cp-input, .cp-select, .cp-textarea {
          background: rgba(255,255,255,0.04);
          border: 1px solid rgba(245,240,232,0.1);
          border-radius: 10px;
          padding: 13px 16px;
          font-family: 'Montserrat', sans-serif;
          font-size: 13px; font-weight: 400;
          color: var(--cp-ivory);
          outline: none;
          transition: border-color 0.2s, background 0.2s;
          width: 100%;
        }
        .cp-input::placeholder,
        .cp-textarea::placeholder { color: rgba(245,240,232,0.2); }
        .cp-input:focus, .cp-select:focus, .cp-textarea:focus {
          border-color: rgba(201,163,71,0.45);
          background: rgba(201,163,71,0.04);
        }
        .cp-select {
          appearance: none; -webkit-appearance: none; cursor: pointer;
          background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='12' height='12' viewBox='0 0 24 24' fill='none' stroke='rgba(245,240,232,0.3)' stroke-width='2'%3E%3Cpath d='M6 9l6 6 6-6'/%3E%3C/svg%3E");
          background-repeat: no-repeat;
          background-position: right 14px center;
          padding-right: 36px;
        }
        .cp-select option { background: #0a1f44; color: #f5f0e8; }
        .cp-textarea { resize: vertical; min-height: 130px; line-height: 1.6; }

        .cp-submit {
          width: 100%;
          padding: 15px 28px;
          background: var(--cp-gold);
          color: #080808;
          border: none; border-radius: 10px;
          font-family: 'Montserrat', sans-serif;
          font-size: 12px; font-weight: 700;
          letter-spacing: 0.18em; text-transform: uppercase;
          cursor: pointer;
          display: flex; align-items: center; justify-content: center; gap: 10px;
          transition: background 0.25s, transform 0.2s, box-shadow 0.25s;
          box-shadow: 0 4px 24px rgba(201,163,71,0.25);
          margin-top: 24px;
        }
        .cp-submit:hover {
          background: var(--cp-gold-light);
          transform: translateY(-2px);
          box-shadow: 0 8px 32px rgba(201,163,71,0.35);
        }
        .cp-submit svg { width: 16px; height: 16px; }

        .cp-form-note {
          display: flex; align-items: center; gap: 6px;
          justify-content: center; margin-top: 16px;
          font-family: 'Montserrat', sans-serif;
          font-size: 10px; font-weight: 500;
          color: rgba(245,240,232,0.25); letter-spacing: 0.06em;
        }
        .cp-form-note svg { width: 12px; height: 12px; color: var(--cp-gold); }

        /* ── STRIP ── */
        .cp-strip {
          background: var(--cp-navy-deep);
          border-top: 1px solid rgba(201,163,71,0.12);
          padding: 48px 5vw;
        }
        .cp-strip-inner {
          max-width: 1200px; margin: 0 auto;
          display: flex; align-items: center; justify-content: space-between;
          flex-wrap: wrap; gap: 24px;
        }
        .cp-strip-text {
          font-family: 'Cormorant Garamond', serif;
          font-size: clamp(1.4rem, 3vw, 2rem);
          font-weight: 400; color: var(--cp-ivory);
        }
        .cp-strip-text em { font-style: italic; color: var(--cp-gold); }
        .cp-strip-ctas { display: flex; gap: 12px; flex-wrap: wrap; }
        .cp-strip-btn {
          display: inline-flex; align-items: center; gap: 8px;
          padding: 13px 28px; border-radius: 6px;
          font-family: 'Montserrat', sans-serif;
          font-size: 11px; font-weight: 700;
          letter-spacing: 0.14em; text-transform: uppercase;
          text-decoration: none; transition: all 0.25s;
        }
        .cp-strip-btn-primary {
          background: var(--cp-gold); color: #080808;
          box-shadow: 0 4px 20px rgba(201,163,71,0.25);
        }
        .cp-strip-btn-primary:hover { background: var(--cp-gold-light); transform: translateY(-2px); }
        .cp-strip-btn-ghost {
          background: transparent; color: var(--cp-ivory-dim);
          border: 1px solid rgba(245,240,232,0.12);
        }
        .cp-strip-btn-ghost:hover {
          border-color: rgba(201,163,71,0.3);
          color: var(--cp-gold); background: rgba(201,163,71,0.06);
        }

        /* animations */
        @keyframes cp-fadeup {
          from { opacity: 0; transform: translateY(24px); }
          to   { opacity: 1; transform: translateY(0); }
        }
        .cp-anim-1 { animation: cp-fadeup 0.7s 0.1s both; }
        .cp-anim-2 { animation: cp-fadeup 0.7s 0.2s both; }
        .cp-anim-3 { animation: cp-fadeup 0.7s 0.3s both; }
        .cp-anim-4 { animation: cp-fadeup 0.7s 0.4s both; }
      `}</style>

      <div className="cp-root">

        {/* ── HERO ── */}
        <div className="cp-hero">
          <div className="cp-hero-bg" />
          <div className="cp-hero-overlay" />
          <div className="cp-hero-grid" />
          <div className="cp-hero-glow" />
          <div className="cp-hero-topline" />
          <div className="cp-hero-inner">
            <div className="cp-eyebrow cp-anim-1">
              <span className="cp-eyebrow-line" />
              Paris Easy Move
            </div>
            <h1 className="cp-hero-title cp-anim-2">
              Get in<br /><em>Touch</em>
            </h1>
            <p className="cp-hero-sub cp-anim-3">
              We're available 24 hours a day, 7 days a week. Whether you need a transfer, have a question, or want to plan a special journey — we're here.
            </p>
          </div>
        </div>

        {/* ── BODY ── */}
        <div className="cp-body">
          <div className="cp-body-inner">

            {/* LEFT: contact info */}
            <div className="cp-info cp-anim-3">
              <span className="cp-section-label">Contact Details</span>

              <div className="cp-info-cards">

                {/* Address */}
                <div className="cp-info-card" style={{ cursor: "default" }}>
                  <div className="cp-info-icon">
                    <svg fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="1.8">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"/>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"/>
                    </svg>
                  </div>
                  <div className="cp-info-content">
                    <div className="cp-info-label">Address</div>
                    <div className="cp-info-value">Paris Easy Move</div>
                    <div className="cp-info-sub">
                      10 rue Pierre Sarrazin<br />
                      95190 Goussainville / CDG Airport<br />
                      Paris area, France
                    </div>
                  </div>
                </div>

                {/* Phone */}
                <a href="tel:+33652466694" className="cp-info-card">
                  <div className="cp-info-icon">
                    <svg fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="1.8">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"/>
                    </svg>
                  </div>
                  <div className="cp-info-content">
                    <div className="cp-info-label">Phone / WhatsApp</div>
                    <div className="cp-info-value">+33 6 52 46 66 94</div>
                    <div className="cp-info-sub">Available 24 / 7</div>
                  </div>
                </a>

                {/* Email */}
                <a href="mailto:booking@pariseasymove.com" className="cp-info-card">
                  <div className="cp-info-icon">
                    <svg fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="1.8">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"/>
                    </svg>
                  </div>
                  <div className="cp-info-content">
                    <div className="cp-info-label">Email</div>
                    <div className="cp-info-value">booking@pariseasymove.com</div>
                    <div className="cp-info-sub">We reply within 1 hour</div>
                  </div>
                </a>

                {/* Website */}
                <a href="https://pariseasymove.com" target="_blank" rel="noopener noreferrer" className="cp-info-card">
                  <div className="cp-info-icon">
                    <svg fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="1.8">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M21 12a9 9 0 01-9 9m9-9a9 9 0 00-9-9m9 9H3m9 9a9 9 0 01-9-9m9 9c1.657 0 3-4.03 3-9s-1.343-9-3-9m0 18c-1.657 0-3-4.03-3-9s1.343-9 3-9"/>
                    </svg>
                  </div>
                  <div className="cp-info-content">
                    <div className="cp-info-label">Website</div>
                    <div className="cp-info-value">pariseasymove.com</div>
                    <div className="cp-info-sub">Book online anytime</div>
                  </div>
                </a>

              </div>

              {/* Socials */}
              <div className="cp-socials">
                <a href="https://facebook.com/ParisEasyMove" target="_blank" rel="noopener noreferrer" className="cp-social">
                  <svg viewBox="0 0 24 24" fill="currentColor">
                    <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"/>
                  </svg>
                  Facebook
                </a>
                <a href="https://instagram.com/ParisEasyMove" target="_blank" rel="noopener noreferrer" className="cp-social">
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <rect x="2" y="2" width="20" height="20" rx="5" ry="5"/>
                    <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"/>
                    <line x1="17.5" y1="6.5" x2="17.51" y2="6.5"/>
                  </svg>
                  Instagram
                </a>
                <a href="https://wa.me/33652466694" target="_blank" rel="noopener noreferrer" className="cp-social">
                  <svg viewBox="0 0 24 24" fill="currentColor">
                    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413z M12.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893A11.821 11.821 0 0012.05 0z"/>
                  </svg>
                  WhatsApp
                </a>
              </div>

              {/* Map embed */}
              <div className="cp-map">
                <iframe
                  src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2614.!2d2.4767!3d49.0273!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x47e60df2a2a2a2a3%3A0x1!2s10+rue+Pierre+Sarrazin%2C+95190+Goussainville%2C+France!5e0!3m2!1sen!2sfr!4v1"
                  allowFullScreen
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                />
                <span className="cp-map-label">📍 Goussainville · CDG Airport Area</span>
              </div>
            </div>

            {/* RIGHT: form */}
            <div className="cp-form-wrap cp-anim-4">
              <div className="cp-form">
                <h2 className="cp-form-title">Send us a message</h2>
                <p className="cp-form-sub">Fill in the form and we'll get back to you within the hour.</p>

                <div className="cp-field-row">
                  <div className="cp-field">
                    <label className="cp-label">First Name</label>
                    <input type="text" placeholder="Jean" className="cp-input" />
                  </div>
                  <div className="cp-field">
                    <label className="cp-label">Last Name</label>
                    <input type="text" placeholder="Dupont" className="cp-input" />
                  </div>
                </div>

                <div className="cp-field">
                  <label className="cp-label">Email Address</label>
                  <input type="email" placeholder="your@email.com" className="cp-input" />
                </div>

                <div className="cp-field">
                  <label className="cp-label">Phone / WhatsApp</label>
                  <input type="tel" placeholder="+33 6 00 00 00 00" className="cp-input" />
                </div>

                <div className="cp-field">
                  <label className="cp-label">Subject</label>
                  <select className="cp-input cp-select">
                    <option value="">Select a subject</option>
                    <option value="booking">New Booking</option>
                    <option value="quote">Request a Quote</option>
                    <option value="modify">Modify Existing Booking</option>
                    <option value="cancel">Cancellation</option>
                    <option value="other">General Enquiry</option>
                  </select>
                </div>

                <div className="cp-field">
                  <label className="cp-label">Message</label>
                  <textarea placeholder="Tell us about your transfer needs — pickup location, destination, date, number of passengers..." className="cp-input cp-textarea" />
                </div>

                <button type="submit" className="cp-submit">
                  <svg viewBox="0 0 24 24" fill="currentColor">
                    <path d="M2.01 21L23 12 2.01 3 2 10l15 2-15 2z"/>
                  </svg>
                  Send Message
                </button>

                <div className="cp-form-note">
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622z"/>
                  </svg>
                  We typically respond within 60 minutes · 24 / 7
                </div>
              </div>
            </div>

          </div>
        </div>

        {/* ── CTA STRIP ── */}
        <div className="cp-strip">
          <div className="cp-strip-inner">
            <div className="cp-strip-text">
              Ready to book your<br /><em>Paris transfer?</em>
            </div>
            <div className="cp-strip-ctas">
              <a href="/reservation" className="cp-strip-btn cp-strip-btn-primary">
                Book Now
              </a>
              <a href="https://wa.me/33652466694" target="_blank" rel="noopener noreferrer" className="cp-strip-btn cp-strip-btn-ghost">
                WhatsApp Us
              </a>
            </div>
          </div>
        </div>

      </div>
    </>
  );
}