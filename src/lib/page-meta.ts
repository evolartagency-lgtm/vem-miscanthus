import type { Metadata } from "next";
import { getDictionary, type Dictionary, type Locale } from "@/data/dictionaries";
import { isLocale } from "@/i18n/config";

export interface PageContext {
  locale: Locale;
  dict: Dictionary;
}

export async function resolvePage(
  params: Promise<{ locale: string }>,
  metaKey?: keyof Dictionary["meta"]
): Promise<PageContext & { metadata: Metadata }> {
  const { locale } = await params;
  const safe: Locale = isLocale(locale) ? locale : "en";
  const dict = await getDictionary(safe);
  return {
    locale: safe,
    dict,
    metadata: metaKey ? dict.meta[metaKey] : {},
  };
}
