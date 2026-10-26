import type { Metadata } from "next";
import { notFound, redirect } from "next/navigation";
import ClientOnboarding from "@/components/ClientOnboarding";
import FreelancerOnboarding from "@/components/FreelancerOnboarding";
import PublicHeader from "@/components/PublicHeader";
import { AnimatedBackground } from "@/components/ui";
import { currentUser, homeFor } from "@/lib/auth";

export const metadata: Metadata = { title: "Onboarding" };

export default async function Onboarding({ params }: { params: Promise<{ role: string }> }) {
  const { role } = await params;
  if (role !== "client" && role !== "freelancer") notFound();
  const user = await currentUser();
  if (!user) redirect("/login");
  if (user.onboarded || user.role !== role) redirect(homeFor(user));
  return (
    <div className="public">
      <AnimatedBackground />
      <PublicHeader minimal />
      {role === "client" ? <ClientOnboarding /> : <FreelancerOnboarding name={user.name} />}
    </div>
  );
}
