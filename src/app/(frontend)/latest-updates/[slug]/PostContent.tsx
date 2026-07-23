"use client";

import { useRef, useState } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import Footer from "@/components/footer";
import { RichText, defaultJSXConverters } from "@payloadcms/richtext-lexical/react";
import BlockRenderer from "@/components/blocks/BlockRenderer";
import EnquirySection from "@/components/EnquirySection";
import { Clock, User } from "lucide-react";

export default function PostContent({ post }: { post: any }) {
  return (
    <main>
      <div className="relative">
        <div className="absolute inset-x-0 top-0 z-10 h-52 bg-gradient-to-b from-black  to-transparent" />
        <img src={"/hero-image.jpg"} alt={post.title} className="h-screen md:h-auto md:max-h-[700px] w-full object-cover" />
      </div>

      <section className="grid grid-cols-1 md:grid-cols-12 gap-4 container mx-auto md:py-10">
        <div id="enquire-now" className="mx-auto container col-span-1 md:col-span-3 ">
          <EnquirySection />
        </div>
        <div className="py-8 lg:py-0 mx-auto px-4 container col-span-1 md:col-span-9">
          <div className="mb-10">
            <h1 className="text-4xl font-heading ">{post.title}</h1>
            <div className="mt-4 flex gap-6 text-sm py-2 border-t border-b border-gray-200">
              <div className="flex gap-2 items-center text-gray-800">
                <User />
                <span>By {post.author?.name ? post.author.name : "Ecole Globale"}</span>
              </div>
              <div className="flex gap-2 items-center text-gray-800">
                <Clock />
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
          <BlockRenderer layout={post.layout} />
        </div>
      </section>

      <Footer />
    </main>
  );
}
