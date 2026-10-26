import type { Metadata } from "next";
import Link from "next/link";
import Icon from "@/components/Icon";
import { PageHead } from "@/components/ui";
import { requireUser } from "@/lib/auth";
import { STARTER_CREDITS } from "@/lib/constants";
import { db } from "@/lib/db";
import { creditsAvailable } from "@/lib/queries";

export const metadata: Metadata = { title: "Starter credits" };

export default async function Credits() {
  const user = await requireUser("client");
  const data = db();
  const profile = data.clients.find((c) => c.userId === user.id)!;
  const reserved = data.jobs.filter((j) => j.clientId === user.id && j.status === "open" && j.creditReserved);
  const available = creditsAvailable(user.id, data);
  const states = Array.from({ length: STARTER_CREDITS }, (_, i) => (i < profile.creditsUsed ? "Used on a hire" : i < profile.creditsUsed + reserved.length ? `Reserved for “${reserved[i - profile.creditsUsed]!.title}”` : "Available"));

  return (
    <>
      <PageHead eyebrow="Client benefits" title="Starter credits" description="Three credits to help you try rising talent with less risk." actions={<Link href="/client/jobs/new" className="btn btn-primary">Post a job</Link>} />
      <section className="hero-card" style={{ marginBottom: 24 }}>
        <div style={{ position: "relative", zIndex: 1 }}><h2>You have {available} of {STARTER_CREDITS} credits available</h2><p>Each credit saves 15% (up to ₹5,000) on one hire. FindRight covers the discount — the freelancer always receives their full fee.</p></div>
        <Icon name="sparkle" size={56} />
      </section>
      <div className="grid-3">
        {states.map((s, i) => (
          <article key={i} className={s === "Available" ? "card-tint stack-sm" : "card-flat stack-sm"} style={s === "Available" ? undefined : { opacity: 0.7 }}>
            <div className="row-between"><span className="eyebrow">Credit {i + 1}</span><span className={`badge ${s === "Available" ? "badge-green" : "badge-grey"}`}>{s === "Available" ? "Available" : s.startsWith("Reserved") ? "Reserved" : "Used"}</span></div>
            <b style={{ fontSize: 28, color: "var(--primary-deep)" }}>15% OFF</b>
            <span className="small muted">{s}</span>
          </article>
        ))}
      </div>
      <section className="card stack" style={{ marginTop: 24 }}>
        <h2>How credits work</h2>
        <ol style={{ margin: 0, paddingLeft: 20, display: "grid", gap: 8 }} className="small">
          <li>Reserve a credit when you post a job, or tick “use a starter credit” when you send a contract.</li>
          <li>The discount is applied to the contract total and spread across the milestones.</li>
          <li>If the freelancer declines or you withdraw the offer, the credit returns to your account.</li>
        </ol>
      </section>
    </>
  );
}
