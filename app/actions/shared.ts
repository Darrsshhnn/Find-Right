"use server";

import { randomInt } from "node:crypto";
import { revalidatePath } from "next/cache";
import { requireUser } from "@/lib/auth";
import { db, mutate, now, uid } from "@/lib/db";
import { notify, num, postMessage, str, type ActionState } from "@/lib/events";
import { hashPassword, verifyPassword } from "@/lib/password";
import { filesFrom, saveUpload, validateFiles } from "@/lib/uploads";
import type { FileRef } from "@/lib/types";

const refresh = (ok?: string): ActionState => {
  revalidatePath("/", "layout");
  return { ok };
};

function memberOf(conversationId: string, userId: string) {
  return db().conversations.find((c) => c.id === conversationId && (c.clientId === userId || c.freelancerId === userId));
}

export async function sendMessage(_: ActionState, form: FormData): Promise<ActionState> {
  const user = await requireUser();
  const conversationId = str(form, "conversationId");
  const text = str(form, "text").slice(0, 4000);
  const conversation = memberOf(conversationId, user.id);
  if (!conversation) return { error: "Conversation not found." };
  const files = filesFrom(form, "files");
  if (!text && !files.length) return { error: "Write a message or attach a file." };
  if (files.length > 5) return { error: "Attach up to 5 files per message." };
  const invalid = validateFiles(files);
  if (invalid) return { error: invalid };
  const saved: FileRef[] = [];
  for (const file of files) {
    const up = await saveUpload(file, user.id, { conversationId });
    saved.push({ id: up.id, name: up.name, size: up.size, type: up.type });
  }
  const other = conversation.clientId === user.id ? conversation.freelancerId : conversation.clientId;
  mutate((d) => {
    const message = postMessage(d, conversationId, user.id, text);
    if (saved.length) message.files = saved;
    const recent = d.notifications.find((n) => n.userId === other && !n.read && n.href.includes(conversationId));
    if (!recent) notify(d, other, `New message from ${user.name}.`, `/${user.role === "client" ? "freelancer" : "client"}/messages?c=${conversationId}`);
  });
  return refresh();
}

export async function scheduleMeeting(_: ActionState, form: FormData): Promise<ActionState> {
  const user = await requireUser();
  const conversationId = str(form, "conversationId");
  const date = str(form, "date");
  const time = str(form, "time");
  const title = str(form, "title") || "Project discussion";
  const agenda = str(form, "agenda").slice(0, 1000);
  const link = str(form, "link");
  const minutes = Math.min(120, Math.max(15, num(form, "minutes") || 30));
  const conversation = memberOf(conversationId, user.id);
  if (!conversation) return { error: "Conversation not found." };
  if (!date || !time) return { error: "Pick a date and a time." };
  // Times are entered in IST, the platform's working timezone.
  const when = new Date(`${date}T${time}:00+05:30`);
  if (Number.isNaN(when.getTime()) || when <= new Date()) return { error: "Pick a date and time in the future." };
  if (link && !link.startsWith("/") && !/^https:\/\/\S+\.\S+/.test(link)) return { error: "Meeting links must start with https://" };
  const label = when.toLocaleString("en-IN", { dateStyle: "medium", timeStyle: "short", timeZone: "Asia/Kolkata" });
  const other = conversation.clientId === user.id ? conversation.freelancerId : conversation.clientId;
  mutate((d) => {
    const message = postMessage(d, conversationId, user.id, title, "meeting");
    message.meeting = { title, when: when.toISOString(), minutes, agenda, link: link || "" };
    notify(d, other, `${user.name} scheduled “${title}” for ${label} IST.`, `/${user.role === "client" ? "freelancer" : "client"}/messages?c=${conversationId}`);
  });
  return refresh(`Meeting scheduled for ${label} IST. Both of you will see it in the chat.`);
}

export async function leaveReview(_: ActionState, form: FormData): Promise<ActionState> {
  const user = await requireUser();
  const projectId = str(form, "projectId");
  const project = db().projects.find((p) => p.id === projectId && (p.clientId === user.id || p.freelancerId === user.id));
  if (!project || project.status !== "completed") return { error: "Reviews open once the project is complete." };
  if (db().reviews.some((r) => r.projectId === projectId && r.fromId === user.id)) return { error: "You've already reviewed this project." };
  const scores = ["communication", "quality", "timeliness"].map((k) => Math.min(5, Math.max(1, num(form, k))));
  const text = str(form, "text");
  if (text.length < 15) return { error: "Share a sentence or two about the experience." };
  const ai = str(form, "ai");
  const aiMatched = ai === "yes" || ai === "partly" || ai === "no" ? ai : undefined;
  if (user.role === "client" && !aiMatched) return { error: "Tell us whether the work matched the AI usage disclosed." };
  const toId = project.clientId === user.id ? project.freelancerId : project.clientId;
  const overall = num(form, "rating");
  const rating = overall >= 1 && overall <= 5 ? overall : Math.round((scores.reduce((a, b) => a + b, 0) / 3) * 10) / 10;
  mutate((d) => {
    d.reviews.unshift({ id: uid("rv"), projectId, fromId: user.id, toId, rating, communication: scores[0]!, quality: scores[1]!, timeliness: scores[2]!, aiMatched, text, createdAt: now() });
    notify(d, toId, `${user.name} left you a ${rating}★ review for “${project.title}”.`, toId === project.clientId ? "/client/profile" : "/freelancer/profile");
  });
  return refresh("Thanks — your review is published.");
}

export async function raiseDispute(_: ActionState, form: FormData): Promise<ActionState> {
  const user = await requireUser();
  const projectId = str(form, "projectId") || undefined;
  const description = str(form, "description");
  if (description.length < 20) return { error: "Describe what happened in at least 20 characters." };
  if (projectId && !db().projects.some((p) => p.id === projectId && (p.clientId === user.id || p.freelancerId === user.id))) return { error: "Choose one of your projects." };
  mutate((d) => {
    d.disputes.unshift({ id: uid("dp"), projectId, userId: user.id, issue: str(form, "issue") || "Other", description, status: "open", createdAt: now() });
    const admin = d.users.find((u) => u.role === "admin");
    if (admin) notify(d, admin.id, `New support case from ${user.name}: ${str(form, "issue")}.`, "/admin");
  });
  return refresh("Case submitted. The FindRight trust team will reply within 24 hours.");
}

export async function markNotificationsRead() {
  const user = await requireUser();
  mutate((d) => { d.notifications.forEach((n) => { if (n.userId === user.id) n.read = true; }); });
  revalidatePath("/", "layout");
}

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;
const CODE_TTL_MS = 10 * 60_000;

/** Step 1 of changing email: issue a 6-digit code for the new address. */
export async function requestEmailChange(_: ActionState, form: FormData): Promise<ActionState> {
  const user = await requireUser();
  const email = str(form, "email").toLowerCase();
  if (!EMAIL_RE.test(email)) return { error: "Enter a valid email address, e.g. name@gmail.com." };
  if (email === user.email) return { error: "That's already your current email." };
  if (db().users.some((u) => u.email === email)) return { error: "Another FindRight account already uses this email." };
  const code = String(randomInt(100000, 1000000));
  mutate((d) => {
    d.users.find((u) => u.id === user.id)!.pendingEmail = { email, codeHash: hashPassword(code), expiresAt: new Date(Date.now() + CODE_TTL_MS).toISOString(), attempts: 0 };
  });
  revalidatePath("/", "layout");
  // No email provider is configured, so the demo shows the code instead of sending it.
  return { ok: `Verification code for ${email}: ${code} (demo — in production this is emailed). It expires in 10 minutes.` };
}

/** Step 2: confirm the code and switch the account email. */
export async function confirmEmailChange(_: ActionState, form: FormData): Promise<ActionState> {
  const user = await requireUser();
  const pending = user.pendingEmail;
  const code = str(form, "code").replace(/\s/g, "");
  if (!pending) return { error: "Start again — request a new verification code." };
  if (new Date(pending.expiresAt) < new Date()) {
    mutate((d) => { delete d.users.find((u) => u.id === user.id)!.pendingEmail; });
    revalidatePath("/", "layout");
    return { error: "This code has expired. Request a new one." };
  }
  if (pending.attempts >= 5) return { error: "Too many incorrect attempts. Request a new code." };
  if (!/^\d{6}$/.test(code) || !verifyPassword(code, pending.codeHash)) {
    const used = mutate((d) => ++d.users.find((u) => u.id === user.id)!.pendingEmail!.attempts);
    return { error: `That code isn't right. ${Math.max(0, 5 - used)} attempts left.` };
  }
  if (db().users.some((u) => u.email === pending.email && u.id !== user.id)) return { error: "Another account claimed this email in the meantime." };
  mutate((d) => {
    const u = d.users.find((x) => x.id === user.id)!;
    u.email = pending.email;
    delete u.pendingEmail;
    notify(d, user.id, `Your sign-in email is now ${pending.email}.`, `/${user.role}/settings`);
  });
  revalidatePath("/", "layout");
  return { ok: `Email updated. Use ${pending.email} to sign in from now on.` };
}

export async function cancelEmailChange(): Promise<ActionState> {
  const user = await requireUser();
  mutate((d) => { delete d.users.find((u) => u.id === user.id)!.pendingEmail; });
  revalidatePath("/", "layout");
  return { ok: "Email change cancelled." };
}

export async function updateAccount(_: ActionState, form: FormData): Promise<ActionState> {
  const user = await requireUser();
  const name = str(form, "name");
  const phone = str(form, "phone");
  if (!name) return { error: "Your name can't be empty." };
  if (phone && !/^\+?[\d\s-]{8,16}$/.test(phone)) return { error: "Enter a valid phone number, e.g. +91 98250 12345." };
  mutate((d) => {
    d.users.find((u) => u.id === user.id)!.name = name;
    const profile = d.clients.find((c) => c.userId === user.id);
    if (profile) profile.phone = phone;
  });
  revalidatePath("/", "layout");
  return { ok: "Account details saved." };
}

export async function changePassword(_: ActionState, form: FormData): Promise<ActionState> {
  const user = await requireUser();
  const current = String(form.get("current") ?? "");
  const next = String(form.get("next") ?? "");
  if (!verifyPassword(current, user.passwordHash)) return { error: "Your current password is incorrect." };
  if (next.length < 8) return { error: "Use at least 8 characters for the new password." };
  mutate((d) => { d.users.find((u) => u.id === user.id)!.passwordHash = hashPassword(next); });
  return { ok: "Password updated." };
}
