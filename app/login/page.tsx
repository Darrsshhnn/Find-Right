import type { Metadata } from "next";
import { redirect } from "next/navigation";
import AuthCard from "@/components/AuthCard";
import { LoginForm } from "@/components/AuthForms";
import PublicHeader from "@/components/PublicHeader";
import { AnimatedBackground } from "@/components/ui";
import { currentUser, homeFor } from "@/lib/auth";
import { DEMO_PASSWORD } from "@/lib/constants";

export const metadata: Metadata = { title: "Log in" };

export default async function Login({ searchParams }: { searchParams: Promise<{ next?: string }> }) {
  const user = await currentUser();
  if (user) redirect(homeFor(user));
  const { next } = await searchParams;
  return (
    <div className="public">
      <AnimatedBackground />
      <PublicHeader minimal />
      <AuthCard label="Welcome back">
        <LoginForm next={next} demoPassword={DEMO_PASSWORD} />
      </AuthCard>
    </div>
  );
}
