"use client";

import Navbar from "@/components/navbar";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

import {
  Carousel,
  CarouselApi,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import { Card, CardContent } from "@/components/ui/card";
import Link from "next/link";
import { useEffect, useState } from "react";
import { ChevronLeft, ChevronRight, Star } from "lucide-react";
import Footer from "@/components/footer";

const slides = [
  {
    title: "About Us",
    subtitle: "Overview",
    description:
      "In this era of progressive education, schools strive to provide holistic development for their students. Beyond delivering a curriculum that encompasses academics...",
    image: "/home-slide-1.jpg",
    link: "#",
    link_text: "Know More",
  },
  {
    title: "Our Team",
    subtitle: "Leadership",
    description:
      "Meet the Team of the Ecole Globale International Girls School. This team makes sure none of the parents or student face any issue in the school...",
    image: "/home-slide-2.jpg",
    link: "#",
    link_text: "View All",
  },
  {
    title: "Principal’s Message",
    subtitle: "Ms. Kanchan Khandke",
    description:
      "In today’s world, torn by conflict, war, poverty, environmental degradation, and despair, we urgently need visionary leaders to guide us toward hope and renewal...",
    image: "home-slide-3.jpg",
    link: "#",
    link_text: "Read Full Message",
  },
  {
    title: "Your Daughter is Safe Here ",
    subtitle: "Safety & Wellbeing",
    description:
      "Every parent who places their daughter in a boarding school extends us their deepest trust. We take that with absolute seriousness...",
    image: "/home-slide-4.jpg",
    link: "#",
    link_text: "Learn More",
  },
  {
    title: "Two World-Class Curricula. One Exceptional Campus.",
    subtitle: "Academic Excellence",
    description:
      "Ecole Globale is the only girls-only residential school in Uttarakhand to offer both CBSE and Cambridge International Education on a single campus...",
    image: "/home-slide-5.jpg",
    link: "#",
    link_text: "Explore Academics",
  },
  {
    title: "Purpose Built For Excellence ",
    subtitle: "Campus & Facilities",
    description:
      'Not "world-class facilities" - specific ones. Every facility at Ecole is named, operated, and maintained to the highest standard.',
    image: "/home-slide-6.jpg",
    link: "#",
    link_text: "Take a Virtual Tour",
  },
  {
    title: "Four Differentiators That Set Ecole Globale Apart ",
    subtitle: "Why Families Choose Ecole",
    description:
      "Not the oldest name in Dehradun. The best-equipped, most transparent, and most outcomes-focused girls' residential school in the region...",
    image: "/home-slide-7.jpg",
    link: "#",
    link_text: "View Differentiators",
  },
];

const testimonials = [
  {
    name: "Sophia Williams",
    title: "Parent",
    image: "/testimonial-1.jpg",
    review:
      "The school has provided an exceptional learning environment for my daughter. We are delighted with her growth and confidence.",
    rating: 5,
  },
  {
    name: "Emily Johnson",
    title: "Alumni",
    image: "/testimonial-2.jpg",
    review:
      "The academic support and extracurricular opportunities helped me become the person I am today.",
    rating: 5,
  },
  {
    name: "Sarah Brown",
    title: "Parent",
    image: "/testimonial-3.jpg",
    review:
      "An outstanding institution with dedicated teachers and a nurturing atmosphere.",
    rating: 5,
  },
];

const clientLogos = [
  {
    image: "/forbes-logo.png",
  },
  {
    image: "/ttoi-logo.png",
  },
  {
    image: "/brainfeed-logo.png",
  },
  {
    image: "/harvard-logo.png",
  },
  {
    image: "/gpts-logo.png",
  },
  {
    image: "/nraoi-logo.png",
  },
  {
    image: "/education-world-logo.png",
  },
];

export default function Home() {
  const [api, setApi] = useState<CarouselApi>();
  const [current, setCurrent] = useState(1);
  const [count, setCount] = useState(0);

  useEffect(() => {
    if (!api) return;

    setCount(api.scrollSnapList().length);
    setCurrent(api.selectedScrollSnap() + 1);

    api.on("select", () => {
      setCurrent(api.selectedScrollSnap() + 1);
    });
  }, [api]);
  return (
    <>
      <Navbar />

      <main>
        <section className="relative min-h-[580px] md:min-h-[700px] bg-cover bg-center bg-[#f2e9e6]">
          <div
            className="absolute inset-0 bg-cover bg-center opacity-10"
            style={{
              backgroundImage: "url('/ecole-hero-bg.png')",
            }}
          />
          <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-black/40 to-transparent h-25" />
          <div className="absolute bottom-0 w-full bg-gradient-to-t from-white via-white/40 to-transparent h-25" />
          <div className="container relative z-10 mx-auto flex h-full items-center px-4">
            <div className="grid w-full grid-cols-1 items-center gap-12 lg:grid-cols-2 h-full pt-32 pb-18">
              {/* Left Content */}
              <div className="max-w-2x flex flex-col justify-between">
                <div>
                  <img
                    src="/ecole-hero-img.png"
                    alt=""
                    className="h-auto max-w-full"
                  />
                </div>
                <div className="block text-center text-sm max-w-[280px] mx-auto md:hidden">
                  © 2026 ÉCOLE GLOBALE INTERNATIONAL GIRLS’ SCHOOL
                </div>
              </div>

              {/* Right Form */}
              <div className="hidden justify-end lg:flex">
                <div className="w-full max-w-md rounded-2xl bg-white p-8 shadow-2xl">
                  <h3 className="mb-4 text-3xl font-bold font-heading text-gray-500 text-center">
                    ENQUIRE NOW
                  </h3>

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
        <div className="md:hidden w-full max-w-md rounded-2xl bg-white p-8">
          <h3 className="mb-4 text-3xl font-bold font-heading text-gray-500 text-center">
            ENQUIRE NOW
          </h3>

          <form className="space-y-4">
            <Input
              className="bg-white border-b-2 rounded-none border-l-0 border-r-0 border-t-0 p-0 focus-visible:ring-0 border-primary"
              placeholder="Your Name"
            />
            <Input
              className="bg-white border-b-2 rounded-none border-l-0 border-r-0 border-t-0 p-0 focus-visible:ring-0 border-primary"
              type="tel"
              placeholder="Phone Number"
            />
            <Input
              className="bg-white border-b-2 rounded-none border-l-0 border-r-0 border-t-0 p-0 focus-visible:ring-0 border-primary"
              type="email"
              placeholder="Email Address"
            />

            <Button className="w-full">Submit Enquiry</Button>
          </form>
        </div>
        <section className="bg-gray-200 py-24">
          <div className="container mx-auto px-4">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
              <div>
                <h5 className="text-2xl mb-2">Welcome to</h5>
                <h3 className="text-3xl font-bold font-heading mb-3">
                  Ecole Globale International Girls' School in Dehradun
                </h3>
                <p>
                  Lorem, ipsum dolor sit amet consectetur adipisicing elit.
                  Obcaecati ab hic iste ullam, similique alias eaque quas
                  temporibus expedita architecto.
                </p>
              </div>
            </div>
            <Carousel
              setApi={setApi}
              opts={{
                align: "start",
                loop: true,
              }}
              className="w-full mt-10"
            >
              <CarouselContent>
                {slides.map((slide, index) => (
                  <CarouselItem
                    key={index}
                    className="basis-[95%] md:basis-[45%] lg:basis-[30%] pl-3"
                  >
                    <div className="relative h-full">
                      <img
                        src={slide.image}
                        alt={slide.title}
                        className="w-full aspect-video"
                      />
                      <Card className="w-full m-auto z-10 relative p-5 text-center gap-0 h-full">
                        <p className="text-md mb-2">{slide.subtitle}</p>
                        <h3 className="text-xl mb-3 font-heading font-bold uppercase">
                          {slide.title}
                        </h3>
                        <h4 className="font-heading text-lg">
                          {slide.description}
                        </h4>
                        <div className="mt-5">
                          <Link
                            href={slide.link}
                            className="w-auto font-bold inline-block border-b-2 border-black pb-1 text-lg transition-all hover:border-primary"
                          >
                            {slide.link_text}
                          </Link>
                        </div>
                      </Card>
                    </div>
                  </CarouselItem>
                ))}
              </CarouselContent>
            </Carousel>
            {/* Custom Navigation */}

            <div className="mt-10 flex justify-center items-center ">
              <button
                onClick={() => api?.scrollPrev()}
                className="transition hover:opacity-70"
              >
                <ChevronLeft className="size-8" />
              </button>

              <div className="w-48">
                <div className="h-[2px] bg-neutral-300">
                  <div
                    className="h-[2px] bg-black transition-all duration-300"
                    style={{
                      width: `${(current / count) * 100}%`,
                    }}
                  />
                </div>
              </div>

              <button
                onClick={() => api?.scrollNext()}
                className="transition hover:opacity-70"
              >
                <ChevronRight className="size-8" />
              </button>
            </div>
            <div className="mt-2 text-center text-sm tracking-[0.2em]">
              {String(current).padStart(2, "0")} /{" "}
              {String(count).padStart(2, "0")}
            </div>
          </div>
        </section>
        <section className="bg-white py-16">
          <div className="container mx-auto px-4">
            <div className="grid grid-cols-2 gap-3">
              <div className="relative overflow-hidden">
                <div className="absolute bottom-0 w-full bg-gradient-to-t from-black via-black/40 to-transparent h-32" />
                <img
                  src="/featured-5.png"
                  alt=""
                  className="h-[220px] w-full object-cover"
                />
                <div className="absolute inset-0 bg-black/20" />
                <h3 className="absolute bottom-4 w-full text-center text-xl text-shadow-lg uppercase font-heading text-white">
                  Breaks
                </h3>
              </div>

              <div className="relative row-span-2 overflow-hidden">
                <div className="absolute bottom-0 w-full bg-gradient-to-t from-black via-black/40 to-transparent h-32" />
                <img
                  src="/featured-2.jpg"
                  alt=""
                  className="h-full w-full object-cover object-[55%]"
                />
                <div className="absolute inset-0 bg-black/20" />
                <h3 className="absolute bottom-4 w-full text-center text-xl text-shadow-lg uppercase font-heading text-white">
                  Sports
                </h3>
              </div>

              <div className="relative overflow-hidden">
                <div className="absolute bottom-0 w-full bg-gradient-to-t from-black via-black/40 to-transparent h-32" />
                <img
                  src="/featured-1.png"
                  alt=""
                  className="h-[220px] w-full object-cover"
                />
                <div className="absolute inset-0 bg-black/20" />
                <h3 className="absolute bottom-4 w-full text-center text-xl text-shadow-lg uppercase font-heading text-white">
                  Activities
                </h3>
              </div>
              <div className="relative overflow-hidden">
                <div className="absolute bottom-0 w-full bg-gradient-to-t from-black via-black/40 to-transparent h-32" />
                <img
                  src="/featured-4.png"
                  alt=""
                  className="h-[220px] w-full object-cover"
                />
                <div className="absolute inset-0 bg-black/20" />
                <h3 className="absolute bottom-4 w-full text-center text-xl text-shadow-lg uppercase font-heading text-white">
                  Festivals
                </h3>
              </div>
              <div className="relative overflow-hidden">
                <div className="absolute bottom-0 w-full bg-gradient-to-t from-black via-black/40 to-transparent h-32" />
                <img
                  src="/featured-6.jpg"
                  alt=""
                  className="h-[220px] w-full object-cover"
                />
                <div className="absolute inset-0 bg-black/20" />
                <h3 className="absolute bottom-4 w-full text-center text-xl text-shadow-lg uppercase font-heading text-white">
                  Celebrations
                </h3>
              </div>
              <div className="relative col-span-2 overflow-hidden">
                <div className="absolute bottom-0 w-full bg-gradient-to-t from-black via-black/40 to-transparent h-32" />
                <img
                  src="/featured-3.jpg"
                  alt=""
                  className="h-[220px] w-full object-cover"
                />
                <div className="absolute inset-0 bg-black/20" />
                <h3 className="absolute bottom-4 w-full text-center text-xl text-shadow-lg uppercase font-heading text-white">
                  Virtual Tour
                </h3>
              </div>
            </div>
          </div>
        </section>
        <section className="bg-white pb-8">
          <div className="container mx-auto px-4">
            <h3 className="mb-4 text-3xl font-bold font-heading text-center">
              Testimonials
            </h3>
            <div className="pt-2">
              <Carousel
                opts={{
                  align: "start",
                  loop: true,
                }}
              >
                <CarouselContent className="-ml-0">
                  {testimonials.map((item, index) => (
                    <CarouselItem
                      key={index}
                      className="basis-[95%] md:basis-[45%] lg:basis-[30%] p-2 pb-10 pl-2"
                    >
                      <Card className="h-full border-0 bg-white p-8 shadow-xl hover:-translate-y-2 transition-all duration-300">
                        <CardContent className="flex h-full flex-col items-center p-0">
                          <div className="mb-5">
                            <img
                              src="sara1.jpg"
                              alt={item.name}
                              className="h-24 w-24 rounded-full object-cover"
                            />
                          </div>

                          <h3 className="font-heading text-xl font-bold">
                            {item.name}
                          </h3>

                          <p className="mb-5 text-muted-foreground">
                            {item.title}
                          </p>

                          <p className="mb-6 text-center flex-1 leading-relaxed text-muted-foreground">
                            "{item.review}"
                          </p>

                          <div className="flex items-center gap-1">
                            {[...Array(item.rating)].map((_, i) => (
                              <Star
                                key={i}
                                className="h-4 w-4 fill-yellow-500 text-yellow-500"
                              />
                            ))}
                          </div>
                        </CardContent>
                      </Card>
                    </CarouselItem>
                  ))}
                </CarouselContent>
              </Carousel>
            </div>
          </div>
        </section>

        <section className="bg-white pb-16">
          <div className="container mx-auto px-4">
            <Carousel
              opts={{
                align: "start",
                loop: true,
              }}
            >
              <CarouselContent>
                {clientLogos.map((item, index) => (
                  <CarouselItem
                    key={index}
                    className="basis-[36%] md:basis-[45%] lg:basis-[17%]"
                  >
                    <img src={item.image} />
                  </CarouselItem>
                ))}
              </CarouselContent>
            </Carousel>
          </div>
        </section>
      </main>
    </>
  );
}
