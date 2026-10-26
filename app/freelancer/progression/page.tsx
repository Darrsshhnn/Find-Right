import type { Metadata } from "next";
import Link from "next/link";
import Icon from "@/components/Icon";
import { PageHead } from "@/components/ui";
import { requireUser } from "@/lib/auth";
import { freelancerById } from "@/lib/queries";

export const metadata: Metadata = { title: "Trust & progression" };

const LINKS = ["/freelancer/settings?tab=account", "/freelancer/profile?tab=details", "/freelancer/settings?tab=ai", "/freelancer/profile?tab=portfolio", "/freelancer/projects?tab=completed", "/freelancer/projects?tab=completed"];

export default async function Progression() {
  const user = await requireUser("freelancer");
  const f = freelancerById(user.id)!;
  const done = f.steps.filter((s) => s.done).length;

  return (
    <>
      <PageHead eyebrow="Trust & progression" title={f.trust === 100 ? "Your profile is fully trusted" : `Your profile is ${f.trust}% trusted`} description="Trust steps raise your ranking in verified client searches. No pay-to-win boosts — only real, verifiable work." />
      <section className="hero-card" style={{ marginBottom: 24 }}>
        <div className="stack-sm" style={{ position: "relative", zIndex: 1 }}>
          <span className="badge"><Icon name={f.tier === "Top rated" ? "award" : "sparkle"} size={13} /> {f.tier}</span>
          <h2>{done} of {f.steps.length} trust steps complete</h2>
          <p>{f.tier === "Rising talent" ? "As rising talent you're matched with right-sized projects and shown to clients looking for fresh talent — you're never ranked against 10-year veterans." : "Keep delivering on time and collecting client-verified work to reach Top rated."}</p>
        </div>
        <div className="ring" style={{ "--value": f.trust } as React.CSSProperties}><div><strong>{f.trust}%</strong><small>Trust</small></div></div>
      </section>
      <div className="list" style={{ maxWidth: 860 }}>
        {f.steps.map((s, i) => (
          <Link key={s.label} href={LINKS[i] ?? "/freelancer/profile"} className="list-row">
            <span className="avatar avatar-sm" style={{ background: s.done ? "var(--green)" : "#efe9f5", color: s.done ? "#fff" : "var(--muted-2)" }}>{s.done ? "✓" : i + 1}</span>
            <div className="grow"><b>{s.label}</b><p className="small muted">{s.done ? "Completed and visible to verified clients." : s.detail}</p></div>
            {!s.done && <span className="badge">To do</span>}
          </Link>
        ))}
      </div>
      <section className="grid-3" style={{ marginTop: 24 }}>
        {[["sparkle", "Rising talent", "Freshers with fewer than 3 completed contracts. Matched with Fresher-level briefs; eligible for client starter credits."], ["shield", "Trusted", "Verified freelancers with a complete profile and disclosure, ranked on match quality."], ["award", "Top rated", "4.7★+ average across completed FindRight contracts with on-time delivery."]].map(([icon, title, text]) => (
          <article key={title} className={`card stack-sm${f.tier === title ? " card-link" : ""}`} style={f.tier === title ? { borderColor: "var(--primary)" } : undefined}>
            <Icon name={icon!} size={22} /><b>{title}</b><p className="small muted">{text}</p>
          </article>
        ))}
      </section>
    </>
  );
}
