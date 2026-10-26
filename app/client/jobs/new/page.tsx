import type { Metadata } from "next";
import JobPostForm from "@/components/JobPostForm";
import { requireUser } from "@/lib/auth";
import { daysFromToday } from "@/lib/format";
import { creditsAvailable, freelancerById } from "@/lib/queries";

export const metadata: Metadata = { title: "Post a job" };

export default async function NewJob({ searchParams }: { searchParams: Promise<{ invite?: string }> }) {
  const user = await requireUser("client");
  const { invite } = await searchParams;
  const invitee = invite ? freelancerById(invite) : null;
  const minDate = daysFromToday(1);
  return (
    <JobPostForm
      credits={creditsAvailable(user.id)}
      invite={invitee ? { id: invitee.user.id, name: invitee.user.name } : undefined}
      defaultCategory={invitee?.profile.disciplines[0]}
      minDate={minDate}
    />
  );
}
