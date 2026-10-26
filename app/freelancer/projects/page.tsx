import type { Metadata } from "next";
import ProjectList from "@/components/ProjectList";
import { PageHead } from "@/components/ui";
import { requireUser } from "@/lib/auth";

export const metadata: Metadata = { title: "Projects" };

export default async function FreelancerProjects({ searchParams }: { searchParams: Promise<{ tab?: string }> }) {
  const user = await requireUser("freelancer");
  const { tab = "active" } = await searchParams;
  return (
    <>
      <PageHead eyebrow="Your work" title="Projects & contracts" description="Offers, milestones, deliveries and payments for every client." />
      <ProjectList user={user} tab={tab} />
    </>
  );
}
