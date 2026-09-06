import type { Metadata } from "next";
import { SceneSection, TickList } from "@/components/layout/SceneSection";
import { SiteHeader, SiteFooter } from "@/components/layout/SiteChrome";
import { resolvePage } from "@/lib/page-meta";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  return (await resolvePage(params, "consortium")).metadata;
}

export default async function ConsortiumPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale, dict } = await resolvePage(params, "consortium");
  const d = dict.pages.consortium;

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
          <TickList items={d.tracks} />
        </SceneSection>

        <SceneSection
          num="02"
          eyebrow={d.membersTitle}
          title={locale === "uk" ? "Учасники консорціуму" : "Consortium members"}
          lead={dict.slots.members.charAt(0) + dict.slots.members.slice(1).toLowerCase()}
          image="/images/miscanthus-industries.png"
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
