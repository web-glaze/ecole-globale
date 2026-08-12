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

import { Cinzel, Inter, Cabin, Urbanist, DM_Sans } from "next/font/google";

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
        {settings.headScripts && (
          <Script
            id="head-scripts"
            strategy="beforeInteractive"
            dangerouslySetInnerHTML={{
              __html: settings.headScripts,
            }}
          />
        )}
      </head>

      <body className="min-h-full flex flex-col">
        {settings.afterBodyScripts && (
          <Script
            id="after-body"
            strategy="afterInteractive"
            dangerouslySetInnerHTML={{
              __html: settings.afterBodyScripts,
            }}
          />
        )}

        <Script src="https://t.contentsquare.net/uxa/3304c3674532d.js" strategy="afterInteractive" />

        <SiteSettingsProvider settings={settings} navigation={navigation}>
          <Navbar />
          {children}
          <BottomNavigation />
        </SiteSettingsProvider>

        {settings.beforeBodyCloseScripts && (
          <Script
            id="before-close"
            strategy="afterInteractive"
            dangerouslySetInnerHTML={{
              __html: settings.beforeBodyCloseScripts,
            }}
          />
        )}
      </body>
      <EnquiryPopup />
    </html>
  );
}
