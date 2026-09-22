/**
 * Current rhizome batch — the single source of truth for the landing hero,
 * the order wizard and the buy-rhizomes funnel.
 * NOTE: pricePerRhizome is an INDICATIVE placeholder — the client must confirm
 * the real figure before go-live. Set `priceTbd` to true to hide the figure.
 */
export const RHIZOME_BATCH = {
  variety: "Miscanthus × giganteus",
  available: 30_000,
  currency: "€",
  pricePerRhizome: 0.35,
  priceTbd: false,
  minOrder: 500,
  step: 100,
} as const;

export function formatBatchCount(locale: string): string {
  return new Intl.NumberFormat(
    locale === "uk" ? "uk-UA" : locale === "he" ? "he-IL" : "en-US",
  ).format(RHIZOME_BATCH.available);
}
