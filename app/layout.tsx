import type { Metadata } from "next";
import { Sora, Inter } from "next/font/google";
import Navbar from "@/app/components/Navbar";
import Footer from "@/app/components/Footer";
import "./globals.css";

const sora = Sora({
  subsets: ["latin"],
  weight: ["500", "600", "700"],
  variable: "--font-sora",
});

const inter = Inter({
  subsets: ["latin"],
  weight: ["400", "500", "600"],
  variable: "--font-inter",
});

export const metadata: Metadata = {
  title: "Magnet Media | Agjenci Marketingu në Tiranë",
  description:
    "Nga koncepti, tek marketingu që krijon impakt. Reklamim TV & Radio, Outdoor, Evente, Prodhim Përmbajtjeje, Reklamim Digjital, Branding, Marketing Digjital dhe Influencer Marketing.",
  metadataBase: new URL("https://magnetmedia.al"),
  openGraph: {
    title: "Magnet Media | Agjenci Marketingu",
    description: "Magnetizo brandin tënd. Strategji. Kreativitet. Impakt.",
    locale: "sq_AL",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="sq" className={`${sora.variable} ${inter.variable}`}>
      <body>
        <Navbar />
        <main className="pt-[76px]">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
