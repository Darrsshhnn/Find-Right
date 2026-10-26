import { SCHEDULES } from "./constants";
import type { Terms } from "./types";

/**
 * Splits a contract into milestones. `amount` is the freelancer's payout (from the full price);
 * `charge` is what the client pays (from the total after any starter credit). Rounding remainders
 * go to the last milestone so both columns add up exactly.
 */
export function milestoneSplit(schedule: Terms["schedule"], price: number, total: number) {
  const parts = SCHEDULES[schedule].parts;
  let paid = 0;
  let charged = 0;
  return parts.map((part, index) => {
    const last = index === parts.length - 1;
    const amount = last ? price - paid : Math.round((price * part.percent) / 100);
    const charge = last ? total - charged : Math.round((total * part.percent) / 100);
    paid += amount;
    charged += charge;
    return { title: part.title, percent: part.percent, amount, charge };
  });
}
