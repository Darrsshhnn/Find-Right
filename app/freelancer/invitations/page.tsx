import type { Metadata } from "next";
import Link from "next/link";
import Icon from "@/components/Icon";
import { ActionForm, Submit } from "@/components/ActionForm";
import { Avatar, Empty, PageHead, VerifiedBadge } from "@/components/ui";
import { declineInvitation } from "@/app/actions/freelancer";
import { requireUser } from "@/lib/auth";
import { db } from "@/lib/db";
import { shortDate, timeAgo } from "@/lib/format";
import { budgetLabel } from "@/lib/jobs";
import { clientById, freelancerById, matchScore } from "@/lib/queries";

export const metadata: Metadata = { title: "Invitations" };

export default async function Invitations() {
  const user = await requireUser("freelancer");
  const data = db();
  const f = freelancerById(user.id, data)!;
  const invitations = data.invitations.filter((i) => i.freelancerId === user.id).sort((a, b) => b.createdAt.localeCompare(a.createdAt));
  const pending = invitations.filter((i) => i.status === "pending" && data.jobs.find((j) => j.id === i.jobId)?.status === "open");
  const past = invitations.filter((i) => !pending.includes(i));

  return (
    <>
      <PageHead eyebrow="Direct invitations" title="Clients who want to work with you" description="Invited clients chose you from your profile — respond quickly, invitations convert far better than cold proposals." />
      {pending.length ? (
        <div className="list">
          {pending.map((i) => {
            const job = data.jobs.find((j) => j.id === i.jobId)!;
            const client = clientById(i.clientId, data)!;
            const match = matchScore(f.profile, job);
            return (
              <article key={i.id} className="card stack">
                <div className="row-between">
                  <div className="row"><Avatar name={client.displayName} square /><div><b>{client.displayName}</b><div className="row" style={{ gap: 8 }}><VerifiedBadge verified={client.verified} pending={client.profile.verification === "pending"} /><span className="small muted">{timeAgo(i.createdAt)}</span></div></div></div>
                  <span className="match"><Icon name="zap" size={13} /> {match.score}% match</span>
                </div>
                <p className="card-tint small">“{i.message}”</p>
                <div><h3>{job.title}</h3><p className="small muted clamp-2">{job.description}</p></div>
                <div className="meta"><span>{budgetLabel(job)}</span><span>Due {shortDate(job.deadline)}</span><span>{job.level}</span><span>{job.revisions} revisions</span></div>
                <div className="row">
                  <Link href={`/freelancer/jobs/${job.id}`} className="btn btn-primary btn-sm">View brief & send proposal</Link>
                  <ActionForm action={declineInvitation} showOk={false}><input type="hidden" name="invitationId" value={i.id} /><Submit className="btn btn-ghost btn-sm">Decline</Submit></ActionForm>
                </div>
              </article>
            );
          })}
        </div>
      ) : <Empty icon="mail" title="No open invitations" action={<Link href="/freelancer/profile" className="btn btn-outline">Strengthen your profile</Link>}>Keep your availability on and your portfolio fresh — clients invite freelancers they find in search.</Empty>}
      {past.length > 0 && (
        <section className="stack" style={{ marginTop: 32 }}>
          <h2>Past invitations</h2>
          {past.map((i) => {
            const job = data.jobs.find((j) => j.id === i.jobId);
            return (
              <div key={i.id} className="list-row"><span className="grow">{job?.title}</span><span className="small muted">{clientById(i.clientId, data)?.displayName}</span><span className={`badge ${i.status === "accepted" ? "badge-green" : "badge-grey"}`}>{i.status === "accepted" ? "Applied" : i.status === "declined" ? "Declined" : "Job closed"}</span></div>
            );
          })}
        </section>
      )}
    </>
  );
}
