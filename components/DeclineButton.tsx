"use client";

import { useRef } from "react";
import Icon from "./Icon";
import { ActionForm, Submit } from "./ActionForm";
import { decideProposal } from "@/app/actions/client";

const REASONS = ["Portfolio not relevant", "Price too high", "Timeline too long", "Needs clearer AI disclosure", "Proposal too generic", "Missing similar experience"];

/** Decline (a.k.a. reject) a proposal, with an optional private reason for the freelancer. */
export default function DeclineButton({ proposalId, name }: { proposalId: string; name: string }) {
  const ref = useRef<HTMLDialogElement>(null);
  return (
    <>
      <button type="button" className="btn btn-danger btn-sm" onClick={() => ref.current?.showModal()}><Icon name="x" size={14} /> Decline</button>
      <dialog ref={ref} className="modal" aria-labelledby={`decline-${proposalId}`}>
        <ActionForm action={decideProposal} className="dialog-body" onSuccess={() => ref.current?.close()}>
          <input type="hidden" name="proposalId" value={proposalId} />
          <input type="hidden" name="decision" value="decline" />
          <div className="dialog-head">
            <div><h2 id={`decline-${proposalId}`}>Decline {name}&apos;s proposal</h2><p className="small muted">Optional: tell them why. Feedback is shared privately and helps freelancers grow.</p></div>
            <button type="button" className="icon-btn" aria-label="Close" onClick={() => ref.current?.close()}><Icon name="x" /></button>
          </div>
          <fieldset className="stack-sm" style={{ border: 0, padding: 0, margin: 0 }}>
            <legend className="field" style={{ marginBottom: 8 }}>What could be better? (optional)</legend>
            <div className="chips">{REASONS.map((r) => <label key={r} className="chip"><input type="checkbox" name="reasons" value={r} />{r}</label>)}</div>
          </fieldset>
          <label className="field">Message (optional)<textarea name="reason" maxLength={600} placeholder="e.g. Thanks for applying — I'd like to see more e-commerce samples and a shorter timeline." /></label>
          <div className="dialog-foot">
            <button type="button" className="btn btn-light" onClick={() => ref.current?.close()}>Cancel</button>
            <Submit className="btn btn-primary" pending="Declining…"><Icon name="send" size={16} /> Decline proposal</Submit>
          </div>
        </ActionForm>
      </dialog>
    </>
  );
}
