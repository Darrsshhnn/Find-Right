import "server-only";
import { createHmac, timingSafeEqual } from "node:crypto";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { db } from "./db";
import type { Role, User } from "./types";

const COOKIE = "findright_session";
const THIRTY_DAYS = 30 * 86_400_000;

// Sessions are signed cookies (userId.expiry.signature), so signing in needs no server-side storage and
// works across serverless instances. Set SESSION_SECRET in production.
const SECRET = process.env.SESSION_SECRET || "findright-demo-session-secret-change-me";
if (!process.env.SESSION_SECRET && process.env.NODE_ENV === "production") {
  console.warn("[findright] SESSION_SECRET is not set — using the demo secret. Set it in your hosting environment.");
}

const sign = (payload: string) => createHmac("sha256", SECRET).update(payload).digest("base64url");

function verify(token: string): string | null {
  const [userId, expires, signature] = token.split(".");
  if (!userId || !expires || !signature) return null;
  const expected = Buffer.from(sign(`${userId}.${expires}`));
  const given = Buffer.from(signature);
  if (expected.length !== given.length || !timingSafeEqual(expected, given)) return null;
  return Number(expires) > Date.now() ? userId : null;
}

export async function createSession(userId: string) {
  const expires = Date.now() + THIRTY_DAYS;
  const payload = `${userId}.${expires}`;
  const jar = await cookies();
  jar.set(COOKIE, `${payload}.${sign(payload)}`, { httpOnly: true, sameSite: "lax", secure: process.env.NODE_ENV === "production", path: "/", expires: new Date(expires) });
}

export async function destroySession() {
  const jar = await cookies();
  jar.delete(COOKIE);
}

export async function currentUser(): Promise<User | null> {
  const jar = await cookies();
  const token = jar.get(COOKIE)?.value;
  const userId = token ? verify(token) : null;
  if (!userId) return null;
  return db().users.find((u) => u.id === userId) ?? null;
}

export function homeFor(user: User) {
  if (!user.onboarded) return `/onboarding/${user.role}`;
  return user.role === "admin" ? "/admin" : `/${user.role}`;
}

/** Require a signed-in, onboarded user with the given role, or redirect. */
export async function requireUser(role?: Role): Promise<User> {
  const user = await currentUser();
  if (!user) redirect("/login");
  if (role && user.role !== role) redirect(homeFor(user));
  if (!user.onboarded && user.role !== "admin") redirect(`/onboarding/${user.role}`);
  return user;
}
