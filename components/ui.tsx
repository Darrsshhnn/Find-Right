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

const AVATAR_BG = [["#efe3ff", "#d9bcff"], ["#ffe7d6", "#ffc9a3"], ["#dff5ec", "#a9e5cc"], ["#e2efff", "#b3d1ff"], ["#fff1c9", "#ffdc7a"], ["#ffe1ea", "#ffb3c8"]];
const SKIN = ["#f2c7a5", "#e0a882", "#c98d66", "#a86f4c", "#8a5638"];
const HAIR = ["#1f1a24", "#3b2a20", "#5a3a22", "#2b2b3a", "#7a4a2a"];
const SHIRT = ["#8a38f5", "#130b1e", "#10b981", "#f59e0b", "#3b82f6", "#e5484d"];

function hash(text: string) {
  let h = 2166136261;
  for (let i = 0; i < text.length; i++) h = Math.imul(h ^ text.charCodeAt(i), 16777619);
  return h >>> 0;
}

/** Deterministic illustrated portrait (no photo needed) — same name, same avatar everywhere. */
function AvatarArt({ name }: { name: string }) {
  const h = hash(name);
  const [bg1, bg2] = AVATAR_BG[h % AVATAR_BG.length]!;
  const skin = SKIN[(h >> 3) % SKIN.length]!;
  const hair = HAIR[(h >> 6) % HAIR.length]!;
  const shirt = SHIRT[(h >> 9) % SHIRT.length]!;
  const style = (h >> 12) % 4;
  const id = `av${h.toString(36)}`;
  return (
    <svg viewBox="0 0 64 64" width="100%" height="100%" aria-hidden="true">
      <defs><linearGradient id={id} x1="0" y1="0" x2="1" y2="1"><stop offset="0" stopColor={bg1} /><stop offset="1" stopColor={bg2} /></linearGradient></defs>
      <rect width="64" height="64" fill={`url(#${id})`} />
      {style === 1 && <path d="M17 30c0-11 7-18 15-18s15 7 15 18v18H17z" fill={hair} />}
      <path d="M9 64c1.5-12 10.5-19 23-19s21.5 7 23 19z" fill={shirt} />
      <rect x="27.5" y="36" width="9" height="10" rx="4" fill={skin} />
      <circle cx="32" cy="28" r="11.5" fill={skin} />
      {style === 0 && <path d="M20.5 27c0-8 5-13.5 11.5-13.5S43.5 19 43.5 27c-2-4.5-6.5-6.5-11.5-6.5S22.5 22.5 20.5 27z" fill={hair} />}
      {style === 1 && <path d="M20.5 28c0-8.5 5-14.5 11.5-14.5S43.5 19.5 43.5 28c-3-6-8-7-11.5-7s-8.5 1-11.5 7z" fill={hair} />}
      {style === 2 && <><circle cx="32" cy="12.5" r="5.5" fill={hair} /><path d="M20.5 27c0-8 5-13 11.5-13S43.5 19 43.5 27c-3-5-7-6-11.5-6S23.5 22 20.5 27z" fill={hair} /></>}
      {style === 3 && <path d="M20 29c-1-9 4.5-16 12-16s13 6 12 16c-1.5-3-3-5-5-6-3 2-9 2.5-14 1-2 1-4 2.5-5 5z" fill={hair} />}
      <circle cx="28" cy="29" r="1.3" fill="#2a2030" /><circle cx="36" cy="29" r="1.3" fill="#2a2030" />
      <path d="M29 33.5c1.8 1.4 4.2 1.4 6 0" stroke="#2a2030" strokeWidth="1.3" fill="none" strokeLinecap="round" />
    </svg>
  );
}

export function Avatar({ name, src, size = "", square = false }: { name: string; src?: string; size?: "" | "sm" | "lg" | "xl"; square?: boolean }) {
  const cls = `avatar${size ? ` avatar-${size}` : ""}${square ? " avatar-square" : ""}`;
  if (src) return <img className={cls} src={src} alt="" />;
  // Companies (square tiles) get a gradient monogram; people get an illustrated portrait.
  if (square) return <span className={`${cls} avatar-mono`} aria-hidden="true">{initials(name)}</span>;
  return <span className={`${cls} avatar-art`} aria-hidden="true"><AvatarArt name={name} /></span>;
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
