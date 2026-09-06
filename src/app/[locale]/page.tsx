import type { Metadata } from "next";
import { HomeLanding } from "@/components/home/HomeLanding";
import { resolvePage } from "@/lib/page-meta";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  return (await resolvePage(params, "home")).metadata;
}

export default async function HomePage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale, dict } = await resolvePage(params, "home");

  const structuredData = {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: "Vital Energy Miscanthus",
    description: dict.brand.tagline,
  };

  return (
    <main>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
      />
      <HomeLanding dict={dict} locale={locale} />
    </main>
  );
}
