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
  return (await resolvePage(params, "buyRhizomes")).metadata;
}

export default async function BuyRhizomesPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale, dict } = await resolvePage(params, "buyRhizomes");
  const d = dict.pages.buyRhizomes;
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
          image="/images/hero-field.png"
          imagePosition="62% center"
          titleAs="h1"
          cta={dict.home.rhizomes.ctaSecondary[0]}
          href={p("/contact?form=commercial-offer")}
        >
          <TickList items={d.includes.slice(0, 4)} />
        </SceneSection>

        <SceneSection
          num="02"
          eyebrow={dict.ui.calculatorTitle}
          title={locale === "uk" ? "Розрахуйте свою партію" : "Estimate your batch"}
          lead={dict.ui.calculatorLead}
          image="/images/roots-soil.png"
          imagePosition="60% center"
          compact
          wide
        >
          <Panel>
            <PlantingCalculator dict={dict} />
          </Panel>
        </SceneSection>

        <SceneSection
          num="03"
          eyebrow={d.pricingTitle}
          title={locale === "uk" ? "Резервування" : "Reservation"}
          lead={dict.forms.configs.reserve.description}
          image="/images/agronomists-v2.png"
          imagePosition="65% center"
          compact
          wide
        >
          <Panel>
            <LeadForm
              config={getFormConfigs(dict).reserve}
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
