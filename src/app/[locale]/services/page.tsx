import type { Metadata } from "next";
import { SceneSection, TickList, Panel } from "@/components/layout/SceneSection";
import { SiteHeader, SiteFooter } from "@/components/layout/SiteChrome";
import { LeadForm } from "@/components/forms/LeadForm";
import { PlantingCalculator } from "@/components/forms/PlantingCalculator";
import { getFormConfigs } from "@/data/forms";
import { resolvePage } from "@/lib/page-meta";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  return (await resolvePage(params, "services")).metadata;
}

export default async function ServicesPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale, dict } = await resolvePage(params, "services");
  const d = dict.pages.services;
  const p = (path: string) => `/${locale}${path}`;

  return (
    <div className="min-h-svh bg-carbon">
      <SiteHeader dict={dict} locale={locale} />
      <main>
        <SceneSection
          num="01"
          eyebrow={dict.brand.name}
          title={d.title}
          lead={d.lead}
          image="/images/agronomists-v2.png"
          imagePosition="60% center"
          titleAs="h1"
        >
          <TickList items={d.routes.slice(0, 6)} />
        </SceneSection>

        <SceneSection
          num="02"
          eyebrow={dict.ui.calculatorTitle}
          title={locale === "uk" ? "Калькулятор посадки" : "Planting calculator"}
          lead={dict.ui.calculatorLead}
          image="/images/roots-soil.png"
          imagePosition="55% center"
          compact
          wide
        >
          <Panel>
            <PlantingCalculator dict={dict} />
          </Panel>
        </SceneSection>

        <SceneSection
          num="03"
          eyebrow={d.casesTitle}
          title={locale === "uk" ? "Комерційна пропозиція" : "Commercial offer"}
          lead={dict.forms.configs.commercial.description}
          image="/images/regional-landscape.png"
          imagePosition="70% center"
          compact
          wide
        >
          <Panel>
            <LeadForm
              config={getFormConfigs(dict).commercial}
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
