import type { Metadata } from "next";
import Link from "next/link";
import { notFound, redirect } from "next/navigation";
import ContractBuilder from "@/components/ContractBuilder";
import Icon from "@/components/Icon";
import JobSummaryCard from "@/components/JobSummaryCard";
import { AiBadge, Avatar, PageHead, Rating } from "@/components/ui";
import { requireUser } from "@/lib/auth";
import { db } from "@/lib/db";
import { money } from "@/lib/format";
import { clientById, creditsAvailable, freelancerById } from "@/lib/queries";

export const metadata: Metadata = { title: "Send contract" };

export default async function Hire({ params }: { params: Promise<{ id: string; proposalId: string }> }) {
  const user = await requireUser("client");
  const { id, proposalId } = await params;
  const data = db();
  const job = data.jobs.find((j) => j.id === id && j.clientId === user.id);
  const proposal = data.proposals.find((p) => p.id === proposalId && p.jobId === id);
  if (!job || !proposal) notFound();
  const existing = data.projects.find((p) => p.proposalId === proposalId && p.status !== "declined" && p.status !== "cancelled");
  if (existing) redirect(`/client/projects/${existing.id}`);
  const f = freelancerById(proposal.freelancerId, data)!;
  const client = clientById(user.id, data)!;
  const samples = f.profile.portfolio.filter((x) => proposal.samples.includes(x.id));

  return (
    <>
      <Link href={`/client/jobs/${id}`} className="back"><Icon name="arrowLeft" size={14} /> Back to proposals</Link>
      <PageHead eyebrow="Hire a freelancer" title={`Agree the project with ${f.user.name}`} description="Your job post and the freelancer's offer pre-fill the agreement. Adjust anything you discussed, then send it for acceptance." />
      <div className="grid-2" style={{ marginBottom: 24 }}>
        <JobSummaryCard job={job} eyebrow={<span className="eyebrow">Your job post</span>} />
        <article className="card stack">
          <span className="eyebrow">{f.user.name.split(" ")[0]}&apos;s offer</span>
          <div className="fl-id"><Avatar name={f.user.name} src={f.user.avatar} size="lg" /><div><b><Link href={`/client/freelancers/${f.user.id}`}>{f.user.name}</Link></b><small>{f.profile.headline}</small><div style={{ marginTop: 4 }}><Rating {...f.rating} /></div></div></div>
          <dl className="fact-grid">
            <div className="fact"><span className="fact-icon"><Icon name="wallet" size={16} /></span><div><dt>Offer</dt><dd>{money(proposal.amount)}</dd></div></div>
            <div className="fact"><span className="fact-icon"><Icon name="clock" size={16} /></span><div><dt>Timeline</dt><dd>{proposal.timeline}</dd></div></div>
            <div className="fact"><span className="fact-icon"><Icon name="repeat" size={16} /></span><div><dt>Extra round</dt><dd>{proposal.extraRevisionRate ? money(proposal.extraRevisionRate) : "Not set"}</dd></div></div>
            <div className="fact"><span className="fact-icon"><Icon name="bot" size={16} /></span><div><dt>AI usage</dt><dd><AiBadge level={proposal.ai} /></dd></div></div>
          </dl>
          <p className="small muted clamp-3">“{proposal.coverLetter}”</p>
          {samples.length > 0 && <span className="small muted row"><Icon name="image" size={14} /> {samples.length} portfolio sample{samples.length > 1 ? "s" : ""} attached</span>}
        </article>
      </div>
      <ContractBuilder
        id={proposalId}
        freelancerName={f.user.name.split(" ")[0]!}
        creditReserved={job.creditReserved}
        creditsLeft={creditsAvailable(user.id, data)}
        fee={{ freelancer: { level: f.profile.level, rating: f.rating.average, completed: f.completed }, client: { hires: client.hires, verified: client.verified } }}
        defaults={{
          scope: job.description, deliverables: job.deliverables || "Final design files and source assets.", deadline: job.deadline, price: proposal.amount,
          revisions: job.revisions, ai: proposal.ai, schedule: job.schedule, extraRevisionRate: proposal.extraRevisionRate ?? job.extraRevisionRate,
        }}
      />
    </>
  );
}
