import type { Metadata } from "next";
import Link from "next/link";
import Icon from "@/components/Icon";
import TourButton from "@/components/TourButton";
import { FreelancerCard } from "@/components/cards";
import { Avatar, Empty, Notice, ProjectStatusBadge } from "@/components/ui";
import { requireUser } from "@/lib/auth";
import { db } from "@/lib/db";
import { money, shortDate, timeAgo } from "@/lib/format";
import { budgetLabel } from "@/lib/jobs";
import { allFreelancers, clientById, freelancerById } from "@/lib/queries";

export const metadata: Metadata = { title: "Client dashboard" };

export default async function ClientHome({ searchParams }: { searchParams: Promise<{ welcome?: string }> }) {
  const user = await requireUser("client");
  const { welcome } = await searchParams;
  const data = db();
  const client = clientById(user.id, data)!;
  const jobs = data.jobs.filter((j) => j.clientId === user.id);
  const openJobs = jobs.filter((j) => j.status === "open");
  const projects = data.projects.filter((p) => p.clientId === user.id);
  const active = projects.filter((p) => p.status === "active" || p.status === "awaiting_funding");
  const escrow = projects.flatMap((p) => p.milestones).filter((m) => ["funded", "submitted", "changes"].includes(m.status)).reduce((s, m) => s + m.charge, 0);
  const proposals = data.proposals.filter((p) => jobs.some((j) => j.id === p.jobId));
  const todo = [
    ...projects.filter((p) => p.status === "awaiting_funding").map((p) => ({ href: `/client/projects/${p.id}`, icon: "wallet", text: `Pay the advance to start “${p.title}”`, tone: "badge-amber", tag: "Payment" })),
    ...projects.filter((p) => p.milestones.some((m) => m.status === "submitted")).map((p) => ({ href: `/client/projects/${p.id}`, icon: "file", text: `Review the delivery for “${p.title}”`, tone: "", tag: "Review" })),
    ...openJobs.filter((j) => proposals.some((p) => p.jobId === j.id && p.status === "pending")).map((j) => ({ href: `/client/jobs/${j.id}`, icon: "users", text: `${proposals.filter((p) => p.jobId === j.id && p.status === "pending").length} new proposals on “${j.title}”`, tone: "badge-blue", tag: "Proposals" })),
    ...projects.filter((p) => p.status === "completed" && !data.reviews.some((r) => r.projectId === p.id && r.fromId === user.id)).map((p) => ({ href: `/client/projects/${p.id}`, icon: "star", text: `Leave a review for “${p.title}”`, tone: "badge-green", tag: "Review" })),
  ];
  const categories = client.profile.categories;
  const recommended = allFreelancers(data)
    .filter((f) => !categories.length || f.profile.disciplines.some((d) => categories.includes(d)))
    .sort((a, b) => (a.profile.availability === "now" ? -1 : 0) - (b.profile.availability === "now" ? -1 : 0) || b.rating.average - a.rating.average)
    .slice(0, 3);

  return (
    <div className="stack-lg">
      {welcome && <Notice text="Welcome to FindRight! Post your first brief and we'll match you with the right freelancers." />}
      <section className="hero-card">
        <div className="stack-sm" style={{ position: "relative", zIndex: 1 }}>
          <span className="badge"><Icon name="shield" size={13} /> 10% advance after confirmation · rest in escrow until you approve</span>
          <h1>Welcome, {user.name.split(" ")[0]}</h1>
          <p>{client.displayName !== user.name ? `${client.displayName} · ` : ""}Manage briefs, proposals, escrow contracts and verified rising designers.</p>
          <div className="row" style={{ marginTop: 8 }}>
            <Link href="/client/jobs/new" className="btn btn-primary"><Icon name="plus" size={16} /> Post a job</Link>
            <Link href="/client/find?available=now" className="btn" style={{ color: "#fff", border: "1px solid rgba(255,255,255,.3)" }}><Icon name="zap" size={16} /> Find someone available now</Link>
            <Link href="/client/demo" className="btn" style={{ color: "#fff" }}>See how hiring works →</Link>
            <TourButton className="btn" label="App guide" />
          </div>
        </div>
      </section>

      {client.profile.verification === "pending" && <p className="alert alert-warn"><Icon name="clock" /> Your company verification is being reviewed. You can post jobs now — the verified badge appears on your briefs once approved.</p>}
      {client.profile.verification === "rejected" && <p className="alert alert-error">Company verification needs changes: {client.profile.verificationNote} <Link className="link" href="/client/profile">Update details</Link></p>}

      <section className="grid-4">
        <div className="stat"><span>Open jobs</span><strong>{openJobs.length}</strong><small>{proposals.filter((p) => p.status === "pending").length} proposals to review</small></div>
        <div className="stat"><span>Active contracts</span><strong>{active.length}</strong><small>{projects.filter((p) => p.status === "completed").length} completed</small></div>
        <div className="stat"><span>Held in escrow</span><strong>{money(escrow)}</strong><small>Released only on approval</small></div>
        <div className="stat"><span>Your client rating</span><strong>{client.rating.count ? `${client.rating.average} ★` : "—"}</strong><small>{client.rating.count} reviews from freelancers</small></div>
      </section>

      <div className="layout-aside">
        <div className="stack-lg">
          <section className="card">
            <div className="card-head"><h2>Needs your attention</h2><span className="badge">{todo.length}</span></div>
            {todo.length ? (
              <div className="list">
                {todo.map((t) => (
                  <Link key={t.href + t.text} href={t.href} className="list-row">
                    <span className="icon-btn" style={{ width: 36, height: 36 }}><Icon name={t.icon} size={16} /></span>
                    <span className="grow">{t.text}</span>
                    <span className={`badge ${t.tone}`}>{t.tag}</span>
                    <Icon name="arrowRight" size={16} />
                  </Link>
                ))}
              </div>
            ) : <p className="muted">You&apos;re all caught up.</p>}
          </section>

          <section className="card">
            <div className="card-head"><h2>Your posted jobs & replies</h2><Link href="/client/jobs" className="link">All jobs →</Link></div>
            {openJobs.length ? (
              <div className="list">
                {openJobs.slice(0, 4).map((job) => {
                  const replies = data.proposals.filter((p) => p.jobId === job.id && p.status !== "withdrawn");
                  return (
                    <Link key={job.id} href={`/client/jobs/${job.id}`} className="list-row">
                      <div className="grow stack-sm" style={{ gap: 4 }}>
                        <div className="row"><span className="badge badge-green"><span className="dot dot-green" /> Open for proposals</span><span className="badge">{job.category}</span></div>
                        <b>{job.title}</b>
                        <span className="small muted">Budget {budgetLabel(job)} · Due {shortDate(job.deadline)} · posted {timeAgo(job.createdAt)}</span>
                      </div>
                      <div className="row">
                        <span className="avatar-stack">{replies.slice(0, 3).map((r) => { const f = freelancerById(r.freelancerId, data); return <Avatar key={r.id} name={f?.user.name ?? "?"} src={f?.user.avatar} size="sm" />; })}</span>
                        <b className="small">{replies.length} {replies.length === 1 ? "reply" : "replies"}</b>
                      </div>
                    </Link>
                  );
                })}
              </div>
            ) : <Empty icon="briefcase" title="No open jobs" action={<Link href="/client/jobs/new" className="btn btn-primary">Post your first job</Link>}>A structured brief gets better matches — it takes about 3 minutes.</Empty>}
          </section>

          <section className="card">
            <div className="card-head"><h2>Active projects & escrow contracts</h2><Link href="/client/projects" className="link">All projects →</Link></div>
            {active.length ? (
              <div className="list">
                {active.map((p) => {
                  const f = freelancerById(p.freelancerId, data);
                  const paid = p.milestones.filter((m) => m.status === "released").reduce((s, m) => s + m.amount, 0);
                  const pct = Math.round((paid / Math.max(1, p.price)) * 100);
                  return (
                    <Link key={p.id} href={`/client/projects/${p.id}`} className="list-row">
                      <Avatar name={f?.user.name ?? ""} src={f?.user.avatar} />
                      <div className="grow stack-sm" style={{ gap: 8 }}>
                        <div className="row-between"><b>{p.title}</b><ProjectStatusBadge status={p.status} /></div>
                        <span className="small muted">{f?.user.name} · {money(p.price - p.discount)} · due {shortDate(p.deadline)}</span>
                        <div className="bar bar-green"><i style={{ width: `${pct}%` }} /></div>
                      </div>
                    </Link>
                  );
                })}
              </div>
            ) : <p className="muted">No active contracts. Hire from a job&apos;s proposals to start one.</p>}
          </section>
        </div>

        <aside>
          <section className="stack">
            <div className="row-between"><h2>Recommended talent</h2><Link className="link" href="/client/find">See all</Link></div>
            {recommended.map((f) => <FreelancerCard key={f.user.id} f={f} saved={client.profile.saved.includes(f.user.id)} />)}
          </section>
        </aside>
      </div>
    </div>
  );
}
