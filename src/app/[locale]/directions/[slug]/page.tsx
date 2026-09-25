import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import { notFound } from "next/navigation";
import { SiteHeader, SiteFooter } from "@/components/layout/SiteChrome";
import { LeadForm, type FormConfig } from "@/components/forms/LeadForm";
import { RhizomeOrder } from "@/components/forms/RhizomeOrder";
import { getDictionary, type Locale } from "@/data/dictionaries";
import { isLocale } from "@/i18n/config";
import { buildMetadata } from "@/lib/page-meta";
import {
  FUNNELS,
  FUNNEL_CATEGORIES,
  getFunnel,
  funnelTitle,
  funnelSteps,
  ORDER_FUNNEL_SLUG,
  type FunnelCategory,
} from "@/data/funnels";

/** One photo mood per category so every direction opens with its own scene. */
const CATEGORY_IMAGES: Record<FunnelCategory, string> = {
  orders: "/images/hero-roots-continuous-v2.png",
  land: "/images/roots-soil.png",
  licenses: "/images/router-field.png",
  biomass: "/images/miscanthus-industries.png",
  production: "/images/equipment-harvester-v2.png",
  carbon: "/images/regional-landscape.png",
  partners: "/images/agronomists-v2.png",
  programs: "/images/regional-landscape.png",
  grants: "/images/science-lab.png",
  investment: "/images/hero-field.png",
  consulting: "/images/esg-tablet-v2.png",
};

export function generateStaticParams() {
  return FUNNELS.map((f) => ({ slug: f.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string; slug: string }>;
}): Promise<Metadata> {
  const { locale: raw, slug } = await params;
  const locale: Locale = isLocale(raw) ? raw : "en";
  const dict = await getDictionary(locale);
  const funnel = getFunnel(slug);
  if (!funnel) return {};
  return buildMetadata(locale, `/directions/${slug}`, {
    title: `${funnelTitle(funnel, locale)} — ${dict.funnels.funnelLabel} ${String(funnel.n).padStart(2, "0")}`,
    description: `${funnelSteps(funnel, locale).join(" → ")}. ${dict.funnels.metaDescription}`,
  });
}

/** BreadcrumbList — Головна → Напрями → Напрям. */
function BreadcrumbSchema({ locale, slug, name }: { locale: Locale; slug: string; name: string }) {
  const base = (process.env.NEXT_PUBLIC_SITE_URL ?? "https://vem-miscanthus.com").replace(/\/$/, "");
  const items = [
    { "@type": "ListItem", position: 1, name: "VEM", item: `${base}/${locale}` },
    { "@type": "ListItem", position: 2, name: locale === "uk" ? "Напрями" : locale === "he" ? "כיוונים" : "Directions", item: `${base}/${locale}/directions` },
    { "@type": "ListItem", position: 3, name, item: `${base}/${locale}/directions/${slug}` },
  ];
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify({ "@context": "https://schema.org", "@type": "BreadcrumbList", itemListElement: items }) }}
    />
  );
}

export default async function FunnelPage({
  params,
}: {
  params: Promise<{ locale: string; slug: string }>;
}) {
  const { locale: raw, slug } = await params;
  const locale: Locale = isLocale(raw) ? raw : "en";
  const dict = await getDictionary(locale);
  const funnel = getFunnel(slug);
  if (!funnel) notFound();

  const f = dict.funnels;
  const category = FUNNEL_CATEGORIES.find((c) => c.id === funnel.category);
  const categoryName = category?.name[locale] ?? "";
  const steps = funnelSteps(funnel, locale);
  const isOrderFunnel = funnel.slug === ORDER_FUNNEL_SLUG;
  const p = (path: string) => `/${locale}${path}`;
  const image = CATEGORY_IMAGES[funnel.category] ?? "/images/hero-field.png";

  const prevLabel = locale === "uk" ? "Попередній напрям" : locale === "he" ? "הכיוון הקודם" : "Previous direction";
  const nextLabel = locale === "uk" ? "Наступний напрям" : locale === "he" ? "הכיוון הבא" : "Next direction";

  const index = FUNNELS.findIndex((x) => x.slug === funnel.slug);
  const prev = FUNNELS[(index - 1 + FUNNELS.length) % FUNNELS.length];
  const next = FUNNELS[(index + 1) % FUNNELS.length];

  const funnelForm: FormConfig = {
    type: "general",
    title: funnelTitle(funnel, locale),
    description: f.formNote,
    submitLabel: f.startCta,
    successMessage: dict.forms.configs.commercial.success,
    fields: [
      { kind: "text", name: "name", label: dict.forms.fields.name, required: true },
      { kind: "email", name: "email", label: dict.forms.fields.email, required: true },
      { kind: "tel", name: "phone", label: dict.forms.fields.phone },
      { kind: "text", name: "country", label: dict.forms.fields.country },
      { kind: "textarea", name: "comment", label: dict.forms.fields.comment },
    ],
  };

  return (
    <div className="min-h-svh bg-carbon">
      <SiteHeader dict={dict} locale={locale} />
      <BreadcrumbSchema locale={locale} slug={funnel.slug} name={funnelTitle(funnel, locale)} />
      <main id="main" className="inner-page">
        {/* Dark cinematic opening: one photo mood per category. */}
        <section className="relative overflow-hidden bg-[#0b1712] px-6 pb-16 pt-36 text-[#f3efe2] sm:px-10 lg:px-14">
          <div aria-hidden className="absolute inset-0">
            <Image src={image} alt="" fill priority sizes="100vw" className="object-cover object-[70%_center]" />
          </div>
          <div aria-hidden className="absolute inset-0 bg-[linear-gradient(100deg,rgba(7,19,14,.94)_0%,rgba(7,19,14,.78)_46%,rgba(7,19,14,.44)_100%)]" />
          <span aria-hidden className="pointer-events-none absolute -top-8 end-2 select-none font-serif text-[clamp(11rem,24vw,21rem)] leading-none tracking-[-0.04em] text-[#d5b36d]/10">
            {String(funnel.n).padStart(2, "0")}
          </span>
          <div className="relative mx-auto max-w-[1440px]">
            <Link href={p("/directions")} className="group inline-flex items-center gap-2 text-[10px] font-semibold uppercase tracking-[0.22em] text-[#d5b36d]/80 transition-colors hover:text-[#d5b36d]">
              <span aria-hidden className="transition-transform duration-300 group-hover:-translate-x-1">←</span>
              {f.allFunnels}
            </Link>
            <div className="mt-7 flex flex-wrap items-center gap-3">
              <span className="rounded-full border border-[#d5b36d]/45 bg-white/5 px-3.5 py-1 text-[10px] font-semibold uppercase tracking-[0.18em] text-[#e9e4d5]">
                {f.funnelLabel} {String(funnel.n).padStart(2, "0")}
              </span>
              <span className="rounded-full border border-white/15 bg-white/5 px-3.5 py-1 text-[10px] font-semibold uppercase tracking-[0.18em] text-[#e9e4d5]/85">{categoryName}</span>
              <span className="text-[10px] font-medium uppercase tracking-[0.18em] text-[#e9e4d5]/60">
                {funnel.steps.length} {f.stepsCount}
              </span>
            </div>
            <h1 className="mt-5 max-w-4xl font-serif text-[clamp(2.2rem,4.6vw,4.6rem)] font-normal leading-[1.04] tracking-[-0.01em] text-[#f3efe2]">
              {funnelTitle(funnel, locale)}
            </h1>
          </div>
        </section>

        {/* Steps: numbered gold cards. */}
        <section aria-label={f.stepsLabel} className="bg-[#f8f7f2] px-6 py-14 sm:px-10 lg:px-14">
          <div className="mx-auto max-w-[1440px]">
            <div className="flex items-center gap-4">
              <span aria-hidden className="h-px w-9 bg-[#c9a55e]" />
              <h2 className="text-[11px] font-semibold uppercase tracking-[0.26em] text-[#8a6a2f]">{f.stepsLabel}</h2>
              <span aria-hidden className="h-px flex-1 bg-gradient-to-r from-[#c9a55e]/50 to-transparent" />
            </div>
            <ol className="mt-8 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
              {steps.map((step, i) => (
                <li key={step} className="group relative flex min-h-[110px] flex-col overflow-hidden rounded-2xl border border-black/10 bg-white/80 p-5 transition-all duration-300 hover:-translate-y-0.5 hover:border-biomass/45 hover:shadow-[0_18px_40px_rgba(20,39,30,.08)]">
                  <span aria-hidden className="pointer-events-none absolute -top-3 end-1 select-none font-serif text-[4.5rem] leading-none text-[#173c2c]/[.06] transition-colors duration-300 group-hover:text-biomass/15">
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  <span className="font-technical text-[10px] tracking-[0.2em] text-biomass">
                    {f.stepsLabel} {String(i + 1).padStart(2, "0")}
                  </span>
                  <span className="relative mt-auto pt-4 text-[14px] font-semibold leading-snug text-[#15241d]">{step}</span>
                </li>
              ))}
            </ol>
          </div>
        </section>

        {/* Start: dark info panel + form card. */}
        <section className="px-6 pb-20 sm:px-10 lg:px-14">
          <div className="mx-auto grid max-w-[1440px] gap-6 lg:grid-cols-[1fr_1.15fr]">
            <div className="relative overflow-hidden rounded-2xl border border-[#d5b36d]/35 bg-[linear-gradient(150deg,rgba(9,20,14,.96)_0%,rgba(16,32,24,.92)_100%)] p-8 text-[#f3efe2] sm:p-10">
              <span aria-hidden className="pointer-events-none absolute -bottom-10 end-0 select-none font-serif text-[10rem] leading-none text-[#d5b36d]/10">
                {String(funnel.n).padStart(2, "0")}
              </span>
              <div className="flex items-center gap-4">
                <span aria-hidden className="h-px w-9 bg-[#d5b36d]" />
                <span className="text-[10px] font-semibold uppercase tracking-[0.28em] text-[#d5b36d]">{f.startCta}</span>
              </div>
              <h2 className="mt-5 max-w-md font-serif text-[clamp(1.7rem,2.6vw,2.6rem)] leading-[1.08]">{funnelTitle(funnel, locale)}</h2>
              <ol className="mt-8 flex flex-col">
                {steps.map((step, i) => (
                  <li key={step} className="flex flex-col">
                    <span className="flex items-center gap-4 py-2">
                      <span className="w-6 text-end font-technical text-[10px] tracking-[0.18em] text-[#d5b36d]">{String(i + 1).padStart(2, "0")}</span>
                      <span aria-hidden className="h-px w-5 bg-[#d5b36d]/40" />
                      <span className="text-[13px] font-medium text-[#e9e4d5]">{step}</span>
                    </span>
                    {i < steps.length - 1 && <span aria-hidden className="ms-[11px] h-3.5 w-px bg-gradient-to-b from-[#d5b36d]/50 to-transparent" />}
                  </li>
                ))}
              </ol>
              <p className="mt-8 border-t border-white/10 pt-6 text-[12px] leading-6 text-[#e9e4d5]/75">{f.formNote}</p>
            </div>
            <div className="rounded-2xl border border-black/10 bg-white/85 p-6 backdrop-blur-md sm:p-8">
              {isOrderFunnel ? (
                <RhizomeOrder dict={dict} />
              ) : (
                <LeadForm
                  config={funnelForm}
                  receivedLabel={dict.forms.received}
                  sendingLabel={dict.ui.sending}
                />
              )}
            </div>
          </div>
        </section>

        {/* Prev / next directions. */}
        <nav aria-label={locale === "uk" ? "Сусідні напрями" : locale === "he" ? "כיוונים סמוכים" : "Nearby directions"} className="border-t border-black/10 bg-[#f8f7f2] px-6 py-10 sm:px-10 lg:px-14">
          <div className="mx-auto grid max-w-[1440px] gap-3 sm:grid-cols-2">
            <Link href={p(`/directions/${prev.slug}`)} className="group flex min-h-[96px] flex-col justify-center rounded-2xl border border-black/10 bg-white/70 p-5 transition-all duration-300 hover:-translate-y-0.5 hover:border-biomass/45 hover:shadow-[0_18px_40px_rgba(20,39,30,.08)]">
              <span className="flex items-center gap-2 text-[10px] font-semibold uppercase tracking-[0.18em] text-biomass">
                <span aria-hidden className="transition-transform duration-300 group-hover:-translate-x-1">←</span> {prevLabel}
              </span>
              <span className="mt-2 text-[13px] font-semibold leading-snug text-[#15241d]">{funnelTitle(prev, locale)}</span>
            </Link>
            <Link href={p(`/directions/${next.slug}`)} className="group flex min-h-[96px] flex-col justify-center rounded-2xl border border-black/10 bg-white/70 p-5 text-end transition-all duration-300 hover:-translate-y-0.5 hover:border-biomass/45 hover:shadow-[0_18px_40px_rgba(20,39,30,.08)]">
              <span className="flex items-center justify-end gap-2 text-[10px] font-semibold uppercase tracking-[0.18em] text-biomass">
                {nextLabel} <span aria-hidden className="transition-transform duration-300 group-hover:translate-x-1">→</span>
              </span>
              <span className="mt-2 text-[13px] font-semibold leading-snug text-[#15241d]">{funnelTitle(next, locale)}</span>
            </Link>
          </div>
        </nav>
      </main>
      <SiteFooter dict={dict} locale={locale} />
    </div>
  );
}
