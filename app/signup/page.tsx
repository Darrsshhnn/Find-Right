import type { Metadata } from "next";
import { redirect } from "next/navigation";
import AuthCard from "@/components/AuthCard";
import { SignupForm } from "@/components/AuthForms";
import PublicHeader from "@/components/PublicHeader";
import { AnimatedBackground } from "@/components/ui";
import { currentUser, homeFor } from "@/lib/auth";

export const metadata: Metadata = { title: "Create an account" };

export default async function Signup({ searchParams }: { searchParams: Promise<{ role?: string }> }) {
  const user = await currentUser();
  if (user) redirect(homeFor(user));
  const { role } = await searchParams;
  if (role !== "client" && role !== "freelancer") redirect("/get-started");
  return (
    <div className="public">
      <AnimatedBackground />
      <PublicHeader minimal />
      <AuthCard label={role === "client" ? "Client account" : "Freelancer account"}>
        <SignupForm role={role} />
      </AuthCard>
    </div>
  );
}
