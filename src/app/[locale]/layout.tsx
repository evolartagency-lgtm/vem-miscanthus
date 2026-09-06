import type { Metadata, Viewport } from "next";
import { notFound } from "next/navigation";
import { Sora, Manrope, IBM_Plex_Mono } from "next/font/google";
import { isLocale, locales } from "@/i18n/config";
import "../globals.css";

const sans = Sora({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
  variable: "--font-sans-src",
  display: "swap",
});

const cyrillicSans = Manrope({
  subsets: ["latin", "cyrillic"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-cyrillic-src",
  display: "swap",
});

const mono = IBM_Plex_Mono({
  subsets: ["latin", "cyrillic"],
  weight: ["400", "500"],
  variable: "--font-mono-src",
  display: "swap",
});

export function generateStaticParams() {
  return locales.map((locale) => ({ locale }));
}

export async function generateMetadata(): Promise<Metadata> {
  return {
    metadataBase: new URL(process.env.NEXT_PUBLIC_SITE_URL ?? "http://localhost:3000"),
    title: {
      default: "Vital Energy Miscanthus — International Regenerative Technology Platform",
      template: "%s — Vital Energy Miscanthus",
    },
    alternates: {
      languages: Object.fromEntries(locales.map((l) => [l, `/${l}`])),
    },
    robots: { index: true, follow: true },
  };
}

export const viewport: Viewport = {
  themeColor: "#f5f2ea",
  width: "device-width",
  initialScale: 1,
};

export default async function LocaleLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  if (!isLocale(locale)) notFound();

  return (
    <html lang={locale === "uk" ? "uk" : locale} className={`${sans.variable} ${cyrillicSans.variable} ${mono.variable}`}>
      <body className="min-h-svh bg-carbon font-sans text-bone antialiased">
        {children}
      </body>
    </html>
  );
}
