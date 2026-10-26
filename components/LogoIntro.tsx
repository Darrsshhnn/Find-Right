"use client";

import { useEffect, useState } from "react";

const RING = "M403.663 250.609C403.663 321.085 348.222 378.217 279.831 378.217C211.441 378.217 156 321.085 156 250.609C156 180.132 211.441 123 279.831 123C348.222 123 403.663 180.132 403.663 250.609ZM199.341 250.609C199.341 296.418 235.378 333.554 279.831 333.554C324.285 333.554 360.322 296.418 360.322 250.609C360.322 204.799 324.285 167.663 279.831 167.663C235.378 167.663 199.341 204.799 199.341 250.609Z";
const SHORT = "M331.454 301.704C339.711 293.194 353.099 293.194 361.356 301.704L434.162 376.73C442.42 385.239 442.42 399.036 434.162 407.545C425.905 416.054 412.517 416.054 404.26 407.545L331.454 332.518C323.196 324.009 323.196 310.213 331.454 301.704Z";
const LONG = "M404.408 407.594C396.151 399.085 396.151 385.288 404.408 376.779L551.146 225.566C559.403 217.057 572.791 217.057 581.048 225.566C589.306 234.075 589.306 247.872 581.048 256.381L434.311 407.594C426.054 416.103 412.666 416.103 404.408 407.594Z";

/** Full-screen brand intro shown when the landing page opens. Skippable; shortened under reduced motion. */
export default function LogoIntro() {
  const [visible, setVisible] = useState(true);
  useEffect(() => {
    if (!visible) return;
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const timer = window.setTimeout(() => setVisible(false), reduced ? 1500 : 2900);
    const skip = (e: KeyboardEvent) => { if (e.key === "Escape" || e.key === "Enter") setVisible(false); };
    document.addEventListener("keydown", skip);
    // Lock scrolling only while the intro covers the page; unlocked as soon as it hides.
    document.documentElement.classList.add("intro-lock");
    return () => {
      window.clearTimeout(timer);
      document.removeEventListener("keydown", skip);
      document.documentElement.classList.remove("intro-lock");
    };
  }, [visible]);
  if (!visible) return null;
  return (
    <div className="intro" role="presentation" onClick={() => setVisible(false)}>
      <div className="intro-ripples" aria-hidden="true"><span /><span /><span /></div>
      <div className="intro-dots" aria-hidden="true">{Array.from({ length: 14 }, (_, i) => <i key={i} />)}</div>
      <div className="intro-logo" aria-hidden="true">
        <svg className="intro-mark" viewBox="140 106 456 320" width="200" height="140">
          <defs>
            <linearGradient id="intro-g1" x1="432.455" y1="405.663" x2="352.208" y2="328.252" gradientUnits="userSpaceOnUse"><stop stopColor="#0C0C0C" /><stop offset="1" stopColor="#8A38F5" /></linearGradient>
            <linearGradient id="intro-g2" x1="415.698" y1="422.141" x2="337.774" y2="346.956" gradientUnits="userSpaceOnUse"><stop offset="0.01" stopColor="#0C0C0C" /><stop offset="1" stopColor="#8A38F5" /></linearGradient>
          </defs>
          <path className="intro-ring" d={RING} fill="#8A38F5" />
          <path className="intro-short" d={SHORT} fill="url(#intro-g1)" />
          <path className="intro-long" d={LONG} fill="url(#intro-g2)" />
        </svg>
        <span className="intro-word">Find<em>Right</em></span>
        <span className="intro-tag">Verified clients. Creative freelancers.</span>
      </div>
      <button type="button" className="btn btn-ghost btn-sm intro-skip" onClick={() => setVisible(false)}>Skip intro</button>
    </div>
  );
}
