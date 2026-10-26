"use client";

import { useRef } from "react";
import Icon from "./Icon";

/** Side drawer built on <dialog>: focus trapping, Escape and backdrop click come from the platform. */
export default function Drawer({ label, title, count, children, footer }: { label: React.ReactNode; title: string; count?: number; children: React.ReactNode; footer: React.ReactNode }) {
  const ref = useRef<HTMLDialogElement>(null);
  return (
    <>
      <button type="button" className="btn btn-light" onClick={() => ref.current?.showModal()} aria-haspopup="dialog">
        {label}{count ? <span className="badge">{count}</span> : null}
      </button>
      <dialog ref={ref} className="drawer" aria-label={title} onClick={(e) => { if (e.target === ref.current) ref.current.close(); }}>
        <div className="drawer-form">
          <div className="dialog-head" style={{ padding: "24px 24px 0" }}>
            <h2>{title}</h2>
            <button type="button" className="icon-btn" aria-label="Close filters" onClick={() => ref.current?.close()}><Icon name="x" /></button>
          </div>
          <div className="dialog-body">{children}</div>
          <footer>{footer}</footer>
        </div>
      </dialog>
    </>
  );
}
