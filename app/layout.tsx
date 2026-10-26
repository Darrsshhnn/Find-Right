import type { Metadata, Viewport } from "next";
import { Poppins } from "next/font/google";
import "./globals.css";

const poppins = Poppins({ subsets: ["latin"], weight: ["400", "500", "600", "700"], variable: "--font-poppins", display: "swap" });

export const metadata: Metadata = {
  title: { default: "FindRight — Real designers. Real work.", template: "%s · FindRight" },
  description: "A trust-first freelance platform that matches verified clients with creative freelancers by skills, experience and availability — with secure milestone payments and transparent AI usage.",
  icons: { icon: "/favicon.svg" },
};

export const viewport: Viewport = { themeColor: "#8a38f5", width: "device-width", initialScale: 1, viewportFit: "cover" };

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={poppins.variable}>
      <body>{children}</body>
    </html>
  );
}
