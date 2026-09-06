import type { Metadata } from "next";
import { SceneSection, TickList } from "@/components/layout/SceneSection";
import { SiteHeader, SiteFooter } from "@/components/layout/SiteChrome";
import { resolvePage } from "@/lib/page-meta";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  return (await resolvePage(params, "franchise")).metadata;
}

export default async function FranchisePage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale, dict } = await resolvePage(params, "franchise");
  const d = dict.pages.franchise;

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
          <TickList items={d.includes} />
        </SceneSection>

        <SceneSection
          num="02"
          eyebrow={d.termsTitle}
          title={locale === "uk" ? "Умови партнерства" : "Partner terms"}
          lead={dict.slots.terms.charAt(0) + dict.slots.terms.slice(1).toLowerCase()}
          image="/images/miscanthus-industries.png"
          imagePosition="60% center"
          compact
          cta={dict.forms.configs.franchise.submit}
          href={`/${locale}/contact?form=franchise`}
        />
      </main>
      <SiteFooter dict={dict} locale={locale} />
    </div>
  );
}
