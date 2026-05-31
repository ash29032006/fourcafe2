import type { Metadata } from "next";
import { Playfair_Display, Inter } from "next/font/google";
import "./globals.css";

const playfair = Playfair_Display({
  variable: "--font-playfair",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  display: "swap",
});

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  weight: ["300", "400", "500"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "FOUR — A Lifestyle Universe",
  description:
    "Where cuisine, culture, design, fashion, music, and community converge as one experience. FOUR is built for people who value atmosphere, exclusivity, creativity, and meaningful experiences.",
  keywords: [
    "FOUR",
    "luxury café",
    "lifestyle",
    "fine dining",
    "exclusive experiences",
    "membership",
  ],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      suppressHydrationWarning
      className={`${playfair.variable} ${inter.variable} antialiased`}
    >
      <body>{children}</body>
    </html>
  );
}
