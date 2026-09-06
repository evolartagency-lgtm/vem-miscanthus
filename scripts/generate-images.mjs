/**
 * Dev utility: generates site imagery via the fal.ai queue API.
 *
 * Usage:
 *   node scripts/generate-images.mjs            # generate missing slots
 *   node scripts/generate-images.mjs hero-field # one slot
 *   node scripts/generate-images.mjs all --force
 *
 * Requires FAL_KEY in .env.local (or environment).
 * Optional: FAL_IMAGE_MODEL (default fal-ai/flux/dev).
 */

import { existsSync, readFileSync, writeFileSync } from "node:fs";
import path from "node:path";

const ROOT = path.resolve(process.cwd());
const OUT_DIR = path.join(ROOT, "public", "images");
const MODEL = process.env.FAL_IMAGE_MODEL ?? "fal-ai/flux/dev";

const STYLE =
  "cinematic photorealistic photography, soft golden-hour light, rich natural colors with detailed highlights and shadows, gentle low mist over the ground, warm earthy tones, balanced exposure without blown-out areas, premium editorial look, no text, no watermark";

const SLOTS = {
  "hero-field": `Vast miscanthus grass field at sunrise, low golden sun over misty rolling hills, dark cinematic mood, ${STYLE}`,
  agronomists: `Two agronomists with a tablet inspecting a tall miscanthus crop at dusk, seen from behind, dark cinematic mood, ${STYLE}`,
  "equipment-harvester": `Modern forage harvester cutting tall energy grass at dusk, dust and chaff in golden backlight, dark cinematic mood, ${STYLE}`,
  "roots-soil": `Macro cross-section of dark fertile soil with thick glowing rhizome roots, dramatic side light, dark cinematic mood, ${STYLE}`,
  "regional-landscape": `Aerial view of patchwork farmland with fields and shelterbelts under low golden light and haze, dark cinematic mood, ${STYLE}`,
  "science-lab": `Scientist in gloves examining a plant sample under a microscope in a dark laboratory, teal ambient light with warm accent, ${STYLE}`,
  "esg-tablet": `Hands holding a tablet showing a dark analytics dashboard with charts, blurred green field background at dusk, ${STYLE}`,
  "miscanthus-industries": `Industrial biomass processing facility with bales of tall grass and warm industrial lighting at night, dark cinematic mood, ${STYLE}`,
  "router-field": `Extreme close-up of dark miscanthus grass blades at dusk, deep near-black shadows, subtle teal and warm golden rim light, moody minimal background texture, ${STYLE}`,
};

function loadEnv() {
  const envPath = path.join(ROOT, ".env.local");
  if (existsSync(envPath)) {
    for (const line of readFileSync(envPath, "utf8").split(/\r?\n/)) {
      const m = line.match(/^([A-Z0-9_]+)=(.*)$/);
      if (m && !process.env[m[1]]) process.env[m[1]] = m[2].trim();
    }
  }
}

async function generateWithFal(prompt) {
  const key = process.env.FAL_KEY;
  if (!key) throw new Error("FAL_KEY is not set (.env.local)");

  const candidates = [
    process.env.FAL_IMAGE_MODEL,
    "openai/gpt-image-2",
    "openai/gpt-image-1",
    "fal-ai/gpt-image-2",
    "fal-ai/gpt-image-1",
    "fal-ai/flux/dev",
  ].filter(Boolean);

  let submit;
  let usedModel = "";
  for (const model of candidates) {
    submit = await fetch(`https://queue.fal.run/${model}`, {
      method: "POST",
      headers: { Authorization: `Key ${key}`, "Content-Type": "application/json" },
      body: JSON.stringify({ prompt, num_images: 1 }),
    });
    if (submit.ok) {
      usedModel = model;
      break;
    }
    console.log(`  model ${model} unavailable (${submit.status}), trying next…`);
  }
  if (!submit?.ok) throw new Error(`all models failed: ${submit?.status} ${await submit?.text()}`);
  console.log(`  model: ${usedModel}`);
  const { status_url, response_url } = await submit.json();

  for (let i = 0; i < 180; i++) {
    await new Promise((r) => setTimeout(r, 3000));
    const status = await fetch(status_url, { headers: { Authorization: `Key ${key}` } });
    const data = await status.json();
    if (data.status === "COMPLETED") break;
    if (i === 179) throw new Error("timeout waiting for fal.ai");
  }

  const res = await fetch(response_url, { headers: { Authorization: `Key ${key}` } });
  if (!res.ok) throw new Error(`result failed: ${res.status}`);
  const data = await res.json();
  const imageUrl = data?.images?.[0]?.url;
  if (!imageUrl) throw new Error(`no image in response: ${JSON.stringify(data).slice(0, 200)}`);
  const imgRes = await fetch(imageUrl);
  return { buf: Buffer.from(await imgRes.arrayBuffer()), url: imageUrl };
}

async function generateWithOpenAI(prompt) {
  const key = process.env.OPENAI_API_KEY;
  if (!key) throw new Error("OPENAI_API_KEY is not set (.env.local)");
  const res = await fetch("https://api.openai.com/v1/images/generations", {
    method: "POST",
    headers: { Authorization: `Bearer ${key}`, "Content-Type": "application/json" },
    body: JSON.stringify({ model: process.env.OPENAI_IMAGE_MODEL ?? "gpt-image-1", prompt, size: "1536x1024" }),
  });
  if (!res.ok) throw new Error(`openai failed: ${res.status} ${await res.text()}`);
  const data = await res.json();
  const b64 = data?.data?.[0]?.b64_json;
  const url = data?.data?.[0]?.url;
  if (b64) return { buf: Buffer.from(b64, "base64"), url: "openai.png" };
  if (url) {
    const imgRes = await fetch(url);
    return { buf: Buffer.from(await imgRes.arrayBuffer()), url };
  }
  throw new Error("no image in OpenAI response");
}

async function generateSlot(slot, prompt, provider) {
  const { buf, url } = provider === "openai" ? await generateWithOpenAI(prompt) : await generateWithFal(prompt);
  const ext = (url.split("?")[0].match(/\.(png|jpe?g|webp)$/) ?? [, provider === "openai" ? "png" : "jpg"])[1];
  const file = path.join(OUT_DIR, `${slot}.${ext}`);
  writeFileSync(file, buf);
  console.log(`✔ ${slot} -> ${path.relative(ROOT, file)} (${Math.round(buf.length / 1024)} KB)`);
}

async function main() {
  loadEnv();
  const args = process.argv.slice(2);
  const force = args.includes("--force");
  const provider = args.includes("--provider") ? args[args.indexOf("--provider") + 1] : "fal";
  const requested = args.filter((a) => !a.startsWith("--") && a !== "fal" && a !== "openai");
  const slots = requested.length > 0 && !requested.includes("all") ? requested : Object.keys(SLOTS);

  for (const slot of slots) {
    const prompt = SLOTS[slot];
    if (!prompt) {
      console.error(`unknown slot: ${slot} (known: ${Object.keys(SLOTS).join(", ")})`);
      continue;
    }
    const existing = existsSync(path.join(OUT_DIR, `${slot}.png`)) || existsSync(path.join(OUT_DIR, `${slot}.jpg`));
    if (existing && !force) {
      console.log(`↷ ${slot} exists, skipping (use --force to regenerate)`);
      continue;
    }
    try {
      await generateSlot(slot, prompt, provider);
    } catch (err) {
      console.error(`✖ ${slot}: ${err.message}`);
      process.exitCode = 1;
    }
  }
}

main();
