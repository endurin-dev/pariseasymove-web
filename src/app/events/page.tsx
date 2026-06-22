// src/app/events/page.tsx
import { Suspense } from "react";
import type { Metadata } from "next";
import {
  getParisEvents,
  getEuropeEvents,
  getFeaturedEvents,
  getManualEvents, 
  mergeAndSort,
} from "@/lib/events";
import EventsClient from "./EventsClient";
import EventCardSkeleton from "@/components/EventCardSkeleton";

export const revalidate = 21600; // 6 hours ISR

export const metadata: Metadata = {
  title: "Paris Events & Festivals | Paris Easy Move",
  description:
    "Find upcoming events, festivals, concerts and special activities in Paris and Europe. Book your transfer with Paris Easy Move.",
  openGraph: {
    title: "Paris Events & Festivals",
    description:
      "Discover concerts, festivals, exhibitions and special events during your trip to Paris and Europe.",
    images: [
      {
        url: "https://images.unsplash.com/photo-1502602898657-3e91760cbb34?w=1200",
        width: 1200,
        height: 630,
        alt: "Paris Events",
      },
    ],
  },
};

// JSON-LD structured data
function EventsJsonLd() {
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{
        __html: JSON.stringify({
          "@context": "https://schema.org",
          "@type": "ItemList",
          name: "Paris Events & Festivals",
          description:
            "Upcoming events, concerts, and festivals in Paris and Europe",
          url: "https://pariseasymove.com/events",
        }),
      }}
    />
  );
}

function SkeletonGrid() {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
      {Array.from({ length: 6 }).map((_, i) => (
        <EventCardSkeleton key={i} />
      ))}
    </div>
  );
}

async function EventsData() {
  const [parisEvents, europeEvents, featuredEvents] = await Promise.all([
    getParisEvents(),
    getEuropeEvents(),
    getFeaturedEvents(),
     getManualEvents(),
  ]);

  const allEvents = mergeAndSort([parisEvents, europeEvents]);

  return (
    <EventsClient
      allEvents={allEvents}
      parisEvents={parisEvents}
      europeEvents={europeEvents}
      featuredEvents={featuredEvents}
    />
  );
}

export default function EventsPage() {
  return (
    <>
      <EventsJsonLd />

      {/* ── Hero ──────────────────────────────────────────────────── */}
      <section className="relative min-h-105 flex items-end pb-16 overflow-hidden">
        {/* Background */}
        <div
          className="absolute inset-0 bg-cover bg-center"
          style={{
            backgroundImage:
              "url('https://images.unsplash.com/photo-1502602898657-3e91760cbb34?w=1600&q=80')",
          }}
        />
        {/* Gradient overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-900/70 to-slate-900/30" />

        <div className="relative z-10 max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
          {/* Eyebrow */}
          <p className="text-sky-400 text-sm font-semibold tracking-widest uppercase mb-3">
            Paris Easy Move
          </p>
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-white leading-tight max-w-2xl">
            Events in Paris <br />
            <span className="text-sky-400">&amp; Europe</span>
          </h1>
          <p className="mt-4 text-lg text-slate-300 max-w-xl">
            Discover concerts, festivals, exhibitions and special events during
            your trip.
          </p>
        </div>
      </section>

      {/* ── Content ───────────────────────────────────────────────── */}
      <div className="bg-slate-50 min-h-screen">
        <Suspense fallback={<div className="max-w-6xl mx-auto px-4 py-16"><SkeletonGrid /></div>}>
          <EventsData />
        </Suspense>
      </div>
    </>
  );
}
