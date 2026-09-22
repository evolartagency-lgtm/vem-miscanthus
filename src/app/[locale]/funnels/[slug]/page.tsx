import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { SiteHeader, SiteFooter } from "@/components/layout/SiteChrome";
import { LeadForm, type FormConfig } from "@/components/forms/LeadForm";
import { RhizomeOrder } from "@/components/forms/RhizomeOrder";
import { getDictionary, type Locale } from "@/data/dictionaries";
import { isLocale } from "@/i18n/config";
import {
  FUNNELS,
  FUNNEL_CATEGORIES,
  getFunnel,
  funnelTitle,
  funnelSteps,
  ORDER_FUNNEL_SLUG,
} from "@/data/funnels";

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
  return {
    title: `${funnelTitle(funnel, locale)} — ${dict.funnels.funnelLabel} ${String(funnel.n).padStart(2, "0")}`,
    description: `${funnelSteps(funnel, locale).join(" → ")}. ${dict.funnels.metaDescription}`,
  };
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
  const categoryName =
    FUNNEL_CATEGORIES.find((c) => c.id === funnel.category)?.name[locale] ?? "";
  const steps = funnelSteps(funnel, locale);
  const isOrderFunnel = funnel.slug === ORDER_FUNNEL_SLUG;
  const p = (path: string) => `/${locale}${path}`;

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
      <main className="inner-page">
        <section className="relative overflow-hidden px-6 pb-12 pt-32 sm:px-10 lg:px-14">
          <div aria-hidden className="absolute inset-0 bg-cover bg-center opacity-[.07]" style={{ backgroundImage: "url(/images/hero-field.png)" }} />
          <div className="relative mx-auto max-w-[1440px]">
            <Link href={p("/funnels")} className="text-[10px] font-semibold uppercase tracking-[0.22em] text-[#42554b] transition-colors hover:text-biomass">
              {f.allFunnels}
            </Link>
            <div className="mt-6 flex flex-wrap items-center gap-3">
              <span className="rounded-full border border-biomass/50 bg-biomass/10 px-3.5 py-1 text-[10px] font-semibold uppercase tracking-[0.18em] text-biomass">
                {f.funnelLabel} {String(funnel.n).padStart(2, "0")}
              </span>
              <span className="text-[10px] font-semibold uppercase tracking-[0.22em] text-[#42554b]">{categoryName}</span>
              <span className="text-[10px] font-medium uppercase tracking-[0.18em] text-ash">
                {funnel.steps.length} {f.stepsCount}
              </span>
            </div>
            <h1 className="mt-5 max-w-4xl font-serif text-[clamp(2.2rem,4.6vw,4.6rem)] font-normal leading-[1.04] tracking-[-0.01em] text-[#15241d]">
              {funnelTitle(funnel, locale)}
            </h1>
          </div>
        </section>

        <section aria-label={f.stepsLabel} className="border-t border-black/10 bg-[#f8f7f2] px-6 py-14 sm:px-10 lg:px-14">
          <div className="mx-auto max-w-[1440px]">
            <p className="text-[11px] font-semibold uppercase tracking-[0.26em] text-[#315b48]">{f.stepsLabel}</p>
            <ol className="mt-8 grid gap-x-8 gap-y-6 sm:grid-cols-2 lg:grid-cols-3">
              {steps.map((step, i) => (
                <li key={step} className="flex items-start gap-4 border border-black/10 bg-white/70 p-5 backdrop-blur-sm">
                  <span className="font-technical text-[11px] tracking-[0.2em] text-biomass">
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  <span className="flex flex-col gap-2">
                    <span aria-hidden className="h-px w-8 bg-biomass/50" />
                    <span className="text-[13px] font-semibold leading-snug text-[#15241d]">{step}</span>
                  </span>
                  {i < steps.length - 1 && (
                    <span aria-hidden className="ms-auto self-center text-biomass/60">→</span>
                  )}
                </li>
              ))}
            </ol>
          </div>
        </section>

        <section className="px-6 py-16 sm:px-10 lg:px-14">
          <div className="mx-auto max-w-[1200px]">
            {isOrderFunnel ? (
              <RhizomeOrder dict={dict} />
            ) : (
              <div className="border border-black/10 bg-white/85 p-6 backdrop-blur-md sm:p-8">
                <LeadForm
                  config={funnelForm}
                  receivedLabel={dict.forms.received}
                  sendingLabel={dict.ui.sending}
                />
              </div>
            )}
          </div>
        </section>
      </main>
      <SiteFooter dict={dict} locale={locale} />
    </div>
  );
}
