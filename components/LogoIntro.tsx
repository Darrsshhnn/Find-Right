"use client";

import { useEffect, useState } from "react";
import BrandMark from "./BrandMark";

/** Brand intro shown every time the landing page opens. Skippable; shortened under reduced motion. */
export default function LogoIntro() {
  const [visible, setVisible] = useState(true);
  useEffect(() => {
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const timer = window.setTimeout(() => setVisible(false), reduced ? 700 : 2200);
    const skip = (e: KeyboardEvent) => { if (e.key === "Escape" || e.key === "Enter") setVisible(false); };
    document.addEventListener("keydown", skip);
    return () => { window.clearTimeout(timer); document.removeEventListener("keydown", skip); };
  }, []);
  if (!visible) return null;
  return (
    <div className="intro" role="presentation" onClick={() => setVisible(false)}>
      <div className="intro-logo" aria-hidden="true">
        <span className="intro-mark"><BrandMark size={48} /></span>
        <span className="intro-word">Find<em>Right</em></span>
      </div>
      <button type="button" className="btn btn-ghost btn-sm intro-skip" onClick={() => setVisible(false)}>Skip intro</button>
    </div>
  );
}
