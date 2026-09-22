"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { locales, defaultLocale } from "@/i18n/config";

const LABELS: Record<string, string> = { en: "EN", uk: "UA", he: "HE" };

/** Three-way locale switcher that keeps the current page path. */
export function LocaleSwitcher({ current }: { current: string }) {
  const pathname = usePathname() ?? "/";
  const rest = pathname.split("/").slice(2).join("/");
  return (
    <div className="flex items-center gap-2" role="navigation" aria-label="Language">
      {locales.map((l) => (
        <Link
          key={l}
          href={`/${l}${rest ? `/${rest}` : ""}`}
          aria-current={l === current ? "true" : undefined}
          className={`text-[10px] uppercase tracking-[.18em] transition-colors ${
            l === current ? "font-semibold text-biomass" : "text-[#10271e]/70 hover:text-biomass"
          }`}
        >
          {LABELS[l] ?? l.toUpperCase()}
        </Link>
      ))}
    </div>
  );
}

export { defaultLocale };
