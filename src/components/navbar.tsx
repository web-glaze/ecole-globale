"use client";

import Link from "next/link";
import { Menu, Phone } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from "@/components/ui/sheet";
import { useEffect, useState } from "react";
import { useSiteSettings } from "@/lib/site-settings-context";

export default function Navbar() {
  const { settings, navigation } = useSiteSettings();
  const menu = navigation?.menu || [];
  const [scrolled, setScrolled] = useState(false);
  const logo = settings?.logo?.cloudinary.secure_url || "/logo.png";

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
            {menu.map((item: any) => {
              const label = item.label || item.page?.title;

              const href = item.type === "page" ? `/${item.page?.slug === "home" ? "" : item.page?.slug}` : item.url;

              return (
                <Link
                  key={label}
                  href={href}
                  target={item.newTab ? "_blank" : "_self"}
                  className={`text-md font-medium transition-colors hover:text-primary ${scrolled ? "" : "text-white"}`}
                >
                  {label}
                </Link>
              );
            })}

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
                {menu.map((item: any) => {
                  const label = item.label || item.page?.title;

                  const href = item.type === "page" ? `/${item.page?.slug === "home" ? "" : item.page?.slug}` : item.url;

                  return (
                    <Link key={label} href={href} target={item.newTab ? "_blank" : "_self"} className="text-lg font-medium">
                      {label}
                    </Link>
                  );
                })}
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
