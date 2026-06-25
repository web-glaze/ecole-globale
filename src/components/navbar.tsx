"use client";

import Link from "next/link";
import { Menu, Phone } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from "@/components/ui/sheet";
import { useEffect, useState } from "react";

const navLinks = [
  { label: "Home", href: "/" },
  { label: "About", href: "/about" },
  { label: "Services", href: "/services" },
  { label: "Blog", href: "/blog" },
  { label: "Contact", href: "/contact" },
];

type NavbarProps = {
  settings: any;
};

export default function Navbar({ settings }: NavbarProps) {
  const [scrolled, setScrolled] = useState(false);
  // const logo = settings?.logo?.url || "/logo.png";
  const logo = "/logo.png";

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };

    window.addEventListener("scroll", handleScroll);

    return () => window.removeEventListener("scroll", handleScroll);
  }, []);
  return (
    <header className={`absolute inset-x-0 top-0 z-50 transition-all duration-300 ${scrolled ? "bg-background/40 backdrop-blur-md" : "bg-transparent"}`}>
      <div className="container mx-auto h-20 px-4">
        {/* Desktop */}
        <div className="hidden h-full items-center justify-between md:flex">
          {/* Logo */}
          {scrolled ? (
            <Link href="/">
              <img src={logo} alt="Logo" width="220" />
            </Link>
          ) : (
            <Link href="/">
              <img src={logo} alt="Logo" width="220" />
            </Link>
          )}

          {/* Menu */}
          <nav className="flex items-center gap-8">
            {navLinks.map((link) => (
              <Link key={link.href} href={link.href} className={`text-md font-medium transition-colors hover:text-primary ${scrolled ? "" : "text-white"}`}>
                {link.label}
              </Link>
            ))}

            <Button size="lg">Get Started</Button>
          </nav>
        </div>

        {/* Mobile */}
        <div className="flex h-full items-center justify-between md:hidden text-white">
          {/* Hamburger */}
          <Sheet>
            <SheetTrigger asChild>{scrolled ? <Menu className="size-6 text-black" /> : <Menu className="size-6 text-white" />}</SheetTrigger>

            <SheetContent side="left" className="w-[300px]">
              <SheetHeader>
                <SheetTitle className="sr-only">Mobile Menu</SheetTitle>
              </SheetHeader>

              <nav className="mt-8 flex flex-col gap-4 px-6 ">
                {navLinks.map((link) => (
                  <Link key={link.href} href={link.href} className="text-lg font-medium text-light">
                    {link.label}
                  </Link>
                ))}
              </nav>
            </SheetContent>
          </Sheet>

          {/* Logo Center */}
          {scrolled ? (
            <Link href="/">
              <img src={logo} alt="Logo" width="200" />
            </Link>
          ) : (
            <Link href="/">
              <img src={logo} alt="Logo" width="200" />
            </Link>
          )}

          {/* Phone Icon */}

          {scrolled ? (
            <a href={`tel:${settings.phone}`}>
              <Phone className="size-6 text-black" />
            </a>
          ) : (
            <a href={`tel:${settings.phone}`}>
              <Phone className="size-6 text-white" />
            </a>
          )}
        </div>
      </div>
    </header>
  );
}
