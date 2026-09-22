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
 * Visual language from the reference: full-bleed photography with soft
 * white haze in which the interface sits ("text in the white sky").
 * Rendered below lg; desktop keeps the existing HomeLanding composition.
 */

const CREAM = "rgba(248, 247, 242, 1)";
const INK = "#15241d";
const GREEN = "#1d3b2a";

function Eyebrow({ children }: { children: ReactNode }) {
  return (
    <p className="text-[10px] font-semibold uppercase tracking-[0.3em] text-[#8a6a2f]">{children}</p>
  );
}

function SceneTitle({ children, size = "md" }: { children: ReactNode; size?: "md" | "lg" }) {
  return (
    <h2
      className={`mt-4 max-w-md font-sans font-semibold leading-[1.1] tracking-[-0.02em] text-[#15241d] ${size === "lg" ? "text-[clamp(2.2rem,9vw,3.2rem)]" : "text-[clamp(1.8rem,7.5vw,2.6rem)]"}`}
    >
      {children}
    </h2>
  );
}

function SceneText({ children }: { children: ReactNode }) {
  return <p className="mt-4 max-w-md text-[16px] leading-relaxed text-[#34463d]">{children}</p>;
}

function SceneCta({ href, children }: { href: string; children: ReactNode }) {
  return (
    <Link
      href={href}
      className="cta-modern flex min-h-[52px] w-full max-w-[300px] items-center justify-center gap-3 rounded-full bg-[#1d3b2a] px-7 text-[11px] font-semibold uppercase tracking-[0.18em] text-[#f3efe2] transition-all hover:-translate-y-0.5 hover:bg-[#27503a]"
    >
      {children}
      <span aria-hidden>→</span>
    </Link>
  );
}

function LabelRow({ items }: { items: readonly string[] }) {
  return (
    <div className="flex flex-wrap items-center justify-center gap-x-3 gap-y-1 text-[9px] font-semibold uppercase tracking-[0.22em] text-[#f3efe2]/95">
      {items.map((x, i) => (
        <span key={x} className="flex items-center gap-3">
          {i > 0 && <span aria-hidden className="h-3 w-px bg-white/40" />}
          {x}
        </span>
      ))}
    </div>
  );
}

/** Full-bleed photo with a soft white haze zone where the interface sits. */
function Photo({ src, position = "center", priority = false }: { src: string; position?: string; priority?: boolean }) {
  return (
    <div aria-hidden className="photo-layer absolute inset-0 overflow-hidden">
      <Image
        src={src}
        alt=""
        fill
        priority={priority}
        loading={priority ? undefined : "lazy"}
        sizes="100vw"
        className="object-cover"
        style={{ objectPosition: position }}
      />
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
        {/* 1 — Hero: existing hero content, sunlit photo, interface in the light */}
        <section className="relative flex min-h-[100svh] flex-col justify-end overflow-hidden">
          <Photo src="/images/hero-roots-continuous-v2.png" priority />
          <div
            aria-hidden
            className="absolute inset-0"
            style={{ background: "linear-gradient(180deg, rgba(248,247,242,.22) 0%, rgba(248,247,242,.05) 30%, rgba(7,19,14,.48) 52%, rgba(7,19,14,.62) 74%, rgba(248,247,242,.55) 92%, rgba(248,247,242,.95) 100%)" }}
          />
          <div className="relative px-6 pb-10 pt-28">
            <Reveal>
              <h1 className="max-w-[10ch] font-sans text-[clamp(2.6rem,12vw,4.4rem)] font-semibold uppercase leading-[1.0] tracking-[-0.02em] text-[#f3efe2] [text-shadow:0_2px_28px_rgba(7,19,14,.6)]">
                {h.hero.titleLines[0]}
                <br />
                {h.hero.titleLines[1]}
              </h1>
              <p className="mt-4 text-[10px] font-semibold uppercase tracking-[0.22em] text-[#ead09f]">
                Regenerative bioeconomy · Circular economy · Low-carbon industry
              </p>
              <p className="mt-4 max-w-md text-[16px] leading-relaxed text-[#f3efe2]/95 [text-shadow:0_1px_16px_rgba(7,19,14,.55)]">{h.hero.lead}</p>
              <div className="mt-7 max-w-[300px]">
                <Link href={p("/buy-rhizomes")} className="cta-modern flex min-h-[52px] w-full max-w-[300px] items-center justify-center gap-3 rounded-full bg-[linear-gradient(135deg,#ead09f,#c99f61)] px-7 text-[11px] font-semibold uppercase tracking-[0.18em] text-[#221a0c] transition-transform hover:-translate-y-0.5">
                {h.rhizomes.ctaPrimary}
                <span aria-hidden>→</span>
              </Link>
              </div>

              {/* integrated availability strip (existing counter content) */}
              <div className="mt-8 border border-white/25 bg-[rgba(20,39,30,.45)] px-6 py-5 backdrop-blur-sm">
                <p className="font-sans text-[2.4rem] font-semibold leading-none text-[#ead09f]">{formatBatchCount(locale)}</p>
                <p className="mt-1.5 text-lg font-medium uppercase leading-tight text-[#f3efe2]">{h.rhizomes.counterTitle}</p>
                <p className="mt-1.5 text-[11px] leading-snug text-[#e9e4d5]/85">{h.rhizomes.counterNote}</p>
              </div>

              <div aria-hidden className="mt-9 flex items-center gap-3 text-[10px] font-semibold uppercase tracking-[0.3em] text-[#e9e4d5]">
                <span className="animate-drift-up text-base leading-none">↓</span>
                {dict.mobile.scrollCue}
              </div>
            </Reveal>
          </div>
        </section>

        {/* 2 — About: hero continues downward into the roots, title in the white haze */}
        <section className="relative flex min-h-[100svh] flex-col justify-end overflow-hidden bg-[#0b1712]">
          <Photo src="/images/roots-soil.png" position="center" />
          <div
            aria-hidden
            className="absolute inset-0"
            style={{ background: "radial-gradient(135% 85% at 15% 100%, rgba(248,247,242,.97) 0%, rgba(248,247,242,.75) 45%, rgba(248,247,242,.25) 72%, rgba(248,247,242,0) 95%)" }}
          />
          <div className="relative px-6 pb-14 pt-24">
            <Reveal>
              <Eyebrow>{locale === "he" ? "מיסקנטוס: מהקרקע למערכת" : "Міскантус: від землі до системи"}</Eyebrow>
              <SceneTitle size="lg">{locale === "uk" ? "Від землі до системи" : locale === "he" ? "מהקרקע למערכת" : "From soil to system"}</SceneTitle>
              <SceneText>{pages.about.lead}</SceneText>
              <SceneText>{pages.technologies.lead}</SceneText>
            </Reveal>
          </div>
        </section>

        {/* 3 — Value chain: existing value-chain page content (cream scene, photo card) */}
        <section className="relative flex min-h-[100svh] flex-col justify-center overflow-hidden bg-[#f8f7f2] px-6 py-24 text-[#15241d]">
          <Reveal>
            <Eyebrow>{pages.valueChain.title}</Eyebrow>
            <SceneTitle size="lg">{pages.valueChain.lead.split(" — ")[0]}</SceneTitle>
            <SceneText>{pages.valueChain.lead}</SceneText>
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

        {/* 4 — Land restoration: existing regional pilots content (text in the sky, photo below) */}
        <section className="relative flex min-h-[100svh] flex-col overflow-hidden bg-[#f8f7f2] text-[#15241d]">
          <div className="relative flex flex-1 flex-col justify-end px-6 pb-9 pt-28">
            <Reveal>
              <Eyebrow>{pages.regionalPilots.title}</Eyebrow>
              <SceneTitle size="lg">{pages.regionalPilots.subtitle}</SceneTitle>
              <SceneText>{pages.regionalPilots.lead}</SceneText>
              <div className="mt-7 max-w-[280px]">
                <SceneCta href={p("/regional-pilots")}>{dict.forms.configs.regionalPilot.submit}</SceneCta>
              </div>
            </Reveal>
          </div>
          <div className="sky-blend relative min-h-[52svh] flex-1 overflow-hidden">
            <Image
              src="/images/agronomists-v2.png"
              alt=""
              fill
              loading="lazy"
              sizes="100vw"
              className="object-cover"
              style={{ objectPosition: "38% center" }}
            />
            <div aria-hidden className="absolute inset-0 bg-[linear-gradient(180deg,rgba(248,247,242,.9)_0%,rgba(7,19,14,0)_45%,rgba(7,19,14,.55)_100%)]" />
            <div className="absolute inset-x-0 bottom-0 pb-6">
              <LabelRow items={h.final.values.slice(0, 3)} />
            </div>
          </div>
        </section>

        {/* 5 — Agronomic support: existing content (cream, photo bottom with expertise labels) */}
        <section className="relative flex min-h-[100svh] flex-col overflow-hidden bg-[#f8f7f2] text-[#15241d]">
          <div className="relative flex flex-1 flex-col justify-end px-6 pb-9 pt-28">
            <Reveal>
              <Eyebrow>{pages.agronomicSupport.title}</Eyebrow>
              <SceneTitle size="lg">{pages.agronomicSupport.subtitle}</SceneTitle>
              <SceneText>{pages.agronomicSupport.lead}</SceneText>
              <div className="mt-7 max-w-[280px]">
                <SceneCta href={p("/agronomic-support")}>{dict.forms.configs.agronomic.submit}</SceneCta>
              </div>
            </Reveal>
          </div>
          <div className="sky-blend relative h-[42svh] overflow-hidden">
            <Image src="/images/m-agronomist.png" alt="" fill loading="lazy" sizes="100vw" className="object-cover" style={{ objectPosition: "center" }} />
            <div aria-hidden className="absolute inset-0 bg-[linear-gradient(180deg,rgba(248,247,242,.25)_0%,rgba(7,19,14,0)_40%,rgba(7,19,14,.55)_100%)]" />
            <div className="absolute inset-x-0 bottom-0 pb-6">
              <LabelRow items={pages.agronomicSupport.tools.slice(0, 3).map((t) => t.split(" ").slice(0, 2).join(" "))} />
            </div>
          </div>
        </section>

        {/* 6 — Climate: existing carbon partnership content (text in the haze, photo below) */}
        <section className="relative flex min-h-[100svh] flex-col overflow-hidden bg-[#f8f7f2] text-[#15241d]">
          <div className="relative flex flex-1 flex-col justify-end px-6 pb-9 pt-28">
            <Reveal>
              <Eyebrow>{pages.carbon.title}</Eyebrow>
              <SceneTitle size="lg">{pages.carbon.subtitle}</SceneTitle>
              <SceneText>{pages.carbon.lead}</SceneText>
              <div className="mt-7 max-w-[280px]">
                <SceneCta href={p("/carbon")}>{dict.forms.configs.carbon.submit}</SceneCta>
              </div>
            </Reveal>
          </div>
          <div className="relative min-h-[50svh] flex-1 overflow-hidden">
            <Image src="/images/science-lab.png" alt="" fill loading="lazy" sizes="100vw" className="object-cover" />
            <div aria-hidden className="absolute inset-0 bg-[linear-gradient(180deg,rgba(248,247,242,.85)_0%,rgba(7,19,14,0)_50%,rgba(7,19,14,.5)_100%)]" />
          </div>
        </section>

        {/* 7 — Equipment: existing equipment content (cream, harvester photo bottom) */}
        <section className="relative flex min-h-[100svh] flex-col overflow-hidden bg-[#f8f7f2] text-[#15241d]">
          <div className="relative flex flex-1 flex-col justify-end px-6 pb-9 pt-28">
            <Reveal>
              <Eyebrow>{pages.equipment.title}</Eyebrow>
              <SceneTitle size="lg">{pages.equipment.subtitle}</SceneTitle>
              <SceneText>{pages.equipment.lead}</SceneText>
              <div className="mt-7 max-w-[300px]">
                <SceneCta href={p("/equipment")}>{dict.forms.configs.equipment.submit}</SceneCta>
              </div>
            </Reveal>
          </div>
          <div className="sky-blend relative h-[40svh] overflow-hidden">
            <Image src="/images/equipment-harvester-v2.png" alt="" fill loading="lazy" sizes="100vw" className="object-cover" />
            <div aria-hidden className="absolute inset-0 bg-[linear-gradient(180deg,rgba(248,247,242,.2)_0%,rgba(7,19,14,0)_45%,rgba(7,19,14,.5)_100%)]" />
            <div className="absolute inset-x-0 bottom-0 pb-6">
              <LabelRow items={pages.equipment.planting} />
            </div>
          </div>
        </section>

        {/* 8 — Partnership: existing consortium content (dark, people photo) */}
        <section className="relative flex min-h-[100svh] flex-col justify-end overflow-hidden bg-[#0b1712]">
          <Photo src="/images/m-partners-field.png" position="center" />
          <div aria-hidden className="absolute inset-0" style={{ background: "linear-gradient(180deg, rgba(7,19,14,.58) 0%, rgba(7,19,14,.28) 40%, rgba(7,19,14,.9) 100%)" }} />
          <div className="relative px-6 pb-12 pt-24">
            <Reveal>
              <p className="text-[10px] font-semibold uppercase tracking-[0.3em] text-[#d5b36d]">{pages.consortium.title}</p>
              <h2 className="mt-4 max-w-md font-sans text-[clamp(2.2rem,9vw,3.2rem)] font-semibold leading-[1.08] tracking-[-0.02em] text-[#f3efe2]">
                {pages.consortium.lead.split(".")[0]}.
              </h2>
              <p className="mt-4 max-w-md text-[16px] leading-relaxed text-[#e9e4d5]/90">{pages.consortium.lead}</p>
              <div className="mt-7">
                <SceneCta href={`${p("/contact")}?form=partnership`}>{dict.forms.configs.partnership.submit}</SceneCta>
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
              <p className="text-[10px] font-semibold uppercase tracking-[0.3em] text-[#d5b36d]">{dict.nav.contact}</p>
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
