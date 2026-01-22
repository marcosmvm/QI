import type { Metadata } from "next";
import { Sora, Inter } from "next/font/google";
import { SpeedInsights } from "@vercel/speed-insights/next";
import "./globals.css";

const sora = Sora({
  subsets: ["latin"],
  variable: "--font-sora",
  display: "swap",
});

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

export const metadata: Metadata = {
  title: "Quantum Insights | AI-Powered B2B Lead Generation",
  description: "Transform your outbound sales with AI-powered cold email automation. Book qualified meetings on autopilot with our 5 specialized AI engines.",
  keywords: ["B2B lead generation", "cold email automation", "AI sales", "appointment setting", "outbound marketing"],
  icons: {
    icon: "/favicon.ico",
  },
  openGraph: {
    title: "Quantum Insights | AI-Powered B2B Lead Generation",
    description: "Transform your outbound sales with AI-powered cold email automation.",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${sora.variable} ${inter.variable} antialiased bg-deep-space text-silver min-h-screen`}>
        {children}
        <SpeedInsights />
      </body>
    </html>
  );
}
