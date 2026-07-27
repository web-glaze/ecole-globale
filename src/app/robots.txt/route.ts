import { getPayload } from "payload";
import config from "@payload-config";

export async function GET() {
  const payload = await getPayload({ config });

  const settings = await payload.findGlobal({
    slug: "site-settings",
  });

  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL?.replace(/\/$/, "") || "";

  const robots = (
    settings.robotsTxt ||
    `User-agent: *
    Allow: /

    Disallow: /admin

    Sitemap: {{SITE_URL}}/sitemap.xml`
  ).replaceAll("{{SITE_URL}}", siteUrl);

  return new Response(robots, {
    headers: {
      "Content-Type": "text/plain",
      "Cache-Control": "no-store",
    },
  });
}
