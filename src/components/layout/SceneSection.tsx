import type { ReactNode } from "react";
import { Reveal, CtaLink } from "@/components/ui/Reveal";
import { IconCheckCircle } from "@/components/ui/icons";

export function TickList({ items }: { items: readonly string[] }) {
  return (
    <ul className="grid gap-x-8 gap-y-2 sm:grid-cols-2">
      {items.map((item) => (
        <li key={item} className="flex items-start gap-2.5 text-sm leading-relaxed text-stone-700">
          <IconCheckCircle className="mt-0.5 h-4 w-4 shrink-0 text-[#1d3b2a]" />
          <span>{item}</span>
        </li>
      ))}
    </ul>
  );
}

export function Panel({ children, className = "" }: { children: ReactNode; className?: string }) {
  return (
    <div className={`border border-black/10 bg-white/85 p-6 backdrop-blur-md sm:p-8 ${className}`}>
      {children}
    </div>
  );
}

export function SceneSection({
  num,
  eyebrow,
  title,
  lead,
  image,
  imagePosition = "center",
  children,
  cta,
  href,
  compact = false,
  wide = false,
  titleAs = "h1",
  titleUppercase = true,
  cornerLeft,
  cornerRight,
}: {
  num: string;
  eyebrow: string;
  title: string;
  lead?: string;
  image: string;
  imagePosition?: string;
  children?: ReactNode;
  cta?: string;
  href?: string;
  compact?: boolean;
  wide?: boolean;
  titleAs?: "h1" | "h2";
  titleUppercase?: boolean;
  cornerLeft?: string;
  cornerRight?: string;
}) {
  const Title = titleAs;
  const displayTitle = title.replace(/\./g, "");
  return (
    <section
      id={`section-${num}`}
      className={`scene-section relative flex items-end overflow-hidden lg:items-center ${compact ? "min-h-[560px]" : "min-h-[720px]"}`}
    >
      <div
        aria-hidden
        className="absolute inset-0 bg-cover brightness-[.98] saturate-[1.02] contrast-[1.02] transition-transform duration-[1800ms] ease-out motion-safe:scale-[1.015]"
        style={{ backgroundImage: `url(${image})`, backgroundPosition: imagePosition }}
      />
      <div
        aria-hidden
        className="absolute inset-0 bg-[linear-gradient(180deg,rgba(248,247,242,0)_0%,rgba(248,247,242,0)_30%,rgba(248,247,242,.6)_52%,rgba(248,247,242,.98)_72%)] lg:bg-[linear-gradient(90deg,rgba(248,247,242,.98)_0%,rgba(248,247,242,.95)_34%,rgba(248,247,242,.52)_58%,rgba(248,247,242,.04)_82%)]"
      />
      <div
        aria-hidden
        className="absolute inset-0 bg-[linear-gradient(180deg,rgba(255,255,255,.10),transparent_32%,rgba(248,247,242,.14))]"
      />
      <div aria-hidden className="scene-grain absolute inset-0 opacity-15" />
      <div
        aria-hidden
        className="absolute bottom-7 left-6 hidden max-w-[220px] text-[10px] font-medium uppercase leading-5 tracking-[.28em] text-biomass sm:block lg:left-14"
      >
        {cornerLeft}
      </div>
      <div
        aria-hidden
        className="absolute bottom-7 right-6 hidden items-center gap-3 font-technical text-[9px] tracking-[.18em] text-stone-500 sm:flex lg:right-14"
      >
        <span className="h-px w-16 bg-black/25" />
        <span>{cornerRight ?? num}</span>
      </div>
      <div className="relative mx-auto w-full max-w-[1440px] px-6 py-24 sm:px-10 lg:px-14">
        <Reveal className="max-w-[820px]">
          <div className="mb-6 flex items-center gap-4 text-biomass">
            <span className="font-sans text-xl font-light">{num}</span>
            <span aria-hidden className="h-px w-8 bg-biomass/75" />
            <span className="text-[10px] font-semibold uppercase tracking-[0.28em] text-[#264b3a]">
              {eyebrow}
            </span>
          </div>
          <Title
            className={`section-title max-w-[760px] font-serif text-[clamp(2.1rem,7.5vw,4.6rem)] font-normal lg:text-[clamp(2.5rem,4.4vw,4.6rem)] leading-[1.04] tracking-[-0.01em] text-[#15241d] ${titleUppercase ? "lg:uppercase" : ""}`}
          >
            {displayTitle}
          </Title>
          {lead && (
            <p className="mt-6 max-w-xl border-l border-[#153c2b]/20 pl-5 text-[15px] leading-7 text-[#34463d] sm:text-base">
              {lead}
            </p>
          )}
        </Reveal>
        {children && (
          <Reveal delay={0.12} className={`mt-8 ${wide ? "max-w-5xl" : "max-w-2xl"}`}>
            {children}
          </Reveal>
        )}
        {cta && href && (
          <Reveal delay={0.2} className="mt-9">
            <CtaLink href={href} className="w-full justify-center sm:w-auto">
              {cta}
              <span aria-hidden>→</span>
            </CtaLink>
          </Reveal>
        )}
      </div>
    </section>
  );
}
