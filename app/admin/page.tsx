import type { Metadata } from "next";
import Link from "next/link";
import { ActionForm, Submit } from "@/components/ActionForm";
import { PageHead } from "@/components/ui";
import { decideVerification, resolveDispute } from "@/app/actions/admin";
import { db } from "@/lib/db";
import { money, timeAgo } from "@/lib/format";
import { clientById } from "@/lib/queries";

export const metadata: Metadata = { title: "Trust console" };

export default async function Admin() {
  const data = db();
  const pending = data.clients.filter((c) => c.verification === "pending");
  const open = data.disputes.filter((d) => d.status === "open");
  const resolved = data.disputes.filter((d) => d.status === "resolved").slice(0, 5);
  const gmv = data.transactions.filter((t) => t.type === "release").reduce((s, t) => s + t.amount, 0);

  return (
    <>
      <PageHead eyebrow="FindRight trust team" title="Trust console" description="Verify companies and resolve support cases so every brief on FindRight is genuine." />
      <section className="grid-4" style={{ marginBottom: 24 }}>
        <div className="stat"><span>Members</span><strong>{data.users.length - 1}</strong><small>{data.freelancers.length} freelancers · {data.clients.length} clients</small></div>
        <div className="stat"><span>Open jobs</span><strong>{data.jobs.filter((j) => j.status === "open").length}</strong></div>
        <div className="stat"><span>Active contracts</span><strong>{data.projects.filter((p) => p.status === "active").length}</strong></div>
        <div className="stat"><span>Paid to freelancers</span><strong>{money(gmv)}</strong></div>
      </section>
      <div className="grid-2">
        <section className="stack">
          <h2>Company verification queue ({pending.length})</h2>
          {pending.length ? pending.map((c) => {
            const u = data.users.find((x) => x.id === c.userId);
            const source = c.website || c.linkedin;
            return (
              <article key={c.userId} className="card stack-sm">
                <b>{c.companyName}</b>
                <span className="small muted">{u?.name} · {u?.email}</span>
                <a className="link small" href={source} target="_blank" rel="noreferrer noopener">{source}</a>
                <ActionForm action={decideVerification} className="stack-sm">
                  <input type="hidden" name="clientId" value={c.userId} />
                  <input className="input" name="note" placeholder="Note if rejecting (shown to the client)" />
                  <div className="row"><Submit name="decision" value="approve" className="btn btn-success btn-sm">Approve</Submit><Submit name="decision" value="reject" className="btn btn-danger btn-sm">Reject</Submit></div>
                </ActionForm>
              </article>
            );
          }) : <p className="card-flat muted">No companies waiting for review.</p>}
        </section>
        <section className="stack">
          <h2>Open support cases ({open.length})</h2>
          {open.length ? open.map((d) => {
            const u = data.users.find((x) => x.id === d.userId);
            const project = data.projects.find((p) => p.id === d.projectId);
            return (
              <article key={d.id} className="card stack-sm">
                <div className="row-between"><b>{d.issue}</b><span className="small muted">{timeAgo(d.createdAt)}</span></div>
                <span className="small muted">{u?.name} ({u?.role}){project ? ` · ${project.title} · client ${clientById(project.clientId, data)?.displayName}` : ""}</span>
                <p className="small">{d.description}</p>
                <ActionForm action={resolveDispute} className="stack-sm">
                  <input type="hidden" name="disputeId" value={d.id} />
                  <textarea className="input" name="resolution" placeholder="Resolution sent to the member" style={{ minHeight: 70 }} />
                  <div><Submit className="btn btn-primary btn-sm">Resolve case</Submit></div>
                </ActionForm>
              </article>
            );
          }) : <p className="card-flat muted">No open cases.</p>}
          {resolved.length > 0 && <><h3>Recently resolved</h3>{resolved.map((d) => <p key={d.id} className="small muted">✓ {d.issue} — {d.resolution}</p>)}</>}
        </section>
      </div>
      <p className="small muted" style={{ marginTop: 24 }}>Signed in as the demo trust team. <Link className="link" href="/">View public site</Link></p>
    </>
  );
}
