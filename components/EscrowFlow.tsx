import Icon from "./Icon";

export type EscrowStep = { title: string; percent: number; clientPays: number; freelancerGets: number; fee: number; status?: "pending" | "funded" | "submitted" | "changes" | "released" };

const inr = (n: number) => `₹${Math.round(n).toLocaleString("en-IN")}`;
const STATUS = { pending: "Not funded yet", funded: "Held in escrow", submitted: "Awaiting approval", changes: "Changes requested", released: "Released" };

/** Money flow: client → FindRight escrow → freelancer, per milestone, with the platform fee shown. */
export default function EscrowFlow({ steps, feePercent }: { steps: EscrowStep[]; feePercent: number }) {
  const paidIn = steps.reduce((s, x) => s + x.clientPays, 0);
  const net = steps.reduce((s, x) => s + x.freelancerGets, 0);
  const fees = steps.reduce((s, x) => s + x.fee, 0);
  return (
    <div className="escrow-flow">
      <div className="escrow-nodes" aria-label="How money moves">
        <div className="escrow-node"><span><Icon name="user" size={20} /></span><b>Client pays</b><small>{inr(paidIn)}</small></div>
        <i aria-hidden="true"><Icon name="arrowRight" size={18} /></i>
        <div className="escrow-node escrow-node-mid"><span><Icon name="lock" size={20} /></span><b>FindRight escrow</b><small>Held until approval</small></div>
        <i aria-hidden="true"><Icon name="arrowRight" size={18} /></i>
        <div className="escrow-node"><span><Icon name="wallet" size={20} /></span><b>Freelancer receives</b><small>{inr(net)}</small></div>
      </div>
      <ol className="escrow-steps">
        {steps.map((s, i) => (
          <li key={s.title} className={s.status === "released" ? "done" : s.status && s.status !== "pending" ? "live" : ""}>
            <span className="escrow-dot">{s.status === "released" ? <Icon name="check" size={12} /> : i + 1}</span>
            <div className="grow">
              <b>{s.title} · {s.percent}%</b>
              <div className="small muted">{i === 0 ? "Paid straight to the freelancer so work never starts unpaid." : "Funded into escrow, released when you approve (or after 7 days)."}</div>
            </div>
            <div className="small" style={{ textAlign: "right" }}>
              <div>{inr(s.clientPays)} in → <b>{inr(s.freelancerGets)}</b> out</div>
              {s.status && <span className="muted">{STATUS[s.status]}</span>}
            </div>
          </li>
        ))}
      </ol>
      <p className="small muted">Platform fee {feePercent}% ({inr(fees)}) is taken from the freelancer&apos;s payout at each release — never added on top for the client.</p>
    </div>
  );
}
