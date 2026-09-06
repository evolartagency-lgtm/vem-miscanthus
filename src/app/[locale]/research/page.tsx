import type { Metadata } from "next";
import { SceneSection, TickList } from "@/components/layout/SceneSection";
import { SiteHeader, SiteFooter } from "@/components/layout/SiteChrome";
import { resolvePage } from "@/lib/page-meta";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  return (await resolvePage(params, "research")).metadata;
}

export default async function ResearchPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale, dict } = await resolvePage(params, "research");
  const d = dict.pages.research;

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
          <TickList items={d.directions} />
        </SceneSection>

        <SceneSection
          num="02"
          eyebrow={d.publicationsTitle}
          title={locale === "uk" ? "Публікації" : "Publications"}
          lead={dict.slots.publications.charAt(0) + dict.slots.publications.slice(1).toLowerCase()}
          image="/images/roots-soil.png"
          imagePosition="60% center"
          compact
          cta={dict.forms.configs.grantConsortium.submit}
          href={`/${locale}/science-partners`}
        />

        <SceneSection
          num="03"
          eyebrow={d.partnersTitle}
          title={locale === "uk" ? "Наукові партнери" : "Research partners"}
          lead={dict.slots.partners.charAt(0) + dict.slots.partners.slice(1).toLowerCase()}
          image="/images/agronomists-v2.png"
          imagePosition="60% center"
          compact
          cta={dict.forms.configs.grantConsortium.submit}
          href={`/${locale}/contact?form=grant-consortium`}
        />
      </main>
      <SiteFooter dict={dict} locale={locale} />
    </div>
  );
}
