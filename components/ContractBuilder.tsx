"use client";

import { useState } from "react";
import Icon from "./Icon";
import { ActionForm, Submit } from "./ActionForm";
import { createOffer, updateOffer } from "@/app/actions/client";
import { AI_LEVELS, CREDIT_CAP, CREDIT_PERCENT, SCHEDULES } from "@/lib/constants";
import { feeOf, platformFee, type FeeInput } from "@/lib/fees";
import { milestoneSplit } from "@/lib/milestones";
import type { AiLevel, Terms } from "@/lib/types";

const money = (n: number) => `₹${Math.round(n || 0).toLocaleString("en-IN")}`;

export type ContractDefaults = {
  scope: string; deliverables: string; deadline: string; price: number; revisions: number; ai: AiLevel;
  schedule?: Terms["schedule"]; ownership?: Terms["ownership"]; extraRevisionRate?: number;
};

/** Contract form used to send an offer (mode "create") or edit it before the freelancer accepts (mode "edit"). */
export default function ContractBuilder({ mode = "create", id, defaults, creditReserved, creditsLeft, freelancerName, fee }: {
  mode?: "create" | "edit"; id: string; freelancerName: string; creditReserved: boolean; creditsLeft: number;
  defaults: ContractDefaults; fee: Omit<FeeInput, "price">;
}) {
  const [price, setPrice] = useState(defaults.price);
  const [schedule, setSchedule] = useState<Terms["schedule"]>(defaults.schedule ?? "10-90");
  const [useCredit, setUseCredit] = useState(creditReserved);
  const [revisions, setRevisions] = useState(defaults.revisions);
  const [extraRate, setExtraRate] = useState(defaults.extraRevisionRate ?? 0);
  const discount = useCredit ? Math.min(Math.round(price * CREDIT_PERCENT), CREDIT_CAP) : 0;
  const total = price - discount;
  const parts = milestoneSplit(schedule, price, total);
  const platform = platformFee({ ...fee, price });
  const feeAmount = feeOf(price, platform.percent);

  return (
    <ActionForm action={mode === "create" ? createOffer : updateOffer} className="layout-aside">
      <input type="hidden" name={mode === "create" ? "proposalId" : "projectId"} value={id} />
      <div className="stack-lg">
        <section className="card stack">
          <h2 className="row"><span className="fact-icon"><Icon name="file" size={16} /></span> Scope & deliverables</h2>
          <p className="small muted">Pre-filled from your job post and {freelancerName}&apos;s offer. This text becomes the agreement.</p>
          <label className="field">Scope of work<textarea name="scope" defaultValue={defaults.scope} /></label>
          <label className="field">Deliverables<textarea name="deliverables" defaultValue={defaults.deliverables} style={{ minHeight: 96 }} /><small>One per line, as in your job post.</small></label>
          <div className="form-grid">
            <label className="field">Delivery date<input type="date" name="deadline" defaultValue={defaults.deadline} /></label>
            <label className="field">Agreed price (₹)<input type="number" name="price" min="1" value={price || ""} onChange={(e) => setPrice(Number(e.target.value))} /></label>
          </div>
        </section>

        <section className="card stack">
          <h2 className="row"><span className="fact-icon"><Icon name="layers" size={16} /></span> Payment schedule</h2>
          <div className="options options-1">
            {(Object.keys(SCHEDULES) as Terms["schedule"][]).map((k) => (
              <label className="option" key={k}>
                <input type="radio" name="schedule" value={k} checked={schedule === k} onChange={() => setSchedule(k)} />
                <b>{SCHEDULES[k].label}</b>
                <small>{k === "10-90" ? "Lowest upfront commitment — most common for new collaborations." : k === "20-30-50" ? "Tiered: deposit, first samples, final delivery. Great for larger projects." : "Equal split — common for short, well-defined jobs."}</small>
              </label>
            ))}
          </div>
        </section>

        <section className="card stack">
          <h2 className="row"><span className="fact-icon"><Icon name="shield" size={16} /></span> Terms & conditions</h2>
          <div className="form-grid">
            <label className="field">Revision rounds included<select name="revisions" value={revisions} onChange={(e) => setRevisions(Number(e.target.value))}>{[1, 2, 3, 4, 5, 6, 7, 8].map((r) => <option key={r} value={r}>{r} round{r > 1 ? "s" : ""}</option>)}</select><small>Up to 8 rounds.</small></label>
            <label className="field">Extra revision rate (₹ per round)<input type="number" min="0" name="extraRevisionRate" value={extraRate || ""} onChange={(e) => setExtraRate(Number(e.target.value))} placeholder="e.g. 1500" /><small>As discussed — lets you add rounds later without renegotiating.</small></label>
            <label className="field">AI usage allowed<select name="ai" defaultValue={defaults.ai}>{AI_LEVELS.map((a) => <option key={a.value} value={a.value}>{a.value === "No AI" ? "No AI (100% human-made)" : a.value}</option>)}</select></label>
            <label className="field">Ownership of work<select name="ownership" defaultValue={defaults.ownership ?? "full"}><option value="full">Full rights transfer after final payment</option><option value="licence">Usage licence only</option></select></label>
          </div>
        </section>
      </div>

      <aside>
        <section className="card stack">
          <h3>Contract summary</h3>
          <div className="kv">
            <div><span>Agreed price</span><b>{money(price)}</b></div>
            {useCredit && <div><span>Starter credit (15%)</span><b>−{money(discount)}</b></div>}
            <div className="total"><span>You pay</span><b>{money(total)}</b></div>
          </div>
          <div className="milestones">
            {parts.map((p, i) => <div key={p.title} className="milestone" style={{ padding: 8 }}><span className="num">{i + 1}</span><div><b className="small">{p.title}</b><div className="small muted">{p.percent}%</div></div><b className="small">{money(p.charge)}</b></div>)}
          </div>
          <div className="card-tint stack-sm">
            <div className="row-between"><b className="small">Platform fee · {platform.percent}%</b><b className="small">{money(feeAmount)}</b></div>
            <span className="small muted">Deducted from {freelancerName}&apos;s payout — {freelancerName} receives {money(price - feeAmount)}. Range 2–10%.</span>
            {platform.reasons.length > 0 && <span className="small muted">{platform.reasons.join(" · ")}</span>}
          </div>
          <span className="small muted">{revisions} revision rounds{extraRate ? ` · extra rounds ${money(extraRate)} each` : ""}</span>
          {mode === "create" && (creditReserved ? (
            <p className="alert alert-ok small"><Icon name="sparkle" size={15} /> A starter credit is reserved for this job and will be applied.</p>
          ) : creditsLeft > 0 ? (
            <label className="check"><input type="checkbox" name="useCredit" checked={useCredit} onChange={(e) => setUseCredit(e.target.checked)} /> Use a starter credit ({creditsLeft} left)</label>
          ) : null)}
          {mode === "create" && <label className="check"><input type="checkbox" name="agree" /> These terms reflect what {freelancerName} and I agreed. Send the agreement for their acceptance.</label>}
          <Submit pending="Saving…">{mode === "create" ? "Send contract offer" : "Save updated agreement"}</Submit>
          <p className="small muted">{mode === "create" ? `Nothing is charged until ${freelancerName} accepts.` : `${freelancerName} will be asked to accept the new version.`}</p>
        </section>
      </aside>
    </ActionForm>
  );
}
