"use client";

import Icon from "./Icon";

export default function TourButton({ className = "btn btn-outline btn-sm", label = "Show app guide" }: { className?: string; label?: string }) {
  return (
    <button type="button" className={className} onClick={() => window.dispatchEvent(new Event("findright:tour"))}>
      <Icon name="help" size={16} /> {label}
    </button>
  );
}
