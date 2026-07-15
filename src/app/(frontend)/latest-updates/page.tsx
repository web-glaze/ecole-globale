export const dynamic = "force-dynamic";

import { getPayload } from "payload";
import configPromise from "@payload-config";
import Link from "next/link";
import type { Metadata } from "next";
import Footer from "@/components/footer";
import EnquirySection from "@/components/EnquirySection";
import { Clock, User } from "lucide-react";

export const metadata: Metadata = {
  title: "Latest Updates",
  description: "Latest school news and announcements.",
};

export default async function LatestUpdatesPage() {
  const payload = await getPayload({
    config: configPromise,
  });

  const posts = await payload.find({
    collection: "latest-updates",
    depth: 2,
    sort: "-publishedAt",
  });

  return (
    <main>
      <div className="relative">
        <div className="absolute inset-x-0 top-0 z-10 h-52 bg-linear-to-b from-black  to-transparent" />
        <img src={"/hero-image.jpg"} alt="Latest Updates" className="h-screen md:h-auto md:max-h-[700px] w-full object-cover" />
      </div>
      <section className="grid grid-cols-1 md:grid-cols-12 gap-4 container mx-auto md:py-10">
        <div id="enquire-now" className="mx-auto container col-span-1 md:col-span-3 ">
          <EnquirySection />
        </div>
        <div className="py-8 lg:py-0 mx-auto px-4 container col-span-1 md:col-span-9">
          <div className="mb-10">
            <h1 className="text-4xl font-heading ">Latest Updates</h1>
          </div>
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            {posts.docs.map((post: any) => (
              <Link key={post.id} href={`/latest-updates/${post.slug}`} className="group overflow-hidden border bg-white transition-all duration-300 hover:shadow-xl">
                {post.featuredImage && (
                  <div className="aspect-video overflow-hidden">
                    <img
                      src={post.featuredImage.cloudinary.secure_url}
                      alt={post.title}
                      className="h-full w-full object-cover transition-transform duration-500 ease-in-out group-hover:scale-110"
                    />
                  </div>
                )}

                <div className="p-6">
                  <h2 className="text-xl font-heading">{post.title}</h2>

                  <div className="mt-4 flex gap-3 text-sm">
                    <div className="flex items-center gap-2 text-gray-800">
                      <User size={20} />
                      <span>By {post.author?.name || "Ecole Globale"}</span>
                    </div>

                    <div className="flex items-center gap-2 text-gray-800">
                      <Clock size={20} />
                      <span>{post.publishedAt && new Date(post.publishedAt).toLocaleDateString()}</span>
                    </div>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>
      <Footer />
    </main>
  );
}
