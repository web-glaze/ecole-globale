"use client";

import { useRef, useState } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import Footer from "@/components/footer";
import { RichText, defaultJSXConverters } from "@payloadcms/richtext-lexical/react";
import BlockRenderer from "@/components/blocks/BlockRenderer";
import EnquirySection from "@/components/EnquirySection";
import VacancyForm from "@/components/VacancyForm";
import { usePathname } from "next/navigation";

export default function PageContent({ page }: { page: any }) {
  const pathname = usePathname();

  const isFullWidth = page.template === "full-width";
  const isVacancyPage = pathname === "/vacancies";

  return (
    <main className={[page.template ?? "default", page.pageClass ?? ""].filter(Boolean).join(" ")}>
      <div className="relative">
        <div className="absolute inset-x-0 top-0 z-10 h-52 bg-gradient-to-b from-black  to-transparent" />
        {page.featuredImage ? (
          <img src={page.featuredImage.cloudinary.secure_url} alt={page.title} className="h-screen md:h-auto md:max-h-[700px] w-full object-cover" />
        ) : (
          <img src={"/hero-image.jpg"} alt={page.title} className="h-screen md:h-auto md:max-h-[700px] w-full object-cover" />
        )}
      </div>

      <section className="grid grid-cols-1 md:grid-cols-12 gap-4 container mx-auto md:py-10">
        {page.template !== "full-width" && (
          <div id="enquire-now" className="mx-auto container col-span-1 md:col-span-3 ">
            {isVacancyPage ? <VacancyForm /> : <EnquirySection />}
          </div>
        )}

        <div className={`py-8 lg:py-0 mx-auto px-4 container ${isFullWidth ? "col-span-12" : "col-span-1 md:col-span-9"}`}>
          {!page.hideTitle && <h1 className="text-4xl font-heading mb-10 font-semibold">{page.title}</h1>}
          <BlockRenderer layout={page.layout} />
        </div>
      </section>
      <Footer />
    </main>
  );
}
