import Link from "next/link";
import type { Dictionary, Locale } from "@/data/dictionaries";
import { MobileMenu } from "@/components/layout/MobileMenu";

export function SiteHeader({ dict, locale }: { dict: Dictionary; locale: Locale }) {
  const p = (path: string) => `/${locale}${path}`;
  const homeItem = { href: "/", label: locale === "uk" ? "Головна" : "Home" };
  const desktopItems = [homeItem, ...dict.nav.site.slice(0, 5)];
  const mobileItems = [homeItem, ...dict.nav.site.slice(0, 6)];
  return (
    <header className="fixed inset-x-0 top-0 z-[100] isolate border-b border-[#153c2b]/10 bg-[#f8f6ef]">
      <div className="mx-auto flex max-w-[1440px] items-center justify-between gap-6 px-6 py-4 sm:px-10 lg:px-14">
        <Link href={p("/")} className="group relative block pl-4 before:absolute before:inset-y-0 before:left-0 before:w-px before:bg-biomass">
          <span className="block font-serif text-[27px] font-normal leading-none tracking-[0.08em] text-[#10271e]">VEM</span>
          <span className="mt-1 block text-[6px] font-semibold uppercase tracking-[0.18em] text-[#10271e]/65">Vital Energy Miscanthus</span>
        </Link>
        <nav aria-label="Primary" className="hidden items-center gap-6 lg:flex">
          {desktopItems.map((item) => (
            <Link
              key={item.href}
              href={p(item.href)}
              className="group relative py-2 text-[11px] font-medium text-[#10271e] transition-colors hover:text-biomass"
            >
              {item.label}<span className="absolute inset-x-0 -bottom-1 h-px origin-left scale-x-0 bg-biomass transition-transform group-hover:scale-x-100" />
            </Link>
          ))}
        </nav>
        <div className="hidden items-center gap-4 lg:flex">
          <Link href={locale === "uk" ? "/en" : "/uk"} className="text-[10px] uppercase tracking-[.18em] text-[#10271e] hover:text-biomass">{locale === "uk" ? "EN" : "UA"}</Link>
          <Link
            href={p("/contact")}
            className="cta-modern rounded-full border border-biomass/60 bg-biomass/10 px-5 py-2.5 text-[10px] font-semibold tracking-[0.12em] text-biomass uppercase backdrop-blur-md transition-all hover:-translate-y-0.5 hover:bg-biomass hover:text-[#1c1408]"
          >
            {dict.nav.contact}
          </Link>
          <MobileMenu items={dict.nav.site} locale={locale} contactLabel={dict.nav.contact} />
        </div>
        <MobileMenu items={mobileItems} locale={locale} contactLabel={dict.nav.contact} />
      </div>
    </header>
  );
}

export function SiteFooter({ dict, locale }: { dict: Dictionary; locale: Locale }) {
  const p = (path: string) => `/${locale}${path}`;
  return (
    <footer className="border-t border-white/10 bg-forest/40">
      <div className="mx-auto max-w-6xl px-6 py-16">
        <div className="flex flex-col gap-10 md:flex-row md:justify-between">
          <div className="max-w-sm">
            <p className="text-[13px] font-bold tracking-[0.18em] text-bone">
              VEM
            </p>
            <p className="mt-4 text-[13px] leading-relaxed text-ash">
              {dict.brand.tagline}. {dict.brand.promise}.
            </p>
          </div>
          <nav
            aria-label="Footer"
            className="grid max-w-xl grid-cols-2 gap-x-12 gap-y-2.5 sm:grid-cols-3"
          >
            {dict.nav.site.map((item) => (
              <Link
                key={item.href}
                href={p(item.href)}
                className="text-[12px] text-ash transition-colors hover:text-bone"
              >
                {item.label}
              </Link>
            ))}
          </nav>
        </div>
        <div className="mt-14 flex flex-col gap-2 border-t border-white/10 pt-6 sm:flex-row sm:items-center sm:justify-between">
          <p className="text-[11px] tracking-[0.08em] text-ash/70">
            © {new Date().getFullYear()} {dict.brand.name}
          </p>
          <p className="text-[11px] tracking-[0.08em] text-ash/70">
            {locale === "uk" ? "/uk" : "/en"} · {locale.toUpperCase()}
          </p>
        </div>
      </div>
    </footer>
  );
}
