import { defaultLocale, locales, type Locale } from "@/i18n/config";
import { en, type Dictionary } from "./en";
import { uk } from "./uk";
import { he } from "./he";

export const dictionaries: Record<Locale, Dictionary> = { en, uk, he };

export async function getDictionary(locale: Locale): Promise<Dictionary> {
  return dictionaries[locale] ?? dictionaries[defaultLocale];
}

export { en, uk, he };
export type { Dictionary };
export { locales, defaultLocale };
export type { Locale };
