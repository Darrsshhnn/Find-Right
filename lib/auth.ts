import "server-only";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { db, mutate, uid } from "./db";
import type { Role, User } from "./types";

const COOKIE = "findright_session";
const THIRTY_DAYS = 30 * 86_400_000;

export async function createSession(userId: string) {
  const id = uid("ss");
  const expiresAt = new Date(Date.now() + THIRTY_DAYS);
  mutate((d) => {
    d.sessions = d.sessions.filter((s) => new Date(s.expiresAt) > new Date());
    d.sessions.push({ id, userId, expiresAt: expiresAt.toISOString() });
  });
  const jar = await cookies();
  jar.set(COOKIE, id, { httpOnly: true, sameSite: "lax", secure: process.env.NODE_ENV === "production", path: "/", expires: expiresAt });
}

export async function destroySession() {
  const jar = await cookies();
  const id = jar.get(COOKIE)?.value;
  if (id) mutate((d) => { d.sessions = d.sessions.filter((s) => s.id !== id); });
  jar.delete(COOKIE);
}

export async function currentUser(): Promise<User | null> {
  const jar = await cookies();
  const id = jar.get(COOKIE)?.value;
  if (!id) return null;
  const data = db();
  const session = data.sessions.find((s) => s.id === id && new Date(s.expiresAt) > new Date());
  if (!session) return null;
  return data.users.find((u) => u.id === session.userId) ?? null;
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
