import Image from "next/image";
import Link from "next/link";
import type { ReactNode } from "react";
import type { Dictionary, Locale } from "@/data/dictionaries";
import { SiteHeader, SiteFooter } from "@/components/layout/SiteChrome";
import { Reveal } from "@/components/ui/Reveal";
import { LeadForm, type FormConfig } from "@/components/forms/LeadForm";
import { IconCarbonLeaf, IconEarth, IconSheaf, IconSprout } from "@/components/ui/icons";
import { formatBatchCount } from "@/data/pricing";

/**
 * Premium mobile-first landing — a stack of full-bleed visual scenes
 * (see the approved reference). Rendered below lg only; desktop keeps
 * the existing HomeLanding composition untouched.
 */

const GOLD = "bg-[linear-gradient(135deg,#ead09f,#c99f61)] text-[#221a0c]";
const DARK_OVERLAY =
  "linear-gradient(180deg, rgba(7,19,14,.55) 0%, rgba(7,19,14,.18) 34%, rgba(7,19,14,.62) 66%, rgba(7,19,14,.94) 100%)";
const MOTO = ["A cleaner", "greener", "stronger", "tomorrow"];

function GoldCta({ href, children, locale }: { href: string; children: ReactNode; locale: Locale }) {
  return (
    <Link
      href={href}
      className={`cta-modern ${locale === "he" ? "text-right" : ""} flex min-h-[52px] w-full items-center justify-center gap-3 rounded-full px-7 text-[11px] font-semibold uppercase tracking-[0.18em] ${GOLD} transition-transform hover:-translate-y-0.5`}
    >
      {children}
      <span aria-hidden>→</span>
    </Link>
  );
}

function GhostCta({ href, children }: { href: string; children: ReactNode }) {
  return (
    <Link
      href={href}
      className="cta-modern flex min-h-[52px] w-full items-center justify-center gap-3 rounded-full border border-white/45 bg-white/5 px-7 text-[11px] font-semibold uppercase tracking-[0.18em] text-[#f3efe2] transition-colors hover:bg-white/15"
    >
      {children}
      <span aria-hidden>→</span>
    </Link>
  );
}

function LabelRow({ items }: { items: readonly string[] }) {
  return (
    <div className="flex flex-wrap items-center justify-center gap-x-3 gap-y-1 text-[9px] font-semibold uppercase tracking-[0.22em] text-[#f3efe2]/90">
      {items.map((x, i) => (
        <span key={x} className="flex items-center gap-3">
          {i > 0 && <span aria-hidden className="h-3 w-px bg-white/35" />}
          {x}
        </span>
      ))}
    </div>
  );
}

function Scene({
  image,
  children,
  priority = false,
  overlay = DARK_OVERLAY,
  className = "",
}: {
  image: string;
  children: ReactNode;
  priority?: boolean;
  overlay?: string;
  className?: string;
}) {
  return (
    <section className={`relative flex min-h-[100svh] flex-col overflow-hidden ${className}`}>
      <div aria-hidden className="photo-layer absolute inset-0 overflow-hidden">
        <Image
          src={image}
          alt=""
          fill
          priority={priority}
          loading={priority ? undefined : "lazy"}
          sizes="100vw"
          className="object-cover"
        />
      </div>
      <div aria-hidden className="absolute inset-0" style={{ background: overlay }} />
      <div className="relative mt-auto px-6 pb-12 pt-28">{children}</div>
    </section>
  );
}

export function MobileLanding({ dict, locale }: { dict: Dictionary; locale: Locale }) {
  const m = dict.mobile;
  const p = (path: string) => `/${locale}${path}`;
  const pointIcons = [IconSprout, IconEarth, IconSheaf];

  const contactForm: FormConfig = {
    type: "general",
    title: m.contactTitle,
    description: m.contactText,
    submitLabel: m.contactSubmit,
    successMessage: dict.forms.configs.commercial.success,
    kickerLabel: "",
    fields: [
      { kind: "text", name: "name", label: dict.forms.fields.name, required: true },
      { kind: "email", name: "email", label: dict.forms.fields.email, required: true },
      { kind: "text", name: "company", label: dict.forms.fields.company },
    ],
  };

  return (
    <div className="mobile-landing lg:hidden">
      <SiteHeader dict={dict} locale={locale} />
      <main className="landing-main min-h-svh bg-[#0b1712] text-[#f3efe2]">
        {/* 1 — Hero */}
        <Scene image="/images/m-hero-plants.png" priority>
          <Reveal>
            <p className="text-[10px] font-semibold uppercase tracking-[0.3em] text-[#d5b36d]">{m.heroEyebrow}</p>
            <h1 className="mt-4 font-serif text-[clamp(2.9rem,13.5vw,4.6rem)] font-normal uppercase leading-[1.02] tracking-[-0.01em]">
              {dict.home.hero.titleLines[0]}
              <br />
              {dict.home.hero.titleLines[1]}
            </h1>
            <p className="mt-4 max-w-md text-[16px] leading-relaxed text-[#e9e4d5]/90">{m.heroSubtitle}</p>
            <div className="mt-7">
              <GoldCta href={p("/contact")} locale={locale}>{m.heroCta}</GoldCta>
            </div>
            <div aria-hidden className="mt-10 flex items-end justify-between text-stone-300">
              <span className="flex items-center gap-3 text-[10px] font-semibold uppercase tracking-[0.3em]">
                <span className="animate-drift-up text-base leading-none">↓</span>
                {m.scrollCue}
              </span>
              <span className="text-right text-[9px] font-medium uppercase leading-[1.6] tracking-[0.24em] text-stone-300/80">
                Nature<br />People<br />Progress
              </span>
            </div>
          </Reveal>
        </Scene>

        {/* 2 — Rhizomes available */}
        <Scene image="/images/m-rhizomes-hands.png">
          <Reveal>
            <p className="text-[10px] font-semibold uppercase tracking-[0.3em] text-[#d5b36d]">{m.rhizomesEyebrow}</p>
            <p className="mt-4 font-serif text-[clamp(3rem,15vw,4.6rem)] leading-none text-[#ead09f]">{formatBatchCount(locale)}</p>
            <p className="mt-2 font-serif text-2xl uppercase leading-tight text-[#f3efe2]">{dict.home.rhizomes.counterTitle}</p>
            <ul className="mt-7 grid gap-3.5">
              {m.points.map((point, i) => {
                const I = pointIcons[i % pointIcons.length];
                return (
                  <li key={point} className="flex items-center gap-4 border-t border-white/15 pt-3 text-[15px] text-[#e9e4d5]">
                    <I className="h-5 w-5 shrink-0 text-[#d5b36d]" aria-hidden />
                    {point}
                  </li>
                );
              })}
            </ul>
            <div className="mt-8">
              <GhostCta href={p("/buy-rhizomes")}>{m.rhizomesCta}</GhostCta>
            </div>
          </Reveal>
        </Scene>

        {/* 3 — About / purpose */}
        <Scene image="/images/m-field-mist.png">
          <Reveal>
            <p className="text-[10px] font-semibold uppercase tracking-[0.3em] text-[#d5b36d]">{m.aboutEyebrow}</p>
            <h2 className="mt-4 font-serif text-[clamp(1.9rem,8.5vw,2.9rem)] font-normal leading-[1.1] text-[#f3efe2]">{m.aboutTitle}</h2>
            <p className="mt-4 max-w-md text-[16px] leading-relaxed text-[#e9e4d5]/90">{m.aboutText}</p>
            <div className="mt-7 flex items-end justify-between gap-6">
              <div className="w-full max-w-[240px]">
                <GoldCta href={p("/about")} locale={locale}>{m.aboutCta}</GoldCta>
              </div>
              <span aria-hidden className="text-right text-[9px] font-medium uppercase leading-[1.7] tracking-[0.24em] text-stone-300/80">
                {MOTO[0]}<br />{MOTO[1]}<br />{MOTO[2]}<br />{MOTO[3]}
              </span>
            </div>
          </Reveal>
        </Scene>

        {/* 4 — Land restoration (cream) */}
        <section className="relative flex min-h-[100svh] flex-col overflow-hidden bg-[#f8f7f2] text-[#15241d]">
          <div className="relative flex flex-1 flex-col justify-end px-6 pb-10 pt-28">
            <Reveal>
              <p className="text-[10px] font-semibold uppercase tracking-[0.3em] text-[#8a6a2f]">{m.landEyebrow}</p>
              <h2 className="mt-4 max-w-md font-serif text-[clamp(1.9rem,8.5vw,2.9rem)] font-normal leading-[1.12]">{m.landTitle}</h2>
              <p className="mt-4 max-w-md text-[16px] leading-relaxed text-[#34463d]">{m.landText}</p>
              <div className="mt-7 max-w-[240px]">
                <GoldCta href={p("/regional-pilots")} locale={locale}>{m.landCta}</GoldCta>
              </div>
            </Reveal>
          </div>
          <div aria-hidden className="photo-layer relative h-[42svh] overflow-hidden">
            <Image src="/images/m-land-rebirth.png" alt="" fill loading="lazy" sizes="100vw" className="object-cover" />
          </div>
        </section>

        {/* 5 — Agronomic support (cream, photo bottom with labels) */}
        <section className="relative flex min-h-[100svh] flex-col overflow-hidden bg-[#f8f7f2] text-[#15241d]">
          <div className="relative flex flex-1 flex-col justify-end px-6 pb-10 pt-28">
            <Reveal>
              <p className="text-[10px] font-semibold uppercase tracking-[0.3em] text-[#8a6a2f]">{m.agroEyebrow}</p>
              <h2 className="mt-4 max-w-md font-serif text-[clamp(1.9rem,8.5vw,2.9rem)] font-normal leading-[1.12]">{m.agroTitle}</h2>
              <p className="mt-4 max-w-md text-[16px] leading-relaxed text-[#34463d]">{m.agroText}</p>
              <div className="mt-7 max-w-[240px]">
                <GoldCta href={p("/agronomic-support")} locale={locale}>{m.agroCta}</GoldCta>
              </div>
            </Reveal>
          </div>
          <div className="relative flex h-[44svh] flex-col justify-end overflow-hidden">
            <Image src="/images/m-grass-sun.png" alt="" fill loading="lazy" sizes="100vw" className="object-cover" />
            <div aria-hidden className="absolute inset-0 bg-[linear-gradient(180deg,rgba(7,19,14,0)_45%,rgba(7,19,14,.72)_100%)]" />
            <div className="relative pb-6 pt-16">
              <LabelRow items={m.agroLabels} />
            </div>
          </div>
        </section>

        {/* 6 — Climate impact */}
        <Scene image="/images/m-forest-mist.png">
          <Reveal>
            <p className="text-[10px] font-semibold uppercase tracking-[0.3em] text-[#d5b36d]">{m.climateEyebrow}</p>
            <h2 className="mt-4 max-w-md font-serif text-[clamp(1.9rem,8.5vw,2.9rem)] font-normal leading-[1.12] text-[#f3efe2]">{m.climateTitle}</h2>
            <p className="mt-4 max-w-md text-[16px] leading-relaxed text-[#e9e4d5]/90">{m.climateText}</p>
            <div className="mt-7 max-w-[260px]">
              <GoldCta href={p("/carbon")} locale={locale}>{m.climateCta}</GoldCta>
            </div>
            <div className="mt-9 grid grid-cols-3 gap-4 border-t border-white/20 pt-6 text-center">
              {m.climateStats.map((stat, i) => (
                <div key={stat} className="flex flex-col items-center gap-2">
                  <span className="font-serif text-xl text-[#ead09f]">{i === 0 ? "CO₂" : i === 1 ? "♻" : "✚"}</span>
                  <span className="text-[9px] font-medium uppercase leading-[1.5] tracking-[0.18em] text-[#e9e4d5]/85">{stat}</span>
                </div>
              ))}
            </div>
          </Reveal>
        </Scene>

        {/* 7 — Industry & offtake */}
        <Scene image="/images/m-bales.png">
          <Reveal>
            <p className="text-[10px] font-semibold uppercase tracking-[0.3em] text-[#d5b36d]">{m.industryEyebrow}</p>
            <h2 className="mt-4 max-w-md font-serif text-[clamp(1.9rem,8.5vw,2.9rem)] font-normal leading-[1.12] text-[#f3efe2]">{m.industryTitle}</h2>
            <p className="mt-4 max-w-md text-[16px] leading-relaxed text-[#e9e4d5]/90">{m.industryText}</p>
            <div className="mt-7 max-w-[240px]">
              <GoldCta href={p("/industry-offtake")} locale={locale}>{m.industryCta}</GoldCta>
            </div>
            <div className="mt-9 border-t border-white/20 pt-5">
              <LabelRow items={m.industryLabels} />
            </div>
          </Reveal>
        </Scene>

        {/* 8 — Partnership */}
        <Scene image="/images/m-handshake.png">
          <Reveal>
            <p className="text-[10px] font-semibold uppercase tracking-[0.3em] text-[#d5b36d]">{m.partnerEyebrow}</p>
            <h2 className="mt-4 max-w-md font-serif text-[clamp(1.9rem,8.5vw,2.9rem)] font-normal leading-[1.12] text-[#f3efe2]">{m.partnerTitle}</h2>
            <p className="mt-4 max-w-md text-[16px] leading-relaxed text-[#e9e4d5]/90">{m.partnerText}</p>
            <div className="mt-7 max-w-[260px]">
              <GoldCta href={`${p("/contact")}?form=partnership`} locale={locale}>{m.partnerCta}</GoldCta>
            </div>
            <div className="mt-9 border-t border-white/20 pt-5">
              <LabelRow items={m.partnerLabels} />
            </div>
          </Reveal>
        </Scene>

        {/* 9 — Contact */}
        <section className="relative flex min-h-[100svh] flex-col justify-end overflow-hidden bg-[#14271e]">
          <div aria-hidden className="photo-layer absolute inset-0 overflow-hidden opacity-30">
            <Image src="/images/m-leaves-dark.png" alt="" fill loading="lazy" sizes="100vw" className="object-cover" />
          </div>
          <div aria-hidden className="absolute inset-0 bg-[linear-gradient(180deg,rgba(20,39,30,.88),rgba(20,39,30,.55)_55%,rgba(20,39,30,.9)_100%)]" />
          <div className="relative px-6 pb-10 pt-28">
            <Reveal>
              <p className="text-[10px] font-semibold uppercase tracking-[0.3em] text-[#d5b36d]">{m.contactEyebrow}</p>
              <div className="lead-panel mt-5 rounded-2xl border border-white/10 bg-[#f8f7f2]/[0.97] p-6">
                <LeadForm
                  config={contactForm}
                  receivedLabel={dict.forms.received}
                  sendingLabel={dict.ui.sending}
                />
              </div>
              <div className="mt-10 flex items-center justify-center gap-3 text-[#d5b36d]">
                <IconCarbonLeaf className="h-5 w-5" aria-hidden />
                <span className="text-[10px] font-semibold uppercase tracking-[0.28em]">
                  Cultivating a brighter tomorrow
                </span>
              </div>
            </Reveal>
          </div>
        </section>
      </main>
      <SiteFooter dict={dict} locale={locale} />
    </div>
  );
}
