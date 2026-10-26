import "server-only";
import { db, mutate, now, uid } from "./db";
import { conversationFor } from "./queries";
import { feeOf } from "./fees";
import type { DB, Message, Milestone, Project } from "./types";

export type ActionState = { error?: string; ok?: string } | undefined;

export function notify(d: DB, userId: string, text: string, href: string) {
  d.notifications.unshift({ id: uid("nt"), userId, text, href, read: false, createdAt: now() });
}

export function ensureConversation(d: DB, clientId: string, freelancerId: string, context: { jobId?: string; projectId?: string } = {}) {
  let conversation = conversationFor(d, clientId, freelancerId);
  if (!conversation) {
    conversation = { id: uid("cv"), clientId, freelancerId, updatedAt: now(), ...context };
    d.conversations.push(conversation);
  } else {
    Object.assign(conversation, context);
  }
  return conversation;
}

export function postMessage(d: DB, conversationId: string, senderId: string, text: string, kind: "text" | "system" | "meeting" = "text") {
  const message: Message = { id: uid("m"), conversationId, senderId, text, kind, createdAt: now() };
  d.messages.push(message);
  const conversation = d.conversations.find((c) => c.id === conversationId);
  if (conversation) conversation.updatedAt = message.createdAt;
  return message;
}

/** Records a system event in the pair's shared thread so both sides see the project history. */
export function systemEvent(d: DB, clientId: string, freelancerId: string, text: string, context: { jobId?: string; projectId?: string } = {}) {
  const conversation = ensureConversation(d, clientId, freelancerId, context);
  postMessage(d, conversation.id, "system", text, "system");
}

const AUTO_RELEASE_MS = 7 * 86_400_000;

/** Releases escrow for deliveries the client hasn't reviewed within 7 days, as promised in the agreement. */
export function autoRelease(d: DB) {
  let changed = false;
  for (const project of d.projects) {
    if (project.status !== "active") continue;
    for (const delivery of project.deliveries) {
      if (delivery.status !== "review" || Date.now() - new Date(delivery.createdAt).getTime() < AUTO_RELEASE_MS) continue;
      const milestone = project.milestones.find((m) => m.id === delivery.milestoneId);
      if (!milestone) continue;
      delivery.status = "approved";
      releaseFunds(d, project, milestone, "Auto-release");
      if (project.milestones.every((m) => m.status === "released")) { project.status = "completed"; project.completedAt = now(); }
      systemEvent(d, project.clientId, project.freelancerId, `“${milestone.title}” was auto-approved after 7 days without review.`, { projectId: project.id });
      changed = true;
    }
  }
  return changed;
}

export function runAutoRelease() {
  const due = db().projects.some((p) => p.status === "active" && p.deliveries.some((x) => x.status === "review" && Date.now() - new Date(x.createdAt).getTime() >= AUTO_RELEASE_MS));
  if (due) mutate(autoRelease);
}

export const str =(form: FormData, key: string) => String(form.get(key) ?? "").trim();
export const num = (form: FormData, key: string) => Number(form.get(key) ?? 0) || 0;
export const list = (form: FormData, key: string) => form.getAll(key).map(String).filter(Boolean);
export const csv = (value: string) => value.split(",").map((s) => s.trim()).filter(Boolean);

/** Releases a milestone to the freelancer and records the platform fee taken from that payout. */
export function releaseFunds(d: DB, project: Project, milestone: Milestone, method = "Escrow") {
  milestone.status = "released";
  d.transactions.unshift({ id: uid("tx"), projectId: project.id, milestoneId: milestone.id, clientId: project.clientId, freelancerId: project.freelancerId, type: "release", amount: milestone.amount, method, createdAt: now() });
  const fee = feeOf(milestone.amount, project.feePercent);
  if (fee > 0) d.transactions.unshift({ id: uid("tx"), projectId: project.id, milestoneId: milestone.id, clientId: project.clientId, freelancerId: project.freelancerId, type: "fee", amount: fee, method: `${project.feePercent}% platform fee`, createdAt: now() });
}
