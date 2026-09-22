import { NextResponse } from "next/server";
import { validateLead } from "@/lib/leads";

export const runtime = "nodejs";

/**
 * CRM-ready lead intake endpoint.
 * Protections: JSON content-type enforcement, per-IP rate limiting,
 * strict field whitelist + validation (src/lib/leads.ts), honeypot,
 * and error responses that never leak internals.
 */

const RATE_LIMIT_WINDOW_MS = 5 * 60 * 1000;
const RATE_LIMIT_MAX = 10;

// In-memory bucket; per-instance on serverless. For strict global limits,
// front this route with Netlify WAF / a Redis-backed limiter.
const rateBuckets = new Map<string, { count: number; resetAt: number }>();

function clientIp(request: Request): string {
  const fwd = request.headers.get("x-forwarded-for");
  return fwd?.split(",")[0]?.trim() || request.headers.get("x-real-ip") || "local";
}

function isRateLimited(ip: string): boolean {
  const now = Date.now();
  const bucket = rateBuckets.get(ip);
  if (!bucket || bucket.resetAt < now) {
    rateBuckets.set(ip, { count: 1, resetAt: now + RATE_LIMIT_WINDOW_MS });
    // Opportunistic cleanup so the map cannot grow without bound.
    if (rateBuckets.size > 10_000) {
      for (const [key, b] of rateBuckets) {
        if (b.resetAt < now) rateBuckets.delete(key);
      }
    }
    return false;
  }
  bucket.count += 1;
  return bucket.count > RATE_LIMIT_MAX;
}

export async function POST(request: Request) {
  const contentType = request.headers.get("content-type") ?? "";
  if (!contentType.toLowerCase().includes("application/json")) {
    return NextResponse.json(
      { ok: false, errors: { _form: "Unsupported content type" } },
      { status: 415 },
    );
  }

  const ip = clientIp(request);
  if (isRateLimited(ip)) {
    return NextResponse.json(
      { ok: false, errors: { _form: "Too many requests. Please try again later." } },
      { status: 429, headers: { "Retry-After": String(Math.ceil(RATE_LIMIT_WINDOW_MS / 1000)) } },
    );
  }

  let body: unknown;
  try {
    body = await request.json();
  } catch {
    return NextResponse.json(
      { ok: false, errors: { _form: "Invalid request body" } },
      { status: 400 },
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
      { status: 422 },
    );
  }

  const lead = result.data;
  const id = `lead_${Date.now().toString(36)}${Math.random().toString(36).slice(2, 8)}`;

  // CRM adapter point: forward `lead` (JSON, stable schema in src/lib/leads.ts)
  // to HubSpot / Salesforce / internal CRM here. Failures must not break intake.

  console.warn(
    JSON.stringify({ event: "lead_received", id, type: lead.type, locale: lead.locale }),
  );

  return NextResponse.json({ ok: true, id }, { status: 201 });
}
