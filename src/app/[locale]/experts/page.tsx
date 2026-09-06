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
  return (await resolvePage(params, "experts")).metadata;
}

export default async function ExpertsPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale, dict } = await resolvePage(params, "experts");
  const d = dict.pages.experts;

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
          <TickList items={d.expertise} />
        </SceneSection>

        <SceneSection
          num="02"
          eyebrow={d.profilesTitle}
          title={locale === "uk" ? "Команда" : "The team"}
          lead={dict.slots.profiles.charAt(0) + dict.slots.profiles.slice(1).toLowerCase()}
          image="/images/science-lab.png"
          imagePosition="60% center"
          compact
          wide
        >
          <Panel>
            <LeadForm
              config={getFormConfigs(dict).project}
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
