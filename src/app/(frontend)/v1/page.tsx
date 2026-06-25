"use client";

import Navbar from "@/components/navbar";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { motion, AnimatePresence, useScroll } from "framer-motion";
import { Carousel, CarouselApi, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from "@/components/ui/carousel";
import { Card, CardContent } from "@/components/ui/card";
import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import { ChevronLeft, ChevronRight, Star, FileText, ClipboardCheck, School, Icon, Phone, Mail, CalendarPlus, Play, Pause, ArrowLeft, ArrowRight } from "lucide-react";
import Footer from "@/components/footer";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { FaInstagram, FaPhone } from "react-icons/fa6";

const slides = [
  {
    title: "Heading",
    subtitle: "Overview",
    description: "Lorem ipsum dolor sit, amet consectetur adipisicing elit. Repellendus dicta iure fuga!",
    image: "/main-home-slide-1.jpg",
    link: "#",
    link_text: "Know More",
  },
  {
    title: "Heading",
    subtitle: "Leadership",
    description: "Lorem ipsum dolor sit, amet consectetur adipisicing elit. Repellendus dicta iure fuga!",
    image: "/home-slide-2.jpg",
    link: "#",
    link_text: "View All",
  },
  {
    title: "Heading",
    subtitle: "Ms. Kanchan Khandke",
    description: "Lorem ipsum dolor sit, amet consectetur adipisicing elit. Repellendus dicta iure fuga!",
    image: "home-slide-3.jpg",
    link: "#",
    link_text: "Read Full Message",
  },
  {
    title: "Heading",
    subtitle: "Safety & Wellbeing",
    description: "Lorem ipsum dolor sit, amet consectetur adipisicing elit. Repellendus dicta iure fuga!",
    image: "home-slide-4.jpg",
    link: "#",
    link_text: "Learn More",
  },
  {
    title: "Heading",
    subtitle: "Academic Excellence",
    description: "Lorem ipsum dolor sit, amet consectetur adipisicing elit. Repellendus dicta iure fuga!",
    image: "/home-slide-5.jpg",
    link: "#",
    link_text: "Explore Academics",
  },
  {
    title: "Heading",
    subtitle: "Campus & Facilities",
    description: "Lorem ipsum dolor sit, amet consectetur adipisicing elit. Repellendus dicta iure fuga!",
    image: "/home-slide-6.jpg",
    link: "#",
    link_text: "Take a Virtual Tour",
  },
  {
    title: "Heading",
    subtitle: "Why Families Choose Ecole",
    description: "Lorem ipsum dolor sit, amet consectetur adipisicing elit. Repellendus dicta iure fuga!",
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
    review: "The school has provided an exceptional learning environment for my daughter. We are delighted with her growth and confidence.",
    rating: 5,
  },
  {
    name: "Emily Johnson",
    title: "Alumni",
    image: "/testimonial-2.jpg",
    review: "The academic support and extracurricular opportunities helped me become the person I am today.",
    rating: 5,
  },
  {
    name: "Sarah Brown",
    title: "Parent",
    image: "/testimonial-3.jpg",
    review: "An outstanding institution with dedicated teachers and a nurturing atmosphere.",
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

const steps = [
  {
    id: "01",
    title: "Registration & Documentation",
    icon: FileText,
    description:
      "Submit the online registration form with a ₹25,000 registration fee. Provide previous academic records, birth certificate, and passport-size photographs. We acknowledge receipt within 48 hours.",
  },
  {
    id: "02",
    title: "Academic Assessment",
    icon: ClipboardCheck,
    description:
      "A written assessment in English, Mathematics, and Science (relevant to the applying class). For Class XI admissions, we review Class X board examination results directly.",
  },
  {
    id: "03",
    title: "Campus Visit & Interview",
    icon: School,
    description:
      "Your daughter meets with our academic team. You meet with our admissions advisor. You see everything — classrooms, boarding houses, infirmary, dining hall, sports facilities. We answer every question without reservation. Admission decisions are communicated within 7 working days.",
  },
];

const heroSlides = ["/v1-hero-slider-5.jpg"];

const videos = ["/ecole-instagram-slider.mp4", "/ecole-instagram-slider.mp4", "/ecole-instagram-slider.mp4"];

export default function Home() {
  const [api, setApi] = useState<CarouselApi>();
  const [current, setCurrent] = useState(1);
  const [count, setCount] = useState(0);

  const [admissionApi, setAdmissionApi] = useState<CarouselApi>();
  const [admissionCurrent, setAdmissionCurrent] = useState(1);
  const [admissionCount, setAdmissionCount] = useState(0);

  useEffect(() => {
    if (!api) return;
    setCount(api.scrollSnapList().length);
    setCurrent(api.selectedScrollSnap() + 1);
    api.on("select", () => {
      setCurrent(api.selectedScrollSnap() + 1);
    });

    if (!admissionApi) return;
    setAdmissionCount(admissionApi.scrollSnapList().length);
    setAdmissionCurrent(admissionApi.selectedScrollSnap() + 1);
    admissionApi.on("select", () => {
      setAdmissionCurrent(admissionApi.selectedScrollSnap() + 1);
    });
  }, [api, admissionApi]);

  const [heroApi, heroSetApi] = useState<CarouselApi>();
  const [heroCurrent, heroSetCurrent] = useState(1);
  const [heroCount, heroSetCount] = useState(0);

  useEffect(() => {
    if (!heroApi) return;

    heroSetCount(heroApi.scrollSnapList().length);
    heroSetCurrent(heroApi.selectedScrollSnap());

    heroApi.on("select", () => {
      heroSetCurrent(heroApi.selectedScrollSnap());
    });
  }, [heroApi]);

  const [showBar, setShowBar] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setShowBar(window.scrollY > 100);
    };

    window.addEventListener("scroll", handleScroll);
    handleScroll();

    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const [videoApi, setVideoApi] = useState<CarouselApi>();
  const [currentVideo, setCurrentVideo] = useState(0);
  const [playingIndex, setPlayingIndex] = useState<number | null>(null);

  const videoRefs = useRef<(HTMLVideoElement | null)[]>([]);

  useEffect(() => {
    if (!videoApi) return;

    const handleSelect = () => {
      const selected = videoApi.selectedScrollSnap();

      videoRefs.current.forEach((video) => {
        if (video) {
          video.pause();
        }
      });

      setPlayingIndex(null);
      setCurrentVideo(selected);
    };

    handleSelect();

    videoApi.on("select", handleSelect);

    return () => {
      videoApi.off("select", handleSelect);
    };
  }, [videoApi]);

  const toggleVideo = (index: number) => {
    if (index !== currentVideo) return;

    const video = videoRefs.current[index];
    if (!video) return;

    if (video.paused) {
      videoRefs.current.forEach((v, i) => {
        if (i !== index && v) {
          v.pause();
        }
      });

      video.play();
      setPlayingIndex(index);
    } else {
      video.pause();
      setPlayingIndex(null);
    }
  };

  const handlePrevVideo = () => {
    videoApi?.scrollPrev();
  };

  const handleNextVideo = () => {
    videoApi?.scrollNext();
  };

  const [compact, setCompact] = useState(false);
  const { scrollY } = useScroll();
  const lastScrollY = useRef(0);

  useEffect(() => {
    return scrollY.on("change", (latest) => {
      if (latest > lastScrollY.current && latest > 100) {
        // scrolling down
        setCompact(true);
      } else {
        // scrolling up
        setCompact(false);
      }

      lastScrollY.current = latest;
    });
  }, [scrollY]);

  return (
    <>
      <Navbar />

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

        {/* Only Mobile View Form */}
        <div id="enquire-now" className="md:hidden w-full max-w-md rounded-2xl bg-white p-8">
          <h3 className="mb-4 text-2xl font-bold font-heading text-gray-500 text-center">ENQUIRE NOW</h3>

          <form className="space-y-4 font-heading">
            <Input className="bg-white border-b-2 rounded-none border-l-0 border-r-0 border-t-0 p-0 focus-visible:ring-0 border-primary" placeholder="Your Name" />
            <Input className="bg-white border-b-2 rounded-none border-l-0 border-r-0 border-t-0 p-0 focus-visible:ring-0 border-primary" type="tel" placeholder="Phone Number" />
            <Input className="bg-white border-b-2 rounded-none border-l-0 border-r-0 border-t-0 p-0 focus-visible:ring-0 border-primary" type="email" placeholder="Email Address" />

            <Button className="w-full">Submit Enquiry</Button>
          </form>
        </div>

        {/* Welcom About Section */}
        <section className="bg-gray-200 py-8">
          <div className="container mx-auto px-4">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
              <div>
                <h5 className="text-2xl mb-2 font-heading italic">Welcome to</h5>
                <h3 className="text-3xl font-bold font-heading mb-3 uppercase">Ecole Globale</h3>
                <p className="font-heading  text-sm">
                  Lorem, ipsum dolor sit amet consectetur adipisicing elit. Obcaecati ab hic iste ullam, similique alias eaque quas temporibus expedita.
                </p>
              </div>
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
            <CarouselContent className="">
              {slides.map((slide, index) => (
                <CarouselItem key={index} className="basis-full md:basis-[45%] lg:basis-[30%] pr-3">
                  <div className="relative h-full flex flex-col">
                    {/* Animated Image */}
                    <div className={`absolute top-0 left-0 w-full aspect-3/2 z-0 transition-all duration-1000 ${current - 1 === index ? "translate-y-0" : "translate-y-14"}`}>
                      <img src={slide.image} alt={slide.title} className="w-full aspect-3/2 -ml-8 object-cover" />
                    </div>

                    {/* Spacer for image height */}
                    <div className="aspect-3/2 " />

                    {/* Fixed Card */}
                    <Card className="w-full max-w-[270px] mx-auto relative z-10 py-8 px-5 text-center gap-0 rounded-none -mt-6 overflow-visible mb-2">
                      <div className="absolute -top-1 -left-1 w-[calc(100%+8px)] h-[calc(100%+8px)] border border-[#916e27] pointer-events-none" />
                      <p className="text-md mb-2">{slide.subtitle}</p>
                      <h3 className="text-xl mb-3 font-heading font-bold uppercase">{slide.title}</h3>
                      <h4 className="font-heading text-base">{slide.description}</h4>

                      <div className="mt-3">
                        <Link href={slide.link} className="inline-block border-b-2 border-black pb-1 text-base font-bold transition-all hover:border-primary">
                          {slide.link_text}
                        </Link>
                      </div>
                    </Card>
                  </div>
                </CarouselItem>
              ))}
            </CarouselContent>
          </Carousel>

          <div className="mt-5 flex justify-center items-center ">
            <button onClick={() => api?.scrollPrev()} className="transition hover:opacity-70">
              <ChevronLeft className="size-6" />
            </button>

            <div className="relative w-48 h-[6px] flex items-center">
              {/* Base line */}
              <div className="absolute inset-x-0 h-px bg-neutral-300" />

              {/* Active indicator */}
              <div
                className="absolute h-[5px] bg-[#916e27] transition-all duration-300"
                style={{
                  width: `${100 / count}%`,
                  left: `${((current - 1) * 100) / count}%`,
                }}
              />
            </div>

            <button onClick={() => api?.scrollNext()} className="transition hover:opacity-70">
              <ChevronRight className="size-6" />
            </button>
          </div>
          <div className="mt-2 text-center text-sm tracking-[0.2em]">
            {String(current).padStart(2, "")} / {String(count).padStart(2, "")}
          </div>
        </section>

        {/* School Featured Section */}
        <section className="bg-white py-8">
          <div className="container mx-auto px-4">
            <div className="grid grid-cols-2 gap-3">
              <div className="relative overflow-hidden">
                <div className="absolute bottom-0 w-full bg-gradient-to-t from-black via-black/40 to-transparent h-32" />
                <img src="/featured-5.png" alt="" className="h-[220px] w-full object-cover" />
                <div className="absolute inset-0 bg-black/20" />
                <h3 className="absolute bottom-4 w-full text-center text-base px-2 text-shadow-lg uppercase font-heading text-white">Life at Ecole</h3>
              </div>

              <div className="relative row-span-2 overflow-hidden">
                <div className="absolute bottom-0 w-full bg-gradient-to-t from-black via-black/40 to-transparent h-32" />
                <img src="/featured-2.jpg" alt="" className="h-full w-full object-cover object-[55%]" />
                <div className="absolute inset-0 bg-black/20" />
                <h3 className="absolute bottom-4 w-full text-center text-base px-2 text-shadow-lg uppercase font-heading text-white">Athletic Excellence</h3>
              </div>

              <div className="relative overflow-hidden">
                <div className="absolute bottom-0 w-full bg-gradient-to-t from-black via-black/40 to-transparent h-32" />
                <img src="/featured-1.png" alt="" className="h-[220px] w-full object-cover" />
                <div className="absolute inset-0 bg-black/20" />
                <h3 className="absolute bottom-4 w-full text-center text-base px-2 text-shadow-lg uppercase font-heading text-white">Creative Pursuits</h3>
              </div>
              <div className="relative overflow-hidden">
                <div className="absolute bottom-0 w-full bg-gradient-to-t from-black via-black/40 to-transparent h-32" />
                <img src="/featured-4.png" alt="" className="h-[220px] w-full object-cover" />
                <div className="absolute inset-0 bg-black/20" />
                <h3 className="absolute bottom-4 w-full text-center text-base px-2 text-shadow-lg uppercase font-heading text-white">Culture & Traditions</h3>
              </div>
              <div className="relative overflow-hidden">
                <div className="absolute bottom-0 w-full bg-gradient-to-t from-black via-black/40 to-transparent h-32" />
                <img src="/featured-6.jpg" alt="" className="h-[220px] w-full object-cover" />
                <div className="absolute inset-0 bg-black/20" />
                <h3 className="absolute bottom-4 w-full text-center text-base px-2 text-shadow-lg uppercase font-heading text-white">The Women We’ve Shaped</h3>
              </div>
              <div className="relative col-span-2 overflow-hidden h-[220px]">
                <iframe
                  className="absolute inset-0 h-full w-full"
                  src="https://www.youtube.com/embed/tY5VujX-CX8?autoplay=1&mute=1&loop=1&playlist=tY5VujX-CX8&controls=0&showinfo=0&rel=0"
                  allow="autoplay"
                />

                <div className="absolute inset-0 bg-black/20" />
                <div className="absolute bottom-0 w-full bg-gradient-to-t from-black via-black/40 to-transparent h-32" />

                <h3 className="absolute bottom-4 w-full text-center text-base px-2 text-shadow-lg uppercase font-heading text-white">Explore Our Campus</h3>
              </div>
            </div>
          </div>
        </section>

        {/* Testimonial or Review Section */}
        <section className="bg-white py-8">
          <div className="container mx-auto px-4">
            <h3 className="mb-4 text-2xl font-bold font-heading text-center">Words from Parents: Who Matter Most</h3>
            <div className="pt-2">
              <Carousel
                opts={{
                  align: "start",
                  loop: true,
                }}
              >
                <CarouselContent className="-ml-0">
                  {testimonials.map((item, index) => (
                    <CarouselItem key={index} className="basis-[95%] md:basis-[45%] lg:basis-[30%] p-2 pl-2">
                      <Card className="h-full border-0 bg-white p-4 hover:-translate-y-2 transition-all duration-300 rounded-none">
                        <CardContent className="flex h-full flex-col items-center p-0">
                          <div className="mb-5">
                            <img src="sara1.jpg" alt={item.name} className="h-24 w-24 rounded-full object-cover" />
                          </div>

                          <h3 className="font-heading text-xl font-bold">{item.name}</h3>

                          <p className="mb-5 text-muted-foreground">{item.title}</p>

                          <p className="mb-6 text-center flex-1 leading-relaxed font-heading">"{item.review}"</p>

                          <div className="flex items-center gap-1">
                            {[...Array(item.rating)].map((_, i) => (
                              <Star key={i} className="h-4 w-4 fill-yellow-500 text-yellow-500" />
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

        {/* Three Step Section */}
        <section className="bg-gray-200 py-8">
          <div className="container mx-auto px-4 font-heading">
            <Carousel
              setApi={setAdmissionApi}
              opts={{
                align: "start",
              }}
              className="w-full"
            >
              <CarouselContent>
                <CarouselItem className="">
                  <div className="mx-auto max-w-2xl">
                    <Badge variant="outline" className="mb-5 rounded-full text-sm border-yellow-500">
                      Admissions 2026–27
                    </Badge>

                    <h2 className="font-heading text-2xl md:text-5xl font-bold tracking-tight">
                      Three Steps to Joining
                      <span className="block">Ecole Globale</span>
                    </h2>

                    <p className="mt-3 text-sm leading-relaxed font-heading">
                      We admit girls from Class IV to Class XII. Our admissions process is transparent, rigorous, and respectful of your time. Applications for NRI and
                      international students are welcome throughout the year.
                    </p>
                  </div>
                </CarouselItem>
                {/* Step Slides */}
                {steps.map((step) => {
                  const Icon = step.icon;

                  return (
                    <CarouselItem key={step.id}>
                      <Card className="border-0 overflow-hidden h-full p-0 rounded-none">
                        <CardContent className="p-3">
                          <div className="flex items-center justify-between mb-2">
                            <Icon className="size-8 text-primary" />

                            <span className="text-4xl font-black text-primary/20">{step.id}</span>
                          </div>

                          <h3 className="font-heading text-2xl font-bold mb-4">{step.title}</h3>

                          <p className="leading-relaxed">{step.description}</p>
                        </CardContent>
                      </Card>
                    </CarouselItem>
                  );
                })}

                <CarouselItem>
                  <Card className="border-0 h-full p-0 rounded-none">
                    <CardContent className="p-3">
                      <h3 className="mb-4 text-2xl font-bold font-heading text-gray-500 text-center">ENQUIRE NOW</h3>

                      <form className="space-y-4">
                        <Input className="bg-white border-b-2 rounded-none border-l-0 border-r-0 border-t-0 p-0 focus-visible:ring-0 border-primary" placeholder="Your Name" />
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
                    </CardContent>
                  </Card>
                </CarouselItem>
              </CarouselContent>

              <div className="mt-2 flex justify-center items-center ">
                <button onClick={() => admissionApi?.scrollPrev()} className="transition hover:opacity-70">
                  <ChevronLeft className="size-8" />
                </button>

                <div className="w-48">
                  <div className="h-[2px] bg-neutral-300">
                    <div
                      className="h-[2px] bg-black transition-all duration-300"
                      style={{
                        width: `${(admissionCurrent / admissionCount) * 100}%`,
                      }}
                    />
                  </div>
                </div>

                <button onClick={() => admissionApi?.scrollNext()} className="transition hover:opacity-70">
                  <ChevronRight className="size-8" />
                </button>
              </div>
              <div className="mt-2 text-center text-sm tracking-[0.2em]">
                {String(admissionCurrent).padStart(2, "0")} / {String(admissionCount).padStart(2, "0")}
              </div>
            </Carousel>
          </div>
        </section>

        {/* Video Carousel Section */}
        <section className="bg-white">
          <div className="container mx-auto">
            <div className="relative">
              <Carousel
                className=""
                setApi={setVideoApi}
                opts={{
                  align: "center",
                  loop: true,
                }}
              >
                <CarouselContent className="py-20">
                  {videos.map((video, index) => (
                    <CarouselItem key={index} className={`basis-[50%] pl-0 md:basis-[55%] ${currentVideo === index ? "z-20" : "z-0"}`}>
                      <div
                        className={`relative transition-all duration-500 border-6 border-white shadow-[0_0px_10px_rgba(0,0,0,0.25)]  ${currentVideo === index ? "scale-[1.2]" : "scale-[.8]"}`}
                      >
                        <video
                          ref={(el) => {
                            videoRefs.current[index] = el;
                          }}
                          src={video}
                          loop
                          playsInline
                          preload="metadata"
                          poster="/poster.png"
                          controls={false}
                          className="w-full cursor-pointer"
                          onClick={() => toggleVideo(index)}
                          onPlay={() => setPlayingIndex(index)}
                          onPause={() => setPlayingIndex(null)}
                        />

                        {/* Full Overlay Click Area */}
                        <div className="absolute inset-0 cursor-pointer" onClick={() => toggleVideo(index)} />

                        {/* Center Play Button */}
                        {playingIndex !== index && currentVideo === index && (
                          <button
                            onClick={() => toggleVideo(index)}
                            className="absolute left-1/2 top-1/2 z-20 flex h-10 w-10 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full bg-black/60 backdrop-blur-sm"
                          >
                            <Play className="h-5 w-5 text-white fill-white" />
                          </button>
                        )}

                        {/* Bottom Right Pause Button */}
                        {playingIndex === index && (
                          <button
                            onClick={() => toggleVideo(index)}
                            className="absolute bottom-4 right-4 z-20 flex h-6 w-6 items-center justify-center rounded-full bg-black/60 backdrop-blur-sm"
                          >
                            <Pause className="h-3 w-3 text-white fill-white" />
                          </button>
                        )}
                      </div>
                    </CarouselItem>
                  ))}
                </CarouselContent>
              </Carousel>
              <div className="-mt-3 flex justify-end gap-4 pr-4">
                <button onClick={handlePrevVideo} className=" transition hover:scale-105">
                  <ArrowLeft className="h-6 w-6" />
                </button>

                <button onClick={handleNextVideo} className=" transition hover:scale-105">
                  <ArrowRight className="h-6 w-6" />
                </button>
              </div>
            </div>
          </div>
        </section>

        {/* Brand Carousel */}
        <section className="bg-white py-8 pb-24 overflow-hidden">
          <div className="container mx-auto">
            <div className="relative overflow-hidden">
              <div className="absolute left-0 top-0 z-10 h-full w-24 bg-gradient-to-r from-white to-transparent" />
              <div className="absolute right-0 top-0 z-10 h-full w-24 bg-gradient-to-l from-white to-transparent" />

              <motion.div
                className="flex gap-12"
                animate={{ x: ["0%", "-3150px"] }}
                transition={{
                  duration: 30,
                  ease: "linear",
                  repeat: Infinity,
                }}
              >
                {[...clientLogos, ...clientLogos].map((item, index) => (
                  <div key={index} className="shrink-0">
                    <img src={item.image} className="h-16 md:h-20 w-auto object-contain" alt="" />
                  </div>
                ))}
              </motion.div>
            </div>
          </div>
        </section>

        {/* Bottom Navigation */}
        <motion.div
          className="fixed bottom-0 z-50 w-full md:hidden bg-gray-700 text-white backdrop-blur-md"
          animate={{
            y: 0,
          }}
        >
          <motion.div
            className="mx-auto my-3 flex justify-around "
            animate={{
              maxWidth: compact ? "85%" : "100%",
              paddingTop: compact ? 4 : 7,
              paddingBottom: compact ? 4 : 7,
            }}
            transition={{
              duration: 0.5,
            }}
          >
            <Link href="tel:+91-9557291888" className="flex items-center justify-center gap-2 px-3">
              <Phone size={20} />

              {/* <AnimatePresence>{!compact && */}
              <motion.span className="overflow-hidden whitespace-nowrap text-[13px] font-medium">Call Us</motion.span>
              {/* } </AnimatePresence> */}
            </Link>

            <Link href="https://www.instagram.com/ecole_girls_school" className="flex items-center justify-center gap-2 px-3" target="_blank">
              <FaInstagram size={20} />

              {/* <AnimatePresence>{!compact && */}
              <motion.span className="overflow-hidden whitespace-nowrap text-[13px] font-medium">Instagram</motion.span>
              {/* } </AnimatePresence> */}
            </Link>

            <Link href="#enquire-now" className="flex items-center justify-center gap-2 px-3">
              <CalendarPlus size={20} />

              {/* <AnimatePresence>{!compact &&  */}
              <motion.span className="overflow-hidden whitespace-nowrap text-[13px] font-medium">Enquire Now</motion.span>
              {/* } </AnimatePresence> */}
            </Link>
          </motion.div>
        </motion.div>
      </main>
    </>
  );
}
