import { existsSync, readFileSync, writeFileSync } from "node:fs";
import path from "node:path";

const ROOT = process.cwd();
const envPath = path.join(ROOT, ".env.local");
for (const line of readFileSync(envPath, "utf8").split(/\r?\n/)) {
  const m = line.match(/^([A-Z0-9_]+)=(.*)$/);
  if (m && !process.env[m[1]]) process.env[m[1]] = m[2].trim();
}
const key = process.env.FAL_KEY;

const prompt =
  "Cinematic dark moody landscape photograph at dawn: low golden sun cresting distant misty hills on the right with soft sun rays over a fog-filled valley, dark forested hill silhouettes on the left, tall miscanthus grass field in the foreground catching warm amber rim light, deep near-black shadows on the left side of the frame, dramatic amber and orange sky with thin clouds, rich warm color grade, photorealistic, high detail, no text";

const submit = await fetch("https://queue.fal.run/openai/gpt-image-2", {
  method: "POST",
  headers: { Authorization: `Key ${key}`, "Content-Type": "application/json" },
  body: JSON.stringify({ prompt, num_images: 1 }),
});
if (!submit.ok) throw new Error(`submit failed: ${submit.status} ${await submit.text()}`);
const { status_url, response_url } = await submit.json();
console.log("submitted, waiting…");

for (let i = 0; i < 180; i++) {
  await new Promise((r) => setTimeout(r, 3000));
  const s = await fetch(status_url, { headers: { Authorization: `Key ${key}` } });
  const d = await s.json();
  if (d.status === "COMPLETED") break;
  if (i === 179) throw new Error("timeout");
}

const res = await fetch(response_url, { headers: { Authorization: `Key ${key}` } });
const data = await res.json();
const url = data?.images?.[0]?.url;
if (!url) throw new Error("no image");
const img = await fetch(url);
const buf = Buffer.from(await img.arrayBuffer());
const ext = (url.split("?")[0].match(/\.(png|jpe?g|webp)$/) ?? [, "png"])[1];
writeFileSync(path.join(ROOT, "public", "images", `hero-field.${ext}`), buf);
console.log(`saved hero-field.${ext} (${Math.round(buf.length / 1024)} KB)`);
