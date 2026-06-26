import type { Metadata } from "next";
import { DM_Sans, Instrument_Serif } from "next/font/google";
import "./globals.css";

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
  title: "Become — Enter the Body",
  description:
    "A body navigation system. Enter the body. Push back the fog. Discover the map that has always been there.",
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
        {children}
      </body>
    </html>
  );
}
