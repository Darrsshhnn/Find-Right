"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { requireUser } from "@/lib/auth";
import { db, mutate, now, uid } from "@/lib/db";
import { CATEGORY_NAMES } from "@/lib/constants";
import { csv, list, notify, num, str, systemEvent, type ActionState } from "@/lib/events";
import { clientById } from "@/lib/queries";
import { filesFrom, saveUpload, validateFiles } from "@/lib/uploads";
import type { AiLevel, Availability, Level } from "@/lib/types";

const refresh = (ok?: string): ActionState => {
  revalidatePath("/", "layout");
  return { ok };
};

const freelancer = () => requireUser("freelancer");
const aiValue = (value: string): AiLevel => (value === "AI ideation" || value === "AI execution" ? value : "No AI");

export async function submitProposal(_: ActionState, form: FormData): Promise<ActionState> {
  const user = await freelancer();
  const jobId = str(form, "jobId");
  const coverLetter = str(form, "coverLetter");
  const amount = num(form, "amount");
  const timeline = str(form, "timeline");
  const data = db();
  const job = data.jobs.find((j) => j.id === jobId);
  if (!job || job.status !== "open") return { error: "This job is no longer accepting proposals." };
  if (data.proposals.some((p) => p.jobId === jobId && p.freelancerId === user.id && p.status !== "withdrawn")) return { error: "You've already applied to this job." };
  if (coverLetter.length < 40) return { error: "Write at least 40 characters explaining your approach — clients skip generic proposals." };
  if (amount <= 0) return { error: "Set your proposed price." };
  if (!timeline) return { error: "Add a delivery timeline." };
  const name = user.name;
  mutate((d) => {
    const invitation = d.invitations.find((i) => i.jobId === jobId && i.freelancerId === user.id && i.status === "pending");
    if (invitation) invitation.status = "accepted";
    d.proposals = d.proposals.filter((p) => !(p.jobId === jobId && p.freelancerId === user.id));
    d.proposals.unshift({
      id: uid("pp"), jobId, freelancerId: user.id, coverLetter, amount, timeline, ai: aiValue(str(form, "ai")), samples: list(form, "samples"),
      invited: Boolean(invitation), status: "pending", createdAt: now(), extraRevisionRate: Math.max(0, num(form, "extraRevisionRate")) || undefined,
    });
    notify(d, job.clientId, `${name} sent a proposal for “${job.title}”.`, `/client/jobs/${job.id}`);
  });
  revalidatePath("/", "layout");
  redirect("/freelancer/proposals?sent=1");
}

export async function withdrawProposal(_: ActionState, form: FormData): Promise<ActionState> {
  const user = await freelancer();
  mutate((d) => {
    const proposal = d.proposals.find((p) => p.id === str(form, "proposalId") && p.freelancerId === user.id);
    if (proposal && (proposal.status === "pending" || proposal.status === "shortlisted")) proposal.status = "withdrawn";
  });
  return refresh("Proposal withdrawn.");
}

export async function declineInvitation(_: ActionState, form: FormData): Promise<ActionState> {
  const user = await freelancer();
  mutate((d) => {
    const invitation = d.invitations.find((i) => i.id === str(form, "invitationId") && i.freelancerId === user.id);
    if (!invitation) return;
    invitation.status = "declined";
    const job = d.jobs.find((j) => j.id === invitation.jobId);
    notify(d, invitation.clientId, `${user.name} declined your invitation to “${job?.title}”.`, `/client/jobs/${invitation.jobId}`);
  });
  return refresh("Invitation declined.");
}

export async function respondOffer(_: ActionState, form: FormData): Promise<ActionState> {
  const user = await freelancer();
  const projectId = str(form, "projectId");
  const decision = str(form, "decision");
  if (decision === "accept" && form.get("agree") !== "on") return { error: "Tick the box to confirm you accept the agreement." };
  let ok = "";
  mutate((d) => {
    const project = d.projects.find((p) => p.id === projectId && p.freelancerId === user.id && p.status === "offer");
    if (!project) return;
    const proposal = d.proposals.find((p) => p.id === project.proposalId);
    if (decision === "accept") {
      project.status = "awaiting_funding";
      if (proposal) proposal.status = "hired";
      const job = d.jobs.find((j) => j.id === project.jobId);
      if (job) job.status = "hired";
      systemEvent(d, project.clientId, user.id, `${user.name} accepted the agreement for “${project.title}”. Waiting for the advance payment.`, { projectId });
      notify(d, project.clientId, `${user.name} accepted your contract for “${project.title}”. Pay the advance to start.`, `/client/projects/${projectId}`);
      ok = "Agreement accepted. You'll be notified when the client pays the advance.";
    } else {
      project.status = "declined";
      if (project.discount > 0) {
        const profile = d.clients.find((c) => c.userId === project.clientId);
        if (profile) profile.creditsUsed = Math.max(0, profile.creditsUsed - 1);
      }
      systemEvent(d, project.clientId, user.id, `${user.name} declined the contract offer for “${project.title}”.`, { projectId });
      notify(d, project.clientId, `${user.name} declined the contract for “${project.title}”. Message them to adjust the terms.`, `/client/projects/${projectId}`);
      ok = "Offer declined. The client can send revised terms.";
    }
  });
  return refresh(ok);
}

export async function submitDelivery(_: ActionState, form: FormData): Promise<ActionState> {
  const user = await freelancer();
  const projectId = str(form, "projectId");
  const note = str(form, "note");
  const files = filesFrom(form, "files");
  const data = db();
  const project = data.projects.find((p) => p.id === projectId && p.freelancerId === user.id);
  if (!project || project.status !== "active") return { error: "This project isn't active." };
  const milestone = project.milestones.find((m) => m.status !== "released");
  if (!milestone || (milestone.status !== "funded" && milestone.status !== "changes")) return { error: "Wait until the client funds this milestone in escrow before submitting work." };
  if (note.length < 10) return { error: "Add a short note describing what you're delivering." };
  if (!files.length) return { error: "Attach at least one file." };
  const invalid = validateFiles(files);
  if (invalid) return { error: invalid };
  const saved: Awaited<ReturnType<typeof saveUpload>>[] = [];
  for (const file of files) saved.push(await saveUpload(file, user.id, { projectId }));
  mutate((d) => {
    const p = d.projects.find((x) => x.id === projectId)!;
    const m = p.milestones.find((x) => x.id === milestone.id)!;
    m.status = "submitted";
    p.deliveries.unshift({ id: uid("dl"), milestoneId: m.id, note, files: saved.map((f) => ({ id: f.id, name: f.name, size: f.size })), status: "review", createdAt: now() });
    systemEvent(d, p.clientId, user.id, `${user.name} submitted “${m.title}” for review (${saved.length} file${saved.length > 1 ? "s" : ""}).`, { projectId });
    notify(d, p.clientId, `${user.name} submitted “${m.title}” for review.`, `/client/projects/${projectId}`);
  });
  return refresh("Delivered! The client has been asked to review and release payment.");
}

export async function setAvailability(_: ActionState, form: FormData): Promise<ActionState> {
  const user = await freelancer();
  const value = str(form, "availability") as Availability;
  if (!["now", "week", "busy"].includes(value)) return { error: "Choose an availability." };
  mutate((d) => { d.freelancers.find((f) => f.userId === user.id)!.availability = value; });
  return refresh("Availability updated — clients searching for urgent work will see it.");
}

export async function updateFreelancerProfile(_: ActionState, form: FormData): Promise<ActionState> {
  const user = await freelancer();
  const name = str(form, "name");
  const disciplines = list(form, "disciplines").filter((d) => CATEGORY_NAMES.includes(d as (typeof CATEGORY_NAMES)[number]));
  if (!name || !str(form, "headline")) return { error: "Name and professional title are required." };
  if (!disciplines.length) return { error: "Keep at least one discipline." };
  mutate((d) => {
    d.users.find((u) => u.id === user.id)!.name = name;
    const p = d.freelancers.find((f) => f.userId === user.id)!;
    Object.assign(p, {
      headline: str(form, "headline"), location: str(form, "location"), bio: str(form, "bio"), level: (str(form, "level") as Level) || p.level,
      years: num(form, "years"), hourlyRate: num(form, "hourlyRate"), education: str(form, "education"), disciplines,
      skills: csv(str(form, "skills")), tools: csv(str(form, "tools")), languages: csv(str(form, "languages")),
    });
    for (const discipline of disciplines) if (!p.ai[discipline]) p.ai[discipline] = "No AI";
  });
  return refresh("Profile saved.");
}

export async function updateAiDisclosure(_: ActionState, form: FormData): Promise<ActionState> {
  const user = await freelancer();
  const process = str(form, "aiProcess");
  if (process.length < 10) return { error: "Describe your process in a sentence or two — clients read this before hiring." };
  mutate((d) => {
    const p = d.freelancers.find((f) => f.userId === user.id)!;
    for (const discipline of p.disciplines) p.ai[discipline] = aiValue(str(form, `ai:${discipline}`));
    p.aiProcess = process;
  });
  return refresh("AI disclosure published on your profile.");
}

export async function addPortfolioItem(_: ActionState, form: FormData): Promise<ActionState> {
  const user = await freelancer();
  const title = str(form, "title");
  const images = filesFrom(form, "image");
  if (!title) return { error: "Give the piece a title." };
  const invalid = validateFiles(images, { imagesOnly: true });
  if (invalid) return { error: invalid };
  const image = images[0] ? `/api/files/${(await saveUpload(images[0], user.id, { public: true })).id}` : "";
  mutate((d) => {
    const p = d.freelancers.find((f) => f.userId === user.id)!;
    p.portfolio.unshift({
      id: uid("pf"), title, category: str(form, "category") || p.disciplines[0] || "Graphic Design", image, description: str(form, "description"),
      tags: csv(str(form, "tags")), ai: aiValue(str(form, "ai")), source: "outside",
    });
  });
  return refresh("Portfolio piece published.");
}

export async function removePortfolioItem(_: ActionState, form: FormData): Promise<ActionState> {
  const user = await freelancer();
  mutate((d) => {
    const p = d.freelancers.find((f) => f.userId === user.id)!;
    const item = p.portfolio.find((x) => x.id === str(form, "itemId"));
    p.portfolio = p.portfolio.filter((x) => x.id !== str(form, "itemId"));
    if (item?.projectId) {
      const project = d.projects.find((x) => x.id === item.projectId);
      if (project) project.portfolioAdded = false;
    }
  });
  return refresh("Removed from your portfolio.");
}

export async function addProjectToPortfolio(_: ActionState, form: FormData): Promise<ActionState> {
  const user = await freelancer();
  const projectId = str(form, "projectId");
  const data = db();
  const project = data.projects.find((p) => p.id === projectId && p.freelancerId === user.id && p.status === "completed");
  if (!project) return { error: "Only completed FindRight contracts can become client-verified portfolio pieces." };
  if (project.portfolioAdded) return { error: "This project is already in your portfolio." };
  const images = filesFrom(form, "image");
  const invalid = validateFiles(images, { imagesOnly: true });
  if (invalid) return { error: invalid };
  const image = images[0] ? `/api/files/${(await saveUpload(images[0], user.id, { public: true })).id}` : "";
  const job = data.jobs.find((j) => j.id === project.jobId);
  mutate((d) => {
    const p = d.freelancers.find((f) => f.userId === user.id)!;
    p.portfolio.unshift({
      id: uid("pf"), title: str(form, "title") || project.title, category: job?.category ?? p.disciplines[0]!, image, description: str(form, "description") || project.scope,
      tags: ["Verified contract"], ai: project.terms.ai, source: "platform", projectId, clientName: clientById(project.clientId, d)?.displayName,
    });
    d.projects.find((x) => x.id === projectId)!.portfolioAdded = true;
  });
  return refresh("Added as a client-verified portfolio piece.");
}

export async function addExperience(_: ActionState, form: FormData): Promise<ActionState> {
  const user = await freelancer();
  const title = str(form, "title");
  if (!title || !str(form, "organisation")) return { error: "Add a role and organisation." };
  mutate((d) => {
    d.freelancers.find((f) => f.userId === user.id)!.experience.unshift({
      id: uid("ex"), title, organisation: str(form, "organisation"), period: str(form, "period"), description: str(form, "description"),
    });
  });
  return refresh("Experience added.");
}

export async function removeExperience(_: ActionState, form: FormData): Promise<ActionState> {
  const user = await freelancer();
  mutate((d) => {
    const p = d.freelancers.find((f) => f.userId === user.id)!;
    p.experience = p.experience.filter((x) => x.id !== str(form, "experienceId"));
  });
  return refresh("Experience removed.");
}

export async function updateFreelancerSettings(_: ActionState, form: FormData): Promise<ActionState> {
  const user = await freelancer();
  mutate((d) => {
    d.freelancers.find((f) => f.userId === user.id)!.settings = {
      publicProfile: form.get("publicProfile") === "on", projectAlerts: form.get("projectAlerts") === "on", messageAlerts: form.get("messageAlerts") === "on",
    };
  });
  return refresh("Preferences saved.");
}
