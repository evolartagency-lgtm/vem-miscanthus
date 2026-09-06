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
  return (await resolvePage(params, "investors")).metadata;
}

export default async function InvestorsPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale, dict } = await resolvePage(params, "investors");
  const d = dict.pages.investors;

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
          imagePosition="62% center"
          titleAs="h1"
        >
          <TickList items={d.streams} />
        </SceneSection>

        <SceneSection
          num="02"
          eyebrow={d.chainTitle}
          title={locale === "uk" ? "Масштабування платформи" : "Platform scaling"}
          image="/images/miscanthus-industries.png"
          imagePosition="60% center"
          compact
        >
          <TickList items={d.chain} />
        </SceneSection>

        <SceneSection
          num="03"
          eyebrow={d.financialTitle}
          title={locale === "uk" ? "Інвестувати у платформу" : "Invest in the platform"}
          lead={dict.slots.financial.charAt(0) + dict.slots.financial.slice(1).toLowerCase()}
          image="/images/regional-landscape.png"
          imagePosition="60% center"
          compact
          wide
        >
          <Panel>
            <LeadForm
              config={getFormConfigs(dict).platformInvestment}
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
