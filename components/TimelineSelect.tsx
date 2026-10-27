"use client";

import { useState } from "react";

const OPTIONS = ["3 days", "1 week", "2 weeks", "3 weeks", "1 month", "6 weeks", "2 months", "3 months"];
const CUSTOM = "__custom";

/**
 * Delivery timeline dropdown with a "Custom…" option that reveals a free-text field. Submits as `name`.
 * `suggested` (e.g. the client's estimated duration) is offered first and preselected.
 */
export default function TimelineSelect({ name = "timeline", suggested = "" }: { name?: string; suggested?: string }) {
  const extra = suggested && !OPTIONS.some((o) => o.toLowerCase() === suggested.trim().toLowerCase()) ? suggested.trim() : "";
  const [choice, setChoice] = useState(suggested.trim() || "2 weeks");
  const [custom, setCustom] = useState("");
  return (
    <div className="stack-sm">
      <label className="field">Delivery timeline
        <select value={choice} onChange={(e) => setChoice(e.target.value)} name={choice === CUSTOM ? undefined : name}>
          {extra && <option value={extra}>{extra} (suggested)</option>}
          {OPTIONS.map((o) => <option key={o} value={o}>{o}{o === suggested.trim() ? " (suggested)" : ""}</option>)}
          <option value={CUSTOM}>Custom…</option>
        </select>
      </label>
      {choice === CUSTOM && (
        <label className="field">Custom timeline
          <input name={name} value={custom} onChange={(e) => setCustom(e.target.value)} placeholder="e.g. 10 days, or 3 sessions over 5 weeks" required maxLength={60} autoFocus />
        </label>
      )}
    </div>
  );
}
