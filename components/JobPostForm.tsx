"use client";

import { useState } from "react";
import Attachments from "./Attachments";
import Icon from "./Icon";
import JobSummaryCard from "./JobSummaryCard";
import StepForm from "./Stepper";
import { postJob } from "@/app/actions/client";
import { AI_LEVELS, CATEGORY_NAMES, CREDIT_CAP, CREDIT_PERCENT, LEVELS, SCHEDULES } from "@/lib/constants";
import type { Brief } from "@/lib/jobs";
import type { AiLevel, Level, Terms } from "@/lib/types";

const inr = (n: number) => `₹${Math.round(n || 0).toLocaleString("en-IN")}`;

const EMPTY = {
  category: "", jobType: "Freelance project", level: "", title: "", need: "",
  objective: "", description: "", deliverables: "", style: "", candidate: "",
  budgetType: "fixed", budgetMin: "", budget: "", hours: "", deadline: "", duration: "2–4 weeks",
  revisions: "2", extraRevisionRate: "", schedule: "10-90" as Terms["schedule"], aiPreference: "Any",
};

export default function JobPostForm({ credits, invite, defaultCategory, minDate }: { credits: number; invite?: { id: string; name: string }; defaultCategory?: string; minDate: string }) {
  const [v, setV] = useState({ ...EMPTY, category: defaultCategory ?? "" });
  const [useCredit, setUseCredit] = useState(false);
  const [briefOpen, setBriefOpen] = useState(false);
  const [aiState, setAiState] = useState<"idle" | "loading" | "error">("idle");
  const [aiError, setAiError] = useState("");
  const set = (key: keyof typeof EMPTY) => (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => setV((cur) => ({ ...cur, [key]: e.target.value }));

  const hourly = v.budgetType === "hourly";
  const max = Number(v.budget) || 0;
  const min = Number(v.budgetMin) || 0;
  const total = hourly ? max * (Number(v.hours) || 0) : max;
  const discount = useCredit ? Math.min(Math.round(total * CREDIT_PERCENT), CREDIT_CAP) : 0;
  const deliverables = v.deliverables.split("\n").map((s) => s.trim()).filter(Boolean);

  const writeBrief = async () => {
    setAiError("");
    if (v.need.trim().length < 15) { setAiState("error"); setAiError("Describe your project in a sentence or two first."); return; }
    setAiState("loading");
    try {
      const res = await fetch("/api/brief", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ text: v.need, title: v.title, category: v.category, level: v.level }) });
      const data = (await res.json()) as { brief?: Brief; error?: string };
      if (!res.ok || !data.brief) throw new Error(data.error ?? "The brief writer is unavailable. Try again.");
      const b = data.brief;
      setV((cur) => ({ ...cur, description: b.overview, deliverables: b.deliverables.join("\n"), style: b.style, candidate: b.candidate }));
      setBriefOpen(true);
      setAiState("idle");
    } catch (err) {
      setAiState("error");
      setAiError(err instanceof Error ? err.message : "The brief writer is unavailable. Try again.");
    }
  };


  return (
    <StepForm
      action={postJob}
      label="Post a job"
      finishLabel="Post job"
      onBack="/client/jobs"
      hidden={<>
        {invite && <input type="hidden" name="invite" value={invite.id} />}
        {Object.entries(v).filter(([k]) => k !== "need").map(([k, val]) => <input key={k} type="hidden" name={k} value={k === "description" && !val ? v.need : val} />)}
        {useCredit && <input type="hidden" name="useCredit" value="on" />}
      </>}
      steps={[
        {
          title: "Job details",
          heading: "Let's find the right talent",
          description: invite ? `This job will be sent to ${invite.name} as a direct invitation once posted.` : "Choose the kind of work and experience your project needs.",
          validate: () => (!v.category ? "Choose a job category." : !v.level ? "Choose the experience level you need." : ""),
          content: (
            <>
              <fieldset className="stack-sm" style={{ border: 0, padding: 0, margin: 0 }}>
                <legend className="field" style={{ marginBottom: 8 }}>Job category</legend>
                <div className="options">{CATEGORY_NAMES.map((c) => <label className="option" key={c}><input type="radio" name="_category" checked={v.category === c} onChange={() => setV({ ...v, category: c })} /><b>{c}</b></label>)}</div>
              </fieldset>
              <fieldset className="stack-sm" style={{ border: 0, padding: 0, margin: 0 }}>
                <legend className="field" style={{ marginBottom: 8 }}>Job type</legend>
                <div className="segmented">{["Freelance project", "Part-time", "Ongoing retainer"].map((t) => <label key={t}><input type="radio" name="_jobType" checked={v.jobType === t} onChange={() => setV({ ...v, jobType: t })} />{t}</label>)}</div>
              </fieldset>
              <fieldset className="stack-sm" style={{ border: 0, padding: 0, margin: 0 }}>
                <legend className="field" style={{ marginBottom: 8 }}>Required experience level</legend>
                <div className="options">{LEVELS.map((l) => <label className="option" key={l.value}><input type="radio" name="_level" checked={v.level === l.value} onChange={() => setV({ ...v, level: l.value })} /><b>{l.label}</b><small>{l.detail}</small></label>)}</div>
              </fieldset>
            </>
          ),
        },
        {
          title: "Description",
          heading: "Tell us about your project",
          description: "Describe what you need in your own words. AI can turn it into a clear, structured brief that you can edit.",
          validate: () => (v.title.trim().length < 8 ? "Give the job a descriptive title (8+ characters)." : (v.description || v.need).trim().length < 30 ? "Describe the project in at least 30 characters." : ""),
          content: (
            <>
              <label className="field">Job title<input value={v.title} onChange={set("title")} placeholder="Design a responsive website for a wellness brand" /></label>
              <label className="field">Describe what you need
                <textarea value={v.need} onChange={set("need")} style={{ minHeight: 136 }} placeholder="e.g. We sell organic pet food and need a warm, modern website with a shop and subscription checkout. Mobile first, 6 pages, with a clickable prototype." />
                <small>Write freely — goals, audience, pages or formats, deadline, anything you know.</small>
              </label>
              <div className="row">
                <button type="button" className="btn btn-primary" onClick={() => void writeBrief()} disabled={aiState === "loading"} aria-busy={aiState === "loading"}>
                  <Icon name="wand" size={16} /> {aiState === "loading" ? "Rewriting…" : "Rewrite with AI"}
                </button>
                {!briefOpen && <button type="button" className="btn btn-ghost" onClick={() => { setBriefOpen(true); setV((cur) => ({ ...cur, description: cur.description || cur.need })); }}>Write the brief myself</button>}
              </div>
              {aiState === "error" && <p className="alert alert-error" role="alert">{aiError}</p>}
              {briefOpen && (
                <section className="card-tint stack" aria-label="Structured brief">
                  <div className="row-between"><b>Your structured brief</b><span className="badge"><Icon name="edit" size={12} /> Every part is editable</span></div>
                  <label className="field">Project overview<textarea value={v.description} onChange={set("description")} /></label>
                  <label className="field">Deliverables<textarea value={v.deliverables} onChange={set("deliverables")} style={{ minHeight: 96 }} /><small>One deliverable per line.</small></label>
                  <label className="field">Style & direction<textarea value={v.style} onChange={set("style")} style={{ minHeight: 80 }} /></label>
                  <label className="field">Ideal candidate<textarea value={v.candidate} onChange={set("candidate")} style={{ minHeight: 80 }} /></label>
                </section>
              )}
              <div className="stack-sm">
                <b>References & assets <span className="muted" style={{ fontWeight: 400 }}>(optional)</span></b>
                <Attachments />
              </div>
            </>
          ),
        },
        {
          title: "Budget & deadline",
          heading: "Set your budget",
          description: "Freelancers propose within your range. Clear limits on revisions and payments protect both sides.",
          validate: () => (max <= 0 ? "Set your maximum budget." : min > max ? "The minimum can't be higher than the maximum." : hourly && !(Number(v.hours) > 0) ? "Estimate the number of hours." : !v.deadline ? "Choose the submission deadline." : ""),
          content: (
            <>
              <fieldset className="stack-sm" style={{ border: 0, padding: 0, margin: 0 }}>
                <legend className="field" style={{ marginBottom: 8 }}>Pricing</legend>
                <div className="options">
                  <label className="option"><input type="radio" name="_budgetType" checked={!hourly} onChange={() => setV({ ...v, budgetType: "fixed" })} /><b>Fixed price</b><small>One price for the whole project</small></label>
                  <label className="option"><input type="radio" name="_budgetType" checked={hourly} onChange={() => setV({ ...v, budgetType: "hourly" })} /><b>Hourly</b><small>Pay for the hours worked</small></label>
                </div>
              </fieldset>
              <div className="form-grid">
                <label className="field">{hourly ? "Minimum rate (₹/hr)" : "Minimum budget (₹)"}<input type="number" min="0" value={v.budgetMin} onChange={set("budgetMin")} placeholder={hourly ? "500" : "30000"} /></label>
                <label className="field">{hourly ? "Maximum rate (₹/hr)" : "Maximum budget (₹)"}<input type="number" min="1" value={v.budget} onChange={set("budget")} placeholder={hourly ? "1200" : "45000"} /></label>
                {hourly && <label className="field">Estimated hours<input type="number" min="1" value={v.hours} onChange={set("hours")} placeholder="40" /></label>}
              </div>
              <div className="form-grid">
                <label className="field">Submission deadline<input type="date" min={minDate} value={v.deadline} onChange={set("deadline")} /></label>
                <label className="field">Estimated duration<select value={v.duration} onChange={set("duration")}>{["Less than 1 week", "1–2 weeks", "2–4 weeks", "1–2 months", "Ongoing"].map((d) => <option key={d}>{d}</option>)}</select></label>
                <label className="field">Revisions included<select value={v.revisions} onChange={set("revisions")}>{["1", "2", "3", "4", "5", "6", "7", "8"].map((r) => <option key={r} value={r}>{r} round{r === "1" ? "" : "s"}</option>)}</select><small>Up to 8 rounds.</small></label>
                <label className="field">Extra revision rate (optional)<input type="number" min="0" value={v.extraRevisionRate} onChange={set("extraRevisionRate")} placeholder="₹ per extra round" /><small>Agreed with the freelancer — used if you need more rounds later.</small></label>
              </div>
              <fieldset className="stack-sm" style={{ border: 0, padding: 0, margin: 0 }}>
                <legend className="field" style={{ marginBottom: 8 }}>Milestone split</legend>
                <div className="options">
                  {(Object.keys(SCHEDULES) as Terms["schedule"][]).map((k) => (
                    <label className="option" key={k}><input type="radio" name="_schedule" checked={v.schedule === k} onChange={() => setV({ ...v, schedule: k })} /><b>{SCHEDULES[k].parts.map((p) => `${p.percent}%`).join(" · ")}</b><small>{SCHEDULES[k].parts.map((p) => p.title).join(" → ")}</small></label>
                  ))}
                </div>
              </fieldset>
              <fieldset className="stack-sm" style={{ border: 0, padding: 0, margin: 0 }}>
                <legend className="field" style={{ marginBottom: 8 }}>AI usage preference</legend>
                <div className="segmented">
                  <label><input type="radio" name="_ai" checked={v.aiPreference === "Any"} onChange={() => setV({ ...v, aiPreference: "Any" })} />No preference</label>
                  {AI_LEVELS.map((a) => <label key={a.value} title={a.detail}><input type="radio" name="_ai" checked={v.aiPreference === a.value} onChange={() => setV({ ...v, aiPreference: a.value })} />{a.value === "No AI" ? "No AI (human-made)" : a.value}</label>)}
                </div>
              </fieldset>
              <section className={credits > 0 ? "card-tint row-between" : "card-flat row-between"} aria-live="polite">
                <div className="stack-sm" style={{ maxWidth: 520 }}>
                  <b><Icon name="sparkle" size={16} /> Starter Pass</b>
                  {credits > 0 ? (
                    <span className="small muted">Save 15% (up to ₹5,000) on this hire — the freelancer still gets their full fee. {credits} of 3 left.</span>
                  ) : <span className="small muted">You&apos;ve used all your Starter Passes.</span>}
                  {useCredit && total > 0 && (
                    <span className="small"><s className="muted">{inr(total)}</s> → <b>{inr(total - discount)}</b> <span style={{ color: "var(--green-ink)" }}>(you save {inr(discount)})</span></span>
                  )}
                </div>
                <label className="toggle"><input type="checkbox" checked={useCredit} disabled={credits === 0} onChange={(e) => setUseCredit(e.target.checked)} aria-label="Use a Starter Pass on this job" /><span /></label>
              </section>
            </>
          ),
        },
        {
          title: "Preview & post",
          heading: "Preview your job post",
          description: "Everything look right? Your next great collaborator is one post away.",
          content: (
            <JobSummaryCard
              eyebrow={<span className="eyebrow">Job post preview</span>}
              job={{
                title: v.title, category: v.category, level: v.level as Level, jobType: v.jobType, description: v.description || v.need, deliverables: deliverables.join("\n"),
                budget: max, budgetMin: min || undefined, budgetType: hourly ? "hourly" : "fixed", hours: Number(v.hours) || undefined, deadline: v.deadline, duration: v.duration,
                revisions: Number(v.revisions), extraRevisionRate: Number(v.extraRevisionRate) || undefined, schedule: v.schedule, aiPreference: v.aiPreference as AiLevel | "Any",
              }}
              footer={useCredit ? <span className="badge badge-green"><Icon name="sparkle" size={12} /> Starter Pass −{inr(discount)}</span> : undefined}
            />
          ),
        },
      ]}
    />
  );
}
