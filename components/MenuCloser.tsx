"use client";

import { usePathname } from "next/navigation";
import { useEffect } from "react";

/** Closes open <details> menus on navigation, outside clicks and Escape. */
export default function MenuCloser() {
  const pathname = usePathname();
  useEffect(() => {
    document.querySelectorAll("details.menu[open]").forEach((d) => d.removeAttribute("open"));
  }, [pathname]);
  useEffect(() => {
    const close = (except?: Element | null) =>
      document.querySelectorAll("details.menu[open]").forEach((d) => { if (d !== except) d.removeAttribute("open"); });
    const onClick = (e: MouseEvent) => close((e.target as Element).closest("details.menu"));
    const onKey = (e: KeyboardEvent) => {
      if (e.key !== "Escape") return;
      const open = document.querySelector("details.menu[open]");
      if (open) { open.removeAttribute("open"); open.querySelector("summary")?.focus(); }
    };
    document.addEventListener("click", onClick);
    document.addEventListener("keydown", onKey);
    return () => { document.removeEventListener("click", onClick); document.removeEventListener("keydown", onKey); };
  }, []);
  return null;
}
