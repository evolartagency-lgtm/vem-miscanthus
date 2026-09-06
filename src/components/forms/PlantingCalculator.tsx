"use client";

import { useMemo, useState } from "react";
import type { Dictionary } from "@/data/dictionaries";

/**
 * Hectares ↔ rhizomes estimator.
 * Planting density is entered by the user according to their agronomic plan —
 * the platform does not publish unverified agronomic figures.
 */
export function PlantingCalculator({ dict }: { dict: Dictionary }) {
  const t = dict.ui;
  const [hectares, setHectares] = useState("10");
  const [density, setDensity] = useState("10000");

  const result = useMemo(() => {
    const ha = Number(hectares);
    const d = Number(density);
    if (!Number.isFinite(ha) || !Number.isFinite(d) || ha <= 0 || d <= 0) return null;
    return Math.round(ha * d);
  }, [hectares, density]);

  const inputClass =
    "w-full border border-moss/70 bg-carbon px-4 py-3 text-sm text-bone outline-none transition-colors focus:border-biomass";
  const labelClass =
    "mb-1.5 block font-technical text-[9px] tracking-[0.3em] text-ash uppercase";

  return (
    <div className="border border-moss/60 p-6 sm:p-8" id="calculator">
      <h3 className="text-lg font-semibold tracking-tight text-bone">
        {t.calculatorTitle}
      </h3>
      <p className="mt-2 text-xs leading-relaxed text-sage">{t.calculatorLead}</p>

      <div className="mt-6 grid grid-cols-1 gap-5 sm:grid-cols-2">
        <div>
          <label className={labelClass} htmlFor="calc-ha">
            {t.calcHa}
          </label>
          <input
            id="calc-ha"
            type="number"
            min={0}
            value={hectares}
            onChange={(e) => setHectares(e.target.value)}
            className={inputClass}
          />
        </div>
        <div>
          <label className={labelClass} htmlFor="calc-density">
            {t.calcDensity}
          </label>
          <input
            id="calc-density"
            type="number"
            min={0}
            value={density}
            onChange={(e) => setDensity(e.target.value)}
            className={inputClass}
          />
        </div>
      </div>

      <div className="mt-8 border-t border-moss/50 pt-6">
        <p className="font-technical text-[9px] tracking-[0.35em] text-ash">
          {t.estimate}
        </p>
        <p className="mt-2 text-3xl font-semibold tabular-nums text-biomass sm:text-4xl">
          {result === null ? "—" : result.toLocaleString("en-US")}
        </p>
        <a
          href={`/${dict.locale}/buy-rhizomes#reserve`}
          className="mt-6 inline-block bg-biomass px-7 py-3.5 font-technical text-[10px] tracking-[0.3em] text-[#f9f6ee] transition-colors hover:bg-beige"
        >
          {t.reserveBatch}
        </a>
      </div>
    </div>
  );
}
