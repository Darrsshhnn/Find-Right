"use client";

import { useActionState, useEffect, useRef } from "react";
import { useFormStatus } from "react-dom";
import type { ActionState } from "@/lib/events";

type Action = (state: ActionState, form: FormData) => Promise<ActionState>;

export function ActionForm({ action, children, className, resetOnOk = false, showOk = true, style, onOk, onSuccess }: {
  action: Action; children: React.ReactNode; className?: string; resetOnOk?: boolean; showOk?: boolean; style?: React.CSSProperties;
  /** Called after a successful submit that returned an `ok` message. */
  onOk?: (message: string) => void;
  /** Called after any submit that returned no error. */
  onSuccess?: () => void;
}) {
  const [state, formAction] = useActionState(action, undefined);
  const ref = useRef<HTMLFormElement>(null);
  useEffect(() => {
    if (!state || state.error) return;
    if (resetOnOk) ref.current?.reset();
    if (state.ok) onOk?.(state.ok);
    onSuccess?.();
    // Callbacks are intentionally excluded: they run once per server response.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [state, resetOnOk]);
  return (
    <form ref={ref} action={formAction} className={className} style={style}>
      {children}
      {state?.error && <p className="alert alert-error" role="alert">{state.error}</p>}
      {showOk && state?.ok && <p className="alert alert-ok" role="status">{state.ok}</p>}
    </form>
  );
}

export function Submit({ children, className = "btn btn-primary", pending: pendingText, name, value, disabled, "aria-label": ariaLabel }: {
  children: React.ReactNode; className?: string; pending?: string; name?: string; value?: string; disabled?: boolean; "aria-label"?: string;
}) {
  const { pending } = useFormStatus();
  return (
    <button type="submit" className={className} disabled={pending || disabled} name={name} value={value} aria-busy={pending} aria-label={ariaLabel}>
      {pending && pendingText ? pendingText : children}
    </button>
  );
}
