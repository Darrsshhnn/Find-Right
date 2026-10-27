"use client";

import { useEffect, useState } from "react";

// Paths from public/brand/logo-mark.svg: the lens ring, the short stroke (lens handle) and the long stroke (check).
const RING = "M403.663 250.609C403.663 321.085 348.222 378.217 279.831 378.217C211.441 378.217 156 321.085 156 250.609C156 180.132 211.441 123 279.831 123C348.222 123 403.663 180.132 403.663 250.609ZM199.341 250.609C199.341 296.418 235.378 333.554 279.831 333.554C324.285 333.554 360.322 296.418 360.322 250.609C360.322 204.799 324.285 167.663 279.831 167.663C235.378 167.663 199.341 204.799 199.341 250.609Z";
const SHORT = "M331.454 301.704C339.711 293.194 353.099 293.194 361.356 301.704L434.162 376.73C442.42 385.239 442.42 399.036 434.162 407.545C425.905 416.054 412.517 416.054 404.26 407.545L331.454 332.518C323.196 324.009 323.196 310.213 331.454 301.704Z";
const SHORT_EDGE = "M331.454 332.518L338.816 324.931L331.454 332.518ZM434.162 407.545L426.8 399.958V399.958L434.162 407.545ZM404.26 407.545L411.622 399.958L404.26 407.545ZM361.356 301.704L353.994 309.291L426.8 384.317L434.162 376.73L441.525 369.143L368.719 294.116L361.356 301.704ZM404.26 407.545L411.622 399.958L338.816 324.931L331.454 332.518L324.091 340.106L396.897 415.132L404.26 407.545ZM331.454 332.518L338.816 324.931C334.625 320.612 334.625 313.61 338.816 309.291L331.454 301.704L324.091 294.116C311.768 306.816 311.768 327.406 324.091 340.106L331.454 332.518ZM434.162 407.545L426.8 399.958C422.609 404.277 415.813 404.277 411.622 399.958L404.26 407.545L396.897 415.132C409.221 427.832 429.201 427.832 441.525 415.132L434.162 407.545ZM434.162 376.73L426.8 384.317C430.991 388.636 430.991 395.639 426.8 399.958L434.162 407.545L441.525 415.132C453.849 402.432 453.849 381.842 441.525 369.143L434.162 376.73ZM361.356 301.704L368.719 294.116C356.395 281.417 336.415 281.417 324.091 294.116L331.454 301.704L338.816 309.291C343.008 304.972 349.803 304.972 353.994 309.291L361.356 301.704Z";
const LONG = "M404.408 407.594C396.151 399.085 396.151 385.288 404.408 376.779L551.146 225.566C559.403 217.057 572.791 217.057 581.048 225.566C589.306 234.075 589.306 247.872 581.048 256.381L434.311 407.594C426.054 416.103 412.666 416.103 404.408 407.594Z";

/**
 * Full-screen brand intro: the magnifier (ring + handle) searches across the screen, lands, and the
 * check stroke grows out of the handle — "find" → "right". Skippable; calmer under reduced motion.
 */
export default function LogoIntro() {
  const [visible, setVisible] = useState(true);
  useEffect(() => {
    if (!visible) return;
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const timer = window.setTimeout(() => setVisible(false), reduced ? 1500 : 3400);
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
            <filter id="ii-shadow" x="146.093" y="113.094" width="277.052" height="284.606" filterUnits="userSpaceOnUse" colorInterpolationFilters="sRGB">
              <feFlood floodOpacity="0" result="BackgroundImageFix" />
              <feBlend mode="normal" in="SourceGraphic" in2="BackgroundImageFix" result="shape" />
              <feColorMatrix in="SourceAlpha" type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0" result="hardAlpha" />
              <feOffset dx="16.5109" dy="9.90651" />
              <feGaussianBlur stdDeviation="4.78815" />
              <feComposite in2="hardAlpha" operator="arithmetic" k2="-1" k3="1" />
              <feColorMatrix type="matrix" values="0 0 0 0 0.0470588 0 0 0 0 0.0470588 0 0 0 0 0.0470588 0 0 0 0.61 0" />
              <feBlend mode="normal" in2="shape" result="effect1_innerShadow" />
            </filter>
            <mask id="ii-ring-edge" maskUnits="userSpaceOnUse" x="146" y="113" width="268" height="276" fill="black">
              <rect fill="white" x="146" y="113" width="268" height="276" />
              <path d={RING} />
            </mask>
            <mask id="ii-short-edge" maskUnits="userSpaceOnUse" x="301.139" y="270.508" width="163.655" height="168.647" fill="black">
              <rect fill="white" x="301.139" y="270.508" width="163.655" height="168.647" />
              <path d={SHORT} />
            </mask>
            <linearGradient id="ii-g1" x1="432.455" y1="405.663" x2="352.208" y2="328.252" gradientUnits="userSpaceOnUse"><stop stopColor="#0C0C0C" /><stop offset="1" stopColor="#8A38F5" /></linearGradient>
            <linearGradient id="ii-g2" x1="415.698" y1="422.141" x2="337.774" y2="346.956" gradientUnits="userSpaceOnUse"><stop offset="0.011284" stopColor="#0C0C0C" /><stop offset="1" stopColor="#8A38F5" /></linearGradient>
            <clipPath id="ii-lens"><circle cx="279.831" cy="250.609" r="81" /></clipPath>
          </defs>
          {/* the magnifier: ring + handle move together while searching */}
          <g className="intro-lens">
            <g clipPath="url(#ii-lens)"><rect className="intro-glint" x="150" y="120" width="34" height="260" fill="#8A38F5" opacity="0.18" /></g>
            <g filter="url(#ii-shadow)"><path d={RING} fill="#8A38F5" /></g>
            <path d={RING} stroke="white" strokeWidth="19.813" mask="url(#ii-ring-edge)" />
            <path d={SHORT} fill="url(#ii-g1)" />
            <path d={SHORT_EDGE} fill="white" mask="url(#ii-short-edge)" />
          </g>
          {/* the check stroke — grows out of the handle once the search lands (drawn on top, as in the logo) */}
          <path className="intro-long" d={LONG} fill="url(#ii-g2)" />
        </svg>
        <span className="intro-word">Find<em>Right</em></span>
        <span className="intro-tag">Search less. Hire right.</span>
      </div>
      <button type="button" className="btn btn-ghost btn-sm intro-skip" onClick={() => setVisible(false)}>Skip intro</button>
    </div>
  );
}
