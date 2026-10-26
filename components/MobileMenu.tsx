"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import Icon from "./Icon";

export type MenuItem = { href: string; label: string; icon: string; count?: number; exact?: boolean };
export type MenuSection = { label?: string; items: MenuItem[] };

/**
 * Phone navigation: a hamburger that opens a full-height drawer holding every option.
 * Closes on navigation, Escape or backdrop tap; focus moves into the drawer and back to the button.
 */
export default function MobileMenu({ sections, header, top, footer, label = "Open menu" }: {
  sections: MenuSection[]; header?: React.ReactNode; top?: React.ReactNode; footer?: React.ReactNode; label?: string;
}) {
  const [open, setOpen] = useState(false);
  const pathname = usePathname();
  const button = useRef<HTMLButtonElement>(null);
  const panel = useRef<HTMLDivElement>(null);
  const [lastPath, setLastPath] = useState(pathname);

  // Close when the route changes (state adjusted during render rather than in an effect).
  if (pathname !== lastPath) { setLastPath(pathname); setOpen(false); }

  useEffect(() => {
    if (!open) return;
    document.body.style.overflow = "hidden";
    panel.current?.querySelector<HTMLElement>("a, button")?.focus();
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") { setOpen(false); button.current?.focus(); }
      if (e.key === "Tab" && panel.current) {
        const focusable = panel.current.querySelectorAll<HTMLElement>("a, button, input, select, textarea");
        const first = focusable[0];
        const last = focusable[focusable.length - 1];
        if (e.shiftKey && document.activeElement === first) { e.preventDefault(); last?.focus(); }
        else if (!e.shiftKey && document.activeElement === last) { e.preventDefault(); first?.focus(); }
      }
    };
    document.addEventListener("keydown", onKey);
    return () => { document.body.style.overflow = ""; document.removeEventListener("keydown", onKey); };
  }, [open]);

  const isActive = (item: MenuItem) => (item.exact ? pathname === item.href : pathname === item.href || pathname.startsWith(`${item.href}/`));

  return (
    <>
      <button ref={button} type="button" className="icon-btn mobile-menu-btn" aria-label={label} aria-expanded={open} aria-controls="mobile-menu" onClick={() => setOpen(true)}>
        <Icon name="menu" />
      </button>
      {open && (
        <div className="mm-overlay" onClick={(e) => { if (e.target === e.currentTarget) setOpen(false); }}>
          <div ref={panel} id="mobile-menu" className="mm-panel" role="dialog" aria-modal="true" aria-label="Menu">
            <div className="mm-head">
              <div className="grow" style={{ minWidth: 0 }}>{header}</div>
              <button type="button" className="icon-btn" aria-label="Close menu" onClick={() => { setOpen(false); button.current?.focus(); }}><Icon name="x" /></button>
            </div>
            {top && <div className="mm-top">{top}</div>}
            <nav className="mm-body" aria-label="Menu">
              {sections.map((section, i) => (
                <div key={section.label ?? i} className="mm-section">
                  {section.label && <span className="mm-label">{section.label}</span>}
                  {section.items.map((item) => (
                    <Link key={item.href + item.label} href={item.href} className={`mm-link${isActive(item) ? " active" : ""}`} aria-current={isActive(item) ? "page" : undefined}>
                      <span className="mm-icon"><Icon name={item.icon} size={18} /></span>
                      <span className="grow">{item.label}</span>
                      {item.count ? <span className="mm-count">{item.count}</span> : <Icon name="chevronRight" size={16} />}
                    </Link>
                  ))}
                </div>
              ))}
            </nav>
            {footer && <div className="mm-foot">{footer}</div>}
          </div>
        </div>
      )}
    </>
  );
}
