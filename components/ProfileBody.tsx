import Link from "next/link";
import Icon from "./Icon";
import { PortfolioCard, ReviewCard } from "./cards";
import { AiBadge, AiMeter, AvailabilityBadge, Avatar, Rating, Stars } from "./ui";
import { db } from "@/lib/db";
import { shortDate } from "@/lib/format";
import { clientById, type FreelancerView } from "@/lib/queries";

const PER_PAGE = 5;

/** The public freelancer profile, shared by the client view and the freelancer's own preview. */
export default function ProfileBody({ f, portfolioActions, reviewPage = 1, pageHref, workHref }: {
  f: FreelancerView;
  portfolioActions?: (id: string) => React.ReactNode;
  reviewPage?: number;
  /** Builds the URL for a page of reviews; pagination is hidden when omitted. */
  pageHref?: (page: number) => string;
  /** Builds the URL of a portfolio item's project view. */
  workHref?: (itemId: string) => string;
}) {
  const data = db();
  const received = data.reviews.filter((r) => r.toId === f.user.id).sort((a, b) => b.createdAt.localeCompare(a.createdAt));
  const given = data.reviews.filter((r) => r.fromId === f.user.id);
  const platformWork = data.projects.filter((p) => p.freelancerId === f.user.id && p.status === "completed");
  const portfolio = [...f.profile.portfolio].sort((a, b) => (a.source === "platform" ? -1 : 0) - (b.source === "platform" ? -1 : 0));
  const pages = Math.max(1, Math.ceil(received.length / PER_PAGE));
  const page = Math.min(Math.max(1, reviewPage), pages);
  const visible = pageHref ? received.slice((page - 1) * PER_PAGE, page * PER_PAGE) : received.slice(0, PER_PAGE);
  const breakdown = [5, 4, 3, 2, 1].map((star) => ({ star, count: received.filter((r) => Math.round(r.rating) === star).length }));
  const avg = (key: "quality" | "communication" | "timeliness") => (received.length ? received.reduce((s, r) => s + r[key], 0) / received.length : 0);

  return (
    <div className="stack-lg">
      <section className="card stack">
        <div className="row" style={{ alignItems: "flex-start", gap: 24 }}>
          <Avatar name={f.user.name} src={f.user.avatar} size="xl" />
          <div className="grow stack-sm">
            <div className="row-between" style={{ alignItems: "flex-start" }}>
              <h1 style={{ fontSize: "1.6rem" }}>{f.user.name}</h1>
              <Rating {...f.rating} />
            </div>
            <p className="muted">{f.profile.headline} · {f.profile.location.split(",").at(-1)?.trim()} · Member since {new Date(f.user.createdAt).getFullYear()}</p>
            <div className="row">
              <AiBadge text={f.ai.label === "100% human-made" ? "No AI (100% human-made)" : f.ai.label} />
              {f.tier !== "Trusted" && <span className={`badge ${f.tier === "Rising talent" ? "badge-amber" : ""}`}><Icon name={f.tier === "Top rated" ? "award" : "sparkle"} size={12} /> {f.tier}</span>}
              <span className="badge badge-green"><Icon name="shield" size={12} /> ID verified</span>
              <AvailabilityBadge value={f.profile.availability} />
            </div>
          </div>
        </div>
        {f.profile.bio && <p style={{ color: "var(--ink-2)" }}>{f.profile.bio}</p>}
        <div className="chips">{f.profile.skills.map((s) => <span className="tag" key={s}>{s}</span>)}</div>
      </section>

      <section className="grid-4">
        <div className="stat stat-accent"><strong>{f.completed}</strong><span>Completed projects</span></div>
        <div className="stat stat-accent"><strong>{f.rating.count ? f.rating.average.toFixed(1) : "—"}</strong><span>Average rating</span></div>
        <div className="stat stat-accent"><strong>{f.onTime}%</strong><span>On-time delivery</span></div>
        <div className="stat stat-accent"><strong>{f.trust}</strong><span>Trust score</span></div>
      </section>

      <section className="card stack">
        <div className="row-between"><h2 className="row"><Icon name="shield" size={18} /> AI usage disclosure</h2><span className="small muted">Self-reported per discipline</span></div>
        <AiMeter percent={f.ai.percent} label={f.ai.label} />
        <div className="kv">
          {f.profile.disciplines.map((d) => <div key={d}><span>{d}</span><b><AiBadge level={f.profile.ai[d] ?? "No AI"} /></b></div>)}
        </div>
        {f.profile.aiProcess && <p className="card-tint small"><b>How I work:</b> {f.profile.aiProcess}</p>}
      </section>

      <section className="stack">
        <div className="row-between"><h2>Portfolio</h2><span className="small muted">{portfolio.filter((p) => p.source === "platform").length} client-verified · {portfolio.length} total</span></div>
        {portfolio.length ? <div className="grid-3">{portfolio.map((p) => <PortfolioCard key={p.id} item={p} href={workHref?.(p.id)}>{portfolioActions?.(p.id)}</PortfolioCard>)}</div> : <p className="muted">No portfolio pieces yet.</p>}
      </section>

      <section className="stack" id="reviews">
        <h2>Client reviews ({received.length})</h2>
        {received.length ? (
          <div className="layout-reviews">
            <aside className="card stack" aria-label="Rating summary">
              <div className="rating-big"><strong>{f.rating.average.toFixed(1)}</strong><div><Stars value={f.rating.average} size={16} /><div className="small muted">from {received.length} reviews</div></div></div>
              <div className="breakdown" aria-label="Rating breakdown">
                {breakdown.map((b) => (
                  <div key={b.star} className="breakdown-row">
                    <span>{b.star} star</span>
                    <span className="bar" role="img" aria-label={`${b.count} reviews with ${b.star} stars`}><i style={{ width: `${(b.count / received.length) * 100}%` }} /></span>
                    <span className="muted">{b.count}</span>
                  </div>
                ))}
              </div>
              <hr className="divider" />
              <div className="kv">
                <div><span>Quality</span><b>{avg("quality").toFixed(1)}</b></div>
                <div><span>Communication</span><b>{avg("communication").toFixed(1)}</b></div>
                <div><span>Deadlines</span><b>{avg("timeliness").toFixed(1)}</b></div>
              </div>
            </aside>
            <div className="stack">
              {visible.map((r) => <ReviewCard key={r.id} review={r} author={data.users.find((u) => u.id === r.fromId)} project={data.projects.find((p) => p.id === r.projectId)?.title} />)}
              {pageHref && pages > 1 && (
                <nav className="pagination" aria-label="Review pages">
                  {page > 1 ? <Link href={pageHref(page - 1)} aria-label="Previous page"><Icon name="chevronLeft" size={16} /></Link> : <span className="disabled" aria-hidden="true"><Icon name="chevronLeft" size={16} /></span>}
                  {Array.from({ length: pages }, (_, i) => i + 1).map((n) => <Link key={n} href={pageHref(n)} aria-current={n === page ? "page" : undefined} aria-label={`Page ${n}`}>{n}</Link>)}
                  {page < pages ? <Link href={pageHref(page + 1)} aria-label="Next page"><Icon name="chevronRight" size={16} /></Link> : <span className="disabled" aria-hidden="true"><Icon name="chevronRight" size={16} /></span>}
                </nav>
              )}
            </div>
          </div>
        ) : <p className="card-flat muted small">No reviews yet{f.tier === "Rising talent" ? " — a rising talent ready for their first verified project." : "."}</p>}
      </section>

      <div className="grid-2">
        <section className="card stack">
          <h2>Experience outside FindRight</h2>
          {f.profile.experience.length ? f.profile.experience.map((e) => (
            <div key={e.id} className="stack-sm" style={{ gap: 2 }}><b>{e.title}</b><span className="small muted">{e.organisation} · {e.period}</span>{e.description && <p className="small">{e.description}</p>}</div>
          )) : <p className="muted small">No outside experience listed.</p>}
          {f.profile.education && <p className="small"><b>Education:</b> {f.profile.education}</p>}
          {f.profile.tools.length > 0 && <p className="small"><b>Tools:</b> {f.profile.tools.join(", ")}</p>}
          <p className="small"><b>Languages:</b> {f.profile.languages.join(", ")}</p>
        </section>
        <section className="card stack">
          <h2>Work on FindRight</h2>
          {platformWork.length ? platformWork.slice(0, 6).map((p) => (
            <div key={p.id} className="row-between"><div><b className="small">{p.title}</b><div className="small muted">for {clientById(p.clientId, data)?.displayName} · {shortDate(p.completedAt ?? p.createdAt)}</div></div><span className="badge badge-green"><Icon name="check" size={12} /> Delivered</span></div>
          )) : <p className="muted small">No completed FindRight contracts yet.</p>}
          {given.length > 0 && <p className="small muted">Has reviewed {given.length} client{given.length === 1 ? "" : "s"} — two-way reviews keep both sides accountable.</p>}
        </section>
      </div>
    </div>
  );
}
