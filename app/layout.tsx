import type { Metadata } from "next";

import { NavigationBar } from "@/components/NavigationBar";

import "./globals.css";

export const metadata: Metadata = {
  title: "ResQ Organics",
  description: "Headless storefront for clean skincare and CBD wellness essentials.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="h-full antialiased">
      <body className="min-h-full bg-cream-50 text-earth-900">
        <NavigationBar />
        <main>{children}</main>
      </body>
    </html>
  );
}
