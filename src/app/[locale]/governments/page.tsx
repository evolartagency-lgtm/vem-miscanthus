import type { Metadata } from "next";
import { SceneSection, TickList } from "@/components/layout/SceneSection";
import { SiteHeader, SiteFooter } from "@/components/layout/SiteChrome";
import { resolvePage } from "@/lib/page-meta";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  return (await resolvePage(params, "governments")).metadata;
}

export default async function GovernmentsPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale, dict } = await resolvePage(params, "governments");
  const d = dict.pages.governments;

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
          imagePosition="55% center"
          titleAs="h1"
        >
          <TickList items={d.programs.slice(0, 5)} />
        </SceneSection>

        <SceneSection
          num="02"
          eyebrow={d.programsTitle}
          title={locale === "uk" ? "Національні програми" : "National programs"}
          image="/images/hero-field.png"
          imagePosition="60% center"
          compact
          cta={dict.forms.configs.government.submit}
          href={`/${locale}/contact?form=government-program`}
        >
          <TickList items={d.programs.slice(5)} />
        </SceneSection>
      </main>
      <SiteFooter dict={dict} locale={locale} />
    </div>
  );
}
