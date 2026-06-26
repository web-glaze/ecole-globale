"use client";

import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import Footer from "@/components/footer";
import { RichText } from "@payloadcms/richtext-lexical/react";

export default function PageContent({ page }: { page: any }) {
  const ref = useRef(null);

  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start 80%", "end 20%"],
  });

  const lines = ["Lorem ipsum dolor sit", "amet consectetur elit"];

  return (
    <main className="">
      <div className="relative">
        <div className="absolute inset-x-0 top-0 z-10 h-52 bg-gradient-to-b from-black  to-transparent" />
        {page.featuredImage && <img src={page.featuredImage.cloudinary.secure_url} alt={page.title} className="h-screen md:h-auto md:max-h-[700px] w-full object-cover" />}
      </div>

      <section className="grid grid-cols-1 md:grid-cols-12 gap-4 container mx-auto md:py-10">
        <div id="enquire-now" className="mx-auto container col-span-1 md:col-span-3 ">
          <div className="py-8 px-4 bg-gray-200">
            <div ref={ref} className="mb-10">
              {lines.map((line, index) => {
                const start = index * 0.3;
                const end = start + 0.3;

                const backgroundPositionX = useTransform(scrollYProgress, [start, end], ["100%", "0%"]);

                return (
                  <motion.h2
                    key={index}
                    className="text-3xl font-semibold text-center text-transparent bg-clip-text"
                    style={{
                      backgroundImage: "linear-gradient(to right, #171a20 0%, #e13e3e 50%, #9CA3AF 50%, #9CA3AF 100%)",
                      backgroundSize: "200% 100%",
                      backgroundPositionX,
                    }}
                  >
                    {line}
                  </motion.h2>
                );
              })}
            </div>

            <form className="space-y-4 font-heading text-center">
              <Input className="bg-white rounded-md border-black text-black placeholder:text-black h-12" placeholder="Your Name" />
              <Input className="bg-white rounded-md border-black text-black placeholder:text-black h-12" type="tel" placeholder="Phone Number" />
              <Input className="bg-white rounded-md border-black text-black placeholder:text-black h-12" type="email" placeholder="Email Address" />

              <Button className="bg-black text-white rounded-none text-lg px-5 py-5 text-center">Submit Enquiry</Button>
            </form>
          </div>
        </div>
        <div className="py-8 mx-auto px-4 container col-span-1 md:col-span-9">
          <div>
            <h1 className="text-4xl mb-2 font-heading">{page.title}</h1>
            {/* <h3 className="text-3xl font-bold font-heading mb-3 uppercase">Ecole Globale</h3> */}
            <RichText className="richtext" data={page.content} />
          </div>
        </div>
      </section>
      <Footer />

      {/* Render RichText here */}
      {/* <pre>{JSON.stringify(page.content, null, 2)}</pre> */}
    </main>
  );
}
