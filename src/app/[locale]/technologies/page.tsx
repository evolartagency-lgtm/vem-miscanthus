import type { Metadata } from "next";
import { SceneSection, TickList } from "@/components/layout/SceneSection";
import { SiteHeader, SiteFooter } from "@/components/layout/SiteChrome";
import { resolvePage } from "@/lib/page-meta";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  return (await resolvePage(params, "technologies")).metadata;
}

export default async function TechnologiesPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale, dict } = await resolvePage(params, "technologies");
  const d = dict.pages.technologies;

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
          <TickList items={d.stack.slice(0, 6)} />
        </SceneSection>

        <SceneSection
          num="02"
          eyebrow={d.researchTitle}
          title={locale === "uk" ? "Наукова база" : "Research base"}
          lead={dict.slots.research.charAt(0) + dict.slots.research.slice(1).toLowerCase()}
          image="/images/science-lab.png"
          imagePosition="60% center"
          compact
        />

        <SceneSection
          num="03"
          eyebrow={d.certTitle}
          title={locale === "uk" ? "Сертифікації" : "Certifications"}
          lead={dict.slots.certifications.charAt(0) + dict.slots.certifications.slice(1).toLowerCase()}
          image="/images/esg-tablet-v2.png"
          imagePosition="65% center"
          compact
        />
      </main>
      <SiteFooter dict={dict} locale={locale} />
    </div>
  );
}
