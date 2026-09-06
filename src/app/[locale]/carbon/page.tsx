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
  return (await resolvePage(params, "carbon")).metadata;
}

export default async function CarbonPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale, dict } = await resolvePage(params, "carbon");
  const d = dict.pages.carbon;

  return (
    <div className="min-h-svh bg-carbon">
      <SiteHeader dict={dict} locale={locale} />
      <main>
        <SceneSection
          num="01"
          eyebrow={dict.brand.name}
          title={d.title}
          lead={d.lead}
          image="/images/roots-soil.png"
          imagePosition="58% center"
          titleAs="h1"
        >
          <TickList items={d.stack.slice(0, 6)} />
        </SceneSection>

        <SceneSection
          num="02"
          eyebrow={d.audienceTitle}
          title={locale === "uk" ? "Для кого цей напрям" : "Who it is for"}
          lead={d.audience}
          image="/images/regional-landscape.png"
          imagePosition="65% center"
          compact
        >
          <TickList items={d.stack.slice(6)} />
        </SceneSection>

        <SceneSection
          num="03"
          eyebrow={d.creditsTitle}
          title={locale === "uk" ? "Обговорити партнерство" : "Discuss partnership"}
          lead={dict.forms.configs.carbon.description}
          image="/images/hero-field.png"
          imagePosition="66% center"
          compact
          wide
        >
          <Panel>
            <LeadForm
              config={getFormConfigs(dict).carbon}
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
