import type { Metadata } from "next";
import { SceneSection, TickList } from "@/components/layout/SceneSection";
import { SiteHeader, SiteFooter } from "@/components/layout/SiteChrome";
import { resolvePage } from "@/lib/page-meta";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  return (await resolvePage(params, "valueChain")).metadata;
}

export default async function ValueChainPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale, dict } = await resolvePage(params, "valueChain");
  const d = dict.pages.valueChain;

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
          imagePosition="55% center"
          titleAs="h1"
        >
          <TickList items={d.chain.slice(0, 6)} />
        </SceneSection>

        <SceneSection
          num="02"
          eyebrow={d.specTitle}
          title={locale === "uk" ? "Специфікації продуктів" : "Product specifications"}
          lead={dict.slots.productSpecs.charAt(0) + dict.slots.productSpecs.slice(1).toLowerCase()}
          image="/images/equipment-harvester-v2.png"
          imagePosition="60% center"
          compact
        >
          <TickList items={d.chain.slice(6)} />
        </SceneSection>
      </main>
      <SiteFooter dict={dict} locale={locale} />
    </div>
  );
}
