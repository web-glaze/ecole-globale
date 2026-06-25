import type { Metadata } from "next";
import { Libre_Caslon_Text, Inter, Manrope } from "next/font/google";
import "./globals.css";
import { cn } from "@/lib/utils";
import { getSiteSettings } from "@/lib/getSiteSettings";
import Navbar from "@/components/navbar";
import BottomNavigation from "@/components/bottomNavigation";

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

export async function generateMetadata(): Promise<Metadata> {
  const settings = await getSiteSettings();

  const title = settings.defaultMetaTitle || settings.siteName;
  const description = settings.defaultMetaDescription || settings.tagline;

  return {
    title,
    description,
    applicationName: settings.siteName,
    authors: [
      {
        name: settings.siteName,
      },
    ],

    creator: settings.siteName,
    publisher: settings.siteName,
  };
}

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const settings = await getSiteSettings();
  return (
    <html lang="en" className={cn("h-full", "antialiased", "font-sans", libreCaslonText.variable, manropeHeading.variable)}>
      <body className="min-h-full flex flex-col">
        <Navbar settings={settings} />
        {children}
        <BottomNavigation />
      </body>
    </html>
  );
}
