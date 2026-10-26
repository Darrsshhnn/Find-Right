import Link from "next/link";
import Icon from "./Icon";
import SaveHeart from "./SaveHeart";
import { AiBadge, Avatar, Stars, VerifiedBadge } from "./ui";
import { AVAILABILITY } from "@/lib/constants";
import { daysLeft, money, shortDate, timeAgo } from "@/lib/format";
import { budgetLabel } from "@/lib/jobs";
import type { ClientView, FreelancerView } from "@/lib/queries";
import type { Job, PortfolioItem, Review, User } from "@/lib/types";

export function JobCard({ job, client, applicants, match, href, invited }: {
  job: Job; client: ClientView | null; applicants: number; match?: { score: number; reasons: string[] }; href: string; invited?: boolean;
}) {
  const left = daysLeft(job.deadline);
  return (
    <article className="card card-link job-card">
      <div className="row-between">
        <div className="row">
          <span className="badge">{job.category}</span>
          <span className="badge badge-outline">{job.level}</span>
          {invited && <span className="badge badge-dark"><Icon name="mail" size={12} /> Invited</span>}
        </div>
        {match && <span className="match" title={match.reasons.join(" · ")}><Icon name="zap" size={13} /> {match.score}% match</span>}
      </div>
      <div className="stack-sm">
        <h3><Link href={href}>{job.title}</Link></h3>
        <p className="clamp-2">{job.description}</p>
      </div>
      {match && match.reasons.length > 0 && <div className="match-reasons">{match.reasons.slice(0, 3).map((r) => <span key={r}>{r}</span>)}</div>}
      <div className="meta">
        <span><Icon name="calendar" size={13} /> Due {shortDate(job.deadline)}{left > 0 && left <= 7 ? ` · ${left}d left` : ""}</span>
        <span><Icon name="clock" size={13} /> {job.duration}</span>
        <span><Icon name="users" size={13} /> {applicants} applied</span>
        <span><Icon name="repeat" size={13} /> {job.revisions} revisions</span>
      </div>
      <div className="job-foot">
        <div className="row">
          {client && <VerifiedBadge verified={client.verified} pending={client.profile.verification === "pending"} />}
          {client && <span className="small muted">{client.displayName}{client.rating.count ? ` · ★ ${client.rating.average}` : ""}</span>}
        </div>
        <div className="row">
          <span className="price">{budgetLabel(job)}</span>
          <Link href={href} className="btn btn-primary btn-sm">View brief</Link>
        </div>
      </div>
    </article>
  );
}

export function FreelancerCard({ f, saved, actions, match, heart = true }: { f: FreelancerView; saved?: boolean; actions?: React.ReactNode; match?: number; heart?: boolean }) {
  const works = f.profile.portfolio.filter((w) => w.image).slice(0, 4);
  const profile = `/client/freelancers/${f.user.id}`;
  const availability = AVAILABILITY[f.profile.availability];
  return (
    <article className="card card-link fl-card">
      <div className="row-between" style={{ flexWrap: "nowrap", alignItems: "flex-start" }}>
        <div className="fl-id">
          <Avatar name={f.user.name} src={f.user.avatar} size="lg" />
          <div style={{ minWidth: 0 }}>
            <b className="truncate"><Link href={profile}>{f.user.name}</Link></b>
            <small className="truncate">{f.profile.headline}</small>
          </div>
        </div>
        {heart && <SaveHeart freelancerId={f.user.id} name={f.user.name} saved={Boolean(saved)} />}
      </div>
      <div className="fl-line" aria-label="Key profile info">
        <span className="rating"><Icon name="star" size={14} /> {f.rating.count ? f.rating.average.toFixed(1) : "New"}{f.rating.count ? <span className="muted" style={{ fontWeight: 400 }}>({f.rating.count})</span> : null}</span>
        <span>{f.profile.level}</span>
        <span><span className={`dot dot-${availability.tone}`} /> {availability.label}</span>
        <span><b>{money(f.profile.hourlyRate)}</b>/hr</span>
      </div>
      <div className="row">
        <AiBadge text={f.ai.label === "100% human-made" ? "No AI (100% human-made)" : f.ai.label} />
        {f.tier === "Rising talent" && <span className="badge badge-amber">Rising talent · 15% credit</span>}
        {match !== undefined && <span className="match"><Icon name="zap" size={13} /> {match}% match</span>}
      </div>
      <div className={works.length >= 4 ? "thumbs" : "thumbs thumbs-3"}>
        {works.map((w) => <Link key={w.id} href={`${profile}/work/${w.id}`} aria-label={`View project: ${w.title}`}><img src={w.image} alt="" loading="lazy" /></Link>)}
        {Array.from({ length: Math.max(0, 3 - works.length) }).map((_, i) => <span key={i} aria-hidden="true" />)}
      </div>
      <div className="card-foot">
        <span className="small" style={{ color: "var(--primary-deep)" }}>• {f.completed} completed project{f.completed === 1 ? "" : "s"}</span>
        <div className="row">{actions ?? <Link href={profile} className="btn btn-primary btn-sm">View profile</Link>}</div>
      </div>
    </article>
  );
}

export function PortfolioCard({ item, href, children }: { item: PortfolioItem; href?: string; children?: React.ReactNode }) {
  const isLink = !item.image && /^https?:\/\//.test(item.description);
  const cover = item.image ? <img className="thumb" src={item.image} alt={item.title} loading="lazy" /> : <div className="thumb"><Icon name={isLink ? "link" : "image"} size={32} /></div>;
  return (
    <article className="card portfolio-card">
      <div className="thumb-wrap">
        {item.source === "platform" && <span className="badge badge-dark"><Icon name="shield" size={12} /> Client-verified</span>}
        {href ? <Link href={href} className="cover" aria-label={`Open project: ${item.title}`}>{cover}</Link> : cover}
      </div>
      <div className="body">
        <span className="small muted">{item.category}{item.clientName ? ` · for ${item.clientName}` : ""}</span>
        <b>{href ? <Link href={href}>{item.title}</Link> : item.title}</b>
        {isLink ? <a className="link small truncate" href={item.description} target="_blank" rel="noreferrer noopener">{item.description}</a> : item.description && <p className="small muted clamp-2">{item.description}</p>}
        <div className="row" style={{ gap: 8 }}><AiBadge level={item.ai} />{item.tags.filter((t) => t !== "Verified contract").slice(0, 2).map((t) => <span className="tag" key={t}>{t}</span>)}</div>
        {children}
      </div>
    </article>
  );
}

export function ReviewCard({ review, author, project }: { review: Review; author?: User; project?: string }) {
  return (
    <article className="review">
      <div className="review-head">
        <div className="row"><Avatar name={author?.name ?? "Member"} src={author?.avatar} size="sm" /><b>{author?.name ?? "FindRight member"}</b></div>
        <span className="row" style={{ gap: 8 }}><Stars value={review.rating} /><b className="small">{review.rating.toFixed(1)}</b></span>
      </div>
      <p>“{review.text}”</p>
      <div className="meta">
        <span>Communication {review.communication}/5</span><span>Quality {review.quality}/5</span><span>Timeliness {review.timeliness}/5</span>
      </div>
      <small className="muted">{timeAgo(review.createdAt)}{project ? ` · ${project}` : ""}</small>
    </article>
  );
}
