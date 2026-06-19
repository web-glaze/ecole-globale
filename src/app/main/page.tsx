"use client";

import Navbar from "@/components/navbar";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { motion, AnimatePresence, useScroll } from "framer-motion";
import { Carousel, CarouselApi, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from "@/components/ui/carousel";
import { Card, CardContent } from "@/components/ui/card";
import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import { ChevronLeft, ChevronRight, Star, FileText, ClipboardCheck, School, Icon, Phone, Mail, CalendarPlus } from "lucide-react";
import Footer from "@/components/footer";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";

const slides = [
  {
    title: "About Us",
    subtitle: "Overview",
    description:
      "In this era of progressive education, schools strive to provide holistic development for their students. Beyond delivering a curriculum that encompasses academics...",
    image: "/main-home-slide-1.jpg",
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
    description: 'Not "world-class facilities" - specific ones. Every facility at Ecole is named, operated, and maintained to the highest standard.',
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

const heroSlides = ["/hero-slide-1.jpg", "/hero-slide-2.jpg"];

const videos = ["/ecole-instagram-slider.mp4", "/ecole-instagram-slider.mp4", "/ecole-instagram-slider.mp4"];

export default function Home() {
  const [api, setApi] = useState<CarouselApi>();
  const [current, setCurrent] = useState(1);
  const [count, setCount] = useState(0);

  const [heroApi, heroSetApi] = useState<CarouselApi>();
  const [heroCurrent, heroSetCurrent] = useState(1);
  const [heroCount, heroSetCount] = useState(0);

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
  const videoRefs = useRef<(HTMLVideoElement | null)[]>([]);

  useEffect(() => {
    if (!videoApi) return;

    setCurrentVideo(videoApi.selectedScrollSnap());

    videoApi.on("select", () => {
      setCurrentVideo(videoApi.selectedScrollSnap());
    });
  }, [videoApi]);

  useEffect(() => {
    videoRefs.current.forEach((video, index) => {
      if (!video) return;

      if (index !== currentVideo) {
        video.pause();
        video.currentTime = 0;
      }
    });
  }, [currentVideo]);

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
          <div className="container relative z-10 mx-auto flex items-center px-4">
            <div className="grid w-full grid-cols-1 items-center gap-12 lg:grid-cols-2 pt-32 pb-18 min-h-screen">
              {/* Left Content */}
              <div className="max-w-2x flex flex-col justify-between gap-5">
                <div className="flex flex-col justify-between">
                  <img src="/ecole-hero-img.png" alt="" className="h-auto max-w-full drop-shadow-2xl" />
                  <div className="block text-center text-base max-w-[280px] mx-auto md:hidden">© 2026 ÉCOLE GLOBALE INTERNATIONAL GIRLS’ SCHOOL</div>
                </div>
                <div className="relative hidden">
                  <Carousel
                    setApi={heroSetApi}
                    opts={{
                      align: "start",
                      loop: true,
                    }}
                  >
                    <CarouselContent>
                      {heroSlides.map((slide, index) => (
                        <CarouselItem key={index} className="basis-[96%] md:basis-[45%] lg:basis-[30%] pl-2">
                          <div className="relative overflow-hidden rounded-2xl">
                            <img src={slide} alt={`Slide ${index + 1}`} className="w-full object-cover" />

                            {/* Optional Gradient Overlay */}
                            <div className="absolute inset-x-0 bottom-0 h-20 bg-gradient-to-t from-black/40 to-transparent" />
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

        {/* Welcom About Section */}
        <section className="bg-gray-200 py-8">
          <div className="container mx-auto px-4">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
              <div>
                <h5 className="text-2xl mb-2">Welcome to</h5>
                <h3 className="text-3xl font-bold font-heading mb-3">Ecole Globale International Girls' School in Dehradun</h3>
                <p>
                  Lorem, ipsum dolor sit amet consectetur adipisicing elit. Obcaecati ab hic iste ullam, similique alias eaque quas temporibus
                  expedita architecto.
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
                  <CarouselItem key={index} className="basis-[95%] md:basis-[45%] lg:basis-[30%] pl-3">
                    <div className="relative h-full">
                      <img src={slide.image} alt={slide.title} className="w-full aspect-video" />
                      <Card className="w-full m-auto z-10 relative p-5 text-center gap-0 h-full">
                        <p className="text-md mb-2">{slide.subtitle}</p>
                        <h3 className="text-xl mb-3 font-heading font-bold uppercase">{slide.title}</h3>
                        <h4 className="font-heading text-lg">{slide.description}</h4>
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

            <div className="mt-5 flex justify-center items-center ">
              <button onClick={() => api?.scrollPrev()} className="transition hover:opacity-70">
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

              <button onClick={() => api?.scrollNext()} className="transition hover:opacity-70">
                <ChevronRight className="size-8" />
              </button>
            </div>
            <div className="mt-2 text-center text-sm tracking-[0.2em]">
              {String(current).padStart(2, "0")} / {String(count).padStart(2, "0")}
            </div>
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
                <h3 className="absolute bottom-4 w-full text-center text-xl px-2 text-shadow-lg uppercase font-heading text-white">Life at Ecole</h3>
              </div>

              <div className="relative row-span-2 overflow-hidden">
                <div className="absolute bottom-0 w-full bg-gradient-to-t from-black via-black/40 to-transparent h-32" />
                <img src="/featured-2.jpg" alt="" className="h-full w-full object-cover object-[55%]" />
                <div className="absolute inset-0 bg-black/20" />
                <h3 className="absolute bottom-4 w-full text-center text-xl px-2 text-shadow-lg uppercase font-heading text-white">
                  Athletic Excellence
                </h3>
              </div>

              <div className="relative overflow-hidden">
                <div className="absolute bottom-0 w-full bg-gradient-to-t from-black via-black/40 to-transparent h-32" />
                <img src="/featured-1.png" alt="" className="h-[220px] w-full object-cover" />
                <div className="absolute inset-0 bg-black/20" />
                <h3 className="absolute bottom-4 w-full text-center text-xl px-2 text-shadow-lg uppercase font-heading text-white">
                  Creative Pursuits
                </h3>
              </div>
              <div className="relative overflow-hidden">
                <div className="absolute bottom-0 w-full bg-gradient-to-t from-black via-black/40 to-transparent h-32" />
                <img src="/featured-4.png" alt="" className="h-[220px] w-full object-cover" />
                <div className="absolute inset-0 bg-black/20" />
                <h3 className="absolute bottom-4 w-full text-center text-xl px-2 text-shadow-lg uppercase font-heading text-white">
                  Culture & Traditions
                </h3>
              </div>
              <div className="relative overflow-hidden">
                <div className="absolute bottom-0 w-full bg-gradient-to-t from-black via-black/40 to-transparent h-32" />
                <img src="/featured-6.jpg" alt="" className="h-[220px] w-full object-cover" />
                <div className="absolute inset-0 bg-black/20" />
                <h3 className="absolute bottom-4 w-full text-center text-xl px-2 text-shadow-lg uppercase font-heading text-white">
                  The Women We’ve Shaped
                </h3>
              </div>
              <div className="relative col-span-2 overflow-hidden h-[220px]">
                <iframe
                  className="absolute inset-0 h-full w-full"
                  src="https://www.youtube.com/embed/tY5VujX-CX8?autoplay=1&mute=1&loop=1&playlist=tY5VujX-CX8&controls=0&showinfo=0&rel=0"
                  allow="autoplay"
                />

                <div className="absolute inset-0 bg-black/20" />
                <div className="absolute bottom-0 w-full bg-gradient-to-t from-black via-black/40 to-transparent h-32" />

                <h3 className="absolute bottom-4 w-full text-center text-xl px-2 text-shadow-lg uppercase font-heading text-white">
                  Explore Our Campus
                </h3>
              </div>
            </div>
          </div>
        </section>

        {/* Testimonial or Review Section */}
        <section className="bg-white py-8">
          <div className="container mx-auto px-4">
            <h3 className="mb-4 text-3xl font-bold font-heading text-center">Words from Parents: Who Matter Most</h3>
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
                      <Card className="h-full border-0 bg-white p-4 hover:-translate-y-2 transition-all duration-300">
                        <CardContent className="flex h-full flex-col items-center p-0">
                          <div className="mb-5">
                            <img src="sara1.jpg" alt={item.name} className="h-24 w-24 rounded-full object-cover" />
                          </div>

                          <h3 className="font-heading text-xl font-bold">{item.name}</h3>

                          <p className="mb-5 text-muted-foreground">{item.title}</p>

                          <p className="mb-6 text-center flex-1 leading-relaxed text-muted-foreground">"{item.review}"</p>

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
          <div className="container mx-auto px-4">
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

                    <h2 className="font-heading text-3xl md:text-5xl font-bold tracking-tight">
                      Three Steps to Joining
                      <span className="block">Ecole Globale</span>
                    </h2>

                    <p className="mt-3 text-md leading-relaxed">
                      We admit girls from Class IV to Class XII. Our admissions process is transparent, rigorous, and respectful of your time.
                      Applications for NRI and international students are welcome throughout the year.
                    </p>
                  </div>
                </CarouselItem>
                {/* Step Slides */}
                {steps.map((step) => {
                  const Icon = step.icon;

                  return (
                    <CarouselItem key={step.id}>
                      <Card className="border-0 overflow-hidden h-full p-0">
                        <CardContent className="p-3">
                          <div className="flex items-center justify-between mb-2">
                            <Icon className="size-8 text-primary" />

                            <span className="text-4xl font-black text-primary/20">{step.id}</span>
                          </div>

                          <h3 className="font-heading text-2xl font-bold mb-4">{step.title}</h3>

                          <p className="leading-relaxed text-muted-foreground">{step.description}</p>
                        </CardContent>
                      </Card>
                    </CarouselItem>
                  );
                })}

                <CarouselItem>
                  <Card className="border-0 h-full p-0">
                    <CardContent className="p-3">
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
                    <CarouselItem key={index} className={`basis-[60%] pl-0 md:basis-[55%] ${currentVideo === index ? "z-20" : "z-0"}`}>
                      <div
                        className={`relative transition-all duration-500 border-8 border-white shadow-[0_0px_10px_rgba(0,0,0,0.25)]  ${currentVideo === index ? "scale-120" : "scale-100"}`}
                      >
                        <video
                          ref={(el) => {
                            videoRefs.current[index] = el;
                          }}
                          src={video}
                          controls={currentVideo === index}
                          muted
                          loop
                          playsInline
                          className={`w-full ${currentVideo !== index ? "pointer-events-none" : ""}`}
                          onPlay={() => {
                            if (currentVideo !== index) return;

                            videoRefs.current.forEach((video, i) => {
                              if (i !== index && video) {
                                video.pause();
                                video.currentTime = 0;
                              }
                            });
                          }}
                          poster="poster.png"
                        />
                      </div>
                    </CarouselItem>
                  ))}
                </CarouselContent>
              </Carousel>
            </div>
          </div>
        </section>

        {/* Brand Carousel */}
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

        {/* Bottom Navigation */}
        <motion.div
          className="fixed bottom-0 z-50 w-full md:hidden"
          animate={{
            y: 0,
          }}
        >
          <motion.div
            className="mx-auto my-3 flex justify-around rounded-full bg-black/50 text-white backdrop-blur-md"
            animate={{
              maxWidth: compact ? "180px" : "80%",
              paddingTop: compact ? 10 : 12,
              paddingBottom: compact ? 10 : 12,
            }}
            transition={{
              duration: 0.35,
              ease: [0.4, 0, 0.2, 1],
            }}
          >
            <Link href="tel:+91-9557291888" className="flex items-center justify-center gap-2 px-3">
              <Phone size={20} />

              <AnimatePresence>
                {!compact && (
                  <motion.span
                    initial={{ opacity: 0, width: 0 }}
                    animate={{ opacity: 1, width: "auto" }}
                    exit={{ opacity: 0, width: 0 }}
                    transition={{ duration: 0.1 }}
                    className="overflow-hidden whitespace-nowrap text-[13px] font-medium"
                  >
                    Call Us
                  </motion.span>
                )}
              </AnimatePresence>
            </Link>

            <Link href="mailto:ecoleglobale@gmail.com" className="flex items-center justify-center gap-2 px-3">
              <Mail size={20} />

              <AnimatePresence>
                {!compact && (
                  <motion.span
                    initial={{ opacity: 0, width: 0 }}
                    animate={{ opacity: 1, width: "auto" }}
                    exit={{ opacity: 0, width: 0 }}
                    transition={{ duration: 0.1 }}
                    className="overflow-hidden whitespace-nowrap text-[13px] font-medium"
                  >
                    Mail Us
                  </motion.span>
                )}
              </AnimatePresence>
            </Link>

            <Link href="#enquire-now" className="flex items-center justify-center gap-2 px-3">
              <CalendarPlus size={20} />

              <AnimatePresence>
                {!compact && (
                  <motion.span
                    initial={{ opacity: 0, width: 0 }}
                    animate={{ opacity: 1, width: "auto" }}
                    exit={{ opacity: 0, width: 0 }}
                    transition={{ duration: 0.1 }}
                    className="overflow-hidden whitespace-nowrap text-[13px] font-medium"
                  >
                    Enquire Now
                  </motion.span>
                )}
              </AnimatePresence>
            </Link>
          </motion.div>
        </motion.div>
      </main>
    </>
  );
}
