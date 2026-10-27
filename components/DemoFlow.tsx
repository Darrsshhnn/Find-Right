"use client";

import { useState } from "react";
import Icon from "./Icon";
import EscrowFlow from "./EscrowFlow";
import ReviewForm from "./ReviewForm";
import { Avatar } from "./ui";

const inr = (n: number) => `₹${Math.round(n).toLocaleString("en-IN")}`;
const P = { freelancer: "Umang Donga", first: "Umang", avatar: "/assets/3f8c7.png", client: "Mukul", title: "Website Design for Noble Paws", price: 8000, credit: 1200 };
const total = P.price - P.credit;
/** Platform fee for this demo pairing (rising talent, ₹8k budget) — taken from the freelancer payout. */
const FEE = 8;
const INCLUDED_REVISIONS = 2;
const EXTRA_RATE = 500;

const STAGES = ["Discuss & plan", "Agreement", "Escrow payment", "Milestones & revisions", "Completed", "Review"];
/** Milestone plans the client and freelancer can settle on while chatting, by number of sessions. */
const PLANS: Record<number, { title: string; percent: number }[]> = {
  2: [{ title: "Design direction & key screens", percent: 40 }, { title: "Final screens, prototype & handoff", percent: 60 }],
  3: [{ title: "Brief & moodboard", percent: 20 }, { title: "Hi-fi screens (6)", percent: 40 }, { title: "Prototype & handoff", percent: 40 }],
  4: [{ title: "Brief & moodboard", percent: 10 }, { title: "Wireframes", percent: 20 }, { title: "Hi-fi screens (6)", percent: 40 }, { title: "Prototype & handoff", percent: 30 }],
  5: [{ title: "Brief & moodboard", percent: 10 }, { title: "Wireframes", percent: 15 }, { title: "Hi-fi screens (6)", percent: 35 }, { title: "Clickable prototype", percent: 20 }, { title: "Component library & handoff", percent: 20 }],
};
const PREVIEWS = ["/assets/1f943.png", "/assets/cafad.png", "/assets/04b9e.png", "/assets/71e23.png", "/assets/56dc5.png"];

type Milestone = { title: string; percent: number };
type Revision = { milestone: number; note: string };

function Who() {
  return <div className="row" style={{ flexWrap: "nowrap" }}><Avatar name={P.freelancer} src={P.avatar} /><div><b>{P.freelancer}</b><div className="small muted">{P.title}</div></div></div>;
}

export default function DemoFlow() {
  const [step, setStep] = useState(0);
  const [sessions, setSessions] = useState(3);
  const [plan, setPlan] = useState<Milestone[]>(PLANS[3]!);
  const [agreed, setAgreed] = useState(false);
  const [method, setMethod] = useState("UPI");
  const [current, setCurrent] = useState(0);
  const [submitted, setSubmitted] = useState(false);
  const [revisions, setRevisions] = useState<Revision[]>([]);
  const [extra, setExtra] = useState(0);
  const [note, setNote] = useState("");

  const limit = INCLUDED_REVISIONS + extra;
  const used = revisions.length;
  const left = limit - used;
  const charge = (m: Milestone) => (total * m.percent) / 100;
  const fee = (m: Milestone) => Math.round((P.price * m.percent * FEE) / 10000);
  const percentSum = plan.reduce((s, m) => s + m.percent, 0);
  const versionOf = (i: number) => revisions.filter((r) => r.milestone === i).length + 1;
  const paidSoFar = plan.slice(0, current).reduce((s, m) => s + charge(m), 0);

  const go = (n: number) => { setStep(n); window.scrollTo({ top: 0, behavior: "smooth" }); };
  const pickSessions = (n: number) => { setSessions(n); setPlan(PLANS[n]!); setAgreed(false); };
  const editMilestone = (i: number, patch: Partial<Milestone>) => { setPlan((p) => p.map((m, j) => (j === i ? { ...m, ...patch } : m))); setAgreed(false); };
  const restart = () => { setStep(0); pickSessions(3); setCurrent(0); setSubmitted(false); setRevisions([]); setExtra(0); setNote(""); };
  const approve = () => {
    setSubmitted(false);
    setNote("");
    if (current + 1 >= plan.length) go(4);
    else { setCurrent(current + 1); window.scrollTo({ top: 0, behavior: "smooth" }); }
  };
  const requestRevision = (e: React.FormEvent) => {
    e.preventDefault();
    if (left <= 0 || !note.trim()) return;
    setRevisions((r) => [...r, { milestone: current, note: note.trim() }]);
    setNote("");
    setSubmitted(false);
  };

  const escrowSteps = plan.map((m, i) => ({
    title: m.title, percent: m.percent, clientPays: charge(m), fee: fee(m), freelancerGets: (P.price * m.percent) / 100 - fee(m),
    status: (step >= 4 || i < current ? "released" : i === current && step >= 3 ? (submitted ? "submitted" : "funded") : "pending") as "released" | "submitted" | "funded" | "pending",
  }));

  return (
    <div className="stack-lg">
      <div className="card-flat stack-sm">
        <div className="row-between"><span className="small muted">Step {step + 1} of {STAGES.length} · <b style={{ color: "var(--ink)" }}>{STAGES[step]}</b></span><span className="badge badge-amber">Demo · mock data</span></div>
        <div className="bar"><i style={{ width: `${((step + 1) / STAGES.length) * 100}%` }} /></div>
        <nav className="stepper" aria-label="Demo stages">
          {STAGES.map((s, i) => (
            <button key={s} type="button" className={i < step ? "done" : i === step ? "current" : ""} aria-current={i === step ? "step" : undefined} disabled={i > 0 && !agreed} onClick={() => go(i)}>
              <i>{i < step ? "✓" : i + 1}</i><span className="hide-mobile">{s}</span>
            </button>
          ))}
        </nav>
      </div>

      {step === 0 && (
        <div className="layout-aside">
          <section className="card stack">
            <div className="row-between"><h2>Chat with {P.first}</h2><span className="badge"><Icon name="chat" size={12} /> Before hiring</span></div>
            <div className="thread demo-thread">
              <div className="bubble mine">Hi {P.first}! We need the Noble Paws store designed — home, shop, product and checkout. How would you split the work?<small>{P.client} · 10:02</small></div>
              <div className="bubble">Happy to! I usually work in sessions — each one ends with a submission you review. For this scope I&apos;d suggest 3 sessions with 2 revision rounds in total.<small>{P.first} · 10:05</small></div>
              <div className="bubble mine">Sounds good. Let&apos;s lock the milestones here so they go straight into the agreement.<small>{P.client} · 10:06</small></div>
              {agreed && <div className="bubble">Agreed ✓ — {plan.length} sessions, {INCLUDED_REVISIONS} revision rounds, extra rounds at {inr(EXTRA_RATE)} each.<small>{P.first} · 10:09</small></div>}
            </div>

            <div className="plan-box stack">
              <div className="row-between">
                <h3 className="row" style={{ gap: 8 }}><Icon name="layers" size={18} /> Milestone plan</h3>
                {agreed ? <span className="badge badge-green"><Icon name="check" size={12} /> Pre-registered</span> : <span className="badge badge-grey">Draft</span>}
              </div>
              <div className="field">
                <span>In how many sessions will the project be delivered?</span>
                <div className="segmented" role="radiogroup" aria-label="Number of sessions">
                  {[2, 3, 4, 5].map((n) => <label key={n}><input type="radio" name="sessions" checked={sessions === n} onChange={() => pickSessions(n)} />{n} sessions</label>)}
                </div>
              </div>
              <ol className="plan-list">
                {plan.map((m, i) => (
                  <li key={i}>
                    <span className="num">{i + 1}</span>
                    <label className="field"><span className="sr-only">Milestone {i + 1} title</span><input value={m.title} onChange={(e) => editMilestone(i, { title: e.target.value })} /></label>
                    <label className="field plan-pct"><span className="sr-only">Milestone {i + 1} share</span><input type="number" min={5} max={90} step={5} value={m.percent} onChange={(e) => editMilestone(i, { percent: Number(e.target.value) || 0 })} /><b>%</b></label>
                    <span className="plan-amt">{inr(charge(m))}</span>
                  </li>
                ))}
              </ol>
              <div className="row-between small">
                <span className={percentSum === 100 ? "muted" : ""} style={percentSum === 100 ? undefined : { color: "var(--red)" }}>Total {percentSum}%{percentSum !== 100 && " — must add up to 100%"}</span>
                <span className="muted">{INCLUDED_REVISIONS} revision rounds included · extra {inr(EXTRA_RATE)}/round</span>
              </div>
              {!agreed
                ? <button type="button" className="btn btn-primary" disabled={percentSum !== 100 || plan.some((m) => !m.title.trim())} onClick={() => setAgreed(true)}><Icon name="send" size={16} /> Share plan · simulate {P.first} agrees</button>
                : <button type="button" className="btn btn-primary" onClick={() => go(1)}>Create the agreement with these milestones →</button>}
            </div>
          </section>
          <aside>
            <section className="card stack"><Who /><div className="kv"><div><span>Budget</span><b>{inr(P.price)}</b></div><div><span>Starter credit · 15% off</span><b style={{ color: "var(--green-ink)" }}>−{inr(P.credit)}</b></div><div className="total"><span>Contract total</span><b>{inr(total)}</b></div></div></section>
            <section className="card-tint stack-sm"><b className="row"><Icon name="shield" size={16} /> Why plan in chat?</b><p className="small">Milestones you agree here are pre-registered on the contract — each session is funded, submitted and approved on its own.</p></section>
          </aside>
        </div>
      )}

      {step === 1 && (
        <div className="layout-aside">
          <section className="card stack">
            <span className="badge badge-green" style={{ justifySelf: "start" }}><Icon name="check" size={12} /> Accepted by {P.first}</span>
            <h2>FindRight Project Agreement</h2>
            <div className="contract">
              <ol>
                <li><b>Scope.</b> Design the home, shop, product and checkout pages for desktop and mobile in Figma.</li>
                <li><b>Sessions.</b> Delivered in {plan.length} milestones agreed in chat:
                  <ul>{plan.map((m, i) => <li key={i}>{i + 1}. {m.title} — {m.percent}% ({inr(charge(m))})</li>)}</ul>
                </li>
                <li><b>Revisions.</b> {INCLUDED_REVISIONS} rounds included across the project; extra rounds at {inr(EXTRA_RATE)} each.</li>
                <li><b>Payment.</b> Each milestone is funded into escrow before work starts and released when you approve it.</li>
                <li><b>AI usage.</b> AI-assisted ideation only — final design stays human-made.</li>
                <li><b>Ownership.</b> Full rights transfer after final payment.</li>
              </ol>
            </div>
          </section>
          <aside><section className="card stack"><Who /><div className="kv"><div><span>Milestones</span><b>{plan.length}</b></div><div><span>Revisions</span><b>{INCLUDED_REVISIONS} + extra</b></div><div className="total"><span>Contract total</span><b>{inr(total)}</b></div></div><button type="button" className="btn btn-primary" onClick={() => go(2)}>Continue to payment →</button></section></aside>
        </div>
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
            <section className="card stack"><h2>Escrow flow</h2><EscrowFlow feePercent={FEE} steps={escrowSteps} /></section>
          </div>
          <aside>
            <section className="card stack">
              <h3>Fund milestone 1</h3>
              <Who />
              <div className="kv"><div><span>{plan[0]!.title}</span><b style={{ color: "var(--primary)" }}>{inr(charge(plan[0]!))}</b></div><div><span>Later milestones</span><b>Funded one at a time</b></div></div>
              <button type="button" className="btn btn-primary" onClick={() => { setCurrent(0); setSubmitted(false); go(3); }}><Icon name="lock" size={16} /> Pay {inr(charge(plan[0]!))} securely</button>
              <p className="small muted row"><Icon name="shield" size={14} /> Demo — no money moves.</p>
            </section>
          </aside>
        </div>
      )}

      {step === 3 && (
        <div className="layout-aside">
          <div className="stack-lg">
            <section className="card stack">
              <div className="row-between">
                <h2>Milestone {current + 1} of {plan.length} · {plan[current]!.title}</h2>
                <span className={`badge ${submitted ? "" : "badge-grey"}`}>{submitted ? `Submitted · v${versionOf(current)}` : "In progress"}</span>
              </div>
              {!submitted ? (
                <div className="stack">
                  <p className="muted">{inr(charge(plan[current]!))} is secured in escrow. {P.first} is working on this session{versionOf(current) > 1 ? ` — updating it with your feedback (v${versionOf(current)})` : ""}.</p>
                  {revisions.filter((r) => r.milestone === current).slice(-1).map((r) => <p key={r.note} className="card-tint small"><b>Your last feedback:</b> {r.note}</p>)}
                  <div><button type="button" className="btn btn-primary" onClick={() => setSubmitted(true)}>Simulate: {P.first} submits v{versionOf(current)} →</button></div>
                </div>
              ) : (
                <div className="stack">
                  <img className="demo-preview" src={PREVIEWS[current % PREVIEWS.length]} alt={`${plan[current]!.title} preview`} />
                  <div className="file-row"><Icon name="file" /><span className="grow">{plan[current]!.title.replace(/[^a-z0-9]+/gi, "_")}_v{versionOf(current)}.fig <span className="muted">· 12.4 MB</span></span><Icon name="download" size={16} /></div>
                  <p className="card-tint small"><b>Note from {P.first}:</b> {versionOf(current) > 1 ? "I've applied your feedback — have a look at this version." : "This session is ready for your review. Happy to refine anything!"}</p>

                  <div className="revision-box stack">
                    <div className="row-between">
                      <h3 className="row" style={{ gap: 8 }}><Icon name="repeat" size={18} /> Revisions before you confirm</h3>
                      <span className={`badge ${left > 0 ? "" : "badge-amber"}`}>{used} of {limit} used</span>
                    </div>
                    <div className="rev-meter" aria-hidden="true">{Array.from({ length: limit }, (_, i) => <i key={i} className={i < used ? "on" : ""} />)}</div>
                    {left > 0 ? (
                      <form className="stack" onSubmit={requestRevision}>
                        <label className="field">What should change in this submission?<textarea value={note} onChange={(e) => setNote(e.target.value)} placeholder="e.g. Make the product photos larger and warm up the button colour." /></label>
                        <div><button className="btn btn-outline" disabled={!note.trim()}><Icon name="edit" size={16} /> Request revision ({left} left)</button></div>
                      </form>
                    ) : (
                      <div className="alert alert-warn stack-sm">
                        <b>All {limit} revision rounds are used.</b>
                        <span className="small">Need more changes? Add extra rounds at the rate agreed in the contract ({inr(EXTRA_RATE)} per round), paid into escrow with this milestone.</span>
                        <div className="row">{[1, 2].map((n) => <button key={n} type="button" className="btn btn-outline btn-sm" onClick={() => setExtra((x) => x + n)}><Icon name="plus" size={14} /> Add {n} round{n > 1 ? "s" : ""} · {inr(n * EXTRA_RATE)}</button>)}</div>
                      </div>
                    )}
                  </div>

                  <div className="row-between confirm-row">
                    <span className="small muted">Confirming releases {inr(charge(plan[current]!))} to {P.first}.</span>
                    <button type="button" className="btn btn-success" onClick={approve}><Icon name="check" size={16} /> Confirm & release milestone {current + 1}</button>
                  </div>
                </div>
              )}
            </section>
            <section className="card stack">
              <h2>Pre-registered milestones</h2>
              <div className="milestones">
                {plan.map((m, i) => {
                  const done = i < current;
                  const now = i === current;
                  return (
                    <div key={i} className={`milestone${done ? " released" : now ? (submitted ? " submitted" : " current") : ""}`}>
                      <span className="num">{done ? "✓" : i + 1}</span>
                      <div><b>{m.title}</b><div className="small muted">{m.percent}% · {inr(charge(m))}{revisions.some((r) => r.milestone === i) ? ` · ${revisions.filter((r) => r.milestone === i).length} revision${revisions.filter((r) => r.milestone === i).length > 1 ? "s" : ""}` : ""}</div></div>
                      <span className={`badge ${done ? "badge-green" : now ? "badge-amber" : "badge-grey"}`}>{done ? "Released" : now ? (submitted ? "In review" : "Funded") : "Upcoming"}</span>
                    </div>
                  );
                })}
              </div>
            </section>
          </div>
          <aside>
            <section className="card stack">
              <h3 className="row"><Icon name="lock" size={16} /> Escrow</h3>
              <div className="row-between"><span>Contract total</span><b>{inr(total + extra * EXTRA_RATE)}</b></div>
              <div className="bar bar-green"><i style={{ width: `${(paidSoFar / total) * 100}%` }} /></div>
              <p className="small"><Icon name="check" size={14} /> {inr(paidSoFar)} released</p>
              <p className="small muted"><Icon name="clock" size={14} /> {inr(charge(plan[current]!))} held for milestone {current + 1}</p>
              {extra > 0 && <p className="small muted"><Icon name="repeat" size={14} /> {extra} extra round{extra > 1 ? "s" : ""} · {inr(extra * EXTRA_RATE)}</p>}
            </section>
            <section className="card stack-sm"><Who /><span className="badge" style={{ justifySelf: "start" }}>AI-assisted ideation</span></section>
          </aside>
        </div>
      )}

      {step === 4 && (
        <div className="stack-lg">
          <section className="card stack center" style={{ justifyItems: "center" }}>
            <span className="success-mark"><Icon name="check" size={24} /></span>
            <h2>All {plan.length} milestones approved</h2>
            <p className="muted">{P.freelancer} has been paid {inr(total + extra * EXTRA_RATE)}. All files are now yours.</p>
          </section>
          <div className="grid-3">
            <section className="card stack">
              <h3>Payment summary</h3>
              <div className="kv">{plan.map((m, i) => <div key={i}><span>{m.title}</span><b>{inr(charge(m))}</b></div>)}{extra > 0 && <div><span>Extra revisions ({extra})</span><b>{inr(extra * EXTRA_RATE)}</b></div>}<div className="total"><span>Total paid</span><b>{inr(total + extra * EXTRA_RATE)}</b></div></div>
            </section>
            <section className="card stack">
              <h3>Revisions</h3>
              <p className="small muted">{used} of {limit} rounds used{extra ? ` (${extra} extra)` : ""}.</p>
              {revisions.length ? revisions.map((r, i) => <p key={i} className="small"><b>M{r.milestone + 1}:</b> {r.note}</p>) : <p className="small">Approved without revisions.</p>}
            </section>
            <section className="card stack center" style={{ justifyItems: "center" }}>
              <h3>How was {P.first}?</h3>
              <p className="small muted">Your rating helps other clients.</p>
              <button type="button" className="btn btn-primary btn-block" onClick={() => go(5)}><Icon name="star" size={16} /> Rate & review</button>
            </section>
          </div>
        </div>
      )}

      {step === 5 && <ReviewForm demo projectId="demo" freelancerName={P.freelancer} aiDisclosed="AI-assisted ideation" onDone={() => setStep(5)} />}

      <div className="row-between">
        <button type="button" className="btn btn-ghost" disabled={step === 0} onClick={() => go(Math.max(0, step - 1))}><Icon name="arrowLeft" size={16} /> Previous</button>
        {step === STAGES.length - 1 && <button type="button" className="btn btn-outline" onClick={restart}>Restart demo</button>}
      </div>
    </div>
  );
}
