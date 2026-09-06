import type { Metadata } from "next";
import { SceneSection, TickList, Panel } from "@/components/layout/SceneSection";
import { SiteHeader, SiteFooter } from "@/components/layout/SiteChrome";
import { LeadForm } from "@/components/forms/LeadForm";
import { getFormConfigs } from "@/data/forms";
import { resolvePage } from "@/lib/page-meta";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  return (await resolvePage(params, "economics")).metadata;
}

export default async function EconomicsPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale, dict } = await resolvePage(params, "economics");
  const d = dict.pages.economics;

  return (
    <div className="min-h-svh bg-carbon">
      <SiteHeader dict={dict} locale={locale} />
      <main>
        <SceneSection
          num="01"
          eyebrow={dict.brand.name}
          title={d.title}
          lead={d.lead}
          image="/images/hero-field.png"
          imagePosition="60% center"
          titleAs="h1"
        >
          <TickList items={d.streams} />
        </SceneSection>

        <SceneSection
          num="02"
          eyebrow={d.costTitle}
          title={locale === "uk" ? "Структура витрат" : "Cost structure"}
          image="/images/equipment-harvester-v2.png"
          imagePosition="60% center"
          compact
        >
          <TickList items={d.costs} />
        </SceneSection>

        <SceneSection
          num="03"
          eyebrow={d.modelTitle}
          title={locale === "uk" ? "Інвестиційний кейс" : "Investment case"}
          lead={dict.slots.financial.charAt(0) + dict.slots.financial.slice(1).toLowerCase()}
          image="/images/regional-landscape.png"
          imagePosition="65% center"
          compact
          wide
        >
          <Panel>
            <LeadForm
              config={getFormConfigs(dict).investment}
              receivedLabel={dict.forms.received}
              sendingLabel={dict.ui.sending}
            />
          </Panel>
        </SceneSection>
      </main>
      <SiteFooter dict={dict} locale={locale} />
    </div>
  );
}
