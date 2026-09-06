"use client";

import { motion } from "framer-motion";
import type { ReactNode } from "react";

const EASE: [number, number, number, number] = [0.16, 1, 0.3, 1];

export function Reveal({
  children,
  delay = 0,
  className = "",
}: {
  children: ReactNode;
  delay?: number;
  className?: string;
}) {
  return (
    <motion.div
      className={className}
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-8% 0px" }}
      transition={{ duration: 0.8, ease: EASE, delay }}
    >
      {children}
    </motion.div>
  );
}

export function CtaLink({
  href,
  children,
  variant = "solid",
  className = "",
}: {
  href: string;
  children: ReactNode;
  variant?: "solid" | "outline" | "ghost";
  className?: string;
}) {
  const styles =
    variant === "solid"
      ? "rounded-full bg-[#1d3b2a] text-[#f3efe2] hover:bg-[#27503a]"
      : variant === "outline"
        ? "rounded-full border border-white/40 bg-white/10 text-[#f3efe2] hover:border-biomass/70 hover:bg-biomass/20"
        : "rounded-full text-biomass hover:text-beige";
  return (
    <a
      href={href}
      className={`cta-modern inline-flex items-center gap-3 rounded-full px-7 py-3.5 text-[11px] font-semibold tracking-[0.14em] uppercase transition-all duration-300 hover:-translate-y-0.5 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-biomass ${styles} ${className}`}
    >
      {children}
    </a>
  );
}
