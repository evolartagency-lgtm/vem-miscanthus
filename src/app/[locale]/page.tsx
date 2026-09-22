import type { Metadata } from "next";
import { HomeLanding } from "@/components/home/HomeLanding";
import { resolvePage } from "@/lib/page-meta";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  return (await resolvePage(params, "home", "/")).metadata;
}

export default async function HomePage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale, dict } = await resolvePage(params, "home", "/");

  const base = (process.env.NEXT_PUBLIC_SITE_URL ?? "https://vem-miscanthus.com").replace(/\/$/, "");
  const structuredData = [
    {
      "@context": "https://schema.org",
      "@type": "Organization",
      name: "Vital Energy Miscanthus",
      alternateName: "VEM",
      url: `${base}/${locale}`,
      logo: `${base}/icon.svg`,
      description: dict.brand.tagline,
    },
    {
      "@context": "https://schema.org",
      "@type": "WebSite",
      name: "Vital Energy Miscanthus",
      url: `${base}/${locale}`,
      inLanguage: locale,
      publisher: { "@type": "Organization", name: "Vital Energy Miscanthus" },
    },
  ];

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
      />
      <HomeLanding dict={dict} locale={locale} />
    </>
  );
}
