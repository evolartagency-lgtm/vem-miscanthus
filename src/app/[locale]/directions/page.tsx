import type { Metadata } from "next";
import Link from "next/link";
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

  return (
    <div className="min-h-svh bg-carbon">
      <SiteHeader dict={dict} locale={locale} />
      <main id="main" className="inner-page">
        <section className="relative overflow-hidden px-6 pb-10 pt-32 sm:px-10 lg:px-14">
          <div aria-hidden className="absolute inset-0 bg-cover bg-center opacity-[.08]" style={{ backgroundImage: "url(/images/router-field.png)" }} />
          <div className="relative mx-auto max-w-[1440px]">
            <div className="flex items-center gap-4 text-biomass">
              <span aria-hidden className="h-px w-9 bg-biomass" />
              <span className="text-[10px] font-semibold uppercase tracking-[0.28em] text-[#264b3a]">{f.kicker}</span>
            </div>
            <h1 className="mt-5 max-w-4xl font-serif text-[clamp(2.6rem,5.2vw,5.2rem)] font-normal leading-[1.02] tracking-[-0.01em] text-[#15241d]">
              {f.title}
            </h1>
            <p className="mt-6 max-w-2xl border-l border-[#153c2b]/20 pl-5 text-[15px] leading-7 text-[#34463d] sm:text-base">
              {f.lead}
            </p>
            <div className="mt-7 flex flex-wrap items-center gap-3">
              <span className="rounded-full border border-biomass/50 bg-biomass/10 px-4 py-1.5 text-[11px] font-semibold uppercase tracking-[0.16em] text-biomass">
                {FUNNELS.length} {f.countLabel}
              </span>
              <Link href={p("/buy-rhizomes")} className="cta-modern rounded-full border border-biomass/80 bg-[linear-gradient(135deg,#ead09f,#c99f61)] px-6 py-2.5 text-[10px] font-semibold uppercase tracking-[0.18em] text-[#221a0c] transition-all hover:-translate-y-0.5">
                {formatBatchCount(locale)} {dict.order.availableLabel} · {dict.home.rhizomes.ctaPrimary} →
              </Link>
            </div>
          </div>
        </section>

        {FUNNEL_CATEGORIES.map(({ id, name }, ci) => {
          const items = funnelsInCategory(id as FunnelCategory);
          if (items.length === 0) return null;
          return (
            <section key={id} className="px-6 py-10 sm:px-10 lg:px-14" aria-labelledby={`cat-${id}`}>
              <div className="mx-auto max-w-[1440px]">
                <div className="flex items-baseline gap-4">
                  <span className="font-technical text-[11px] tracking-[0.2em] text-biomass">{String(ci + 1).padStart(2, "0")}</span>
                  <h2 id={`cat-${id}`} className="text-[12px] font-bold uppercase tracking-[0.2em] text-[#15241d]">{name[locale]}</h2>
                  <span aria-hidden className="h-px flex-1 bg-black/10" />
                  <span className="font-technical text-[10px] tracking-[0.2em] text-ash">{items.length}</span>
                </div>
                <div className="mt-6 grid gap-3 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
                  {items.map((funnel) => (
                    <Link
                      key={funnel.slug}
                      href={p(`/directions/${funnel.slug}`)}
                      className="group flex min-h-[150px] flex-col border border-black/10 bg-white/70 p-5 backdrop-blur-sm transition-all duration-300 hover:-translate-y-0.5 hover:border-[#173c2c]/35 hover:bg-white/90"
                    >
                      <span className="font-technical text-[10px] tracking-[0.2em] text-biomass">
                        {f.funnelLabel} {String(funnel.n).padStart(2, "0")}
                      </span>
                      <h3 className="mt-2.5 text-[13px] font-semibold leading-snug text-[#15241d]">
                        {funnelTitle(funnel, locale)}
                      </h3>
                      <span className="mt-3 flex flex-wrap gap-1">
                        {funnelSteps(funnel, locale).slice(0, 3).map((s) => (
                          <span key={s} className="rounded-full border border-[#173c2c]/15 bg-white/70 px-2.5 py-1 text-[10px] font-medium text-[#42554b]">{s}</span>
                        ))}
                        {funnel.steps.length > 3 && (
                          <span className="rounded-full border border-[#173c2c]/15 bg-white/70 px-2.5 py-1 text-[10px] font-medium text-[#42554b]">
                            +{funnel.steps.length - 3}
                          </span>
                        )}
                      </span>
                      <span className="mt-auto pt-3 text-[11px] font-semibold text-biomass">
                        {funnel.slug === "buy-miscanthus-rhizomes" ? dict.funnels.orderNowCta : `${f.startCta} →`}
                      </span>
                    </Link>
                  ))}
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
