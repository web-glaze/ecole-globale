"use client";

import { useEffect, useRef } from "react";
import { usePathname, useSearchParams } from "next/navigation";

export default function RouteProgress() {
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const progressRef = useRef<HTMLDivElement>(null);
  const timerRef = useRef<NodeJS.Timeout | null>(null);

  const startProgress = () => {
    const bar = progressRef.current;

    if (!bar) return;

    bar.classList.remove("route-progress-complete");
    bar.classList.add("route-progress-active");

    // Start around 10%
    bar.style.width = "10%";

    // Slowly move while the route is loading
    timerRef.current = setTimeout(() => {
      bar.style.width = "40%";
    }, 150);

    setTimeout(() => {
      bar.style.width = "70%";
    }, 500);

    setTimeout(() => {
      bar.style.width = "85%";
    }, 1000);
  };

  const completeProgress = () => {
    const bar = progressRef.current;

    if (!bar) return;

    if (timerRef.current) {
      clearTimeout(timerRef.current);
    }

    bar.style.width = "100%";

    setTimeout(() => {
      bar.classList.remove("route-progress-active");
      bar.classList.add("route-progress-complete");

      setTimeout(() => {
        bar.style.width = "0%";
        bar.classList.remove("route-progress-complete");
      }, 300);
    }, 200);
  };

  useEffect(() => {
    completeProgress();
  }, [pathname, searchParams]);

  useEffect(() => {
    const handleClick = (event: MouseEvent) => {
      const target = event.target as HTMLElement;

      const link = target.closest("a");

      if (!link) return;

      const href = link.getAttribute("href");

      if (!href) return;

      // Ignore special links
      if (href.startsWith("#") || href.startsWith("mailto:") || href.startsWith("tel:") || href.startsWith("javascript:")) {
        return;
      }

      // Ignore external links
      if (link.hostname && link.hostname !== window.location.hostname) {
        return;
      }

      // Ignore new tab
      if (link.target === "_blank" || event.ctrlKey || event.metaKey || event.shiftKey || event.altKey) {
        return;
      }

      const currentUrl = window.location.pathname + window.location.search;

      if (href === currentUrl) return;

      startProgress();
    };

    document.addEventListener("click", handleClick);

    return () => {
      document.removeEventListener("click", handleClick);

      if (timerRef.current) {
        clearTimeout(timerRef.current);
      }
    };
  }, []);

  return <div ref={progressRef} className="route-progress" aria-hidden="true" />;
}
