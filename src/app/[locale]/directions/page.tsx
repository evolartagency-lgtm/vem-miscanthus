import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import { SiteHeader, SiteFooter } from "@/components/layout/SiteChrome";
import { getDictionary, type Locale } from "@/data/dictionaries";
import { isLocale, locales } from "@/i18n/config";
import { buildMetadata } from "@/lib/page-meta";
import {
  FUNNELS,
  FUNNEL_CATEGORIES,
  funnelsInCategory,
  funnelTitle,
  funnelSteps,
  type FunnelCategory,
} from "@/data/funnels";
import { RHIZOME_BATCH, formatBatchCount } from "@/data/pricing";

export function generateStaticParams() {
  return locales.map((locale) => ({ locale }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale: raw } = await params;
  const locale: Locale = isLocale(raw) ? raw : "en";
  const dict = await getDictionary(locale);
  return buildMetadata(locale, "/directions", {
    title: dict.funnels.metaTitle,
    description: dict.funnels.metaDescription,
  });
}

export default async function FunnelsCatalogPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale: raw } = await params;
  const locale: Locale = isLocale(raw) ? raw : "en";
  const dict = await getDictionary(locale);
  const f = dict.funnels;
  const p = (path: string) => `/${locale}${path}`;
  const categoriesLabel = locale === "uk" ? "категорій" : locale === "he" ? "קטגוריות" : "categories";

  return (
    <div className="min-h-svh bg-carbon">
      <SiteHeader dict={dict} locale={locale} />
      <main id="main" className="inner-page">
        <section className="relative overflow-hidden bg-[#0b1712] px-6 pb-16 pt-36 text-[#f3efe2] sm:px-10 lg:px-14">
          <div aria-hidden className="absolute inset-0">
            <Image src="/images/hero-roots-continuous-v2.png" alt="" fill priority sizes="100vw" className="object-cover object-[72%_center]" />
          </div>
          <div aria-hidden className="absolute inset-0 bg-[linear-gradient(100deg,rgba(7,19,14,.94)_0%,rgba(7,19,14,.78)_46%,rgba(7,19,14,.42)_100%)]" />
          <span aria-hidden className="pointer-events-none absolute -top-8 end-2 select-none font-serif text-[clamp(11rem,24vw,21rem)] leading-none tracking-[-0.04em] text-[#d5b36d]/10">
            {FUNNELS.length}
          </span>
          <div className="relative mx-auto max-w-[1440px]">
            <div className="flex items-center gap-4">
              <span aria-hidden className="h-px w-9 bg-[#d5b36d]" />
              <span className="text-[10px] font-semibold uppercase tracking-[0.28em] text-[#d5b36d]">{f.kicker}</span>
            </div>
            <h1 className="mt-5 max-w-4xl font-serif text-[clamp(2.6rem,5.2vw,5.2rem)] font-normal leading-[1.02] tracking-[-0.01em] text-[#f3efe2]">
              {f.title}
            </h1>
            <p className="mt-6 max-w-2xl border-l border-[#d5b36d]/50 pl-5 text-[15px] leading-7 text-[#e9e4d5] sm:text-base">
              {f.lead}
            </p>
            <div className="mt-8 flex flex-wrap items-center gap-3">
              <span className="rounded-full border border-[#d5b36d]/45 bg-white/5 px-4 py-1.5 text-[11px] font-semibold uppercase tracking-[0.16em] text-[#e9e4d5]">
                {FUNNELS.length} {f.countLabel} · {FUNNEL_CATEGORIES.length} {categoriesLabel}
              </span>
              <Link href={p("/buy-rhizomes")} className="cta-modern rounded-full border border-biomass/80 bg-[linear-gradient(135deg,#ead09f,#c99f61)] px-6 py-2.5 text-[10px] font-semibold uppercase tracking-[0.18em] text-[#221a0c] transition-all hover:-translate-y-0.5">
                <span className="hidden sm:inline">{formatBatchCount(locale)} {dict.order.availableLabel} · </span>{dict.home.rhizomes.ctaPrimary} →
              </Link>
            </div>
          </div>
        </section>

        <div aria-hidden className="overflow-hidden border-y border-[#d5b36d]/25 bg-[#0b1712] py-3 text-[#d5b36d]">
          <div className="vem-marquee flex w-max items-center gap-8 pe-8">
            {Array.from({ length: 2 }).flatMap((_, copy) =>
              [0, 1, 2].map((i) => (
                <span key={`${copy}-${i}`} className="flex items-center gap-8 whitespace-nowrap text-[11px] font-semibold uppercase tracking-[0.3em]">
                  <span>{FUNNELS.length} {f.countLabel}</span>
                  <span className="text-[#d5b36d]/50">✦</span>
                  <span>{FUNNEL_CATEGORIES.length} {categoriesLabel}</span>
                  <span className="text-[#d5b36d]/50">✦</span>
                  <span>{formatBatchCount(locale)} {dict.order.availableLabel}</span>
                  <span className="text-[#d5b36d]/50">✦</span>
                  <span>{RHIZOME_BATCH.variety}</span>
                  <span className="text-[#d5b36d]/50">✦</span>
                </span>
              )),
            )}
          </div>
        </div>

        <nav aria-label={f.kicker} className="sticky top-20 z-40 px-4 lg:top-24">
          <div className="cat-nav mx-auto flex max-w-full gap-2 overflow-x-auto rounded-full border border-[#173c2c]/10 bg-[#f8f7f2]/92 py-2.5 pe-3 ps-3 shadow-[0_14px_36px_rgba(20,39,30,.10)] backdrop-blur-md xl:mx-auto xl:w-fit">
            {FUNNEL_CATEGORIES.map(({ id, name }, ci) => {
              const count = funnelsInCategory(id as FunnelCategory).length;
              if (count === 0) return null;
              return (
                <a key={id} href={`#cat-${id}`} className="group flex shrink-0 items-center gap-2 rounded-full border border-[#173c2c]/15 bg-white/80 px-3.5 py-1.5 text-[10px] font-semibold uppercase tracking-[0.12em] text-[#34463d] transition-colors hover:border-biomass/50 hover:bg-biomass hover:text-[#f8f7f2]">
                  <span className="font-technical text-biomass group-hover:text-[#f8f7f2]/80">{String(ci + 1).padStart(2, "0")}</span>
                  {name[locale]}
                  <span className="text-ash group-hover:text-[#f8f7f2]/60">{count}</span>
                </a>
              );
            })}
          </div>
        </nav>

        {FUNNEL_CATEGORIES.map(({ id, name }, ci) => {
          const items = funnelsInCategory(id as FunnelCategory);
          if (items.length === 0) return null;
          return (
            <section key={id} id={`cat-${id}`} className="scroll-mt-36 px-6 py-10 sm:px-10 lg:scroll-mt-44 lg:px-14" aria-labelledby={`cat-${id}`}>
              <div className="mx-auto max-w-[1440px]">
                <div className="flex items-center gap-4">
                  <span className="font-serif text-2xl leading-none text-[#a8853f]">{String(ci + 1).padStart(2, "0")}</span>
                  <h2 id={`cat-${id}`} className="text-[13px] font-bold uppercase tracking-[0.2em] text-[#15241d]">{name[locale]}</h2>
                  <span aria-hidden className="h-px flex-1 bg-gradient-to-r from-[#c9a55e]/60 to-transparent" />
                  <span className="rounded-full border border-biomass/30 bg-biomass/10 px-2.5 py-1 font-technical text-[10px] tracking-[0.15em] text-biomass">{items.length}</span>
                </div>
                <div className="mt-6 grid gap-3 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
                  {items.map((funnel) => {
                    const featured = funnel.slug === "buy-miscanthus-rhizomes";
                    if (featured) {
                      return (
                        <Link
                          key={funnel.slug}
                          href={p(`/directions/${funnel.slug}`)}
                          className="group relative flex min-h-[190px] flex-col justify-end overflow-hidden rounded-2xl border border-[#d5b36d]/40 bg-[linear-gradient(135deg,rgba(9,20,14,.94)_0%,rgba(16,32,24,.9)_100%)] p-6 transition-all duration-300 hover:-translate-y-0.5 hover:shadow-[0_24px_50px_rgba(20,39,30,.28)] sm:col-span-2"
                        >
                          <span aria-hidden className="pointer-events-none absolute -top-5 end-2 select-none font-serif text-[6.5rem] leading-none text-[#d5b36d]/10">
                            {String(funnel.n).padStart(2, "0")}
                          </span>
                          <span className="relative font-technical text-[10px] tracking-[0.2em] text-[#d5b36d]">
                            {f.funnelLabel} {String(funnel.n).padStart(2, "0")} · {formatBatchCount(locale)} {dict.order.availableLabel}
                          </span>
                          <h3 className="relative mt-2.5 max-w-md font-serif text-xl leading-snug text-[#f3efe2]">
                            {funnelTitle(funnel, locale)}
                          </h3>
                          <span className="relative mt-3 flex flex-wrap gap-1">
                            {funnelSteps(funnel, locale).slice(0, 3).map((s) => (
                              <span key={s} className="rounded-full border border-white/20 bg-white/10 px-2.5 py-1 text-[10px] font-medium text-[#e9e4d5]">{s}</span>
                            ))}
                            {funnel.steps.length > 3 && (
                              <span className="rounded-full border border-white/20 bg-white/10 px-2.5 py-1 text-[10px] font-medium text-[#e9e4d5]">
                                +{funnel.steps.length - 3}
                              </span>
                            )}
                          </span>
                          <span className="relative mt-4 inline-flex w-fit items-center gap-2 rounded-full bg-[linear-gradient(135deg,#ead09f,#c99f61)] px-4 py-2 text-[10px] font-semibold uppercase tracking-[0.16em] text-[#221a0c] transition-transform duration-300 group-hover:translate-x-1">
                            {dict.funnels.orderNowCta}
                          </span>
                        </Link>
                      );
                    }
                    return (
                      <Link
                        key={funnel.slug}
                        href={p(`/directions/${funnel.slug}`)}
                        className="group relative flex min-h-[150px] flex-col overflow-hidden rounded-2xl border border-black/10 bg-white/70 p-5 backdrop-blur-sm transition-all duration-300 hover:-translate-y-0.5 hover:border-biomass/45 hover:bg-white/90 hover:shadow-[0_18px_40px_rgba(20,39,30,.08)]"
                      >
                        <span aria-hidden className="pointer-events-none absolute -top-4 end-0 select-none font-serif text-[5rem] leading-none text-[#173c2c]/[.06] transition-colors duration-300 group-hover:text-biomass/15">
                          {String(funnel.n).padStart(2, "0")}
                        </span>
                        <span className="relative font-technical text-[10px] tracking-[0.2em] text-biomass">
                          {f.funnelLabel} {String(funnel.n).padStart(2, "0")}
                        </span>
                        <h3 className="relative mt-2.5 text-[13px] font-semibold leading-snug text-[#15241d]">
                          {funnelTitle(funnel, locale)}
                        </h3>
                        <span className="relative mt-3 flex flex-wrap gap-1">
                          {funnelSteps(funnel, locale).slice(0, 3).map((s) => (
                            <span key={s} className="rounded-full border border-[#173c2c]/15 bg-white/70 px-2.5 py-1 text-[10px] font-medium text-[#42554b]">{s}</span>
                          ))}
                          {funnel.steps.length > 3 && (
                            <span className="rounded-full border border-[#173c2c]/15 bg-white/70 px-2.5 py-1 text-[10px] font-medium text-[#42554b]">
                              +{funnel.steps.length - 3}
                            </span>
                          )}
                        </span>
                        <span className="relative mt-auto flex items-center gap-1.5 pt-3 text-[11px] font-semibold text-biomass">
                          {f.startCta}
                          <span aria-hidden className="transition-transform duration-300 group-hover:translate-x-1">→</span>
                        </span>
                      </Link>
                    );
                  })}
                </div>
              </div>
            </section>
          );
        })}

        <section className="border-t border-black/10 bg-[#f8f7f2] px-6 py-20 sm:px-10 lg:px-14">
          <div className="mx-auto max-w-[1440px] text-center">
            <p className="text-[11px] font-semibold uppercase tracking-[.28em] text-[#315b48]">{RHIZOME_BATCH.variety}</p>
            <h2 className="mx-auto mt-4 max-w-3xl font-serif text-[clamp(2rem,3.6vw,3.6rem)] uppercase leading-[1.04] text-[#15241d]">
              {formatBatchCount(locale)} {dict.order.availableLabel}
            </h2>
            <div className="mt-9 flex flex-wrap items-center justify-center gap-3">
              <Link href={p("/buy-rhizomes")} className="cta-modern rounded-full border border-biomass/80 bg-[linear-gradient(135deg,#ead09f,#c99f61)] px-8 py-4 text-[10px] font-semibold uppercase tracking-[0.2em] text-[#221a0c] shadow-[0_10px_34px_rgba(164,118,47,.22)] transition-all hover:-translate-y-0.5">
                {dict.home.rhizomes.ctaPrimary} <span aria-hidden>→</span>
              </Link>
              <Link href={p("/contact")} className="cta-modern rounded-full border border-[#173c2c]/25 bg-white/70 px-8 py-4 text-[10px] font-semibold uppercase tracking-[0.2em] text-[#15241d] transition-all hover:-translate-y-0.5 hover:border-[#173c2c]/50">
                {dict.nav.contact}
              </Link>
            </div>
          </div>
        </section>
      </main>
      <SiteFooter dict={dict} locale={locale} />
    </div>
  );
}
