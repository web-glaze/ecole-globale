import type { Metadata } from "next";
import Script from "next/script";

import "./globals.css";

import { cn } from "@/lib/utils";
import { getNavigation } from "@/lib/getNavigation";
import { getSiteSettings } from "@/lib/getSiteSettings";
import { generateSEOMetadata } from "@/lib/seo";

import EnquiryPopup from "@/components/EnquiryPopup";
import Navbar from "@/components/navbar";
import BottomNavigation from "@/components/bottomNavigation";
import { SiteSettingsProvider } from "@/lib/site-settings-context";

import CustomScripts from "@/components/CustomScripts";

import { Cinzel, Inter } from "next/font/google";

const cinzel = Cinzel({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-cinzel",
});

const inter = Inter({
  subsets: ["latin"],
  weight: "400",
  variable: "--font-inter",
});

export async function generateMetadata(): Promise<Metadata> {
  const settings = await getSiteSettings();

  return generateSEOMetadata({
    settings,
  });
}

export default async function RootLayout({ children }: { children: React.ReactNode }) {
  const settings = await getSiteSettings();
  const navigation = await getNavigation();

  return (
    <html lang="en" className={cn("h-full", "antialiased", inter.variable, cinzel.variable)}>
      <head>
        <CustomScripts html={settings.headScripts} location="head" />
      </head>

      <body className="min-h-full flex flex-col">
        {/* Scripts immediately after <body> */}
        <CustomScripts html={settings.afterBodyScripts} location="body" />

        <Script src="https://t.contentsquare.net/uxa/3304c3674532d.js" strategy="afterInteractive" />

        <SiteSettingsProvider settings={settings} navigation={navigation}>
          <Navbar />

          {children}

          <BottomNavigation />
        </SiteSettingsProvider>

        <EnquiryPopup />

        {/* Scripts before </body> */}
        <CustomScripts html={settings.beforeBodyCloseScripts} location="body" />
      </body>
    </html>
  );
}
