import type { MetadataRoute } from "next";
import { locales } from "@/i18n/config";

const routes = [
  "",
  "/buy-rhizomes",
  "/agronomic-support",
  "/services",
  "/technologies",
  "/equipment",
  "/value-chain",
  "/economics",
  "/regional-pilots",
  "/carbon",
  "/esg",
  "/net-zero",
  "/science-partners",
  "/horizon-grants",
  "/industry-offtake",
  "/franchise",
  "/consortium",
  "/governments",
  "/investors",
  "/about",
  "/research",
  "/contact",
];

const BASE = process.env.NEXT_PUBLIC_SITE_URL ?? "https://vem-miscanthus.com";

export default function sitemap(): MetadataRoute.Sitemap {
  const entries: MetadataRoute.Sitemap = [];
  for (const route of routes) {
    const languages = Object.fromEntries(
      locales.map((l) => [l, `${BASE}/${l}${route === "" ? "" : route}`])
    );
    for (const locale of locales) {
      entries.push({
        url: `${BASE}/${locale}${route === "" ? "" : route}`,
        lastModified: new Date(),
        changeFrequency: "monthly",
        priority: route === "" ? 1 : 0.7,
        alternates: { languages },
      });
    }
  }
  return entries;
}
