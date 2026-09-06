import type { Metadata } from "next";
import { SceneSection, TickList } from "@/components/layout/SceneSection";
import { SiteHeader, SiteFooter } from "@/components/layout/SiteChrome";
import { resolvePage } from "@/lib/page-meta";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  return (await resolvePage(params, "netZero")).metadata;
}

export default async function NetZeroPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale, dict } = await resolvePage(params, "netZero");
  const d = dict.pages.netZero;

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
          <TickList items={d.stack.slice(0, 6)} />
        </SceneSection>

        <SceneSection
          num="02"
          eyebrow={d.impactTitle}
          title={locale === "uk" ? "Верифікований вплив" : "Verified impact"}
          lead={dict.slots.impact.charAt(0) + dict.slots.impact.slice(1).toLowerCase()}
          image="/images/roots-soil.png"
          imagePosition="60% center"
          compact
        >
          <TickList items={d.stack.slice(6)} />
        </SceneSection>
      </main>
      <SiteFooter dict={dict} locale={locale} />
    </div>
  );
}
