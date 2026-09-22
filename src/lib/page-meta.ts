import type { Metadata } from "next";
import { getDictionary, type Dictionary, type Locale } from "@/data/dictionaries";
import { isLocale, locales } from "@/i18n/config";

export interface PageContext {
  locale: Locale;
  dict: Dictionary;
}

const SITE_NAME = "Vital Energy Miscanthus";
const OG_IMAGE = "/images/hero-field.png";

function absoluteUrl(path: string): string {
  const base = process.env.NEXT_PUBLIC_SITE_URL ?? "https://vem-miscanthus.com";
  return `${base.replace(/\/$/, "")}${path === "/" ? "" : path}`;
}

/**
 * Builds per-page metadata: title/description from the dictionary plus
 * canonical, hreflang (en/uk/he + x-default), Open Graph and Twitter Card.
 */
function buildMetadata(
  locale: Locale,
  path: string,
  meta: { title: string; description: string },
): Metadata {
  const canonical = absoluteUrl(`/${locale}${path === "/" ? "" : path}`);
  const languages: Record<string, string> = {};
  for (const l of locales) {
    languages[l] = absoluteUrl(`/${l}${path === "/" ? "" : path}`);
  }
  languages["x-default"] = absoluteUrl(`${path === "/" ? "" : path}`);

  return {
    title: meta.title,
    description: meta.description,
    alternates: { canonical, languages },
    openGraph: {
      title: meta.title,
      description: meta.description,
      url: canonical,
      siteName: SITE_NAME,
      type: "website",
      locale: locale === "uk" ? "uk_UA" : locale === "he" ? "he_IL" : "en_US",
      alternateLocale: locales.filter((l) => l !== locale).map((l) => (l === "uk" ? "uk_UA" : l === "he" ? "he_IL" : "en_US")),
      images: [{ url: OG_IMAGE, width: 1456, height: 816, alt: SITE_NAME }],
    },
    twitter: {
      card: "summary_large_image",
      title: meta.title,
      description: meta.description,
      images: [OG_IMAGE],
    },
  };
}

export async function resolvePage(
  params: Promise<{ locale: string }>,
  metaKey?: keyof Dictionary["meta"],
  path = "/",
): Promise<PageContext & { metadata: Metadata }> {
  const { locale } = await params;
  const safe: Locale = isLocale(locale) ? locale : "en";
  const dict = await getDictionary(safe);
  const meta = (metaKey ? dict.meta[metaKey] : {}) as { title?: string; description?: string };
  return {
    locale: safe,
    dict,
    metadata: buildMetadata(safe, path, {
      title: meta.title ?? SITE_NAME,
      description: meta.description ?? dict.brand.tagline,
    }),
  };
}

export { buildMetadata, absoluteUrl };
