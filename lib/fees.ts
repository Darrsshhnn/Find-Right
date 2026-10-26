import type { Level } from "./types";

export type FeeInput = {
  price: number;
  freelancer: { level: Level; rating: number; completed: number };
  client: { hires: number; verified: boolean };
};

export const FEE_MIN = 2;
export const FEE_MAX = 10;

/**
 * Platform fee (2–10%), deducted from the freelancer's payout on each released milestone.
 * Starts at 10% and drops for larger budgets, rising talent, proven freelancers and established clients.
 */
export function platformFee({ price, freelancer, client }: FeeInput) {
  let percent = FEE_MAX;
  const reasons: string[] = [];
  const cut = (by: number, why: string) => { percent -= by; reasons.push(`−${by}% ${why}`); };
  if (price >= 50000) cut(3, "large budget (₹50k+)");
  else if (price >= 25000) cut(2, "budget ₹25k+");
  else if (price >= 10000) cut(1, "budget ₹10k+");
  if (freelancer.level === "Fresher") cut(2, "rising-talent support");
  else if (freelancer.level === "Expert") cut(1, "expert freelancer");
  if (freelancer.rating >= 4.7 && freelancer.completed >= 3) cut(1, "top-rated freelancer");
  if (client.hires >= 3) cut(1, "repeat client");
  if (client.verified) cut(1, "verified company");
  percent = Math.min(FEE_MAX, Math.max(FEE_MIN, percent));
  return { percent, reasons };
}

export const feeOf = (amount: number, percent = 0) => Math.round((amount * percent) / 100);
