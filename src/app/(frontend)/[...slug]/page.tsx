import { getPayload } from "payload";
import configPromise from "@payload-config";
import type { Metadata } from "next";
import { redirect } from "next/navigation";
import Script from "next/script";

import PageContent from "./PageContent";
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
  const customCSS = page.customCSS?.replace(/\r\n/g, "\n").trim();
  const customJS = page.customJS?.replace(/\r\n/g, "\n").trim();

  if (!page) {
    redirect("/");
  }

  if (page.slug === "admission/online-application-process") {
    return <AdmissionPage page={page} />;
  }

  return (
    <>
      {customCSS && (
        <style
          dangerouslySetInnerHTML={{
            __html: customCSS,
          }}
        />
      )}

      <PageContent page={page} />

      {customJS && (
        <Script
          id={`page-js-${page.id}`}
          strategy="afterInteractive"
          dangerouslySetInnerHTML={{
            __html: customJS,
          }}
        />
      )}
    </>
  );
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
