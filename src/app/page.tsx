"use client";

import Navbar from "@/components/navbar";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  motion,
  useScroll,
  useTransform,
  useSpring,
  useMotionValue,
  useInView,
  Variants,
} from "framer-motion";
import {
  Carousel,
  CarouselApi,
  CarouselContent,
  CarouselItem,
} from "@/components/ui/carousel";
import { Card, CardContent } from "@/components/ui/card";
import Link from "next/link";
import { useEffect, useRef, useState, useCallback } from "react";
import { ChevronLeft, ChevronRight, Star } from "lucide-react";
import Footer from "@/components/footer";

// ─────────────────────────────────────────────────────────────────────────────
// Easing & Variants
// ─────────────────────────────────────────────────────────────────────────────

const EASE = [0.22, 1, 0.36, 1] as [number, number, number, number];
const EASE_IN_OUT = [0.76, 0, 0.24, 1] as [number, number, number, number];

const fadeUp: Variants = {
  hidden: { opacity: 0, y: 60 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.9, ease: EASE } },
};

const clipReveal: Variants = {
  hidden: { clipPath: "inset(0 0 100% 0)", opacity: 0 },
  visible: {
    clipPath: "inset(0 0 0% 0)",
    opacity: 1,
    transition: { duration: 1, ease: EASE_IN_OUT },
  },
};

const stagger: Variants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.12, delayChildren: 0.05 } },
};

const staggerFast: Variants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.07 } },
};

const scaleIn: Variants = {
  hidden: { opacity: 0, scale: 0.88 },
  visible: { opacity: 1, scale: 1, transition: { duration: 0.7, ease: EASE } },
};

// ─────────────────────────────────────────────────────────────────────────────
// SplitText — word-by-word slide-up reveal
// ─────────────────────────────────────────────────────────────────────────────

function SplitText({
  text,
  className = "",
  delay = 0,
}: {
  text: string;
  className?: string;
  delay?: number;
}) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-5% 0px" });

  return (
    <span ref={ref} className={`inline ${className}`}>
      {text.split(" ").map((word, i) => (
        <span
          key={i}
          className="inline-block overflow-hidden mr-[0.3em] last:mr-0"
        >
          <motion.span
            className="inline-block"
            initial={{ y: "110%" }}
            animate={inView ? { y: "0%" } : { y: "110%" }}
            transition={{ duration: 0.75, ease: EASE, delay: delay + i * 0.09 }}
          >
            {word}
          </motion.span>
        </span>
      ))}
    </span>
  );
}

// ─────────────────────────────────────────────────────────────────────────────
// TiltCard — 3-D perspective on hover
// ─────────────────────────────────────────────────────────────────────────────

function TiltCard({
  children,
  className = "",
}: {
  children: React.ReactNode;
  className?: string;
}) {
  const cardRef = useRef<HTMLDivElement>(null);
  const mx = useMotionValue(0);
  const my = useMotionValue(0);

  const rotX = useTransform(my, [-0.5, 0.5], [10, -10]);
  const rotY = useTransform(mx, [-0.5, 0.5], [-10, 10]);
  const sRotX = useSpring(rotX, { stiffness: 200, damping: 22 });
  const sRotY = useSpring(rotY, { stiffness: 200, damping: 22 });

  const onMove = useCallback(
    (e: React.MouseEvent<HTMLDivElement>) => {
      if (!cardRef.current) return;
      const r = cardRef.current.getBoundingClientRect();
      mx.set((e.clientX - r.left) / r.width - 0.5);
      my.set((e.clientY - r.top) / r.height - 0.5);
    },
    [mx, my],
  );

  const onLeave = useCallback(() => {
    mx.set(0);
    my.set(0);
  }, [mx, my]);

  return (
    <motion.div
      ref={cardRef}
      onMouseMove={onMove}
      onMouseLeave={onLeave}
      style={{ rotateX: sRotX, rotateY: sRotY, transformPerspective: 900 }}
      className={className}
    >
      {children}
    </motion.div>
  );
}

// ─────────────────────────────────────────────────────────────────────────────
// MagneticButton — button follows cursor slightly
// ─────────────────────────────────────────────────────────────────────────────

function MagneticButton({
  children,
  className = "",
}: {
  children: React.ReactNode;
  className?: string;
}) {
  const btnRef = useRef<HTMLDivElement>(null);
  const bx = useMotionValue(0);
  const by = useMotionValue(0);
  const sx = useSpring(bx, { stiffness: 280, damping: 22 });
  const sy = useSpring(by, { stiffness: 280, damping: 22 });

  const onMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!btnRef.current) return;
    const r = btnRef.current.getBoundingClientRect();
    bx.set((e.clientX - (r.left + r.width / 2)) * 0.28);
    by.set((e.clientY - (r.top + r.height / 2)) * 0.28);
  };

  const onLeave = () => {
    bx.set(0);
    by.set(0);
  };

  return (
    <div
      ref={btnRef}
      onMouseMove={onMove}
      onMouseLeave={onLeave}
      className={className}
    >
      <motion.div style={{ x: sx, y: sy }}>{children}</motion.div>
    </div>
  );
}

// ─────────────────────────────────────────────────────────────────────────────
// AnimatedCounter — counts up when in view
// ─────────────────────────────────────────────────────────────────────────────

function AnimatedCounter({
  target,
  suffix = "",
}: {
  target: number;
  suffix?: string;
}) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-15% 0px" });
  const [val, setVal] = useState(0);

  useEffect(() => {
    if (!inView) return;
    let raf: number;
    let start: number | null = null;
    const duration = 2200;
    const step = (ts: number) => {
      if (!start) start = ts;
      const p = Math.min((ts - start) / duration, 1);
      const ease = 1 - Math.pow(1 - p, 3); // ease-out-cubic
      setVal(Math.floor(ease * target));
      if (p < 1) raf = requestAnimationFrame(step);
    };
    raf = requestAnimationFrame(step);
    return () => cancelAnimationFrame(raf);
  }, [inView, target]);

  return (
    <span ref={ref}>
      {val}
      {suffix}
    </span>
  );
}

// ─────────────────────────────────────────────────────────────────────────────
// Infinite Logo Marquee
// ─────────────────────────────────────────────────────────────────────────────

function LogoMarquee({ logos }: { logos: { image: string }[] }) {
  const doubled = [...logos, ...logos];
  return (
    <div className="overflow-hidden w-full">
      <motion.div
        className="flex items-center gap-16 w-max"
        animate={{ x: ["0%", "-50%"] }}
        transition={{ duration: 20, ease: "linear", repeat: Infinity }}
      >
        {doubled.map((l, i) => (
          <motion.img
            key={i}
            src={l.image}
            alt=""
            className="h-12 w-auto object-contain grayscale hover:grayscale-0 opacity-50 hover:opacity-100 transition-all duration-300 shrink-0"
            whileHover={{ scale: 1.12 }}
          />
        ))}
      </motion.div>
    </div>
  );
}

// ─────────────────────────────────────────────────────────────────────────────
// Data
// ─────────────────────────────────────────────────────────────────────────────

const slides = [
  {
    title: "About Us",
    subtitle: "Overview of School",
    description:
      "Ecole Globale International Girls' School is one of the premier Institutes for girls.",
    image: "/carousel-2.jpg",
  },
  {
    title: "Academics",
    subtitle: "Learning Excellence",
    description:
      "Providing world-class education with a modern and innovative curriculum.",
    image: "/carousel-3.jpg",
  },
  {
    title: "Campus Life",
    subtitle: "Student Experience",
    description:
      "A vibrant campus environment that encourages creativity and leadership.",
    image: "/carousel-1.jpg",
  },
];

const testimonials = [
  {
    name: "Sophia Williams",
    title: "Parent",
    review:
      "The school has provided an exceptional learning environment for my daughter. We are delighted with her growth and confidence.",
    rating: 5,
  },
  {
    name: "Emily Johnson",
    title: "Alumni",
    review:
      "The academic support and extracurricular opportunities helped me become the person I am today.",
    rating: 5,
  },
  {
    name: "Sarah Brown",
    title: "Parent",
    review:
      "An outstanding institution with dedicated teachers and a nurturing atmosphere.",
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

export default function Home() {
  const [api, setApi] = useState<CarouselApi>();
  const [current, setCurrent] = useState(1);
  const [count, setCount] = useState(0);

  // Scroll progress bar
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001,
  });

  // Hero parallax
  const heroRef = useRef<HTMLElement>(null);
  const { scrollYProgress: heroProgress } = useScroll({
    target: heroRef,
    offset: ["start start", "end start"],
  });
  const heroBgY = useTransform(heroProgress, [0, 1], ["0%", "25%"]);
  const heroContentY = useTransform(heroProgress, [0, 1], ["0%", "15%"]);
  const heroOpacity = useTransform(heroProgress, [0, 0.75], [1, 0]);

  useEffect(() => {
    if (!api) return;
    setCount(api.scrollSnapList().length);
    setCurrent(api.selectedScrollSnap() + 1);
    api.on("select", () => setCurrent(api.selectedScrollSnap() + 1));
  }, [api]);

  return (
    <>
      {/* ── Scroll progress bar ───────────────────────────────────────── */}
      <motion.div
        style={{ scaleX }}
        className="fixed top-0 left-0 right-0 h-[3px] bg-primary z-[9999] origin-left shadow-[0_0_12px_rgba(var(--primary),0.8)]"
      />

      <Navbar />

      <main>
        {/* ══════════════════════════════════════════════════════════════
            HERO
        ══════════════════════════════════════════════════════════════ */}
        <section
          ref={heroRef}
          className="relative min-h-[580px] md:min-h-[700px] bg-[#f2e9e6] overflow-hidden"
        >
          {/* Parallax background texture */}
          <motion.div
            style={{
              y: heroBgY,
              backgroundImage: "url('/ecole-hero-bg.png')",
              backgroundSize: "cover",
              backgroundPosition: "center",
            }}
            className="absolute inset-0 opacity-10 scale-110"
          />

          <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-black/30 to-transparent h-32" />
          <div className="absolute bottom-0 w-full bg-gradient-to-t from-white via-white/50 to-transparent h-28" />

          <motion.div
            style={{ y: heroContentY, opacity: heroOpacity }}
            className="container relative z-10 mx-auto flex h-full items-center px-4"
          >
            <div className="grid w-full grid-cols-1 items-center gap-12 lg:grid-cols-2 h-full pt-32 pb-18">
              {/* Left — hero image */}
              <div className="flex flex-col justify-between">
                <motion.img
                  src="/ecole-hero-img.png"
                  alt=""
                  initial={{ scale: 0.75, y: 80, opacity: 0, rotate: -3 }}
                  animate={{ scale: 1, y: 0, opacity: 1, rotate: 0 }}
                  transition={{ duration: 1.3, ease: EASE }}
                  className="h-auto max-w-full drop-shadow-2xl"
                />
                <motion.div
                  initial={{ x: -80, opacity: 0 }}
                  animate={{ x: 0, opacity: 1 }}
                  transition={{ duration: 0.9, ease: EASE, delay: 0.7 }}
                  className="block text-center text-sm max-w-[280px] mx-auto md:hidden mt-4"
                >
                  © 2026 ÉCOLE GLOBALE INTERNATIONAL GIRLS&apos; SCHOOL
                </motion.div>
              </div>

              {/* Right — enquiry form (desktop) */}
              <div className="hidden justify-end lg:flex">
                <MagneticButton>
                  <motion.div
                    initial={{ opacity: 0, x: 100, rotateY: -20 }}
                    animate={{ opacity: 1, x: 0, rotateY: 0 }}
                    transition={{ duration: 1.1, delay: 0.4, ease: EASE }}
                    style={{ transformPerspective: 1200 }}
                    className="w-full max-w-md rounded-2xl bg-white/90 backdrop-blur-md p-8 shadow-2xl border border-white/60"
                  >
                    <h3 className="mb-6 text-3xl font-bold font-heading text-gray-600 text-center">
                      ENQUIRE NOW
                    </h3>
                    <form className="space-y-4">
                      {[
                        { ph: "Your Name", type: "text" },
                        { ph: "Phone Number", type: "tel" },
                        { ph: "Email Address", type: "email" },
                      ].map(({ ph, type }, i) => (
                        <motion.div
                          key={ph}
                          initial={{ opacity: 0, x: 24 }}
                          animate={{ opacity: 1, x: 0 }}
                          transition={{
                            delay: 0.75 + i * 0.12,
                            duration: 0.55,
                            ease: EASE,
                          }}
                        >
                          <Input placeholder={ph} type={type} />
                        </motion.div>
                      ))}
                      <motion.div
                        initial={{ opacity: 0, y: 12 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 1.15, duration: 0.55, ease: EASE }}
                      >
                        <Button className="w-full">Submit Enquiry</Button>
                      </motion.div>
                    </form>
                  </motion.div>
                </MagneticButton>
              </div>
            </div>
          </motion.div>
        </section>

        {/* Mobile enquiry form */}
        <motion.div
          initial={{ opacity: 0, y: 60 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.35, ease: EASE }}
          className="md:hidden w-full max-w-md rounded-2xl bg-white p-8 shadow-xl mx-auto"
        >
          <h3 className="mb-4 text-3xl font-bold font-heading text-gray-500 text-center">
            ENQUIRE NOW
          </h3>
          <form className="space-y-4">
            {[
              { ph: "Your Name", type: "text" },
              { ph: "Phone Number", type: "tel" },
              { ph: "Email Address", type: "email" },
            ].map(({ ph, type }) => (
              <Input
                key={ph}
                placeholder={ph}
                type={type}
                className="bg-white border-b-2 rounded-none border-l-0 border-r-0 border-t-0 p-0 focus-visible:ring-0 border-primary"
              />
            ))}
            <Button className="w-full">Submit Enquiry</Button>
          </form>
        </motion.div>

        <section className="bg-gray-200 py-24 overflow-hidden">
          <div className="container mx-auto px-4">
            {/* Section header */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-14">
              <div>
                <motion.p
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6, ease: EASE }}
                  className="text-xs uppercase tracking-[0.3em] text-muted-foreground mb-4"
                >
                  Welcome to
                </motion.p>

                <h3 className="text-3xl md:text-4xl font-bold font-heading mb-2 leading-tight">
                  <SplitText text="Ecole Globale International Girls' School in Dehradun" />
                </h3>

                <motion.p
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.8, delay: 0.55, ease: EASE }}
                  className="text-muted-foreground leading-relaxed"
                >
                  Lorem, ipsum dolor sit amet consectetur adipisicing elit.
                  Obcaecati ab hic iste ullam, similique alias eaque quas
                  temporibus expedita architecto.
                </motion.p>
              </div>
            </div>

            {/* Carousel */}
            <motion.div
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.1 }}
              transition={{ duration: 1, ease: EASE }}
            >
              <Carousel
                setApi={setApi}
                opts={{ align: "start", loop: true }}
                className="w-full"
              >
                <CarouselContent>
                  {slides.map((slide, index) => (
                    <CarouselItem
                      key={index}
                      className="basis-[90%] md:basis-[45%] lg:basis-[30%]"
                    >
                      <TiltCard>
                        <motion.div
                          whileHover={{ y: -10 }}
                          transition={{ duration: 0.4, ease: EASE }}
                          className="relative"
                        >
                          <div className="overflow-hidden">
                            <motion.img
                              src={slide.image}
                              alt={slide.title}
                              className="w-full"
                              whileHover={{ scale: 1.05 }}
                              transition={{ duration: 0.6, ease: EASE }}
                            />
                          </div>
                          <Card className="w-80 m-auto mt-[-20px] z-10 relative p-5 text-center gap-0 bg-white/95 backdrop-blur-sm shadow-xl">
                            <p className="text-md mb-2 text-muted-foreground">
                              {slide.subtitle}
                            </p>
                            <h3 className="text-2xl mb-5 font-heading font-bold uppercase">
                              {slide.title}
                            </h3>
                            <h4 className="font-heading text-base text-muted-foreground">
                              {slide.description}
                            </h4>
                            <div className="mt-5">
                              <Link
                                href="#"
                                className="w-auto font-bold inline-block border-b-2 border-black pb-1 text-lg transition-all hover:border-primary hover:text-primary"
                              >
                                Explore More
                              </Link>
                            </div>
                          </Card>
                        </motion.div>
                      </TiltCard>
                    </CarouselItem>
                  ))}
                </CarouselContent>
              </Carousel>
            </motion.div>

            {/* Custom navigation */}
            <motion.div
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7, delay: 0.3 }}
              className="mt-10 flex justify-center items-center gap-4"
            >
              <motion.button
                onClick={() => api?.scrollPrev()}
                whileHover={{ scale: 1.15 }}
                whileTap={{ scale: 0.92 }}
                className="transition"
              >
                <ChevronLeft className="size-8" />
              </motion.button>
              <div className="w-48">
                <div className="h-[2px] bg-neutral-300">
                  <div
                    className="h-[2px] bg-black transition-[width] duration-500 ease-out"
                    style={{ width: `${count ? (current / count) * 100 : 0}%` }}
                  />
                </div>
              </div>
              <motion.button
                onClick={() => api?.scrollNext()}
                whileHover={{ scale: 1.15 }}
                whileTap={{ scale: 0.92 }}
                className="transition"
              >
                <ChevronRight className="size-8" />
              </motion.button>
            </motion.div>
            <div className="mt-2 text-center text-sm tracking-[0.25em] text-muted-foreground">
              {String(current).padStart(2, "0")} /{" "}
              {String(count).padStart(2, "0")}
            </div>
          </div>
        </section>

        <section className="bg-white py-16">
          <div className="container mx-auto px-4">
            {/* Heading */}
            <motion.div
              variants={stagger}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, amount: 0.3 }}
              className="mb-10 text-center"
            >
              <motion.p
                variants={fadeUp}
                className="text-xs uppercase tracking-[0.3em] text-muted-foreground mb-3"
              >
                Life at Ecole
              </motion.p>
              <motion.h3
                variants={fadeUp}
                className="text-3xl md:text-4xl font-bold font-heading"
              >
                Campus Highlights
              </motion.h3>
            </motion.div>

            {/* Grid */}
            <motion.div
              variants={stagger}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, amount: 0.05 }}
              className="grid grid-cols-2 gap-3"
            >
              {featuredItems.map((item, i) => (
                <motion.div
                  key={i}
                  variants={clipReveal}
                  className={`relative overflow-hidden cursor-pointer group ${item.span}`}
                >
                  {/* gradient overlay */}
                  <div className="absolute bottom-0 w-full bg-gradient-to-t from-black/80 via-black/30 to-transparent h-40 z-10 pointer-events-none" />

                  {/* image with zoom */}
                  <motion.img
                    src={item.src}
                    alt={item.label}
                    className={`w-full object-cover transition-transform will-change-transform ${
                      item.span === "row-span-2"
                        ? "h-full object-[55%]"
                        : "h-[180px]"
                    }`}
                    whileHover={{ scale: 1.1 }}
                    transition={{ duration: 0.65, ease: EASE }}
                  />

                  {/* dark overlay fade on hover */}
                  <motion.div
                    className="absolute inset-0 bg-black/25 pointer-events-none"
                    whileHover={{ opacity: 0 }}
                    transition={{ duration: 0.35 }}
                  />

                  {/* label slide up */}
                  <motion.h3
                    className="absolute bottom-4 w-full text-center text-lg md:text-xl uppercase font-heading text-white z-20 tracking-wider"
                    initial={{ y: 0 }}
                    whileHover={{ y: -5, letterSpacing: "0.18em" }}
                    transition={{ duration: 0.3, ease: EASE }}
                  >
                    {item.label}
                  </motion.h3>
                </motion.div>
              ))}
            </motion.div>
          </div>
        </section>

        <section className="bg-gray-50 py-16">
          <div className="container mx-auto px-4">
            {/* Heading */}
            <motion.div
              variants={stagger}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, amount: 0.3 }}
              className="text-center mb-10"
            >
              <motion.p
                variants={fadeUp}
                className="text-xs uppercase tracking-[0.3em] text-muted-foreground mb-3"
              >
                What they say
              </motion.p>
              <motion.h3
                variants={fadeUp}
                className="text-3xl font-bold font-heading"
              >
                Testimonials
              </motion.h3>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.1 }}
              transition={{ duration: 0.9, ease: EASE }}
            >
              <Carousel opts={{ align: "start", loop: true }}>
                <CarouselContent className="-ml-0">
                  {testimonials.map((item, index) => (
                    <CarouselItem
                      key={index}
                      className="basis-[95%] md:basis-[45%] lg:basis-[30%] p-2 pb-10 pl-3"
                    >
                      <TiltCard>
                        <motion.div
                          whileHover={{ y: -12 }}
                          transition={{ duration: 0.4, ease: EASE }}
                        >
                          <Card className="h-full border-0 bg-white p-8 shadow-xl">
                            <CardContent className="flex h-full flex-col items-center p-0">
                              {/* Avatar with ring pulse */}
                              <div className="mb-5 relative">
                                <motion.div
                                  className="absolute inset-0 rounded-full bg-primary/20"
                                  animate={{ scale: [1, 1.15, 1] }}
                                  transition={{
                                    duration: 2.5,
                                    repeat: Infinity,
                                    ease: "easeInOut",
                                  }}
                                />
                                <motion.img
                                  src="sara1.jpg"
                                  alt={item.name}
                                  className="h-24 w-24 rounded-full object-cover relative z-10 ring-4 ring-primary/20"
                                  whileHover={{ scale: 1.08 }}
                                  transition={{ duration: 0.3 }}
                                />
                              </div>

                              <h3 className="font-heading text-xl font-bold">
                                {item.name}
                              </h3>
                              <p className="mb-5 text-sm text-muted-foreground">
                                {item.title}
                              </p>
                              <p className="mb-6 text-center flex-1 leading-relaxed text-muted-foreground text-sm">
                                &ldquo;{item.review}&rdquo;
                              </p>

                              {/* Stars pop in with spring */}
                              <div className="flex items-center gap-1">
                                {[...Array(item.rating)].map((_, si) => (
                                  <motion.div
                                    key={si}
                                    initial={{ scale: 0, rotate: -30 }}
                                    whileInView={{ scale: 1, rotate: 0 }}
                                    viewport={{ once: true }}
                                    transition={{
                                      delay: 0.25 + si * 0.08,
                                      type: "spring",
                                      stiffness: 500,
                                      damping: 16,
                                    }}
                                  >
                                    <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                                  </motion.div>
                                ))}
                              </div>
                            </CardContent>
                          </Card>
                        </motion.div>
                      </TiltCard>
                    </CarouselItem>
                  ))}
                </CarouselContent>
              </Carousel>
            </motion.div>
          </div>
        </section>

        <section className="bg-white py-14">
          <LogoMarquee logos={clientLogos} />
        </section>
      </main>

      <Footer />
    </>
  );
}
