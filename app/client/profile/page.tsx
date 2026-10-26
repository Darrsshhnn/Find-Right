import type { Metadata } from "next";
import Link from "next/link";
import Icon from "@/components/Icon";
import { ReviewCard } from "@/components/cards";
import { AiBadge, Avatar, Empty, ProjectStatusBadge, Stars } from "@/components/ui";
import { requireUser } from "@/lib/auth";
import { SCHEDULES } from "@/lib/constants";
import { db } from "@/lib/db";
import { money, shortDate } from "@/lib/format";
import { clientById, freelancerById } from "@/lib/queries";

export const metadata: Metadata = { title: "Client profile" };

const TABS = [["overview", "Overview"], ["projects", "Projects"], ["reviews", "Reviews given"], ["payments", "Payments"], ["terms", "Terms & preferences"]] as const;

export default async function ClientProfile({ searchParams }: { searchParams: Promise<{ tab?: string }> }) {
  const user = await requireUser("client");
  const { tab = "overview" } = await searchParams;
  const data = db();
  const client = clientById(user.id, data)!;
  const p = client.profile;
  const projects = data.projects.filter((x) => x.clientId === user.id);
  const given = data.reviews.filter((r) => r.fromId === user.id);
  const received = data.reviews.filter((r) => r.toId === user.id);
  const avg = (k: "rating" | "quality" | "communication" | "timeliness") => (given.length ? given.reduce((s, r) => s + r[k], 0) / given.length : 0);
  const aiYes = given.filter((r) => r.aiMatched === "yes").length;
  const paid = data.transactions.filter((t) => t.clientId === user.id && t.type === "escrow_deposit").reduce((s, t) => s + t.amount, 0);
  const terms = p.defaultTerms ?? { schedule: "10-90" as const, revisions: 2, ownership: "full" as const };

  return (
    <div className="stack-lg">
      <section className="card profile-banner">
        <div className="cover" aria-hidden="true" />
        <div className="body">
          <Avatar name={user.name} src={user.avatar} size="xl" />
          <div className="grow stack-sm" style={{ paddingTop: 16 }}>
            <h1 style={{ fontSize: "1.6rem" }}>{user.name}</h1>
            <p className="muted">{[p.role, p.companyName || null].filter(Boolean).join(" · ") || "Client"}{p.industry ? ` (${p.industry.toLowerCase()})` : ""}</p>
            <div className="row">
              {client.verified && <span className="badge badge-green"><span className="dot dot-green" /> Company verified</span>}
              {(p.visibility?.paymentBadge ?? true) && paid > 0 && <span className="badge badge-green"><span className="dot dot-green" /> Payment verified</span>}
              <span className="badge badge-green"><span className="dot dot-green" /> Email verified</span>
              <span className="badge badge-outline">Member since {new Date(user.createdAt).getFullYear()}</span>
            </div>
          </div>
          <div className="row" style={{ paddingTop: 16 }}>
            <Link href="/client/profile/edit" className="btn btn-outline"><Icon name="edit" size={16} /> Edit profile</Link>
            <Link href="/client/jobs/new" className="btn btn-primary"><Icon name="plus" size={16} /> Post a job</Link>
          </div>
        </div>
      </section>

      <nav className="pill-tabs" aria-label="Profile sections" style={{ marginBottom: 0 }}>
        {TABS.map(([k, l]) => <Link key={k} href={k === "overview" ? "/client/profile" : `/client/profile?tab=${k}`} className={tab === k ? "active" : ""} aria-current={tab === k ? "page" : undefined}>{l}</Link>)}
      </nav>

      {tab === "overview" && (
        <div className="layout-aside">
          <div className="stack-lg">
            <section className="card stack">
              <h2>About {p.companyName || user.name}</h2>
              <p style={{ color: "var(--ink-2)" }}>{p.bio || "Add a short description of your business so freelancers understand your brand."}</p>
              <div className="kv">
                {p.industry && <div><span>Industry</span><b>{p.industry}</b></div>}
                {p.companyType && <div><span>Company type</span><b>{p.companyType}</b></div>}
                {p.website && <div><span>Website</span><b><a className="link" href={p.website} target="_blank" rel="noreferrer noopener">{p.website.replace(/^https?:\/\//, "")}</a></b></div>}
                {p.location && <div><span>Location</span><b>{p.location}</b></div>}
              </div>
            </section>
            <section className="grid-4">
              <div className="stat stat-accent"><strong>{client.hires}</strong><span>Hires</span></div>
              <div className="stat stat-accent"><strong>{data.jobs.filter((j) => j.clientId === user.id).length}</strong><span>Jobs posted</span></div>
              <div className="stat stat-accent"><strong>{given.length ? avg("rating").toFixed(1) : "—"}</strong><span>Avg. rating given</span></div>
              <div className="stat stat-accent"><strong>{client.rating.count ? client.rating.average.toFixed(1) : "—"}</strong><span>Rating from freelancers</span></div>
            </section>
            <section className="stack">
              <h2>What freelancers say ({received.length})</h2>
              {received.length ? received.map((r) => <ReviewCard key={r.id} review={r} author={data.users.find((u) => u.id === r.fromId)} project={data.projects.find((x) => x.id === r.projectId)?.title} />) : <p className="muted small">Freelancers review you after completed projects.</p>}
            </section>
          </div>
          <aside>
            <section className="card-tint stack">
              <h3 className="row"><Icon name="shield" size={16} /> Verification</h3>
              <span className="row small"><Icon name="check" size={14} /> Email verified</span>
              <span className={`row small${paid > 0 ? "" : " muted"}`}><Icon name="check" size={14} /> Payment method verified</span>
              <span className={`row small${client.verified ? "" : " muted"}`}><Icon name={client.verified ? "check" : "clock"} size={14} /> Company details {client.verified ? "verified" : p.verification === "pending" ? "in review" : "not verified"}</span>
              {!client.verified && <Link href="/client/profile/edit#verify" className="btn btn-outline btn-sm">Verify company</Link>}
            </section>
            <section className="card stack-sm">
              <h3>Categories you hire for</h3>
              <div className="chips">{p.categories.map((c) => <span className="tag" key={c}>{c}</span>)}</div>
            </section>
          </aside>
        </div>
      )}

      {tab === "projects" && (
        projects.length ? (
          <div className="list">
            {projects.map((x) => {
              const f = freelancerById(x.freelancerId, data);
              return (
                <Link key={x.id} href={`/client/projects/${x.id}`} className="list-row">
                  <Avatar name={f?.user.name ?? ""} src={f?.user.avatar} />
                  <div className="grow"><b>{x.title}</b><div className="small muted">{f?.user.name} · {money(x.price - x.discount)} · {shortDate(x.createdAt)}</div></div>
                  <ProjectStatusBadge status={x.status} />
                </Link>
              );
            })}
          </div>
        ) : <Empty icon="folder" title="No projects yet" action={<Link href="/client/jobs/new" className="btn btn-primary">Post a job</Link>} />
      )}

      {tab === "reviews" && (
        <div className="layout-aside">
          <section className="stack">
            {given.length ? given.map((r) => {
              const f = freelancerById(r.toId, data);
              return (
                <article key={r.id} className="review">
                  <div className="review-head">
                    <div className="row"><Avatar name={f?.user.name ?? ""} src={f?.user.avatar} size="sm" /><div><b>{f?.user.name}</b><div className="small muted">{data.projects.find((x) => x.id === r.projectId)?.title}</div></div></div>
                    <span className="rating"><Icon name="star" size={14} /> {r.rating.toFixed(1)}</span>
                  </div>
                  <p>{r.text}</p>
                  <div className="meta">
                    <span>Quality <Stars value={r.quality} size={12} /></span>
                    <span>Communication <Stars value={r.communication} size={12} /></span>
                    <span>Timeliness <Stars value={r.timeliness} size={12} /></span>
                    {r.aiMatched && <span>AI as disclosed: <b>{r.aiMatched}</b></span>}
                  </div>
                </article>
              );
            }) : <Empty icon="star" title="No reviews given yet">You rate freelancers after each completed project.</Empty>}
          </section>
          <aside>
            <section className="card stack">
              <h3>Ratings you give</h3>
              <div className="rating-big"><strong>{given.length ? avg("rating").toFixed(1) : "—"}</strong><div><Stars value={avg("rating")} size={16} /><div className="small muted">from {given.length} reviews</div></div></div>
              <div className="breakdown">
                {(["quality", "communication", "timeliness"] as const).map((k) => (
                  <div key={k} className="breakdown-row" style={{ gridTemplateColumns: "104px 1fr 32px" }}>
                    <span style={{ textTransform: "capitalize" }}>{k}</span><span className="bar"><i style={{ width: `${(avg(k) / 5) * 100}%` }} /></span><span>{avg(k).toFixed(1)}</span>
                  </div>
                ))}
              </div>
            </section>
            {given.length > 0 && <section className="card-tint stack-sm"><b className="row"><Icon name="shield" size={16} /> AI usage matched disclosure</b><p className="small">In {aiYes} of {given.length} reviews you confirmed the work followed the freelancer&apos;s AI disclosure.</p></section>}
          </aside>
        </div>
      )}

      {tab === "payments" && (
        <section className="card stack">
          <div className="grid-4">
            <div className="stat stat-accent"><strong>{money(paid)}</strong><span>Total paid</span></div>
            <div className="stat"><strong>{money(projects.reduce((s, x) => s + x.discount, 0))}</strong><span>Saved with credits</span></div>
          </div>
          <Link href="/client/payments" className="btn btn-outline" style={{ justifySelf: "start" }}><Icon name="wallet" size={16} /> Payments & receipts</Link>
        </section>
      )}

      {tab === "terms" && (
        <div className="grid-2">
          <section className="card stack">
            <h2>Default terms & conditions</h2>
            <div className="kv">
              <div><span>Payment</span><b>{SCHEDULES[terms.schedule].label}</b></div>
              <div><span>Revisions</span><b>{terms.revisions} rounds</b></div>
              <div><span>Ownership</span><b>{terms.ownership === "full" ? "Full rights transfer after final payment" : "Usage licence only"}</b></div>
            </div>
          </section>
          <section className="card stack">
            <h2>Hiring preferences</h2>
            <div className="kv"><div><span>Preferred AI usage</span><b>{p.aiPreference ? <AiBadge level={p.aiPreference} /> : "No preference"}</b></div></div>
            <div className="chips">{p.categories.map((c) => <span className="tag" key={c}>{c}</span>)}</div>
            <Link href="/client/profile/edit" className="btn btn-outline btn-sm" style={{ justifySelf: "start" }}>Edit preferences</Link>
          </section>
        </div>
      )}
    </div>
  );
}
