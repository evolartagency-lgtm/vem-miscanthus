"use client";

import { useEffect } from "react";

/** Toggles `is-scrolled` on <html> so the mobile header can go transparent → matte. */
export function HeaderScroll() {
  useEffect(() => {
    const onScroll = () => {
      document.documentElement.classList.toggle("is-scrolled", window.scrollY > 24);
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);
  return null;
}
