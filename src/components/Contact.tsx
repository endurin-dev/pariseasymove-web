"use client";

export default function Contact() {
  const handlePhoneClick = () => {
    // ── Google Ads: Generate Lead (phone click) ──
    window.dataLayer = window.dataLayer || [];
    window.dataLayer.push({
      event: "generate_lead",
    });
    // ── End Google Ads ───────────────────────────
  };

  return (
    <section className="bg-navy text-white">
      <div className="max-w-5xl mx-auto px-6 text-center">
        <h2 className="text-4xl md:text-5xl font-bold mb-10 text-gold">
          Would you like to contact us?
        </h2>

        <p className="text-lg md:text-xl leading-relaxed max-w-4xl mx-auto mb-12">
          Connect with us and let's chat! Whether you're searching for <strong>cheap taxi services near me</strong>, need details about the <strong>cost of a taxi to the airport</strong>, or want to book a <strong>24/7 taxi service</strong>, we're here to help. Send us a message on your favorite social media platform, drop us an email, or call us directly to discuss your needs for <strong>Paris airport transfer</strong>, <strong>wheelchair taxi services near me</strong>, or private taxi service near me.
        </p>

        <p className="mb-8">
          Read more about{" "}
          <a
            href="https://en.wikipedia.org/wiki/Transport_in_Paris"
            className="text-gold hover:underline"
            target="_blank"
            rel="noopener noreferrer"
          >
            Transport in Paris
          </a>.
        </p>

        {/* ── Phone number fires generate_lead on click ── */}
        <a
          href="tel:+33652466694"
          className="text-4xl md:text-5xl font-bold text-gold hover:text-gold-light transition block mb-12"
          onClick={handlePhoneClick}
        >
          +33 6 52 46 66 94
        </a>

        <div className="flex justify-center gap-10 mb-12">
          <a href="#" aria-label="Facebook" className="text-4xl hover:text-gold transition">
            FB
          </a>
          <a href="#" aria-label="Instagram" className="text-4xl hover:text-gold transition">
            IG
          </a>
          <a href="#" aria-label="WhatsApp" className="text-4xl hover:text-gold transition">
            WA
          </a>
        </div>

        <p className="text-sm opacity-80">
          © {new Date().getFullYear()} Paris Easy Move – All rights reserved. |{" "}
          <a href="#" className="hover:text-gold">Privacy Policy</a>
        </p>
      </div>
    </section>
  );
}