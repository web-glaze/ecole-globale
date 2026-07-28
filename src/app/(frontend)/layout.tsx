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

import { Libre_Caslon_Text, Manrope } from "next/font/google";

const heading = Manrope({
  subsets: ["latin"],
  variable: "--font-sans",
});

const body = Libre_Caslon_Text({
  subsets: ["latin"],
  weight: "400",
  variable: "--font-heading",
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
    <html lang="en" className={cn("h-full", "antialiased", heading.variable, body.variable)}>
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

        {/* <Script id="tidio" src="https://code.tidio.co/soh8q34u3enonxuxlvcqmpos6njf27sh.js" strategy="afterInteractive" /> */}

        <Script id="tawk-to" strategy="afterInteractive">
          {`
            var Tawk_API = Tawk_API || {}, Tawk_LoadStart = new Date();
            (function() {
              var s1 = document.createElement("script"),
                  s0 = document.getElementsByTagName("script")[0];
              s1.async = true;
              s1.src = "https://embed.tawk.to/692969ae0d028919595450a1/1jb4s9l3s";
              s1.charset = "UTF-8";
              s1.setAttribute("crossorigin", "*");
              s0.parentNode.insertBefore(s1, s0);
            })();
          `}
        </Script>

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
