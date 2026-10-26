import type { Metadata } from "next";
import Link from "next/link";
import Icon from "@/components/Icon";
import { Empty, PageHead, ProjectStatusBadge } from "@/components/ui";
import { requireUser } from "@/lib/auth";
import { db } from "@/lib/db";
import { money, shortDate } from "@/lib/format";
import { clientById } from "@/lib/queries";

export const metadata: Metadata = { title: "Earnings & payouts" };

export default async function Earnings() {
  const user = await requireUser("freelancer");
  const data = db();
  const projects = data.projects.filter((p) => p.freelancerId === user.id && !["offer", "declined", "cancelled"].includes(p.status));
  const milestones = projects.flatMap((p) => p.milestones);
  const fees = data.transactions.filter((t) => t.freelancerId === user.id && t.type === "fee").reduce((s, t) => s + t.amount, 0);
  const earned = milestones.filter((m) => m.status === "released").reduce((s, m) => s + m.amount, 0) - fees;
  const escrow = milestones.filter((m) => ["funded", "submitted", "changes"].includes(m.status)).reduce((s, m) => s + m.amount, 0);
  const upcoming = milestones.filter((m) => m.status === "pending").reduce((s, m) => s + m.amount, 0);
  const releases = data.transactions.filter((t) => t.freelancerId === user.id && t.type === "release");
  const monthStart = new Date(); monthStart.setDate(1); monthStart.setHours(0, 0, 0, 0);
  const thisMonth = releases.filter((t) => new Date(t.createdAt) >= monthStart).reduce((s, t) => s + t.amount, 0);
  const history = data.transactions.filter((t) => t.freelancerId === user.id && (t.type === "release" || t.type === "fee" || (t.type === "escrow_deposit" && data.projects.find((p) => p.id === t.projectId)?.milestones.find((m) => m.id === t.milestoneId && m.status !== "released"))));

  return (
    <>
      <PageHead eyebrow="Account finances" title="Earnings & payouts" description="Every milestone you've been paid, what's secured in escrow and what's coming next." />
      <section className="grid-4" style={{ marginBottom: 24 }}>
        <div className="stat"><span>Total earned (net)</span><strong>{money(earned)}</strong><small>After {money(fees)} platform fees</small></div>
        <div className="stat"><span>Secured in escrow</span><strong>{money(escrow)}</strong><small>Released on approval or after 7 days</small></div>
        <div className="stat"><span>Upcoming milestones</span><strong>{money(upcoming)}</strong><small>Not yet funded by clients</small></div>
        <div className="stat"><span>Earned this month</span><strong>{money(thisMonth)}</strong></div>
      </section>
      <div className="layout-aside">
        <div className="stack-lg">
          <section className="stack">
            <h2>Disbursement & escrow history</h2>
            {history.length ? (
              <div className="table-wrap">
                <table>
                  <thead><tr><th>Date</th><th>Project</th><th>Milestone</th><th>Status</th><th style={{ textAlign: "right" }}>Amount</th></tr></thead>
                  <tbody>
                    {history.map((t) => {
                      const project = data.projects.find((p) => p.id === t.projectId);
                      const milestone = project?.milestones.find((m) => m.id === t.milestoneId);
                      return (
                        <tr key={t.id}>
                          <td className="nowrap">{shortDate(t.createdAt)}</td>
                          <td><Link className="link" href={`/freelancer/projects/${t.projectId}`}>{project?.title}</Link></td>
                          <td>{milestone?.title}</td>
                          <td>{t.type === "release" ? <span className="badge badge-green">Paid out</span> : t.type === "fee" ? <span className="badge badge-grey">{t.method}</span> : <span className="badge">In escrow</span>}</td>
                          <td style={{ textAlign: "right" }}><b>{t.type === "fee" ? `−${money(t.amount)}` : money(t.type === "release" ? t.amount : milestone?.amount ?? t.amount)}</b></td>
                        </tr>
                      );
                    })}
                  </tbody>
                </table>
              </div>
            ) : <Empty icon="wallet" title="No earnings yet">Your first advance arrives as soon as a client funds an accepted contract.</Empty>}
          </section>
          <section className="stack">
            <h2>Contracts</h2>
            {projects.map((p) => {
              const paid = p.milestones.filter((m) => m.status === "released").reduce((s, m) => s + m.amount, 0);
              return (
                <Link key={p.id} href={`/freelancer/projects/${p.id}`} className="list-row">
                  <div className="grow stack-sm" style={{ gap: 4 }}>
                    <div className="row-between"><b>{p.title}</b><ProjectStatusBadge status={p.status} /></div>
                    <span className="small muted">Client: {clientById(p.clientId, data)?.displayName}{p.status === "active" ? " · current contract" : ""}</span>
                    <div className="bar bar-green"><i style={{ width: `${(paid / p.price) * 100}%` }} /></div>
                  </div>
                  <b className="nowrap">{money(paid)} / {money(p.price)}</b>
                </Link>
              );
            })}
          </section>
        </div>
        <aside>
          <section className="card stack">
            <h3><Icon name="wallet" size={16} /> Payout destination</h3>
            <p className="small muted">Primary destination for milestone earnings.</p>
            <div className="file-row"><Icon name="rupee" /><span className="grow">UPI · {user.email.split("@")[0]}@upi</span><span className="badge badge-grey">Demo</span></div>
            <p className="alert alert-info small"><Icon name="lock" size={15} /> Payments are simulated in this build. Payouts go live once a payment gateway (e.g. Razorpay Route) is connected.</p>
          </section>
          <section className="card stack-sm">
            <h3>How you get paid</h3>
            <ol className="small" style={{ margin: 0, paddingLeft: 16, display: "grid", gap: 8 }}>
              <li>Client pays the advance — it goes straight to you.</li>
              <li>Each later milestone is funded into escrow before you start it.</li>
              <li>Released when the client approves, or automatically after 7 days.</li>
              <li>Starter-credit discounts are covered by FindRight — you always get your full fee.</li>
            </ol>
          </section>
        </aside>
      </div>
    </>
  );
}
