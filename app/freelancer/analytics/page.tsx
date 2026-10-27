import type { Metadata } from "next";
import Link from "next/link";
import { ColumnChart, LineChart, type Point } from "@/components/Charts";
import Icon from "@/components/Icon";
import { PageHead } from "@/components/ui";
import { requireUser } from "@/lib/auth";
import { db } from "@/lib/db";
import { TIME_ZONE, money } from "@/lib/format";
import { freelancerById } from "@/lib/queries";

export const metadata: Metadata = { title: "Analytics" };

const MONTHS = 6;
const LEVELS = [
  { name: "Rising talent", need: "Complete your profile and first contract" },
  { name: "Trusted", need: "3 completed contracts or Intermediate level" },
  { name: "Top rated", need: "4.7★ average with completed work" },
];

export default async function Analytics() {
  const user = await requireUser("freelancer");
  const data = db();
  const f = freelancerById(user.id, data)!;

  // Net earnings per month: releases minus the platform fee recorded with them.
  const now = new Date();
  const months = Array.from({ length: MONTHS }, (_, i) => new Date(now.getFullYear(), now.getMonth() - (MONTHS - 1 - i), 1));
  const txs = data.transactions.filter((t) => t.freelancerId === user.id && (t.type === "release" || t.type === "fee"));
  const earnings: Point[] = months.map((m) => {
    const next = new Date(m.getFullYear(), m.getMonth() + 1, 1);
    const net = txs.filter((t) => { const d = new Date(t.createdAt); return d >= m && d < next; }).reduce((s, t) => s + (t.type === "fee" ? -t.amount : t.amount), 0);
    return { label: m.toLocaleDateString("en-IN", { month: "short", timeZone: TIME_ZONE }), value: Math.max(0, net), display: money(Math.max(0, net)) };
  });
  const last = earnings[MONTHS - 1]!.value;
  const prev = earnings[MONTHS - 2]!.value;
  const sixMonthTotal = earnings.reduce((s, p) => s + p.value, 0);

  // Proposal funnel.
  const proposals = data.proposals.filter((p) => p.freelancerId === user.id && p.status !== "withdrawn");
  const hiredIds = new Set(data.projects.filter((p) => p.freelancerId === user.id && !["declined", "cancelled"].includes(p.status) && p.proposalId).map((p) => p.proposalId));
  const hired = proposals.filter((p) => p.status === "hired" || hiredIds.has(p.id)).length;
  const shortlisted = proposals.filter((p) => p.status === "shortlisted" || p.status === "hired" || hiredIds.has(p.id)).length;
  const winRate = proposals.length ? Math.round((hired / proposals.length) * 100) : 0;
  const funnel = [
    { label: "Proposals sent", value: proposals.length },
    { label: "Shortlisted", value: shortlisted },
    { label: "Hired", value: hired },
  ];

  // Ratings over time (running average after each review).
  const reviews = data.reviews.filter((r) => r.toId === user.id).sort((a, b) => a.createdAt.localeCompare(b.createdAt));
  const ratingTrend: Point[] = reviews.map((r, i) => {
    const avg = Math.round((reviews.slice(0, i + 1).reduce((s, x) => s + x.rating, 0) / (i + 1)) * 10) / 10;
    return { label: new Date(r.createdAt).toLocaleDateString("en-IN", { day: "numeric", month: "short", timeZone: TIME_ZONE }), value: avg, display: `${avg.toFixed(1)} ★ average` };
  });
  const avgOf = (k: "communication" | "quality" | "timeliness") => (reviews.length ? reviews.reduce((s, r) => s + r[k], 0) / reviews.length : 0);
  const breakdown = [["Quality of work", avgOf("quality")], ["Communication", avgOf("communication")], ["Timeliness", avgOf("timeliness")]] as const;

  const levelIndex = Math.max(0, LEVELS.findIndex((l) => l.name === f.tier));
  const nextLevel = LEVELS[levelIndex + 1];

  return (
    <>
      <PageHead eyebrow="Your progress" title="Analytics" description="How your earnings, proposals and ratings are trending — and what moves you to the next level." />

      <section className="grid-4 analytics-tiles">
        <div className="stat"><span>Earned · last 6 months</span><strong>{money(sixMonthTotal)}</strong><small className={last >= prev ? "" : "down"}>{prev ? `${last >= prev ? "▲" : "▼"} ${Math.abs(Math.round(((last - prev) / prev) * 100))}% vs last month` : "Net of platform fees"}</small></div>
        <div className="stat"><span>Proposal win rate</span><strong>{winRate}%</strong><small>{hired} hired of {proposals.length} sent</small></div>
        <div className="stat"><span>Average rating</span><strong>{f.rating.count ? `${f.rating.average.toFixed(1)} ★` : "—"}</strong><small>{f.rating.count} client review{f.rating.count === 1 ? "" : "s"}</small></div>
        <div className="stat"><span>Delivered on time</span><strong>{f.onTime}%</strong><small>{f.completed} completed contract{f.completed === 1 ? "" : "s"}</small></div>
      </section>

      <div className="layout-aside">
        <div className="stack-lg">
          <section className="card stack">
            <div className="row-between"><div><h2>Net earnings by month</h2><p className="small muted">Released milestones minus platform fees</p></div><Link href="/freelancer/earnings" className="link small">Payout history →</Link></div>
            <ColumnChart points={earnings} caption="Net earnings by month, last 6 months" valueLabel="Net earnings" />
          </section>

          <section className="card stack">
            <div><h2>Rating over time</h2><p className="small muted">Your running average after each client review</p></div>
            {ratingTrend.length ? <LineChart points={ratingTrend} caption="Average client rating after each review" valueLabel="Average rating" min={1} max={5} /> : <p className="muted small">Your rating trend appears after your first client review.</p>}
          </section>
        </div>

        <aside>
          <section className="card stack">
            <h3>Proposal funnel</h3>
            <div className="funnel">
              {funnel.map((s) => (
                <div key={s.label} className="funnel-row">
                  <div className="row-between small"><span>{s.label}</span><b>{s.value}</b></div>
                  <div className="meter" role="img" aria-label={`${s.label}: ${s.value}`}><i style={{ width: `${proposals.length ? (s.value / proposals.length) * 100 : 0}%` }} /></div>
                </div>
              ))}
            </div>
            <p className="small muted">Tip: proposals with 2+ matching samples get shortlisted more often.</p>
          </section>

          <section className="card stack">
            <h3>Rating breakdown</h3>
            {breakdown.map(([label, v]) => (
              <div key={label} className="funnel-row">
                <div className="row-between small"><span>{label}</span><b>{v ? v.toFixed(1) : "—"}</b></div>
                <div className="meter" role="img" aria-label={`${label}: ${v.toFixed(1)} of 5`}><i style={{ width: `${(v / 5) * 100}%` }} /></div>
              </div>
            ))}
          </section>

          <section className="card stack">
            <h3 className="row" style={{ gap: 8 }}><Icon name="award" size={18} /> Level progress</h3>
            <ol className="level-steps">
              {LEVELS.map((l, i) => <li key={l.name} className={i < levelIndex ? "done" : i === levelIndex ? "current" : ""}><b>{l.name}</b><small>{i === levelIndex ? "You are here" : l.need}</small></li>)}
            </ol>
            <div className="row-between small"><span>Trust score</span><b>{f.trust}/100</b></div>
            <div className="meter"><i style={{ width: `${f.trust}%` }} /></div>
            <p className="small muted">{nextLevel ? `Next: ${nextLevel.name} — ${nextLevel.need.toLowerCase()}.` : "You've reached the top level. Keep it up!"}</p>
            <Link href="/freelancer/progression" className="btn btn-outline btn-sm">See trust steps</Link>
          </section>
        </aside>
      </div>
    </>
  );
}
