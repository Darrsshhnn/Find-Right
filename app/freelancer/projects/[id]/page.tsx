import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import Icon from "@/components/Icon";
import Workspace from "@/components/Workspace";
import { requireUser } from "@/lib/auth";
import { db } from "@/lib/db";

export const metadata: Metadata = { title: "Project workspace" };

export default async function FreelancerProject({ params }: { params: Promise<{ id: string }> }) {
  const user = await requireUser("freelancer");
  const { id } = await params;
  const project = db().projects.find((p) => p.id === id && p.freelancerId === user.id);
  if (!project) notFound();
  return (
    <>
      <Link href="/freelancer/projects" className="back"><Icon name="arrowLeft" size={14} /> All projects</Link>
      <Workspace project={project} viewer={user} />
    </>
  );
}
