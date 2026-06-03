import type { Metadata } from "next";
import { Inter, Lora } from "next/font/google";

import { Footer } from "@/components/Footer";
import { NavigationBar } from "@/components/NavigationBar";

import "./globals.css";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

const lora = Lora({
  subsets: ["latin"],
  variable: "--font-lora",
  display: "swap",
});

export const metadata: Metadata = {
  title: "ResQ Organics — Cellular Healing, Driven by Science",
  description:
    "Premium medical-grade Manuka honey and bio-active botanical skincare. Clinically aligned relief for you, your family, and your pets.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`h-full antialiased ${inter.variable} ${lora.variable}`}>
      <body className="flex min-h-full flex-col bg-warm-sand font-sans text-charcoal">
        <NavigationBar />
        <main className="flex-1">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
