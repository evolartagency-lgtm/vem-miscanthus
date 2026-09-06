import type { Metadata } from "next";
import { SceneSection, TickList } from "@/components/layout/SceneSection";
import { SiteHeader, SiteFooter } from "@/components/layout/SiteChrome";
import { resolvePage } from "@/lib/page-meta";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  return (await resolvePage(params, "about")).metadata;
}

export default async function AboutPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale, dict } = await resolvePage(params, "about");
  const d = dict.pages.about;

  return (
    <div className="min-h-svh bg-carbon">
      <SiteHeader dict={dict} locale={locale} />
      <main>
        <SceneSection
          num="01"
          eyebrow={dict.brand.name}
          title={d.title}
          lead={d.lead}
          image="/images/hero-field.png"
          imagePosition="60% center"
          titleAs="h1"
        >
          <TickList items={d.platform} />
        </SceneSection>

        <SceneSection
          num="02"
          eyebrow={d.presenceTitle}
          title={locale === "uk" ? "Присутність" : "Presence"}
          lead={dict.slots.presence.charAt(0) + dict.slots.presence.slice(1).toLowerCase()}
          image="/images/regional-landscape.png"
          imagePosition="60% center"
          compact
        />

        <SceneSection
          num="03"
          eyebrow={d.teamTitle}
          title={locale === "uk" ? "Команда" : "Team"}
          lead={dict.slots.team.charAt(0) + dict.slots.team.slice(1).toLowerCase()}
          image="/images/science-lab.png"
          imagePosition="60% center"
          compact
          cta={dict.forms.configs.partnership.submit}
          href={`/${locale}/contact?form=partnership`}
        />
      </main>
      <SiteFooter dict={dict} locale={locale} />
    </div>
  );
}
