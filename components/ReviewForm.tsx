"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
import Icon from "./Icon";
import { ActionForm, Submit } from "./ActionForm";
import { leaveReview } from "@/app/actions/shared";

const CATEGORIES = [
  { key: "quality", label: "Quality of work" },
  { key: "communication", label: "Communication" },
  { key: "timeliness", label: "Meeting deadlines" },
] as const;

function StarField({ name, label, value, onChange, big = false }: { name: string; label: string; value: number; onChange: (v: number) => void; big?: boolean }) {
  return (
    <fieldset className="row-between" style={{ border: 0, padding: 0, margin: 0 }}>
      <legend className="sr-only">{label}</legend>
      <span aria-hidden="true" style={{ fontWeight: big ? 600 : 400 }}>{label}</span>
      <span className={`star-input${big ? "" : " star-input-sm"}`}>
        {[5, 4, 3, 2, 1].map((n) => (
          <span key={n} style={{ display: "contents" }}>
            <input type="radio" id={`${name}-${n}`} name={name} value={n} checked={value === n} onChange={() => onChange(n)} />
            <label htmlFor={`${name}-${n}`} aria-label={`${label}: ${n} star${n > 1 ? "s" : ""}`}>★</label>
          </span>
        ))}
      </span>
    </fieldset>
  );
}

/** Client-to-freelancer review. In demo mode it never submits. */
export default function ReviewForm({ projectId, freelancerName, aiDisclosed, demo = false, onDone }: {
  projectId: string; freelancerName: string; aiDisclosed: string; demo?: boolean; onDone?: () => void;
}) {
  const router = useRouter();
  const [overall, setOverall] = useState(0);
  const [scores, setScores] = useState({ quality: 0, communication: 0, timeliness: 0 });
  const [ai, setAi] = useState("");
  const [demoDone, setDemoDone] = useState(false);
  const rated = Object.values(scores).filter(Boolean);
  const score = rated.length ? rated.reduce((a, b) => a + b, 0) / rated.length : overall;
  const ready = overall > 0 && rated.length === 3 && ai;

  const body = (
    <>
      <div className="center stack-sm">
        <span className="success-mark"><Icon name="check" size={24} /></span>
        <span className="small" style={{ color: "var(--green-ink)" }}>Payment released · Project complete</span>
        <h1 style={{ fontSize: "1.5rem" }}>Rate your experience with {freelancerName}</h1>
        <p className="muted small">Your rating adds to {freelancerName.split(" ")[0]}&apos;s FindRight score and helps other clients hire with confidence.</p>
      </div>
      <hr className="divider" />
      <StarField name="overall" label="Overall rating" value={overall} onChange={setOverall} big />
      {CATEGORIES.map((c) => <StarField key={c.key} name={c.key} label={c.label} value={scores[c.key]} onChange={(v) => setScores((s) => ({ ...s, [c.key]: v }))} />)}
      <div className="card-tint row-between" aria-live="polite"><span>Score given to freelancer</span><b style={{ color: "var(--primary-deep)", fontSize: 18 }}>★ {score ? score.toFixed(1) : "–"} / 5</b></div>
      <fieldset className="stack-sm" style={{ border: 0, padding: 0, margin: 0 }}>
        <legend className="field" style={{ marginBottom: 8 }}>Did the work match the AI usage disclosed? <span className="muted">(disclosed: {aiDisclosed})</span></legend>
        <div className="chips">
          {[["yes", "Yes, as disclosed"], ["partly", "Partly"], ["no", "No"]].map(([v, l]) => (
            <label key={v} className="chip"><input type="radio" name="ai" value={v} checked={ai === v} onChange={() => setAi(v!)} />{l}</label>
          ))}
        </div>
      </fieldset>
      <label className="field">Write a review<textarea name="text" required minLength={15} placeholder={`What was it like working with ${freelancerName.split(" ")[0]}? Quality, communication, delivery…`} /></label>
      <input type="hidden" name="projectId" value={projectId} />
      <input type="hidden" name="rating" value={overall} />
      {!ready && <p className="small muted">Rate every category and answer the AI question to submit.</p>}
      <div className="dialog-foot">
        {demo ? <button type="button" className="btn btn-light" onClick={onDone}>Skip</button> : <Link href={`/client/projects/${projectId}`} className="btn btn-light">Skip for now</Link>}
        {demo
          ? <button type="button" className="btn btn-primary" disabled={!ready} onClick={() => { setDemoDone(true); onDone?.(); }}><Icon name="send" size={16} /> Submit review</button>
          : <Submit pending="Publishing…" disabled={!ready}><Icon name="send" size={16} /> Submit review</Submit>}
      </div>
    </>
  );

  if (demo) {
    return demoDone ? <p className="alert alert-ok">Review submitted (demo). In the real flow it appears on {freelancerName}&apos;s profile.</p> : <div className="card stack" style={{ maxWidth: 640, marginInline: "auto" }}>{body}</div>;
  }
  return (
    <ActionForm action={leaveReview} className="card stack" style={{ maxWidth: 640, marginInline: "auto" }} onOk={() => router.push(`/client/projects/${projectId}?reviewed=1`)}>
      {body}
    </ActionForm>
  );
}
