"use client";

import Link from "next/link";
import { ChevronDown, Menu, Phone } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from "@/components/ui/sheet";
import { useEffect, useState } from "react";
import { useSiteSettings } from "@/lib/site-settings-context";

export default function Navbar() {
  const { settings, navigation } = useSiteSettings();
  const menu = navigation?.menu || [];
  const [openMenu, setOpenMenu] = useState<number | null>(null);
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
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
          <nav className="flex items-center gap-6">
            {menu.map((item: any) => {
              const label = item.label || item.page?.title;

              const href = item.type === "page" ? `/${item.page?.slug === "home" ? "" : item.page?.slug}` : item.url;

              return (
                <div key={label} className="group relative">
                  <Link
                    href={href}
                    target={item.newTab ? "_blank" : "_self"}
                    className={`flex items-center gap-1 text-md font-medium transition-colors hover:text-primary ${scrolled ? "" : "text-white"}`}
                  >
                    {label}

                    {item.children?.length > 0 && (
                      <svg className="h-4 w-4 transition-transform group-hover:rotate-180" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
                      </svg>
                    )}
                  </Link>

                  {item.children?.length > 0 && (
                    <div className="invisible absolute left-0 top-full mt-2 min-w-[220px] bg-white opacity-0 shadow-xl transition-all duration-200 group-hover:visible group-hover:opacity-100">
                      {item.children.map((child: any) => {
                        const childHref = child.type === "page" ? `/${child.page?.slug === "home" ? "" : child.page?.slug}` : child.url;

                        return (
                          <Link key={child.label} href={childHref} target={child.newTab ? "_blank" : "_self"} className="block px-5 py-2 hover:bg-gray-200">
                            {child.label}
                          </Link>
                        );
                      })}
                    </div>
                  )}
                </div>
              );
            })}

            <Button size="lg" className="text-lg">
              <Link href={`tel:${settings.phone}`}>Call Now</Link>
            </Button>
          </nav>
        </div>

        {/* Mobile */}
        <div className="flex h-full items-center justify-between md:hidden text-white">
          {/* Hamburger */}
          <Sheet open={mobileOpen} onOpenChange={setMobileOpen}>
            <SheetTrigger asChild>{scrolled ? <Menu className="size-6 text-black" /> : <Menu className="size-6 text-white" />}</SheetTrigger>

            <SheetContent side="left" className="w-[320px] p-0">
              <SheetHeader>
                <SheetTitle className="sr-only">Mobile Menu</SheetTitle>
              </SheetHeader>

              <nav className="flex h-full flex-col">
                <div className="flex-1 overflow-y-auto px-5 py-4">
                  {menu.map((item: any, index: number) => {
                    const href = item.type === "page" ? `/${item.page?.slug === "home" ? "" : item.page?.slug}` : item.url;

                    const hasChildren = item.children?.length > 0;

                    return (
                      <div key={index} className="border-b py-1">
                        <div className="flex items-center">
                          <Link
                            href={href}
                            onClick={() => {
                              setMobileOpen(false);
                              setOpenMenu(null);
                            }}
                            className="flex-1 rounded-lg px-3 py-3 text-[15px] font-medium transition hover:bg-muted hover:text-primary"
                          >
                            {item.label}
                          </Link>

                          {hasChildren && (
                            <button onClick={() => setOpenMenu(openMenu === index ? null : index)} className="rounded-lg p-3 hover:bg-muted">
                              <ChevronDown className={`h-5 w-5 transition-transform duration-300 ${openMenu === index ? "rotate-180" : ""}`} />
                            </button>
                          )}
                        </div>

                        <div className={`grid transition-all duration-300 ${openMenu === index ? "grid-rows-[1fr]" : "grid-rows-[0fr]"}`}>
                          <div className="overflow-hidden">
                            <div className="ml-3 my-3 border-l pl-3">
                              {item.children?.map((child: any) => {
                                const childHref = child.type === "page" ? `/${child.page?.slug === "home" ? "" : child.page?.slug}` : child.url;

                                return (
                                  <Link
                                    key={child.label}
                                    href={childHref}
                                    onClick={() => {
                                      setMobileOpen(false);
                                      setOpenMenu(null);
                                    }}
                                    className="block rounded-md px-3 py-2 text-sm text-muted-foreground transition hover:bg-muted hover:text-primary"
                                  >
                                    {child.label}
                                  </Link>
                                );
                              })}
                            </div>
                          </div>
                        </div>
                      </div>
                    );
                  })}
                </div>

                <div className="border-t p-5">
                  <Button className="w-full" size="lg" asChild>
                    <a href={`tel:${settings.phone}`} onClick={() => setMobileOpen(false)}>
                      <Phone className="mr-2 h-4 w-4" />
                      Call Now
                    </a>
                  </Button>
                </div>
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
