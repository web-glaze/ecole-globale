"use client";

import Link from "next/link";
import Image from "next/image";
import { MapPin, Phone, Mail } from "lucide-react";
import {
  FaFacebookF,
  FaInstagram,
  FaXTwitter,
  FaYoutube,
  FaLinkedinIn,
  FaPhone,
  FaEnvelope,
} from "react-icons/fa6";
import { FaMapMarkerAlt } from "react-icons/fa";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Separator } from "@/components/ui/separator";

// ── data ──────────────────────────────────────────────────────────────────────

const quickLinks = [
  { label: "Home", href: "/" },
  { label: "About Us", href: "/about" },
  { label: "Services", href: "/services" },
  { label: "Blog", href: "/blog" },
  { label: "Admissions", href: "/admissions" },
  { label: "Contact", href: "/contact" },
];

const contactDetails = [
  {
    icon: FaMapMarkerAlt,
    label:
      "Ecole Globale International Girls' School, Dehradun, Uttarakhand – 248001",
  },
  { icon: FaPhone, label: "+91 98765 43210", href: "tel:+919876543210" },
  {
    icon: FaEnvelope,
    label: "info@ecoleglobale.edu.in",
    href: "mailto:info@ecoleglobale.edu.in",
  },
];

const socialLinks = [
  {
    icon: FaFacebookF,
    href: "https://facebook.com",
    label: "Facebook",
  },
  {
    icon: FaInstagram,
    href: "https://instagram.com",
    label: "Instagram",
  },
  {
    icon: FaXTwitter,
    href: "https://twitter.com",
    label: "Twitter / X",
  },
  {
    icon: FaYoutube,
    href: "https://youtube.com",
    label: "YouTube",
  },
  {
    icon: FaLinkedinIn,
    href: "https://linkedin.com",
    label: "LinkedIn",
  },
];

// ── component ─────────────────────────────────────────────────────────────────

export default function Footer() {
  return (
    <footer className="bg-[#33221a] text-[#46352d]">
      <div className="container mx-auto px-4 py-10">
        <div className="flex flex-wrap items-center gap-6 mb-4 md:justify-start">
          <Link href="/">
            <Image
              src="/logo.png"
              alt="Ecole Globale"
              width={220}
              height={60}
              className="object-contain"
            />
          </Link>
        </div>

        <div className="md:hidden">
          <Accordion
            type="multiple"
            className="border-[#46352d] rounded-xl overflow-hidden"
          >
            <AccordionItem
              value="quick-links"
              className="border-[#46352d] data-open:bg-transparent"
            >
              <AccordionTrigger className="text-[#f5ece1] font-semibold text-sm px-4 py-3 hover:no-underline">
                Quick Links
              </AccordionTrigger>
              <AccordionContent className="h-auto">
                <ul className="flex flex-col gap-2 mt-1">
                  {quickLinks.map((link) => (
                    <li key={link.href}>
                      <Link
                        href={link.href}
                        className="text-[#f5ece1] text-sm hover:text-white transition-colors no-underline!"
                      >
                        {link.label}
                      </Link>
                    </li>
                  ))}
                </ul>
              </AccordionContent>
            </AccordionItem>

            <AccordionItem
              value="contact"
              className="border-[#46352d] data-open:bg-transparent"
            >
              <AccordionTrigger className="text-[#f5ece1] font-semibold text-sm px-4 py-3 hover:no-underline">
                Contact Details
              </AccordionTrigger>
              <AccordionContent className="h-auto">
                <ul className="flex flex-col gap-3 mt-1">
                  {contactDetails.map(({ icon: Icon, label, href }) => (
                    <li
                      key={label}
                      className="flex items-start gap-2 text-sm text-[#f5ece1]"
                    >
                      <Icon className="size-4 mt-0.5 shrink-0 text-primary" />
                      {href ? (
                        <a
                          href={href}
                          className="hover:text-white transition-colors no-underline!"
                        >
                          {label}
                        </a>
                      ) : (
                        <span>{label}</span>
                      )}
                    </li>
                  ))}
                </ul>
              </AccordionContent>
            </AccordionItem>
          </Accordion>

          <div className="mt-6">
            <div className="flex gap-3 flex-wrap">
              <div className="flex items-center gap-4">
                {socialLinks.map(({ icon: Icon, href, label }) => (
                  <a
                    key={label}
                    href={href}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={label}
                    className="flex items-center justify-center transition-all duration-200 hover:scale-110"
                  >
                    <Icon className="size-5 text-primary" />
                  </a>
                ))}
              </div>
            </div>
          </div>
        </div>

        <div className="hidden md:grid md:grid-cols-3 gap-10">
          <div>
            <h3 className="text-white font-semibold text-sm uppercase tracking-wider mb-4">
              Quick Links
            </h3>
            <ul className="flex flex-col gap-2">
              {quickLinks.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-gray-400 text-sm hover:text-white transition-colors"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="text-white font-semibold text-sm uppercase tracking-wider mb-4">
              Contact Details
            </h3>
            <ul className="flex flex-col gap-3">
              {contactDetails.map(({ icon: Icon, label, href }) => (
                <li
                  key={label}
                  className="flex items-start gap-2 text-sm text-gray-400"
                >
                  <Icon className="size-4 mt-0.5 shrink-0 text-primary" />
                  {href ? (
                    <a
                      href={href}
                      className="hover:text-white transition-colors"
                    >
                      {label}
                    </a>
                  ) : (
                    <span>{label}</span>
                  )}
                </li>
              ))}
            </ul>
          </div>

          <div>
            <div className="flex flex-wrap gap-3">
              {socialLinks.map(({ icon: Icon, href, label }) => (
                <a
                  key={label}
                  href={href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={label}
                  className="flex size-9 items-center justify-center rounded-full bg-white/10 hover:bg-primary hover:text-white text-gray-400 transition-all duration-200"
                >
                  <Icon className="size-4" />
                </a>
              ))}
            </div>
          </div>
        </div>
      </div>

      <Separator className="bg-white/10" />
      <div className="container mx-auto px-4 py-4 flex flex-col items-center gap-2 text-center text-sm text-[#f5ece1] sm:flex-row sm:justify-between sm:text-left">
        <p className="max-w-[320px] mx-auto">
          © <span className="pr-1">{new Date().getFullYear()}</span> Ecole
          Globale International Girls&apos; School. All rights reserved.
        </p>
        <div className="flex gap-4">
          <Link
            href="/privacy-policy"
            className="hover:text-white transition-colors"
          >
            Privacy Policy
          </Link>
          <Link href="/terms" className="hover:text-white transition-colors">
            Terms of Use
          </Link>
        </div>
      </div>
    </footer>
  );
}
