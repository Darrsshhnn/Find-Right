"use client";

import Link from "next/link";
import { useActionState, useRef } from "react";
import { login, signup } from "@/app/actions/auth";
import { Submit } from "./ActionForm";

export function SignupForm({ role }: { role: "client" | "freelancer" }) {
  const [state, action] = useActionState(signup, undefined);
  return (
    <form action={action} className="auth-form">
      <div className="auth-switch"><Link className="active" href={`/signup?role=${role}`}>Sign up</Link><Link href="/login">Log in</Link></div>
      <div className="stack-sm">
        <h2 style={{ fontSize: "1.5rem" }}>Create an account</h2>
        <p className="muted">Signing up as a <b>{role === "client" ? "client (hirer)" : "freelancer"}</b> · <Link className="link" href={`/signup?role=${role === "client" ? "freelancer" : "client"}`}>switch</Link></p>
      </div>
      <input type="hidden" name="role" value={role} />
      <label className="field">Full name<input name="name" required autoComplete="name" placeholder="Peter Parker" /></label>
      <label className="field">Email<input name="email" type="email" required autoComplete="email" placeholder="you@example.com" /></label>
      <label className="field">Password<input name="password" type="password" required minLength={8} autoComplete="new-password" placeholder="At least 8 characters" /></label>
      {state?.error && <p className="alert alert-error" role="alert">{state.error}</p>}
      <Submit className="btn btn-primary btn-lg btn-block" pending="Creating account…">Continue</Submit>
      <p className="small muted center">{role === "client" ? "Your payment stays safe in escrow until you approve the work." : "Advance payment before you start. No free samples, ever."}</p>
    </form>
  );
}

const DEMO = [
  { label: "Client · Noble Paws", email: "client@findright.in" },
  { label: "Freelancer · Umang", email: "freelancer@findright.in" },
  { label: "Admin · Trust team", email: "admin@findright.in" },
];

export function LoginForm({ next, demoPassword }: { next?: string; demoPassword: string }) {
  const [state, action] = useActionState(login, undefined);
  const email = useRef<HTMLInputElement>(null);
  const password = useRef<HTMLInputElement>(null);
  return (
    <form action={action} className="auth-form">
      <div className="auth-switch"><Link href="/get-started">Sign up</Link><Link className="active" href="/login">Log in</Link></div>
      <div className="stack-sm"><h2 style={{ fontSize: "1.5rem" }}>Welcome back</h2><p className="muted">Log in to your FindRight account.</p></div>
      <input type="hidden" name="next" value={next ?? ""} />
      <label className="field">Email<input ref={email} name="email" type="email" required autoComplete="email" placeholder="you@example.com" /></label>
      <label className="field">Password<input ref={password} name="password" type="password" required autoComplete="current-password" placeholder="Your password" /></label>
      {state?.error && <p className="alert alert-error" role="alert">{state.error}</p>}
      <Submit className="btn btn-primary btn-lg btn-block" pending="Logging in…">Log in</Submit>
      <div className="demo-box">
        <b>Explore with a demo account</b>
        <div className="chips">
          {DEMO.map((d) => (
            <button key={d.email} type="button" className="chip" onClick={() => {
              if (email.current && password.current) { email.current.value = d.email; password.current.value = demoPassword; }
            }}>{d.label}</button>
          ))}
        </div>
        <span className="muted">Password for all demo accounts: <code>{demoPassword}</code></span>
      </div>
    </form>
  );
}
