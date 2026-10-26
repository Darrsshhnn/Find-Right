"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import Icon from "./Icon";

export default function NavLink({ href, icon, label, short, count, exact = false, variant = "side" }: {
  href: string; icon: string; label: string; short?: string; count?: number; exact?: boolean; variant?: "side" | "menu";
}) {
  const pathname = usePathname();
  const active = exact ? pathname === href : pathname === href || pathname.startsWith(`${href}/`);
  return (
    <Link href={href} className={variant === "side" ? `side-link${active ? " active" : ""}` : undefined} aria-current={active ? "page" : undefined} title={label}>
      <Icon name={icon} size={variant === "side" ? 20 : 16} />
      <span>{variant === "side" ? short ?? label : label}</span>
      {count ? <span className="count" aria-label={`${count} need attention`}>{count}</span> : null}
    </Link>
  );
}
