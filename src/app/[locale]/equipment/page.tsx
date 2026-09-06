import type { Metadata } from "next";
import { SceneSection, TickList } from "@/components/layout/SceneSection";
import { SiteHeader, SiteFooter } from "@/components/layout/SiteChrome";
import { resolvePage } from "@/lib/page-meta";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  return (await resolvePage(params, "equipment")).metadata;
}

export default async function EquipmentPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale, dict } = await resolvePage(params, "equipment");
  const d = dict.pages.equipment;

  return (
    <div className="min-h-svh bg-carbon">
      <SiteHeader dict={dict} locale={locale} />
      <main>
        <SceneSection
          num="01"
          eyebrow={dict.brand.name}
          title={d.title}
          lead={d.lead}
          image="/images/equipment-harvester-v2.png"
          imagePosition="70% center"
          titleAs="h1"
          cta={dict.forms.configs.equipment.submit}
          href={`/${locale}/contact?form=equipment`}
        >
          <TickList items={d.planting} />
        </SceneSection>

        <SceneSection
          num="02"
          eyebrow={d.harvestTitle}
          title={locale === "uk" ? "Збирання та логістика" : "Harvest & logistics"}
          image="/images/hero-field.png"
          imagePosition="68% center"
          compact
        >
          <TickList items={d.harvest} />
        </SceneSection>

        <SceneSection
          num="03"
          eyebrow={d.processingTitle}
          title={locale === "uk" ? "Переробка" : "Processing"}
          lead={dict.slots.specs.charAt(0) + dict.slots.specs.slice(1).toLowerCase()}
          image="/images/miscanthus-industries.png"
          imagePosition="58% center"
          compact
        >
          <TickList items={d.processing} />
        </SceneSection>
      </main>
      <SiteFooter dict={dict} locale={locale} />
    </div>
  );
}
