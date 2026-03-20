"use client";

import Link from "next/link";

const PARKS = [
  {
    name: "Disneyland Park",
    tag: "The Original",
    desc: "The heart of the resort — five uniquely themed lands where fairytales come alive beneath the iconic Sleeping Beauty Castle.",
    lands: ["Main Street U.S.A.", "Fantasyland", "Adventureland", "Frontierland", "Discoveryland"],
    highlight: "Phantom Manor · Pirates of the Caribbean · Star Wars Hyperspace Mountain",
    img: "https://images.unsplash.com/photo-1759773999019-ff4a66522a36?q=80&w=1074&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
  },
  {
    name: "Disney Adventure World",
    tag: "Rebranded 2025",
    desc: "Formerly Walt Disney Studios Park, reimagined with a €2 billion transformation. Home to the breathtaking new World of Frozen land.",
    lands: ["World of Frozen", "Avengers Campus", "Worlds of Pixar", "Adventure Way", "World Premiere"],
    highlight: "Frozen Ever After · Avengers Assemble: Flight Force · Raiponce Tangled Spin",
    img: "https://images.unsplash.com/photo-1718870006030-d78d6c8f6297?q=80&w=1170&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
  },
];

const NEWS = [
  {
    badge: "Open Now · 2025",
    title: "Disney Tales of Magic — Nighttime Spectacular",
    desc: "Launched January 2025, this breathtaking show transforms Sleeping Beauty Castle with drones, pyrotechnics, fountain displays and an exclusive soundtrack.",
    img: "https://images.unsplash.com/photo-1514525253161-7a46d19cd819?w=700&q=80",
    year: "2025",
  },
  {
    badge: "Open Now · March 2025",
    title: "Disney Adventure World — Park Rebranded",
    desc: "Walt Disney Studios Park officially became Disney Adventure World on March 29, 2025, launching the new World of Frozen land with Frozen Ever After.",
    img: "https://images.unsplash.com/photo-1478720568477-152d9b164e26?w=700&q=80",
    year: "2025",
  },
  {
    badge: "Open 2025",
    title: "Raiponce Tangled Spin",
    desc: "A brand-new attraction inspired by Tangled — guests board boats and whirl beneath floating lanterns while 'I See the Light' plays.",
    img: "https://images.unsplash.com/photo-1433838552652-f9a46b332c40?w=700&q=80",
    year: "2025",
  },
  {
    badge: "Coming Soon",
    title: "The Lion King World & Up Ride",
    desc: "Construction begins Fall 2025 for the first-ever immersive Lion King land, featuring a massive log flume and state-of-the-art Audio-Animatronics.",
    img: "https://images.unsplash.com/photo-1647194104720-25d09b297910?q=80&w=1171&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    year: "2026",
  },
];

const ATTRACTIONS = [
  { name: "Phantom Manor", type: "Classic", thrill: "Mild", park: "Disneyland Park", desc: "A haunted mansion steeped in gothic storytelling — one of the best dark rides in the world.", img: "https://images.unsplash.com/photo-1508361001413-7a9dca21d08a?w=600&q=80" },
  { name: "Pirates of the Caribbean", type: "Classic", thrill: "Mild", park: "Disneyland Park", desc: "Iconic boat ride through swashbuckling scenes with stunning animatronics and drops.", img: "https://lumiere-a.akamaihd.net/v1/images/r_pirates_deadmentellnotales_standee_header_3b0fb228.jpeg?region=0,0,2048,640" },
  { name: "Big Thunder Mountain", type: "Coaster", thrill: "Moderate", park: "Disneyland Park", desc: "A wildest ride in the wilderness mine train rollercoaster through a rugged red-rock canyon.", img: "https://media.disneylandparis.com/d4th/en-int/images/n017799_2050jan01_big-thunder-mountain_16-9_tcm787-159525.jpg?w=640" },
  { name: "Star Wars Hyperspace Mountain", type: "Coaster", thrill: "Thrilling", park: "Disneyland Park", desc: "High-speed indoor coaster set in the Star Wars universe with loops and stunning projections.", img: "https://media.disneylandparis.com/d4th/en-usd/images/n025830_2024may09_world_discoveryland-starport-x-wings-spaceship_16-9_tcm1861-290858.jpg?w=980,%20https://media.disneylandparis.com/d4th/en-usd/images/n025830_2024may09_world_discoveryland-starport-x-wings-spaceship_16-9_tcm1861-290858.jpg?w=1960%202x" },
  { name: "Frozen Ever After", type: "Boat Ride", thrill: "Mild", park: "Disney Adventure World", desc: "Sail through Arendelle's most beloved moments in the visually stunning World of Frozen land.", img: "https://media.disneylandparis.com/d4th/en-int/images/GU94518_2027dec31_world_HKDL-wof-frozen-ever-after-attraction_16-9_tcm787-291444.jpg?w=960" },
  { name: "Avengers Assemble: Flight Force", type: "Coaster", thrill: "Thrilling", park: "Disney Adventure World", desc: "A high-speed launch coaster with Iron Man and Captain Marvel at Avengers Campus.", img: "https://images.unsplash.com/photo-1635805737707-575885ab0820?w=600&q=80" },
  { name: "Crush's Coaster", type: "Coaster", thrill: "Moderate", park: "Disney Adventure World", desc: "Spinning coaster through an underwater adventure inspired by Finding Nemo.", img: "https://media.disneylandparis.com/d4th/en-gb/images/n018312_2050jan01_crushs-coaster-detail_16-9_tcm752-159257.jpg?w=240,%20https://media.disneylandparis.com/d4th/en-gb/images/n018312_2050jan01_crushs-coaster-detail_16-9_tcm752-159257.jpg?w=480%202x" },
  { name: "Raiponce Tangled Spin", type: "Spinner", thrill: "Mild", park: "Disney Adventure World", desc: "Whirl beneath floating lanterns on boats while 'I See the Light' fills the air — pure magic.", img: "https://media.disneylandparis.com/d4th/en-usd/images/N042473_2032oct30_world_architecture-adventure-world_16-9_tcm1861-291523.jpg?w=960" },
  { name: "Buzz Lightyear Laser Blast", type: "Interactive", thrill: "Mild", park: "Disneyland Park", desc: "Shoot targets to help Buzz defeat Emperor Zurg — great for all ages and friendly competition.", img: "https://news.disneylandparis.com//app/uploads/2025/07/BUZZ-LIGHTYEAR_2-1-scaled.jpg" },
];

const TIPS = [
  { icon: "M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z", title: "Best Time to Visit", body: "Spring (April–May) and autumn (Sept–Oct) offer shorter queues and pleasant weather. Avoid school holidays." },
  { icon: "M17 9V7a5 5 0 00-10 0v2m-3 0h16a2 2 0 012 2v9a2 2 0 01-2 2H6a2 2 0 01-2-2v-9a2 2 0 012-2z", title: "Book in Advance", body: "Purchase tickets and hotel stays online. Many popular dining experiences require advance reservations." },
  { icon: "M9 20l-5.447-2.724A1 1 0 013 16.382V5.618a1 1 0 011.447-.894L9 7m0 13l6-3m-6 3V7m6 10l4.553 2.276A1 1 0 0021 18.382V7.618a1 1 0 00-.553-.894L15 4m0 13V4m0 0L9 7", title: "Getting Around", body: "Both parks are adjacent. A free shuttle connects Disney Hotels. The RER A from Paris takes 40 minutes." },
  { icon: "M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z", title: "Book Your Transfer", body: "Skip the RER stress — a private luxury transfer from your Paris hotel or airport. Fixed price, no hassle." },
];

export default function DisneylandParis() {
  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,300;0,400;0,500;0,600;1,300;1,400;1,500&family=Montserrat:wght@300;400;500;600;700&display=swap');

        .dp-root { --gold: #c9a347; --gold-l: #e8c97a; }
        .dp-root * { box-sizing: border-box; margin: 0; padding: 0; }

        /* ── HERO ── */
        .dp-hero {
          position: relative;
          min-height: 90vh;
          display: flex; align-items: flex-end;
          padding: 0 5vw 80px;
          overflow: hidden;
        }
        .dp-hero-bg {
          position: absolute; inset: 0;
          background: url('/images/disney.webp') center/cover no-repeat;
        }
        .dp-hero-overlay {
          position: absolute; inset: 0;
          background: linear-gradient(to top, rgba(0,0,0,0.82) 0%, rgba(0,0,0,0.3) 40%, transparent 70%);
        }
        .dp-hero-inner {
          position: relative; z-index: 2;
          max-width: 1200px; width: 100%; margin: 0 auto;
          display: grid; grid-template-columns: 1.1fr 0.9fr; gap: 48px; align-items: end;
        }
        @media (max-width: 900px) { .dp-hero-inner { grid-template-columns: 1fr; } }

        .dp-eyebrow {
          display: inline-flex; align-items: center; gap: 10px;
          font-family: 'Montserrat', sans-serif;
          font-size: 11px; font-weight: 600; letter-spacing: 0.24em; text-transform: uppercase;
          color: var(--gold); margin-bottom: 16px;
        }
        .dp-eyebrow-line { width: 28px; height: 1px; background: var(--gold); flex-shrink: 0; }

        .dp-hero-title {
          font-family: 'Cormorant Garamond', serif;
          font-size: clamp(3.5rem, 7vw, 6rem);
          font-weight: 400; line-height: 0.95; letter-spacing: -0.02em;
          color: #ffffff; margin-bottom: 18px;
        }
        .dp-hero-title em { font-style: italic; color: var(--gold); font-weight: 300; }

        .dp-hero-desc {
          font-family: 'Montserrat', sans-serif;
          font-size: 15px; font-weight: 400; line-height: 1.75;
          color: rgba(255,255,255,0.82); max-width: 500px; margin-bottom: 32px;
        }

        .dp-hero-btns { display: flex; gap: 14px; flex-wrap: wrap; }

        .dp-hero-card {
          background: rgba(0,0,0,0.55);
          border: 1px solid rgba(201,163,71,0.35);
          border-radius: 16px; padding: 28px;
          backdrop-filter: blur(16px);
        }
        .dp-hero-card-label {
          font-family: 'Montserrat', sans-serif;
          font-size: 10px; font-weight: 700; letter-spacing: 0.22em; text-transform: uppercase;
          color: var(--gold); margin-bottom: 20px;
        }
        .dp-hero-stat-grid { display: grid; grid-template-columns: 1fr 1fr; gap: 20px; }
        .dp-hero-stat-val {
          font-family: 'Cormorant Garamond', serif;
          font-size: 2.4rem; font-weight: 500; color: var(--gold); line-height: 1;
        }
        .dp-hero-stat-lbl {
          font-family: 'Montserrat', sans-serif;
          font-size: 10px; font-weight: 500; letter-spacing: 0.1em;
          color: rgba(255,255,255,0.5); margin-top: 4px; text-transform: uppercase;
        }
        .dp-hero-divider { width: 100%; height: 1px; background: rgba(255,255,255,0.1); margin: 20px 0; }
        .dp-hero-transfer-cta {
          display: flex; align-items: center; gap: 12px;
          padding: 14px 16px; border-radius: 10px;
          background: rgba(201,163,71,0.12); border: 1px solid rgba(201,163,71,0.3);
          text-decoration: none; transition: background 0.22s;
        }
        .dp-hero-transfer-cta:hover { background: rgba(201,163,71,0.2); }
        .dp-hero-transfer-icon {
          width: 38px; height: 38px; border-radius: 8px;
          background: var(--gold); color: #000;
          display: flex; align-items: center; justify-content: center; flex-shrink: 0;
        }
        .dp-hero-transfer-icon svg { width: 18px; height: 18px; }
        .dp-htc-label {
          font-family: 'Montserrat', sans-serif;
          font-size: 9px; font-weight: 700; letter-spacing: 0.16em; text-transform: uppercase;
          color: var(--gold); margin-bottom: 3px;
        }
        .dp-htc-value {
          font-family: 'Montserrat', sans-serif;
          font-size: 13px; font-weight: 600; color: #fff;
        }

        /* ── SHARED ── */
        .dp-section { padding: 80px 5vw; max-width: 1200px; margin: 0 auto; }
        .dp-section-label {
          font-family: 'Montserrat', sans-serif;
          font-size: 10px; font-weight: 700; letter-spacing: 0.26em; text-transform: uppercase;
          color: var(--gold); margin-bottom: 10px; display: block;
        }
        .dp-section-title {
          font-family: 'Cormorant Garamond', serif;
          font-size: clamp(2.4rem, 4.5vw, 3.8rem);
          font-weight: 400; color: #fff; line-height: 1.05; margin-bottom: 12px;
        }
        .dp-section-title em { font-style: italic; color: var(--gold); }
        .dp-section-sub {
          font-family: 'Montserrat', sans-serif;
          font-size: 14px; font-weight: 400; line-height: 1.75;
          color: rgba(255,255,255,0.55); max-width: 620px; margin-bottom: 44px;
        }

        /* ── BUTTONS ── */
        .dp-btn {
          display: inline-flex; align-items: center; gap: 8px;
          padding: 13px 28px; border-radius: 6px;
          font-family: 'Montserrat', sans-serif;
          font-size: 11px; font-weight: 700; letter-spacing: 0.14em; text-transform: uppercase;
          text-decoration: none; transition: all 0.25s; border: none; cursor: pointer;
        }
        .dp-btn-primary { background: var(--gold); color: #000; box-shadow: 0 4px 20px rgba(201,163,71,0.35); }
        .dp-btn-primary:hover { background: var(--gold-l); transform: translateY(-2px); }
        .dp-btn-ghost { background: transparent; color: rgba(255,255,255,0.75); border: 1px solid rgba(255,255,255,0.2); }
        .dp-btn-ghost:hover { border-color: rgba(201,163,71,0.5); color: var(--gold); }

        /* ── PARKS ── */
        .dp-parks-wrap { background: #0d0d0d; border-top: 1px solid rgba(255,255,255,0.05); border-bottom: 1px solid rgba(255,255,255,0.05); }
        .dp-parks-grid { display: grid; grid-template-columns: 1fr 1fr; gap: 28px; }
        @media (max-width: 768px) { .dp-parks-grid { grid-template-columns: 1fr; } }

        .dp-park-card {
          background: #1a1a1a;
          border: 1px solid rgba(255,255,255,0.08);
          border-radius: 16px; overflow: hidden;
          transition: transform 0.3s, box-shadow 0.3s;
        }
        .dp-park-card:hover { transform: translateY(-4px); box-shadow: 0 16px 48px rgba(0,0,0,0.5); }

        .dp-park-img {
          width: 100%; height: 220px;
          object-fit: cover; object-position: center;
          display: block;
        }
        .dp-park-body { padding: 28px; }

        .dp-park-tag {
          display: inline-block; padding: 4px 12px; border-radius: 20px;
          font-family: 'Montserrat', sans-serif;
          font-size: 9px; font-weight: 700; letter-spacing: 0.16em; text-transform: uppercase;
          margin-bottom: 12px;
        }
        .dp-park-tag-gold { background: rgba(201,163,71,0.15); color: var(--gold); border: 1px solid rgba(201,163,71,0.25); }
        .dp-park-tag-blue { background: rgba(74,158,255,0.12); color: #6ab0ff; border: 1px solid rgba(74,158,255,0.25); }

        .dp-park-name {
          font-family: 'Cormorant Garamond', serif;
          font-size: 1.9rem; font-weight: 500; color: #fff;
          margin-bottom: 10px; line-height: 1.1;
        }
        .dp-park-desc {
          font-family: 'Montserrat', sans-serif;
          font-size: 13px; font-weight: 400; line-height: 1.75;
          color: rgba(255,255,255,0.55); margin-bottom: 18px;
        }
        .dp-park-lands { display: flex; flex-wrap: wrap; gap: 6px; margin-bottom: 16px; }
        .dp-land-pill {
          padding: 4px 10px; border-radius: 6px;
          background: rgba(255,255,255,0.06); border: 1px solid rgba(255,255,255,0.1);
          font-family: 'Montserrat', sans-serif;
          font-size: 10px; font-weight: 500; color: rgba(255,255,255,0.5);
        }
        .dp-park-highlight {
          font-family: 'Montserrat', sans-serif;
          font-size: 11px; font-weight: 400; color: rgba(255,255,255,0.35);
          font-style: italic; border-top: 1px solid rgba(255,255,255,0.07);
          padding-top: 14px; line-height: 1.6;
        }

        /* ── NEWS ── */
        .dp-news-wrap { background: #111318; border-bottom: 1px solid rgba(255,255,255,0.05); }
        .dp-new-grid { display: grid; grid-template-columns: 1fr 1fr; gap: 24px; }
        @media (max-width: 768px) { .dp-new-grid { grid-template-columns: 1fr; } }

        .dp-new-card {
          background: #1c1c24;
          border: 1px solid rgba(255,255,255,0.07);
          border-radius: 14px; overflow: hidden;
          transition: transform 0.3s, border-color 0.3s;
        }
        .dp-new-card:hover { transform: translateY(-3px); border-color: rgba(201,163,71,0.25); }

        .dp-new-img {
          width: 100%; height: 170px;
          object-fit: cover; object-position: center;
          display: block;
        }
        .dp-new-body { padding: 24px; }
        .dp-new-badge {
          display: inline-block; padding: 4px 12px; border-radius: 20px;
          background: rgba(201,163,71,0.12); border: 1px solid rgba(201,163,71,0.22);
          font-family: 'Montserrat', sans-serif;
          font-size: 9px; font-weight: 700; letter-spacing: 0.14em; text-transform: uppercase;
          color: var(--gold); margin-bottom: 12px;
        }
        .dp-new-title {
          font-family: 'Cormorant Garamond', serif;
          font-size: 1.45rem; font-weight: 500; color: #fff;
          margin-bottom: 8px; line-height: 1.2;
        }
        .dp-new-desc {
          font-family: 'Montserrat', sans-serif;
          font-size: 12.5px; font-weight: 400; line-height: 1.75;
          color: rgba(255,255,255,0.5);
        }

        /* ── ATTRACTIONS ── */
        .dp-attr-wrap { background: #0d0d0d; border-bottom: 1px solid rgba(255,255,255,0.05); }
        .dp-attr-grid { display: grid; grid-template-columns: repeat(3, 1fr); gap: 18px; }
        @media (max-width: 900px) { .dp-attr-grid { grid-template-columns: 1fr 1fr; } }
        @media (max-width: 560px) { .dp-attr-grid { grid-template-columns: 1fr; } }

        .dp-attr-card {
          background: #1a1a1a;
          border: 1px solid rgba(255,255,255,0.07);
          border-radius: 12px; overflow: hidden;
          transition: transform 0.25s, border-color 0.25s;
        }
        .dp-attr-card:hover { transform: translateY(-3px); border-color: rgba(201,163,71,0.2); }

        .dp-attr-img {
          width: 100%; height: 140px;
          object-fit: cover; object-position: center;
          display: block;
        }
        .dp-attr-body { padding: 18px; }
        .dp-attr-top { display: flex; align-items: center; justify-content: space-between; margin-bottom: 8px; }
        .dp-attr-type {
          font-family: 'Montserrat', sans-serif;
          font-size: 9px; font-weight: 700; letter-spacing: 0.14em; text-transform: uppercase;
          color: var(--gold);
        }
        .dp-attr-thrill {
          padding: 3px 8px; border-radius: 5px;
          font-family: 'Montserrat', sans-serif;
          font-size: 9px; font-weight: 700; letter-spacing: 0.1em; text-transform: uppercase;
        }
        .dp-thrill-mild { background: rgba(52,168,83,0.15); color: #4caf70; }
        .dp-thrill-moderate { background: rgba(251,188,4,0.15); color: #f0b429; }
        .dp-thrill-thrilling { background: rgba(234,67,53,0.15); color: #f06050; }

        .dp-attr-name {
          font-family: 'Cormorant Garamond', serif;
          font-size: 1.15rem; font-weight: 500; color: #fff;
          margin-bottom: 6px; line-height: 1.2;
        }
        .dp-attr-desc {
          font-family: 'Montserrat', sans-serif;
          font-size: 11.5px; font-weight: 400; line-height: 1.65;
          color: rgba(255,255,255,0.45);
        }
        .dp-attr-park {
          margin-top: 10px; padding-top: 8px;
          border-top: 1px solid rgba(255,255,255,0.06);
          font-family: 'Montserrat', sans-serif;
          font-size: 9.5px; font-weight: 500; color: rgba(255,255,255,0.25);
          letter-spacing: 0.08em; text-transform: uppercase;
        }

        /* ── TRANSFER CTA ── */
        .dp-transfer-wrap {
          background: #0a1f44;
          border-top: 1px solid rgba(201,163,71,0.15);
          border-bottom: 1px solid rgba(201,163,71,0.15);
        }
        .dp-transfer-inner {
          max-width: 1200px; margin: 0 auto; padding: 72px 5vw;
          display: grid; grid-template-columns: 1.1fr 1fr; gap: 60px; align-items: center;
        }
        @media (max-width: 900px) { .dp-transfer-inner { grid-template-columns: 1fr; gap: 36px; } }

        .dp-transfer-title {
          font-family: 'Cormorant Garamond', serif;
          font-size: clamp(2.2rem, 4.5vw, 3.4rem);
          font-weight: 400; color: #fff; line-height: 1.1; margin-bottom: 16px;
        }
        .dp-transfer-title em { font-style: italic; color: var(--gold); }
        .dp-transfer-desc {
          font-family: 'Montserrat', sans-serif;
          font-size: 14px; font-weight: 400; line-height: 1.8;
          color: rgba(255,255,255,0.6); margin-bottom: 32px;
        }
        .dp-transfer-rates { display: flex; flex-direction: column; gap: 10px; }
        .dp-transfer-rate {
          display: flex; align-items: center; justify-content: space-between;
          padding: 14px 20px; border-radius: 10px;
          background: rgba(255,255,255,0.06); border: 1px solid rgba(255,255,255,0.1);
        }
        .dp-rate-route {
          font-family: 'Montserrat', sans-serif;
          font-size: 13px; font-weight: 500; color: rgba(255,255,255,0.85);
        }
        .dp-rate-route span { color: rgba(255,255,255,0.3); margin: 0 6px; }
        .dp-rate-price {
          font-family: 'Cormorant Garamond', serif;
          font-size: 1.5rem; font-weight: 500; color: var(--gold);
        }
        .dp-rate-pax {
          font-family: 'Montserrat', sans-serif;
          font-size: 11px; color: rgba(255,255,255,0.3); margin-top: 2px;
        }

        /* ── TIPS ── */
        .dp-tips-wrap { background: #111318; border-bottom: 1px solid rgba(255,255,255,0.05); }
        .dp-tips-grid { display: grid; grid-template-columns: repeat(2, 1fr); gap: 20px; }
        @media (max-width: 640px) { .dp-tips-grid { grid-template-columns: 1fr; } }

        .dp-tip-card {
          display: flex; gap: 16px; padding: 24px;
          background: #1c1c24;
          border: 1px solid rgba(255,255,255,0.07);
          border-radius: 12px; transition: border-color 0.22s;
        }
        .dp-tip-card:hover { border-color: rgba(201,163,71,0.2); }
        .dp-tip-icon {
          width: 42px; height: 42px; border-radius: 10px;
          background: rgba(201,163,71,0.1); border: 1px solid rgba(201,163,71,0.2);
          display: flex; align-items: center; justify-content: center;
          flex-shrink: 0; color: var(--gold);
        }
        .dp-tip-icon svg { width: 20px; height: 20px; }
        .dp-tip-title {
          font-family: 'Montserrat', sans-serif;
          font-size: 13px; font-weight: 700; color: #fff;
          margin-bottom: 7px;
        }
        .dp-tip-body {
          font-family: 'Montserrat', sans-serif;
          font-size: 12.5px; font-weight: 400; line-height: 1.7;
          color: rgba(255,255,255,0.5);
        }

        /* ── CTA STRIP ── */
        .dp-cta-strip { background: #0d0d0d; padding: 60px 5vw; border-top: 1px solid rgba(255,255,255,0.05); }
        .dp-cta-inner {
          max-width: 1200px; margin: 0 auto;
          display: flex; align-items: center; justify-content: space-between;
          flex-wrap: wrap; gap: 24px;
        }
        .dp-cta-text {
          font-family: 'Cormorant Garamond', serif;
          font-size: clamp(1.6rem, 3vw, 2.2rem); font-weight: 400; color: #fff;
        }
        .dp-cta-text em { font-style: italic; color: var(--gold); }
        .dp-cta-btns { display: flex; gap: 12px; flex-wrap: wrap; }

        @keyframes dp-fadeup { from { opacity:0; transform:translateY(22px); } to { opacity:1; transform:translateY(0); } }
        .dp-a1 { animation: dp-fadeup 0.7s 0.1s both; }
        .dp-a2 { animation: dp-fadeup 0.7s 0.25s both; }
      `}</style>

      <div className="dp-root">

        {/* ── HERO ── */}
        <div className="dp-hero">
          <div className="dp-hero-bg" />
          <div className="dp-hero-overlay" />
          <div className="dp-hero-inner">
            <div className="dp-a1">
              <div className="dp-eyebrow">
                <span className="dp-eyebrow-line" />
                Destination Guide
              </div>
              <h1 className="dp-hero-title">
                Disneyland<br /><em>Paris</em>
              </h1>
              <p className="dp-hero-desc">
                Located just 32 km from central Paris, the most visited theme park resort in Europe awaits. Two iconic parks, magical characters, and memories that last a lifetime.
              </p>
              <div className="dp-hero-btns">
                <Link href="/reservation" className="dp-btn dp-btn-primary">Book Your Transfer</Link>
                <Link href="/rates" className="dp-btn dp-btn-ghost">View Rates</Link>
              </div>
            </div>

            <div className="dp-hero-card dp-a2">
              <div className="dp-hero-card-label">Resort at a glance</div>
              <div className="dp-hero-stat-grid">
                <div><div className="dp-hero-stat-val">2</div><div className="dp-hero-stat-lbl">Theme Parks</div></div>
                <div><div className="dp-hero-stat-val">32km</div><div className="dp-hero-stat-lbl">From Paris</div></div>
                <div><div className="dp-hero-stat-val">7</div><div className="dp-hero-stat-lbl">Disney Hotels</div></div>
                <div><div className="dp-hero-stat-val">€2B</div><div className="dp-hero-stat-lbl">Transformation</div></div>
              </div>
              <div className="dp-hero-divider" />
              <Link href="/reservation" className="dp-hero-transfer-cta">
                <div className="dp-hero-transfer-icon">
                  <svg fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"/>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"/>
                  </svg>
                </div>
                <div>
                  <div className="dp-htc-label">Private Transfer from</div>
                  <div className="dp-htc-value">CDG · Orly · Paris — from €70</div>
                </div>
              </Link>
            </div>
          </div>
        </div>

        {/* ── PARKS ── */}
        <div className="dp-parks-wrap">
          <div className="dp-section">
            <span className="dp-section-label">Two Worlds of Magic</span>
            <h2 className="dp-section-title">The <em>Parks</em></h2>
            <p className="dp-section-sub">Two distinct theme parks — from timeless fairytale classics to thrilling new adventures.</p>
            <div className="dp-parks-grid">
              {PARKS.map((p, i) => (
                <div key={i} className="dp-park-card">
                  <img src={p.img} alt={p.name} className="dp-park-img" />
                  <div className="dp-park-body">
                    <div className={`dp-park-tag dp-park-tag-${i === 0 ? "gold" : "blue"}`}>{p.tag}</div>
                    <h3 className="dp-park-name">{p.name}</h3>
                    <p className="dp-park-desc">{p.desc}</p>
                    <div className="dp-park-lands">{p.lands.map(l => <span key={l} className="dp-land-pill">{l}</span>)}</div>
                    <div className="dp-park-highlight">{p.highlight}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* ── NEWS ── */}
        <div className="dp-news-wrap">
          <div className="dp-section">
            <span className="dp-section-label">Latest News</span>
            <h2 className="dp-section-title">What's <em>New</em></h2>
            <p className="dp-section-sub">Disneyland Paris is in the middle of its biggest ever transformation. Here's what's happening.</p>
            <div className="dp-new-grid">
              {NEWS.map((n, i) => (
                <div key={i} className="dp-new-card">
                  <img src={n.img} alt={n.title} className="dp-new-img" />
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
        <div className="dp-attr-wrap">
          <div className="dp-section">
            <span className="dp-section-label">Must-Do Rides</span>
            <h2 className="dp-section-title">Top <em>Attractions</em></h2>
            <p className="dp-section-sub">From gentle classics to heart-pounding coasters, here are the rides you cannot miss.</p>
            <div className="dp-attr-grid">
              {ATTRACTIONS.map((a, i) => (
                <div key={i} className="dp-attr-card">
                  <img src={a.img} alt={a.name} className="dp-attr-img" />
                  <div className="dp-attr-body">
                    <div className="dp-attr-top">
                      <div className="dp-attr-type">{a.type}</div>
                      <div className={`dp-attr-thrill dp-thrill-${a.thrill.toLowerCase()}`}>{a.thrill}</div>
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

        {/* ── TRANSFER CTA ── */}
        <div className="dp-transfer-wrap">
          <div className="dp-transfer-inner">
            <div>
              <span className="dp-section-label">Paris Easy Move</span>
              <h2 className="dp-transfer-title">The <em>smartest way</em><br />to reach the magic</h2>
              <p className="dp-transfer-desc">Skip the crowded RER train and arrive relaxed. Door-to-door from your hotel or airport — fixed price, flight-tracked, free child seats.</p>
              <div style={{ display: "flex", gap: 12, flexWrap: "wrap" }}>
                <Link href="/reservation" className="dp-btn dp-btn-primary">Book Transfer Now</Link>
                <Link href="/rates" className="dp-btn dp-btn-ghost">See All Rates</Link>
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
                    <div className="dp-rate-route">{r.from} <span>→</span> {r.to}</div>
                    <div className="dp-rate-pax">{r.pax}</div>
                  </div>
                  <div className="dp-rate-price">{r.price}</div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* ── TIPS ── */}
        <div className="dp-tips-wrap">
          <div className="dp-section">
            <span className="dp-section-label">Visitor Guide</span>
            <h2 className="dp-section-title">Planning <em>Tips</em></h2>
            <p className="dp-section-sub">Everything you need to know before you go.</p>
            <div className="dp-tips-grid">
              {TIPS.map((t, i) => (
                <div key={i} className="dp-tip-card">
                  <div className="dp-tip-icon">
                    <svg fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                      <path strokeLinecap="round" strokeLinejoin="round" d={t.icon} />
                    </svg>
                  </div>
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
            <div className="dp-cta-text">Ready for the <em>magic?</em></div>
            <div className="dp-cta-btns">
              <Link href="/reservation" className="dp-btn dp-btn-primary">Book Your Transfer</Link>
              <a href="https://wa.me/33652466694" target="_blank" rel="noopener noreferrer" className="dp-btn dp-btn-ghost">WhatsApp Us</a>
            </div>
          </div>
        </div>

      </div>
    </>
  );
}