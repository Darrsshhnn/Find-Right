import { currentUser } from "@/lib/auth";
import { db } from "@/lib/db";
import { PdfPage } from "@/lib/pdf";
import { clientById, freelancerById } from "@/lib/queries";

const inr = (n: number) => `INR ${Math.round(n).toLocaleString("en-IN")}`;

export async function GET(_: Request, { params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const user = await currentUser();
  if (!user) return new Response("Sign in to download receipts.", { status: 401 });
  const data = db();
  const tx = data.transactions.find((t) => t.id === id);
  if (!tx || (tx.clientId !== user.id && tx.freelancerId !== user.id && user.role !== "admin")) return new Response("Receipt not found", { status: 404 });
  const project = data.projects.find((p) => p.id === tx.projectId);
  const milestone = project?.milestones.find((m) => m.id === tx.milestoneId);
  const client = clientById(tx.clientId, data);
  const freelancer = freelancerById(tx.freelancerId, data);
  const deposit = tx.type === "escrow_deposit";
  // For a deposit the client pays `charge`; the starter-credit share is the gap to the freelancer's `amount`.
  const amount = deposit ? milestone?.amount ?? tx.amount : tx.amount;
  const discount = deposit && milestone ? Math.max(0, milestone.amount - milestone.charge) : 0;
  // Platform fees are deducted from the freelancer payout, so they appear on release receipts only.
  const platformFee = deposit ? 0 : data.transactions.filter((t) => t.type === "fee" && t.milestoneId === tx.milestoneId && t.projectId === tx.projectId).reduce((s, t) => s + t.amount, 0);
  const total = amount - discount - platformFee;
  const paymentId = `FR-${tx.id.replace(/^tx_/, "").toUpperCase()}`;
  const date = new Date(tx.createdAt).toLocaleString("en-IN", { dateStyle: "long", timeStyle: "short", timeZone: "Asia/Kolkata" });

  const purple: [number, number, number] = [0.54, 0.22, 0.96];
  const muted: [number, number, number] = [0.46, 0.46, 0.46];
  const page = new PdfPage();
  page.box(0, 762, 595, 80, purple);
  page.text(48, 800, "FindRight", { size: 22, bold: true, color: [1, 1, 1] });
  page.text(547, 806, deposit ? "PAYMENT RECEIPT" : "ESCROW RELEASE RECEIPT", { size: 11, bold: true, color: [1, 1, 1], align: "right" });
  page.text(547, 788, paymentId, { size: 10, color: [0.93, 0.89, 1], align: "right" });

  let y = 720;
  const row = (label: string, value: string, opts: { bold?: boolean } = {}) => {
    page.text(48, y, label, { size: 10, color: muted });
    page.text(547, y, value, { size: 11, bold: opts.bold, align: "right" });
    y -= 24;
  };
  row("Payment ID", paymentId);
  row("Date", `${date} IST`);
  row("Project", project?.title ?? "—");
  row("Milestone", milestone ? `${milestone.title} (${milestone.percent}%)` : "—");
  row("Client", client?.displayName ?? "—");
  row("Freelancer", freelancer?.user.name ?? "—");
  row("Payment method", tx.method);
  row("Status", deposit ? (milestone?.status === "released" ? "Paid - released to freelancer" : "Paid - held in escrow") : "Released to freelancer");

  y -= 8;
  page.line(48, y + 12, 547, y + 12);
  y -= 16;
  row("Amount", inr(amount));
  row("Discount (starter credit, covered by FindRight)", discount ? `- ${inr(discount)}` : inr(0));
  row(deposit ? "Platform fees (client)" : `Platform fee (${project?.feePercent ?? 0}%, from freelancer payout)`, platformFee ? `- ${inr(platformFee)}` : inr(0));
  page.line(48, y + 12, 547, y + 12, [0.54, 0.22, 0.96]);
  y -= 8;
  row(deposit ? "Total paid" : "Net paid to freelancer", inr(total), { bold: true });

  page.text(48, 120, "Escrow-protected payment. Funds for later milestones are released only after client approval,", { size: 9, color: muted });
  page.text(48, 106, "or automatically 7 days after submission. Demo build - no real money was moved.", { size: 9, color: muted });
  page.text(48, 80, "FindRight - Hire creative freelancers with confidence.", { size: 9, bold: true, color: purple });

  return new Response(page.toBuffer(), {
    headers: {
      "Content-Type": "application/pdf",
      "Content-Disposition": `attachment; filename="${paymentId}.pdf"`,
      "Cache-Control": "private, no-store",
    },
  });
}
