"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import Icon from "./Icon";
import { Avatar, Stars } from "./ui";

export type Testimonial = { name: string; role: string; rating: number; text: string };


export default function ReviewSlider({ items }: { items: Testimonial[] }) {
  const track = useRef<HTMLDivElement>(null);
  const [page, setPage] = useState(0);
  const [pages, setPages] = useState(1);
  const [paused, setPaused] = useState(false);

  const measure = useCallback(() => {
    const el = track.current;
    if (!el) return;
    setPages(Math.max(1, Math.round(el.scrollWidth / el.clientWidth)));
    setPage(Math.round(el.scrollLeft / el.clientWidth));
  }, []);

  const go = useCallback((target: number) => {
    const el = track.current;
    if (!el) return;
    const count = Math.max(1, Math.round(el.scrollWidth / el.clientWidth));
    const next = ((target % count) + count) % count;
    el.scrollTo({ left: next * el.clientWidth, behavior: "smooth" });
  }, []);

  useEffect(() => {
    measure();
    window.addEventListener("resize", measure);
    return () => window.removeEventListener("resize", measure);
  }, [measure]);

  useEffect(() => {
    if (paused || window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const timer = window.setInterval(() => go(page + 1), 6000);
    return () => window.clearInterval(timer);
  }, [paused, page, go]);

  return (
    <div
      className="slider"
      role="region"
      aria-roledescription="carousel"
      aria-label="Reviews from clients and freelancers"
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
      onFocus={() => setPaused(true)}
      onBlur={() => setPaused(false)}
    >
      <div className="slider-track" ref={track} onScroll={measure} tabIndex={0} aria-live={paused ? "polite" : "off"}>
        {items.map((r, i) => (
          <article key={r.name} className="card review-slide" aria-roledescription="slide" aria-label={`${i + 1} of ${items.length}`}>
            <div className="stack-sm">
              <Stars value={r.rating} size={16} />
              <blockquote>“{r.text}”</blockquote>
            </div>
            <div className="row">
              <Avatar name={r.name} size="sm" />
              <div><b>{r.name}</b><div className="small muted">{r.role}</div></div>
            </div>
          </article>
        ))}
      </div>
      <div className="slider-controls">
        <div className="slider-dots">
          {Array.from({ length: pages }, (_, i) => (
            <button key={i} type="button" aria-label={`Show reviews page ${i + 1}`} aria-current={i === page ? "true" : undefined} onClick={() => go(i)} />
          ))}
        </div>
        <div className="row">
          <button type="button" className="icon-btn" aria-label="Previous reviews" onClick={() => go(page - 1)}><Icon name="chevronLeft" /></button>
          <button type="button" className="icon-btn" aria-label="Next reviews" onClick={() => go(page + 1)}><Icon name="chevronRight" /></button>
        </div>
      </div>
    </div>
  );
}
