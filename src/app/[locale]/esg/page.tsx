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
  return (await resolvePage(params, "esg")).metadata;
}

export default async function EsgPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale, dict } = await resolvePage(params, "esg");
  const d = dict.pages.esg;

  return (
    <div className="min-h-svh bg-carbon">
      <SiteHeader dict={dict} locale={locale} />
      <main>
        <SceneSection
          num="01"
          eyebrow={dict.brand.name}
          title={d.title}
          lead={d.lead}
          image="/images/esg-tablet-v2.png"
          imagePosition="65% center"
          titleAs="h1"
        >
          <TickList items={d.stack.slice(0, 6)} />
        </SceneSection>

        <SceneSection
          num="02"
          eyebrow={d.stackTitle}
          title={locale === "uk" ? "Замовити ESG-звіт" : "Order an ESG report"}
          lead={dict.forms.configs.esg.description}
          image="/images/agronomists-v2.png"
          imagePosition="62% center"
          compact
          wide
        >
          <Panel>
            <LeadForm
              config={getFormConfigs(dict).esg}
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
