import { getPayload } from "payload";
import configPromise from "@payload-config";
import type { Metadata } from "next";
import { notFound } from "next/navigation";

import PostContent from "./PostContent";
import { getSiteSettings } from "@/lib/getSiteSettings";
import { generateSEOMetadata } from "@/lib/seo";

type Props = {
  params: Promise<{
    slug: string;
  }>;
};

async function getPost(slug: string) {
  const payload = await getPayload({
    config: configPromise,
  });

  const result = await payload.find({
    collection: "latest-updates",
    where: {
      slug: {
        equals: slug,
      },
    },
    depth: 2,
    limit: 1,
  });

  return result.docs[0] ?? null;
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;

  const [post, settings] = await Promise.all([getPost(slug), getSiteSettings()]);

  if (!post) {
    return {};
  }

  return generateSEOMetadata({
    page: post,
    settings,
    pathname: `/latest-updates/${post.slug}`,
  });
}

export default async function LatestUpdatePage({ params }: Props) {
  const { slug } = await params;

  const post = await getPost(slug);

  if (!post) {
    notFound();
  }

  return <PostContent post={post} />;
}
