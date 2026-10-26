import "server-only";
import { db } from "./db";
import { CREDIT_CAP, CREDIT_PERCENT, DISCIPLINES, STARTER_CREDITS } from "./constants";
import { platformFee } from "./fees";
import { jobTotal } from "./jobs";
import type { AiLevel, ClientProfile, DB, FreelancerProfile, Job, Level, Project, User } from "./types";

const AI_WEIGHT: Record<AiLevel, number> = { "No AI": 0, "AI ideation": 25, "AI execution": 60 };

export function aiSummary(profile: FreelancerProfile) {
  const levels = profile.disciplines.map((d) => profile.ai[d] ?? "No AI");
  const percent = levels.length ? Math.round(levels.reduce((sum, l) => sum + AI_WEIGHT[l], 0) / levels.length) : 0;
  const label = levels.includes("AI execution") ? "AI-supported" : levels.includes("AI ideation") ? "AI-assisted" : "100% human-made";
  return { percent, label };
}

export function ratingFor(userId: string, data: DB = db()) {
  const list = data.reviews.filter((r) => r.toId === userId);
  const average = list.length ? list.reduce((s, r) => s + r.rating, 0) / list.length : 0;
  return { average: Math.round(average * 10) / 10, count: list.length };
}

export type FreelancerView = ReturnType<typeof freelancerView>;

export function freelancerView(user: User, profile: FreelancerProfile, data: DB = db()) {
  const projects = data.projects.filter((p) => p.freelancerId === user.id);
  const completed = projects.filter((p) => p.status === "completed");
  const onTime = completed.filter((p) => !p.completedAt || p.completedAt.slice(0, 10) <= p.deadline).length;
  const rating = ratingFor(user.id, data);
  const ai = aiSummary(profile);
  const steps = [
    { label: "Identity & email verified", detail: "Your sign-in email is confirmed.", done: true },
    { label: "Complete your profile", detail: "Add a bio, at least three skills and an indicative rate.", done: profile.bio.length > 40 && profile.skills.length >= 3 && profile.hourlyRate > 0 },
    { label: "Public AI usage disclosure", detail: "Declare AI use for every discipline and describe your process.", done: profile.disciplines.every((d) => profile.ai[d]) && profile.aiProcess.length > 10 },
    { label: "Publish three portfolio pieces", detail: "Show the range of work clients can hire you for.", done: profile.portfolio.length >= 3 },
    { label: "Earn a client-verified portfolio project", detail: "Complete a FindRight contract and add it to your portfolio.", done: profile.portfolio.some((p) => p.source === "platform") },
    { label: "Receive your first client review", detail: "Two-way reviews unlock after a completed contract.", done: rating.count > 0 },
  ];
  const trust = Math.round((steps.filter((s) => s.done).length / steps.length) * 100);
  const tier = profile.level === "Fresher" && completed.length < 3 ? "Rising talent" : rating.average >= 4.7 && completed.length >= 1 ? "Top rated" : "Trusted";
  return {
    user, profile, rating, ai, steps, trust, tier,
    completed: completed.length,
    active: projects.filter((p) => p.status === "active" || p.status === "awaiting_funding").length,
    onTime: completed.length ? Math.round((onTime / completed.length) * 100) : 100,
    // Net of platform fees.
    earned: data.transactions.filter((t) => t.freelancerId === user.id && (t.type === "release" || t.type === "fee")).reduce((s, t) => s + (t.type === "fee" ? -t.amount : t.amount), 0),
  };
}

export function freelancerById(id: string, data: DB = db()) {
  const user = data.users.find((u) => u.id === id && u.role === "freelancer");
  const profile = data.freelancers.find((f) => f.userId === id);
  return user && profile ? freelancerView(user, profile, data) : null;
}

export function allFreelancers(data: DB = db()) {
  return data.freelancers
    .filter((f) => f.settings.publicProfile)
    .map((f) => freelancerById(f.userId, data))
    .filter((f): f is FreelancerView => Boolean(f));
}

export type ClientView = ReturnType<typeof clientView>;

export function clientView(user: User, profile: ClientProfile, data: DB = db()) {
  const rating = ratingFor(user.id, data);
  const hires = data.projects.filter((p) => p.clientId === user.id && p.status !== "offer" && p.status !== "declined").length;
  const spent = data.transactions.filter((t) => t.clientId === user.id && t.type === "release").reduce((s, t) => s + t.amount, 0);
  const displayName = profile.accountType === "company" && profile.companyName ? profile.companyName : user.name;
  return { user, profile, rating, hires, spent, displayName, verified: profile.verification === "verified" };
}

export function clientById(id: string, data: DB = db()) {
  const user = data.users.find((u) => u.id === id && u.role === "client");
  const profile = data.clients.find((c) => c.userId === id);
  return user && profile ? clientView(user, profile, data) : null;
}

export function creditsAvailable(userId: string, data: DB = db()) {
  const profile = data.clients.find((c) => c.userId === userId);
  if (!profile) return 0;
  const reserved = data.jobs.filter((j) => j.clientId === userId && j.status === "open" && j.creditReserved).length;
  return Math.max(0, STARTER_CREDITS - profile.creditsUsed - reserved);
}

export const creditDiscount = (price: number) => Math.min(Math.round(price * CREDIT_PERCENT), CREDIT_CAP);

const LEVEL_ORDER: Level[] = ["Fresher", "Intermediate", "Expert"];

/** Experience- and work-based match between a freelancer and a job, with plain-language reasons. */
export function matchScore(profile: FreelancerProfile, job: Job) {
  let score = 0;
  const reasons: string[] = [];
  if (profile.disciplines.includes(job.category)) { score += 45; reasons.push(`Works in ${job.category}`); }
  const tags = DISCIPLINES.find((d) => d.name === job.category)?.tags ?? [];
  const text = `${job.title} ${job.description} ${job.deliverables}`.toLowerCase();
  const skillHits = profile.skills.filter((s) => text.includes(s.toLowerCase().split(" ")[0]!) || tags.some((t) => s.includes(t)));
  if (skillHits.length) { score += Math.min(15, skillHits.length * 5); reasons.push(`Skills: ${skillHits.slice(0, 2).join(", ")}`); }
  const gap = Math.abs(LEVEL_ORDER.indexOf(profile.level) - LEVEL_ORDER.indexOf(job.level));
  if (gap === 0) { score += 20; reasons.push(`${profile.level} level, as requested`); } else if (gap === 1) score += 8;
  if (profile.availability === "now") { score += 12; reasons.push("Available now"); } else if (profile.availability === "week") score += 6;
  const fairBudget = (job.budgetType === "hourly" ? job.budget >= profile.hourlyRate * 0.8 : jobTotal(job) >= profile.hourlyRate * 8);
  if (fairBudget) { score += 8; reasons.push("Budget fits their rate"); }
  return { score: Math.min(99, score), reasons };
}

export function projectTotal(project: Project) {
  return project.price - project.discount;
}

/** One conversation per client–freelancer pair keeps briefs, calls and files in a single thread. */
export function conversationFor(data: DB, clientId: string, freelancerId: string) {
  return data.conversations.find((c) => c.clientId === clientId && c.freelancerId === freelancerId);
}

/** Platform fee for a client–freelancer pairing at a given price (see lib/fees.ts). */
export function projectFee(clientId: string, freelancerId: string, price: number, data: DB = db()) {
  const f = freelancerById(freelancerId, data);
  const c = clientById(clientId, data);
  return platformFee({
    price,
    freelancer: { level: f?.profile.level ?? "Intermediate", rating: f?.rating.average ?? 0, completed: f?.completed ?? 0 },
    client: { hires: c?.hires ?? 0, verified: c?.verified ?? false },
  });
}
