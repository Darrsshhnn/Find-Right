import type { Metadata } from "next";
import AccountSecurity from "@/components/AccountSecurity";
import EmailChange from "@/components/EmailChange";
import Icon from "@/components/Icon";
import { ActionForm, Submit } from "@/components/ActionForm";
import { ReviewCard } from "@/components/cards";
import { AiMeter, AvailabilityBadge, PageHead, SectionTitle, Tabs } from "@/components/ui";
import { setAvailability, updateAiDisclosure, updateFreelancerSettings } from "@/app/actions/freelancer";
import { requireUser } from "@/lib/auth";
import { AI_LEVELS, AVAILABILITY, DISCIPLINES } from "@/lib/constants";
import { db } from "@/lib/db";
import { freelancerById } from "@/lib/queries";
import type { Availability } from "@/lib/types";

export const metadata: Metadata = { title: "Settings" };

export default async function FreelancerSettings({ searchParams }: { searchParams: Promise<{ tab?: string }> }) {
  const user = await requireUser("freelancer");
  const { tab = "ai" } = await searchParams;
  const data = db();
  const f = freelancerById(user.id, data)!;
  const p = f.profile;
  const received = data.reviews.filter((r) => r.toId === user.id);
  const given = data.reviews.filter((r) => r.fromId === user.id);

  return (
    <>
      <PageHead eyebrow="Freelancer account" title="Account & settings" />
      <Tabs active={tab} items={[
        { key: "ai", label: "AI usage disclosure", icon: "bot", href: "/freelancer/settings?tab=ai" },
        { key: "availability", label: "Availability", icon: "calendar", href: "/freelancer/settings?tab=availability" },
        { key: "reputation", label: "Reputation (two-way)", icon: "star", href: "/freelancer/settings?tab=reputation" },
        { key: "account", label: "Account & privacy", icon: "user", href: "/freelancer/settings?tab=account" },
      ]} />

      {tab === "ai" && (
        <ActionForm action={updateAiDisclosure} className="stack-lg" style={{ maxWidth: 900 }}>
          <section className="card-tint row" style={{ alignItems: "flex-start" }}>
            <Icon name="bot" size={28} />
            <div className="grow stack-sm"><b>Public AI usage disclosure per discipline</b><p className="small">Instead of hiding AI or making vague claims, self-report your level per category. Badges appear on your profile, proposals and contracts so clients hire with confidence — and can&apos;t later claim your human work was AI-made.</p></div>
          </section>
          <section className="card stack">
            <AiMeter percent={f.ai.percent} label={f.ai.label} />
            {p.disciplines.map((d) => (
              <div key={d} className="row-between" style={{ paddingBottom: 16, borderBottom: "1px solid var(--line)" }}>
                <div><b>{d}</b><p className="small muted">{DISCIPLINES.find((x) => x.name === d)?.description}</p></div>
                <div className="segmented">{AI_LEVELS.map((a) => <label key={a.value} title={a.detail}><input type="radio" name={`ai:${d}`} value={a.value} defaultChecked={(p.ai[d] ?? "No AI") === a.value} />{a.value}</label>)}</div>
              </div>
            ))}
            <label className="field">Describe your process<textarea name="aiProcess" defaultValue={p.aiProcess} /></label>
            <div><Submit pending="Publishing…">Publish disclosure</Submit></div>
          </section>
        </ActionForm>
      )}

      {tab === "availability" && (
        <ActionForm action={setAvailability} className="card stack" style={{ maxWidth: 760 }}>
          <div className="row-between"><SectionTitle icon="calendar">Current availability</SectionTitle><AvailabilityBadge value={p.availability} /></div>
          <p className="muted small">Clients with urgent projects filter for freelancers who are available now. Keep this accurate to get the right invitations.</p>
          <div className="options">
            {(Object.keys(AVAILABILITY) as Availability[]).map((k) => (
              <label className="option" key={k}><input type="radio" name="availability" value={k} defaultChecked={p.availability === k} /><b>{AVAILABILITY[k].label}</b><small>{k === "now" ? "Ready to start within 24–48 hours" : k === "week" ? "Can start within the next 7 days" : "Hidden from urgent searches"}</small></label>
            ))}
          </div>
          <div><Submit pending="Saving…">Update availability</Submit></div>
        </ActionForm>
      )}

      {tab === "reputation" && (
        <div className="grid-2">
          <section className="stack"><div className="row-between"><SectionTitle icon="star">Ratings received ({received.length})</SectionTitle><span className="small muted">From clients</span></div>{received.length ? received.map((r) => <ReviewCard key={r.id} review={r} author={data.users.find((u) => u.id === r.fromId)} project={data.projects.find((x) => x.id === r.projectId)?.title} />) : <p className="muted small">No ratings yet.</p>}</section>
          <section className="stack"><div className="row-between"><SectionTitle icon="award">Ratings given ({given.length})</SectionTitle><span className="small muted">To clients</span></div>{given.length ? given.map((r) => <ReviewCard key={r.id} review={r} author={user} project={data.projects.find((x) => x.id === r.projectId)?.title} />) : <p className="muted small">You rate clients after each completed contract.</p>}</section>
        </div>
      )}

      {tab === "account" && (
        <div className="stack-lg" style={{ maxWidth: 760 }}>
          <ActionForm action={updateFreelancerSettings} className="card stack">
            <SectionTitle icon="bell">Privacy & notifications</SectionTitle>
            <div>
              {([["publicProfile", "Public profile visibility", "Allow verified clients to discover your profile and portfolio."], ["projectAlerts", "Project & invitation alerts", "Notify me about invitations, offers and matched jobs."], ["messageAlerts", "Message alerts", "Notify me about new messages and scheduled calls."]] as const).map(([key, title, detail]) => (
                <label className="setting-row" key={key}>
                  <span><b>{title}</b><br /><span className="small muted">{detail}</span></span>
                  <span className="toggle"><input type="checkbox" name={key} defaultChecked={p.settings[key]} /><span /></span>
                </label>
              ))}
            </div>
            <div><Submit pending="Saving…">Save preferences</Submit></div>
          </ActionForm>
          <section className="card stack"><SectionTitle icon="mail">Email address</SectionTitle><EmailChange currentEmail={user.email} pendingEmail={user.pendingEmail?.email} /></section>
          <AccountSecurity />
        </div>
      )}
    </>
  );
}
