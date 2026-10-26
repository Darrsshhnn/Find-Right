import { buildAgreement } from "@/lib/agreement";
import type { Project } from "@/lib/types";

/** Structured, plain-language agreement (also available as a PDF from /api/agreements/[id]). */
export default function Contract({ project, clientName, freelancerName }: { project: Project; clientName: string; freelancerName: string }) {
  const a = buildAgreement(project, { client: clientName, freelancer: freelancerName });
  return (
    <div className="contract">
      <header className="row-between">
        <div><h3>{a.title}</h3><span className="small muted">{a.ref} · {a.date}</span></div>
        <span className={`badge ${a.status.startsWith("Accepted") ? "badge-green" : "badge-amber"}`}>{a.status}</span>
      </header>
      <dl className="contract-parties">
        {a.parties.map(([k, v]) => <div key={k}><dt>{k}</dt><dd>{v}</dd></div>)}
      </dl>
      {a.sections.map((s, i) => (
        <section key={s.heading} className="contract-section">
          <h4><span>{i + 1}</span> {s.heading}</h4>
          {s.paragraphs?.map((p) => <p key={p}>{p}</p>)}
          {s.bullets && <ul>{s.bullets.map((b) => <li key={b}>{b}</li>)}</ul>}
          {s.table && (
            <div className="table-wrap">
              <table>
                <thead><tr>{s.table.head.map((h) => <th key={h}>{h}</th>)}</tr></thead>
                <tbody>{s.table.rows.map((r) => <tr key={r[0]}>{r.map((c, j) => <td key={j}>{c}</td>)}</tr>)}</tbody>
              </table>
            </div>
          )}
        </section>
      ))}
      <dl className="contract-parties">
        {a.acceptance.map(([k, v]) => <div key={k}><dt>{k} acceptance</dt><dd>{v}</dd></div>)}
      </dl>
    </div>
  );
}
