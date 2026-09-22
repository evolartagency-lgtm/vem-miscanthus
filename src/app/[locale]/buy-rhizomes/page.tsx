import type { Metadata } from "next";
import { SceneSection, TickList } from "@/components/layout/SceneSection";
import { SiteHeader, SiteFooter } from "@/components/layout/SiteChrome";
import { RhizomeOrder } from "@/components/forms/RhizomeOrder";
import { PlantingCalculator } from "@/components/forms/PlantingCalculator";
import { resolvePage } from "@/lib/page-meta";
import { RHIZOME_BATCH, formatBatchCount } from "@/data/pricing";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  return (await resolvePage(params, "buyRhizomes", "/buy-rhizomes")).metadata;
}

export default async function BuyRhizomesPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale, dict } = await resolvePage(params, "buyRhizomes", "/buy-rhizomes");
  const d = dict.pages.buyRhizomes;
  const o = dict.order;

  return (
    <div className="min-h-svh bg-carbon">
      <SiteHeader dict={dict} locale={locale} />
      <main id="main">
        <SceneSection
          num="01"
          eyebrow={dict.brand.name}
          title={d.title}
          lead={d.lead}
          image="/images/hero-field.png"
          imagePosition="62% center"
          titleAs="h1"
        >
          <TickList items={d.includes.slice(0, 4)} />
          <div className="mt-8 flex flex-wrap items-center gap-3">
            <span className="rounded-full border border-biomass/50 bg-biomass/10 px-4 py-2 text-[11px] font-semibold uppercase tracking-[0.16em] text-biomass">
              {formatBatchCount(locale)} {o.availableLabel}
            </span>
            <span className="rounded-full border border-[#173c2c]/20 bg-white/70 px-4 py-2 text-[11px] font-medium text-[#34463d]">
              {RHIZOME_BATCH.variety}
            </span>
            <span className="rounded-full border border-[#173c2c]/20 bg-white/70 px-4 py-2 text-[11px] font-medium text-[#34463d]">
              {o.regionTypeLabel}: {o.regionOptions[0]}
            </span>
          </div>
        </SceneSection>

        <SceneSection
          num="02"
          eyebrow={o.badge}
          title={o.title}
          lead={o.lead}
          image="/images/roots-soil.png"
          imagePosition="center"
          wide
          titleUppercase={locale !== "he"}
        >
          <div className="xl:max-w-[880px]">
            <RhizomeOrder dict={dict} />
          </div>
        </SceneSection>

        <SceneSection
          num="03"
          eyebrow={dict.ui.calculatorTitle}
          title={locale === "uk" ? "Розрахуйте свою партію" : locale === "he" ? "חשבו את המנה שלכם" : "Estimate your batch"}
          lead={dict.ui.calculatorLead}
          image="/images/roots-soil-continuation.png"
          imagePosition="60% center"
          compact
          wide
        >
          <PlantingCalculator dict={dict} />
        </SceneSection>
      </main>
      <SiteFooter dict={dict} locale={locale} />
    </div>
  );
}
