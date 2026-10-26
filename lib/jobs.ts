import type { Job } from "./types";

const inr = (n: number) => `₹${Math.round(n || 0).toLocaleString("en-IN")}`;

/** Total project value used for matching, credits and contract defaults. */
export function jobTotal(job: Pick<Job, "budget" | "budgetType" | "hours">) {
  return job.budgetType === "hourly" ? job.budget * (job.hours || 1) : job.budget;
}

export function budgetLabel(job: Pick<Job, "budget" | "budgetMin" | "budgetType" | "hours">) {
  const range = job.budgetMin && job.budgetMin < job.budget ? `${inr(job.budgetMin)}–${inr(job.budget)}` : inr(job.budget);
  return job.budgetType === "hourly" ? `${range}/hr${job.hours ? ` · ~${job.hours} hrs` : ""}` : range;
}

export const deliverableList = (value: string) =>
  value.split(/\n|;\s*/).map((s) => s.replace(/^[-•*\d.)\s]+/, "").trim()).filter(Boolean);

export type Brief = { overview: string; deliverables: string[]; style: string; candidate: string };

const DELIVERABLE_HINTS: { re: RegExp; unit?: RegExp; text: (n?: string) => string }[] = [
  { re: /website|landing|web ?site|web pages?/i, unit: /(\d+)\s*(?:web\s*)?pages?/i, text: (n) => `${n ? `${n} ` : ""}responsive page designs (desktop + mobile)` },
  { re: /\bapp\b|screens?/i, unit: /(\d+)\s*screens?/i, text: (n) => `${n ? `${n} ` : ""}high-fidelity app screens` },
  { re: /\bshop\b|checkout|e-?commerce|store/i, text: () => "Shop, product and checkout flow" },
  { re: /prototype|clickable/i, text: () => "Clickable prototype" },
  { re: /logo|identity|branding/i, text: () => "Logo suite with colour and type palette" },
  { re: /guideline|brand book/i, text: () => "Brand guidelines (PDF)" },
  { re: /packag|label|pouch|\bbox/i, unit: /(\d+)\s*(?:sku|flavou?rs?|variants?)/i, text: (n) => `Print-ready packaging${n ? ` for ${n} variants` : ""} with mockups` },
  { re: /reels?|video|youtube|edit/i, unit: /(\d+)\s*(?:reels?|videos?)/i, text: (n) => `${n ? `${n} ` : ""}edited videos with captions` },
  { re: /motion|animat/i, text: () => "Animated assets with source files" },
  { re: /posts?|social|instagram|stor(?:y|ies)/i, unit: /(\d+)\s*(?:posts?|stories)/i, text: (n) => `${n ? `${n} ` : ""}social media designs (editable)` },
  { re: /poster|flyer|brochure|print/i, text: () => "Print-ready artwork (PDF, CMYK)" },
  { re: /illustrat|icons?/i, unit: /(\d+)\s*(?:illustrations?|icons?)/i, text: (n) => `${n ? `${n} ` : ""}custom vector illustrations` },
  { re: /component|design system|ui kit/i, text: () => "Reusable component library" },
];
const STYLE_WORDS = ["minimal", "modern", "warm", "playful", "premium", "bold", "clean", "elegant", "friendly", "earthy", "vibrant", "luxury", "organic", "cinematic", "corporate", "fun", "pastel", "dark", "colourful", "colorful", "simple", "professional", "youthful"];
const TOOLS = ["Figma", "Illustrator", "Photoshop", "After Effects", "Premiere", "Canva", "Webflow", "Framer", "Blender", "InDesign"];
const PLATFORMS: [RegExp, string][] = [[/\bios\b|iphone/i, "iOS"], [/android/i, "Android"], [/desktop/i, "desktop"], [/mobile/i, "mobile"], [/tablet|ipad/i, "tablet"]];

const role = (category?: string) =>
  !category ? "designer" : category === "Video Editing" ? "video editor" : category === "Illustration" ? "illustrator" : category.replace(/ Design$/, " designer");

const tidy = (s: string) => {
  const t = s.trim().replace(/\s+/g, " ").replace(/\s+([,.!?])/g, "$1").replace(/\bi\b/g, "I");
  return t ? t.charAt(0).toUpperCase() + t.slice(1) + (/[.!?]$/.test(t) ? "" : ".") : "";
};

/**
 * Offline brief writer: restructures the client's own words into overview, deliverables, style and
 * candidate sections, keeping their specifics (counts, platforms, audience, tools, colours, deadline).
 */
export function draftBrief(input: { text: string; title?: string; category?: string; level?: string }): Brief {
  const raw = input.text.trim().replace(/\s+/g, " ");
  const all = `${input.title ?? ""} ${raw}`;
  const sentences = raw.split(/(?<=[.!?])\s+|\n+/).map(tidy).filter(Boolean);
  const audience = raw.match(/\bfor ((?:our |my )?[a-z][\w\s-]{3,40}?)(?=[,.]| who| with| that|$)/i)?.[1];
  const deadline = raw.match(/\b(?:by|before|within|in)\s+((?:\d+\s+(?:days?|weeks?|months?))|(?:next \w+)|(?:\w+ \d{1,2}(?:st|nd|rd|th)?))/i)?.[1];
  const platforms = PLATFORMS.filter(([re]) => re.test(all)).map(([, p]) => p);

  const overview = [
    input.title ? `Project: ${input.title.trim().replace(/[.]$/, "")}.` : "",
    ...sentences.slice(0, 4),
    platforms.length ? `It should work on ${platforms.join(", ")}.` : "",
    deadline ? `Target timeline: ${deadline}.` : "",
  ].filter(Boolean).join(" ");

  const deliverables = DELIVERABLE_HINTS.filter((h) => h.re.test(all)).map((h) => {
    const n = h.unit ? all.match(h.unit)?.[1] : undefined;
    const line = h.text(n);
    return line.charAt(0).toUpperCase() + line.slice(1);
  });
  // Explicit lists the client wrote ("we need X, Y and Z") are kept in their own words.
  const listed = raw.match(/(?:need|want|including|include|deliver)\s+([^.]{8,140})/i)?.[1];
  if (!deliverables.length && listed) listed.split(/,|\band\b/).map((s) => s.trim()).filter((s) => s.length > 3).forEach((s) => deliverables.push(tidy(s).replace(/\.$/, "")));
  if (!deliverables.length) deliverables.push("Final designs in the agreed formats");
  deliverables.push("Editable source files and a short handoff note");

  const lower = ` ${raw.toLowerCase()}`;
  const styles = STYLE_WORDS.filter((w) => lower.includes(` ${w}`) || lower.includes(`,${w}`));
  const colours = raw.match(/\b(?:purple|blue|green|red|orange|yellow|pink|black|white|beige|gold|teal|brown|grey|gray)\b/gi);
  const style = [
    styles.length ? `Look and feel: ${styles.slice(0, 4).join(", ")}.` : "Open to your creative direction.",
    colours?.length ? `Colours mentioned: ${[...new Set(colours.map((c) => c.toLowerCase()))].join(", ")}.` : "",
    /brand|guideline|logo/i.test(raw) ? "Follow our existing brand assets." : "",
    "Share 2–3 initial directions before refining one.",
  ].filter(Boolean).join(" ");

  const tools = TOOLS.filter((t) => new RegExp(t, "i").test(raw));
  const candidate = [
    `${input.level ?? "Intermediate"}-level ${role(input.category)}${audience ? ` who has designed for ${audience.replace(/^(our|my) /i, "")}` : ""}.`,
    tools.length ? `Comfortable with ${tools.join(", ")}.` : "",
    "Please share 2 similar projects, your timeline and how you use AI (if at all).",
  ].filter(Boolean).join(" ");

  return { overview, deliverables: [...new Set(deliverables)].slice(0, 7), style, candidate };
}
