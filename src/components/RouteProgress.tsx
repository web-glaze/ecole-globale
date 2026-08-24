"use client";

import { useEffect, useRef } from "react";
import { usePathname } from "next/navigation";

export default function RouteProgress() {
  const pathname = usePathname();
  const progressRef = useRef<HTMLDivElement>(null);
  const timersRef = useRef<NodeJS.Timeout[]>([]);

  const clearTimers = () => {
    timersRef.current.forEach(clearTimeout);
    timersRef.current = [];
  };

  const startProgress = () => {
    const bar = progressRef.current;

    if (!bar) return;

    clearTimers();

    bar.classList.remove("route-progress-complete");
    bar.classList.add("route-progress-active");

    bar.style.width = "10%";

    timersRef.current.push(
      setTimeout(() => {
        bar.style.width = "40%";
      }, 150)
    );

    timersRef.current.push(
      setTimeout(() => {
        bar.style.width = "70%";
      }, 500)
    );

    timersRef.current.push(
      setTimeout(() => {
        bar.style.width = "85%";
      }, 1000)
    );
  };

  const completeProgress = () => {
    const bar = progressRef.current;

    if (!bar) return;

    clearTimers();

    bar.style.width = "100%";

    timersRef.current.push(
      setTimeout(() => {
        bar.classList.remove("route-progress-active");
        bar.classList.add("route-progress-complete");
      }, 200)
    );

    timersRef.current.push(
      setTimeout(() => {
        bar.style.width = "0%";
        bar.classList.remove("route-progress-complete");
      }, 500)
    );
  };

  // Route finished
  useEffect(() => {
    completeProgress();
  }, [pathname]);

  // Detect internal navigation clicks
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

      // Ignore new tab / modified clicks
      if (link.target === "_blank" || event.ctrlKey || event.metaKey || event.shiftKey || event.altKey) {
        return;
      }

      const clickedUrl = new URL(href, window.location.origin);

      const currentUrl = window.location.pathname + window.location.search;

      const newUrl = clickedUrl.pathname + clickedUrl.search;

      // Same page
      if (newUrl === currentUrl) return;

      startProgress();
    };

    document.addEventListener("click", handleClick);

    return () => {
      document.removeEventListener("click", handleClick);
      clearTimers();
    };
  }, []);

  return <div ref={progressRef} className="route-progress" aria-hidden="true" />;
}
