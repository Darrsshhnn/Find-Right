"use client";

import { useActionState, useRef, useState } from "react";
import Icon from "./Icon";
import { Submit } from "./ActionForm";
import type { ActionState } from "@/lib/events";

export type Step = { title: string; heading: string; description: string; content: React.ReactNode; validate?: (form: HTMLFormElement) => string };

/** A multi-step form: every step stays mounted (only hidden) so answers survive back/forward navigation. */
export default function StepForm({ steps, action, finishLabel, startOffset = 0, totalOverride, onBack, label = "FindRight onboarding", hidden }: {
  steps: Step[]; action: (s: ActionState, f: FormData) => Promise<ActionState>; finishLabel: string; startOffset?: number; totalOverride?: number; onBack?: string; label?: string; hidden?: React.ReactNode;
}) {
  const [index, setIndex] = useState(0);
  const [error, setError] = useState("");
  const [state, formAction] = useActionState(action, undefined);
  const form = useRef<HTMLFormElement>(null);
  const total = totalOverride ?? steps.length;
  const position = index + 1 + startOffset;
  const step = steps[index]!;
  const last = index === steps.length - 1;

  const next = () => {
    const message = step.validate?.(form.current!) ?? "";
    setError(message);
    if (!message) { setIndex(index + 1); window.scrollTo({ top: 0, behavior: "smooth" }); }
  };

  return (
    <form ref={form} action={formAction} className="flow-card" onKeyDown={(e) => {
      if (e.key === "Enter" && !last && (e.target as HTMLElement).tagName === "INPUT") { e.preventDefault(); next(); }
    }}>
      <div className="flow-progress">
        <div className="flow-progress-top"><span>Step {position} of {total} · <b>{step.title}</b></span><span>{label}</span></div>
        <div className="bar"><i style={{ width: `${(position / total) * 100}%` }} /></div>
      </div>
      <div className="flow-heading"><h1>{step.heading}</h1><p>{step.description}</p></div>
      {hidden}
      {steps.map((s, i) => <div key={s.title} hidden={i !== index} className="stack-lg">{s.content}</div>)}
      {(error || state?.error) && <p className="alert alert-error" role="alert">{error || state?.error}</p>}
      <div className="flow-actions">
        {index > 0 ? (
          <button type="button" className="btn btn-ghost" onClick={() => { setError(""); setIndex(index - 1); }}><Icon name="arrowLeft" size={16} /> Back</button>
        ) : onBack ? <a href={onBack} className="btn btn-ghost"><Icon name="arrowLeft" size={16} /> Back</a> : <span />}
        {last ? (
          <Submit pending="Saving…">{finishLabel} <Icon name="arrowRight" size={16} /></Submit>
        ) : (
          <button type="button" className="btn btn-primary" onClick={next}>Continue <Icon name="arrowRight" size={16} /></button>
        )}
      </div>
    </form>
  );
}

export const value = (form: HTMLFormElement, name: string) => String(new FormData(form).get(name) ?? "").trim();
export const values = (form: HTMLFormElement, name: string) => new FormData(form).getAll(name).map(String);
