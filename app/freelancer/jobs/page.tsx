import type { Metadata } from "next";
import Link from "next/link";
import AutoForm from "@/components/AutoForm";
import { JobCard } from "@/components/cards";
import { Empty, PageHead } from "@/components/ui";
import { requireUser } from "@/lib/auth";
import { CATEGORY_NAMES, LEVELS } from "@/lib/constants";
import { db } from "@/lib/db";
import { daysLeft } from "@/lib/format";
import { clientById, freelancerById, matchScore } from "@/lib/queries";

export const metadata: Metadata = { title: "Find work" };

type Params = { q?: string; category?: string; level?: string; min?: string; within?: string; duration?: string; client?: string; verified?: string; sort?: string; all?: string };

export default async function FindWork({ searchParams }: { searchParams: Promise<Params> }) {
  const user = await requireUser("freelancer");
  const p = await searchParams;
  const data = db();
  const f = freelancerById(user.id, data)!;
  const mine = p.all !== "1";
  const q = (p.q ?? "").toLowerCase();
  const min = Number(p.min) || 0;
  const applied = new Set(data.proposals.filter((x) => x.freelancerId === user.id && x.status !== "withdrawn").map((x) => x.jobId));
  const invited = new Set(data.invitations.filter((i) => i.freelancerId === user.id && i.status === "pending").map((i) => i.jobId));

  const jobs = data.jobs
    .filter((j) => j.status === "open")
    .map((job) => ({ job, client: clientById(job.clientId, data), match: matchScore(f.profile, job), applicants: data.proposals.filter((x) => x.jobId === job.id && x.status !== "withdrawn").length }))
    .filter(({ job, client }) => {
      if (q && !`${job.title} ${job.description} ${job.category}`.toLowerCase().includes(q)) return false;
      if (p.category ? job.category !== p.category : mine && !f.profile.disciplines.includes(job.category)) return false;
      if (p.level && job.level !== p.level) return false;
      if (job.budget < min) return false;
      if (p.within && daysLeft(job.deadline) > Number(p.within)) return false;
      if (p.duration && job.duration !== p.duration) return false;
      if (p.client && client?.profile.accountType !== p.client) return false;
      if (p.verified === "1" && !client?.verified) return false;
      return true;
    });
  const sort = p.sort ?? "match";
  jobs.sort((a, b) => (sort === "newest" ? b.job.createdAt.localeCompare(a.job.createdAt) : sort === "budget" ? b.job.budget - a.job.budget : sort === "fewest" ? a.applicants - b.applicants : b.match.score - a.match.score));
  const durations = [...new Set(data.jobs.map((j) => j.duration))];

  return (
    <>
      <PageHead eyebrow="Discover work" title="Find genuine projects" description="Every brief comes with a clear scope, budget and deadline. Ranked by how well it fits your skills, level and availability — not by who bids lowest." />
      <div className="layout-filters">
        <AutoForm className="card stack">
          <label className="field">Search<input type="search" name="q" defaultValue={p.q} placeholder="Title, skill or keyword" /></label>
          <label className="check"><input type="checkbox" name="all" value="1" defaultChecked={!mine} /> Include categories outside my disciplines</label>
          <label className="field">Category<select name="category" defaultValue={p.category ?? ""}><option value="">{mine ? "My disciplines" : "All categories"}</option>{CATEGORY_NAMES.map((c) => <option key={c}>{c}</option>)}</select></label>
          <label className="field">Experience level<select name="level" defaultValue={p.level ?? ""}><option value="">Any level</option>{LEVELS.map((l) => <option key={l.value} value={l.value}>{l.label}</option>)}</select></label>
          <label className="field">Minimum budget<select name="min" defaultValue={p.min ?? ""}><option value="">Any budget</option>{[10000, 20000, 40000, 60000].map((v) => <option key={v} value={v}>₹{v.toLocaleString("en-IN")}+</option>)}</select></label>
          <label className="field">Deadline within<select name="within" defaultValue={p.within ?? ""}><option value="">Any time</option><option value="14">2 weeks</option><option value="30">1 month</option><option value="60">2 months</option></select></label>
          <label className="field">Project duration<select name="duration" defaultValue={p.duration ?? ""}><option value="">Any duration</option>{durations.map((d) => <option key={d}>{d}</option>)}</select></label>
          <label className="field">Client category<select name="client" defaultValue={p.client ?? ""}><option value="">Any client</option><option value="company">Companies</option><option value="personal">Individuals & creators</option></select></label>
          <label className="check"><input type="checkbox" name="verified" value="1" defaultChecked={p.verified === "1"} /> Verified clients only</label>
          <label className="field">Sort by<select name="sort" defaultValue={sort}><option value="match">Best match</option><option value="newest">Newest</option><option value="budget">Highest budget</option><option value="fewest">Fewest applicants</option></select></label>
          <Link href="/freelancer/jobs" className="btn btn-ghost btn-sm">Reset filters</Link>
        </AutoForm>
        <section className="stack">
          <p className="small muted">{jobs.length} open project{jobs.length === 1 ? "" : "s"}</p>
          {jobs.length ? (
            <div className="grid-2">
              {jobs.map(({ job, client, match, applicants }) => (
                <div key={job.id} style={{ position: "relative" }}>
                  {applied.has(job.id) && <span className="badge badge-green" style={{ position: "absolute", top: -10, right: 14, zIndex: 1 }}>Applied</span>}
                  <JobCard job={job} client={client} applicants={applicants} match={match} href={`/freelancer/jobs/${job.id}`} invited={invited.has(job.id)} />
                </div>
              ))}
            </div>
          ) : <Empty icon="search" title="No projects match these filters" action={<Link href="/freelancer/jobs?all=1" className="btn btn-outline">Show all categories</Link>}>Try a wider budget, timeline or category.</Empty>}
        </section>
      </div>
    </>
  );
}
