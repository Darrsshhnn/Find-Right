import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import Icon from "@/components/Icon";
import ProfileBody from "@/components/ProfileBody";
import { ActionForm, Submit } from "@/components/ActionForm";
import { inviteFreelancer, startConversation, toggleSaved } from "@/app/actions/client";
import { requireUser } from "@/lib/auth";
import { db } from "@/lib/db";
import { money } from "@/lib/format";
import { clientById, creditsAvailable, freelancerById, matchScore } from "@/lib/queries";

export async function generateMetadata({ params }: { params: Promise<{ id: string }> }): Promise<Metadata> {
  const { id } = await params;
  return { title: freelancerById(id)?.user.name ?? "Freelancer" };
}

export default async function FreelancerProfile({ params, searchParams }: { params: Promise<{ id: string }>; searchParams: Promise<{ reviews?: string }> }) {
  const user = await requireUser("client");
  const { id } = await params;
  const reviewPage = Number((await searchParams).reviews) || 1;
  const data = db();
  const f = freelancerById(id, data);
  if (!f) notFound();
  const client = clientById(user.id, data)!;
  const saved = client.profile.saved.includes(id);
  const openJobs = data.jobs.filter((j) => j.clientId === user.id && j.status === "open" && !data.invitations.some((i) => i.jobId === j.id && i.freelancerId === id) && !data.proposals.some((p) => p.jobId === j.id && p.freelancerId === id));
  const bestMatch = openJobs.map((j) => ({ j, m: matchScore(f.profile, j) })).sort((a, b) => b.m.score - a.m.score)[0];

  return (
    <>
      <Link href="/client/find" className="back"><Icon name="arrowLeft" size={14} /> Back to talent</Link>
      <div className="layout-aside">
        <ProfileBody f={f} reviewPage={reviewPage} pageHref={(n) => `/client/freelancers/${id}?reviews=${n}#reviews`} workHref={(item) => `/client/freelancers/${id}/work/${item}`} />
        <aside>
          <section className="card stack">
            <div><span className="small muted">Indicative rate</span><div className="price" style={{ fontSize: 26 }}>{money(f.profile.hourlyRate)}<span className="small muted" style={{ fontWeight: 400 }}>/hour</span></div></div>
            <div className="kv">
              <div><span>Experience</span><b>{f.profile.level}</b></div>
              <div><span>Typical revisions</span><b>2 rounds</b></div>
              <div><span>Payment</span><b>Advance + escrow</b></div>
            </div>
            {bestMatch && <p className="card-tint small"><b>{bestMatch.m.score}% match</b> for “{bestMatch.j.title}” — {bestMatch.m.reasons.join(" · ") || "partial fit"}</p>}
            {openJobs.length ? (
              <ActionForm action={inviteFreelancer} className="stack">
                <input type="hidden" name="freelancerId" value={id} />
                <label className="field">Invite to a job<select name="jobId" defaultValue={bestMatch?.j.id}>{openJobs.map((j) => <option key={j.id} value={j.id}>{j.title}</option>)}</select></label>
                <label className="field">Personal note<textarea name="message" style={{ minHeight: 80 }} defaultValue={`Hi ${f.user.name.split(" ")[0]}, your work looks like a great fit for this brief. Would you like to send a proposal?`} /></label>
                <Submit pending="Sending…"><Icon name="send" size={16} /> Send direct invitation</Submit>
              </ActionForm>
            ) : (
              <Link href={`/client/jobs/new?invite=${id}`} className="btn btn-primary"><Icon name="plus" size={16} /> Post a job & invite {f.user.name.split(" ")[0]}</Link>
            )}
            <form action={startConversation}><input type="hidden" name="freelancerId" value={id} /><button className="btn btn-outline btn-block"><Icon name="chat" size={16} /> Send message</button></form>
            <ActionForm action={toggleSaved}><input type="hidden" name="freelancerId" value={id} /><Submit className="btn btn-ghost btn-block"><Icon name="heart" size={16} /> {saved ? "Saved — remove" : "Save to shortlist"}</Submit></ActionForm>
          </section>
          {creditsAvailable(user.id, data) > 0 && (
            <section className="card-tint stack-sm"><b><Icon name="sparkle" size={15} /> Starter credit eligible</b><p className="small">Use one 15% OFF credit (up to ₹5,000) when you hire. {f.user.name.split(" ")[0]} still receives their full fee.</p></section>
          )}
          <section className="card stack-sm"><b><Icon name="lock" size={15} /> Protected by escrow</b><p className="small muted">The advance goes to the freelancer when work starts; every later milestone is held until you approve the delivery.</p></section>
        </aside>
      </div>
    </>
  );
}
