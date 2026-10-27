export const money = (value: number) => `₹${Math.round(value || 0).toLocaleString("en-IN")}`;

export const initials = (name: string) =>
  name.split(/\s+/).filter(Boolean).slice(0, 2).map((part) => part[0]!.toUpperCase()).join("");

/**
 * All dates are shown in India time. Servers (e.g. Vercel) run in UTC while browsers run in local time, so
 * formatting without a fixed zone renders different text on each side and breaks React hydration.
 */
export const TIME_ZONE = "Asia/Kolkata";

/** Current hour (0–23) in India time — for greetings. */
export const hourNow = () => Number(new Intl.DateTimeFormat("en-IN", { hour: "numeric", hourCycle: "h23", timeZone: TIME_ZONE }).format(new Date()));

export function shortDate(value: string) {
  const date = new Date(value);
  if (Number.isNaN(date.getTime())) return value;
  return date.toLocaleDateString("en-IN", { day: "numeric", month: "short", year: "numeric", timeZone: TIME_ZONE });
}

export function timeAgo(value: string) {
  const diff = Date.now() - new Date(value).getTime();
  const minutes = Math.round(diff / 60_000);
  if (minutes < 1) return "just now";
  if (minutes < 60) return `${minutes}m ago`;
  const hours = Math.round(minutes / 60);
  if (hours < 24) return `${hours}h ago`;
  const days = Math.round(hours / 24);
  if (days < 30) return `${days}d ago`;
  return shortDate(value);
}

export function daysLeft(deadline: string) {
  const diff = new Date(deadline).getTime() - Date.now();
  return Math.ceil(diff / 86_400_000);
}

export const fileSize = (bytes: number) =>
  bytes > 1_000_000 ? `${(bytes / 1_000_000).toFixed(1)} MB` : `${Math.max(1, Math.round(bytes / 1000))} KB`;

export const label = (value: string) => value.replace(/_/g, " ").replace(/^./, (c) => c.toUpperCase());

/** ISO date (yyyy-mm-dd) a number of days from today. */
export const daysFromToday = (days: number) => new Date(Date.now() + days * 86_400_000).toISOString().slice(0, 10);
