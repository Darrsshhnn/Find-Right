"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import Icon from "./Icon";
import { ActionForm, Submit } from "./ActionForm";
import { scheduleMeeting } from "@/app/actions/shared";

const SLOTS = ["10:00", "11:30", "14:00", "17:00", "18:30"];
const DOW = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];
const pad = (n: number) => String(n).padStart(2, "0");
const iso = (d: Date) => `${d.getFullYear()}-${pad(d.getMonth() + 1)}-${pad(d.getDate())}`;
const slotLabel = (t: string) => { const [h, m] = t.split(":").map(Number); return `${(h! % 12) || 12}:${pad(m!)} ${h! >= 12 ? "PM" : "AM"}`; };
const today = () => { const d = new Date(); d.setHours(0, 0, 0, 0); return d; };

/** Schedule meeting: calendar, time slots, agenda and link. Posts a meeting card into the chat thread. */
export default function MeetingDialog({ open, onClose, conversationId, otherName, callHref }: {
  open: boolean; onClose: () => void; conversationId: string; otherName: string; callHref: string;
}) {
  const ref = useRef<HTMLDialogElement>(null);
  const [month, setMonth] = useState(() => { const d = today(); d.setDate(1); return d; });
  const [date, setDate] = useState("");
  const [time, setTime] = useState("17:00");
  const [notice, setNotice] = useState("");
  const minDay = useMemo(() => today(), []);

  useEffect(() => {
    const dialog = ref.current;
    if (!dialog) return;
    if (open && !dialog.open) dialog.showModal();
    if (!open && dialog.open) dialog.close();
  }, [open]);

  const cells = useMemo(() => {
    const first = new Date(month);
    const offset = (first.getDay() + 6) % 7;
    const days = new Date(month.getFullYear(), month.getMonth() + 1, 0).getDate();
    return [...Array(offset).fill(null), ...Array.from({ length: days }, (_, i) => new Date(month.getFullYear(), month.getMonth(), i + 1))] as (Date | null)[];
  }, [month]);

  const shift = (delta: number) => setMonth((m) => new Date(m.getFullYear(), m.getMonth() + delta, 1));
  const chosen = date ? new Date(`${date}T00:00`) : null;

  return (
    <dialog ref={ref} className="modal modal-lg" onClose={onClose} aria-labelledby="meeting-title">
      <ActionForm action={scheduleMeeting} className="dialog-body" onOk={(msg) => { setNotice(msg); onClose(); }}>
        <input type="hidden" name="conversationId" value={conversationId} />
        <input type="hidden" name="date" value={date} />
        <input type="hidden" name="time" value={time} />
        <div className="dialog-head">
          <div><h2 id="meeting-title">Schedule a meeting</h2><p className="small muted">Pick a time with {otherName}. Times are in IST (UTC+05:30).</p></div>
          <button type="button" className="icon-btn" aria-label="Close" onClick={onClose}><Icon name="x" /></button>
        </div>
        <div className="grid-2" style={{ gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))" }}>
          <section className="card-flat stack-sm" aria-label="Choose a date">
            <div className="row-between">
              <b>{month.toLocaleString("en-IN", { month: "long", year: "numeric" })}</b>
              <div className="row">
                <button type="button" className="icon-btn" aria-label="Previous month" disabled={month <= minDay} onClick={() => shift(-1)}><Icon name="chevronLeft" size={16} /></button>
                <button type="button" className="icon-btn" aria-label="Next month" onClick={() => shift(1)}><Icon name="chevronRight" size={16} /></button>
              </div>
            </div>
            <div className="calendar" role="grid">
              {DOW.map((d) => <span key={d} className="dow">{d}</span>)}
              {cells.map((d, i) => d ? (
                <button key={i} type="button" disabled={d < minDay} aria-pressed={date === iso(d)} aria-label={d.toDateString()} onClick={() => setDate(iso(d))}>{d.getDate()}</button>
              ) : <span key={i} />)}
            </div>
          </section>
          <section className="stack-sm" aria-label="Choose a time">
            <b>{chosen ? chosen.toLocaleDateString("en-IN", { weekday: "long", day: "numeric", month: "short" }) : "Choose a date"}</b>
            <div className="options options-1" role="radiogroup" aria-label="Time slots">
              {SLOTS.map((s) => <label key={s} className="option" style={{ padding: "8px 16px" }}><input type="radio" name="_slot" checked={time === s} onChange={() => setTime(s)} /><b>{slotLabel(s)}</b></label>)}
            </div>
            <label className="field">Or pick another time<input type="time" value={time} onChange={(e) => setTime(e.target.value)} /></label>
          </section>
        </div>
        <div className="form-grid">
          <label className="field">Title<input name="title" defaultValue="Project discussion" /></label>
          <label className="field">Duration<select name="minutes" defaultValue="30"><option value="15">15 minutes</option><option value="30">30 minutes</option><option value="45">45 minutes</option><option value="60">60 minutes</option></select></label>
          <label className="field full">Agenda<textarea name="agenda" style={{ minHeight: 80 }} placeholder="e.g. Review moodboard v1, confirm brand colours, agree on milestones." /></label>
          <label className="field full">Meeting link<input name="link" defaultValue={callHref} /><small>Defaults to a FindRight video call. Paste a Google Meet or Zoom link to use that instead.</small></label>
        </div>
        {date && <p className="card-tint small row"><Icon name="video" size={16} /> {chosen?.toLocaleDateString("en-IN", { weekday: "short", day: "numeric", month: "short" })} · {slotLabel(time)} — both of you see it in the chat.</p>}
        <div className="dialog-foot">
          <button type="button" className="btn btn-light" onClick={onClose}>Cancel</button>
          <Submit pending="Sending…" disabled={!date}><Icon name="send" size={16} /> Send invite</Submit>
        </div>
      </ActionForm>
      {notice && <p className="sr-only" role="status">{notice}</p>}
    </dialog>
  );
}
