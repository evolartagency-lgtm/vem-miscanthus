import type { Metadata } from "next";
import { SceneSection } from "@/components/layout/SceneSection";
import { SiteHeader, SiteFooter } from "@/components/layout/SiteChrome";
import { resolvePage } from "@/lib/page-meta";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  return (await resolvePage(params, "memorandums")).metadata;
}

export default async function MemorandumsPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale, dict } = await resolvePage(params, "memorandums");
  const d = dict.pages.memorandums;

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
          <ul className="flex flex-col">
            {d.formats.map((f, i) => (
              <li
                key={f}
                className="flex items-baseline gap-5 border-b border-white/10 py-3.5"
              >
                <span className="text-[11px] font-medium tracking-[0.2em] text-biomass tabular-nums">
                  {String(i + 1).padStart(2, "0")}
                </span>
                <span className="text-[13px] text-sage">{f}</span>
              </li>
            ))}
          </ul>
        </SceneSection>

        <SceneSection
          num="02"
          eyebrow={d.signedTitle}
          title={locale === "uk" ? "Підписані меморандуми" : "Signed memorandums"}
          lead={dict.slots.signed.charAt(0) + dict.slots.signed.slice(1).toLowerCase()}
          image="/images/regional-landscape.png"
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
