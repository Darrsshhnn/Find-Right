import { SCHEDULES } from "./constants";
import { feeOf } from "./fees";
import { deliverableList } from "./jobs";
import type { Project } from "./types";

export type AgreementSection = { heading: string; paragraphs?: string[]; bullets?: string[]; table?: { head: string[]; rows: string[][] } };
export type Agreement = { title: string; ref: string; date: string; status: string; parties: [string, string][]; sections: AgreementSection[]; acceptance: [string, string][] };

const inr = (n: number) => `₹${Math.round(n).toLocaleString("en-IN")}`;
const day = (d: string) => new Date(d.length === 10 ? `${d}T00:00` : d).toLocaleDateString("en-IN", { day: "numeric", month: "long", year: "numeric" });

/** Structured agreement shared by the on-screen contract and the PDF download. */
export function buildAgreement(project: Project, names: { client: string; freelancer: string }): Agreement {
  const total = project.price - project.discount;
  const fee = project.feePercent ?? 0;
  const feeTotal = feeOf(project.price, fee);
  const accepted = !["offer", "declined", "cancelled"].includes(project.status);
  return {
    title: "FindRight Project Agreement",
    ref: `FR-AGR-${project.id.replace(/^pr_/, "").toUpperCase()}`,
    date: day(project.createdAt),
    status: accepted ? "Accepted by both parties" : project.status === "offer" ? "Awaiting freelancer acceptance" : "Not active",
    parties: [["Client", names.client], ["Freelancer", names.freelancer], ["Project", project.title]],
    sections: [
      { heading: "Scope of work", paragraphs: [project.scope] },
      { heading: "Deliverables", bullets: deliverableList(project.deliverables) },
      { heading: "Timeline", paragraphs: [`Final deliverables are due by ${day(project.deadline)}. If feedback is late, the deadline moves by the same number of days.`] },
      {
        heading: "Fees & payment schedule",
        paragraphs: [
          `Agreed fee: ${inr(project.price)}.${project.discount ? ` A FindRight starter credit of ${inr(project.discount)} is covered by FindRight, so the Client pays ${inr(total)}.` : ""}`,
          `Platform fee: ${fee}% (${inr(feeTotal)}), deducted from the Freelancer's payout on each released milestone. The Freelancer receives ${inr(project.price - feeTotal)} in total.`,
          `${SCHEDULES[project.terms.schedule].label}. The first payment goes to the Freelancer before work starts; later milestones are held in escrow and released on approval, or automatically 7 days after submission.`,
        ],
        table: {
          head: ["Milestone", "Share", "Client pays", "Freelancer receives"],
          rows: project.milestones.map((m) => [m.title, `${m.percent}%`, inr(m.charge), inr(m.amount - feeOf(m.amount, fee))]),
        },
      },
      {
        heading: "Revisions",
        paragraphs: [
          `${project.terms.revisions} revision round${project.terms.revisions === 1 ? " is" : "s are"} included.`,
          project.terms.extraRevisionRate
            ? `Additional rounds can be added at the agreed rate of ${inr(project.terms.extraRevisionRate)} per round, paid into escrow with the current milestone.`
            : "Changes beyond the included rounds, or outside the scope, require a new paid change request agreed by both sides.",
        ],
      },
      { heading: "AI usage", paragraphs: [`Agreed level: ${project.terms.ai === "No AI" ? "No AI — 100% human-made" : project.terms.ai}. Any AI use beyond this level must be disclosed before delivery.`] },
      { heading: "Ownership", paragraphs: [project.terms.ownership === "full" ? "Full intellectual property rights transfer to the Client after the final payment is released." : "The Client receives a perpetual usage licence; the Freelancer keeps ownership of the source work.", "The Freelancer may show the work in their portfolio unless the Client requests confidentiality in writing."] },
      { heading: "Fair work", bullets: ["No unpaid samples beyond the agreed scope.", "Both sides communicate through FindRight so decisions are on record.", "If either side ends early, released payments stay with the Freelancer, work in progress is paid by completed milestones, and unstarted escrow is refunded to the Client."] },
      { heading: "Disputes", paragraphs: ["Issues are first resolved in the project chat, then by FindRight support, whose decision on escrowed funds is final."] },
    ],
    acceptance: [
      ["Client", `${names.client} — offer sent ${day(project.createdAt)}`],
      ["Freelancer", `${names.freelancer} — ${accepted ? "accepted" : "pending acceptance"}`],
    ],
  };
}
