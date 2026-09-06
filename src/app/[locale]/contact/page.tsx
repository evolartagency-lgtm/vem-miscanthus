import type { Metadata } from "next";
import { SceneSection, Panel } from "@/components/layout/SceneSection";
import { SiteHeader, SiteFooter } from "@/components/layout/SiteChrome";
import { LeadForm } from "@/components/forms/LeadForm";
import { getFormConfigs, type FormKey } from "@/data/forms";
import { resolvePage } from "@/lib/page-meta";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  return (await resolvePage(params, "contact")).metadata;
}

const FORM_BY_QUERY: Record<string, FormKey> = {
  "commercial-offer": "commercial",
  "investment-case": "investment",
  "financial-model": "investment",
  partnership: "partnership",
  franchise: "franchise",
  "government-program": "government",
  project: "project",
  "agronomic-support": "agronomic",
  equipment: "equipment",
  carbon: "carbon",
  esg: "esg",
  "regional-pilot": "regionalPilot",
  "grant-consortium": "grantConsortium",
  strategic: "strategic",
  "platform-investment": "platformInvestment",
};

export default async function ContactPage({
  params,
  searchParams,
}: {
  params: Promise<{ locale: string }>;
  searchParams: Promise<{ form?: string }>;
}) {
  const { locale, dict } = await resolvePage(params, "contact");
  const { form } = await searchParams;
  const key: FormKey = form ? (FORM_BY_QUERY[form] ?? "project") : "project";
  const cfg = getFormConfigs(dict)[key];

  return (
    <div className="min-h-svh bg-carbon">
      <SiteHeader dict={dict} locale={locale} />
      <main>
        <SceneSection
          num="01"
          eyebrow={dict.brand.name}
          title={dict.pages.contact.title}
          lead={cfg.description}
          image="/images/agronomists-v2.png"
          imagePosition="60% center"
          titleAs="h1"
          compact
          wide
        >
          <Panel>
            <LeadForm
              config={cfg}
              receivedLabel={dict.forms.received}
              sendingLabel={dict.ui.sending}
            />
          </Panel>
        </SceneSection>
      </main>
      <SiteFooter dict={dict} locale={locale} />
    </div>
  );
}
