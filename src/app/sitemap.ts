import type { MetadataRoute } from "next";
import { locales } from "@/i18n/config";

const routes = [
  "",
  "/buy-rhizomes",
  "/directions",
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

const BASE = (process.env.NEXT_PUBLIC_SITE_URL ?? "https://vem-miscanthus.com").replace(/\/$/, "");

export default function sitemap(): MetadataRoute.Sitemap {
  const entries: MetadataRoute.Sitemap = [];
  for (const route of routes) {
    const languages: Record<string, string> = {};
    for (const l of locales) {
      languages[l] = `${BASE}/${l}${route}`;
    }
    languages["x-default"] = `${BASE}/en${route}`;
    for (const locale of locales) {
      entries.push({
        url: `${BASE}/${locale}${route}`,
        lastModified: new Date(),
        changeFrequency: "monthly",
        priority: route === "" ? 1 : 0.7,
        alternates: { languages },
      });
    }
  }
  return entries;
}
