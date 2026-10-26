import Link from "next/link";
import BrandMark from "./BrandMark";
import Icon from "./Icon";
import { AVAILABILITY } from "@/lib/constants";
import { initials, label } from "@/lib/format";
import type { AiLevel, Availability, ProjectStatus, ProposalStatus } from "@/lib/types";

export function Logo({ href = "/" }: { href?: string }) {
  return (
    <Link href={href} className="logo" aria-label="FindRight home">
      <span className="logo-mark"><BrandMark /></span>
      <span>FindRight</span>
    </Link>
  );
}

export function Avatar({ name, src, size = "", square = false }: { name: string; src?: string; size?: "" | "sm" | "lg" | "xl"; square?: boolean }) {
  const cls = `avatar${size ? ` avatar-${size}` : ""}${square ? " avatar-square" : ""}`;
  return src ? <img className={cls} src={src} alt="" /> : <span className={cls} aria-hidden="true">{initials(name)}</span>;
}

export function Stars({ value, size = 14 }: { value: number; size?: number }) {
  return (
    <span className="stars" aria-label={`${value} out of 5 stars`}>
      {[1, 2, 3, 4, 5].map((n) => (
        <svg key={n} width={size} height={size} viewBox="0 0 24 24" className={n <= Math.round(value) ? "" : "off"} fill="currentColor" aria-hidden="true">
          <path d="m12 2.8 2.9 5.9 6.5.9-4.7 4.6 1.1 6.5L12 17.6l-5.8 3.1 1.1-6.5-4.7-4.6 6.5-.9L12 2.8Z" />
        </svg>
      ))}
    </span>
  );
}

export function Rating({ average, count }: { average: number; count: number }) {
  if (!count) return <span className="badge badge-grey">New · no reviews yet</span>;
  return (
    <span className="rating">
      <Icon name="star" size={15} /> {average.toFixed(1)} <span className="muted small" style={{ fontWeight: 400 }}>({count})</span>
    </span>
  );
}

export function AvailabilityBadge({ value }: { value: Availability }) {
  const item = AVAILABILITY[value];
  return <span className={`badge badge-${item.tone === "grey" ? "grey" : item.tone}`}><span className={`dot dot-${item.tone}`} /> {item.label}</span>;
}

export function AiBadge({ level, text }: { level?: AiLevel; text?: string }) {
  const value = text ?? (level === "No AI" ? "No AI (100% human-made)" : level ?? "");
  const tone = value.includes("human") || level === "No AI" ? "badge-green" : value.toLowerCase().includes("execution") || value.includes("supported") ? "badge-amber" : "";
  return <span className={`badge ${tone}`}><Icon name={tone === "badge-green" ? "hand" : "bot"} size={13} /> {value}</span>;
}

export function AiMeter({ percent, label: text }: { percent: number; label: string }) {
  return (
    <div className="ai-meter" title="Self-declared AI involvement across disciplines">
      <div className="ai-meter-top"><span>AI involvement · {text}</span><b>~{percent}%</b></div>
      <div className="bar"><i style={{ width: `${Math.max(percent, 3)}%` }} /></div>
    </div>
  );
}

export function VerifiedBadge({ verified, pending }: { verified: boolean; pending?: boolean }) {
  if (verified) return <span className="badge badge-green"><Icon name="shield" size={13} /> Verified client</span>;
  if (pending) return <span className="badge badge-amber"><Icon name="clock" size={13} /> Verification pending</span>;
  return <span className="badge badge-grey"><Icon name="user" size={13} /> Individual client</span>;
}

const projectTone: Record<ProjectStatus, string> = {
  offer: "", declined: "badge-grey", awaiting_funding: "badge-amber", active: "badge-green", completed: "badge-blue", cancelled: "badge-grey", disputed: "badge-red",
};
const projectLabel: Record<ProjectStatus, string> = {
  offer: "Offer sent", declined: "Offer declined", awaiting_funding: "Awaiting advance", active: "Active", completed: "Completed", cancelled: "Cancelled", disputed: "In dispute",
};
export function ProjectStatusBadge({ status }: { status: ProjectStatus }) {
  return <span className={`badge ${projectTone[status]}`}>{projectLabel[status]}</span>;
}

const proposalTone: Record<ProposalStatus, string> = { pending: "", shortlisted: "badge-amber", declined: "badge-grey", hired: "badge-green", withdrawn: "badge-grey" };
export function ProposalStatusBadge({ status }: { status: ProposalStatus }) {
  return <span className={`badge ${proposalTone[status]}`}>{status === "pending" ? "Under review" : label(status)}</span>;
}

export function Empty({ icon = "inbox", title, children, action }: { icon?: string; title: string; children?: React.ReactNode; action?: React.ReactNode }) {
  return (
    <section className="empty">
      <span className="icon-tile"><Icon name={icon} size={24} /></span>
      <h3>{title}</h3>
      {children && <p>{children}</p>}
      {action}
    </section>
  );
}

export function PageHead({ eyebrow, title, description, actions }: { eyebrow?: string; title: string; description?: string; actions?: React.ReactNode }) {
  return (
    <header className="page-head">
      <div>
        {eyebrow && <span className="eyebrow">{eyebrow}</span>}
        <h1>{title}</h1>
        {description && <p>{description}</p>}
      </div>
      {actions && <div className="row">{actions}</div>}
    </header>
  );
}

export function Tabs({ items, active }: { items: { href: string; label: string; key: string; count?: number; icon?: string }[]; active: string }) {
  return (
    <nav className="tabs" aria-label="Sections">
      {items.map((item) => (
        <Link key={item.key} href={item.href} className={item.key === active ? "active" : ""} aria-current={item.key === active ? "page" : undefined}>
          {item.icon && <Icon name={item.icon} size={16} />}
          {item.label}
          {item.count !== undefined && <span className="tab-count">{item.count}</span>}
        </Link>
      ))}
    </nav>
  );
}

/** Soft drifting brand-purple gradients. Pure CSS (transform only), paused under prefers-reduced-motion. */
const FLOATERS = ["ring", "dot", "square", "plus", "ring", "dot", "square", "ring", "plus", "dot", "ring", "square"];

/** Soft purple glow behind public pages; `lively` adds slowly drifting shapes (landing page). */
/** Settings-style card heading with an icon chip. */
export function SectionTitle({ icon, id, children }: { icon: string; id?: string; children: React.ReactNode }) {
  return <h2 className="section-h" id={id}><span className="section-ico" aria-hidden="true"><Icon name={icon} size={18} /></span>{children}</h2>;
}

export function AnimatedBackground({ lively = false }: { lively?: boolean }) {
  return (
    <div className={`bg-animated${lively ? " bg-lively" : ""}`} aria-hidden="true">
      <span /><span /><span />
      {lively && <div className="bg-grid" />}
      {lively && FLOATERS.map((shape, i) => <b key={i} className={`floater floater-${shape}`} />)}
    </div>
  );
}

export function Notice({ text, tone = "ok" }: { text?: string; tone?: "ok" | "info" | "warn" | "error" }) {
  if (!text) return null;
  return <div className={`alert alert-${tone}`} role="status" style={{ marginBottom: 24 }}><Icon name={tone === "ok" ? "checkCircle" : "help"} /> {text}</div>;
}
