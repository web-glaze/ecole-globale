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

  const metadata = generateSEOMetadata({
    settings,
  });

  // Payload favicon
  const favicon = typeof settings.favicon === "object" && settings.favicon?.url ? settings.favicon.url : undefined;

  return {
    ...metadata,

    icons: favicon
      ? {
          icon: favicon,
          shortcut: favicon,
          apple: favicon,
        }
      : undefined,
  };
}

export default async function RootLayout({ children }: { children: React.ReactNode }) {
  const settings = await getSiteSettings();
  const navigation = await getNavigation();

  return (
    <html lang="en" className={cn("h-full", "antialiased", inter.variable, cinzel.variable)}>
      <head>
        {/* Facebook Pixel */}
        <Script id="facebook-pixel" strategy="afterInteractive">
          {`
        !function(f,b,e,v,n,t,s)
      {
        if(f.fbq)return;
        n=f.fbq=function(){
          n.callMethod ?
          n.callMethod.apply(n,arguments) :
          n.queue.push(arguments)
        };
        if(!f._fbq)f._fbq=n;
        n.push=n;
        n.loaded=!0;
        n.version='2.0';
        n.queue=[];
        t=b.createElement(e);
        t.async=!0;
        t.src=v;
        s=b.getElementsByTagName(e)[0];
        s.parentNode.insertBefore(t,s)
      }(
        window,
        document,
        'script',
        'https://connect.facebook.net/en_US/fbevents.js'
      );

      fbq('init', '1033752393439199');
      fbq('track', 'PageView');
    `}
        </Script>

        {/* Google Ads */}
        <Script src="https://www.googletagmanager.com/gtag/js?id=AW-10787874522" strategy="afterInteractive" />

        <Script id="google-ads" strategy="afterInteractive">
          {`
      window.dataLayer = window.dataLayer || [];
      function gtag(){dataLayer.push(arguments);}
      gtag('js', new Date());
      gtag('config', 'AW-10787874522');
    `}
        </Script>

        {/* Google Tag Manager */}
        <Script id="google-tag-manager" strategy="afterInteractive">
          {`
      (function(w,d,s,l,i){
        w[l]=w[l]||[];
        w[l].push({
          'gtm.start': new Date().getTime(),
          event:'gtm.js'
        });

        var f=d.getElementsByTagName(s)[0],
            j=d.createElement(s),
            dl=l!='dataLayer' ? '&l='+l : '';

        j.async=true;
        j.src='https://www.googletagmanager.com/gtm.js?id='+i+dl;

        f.parentNode.insertBefore(j,f);
      })(window,document,'script','dataLayer','GTM-5XGQBB5M');
    `}
        </Script>
      </head>

      <body className="min-h-full flex flex-col">
        {/* Google Tag Manager noscript */}
        <noscript>
          <iframe
            src="https://www.googletagmanager.com/ns.html?id=GTM-5XGQBB5M"
            height="0"
            width="0"
            style={{
              display: "none",
              visibility: "hidden",
            }}
          />
        </noscript>

        {/* Facebook Pixel noscript */}
        <noscript>
          <img height="1" width="1" style={{ display: "none" }} src="https://www.facebook.com/tr?id=1033752393439199&ev=PageView&noscript=1" />
        </noscript>

        <Script src="https://t.contentsquare.net/uxa/3304c3674532d.js" strategy="afterInteractive" />

        <SiteSettingsProvider settings={settings} navigation={navigation}>
          <Navbar />

          {children}

          <BottomNavigation />
        </SiteSettingsProvider>

        <EnquiryPopup />
      </body>
    </html>
  );
}
