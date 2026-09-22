import Image from "next/image";
import Link from "next/link";
import type { ReactNode } from "react";
import type { Dictionary, Locale } from "@/data/dictionaries";
import { SiteHeader, SiteFooter } from "@/components/layout/SiteChrome";
import { Reveal } from "@/components/ui/Reveal";
import { LeadForm, type FormConfig } from "@/components/forms/LeadForm";
import { formatBatchCount } from "@/data/pricing";

/**
 * Premium mobile adaptation of the existing VEM landing.
 * Content source: current site dictionaries only (no invented copy).
 * Rendered below lg; desktop keeps the existing HomeLanding composition.
 */

const CREAM = "#f8f7f2";
const INK = "#15241d";
const GREEN = "#1d3b2a";
const GOLD = "#d5b36d";

function Eyebrow({ children, tone = "light" }: { children: ReactNode; tone?: "light" | "dark" }) {
  return (
    <p className={`text-[10px] font-semibold uppercase tracking-[0.3em] ${tone === "dark" ? "text-[#d5b36d]" : "text-[#8a6a2f]"}`}>
      {children}
    </p>
  );
}

function SceneTitle({ children, tone = "light", size = "md" }: { children: ReactNode; tone?: "light" | "dark"; size?: "md" | "lg" }) {
  return (
    <h2
      className={`mt-4 max-w-md font-sans font-semibold leading-[1.08] tracking-[-0.02em] ${size === "lg" ? "text-[clamp(2.2rem,9vw,3.2rem)]" : "text-[clamp(1.8rem,7.5vw,2.6rem)]"} ${tone === "dark" ? "text-[#15241d]" : "text-[#f3efe2]"}`}
    >
      {children}
    </h2>
  );
}

function SceneText({ children, tone = "light" }: { children: ReactNode; tone?: "light" | "dark" }) {
  return (
    <p className={`mt-4 max-w-md text-[16px] leading-relaxed ${tone === "dark" ? "text-[#34463d]" : "text-[#e9e4d5]/90"}`}>
      {children}
    </p>
  );
}

function SceneCta({ href, children, tone = "green" }: { href: string; children: ReactNode; tone?: "green" | "gold" }) {
  return (
    <Link
      href={href}
      className={`cta-modern flex min-h-[52px] w-full max-w-[300px] items-center justify-center gap-3 rounded-full px-7 text-[11px] font-semibold uppercase tracking-[0.18em] transition-transform hover:-translate-y-0.5 ${
        tone === "green"
          ? "bg-[#1d3b2a] text-[#f3efe2] hover:bg-[#27503a]"
          : `bg-[linear-gradient(135deg,#ead09f,#c99f61)] text-[#221a0c]`
      }`}
    >
      {children}
      <span aria-hidden>→</span>
    </Link>
  );
}

function LabelRow({ items, tone = "light" }: { items: readonly string[]; tone?: "light" | "dark" }) {
  return (
    <div className={`flex flex-wrap items-center justify-center gap-x-3 gap-y-1 text-[9px] font-semibold uppercase tracking-[0.22em] ${tone === "dark" ? "text-[#f3efe2]/90" : "text-[#34463d]/80"}`}>
      {items.map((x, i) => (
        <span key={x} className="flex items-center gap-3">
          {i > 0 && <span aria-hidden className="h-3 w-px bg-current opacity-40" />}
          {x}
        </span>
      ))}
    </div>
  );
}

export function MobileLanding({ dict, locale }: { dict: Dictionary; locale: Locale }) {
  const p = (path: string) => `/${locale}${path}`;
  const pages = dict.pages;
  const h = dict.home;

  const contactForm: FormConfig = {
    type: "general",
    title: pages.contact.title,
    kickerLabel: "",
    submitLabel: dict.nav.contact,
    successMessage: dict.forms.configs.commercial.success,
    fields: [
      { kind: "text", name: "name", label: dict.forms.fields.name, required: true },
      { kind: "email", name: "email", label: dict.forms.fields.email, required: true },
      { kind: "text", name: "company", label: dict.forms.fields.company },
      { kind: "textarea", name: "comment", label: dict.forms.fields.comment },
    ],
  };

  return (
    <div className="mobile-landing lg:hidden">
      <SiteHeader dict={dict} locale={locale} />
      <main className="min-h-svh bg-[#f8f7f2] text-[#15241d]">
        {/* 1 — Hero: existing hero content, atmospheric photo, integrated availability strip */}
        <section className="relative flex min-h-[100svh] flex-col justify-end overflow-hidden">
          <div aria-hidden className="photo-layer absolute inset-0 overflow-hidden">
            <Image src="/images/hero-field.png" alt="" fill priority sizes="100vw" className="object-cover" />
          </div>
          <div aria-hidden className="absolute inset-0" style={{ background: "linear-gradient(180deg, rgba(248,247,242,.34) 0%, rgba(248,247,242,.10) 38%, rgba(7,19,14,.42) 68%, rgba(7,19,14,.90) 100%)" }} />
          <div className="relative px-6 pb-10 pt-28">
            <Reveal>
              <h1 className="max-w-[10ch] font-sans text-[clamp(2.6rem,12vw,4.4rem)] font-semibold uppercase leading-[1.0] tracking-[-0.02em] text-[#15241d]">
                {h.hero.titleLines[0]}
                <br />
                {h.hero.titleLines[1]}
              </h1>
              <p className="mt-4 text-[10px] font-semibold uppercase tracking-[0.22em] text-[#1d3b2a]/85">
                Regenerative bioeconomy · Circular economy · Low-carbon industry
              </p>
              <p className="mt-4 max-w-md text-[16px] leading-relaxed text-[#f3efe2] [text-shadow:0_1px_14px_rgba(7,19,14,.5)]">{h.hero.lead}</p>
              <div className="mt-7 max-w-[300px]">
                <SceneCta href={p("/buy-rhizomes")} tone="green">{h.rhizomes.ctaPrimary}</SceneCta>
              </div>

              {/* integrated availability strip (existing counter content) */}
              <div className="mt-8 border border-white/15 bg-[rgba(7,19,14,.55)] px-6 py-5 backdrop-blur-sm">
                <p className="font-sans text-[2.4rem] font-semibold leading-none text-[#ead09f]">{formatBatchCount(locale)}</p>
                <p className="mt-1.5 text-lg font-medium uppercase leading-tight text-[#f3efe2]">{h.rhizomes.counterTitle}</p>
                <p className="mt-1.5 text-[11px] leading-snug text-stone-300">{h.rhizomes.counterNote}</p>
              </div>

              <div aria-hidden className="mt-9 flex items-center gap-3 text-[10px] font-semibold uppercase tracking-[0.3em] text-stone-200">
                <span className="animate-drift-up text-base leading-none">↓</span>
                {dict.mobile.scrollCue}
              </div>
            </Reveal>
          </div>
        </section>

        {/* 2 — About: visual continuation of the hero downward (existing section 02) */}
        <section className="relative flex min-h-[100svh] flex-col justify-end overflow-hidden bg-[#0b1712]">
          <div aria-hidden className="photo-layer absolute inset-0 overflow-hidden">
            <Image src="/images/hero-roots-continuous-v2.png" alt="" fill loading="lazy" sizes="100vw" className="object-cover" />
          </div>
          <div aria-hidden className="absolute inset-0" style={{ background: "linear-gradient(180deg, rgba(7,19,14,.20) 0%, rgba(7,19,14,.45) 45%, rgba(7,19,14,.88) 100%)" }} />
          <div className="relative px-6 pb-14 pt-24">
            <Reveal>
              <Eyebrow tone="dark">{locale === "he" ? "מיסקנטוס: מהקרקע למערכת" : "Міскантус: від землі до системи"}</Eyebrow>
              <SceneTitle tone="light" size="lg">{locale === "uk" ? "Від землі до системи" : locale === "he" ? "מהקרקע למערכת" : "From soil to system"}</SceneTitle>
              <SceneText tone="light">{pages.about.lead}</SceneText>
              <SceneText tone="light">{pages.technologies.lead}</SceneText>
            </Reveal>
          </div>
        </section>

        {/* 3 — Value chain: existing value-chain page content (cream scene, photo card) */}
        <section className="relative flex min-h-[100svh] flex-col justify-center overflow-hidden bg-[#f8f7f2] px-6 py-24 text-[#15241d]">
          <Reveal>
            <Eyebrow tone="dark">{pages.valueChain.title}</Eyebrow>
            <SceneTitle tone="dark" size="lg">{pages.valueChain.lead.split(" — ")[0]}</SceneTitle>
            <SceneText tone="dark">{pages.valueChain.lead}</SceneText>
          </Reveal>
          <Reveal delay={0.12}>
            <div className="relative mt-8 h-[38svh] overflow-hidden rounded-2xl">
              <Image src="/images/regional-landscape.png" alt="" fill loading="lazy" sizes="100vw" className="object-cover" />
              <div aria-hidden className="absolute inset-0 bg-[linear-gradient(180deg,rgba(7,19,14,0)_55%,rgba(7,19,14,.45)_100%)]" />
            </div>
            <div className="mt-7">
              <SceneCta href={p("/value-chain")}>{dict.nav.site.find((i) => i.href === "/value-chain")?.label ?? pages.valueChain.title}</SceneCta>
            </div>
          </Reveal>
        </section>

        {/* 4 — Land restoration: existing regional pilots content */}
        <section className="relative flex min-h-[100svh] flex-col justify-end overflow-hidden bg-[#0b1712]">
          <div aria-hidden className="photo-layer absolute inset-0 overflow-hidden">
            <Image src="/images/agronomists-v2.png" alt="" fill loading="lazy" sizes="100vw" className="object-cover" style={{ objectPosition: "38% center" }} />
          </div>
          <div aria-hidden className="absolute inset-0" style={{ background: "linear-gradient(180deg, rgba(7,19,14,.62) 0%, rgba(7,19,14,.30) 42%, rgba(7,19,14,.88) 100%)" }} />
          <div className="relative px-6 pb-12 pt-24">
            <Reveal>
              <Eyebrow tone="dark">{pages.regionalPilots.title}</Eyebrow>
              <SceneTitle tone="light" size="lg">{pages.regionalPilots.subtitle}</SceneTitle>
              <SceneText tone="light">{pages.regionalPilots.lead}</SceneText>
              <div className="mt-7">
                <SceneCta href={p("/regional-pilots")} tone="green">{dict.forms.configs.regionalPilot.submit}</SceneCta>
              </div>
              <div className="mt-8 border-t border-white/20 pt-5">
                <LabelRow items={h.final.values.slice(0, 3)} />
              </div>
            </Reveal>
          </div>
        </section>

        {/* 5 — Agronomic support: existing agronomic support content (cream, photo bottom) */}
        <section className="relative flex min-h-[100svh] flex-col overflow-hidden bg-[#f8f7f2] text-[#15241d]">
          <div className="relative flex flex-1 flex-col justify-end px-6 pb-9 pt-28">
            <Reveal>
              <Eyebrow tone="dark">{pages.agronomicSupport.title}</Eyebrow>
              <SceneTitle tone="dark" size="lg">{pages.agronomicSupport.subtitle}</SceneTitle>
              <SceneText tone="dark">{pages.agronomicSupport.lead}</SceneText>
              <div className="mt-7 max-w-[280px]">
                <SceneCta href={p("/agronomic-support")} tone="green">{dict.forms.configs.agronomic.submit}</SceneCta>
              </div>
            </Reveal>
          </div>
          <div className="relative h-[40svh] overflow-hidden">
            <Image src="/images/agronomists-v2.png" alt="" fill loading="lazy" sizes="100vw" className="object-cover" style={{ objectPosition: "center" }} />
            <div aria-hidden className="absolute inset-0 bg-[linear-gradient(180deg,rgba(248,247,242,.25)_0%,rgba(7,19,14,0)_40%,rgba(7,19,14,.55)_100%)]" />
            <div className="absolute inset-x-0 bottom-0 pb-6">
              <LabelRow items={pages.agronomicSupport.tools.slice(0, 3).map((t) => t.split(" ").slice(0, 2).join(" "))} />
            </div>
          </div>
        </section>

        {/* 6 — Climate: existing carbon partnership content */}
        <section className="relative flex min-h-[100svh] flex-col justify-end overflow-hidden bg-[#0b1712]">
          <div aria-hidden className="photo-layer absolute inset-0 overflow-hidden">
            <Image src="/images/science-lab.png" alt="" fill loading="lazy" sizes="100vw" className="object-cover" />
          </div>
          <div aria-hidden className="absolute inset-0" style={{ background: "linear-gradient(180deg, rgba(7,19,14,.66) 0%, rgba(7,19,14,.38) 45%, rgba(7,19,14,.9) 100%)" }} />
          <div className="relative px-6 pb-12 pt-24">
            <Reveal>
              <Eyebrow tone="dark">{pages.carbon.title}</Eyebrow>
              <SceneTitle tone="light" size="lg">{pages.carbon.subtitle}</SceneTitle>
              <SceneText tone="light">{pages.carbon.lead}</SceneText>
              <div className="mt-7">
                <SceneCta href={p("/carbon")} tone="green">{dict.forms.configs.carbon.submit}</SceneCta>
              </div>
            </Reveal>
          </div>
        </section>

        {/* 7 — Equipment: existing equipment content (cream, harvester photo bottom) */}
        <section className="relative flex min-h-[100svh] flex-col overflow-hidden bg-[#f8f7f2] text-[#15241d]">
          <div className="relative flex flex-1 flex-col justify-end px-6 pb-9 pt-28">
            <Reveal>
              <Eyebrow tone="dark">{pages.equipment.title}</Eyebrow>
              <SceneTitle tone="dark" size="lg">{pages.equipment.subtitle}</SceneTitle>
              <SceneText tone="dark">{pages.equipment.lead}</SceneText>
              <div className="mt-7 max-w-[300px]">
                <SceneCta href={p("/equipment")} tone="green">{dict.forms.configs.equipment.submit}</SceneCta>
              </div>
            </Reveal>
          </div>
          <div className="relative h-[40svh] overflow-hidden">
            <Image src="/images/equipment-harvester-v2.png" alt="" fill loading="lazy" sizes="100vw" className="object-cover" />
            <div aria-hidden className="absolute inset-0 bg-[linear-gradient(180deg,rgba(248,247,242,.2)_0%,rgba(7,19,14,0)_45%,rgba(7,19,14,.5)_100%)]" />
            <div className="absolute inset-x-0 bottom-0 pb-6">
              <LabelRow items={pages.equipment.planting} />
            </div>
          </div>
        </section>

        {/* 8 — Partnership: existing consortium content (dark, people photo) */}
        <section className="relative flex min-h-[100svh] flex-col justify-end overflow-hidden bg-[#0b1712]">
          <div aria-hidden className="photo-layer absolute inset-0 overflow-hidden">
            <Image src="/images/agronomists-v2.png" alt="" fill loading="lazy" sizes="100vw" className="object-cover" style={{ objectPosition: "62% center" }} />
          </div>
          <div aria-hidden className="absolute inset-0" style={{ background: "linear-gradient(180deg, rgba(7,19,14,.58) 0%, rgba(7,19,14,.28) 40%, rgba(7,19,14,.9) 100%)" }} />
          <div className="relative px-6 pb-12 pt-24">
            <Reveal>
              <Eyebrow tone="dark">{pages.consortium.title}</Eyebrow>
              <SceneTitle tone="light" size="lg">{pages.consortium.lead.split(".")[0]}.</SceneTitle>
              <SceneText tone="light">{pages.consortium.lead}</SceneText>
              <div className="mt-7">
                <SceneCta href={`${p("/contact")}?form=partnership`} tone="green">{dict.forms.configs.partnership.submit}</SceneCta>
              </div>
            </Reveal>
          </div>
        </section>

        {/* 9 — Contact: existing contact content + working form (dark green) */}
        <section className="relative flex min-h-[100svh] flex-col justify-end overflow-hidden bg-[#14271e]">
          <div aria-hidden className="photo-layer absolute inset-0 overflow-hidden opacity-25">
            <Image src="/images/router-field.png" alt="" fill loading="lazy" sizes="100vw" className="object-cover" />
          </div>
          <div aria-hidden className="absolute inset-0 bg-[linear-gradient(180deg,rgba(20,39,30,.9),rgba(20,39,30,.6)_55%,rgba(20,39,30,.92)_100%)]" />
          <div className="relative px-6 pb-10 pt-28">
            <Reveal>
              <Eyebrow tone="dark">{dict.nav.contact}</Eyebrow>
              <div className="mt-5 rounded-2xl border border-white/10 bg-[#f8f7f2]/[0.97] p-6">
                <LeadForm
                  config={contactForm}
                  receivedLabel={dict.forms.received}
                  sendingLabel={dict.ui.sending}
                />
              </div>
              <div className="mt-10 flex items-center justify-center gap-3 text-[#d5b36d]">
                <span className="text-[10px] font-semibold uppercase tracking-[0.28em]">{dict.brand.promise}</span>
              </div>
            </Reveal>
          </div>
        </section>
      </main>
      <SiteFooter dict={dict} locale={locale} />
    </div>
  );
}
