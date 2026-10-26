"use server";

import { revalidatePath } from "next/cache";
import { requireUser } from "@/lib/auth";
import { mutate } from "@/lib/db";
import { notify, str, type ActionState } from "@/lib/events";

export async function decideVerification(_: ActionState, form: FormData): Promise<ActionState> {
  await requireUser("admin");
  const decision = str(form, "decision");
  mutate((d) => {
    const profile = d.clients.find((c) => c.userId === str(form, "clientId"));
    if (!profile) return;
    profile.verification = decision === "approve" ? "verified" : "rejected";
    profile.verificationNote = decision === "approve" ? undefined : str(form, "note") || "We couldn't confirm the company from the source provided.";
    notify(d, profile.userId, decision === "approve" ? `${profile.companyName} is now a verified company on FindRight.` : `Company verification needs changes: ${profile.verificationNote}`, "/client/profile");
  });
  revalidatePath("/", "layout");
  return { ok: decision === "approve" ? "Company verified." : "Verification rejected with a note." };
}

export async function resolveDispute(_: ActionState, form: FormData): Promise<ActionState> {
  await requireUser("admin");
  const resolution = str(form, "resolution");
  if (resolution.length < 10) return { error: "Write a resolution for both parties." };
  mutate((d) => {
    const dispute = d.disputes.find((x) => x.id === str(form, "disputeId"));
    if (!dispute) return;
    dispute.status = "resolved";
    dispute.resolution = resolution;
    const user = d.users.find((u) => u.id === dispute.userId);
    if (user) notify(d, user.id, `Your support case “${dispute.issue}” was resolved: ${resolution}`, `/${user.role}/support`);
  });
  revalidatePath("/", "layout");
  return { ok: "Case resolved." };
}
