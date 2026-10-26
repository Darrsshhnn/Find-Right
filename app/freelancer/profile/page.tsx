import type { Metadata } from "next";
import Icon from "@/components/Icon";
import ProfileBody from "@/components/ProfileBody";
import { ActionForm, Submit } from "@/components/ActionForm";
import { PortfolioCard, PortfolioLinks } from "@/components/cards";
import { PageHead, Tabs } from "@/components/ui";
import { addExperience, addPortfolioItem, addPortfolioLink, removeExperience, removePortfolioItem, removePortfolioLink, updateFreelancerProfile } from "@/app/actions/freelancer";
import { requireUser } from "@/lib/auth";
import { AI_LEVELS, CATEGORY_NAMES, LEVELS } from "@/lib/constants";
import { freelancerById } from "@/lib/queries";

export const metadata: Metadata = { title: "Profile & portfolio" };

export default async function FreelancerProfilePage({ searchParams }: { searchParams: Promise<{ tab?: string; reviews?: string }> }) {
  const user = await requireUser("freelancer");
  const { tab = "preview", reviews } = await searchParams;
  const f = freelancerById(user.id)!;
  const p = f.profile;

  return (
    <>
      <PageHead eyebrow="Your public profile" title="Profile & portfolio" description="Clients see your skills, experience inside and outside FindRight, client-verified work, two-way reviews and AI usage." />
      <Tabs active={tab} items={[
        { key: "preview", label: "Public preview", href: "/freelancer/profile?tab=preview" },
        { key: "details", label: "Edit details", href: "/freelancer/profile?tab=details" },
        { key: "portfolio", label: "Portfolio", href: "/freelancer/profile?tab=portfolio", count: p.portfolio.length },
        { key: "experience", label: "Experience", href: "/freelancer/profile?tab=experience", count: p.experience.length },
      ]} />

      {tab === "preview" && <ProfileBody f={f} reviewPage={Number(reviews) || 1} pageHref={(n) => `/freelancer/profile?reviews=${n}#reviews`} />}

      {tab === "details" && (
        <ActionForm action={updateFreelancerProfile} className="card stack" style={{ maxWidth: 900 }}>
          <div className="form-grid">
            <label className="field">Full name<input name="name" defaultValue={user.name} /></label>
            <label className="field">Professional title<input name="headline" defaultValue={p.headline} /></label>
            <label className="field">Location<input name="location" defaultValue={p.location} /></label>
            <label className="field">Experience level<select name="level" defaultValue={p.level}>{LEVELS.map((l) => <option key={l.value} value={l.value}>{l.label}</option>)}</select></label>
            <label className="field">Years of experience<input type="number" min="0" name="years" defaultValue={p.years} /></label>
            <label className="field">Indicative hourly rate (₹)<input type="number" min="0" name="hourlyRate" defaultValue={p.hourlyRate} /></label>
            <label className="field full">Bio<textarea name="bio" defaultValue={p.bio} /></label>
            <label className="field full">Skills (comma separated)<input name="skills" defaultValue={p.skills.join(", ")} /></label>
            <label className="field">Tools<input name="tools" defaultValue={p.tools.join(", ")} /></label>
            <label className="field">Languages<input name="languages" defaultValue={p.languages.join(", ")} /></label>
            <label className="field full">Education<input name="education" defaultValue={p.education} /></label>
          </div>
          <div className="stack-sm">
            <b className="small">Disciplines</b>
            <div className="chips">{CATEGORY_NAMES.map((c) => <label key={c} className="chip"><input type="checkbox" name="disciplines" value={c} defaultChecked={p.disciplines.includes(c)} />{c}</label>)}</div>
            <span className="hint">New disciplines start as “No AI” — update them in Settings → AI disclosure.</span>
          </div>
          <div><Submit pending="Saving…">Save profile</Submit></div>
        </ActionForm>
      )}

      {tab === "portfolio" && (
        <div className="layout-aside">
          <section className="stack">
            <div className="card stack">
              <div className="row-between">
                <div><h3>Portfolio links</h3><p className="small muted">Link portfolios you host outside FindRight — Behance, Dribbble, your own site.</p></div>
                <span className="badge">{(p.links ?? []).length}/6</span>
              </div>
              {(p.links ?? []).length > 0 && (
                <PortfolioLinks links={p.links!} action={(id) => (
                  <ActionForm action={removePortfolioLink} showOk={false}><input type="hidden" name="linkId" value={id} /><Submit className="icon-btn link-remove" pending="…" aria-label="Remove link"><Icon name="x" size={14} /></Submit></ActionForm>
                )} />
              )}
              <ActionForm action={addPortfolioLink} className="link-form" resetOnOk>
                <label className="field">Link<input name="url" type="url" inputMode="url" placeholder="https://behance.net/yourname" required /></label>
                <label className="field">Label<input name="label" placeholder="Optional, e.g. Behance" maxLength={40} /></label>
                <Submit className="btn btn-outline" pending="Adding…"><Icon name="plus" size={16} /> Add link</Submit>
              </ActionForm>
            </div>
            {p.portfolio.length ? (
              <div className="grid-2 portfolio-grid">
                {p.portfolio.map((item) => (
                  <PortfolioCard key={item.id} item={item}>
                    <ActionForm action={removePortfolioItem} showOk={false}><input type="hidden" name="itemId" value={item.id} /><Submit className="btn btn-ghost btn-sm"><Icon name="trash" size={14} /> Remove</Submit></ActionForm>
                  </PortfolioCard>
                ))}
              </div>
            ) : <p className="muted">No portfolio pieces yet.</p>}
          </section>
          <aside>
            <ActionForm action={addPortfolioItem} className="card stack" resetOnOk>
              <h3>Add a portfolio piece</h3>
              <label className="field">Title<input name="title" placeholder="Brand identity for …" /></label>
              <label className="field">Category<select name="category">{p.disciplines.map((d) => <option key={d}>{d}</option>)}</select></label>
              <label className="field">Cover image<input type="file" name="image" accept="image/png,image/jpeg,image/webp,image/gif" /></label>
              <label className="field">Description or link<textarea name="description" style={{ minHeight: 80 }} placeholder="What was the brief and your role? Or paste a Behance/Dribbble link." /></label>
              <label className="field">Tags<input name="tags" placeholder="Packaging, Print" /></label>
              <label className="field">AI used<select name="ai">{AI_LEVELS.map((a) => <option key={a.value}>{a.value}</option>)}</select></label>
              <Submit pending="Uploading…"><Icon name="upload" size={16} /> Publish piece</Submit>
              <p className="small muted">Tip: completed FindRight contracts can be added as <b>client-verified</b> pieces from the project page.</p>
            </ActionForm>
          </aside>
        </div>
      )}

      {tab === "experience" && (
        <div className="layout-aside">
          <section className="stack">
            {p.experience.length ? p.experience.map((e) => (
              <article key={e.id} className="card row-between" style={{ alignItems: "flex-start" }}>
                <div className="stack-sm" style={{ gap: 2 }}><b>{e.title}</b><span className="small muted">{e.organisation} · {e.period}</span>{e.description && <p className="small">{e.description}</p>}</div>
                <ActionForm action={removeExperience} showOk={false}><input type="hidden" name="experienceId" value={e.id} /><Submit className="btn btn-ghost btn-sm">Remove</Submit></ActionForm>
              </article>
            )) : <p className="muted">Add work you&apos;ve done outside FindRight — jobs, internships, agency or freelance work.</p>}
          </section>
          <aside>
            <ActionForm action={addExperience} className="card stack" resetOnOk>
              <h3>Add experience outside FindRight</h3>
              <label className="field">Role<input name="title" placeholder="UI Designer" /></label>
              <label className="field">Organisation<input name="organisation" placeholder="Studio, company or “Independent”" /></label>
              <label className="field">Period<input name="period" placeholder="2023 — Present" /></label>
              <label className="field">What you did<textarea name="description" style={{ minHeight: 80 }} /></label>
              <Submit pending="Adding…">Add experience</Submit>
            </ActionForm>
          </aside>
        </div>
      )}
    </>
  );
}
