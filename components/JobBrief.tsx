import Icon from "./Icon";
import { fileSize } from "@/lib/format";
import { deliverableList } from "@/lib/jobs";
import type { Job } from "@/lib/types";

export default function JobBrief({ job }: { job: Job }) {
  const deliverables = job.deliverables ? deliverableList(job.deliverables) : [];
  const links = job.links?.length ? job.links : job.references ? job.references.split("\n").filter((l) => /^https?:\/\//.test(l)) : [];
  const note = !job.links?.length && job.references && !/^https?:\/\//.test(job.references) ? job.references : "";
  return (
    <div className="stack">
      {job.objective && <div className="stack-sm"><b>Objective</b><p>{job.objective}</p></div>}
      <div className="stack-sm"><b>Overview</b><p style={{ whiteSpace: "pre-wrap", color: "var(--ink-2)" }}>{job.description}</p></div>
      {deliverables.length > 0 && (
        <div className="stack-sm"><b>Deliverables</b><ul style={{ margin: 0, paddingLeft: 20, display: "grid", gap: 4 }}>{deliverables.map((d) => <li key={d}>{d}</li>)}</ul></div>
      )}
      {job.style && <div className="stack-sm"><b>Style & direction</b><p>{job.style}</p></div>}
      {job.candidate && <div className="stack-sm"><b>Ideal candidate</b><p>{job.candidate}</p></div>}
      {job.aiPreference && job.aiPreference !== "Any" && <p className="small"><b>AI usage preference:</b> {job.aiPreference === "No AI" ? "No AI — 100% human-made" : job.aiPreference}</p>}
      {(job.attachments?.length || links.length || note) ? (
        <div className="stack-sm">
          <b>References & assets</b>
          {job.attachments && job.attachments.length > 0 && (
            <div className="attach-grid">
              {job.attachments.map((a) => (
                <a key={a.id} className="attach" href={`/api/files/${a.id}`} target="_blank" rel="noreferrer">
                  <div className="preview">{a.type?.startsWith("image/") ? <img src={`/api/files/${a.id}`} alt={a.name} loading="lazy" /> : <Icon name="file" size={28} />}</div>
                  <div className="name"><span className="truncate">{a.name}</span><span className="muted">{fileSize(a.size)}</span></div>
                </a>
              ))}
            </div>
          )}
          {links.map((l) => <a key={l} className="link-row link" href={l} target="_blank" rel="noreferrer noopener"><Icon name="link" size={16} /><span className="truncate">{l}</span></a>)}
          {note && <p className="small muted">{note}</p>}
        </div>
      ) : null}
    </div>
  );
}
