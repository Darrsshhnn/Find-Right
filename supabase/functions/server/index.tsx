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
    allowHeaders: ["Content-Type", "Authorization"],
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

Deno.serve(app.fetch);
