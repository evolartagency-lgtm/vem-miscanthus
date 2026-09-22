"use client";

import { useMemo, useState } from "react";
import type { Dictionary } from "@/data/dictionaries";
import { RHIZOME_BATCH, formatBatchCount } from "@/data/pricing";

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

function localeTag(locale: string): string {
  return locale === "uk" ? "uk-UA" : locale === "he" ? "he-IL" : "en-US";
}

function money(value: number, currency: string, locale: string): string {
  return `${currency}${new Intl.NumberFormat(localeTag(locale), { maximumFractionDigits: 2 }).format(value)}`;
}

/**
 * Funnel #1 order wizard: Quantity → Region suitability → Price → Delivery → Payment.
 * The final step submits an order lead; the manager confirms the batch and issues an invoice.
 */
export function RhizomeOrder({ dict }: { dict: Dictionary }) {
  const t = dict.order;
  const fmt = (v: number) => v.toLocaleString(localeTag(dict.locale));
  const [step, setStep] = useState(0);
  const [quantity, setQuantity] = useState("5000");
  const [regionType, setRegionType] = useState(t.regionOptions[0]);
  const [deliveryMethod, setDeliveryMethod] = useState(t.deliveryOptions[0]);
  const [address, setAddress] = useState("");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [comment, setComment] = useState("");
  const [website, setWebsite] = useState("");
  const [status, setStatus] = useState<"idle" | "sending" | "success" | "error">("idle");
  const [errors, setErrors] = useState<Record<string, string>>({});

  const qty = Number(quantity);
  const quantityValid = Number.isFinite(qty) && qty >= RHIZOME_BATCH.minOrder && qty <= RHIZOME_BATCH.available;
  const total = useMemo(
    () => (RHIZOME_BATCH.priceTbd || !quantityValid ? null : qty * RHIZOME_BATCH.pricePerRhizome),
    [qty, quantityValid],
  );

  const summary = (
    <dl className="grid gap-2.5 self-start border border-black/10 bg-white/70 p-5 text-[13px]">
      <div className="flex items-center justify-between gap-4">
        <dt className="shrink-0 text-ash">{t.varietyLabel}</dt>
        <dd className="text-end font-medium text-bone">{RHIZOME_BATCH.variety}</dd>
      </div>
      <div className="flex items-center justify-between gap-4">
        <dt className="shrink-0 text-ash">{t.quantityLabel}</dt>
        <dd className="text-end font-medium tabular-nums text-bone">{quantityValid ? fmt(qty) : "—"}</dd>
      </div>
      <div className="flex items-center justify-between gap-4">
        <dt className="shrink-0 text-ash">{t.regionTypeLabel}</dt>
        <dd className="text-end font-medium text-bone">{regionType}</dd>
      </div>
      <div className="flex items-center justify-between gap-4">
        <dt className="shrink-0 text-ash">{t.deliveryLabel}</dt>
        <dd className="text-end font-medium text-bone">{deliveryMethod}</dd>
      </div>
      <div className="mt-1 flex items-end justify-between gap-4 border-t border-black/10 pt-3">
        <dt className="font-semibold uppercase tracking-[0.14em] text-biomass">{t.totalLabel}</dt>
        <dd className="text-2xl font-semibold tabular-nums text-bone">
          {total === null ? <span className="text-base text-ash">{t.priceTbdLabel}</span> : money(total, RHIZOME_BATCH.currency, dict.locale)}
        </dd>
      </div>
      {!RHIZOME_BATCH.priceTbd && (
        <p className="text-[11px] leading-snug text-ash">
          {t.pricePerUnitLabel}: {money(RHIZOME_BATCH.pricePerRhizome, RHIZOME_BATCH.currency, dict.locale)} · {t.priceNote}
        </p>
      )}
    </dl>
  );

  function next() {
    if (step === 0 && !quantityValid) {
      setErrors({ quantity: `${fmt(RHIZOME_BATCH.minOrder)} – ${formatBatchCount(dict.locale)}` });
      return;
    }
    setErrors({});
    setStep((s) => Math.min(s + 1, 4));
  }

  function back() {
    setErrors({});
    setStep((s) => Math.max(s - 1, 0));
  }

  async function submit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    if (website !== "") {
      setStatus("success"); // honeypot: pretend success for bots
      return;
    }
    const errs: Record<string, string> = {};
    if (name.trim().length < 2) errs.name = "—";
    if (!EMAIL_RE.test(email)) errs.email = "—";
    if (Object.keys(errs).length > 0) {
      setErrors(errs);
      return;
    }
    setStatus("sending");
    setErrors({});
    try {
      const res = await fetch("/api/leads", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          type: "rhizome_order",
          name,
          email,
          phone,
          comment,
          quantity: quantityValid ? qty : undefined,
          regionType,
          deliveryMethod,
          orderTotal: total === null ? undefined : money(total, RHIZOME_BATCH.currency, dict.locale),
          locale: dict.locale,
          source: window.location.pathname,
        }),
      });
      if (res.status === 201 || res.status === 202) {
        setStatus("success");
        return;
      }
    } catch {
      /* network error handled below */
    }
    setStatus("error");
  }

  const inputClass =
    "w-full border border-black/15 bg-white px-4 py-3 text-sm text-bone outline-none transition-colors focus:border-biomass";
  const labelClass =
    "mb-1.5 block font-technical text-[9px] tracking-[0.3em] text-ash uppercase";

  const stepTitles = [t.stepQuantity.title, t.stepRegion.title, t.stepPrice.title, t.stepDelivery.title, t.stepPayment.title];
  const stepLeads = [t.stepQuantity.lead, t.stepRegion.lead, t.stepPrice.lead, t.stepDelivery.lead, t.stepPayment.lead];

  if (status === "success") {
    return (
      <div className="border border-black/10 bg-white/85 p-8 text-center sm:p-12" id="order">
        <p className="font-technical text-[10px] tracking-[0.4em] text-biomass">{t.successTitle}</p>
        <p className="mx-auto mt-4 max-w-xl text-sm leading-relaxed text-sage">{t.successText}</p>
        <div className="mx-auto mt-8 max-w-md text-start">{summary}</div>
      </div>
    );
  }

  return (
    <form
      onSubmit={submit}
      noValidate
      className="border border-black/10 bg-white/85 p-6 backdrop-blur-md sm:p-8"
      id="order"
    >
      <div className="flex flex-wrap items-center gap-x-3 gap-y-2">
        <span className="rounded-full border border-biomass/50 bg-biomass/10 px-3.5 py-1 text-[10px] font-semibold uppercase tracking-[0.18em] text-biomass">
          {t.badge}
        </span>
        <span className="font-technical text-[10px] tracking-[0.2em] text-ash">
          {formatBatchCount(dict.locale)} {t.availableLabel}
        </span>
      </div>

      <ol className="mt-6 grid grid-cols-5 gap-1.5">
        {t.steps.map((label, i) => (
          <li key={label} className="flex flex-col gap-1.5">
            <span aria-hidden className={`h-1 w-full ${i <= step ? "bg-biomass" : "bg-black/10"}`} />
            <span className={`text-[10px] font-semibold uppercase tracking-[0.08em] sm:text-[11px] ${i === step ? "text-biomass" : i < step ? "text-bone" : "text-ash/70"}`}>
              {i + 1}. {label}
            </span>
          </li>
        ))}
      </ol>

      <div className="mt-8 grid gap-8 lg:grid-cols-[1fr_320px] lg:gap-12">
        <div>
          <h3 className="text-xl font-semibold tracking-tight text-bone sm:text-2xl">{stepTitles[step]}</h3>
          <p className="mt-2 max-w-lg text-xs leading-relaxed text-sage">{stepLeads[step]}</p>

          {step === 0 && (
            <div className="mt-6">
              <label className={labelClass} htmlFor="order-qty">{t.quantityLabel}</label>
              <input
                id="order-qty"
                type="number"
                min={RHIZOME_BATCH.minOrder}
                max={RHIZOME_BATCH.available}
                step={RHIZOME_BATCH.step}
                value={quantity}
                onChange={(e) => setQuantity(e.target.value)}
                className={`${inputClass} max-w-[240px] tabular-nums`}
              />
              <div className="mt-3 flex flex-wrap gap-2">
                {[1_000, 5_000, 10_000, RHIZOME_BATCH.available].map((v) => (
                  <button
                    key={v}
                    type="button"
                    onClick={() => { setQuantity(String(v)); setErrors({}); }}
                    className={`rounded-full border px-4 py-2 text-[11px] font-semibold tabular-nums transition-colors ${quantity === String(v) ? "border-biomass bg-biomass text-[#f9f6ee]" : "border-black/15 bg-white text-bone hover:border-biomass/60"}`}
                  >
                    {fmt(v)}
                  </button>
                ))}
              </div>
              <p className="mt-3 text-[11px] text-ash">
                {t.ofLabel} {formatBatchCount(dict.locale)} {t.availableLabel} · {RHIZOME_BATCH.variety}
              </p>
              {errors.quantity && <p className="mt-1 text-[11px] text-[#c98a7d]">{errors.quantity}</p>}
            </div>
          )}

          {step === 1 && (
            <div className="mt-6">
              <span className={labelClass}>{t.regionTypeLabel}</span>
              <div className="flex flex-col gap-2">
                {t.regionOptions.map((opt, i) => (
                  <label key={opt} className={`flex cursor-pointer items-center gap-3 border px-4 py-3 text-[13px] transition-colors ${regionType === opt ? "border-biomass bg-biomass/10" : "border-black/10 bg-white hover:border-biomass/50"}`}>
                    <input type="radio" name="regionType" className="accent-[#a2762e]" checked={regionType === opt} onChange={() => setRegionType(opt)} />
                    <span className="text-bone">{opt}</span>
                    {i === 0 && (
                      <span className="ms-auto shrink-0 rounded-full border border-biomass/40 bg-biomass/10 px-2.5 py-1 text-[9px] font-semibold uppercase tracking-[0.12em] text-biomass">
                        {t.aridNote.split("—")[0].trim()}
                      </span>
                    )}
                  </label>
                ))}
              </div>
            </div>
          )}

          {step === 2 && (
            <div className="mt-6 grid gap-3 sm:grid-cols-2">
              <div className="border border-black/10 bg-white p-5">
                <p className={labelClass}>{t.pricePerUnitLabel}</p>
                <p className="text-xl font-semibold tabular-nums text-bone">
                  {RHIZOME_BATCH.priceTbd ? t.priceTbdLabel : money(RHIZOME_BATCH.pricePerRhizome, RHIZOME_BATCH.currency, dict.locale)}
                </p>
              </div>
              <div className="border border-biomass/40 bg-biomass/10 p-5">
                <p className={labelClass}>{t.totalLabel}</p>
                <p className="text-xl font-semibold tabular-nums text-bone">
                  {total === null ? t.priceTbdLabel : money(total, RHIZOME_BATCH.currency, dict.locale)}
                </p>
              </div>
              <p className="text-[11px] leading-snug text-ash sm:col-span-2">{t.priceNote}</p>
            </div>
          )}

          {step === 3 && (
            <div className="mt-6">
              <label className={labelClass} htmlFor="order-delivery">{t.deliveryLabel}</label>
              <select id="order-delivery" value={deliveryMethod} onChange={(e) => setDeliveryMethod(e.target.value)} className={inputClass}>
                {t.deliveryOptions.map((o) => <option key={o} value={o}>{o}</option>)}
              </select>
              <label className={`${labelClass} mt-5`} htmlFor="order-address">{t.addressLabel}</label>
              <input id="order-address" type="text" value={address} onChange={(e) => setAddress(e.target.value)} className={inputClass} />
            </div>
          )}

          {step === 4 && (
            <div className="mt-6">
              <div className="grid gap-4 sm:grid-cols-2">
                <div>
                  <label className={labelClass} htmlFor="order-name">{t.nameLabel} *</label>
                  <input id="order-name" type="text" value={name} onChange={(e) => setName(e.target.value)} className={inputClass} />
                  {errors.name && <p className="mt-1 text-[11px] text-[#c98a7d]">—</p>}
                </div>
                <div>
                  <label className={labelClass} htmlFor="order-email">{t.emailLabel} *</label>
                  <input id="order-email" type="email" value={email} onChange={(e) => setEmail(e.target.value)} className={inputClass} />
                  {errors.email && <p className="mt-1 text-[11px] text-[#c98a7d]">—</p>}
                </div>
                <div>
                  <label className={labelClass} htmlFor="order-phone">{t.phoneLabel}</label>
                  <input id="order-phone" type="tel" value={phone} onChange={(e) => setPhone(e.target.value)} className={inputClass} />
                </div>
                <div>
                  <label className={labelClass} htmlFor="order-comment">{t.commentLabel}</label>
                  <input id="order-comment" type="text" value={comment} onChange={(e) => setComment(e.target.value)} className={inputClass} />
                </div>
              </div>
              <p className="mt-4 text-[11px] leading-snug text-ash">{t.paymentNote}</p>
            </div>
          )}

          <div className="mt-8 flex items-center gap-3">
            {step > 0 && (
              <button type="button" onClick={back} className="rounded-full border border-black/15 bg-white px-6 py-3.5 text-[10px] font-semibold uppercase tracking-[0.2em] text-bone transition-colors hover:border-biomass/60">
                {t.backCta}
              </button>
            )}
            {step < 4 && (
              <button
                type="button"
                onClick={next}
                className="cta-modern rounded-full border border-biomass/80 bg-[linear-gradient(135deg,#ead09f,#c99f61)] px-8 py-3.5 text-[10px] font-semibold uppercase tracking-[0.2em] text-[#221a0c] shadow-[0_10px_34px_rgba(164,118,47,.22)] transition-all hover:-translate-y-0.5"
              >
                {t.nextCta}
              </button>
            )}
            {step === 4 && (
              <button
                type="submit"
                disabled={status === "sending"}
                className="cta-modern rounded-full border border-biomass/80 bg-[linear-gradient(135deg,#ead09f,#c99f61)] px-8 py-3.5 text-[10px] font-semibold uppercase tracking-[0.2em] text-[#221a0c] shadow-[0_10px_34px_rgba(164,118,47,.22)] transition-all hover:-translate-y-0.5 disabled:opacity-50"
              >
                {status === "sending" ? t.sendingCta : t.payCta}
              </button>
            )}
            {status === "error" && <p className="text-[11px] text-[#c98a7d]">—</p>}
          </div>
        </div>

        {summary}
      </div>

      {/* honeypot */}
      <input
        type="text"
        name="website"
        tabIndex={-1}
        autoComplete="off"
        aria-hidden
        className="hidden"
        value={website}
        onChange={(e) => setWebsite(e.target.value)}
      />
    </form>
  );
}
