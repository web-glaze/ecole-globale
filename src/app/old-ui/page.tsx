"use client";

import Navbar from "@/components/navbar";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Carousel, CarouselApi, CarouselContent, CarouselItem } from "@/components/ui/carousel";
import { Card, CardContent } from "@/components/ui/card";
import Link from "next/link";
import { useEffect, useRef, useState, useCallback } from "react";
import { CalendarPlus, ChevronLeft, ChevronRight, Mail, Phone, Star } from "lucide-react";
import Footer from "@/components/footer";
import { Separator } from "@/components/ui/separator";

// ─────────────────────────────────────────────────────────────────────────────
// Data
// ─────────────────────────────────────────────────────────────────────────────

const slides = [
  {
    title: "About Us",
    subtitle: "Overview of School",
    description: "Ecole Globale International Girls' School is one of the premier Institutes for girls.",
    image: "/home-slide-1.jpg",
  },
  {
    title: "Academics",
    subtitle: "Learning Excellence",
    description: "Providing world-class education with a modern and innovative curriculum.",
    image: "/carousel-3.jpg",
  },
  {
    title: "Campus Life",
    subtitle: "Student Experience",
    description: "A vibrant campus environment that encourages creativity and leadership.",
    image: "home-slide-2.jpg",
  },
];

const testimonials = [
  {
    name: "Sophia Williams",
    title: "Parent",
    review: "The school has provided an exceptional learning environment for my daughter. We are delighted with her growth and confidence.",
    rating: 5,
  },
  {
    name: "Emily Johnson",
    title: "Alumni",
    review: "The academic support and extracurricular opportunities helped me become the person I am today.",
    rating: 5,
  },
  {
    name: "Sarah Brown",
    title: "Parent",
    review: "An outstanding institution with dedicated teachers and a nurturing atmosphere.",
    rating: 5,
  },
];

const clientLogos = [
  { image: "/forbes-logo.png" },
  { image: "/ttoi-logo.png" },
  { image: "/brainfeed-logo.png" },
  { image: "/harvard-logo.png" },
  { image: "/gpts-logo.png" },
  { image: "/nraoi-logo.png" },
  { image: "/education-world-logo.png" },
];

const featuredItems = [
  { src: "/featured-5.png", label: "Breaks", span: "" },
  { src: "/featured-2.jpg", label: "Sports", span: "row-span-2" },
  { src: "/featured-1.png", label: "Activities", span: "" },
  { src: "/featured-4.png", label: "Festivals", span: "" },
  { src: "/featured-6.jpg", label: "Celebrations", span: "" },
  { src: "/featured-3.jpg", label: "Virtual Tour", span: "col-span-2" },
];

const stats = [
  { target: 30, suffix: "+", label: "Years of Excellence" },
  { target: 5000, suffix: "+", label: "Global Alumnae" },
  { target: 50, suffix: "+", label: "Activities & Clubs" },
  { target: 98, suffix: "%", label: "University Placement" },
];

// ─────────────────────────────────────────────────────────────────────────────
// Page
// ─────────────────────────────────────────────────────────────────────────────

export default function Anim() {
  const [api, setApi] = useState<CarouselApi>();
  const [current, setCurrent] = useState(1);
  const [count, setCount] = useState(0);

  useEffect(() => {
    if (!api) return;
    setCount(api.scrollSnapList().length);
    setCurrent(api.selectedScrollSnap() + 1);
    api.on("select", () => setCurrent(api.selectedScrollSnap() + 1));
  }, [api]);

  return (
    <>
      <Navbar />

      <main>
        <section className="relative min-h-[580px] md:min-h-[700px] bg-[#f2e9e6] overflow-hidden">
          {/* Parallax background texture */}
          <div
            style={{
              backgroundImage: "url('/egg-shell.png')",
              backgroundPosition: "center",
            }}
            className="absolute inset-0 opacity-70 scale-110"
          />

          <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-black/30 to-transparent h-32" />
          <div className="absolute bottom-0 w-full bg-gradient-to-t from-white via-white/50 to-transparent h-28" />

          <div className="container relative z-10 mx-auto flex h-full items-center px-4">
            <div className="grid w-full grid-cols-1 items-center gap-12 lg:grid-cols-2 h-full pt-32 pb-18 min-h-screen">
              {/* Left — hero image */}
              <div className="flex flex-col justify-between">
                <img src="/ecole-hero-img.png" alt="" className="h-auto max-w-full drop-shadow-2xl" />
                <div className="block text-center text-sm max-w-[280px] mx-auto md:hidden mt-4">
                  © 2026 ÉCOLE GLOBALE INTERNATIONAL GIRLS&apos; SCHOOL
                </div>
              </div>

              {/* Right — enquiry form (desktop) */}
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

        {/* Only Mobile View Form */}
        <div id="enquire-now" className="md:hidden w-full max-w-md rounded-2xl bg-white p-8">
          <h3 className="mb-4 text-3xl font-bold font-heading text-gray-500 text-center">ENQUIRE NOW</h3>

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

        <section className="bg-gray-200 py-24 overflow-hidden">
          <div className="container mx-auto px-4">
            {/* Section header */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-14">
              <div>
                <p className="text-xs uppercase tracking-[0.3em] text-muted-foreground mb-4">Welcome to</p>

                <h3 className="text-3xl md:text-4xl font-bold font-heading mb-2 leading-tight">
                  Ecole Globale International Girls' School in Dehradun
                </h3>

                <p className="text-muted-foreground leading-relaxed">
                  Lorem, ipsum dolor sit amet consectetur adipisicing elit. Obcaecati ab hic iste ullam, similique alias eaque quas temporibus
                  expedita architecto.
                </p>
              </div>
            </div>

            {/* Carousel */}
            <div>
              <Carousel setApi={setApi} opts={{ align: "start", loop: true }} className="w-full">
                <CarouselContent>
                  {slides.map((slide, index) => (
                    <CarouselItem key={index} className="basis-[90%] md:basis-[45%] lg:basis-[30%]">
                      <div className="relative">
                        <div className="overflow-hidden">
                          <img src={slide.image} alt={slide.title} className="w-full" />
                        </div>
                        <Card className="w-70 m-auto mt-[-20px] z-10 relative p-5 text-center gap-0 bg-white/95 backdrop-blur-sm shadow-xl">
                          <p className="text-md mb-2 text-muted-foreground">{slide.subtitle}</p>
                          <h3 className="text-2xl mb-5 font-heading font-bold uppercase">{slide.title}</h3>
                          <h4 className="font-heading text-base text-muted-foreground">{slide.description}</h4>
                          <div className="mt-5">
                            <Link
                              href="#"
                              className="w-auto font-bold inline-block border-b-2 border-black pb-1 text-lg transition-all hover:border-primary hover:text-primary"
                            >
                              Explore More
                            </Link>
                          </div>
                        </Card>
                      </div>
                    </CarouselItem>
                  ))}
                </CarouselContent>
              </Carousel>
            </div>

            {/* Custom navigation */}
            <div className="mt-10 flex justify-center items-center gap-4">
              <button onClick={() => api?.scrollPrev()} className="transition">
                <ChevronLeft className="size-8" />
              </button>
              <div className="w-48">
                <div className="h-[2px] bg-neutral-300">
                  <div
                    className="h-[2px] bg-black transition-[width] duration-500 ease-out"
                    style={{ width: `${count ? (current / count) * 100 : 0}%` }}
                  />
                </div>
              </div>
              <button onClick={() => api?.scrollNext()} className="transition">
                <ChevronRight className="size-8" />
              </button>
            </div>
            <div className="mt-2 text-center text-sm tracking-[0.25em] text-muted-foreground">
              {String(current).padStart(2, "0")} / {String(count).padStart(2, "0")}
            </div>
          </div>
        </section>

        <section className="bg-white py-16">
          <div className="container mx-auto px-4">
            {/* Heading */}
            <div className="mb-10 text-center">
              <p className="text-xs uppercase tracking-[0.3em] text-muted-foreground mb-3">Life at Ecole</p>
              <h3 className="text-3xl md:text-4xl font-bold font-heading">Campus Highlights</h3>
            </div>

            {/* Grid */}
            <div className="grid grid-cols-2 gap-3">
              {featuredItems.map((item, i) => (
                <div key={i} className={`relative overflow-hidden cursor-pointer group ${item.span}`}>
                  {/* gradient overlay */}
                  <div className="absolute bottom-0 w-full bg-gradient-to-t from-black/80 via-black/30 to-transparent h-40 z-10 pointer-events-none" />

                  {/* image with zoom */}
                  <img
                    src={item.src}
                    alt={item.label}
                    className={`w-full object-cover transition-transform will-change-transform ${
                      item.span === "row-span-2" ? "h-full object-[55%]" : "h-[180px]"
                    }`}
                  />

                  {/* dark overlay fade on hover */}
                  <div className="absolute inset-0 bg-black/25 pointer-events-none" />

                  {/* label slide up */}
                  <h3 className="absolute bottom-4 w-full text-center text-lg md:text-xl uppercase font-heading text-white z-20 tracking-wider">
                    {item.label}
                  </h3>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section className="bg-gray-50 py-16">
          <div className="container mx-auto px-4">
            {/* Heading */}
            <div className="text-center mb-10">
              <p className="text-xs uppercase tracking-[0.3em] text-muted-foreground mb-3">What they say</p>
              <h3 className="text-3xl font-bold font-heading">Testimonials</h3>
            </div>

            <div>
              <Carousel opts={{ align: "start", loop: true }}>
                <CarouselContent className="-ml-0">
                  {testimonials.map((item, index) => (
                    <CarouselItem key={index} className="basis-[95%] md:basis-[45%] lg:basis-[30%] p-2 pb-10 pl-3">
                      <div>
                        <Card className="h-full border-0 bg-white p-8 shadow-xl">
                          <CardContent className="flex h-full flex-col items-center p-0">
                            {/* Avatar with ring pulse */}
                            <div className="mb-5 relative">
                              <div className="absolute inset-0 rounded-full bg-primary/20" />
                              <img
                                src="sara1.jpg"
                                alt={item.name}
                                className="h-24 w-24 rounded-full object-cover relative z-10 ring-4 ring-primary/20"
                              />
                            </div>

                            <h3 className="font-heading text-xl font-bold">{item.name}</h3>
                            <p className="mb-5 text-sm text-muted-foreground">{item.title}</p>
                            <p className="mb-6 text-center flex-1 leading-relaxed text-muted-foreground text-sm">&ldquo;{item.review}&rdquo;</p>

                            {/* Stars pop in with spring */}
                            <div className="flex items-center gap-1">
                              {[...Array(item.rating)].map((_, si) => (
                                <Star key={si} className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                              ))}
                            </div>
                          </CardContent>
                        </Card>
                      </div>
                    </CarouselItem>
                  ))}
                </CarouselContent>
              </Carousel>
            </div>
          </div>
        </section>

        <section className="bg-white py-8 pb-24">
          <div className="container mx-auto px-4">
            <Carousel
              opts={{
                align: "start",
                loop: true,
              }}
            >
              <CarouselContent>
                {clientLogos.map((item, index) => (
                  <CarouselItem key={index} className="basis-[36%] md:basis-[45%] lg:basis-[17%]">
                    <img src={item.image} />
                  </CarouselItem>
                ))}
              </CarouselContent>
            </Carousel>
          </div>
        </section>
      </main>

      {/* Bottom Navigation */}
      <div className="fixed bottom-0 left-0 z-50 w-full bg-red-900 backdrop-blur-md text-white shadow-lg md:hidden">
        <div className="flex justify-around py-3 px-4 text-center">
          <Link href="tel:+91-9557291888" className="flex justify-center items-center gap-2">
            <Phone size={20} />
            <span className="font-medium">Call Us</span>
          </Link>

          <Separator orientation="vertical" />

          <Link href="mailto:ecoleglobale@gmail.com" className="flex justify-center items-center gap-2">
            <Mail size={20} />
            <span className="font-medium">Mail Us</span>
          </Link>

          <Separator orientation="vertical" />

          <Link href="#enquire-now" className="flex justify-center items-center gap-2">
            <CalendarPlus size={20} />
            <span className="font-medium">Enquire Now</span>
          </Link>
        </div>
      </div>

      <Footer />
    </>
  );
}
