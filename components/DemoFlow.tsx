"use client";

import { useState } from "react";
import Icon from "./Icon";
import EscrowFlow from "./EscrowFlow";
import ReviewForm from "./ReviewForm";

const inr = (n: number) => `₹${n.toLocaleString("en-IN")}`;
const P = { freelancer: "Umang Donga", first: "Umang", initials: "UD", title: "Website Design for Noble Paws", price: 8000, credit: 1200 };
const total = P.price - P.credit;
const advance = Math.round(total * 0.1);
const final = total - advance;
/** Platform fee for this demo pairing (rising talent, ₹8k budget) — taken from the freelancer payout. */
const FEE = 8;

const STAGES = ["Offer", "Agreement", "Escrow payment", "Work in progress", "Submission", "Revision", "Approval", "Payment release", "Completed", "Review"];
const MILESTONES = ["Brief & moodboard", "Wireframes", "Hi-fi screens (6)", "Clickable prototype", "Component library & handoff"];
const FILES = [["Noble-Paws-website.fig", "12.4 MB"], ["Clickable-prototype-link.txt", "Prototype link"], ["Component-library.zip", "3.8 MB"], ["Handover-notes.pdf", "0.6 MB"]];

function Summary() {
  return (
    <div className="kv">
      <div><span>Agreed price</span><b>{inr(P.price)}</b></div>
      <div><span>Starter credit · 15% off</span><b style={{ color: "var(--green-ink)" }}>−{inr(P.credit)}</b></div>
      <div className="total"><span>Contract total</span><b>{inr(total)}</b></div>
      <div><span>Platform fee ({FEE}%, from freelancer payout)</span><b>{inr((P.price * FEE) / 100)}</b></div>
    </div>
  );
}

function Who() {
  return <div className="row"><span className="avatar">{P.initials}</span><div><b>{P.freelancer}</b><div className="small muted">{P.title}</div></div></div>;
}

export default function DemoFlow() {
  const [step, setStep] = useState(0);
  const [method, setMethod] = useState("UPI");
  const [revisionSent, setRevisionSent] = useState(false);
  const next = () => { setStep((s) => Math.min(STAGES.length - 1, s + 1)); window.scrollTo({ top: 0, behavior: "smooth" }); };
  const progress = [0, 0, 0, 40, 60, 60, 80, 90, 100, 100][step]!;
  const doneMilestones = step >= 8 ? 5 : step >= 6 ? 3 : 2;

  return (
    <div className="stack-lg">
      <div className="card-flat stack-sm">
        <div className="row-between"><span className="small muted">Step {step + 1} of {STAGES.length} · <b style={{ color: "var(--ink)" }}>{STAGES[step]}</b></span><span className="badge badge-amber">Demo · mock data</span></div>
        <div className="bar"><i style={{ width: `${((step + 1) / STAGES.length) * 100}%` }} /></div>
        <nav className="stepper" aria-label="Demo stages">
          {STAGES.map((s, i) => (
            <button key={s} type="button" className={i < step ? "done" : i === step ? "current" : ""} aria-current={i === step ? "step" : undefined} onClick={() => setStep(i)}>
              <i>{i < step ? "✓" : i + 1}</i><span className="hide-mobile">{s}</span>
            </button>
          ))}
        </nav>
      </div>

      {step === 0 && (
        <div className="layout-aside">
          <section className="card stack">
            <span className="badge" style={{ justifySelf: "start" }}>Offer sent</span>
            <h2>Contract offer for {P.freelancer}</h2>
            <p className="muted">You chose a starter credit and terms. FindRight generated a plain-language agreement for {P.first} to accept.</p>
            <div className="contract">
              <h3>FindRight Project Agreement</h3>
              <ol>
                <li><b>Scope.</b> Design the home, about, shop and checkout pages for desktop and mobile in Figma.</li>
                <li><b>Deliverables.</b> 6 high-fidelity screens, clickable prototype, component library.</li>
                <li><b>Payment.</b> 10% advance ({inr(advance)}) to start, 90% ({inr(final)}) after final approval.</li>
                <li><b>Revisions.</b> 2 rounds included.</li>
                <li><b>AI usage.</b> AI-assisted ideation only — final design stays human-made.</li>
                <li><b>Ownership.</b> Full rights transfer after final payment.</li>
              </ol>
            </div>
          </section>
          <aside><section className="card stack"><Who /><Summary /><button type="button" className="btn btn-primary" onClick={next}>Simulate: {P.first} accepts →</button><p className="small muted">Nothing is charged until the agreement is accepted.</p></section></aside>
        </div>
      )}

      {step === 1 && (
        <section className="card stack center" style={{ justifyItems: "center" }}>
          <span className="success-mark"><Icon name="check" size={24} /></span>
          <h2>{P.first} accepted the agreement</h2>
          <p className="muted" style={{ maxWidth: 520 }}>Both sides have agreed the scope, payment schedule, 2 revision rounds and AI terms. Pay the 10% advance to start the project.</p>
          <div className="card-flat" style={{ width: "100%", maxWidth: 480, textAlign: "left" }}>
            <div className="kv"><div><span>Payment</span><b>10% advance + 90% on approval</b></div><div><span>Revisions</span><b>2 rounds</b></div><div><span>AI usage</span><b>Ideation only</b></div><div><span>Ownership</span><b>Full rights after payment</b></div></div>
          </div>
          <button type="button" className="btn btn-primary" onClick={next}>Continue to payment →</button>
        </section>
      )}

      {step === 2 && (
        <div className="layout-aside">
          <div className="stack-lg">
            <section className="card stack">
              <h2>Payment method</h2>
              <div className="options options-1" role="radiogroup" aria-label="Payment method">
                {[["UPI", "Pay with any UPI app"], ["Card", "Visa, Mastercard, RuPay"], ["Net banking", "All major banks"]].map(([m, d]) => (
                  <label key={m} className="option"><input type="radio" name="demo-method" checked={method === m} onChange={() => setMethod(m!)} /><b>{m === "Card" ? "Debit / credit card" : m}</b><small>{d}</small></label>
                ))}
              </div>
              {method === "UPI" && <label className="field">UPI ID<input className="input" placeholder="name@upi" /></label>}
            </section>
            <section className="card stack">
              <h2>Escrow flow</h2>
              <EscrowFlow
                feePercent={FEE}
                steps={[
                  { title: "Advance", percent: 10, clientPays: advance, fee: Math.round((P.price * 0.1 * FEE) / 100), freelancerGets: P.price * 0.1 - Math.round((P.price * 0.1 * FEE) / 100), status: "pending" },
                  { title: "Final delivery", percent: 90, clientPays: final, fee: Math.round((P.price * 0.9 * FEE) / 100), freelancerGets: P.price * 0.9 - Math.round((P.price * 0.9 * FEE) / 100), status: "pending" },
                ]}
              />
            </section>
          </div>
          <aside>
            <section className="card stack">
              <h3>Payment summary</h3>
              <Who />
              <Summary />
              <div className="kv"><div><span><b>Pay now (10%)</b></span><b style={{ color: "var(--primary)", fontSize: 18 }}>{inr(advance)}</b></div><div><span>Pay after approval (90%)</span><b>{inr(final)}</b></div></div>
              <button type="button" className="btn btn-primary" onClick={next}><Icon name="lock" size={16} /> Pay {inr(advance)} securely</button>
              <p className="small muted row"><Icon name="shield" size={14} /> Demo — no money moves.</p>
            </section>
          </aside>
        </div>
      )}

      {(step === 3 || step === 4 || step === 5 || step === 6) && (
        <div className="layout-aside">
          <div className="stack-lg">
            {step === 3 && (
              <section className="card stack">
                <div className="row-between"><h2>Overall progress</h2><b style={{ color: "var(--primary)", fontSize: 20 }}>{progress}%</b></div>
                <div className="bar bar-thick"><i style={{ width: `${progress}%` }} /></div>
                <div className="grid-4"><div><span className="small muted">Started</span><br /><b>Oct 17</b></div><div><span className="small muted">Days left</span><br /><b>19 days</b></div><div><span className="small muted">Milestones</span><br /><b>{doneMilestones} of 5 done</b></div><div><span className="small muted">Revisions used</span><br /><b>0 of 2</b></div></div>
              </section>
            )}
            {(step === 4 || step === 5) && (
              <section className="card stack">
                <div className="row-between"><h2>Milestone 3 · Hi-fi screens</h2><span className={`badge ${step === 5 && revisionSent ? "badge-amber" : ""}`}>{step === 5 && revisionSent ? "Changes requested" : "Awaiting your review"}</span></div>
                <div className="dropzone" style={{ cursor: "default", minHeight: 192, alignContent: "center" }}><Icon name="layers" size={28} /><span>Hi-fi screens v{step === 5 && revisionSent ? "2" : "1"} · preview</span></div>
                {[["Home_and_Shop_v1.fig", "12.4 MB"], ["Checkout_flow.png", "3.1 MB"]].map(([n, s]) => <div key={n} className="file-row"><Icon name="file" /><span className="grow">{n} <span className="muted">· {s}</span></span><Icon name="download" size={16} /></div>)}
                <p className="card-tint small"><b>Note from {P.first}:</b> All six screens are ready, built from the moodboard you approved. Happy to refine anything!</p>
                {step === 4 && <div className="row"><button type="button" className="btn btn-success" onClick={() => setStep(6)}><Icon name="check" size={16} /> Approve milestone</button><button type="button" className="btn btn-danger" onClick={next}><Icon name="edit" size={16} /> Request changes</button></div>}
                {step === 5 && !revisionSent && (
                  <form className="stack" onSubmit={(e) => { e.preventDefault(); setRevisionSent(true); }}>
                    <label className="field">What should change?<textarea required defaultValue="Please make the product photos larger on the shop page and warm up the button colour." /></label>
                    <div className="row"><button className="btn btn-primary">Send feedback (uses 1 of 2 revisions)</button><button type="button" className="btn btn-light" onClick={() => setStep(4)}>Cancel</button></div>
                  </form>
                )}
                {step === 5 && revisionSent && <div className="row"><p className="alert alert-info grow">Feedback sent. {P.first} has re-submitted v2 with your changes.</p><button type="button" className="btn btn-success" onClick={next}><Icon name="check" size={16} /> Approve v2</button></div>}
              </section>
            )}
            {step === 6 && (
              <section className="card stack center" style={{ justifyItems: "center" }}>
                <span className="success-mark"><Icon name="check" size={24} /></span>
                <h2>Milestone approved</h2>
                <p className="muted" style={{ maxWidth: 520 }}>Hi-fi screens are approved. {P.first} moves on to the prototype and component library. The 90% stays in escrow until you approve the final delivery.</p>
                <button type="button" className="btn btn-primary" onClick={next}>Jump to final submission →</button>
              </section>
            )}
            <section className="card stack">
              <h2>Milestones</h2>
              <div className="milestones">
                {MILESTONES.map((m, i) => {
                  const done = i < doneMilestones;
                  const current = i === doneMilestones && step >= 4;
                  return (
                    <div key={m} className={`milestone${done ? " released" : current ? " current" : ""}`}>
                      <span className="num">{done ? "✓" : i + 1}</span>
                      <div><b>{m}</b><div className="small muted">{done ? "Completed" : `Due Nov ${i + 1}`}</div></div>
                      <span className={`badge ${done ? "badge-green" : current ? "badge-amber" : "badge-grey"}`}>{done ? "Done" : current ? "In review" : "Upcoming"}</span>
                    </div>
                  );
                })}
              </div>
              {step === 3 && <button type="button" className="btn btn-primary" onClick={next}>Simulate: {P.first} submits hi-fi screens →</button>}
            </section>
          </div>
          <aside>
            <section className="card stack">
              <h3 className="row"><Icon name="lock" size={16} /> Escrow payments</h3>
              <div className="row-between"><span>Contract total</span><b>{inr(total)}</b></div>
              <div className="bar bar-green"><i style={{ width: "10%" }} /></div>
              <p className="small"><Icon name="check" size={14} /> 10% advance · {inr(advance)} paid</p>
              <p className="small muted"><Icon name="clock" size={14} /> 90% final · {inr(final)} released on approval</p>
            </section>
            <section className="card stack-sm"><Who /><span className="badge" style={{ justifySelf: "start" }}>AI-assisted ideation</span></section>
          </aside>
        </div>
      )}

      {step === 7 && (
        <div className="layout-aside">
          <div className="stack-lg">
            <section className="card stack">
              <h2>Delivered work</h2>
              <div className="thumbs thumbs-3"><img src="/assets/04b9e.png" alt="" /><img src="/assets/cafad.png" alt="" /><img src="/assets/71e23.png" alt="" /></div>
            </section>
            <section className="card stack">
              <h2>Files</h2>
              {FILES.map(([n, s]) => <div key={n} className="file-row"><Icon name="file" /><span className="grow">{n} <span className="muted">· {s}</span></span><Icon name="download" size={16} /></div>)}
            </section>
            <section className="card stack-sm">
              <h2>Deliverables checklist</h2>
              {["6 high-fidelity screens", "Clickable prototype", "Reusable component library", "AI usage matches disclosure (ideation only)"].map((d) => <span key={d} className="row small"><Icon name="check" size={14} /> {d}</span>)}
            </section>
          </div>
          <aside>
            <section className="card stack">
              <h3>Release final payment</h3>
              <div className="kv"><div><span>Contract total</span><b>{inr(total)}</b></div><div><span>10% advance (paid)</span><b style={{ color: "var(--green-ink)" }}>−{inr(advance)}</b></div><div className="total"><span>Final payment (90%)</span><b>{inr(final)}</b></div></div>
              <button type="button" className="btn btn-primary" onClick={next}><Icon name="check" size={16} /> Approve & release {inr(final)}</button>
              <p className="small muted">Revisions used: 1 of 2</p>
            </section>
            <section className="card-tint stack-sm"><b className="row"><Icon name="shield" size={16} /> Protected by escrow</b><p className="small">The money goes to {P.first} only after you approve.</p></section>
          </aside>
        </div>
      )}

      {step === 8 && (
        <div className="stack-lg">
          <section className="card stack center" style={{ justifyItems: "center" }}>
            <span className="success-mark"><Icon name="check" size={24} /></span>
            <h2>Final payment of {inr(final)} sent</h2>
            <p className="muted">{P.freelancer} has been paid. All files are now yours.</p>
          </section>
          <div className="grid-3">
            <section className="card stack">
              <h3>Payment summary</h3>
              <div className="kv"><div><span>Advance (10%)</span><b>{inr(advance)}</b></div><div><span>Final payment (90%)</span><b>{inr(final)}</b></div><div className="total"><span>Total paid</span><b>{inr(total)}</b></div><div><span>You saved with starter credit</span><b style={{ color: "var(--green-ink)" }}>{inr(P.credit)}</b></div></div>
            </section>
            <section className="card stack">
              <h3>Delivered files</h3>
              {FILES.slice(0, 3).map(([n]) => <div key={n} className="file-row"><Icon name="file" /><span className="grow truncate">{n}</span></div>)}
            </section>
            <section className="card stack center" style={{ justifyItems: "center" }}>
              <h3>How was {P.first}?</h3>
              <p className="small muted">Your rating helps other clients.</p>
              <button type="button" className="btn btn-primary btn-block" onClick={next}><Icon name="star" size={16} /> Rate & review</button>
            </section>
          </div>
        </div>
      )}

      {step === 9 && <ReviewForm demo projectId="demo" freelancerName={P.freelancer} aiDisclosed="AI-assisted ideation" onDone={() => setStep(9)} />}

      <div className="row-between">
        <button type="button" className="btn btn-ghost" disabled={step === 0} onClick={() => setStep((s) => Math.max(0, s - 1))}><Icon name="arrowLeft" size={16} /> Previous</button>
        {step < STAGES.length - 1 ? <button type="button" className="btn btn-outline" onClick={next}>Next stage <Icon name="arrowRight" size={16} /></button> : <button type="button" className="btn btn-outline" onClick={() => { setStep(0); setRevisionSent(false); }}>Restart demo</button>}
      </div>
    </div>
  );
}
