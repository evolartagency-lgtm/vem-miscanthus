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
  return (await resolvePage(params, "regionalPilots")).metadata;
}

export default async function RegionalPilotsPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale, dict } = await resolvePage(params, "regionalPilots");
  const d = dict.pages.regionalPilots;

  return (
    <div className="min-h-svh bg-carbon">
      <SiteHeader dict={dict} locale={locale} />
      <main>
        <SceneSection
          num="01"
          eyebrow={dict.brand.name}
          title={d.title}
          lead={d.lead}
          image="/images/regional-landscape.png"
          imagePosition="60% center"
          titleAs="h1"
        >
          <p className="max-w-lg text-[12px] leading-relaxed text-sage">
            <span className="mr-3 font-medium uppercase tracking-[0.25em] text-biomass">
              {d.audienceTitle}
            </span>
            {d.audience}
          </p>
        </SceneSection>

        <SceneSection
          num="02"
          eyebrow={d.modelTitle}
          title={locale === "uk" ? "Модель перетворення" : "The transformation model"}
          image="/images/hero-field.png"
          imagePosition="60% center"
          compact
          wide
        >
          <TickList items={d.model} />
        </SceneSection>

        <SceneSection
          num="03"
          eyebrow={dict.nav.contact}
          title={locale === "uk" ? "Запустити пілот" : "Launch a pilot"}
          lead={dict.forms.configs.regionalPilot.description}
          image="/images/agronomists-v2.png"
          imagePosition="60% center"
          compact
          wide
        >
          <Panel>
            <LeadForm
              config={getFormConfigs(dict).regionalPilot}
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
