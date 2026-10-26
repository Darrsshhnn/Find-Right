"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { requireUser } from "@/lib/auth";
import { db, mutate, now, uid } from "@/lib/db";
import { CATEGORY_NAMES, SCHEDULES } from "@/lib/constants";
import { ensureConversation, list, notify, num, releaseFunds, str, systemEvent, type ActionState } from "@/lib/events";
import { filesFrom, saveUpload, validateFiles } from "@/lib/uploads";
import { clientById, creditDiscount, creditsAvailable, projectFee } from "@/lib/queries";
import { money } from "@/lib/format";
import { milestoneSplit } from "@/lib/milestones";
import type { AiLevel, FileRef, Level, Milestone, Terms } from "@/lib/types";

const refresh = (ok?: string): ActionState => {
  revalidatePath("/", "layout");
  return { ok };
};

async function client() {
  return requireUser("client");
}

export async function postJob(_: ActionState, form: FormData): Promise<ActionState> {
  const user = await client();
  const title = str(form, "title");
  const category = str(form, "category");
  const budget = num(form, "budget");
  const budgetMin = num(form, "budgetMin");
  const budgetType = str(form, "budgetType") === "hourly" ? "hourly" : "fixed";
  const hours = num(form, "hours");
  const deadline = str(form, "deadline");
  if (!CATEGORY_NAMES.includes(category as (typeof CATEGORY_NAMES)[number])) return { error: "Choose a job category." };
  if (title.length < 8) return { error: "Give the job a descriptive title (at least 8 characters)." };
  if (str(form, "description").length < 30) return { error: "Describe the project in at least 30 characters so freelancers understand the brief." };
  if (budget <= 0) return { error: "Set a project budget in rupees." };
  if (budgetMin > budget) return { error: "The minimum budget can't be higher than the maximum." };
  if (budgetType === "hourly" && hours <= 0) return { error: "Estimate the number of hours for an hourly job." };
  if (!deadline || new Date(deadline) <= new Date()) return { error: "Choose a submission deadline in the future." };
  const wantsCredit = form.get("useCredit") === "on";
  if (wantsCredit && creditsAvailable(user.id) === 0) return { error: "You have no starter credits left." };
  const files = filesFrom(form, "attachments");
  const invalid = validateFiles(files);
  if (invalid) return { error: invalid };
  if (files.length > 10) return { error: "Attach up to 10 files." };
  const links = list(form, "links").filter((l) => /^https?:\/\/\S+\.\S+/.test(l)).slice(0, 10);
  const schedule = str(form, "schedule") in SCHEDULES ? (str(form, "schedule") as Terms["schedule"]) : "10-90";
  const aiPreference = (["No AI", "AI ideation", "AI execution"].includes(str(form, "aiPreference")) ? str(form, "aiPreference") : "Any") as AiLevel | "Any";
  const id = uid("jb");
  const attachments: FileRef[] = [];
  for (const file of files) {
    const saved = await saveUpload(file, user.id);
    attachments.push({ id: saved.id, name: saved.name, size: saved.size, type: saved.type });
  }
  const inviteId = str(form, "invite");
  mutate((d) => {
    for (const a of attachments) { const up = d.uploads.find((u) => u.id === a.id); if (up) up.jobId = id; }
    d.jobs.unshift({
      id, clientId: user.id, title, category, jobType: str(form, "jobType") || "Freelance project", level: (str(form, "level") as Level) || "Intermediate",
      objective: str(form, "objective"), description: str(form, "description"), deliverables: str(form, "deliverables"), references: links.join("\n"),
      budget, budgetMin: budgetMin || undefined, budgetType, hours: budgetType === "hourly" ? hours : undefined, schedule, aiPreference,
      style: str(form, "style"), candidate: str(form, "candidate"), links, attachments,
      deadline, duration: str(form, "duration"), revisions: clampRevisions(num(form, "revisions")), extraRevisionRate: Math.max(0, num(form, "extraRevisionRate")) || undefined, creditReserved: wantsCredit, status: "open", createdAt: now(),
    });
    const invitee = inviteId && d.freelancers.find((f) => f.userId === inviteId);
    if (invitee) {
      d.invitations.push({ id: uid("iv"), jobId: id, clientId: user.id, freelancerId: inviteId, message: "I'd like to work with you on this project.", status: "pending", createdAt: now() });
      notify(d, inviteId, `${clientById(user.id, d)?.displayName} invited you to “${title}”.`, "/freelancer/invitations");
    }
  });
  revalidatePath("/", "layout");
  redirect(`/client/jobs/${id}?posted=1`);
}

export async function closeJob(_: ActionState, form: FormData): Promise<ActionState> {
  const user = await client();
  const jobId = str(form, "jobId");
  mutate((d) => {
    const job = d.jobs.find((j) => j.id === jobId && j.clientId === user.id);
    if (job && job.status === "open") { job.status = "closed"; job.creditReserved = false; }
  });
  return refresh("Job closed. It no longer accepts proposals.");
}

export async function inviteFreelancer(_: ActionState, form: FormData): Promise<ActionState> {
  const user = await client();
  const jobId = str(form, "jobId");
  const freelancerId = str(form, "freelancerId");
  const data = db();
  const job = data.jobs.find((j) => j.id === jobId && j.clientId === user.id);
  if (!job || job.status !== "open") return { error: "Choose one of your open jobs." };
  if (data.invitations.some((i) => i.jobId === jobId && i.freelancerId === freelancerId)) return { error: "You've already invited this freelancer to that job." };
  if (data.proposals.some((p) => p.jobId === jobId && p.freelancerId === freelancerId)) return { error: "This freelancer has already applied to that job." };
  mutate((d) => {
    d.invitations.push({ id: uid("iv"), jobId, clientId: user.id, freelancerId, message: str(form, "message") || "I'd like to invite you to this project.", status: "pending", createdAt: now() });
    notify(d, freelancerId, `${clientById(user.id, d)?.displayName} invited you to “${job.title}”.`, "/freelancer/invitations");
  });
  return refresh("Invitation sent.");
}

export async function decideProposal(_: ActionState, form: FormData): Promise<ActionState> {
  const user = await client();
  const proposalId = str(form, "proposalId");
  const decision = str(form, "decision");
  let message = "";
  mutate((d) => {
    const proposal = d.proposals.find((p) => p.id === proposalId);
    const job = proposal && d.jobs.find((j) => j.id === proposal.jobId && j.clientId === user.id);
    if (!proposal || !job) return;
    if (decision === "shortlist") {
      proposal.status = "shortlisted";
      notify(d, proposal.freelancerId, `Your proposal for “${job.title}” was shortlisted.`, "/freelancer/proposals");
      message = "Proposal shortlisted.";
    } else if (decision === "decline" || decision === "reject") {
      // "Reject" and "decline" are the same action; the reason is optional and shared privately.
      const reason = [list(form, "reasons").join(", "), str(form, "reason")].filter(Boolean).join(" — ").slice(0, 800);
      proposal.status = "declined";
      proposal.declineReason = reason || undefined;
      notify(d, proposal.freelancerId, `The client chose not to move forward on “${job.title}”.${reason ? ` Feedback: ${reason}` : " Keep going — new matches are waiting."}`, "/freelancer/proposals?tab=archived");
      message = reason ? "Proposal declined. Your feedback was shared privately." : "Proposal declined. The freelancer has been notified kindly.";
    }
  });
  return refresh(message);
}

export async function startConversation(form: FormData) {
  const user = await client();
  const freelancerId = str(form, "freelancerId");
  const jobId = str(form, "jobId") || undefined;
  if (!db().freelancers.some((f) => f.userId === freelancerId)) redirect("/client/messages");
  const id = mutate((d) => ensureConversation(d, user.id, freelancerId, jobId ? { jobId } : {}).id);
  redirect(`/client/messages?c=${id}`);
}

export async function createOffer(_: ActionState, form: FormData): Promise<ActionState> {
  const user = await client();
  const data = db();
  const proposal = data.proposals.find((p) => p.id === str(form, "proposalId"));
  const job = proposal && data.jobs.find((j) => j.id === proposal.jobId && j.clientId === user.id);
  if (!proposal || !job) return { error: "This proposal is no longer available." };
  if (data.projects.some((p) => p.proposalId === proposal.id && p.status !== "declined")) return { error: "You've already sent a contract for this proposal." };
  const price = num(form, "price");
  const scope = str(form, "scope");
  const deliverables = str(form, "deliverables");
  const deadline = str(form, "deadline");
  if (!scope || !deliverables) return { error: "Describe the scope and deliverables — they become the contract." };
  if (price <= 0) return { error: "Set the agreed price." };
  if (!deadline) return { error: "Set the delivery date." };
  if (form.get("agree") !== "on") return { error: "Confirm that the terms reflect what you agreed with the freelancer." };
  const schedule = (str(form, "schedule") as Terms["schedule"]) in SCHEDULES ? (str(form, "schedule") as Terms["schedule"]) : "10-90";
  const useCredit = job.creditReserved || (form.get("useCredit") === "on" && creditsAvailable(user.id) > 0);
  const discount = useCredit ? creditDiscount(price) : 0;
  const total = price - discount;
  const milestones: Milestone[] = milestoneSplit(schedule, price, total).map((m) => ({ ...m, id: uid("ms"), status: "pending" }));
  const id = uid("pr");
  mutate((d) => {
    d.projects.unshift({
      id, jobId: job.id, proposalId: proposal.id, clientId: user.id, freelancerId: proposal.freelancerId, title: job.title, scope, deliverables, deadline, price, discount,
      terms: { schedule, revisions: clampRevisions(num(form, "revisions")), ai: (str(form, "ai") as AiLevel) || proposal.ai, ownership: str(form, "ownership") === "licence" ? "licence" : "full", extraRevisionRate: Math.max(0, num(form, "extraRevisionRate")) || undefined },
      milestones, deliveries: [], revisionsUsed: 0, status: "offer", portfolioAdded: false, createdAt: now(), feePercent: projectFee(user.id, proposal.freelancerId, price, d).percent,
    });
    if (useCredit) {
      const profile = d.clients.find((c) => c.userId === user.id)!;
      const liveJob = d.jobs.find((j) => j.id === job.id)!;
      if (liveJob.creditReserved) liveJob.creditReserved = false;
      profile.creditsUsed += 1;
    }
    systemEvent(d, user.id, proposal.freelancerId, `Contract offer sent for “${job.title}” · ${money(price)} · ${SCHEDULES[schedule].label}.`, { jobId: job.id, projectId: id });
    notify(d, proposal.freelancerId, `You received a contract offer for “${job.title}”. Review the auto-generated agreement.`, `/freelancer/projects/${id}`);
  });
  revalidatePath("/", "layout");
  redirect(`/client/projects/${id}?offer=1`);
}

export async function withdrawOffer(_: ActionState, form: FormData): Promise<ActionState> {
  const user = await client();
  const projectId = str(form, "projectId");
  mutate((d) => {
    const project = d.projects.find((p) => p.id === projectId && p.clientId === user.id && p.status === "offer");
    if (!project) return;
    project.status = "cancelled";
    if (project.discount > 0) d.clients.find((c) => c.userId === user.id)!.creditsUsed -= 1;
    systemEvent(d, user.id, project.freelancerId, `The contract offer for “${project.title}” was withdrawn.`);
    notify(d, project.freelancerId, `The offer for “${project.title}” was withdrawn by the client.`, `/freelancer/projects/${project.id}`);
  });
  return refresh("Offer withdrawn.");
}

export async function fundMilestone(_: ActionState, form: FormData): Promise<ActionState> {
  const user = await client();
  const projectId = str(form, "projectId");
  const method = str(form, "method") || "UPI";
  let error = "";
  let ok = "";
  mutate((d) => {
    const project = d.projects.find((p) => p.id === projectId && p.clientId === user.id);
    if (!project || !["awaiting_funding", "active"].includes(project.status)) { error = "This project can't receive funding right now."; return; }
    const next = project.milestones.find((m) => m.status !== "released");
    if (!next || next.status !== "pending") { error = "The current milestone is already funded."; return; }
    const isAdvance = project.milestones.indexOf(next) === 0;
    project.status = "active";
    d.transactions.unshift({ id: uid("tx"), projectId, milestoneId: next.id, clientId: user.id, freelancerId: project.freelancerId, type: "escrow_deposit", amount: next.charge, method, createdAt: now() });
    if (isAdvance) {
      // The advance is paid out straight away so freelancers never start work unpaid.
      releaseFunds(d, project, next);
      systemEvent(d, user.id, project.freelancerId, `Advance of ${money(next.amount)} paid to the freelancer. The project has started.`, { projectId });
      notify(d, project.freelancerId, `Advance of ${money(next.amount)} paid for “${project.title}”. You can start work.`, `/freelancer/projects/${projectId}`);
      ok = `Advance of ${money(next.charge)} paid via ${method}. The project is now active.`;
    } else {
      next.status = "funded";
      systemEvent(d, user.id, project.freelancerId, `“${next.title}” funded in escrow — ${money(next.amount)} secured for the freelancer.`, { projectId });
      notify(d, project.freelancerId, `${money(next.amount)} for “${next.title}” is now safely in escrow.`, `/freelancer/projects/${projectId}`);
      ok = `${money(next.charge)} is held safely in escrow until you approve the work.`;
    }
  });
  if (error) return { error };
  return refresh(ok);
}

export async function approveDelivery(_: ActionState, form: FormData): Promise<ActionState> {
  const user = await client();
  const projectId = str(form, "projectId");
  const deliveryId = str(form, "deliveryId");
  let ok = "";
  mutate((d) => {
    const project = d.projects.find((p) => p.id === projectId && p.clientId === user.id);
    const delivery = project?.deliveries.find((x) => x.id === deliveryId && x.status === "review");
    if (!project || !delivery) return;
    delivery.status = "approved";
    const milestone = project.milestones.find((m) => m.id === delivery.milestoneId)!;
    releaseFunds(d, project, milestone);
    const done = project.milestones.every((m) => m.status === "released");
    if (done) {
      project.status = "completed";
      project.completedAt = now();
      const job = d.jobs.find((j) => j.id === project.jobId);
      if (job) job.status = "hired";
    }
    systemEvent(d, user.id, project.freelancerId, done ? `Final delivery approved · ${money(milestone.amount)} released. Project complete — please leave each other a review.` : `“${milestone.title}” approved · ${money(milestone.amount)} released.`, { projectId });
    notify(d, project.freelancerId, done ? `“${project.title}” is complete. Payment released — leave a review for your client.` : `${money(milestone.amount)} released for “${milestone.title}”.`, `/freelancer/projects/${projectId}`);
    ok = done ? "Project complete and payment released. Leave a review to help other clients." : `${money(milestone.amount)} released to the freelancer.`;
  });
  return refresh(ok);
}

export async function requestChanges(_: ActionState, form: FormData): Promise<ActionState> {
  const user = await client();
  const projectId = str(form, "projectId");
  const deliveryId = str(form, "deliveryId");
  const feedback = str(form, "feedback");
  if (feedback.length < 10) return { error: "Explain what should change so the freelancer can act on it." };
  const data = db();
  const project = data.projects.find((p) => p.id === projectId && p.clientId === user.id);
  if (!project) return { error: "Project not found." };
  if (project.revisionsUsed >= project.terms.revisions) {
    return { error: `All ${project.terms.revisions} agreed revision rounds are used. ${project.terms.extraRevisionRate ? `Add extra rounds at the agreed ${money(project.terms.extraRevisionRate)} per round, or approve the work.` : "Approve the work, or agree a paid change request with the freelancer in chat."}` };
  }
  mutate((d) => {
    const p = d.projects.find((x) => x.id === projectId)!;
    const delivery = p.deliveries.find((x) => x.id === deliveryId && x.status === "review");
    if (!delivery) return;
    delivery.status = "changes";
    delivery.feedback = feedback;
    p.milestones.find((m) => m.id === delivery.milestoneId)!.status = "changes";
    p.revisionsUsed += 1;
    systemEvent(d, user.id, p.freelancerId, `Changes requested (revision ${p.revisionsUsed} of ${p.terms.revisions}): ${feedback}`, { projectId });
    notify(d, p.freelancerId, `Changes requested on “${p.title}” (revision ${p.revisionsUsed}/${p.terms.revisions}).`, `/freelancer/projects/${projectId}`);
  });
  return refresh("Feedback sent. This used one revision round.");
}

const clampRevisions = (n: number) => Math.min(8, Math.max(1, Math.round(n) || 2));

/** Client edits the agreement while it is still an offer. The freelancer must accept the new version. */
export async function updateOffer(_: ActionState, form: FormData): Promise<ActionState> {
  const user = await client();
  const projectId = str(form, "projectId");
  const data = db();
  const project = data.projects.find((p) => p.id === projectId && p.clientId === user.id);
  if (!project || project.status !== "offer") return { error: "Only offers that haven't been accepted can be edited." };
  const price = num(form, "price");
  const scope = str(form, "scope");
  const deliverables = str(form, "deliverables");
  const deadline = str(form, "deadline");
  if (!scope || !deliverables) return { error: "Scope and deliverables can't be empty." };
  if (price <= 0) return { error: "Set the agreed price." };
  if (!deadline) return { error: "Set the delivery date." };
  const schedule = (str(form, "schedule") as Terms["schedule"]) in SCHEDULES ? (str(form, "schedule") as Terms["schedule"]) : project.terms.schedule;
  mutate((d) => {
    const p = d.projects.find((x) => x.id === projectId)!;
    const discount = p.discount > 0 ? creditDiscount(price) : 0;
    Object.assign(p, {
      scope, deliverables, deadline, price, discount,
      terms: { schedule, revisions: clampRevisions(num(form, "revisions")), ai: (str(form, "ai") as AiLevel) || p.terms.ai, ownership: str(form, "ownership") === "licence" ? "licence" : "full", extraRevisionRate: Math.max(0, num(form, "extraRevisionRate")) || undefined },
      milestones: milestoneSplit(schedule, price, price - discount).map((m) => ({ ...m, id: uid("ms"), status: "pending" as const })),
      feePercent: projectFee(user.id, p.freelancerId, price, d).percent,
    });
    systemEvent(d, user.id, p.freelancerId, `The agreement for “${p.title}” was updated · ${money(price)} · ${SCHEDULES[schedule].label}. Please review the new version.`, { projectId });
    notify(d, p.freelancerId, `${user.name} updated the agreement for “${p.title}”. Review the changes before accepting.`, `/freelancer/projects/${projectId}`);
  });
  return refresh("Agreement updated. The freelancer has been asked to review the new version.");
}

/** Buy extra revision rounds at the rate agreed in the contract. */
export async function buyExtraRevisions(_: ActionState, form: FormData): Promise<ActionState> {
  const user = await client();
  const projectId = str(form, "projectId");
  const rounds = Math.min(3, Math.max(1, Math.round(num(form, "rounds")) || 1));
  const method = str(form, "method") || "UPI";
  const data = db();
  const project = data.projects.find((p) => p.id === projectId && p.clientId === user.id);
  if (!project || project.status !== "active") return { error: "Extra revisions can be added to active projects only." };
  const rate = project.terms.extraRevisionRate ?? 0;
  if (rate <= 0) return { error: "No extra-revision rate was agreed for this project. Agree one with the freelancer in chat first." };
  if ((project.extraRevisions ?? 0) + rounds > 6) return { error: "You can add up to 6 extra revision rounds per project." };
  const cost = rate * rounds;
  mutate((d) => {
    const p = d.projects.find((x) => x.id === projectId)!;
    p.terms.revisions += rounds;
    p.extraRevisions = (p.extraRevisions ?? 0) + rounds;
    // The cost rides on the current unreleased milestone so it is released with that delivery.
    const current = p.milestones.find((m) => m.status !== "released") ?? p.milestones.at(-1)!;
    current.amount += cost;
    current.charge += cost;
    if (current.status !== "pending") {
      d.transactions.unshift({ id: uid("tx"), projectId, milestoneId: current.id, clientId: user.id, freelancerId: p.freelancerId, type: "escrow_deposit", amount: cost, method, createdAt: now() });
    }
    p.price += cost;
    systemEvent(d, user.id, p.freelancerId, `${rounds} extra revision round${rounds > 1 ? "s" : ""} added at ${money(rate)} each (${money(cost)}${current.status !== "pending" ? ", held in escrow" : ", added to the next milestone"}).`, { projectId });
    notify(d, p.freelancerId, `${user.name} added ${rounds} paid revision round${rounds > 1 ? "s" : ""} to “${p.title}”.`, `/freelancer/projects/${projectId}`);
  });
  return refresh(`${rounds} extra revision round${rounds > 1 ? "s" : ""} added for ${money(cost)}.`);
}

export async function toggleSaved(_: ActionState, form: FormData): Promise<ActionState> {
  const user = await client();
  const freelancerId = str(form, "freelancerId");
  let saved = false;
  mutate((d) => {
    const profile = d.clients.find((c) => c.userId === user.id)!;
    saved = !profile.saved.includes(freelancerId);
    profile.saved = saved ? [...profile.saved, freelancerId] : profile.saved.filter((id) => id !== freelancerId);
  });
  return refresh(saved ? "Saved to your shortlist." : "Removed from your shortlist.");
}

export async function updateClientProfile(_: ActionState, form: FormData): Promise<ActionState> {
  const user = await client();
  const name = str(form, "name");
  if (!name) return { error: "Your name can't be empty." };
  const photos = filesFrom(form, "photo");
  const invalid = validateFiles(photos, { imagesOnly: true });
  if (invalid) return { error: invalid };
  const website = str(form, "website");
  if (website && !/^https?:\/\/\S+\.\S+/.test(website)) return { error: "Enter the website as a full URL, e.g. https://example.com" };
  const avatar = photos[0] ? `/api/files/${(await saveUpload(photos[0], user.id, { public: true })).id}` : undefined;
  const ai = str(form, "aiPreference");
  const schedule = str(form, "schedule");
  mutate((d) => {
    const u = d.users.find((x) => x.id === user.id)!;
    u.name = name;
    if (avatar) u.avatar = avatar;
    const profile = d.clients.find((c) => c.userId === user.id)!;
    Object.assign(profile, {
      role: str(form, "role"), industry: str(form, "industry"), companyType: str(form, "companyType"), location: str(form, "location"), bio: str(form, "bio"),
      categories: list(form, "categories").filter((c) => CATEGORY_NAMES.includes(c as (typeof CATEGORY_NAMES)[number])),
      aiPreference: ai === "No AI" || ai === "AI ideation" || ai === "AI execution" ? ai : profile.aiPreference,
      defaultTerms: {
        schedule: schedule in SCHEDULES ? schedule : "10-90",
        revisions: clampRevisions(num(form, "revisions")),
        ownership: str(form, "ownership") === "licence" ? "licence" : "full",
      },
      visibility: { company: form.get("v_company") === "on", spent: form.get("v_spent") === "on", history: form.get("v_history") === "on", paymentBadge: form.get("v_payment") === "on" },
    });
    if (profile.verification !== "verified") {
      profile.companyName = str(form, "companyName") || profile.companyName;
      if (website) profile.website = website;
    }
  });
  return refresh("Profile saved. Freelancers now see your updated details.");
}

export async function requestDeactivation(): Promise<ActionState> {
  const user = await client();
  const active = db().projects.some((p) => p.clientId === user.id && ["offer", "awaiting_funding", "active"].includes(p.status));
  if (active) return { error: "Finish or close your active projects before deactivating your account." };
  mutate((d) => {
    d.disputes.unshift({ id: uid("dp"), userId: user.id, issue: "Account deactivation", description: "Client requested account deactivation from profile settings.", status: "open", createdAt: now() });
    const admin = d.users.find((x) => x.role === "admin");
    if (admin) notify(d, admin.id, `${user.name} requested account deactivation.`, "/admin");
  });
  return refresh("Deactivation request recorded. Our trust team will confirm before anything is removed.");
}

export async function updateClientSettings(_: ActionState, form: FormData): Promise<ActionState> {
  const user = await client();
  mutate((d) => {
    const profile = d.clients.find((c) => c.userId === user.id)!;
    profile.settings = { proposals: form.get("proposals") === "on", messages: form.get("messages") === "on", milestones: form.get("milestones") === "on" };
  });
  return refresh("Preferences saved.");
}

export async function submitVerification(_: ActionState, form: FormData): Promise<ActionState> {
  const user = await client();
  const companyName = str(form, "companyName");
  const method = str(form, "method");
  const source = str(form, "source");
  if (!companyName) return { error: "Add your registered company name." };
  try {
    const url = new URL(source);
    if (url.protocol !== "https:" || (method === "linkedin" && !url.hostname.endsWith("linkedin.com"))) throw new Error();
  } catch {
    return { error: "Enter a valid HTTPS website or LinkedIn company page." };
  }
  mutate((d) => {
    const profile = d.clients.find((c) => c.userId === user.id)!;
    Object.assign(profile, { accountType: "company", companyName, website: method === "website" ? source : "", linkedin: method === "linkedin" ? source : "", verification: "pending", verificationNote: undefined });
    const admin = d.users.find((u) => u.role === "admin");
    if (admin) notify(d, admin.id, `${companyName} submitted company verification.`, "/admin");
  });
  return refresh("Submitted for review. We'll notify you once your company is verified.");
}
