import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import Icon from "@/components/Icon";
import { ActionForm, Submit } from "@/components/ActionForm";
import JobSummaryCard from "@/components/JobSummaryCard";
import { Avatar, Notice, ProposalStatusBadge } from "@/components/ui";
import { closeJob, inviteFreelancer, startConversation } from "@/app/actions/client";
import DeclineButton from "@/components/DeclineButton";
import { requireUser } from "@/lib/auth";
import { db } from "@/lib/db";
import { money, timeAgo } from "@/lib/format";
import JobBrief from "@/components/JobBrief";
import { allFreelancers, freelancerById, matchScore } from "@/lib/queries";

export const metadata: Metadata = { title: "Job" };

export default async function ClientJob({ params, searchParams }: { params: Promise<{ id: string }>; searchParams: Promise<{ posted?: string; sort?: string }> }) {
  const user = await requireUser("client");
  const { id } = await params;
  const { posted, sort = "match" } = await searchParams;
  const data = db();
  const job = data.jobs.find((j) => j.id === id && j.clientId === user.id);
  if (!job) notFound();
  const proposals = data.proposals
    .filter((p) => p.jobId === id && p.status !== "withdrawn")
    .map((p) => ({ p, f: freelancerById(p.freelancerId, data)! }))
    .filter((x) => x.f)
    .map((x) => ({ ...x, match: matchScore(x.f.profile, job) }));
  proposals.sort((a, b) => (sort === "price" ? a.p.amount - b.p.amount : sort === "rating" ? b.f.rating.average - a.f.rating.average : b.match.score - a.match.score));
  const invitations = data.invitations.filter((i) => i.jobId === id);
  const involved = new Set([...proposals.map((x) => x.f.user.id), ...invitations.map((i) => i.freelancerId)]);
  const suggestions = allFreelancers(data)
    .filter((f) => !involved.has(f.user.id))
    .map((f) => ({ f, m: matchScore(f.profile, job) }))
    .filter((x) => x.m.score >= 40)
    .sort((a, b) => b.m.score - a.m.score)
    .slice(0, 4);
  const contracts = data.projects.filter((p) => p.jobId === id);

  return (
    <>
      <Link href="/client/jobs" className="back"><Icon name="arrowLeft" size={14} /> All jobs</Link>
      {posted && <Notice text="Your job is live. We've ranked matching freelancers below — invite the best fits directly." />}
      <div className="layout-aside">
        <div className="stack-lg">
          <JobSummaryCard
            job={job}
            eyebrow={<div className="row-between"><span className={`badge ${job.status === "open" ? "badge-green" : "badge-grey"}`}>{job.status === "open" ? "Open for proposals" : job.status === "hired" ? "Hired" : "Closed"}</span><span className="small muted">Posted {timeAgo(job.createdAt)}</span></div>}
          />
          <details className="faq"><summary>Full brief, style & references</summary><div style={{ marginTop: 16 }}><JobBrief job={job} /></div></details>

          <section className="stack">
            <div className="row-between">
              <h2>Proposals ({proposals.length})</h2>
              <div className="segmented">
                {[["match", "Best match"], ["rating", "Top rated"], ["price", "Lowest price"]].map(([k, l]) => <Link key={k} href={`/client/jobs/${id}?sort=${k}`} style={{ padding: "6px 12px", borderRadius: 8, fontSize: 12.5, fontWeight: 500, background: sort === k ? "#fff" : undefined, color: sort === k ? "var(--primary-deep)" : "var(--muted-2)" }}>{l}</Link>)}
              </div>
            </div>
            {proposals.length === 0 && <p className="card-flat muted">No proposals yet. Invite matched freelancers from the panel — invited freelancers respond 3× faster.</p>}
            <div className="grid-2">
            {proposals.map(({ p, f, match }) => {
              const contract = contracts.find((c) => c.proposalId === p.id && c.status !== "declined" && c.status !== "cancelled");
              const profile = `/client/freelancers/${f.user.id}`;
              return (
                <article key={p.id} className="card proposal-card">
                  <Link href={profile} className="card-cover-link" aria-label={`Open ${f.user.name}'s full profile`} />
                  <div className="row-between" style={{ flexWrap: "nowrap", alignItems: "flex-start" }}>
                    <div className="fl-id">
                      <Avatar name={f.user.name} src={f.user.avatar} />
                      <div style={{ minWidth: 0 }}>
                        <b className="truncate">{f.user.name}</b>
                        <small className="truncate">{f.profile.headline}</small>
                      </div>
                    </div>
                    <span className="match" title={match.reasons.join(" · ")}><Icon name="zap" size={12} /> {match.score}%</span>
                  </div>
                  <div className="fl-line">
                    <span className="rating"><Icon name="star" size={13} /> {f.rating.count ? f.rating.average.toFixed(1) : "New"}</span>
                    <span>{f.profile.level}</span>
                    {p.invited && <span>Invited</span>}
                    <ProposalStatusBadge status={p.status} />
                  </div>
                  <dl className="proposal-facts">
                    <div><dt><Icon name="wallet" size={14} /> Offer</dt><dd>{money(p.amount)}</dd></div>
                    <div><dt><Icon name="clock" size={14} /> Timeline</dt><dd>{p.timeline}</dd></div>
                    <div><dt><Icon name="bot" size={14} /> AI</dt><dd>{p.ai === "No AI" ? "Human-made" : p.ai}</dd></div>
                  </dl>
                  <p className="small muted clamp-2">{p.coverLetter}</p>
                  {p.status === "declined" && p.declineReason && <p className="small muted clamp-2">Declined — “{p.declineReason}”</p>}
                  <div className="card-foot proposal-actions">
                    {contract ? (
                      <Link href={`/client/projects/${contract.id}`} className="btn btn-primary btn-sm"><Icon name="folder" size={14} /> Contract</Link>
                    ) : job.status === "open" && p.status !== "declined" ? (
                      <Link href={`/client/jobs/${id}/hire/${p.id}`} className="btn btn-primary btn-sm"><Icon name="check" size={14} /> Hire</Link>
                    ) : null}
                    <form action={startConversation}><input type="hidden" name="freelancerId" value={f.user.id} /><input type="hidden" name="jobId" value={id} /><button className="btn btn-outline btn-sm"><Icon name="chat" size={14} /> Chat</button></form>
                    {(p.status === "pending" || p.status === "shortlisted") && job.status === "open" && !contract && <DeclineButton proposalId={p.id} name={f.user.name.split(" ")[0]!} />}
                    <span className="small muted right">{timeAgo(p.createdAt)}</span>
                  </div>
                </article>
              );
            })}
            </div>
          </section>
        </div>

        <aside>
          <section className="card stack">
            <div className="kv">
              <div><span>Proposals</span><b>{proposals.length}</b></div>
              <div><span>Invited</span><b>{invitations.length}</b></div>
              <div><span>Starter credit</span><b>{job.creditReserved ? "Reserved" : "Not used"}</b></div>
            </div>
            {job.status === "open" && <ActionForm action={closeJob}><input type="hidden" name="jobId" value={id} /><Submit className="btn btn-danger btn-sm btn-block">Close job</Submit></ActionForm>}
          </section>

          {job.status === "open" && (
            <section className="card stack">
              <div><h3>Invite matched freelancers</h3><p className="small muted">Ranked by skills, experience level and availability.</p></div>
              {suggestions.length ? suggestions.map(({ f, m }) => (
                <div key={f.user.id} className="stack-sm" style={{ paddingBottom: 16, borderBottom: "1px solid var(--line)" }}>
                  <div className="row">
                    <Avatar name={f.user.name} src={f.user.avatar} size="sm" />
                    <div className="grow"><Link href={`/client/freelancers/${f.user.id}`}><b className="small">{f.user.name}</b></Link><div className="small muted truncate">{f.profile.headline}</div></div>
                    <span className="match">{m.score}%</span>
                  </div>
                  <div className="match-reasons">{m.reasons.slice(0, 3).map((r) => <span key={r}>{r}</span>)}</div>
                  <ActionForm action={inviteFreelancer} showOk>
                    <input type="hidden" name="jobId" value={id} /><input type="hidden" name="freelancerId" value={f.user.id} />
                    <Submit className="btn btn-outline btn-sm" pending="Inviting…"><Icon name="send" size={14} /> Invite</Submit>
                  </ActionForm>
                </div>
              )) : <p className="small muted">Everyone who fits has already been invited or applied.</p>}
              <Link href={`/client/find?job=${id}`} className="link small">Browse all talent ranked for this job →</Link>
            </section>
          )}

          {invitations.length > 0 && (
            <section className="card stack">
              <h3>Direct invitations</h3>
              {invitations.map((i) => { const f = freelancerById(i.freelancerId, data); return (
                <div key={i.id} className="row"><Avatar name={f?.user.name ?? ""} src={f?.user.avatar} size="sm" /><span className="grow small">{f?.user.name}</span><span className={`badge ${i.status === "accepted" ? "badge-green" : i.status === "declined" ? "badge-grey" : ""}`}>{i.status === "accepted" ? "Applied" : i.status === "declined" ? "Declined" : "Pending"}</span></div>
              ); })}
            </section>
          )}
        </aside>
      </div>
    </>
  );
}
