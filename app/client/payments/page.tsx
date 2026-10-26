import type { Metadata } from "next";
import Link from "next/link";
import Icon from "@/components/Icon";
import { Empty, PageHead } from "@/components/ui";
import { requireUser } from "@/lib/auth";
import { db } from "@/lib/db";
import { money, shortDate } from "@/lib/format";
import { freelancerById } from "@/lib/queries";

export const metadata: Metadata = { title: "Payments & receipts" };

const TYPE = { escrow_deposit: { label: "Paid in", tone: "badge-amber" }, release: { label: "Released", tone: "badge-green" }, refund: { label: "Refunded", tone: "" }, fee: { label: "Platform fee", tone: "badge-grey" } };

export default async function ClientPayments({ searchParams }: { searchParams: Promise<{ tab?: string }> }) {
  const user = await requireUser("client");
  const { tab = "all" } = await searchParams;
  const data = db();
  // Platform fees come out of the freelancer payout, so they are not client payments.
  const all = data.transactions.filter((t) => t.clientId === user.id && t.type !== "fee");
  const tx = tab === "all" ? all : all.filter((t) => t.type === tab);
  const paidIn = all.filter((t) => t.type === "escrow_deposit").reduce((s, t) => s + t.amount, 0);
  const projects = data.projects.filter((p) => p.clientId === user.id && !["declined", "cancelled"].includes(p.status));
  const savings = projects.reduce((s, p) => s + p.discount, 0);
  const escrow = projects.flatMap((p) => p.milestones).filter((m) => ["funded", "submitted", "changes"].includes(m.status)).reduce((s, m) => s + m.charge, 0);

  return (
    <>
      <PageHead title="Payments & receipts" description="Every payment, escrow hold and release in one place. Download a PDF receipt for any row." />
      <p className="alert alert-info" style={{ marginBottom: 24 }}><Icon name="lock" /> Demo mode: payments are simulated and no money moves. Connect a gateway such as Razorpay before launch.</p>
      <section className="grid-4" style={{ marginBottom: 24 }}>
        <div className="stat stat-accent"><strong>{money(paidIn)}</strong><span>Total spent</span></div>
        <div className="stat"><strong style={{ color: "var(--amber-ink)" }}>{money(escrow)}</strong><span>Held in escrow</span></div>
        <div className="stat"><strong style={{ color: "var(--green-ink)" }}>{money(savings)}</strong><span>Saved with starter credits</span></div>
        <div className="stat"><strong>{all.length}</strong><span>Payment records</span></div>
      </section>
      <nav className="pill-tabs" aria-label="Filter payments">
        {[["all", "All"], ["escrow_deposit", "Paid in"], ["release", "Released"], ["refund", "Refunded"]].map(([k, l]) => (
          <Link key={k} href={k === "all" ? "/client/payments" : `/client/payments?tab=${k}`} className={tab === k ? "active" : ""} aria-current={tab === k ? "page" : undefined}>{l} <span>{k === "all" ? all.length : all.filter((t) => t.type === k).length}</span></Link>
        ))}
      </nav>
      {tx.length ? (
        <div className="table-wrap">
          <table>
            <thead><tr><th>Project</th><th>Freelancer</th><th>Date</th><th>Milestone</th><th>Amount</th><th>Status</th><th><span className="sr-only">Receipt</span></th></tr></thead>
            <tbody>
              {tx.map((t) => {
                const project = data.projects.find((p) => p.id === t.projectId);
                return (
                  <tr key={t.id}>
                    <td><Link className="link" href={`/client/projects/${t.projectId}`}>{project?.title}</Link></td>
                    <td className="nowrap">{freelancerById(t.freelancerId, data)?.user.name}</td>
                    <td className="nowrap">{shortDate(t.createdAt)}</td>
                    <td>{project?.milestones.find((m) => m.id === t.milestoneId)?.title}</td>
                    <td className="nowrap"><b>{money(t.amount)}</b></td>
                    <td><span className={`badge ${TYPE[t.type].tone}`}>{TYPE[t.type].label}</span></td>
                    <td><a className="btn btn-light btn-sm" href={`/api/receipts/${t.id}`} download aria-label={`Download receipt for ${project?.title ?? "payment"} on ${shortDate(t.createdAt)}`}><Icon name="download" size={14} /> Receipt</a></td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      ) : <Empty icon="wallet" title="No payments here">Advances and escrow deposits appear once a freelancer accepts your contract.</Empty>}
    </>
  );
}
