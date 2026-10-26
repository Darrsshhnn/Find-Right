import type { Metadata } from "next";
import Link from "next/link";
import { notFound, redirect } from "next/navigation";
import Icon from "@/components/Icon";
import ReviewForm from "@/components/ReviewForm";
import { requireUser } from "@/lib/auth";
import { db } from "@/lib/db";
import { freelancerById } from "@/lib/queries";

export const metadata: Metadata = { title: "Review your freelancer" };

export default async function ReviewPage({ params }: { params: Promise<{ id: string }> }) {
  const user = await requireUser("client");
  const { id } = await params;
  const data = db();
  const project = data.projects.find((p) => p.id === id && p.clientId === user.id);
  if (!project) notFound();
  if (project.status !== "completed" || data.reviews.some((r) => r.projectId === id && r.fromId === user.id)) redirect(`/client/projects/${id}`);
  const f = freelancerById(project.freelancerId, data)!;
  return (
    <>
      <Link href={`/client/projects/${id}`} className="back"><Icon name="arrowLeft" size={14} /> Back to project</Link>
      <ReviewForm projectId={id} freelancerName={f.user.name} aiDisclosed={project.terms.ai === "No AI" ? "No AI (100% human-made)" : project.terms.ai} />
    </>
  );
}
