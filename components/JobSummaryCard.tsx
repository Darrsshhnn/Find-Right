import Icon from "./Icon";
import { SCHEDULES } from "@/lib/constants";
import { budgetLabel, deliverableList } from "@/lib/jobs";
import type { Job } from "@/lib/types";

export type JobSummary = Pick<Job, "title" | "category" | "level" | "description" | "deliverables" | "budget" | "deadline" | "duration" | "revisions"> &
  Partial<Pick<Job, "jobType" | "budgetMin" | "budgetType" | "hours" | "schedule" | "aiPreference" | "extraRevisionRate" | "attachments" | "links">>;

const dateLabel = (d: string) => (d ? new Date(`${d.slice(0, 10)}T00:00`).toLocaleDateString("en-IN", { day: "numeric", month: "short", year: "numeric" }) : "—");

/** Compact, icon-led job card. The same card is used in the post-job preview, job pages and the hire flow. */
export default function JobSummaryCard({ job, eyebrow, footer }: { job: JobSummary; eyebrow?: React.ReactNode; footer?: React.ReactNode }) {
  const items = deliverableList(job.deliverables || "");
  const facts: [string, string, string][] = [
    ["wallet", "Budget", budgetLabel({ budget: job.budget, budgetMin: job.budgetMin, budgetType: job.budgetType, hours: job.hours })],
    ["calendar", "Deadline", dateLabel(job.deadline)],
    ["clock", "Duration", job.duration || "—"],
    ["repeat", "Revisions", `${job.revisions} round${job.revisions === 1 ? "" : "s"}${job.extraRevisionRate ? ` · +₹${job.extraRevisionRate.toLocaleString("en-IN")}/extra` : ""}`],
    ["layers", "Milestones", job.schedule ? SCHEDULES[job.schedule].parts.map((p) => `${p.percent}%`).join(" · ") : "10% · 90%"],
    ["bot", "AI usage", !job.aiPreference || job.aiPreference === "Any" ? "No preference" : job.aiPreference === "No AI" ? "Human-made only" : job.aiPreference],
  ];
  const files = (job.attachments?.length ?? 0) + (job.links?.length ?? 0);
  return (
    <article className="card job-summary">
      <header className="stack-sm">
        {eyebrow}
        <h2>{job.title || "Untitled job"}</h2>
        <div className="row">
          <span className="badge">{job.category || "Category"}</span>
          <span className="badge badge-outline"><Icon name="award" size={12} /> {job.level || "Any level"}</span>
          {job.jobType && <span className="badge badge-outline"><Icon name="briefcase" size={12} /> {job.jobType}</span>}
        </div>
      </header>
      <dl className="fact-grid">
        {facts.map(([icon, label, value]) => (
          <div key={label} className="fact">
            <span className="fact-icon"><Icon name={icon} size={16} /></span>
            <div><dt>{label}</dt><dd>{value}</dd></div>
          </div>
        ))}
      </dl>
      {job.description && <p className="muted clamp-3">{job.description}</p>}
      {items.length > 0 && (
        <ul className="deliverable-list" aria-label="Deliverables">
          {items.slice(0, 4).map((d) => <li key={d}><Icon name="checkCircle" size={16} /> {d}</li>)}
          {items.length > 4 && <li className="muted">+{items.length - 4} more</li>}
        </ul>
      )}
      {(files > 0 || footer) && (
        <div className="row-between" style={{ paddingTop: 16, borderTop: "1px solid var(--line)" }}>
          {files > 0 ? <span className="small muted row"><Icon name="paperclip" size={14} /> {files} reference{files === 1 ? "" : "s"} attached</span> : <span />}
          {footer}
        </div>
      )}
    </article>
  );
}
