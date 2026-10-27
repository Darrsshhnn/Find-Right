"use client";

import { useActionState } from "react";
import { setAvailability } from "@/app/actions/freelancer";
import { AVAILABILITY } from "@/lib/constants";
import type { Availability } from "@/lib/types";

export default function AvailabilitySwitch({ value }: { value: Availability }) {
  const [, action, pending] = useActionState(setAvailability, undefined);
  const tone = AVAILABILITY[value].tone;
  return (
    <form action={action} className="badge badge-outline" style={{ padding: "4px 6px 4px 10px", opacity: pending ? 0.6 : 1 }} title="Clients with urgent projects filter by availability">
      <span className={`dot dot-${tone}`} />
      <label className="sr-only" htmlFor="availability-switch">Availability</label>
      <select id="availability-switch" name="availability" defaultValue={value} key={value} onChange={(e) => e.currentTarget.form?.requestSubmit()} style={{ border: 0, backgroundColor: "transparent", fontSize: 12.5, fontWeight: 500, cursor: "pointer", paddingRight: 28, backgroundPosition: "right 6px center", backgroundSize: 14 }}>
        {(Object.keys(AVAILABILITY) as Availability[]).map((k) => <option key={k} value={k}>{AVAILABILITY[k].label}</option>)}
      </select>
    </form>
  );
}
