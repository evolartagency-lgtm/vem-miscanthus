"use client";

import Link from "next/link";
import { useEffect, useState } from "react";

type MenuItem = { href: string; label: string };

export function MobileMenu({ items, locale, contactLabel }: { items: MenuItem[]; locale: "uk" | "en"; contactLabel: string }) {
  const [open, setOpen] = useState(false);
  const prefix = `/${locale}`;

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    const close = (event: KeyboardEvent) => event.key === "Escape" && setOpen(false);
    window.addEventListener("keydown", close);
    return () => {
      document.body.style.overflow = "";
      window.removeEventListener("keydown", close);
    };
  }, [open]);

  return (
    <div className="lg:hidden">
      <button
        type="button"
        onClick={() => setOpen((value) => !value)}
        aria-expanded={open}
        aria-controls="mobile-navigation"
        aria-label={open ? (locale === "uk" ? "Закрити меню" : "Close menu") : (locale === "uk" ? "Відкрити меню" : "Open menu")}
        className="relative z-[60] flex h-11 w-11 items-center justify-center rounded-full border border-[#173c2c]/20 bg-white/65 text-[#173c2c] backdrop-blur-md"
      >
        <span className="relative h-4 w-5">
          <span className={`absolute left-0 top-0 h-px w-5 bg-current transition-transform duration-300 ${open ? "translate-y-[7px] rotate-45" : ""}`} />
          <span className={`absolute left-0 top-[7px] h-px w-5 bg-current transition-opacity duration-200 ${open ? "opacity-0" : ""}`} />
          <span className={`absolute left-0 top-[14px] h-px w-5 bg-current transition-transform duration-300 ${open ? "-translate-y-[7px] -rotate-45" : ""}`} />
        </span>
      </button>

      <div id="mobile-navigation" className={`fixed inset-0 z-50 transition-[visibility] ${open ? "visible" : "invisible delay-500"}`}>
        <button aria-label={locale === "uk" ? "Закрити меню" : "Close menu"} onClick={() => setOpen(false)} className={`absolute inset-0 bg-[#07130e]/40 transition-opacity duration-500 ${open ? "opacity-100" : "opacity-0"}`} />
        <div style={{ backgroundColor: "#f7f5ee" }} className={`absolute inset-y-0 right-0 z-[70] flex w-[min(92vw,390px)] flex-col overflow-y-auto overscroll-contain px-5 pb-5 pt-20 shadow-[-24px_0_70px_rgba(10,30,20,.22)] transition-transform duration-500 [transition-timing-function:cubic-bezier(.16,1,.3,1)] ${open ? "translate-x-0" : "translate-x-full"}`}>
          <p className="text-[10px] font-semibold uppercase tracking-[.28em] text-[#315b48]/70">Vital Energy Miscanthus</p>
          <nav className="mt-6 flex shrink-0 flex-col" aria-label={locale === "uk" ? "Мобільна навігація" : "Mobile navigation"}>
            {items.map((item) => (
              <Link key={item.href} href={`${prefix}${item.href}`} onClick={() => setOpen(false)} className="group flex min-h-12 items-center gap-3 border-t border-[#173c2c]/12 py-2.5 text-[#14271e]">
                <span className="text-[14px] font-medium leading-tight">{item.label}</span>
                <span aria-hidden className="ml-auto text-[#315b48] transition-transform group-hover:translate-x-1">→</span>
              </Link>
            ))}
          </nav>
          <div className="mt-auto grid shrink-0 grid-cols-2 gap-3 pt-6">
            <Link href={locale === "uk" ? "/en" : "/uk"} onClick={() => setOpen(false)} className="flex min-h-12 items-center justify-center rounded-full border border-[#173c2c]/20 text-xs font-semibold tracking-[.16em] text-[#173c2c]">{locale === "uk" ? "EN" : "UA"}</Link>
            <Link href={`${prefix}/contact`} onClick={() => setOpen(false)} className="flex min-h-12 items-center justify-center rounded-full bg-[#1d3b2a] px-4 text-center text-[11px] font-semibold uppercase tracking-[.1em] text-[#f7f5ee]">{contactLabel}</Link>
          </div>
        </div>
      </div>
    </div>
  );
}
