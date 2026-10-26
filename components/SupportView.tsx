import { ActionForm, Submit } from "./ActionForm";
import TourButton from "./TourButton";
import { PageHead } from "./ui";
import { raiseDispute } from "@/app/actions/shared";
import { db } from "@/lib/db";
import { timeAgo } from "@/lib/format";
import type { User } from "@/lib/types";

const FAQ_CLIENT = [
  ["How does escrow work?", "When the freelancer accepts your contract, you pay the first milestone (the advance) which goes to them so work never starts unpaid. Every later milestone is held in escrow and released only when you approve the delivery — or automatically 7 days after submission if you don't respond."],
  ["What if I need more changes than agreed?", "Each contract includes a fixed number of revision rounds. Once used, agree a paid change request with the freelancer in chat. This keeps scope fair for both sides."],
  ["How do starter credits work?", "New clients get three credits worth 15% off a hire (up to ₹5,000 each). The discount is covered by FindRight — the freelancer still receives the full agreed fee."],
  ["How is my company verified?", "Our trust team checks the website or LinkedIn company page you submit. Verified companies get a badge on every brief, which attracts more and better proposals."],
];
const FAQ_FREELANCER = [
  ["When do I get paid?", "You receive the advance before starting. Later milestones are funded into escrow before you begin them and released when the client approves — or automatically after 7 days without a response."],
  ["What does the AI disclosure do?", "Clients see your AI level per discipline and an overall involvement meter. It sets clear expectations and protects you from accusations that human work was AI-generated."],
  ["How does matching work?", "We rank you for jobs by discipline, skills, experience level, availability and budget fit — so rising talent sees right-sized projects instead of competing with seniors on price."],
  ["What's a client-verified portfolio piece?", "After completing a FindRight contract you can add it to your portfolio with a verified badge — proof the work was real, paid and delivered."],
];

export default function SupportView({ user }: { user: User }) {
  const data = db();
  const projects = data.projects.filter((p) => p.clientId === user.id || p.freelancerId === user.id);
  const cases = data.disputes.filter((d) => d.userId === user.id);
  const faq = user.role === "client" ? FAQ_CLIENT : FAQ_FREELANCER;
  return (
    <>
      <PageHead eyebrow="Help centre" title="Help & support" description="Get answers, or ask the FindRight trust team to step in on a project." actions={<TourButton />} />
      <div className="layout-aside">
        <div className="stack-lg">
          <section className="stack">{faq.map(([q, a]) => <details key={q} className="faq"><summary>{q}</summary><p>{a}</p></details>)}</section>
          <section className="card stack">
            <h2>Your support cases</h2>
            {cases.length ? cases.map((c) => (
              <div key={c.id} className="list-row" style={{ alignItems: "flex-start" }}>
                <div className="grow stack-sm" style={{ gap: 4 }}>
                  <div className="row"><b>{c.issue}</b><span className={`badge ${c.status === "open" ? "badge-amber" : "badge-green"}`}>{c.status === "open" ? "Open" : "Resolved"}</span></div>
                  <p className="small">{c.description}</p>
                  {c.resolution && <p className="small" style={{ color: "var(--green-ink)" }}>Resolution: {c.resolution}</p>}
                  <span className="small muted">{c.projectId ? data.projects.find((p) => p.id === c.projectId)?.title + " · " : ""}{timeAgo(c.createdAt)}</span>
                </div>
              </div>
            )) : <p className="muted small">No cases yet.</p>}
          </section>
        </div>
        <aside>
          <ActionForm action={raiseDispute} className="card stack" resetOnOk>
            <h3>Contact the trust team</h3>
            <label className="field">Project<select name="projectId"><option value="">Not about a specific project</option>{projects.map((p) => <option key={p.id} value={p.id}>{p.title}</option>)}</select></label>
            <label className="field">Issue<select name="issue">{["Work is not as agreed", "Other party not responding", "Payment problem", "Account or verification", "Report a suspicious job or user", "Other"].map((i) => <option key={i}>{i}</option>)}</select></label>
            <label className="field">What happened?<textarea name="description" placeholder="Include milestones, dates and what you'd like to happen." /></label>
            <Submit pending="Sending…">Submit case</Submit>
            <p className="small muted">We reply within 24 hours. Escrowed funds stay frozen while a case is open.</p>
          </ActionForm>
        </aside>
      </div>
    </>
  );
}
