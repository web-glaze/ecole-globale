import type { MetadataRoute } from "next";
import { getPayload } from "payload";
import config from "@payload-config";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const payload = await getPayload({ config });

  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL?.replace(/\/$/, "") ?? "";

  const [pages, latestUpdates] = await Promise.all([
    payload.find({
      collection: "pages",
      draft: false,
      limit: 0,
      where: {
        "seo.noIndex": {
          not_equals: true,
        },
      },
    }),

    payload.find({
      collection: "latest-updates",
      draft: false,
      limit: 0,
      where: {
        "seo.noIndex": {
          not_equals: true,
        },
      },
    }),
  ]);

  const pageUrls: MetadataRoute.Sitemap = pages.docs.map((page) => ({
    url: page.slug === "home" ? siteUrl : `${siteUrl}/${page.slug}`,
    lastModified: new Date(page.updatedAt),
    changeFrequency: "weekly",
    priority: page.slug === "home" ? 1 : 0.8,
  }));

  const latestUrls: MetadataRoute.Sitemap = latestUpdates.docs.map((post) => ({
    url: `${siteUrl}/latest-updates/${post.slug}`,
    lastModified: new Date(post.updatedAt),
    changeFrequency: "weekly",
    priority: 0.7,
  }));

  return [
    // Home
    {
      url: siteUrl,
      lastModified: new Date(),
      changeFrequency: "daily",
      priority: 1,
    },

    ...pageUrls,
    ...latestUrls,
  ];
}
