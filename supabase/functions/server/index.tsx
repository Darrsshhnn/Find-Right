import { Hono } from "npm:hono";
import { cors } from "npm:hono/cors";
import { logger } from "npm:hono/logger";
import { createClient } from "jsr:@supabase/supabase-js@2.49.8";
import * as kv from "./kv_store.tsx";
const app = new Hono();

// Enable logger
app.use('*', logger(console.log));

// Enable CORS for all routes and methods
app.use(
  "/*",
  cors({
    origin: "*",
    allowHeaders: ["Content-Type", "Authorization", "apikey"],
    allowMethods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
    exposeHeaders: ["Content-Length"],
    maxAge: 600,
  }),
);

// Health check endpoint
app.get("/make-server-1edb83a6/health", (c) => {
  return c.json({ status: "ok" });
});

const authClient = createClient(
  Deno.env.get("SUPABASE_URL")!,
  Deno.env.get("SUPABASE_SERVICE_ROLE_KEY")!,
  { auth: { persistSession: false, autoRefreshToken: false } },
);

async function authenticatedUser(c: any) {
  const token = c.req.header("Authorization")?.replace(/^Bearer\s+/i, "");
  if (!token) return { user: null, response: c.json({ error: "Sign in is required." }, 401) };
  const { data, error } = await authClient.auth.getUser(token);
  if (error || !data.user) return { user: null, response: c.json({ error: "Your session could not be verified." }, 401) };
  return { user: data.user, response: null };
}

app.get("/make-server-1edb83a6/company-verification/status", async (c) => {
  const { user, response } = await authenticatedUser(c);
  if (!user) return response;
  const request = await kv.get(`company-verification:${user.id}`);
  return c.json({ request: request ?? null });
});

app.post("/make-server-1edb83a6/company-verification/request", async (c) => {
  const { user, response } = await authenticatedUser(c);
  if (!user) return response;
  const body = await c.req.json().catch(() => null) as Record<string, unknown> | null;
  const companyName = typeof body?.companyName === "string" ? body.companyName.trim() : "";
  const method = body?.method === "linkedin" ? "linkedin" : body?.method === "website" ? "website" : null;
  const website = typeof body?.website === "string" ? body.website.trim() : "";
  const linkedin = typeof body?.linkedin === "string" ? body.linkedin.trim() : "";
  const verificationUrl = method === "website" ? website : linkedin;
  let parsedUrl: URL | null = null;
  try { parsedUrl = new URL(verificationUrl); } catch { parsedUrl = null; }
  if (!companyName || !method || !parsedUrl || parsedUrl.protocol !== "https:") {
    return c.json({ error: "Provide a company name and a valid HTTPS company website or LinkedIn page." }, 400);
  }
  const request = {
    userId: user.id,
    companyName,
    method,
    website: method === "website" ? website : "",
    linkedin: method === "linkedin" ? linkedin : "",
    status: "pending",
    submittedAt: new Date().toISOString(),
  };
  await kv.set(`company-verification:${user.id}`, request);
  return c.json({ request });
});

app.post("/make-server-1edb83a6/company-verification/admin/:userId/decision", async (c) => {
  const { user, response } = await authenticatedUser(c);
  if (!user) return response;
  if (user.app_metadata?.role !== "admin") return c.json({ error: "Only a FindRight verification administrator can review company accounts." }, 403);
  const body = await c.req.json().catch(() => null) as Record<string, unknown> | null;
  if (body?.status !== "verified" && body?.status !== "rejected") return c.json({ error: "Decision must be verified or rejected." }, 400);
  const key = `company-verification:${c.req.param("userId")}`;
  const existing = await kv.get(key);
  if (!existing) return c.json({ error: "No company verification request was found." }, 404);
  const request = { ...existing, status: body.status, reviewedAt: new Date().toISOString(), reviewNote: typeof body.note === "string" ? body.note.slice(0, 1000) : "" };
  await kv.set(key, request);
  return c.json({ request });
});

type PlatformJob = {
  id: string; ownerId: string; title: string; description: string; category: string;
  budget: number; deadline: string; aiDisclosure?: string; creditReserved: boolean;
  status: "open" | "paused" | "filled" | "closed"; createdAt: string;
};
type PlatformProposal = {
  id: string; jobId: string; clientId: string; freelancerId: string; proposal: string;
  amount: number; timeline: string; aiDisclosure: string; freelancerName?: string;
  status: "pending" | "discussion" | "accepted" | "rejected" | "withdrawn"; createdAt: string;
};
type PlatformProject = {
  id: string; jobId: string; proposalId: string; clientId: string; freelancerId: string;
  title: string; scope: string; deliverables: string; deadline: string; price: number;
  creditDiscount: number; status: "discussion" | "agreement" | "awaiting_advance" | "active" | "review" | "completed" | "cancelled";
  confirmations: string[]; createdAt: string;
};

const keyForJob = (id: string) => `platform-job:${id}`;
const keyForProposal = (id: string) => `platform-proposal:${id}`;
const keyForProject = (id: string) => `platform-project:${id}`;
const isValidId = (id: string) => /^[a-zA-Z0-9_-]{6,80}$/.test(id);
const roleOf = (user: any) => user.user_metadata?.role ?? "";
const asText = (value: unknown, max = 4000) => typeof value === "string" ? value.trim().slice(0, max) : "";
const asAmount = (value: unknown) => typeof value === "number" ? value : Number(value);

async function requireRole(c: any, expected: "client" | "designer") {
  const auth = await authenticatedUser(c);
  if (!auth.user) return { user: null, response: auth.response };
  if (roleOf(auth.user) !== expected) return { user: null, response: c.json({ error: `A ${expected} account is required.` }, 403) };
  return { user: auth.user, response: null };
}

async function projectForMember(id: string, userId: string): Promise<PlatformProject | null> {
  const project = await kv.get(keyForProject(id)) as PlatformProject | null;
  return project && (project.clientId === userId || project.freelancerId === userId) ? project : null;
}

// Clients publish real, authenticated jobs. Public discovery exposes only open brief fields.
app.get("/make-server-1edb83a6/jobs", async (c) => {
  const mine = c.req.query("mine") === "1";
  let user: any = null;
  if (mine) {
    const auth = await authenticatedUser(c);
    if (!auth.user) return auth.response;
    user = auth.user;
  }
  const all = await kv.getByPrefix("platform-job:") as PlatformJob[];
  const jobs = all.filter((job) => mine ? job.ownerId === user.id : job.status === "open");
  const withCounts = await Promise.all(jobs.map(async (job) => {
    const proposals = await kv.getByPrefix(`platform-proposal:${job.id}:`) as PlatformProposal[];
    return { ...job, applicantCount: proposals.filter((proposal) => proposal.status !== "withdrawn").length };
  }));
  return c.json({ jobs: withCounts.sort((a, b) => b.createdAt.localeCompare(a.createdAt)) });
});

app.post("/make-server-1edb83a6/jobs", async (c) => {
  const { user, response } = await requireRole(c, "client");
  if (!user) return response;
  const body = await c.req.json().catch(() => null) as Record<string, unknown> | null;
  if (user.user_metadata?.account_type === "company") {
    const verification = await kv.get(`company-verification:${user.id}`);
    if (verification?.status !== "verified") return c.json({ error: "Company verification must be approved before posting jobs." }, 403);
  }
  const existingJobs = await kv.getByPrefix("platform-job:") as PlatformJob[];
  if (body?.creditReserved === true && existingJobs.filter((job) => job.ownerId === user.id && job.creditReserved).length >= 3) {
    return c.json({ error: "All three starter credits are already reserved." }, 409);
  }
  const title = asText(body?.title, 140);
  const description = asText(body?.description, 5000);
  const category = asText(body?.category, 80);
  const budget = asAmount(body?.budget);
  const deadline = asText(body?.deadline, 40);
  if (!title || description.length < 20 || !category || !Number.isFinite(budget) || budget < 1 || !deadline) {
    return c.json({ error: "Provide a title, a project brief of at least 20 characters, category, positive budget, and deadline." }, 400);
  }
  const job: PlatformJob = { id: crypto.randomUUID(), ownerId: user.id, title, description, category, budget, deadline, aiDisclosure: asText(body?.aiDisclosure, 80), creditReserved: body?.creditReserved === true, status: "open", createdAt: new Date().toISOString() };
  await kv.set(keyForJob(job.id), job);
  return c.json({ job }, 201);
});

app.patch("/make-server-1edb83a6/jobs/:jobId", async (c) => {
  const { user, response } = await requireRole(c, "client");
  if (!user) return response;
  const id = c.req.param("jobId");
  if (!isValidId(id)) return c.json({ error: "Invalid job id." }, 400);
  const job = await kv.get(keyForJob(id)) as PlatformJob | null;
  if (!job || job.ownerId !== user.id) return c.json({ error: "Job not found." }, 404);
  const body = await c.req.json().catch(() => null) as Record<string, unknown> | null;
  const status = body?.status;
  if (status !== "open" && status !== "paused" && status !== "closed") return c.json({ error: "Choose open, paused, or closed." }, 400);
  const updated = { ...job, status };
  await kv.set(keyForJob(id), updated);
  return c.json({ job: updated });
});

app.get("/make-server-1edb83a6/jobs/:jobId/proposals", async (c) => {
  const auth = await authenticatedUser(c);
  if (!auth.user) return auth.response;
  const id = c.req.param("jobId");
  if (!isValidId(id)) return c.json({ error: "Invalid job id." }, 400);
  const job = await kv.get(keyForJob(id)) as PlatformJob | null;
  if (!job) return c.json({ error: "Job not found." }, 404);
  if (job.ownerId !== auth.user.id) return c.json({ error: "Only the job owner can review proposals." }, 403);
  const proposals = await kv.getByPrefix(`platform-proposal:${id}:`) as PlatformProposal[];
  const enriched = await Promise.all(proposals.map(async (proposal) => {
    const { data } = await authClient.auth.admin.getUserById(proposal.freelancerId);
    const metadata = data.user?.user_metadata ?? {};
    return { ...proposal, freelancerName: metadata.full_name ?? metadata.name ?? "FindRight designer" };
  }));
  return c.json({ proposals: enriched.sort((a, b) => b.createdAt.localeCompare(a.createdAt)) });
});

app.post("/make-server-1edb83a6/jobs/:jobId/proposals", async (c) => {
  const { user, response } = await requireRole(c, "designer");
  if (!user) return response;
  const id = c.req.param("jobId");
  if (!isValidId(id)) return c.json({ error: "Invalid job id." }, 400);
  const job = await kv.get(keyForJob(id)) as PlatformJob | null;
  if (!job || job.status !== "open") return c.json({ error: "This job is no longer accepting proposals." }, 404);
  if (job.ownerId === user.id) return c.json({ error: "You cannot apply to your own job." }, 400);
  const body = await c.req.json().catch(() => null) as Record<string, unknown> | null;
  const proposalText = asText(body?.proposal, 4000);
  const amount = asAmount(body?.amount);
  const timeline = asText(body?.timeline, 120);
  const aiDisclosure = asText(body?.aiDisclosure, 120);
  if (proposalText.length < 30 || !Number.isFinite(amount) || amount < 1 || !timeline || !aiDisclosure) return c.json({ error: "Include a proposal of at least 30 characters, a positive price, timeline, and AI disclosure." }, 400);
  const proposalId = `${id}:${user.id}`;
  const proposalKey = `platform-proposal:${proposalId}`;
  const existing = await kv.get(proposalKey) as PlatformProposal | null;
  if (existing && existing.status !== "withdrawn") return c.json({ error: "You have already applied to this job." }, 409);
  const proposal: PlatformProposal = { id: proposalId, jobId: id, clientId: job.ownerId, freelancerId: user.id, proposal: proposalText, amount, timeline, aiDisclosure, status: "pending", createdAt: new Date().toISOString() };
  await kv.set(proposalKey, proposal);
  return c.json({ proposal }, 201);
});

app.get("/make-server-1edb83a6/proposals/mine", async (c) => {
  const { user, response } = await requireRole(c, "designer");
  if (!user) return response;
  const all = await kv.getByPrefix("platform-proposal:") as PlatformProposal[];
  return c.json({ proposals: all.filter((proposal) => proposal.freelancerId === user.id).sort((a, b) => b.createdAt.localeCompare(a.createdAt)) });
});

app.post("/make-server-1edb83a6/proposals/:proposalId/decision", async (c) => {
  const { user, response } = await requireRole(c, "client");
  if (!user) return response;
  const proposalId = c.req.param("proposalId");
  if (!isValidId(proposalId.replace(":", "_"))) return c.json({ error: "Invalid proposal id." }, 400);
  const key = `platform-proposal:${proposalId}`;
  const proposal = await kv.get(key) as PlatformProposal | null;
  if (!proposal || proposal.clientId !== user.id) return c.json({ error: "Proposal not found." }, 404);
  if (proposal.status !== "pending" && proposal.status !== "discussion") return c.json({ error: "This proposal has already been processed." }, 409);
  const body = await c.req.json().catch(() => null) as Record<string, unknown> | null;
  const action = body?.action;
  if (action === "reject") {
    const updated = { ...proposal, status: "rejected" as const };
    await kv.set(key, updated);
    return c.json({ proposal: updated });
  }
  if (action !== "discuss") return c.json({ error: "Choose discuss or reject. Hiring requires a later mutual agreement." }, 400);
  const updated = { ...proposal, status: "discussion" as const };
  await kv.set(key, updated);
  let project = (await kv.getByPrefix("platform-project:") as PlatformProject[]).find((item) => item.proposalId === proposal.id);
  if (!project) {
    const job = await kv.get(keyForJob(proposal.jobId)) as PlatformJob;
    const priorCreditProject = (await kv.getByPrefix("platform-project:") as PlatformProject[]).some((item) => item.jobId === job.id && item.creditDiscount > 0 && item.status !== "cancelled");
    const creditDiscount = job.creditReserved && !priorCreditProject ? Math.min(Math.round(proposal.amount * 0.15), 5000) : 0;
    project = { id: crypto.randomUUID(), jobId: proposal.jobId, proposalId: proposal.id, clientId: proposal.clientId, freelancerId: proposal.freelancerId, title: job.title, scope: job.description, deliverables: "", deadline: proposal.timeline, price: proposal.amount, creditDiscount, status: "discussion", confirmations: [], createdAt: new Date().toISOString() };
    await kv.set(keyForProject(project.id), project);
  }
  return c.json({ proposal: updated, project });
});

app.get("/make-server-1edb83a6/projects", async (c) => {
  const auth = await authenticatedUser(c);
  if (!auth.user) return auth.response;
  const all = await kv.getByPrefix("platform-project:") as PlatformProject[];
  return c.json({ projects: all.filter((project) => project.clientId === auth.user!.id || project.freelancerId === auth.user!.id).sort((a, b) => b.createdAt.localeCompare(a.createdAt)) });
});

app.get("/make-server-1edb83a6/projects/:projectId/messages", async (c) => {
  const auth = await authenticatedUser(c);
  if (!auth.user) return auth.response;
  const project = await projectForMember(c.req.param("projectId"), auth.user.id);
  if (!project) return c.json({ error: "Project not found." }, 404);
  const messages = await kv.get(`platform-messages:${project.id}`) ?? [];
  return c.json({ messages });
});

app.post("/make-server-1edb83a6/projects/:projectId/messages", async (c) => {
  const auth = await authenticatedUser(c);
  if (!auth.user) return auth.response;
  const project = await projectForMember(c.req.param("projectId"), auth.user.id);
  if (!project) return c.json({ error: "Project not found." }, 404);
  const body = await c.req.json().catch(() => null) as Record<string, unknown> | null;
  const text = asText(body?.text, 4000);
  if (!text) return c.json({ error: "Message cannot be empty." }, 400);
  const messages = await kv.get(`platform-messages:${project.id}`) ?? [];
  const message = { id: crypto.randomUUID(), projectId: project.id, senderId: auth.user.id, text, createdAt: new Date().toISOString(), status: "sent" };
  await kv.set(`platform-messages:${project.id}`, [...messages, message]);
  return c.json({ message }, 201);
});

app.put("/make-server-1edb83a6/projects/:projectId/agreement", async (c) => {
  const auth = await authenticatedUser(c);
  if (!auth.user) return auth.response;
  const project = await projectForMember(c.req.param("projectId"), auth.user.id);
  if (!project) return c.json({ error: "Project not found." }, 404);
  if (project.status !== "discussion" && project.status !== "agreement") return c.json({ error: "Project terms can no longer be edited." }, 409);
  const body = await c.req.json().catch(() => null) as Record<string, unknown> | null;
  const scope = asText(body?.scope, 5000); const deliverables = asText(body?.deliverables, 3000);
  const deadline = asText(body?.deadline, 120); const price = asAmount(body?.price);
  if (!scope || !deliverables || !deadline || !Number.isFinite(price) || price < 1) return c.json({ error: "Scope, deliverables, deadline, and positive price are required." }, 400);
  const updated = { ...project, scope, deliverables, deadline, price, creditDiscount: Math.min(project.creditDiscount, price), status: "agreement" as const, confirmations: [] };
  await kv.set(keyForProject(project.id), updated);
  return c.json({ project: updated });
});

app.post("/make-server-1edb83a6/projects/:projectId/confirm-agreement", async (c) => {
  const auth = await authenticatedUser(c);
  if (!auth.user) return auth.response;
  const project = await projectForMember(c.req.param("projectId"), auth.user.id);
  if (!project) return c.json({ error: "Project not found." }, 404);
  if (project.status === "awaiting_advance") return c.json({ project, paymentReady: true });
  if (project.status !== "agreement") return c.json({ error: "Project terms are not ready for confirmation." }, 409);
  const confirmations = [...new Set([...project.confirmations, auth.user.id])];
  const updated = { ...project, confirmations, status: (confirmations.includes(project.clientId) && confirmations.includes(project.freelancerId) ? "awaiting_advance" : "agreement") as PlatformProject["status"] };
  await kv.set(keyForProject(project.id), updated);
  return c.json({ project: updated, paymentReady: updated.status === "awaiting_advance" });
});

Deno.serve(app.fetch);
