import type { Metadata } from "next";
import { Space_Grotesk, Inter } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";

const spaceGrotesk = Space_Grotesk({
  subsets: ["latin"],
  variable: "--font-space-grotesk",
  display: "swap",
});

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

export const metadata: Metadata = {
  title: {
    default: "St. Louis Creations | Custom Laser Engraving & 3D Printing",
    template: "%s | St. Louis Creations",
  },
  description:
    "Custom laser engraving, cutting & 3D printing for businesses that demand precision at scale. Bulk orders, fast turnaround, any material.",
  metadataBase: new URL("https://stlouiscreations.com"),
  openGraph: {
    type: "website",
    siteName: "St. Louis Creations",
    locale: "en_US",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="scroll-smooth">
      <body
        className={`${spaceGrotesk.variable} ${inter.variable} font-body antialiased bg-background text-text`}
      >
        <Navbar />
        <main>{children}</main>
        <Footer />
      </body>
    </html>
  );
}
