"use client";

import { useRouter } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import Icon from "./Icon";
import { ActionForm, Submit } from "./ActionForm";
import MeetingDialog from "./MeetingDialog";
import VideoCall from "./VideoCall";
import { sendMessage } from "@/app/actions/shared";
import type { Message } from "@/lib/types";

const time = (value: string) => new Date(value).toLocaleString("en-IN", { day: "numeric", month: "short", hour: "numeric", minute: "2-digit" });
const meetingTime = (value: string) => new Date(value).toLocaleString("en-IN", { weekday: "short", day: "numeric", month: "short", hour: "numeric", minute: "2-digit", timeZone: "Asia/Kolkata" });
const hasEnded = (when: string, minutes: number) => new Date(when).getTime() + minutes * 60_000 < Date.now();
const size = (b: number) => (b > 1_000_000 ? `${(b / 1_000_000).toFixed(1)} MB` : `${Math.max(1, Math.round(b / 1000))} KB`);

export default function Chat({ conversationId, meId, initial, names, header, otherName, callHref, autoCall = false, agenda }: {
  conversationId: string; meId: string; initial: Message[]; names: Record<string, string>; header: React.ReactNode;
  otherName: string; callHref: string; autoCall?: boolean; agenda?: string;
}) {
  const [polled, setPolled] = useState<Message[] | null>(null);
  const [meetingOpen, setMeetingOpen] = useState(false);
  const [inCall, setInCall] = useState(autoCall);
  const [pending, setPending] = useState<File[]>([]);
  const router = useRouter();
  const thread = useRef<HTMLDivElement>(null);
  const fileInput = useRef<HTMLInputElement>(null);
  // Server data wins whenever it's at least as fresh as what polling returned.
  const messages = polled && polled.length > initial.length ? polled : initial;

  useEffect(() => {
    const timer = window.setInterval(async () => {
      if (document.hidden) return;
      const response = await fetch(`/api/messages?c=${conversationId}`, { cache: "no-store" }).catch(() => null);
      if (!response?.ok) return;
      const data = (await response.json()) as { messages: Message[] };
      setPolled(data.messages);
    }, 4000);
    return () => window.clearInterval(timer);
  }, [conversationId]);

  useEffect(() => {
    thread.current?.scrollTo({ top: thread.current.scrollHeight });
  }, [messages.length]);

  const syncFiles = (files: File[]) => {
    setPending(files);
    if (fileInput.current) {
      const dt = new DataTransfer();
      files.forEach((f) => dt.items.add(f));
      fileInput.current.files = dt.files;
    }
  };

  return (
    <section className="chat-main" aria-label={`Conversation with ${otherName}`}>
      <header className="chat-head">
        {header}
        <div className="row right">
          <button type="button" className="btn btn-light btn-sm" onClick={() => setMeetingOpen(true)}><Icon name="calendar" size={16} /> <span className="hide-mobile">Schedule meeting</span></button>
          <button type="button" className="btn btn-primary btn-sm" onClick={() => setInCall(true)}><Icon name="video" size={16} /> <span className="hide-mobile">Video call</span></button>
        </div>
      </header>

      <div className="thread" ref={thread} aria-live="polite">
        {messages.length === 0 && <p className="muted center small" style={{ margin: "auto" }}>Say hello — discuss the brief, timeline and expectations before agreeing terms.</p>}
        {messages.map((m) => {
          const mine = m.senderId === meId;
          if (m.kind === "system") return <div key={m.id} className="bubble system">● {m.text}</div>;
          if (m.kind === "meeting" && m.meeting) {
            const past = hasEnded(m.meeting.when, m.meeting.minutes);
            return (
              <article key={m.id} className="meeting-card">
                <div className="row-between">
                  <b><Icon name="calendar" size={16} /> {m.meeting.title}</b>
                  <span className={`badge ${past ? "badge-grey" : "badge-green"}`}>{past ? "Ended" : "Scheduled"}</span>
                </div>
                <span className="small">{meetingTime(m.meeting.when)} IST · {m.meeting.minutes} min · by {mine ? "you" : names[m.senderId] ?? "member"}</span>
                {m.meeting.agenda && <p className="small muted" style={{ whiteSpace: "pre-wrap" }}>{m.meeting.agenda}</p>}
                {!past && (m.meeting.link && !m.meeting.link.startsWith("/") ? (
                  <a className="btn btn-primary btn-sm" href={m.meeting.link} target="_blank" rel="noreferrer noopener"><Icon name="video" size={16} /> Join meeting</a>
                ) : (
                  <button type="button" className="btn btn-primary btn-sm" onClick={() => setInCall(true)}><Icon name="video" size={16} /> Join video call</button>
                ))}
              </article>
            );
          }
          return (
            <div key={m.id} className={`bubble${mine ? " mine" : ""}`}>
              {!mine && <b className="small" style={{ display: "block" }}>{names[m.senderId] ?? "Member"}</b>}
              {m.text}
              {m.files && m.files.length > 0 && (
                <div className="bubble-files">
                  {m.files.map((f) => (
                    f.type?.startsWith("image/")
                      ? <a key={f.id} href={`/api/files/${f.id}`} target="_blank" rel="noreferrer" style={{ padding: 0, border: 0, background: "none" }}><img src={`/api/files/${f.id}`} alt={f.name} /></a>
                      : <a key={f.id} href={`/api/files/${f.id}`} target="_blank" rel="noreferrer"><Icon name="file" size={16} /><span className="truncate">{f.name}</span><span style={{ opacity: 0.7 }}>{size(f.size)}</span><Icon name="download" size={14} /></a>
                  ))}
                </div>
              )}
              <small>{time(m.createdAt)}</small>
            </div>
          );
        })}
      </div>

      <ActionForm action={sendMessage} className="composer" resetOnOk showOk={false} onSuccess={() => syncFiles([])}>
        <input type="hidden" name="conversationId" value={conversationId} />
        {pending.length > 0 && (
          <div className="composer-files" aria-label="Files to send">
            {pending.map((f, i) => (
              <span key={`${f.name}-${i}`}><Icon name="file" size={12} /> {f.name}<button type="button" aria-label={`Remove ${f.name}`} onClick={() => syncFiles(pending.filter((_, j) => j !== i))}><Icon name="x" size={12} /></button></span>
            ))}
          </div>
        )}
        <label className="icon-btn" title="Attach files">
          <Icon name="paperclip" />
          <span className="sr-only">Attach files</span>
          <input ref={fileInput} type="file" name="files" multiple className="sr-only" onChange={(e) => syncFiles([...pending, ...Array.from(e.target.files ?? [])].slice(0, 5))} />
        </label>
        <textarea
          name="text"
          rows={1}
          placeholder="Type a message…"
          aria-label="Message"
          maxLength={4000}
          onKeyDown={(e) => {
            if (e.key === "Enter" && !e.shiftKey) { e.preventDefault(); e.currentTarget.form?.requestSubmit(); }
          }}
        />
        <Submit className="btn btn-primary" pending="Sending…"><Icon name="send" size={16} /> <span className="hide-mobile">Send</span></Submit>
      </ActionForm>

      <MeetingDialog open={meetingOpen} onClose={() => setMeetingOpen(false)} conversationId={conversationId} otherName={otherName} callHref={callHref} />
      {inCall && <VideoCall otherName={otherName} agenda={agenda} onEnd={() => { setInCall(false); if (autoCall) router.replace(callHref.replace("&call=1", ""), { scroll: false }); }} />}
    </section>
  );
}
