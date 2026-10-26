import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import Icon from "@/components/Icon";
import Workspace from "@/components/Workspace";
import { Notice } from "@/components/ui";
import { requireUser } from "@/lib/auth";
import { db } from "@/lib/db";

export const metadata: Metadata = { title: "Project workspace" };

export default async function ClientProject({ params, searchParams }: { params: Promise<{ id: string }>; searchParams: Promise<{ offer?: string; reviewed?: string }> }) {
  const user = await requireUser("client");
  const { id } = await params;
  const { offer, reviewed } = await searchParams;
  const project = db().projects.find((p) => p.id === id && p.clientId === user.id);
  if (!project) notFound();
  return (
    <>
      <Link href="/client/projects" className="back"><Icon name="arrowLeft" size={14} /> All projects</Link>
      {offer && project.status === "offer" && <Notice text="Contract offer sent. You'll be notified as soon as the freelancer accepts — then you'll pay the advance to start." />}
      {reviewed && <Notice text="Thanks — your review is published on the freelancer's profile." />}
      <Workspace project={project} viewer={user} />
    </>
  );
}
