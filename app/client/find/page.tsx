import type { Metadata } from "next";
import Link from "next/link";
import Drawer from "@/components/Drawer";
import Icon from "@/components/Icon";
import { FreelancerCard } from "@/components/cards";
import { Empty, PageHead } from "@/components/ui";
import { requireUser } from "@/lib/auth";
import { AVAILABILITY, CATEGORY_NAMES, LEVELS, SKILLS } from "@/lib/constants";
import { db } from "@/lib/db";
import { allFreelancers, clientById, creditsAvailable, matchScore } from "@/lib/queries";

export const metadata: Metadata = { title: "Find talent" };

type Params = Record<string, string | string[] | undefined>;
const one = (v: string | string[] | undefined) => (Array.isArray(v) ? v[0] : v) ?? "";
const many = (v: string | string[] | undefined) => (Array.isArray(v) ? v : v ? [v] : []);

const AI_FILTERS: Record<string, string> = { human: "No AI (100% human-made)", ideation: "AI-assisted ideation at most", execution: "AI-supported design" };
const RATINGS: Record<string, string> = { "4": "4.0+ rating", "4.5": "4.5+ rating" };

export default async function FindTalent({ searchParams }: { searchParams: Promise<Params> }) {
  const user = await requireUser("client");
  const params = await searchParams;
  const data = db();
  const client = clientById(user.id, data)!;
  const credits = creditsAvailable(user.id, data);
  const talent = allFreelancers(data);
  const myJobs = data.jobs.filter((j) => j.clientId === user.id && j.status === "open");

  const p = {
    q: one(params.q), category: one(params.category), skill: one(params.skill), levels: many(params.level), rate: Number(one(params.rate)) || 0,
    available: one(params.available), rating: one(params.rating), language: one(params.language), location: one(params.location), ai: one(params.ai),
    rising: one(params.rising), job: one(params.job), sort: one(params.sort),
  };
  const job = myJobs.find((j) => j.id === p.job);
  const languages = [...new Set(talent.flatMap((f) => f.profile.languages))].sort();
  const locations = [...new Set(talent.map((f) => f.profile.location.split(",")[0]!.trim()))].sort();
  const maxRate = Math.max(...talent.map((f) => f.profile.hourlyRate), 3000);

  const results = talent
    .filter((f) => {
      const text = `${f.user.name} ${f.profile.headline} ${f.profile.skills.join(" ")} ${f.profile.tools.join(" ")} ${f.profile.disciplines.join(" ")}`.toLowerCase();
      if (p.q && !text.includes(p.q.toLowerCase())) return false;
      if (p.category && !f.profile.disciplines.includes(p.category)) return false;
      if (p.skill && !f.profile.skills.concat(f.profile.tools).some((s) => s.toLowerCase() === p.skill.toLowerCase())) return false;
      if (p.levels.length && !p.levels.includes(f.profile.level)) return false;
      if (p.rate && f.profile.hourlyRate > p.rate) return false;
      if (p.available === "now" && f.profile.availability !== "now") return false;
      if (p.available === "week" && f.profile.availability === "busy") return false;
      if (p.rating && f.rating.average < Number(p.rating)) return false;
      if (p.language && !f.profile.languages.includes(p.language)) return false;
      if (p.location && !f.profile.location.startsWith(p.location)) return false;
      if (p.ai === "human" && f.ai.percent > 0) return false;
      if (p.ai === "ideation" && f.ai.label === "AI-supported") return false;
      if (p.ai === "execution" && f.ai.label !== "AI-supported") return false;
      if (p.rising && f.tier !== "Rising talent") return false;
      return true;
    })
    .map((f) => ({ f, match: job ? matchScore(f.profile, job) : undefined }));
  const sort = p.sort || (job ? "match" : "rating");
  results.sort((a, b) => sort === "match" ? (b.match?.score ?? 0) - (a.match?.score ?? 0) : sort === "rate" ? a.f.profile.hourlyRate - b.f.profile.hourlyRate : b.f.rating.average - a.f.rating.average || b.f.trust - a.f.trust);

  // Removable chips: each links to the current URL without that one filter.
  const href = (drop: string, value?: string) => {
    const qs = new URLSearchParams();
    for (const [k, v] of Object.entries(params)) for (const x of many(v)) if (!(k === drop && (value === undefined || x === value))) qs.append(k, x);
    const s = qs.toString();
    return `/client/find${s ? `?${s}` : ""}`;
  };
  const chips: { label: string; href: string }[] = [
    ...(p.q ? [{ label: `“${p.q}”`, href: href("q") }] : []),
    ...(p.category ? [{ label: p.category, href: href("category") }] : []),
    ...(p.skill ? [{ label: p.skill, href: href("skill") }] : []),
    ...p.levels.map((l) => ({ label: l, href: href("level", l) })),
    ...(p.rate ? [{ label: `Up to ₹${p.rate.toLocaleString("en-IN")}/hr`, href: href("rate") }] : []),
    ...(p.available ? [{ label: p.available === "now" ? "Available now" : "Available this week", href: href("available") }] : []),
    ...(p.rating ? [{ label: RATINGS[p.rating] ?? `${p.rating}+`, href: href("rating") }] : []),
    ...(p.language ? [{ label: p.language, href: href("language") }] : []),
    ...(p.location ? [{ label: p.location, href: href("location") }] : []),
    ...(p.ai ? [{ label: AI_FILTERS[p.ai] ?? p.ai, href: href("ai") }] : []),
    ...(p.rising ? [{ label: "Starter-credit eligible", href: href("rising") }] : []),
    ...(job ? [{ label: `Matched to “${job.title}”`, href: href("job") }] : []),
  ];
  const categoryHref = (c: string) => { const qs = new URLSearchParams(href("category").split("?")[1] ?? ""); if (c) qs.set("category", c); const s = qs.toString(); return `/client/find${s ? `?${s}` : ""}`; };

  return (
    <>
      <PageHead title="Find freelancers" description="Search verified designers by category, experience level and AI usage." actions={<Link href="/client/jobs/new" className="btn btn-primary"><Icon name="plus" size={16} /> Create a new project</Link>} />

      <div className="stack-lg">
        <form className="row" role="search" style={{ flexWrap: "wrap" }}>
          {Object.entries(params).filter(([k]) => k !== "q").flatMap(([k, v]) => many(v).map((x) => <input key={`${k}-${x}`} type="hidden" name={k} value={x} />))}
          <label className="grow" style={{ minWidth: 240 }}>
            <span className="sr-only">Search designers, skills or tools</span>
            <input className="input" type="search" name="q" defaultValue={p.q} placeholder="Search designers, skills or tools…" />
          </label>
          <Drawer
            label={<><Icon name="filter" size={16} /> Filters</>}
            title="Filters"
            count={chips.length}
            footer={<><Link href="/client/find" className="btn btn-light">Clear all</Link><button form="filters" className="btn btn-primary">Show results</button></>}
          >
            <FilterFields id="filters" p={p} languages={languages} locations={locations} maxRate={maxRate} jobs={myJobs.map((j) => ({ id: j.id, title: j.title }))} />
          </Drawer>
          <Link href="/client/saved" className="btn btn-light"><Icon name="heart" size={16} /> Saved designers ({client.profile.saved.length})</Link>
        </form>

        <nav className="chips" aria-label="Categories">
          <Link href={categoryHref("")} className={`chip chip-lg${!p.category ? " active" : ""}`} aria-current={!p.category ? "page" : undefined}>All designers</Link>
          {CATEGORY_NAMES.map((c) => <Link key={c} href={categoryHref(c)} className={`chip chip-lg${p.category === c ? " active" : ""}`} aria-current={p.category === c ? "page" : undefined}>{c}</Link>)}
        </nav>

        {chips.length > 0 && (
          <div className="row" aria-label="Active filters">
            <span className="small muted">Active filters:</span>
            {chips.map((c) => <Link key={c.label} href={c.href} className="chip active chip-remove" aria-label={`Remove filter ${c.label}`}>{c.label}<span aria-hidden="true"><Icon name="x" size={12} /></span></Link>)}
            <Link href="/client/find" className="link small">Clear all</Link>
          </div>
        )}

        <div className="row-between">
          <p className="small muted" aria-live="polite">Showing {results.length} designer{results.length === 1 ? "" : "s"} · sorted by {sort === "match" ? "best match" : sort === "rate" ? "lowest rate" : "top rated"}</p>
          <div className="segmented" aria-label="Sort">
            {job && <Link href={`${href("sort")}${href("sort").includes("?") ? "&" : "?"}sort=match`} className={sort === "match" ? "active" : ""}>Best match</Link>}
            <Link href={`${href("sort")}${href("sort").includes("?") ? "&" : "?"}sort=rating`} className={sort === "rating" ? "active" : ""}>Top rated</Link>
            <Link href={`${href("sort")}${href("sort").includes("?") ? "&" : "?"}sort=rate`} className={sort === "rate" ? "active" : ""}>Lowest rate</Link>
          </div>
        </div>

        {results.length ? (
          <div className="grid-3">
            {results.map(({ f, match }) => <FreelancerCard key={f.user.id} f={f} saved={client.profile.saved.includes(f.user.id)} match={match?.score} />)}
          </div>
        ) : (
          <Empty icon="search" title="No designers match these filters" action={<Link href="/client/find" className="btn btn-outline">Clear all filters</Link>}>Try widening availability, experience level or budget.</Empty>
        )}

        {credits > 0 && (
          <section className="card-tint row-between">
            <div className="row"><Icon name="sparkle" size={20} /><div><b>{credits} starter hire credit{credits === 1 ? "" : "s"} available</b><div className="small muted">15% off up to ₹5,000 when you hire rising talent. Pick one credit at checkout.</div></div></div>
            <Link href="/client/credits" className="btn btn-outline">View my credits</Link>
          </section>
        )}
      </div>
    </>
  );
}

function FilterFields({ id, p, languages, locations, maxRate, jobs }: {
  id: string; p: { category: string; skill: string; levels: string[]; rate: number; available: string; rating: string; language: string; location: string; ai: string; rising: string; job: string; q: string; sort: string };
  languages: string[]; locations: string[]; maxRate: number; jobs: { id: string; title: string }[];
}) {
  return (
    <form id={id} action="/client/find" className="stack-lg">
      {p.q && <input type="hidden" name="q" value={p.q} />}
      {p.sort && <input type="hidden" name="sort" value={p.sort} />}
      {jobs.length > 0 && (
        <label className="field">Match against my job<select name="job" defaultValue={p.job}><option value="">— None —</option>{jobs.map((j) => <option key={j.id} value={j.id}>{j.title}</option>)}</select></label>
      )}
      <fieldset className="stack-sm" style={{ border: 0, padding: 0, margin: 0 }}>
        <legend className="field" style={{ marginBottom: 8 }}>Category</legend>
        <div className="chips">
          <label className="chip"><input type="radio" name="category" value="" defaultChecked={!p.category} />Any</label>
          {CATEGORY_NAMES.map((c) => <label key={c} className="chip"><input type="radio" name="category" value={c} defaultChecked={p.category === c} />{c}</label>)}
        </div>
      </fieldset>
      <label className="field">Skill or tool<select name="skill" defaultValue={p.skill}><option value="">Any skill</option>{SKILLS.map((s) => <option key={s}>{s}</option>)}</select></label>
      <fieldset className="stack-sm" style={{ border: 0, padding: 0, margin: 0 }}>
        <legend className="field" style={{ marginBottom: 8 }}>Experience level</legend>
        {LEVELS.map((l) => <label key={l.value} className="check"><input type="checkbox" name="level" value={l.value} defaultChecked={p.levels.includes(l.value)} /> {l.label}</label>)}
      </fieldset>
      <label className="field">Budget — max hourly rate
        <select name="rate" defaultValue={p.rate ? String(p.rate) : ""}>
          <option value="">Any budget</option>
          {[1000, 1500, 2000, 2500, maxRate].filter((v, i, a) => a.indexOf(v) === i).map((v) => <option key={v} value={v}>Up to ₹{v.toLocaleString("en-IN")}/hr</option>)}
        </select>
      </label>
      <fieldset className="stack-sm" style={{ border: 0, padding: 0, margin: 0 }}>
        <legend className="field" style={{ marginBottom: 8 }}>Availability</legend>
        <label className="check"><input type="radio" name="available" value="" defaultChecked={!p.available} /> Any</label>
        <label className="check"><input type="radio" name="available" value="now" defaultChecked={p.available === "now"} /> {AVAILABILITY.now.label}</label>
        <label className="check"><input type="radio" name="available" value="week" defaultChecked={p.available === "week"} /> Within a week</label>
      </fieldset>
      <fieldset className="stack-sm" style={{ border: 0, padding: 0, margin: 0 }}>
        <legend className="field" style={{ marginBottom: 8 }}>Rating</legend>
        <label className="check"><input type="radio" name="rating" value="" defaultChecked={!p.rating} /> Any</label>
        {Object.entries(RATINGS).map(([v, l]) => <label key={v} className="check"><input type="radio" name="rating" value={v} defaultChecked={p.rating === v} /> {l}</label>)}
      </fieldset>
      <div className="form-grid">
        <label className="field">Language<select name="language" defaultValue={p.language}><option value="">Any</option>{languages.map((l) => <option key={l}>{l}</option>)}</select></label>
        <label className="field">Location<select name="location" defaultValue={p.location}><option value="">Anywhere</option>{locations.map((l) => <option key={l}>{l}</option>)}</select></label>
      </div>
      <fieldset className="stack-sm" style={{ border: 0, padding: 0, margin: 0 }}>
        <legend className="field" style={{ marginBottom: 8 }}>AI usage level</legend>
        <label className="check"><input type="radio" name="ai" value="" defaultChecked={!p.ai} /> Any disclosure</label>
        {Object.entries(AI_FILTERS).map(([v, l]) => <label key={v} className="check"><input type="radio" name="ai" value={v} defaultChecked={p.ai === v} /> {l}</label>)}
      </fieldset>
      <label className="setting-row" style={{ padding: 0, border: 0 }}>
        <span>Starter credit eligible only</span>
        <span className="toggle"><input type="checkbox" name="rising" value="1" defaultChecked={Boolean(p.rising)} /><span /></span>
      </label>
    </form>
  );
}
