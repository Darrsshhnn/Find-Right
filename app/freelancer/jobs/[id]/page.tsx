import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import Icon from "@/components/Icon";
import { ActionForm, Submit } from "@/components/ActionForm";
import { ReviewCard } from "@/components/cards";
import { Avatar, ProposalStatusBadge, Rating, VerifiedBadge } from "@/components/ui";
import { declineInvitation, submitProposal, withdrawProposal } from "@/app/actions/freelancer";
import { requireUser } from "@/lib/auth";
import { AI_LEVELS } from "@/lib/constants";
import { db } from "@/lib/db";
import { daysLeft, money, shortDate, timeAgo } from "@/lib/format";
import JobBrief from "@/components/JobBrief";
import JobSummaryCard from "@/components/JobSummaryCard";
import { budgetLabel, jobTotal } from "@/lib/jobs";
import { clientById, freelancerById, matchScore } from "@/lib/queries";

export const metadata: Metadata = { title: "Project brief" };

export default async function JobDetail({ params }: { params: Promise<{ id: string }> }) {
  const user = await requireUser("freelancer");
  const { id } = await params;
  const data = db();
  const job = data.jobs.find((j) => j.id === id);
  if (!job) notFound();
  const f = freelancerById(user.id, data)!;
  const client = clientById(job.clientId, data)!;
  const match = matchScore(f.profile, job);
  const applicants = data.proposals.filter((p) => p.jobId === id && p.status !== "withdrawn").length;
  const mine = data.proposals.find((p) => p.jobId === id && p.freelancerId === user.id && p.status !== "withdrawn");
  const invitation = data.invitations.find((i) => i.jobId === id && i.freelancerId === user.id && i.status === "pending");
  const clientReviews = data.reviews.filter((r) => r.toId === client.user.id).slice(0, 2);
  const clientJobs = data.jobs.filter((j) => j.clientId === client.user.id).length;
  const left = daysLeft(job.deadline);

  return (
    <>
      <Link href="/freelancer/jobs" className="back"><Icon name="arrowLeft" size={14} /> Back to projects</Link>
      {invitation && (
        <div className="alert alert-info" style={{ marginBottom: 16, justifyContent: "space-between", flexWrap: "wrap" }}>
          <span><Icon name="mail" size={16} /> <b>{client.displayName} invited you:</b> “{invitation.message}”</span>
          <ActionForm action={declineInvitation} showOk={false}><input type="hidden" name="invitationId" value={invitation.id} /><Submit className="btn btn-ghost btn-sm">Decline invitation</Submit></ActionForm>
        </div>
      )}
      <div className="layout-aside">
        <div className="stack-lg">
          <JobSummaryCard
            job={job}
            eyebrow={
              <div className="row-between">
                <div className="meta"><span>Posted {timeAgo(job.createdAt)}</span><span><Icon name="users" size={13} /> {applicants} applied</span><span><Icon name="calendar" size={13} /> {left} days left</span></div>
                <span className="match" title={match.reasons.join(" · ")}><Icon name="zap" size={13} /> {match.score}% match</span>
              </div>
            }
            footer={match.reasons.length > 0 ? <div className="match-reasons">{match.reasons.slice(0, 3).map((r) => <span key={r}>✓ {r}</span>)}</div> : undefined}
          />
          <details className="faq"><summary>Full brief, style & references</summary><div style={{ marginTop: 16 }}><JobBrief job={job} /></div></details>

          {mine ? (
            <section className="card stack">
              <div className="row-between"><h2>Your proposal</h2><ProposalStatusBadge status={mine.status} /></div>
              <p style={{ whiteSpace: "pre-wrap" }}>{mine.coverLetter}</p>
              <div className="meta"><span>{money(mine.amount)}</span><span>{mine.timeline}</span><span>AI: {mine.ai}</span><span>Sent {timeAgo(mine.createdAt)}</span></div>
              {(mine.status === "pending" || mine.status === "shortlisted") && <ActionForm action={withdrawProposal}><input type="hidden" name="proposalId" value={mine.id} /><Submit className="btn btn-danger btn-sm">Withdraw proposal</Submit></ActionForm>}
            </section>
          ) : job.status === "open" ? (
            <ActionForm action={submitProposal} className="card stack">
              <input type="hidden" name="jobId" value={job.id} />
              <div><h2>{invitation ? "Accept invitation & send proposal" : "Write your proposal"}</h2><p className="small muted">No bidding wars — explain your approach. Clients see your match score, portfolio and AI disclosure next to it.</p></div>
              <label className="field">Your approach<textarea name="coverLetter" style={{ minHeight: 150 }} placeholder={`How would you tackle “${job.title}”? Mention relevant work, your process and what's included.`} /></label>
              <div className="stack-sm">
                <b className="small">Attach portfolio samples</b>
                {f.profile.portfolio.length ? (
                  <div className="options">
                    {f.profile.portfolio.map((p) => (
                      <label className="option" key={p.id} style={{ gridTemplateColumns: "56px 1fr", alignItems: "center", gap: 8 }}>
                        <input type="checkbox" name="samples" value={p.id} defaultChecked={p.category === job.category} />
                        {p.image ? <img src={p.image} alt="" style={{ width: 56, height: 42, objectFit: "cover", borderRadius: 6 }} /> : <span className="avatar avatar-sm avatar-square"><Icon name="image" size={14} /></span>}
                        <span><b style={{ fontSize: 13 }}>{p.title}</b><br /><small>{p.source === "platform" ? "Client-verified · " : ""}{p.category}</small></span>
                      </label>
                    ))}
                  </div>
                ) : <p className="small muted">No portfolio pieces yet — <Link className="link" href="/freelancer/profile">add some</Link> to strengthen proposals.</p>}
              </div>
              <div className="form-grid">
                <label className="field">Your price (₹)<input type="number" name="amount" min="1" defaultValue={Math.min(jobTotal(job), Math.max(f.profile.hourlyRate * 20, Math.round(jobTotal(job) * 0.9)))} /><small>Client budget: {budgetLabel(job)}</small></label>
                <label className="field">Delivery timeline<input name="timeline" placeholder="e.g. 3 weeks" defaultValue={job.duration} /></label>
                <label className="field">Extra revision rate (₹/round)<input type="number" min="0" name="extraRevisionRate" defaultValue={job.extraRevisionRate ?? Math.round(f.profile.hourlyRate * 1.5)} /><small>Charged only if the client adds rounds beyond the {job.revisions} included.</small></label>
                <label className="field">AI use on this job<select name="ai" defaultValue={f.profile.ai[job.category] ?? "No AI"}>{AI_LEVELS.map((a) => <option key={a.value} value={a.value}>{a.value}</option>)}</select><small>Pre-filled from your disclosure for {job.category}.</small></label>
              </div>
              <div><Submit pending="Sending…"><Icon name="send" size={16} /> Submit application</Submit></div>
            </ActionForm>
          ) : <p className="alert alert-warn">This job is no longer accepting proposals.</p>}
        </div>

        <aside>
          <section className="card stack">
            <h3>About the client</h3>
            <div className="fl-id"><Avatar name={client.displayName} square /><div><b>{client.displayName}</b><small>{client.profile.location}</small></div></div>
            <div className="row"><VerifiedBadge verified={client.verified} pending={client.profile.verification === "pending"} /><Rating {...client.rating} /></div>
            <div className="kv">
              <div><span>Jobs posted</span><b>{clientJobs}</b></div>
              <div><span>Hires on FindRight</span><b>{client.hires}</b></div>
              <div><span>Paid to freelancers</span><b>{money(client.spent)}</b></div>
              <div><span>Member since</span><b>{shortDate(client.user.createdAt)}</b></div>
            </div>
            {client.profile.bio && <p className="small muted">{client.profile.bio}</p>}
          </section>
          {clientReviews.length > 0 && (
            <section className="stack">
              <h3>What freelancers say</h3>
              {clientReviews.map((r) => <ReviewCard key={r.id} review={r} author={data.users.find((u) => u.id === r.fromId)} />)}
            </section>
          )}
          <section className="card-tint stack-sm">
            <b><Icon name="shield" size={15} /> You&apos;re protected</b>
            <p className="small">You receive an advance before starting. Later milestones are funded into escrow first, and revisions are capped at {job.revisions} rounds.</p>
          </section>
        </aside>
      </div>
    </>
  );
}
