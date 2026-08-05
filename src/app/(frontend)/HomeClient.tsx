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
import { RichText } from "@payloadcms/richtext-lexical/react";
import Autoplay from "embla-carousel-autoplay";

function EnquiryForm() {
  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    email: "",
    message: "",
  });

  const [loading, setLoading] = useState(false);
  const [successMessage, setSuccessMessage] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    setLoading(true);
    setSuccessMessage("");
    setErrorMessage("");

    try {
      const res = await fetch("/api/leads", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      const result = await res.json();

      if (res.ok) {
        setSuccessMessage("Enquiry submitted successfully!");

        setFormData({
          name: "",
          phone: "",
          email: "",
          message: "",
        });
      } else {
        const errorMsg = result.message || result.errors?.[0]?.message || "Failed to submit enquiry.";
        setErrorMessage(errorMsg);
      }
    } catch (err) {
      console.error(err);
      setErrorMessage("Something went wrong");
    }
    setLoading(false);
  };

  return (
    <form onSubmit={handleSubmit} autoComplete="on" className="space-y-4 font-heading">
      <Input
        id="name"
        name="name"
        type="text"
        autoComplete="name"
        placeholder="Your Name"
        value={formData.name}
        onChange={handleChange}
        className="bg-white border-b-2 rounded-none border-l-0 border-r-0 border-t-0 p-0 focus-visible:ring-0 border-primary"
        required
      />

      <Input
        id="phone"
        name="phone"
        type="tel"
        autoComplete="tel"
        placeholder="Phone Number"
        value={formData.phone}
        onChange={handleChange}
        className="bg-white border-b-2 rounded-none border-l-0 border-r-0 border-t-0 p-0 focus-visible:ring-0 border-primary"
      />

      <Input
        id="email"
        name="email"
        type="email"
        autoComplete="email"
        placeholder="Email Address"
        value={formData.email}
        onChange={handleChange}
        className="bg-white border-b-2 rounded-none border-l-0 border-r-0 border-t-0 p-0 focus-visible:ring-0 border-primary"
        required
      />

      <Button className="w-full" disabled={loading}>
        {loading ? "Submitting..." : "Submit Enquiry"}
      </Button>

      {successMessage && <p className="text-green-600 text-sm font-medium text-center mt-2">{successMessage}</p>}
      {errorMessage && <p className="text-red-600 text-sm font-medium text-center mt-2">{errorMessage}</p>}
    </form>
  );
}

export default function HomeClient({ home }: any) {
  const hero = home.hero;
  const heroSlides = home.hero?.slides || ["/v1-hero-slider-5.jpg"];
  const welcome = home.welcome || [];
  const welcomeSlides = home.welcome?.cards || [];
  const featured = home.featured?.items || [];
  const testimonialsSection = home.testimonialsSection || [];
  const testimonials = home.testimonialsSection?.testimonials || [];
  const admissionSection = home.admission || [];
  const admissionSteps = home.admission?.steps || [];
  const updatesSection = home.updatesSection || [];
  const items = home.updatesSection?.items || [];
  const logos = home?.logos ?? [];

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
  const { scrollY } = useScroll();
  const lastScrollY = useRef(0);

  const ref = useRef(null);

  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start 80%", "end 20%"],
  });

  const backgroundSize = useTransform(scrollYProgress, [0, 1], ["0% 100%", "100% 100%"]);

  const lines = ["ENQUIRE NOW"];

  const iconMap = {
    file: FileText,
    clipboard: ClipboardCheck,
    school: School,
  };

  return (
    <>
      <main>
        {/* Hero Section */}
        <section id="hero-section" className="relative overflow-hidden bg-[#f2e9e6]">
          {/* Top Gradient */}
          <div className="absolute inset-x-0 top-0 z-10 h-24 bg-gradient-to-b from-black/60 to-transparent" />

          {/* Bottom Gradient */}
          <div className="absolute inset-x-0 bottom-0 z-10 h-28 bg-gradient-to-t from-black/70 to-transparent" />

          <div className="relative h-screen">
            <Carousel
              setApi={heroSetApi}
              opts={{
                align: "start",
                loop: true,
              }}
              plugins={
                hero?.autoPlay
                  ? [
                      Autoplay({
                        delay: hero.autoPlayDelay ?? 5000,
                        stopOnInteraction: false,
                      }),
                    ]
                  : []
              }
              className="h-full"
            >
              <CarouselContent className="h-full">
                {heroSlides.map((slide: any, index: number) => (
                  <CarouselItem key={index} className="h-full p-0">
                    <img src={slide.image.cloudinary.secure_url} alt={`Slide ${index + 1}`} className="h-screen w-full object-cover" />
                  </CarouselItem>
                ))}
              </CarouselContent>
            </Carousel>

            <div className="absolute bottom-8 left-1/2 z-20 flex -translate-x-1/2 gap-2">
              {heroSlides.map((_: any, index: number) => (
                <button
                  key={index}
                  onClick={() => heroApi?.scrollTo(index)}
                  className={`transition-all duration-300 ${heroCurrent === index ? "h-2 w-8 rounded-full bg-white" : "h-2 w-2 rounded-full bg-white/50"}`}
                />
              ))}
            </div>

            {hero?.showEnquiryForm && (
              <div className="absolute inset-0 z-20 hidden lg:flex items-center pointer-events-none">
                <div className="container mx-auto flex justify-end">
                  <div className="pointer-events-auto w-full max-w-md bg-white p-8 shadow-2xl backdrop-blur">
                    <h3 className="mb-6 text-center font-heading text-3xl font-bold text-gray-700">ENQUIRE NOW</h3>
                    <EnquiryForm />
                  </div>
                </div>
              </div>
            )}
          </div>
        </section>

        {/* Only Mobile View Form */}
        <div id="enquire-now" className="md:hidden w-full max-w-md container mx-auto px-4 bg-white py-8 md:py-16">
          <div ref={ref} className="mb-10 hidden">
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
          <h3 className="mb-4 text-3xl font-bold font-heading text-center bg-gradient-to-r from-[#171a20] via-[#e13e3e] to-[#171a20] bg-clip-text text-transparent">ENQUIRE NOW</h3>
          <EnquiryForm />
        </div>

        {/* Welcom About Section */}
        <section className="bg-gray-200 py-8 md:py-16">
          <div className="flex flex-col gap-12 container mx-auto px-4">
            <div className="md:text-center">
              <h5 className="text-2xl md:text-3xl mb-2 font-heading italic"> {welcome.smallHeading}</h5>
              <h3 className="text-3xl md:text-4xl font-bold font-heading mb-3 uppercase">{welcome.heading}</h3>
              <div className="font-heading  text-sm md:text-lg max-w-2xl mx-auto">
                <RichText data={welcome.description} />
              </div>
            </div>
          </div>

          <Carousel
            setApi={setApi}
            opts={{
              align: "center",
              loop: true,
            }}
            className="w-full mt-10"
          >
            <CarouselContent className="">
              {welcomeSlides.map((slide: any, index: number) => (
                <CarouselItem key={slide.id} className="basis-full md:basis-[45%] lg:basis-[30%] pr-3">
                  <div className="relative h-full flex flex-col">
                    {/* Animated Image */}
                    <div className={`absolute top-0 left-0 w-full aspect-3/2 z-0 transition-all duration-1000 ${current - 1 === index ? "translate-y-0" : "translate-y-14"}`}>
                      <img src={slide.image?.cloudinary?.secure_url || "/placeholder.jpg"} alt={slide.title} className="w-full aspect-3/2 -ml-8 object-cover" />
                    </div>

                    {/* Spacer for image height */}
                    <div className="aspect-3/2 " />

                    {/* Fixed Card */}
                    <Card className="w-full max-w-[270px] md:max-w-[400px] min-h-[250px] mx-auto relative z-10 py-8 px-5 text-center gap-0 rounded-none -mt-6 overflow-visible mb-2">
                      <div className="absolute -top-1 -left-1 w-[calc(100%+8px)] h-[calc(100%+8px)] border border-[#916e27] pointer-events-none" />
                      {slide.subtitle && <p className="mb-2 text-md">{slide.subtitle}</p>}
                      <h3 className="text-xl mb-3 font-heading font-bold uppercase">{slide.title}</h3>
                      <h4 className="font-heading text-base">{slide.description}</h4>

                      {slide.buttonLink && (
                        <div className="mt-4">
                          <Link href={slide.buttonLink} className="inline-block border-b-2 border-black pb-1 text-base font-bold transition hover:border-primary">
                            {slide.buttonText || "Read More"}
                          </Link>
                        </div>
                      )}
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
        <section className="bg-white py-8 md:py-16">
          <div className="container mx-auto px-4">
            <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
              <Link href={`${featured[0]?.link}`} className="relative overflow-hidden md:col-span-2">
                <div className="absolute bottom-0 w-full bg-gradient-to-t from-black via-black/40 to-transparent h-32" />
                <img src={featured[0]?.image?.cloudinary?.secure_url} alt="" className="h-[220px] md:h-[320px] w-full object-cover" />
                <div className="absolute inset-0 bg-black/20" />
                <h3 className="absolute bottom-4 w-full text-center text-base px-2 text-shadow-lg uppercase font-heading text-white">{featured[0]?.title}</h3>
              </Link>

              <Link href={`${featured[1]?.link}`} className="relative row-span-2 overflow-hidden">
                <div className="absolute bottom-0 w-full bg-gradient-to-t from-black via-black/40 to-transparent h-32" />
                <img src={featured[1].image.cloudinary?.secure_url} alt="" className="h-full w-full object-cover object-[55%]" />
                <div className="absolute inset-0 bg-black/20" />
                <h3 className="absolute bottom-4 w-full text-center text-base px-2 text-shadow-lg uppercase font-heading text-white">{featured[1].title}</h3>
              </Link>

              <Link href={`${featured[2]?.link}`} className="relative overflow-hidden">
                <div className="absolute bottom-0 w-full bg-gradient-to-t from-black via-black/40 to-transparent h-32" />
                <img src={featured[2].image.cloudinary?.secure_url} alt="" className="h-[220px] md:h-[320px] w-full object-cover" />
                <div className="absolute inset-0 bg-black/20" />
                <h3 className="absolute bottom-4 w-full text-center text-base px-2 text-shadow-lg uppercase font-heading text-white">{featured[2].title}</h3>
              </Link>
              <Link href={`${featured[3]?.link}`} className="relative overflow-hidden">
                <div className="absolute bottom-0 w-full bg-gradient-to-t from-black via-black/40 to-transparent h-32" />
                <img src={featured[3].image.cloudinary?.secure_url} alt="" className="h-[220px] md:h-[320px] w-full object-cover" />
                <div className="absolute inset-0 bg-black/20" />
                <h3 className="absolute bottom-4 w-full text-center text-base px-2 text-shadow-lg uppercase font-heading text-white">{featured[3].title}</h3>
              </Link>
              <Link href={`${featured[4]?.link}`} className="relative overflow-hidden">
                <div className="absolute bottom-0 w-full bg-gradient-to-t from-black via-black/40 to-transparent h-32" />
                <img src={featured[4].image.cloudinary?.secure_url} alt="" className="h-[220px] md:h-[320px] w-full object-cover" />
                <div className="absolute inset-0 bg-black/20" />
                <h3 className="absolute bottom-4 w-full text-center text-base px-2 text-shadow-lg uppercase font-heading text-white">{featured[4].title}</h3>
              </Link>
              <Link href={`${featured[5]?.link}`} className="relative col-span-2 overflow-hidden h-[220px] md:h-[320px]">
                <iframe
                  className="absolute inset-0 h-full w-full"
                  src={featured[5].videoUrl}
                  title="YouTube video player"
                  frameBorder="0"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                  allowFullScreen
                  referrerPolicy="strict-origin-when-cross-origin"
                />

                <div className="absolute inset-0 bg-black/20" />
                <div className="absolute bottom-0 w-full bg-gradient-to-t from-black via-black/40 to-transparent h-32" />

                <h3 className="absolute bottom-4 w-full text-center text-base px-2 text-shadow-lg uppercase font-heading text-white">{featured[5].title}</h3>
              </Link>
            </div>
          </div>
        </section>

        {/* Testimonial or Review Section */}
        <section className="bg-white py-8 md:pt-16 pb-0">
          <div className="container mx-auto">
            <h3 className="mb-4 text-2xl font-bold font-heading text-center uppercase text-gray-500">{testimonialsSection.heading}</h3>
            <div className="pt-2">
              <Carousel
                className="overflow-auto"
                opts={{
                  align: "start",
                  loop: true,
                }}
              >
                <CarouselContent className="-ml-0">
                  {testimonials.map((item: any) => (
                    <CarouselItem key={item.id} className="md:basis-1/2 mt-15 mb-10 overflow-visible px-4">
                      <Card className="rounded-[40px] border-0 bg-white p-3 pb-5 overflow-visible shadow-[0_0px_10px_0px_rgba(0,0,0,0.3)]">
                        <CardContent className="flex flex-col items-center p-0 overflow-visible">
                          <div className="-mt-15 mb-2">
                            {item.photo?.cloudinary?.secure_url ? (
                              <img src={item.photo?.cloudinary?.secure_url} alt={item.name} className="h-26 w-26 rounded-full object-cover" />
                            ) : (
                              <img src="/user-placeholder.png" alt={item.name} className="h-26 w-26 p-2 rounded-full object-cover bg-gray-200" />
                            )}
                          </div>
                          <h3 className="font-heading text-lg font-bold">{item.name}</h3>
                          <p className="mb-5 text-sm">{item.designation}</p>
                          <p className="mb-4  text-center font-heading text-sm leading-relaxed md:text-lg">"{item.review}"</p>
                          <div className="flex items-center gap-1">
                            {Array.from({
                              length: item.rating || 5,
                            }).map((_, i) => (
                              <Star key={i} className="h-5 w-5 fill-yellow-500 text-yellow-500" />
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

        {/* Update & Press Release Section */}
        <section className="bg-white py-8 md:pb-16 pt-0">
          <div className="container max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-20 items-center justify-between">
            <div className="hidden md:block">
              <h3 className="font-heading text-2xl md:text-5xl leading-14 font-bold tracking-tight mb-5">{updatesSection?.heading}</h3>
              <p className="text-xl font-bold mb-2"> {updatesSection?.phoneText}</p>
              <a className="text-3xl hover:underline cursor-pointer text-red-700" href={`tel:${updatesSection?.phoneNumber}`}>
                {updatesSection?.phoneNumber}
              </a>
            </div>
            <div className="relative ">
              <h3 className="text-2xl font-bold font-heading text-center">Updates & Press Release</h3>
              <Carousel
                className=""
                setApi={setVideoApi}
                opts={{
                  align: "center",
                  loop: true,
                }}
              >
                <CarouselContent className="py-20">
                  {updatesSection?.items?.map((item: any, index: number) => (
                    <CarouselItem key={index} className={`basis-[50%] pl-0 ${currentVideo === index ? "z-20" : "z-0"}`}>
                      {item.type === "video" ? (
                        <div className={`relative transition-all duration-500 border-6 border-white shadow-lg ${currentVideo === index ? "scale-[1.2]" : "scale-[.8]"}`}>
                          <video
                            ref={(el) => {
                              videoRefs.current[index] = el;
                            }}
                            src={item.video?.cloudinary?.secure_url}
                            loop
                            playsInline
                            preload="metadata"
                            controls={false}
                            poster={
                              item.poster?.cloudinary?.secure_url ||
                              item.video?.cloudinary?.secure_url?.replace("/video/upload/", "/video/upload/so_0/")?.replace(/\.(mp4|mov|webm|m4v)$/i, ".jpg")
                            }
                            className="w-full cursor-pointer"
                            onClick={() => toggleVideo(index)}
                            onPlay={() => setPlayingIndex(index)}
                            onPause={() => setPlayingIndex(null)}
                          />

                          {/* Click Overlay */}
                          <div className="absolute inset-0 z-10 cursor-pointer" onClick={() => toggleVideo(index)} />

                          {/* Play Button */}
                          {playingIndex !== index && currentVideo === index && (
                            <button
                              onClick={() => toggleVideo(index)}
                              className="absolute left-1/2 top-1/2 z-20 flex h-12 w-12 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full bg-black/60 backdrop-blur-sm"
                            >
                              <Play className="h-6 w-6 fill-white text-white" />
                            </button>
                          )}

                          {/* Pause Button */}
                          {playingIndex === index && (
                            <button
                              onClick={() => toggleVideo(index)}
                              className="absolute bottom-4 right-4 z-20 flex h-8 w-8 items-center justify-center rounded-full bg-black/60 backdrop-blur-sm"
                            >
                              <Pause className="h-4 w-4 fill-white text-white" />
                            </button>
                          )}
                        </div>
                      ) : item.link ? (
                        <a
                          href={item.link}
                          target="_blank"
                          rel="noopener noreferrer"
                          className={`bg-white overflow-hidden shadow-lg transition-all duration-500 h-full flex-col justify-center flex  ${currentVideo === index ? "scale-[1.2]" : "scale-[.8]"}`}
                        >
                          {item.image?.cloudinary?.secure_url && (
                            <img src={item.image.cloudinary.secure_url} alt={item.title || "Press Release"} className="w-full aspect-video object-cover" />
                          )}

                          {(item.title || item.description) && (
                            <div className="p-5">
                              <span className="text-red-700 text-sm">{item.sourcetitle}</span>
                              {item.title && <h4 className="text-xl font-bold">{item.title}</h4>}

                              {item.description && <p className="mt-2 text-sm line-clamp-[10]">{item.description}</p>}

                              <span className="mt-4 inline-block text-red-600 font-semibold">Read More →</span>
                            </div>
                          )}
                        </a>
                      ) : (
                        <div
                          className={`bg-white overflow-hidden shadow-lg transition-all duration-500 h-full flex-col justify-center flex  ${currentVideo === index ? "scale-[1.2]" : "scale-[.8]"}`}
                        >
                          {item.image?.cloudinary?.secure_url && (
                            <img src={item.image.cloudinary.secure_url} alt={item.title || "Press Release"} className="w-full aspect-video object-cover" />
                          )}

                          {(item.title || item.description) && (
                            <div className="p-5">
                              <span className="text-red-700 text-sm">{item.sourcetitle}</span>
                              {item.title && <h4 className="text-xl font-bold">{item.title}</h4>}

                              {item.description && <p className="mt-2 text-sm line-clamp-[10]">{item.description}</p>}
                            </div>
                          )}
                        </div>
                      )}
                    </CarouselItem>
                  ))}
                </CarouselContent>
              </Carousel>
              <div className="-mt-3 flex justify-end gap-4 pr-4">
                <button onClick={handlePrevVideo} className=" transition hover:scale-125">
                  <ArrowLeft className="h-6 w-6" />
                </button>

                <button onClick={handleNextVideo} className=" transition hover:scale-125">
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
                animate={{ x: ["0%", "-50%"] }}
                transition={{
                  duration: 20,
                  ease: "linear",
                  repeat: Infinity,
                }}
              >
                {[...logos, ...logos].map((logo) => (
                  <div key={`${logo.id}-${Math.random()}`} className="shrink-0">
                    <img src={logo.cloudinary?.secure_url} alt={logo.alt || ""} className="h-16 md:h-20 w-auto object-contain" />
                  </div>
                ))}
              </motion.div>
            </div>
          </div>
        </section>
      </main>
    </>
  );
}
