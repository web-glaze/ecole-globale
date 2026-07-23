import type { Metadata } from "next";
import HomeClient from "@/app/(frontend)/HomeClient";
import { getHome } from "@/lib/getHome";
import { getSiteSettings } from "@/lib/getSiteSettings";
import { generateSEOMetadata } from "@/lib/seo";

export const dynamic = "force-dynamic";

export async function generateMetadata(): Promise<Metadata> {
  const [home, settings] = await Promise.all([getHome(), getSiteSettings()]);

  return generateSEOMetadata({
    page: home,
    settings,
    pathname: "/",
  });
}

export default async function HomePage() {
  const home = await getHome();

  return <HomeClient home={home} />;
}
