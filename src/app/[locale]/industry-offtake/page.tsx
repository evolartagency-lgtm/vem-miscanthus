import type { Metadata } from "next";
import { SceneSection, TickList } from "@/components/layout/SceneSection";
import { SiteHeader, SiteFooter } from "@/components/layout/SiteChrome";
import { resolvePage } from "@/lib/page-meta";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  return (await resolvePage(params, "industryOfftake")).metadata;
}

export default async function IndustryOfftakePage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale, dict } = await resolvePage(params, "industryOfftake");
  const d = dict.pages.industryOfftake;

  return (
    <div className="min-h-svh bg-carbon">
      <SiteHeader dict={dict} locale={locale} />
      <main>
        <SceneSection
          num="01"
          eyebrow={dict.brand.name}
          title={d.title}
          lead={d.lead}
          image="/images/miscanthus-industries.png"
          imagePosition="60% center"
          titleAs="h1"
        >
          <TickList items={d.points.slice(0, 6)} />
        </SceneSection>

        <SceneSection
          num="02"
          eyebrow={dict.nav.contact}
          title={locale === "uk" ? "Стати партнером" : "Become a partner"}
          lead={dict.forms.configs.strategic.description}
          image="/images/equipment-harvester-v2.png"
          imagePosition="60% center"
          compact
          cta={dict.forms.configs.strategic.submit}
          href={`/${locale}/contact?form=strategic`}
        />
      </main>
      <SiteFooter dict={dict} locale={locale} />
    </div>
  );
}
