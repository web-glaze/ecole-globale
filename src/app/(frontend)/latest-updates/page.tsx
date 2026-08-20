export const dynamic = "force-dynamic";

import { getPayload } from "payload";
import configPromise from "@payload-config";
import Link from "next/link";
import type { Metadata } from "next";
import Footer from "@/components/footer";
import EnquirySection from "@/components/EnquirySection";
import { Clock, User, ChevronLeft, ChevronRight } from "lucide-react";

import { generateSEOMetadata } from "@/lib/seo";
import { getSiteSettings } from "@/lib/getSiteSettings";
import BlockRenderer from "@/components/blocks/BlockRenderer";
import LatestUpdatesPagination from "@/components/LatestUpdatesPagination";

export async function generateMetadata(): Promise<Metadata> {
  const payload = await getPayload({
    config: configPromise,
  });

  const [settings, pageResult] = await Promise.all([
    getSiteSettings(),
    payload.find({
      collection: "pages",
      where: {
        slug: {
          equals: "latest-updates",
        },
      },
      depth: 2,
      limit: 1,
    }),
  ]);

  const page = pageResult.docs[0];

  return generateSEOMetadata({
    page,
    settings,
    pathname: "/latest-updates",
  });
}

interface LatestUpdatesPageProps {
  searchParams: Promise<{
    page?: string;
  }>;
}

export default async function LatestUpdatesPage({ searchParams }: LatestUpdatesPageProps) {
  const payload = await getPayload({
    config: configPromise,
  });

  const params = await searchParams;

  const currentPage = Math.max(1, Number.parseInt(params.page || "1", 10) || 1);

  const postsPerPage = 12;

  const [pageResult, posts] = await Promise.all([
    payload.find({
      collection: "pages",
      where: {
        slug: {
          equals: "latest-updates",
        },
      },
      depth: 2,
      limit: 1,
    }),

    payload.find({
      collection: "latest-updates",
      depth: 2,
      sort: "-publishedAt",
      limit: postsPerPage,
      page: currentPage,
    }),
  ]);

  const page = pageResult.docs[0];

  const totalPages = posts.totalPages;

  return (
    <main>
      {/* Hero */}
      <div className="relative">
        <div className="absolute inset-x-0 top-0 z-10 h-52 bg-gradient-to-b from-black to-transparent" />

        <img
          src={page?.featuredImage?.cloudinary?.secure_url ?? "/hero-image.jpg"}
          alt={page?.title ?? "Latest Updates"}
          className="h-screen w-full object-cover md:h-auto md:max-h-[700px]"
        />
      </div>

      {/* Content */}
      <section id="latest-updates-posts" className="container mx-auto grid grid-cols-1 gap-4 md:grid-cols-12 md:py-10">
        {/* Enquiry */}
        <div id="enquire-now" className="container col-span-1 mx-auto md:col-span-3">
          <EnquirySection />
        </div>

        {/* Posts */}
        <div className="container col-span-1 mx-auto px-4 py-8 md:col-span-9 lg:py-0">
          <div className="mb-10">
            <h1 className="font-heading text-4xl">{page?.title}</h1>
          </div>

          {/* Posts Grid */}
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            {posts.docs.map((post: any) => (
              <Link key={post.id} href={`/latest-updates/${post.slug}`} className="group overflow-hidden border bg-white transition-all duration-300 hover:shadow-xl">
                {post.featuredImage?.cloudinary?.secure_url && (
                  <div className="aspect-video overflow-hidden">
                    <img
                      src={post.featuredImage.cloudinary.secure_url}
                      alt={post.title}
                      className="h-full w-full object-cover transition-transform duration-500 ease-in-out group-hover:scale-110"
                    />
                  </div>
                )}

                <div className="p-6">
                  <h2 className="font-heading text-xl">{post.title}</h2>

                  <div className="mt-4 flex flex-wrap gap-3 text-sm">
                    <div className="flex items-center gap-2 text-gray-800">
                      <User size={20} />

                      <span>By {post.author?.name || "Ecole Globale"}</span>
                    </div>

                    <div className="flex items-center gap-2 text-gray-800">
                      <Clock size={20} />

                      <span>
                        {post.publishedAt &&
                          new Date(post.publishedAt).toLocaleDateString("en-GB", {
                            day: "2-digit",
                            month: "short",
                            year: "numeric",
                          })}
                      </span>
                    </div>
                  </div>
                </div>
              </Link>
            ))}
          </div>

          {/* Pagination */}
          <LatestUpdatesPagination currentPage={currentPage} totalPages={totalPages} />

          {/* Page Blocks */}
          {page?.layout?.length ? (
            <div className="mt-10">
              <BlockRenderer layout={page.layout} />
            </div>
          ) : null}
        </div>
      </section>

      <Footer />
    </main>
  );
}
