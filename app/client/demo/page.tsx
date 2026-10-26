import type { Metadata } from "next";
import DemoFlow from "@/components/DemoFlow";
import { PageHead } from "@/components/ui";
import { requireUser } from "@/lib/auth";

export const metadata: Metadata = { title: "Hiring demo" };

export default async function Demo() {
  await requireUser("client");
  return (
    <>
      <PageHead eyebrow="Interactive demo" title="From offer to completion" description="Click through every stage of a protected hire — offer, agreement, escrow, milestones, revisions, approval, payment release and review. Nothing here is saved or charged." />
      <DemoFlow />
    </>
  );
}
