import type { Metadata } from "next";
import Link from "next/link";
import Icon from "@/components/Icon";
import { Avatar, Empty, PageHead, Tabs } from "@/components/ui";
import { requireUser } from "@/lib/auth";
import { db } from "@/lib/db";
import { shortDate, timeAgo } from "@/lib/format";
import { budgetLabel } from "@/lib/jobs";
import { freelancerById } from "@/lib/queries";

export const metadata: Metadata = { title: "Jobs" };

export default async function ClientJobs({ searchParams }: { searchParams: Promise<{ tab?: string }> }) {
  const user = await requireUser("client");
  const { tab = "open" } = await searchParams;
  const data = db();
  const jobs = data.jobs.filter((j) => j.clientId === user.id);
  const shown = jobs.filter((j) => j.status === tab);

  return (
    <>
      <PageHead eyebrow="Hiring activity" title="Posted jobs & responses" description="Review proposals, invite matched freelancers and send contracts." actions={<Link href="/client/jobs/new" className="btn btn-primary"><Icon name="plus" size={16} /> Post a job</Link>} />
      <Tabs active={tab} items={[
        { key: "open", label: "Open", href: "/client/jobs?tab=open", count: jobs.filter((j) => j.status === "open").length },
        { key: "hired", label: "Hired", href: "/client/jobs?tab=hired", count: jobs.filter((j) => j.status === "hired").length },
        { key: "closed", label: "Closed", href: "/client/jobs?tab=closed", count: jobs.filter((j) => j.status === "closed").length },
      ]} />
      {shown.length ? (
        <div className="list">
          {shown.map((job) => {
            const proposals = data.proposals.filter((p) => p.jobId === job.id && p.status !== "withdrawn");
            const fresh = proposals.filter((p) => p.status === "pending").length;
            const invites = data.invitations.filter((i) => i.jobId === job.id);
            return (
              <Link key={job.id} href={`/client/jobs/${job.id}`} className="card card-link row" style={{ alignItems: "flex-start" }}>
                <div className="grow stack-sm">
                  <div className="row"><span className="badge">{job.category}</span><span className="badge badge-outline">{job.level}</span>{job.creditReserved && <span className="badge badge-green"><Icon name="sparkle" size={12} /> Credit reserved</span>}{fresh > 0 && <span className="badge badge-blue">{fresh} new</span>}</div>
                  <h3>{job.title}</h3>
                  <p className="small muted clamp-2">{job.description}</p>
                  <div className="meta"><span>{budgetLabel(job)}</span><span>Due {shortDate(job.deadline)}</span><span>Posted {timeAgo(job.createdAt)}</span><span>{invites.length} invited</span></div>
                </div>
                <div className="stack-sm" style={{ justifyItems: "end" }}>
                  <span className="avatar-stack">{proposals.slice(0, 4).map((p) => { const f = freelancerById(p.freelancerId, data); return <Avatar key={p.id} name={f?.user.name ?? "?"} src={f?.user.avatar} size="sm" />; })}</span>
                  <b className="small">{proposals.length} proposals</b>
                </div>
              </Link>
            );
          })}
        </div>
      ) : <Empty icon="briefcase" title={`No ${tab} jobs`} action={tab === "open" ? <Link href="/client/jobs/new" className="btn btn-primary">Post a job</Link> : undefined}>{tab === "open" ? "Post a structured brief to start receiving matched proposals." : "Jobs will appear here as they move along."}</Empty>}
    </>
  );
}
