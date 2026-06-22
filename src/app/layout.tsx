import type { Metadata } from "next";
import { Libre_Caslon_Text, Inter, Manrope } from "next/font/google";
import "./globals.css";
import { cn } from "@/lib/utils";

const manropeHeading = Manrope({
  subsets: ["latin"],
  variable: "--font-sans",
});

const libreCaslonText = Libre_Caslon_Text({
  subsets: ["latin"],
  variable: "--font-heading",
  weight: "400",
  style: "normal",
  display: "swap",
});

export const metadata: Metadata = {
  title: "No. 1 Girls Boarding school in Dehradun | Admissions 2026-27",
  description: "Exceptional academics, world-class faculty, and a nurturing environment. Admissions for 2026-27 are open at the best girls boarding school in Dehradun.",
  icons: {
    icon: "/favicon.png",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={cn("h-full", "antialiased", "font-sans", libreCaslonText.variable, manropeHeading.variable)}>
      <body className="min-h-full flex flex-col">{children}</body>
    </html>
  );
}
