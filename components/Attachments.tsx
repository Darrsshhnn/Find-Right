"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import Icon from "./Icon";

const key = (f: File) => `${f.name}-${f.size}-${f.lastModified}`;
const MAX_FILES = 10;
const MAX_SIZE = 10_000_000;
const size = (b: number) => (b > 1_000_000 ? `${(b / 1_000_000).toFixed(1)} MB` : `${Math.max(1, Math.round(b / 1000))} KB`);

/**
 * File and link picker with previews. Files live in a real <input type="file"> (kept in sync through
 * DataTransfer) so they submit with the surrounding form; links submit as repeated hidden inputs.
 */
export default function Attachments({ name = "attachments", linksName = "links" }: { name?: string; linksName?: string }) {
  const input = useRef<HTMLInputElement>(null);
  const [files, setFiles] = useState<File[]>([]);
  const [links, setLinks] = useState<string[]>([]);
  const [link, setLink] = useState("");
  const [error, setError] = useState("");
  const [over, setOver] = useState(false);

  const previews = useMemo(() => {
    const urls: Record<string, string> = {};
    files.forEach((f) => { if (f.type.startsWith("image/")) urls[key(f)] = URL.createObjectURL(f); });
    return urls;
  }, [files]);

  useEffect(() => {
    if (input.current) {
      const dt = new DataTransfer();
      files.forEach((f) => dt.items.add(f));
      input.current.files = dt.files;
    }
    return () => Object.values(previews).forEach((u) => URL.revokeObjectURL(u));
  }, [files, previews]);

  const add = (list: FileList | null) => {
    if (!list) return;
    setError("");
    const incoming = Array.from(list);
    const tooBig = incoming.find((f) => f.size > MAX_SIZE);
    if (tooBig) setError(`“${tooBig.name}” is larger than 10 MB.`);
    setFiles((cur) => {
      const merged = [...cur];
      for (const f of incoming) if (f.size <= MAX_SIZE && !merged.some((m) => key(m) === key(f))) merged.push(f);
      if (merged.length > MAX_FILES) setError(`You can attach up to ${MAX_FILES} files.`);
      return merged.slice(0, MAX_FILES);
    });
  };

  const addLink = () => {
    const value = link.trim();
    if (!value) return;
    if (!/^https?:\/\/\S+\.\S+/.test(value)) { setError("Links should start with https://"); return; }
    setError("");
    setLinks((cur) => (cur.includes(value) ? cur : [...cur, value]));
    setLink("");
  };

  return (
    <div className="stack">
      <label
        className={`dropzone${over ? " over" : ""}`}
        onDragOver={(e) => { e.preventDefault(); setOver(true); }}
        onDragLeave={() => setOver(false)}
        onDrop={(e) => { e.preventDefault(); setOver(false); add(e.dataTransfer.files); }}
      >
        <Icon name="upload" size={24} />
        <b style={{ color: "var(--ink)" }}>Attach files</b>
        <span className="small">Drag & drop, or click to browse · images, PDFs, brand files · up to 10 MB each</span>
        <input ref={input} type="file" name={name} multiple className="sr-only" onChange={(e) => { const picked = e.target.files; add(picked); }} />
      </label>
      {files.length > 0 && (
        <div className="attach-grid" aria-label="Attached files">
          {files.map((f) => (
            <div key={key(f)} className="attach">
              <div className="preview">{previews[key(f)] ? <img src={previews[key(f)]} alt="" /> : <Icon name={f.type === "application/pdf" ? "file" : "layers"} size={28} />}</div>
              <div className="name"><span className="truncate">{f.name}</span><span className="muted">{size(f.size)}</span></div>
              <button type="button" className="remove" aria-label={`Remove ${f.name}`} onClick={() => setFiles((cur) => cur.filter((x) => key(x) !== key(f)))}><Icon name="x" size={14} /></button>
            </div>
          ))}
        </div>
      )}
      <div className="stack-sm">
        <span className="field" style={{ gap: 0 }}>References & links</span>
        <div className="row" style={{ flexWrap: "nowrap" }}>
          <input className="input" value={link} onChange={(e) => setLink(e.target.value)} onKeyDown={(e) => { if (e.key === "Enter") { e.preventDefault(); addLink(); } }} placeholder="https://dribbble.com/shots/… or a Google Drive folder" aria-label="Reference link" />
          <button type="button" className="btn btn-outline" onClick={addLink}><Icon name="plus" size={16} /> Add</button>
        </div>
        {links.map((l) => (
          <div key={l} className="link-row">
            <Icon name="link" size={16} />
            <a href={l} target="_blank" rel="noreferrer noopener" className="grow truncate link">{l}</a>
            <button type="button" className="btn btn-ghost btn-sm" aria-label={`Remove link ${l}`} onClick={() => setLinks((cur) => cur.filter((x) => x !== l))}><Icon name="x" size={14} /></button>
            <input type="hidden" name={linksName} value={l} />
          </div>
        ))}
      </div>
      {error && <p className="alert alert-error" role="alert">{error}</p>}
    </div>
  );
}
