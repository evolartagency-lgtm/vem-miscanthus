import type { Metadata } from "next";
import { SceneSection, TickList } from "@/components/layout/SceneSection";
import { SiteHeader, SiteFooter } from "@/components/layout/SiteChrome";
import { resolvePage } from "@/lib/page-meta";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  return (await resolvePage(params, "horizonGrants")).metadata;
}

export default async function HorizonGrantsPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale, dict } = await resolvePage(params, "horizonGrants");
  const d = dict.pages.horizonGrants;

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
          imagePosition="55% center"
          titleAs="h1"
        >
          <TickList items={d.points} />
        </SceneSection>

        <SceneSection
          num="02"
          eyebrow={dict.nav.contact}
          title={locale === "uk" ? "До консорціуму" : "Join the consortium"}
          lead={dict.forms.configs.grantConsortium.description}
          image="/images/miscanthus-industries.png"
          imagePosition="60% center"
          compact
          cta={dict.forms.configs.grantConsortium.submit}
          href={`/${locale}/science-partners`}
        />
      </main>
      <SiteFooter dict={dict} locale={locale} />
    </div>
  );
}
