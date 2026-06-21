"use client";

import Link from "next/link";

const PARKS = [
  {
    name: "Disneyland Park",
    tag: "Since 1992",
    desc: "The heart of the resort — five themed lands where iconic storytelling meets world-class attractions, anchored by the legendary Sleeping Beauty Castle.",
    lands: ["Main Street U.S.A.", "Fantasyland", "Adventureland", "Frontierland", "Discoveryland"],
    highlight: "Phantom Manor · Pirates of the Caribbean · Star Wars Hyperspace Mountain",
    img: "https://images.unsplash.com/photo-1759773999019-ff4a66522a36?q=80&w=1074&auto=format&fit=crop",
    num: "01",
  },
  {
    name: "Disney Adventure World",
    tag: "Rebranded 2025",
    desc: "Reimagined with a €2 billion transformation. Home to the breathtaking World of Frozen land and Avengers Campus — the resort's most ambitious chapter yet.",
    lands: ["World of Frozen", "Avengers Campus", "Worlds of Pixar", "Adventure Way", "World Premiere"],
    highlight: "Frozen Ever After · Avengers Assemble: Flight Force · Raiponce Tangled Spin",
    img: "https://images.unsplash.com/photo-1718870006030-d78d6c8f6297?q=80&w=1170&auto=format&fit=crop",
    num: "02",
  },
];

const NEWS = [
  {
    badge: "Open Now — January 2025",
    title: "Disney Tales of Magic",
    subtitle: "Nighttime Spectacular",
    desc: "An extraordinary nighttime show transforming Sleeping Beauty Castle with synchronized drones, pyrotechnics, fountain choreography, and an exclusive original soundtrack.",
    img: "https://images.unsplash.com/photo-1514525253161-7a46d19cd819?w=700&q=80",
  },
  {
    badge: "Open Now — March 2025",
    title: "Disney Adventure World",
    subtitle: "Park Rebranded",
    desc: "Walt Disney Studios Park officially relaunched as Disney Adventure World on March 29, 2025, unveiling the new World of Frozen land alongside Frozen Ever After.",
    img: "https://images.unsplash.com/photo-1478720568477-152d9b164e26?w=700&q=80",
  },
  {
    badge: "Open 2025",
    title: "Raiponce Tangled Spin",
    subtitle: "New Attraction",
    desc: "Guests board lantern-lit boats and drift beneath a canopy of floating lights while 'I See the Light' plays — a gentle, enchanting journey for all ages.",
    img: "https://images.unsplash.com/photo-1433838552652-f9a46b332c40?w=700&q=80",
  },
  {
    badge: "Coming — Fall 2025",
    title: "The Lion King World",
    subtitle: "Under Construction",
    desc: "Construction begins for the first-ever immersive Lion King land, featuring a signature log flume and state-of-the-art Audio-Animatronics of unprecedented scale.",
    img: "https://images.unsplash.com/photo-1647194104720-25d09b297910?q=80&w=1171&auto=format&fit=crop",
  },
];

const ATTRACTIONS = [
  { name: "Phantom Manor", type: "Dark Ride", thrill: "Mild", park: "Disneyland Park", desc: "Gothic storytelling at its finest — a masterclass in atmosphere and narrative that rivals any dark ride on earth.", img: "https://images.unsplash.com/photo-1508361001413-7a9dca21d08a?w=600&q=80" },
  { name: "Pirates of the Caribbean", type: "Boat Ride", thrill: "Mild", park: "Disneyland Park", desc: "The definitive boat ride experience — swashbuckling scenes, stunning animatronics, and a leisurely drop through living history.", img: "https://lumiere-a.akamaihd.net/v1/images/r_pirates_deadmentellnotales_standee_header_3b0fb228.jpeg?region=0,0,2048,640" },
  { name: "Big Thunder Mountain", type: "Coaster", thrill: "Moderate", park: "Disneyland Park", desc: "A mine train rollercoaster threading through dramatic red-rock canyon scenery — the self-proclaimed wildest ride in the wilderness.", img: "https://media.disneylandparis.com/d4th/en-int/images/n017799_2050jan01_big-thunder-mountain_16-9_tcm787-159525.jpg?w=640" },
  { name: "Star Wars Hyperspace Mountain", type: "Coaster", thrill: "Thrilling", park: "Disneyland Park", desc: "A high-velocity indoor coaster plunging guests into a Star Wars battle — loops, inversions, and projection mapping at full throttle.", img: "https://media.disneylandparis.com/d4th/en-usd/images/n025830_2024may09_world_discoveryland-starport-x-wings-spaceship_16-9_tcm1861-290858.jpg?w=980" },
  { name: "Frozen Ever After", type: "Boat Ride", thrill: "Mild", park: "Disney Adventure World", desc: "Sail through Arendelle in the centrepiece attraction of the new World of Frozen land — visually spectacular and emotionally resonant.", img: "https://media.disneylandparis.com/d4th/en-int/images/GU94518_2027dec31_world_HKDL-wof-frozen-ever-after-attraction_16-9_tcm787-291444.jpg?w=960" },
  { name: "Avengers Assemble: Flight Force", type: "Coaster", thrill: "Thrilling", park: "Disney Adventure World", desc: "A launch coaster reaching extreme speeds alongside Iron Man and Captain Marvel — the most intense ride in the resort.", img: "https://images.unsplash.com/photo-1635805737707-575885ab0820?w=600&q=80" },
  { name: "Crush's Coaster", type: "Coaster", thrill: "Moderate", park: "Disney Adventure World", desc: "A spinning coaster through an immersive underwater world inspired by Finding Nemo — deceptively thrilling and endlessly replayable.", img: "https://media.disneylandparis.com/d4th/en-gb/images/n018312_2050jan01_crushs-coaster-detail_16-9_tcm752-159257.jpg?w=240" },
  { name: "Buzz Lightyear Laser Blast", type: "Interactive", thrill: "Mild", park: "Disneyland Park", desc: "An interactive target-shooting adventure across the galaxy — competitive, fun, and infinitely repeatable across all ages.", img: "https://news.disneylandparis.com//app/uploads/2025/07/BUZZ-LIGHTYEAR_2-1-scaled.jpg" },
  { name: "Raiponce Tangled Spin", type: "Spinner", thrill: "Mild", park: "Disney Adventure World", desc: "Board a lantern boat and drift beneath a luminous canopy while 'I See the Light' plays — pure, unhurried enchantment.", img: "https://media.disneylandparis.com/d4th/en-usd/images/N042473_2032oct30_world_architecture-adventure-world_16-9_tcm1861-291523.jpg?w=960" },
];

const TIPS = [
  { label: "Timing", title: "Best Season to Visit", body: "Spring (April–May) and autumn (September–October) offer the most manageable crowds and comfortable temperatures. School holiday periods and summer peak season demand significantly more patience at queue lines.", icon: "M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" },
  { label: "Booking", title: "Reserve in Advance", body: "Tickets, Disney Hotel stays, and popular dining experiences should all be secured well ahead of travel. Last-minute availability is limited during busy periods and premium dates.", icon: "M17 9V7a5 5 0 00-10 0v2m-3 0h16a2 2 0 012 2v9a2 2 0 01-2 2H6a2 2 0 01-2-2v-9a2 2 0 012-2z" },
  { label: "Transit", title: "Getting to the Resort", body: "Both parks sit adjacent to each other, 32 km east of Paris. The RER A line connects central Paris to Marne-la-Vallée in approximately 40 minutes. Disney Hotel guests benefit from complimentary shuttle services.", icon: "M9 20l-5.447-2.724A1 1 0 013 16.382V5.618a1 1 0 011.447-.894L9 7m0 13l6-3m-6 3V7m6 10l4.553 2.276A1 1 0 0021 18.382V7.618a1 1 0 00-.553-.894L15 4m0 13V4m0 0L9 7" },
  { label: "Transfer", title: "Private Door-to-Door", body: "A private transfer from your Paris hotel or airport eliminates the complexity of RER navigation with luggage and children. Fixed pricing, real-time flight tracking, and complimentary child seats included.", icon: "M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" },
];

const ROUTES = [
  { from: "CDG Airport", to: "Disneyland Paris", pax: "Up to 3 passengers" },
  { from: "Orly Airport", to: "Disneyland Paris", pax: "Up to 3 passengers" },
  { from: "Paris City Centre", to: "Disneyland Paris", pax: "Up to 3 passengers" },
  { from: "Beauvais Airport", to: "Disneyland Paris", pax: "Up to 3 passengers" },
];

export default function DisneylandParis() {
  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,400;0,600;0,700;1,400;1,600;1,700&family=DM+Sans:wght@400;500;600;700&display=swap');

        :root {
          --ink: #0F0E0C;
          --ink-soft: #3A3731;
          --ink-muted: #7A7468;
          --paper: #F7F4EF;
          --paper-warm: #F0EDE6;
          --white: #FFFFFF;
          --gold: #B8965A;
          --gold-light: #D4B483;
          --gold-pale: #F2E8D5;
          --rule: #E2DDD6;
          --display: 'Cormorant Garamond', Georgia, serif;
          --body: 'DM Sans', system-ui, sans-serif;
        }

        .dp { background: var(--paper); font-family: var(--body); color: var(--ink); }
        .dp * { box-sizing: border-box; margin: 0; padding: 0; }
        .dp img { display: block; }
        .dp a { text-decoration: none; color: inherit; }

        /* ─── HERO ─── */
        .dp-hero {
          min-height: 100vh;
          display: grid;
          grid-template-columns: 1fr 1fr;
          position: relative;
          overflow: hidden;
        }
        @media (max-width: 900px) { .dp-hero { grid-template-columns: 1fr; min-height: auto; } }

        .dp-hero-left {
          background: var(--ink);
          display: flex; flex-direction: column;
          justify-content: flex-end;
          padding: 64px 56px;
          position: relative;
          overflow: hidden;
        }

        .dp-hero-img-bg {
          position: absolute; inset: 0;
          background: url('https://images.unsplash.com/photo-1759773999019-ff4a66522a36?q=80&w=1074&auto=format&fit=crop') center/cover no-repeat;
          opacity: 0.22;
        }

        .dp-hero-left-content { position: relative; z-index: 2; }

        .dp-hero-eyebrow {
          display: flex; align-items: center; gap: 12px;
          margin-bottom: 32px;
        }
        .dp-hero-eyebrow-line { width: 32px; height: 1px; background: var(--gold); }
        .dp-hero-eyebrow-text {
          font-family: var(--body); font-size: 10px; font-weight: 500;
          letter-spacing: 0.22em; text-transform: uppercase; color: var(--gold);
        }

        .dp-hero-title {
          font-family: var(--display);
          font-size: clamp(4rem, 7vw, 7rem);
          font-weight: 700; line-height: 0.92;
          color: var(--white);
          margin-bottom: 8px;
          letter-spacing: -0.01em;
        }
        .dp-hero-title em { font-style: italic; color: var(--gold-light); }

        .dp-hero-subtitle {
          font-family: var(--display);
          font-size: clamp(1.5rem, 2.5vw, 2.2rem);
          font-weight: 400; font-style: italic;
          color: rgba(255,255,255,0.7);
          margin-bottom: 40px;
          letter-spacing: 0.04em;
        }

        .dp-hero-desc {
          font-size: 14px; font-weight: 400; line-height: 1.85;
          color: rgba(255,255,255,0.72); max-width: 380px; margin-bottom: 44px;
          letter-spacing: 0.01em;
        }

        .dp-hero-btns { display: flex; gap: 12px; flex-wrap: wrap; }

        .dp-hero-right {
          background: var(--ink);
          display: flex; flex-direction: column;
          position: relative;
        }

        .dp-hero-right-img {
          flex: 1; min-height: 300px;
          overflow: hidden; position: relative;
        }
        .dp-hero-right-img img {
          width: 100%; height: 100%; object-fit: cover;
          animation: dp-kenburns 14s ease-in-out infinite alternate;
          transform-origin: center center;
          filter: saturate(0.85) contrast(1.08);
        }
        @keyframes dp-kenburns {
          0% { transform: scale(1.08) translate(0px, 0px); }
          100% { transform: scale(1.18) translate(-20px, -10px); }
        }
        .dp-hero-right-img-overlay {
          position: absolute; inset: 0;
          background:
            linear-gradient(to bottom, rgba(15,14,12,0.15) 0%, transparent 30%, transparent 55%, rgba(15,14,12,0.72) 100%),
            linear-gradient(to right, rgba(15,14,12,0.35) 0%, transparent 40%);
        }
        .dp-hero-right-label {
          position: absolute; bottom: 32px; left: 36px; right: 36px;
          z-index: 2;
        }
        .dp-hero-right-label-eyebrow {
          font-size: 8.5px; font-weight: 600; letter-spacing: 0.28em; text-transform: uppercase;
          color: var(--gold); margin-bottom: 8px; display: block;
        }
        .dp-hero-right-label-title {
          font-family: var(--display);
          font-size: 1.9rem; font-weight: 600; line-height: 1.1;
          color: var(--white);
        }
        .dp-hero-right-label-sub {
          font-family: var(--display);
          font-size: 1rem; font-style: italic; font-weight: 400;
          color: rgba(255,255,255,0.6); margin-top: 4px;
        }

        .dp-hero-stats {
          padding: 36px 48px;
          display: grid; grid-template-columns: 1fr 1fr 1fr;
          background: var(--ink);
          border-top: 1px solid rgba(255,255,255,0.08);
        }
        .dp-hero-stat {
          padding: 0 20px;
          border-right: 1px solid rgba(255,255,255,0.08);
          text-align: center;
        }
        .dp-hero-stat:first-child { padding-left: 0; }
        .dp-hero-stat:last-child { border-right: none; padding-right: 0; }
        .dp-hero-stat-val {
          font-family: var(--display);
          font-size: 2.6rem; font-weight: 600;
          color: var(--white); line-height: 1; margin-bottom: 6px;
        }
        .dp-hero-stat-lbl {
          font-size: 9px; font-weight: 600; letter-spacing: 0.2em; text-transform: uppercase;
          color: rgba(255,255,255,0.38);
        }

        /* ─── SECTION SHARED ─── */
        .dp-wrap { padding: 100px 6vw; }
        .dp-wrap-dark { background: var(--ink); padding: 100px 6vw; }
        .dp-wrap-warm { background: var(--paper-warm); padding: 100px 6vw; }
        .dp-inner { max-width: 1240px; margin: 0 auto; }

        .dp-section-header { margin-bottom: 64px; }
        .dp-kicker {
          display: flex; align-items: center; gap: 14px; margin-bottom: 20px;
        }
        .dp-kicker-num {
          font-family: var(--display);
          font-size: 11px; font-weight: 400; letter-spacing: 0.06em;
          color: var(--gold);
        }
        .dp-kicker-line { flex: 1; max-width: 40px; height: 1px; background: var(--gold); }
        .dp-kicker-text {
          font-size: 10px; font-weight: 600; letter-spacing: 0.24em; text-transform: uppercase;
          color: var(--ink-muted);
        }
        .dp-kicker-text-light { color: rgba(255,255,255,0.55); }

        .dp-section-title {
          font-family: var(--display);
          font-size: clamp(2.8rem, 5vw, 5rem);
          font-weight: 700; line-height: 1.02; letter-spacing: -0.01em;
          color: var(--ink);
        }
        .dp-section-title em { font-style: italic; color: var(--gold); font-weight: 600; }
        .dp-section-title-light { color: var(--white); }
        .dp-section-title-light em { color: var(--gold-light); }

        .dp-section-sub {
          font-size: 15px; font-weight: 400; line-height: 1.9;
          color: var(--ink-soft); max-width: 520px; margin-top: 18px;
        }
        .dp-section-sub-light { color: rgba(255,255,255,0.62); }

        /* ─── BUTTONS ─── */
        .dp-btn {
          display: inline-flex; align-items: center; gap: 8px;
          padding: 14px 28px;
          font-family: var(--body); font-size: 11px; font-weight: 500; letter-spacing: 0.14em; text-transform: uppercase;
          cursor: pointer; border: none; transition: all 0.28s;
          white-space: nowrap; text-decoration: none;
        }
        .dp-btn-gold {
          background: var(--gold); color: var(--white);
        }
        .dp-btn-gold:hover { background: #A0824A; }
        .dp-btn-outline-white {
          background: transparent; color: var(--white);
          border: 1px solid rgba(255,255,255,0.3);
        }
        .dp-btn-outline-white:hover { border-color: rgba(255,255,255,0.7); background: rgba(255,255,255,0.06); }
        .dp-btn-outline-ink {
          background: transparent; color: var(--ink);
          border: 1px solid rgba(0,0,0,0.18);
        }
        .dp-btn-outline-ink:hover { border-color: var(--ink); }

        /* ─── RULE ─── */
        .dp-rule { border: none; border-top: 1px solid var(--rule); }
        .dp-rule-dark { border: none; border-top: 1px solid rgba(255,255,255,0.08); }

        /* ─── PARKS ─── */
        .dp-parks-grid { display: grid; grid-template-columns: 1fr 1fr; gap: 2px; }
        @media (max-width: 800px) { .dp-parks-grid { grid-template-columns: 1fr; } }

        .dp-park-card {
          background: var(--white);
          position: relative; overflow: hidden;
        }
        .dp-park-img-wrap { position: relative; overflow: hidden; height: 340px; }
        .dp-park-img { width: 100%; height: 100%; object-fit: cover; transition: transform 0.8s cubic-bezier(0.25,0.1,0.25,1); }
        .dp-park-card:hover .dp-park-img { transform: scale(1.04); }
        .dp-park-num {
          position: absolute; bottom: 16px; left: 20px;
          font-family: var(--display); font-size: 60px; font-weight: 300;
          color: rgba(255,255,255,0.18); line-height: 1; letter-spacing: -0.02em;
          pointer-events: none;
        }
        .dp-park-body { padding: 36px 36px 40px; border-top: 1px solid var(--rule); }
        .dp-park-year {
          font-size: 9px; font-weight: 500; letter-spacing: 0.22em; text-transform: uppercase;
          color: var(--gold); margin-bottom: 14px;
        }
        .dp-park-name {
          font-family: var(--display);
          font-size: 2rem; font-weight: 700; line-height: 1.1;
          color: var(--ink); margin-bottom: 14px;
        }
        .dp-park-desc {
          font-size: 14px; font-weight: 400; line-height: 1.85;
          color: var(--ink-soft); margin-bottom: 24px;
        }
        .dp-park-lands { display: flex; flex-wrap: wrap; gap: 6px; margin-bottom: 20px; }
        .dp-land-pill {
          padding: 5px 14px;
          border: 1px solid var(--rule); background: var(--paper);
          font-size: 9.5px; font-weight: 500; letter-spacing: 0.1em; text-transform: uppercase;
          color: var(--ink-soft);
        }
        .dp-park-highlight {
          font-size: 11px; font-weight: 400; line-height: 1.7;
          color: var(--ink-muted);
          padding-top: 20px; border-top: 1px solid var(--rule);
          letter-spacing: 0.02em;
        }

        /* ─── NEWS ─── */
        .dp-news-grid {
          display: grid; grid-template-columns: 1fr 1fr;
          gap: 1px; background: var(--rule);
        }
        @media (max-width: 760px) { .dp-news-grid { grid-template-columns: 1fr; } }

        .dp-news-card {
          background: var(--white);
          display: flex; flex-direction: column;
          transition: background 0.2s;
        }
        .dp-news-card:hover { background: #FEFCF9; }
        .dp-news-img-wrap { overflow: hidden; height: 200px; }
        .dp-news-img { width: 100%; height: 100%; object-fit: cover; transition: transform 0.7s cubic-bezier(0.25,0.1,0.25,1); }
        .dp-news-card:hover .dp-news-img { transform: scale(1.04); }
        .dp-news-body { padding: 28px 32px 32px; flex: 1; }
        .dp-news-badge {
          font-size: 9px; font-weight: 600; letter-spacing: 0.22em; text-transform: uppercase;
          color: var(--gold); margin-bottom: 12px; display: block;
        }
        .dp-news-title {
          font-family: var(--display);
          font-size: 1.6rem; font-weight: 700; line-height: 1.1;
          color: var(--ink); margin-bottom: 4px;
        }
        .dp-news-subtitle {
          font-family: var(--display);
          font-size: 1rem; font-weight: 400; font-style: italic;
          color: var(--ink-muted); margin-bottom: 16px;
        }
        .dp-news-desc {
          font-size: 13px; font-weight: 400; line-height: 1.85; color: var(--ink-soft);
        }

        /* ─── ATTRACTIONS ─── */
        .dp-attr-grid {
          display: grid; grid-template-columns: repeat(3, 1fr);
          gap: 1px; background: rgba(255,255,255,0.06);
        }
        @media (max-width: 900px) { .dp-attr-grid { grid-template-columns: 1fr 1fr; } }
        @media (max-width: 560px) { .dp-attr-grid { grid-template-columns: 1fr; } }

        .dp-attr-card {
          background: rgba(255,255,255,0.03);
          padding: 0; overflow: hidden;
          transition: background 0.25s;
        }
        .dp-attr-card:hover { background: rgba(255,255,255,0.06); }
        .dp-attr-img-wrap { overflow: hidden; height: 160px; position: relative; }
        .dp-attr-img { width: 100%; height: 100%; object-fit: cover; transition: transform 0.7s; opacity: 0.75; }
        .dp-attr-card:hover .dp-attr-img { transform: scale(1.05); opacity: 0.9; }
        .dp-attr-body { padding: 22px 24px 26px; }
        .dp-attr-top { display: flex; align-items: center; justify-content: space-between; margin-bottom: 10px; }
        .dp-attr-type { font-size: 8.5px; font-weight: 500; letter-spacing: 0.2em; text-transform: uppercase; color: var(--gold); }
        .dp-attr-thrill {
          padding: 3px 10px; border: 1px solid;
          font-size: 8px; font-weight: 500; letter-spacing: 0.14em; text-transform: uppercase;
        }
        .dp-thrill-Mild { border-color: rgba(255,255,255,0.15); color: rgba(255,255,255,0.35); }
        .dp-thrill-Moderate { border-color: rgba(184,150,90,0.4); color: var(--gold); }
        .dp-thrill-Thrilling { border-color: rgba(255,255,255,0.4); color: var(--white); }
        .dp-attr-name {
          font-family: var(--display);
          font-size: 1.35rem; font-weight: 700; line-height: 1.15;
          color: var(--white); margin-bottom: 10px;
        }
        .dp-attr-desc { font-size: 12.5px; font-weight: 400; line-height: 1.8; color: rgba(255,255,255,0.6); }
        .dp-attr-park {
          margin-top: 14px; padding-top: 12px; border-top: 1px solid rgba(255,255,255,0.07);
          font-size: 9px; font-weight: 500; letter-spacing: 0.14em; text-transform: uppercase;
          color: rgba(255,255,255,0.25);
        }

        /* ─── TRANSFER ─── */
        .dp-transfer-layout {
          display: grid; grid-template-columns: 1fr 1fr;
          gap: 80px; align-items: start;
        }
        @media (max-width: 860px) { .dp-transfer-layout { grid-template-columns: 1fr; gap: 48px; } }

        .dp-transfer-title {
          font-family: var(--display);
          font-size: clamp(2.2rem, 4vw, 3.6rem);
          font-weight: 700; line-height: 1.08; letter-spacing: -0.01em;
          color: var(--ink); margin-bottom: 18px;
        }
        .dp-transfer-title em { font-style: italic; color: var(--gold); font-weight: 600; }
        .dp-transfer-desc {
          font-size: 14px; font-weight: 400; line-height: 1.9;
          color: var(--ink-soft); margin-bottom: 36px;
        }
        .dp-transfer-features { display: flex; flex-direction: column; gap: 12px; margin-bottom: 40px; }
        .dp-transfer-feature {
          display: flex; align-items: center; gap: 14px;
        }
        .dp-transfer-feature-dot { width: 4px; height: 4px; border-radius: 50%; background: var(--gold); flex-shrink: 0; }
        .dp-transfer-feature-text { font-size: 12.5px; font-weight: 400; color: var(--ink-soft); }

        .dp-routes { display: flex; flex-direction: column; }
        .dp-route {
          display: flex; align-items: center; justify-content: space-between;
          padding: 22px 0;
          border-bottom: 1px solid var(--rule);
          transition: all 0.2s;
          cursor: pointer;
        }
        .dp-route:first-child { border-top: 1px solid var(--rule); }
        .dp-route:hover { padding-left: 6px; }
        .dp-route-left {}
        .dp-route-name {
          font-family: var(--display);
          font-size: 1.2rem; font-weight: 600; color: var(--ink);
          margin-bottom: 4px; display: flex; align-items: center; gap: 10px;
        }
        .dp-route-arrow { font-size: 0.9rem; color: var(--gold); }
        .dp-route-pax { font-size: 10px; font-weight: 400; letter-spacing: 0.08em; color: var(--ink-muted); }
        .dp-route-price {
          font-family: var(--display);
          font-size: 1.4rem; font-weight: 300; color: var(--ink); white-space: nowrap;
        }

        /* ─── TIPS ─── */
        .dp-tips-grid {
          display: grid; grid-template-columns: 1fr 1fr;
          gap: 1px; background: rgba(255,255,255,0.06);
        }
        @media (max-width: 640px) { .dp-tips-grid { grid-template-columns: 1fr; } }

        .dp-tip {
          background: rgba(255,255,255,0.02);
          padding: 40px;
          transition: background 0.2s;
        }
        .dp-tip:hover { background: rgba(255,255,255,0.05); }
        .dp-tip-label {
          font-size: 9px; font-weight: 600; letter-spacing: 0.24em; text-transform: uppercase;
          color: var(--gold); margin-bottom: 16px;
        }
        .dp-tip-title {
          font-family: var(--display);
          font-size: 1.45rem; font-weight: 700; color: var(--white);
          margin-bottom: 14px; line-height: 1.15;
        }
        .dp-tip-body {
          font-size: 13px; font-weight: 400; line-height: 1.85; color: rgba(255,255,255,0.6);
        }

        /* ─── FOOTER CTA ─── */
        .dp-footer-cta {
          background: var(--ink);
          padding: 90px 6vw;
          position: relative; overflow: hidden;
        }
        .dp-footer-cta-inner {
          max-width: 1240px; margin: 0 auto;
          display: flex; align-items: center; justify-content: space-between;
          flex-wrap: wrap; gap: 40px;
        }
        .dp-footer-cta-title {
          font-family: var(--display);
          font-size: clamp(2rem, 4vw, 3.2rem);
          font-weight: 700; color: var(--white); line-height: 1.1;
        }
        .dp-footer-cta-title em { font-style: italic; color: var(--gold-light); font-weight: 600; }

        .dp-footer-btns { display: flex; gap: 12px; flex-wrap: wrap; }

        /* ─── DIVIDER ─── */
        .dp-editorial-divider {
          display: flex; align-items: center; gap: 0;
          padding: 0 6vw;
        }
        .dp-ed-line { flex: 1; height: 1px; background: var(--rule); }
        .dp-ed-text {
          padding: 0 24px;
          font-family: var(--display);
          font-size: 11px; font-style: italic; font-weight: 300;
          color: var(--ink-muted); letter-spacing: 0.1em;
        }

        /* ANIMATIONS */
        @keyframes dp-fade { from { opacity: 0; transform: translateY(16px); } to { opacity: 1; transform: translateY(0); } }
        .dp-hero-left-content > * { animation: dp-fade 0.7s ease both; }
        .dp-hero-left-content > *:nth-child(1) { animation-delay: 0.1s; }
        .dp-hero-left-content > *:nth-child(2) { animation-delay: 0.25s; }
        .dp-hero-left-content > *:nth-child(3) { animation-delay: 0.35s; }
        .dp-hero-left-content > *:nth-child(4) { animation-delay: 0.45s; }
        .dp-hero-left-content > *:nth-child(5) { animation-delay: 0.55s; }
      `}</style>

      <div className="dp">

        {/* ── HERO ── */}
        <div className="dp-hero">
          <div className="dp-hero-left">
            <div className="dp-hero-img-bg" />
            <div className="dp-hero-left-content">
              <div className="dp-hero-eyebrow">
                <div className="dp-hero-eyebrow-line" />
                <div className="dp-hero-eyebrow-text">Destination Guide — Europe&apos;s Premier Resort</div>
              </div>
              <h1 className="dp-hero-title">
                Disneyland<br /><em>Paris</em>
              </h1>
              <p className="dp-hero-subtitle">Marne-la-Vallée, France</p>
              <p className="dp-hero-desc">
                Thirty-two kilometres east of Paris, the continent&apos;s most-visited theme park resort is in the midst of its most ambitious transformation — two iconic parks, seven hotels, and a €2 billion reinvention.
              </p>
              <div className="dp-hero-btns">
                <Link href="/reservation" className="dp-btn dp-btn-gold">Book a Transfer</Link>
           <a
  href="https://wa.me/33652466694"
  target="_blank"
  rel="noopener noreferrer"
  className="dp-btn dp-btn-whatsapp"
  style={{
    color: "#fff",
    border: "2px solid #fff",
    borderRadius: "8px",
    padding: "10px 20px",
  }}
>
  WhatsApp Us
</a>
              </div>
            </div>
          </div>
          <div className="dp-hero-right">
            <div className="dp-hero-right-img">
              <img src="https://images.unsplash.com/photo-1599076978500-38f6ba2ccd97?q=80&w=1170&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" alt="Disney Adventure World" />
              <div className="dp-hero-right-img-overlay" />
              <div className="dp-hero-right-label">
                <span className="dp-hero-right-label-eyebrow">Now Open — 2025</span>
                <div className="dp-hero-right-label-title">Disney Adventure World</div>
                <div className="dp-hero-right-label-sub">World of Frozen · Avengers Campus</div>
              </div>
            </div>
            <div className="dp-hero-stats">
              <div className="dp-hero-stat">
                <div className="dp-hero-stat-val">2</div>
                <div className="dp-hero-stat-lbl">Theme Parks</div>
              </div>
              <div className="dp-hero-stat">
                <div className="dp-hero-stat-val">7</div>
                <div className="dp-hero-stat-lbl">Disney Hotels</div>
              </div>
              <div className="dp-hero-stat">
                <div className="dp-hero-stat-val">€2B</div>
                <div className="dp-hero-stat-lbl">Transformation</div>
              </div>
            </div>
          </div>
        </div>

        {/* ── PARKS ── */}
        <div className="dp-wrap" style={{ paddingTop: 80, paddingBottom: 0 }}>
          <div className="dp-inner">
            <div className="dp-section-header">
              <div className="dp-kicker">
                <span className="dp-kicker-num">§ 01</span>
                <div className="dp-kicker-line" />
                <span className="dp-kicker-text">Two Worlds of Magic</span>
              </div>
              <h2 className="dp-section-title">The <em>Parks</em></h2>
              <p className="dp-section-sub">Two distinct destinations sitting side by side — from timeless fairytale grandeur to the most forward-looking land in the resort&apos;s history.</p>
            </div>
          </div>
        </div>
        <div style={{ maxWidth: 1240, margin: "0 auto", padding: "0 6vw 80px" }}>
          <div className="dp-parks-grid">
            {PARKS.map((p, i) => (
              <div key={i} className="dp-park-card">
                <div className="dp-park-img-wrap">
                  <img src={p.img} alt={p.name} className="dp-park-img" />
                  <div className="dp-park-num">{p.num}</div>
                </div>
                <div className="dp-park-body">
                  <div className="dp-park-year">{p.tag}</div>
                  <h3 className="dp-park-name">{p.name}</h3>
                  <p className="dp-park-desc">{p.desc}</p>
                  <div className="dp-park-lands">{p.lands.map(l => <span key={l} className="dp-land-pill">{l}</span>)}</div>
                  <div className="dp-park-highlight">{p.highlight}</div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* ── EDITORIAL DIVIDER ── */}
        <div className="dp-editorial-divider">
          <div className="dp-ed-line" />
          <div className="dp-ed-text">What&apos;s new at the resort</div>
          <div className="dp-ed-line" />
        </div>

        {/* ── NEWS ── */}
        <div className="dp-wrap dp-wrap-warm">
          <div className="dp-inner">
            <div className="dp-section-header">
              <div className="dp-kicker">
                <span className="dp-kicker-num">§ 02</span>
                <div className="dp-kicker-line" />
                <span className="dp-kicker-text">Resort News & Openings</span>
              </div>
              <h2 className="dp-section-title">Latest <em>Additions</em></h2>
              <p className="dp-section-sub">Disneyland Paris is mid-transformation. Here is everything that has opened recently — and what is coming next.</p>
            </div>
            <div className="dp-news-grid">
              {NEWS.map((n, i) => (
                <div key={i} className="dp-news-card">
                  <div className="dp-news-img-wrap">
                    <img src={n.img} alt={n.title} className="dp-news-img" />
                  </div>
                  <div className="dp-news-body">
                    <span className="dp-news-badge">{n.badge}</span>
                    <h3 className="dp-news-title">{n.title}</h3>
                    <div className="dp-news-subtitle">{n.subtitle}</div>
                    <p className="dp-news-desc">{n.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* ── ATTRACTIONS ── */}
        <div className="dp-wrap-dark">
          <div className="dp-inner">
            <div className="dp-section-header">
              <div className="dp-kicker">
                <span className="dp-kicker-num" style={{ color: "var(--gold)" }}>§ 03</span>
                <div className="dp-kicker-line" />
                <span className="dp-kicker-text dp-kicker-text-light">Essential Attractions</span>
              </div>
              <h2 className="dp-section-title dp-section-title-light">Must-Do <em>Rides</em></h2>
              <p className="dp-section-sub dp-section-sub-light">From classic dark rides to high-velocity coasters — the attractions that define a visit to the resort.</p>
            </div>
            <div className="dp-attr-grid">
              {ATTRACTIONS.map((a, i) => (
                <div key={i} className="dp-attr-card">
                  <div className="dp-attr-img-wrap">
                    <img src={a.img} alt={a.name} className="dp-attr-img" />
                  </div>
                  <div className="dp-attr-body">
                    <div className="dp-attr-top">
                      <div className="dp-attr-type">{a.type}</div>
                      <div className={`dp-attr-thrill dp-thrill-${a.thrill}`}>{a.thrill}</div>
                    </div>
                    <div className="dp-attr-name">{a.name}</div>
                    <div className="dp-attr-desc">{a.desc}</div>
                    <div className="dp-attr-park">{a.park}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* ── TRANSFER ── */}
        <div className="dp-wrap">
          <div className="dp-inner">
            <div className="dp-transfer-layout">
              <div>
                <div className="dp-kicker" style={{ marginBottom: 20 }}>
                  <span className="dp-kicker-num">§ 04</span>
                  <div className="dp-kicker-line" />
                  <span className="dp-kicker-text">Private Transfer Service</span>
                </div>
                <h2 className="dp-transfer-title">The <em>intelligent</em> way to arrive</h2>
                <p className="dp-transfer-desc">Avoid the complexity of RER navigation with luggage and children. Our private door-to-door transfers deliver you directly from airport or hotel to the resort entrance — relaxed, on time, and ready.</p>
                <div className="dp-transfer-features">
                  {["Fixed pricing — no hidden charges", "Real-time flight tracking included", "Complimentary child seats provided", "Meet & greet at arrivals hall"].map(f => (
                    <div key={f} className="dp-transfer-feature">
                      <div className="dp-transfer-feature-dot" />
                      <div className="dp-transfer-feature-text">{f}</div>
                    </div>
                  ))}
                </div>
                <div style={{ display: "flex", gap: 12, flexWrap: "wrap" }}>
                  <Link href="/reservation" className="dp-btn dp-btn-gold">Book a Transfer</Link>
                  <Link href="/rates" className="dp-btn dp-btn-outline-ink">All Rates</Link>
                </div>
              </div>
              <div>
                <div className="dp-routes">
                  {ROUTES.map((r, i) => (
                    <div key={i} className="dp-route">
                      <div className="dp-route-left">
                        <div className="dp-route-name">
                          {r.from} <span className="dp-route-arrow">→</span> {r.to}
                        </div>
                        <div className="dp-route-pax">{r.pax}</div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* ── TIPS ── */}
        <div className="dp-wrap-dark" style={{ paddingTop: 80, paddingBottom: 80 }}>
          <div className="dp-inner">
            <div className="dp-section-header">
              <div className="dp-kicker">
                <span className="dp-kicker-num" style={{ color: "var(--gold)" }}>§ 05</span>
                <div className="dp-kicker-line" />
                <span className="dp-kicker-text dp-kicker-text-light">Visitor Intelligence</span>
              </div>
              <h2 className="dp-section-title dp-section-title-light">Planning <em>Notes</em></h2>
              <p className="dp-section-sub dp-section-sub-light">What to know before you travel — curated from experience, not guesswork.</p>
            </div>
            <div className="dp-tips-grid">
              {TIPS.map((t, i) => (
                <div key={i} className="dp-tip">
                  <div className="dp-tip-label">{t.label}</div>
                  <h3 className="dp-tip-title">{t.title}</h3>
                  <p className="dp-tip-body">{t.body}</p>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* ── FOOTER CTA ── */}
        <div className="dp-footer-cta">
          <div className="dp-footer-cta-inner">
            <div className="dp-footer-cta-title">
              Ready to plan your<br /><em>Disneyland Paris</em> visit?
            </div>
            <div className="dp-footer-btns">
              <Link href="/reservation" className="dp-btn dp-btn-gold">Book Your Transfer</Link>
              <a
  href="https://wa.me/33652466694"
  target="_blank"
  rel="noopener noreferrer"
  className="dp-btn dp-btn-outline-white"
  style={{ color: "#fff" }}
>
  WhatsApp Us
</a>
            </div>
          </div>
        </div>

      </div>
    </>
  );
}