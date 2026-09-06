import { defaultLocale, locales, type Locale } from "@/i18n/config";
import { en, type Dictionary } from "./en";
import { uk } from "./uk";

export const dictionaries: Record<Locale, Dictionary> = { en, uk };

export async function getDictionary(locale: Locale): Promise<Dictionary> {
  return dictionaries[locale] ?? dictionaries[defaultLocale];
}

export { en, uk };
export type { Dictionary };
export { locales, defaultLocale };
export type { Locale };
