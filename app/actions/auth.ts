"use server";

import { redirect } from "next/navigation";
import { createSession, currentUser, destroySession, homeFor } from "@/lib/auth";
import { db, mutate, now, uid } from "@/lib/db";
import { hashPassword, verifyPassword } from "@/lib/password";
import { csv, list, num, str, type ActionState } from "@/lib/events";
import type { AiLevel, Availability, Level, Role } from "@/lib/types";

export async function signup(_: ActionState, form: FormData): Promise<ActionState> {
  const name = str(form, "name");
  const email = str(form, "email").toLowerCase();
  const password = String(form.get("password") ?? "");
  const role = str(form, "role") as Role;
  if (role !== "client" && role !== "freelancer") return { error: "Choose whether you are hiring or freelancing." };
  if (!name || !email || !password) return { error: "Fill in every field before continuing." };
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) return { error: "Enter a valid email address." };
  if (password.length < 8) return { error: "Use at least 8 characters for your password." };
  if (db().users.some((u) => u.email === email)) return { error: "An account with this email already exists. Log in instead." };
  const id = uid("u");
  mutate((d) => {
    d.users.push({ id, role, name, email, passwordHash: hashPassword(password), onboarded: false, createdAt: now() });
  });
  await createSession(id);
  redirect(`/onboarding/${role}`);
}

export async function login(_: ActionState, form: FormData): Promise<ActionState> {
  const email = str(form, "email").toLowerCase();
  const password = String(form.get("password") ?? "");
  const user = db().users.find((u) => u.email === email);
  if (!user || !verifyPassword(password, user.passwordHash)) return { error: "That email and password don't match an account." };
  await createSession(user.id);
  const next = str(form, "next");
  redirect(next.startsWith("/") && !next.startsWith("//") ? next : homeFor(user));
}

export async function logout() {
  await destroySession();
  redirect("/");
}

export async function completeClientOnboarding(_: ActionState, form: FormData): Promise<ActionState> {
  const user = await currentUser();
  if (!user || user.role !== "client") redirect("/login");
  const accountType = str(form, "accountType") === "company" ? "company" : "personal";
  const companyName = str(form, "companyName");
  const method = str(form, "method");
  const source = str(form, "source");
  if (accountType === "company") {
    if (!companyName) return { error: "Add your registered company name." };
    try {
      const url = new URL(source);
      if (url.protocol !== "https:") throw new Error();
      if (method === "linkedin" && !url.hostname.endsWith("linkedin.com")) throw new Error();
    } catch {
      return { error: method === "linkedin" ? "Enter a valid LinkedIn company page URL (https://www.linkedin.com/company/…)." : "Enter a valid HTTPS company website." };
    }
  }
  const purposes = list(form, "purposes");
  const categories = list(form, "categories");
  if (!categories.length) return { error: "Pick at least one design category you hire for." };
  mutate((d) => {
    d.clients = d.clients.filter((c) => c.userId !== user.id);
    d.clients.push({
      userId: user.id, accountType, companyName, website: method === "website" ? source : "", linkedin: method === "linkedin" ? source : "",
      verification: accountType === "company" ? "pending" : "none", location: str(form, "location"), bio: "", purposes, categories,
      creditsUsed: 0, saved: [], settings: { proposals: true, messages: true, milestones: true },
    });
    const u = d.users.find((x) => x.id === user.id)!;
    u.onboarded = true;
    if (accountType === "company") {
      const admin = d.users.find((x) => x.role === "admin");
      if (admin) d.notifications.unshift({ id: uid("nt"), userId: admin.id, text: `${companyName} submitted company verification.`, href: "/admin", read: false, createdAt: now() });
    }
  });
  redirect("/client?welcome=1");
}

export async function completeFreelancerOnboarding(_: ActionState, form: FormData): Promise<ActionState> {
  const user = await currentUser();
  if (!user || user.role !== "freelancer") redirect("/login");
  const disciplines = list(form, "disciplines");
  const skills = list(form, "skills");
  const headline = str(form, "headline");
  if (!headline || !str(form, "location")) return { error: "Add your professional title and location." };
  if (!disciplines.length) return { error: "Choose at least one creative discipline." };
  const ai: Record<string, AiLevel> = {};
  for (const d of disciplines) {
    const value = str(form, `ai:${d}`) as AiLevel;
    ai[d] = value === "AI ideation" || value === "AI execution" ? value : "No AI";
  }
  const portfolioLinks = csv(str(form, "portfolioLinks").replace(/\n/g, ","));
  mutate((d) => {
    d.freelancers = d.freelancers.filter((f) => f.userId !== user.id);
    d.freelancers.push({
      userId: user.id, headline, location: str(form, "location"), bio: str(form, "bio"),
      level: (str(form, "level") as Level) || "Fresher", years: num(form, "years"), disciplines, skills,
      tools: csv(str(form, "tools")), languages: csv(str(form, "languages") || "English"), education: str(form, "education"),
      hourlyRate: num(form, "hourlyRate"), availability: (str(form, "availability") as Availability) || "now", ai, aiProcess: str(form, "aiProcess"),
      portfolio: portfolioLinks.map((link, index) => ({
        id: uid("pf"), title: `Portfolio link ${index + 1}`, category: disciplines[0]!, image: "", description: link, tags: [], ai: ai[disciplines[0]!] ?? "No AI", source: "outside" as const,
      })),
      experience: [], settings: { publicProfile: true, projectAlerts: true, messageAlerts: true },
    });
    d.users.find((x) => x.id === user.id)!.onboarded = true;
  });
  redirect("/freelancer?welcome=1");
}
