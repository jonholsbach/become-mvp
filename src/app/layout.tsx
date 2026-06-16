import type { Metadata } from "next";
import { DM_Sans, Instrument_Serif } from "next/font/google";
import "./globals.css";
import { SiteHeader } from "@/components/SiteHeader";

const dmSans = DM_Sans({
  subsets: ["latin"],
  variable: "--font-sans",
  display: "swap",
});

const instrumentSerif = Instrument_Serif({
  subsets: ["latin"],
  weight: "400",
  variable: "--font-display",
  display: "swap",
});

export const metadata: Metadata = {
  title: "Mechanical by Nature — Become",
  description:
    "The opening mission in a human calibration system. Enter the body. Push back the fog. Scan, map, mission, map update — the first playable loop of Become.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${dmSans.variable} ${instrumentSerif.variable}`}>
      <body className="min-h-screen bg-mbn-bg font-sans">
        <div className="pointer-events-none fixed inset-0 bg-grain opacity-50" aria-hidden />
        <SiteHeader />
        <main>{children}</main>
      </body>
    </html>
  );
}
