"use client";

import { useOptimistic, useTransition } from "react";
import Icon from "./Icon";
import { toggleSaved } from "@/app/actions/client";

export default function SaveHeart({ freelancerId, name, saved }: { freelancerId: string; name: string; saved: boolean }) {
  const [optimistic, setOptimistic] = useOptimistic(saved);
  const [, start] = useTransition();
  const toggle = () => {
    start(async () => {
      setOptimistic(!optimistic);
      const form = new FormData();
      form.set("freelancerId", freelancerId);
      await toggleSaved(undefined, form);
    });
  };
  return (
    <button type="button" className="heart" aria-pressed={optimistic} aria-label={optimistic ? `Remove ${name} from saved` : `Save ${name}`} title={optimistic ? "Saved" : "Save profile"} onClick={toggle}>
      <Icon name="heart" size={18} />
    </button>
  );
}
