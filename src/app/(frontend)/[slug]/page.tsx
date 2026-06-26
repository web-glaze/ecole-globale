import { getPayload } from "payload";
import configPromise from "@payload-config";
import { notFound } from "next/navigation";
import PageContent from "./PageContent";

export default async function Page({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;

  const payload = await getPayload({
    config: configPromise,
  });

  const result = await payload.find({
    collection: "pages",
    where: {
      slug: {
        equals: slug,
      },
    },
    limit: 1,
    depth: 2,
  });

  const page = result.docs[0];

  if (!page) {
    notFound();
  }

  return <PageContent page={page} />;
}

import type { Metadata } from "next";

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;

  const payload = await getPayload({
    config: configPromise,
  });

  const result = await payload.find({
    collection: "pages",
    where: {
      slug: {
        equals: slug,
      },
    },
    limit: 1,
    depth: 2,
  });

  const page = result.docs[0];

  if (!page) {
    return {};
  }

  return {
    title: page.seo?.metaTitle || page.title,
    description: page.seo?.metaDescription,
    openGraph: {
      images: page.seo?.ogImage?.url ? [page.seo.ogImage.url] : [],
    },
  };
}
