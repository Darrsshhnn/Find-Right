"use client";

import Link from "next/link";
import { useCallback, useEffect, useRef, useState } from "react";
import Icon from "./Icon";

type Step = { icon: string; title: string; text: string; target?: string; href?: string; cta?: string };

const STEPS: Record<"client" | "freelancer", Step[]> = {
  client: [
    { icon: "sparkle", title: "Welcome to FindRight", text: "Hire verified creative freelancers with clear briefs, honest AI disclosure and protected payments. Here's a 1-minute tour." },
    { icon: "plus", title: "1 · Post a job", text: "Describe what you need in your own words — “Rewrite with AI” turns it into a clear brief you can edit. Set budget, deadline and up to 8 revision rounds.", target: "cta", href: "/client/jobs/new", cta: "Post a job" },
    { icon: "search", title: "2 · Find & save talent", text: "Use Find to filter by skill, experience, availability and AI usage. Tap the heart to save designers for later.", target: "nav" },
    { icon: "users", title: "3 · Review proposals", text: "Every proposal has three actions: Hire, Chat or Decline. Open a card to see the full profile and past work." },
    { icon: "file", title: "4 · Agree the contract", text: "Hiring creates a structured agreement you can edit and download as a PDF. The freelancer accepts it before any money moves." },
    { icon: "lock", title: "5 · Pay safely with escrow", text: "You pay a small advance to start; every other milestone waits in escrow until you approve the work. A 2–10% platform fee is shown up front." },
    { icon: "chat", title: "6 · Chat, meet, review", text: "Messages keep files, meetings and video calls in one place. When the project is done, rate the work and the AI disclosure.", target: "messages" },
  ],
  freelancer: [
    { icon: "sparkle", title: "Welcome to FindRight", text: "Real projects from verified clients — matched to your skills and level, with advance payments and capped revisions." },
    { icon: "user", title: "1 · Complete your profile", text: "Add portfolio pieces and declare your AI usage per discipline. A complete profile ranks higher in client searches.", href: "/freelancer/profile", cta: "Open profile" },
    { icon: "search", title: "2 · Find work & invitations", text: "Browse matched briefs or answer direct invitations. No bidding wars — each job shows your match score.", target: "nav" },
    { icon: "send", title: "3 · Send a focused proposal", text: "Share your price, timeline, samples, AI usage and your rate for extra revision rounds." },
    { icon: "wallet", title: "4 · Get paid on time", text: "Accept the agreement, receive your advance, and each later milestone is secured in escrow before you start it. The platform fee (2–10%) is shown before you accept." },
    { icon: "chat", title: "5 · Keep it in one thread", text: "Chat, share files, schedule meetings and join video calls with your client.", target: "messages" },
  ],
};

const key = (role: string) => `findright.tour.${role}.v1`;

/** First-visit guided tour. Re-open any time with `window.dispatchEvent(new Event("findright:tour"))`. */
export default function GuidedTour({ role }: { role: "client" | "freelancer" }) {
  const steps = STEPS[role];
  const [open, setOpen] = useState(false);
  const [i, setI] = useState(0);
  const dialog = useRef<HTMLDivElement>(null);

  const close = useCallback(() => {
    setOpen(false);
    document.querySelectorAll(".tour-target").forEach((el) => el.classList.remove("tour-target"));
    try { localStorage.setItem(key(role), "done"); } catch { /* storage unavailable — the tour simply shows again */ }
  }, [role]);

  useEffect(() => {
    let seen = false;
    try { seen = localStorage.getItem(key(role)) === "done"; } catch { seen = false; }
    const timer = seen ? undefined : window.setTimeout(() => setOpen(true), 600);
    const reopen = () => { setI(0); setOpen(true); };
    window.addEventListener("findright:tour", reopen);
    return () => { window.clearTimeout(timer); window.removeEventListener("findright:tour", reopen); };
  }, [role]);

  useEffect(() => {
    if (!open) return;
    document.querySelectorAll(".tour-target").forEach((el) => el.classList.remove("tour-target"));
    const target = steps[i]?.target ? document.querySelector(`[data-tour="${steps[i]!.target}"]`) : null;
    target?.classList.add("tour-target");
    dialog.current?.focus();
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") close();
      if (e.key === "ArrowRight") setI((n) => Math.min(steps.length - 1, n + 1));
      if (e.key === "ArrowLeft") setI((n) => Math.max(0, n - 1));
    };
    document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
  }, [open, i, steps, close]);

  if (!open) return null;
  const step = steps[i]!;
  const last = i === steps.length - 1;
  return (
    <div className="tour-backdrop">
      <div ref={dialog} className="tour-card" role="dialog" aria-modal="true" aria-labelledby="tour-title" tabIndex={-1}>
        <div className="row-between">
          <span className="small muted">Step {i + 1} of {steps.length}</span>
          <button type="button" className="btn btn-ghost btn-sm" onClick={close}>Skip tour</button>
        </div>
        <span className="tour-icon"><Icon name={step.icon} size={28} /></span>
        <h2 id="tour-title">{step.title}</h2>
        <p className="muted">{step.text}</p>
        <div className="tour-dots" aria-hidden="true">{steps.map((s, n) => <span key={s.title} className={n === i ? "on" : ""} />)}</div>
        <div className="row-between">
          <button type="button" className="btn btn-ghost" disabled={i === 0} onClick={() => setI(i - 1)}><Icon name="arrowLeft" size={16} /> Back</button>
          <div className="row">
            {step.href && <Link href={step.href} className="btn btn-outline" onClick={close}>{step.cta}</Link>}
            <button type="button" className="btn btn-primary" onClick={() => (last ? close() : setI(i + 1))}>{last ? "Start using FindRight" : "Next"} {!last && <Icon name="arrowRight" size={16} />}</button>
          </div>
        </div>
        {role === "client" && last && <Link href="/client/demo" className="link small center" onClick={close}>Or try the interactive hiring demo →</Link>}
      </div>
    </div>
  );
}
