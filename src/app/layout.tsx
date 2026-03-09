import type { Metadata } from "next";
import '@/app/globals.css';
import { Inter, Montserrat } from "next/font/google";

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
  title: "Paris Easy Move – Private Airport Transfers, Disney & City Shuttles",
  description:
    "Premium private transfers in Paris: CDG, Orly, Beauvais to Disneyland Paris, city center, Versailles. No hidden fees, pay at end.",
  openGraph: {
    title: "Paris Easy Move – Luxury Airport Transfers & Shuttles",
    description:
      "Reliable, affordable private transfers to/from Paris airports, Disneyland, Versailles. Book now – no prepayment.",
    images:
      "https://images.unsplash.com/photo-1502602898657-3e91760cbb34?auto=format&fit=crop&q=80",
  },
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
        {children}
      </body>
    </html>
  );
}
