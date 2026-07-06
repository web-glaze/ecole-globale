import { getPayload } from "payload";
import configPromise from "@payload-config";
import { notFound } from "next/navigation";
import PageContent from "./PageContent";
import type { Metadata } from "next";
import { redirect } from "next/navigation";
import AdmissionPage from "./AdmissionPage";

type Props = {
  params: Promise<{
    slug: string[];
  }>;
};

async function getPage(slugArray: string[]) {
  const payload = await getPayload({
    config: configPromise,
  });

  // Convert ["about-us", "about-school"] -> "about-us/about-school"
  const slug = slugArray.join("/");

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

  return result.docs[0];
}

export default async function Page({ params }: Props) {
  const { slug } = await params;

  const page = await getPage(slug);

  if (!page) {
    redirect("/");
  }

  const isAdmissionPage = page.slug === "admission/online-application-process";

  if (isAdmissionPage) {
    return <AdmissionPage page={page} />;
  }

  return <PageContent page={page} />;
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;

  const page = await getPage(slug);

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
