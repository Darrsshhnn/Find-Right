"use client";

import { useRouter, usePathname } from "next/navigation";
import { useRef, useTransition } from "react";

/** GET filter form that updates the URL as soon as a control changes. */
export default function AutoForm({ children, className }: { children: React.ReactNode; className?: string }) {
  const router = useRouter();
  const pathname = usePathname();
  const ref = useRef<HTMLFormElement>(null);
  const [pending, start] = useTransition();
  const timer = useRef<number | undefined>(undefined);

  const apply = () => {
    const params = new URLSearchParams();
    new FormData(ref.current!).forEach((value, key) => { if (String(value)) params.append(key, String(value)); });
    start(() => router.replace(`${pathname}?${params.toString()}`, { scroll: false }));
  };

  return (
    <form
      ref={ref}
      className={className}
      aria-busy={pending}
      style={{ opacity: pending ? 0.75 : 1 }}
      onChange={(e) => {
        window.clearTimeout(timer.current);
        const type = (e.target as unknown as HTMLInputElement).type;
        timer.current = window.setTimeout(apply, type === "search" || type === "range" ? 350 : 0);
      }}
      onSubmit={(e) => { e.preventDefault(); apply(); }}
    >
      {children}
    </form>
  );
}
