"use client";

import Link from "next/link";
import Image from "next/image";
import { MapPin, Phone, Mail } from "lucide-react";
import { FaFacebookF, FaInstagram, FaXTwitter, FaYoutube, FaLinkedinIn, FaPhone, FaEnvelope } from "react-icons/fa6";
import { FaMapMarkerAlt } from "react-icons/fa";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { Separator } from "@/components/ui/separator";
import { useSiteSettings } from "@/lib/site-settings-context";

// ── component ─────────────────────────────────────────────────────────────────

export default function Footer() {
  const { settings, navigation } = useSiteSettings();

  const quickLinks = [
    { label: "Home", href: "/" },
    { label: "About Us", href: "/about" },
    { label: "Services", href: "/services" },
    { label: "Blog", href: "/blog" },
    { label: "Admissions", href: "/admissions" },
    { label: "Contact", href: "/contact" },
  ];

  const contactDetails = [
    settings?.address && {
      icon: FaMapMarkerAlt,
      label: settings.address,
    },

    settings?.phone && {
      icon: FaPhone,
      label: settings.phone,
      href: `tel:${settings.phone}`,
    },

    settings?.email && {
      icon: FaEnvelope,
      label: settings.email,
      href: `mailto:${settings.email}`,
    },
  ].filter(Boolean);

  const socialLinks = [
    {
      icon: FaFacebookF,
      href: settings?.facebook,
      label: "Facebook",
    },
    {
      icon: FaInstagram,
      href: settings?.instagram,
      label: "Instagram",
    },
    {
      icon: FaXTwitter,
      href: settings?.twitter,
      label: "Twitter / X",
    },
    {
      icon: FaYoutube,
      href: settings?.youtube,
      label: "YouTube",
    },
    {
      icon: FaLinkedinIn,
      href: settings?.linkedin,
      label: "LinkedIn",
    },
  ].filter((item) => item.href);

  return (
    <footer className="bg-gray-600 text-white">
      <div className="container mx-auto px-4 py-10">
        <div className="flex flex-wrap items-center gap-6 mb-4 md:justify-start">
          <Link href="/">
            <Image src="/logo.png" alt="Ecole Globale" width={220} height={60} className="object-contain" />
          </Link>
        </div>

        <div className="md:hidden">
          <Accordion type="multiple" className="border-[#5c6674] rounded-sm overflow-hidden">
            <AccordionItem value="quick-links" className="border-[#5c6674] data-open:bg-transparent">
              <AccordionTrigger className="text-white font-semibold text-sm px-4 py-3 hover:no-underline">Quick Links</AccordionTrigger>
              <AccordionContent className="h-auto">
                <ul className="flex flex-col gap-2 mt-1">
                  {quickLinks.map((link) => (
                    <li key={link.href}>
                      <Link href={link.href} className="text-white text-sm hover:text-white transition-colors no-underline!">
                        {link.label}
                      </Link>
                    </li>
                  ))}
                </ul>
              </AccordionContent>
            </AccordionItem>

            <AccordionItem value="contact" className="border-[#5c6674] data-open:bg-transparent">
              <AccordionTrigger className="text-white font-semibold text-sm px-4 py-3 hover:no-underline">Contact Details</AccordionTrigger>
              <AccordionContent className="h-auto">
                <ul className="flex flex-col gap-3 mt-1">
                  {contactDetails.map(({ icon: Icon, label, href }) => (
                    <li key={label} className="flex items-start gap-2 text-sm text-white">
                      <Icon className="size-4 mt-0.5 shrink-0 text-white" />
                      {href ? (
                        <a href={href} className="hover:text-white transition-colors no-underline!">
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
                    <Icon className="size-5 text-white" />
                  </a>
                ))}
              </div>
            </div>
          </div>
        </div>

        <div className="hidden md:grid md:grid-cols-3 gap-10">
          <div>
            <h3 className="text-white font-semibold text-lg uppercase tracking-wider mb-4">Quick Links</h3>
            <ul className="flex flex-col gap-2">
              {quickLinks.map((link) => (
                <li key={link.href}>
                  <Link href={link.href} className=" text-lg hover:text-white transition-colors">
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="text-white font-semibold text-lg uppercase tracking-wider mb-4">Contact Details</h3>
            <ul className="flex flex-col gap-3">
              {contactDetails.map(({ icon: Icon, label, href }) => (
                <li key={label} className="flex items-start gap-2 text-sm ">
                  <Icon className="size-4 mt-0.5 shrink-0 text-white" />
                  {href ? (
                    <a href={href} className="text-lg hover:text-white transition-colors">
                      {label}
                    </a>
                  ) : (
                    <span className="text-lg hover:text-white transition-colors">{label}</span>
                  )}
                </li>
              ))}
            </ul>
          </div>

          <div>
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
                  <Icon className="size-8 text-white" />
                </a>
              ))}
            </div>
          </div>
        </div>
      </div>

      <Separator className="bg-white/10" />
      <div className="container mx-auto px-4 py-4 pb-20 flex flex-col items-center gap-2 text-center text-sm md:text-lg text-white sm:flex-row sm:justify-between sm:text-left">
        <p className="max-w-[320px] md:mr-auto">
          © <span className="pr-1">{new Date().getFullYear()}</span> Ecole Globale School.
        </p>
        <div className="flex gap-4">
          <Link href="/privacy-policy" className="hover:text-white transition-colors">
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
