import type { Metadata } from "next";
import "@/app/globals.css";
import { Inter, Montserrat } from "next/font/google";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

const inter = Inter({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600"],
  variable: "--font-inter",
});

const montserrat = Montserrat({
  subsets: ["latin"],
  weight: ["500", "600", "700", "800"],
  variable: "--font-montserrat",
});

export const metadata: Metadata = {
  metadataBase: new URL("https://pariseasymove.com"),

  title: {
    default: "Paris Airport Transfer | CDG, Orly, Disneyland Private Taxi",
    template: "%s | Paris Easy Move",
  },

  description:
    "Book reliable Paris airport transfer. Private taxi from CDG, Orly, Beauvais to hotel, Disneyland Paris & Versailles. Fixed prices. No hidden fees.",

  keywords: [
    "paris airport transfer",
    "cdg airport transfer paris",
    "orly airport taxi",
    "paris private chauffeur",
    "disneyland paris transfer",
    "paris taxi service",
    "airport transfer paris france",
  ],

  authors: [{ name: "Paris Easy Move" }],
  creator: "Paris Easy Move",
  publisher: "Paris Easy Move",

  robots: {
    index: true,
    follow: true,
  },

  alternates: {
    canonical: "https://pariseasymove.com",
  },

  openGraph: {
    type: "website",
    url: "https://pariseasymove.com",
    title: "Paris Airport Transfer | Private Taxi CDG, Orly & Disneyland",
    description:
      "Premium private transfers in Paris. Book CDG, Orly, Disneyland & Versailles transfers. Fixed pricing. No prepayment required.",
    siteName: "Paris Easy Move",
    images: [
      {
        url: "https://images.unsplash.com/photo-1502602898657-3e91760cbb34?auto=format&fit=crop&q=80",
        width: 1200,
        height: 630,
        alt: "Paris airport transfer service near Eiffel Tower",
      },
    ],
    locale: "en_US",
  },

  twitter: {
    card: "summary_large_image",
    title: "Paris Airport Transfer | Private Taxi CDG & Orly",
    description:
      "Book private Paris airport transfer. Reliable CDG & Orly taxi service to hotel & Disneyland.",
    images: [
      "https://images.unsplash.com/photo-1502602898657-3e91760cbb34?auto=format&fit=crop&q=80",
    ],
  },

  category: "travel",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html
      lang="en"
      className={`${inter.variable} ${montserrat.variable} scroll-smooth`}
    >
      <body className="bg-white text-gray-800 antialiased font-sans">
        
        {/* ✅ Schema Markup (VERY IMPORTANT FOR SEO) */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "TaxiService",
              name: "Paris Easy Move",
              url: "https://pariseasymove.com",
              areaServed: {
                "@type": "City",
                name: "Paris",
              },
              serviceType: "Airport Transfer",
              description:
                "Private airport transfer service in Paris including CDG, Orly, Disneyland and Versailles.",
            }),
          }}
        />

        <Header />

        <main style={{ paddingTop: "92px" }}>
          {children}
        </main>

        <Footer />
      </body>
    </html>
  );
}