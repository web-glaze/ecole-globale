import type { Metadata } from "next";

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL?.replace(/\/$/, "") || "";

function getMediaURL(image: any) {
  if (!image) return undefined;

  if (typeof image === "string") {
    return image.startsWith("http") ? image : `${SITE_URL}${image}`;
  }

  if (image.url) {
    return image.url.startsWith("http") ? image.url : `${SITE_URL}${image.url}`;
  }

  return undefined;
}

export function generateSEOMetadata({ page, settings, pathname }: { page?: any; settings?: any; pathname?: string }): Metadata {
  const seo = page?.seo || {};

  const title = seo.metaTitle || page?.title || settings?.defaultMetaTitle || settings?.siteName;

  const description = seo.metaDescription || settings?.defaultMetaDescription || settings?.tagline || "";

  const canonical =
    seo.canonicalURL ||
    (pathname ? `${SITE_URL}${pathname.startsWith("/") ? pathname : `/${pathname}`}` : page?.slug ? `${SITE_URL}/${page.slug === "home" ? "" : page.slug}` : SITE_URL);

  const image = getMediaURL(seo.ogImage) || getMediaURL(settings?.defaultOgImage);

  const robots: string[] = [];

  if (seo.noIndex ?? settings?.robotsNoIndex) robots.push("noindex");
  else robots.push("index");

  if (seo.noFollow ?? settings?.robotsNoFollow) robots.push("nofollow");
  else robots.push("follow");

  if (seo.noArchive ?? settings?.robotsNoArchive) robots.push("noarchive");

  if (seo.noImageIndex ?? settings?.robotsNoImageIndex) robots.push("noimageindex");

  if (seo.noSnippet ?? settings?.robotsNoSnippet) robots.push("nosnippet");

  robots.push(`max-snippet:${seo.maxSnippet ?? settings?.maxSnippet ?? -1}`);

  robots.push(`max-video-preview:${seo.maxVideoPreview ?? settings?.maxVideoPreview ?? -1}`);

  robots.push(`max-image-preview:${seo.maxImagePreview ?? settings?.maxImagePreview ?? "large"}`);

  return {
    title,
    description,

    keywords: seo.keywords ? seo.keywords.split(",").map((k: string) => k.trim()) : undefined,

    alternates: {
      canonical,
    },

    robots: robots.join(", "),

    openGraph: {
      title: seo.ogTitle || title,
      description: seo.ogDescription || description,
      url: canonical,
      siteName: settings?.siteName,
      type: "website",

      images: image
        ? [
            {
              url: image,
            },
          ]
        : [],
    },

    twitter: {
      card: "summary_large_image",
      title: seo.ogTitle || title,
      description: seo.ogDescription || description,
      images: image ? [image] : [],
    },

    verification: {
      google: settings?.googleVerification,
      other: {
        bing: settings?.bingVerification,
        yandex: settings?.yandexVerification,
      },
    },
  };
}
