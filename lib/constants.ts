import type { AiLevel, Availability, Level, Terms } from "./types";

export const DISCIPLINES = [
  { name: "Brand Identity", description: "Logos, visual identity systems, guidelines and typography.", image: "/assets/74ddf.png", tags: ["Logo Design", "Brand Identity"] },
  { name: "UI/UX Design", description: "Mobile apps, SaaS interfaces, websites and design systems.", image: "/assets/1f943.png", tags: ["App", "Website"] },
  { name: "Graphic Design", description: "Social media creatives, posters, brochures and print.", image: "/assets/567c5.png", tags: ["Social", "Print"] },
  { name: "Product Design", description: "End-to-end digital products, research and prototyping.", image: "/assets/71e50.png", tags: ["Research", "Prototype"] },
  { name: "Packaging Design", description: "Dielines, boxes, labels, pouch wraps and tactile goods.", image: "/assets/0b0c3.png", tags: ["Packaging", "Dielines"] },
  { name: "Motion Design", description: "Animated brand assets, 2D/3D animation and explainers.", image: "/assets/11654.png", tags: ["Motion", "Lottie"] },
  { name: "Video Editing", description: "Reels, YouTube edits, promotional and brand videos.", image: "/assets/11654.png", tags: ["Editing", "Premiere"] },
  { name: "Illustration", description: "Editorial art, custom characters, product spots and icons.", image: "/assets/c96a1.png", tags: ["Vector", "Editorial"] },
] as const;

export const CATEGORY_NAMES = DISCIPLINES.map((d) => d.name);

export const SKILLS = [
  "UI/UX Design", "Brand Identity", "Typography", "Logo Design", "Vector Illustration", "Packaging & Dielines",
  "Motion Graphics", "Design Systems", "Mobile/iOS Design", "SaaS Design", "Video Editing", "Social Media Creatives",
  "Figma", "Adobe Illustrator", "Photoshop", "After Effects", "Premiere Pro", "User Research", "Prototyping", "Print Design",
];

export const LEVELS: { value: Level; label: string; detail: string }[] = [
  { value: "Fresher", label: "Fresher / Entry", detail: "New talent, fresh ideas" },
  { value: "Intermediate", label: "Intermediate", detail: "Proven project experience" },
  { value: "Expert", label: "High-level / Expert", detail: "Deep expertise, complex work" },
];

export const AVAILABILITY: Record<Availability, { label: string; tone: string }> = {
  now: { label: "Available now", tone: "green" },
  week: { label: "Available this week", tone: "amber" },
  busy: { label: "Fully booked", tone: "grey" },
};

export const AI_LEVELS: { value: AiLevel; detail: string }[] = [
  { value: "No AI", detail: "100% human-made — no generative AI in deliverables" },
  { value: "AI ideation", detail: "AI may help with research, references or moodboards" },
  { value: "AI execution", detail: "AI may help produce parts of the final output" },
];

export const SCHEDULES: Record<Terms["schedule"], { label: string; parts: { title: string; percent: number }[] }> = {
  "10-90": { label: "10% advance + 90% after final approval", parts: [{ title: "Advance to start", percent: 10 }, { title: "Final delivery", percent: 90 }] },
  "20-30-50": { label: "20% deposit → 30% after first samples → 50% on delivery", parts: [{ title: "Deposit", percent: 20 }, { title: "First samples", percent: 30 }, { title: "Final delivery", percent: 50 }] },
  "50-50": { label: "50% to start + 50% on delivery", parts: [{ title: "Kick-off", percent: 50 }, { title: "Final delivery", percent: 50 }] },
};

export const STARTER_CREDITS = 3;
export const CREDIT_PERCENT = 0.15;
export const CREDIT_CAP = 5000;
export const DEMO_PASSWORD = "findright123";
