"use client";

import Link from "next/link";

const PARKS = [
  {
    name: "Disneyland Park",
    tag: "The Original ✨",
    desc: "The heart of the resort — five uniquely themed lands where fairytales come alive beneath the iconic Sleeping Beauty Castle!",
    lands: ["Main Street U.S.A.", "Fantasyland", "Adventureland", "Frontierland", "Discoveryland"],
    highlight: "Phantom Manor · Pirates of the Caribbean · Star Wars Hyperspace Mountain",
    img: "https://images.unsplash.com/photo-1759773999019-ff4a66522a36?q=80&w=1074&auto=format&fit=crop",
    emoji: "🏰",
    color: "#FF6B9D",
  },
  {
    name: "Disney Adventure World",
    tag: "Rebranded 2025 🌟",
    desc: "Reimagined with a €2 billion transformation. Home to the breathtaking new World of Frozen land — let it gooo!",
    lands: ["World of Frozen", "Avengers Campus", "Worlds of Pixar", "Adventure Way", "World Premiere"],
    highlight: "Frozen Ever After · Avengers Assemble: Flight Force · Raiponce Tangled Spin",
    img: "https://images.unsplash.com/photo-1718870006030-d78d6c8f6297?q=80&w=1170&auto=format&fit=crop",
    emoji: "🚀",
    color: "#4ECDC4",
  },
];

const NEWS = [
  {
    badge: "Open Now · 2025",
    title: "Disney Tales of Magic — Nighttime Spectacular ✨",
    desc: "Launched January 2025, this breathtaking show transforms Sleeping Beauty Castle with drones, pyrotechnics, fountain displays and an exclusive soundtrack.",
    img: "https://images.unsplash.com/photo-1514525253161-7a46d19cd819?w=700&q=80",
    emoji: "🎆",
    color: "#FF6B9D",
  },
  {
    badge: "Open Now · March 2025",
    title: "Disney Adventure World — Park Rebranded 🌍",
    desc: "Walt Disney Studios Park officially became Disney Adventure World on March 29, 2025, launching the new World of Frozen land with Frozen Ever After.",
    img: "https://images.unsplash.com/photo-1478720568477-152d9b164e26?w=700&q=80",
    emoji: "❄️",
    color: "#4ECDC4",
  },
  {
    badge: "Open 2025",
    title: "Raiponce Tangled Spin 🏮",
    desc: "A brand-new attraction inspired by Tangled — guests board boats and whirl beneath floating lanterns while 'I See the Light' plays.",
    img: "https://images.unsplash.com/photo-1433838552652-f9a46b332c40?w=700&q=80",
    emoji: "🚤",
    color: "#FFD93D",
  },
  {
    badge: "Coming Soon 🔨",
    title: "The Lion King World & Up Ride",
    desc: "Construction begins Fall 2025 for the first-ever immersive Lion King land, featuring a massive log flume and state-of-the-art Audio-Animatronics.",
    img: "https://images.unsplash.com/photo-1647194104720-25d09b297910?q=80&w=1171&auto=format&fit=crop",
    emoji: "🦁",
    color: "#FF8C42",
  },
];

const ATTRACTIONS = [
  { name: "Phantom Manor", type: "Classic", thrill: "Mild", park: "Disneyland Park", desc: "A haunted mansion steeped in gothic storytelling — one of the best dark rides in the world.", img: "https://images.unsplash.com/photo-1508361001413-7a9dca21d08a?w=600&q=80", emoji: "👻" },
  { name: "Pirates of the Caribbean", type: "Classic", thrill: "Mild", park: "Disneyland Park", desc: "Iconic boat ride through swashbuckling scenes with stunning animatronics and drops.", img: "https://lumiere-a.akamaihd.net/v1/images/r_pirates_deadmentellnotales_standee_header_3b0fb228.jpeg?region=0,0,2048,640", emoji: "🏴‍☠️" },
  { name: "Big Thunder Mountain", type: "Coaster", thrill: "Moderate", park: "Disneyland Park", desc: "A wildest ride in the wilderness mine train rollercoaster through a rugged red-rock canyon.", img: "https://media.disneylandparis.com/d4th/en-int/images/n017799_2050jan01_big-thunder-mountain_16-9_tcm787-159525.jpg?w=640", emoji: "⛰️" },
  { name: "Star Wars Hyperspace Mountain", type: "Coaster", thrill: "Thrilling", park: "Disneyland Park", desc: "High-speed indoor coaster set in the Star Wars universe with loops and stunning projections.", img: "https://media.disneylandparis.com/d4th/en-usd/images/n025830_2024may09_world_discoveryland-starport-x-wings-spaceship_16-9_tcm1861-290858.jpg?w=980", emoji: "⭐" },
  { name: "Frozen Ever After", type: "Boat Ride", thrill: "Mild", park: "Disney Adventure World", desc: "Sail through Arendelle's most beloved moments in the visually stunning World of Frozen land.", img: "https://media.disneylandparis.com/d4th/en-int/images/GU94518_2027dec31_world_HKDL-wof-frozen-ever-after-attraction_16-9_tcm787-291444.jpg?w=960", emoji: "❄️" },
  { name: "Avengers Assemble: Flight Force", type: "Coaster", thrill: "Thrilling", park: "Disney Adventure World", desc: "A high-speed launch coaster with Iron Man and Captain Marvel at Avengers Campus.", img: "https://images.unsplash.com/photo-1635805737707-575885ab0820?w=600&q=80", emoji: "🦸" },
  { name: "Crush's Coaster", type: "Coaster", thrill: "Moderate", park: "Disney Adventure World", desc: "Spinning coaster through an underwater adventure inspired by Finding Nemo.", img: "https://media.disneylandparis.com/d4th/en-gb/images/n018312_2050jan01_crushs-coaster-detail_16-9_tcm752-159257.jpg?w=240", emoji: "🐢" },
  { name: "Raiponce Tangled Spin", type: "Spinner", thrill: "Mild", park: "Disney Adventure World", desc: "Whirl beneath floating lanterns on boats while 'I See the Light' fills the air — pure magic.", img: "https://media.disneylandparis.com/d4th/en-usd/images/N042473_2032oct30_world_architecture-adventure-world_16-9_tcm1861-291523.jpg?w=960", emoji: "🏮" },
  { name: "Buzz Lightyear Laser Blast", type: "Interactive", thrill: "Mild", park: "Disneyland Park", desc: "Shoot targets to help Buzz defeat Emperor Zurg — great for all ages and friendly competition.", img: "https://news.disneylandparis.com//app/uploads/2025/07/BUZZ-LIGHTYEAR_2-1-scaled.jpg", emoji: "🚀" },
];

const TIPS = [
  { icon: "M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z", title: "Best Time to Visit 🌸", body: "Spring (April–May) and autumn (Sept–Oct) offer shorter queues and pleasant weather. Avoid school holidays!", emoji: "⏰", color: "#FF6B9D" },
  { icon: "M17 9V7a5 5 0 00-10 0v2m-3 0h16a2 2 0 012 2v9a2 2 0 01-2 2H6a2 2 0 01-2-2v-9a2 2 0 012-2z", title: "Book in Advance 🎟️", body: "Purchase tickets and hotel stays online. Many popular dining experiences require advance reservations.", emoji: "🎫", color: "#4ECDC4" },
  { icon: "M9 20l-5.447-2.724A1 1 0 013 16.382V5.618a1 1 0 011.447-.894L9 7m0 13l6-3m-6 3V7m6 10l4.553 2.276A1 1 0 0021 18.382V7.618a1 1 0 00-.553-.894L15 4m0 13V4m0 0L9 7", title: "Getting Around 🚆", body: "Both parks are adjacent! A free shuttle connects Disney Hotels. The RER A from Paris takes just 40 minutes.", emoji: "🗺️", color: "#FFD93D" },
  { icon: "M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z", title: "Book Your Transfer 🚗", body: "Skip the RER stress — a private luxury transfer from your Paris hotel or airport. Fixed price, no hassle!", emoji: "✈️", color: "#FF8C42" },
];

export default function DisneylandParis() {
  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Nunito:wght@400;600;700;800;900&family=Fredoka+One&display=swap');

        :root {
          --pink: #FF6B9D;
          --teal: #4ECDC4;
          --yellow: #FFD93D;
          --orange: #FF8C42;
          --purple: #C77DFF;
          --blue: #4CC9F0;
          --white: #FFFFFF;
          --cream: #FFFDF7;
          --light: #F0F8FF;
          --text: #2D3748;
          --text-soft: #718096;
        }

        .dp-root { background: var(--cream); font-family: 'Nunito', sans-serif; }
        .dp-root * { box-sizing: border-box; margin: 0; padding: 0; }

        /* ── STARS CONFETTI BG ── */
        .dp-root { background-image: radial-gradient(circle at 15% 15%, rgba(255,107,157,0.07) 0%, transparent 50%), radial-gradient(circle at 85% 85%, rgba(78,205,196,0.07) 0%, transparent 50%), radial-gradient(circle at 50% 50%, rgba(255,217,61,0.04) 0%, transparent 60%); }

        /* ── HERO ── */
        .dp-hero {
          position: relative;
          min-height: 92vh;
          display: flex; align-items: flex-end;
          padding: 0 5vw 80px;
          overflow: hidden;
          background: linear-gradient(160deg, #FFF0F8 0%, #E8F8FF 40%, #FFF9E8 100%);
        }

        /* Floating shapes */
        .dp-hero::before {
          content: '';
          position: absolute; inset: 0;
          background: url('/images/disney.webp') center/cover no-repeat;
          opacity: 0.18;
          border-radius: 0 0 60px 60px;
        }
        .dp-hero-overlay {
          position: absolute; inset: 0;
          background: linear-gradient(to top, rgba(255,240,248,0.97) 0%, rgba(255,240,248,0.7) 30%, rgba(255,240,248,0.3) 60%, transparent 100%);
          border-radius: 0 0 60px 60px;
        }

        .dp-bubble {
          position: absolute; border-radius: 50%;
          animation: dp-float 6s ease-in-out infinite;
        }
        .dp-bubble-1 { width: 120px; height: 120px; background: radial-gradient(circle, rgba(255,107,157,0.2), transparent); top: 10%; left: 5%; animation-delay: 0s; }
        .dp-bubble-2 { width: 80px; height: 80px; background: radial-gradient(circle, rgba(78,205,196,0.25), transparent); top: 20%; right: 10%; animation-delay: 1s; }
        .dp-bubble-3 { width: 60px; height: 60px; background: radial-gradient(circle, rgba(255,217,61,0.3), transparent); top: 50%; left: 15%; animation-delay: 2s; }
        .dp-bubble-4 { width: 100px; height: 100px; background: radial-gradient(circle, rgba(199,125,255,0.2), transparent); bottom: 20%; right: 8%; animation-delay: 1.5s; }

        @keyframes dp-float { 0%,100% { transform: translateY(0) scale(1); } 50% { transform: translateY(-20px) scale(1.05); } }
        @keyframes dp-spin { from { transform: rotate(0deg); } to { transform: rotate(360deg); } }
        @keyframes dp-bounce { 0%,100% { transform: translateY(0); } 50% { transform: translateY(-8px); } }
        @keyframes dp-fadeup { from { opacity:0; transform:translateY(30px); } to { opacity:1; transform:translateY(0); } }
        @keyframes dp-star-pop { 0% { transform: scale(0) rotate(-30deg); } 60% { transform: scale(1.2) rotate(5deg); } 100% { transform: scale(1) rotate(0); } }
        @keyframes dp-shimmer { 0%,100% { background-position: 200% center; } }

        .dp-hero-inner {
          position: relative; z-index: 2;
          max-width: 1200px; width: 100%; margin: 0 auto;
          display: grid; grid-template-columns: 1.2fr 0.8fr; gap: 48px; align-items: end;
        }
        @media (max-width: 900px) { .dp-hero-inner { grid-template-columns: 1fr; } }

        .dp-badge-row {
          display: inline-flex; align-items: center; gap: 8px;
          background: linear-gradient(135deg, #FFD93D, #FF8C42);
          padding: 6px 16px; border-radius: 50px;
          font-size: 11px; font-weight: 800; letter-spacing: 0.12em; text-transform: uppercase;
          color: white; margin-bottom: 16px;
          box-shadow: 0 4px 15px rgba(255,140,66,0.35);
          animation: dp-star-pop 0.6s 0.2s both;
        }

        .dp-hero-title {
          font-family: 'Fredoka One', cursive;
          font-size: clamp(3.5rem, 8vw, 6.5rem);
          line-height: 0.95; letter-spacing: 0.01em;
          color: var(--text); margin-bottom: 12px;
          animation: dp-fadeup 0.7s 0.3s both;
        }
        .dp-hero-title .pink { color: var(--pink); }
        .dp-hero-title .teal { color: var(--teal); }

        .dp-hero-stars {
          display: flex; gap: 4px; margin-bottom: 16px;
          animation: dp-fadeup 0.7s 0.4s both;
        }
        .dp-star { font-size: 22px; animation: dp-bounce 2s ease-in-out infinite; }
        .dp-star:nth-child(2) { animation-delay: 0.15s; }
        .dp-star:nth-child(3) { animation-delay: 0.3s; }
        .dp-star:nth-child(4) { animation-delay: 0.45s; }
        .dp-star:nth-child(5) { animation-delay: 0.6s; }

        .dp-hero-desc {
          font-size: 16px; font-weight: 600; line-height: 1.75;
          color: var(--text-soft); max-width: 480px; margin-bottom: 32px;
          animation: dp-fadeup 0.7s 0.5s both;
        }

        .dp-hero-btns { display: flex; gap: 12px; flex-wrap: wrap; animation: dp-fadeup 0.7s 0.6s both; }

        /* STAT CARD */
        .dp-hero-card {
          background: white;
          border-radius: 24px; padding: 28px;
          box-shadow: 0 12px 50px rgba(255,107,157,0.15), 0 4px 20px rgba(0,0,0,0.06);
          border: 3px solid rgba(255,107,157,0.15);
          animation: dp-fadeup 0.7s 0.4s both;
          position: relative; overflow: hidden;
        }
        .dp-hero-card::before {
          content: '🏰';
          position: absolute; top: -10px; right: -10px;
          font-size: 80px; opacity: 0.07;
          transform: rotate(10deg);
        }
        .dp-hero-card-label {
          font-size: 10px; font-weight: 800; letter-spacing: 0.22em; text-transform: uppercase;
          color: var(--pink); margin-bottom: 20px;
        }
        .dp-hero-stat-grid { display: grid; grid-template-columns: 1fr 1fr; gap: 16px; }
        .dp-hero-stat-item {
          background: linear-gradient(135deg, #FFF0F8, #FFF9F0);
          border-radius: 14px; padding: 14px;
          border: 2px solid rgba(255,107,157,0.1);
          text-align: center;
        }
        .dp-hero-stat-val {
          font-family: 'Fredoka One', cursive;
          font-size: 2rem; color: var(--pink); line-height: 1;
        }
        .dp-hero-stat-lbl {
          font-size: 10px; font-weight: 700; letter-spacing: 0.08em;
          color: var(--text-soft); margin-top: 4px; text-transform: uppercase;
        }
        .dp-hero-divider { width: 100%; height: 2px; background: linear-gradient(90deg, var(--pink), var(--teal)); border-radius: 2px; margin: 20px 0; opacity: 0.3; }
        .dp-hero-transfer-cta {
          display: flex; align-items: center; gap: 12px;
          padding: 14px 16px; border-radius: 14px;
          background: linear-gradient(135deg, #FFF0F8, #F0FFFE);
          border: 2px solid rgba(255,107,157,0.2);
          text-decoration: none; transition: all 0.25s;
        }
        .dp-hero-transfer-cta:hover { transform: translateY(-2px); box-shadow: 0 8px 24px rgba(255,107,157,0.2); border-color: var(--pink); }
        .dp-hero-transfer-icon {
          width: 42px; height: 42px; border-radius: 12px;
          background: linear-gradient(135deg, var(--pink), var(--orange));
          display: flex; align-items: center; justify-content: center; flex-shrink: 0;
          font-size: 20px;
        }
        .dp-htc-label { font-size: 9px; font-weight: 800; letter-spacing: 0.16em; text-transform: uppercase; color: var(--pink); margin-bottom: 2px; }
        .dp-htc-value { font-size: 13px; font-weight: 700; color: var(--text); }

        /* ── SHARED ── */
        .dp-section { padding: 70px 5vw; max-width: 1200px; margin: 0 auto; }
        .dp-section-label {
          display: inline-flex; align-items: center; gap: 6px;
          font-size: 11px; font-weight: 800; letter-spacing: 0.2em; text-transform: uppercase;
          color: var(--pink); margin-bottom: 10px;
          background: rgba(255,107,157,0.1); padding: 5px 14px; border-radius: 50px;
        }
        .dp-section-title {
          font-family: 'Fredoka One', cursive;
          font-size: clamp(2.4rem, 5vw, 4rem);
          color: var(--text); line-height: 1.05; margin-bottom: 12px;
        }
        .dp-section-title .accent { color: var(--pink); }
        .dp-section-sub {
          font-size: 15px; font-weight: 600; line-height: 1.75;
          color: var(--text-soft); max-width: 580px; margin-bottom: 44px;
        }

        /* ── BUTTONS ── */
        .dp-btn {
          display: inline-flex; align-items: center; gap: 8px;
          padding: 14px 28px; border-radius: 50px;
          font-family: 'Nunito', sans-serif;
          font-size: 13px; font-weight: 800; letter-spacing: 0.06em;
          text-decoration: none; transition: all 0.25s; border: none; cursor: pointer;
          white-space: nowrap;
        }
        .dp-btn-primary {
          background: linear-gradient(135deg, var(--pink), var(--orange));
          color: white;
          box-shadow: 0 6px 24px rgba(255,107,157,0.4);
        }
        .dp-btn-primary:hover { transform: translateY(-3px) scale(1.02); box-shadow: 0 10px 32px rgba(255,107,157,0.5); }
        .dp-btn-ghost {
          background: white; color: var(--text);
          border: 2px solid rgba(0,0,0,0.1);
          box-shadow: 0 4px 15px rgba(0,0,0,0.06);
        }
        .dp-btn-ghost:hover { border-color: var(--pink); color: var(--pink); transform: translateY(-2px); }

        /* ── SECTION WRAPPER ALTERNATING ── */
        .dp-wrap-white { background: white; }
        .dp-wrap-light { background: linear-gradient(180deg, #F8FFFE 0%, #FFF0F8 100%); }
        .dp-wrap-cream { background: var(--cream); }
        .dp-wrap-blue { background: linear-gradient(135deg, #E8F4FF 0%, #F0E8FF 100%); }

        /* ── PARKS ── */
        .dp-parks-grid { display: grid; grid-template-columns: 1fr 1fr; gap: 24px; }
        @media (max-width: 768px) { .dp-parks-grid { grid-template-columns: 1fr; } }

        .dp-park-card {
          background: white;
          border-radius: 24px; overflow: hidden;
          box-shadow: 0 8px 40px rgba(0,0,0,0.08);
          border: 3px solid transparent;
          transition: all 0.3s;
          position: relative;
        }
        .dp-park-card:hover { transform: translateY(-6px); box-shadow: 0 20px 60px rgba(0,0,0,0.12); }
        .dp-park-card-0 { border-color: rgba(255,107,157,0.2); }
        .dp-park-card-0:hover { border-color: var(--pink); }
        .dp-park-card-1 { border-color: rgba(78,205,196,0.2); }
        .dp-park-card-1:hover { border-color: var(--teal); }

        .dp-park-img-wrap { position: relative; overflow: hidden; height: 220px; }
        .dp-park-img { width: 100%; height: 100%; object-fit: cover; object-position: center; display: block; transition: transform 0.5s; }
        .dp-park-card:hover .dp-park-img { transform: scale(1.05); }
        .dp-park-emoji-badge {
          position: absolute; top: 16px; left: 16px;
          font-size: 32px;
          background: white; border-radius: 50%;
          width: 56px; height: 56px;
          display: flex; align-items: center; justify-content: center;
          box-shadow: 0 4px 16px rgba(0,0,0,0.15);
        }

        .dp-park-body { padding: 28px; }
        .dp-park-tag {
          display: inline-block; padding: 5px 14px; border-radius: 50px;
          font-size: 10px; font-weight: 800; letter-spacing: 0.12em; text-transform: uppercase;
          margin-bottom: 12px;
        }
        .dp-park-tag-0 { background: rgba(255,107,157,0.12); color: var(--pink); }
        .dp-park-tag-1 { background: rgba(78,205,196,0.15); color: #2CA8A0; }

        .dp-park-name {
          font-family: 'Fredoka One', cursive;
          font-size: 1.8rem; color: var(--text);
          margin-bottom: 10px; line-height: 1.1;
        }
        .dp-park-desc { font-size: 13.5px; font-weight: 600; line-height: 1.75; color: var(--text-soft); margin-bottom: 18px; }
        .dp-park-lands { display: flex; flex-wrap: wrap; gap: 6px; margin-bottom: 16px; }
        .dp-land-pill {
          padding: 5px 12px; border-radius: 50px;
          background: var(--light); border: 1.5px solid rgba(0,0,0,0.07);
          font-size: 10.5px; font-weight: 700; color: var(--text-soft);
        }
        .dp-park-highlight {
          font-size: 11.5px; font-weight: 600; color: var(--text-soft);
          border-top: 2px dashed rgba(0,0,0,0.07);
          padding-top: 14px; line-height: 1.6;
        }

        /* ── NEWS ── */
        .dp-new-grid { display: grid; grid-template-columns: 1fr 1fr; gap: 20px; }
        @media (max-width: 768px) { .dp-new-grid { grid-template-columns: 1fr; } }

        .dp-new-card {
          background: white;
          border-radius: 20px; overflow: hidden;
          box-shadow: 0 4px 24px rgba(0,0,0,0.06);
          border: 2px solid rgba(0,0,0,0.05);
          transition: all 0.3s;
        }
        .dp-new-card:hover { transform: translateY(-4px); box-shadow: 0 12px 40px rgba(0,0,0,0.1); }

        .dp-new-img-wrap { position: relative; overflow: hidden; height: 160px; }
        .dp-new-img { width: 100%; height: 100%; object-fit: cover; display: block; transition: transform 0.5s; }
        .dp-new-card:hover .dp-new-img { transform: scale(1.05); }
        .dp-new-emoji {
          position: absolute; top: 12px; right: 12px;
          font-size: 28px; background: white; border-radius: 50%;
          width: 48px; height: 48px;
          display: flex; align-items: center; justify-content: center;
          box-shadow: 0 4px 12px rgba(0,0,0,0.15);
        }

        .dp-new-body { padding: 20px; }
        .dp-new-badge {
          display: inline-block; padding: 4px 12px; border-radius: 50px;
          background: linear-gradient(135deg, #FFD93D, #FF8C42);
          font-size: 9px; font-weight: 800; letter-spacing: 0.14em; text-transform: uppercase;
          color: white; margin-bottom: 10px;
          box-shadow: 0 3px 10px rgba(255,140,66,0.3);
        }
        .dp-new-title { font-family: 'Fredoka One', cursive; font-size: 1.3rem; color: var(--text); margin-bottom: 8px; line-height: 1.2; }
        .dp-new-desc { font-size: 12.5px; font-weight: 600; line-height: 1.75; color: var(--text-soft); }

        /* ── ATTRACTIONS ── */
        .dp-attr-grid { display: grid; grid-template-columns: repeat(3, 1fr); gap: 18px; }
        @media (max-width: 900px) { .dp-attr-grid { grid-template-columns: 1fr 1fr; } }
        @media (max-width: 560px) { .dp-attr-grid { grid-template-columns: 1fr; } }

        .dp-attr-card {
          background: white;
          border-radius: 18px; overflow: hidden;
          box-shadow: 0 4px 20px rgba(0,0,0,0.06);
          border: 2px solid rgba(0,0,0,0.05);
          transition: all 0.25s;
        }
        .dp-attr-card:hover { transform: translateY(-4px); box-shadow: 0 12px 36px rgba(0,0,0,0.1); }

        .dp-attr-img-wrap { position: relative; overflow: hidden; height: 140px; }
        .dp-attr-img { width: 100%; height: 100%; object-fit: cover; display: block; transition: transform 0.5s; }
        .dp-attr-card:hover .dp-attr-img { transform: scale(1.07); }
        .dp-attr-emoji {
          position: absolute; top: 8px; left: 8px;
          font-size: 20px; background: white; border-radius: 50%;
          width: 36px; height: 36px;
          display: flex; align-items: center; justify-content: center;
          box-shadow: 0 3px 10px rgba(0,0,0,0.15);
        }

        .dp-attr-body { padding: 16px; }
        .dp-attr-top { display: flex; align-items: center; justify-content: space-between; margin-bottom: 8px; }
        .dp-attr-type { font-size: 9px; font-weight: 800; letter-spacing: 0.14em; text-transform: uppercase; color: var(--pink); }
        .dp-attr-thrill {
          padding: 3px 10px; border-radius: 50px;
          font-size: 9px; font-weight: 800; letter-spacing: 0.08em; text-transform: uppercase;
        }
        .dp-thrill-mild { background: rgba(78,205,196,0.15); color: #2CA8A0; }
        .dp-thrill-moderate { background: rgba(255,217,61,0.2); color: #B88A00; }
        .dp-thrill-thrilling { background: rgba(255,107,157,0.15); color: #D63384; }

        .dp-attr-name { font-family: 'Fredoka One', cursive; font-size: 1.1rem; color: var(--text); margin-bottom: 6px; line-height: 1.2; }
        .dp-attr-desc { font-size: 11.5px; font-weight: 600; line-height: 1.65; color: var(--text-soft); }
        .dp-attr-park {
          margin-top: 10px; padding-top: 8px;
          border-top: 2px dashed rgba(0,0,0,0.07);
          font-size: 9.5px; font-weight: 700; color: var(--text-soft);
          letter-spacing: 0.06em; text-transform: uppercase;
        }

        /* ── TRANSFER CTA ── */
        .dp-transfer-wrap {
          background: linear-gradient(135deg, #E8F8FF 0%, #FFF0F8 50%, #FFFDE8 100%);
          border-top: 3px solid white; border-bottom: 3px solid white;
          position: relative; overflow: hidden;
        }
        .dp-transfer-wrap::before {
          content: '🚗✨🏰🌟';
          position: absolute; top: 20px; right: 40px;
          font-size: 48px; opacity: 0.15; letter-spacing: 20px;
          animation: dp-float 5s ease-in-out infinite;
        }
        .dp-transfer-inner {
          max-width: 1200px; margin: 0 auto; padding: 72px 5vw;
          display: grid; grid-template-columns: 1.1fr 1fr; gap: 60px; align-items: center;
        }
        @media (max-width: 900px) { .dp-transfer-inner { grid-template-columns: 1fr; gap: 36px; } }

        .dp-transfer-title { font-family: 'Fredoka One', cursive; font-size: clamp(2rem, 4.5vw, 3.2rem); color: var(--text); line-height: 1.1; margin-bottom: 16px; }
        .dp-transfer-title .accent { color: var(--pink); }
        .dp-transfer-desc { font-size: 15px; font-weight: 600; line-height: 1.8; color: var(--text-soft); margin-bottom: 32px; }
        .dp-transfer-rates { display: flex; flex-direction: column; gap: 10px; }
        .dp-transfer-rate {
          display: flex; align-items: center; justify-content: space-between;
          padding: 16px 20px; border-radius: 16px;
          background: white;
          border: 2px solid rgba(255,107,157,0.12);
          box-shadow: 0 4px 16px rgba(0,0,0,0.05);
          transition: all 0.25s;
        }
        .dp-transfer-rate:hover { border-color: var(--pink); transform: translateX(4px); }
        .dp-rate-route { font-size: 13.5px; font-weight: 700; color: var(--text); }
        .dp-rate-route span { color: var(--pink); margin: 0 6px; }
        .dp-rate-price { font-family: 'Fredoka One', cursive; font-size: 1.5rem; color: var(--pink); }
        .dp-rate-pax { font-size: 11px; font-weight: 600; color: var(--text-soft); margin-top: 2px; }

        /* ── TIPS ── */
        .dp-tips-grid { display: grid; grid-template-columns: repeat(2, 1fr); gap: 18px; }
        @media (max-width: 640px) { .dp-tips-grid { grid-template-columns: 1fr; } }

        .dp-tip-card {
          display: flex; gap: 16px; padding: 24px;
          background: white;
          border-radius: 18px;
          box-shadow: 0 4px 20px rgba(0,0,0,0.05);
          border: 2px solid rgba(0,0,0,0.04);
          transition: all 0.25s;
        }
        .dp-tip-card:hover { transform: translateY(-3px); box-shadow: 0 10px 32px rgba(0,0,0,0.08); }
        .dp-tip-card-0:hover { border-color: var(--pink); }
        .dp-tip-card-1:hover { border-color: var(--teal); }
        .dp-tip-card-2:hover { border-color: var(--yellow); }
        .dp-tip-card-3:hover { border-color: var(--orange); }

        .dp-tip-icon {
          width: 52px; height: 52px; border-radius: 16px;
          display: flex; align-items: center; justify-content: center;
          flex-shrink: 0; font-size: 26px;
          box-shadow: 0 4px 12px rgba(0,0,0,0.08);
        }
        .dp-tip-icon-0 { background: linear-gradient(135deg, #FFE8F0, #FFCFE0); }
        .dp-tip-icon-1 { background: linear-gradient(135deg, #E0FAFA, #C0F0EE); }
        .dp-tip-icon-2 { background: linear-gradient(135deg, #FFFBE8, #FFF0C0); }
        .dp-tip-icon-3 { background: linear-gradient(135deg, #FFF0E8, #FFE0C0); }

        .dp-tip-title { font-size: 14px; font-weight: 800; color: var(--text); margin-bottom: 7px; }
        .dp-tip-body { font-size: 12.5px; font-weight: 600; line-height: 1.7; color: var(--text-soft); }

        /* ── CTA STRIP ── */
        .dp-cta-strip {
          background: linear-gradient(135deg, var(--pink) 0%, var(--orange) 50%, var(--yellow) 100%);
          padding: 60px 5vw; position: relative; overflow: hidden;
        }
        .dp-cta-strip::before {
          content: '⭐🎪🏰🎢🎡';
          position: absolute; font-size: 60px; opacity: 0.15;
          top: 50%; transform: translateY(-50%); right: 5%;
          letter-spacing: 16px; white-space: nowrap;
        }
        .dp-cta-inner {
          max-width: 1200px; margin: 0 auto;
          display: flex; align-items: center; justify-content: space-between;
          flex-wrap: wrap; gap: 24px; position: relative;
        }
        .dp-cta-text { font-family: 'Fredoka One', cursive; font-size: clamp(2rem, 4vw, 2.8rem); color: white; text-shadow: 0 2px 10px rgba(0,0,0,0.15); }
        .dp-cta-btns { display: flex; gap: 12px; flex-wrap: wrap; }
        .dp-btn-white { background: white; color: var(--pink); box-shadow: 0 6px 24px rgba(0,0,0,0.15); }
        .dp-btn-white:hover { transform: translateY(-3px); box-shadow: 0 10px 32px rgba(0,0,0,0.2); }
        .dp-btn-outline-white { background: transparent; color: white; border: 3px solid rgba(255,255,255,0.7); }
        .dp-btn-outline-white:hover { background: rgba(255,255,255,0.15); border-color: white; }

        /* FUN DIVIDER */
        .dp-divider {
          text-align: center; padding: 24px; font-size: 24px; letter-spacing: 16px;
          background: white; opacity: 0.8;
        }

        .dp-a1 { animation: dp-fadeup 0.7s 0.1s both; }
        .dp-a2 { animation: dp-fadeup 0.7s 0.3s both; }
        .dp-a3 { animation: dp-fadeup 0.7s 0.5s both; }
      `}</style>

      <div className="dp-root">

        {/* ── HERO ── */}
        <div className="dp-hero">
          <div className="dp-hero-overlay" />
          <div className="dp-bubble dp-bubble-1" />
          <div className="dp-bubble dp-bubble-2" />
          <div className="dp-bubble dp-bubble-3" />
          <div className="dp-bubble dp-bubble-4" />
          <div className="dp-hero-inner">
            <div className="dp-a1">
              <div className="dp-badge-row">
                ⭐ Destination Guide — Europe's #1 Theme Park
              </div>
              <h1 className="dp-hero-title">
                <span className="pink">Disneyland</span><br />
                <span className="teal">Paris!</span> 🏰
              </h1>
              <div className="dp-hero-stars">
                <span className="dp-star">⭐</span>
                <span className="dp-star">🌟</span>
                <span className="dp-star">✨</span>
                <span className="dp-star">🌟</span>
                <span className="dp-star">⭐</span>
              </div>
              <p className="dp-hero-desc">
                Just 32 km from Paris, the most magical theme park resort in Europe is waiting for you! Two amazing parks, beloved characters, and memories that last forever! 🎉
              </p>
              <div className="dp-hero-btns dp-a2">
                <Link href="/reservation" className="dp-btn dp-btn-primary">🚗 Book Your Transfer</Link>
                <Link href="/rates" className="dp-btn dp-btn-ghost">💰 View Rates</Link>
              </div>
            </div>

            <div className="dp-hero-card dp-a3">
              <div className="dp-hero-card-label">✨ Resort at a glance</div>
              <div className="dp-hero-stat-grid">
                <div className="dp-hero-stat-item">
                  <div className="dp-hero-stat-val">2 🎡</div>
                  <div className="dp-hero-stat-lbl">Theme Parks</div>
                </div>
                <div className="dp-hero-stat-item">
                  <div className="dp-hero-stat-val">32km</div>
                  <div className="dp-hero-stat-lbl">From Paris 🗼</div>
                </div>
                <div className="dp-hero-stat-item">
                  <div className="dp-hero-stat-val">7 🏨</div>
                  <div className="dp-hero-stat-lbl">Disney Hotels</div>
                </div>
                <div className="dp-hero-stat-item">
                  <div className="dp-hero-stat-val">€2B</div>
                  <div className="dp-hero-stat-lbl">Transformation 🌟</div>
                </div>
              </div>
              <div className="dp-hero-divider" />
              <Link href="/reservation" className="dp-hero-transfer-cta">
                <div className="dp-hero-transfer-icon">🚗</div>
                <div>
                  <div className="dp-htc-label">Private Transfer from</div>
                  <div className="dp-htc-value">CDG · Orly · Paris — from €70</div>
                </div>
              </Link>
            </div>
          </div>
        </div>

        {/* ── FUN DIVIDER ── */}
        <div className="dp-divider">🎠 🎢 🏰 🎡 🎆 🎇 🎠</div>

        {/* ── PARKS ── */}
        <div className="dp-wrap-white">
          <div className="dp-section">
            <span className="dp-section-label">🌍 Two Worlds of Magic</span>
            <h2 className="dp-section-title">The <span className="accent">Parks</span> 🎪</h2>
            <p className="dp-section-sub">Two distinct theme parks — from timeless fairytale classics to thrilling new adventures. Which one's your favourite?</p>
            <div className="dp-parks-grid">
              {PARKS.map((p, i) => (
                <div key={i} className={`dp-park-card dp-park-card-${i}`}>
                  <div className="dp-park-img-wrap">
                    <img src={p.img} alt={p.name} className="dp-park-img" />
                    <div className="dp-park-emoji-badge">{p.emoji}</div>
                  </div>
                  <div className="dp-park-body">
                    <div className={`dp-park-tag dp-park-tag-${i}`}>{p.tag}</div>
                    <h3 className="dp-park-name">{p.name}</h3>
                    <p className="dp-park-desc">{p.desc}</p>
                    <div className="dp-park-lands">{p.lands.map(l => <span key={l} className="dp-land-pill">{l}</span>)}</div>
                    <div className="dp-park-highlight">🎢 {p.highlight}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* ── NEWS ── */}
        <div className="dp-wrap-light">
          <div className="dp-section">
            <span className="dp-section-label">🆕 Latest News</span>
            <h2 className="dp-section-title">What's <span className="accent">New</span>? 🎉</h2>
            <p className="dp-section-sub">Disneyland Paris is in the middle of its biggest ever transformation. So much exciting stuff is happening!</p>
            <div className="dp-new-grid">
              {NEWS.map((n, i) => (
                <div key={i} className="dp-new-card">
                  <div className="dp-new-img-wrap">
                    <img src={n.img} alt={n.title} className="dp-new-img" />
                    <div className="dp-new-emoji">{n.emoji}</div>
                  </div>
                  <div className="dp-new-body">
                    <div className="dp-new-badge">{n.badge}</div>
                    <h3 className="dp-new-title">{n.title}</h3>
                    <p className="dp-new-desc">{n.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* ── ATTRACTIONS ── */}
        <div className="dp-wrap-cream">
          <div className="dp-section">
            <span className="dp-section-label">🎢 Must-Do Rides</span>
            <h2 className="dp-section-title">Top <span className="accent">Attractions</span> 🚀</h2>
            <p className="dp-section-sub">From gentle classics to heart-pounding coasters — here are the rides you absolutely cannot miss!</p>
            <div className="dp-attr-grid">
              {ATTRACTIONS.map((a, i) => (
                <div key={i} className="dp-attr-card">
                  <div className="dp-attr-img-wrap">
                    <img src={a.img} alt={a.name} className="dp-attr-img" />
                    <div className="dp-attr-emoji">{a.emoji}</div>
                  </div>
                  <div className="dp-attr-body">
                    <div className="dp-attr-top">
                      <div className="dp-attr-type">{a.type}</div>
                      <div className={`dp-attr-thrill dp-thrill-${a.thrill.toLowerCase()}`}>{a.thrill}</div>
                    </div>
                    <div className="dp-attr-name">{a.name}</div>
                    <div className="dp-attr-desc">{a.desc}</div>
                    <div className="dp-attr-park">📍 {a.park}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* ── TRANSFER CTA ── */}
        <div className="dp-transfer-wrap">
          <div className="dp-transfer-inner">
            <div>
              <span className="dp-section-label">🚗 Paris Easy Move</span>
              <h2 className="dp-transfer-title">The <span className="accent">smartest way</span> to reach the magic! 🌟</h2>
              <p className="dp-transfer-desc">Skip the crowded RER train and arrive relaxed and happy! Door-to-door from your hotel or airport — fixed price, flight-tracked, free child seats for the little ones! 👶🧒</p>
              <div style={{ display: "flex", gap: 12, flexWrap: "wrap" }}>
                <Link href="/reservation" className="dp-btn dp-btn-primary">🎟️ Book Transfer Now</Link>
                <Link href="/rates" className="dp-btn dp-btn-ghost">See All Rates →</Link>
              </div>
            </div>
            <div className="dp-transfer-rates">
              {[
                { from: "CDG Airport", to: "Disneyland Paris", price: "from €70", pax: "1–3 passengers" },
                { from: "Orly Airport", to: "Disneyland Paris", price: "from €75", pax: "1–3 passengers" },
                { from: "Paris City Centre", to: "Disneyland Paris", price: "from €80", pax: "1–3 passengers" },
                { from: "Beauvais Airport", to: "Disneyland Paris", price: "from €140", pax: "1–3 passengers" },
              ].map((r, i) => (
                <div key={i} className="dp-transfer-rate">
                  <div>
                    <div className="dp-rate-route">✈️ {r.from} <span>→</span> {r.to}</div>
                    <div className="dp-rate-pax">👨‍👩‍👧 {r.pax}</div>
                  </div>
                  <div className="dp-rate-price">{r.price}</div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* ── TIPS ── */}
        <div className="dp-wrap-blue">
          <div className="dp-section">
            <span className="dp-section-label">💡 Visitor Guide</span>
            <h2 className="dp-section-title">Planning <span className="accent">Tips</span> 📝</h2>
            <p className="dp-section-sub">Everything you need to know before you go — so your family has the most amazing day!</p>
            <div className="dp-tips-grid">
              {TIPS.map((t, i) => (
                <div key={i} className={`dp-tip-card dp-tip-card-${i}`}>
                  <div className={`dp-tip-icon dp-tip-icon-${i}`}>{t.emoji}</div>
                  <div>
                    <div className="dp-tip-title">{t.title}</div>
                    <div className="dp-tip-body">{t.body}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* ── FINAL CTA ── */}
        <div className="dp-cta-strip">
          <div className="dp-cta-inner">
            <div className="dp-cta-text">Ready for the magic? 🏰✨</div>
            <div className="dp-cta-btns">
              <Link href="/reservation" className="dp-btn dp-btn-white">🚗 Book Your Transfer</Link>
              <a href="https://wa.me/33652466694" target="_blank" rel="noopener noreferrer" className="dp-btn dp-btn-outline-white">💬 WhatsApp Us</a>
            </div>
          </div>
        </div>

      </div>
    </>
  );
}