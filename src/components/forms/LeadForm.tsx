"use client";

import { useState } from "react";
import type { LeadType } from "@/lib/leads";

type Field =
  | { kind: "text"; name: string; label: string; required?: boolean }
  | { kind: "email"; name: string; label: string; required?: boolean }
  | { kind: "tel"; name: string; label: string; required?: boolean }
  | { kind: "number"; name: string; label: string; min?: number; max?: number; required?: boolean }
  | { kind: "select"; name: string; label: string; options: string[]; required?: boolean }
  | { kind: "checkbox"; name: string; label: string }
  | { kind: "textarea"; name: string; label: string; required?: boolean };

export interface FormConfig {
  type: LeadType;
  title: string;
  description?: string;
  submitLabel: string;
  successMessage: string;
  fields: Field[];
}

const inputClass =
  "w-full border-0 border-b border-white/15 bg-transparent px-0 py-3.5 text-sm text-bone placeholder:text-ash/60 outline-none transition-colors focus:border-biomass";
const labelClass =
  "mb-1 block text-[9px] font-semibold tracking-[0.22em] text-ash uppercase";

export function LeadForm({
  config,
  receivedLabel = "REQUEST RECEIVED",
  sendingLabel = "SENDING…",
}: {
  config: FormConfig;
  receivedLabel?: string;
  sendingLabel?: string;
}) {
  const [values, setValues] = useState<Record<string, string | boolean>>({});
  const [status, setStatus] = useState<"idle" | "sending" | "success" | "error">("idle");
  const [errors, setErrors] = useState<Record<string, string>>({});

  const set = (name: string, value: string | boolean) =>
    setValues((v) => ({ ...v, [name]: value }));

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setStatus("sending");
    setErrors({});

    const res = await fetch("/api/leads", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ ...values, type: config.type, source: window.location.pathname }),
    });

    if (res.status === 201 || res.status === 202) {
      setStatus("success");
      return;
    }
    try {
      const data = (await res.json()) as { errors?: Record<string, string> };
      setErrors(data.errors ?? {});
    } catch {
      setErrors({ _form: "Something went wrong. Please try again." });
    }
    setStatus("error");
  }

  if (status === "success") {
    return (
      <div className="border-l border-biomass bg-white/[0.025] p-10 text-center">
        <p className="font-technical text-[10px] tracking-[0.4em] text-biomass">
          {receivedLabel}
        </p>
        <p className="mt-4 text-sm leading-relaxed text-sage">{config.successMessage}</p>
      </div>
    );
  }

  return (
    <form onSubmit={onSubmit} noValidate className="mt-24 grid w-full gap-10 border-t border-white/[0.07] pt-8 lg:grid-cols-[280px_1fr] lg:gap-16">
      <div><p className="mb-3 text-[9px] font-semibold uppercase tracking-[.25em] text-biomass">{config.type}</p><h2 className="text-2xl font-medium tracking-[-.03em] text-bone sm:text-3xl">
        {config.title}
      </h2>
      {config.description && (
        <p className="mt-3 max-w-lg text-sm leading-relaxed text-sage">
          {config.description}
        </p>
      )}</div>

      <div><div className="grid grid-cols-1 gap-x-8 gap-y-6 sm:grid-cols-2">
        {config.fields.map((f) => (
          <div
            key={f.name}
            className={f.kind === "textarea" || f.kind === "checkbox" ? "sm:col-span-2" : ""}
          >
            {f.kind === "checkbox" ? (
              <label className="flex cursor-pointer items-center gap-3 py-2">
                <input
                  type="checkbox"
                  checked={values[f.name] === true}
                  onChange={(e) => set(f.name, e.target.checked)}
                  className="h-4 w-4 accent-[#7fa88b]"
                />
                <span className="text-xs tracking-[0.1em] text-sage">{f.label}</span>
              </label>
            ) : (
              <>
                <label className={labelClass} htmlFor={`${config.type}-${f.name}`}>
                  {f.label}
                  {f.required ? " *" : ""}
                </label>
                {f.kind === "select" ? (
                  <select
                    id={`${config.type}-${f.name}`}
                    value={String(values[f.name] ?? "")}
                    onChange={(e) => set(f.name, e.target.value)}
                    className={inputClass}
                  >
                    <option value="">—</option>
                    {f.options.map((o) => (
                      <option key={o} value={o}>
                        {o}
                      </option>
                    ))}
                  </select>
                ) : f.kind === "textarea" ? (
                  <textarea
                    id={`${config.type}-${f.name}`}
                    rows={4}
                    value={String(values[f.name] ?? "")}
                    onChange={(e) => set(f.name, e.target.value)}
                    className={inputClass}
                  />
                ) : (
                  <input
                    id={`${config.type}-${f.name}`}
                    type={f.kind}
                    min={"min" in f ? f.min : undefined}
                    max={"max" in f ? f.max : undefined}
                    required={f.required}
                    value={String(values[f.name] ?? "")}
                    onChange={(e) => set(f.name, e.target.value)}
                    className={inputClass}
                  />
                )}
                {errors[f.name] && (
                  <p className="mt-1 text-[11px] text-[#c98a7d]">{errors[f.name]}</p>
                )}
              </>
            )}
          </div>
        ))}
      </div>

      {/* honeypot */}
      <input
        type="text"
        name="website"
        tabIndex={-1}
        autoComplete="off"
        aria-hidden
        className="hidden"
        onChange={(e) => set("website", e.target.value)}
      />

      {errors._form && <p className="mt-4 text-[11px] text-[#c98a7d]">{errors._form}</p>}

      <button
        type="submit"
        disabled={status === "sending"}
        className="cta-modern mt-10 rounded-full border border-biomass/80 bg-[linear-gradient(135deg,#ead09f,#c99f61)] px-8 py-4 text-[10px] font-semibold tracking-[0.2em] text-[#221a0c] uppercase shadow-[0_10px_34px_rgba(164,118,47,.22)] transition-all hover:-translate-y-0.5 hover:shadow-[0_14px_42px_rgba(164,118,47,.32)] disabled:opacity-50"
      >
        {status === "sending" ? sendingLabel : config.submitLabel}
      </button></div>
    </form>
  );
}
