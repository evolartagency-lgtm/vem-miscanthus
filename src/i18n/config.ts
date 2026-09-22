export const locales = ["en", "uk", "he"] as const;
export type Locale = (typeof locales)[number];
export const defaultLocale: Locale = "en";

export function isLocale(value: string): value is Locale {
  return (locales as readonly string[]).includes(value);
}

export function resolveLocale(acceptLanguage: string | null): Locale {
  if (!acceptLanguage) return defaultLocale;
  const lower = acceptLanguage.toLowerCase();
  if (lower.startsWith("uk") || lower.startsWith("ru")) return "uk";
  if (lower.startsWith("he")) return "he";
  return "en";
}

export function isRtl(locale: Locale): boolean {
  return locale === "he";
}

export function localePath(locale: Locale, path: string): string {
  return `/${locale}${path === "/" ? "" : path}`;
}
