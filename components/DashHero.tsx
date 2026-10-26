import Link from "next/link";
import Icon from "./Icon";

export type HeroStat = { icon: string; label: string; value: string | number; note: string; href?: string };

/** Dashboard header shared by client and freelancer: greeting, actions, a progress ring and a KPI strip. */
export default function DashHero({ date, badge, title, text, actions, ring, stats }: {
  date: string;
  badge: React.ReactNode;
  title: string;
  text: string;
  actions: React.ReactNode;
  ring?: { value: number; label: string; display: string };
  stats: HeroStat[];
}) {
  return (
    <section className="dash-hero">
      <div className="dash-hero-bg" aria-hidden="true"><i /><i /><i /></div>
      <div className="dash-hero-main">
        <div className="dash-hero-copy">
          <div className="dash-hero-meta"><span><Icon name="calendar" size={14} /> {date}</span>{badge}</div>
          <h1><span className="wave" aria-hidden="true"><Icon name="hand" size={28} /></span>{title}</h1>
          <p>{text}</p>
          <div className="dash-hero-actions">{actions}</div>
        </div>
        {ring && (
          <div className="dash-ring" style={{ "--value": Math.max(0, Math.min(100, ring.value)) } as React.CSSProperties} role="img" aria-label={`${ring.label}: ${ring.display}`}>
            <div><strong>{ring.display}</strong><small>{ring.label}</small></div>
          </div>
        )}
      </div>
      <dl className="dash-hero-stats">
        {stats.map((s, i) => {
          const body = (
            <>
              <dt><span className="dash-stat-ico"><Icon name={s.icon} size={16} /></span>{s.label}</dt>
              <dd>{s.value}</dd>
              <small>{s.note}</small>
            </>
          );
          return s.href
            ? <Link key={s.label} href={s.href} className="dash-stat" style={{ "--i": i } as React.CSSProperties}>{body}</Link>
            : <div key={s.label} className="dash-stat" style={{ "--i": i } as React.CSSProperties}>{body}</div>;
        })}
      </dl>
    </section>
  );
}
