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
  return (await resolvePage(params, "sciencePartners")).metadata;
}

export default async function SciencePartnersPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale, dict } = await resolvePage(params, "sciencePartners");
  const d = dict.pages.sciencePartners;

  return (
    <div className="min-h-svh bg-carbon">
      <SiteHeader dict={dict} locale={locale} />
      <main>
        <SceneSection
          num="01"
          eyebrow={dict.brand.name}
          title={d.title}
          lead={d.lead}
          image="/images/science-lab.png"
          imagePosition="60% center"
          titleAs="h1"
        >
          <TickList items={d.directions.slice(0, 6)} />
        </SceneSection>

        <SceneSection
          num="02"
          eyebrow={d.modelTitle}
          title={locale === "uk" ? "Шлях наукового партнера" : "The science partner path"}
          image="/images/roots-soil.png"
          imagePosition="60% center"
          compact
          wide
        >
          <TickList items={d.model} />
        </SceneSection>

        <SceneSection
          num="03"
          eyebrow={dict.nav.contact}
          title={locale === "uk" ? "Грантовий консорціум" : "Grant consortium"}
          lead={dict.forms.configs.grantConsortium.description}
          image="/images/agronomists-v2.png"
          imagePosition="60% center"
          compact
          wide
        >
          <Panel>
            <LeadForm
              config={getFormConfigs(dict).grantConsortium}
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
