import { getPayload } from "payload";
import configPromise from "@payload-config";
import type { Metadata } from "next";
import { notFound } from "next/navigation";

import PostContent from "./PostContent";

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

  return result.docs[0];
}

export default async function LatestUpdatePage({ params }: Props) {
  const { slug } = await params;

  const post = await getPost(slug);

  if (!post) {
    notFound();
  }

  return <PostContent post={post} />;
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;

  const post = await getPost(slug);

  if (!post) return {};

  return {
    title: post.seo?.metaTitle || post.title,
    description: post.seo?.metaDescription,
    openGraph: {
      images: post.seo?.ogImage?.cloudinary?.secure_url ? [post.seo.ogImage.cloudinary.secure_url] : [],
    },
  };
}
