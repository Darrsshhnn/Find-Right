import type { Metadata } from "next";
import Link from "next/link";
import AvailabilitySwitch from "@/components/AvailabilitySwitch";
import DashHero from "@/components/DashHero";
import Icon from "@/components/Icon";
import TourButton from "@/components/TourButton";
import { JobCard } from "@/components/cards";
import { Empty, Notice, ProjectStatusBadge } from "@/components/ui";
import { requireUser } from "@/lib/auth";
import { db } from "@/lib/db";
import { TIME_ZONE, hourNow, money, shortDate } from "@/lib/format";
import { clientById, freelancerById, matchScore } from "@/lib/queries";

export const metadata: Metadata = { title: "Freelancer workspace" };

export default async function FreelancerHome({ searchParams }: { searchParams: Promise<{ welcome?: string }> }) {
  const user = await requireUser("freelancer");
  const { welcome } = await searchParams;
  const data = db();
  const f = freelancerById(user.id, data)!;
  const hour = hourNow();
  const today = new Date().toLocaleDateString("en-IN", { weekday: "long", day: "numeric", month: "long", timeZone: TIME_ZONE });
  const greeting = hour < 12 ? "Good morning" : hour < 17 ? "Good afternoon" : "Good evening";
  const applied = new Set(data.proposals.filter((p) => p.freelancerId === user.id && p.status !== "withdrawn").map((p) => p.jobId));
  const invitations = data.invitations.filter((i) => i.freelancerId === user.id && i.status === "pending" && data.jobs.find((j) => j.id === i.jobId)?.status === "open");
  const recommended = data.jobs
    .filter((j) => j.status === "open" && !applied.has(j.id))
    .map((job) => ({ job, match: matchScore(f.profile, job) }))
    .filter((x) => x.match.score >= 45)
    .sort((a, b) => b.match.score - a.match.score)
    .slice(0, 4);
  const projects = data.projects.filter((p) => p.freelancerId === user.id);
  const active = projects.filter((p) => p.status === "active" || p.status === "awaiting_funding");
  const proposals = data.proposals.filter((p) => p.freelancerId === user.id && (p.status === "pending" || p.status === "shortlisted"));
  const escrow = projects.flatMap((p) => p.milestones).filter((m) => ["funded", "submitted", "changes"].includes(m.status)).reduce((s, m) => s + m.amount, 0);
  const todo = [
    ...projects.filter((p) => p.status === "offer").map((p) => ({ href: `/freelancer/projects/${p.id}`, icon: "file", text: `Review the contract offer for “${p.title}”`, tag: "Offer", tone: "" })),
    ...projects.filter((p) => p.status === "active" && p.milestones.some((m) => m.status === "funded" || m.status === "changes")).map((p) => ({ href: `/freelancer/projects/${p.id}`, icon: "upload", text: `Deliver the next milestone of “${p.title}”`, tag: p.milestones.some((m) => m.status === "changes") ? "Changes" : "Funded", tone: "badge-green" })),
    ...invitations.map((i) => ({ href: "/freelancer/invitations", icon: "mail", text: `${clientById(i.clientId, data)?.displayName} invited you to “${data.jobs.find((j) => j.id === i.jobId)?.title}”`, tag: "Invite", tone: "badge-blue" })),
    ...projects.filter((p) => p.status === "completed" && !data.reviews.some((r) => r.projectId === p.id && r.fromId === user.id)).map((p) => ({ href: `/freelancer/projects/${p.id}`, icon: "star", text: `Review your client for “${p.title}”`, tag: "Review", tone: "badge-amber" })),
    ...projects.filter((p) => p.status === "completed" && !p.portfolioAdded).map((p) => ({ href: `/freelancer/projects/${p.id}`, icon: "shield", text: `Add “${p.title}” as a client-verified portfolio piece`, tag: "Portfolio", tone: "" })),
  ];

  return (
    <div className="stack-lg">
      {welcome && <Notice text="Your profile is live! Complete the trust steps to rank higher in client searches." />}
      <DashHero
        date={today}
        badge={<span className="badge"><Icon name={f.tier === "Rising talent" ? "sparkle" : "shield"} size={13} /> {f.tier} · verified freelancer</span>}
        title={`${greeting}, ${user.name.split(" ")[0]}`}
        text={recommended.length ? `${recommended.length} new project${recommended.length > 1 ? "s" : ""} match your skills.` : "New verified briefs arrive daily."}
        actions={<>
          <AvailabilitySwitch value={f.profile.availability} />
          <Link href="/freelancer/jobs" className="btn btn-primary"><Icon name="search" size={16} /> Find work</Link>
          <TourButton className="btn btn-glass" label="App guide" />
        </>}
        ring={{ value: f.trust, display: String(f.trust), label: "Trust score" }}
        stats={[
          { icon: "mail", label: "Invitations", value: invitations.length, href: "/freelancer/invitations" },
          { icon: "send", label: "Open proposals", value: proposals.length, href: "/freelancer/proposals" },
          { icon: "lock", label: "Secured in escrow", value: money(escrow), href: "/freelancer/earnings" },
          { icon: "star", label: "Rating", value: f.rating.count ? `${f.rating.average.toFixed(1)} ★` : "—" },
        ]}
      />

      <div className="layout-aside">
        <div className="stack-lg">
          {active.map((p) => {
            const paid = p.milestones.filter((m) => m.status === "released").reduce((s, m) => s + m.amount, 0);
            return (
              <section key={p.id} className="card stack">
                <div className="row-between"><span className="badge badge-green">Active FindRight contract</span><ProjectStatusBadge status={p.status} /></div>
                <h2>{p.title}</h2>
                <div className="meta"><span>Client: {clientById(p.clientId, data)?.displayName}</span><span>Due {shortDate(p.deadline)}</span><span><Icon name="lock" size={13} /> Funds safely in escrow</span></div>
                <div className="bar bar-green"><i style={{ width: `${(paid / p.price) * 100}%` }} /></div>
                <div className="row-between"><span className="small muted">{money(paid)} of {money(p.price)} received</span><Link href={`/freelancer/projects/${p.id}`} className="btn btn-primary btn-sm">Open workspace</Link></div>
              </section>
            );
          })}

          <section className="stack">
            <div className="row-between"><div><span className="eyebrow">Relevant projects</span><h2>Recommended for your craft</h2></div><Link href="/freelancer/jobs" className="link">Browse all →</Link></div>
            {recommended.length ? (
              <div className="grid-2">
                {recommended.map(({ job, match }) => (
                  <JobCard key={job.id} job={job} client={clientById(job.clientId, data)} applicants={data.proposals.filter((p) => p.jobId === job.id && p.status !== "withdrawn").length} match={match} href={`/freelancer/jobs/${job.id}`} invited={invitations.some((i) => i.jobId === job.id)} />
                ))}
              </div>
            ) : <Empty icon="search" title="No strong matches right now" action={<Link href="/freelancer/profile" className="btn btn-outline">Update skills & disciplines</Link>}>Broaden your disciplines or skills to see more projects.</Empty>}
          </section>
        </div>

        <aside>
          <section className="card">
            <div className="card-head"><h3>Your to-do</h3><span className="badge">{todo.length}</span></div>
            {todo.length ? (
              <div className="list">
                {todo.map((t) => (
                  <Link key={t.href + t.text} href={t.href} className="list-row" style={{ padding: 16 }}>
                    <Icon name={t.icon} size={16} />
                    <span className="grow small">{t.text}</span>
                    <span className={`badge ${t.tone}`}>{t.tag}</span>
                  </Link>
                ))}
              </div>
            ) : <p className="muted small">Nothing pending. Nice work!</p>}
          </section>
          <section className="card stack-sm">
            <h3>Next trust step</h3>
            {f.steps.filter((s) => !s.done).slice(0, 2).map((s) => <div key={s.label}><b className="small">{s.label}</b><p className="small muted">{s.detail}</p></div>)}
            {f.steps.every((s) => s.done) && <p className="small muted">All trust steps complete — you rank higher in verified client searches.</p>}
            <Link href="/freelancer/progression" className="link small">See progression →</Link>
          </section>
        </aside>
      </div>
    </div>
  );
}
