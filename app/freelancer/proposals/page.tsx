import type { Metadata } from "next";
import Link from "next/link";
import { ActionForm, Submit } from "@/components/ActionForm";
import { Empty, Notice, PageHead, ProposalStatusBadge, Tabs } from "@/components/ui";
import { withdrawProposal } from "@/app/actions/freelancer";
import { requireUser } from "@/lib/auth";
import { db } from "@/lib/db";
import { money, timeAgo } from "@/lib/format";
import { clientById } from "@/lib/queries";

export const metadata: Metadata = { title: "Proposals" };

const GROUPS: Record<string, string[]> = { active: ["pending", "shortlisted"], hired: ["hired"], archived: ["declined", "withdrawn"] };

export default async function Proposals({ searchParams }: { searchParams: Promise<{ tab?: string; sent?: string }> }) {
  const user = await requireUser("freelancer");
  const { tab = "active", sent } = await searchParams;
  const data = db();
  const all = data.proposals.filter((p) => p.freelancerId === user.id);
  const shown = all.filter((p) => (GROUPS[tab] ?? GROUPS.active!).includes(p.status));

  return (
    <>
      <PageHead eyebrow="Your applications" title="Proposals" description="Track every application in one place. Clients shortlist, decline or close jobs — so you're never left guessing." actions={<Link href="/freelancer/jobs" className="btn btn-primary">Find more work</Link>} />
      {sent && <Notice text="Proposal sent! The client has been notified. Replies arrive here and in Messages." />}
      <Tabs active={tab} items={[
        { key: "active", label: "Active", href: "/freelancer/proposals?tab=active", count: all.filter((p) => GROUPS.active!.includes(p.status)).length },
        { key: "hired", label: "Hired", href: "/freelancer/proposals?tab=hired", count: all.filter((p) => p.status === "hired").length },
        { key: "archived", label: "Archived", href: "/freelancer/proposals?tab=archived", count: all.filter((p) => GROUPS.archived!.includes(p.status)).length },
      ]} />
      {shown.length ? (
        <div className="list">
          {shown.map((p) => {
            const job = data.jobs.find((j) => j.id === p.jobId);
            const project = data.projects.find((x) => x.proposalId === p.id && x.status !== "cancelled");
            return (
              <article key={p.id} className="card stack-sm">
                <div className="row-between">
                  <div className="row"><ProposalStatusBadge status={p.status} />{p.invited && <span className="badge badge-dark">Invited</span>}<span className="small muted">Sent {timeAgo(p.createdAt)}</span></div>
                  <b>{money(p.amount)}</b>
                </div>
                <h3><Link href={`/freelancer/jobs/${p.jobId}`}>{job?.title}</Link></h3>
                <p className="small muted">{job ? clientById(job.clientId, data)?.displayName : ""} · {p.timeline} · AI: {p.ai}</p>
                <p className="small clamp-2">{p.coverLetter}</p>
                {p.status === "declined" && p.declineReason && <p className="card-tint small"><b>Client feedback:</b> {p.declineReason}</p>}
                <div className="row">
                  {project && <Link href={`/freelancer/projects/${project.id}`} className="btn btn-primary btn-sm">{project.status === "offer" ? "Review contract offer" : "Open project"}</Link>}
                  {(p.status === "pending" || p.status === "shortlisted") && <ActionForm action={withdrawProposal} showOk={false}><input type="hidden" name="proposalId" value={p.id} /><Submit className="btn btn-ghost btn-sm">Withdraw</Submit></ActionForm>}
                </div>
              </article>
            );
          })}
        </div>
      ) : <Empty icon="send" title="Nothing here yet" action={<Link href="/freelancer/jobs" className="btn btn-outline">Browse matched projects</Link>}>Applications you send will be tracked here.</Empty>}
    </>
  );
}
