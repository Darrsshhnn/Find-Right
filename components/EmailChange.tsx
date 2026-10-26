"use client";

import { useState } from "react";
import Icon from "./Icon";
import { ActionForm, Submit } from "./ActionForm";
import { cancelEmailChange, confirmEmailChange, requestEmailChange } from "@/app/actions/shared";

/** Change sign-in email: current → new address → 6-digit code → confirmation. */
export default function EmailChange({ currentEmail, pendingEmail }: { currentEmail: string; pendingEmail?: string }) {
  const [editing, setEditing] = useState(false);
  const [success, setSuccess] = useState("");
  const [codeNotice, setCodeNotice] = useState("");
  const step = pendingEmail ? 2 : editing ? 1 : 0;

  return (
    <div className="stack">
      {success && <p className="alert alert-ok" role="status"><Icon name="checkCircle" /> {success}</p>}
      <div className="row-between">
        <div><span className="small muted">Current email</span><div><b>{currentEmail}</b> <span className="badge badge-green">Verified</span></div></div>
        {step === 0 && <button type="button" className="btn btn-outline btn-sm" onClick={() => { setEditing(true); setSuccess(""); }}><Icon name="mail" size={14} /> Change email</button>}
      </div>

      {step > 0 && (
        <div className="progress-line" aria-label="Email change steps">
          <span className={step > 1 ? "done" : "current"}><i>{step > 1 ? "✓" : 1}</i><em style={{ fontStyle: "normal" }}>New email</em></span><b className={step > 1 ? "done" : ""} />
          <span className={step === 2 ? "current" : ""}><i>2</i><em style={{ fontStyle: "normal" }}>Verify code</em></span><b />
          <span><i>3</i><em style={{ fontStyle: "normal" }}>Done</em></span>
        </div>
      )}

      {step === 1 && (
        <ActionForm action={requestEmailChange} className="card-tint stack" showOk={false} onOk={(msg) => setCodeNotice(msg)}>
          <label className="field">New email address<input type="email" name="email" required autoComplete="email" placeholder="you@gmail.com" /><small>We&apos;ll send a 6-digit code to confirm you own it.</small></label>
          <div className="row"><Submit pending="Sending code…">Send verification code</Submit><button type="button" className="btn btn-ghost" onClick={() => setEditing(false)}>Cancel</button></div>
        </ActionForm>
      )}

      {step === 2 && (
        <div className="card-tint stack">
          {codeNotice && <p className="alert alert-info" role="status"><Icon name="mail" /> {codeNotice}</p>}
          <p className="small">Enter the code sent to <b>{pendingEmail}</b>.</p>
          <ActionForm action={confirmEmailChange} className="stack" showOk={false} onOk={(msg) => { setSuccess(msg); setEditing(false); setCodeNotice(""); }}>
            <label className="field">Verification code<input name="code" inputMode="numeric" autoComplete="one-time-code" pattern="\d{6}" maxLength={6} required placeholder="123456" style={{ letterSpacing: "0.3em", maxWidth: 200 }} /></label>
            <div><Submit pending="Verifying…">Confirm new email</Submit></div>
          </ActionForm>
          <div className="row">
            <ActionForm action={requestEmailChange} showOk={false} onOk={(msg) => setCodeNotice(msg)}>
              <input type="hidden" name="email" value={pendingEmail} />
              <Submit className="btn btn-ghost btn-sm" pending="Resending…">Resend code</Submit>
            </ActionForm>
            <ActionForm action={cancelEmailChange} showOk={false} onSuccess={() => { setEditing(false); setCodeNotice(""); }}>
              <Submit className="btn btn-ghost btn-sm">Use a different email</Submit>
            </ActionForm>
          </div>
        </div>
      )}
    </div>
  );
}
