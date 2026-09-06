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
  return (await resolvePage(params, "agronomicSupport")).metadata;
}

export default async function AgronomicSupportPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale, dict } = await resolvePage(params, "agronomicSupport");
  const d = dict.pages.agronomicSupport;

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
          <p className="max-w-lg border-l border-biomass/60 pl-5 text-sm leading-6 text-stone-300">
            {d.subtitle}
          </p>
        </SceneSection>

        <SceneSection
          num="02"
          eyebrow={d.toolsTitle}
          title={locale === "uk" ? "Інструменти супроводу" : "Support instruments"}
          image="/images/roots-soil.png"
          imagePosition="60% center"
          compact
          wide
        >
          <TickList items={d.tools} />
        </SceneSection>

        <SceneSection
          num="03"
          eyebrow={dict.nav.contact}
          title={locale === "uk" ? "Замовити супровід" : "Request support"}
          lead={dict.forms.configs.agronomic.description}
          image="/images/regional-landscape.png"
          imagePosition="60% center"
          compact
          wide
        >
          <Panel>
            <LeadForm
              config={getFormConfigs(dict).agronomic}
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
