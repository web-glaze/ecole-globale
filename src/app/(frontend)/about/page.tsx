"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { motion, useScroll, useTransform } from "framer-motion";
import { Carousel, CarouselApi, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from "@/components/ui/carousel";
import { Card, CardContent } from "@/components/ui/card";
import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import { ChevronLeft, ChevronRight, Star, FileText, ClipboardCheck, School, Icon, Phone, Mail, CalendarPlus, Play, Pause, ArrowLeft, ArrowRight } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import Footer from "@/components/footer";

const heroSlides = ["/about-page-hero.jpg"];

export default function AboutPage() {
  const [heroApi, heroSetApi] = useState<CarouselApi>();
  const [heroCurrent, heroSetCurrent] = useState(1);

  useEffect(() => {
    if (!heroApi) return;
    heroSetCurrent(heroApi.selectedScrollSnap());

    heroApi.on("select", () => {
      heroSetCurrent(heroApi.selectedScrollSnap());
    });
  }, [heroApi]);

  const ref = useRef(null);

  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start 80%", "end 20%"],
  });

  const backgroundSize = useTransform(scrollYProgress, [0, 1], ["0% 100%", "100% 100%"]);

  const lines = ["Lorem ipsum dolor sit", "amet consectetur elit"];
  return (
    <>
      <main>
        {/* Hero Section */}
        <section id="hero-section" className="relative min-h-[580px] md:min-h-[700px] bg-cover bg-center bg-[#f2e9e6]">
          <div
            className="absolute inset-0 bg-cover bg-center opacity-10"
            style={{
              backgroundImage: "url('/ecole-hero-bg.png')",
            }}
          />
          <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-black/40 to-transparent h-25" />
          <div className="absolute bottom-0 w-full bg-gradient-to-t from-white via-white/40 to-transparent h-25" />
          <div className="container relative z-10 mx-auto flex items-center">
            <div className="grid w-full grid-cols-1 items-center gap-12 lg:grid-cols-2">
              {/* Left Content */}
              <div className="max-w-2x flex-col justify-between gap-5 hidden">
                <div className="flex flex-col justify-between hidden">
                  <img src="/ecole-hero-img.png" alt="" className="h-auto max-w-full drop-shadow-2xl" />
                  <div className="block text-center text-base max-w-[280px] mx-auto md:hidden">© 2026 ÉCOLE GLOBALE INTERNATIONAL GIRLS’ SCHOOL</div>
                </div>
                <div className="relative">
                  <Carousel
                    setApi={heroSetApi}
                    opts={{
                      align: "start",
                      loop: true,
                    }}
                  >
                    <CarouselContent>
                      {heroSlides.map((slide, index) => (
                        <CarouselItem key={index} className="basis-[95%] md:basis-[45%] lg:basis-[30%]">
                          <div className="relative overflow-hidden rounded-lg">
                            <img src={slide} alt={`Slide ${index + 1}`} className="w-full object-cover aspect-3/4" />

                            {/* Optional Gradient Overlay */}
                            <div className="absolute inset-x-0 bottom-0 h-20 bg-gradient-to-t from-black/60 to-transparent" />
                          </div>
                        </CarouselItem>
                      ))}
                    </CarouselContent>
                  </Carousel>

                  <div className="absolute bottom-4 left-1/2 z-10 flex -translate-x-1/2 gap-2">
                    {heroSlides.map((_, index) => (
                      <button
                        key={index}
                        onClick={() => heroApi?.scrollTo(index)}
                        className={`rounded-full transition-all duration-300 ${heroCurrent === index ? "h-2 w-8 bg-white" : "h-2 w-2 bg-white/50"}`}
                      />
                    ))}
                  </div>
                </div>
                <div className="block text-center text-base max-w-[280px] mx-auto md:hidden">© 2026 ÉCOLE GLOBALE INTERNATIONAL GIRLS’ SCHOOL</div>
              </div>
              <div className="max-w-2x flex flex-col justify-between gap-5">
                <div className="relative">
                  <Carousel
                    setApi={heroSetApi}
                    opts={{
                      align: "start",
                      loop: true,
                    }}
                  >
                    <CarouselContent>
                      {heroSlides.map((slide, index) => (
                        <CarouselItem key={index} className="p-0">
                          <div className="relative">
                            <img src={slide} alt={`Slide ${index + 1}`} className="w-full object-cover min-h-screen" />

                            {/* Optional Gradient Overlay */}
                            <div className="absolute inset-x-0 bottom-0 h-28 bg-gradient-to-t from-black/60 to-transparent" />
                          </div>
                        </CarouselItem>
                      ))}
                    </CarouselContent>
                  </Carousel>

                  <div className="absolute bottom-[80px] left-1/2 z-10 flex -translate-x-1/2 gap-2">
                    {heroSlides.map((_, index) => (
                      <button
                        key={index}
                        onClick={() => heroApi?.scrollTo(index)}
                        className={`rounded-full transition-all duration-300 ${heroCurrent === index ? "h-2 w-8 bg-white" : "h-2 w-2 bg-white/50"}`}
                      />
                    ))}
                  </div>
                </div>
              </div>

              {/* Right Form */}
              <div className="hidden justify-end lg:flex">
                <div className="w-full max-w-md rounded-2xl bg-white p-8 shadow-2xl">
                  <h3 className="mb-4 text-3xl font-bold font-heading text-gray-500 text-center">ENQUIRE NOW</h3>

                  <form className="space-y-4">
                    <Input placeholder="Your Name" />
                    <Input type="tel" placeholder="Phone Number" />
                    <Input type="email" placeholder="Email Address" />

                    <Button className="w-full">Submit Enquiry</Button>
                  </form>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Welcom About Section */}
        <section>
          {/* Only Mobile View Form */}
          <div id="enquire-now" className="py-8 bg-gray-200 md:hidden w-full max-w-md container mx-auto px-4">
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

          <div className="py-8 grid grid-cols-1 lg:grid-cols-2 gap-12 container mx-auto px-4">
            <div>
              <h5 className="text-2xl mb-2 font-heading italic">About</h5>
              <h3 className="text-3xl font-bold font-heading mb-3 uppercase">Ecole Globale</h3>
              <div className="space-y-5 text-sm">
                <p>
                  A great starting point about a child’s education but we know important lessons in education go beyond the four walls of a classroom. We understand the importance
                  of education both between the lines of a textbook and outside in extracurricular activities. These lessons will help turn our girls into well-rounded gracious
                  citizens of tomorrow.
                </p>

                <p>
                  To prepare for the future, a child needs to have the opportunity to learn the art of public speaking, engage in sports, learn multiple arts, develop a sense of
                  confidence in self and most of all learn to contribute to communities. All of this and so much more is what we hope for the children enrolled in our institute to
                  learn and absorb naturally through their time here.
                </p>

                <p>
                  The four pillars which form the foundation of our beliefs are – Air, Earth, Water, and Fire. A balance of these classical elements is important for existence.
                  Each pillar has particular properties which distinguish them from one another yet is critically important for the balance. We hope to help students find their
                  element and ensure they develop it to its fullest potential.
                </p>

                <p>
                  At Ecole Globale, we believe in equal opportunities for the girls to learn, grow and excel at whatever they choose to be it academics or extracurricular
                  activities yet still insisting on all-round development. We understand how each tree of learning requires individual attention and dedicated patience, and our
                  teachers help accomplish all of that efficiently. We create a conducive and fun learning environment with the added help of technology. To ensure equal attention
                  is distributed amongst all the girls, we have a fixed teacher-student ratio at a stable 1:10.
                </p>

                <p>
                  Regularly, we also conduct a rich student exchange program which inculcates a sense of diversity, understanding, and appreciation of peers from other countries
                  and cultural background amongst students. It is experiences like these that makes students of Ecole Globale, citizens of the world and leaders for tomorrow!
                </p>

                <p>
                  To be at Ecole Globale would be an enriching, educating and enlightening experience for your child and the lessons learned here will guide them through the
                  future.
                </p>
              </div>
            </div>
          </div>
        </section>
        <Footer />
      </main>
    </>
  );
}
