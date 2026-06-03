import type { Metadata } from "next";
import { Archivo, Inter } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import ContactLauncher from "@/components/layout/ContactLauncher";
import { CartProvider } from "@/lib/cart-context";
import JsonLd from "@/components/seo/JsonLd";
import { getSiteJsonLd } from "@/lib/seo";

const archivo = Archivo({
  subsets: ["latin"],
  variable: "--font-archivo",
  display: "swap",
  weight: ["400", "500", "600", "700", "800", "900"],
});

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

export const metadata: Metadata = {
  title: {
    default: "St. Louis Creations | Digital Fabrication Studio",
    template: "%s | St. Louis Creations",
  },
  description:
    "Creatively Engineered Reality. A St. Louis digital fabrication studio for precision laser engraving, additive manufacturing, and custom production.",
  metadataBase: new URL("https://stlouiscreations.com"),
  alternates: {
    canonical: "https://stlouiscreations.com",
  },
  openGraph: {
    type: "website",
    siteName: "St. Louis Creations",
    locale: "en_US",
    images: [
      {
        url: "/og-image.png",
        width: 1200,
        height: 630,
        alt: "St. Louis Creations — Digital Fabrication Studio",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "St. Louis Creations",
    description:
      "Creatively Engineered Reality. Precision laser engraving, additive manufacturing, and custom production.",
    images: ["/og-image.png"],
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
        className={`${archivo.variable} ${inter.variable} font-body antialiased bg-background text-text`}
      >
        <CartProvider>
          <JsonLd data={getSiteJsonLd()} />
          <Navbar />
          <main>{children}</main>
          <Footer />
          <ContactLauncher />
        </CartProvider>
      </body>
    </html>
  );
}
