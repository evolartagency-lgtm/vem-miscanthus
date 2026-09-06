import { NextResponse } from "next/server";
import { validateLead } from "@/lib/leads";

export const runtime = "nodejs";

/**
 * CRM-ready lead intake endpoint.
 * Responses are shaped so a CRM adapter (webhook / queue / direct insert)
 * can be attached without changing the client contract.
 */
export async function POST(request: Request) {
  let body: unknown;
  try {
    body = await request.json();
  } catch {
    return NextResponse.json(
      { ok: false, errors: { _body: "Invalid JSON" } },
      { status: 400 }
    );
  }

  // Honeypot: silently accept bot submissions marked as spam.
  const raw = (body ?? {}) as Record<string, unknown>;
  if (typeof raw.website === "string" && raw.website !== "") {
    return NextResponse.json({ ok: true, id: "hp" }, { status: 202 });
  }

  const result = validateLead(body);
  if (!result.ok) {
    return NextResponse.json(
      { ok: false, errors: result.errors },
      { status: 422 }
    );
  }

  const lead = result.data;
  const id = `lead_${Date.now().toString(36)}${Math.random().toString(36).slice(2, 8)}`;

  // CRM adapter point: forward `lead` (JSON, stable schema in src/lib/leads.ts)
  // to HubSpot / Salesforce / internal CRM here.

  console.warn(
    JSON.stringify({ event: "lead_received", id, type: lead.type, locale: lead.locale })
  );

  return NextResponse.json({ ok: true, id }, { status: 201 });
}
