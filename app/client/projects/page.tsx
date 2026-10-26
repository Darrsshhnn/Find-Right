import type { Metadata } from "next";
import Link from "next/link";
import Icon from "@/components/Icon";
import ProjectList from "@/components/ProjectList";
import { PageHead } from "@/components/ui";
import { requireUser } from "@/lib/auth";

export const metadata: Metadata = { title: "Projects" };

export default async function ClientProjects({ searchParams }: { searchParams: Promise<{ tab?: string }> }) {
  const user = await requireUser("client");
  const { tab = "active" } = await searchParams;
  return (
    <>
      <PageHead eyebrow="Project management" title="Your projects" description="Contracts, milestones, deliveries and escrow payments in one place." actions={<Link href="/client/jobs/new" className="btn btn-primary"><Icon name="plus" size={16} /> Post a job</Link>} />
      <ProjectList user={user} tab={tab} />
    </>
  );
}
