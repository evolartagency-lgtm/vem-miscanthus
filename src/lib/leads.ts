/** Canonical lead types aligned with CRM pipeline stages. */
export const LEAD_TYPES = [
  "reserve_rhizomes",
  "commercial_offer",
  "planting_calculation",
  "investment_case",
  "financial_model",
  "government_program",
  "franchise",
  "partnership",
  "strategic_partnership",
  "platform_investment",
  "agronomic_support",
  "equipment_selection",
  "carbon_partnership",
  "esg_report",
  "regional_pilot",
  "grant_consortium",
  "project",
  "general",
] as const;

export type LeadType = (typeof LEAD_TYPES)[number];

export interface LeadPayload {
  type: LeadType;
  name: string;
  email: string;
  phone?: string;
  company?: string;
  country?: string;
  landAreaHa?: number;
  plantingSeason?: string;
  needLogistics?: boolean;
  needAgronomy?: boolean;
  needEquipment?: boolean;
  requestedProduct?: string;
  budget?: string;
  comment?: string;
  locale: string;
  source: string;
}

export interface LeadResponse {
  ok: boolean;
  id: string;
}

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const STRINGS_500 = ["comment", "requestedProduct", "budget"] as const;

export function validateLead(body: unknown):
  | { ok: true; data: LeadPayload }
  | { ok: false; errors: Record<string, string> } {
  const errors: Record<string, string> = {};
  const b = (body ?? {}) as Record<string, unknown>;

  const type = String(b.type ?? "");
  if (!(LEAD_TYPES as readonly string[]).includes(type)) {
    errors.type = "Unknown lead type";
  }

  const name = String(b.name ?? "").trim();
  if (name.length < 2) errors.name = "Name is required";

  const email = String(b.email ?? "").trim();
  if (!EMAIL_RE.test(email)) errors.email = "Valid email is required";

  const phone = b.phone === undefined ? undefined : String(b.phone).trim();
  if (phone !== undefined && phone !== "" && phone.length > 32) {
    errors.phone = "Phone is too long";
  }

  let landAreaHa: number | undefined;
  if (b.landAreaHa !== undefined && b.landAreaHa !== "") {
    landAreaHa = Number(b.landAreaHa);
    if (!Number.isFinite(landAreaHa) || landAreaHa < 0 || landAreaHa > 10_000_000) {
      errors.landAreaHa = "Invalid land area";
    }
  }

  for (const key of ["company", "country", "plantingSeason"] as const) {
    const v = b[key];
    if (typeof v === "string" && v.length > 200) {
      errors[key] = "Value is too long";
    }
  }

  for (const key of STRINGS_500) {
    const v = b[key];
    if (typeof v === "string" && v.length > 2000) {
      errors[key] = "Value is too long";
    }
  }

  if (Object.keys(errors).length > 0) return { ok: false, errors };

  return {
    ok: true,
    data: {
      type: type as LeadType,
      name,
      email,
      phone: phone || undefined,
      company: str(b.company),
      country: str(b.country),
      landAreaHa,
      plantingSeason: str(b.plantingSeason),
      needLogistics: b.needLogistics === true,
      needAgronomy: b.needAgronomy === true,
      needEquipment: b.needEquipment === true,
      requestedProduct: str(b.requestedProduct),
      budget: str(b.budget),
      comment: str(b.comment),
      locale: str(b.locale) || "en",
      source: str(b.source) || "website",
    },
  };
}

function str(v: unknown): string | undefined {
  if (typeof v !== "string") return undefined;
  const s = v.trim();
  return s === "" ? undefined : s;
}
