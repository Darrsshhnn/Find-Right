import type { Metadata } from "next";
import Link from "next/link";
import Icon from "@/components/Icon";
import { FreelancerCard } from "@/components/cards";
import { Empty, PageHead } from "@/components/ui";
import { startConversation } from "@/app/actions/client";
import { requireUser } from "@/lib/auth";
import { db } from "@/lib/db";
import { freelancerById, type FreelancerView } from "@/lib/queries";

export const metadata: Metadata = { title: "Saved talent" };

export default async function Saved({ searchParams }: { searchParams: Promise<{ tab?: string }> }) {
  const user = await requireUser("client");
  const { tab = "all" } = await searchParams;
  const data = db();
  const profile = data.clients.find((c) => c.userId === user.id)!;
  const saved = profile.saved.map((id) => freelancerById(id, data)).filter((f): f is FreelancerView => Boolean(f));
  const hiredIds = [...new Set(data.projects.filter((p) => p.clientId === user.id && p.status === "completed").map((p) => p.freelancerId))];
  const hired = hiredIds.map((id) => freelancerById(id, data)).filter((f): f is FreelancerView => Boolean(f));
  const categories = [...new Set(saved.flatMap((f) => f.profile.disciplines))];
  const shown = tab === "hired" ? hired : tab === "all" ? saved : saved.filter((f) => f.profile.disciplines.includes(tab));

  return (
    <>
      <PageHead title="Saved designers" description="Freelancers you bookmarked to hire later — and the people you've worked with before." actions={<Link href="/client/find" className="btn btn-primary"><Icon name="search" size={16} /> Find more designers</Link>} />
      <nav className="pill-tabs" aria-label="Filter saved designers">
        <Link href="/client/saved" className={tab === "all" ? "active" : ""} aria-current={tab === "all" ? "page" : undefined}>All <span>{saved.length}</span></Link>
        {categories.map((c) => <Link key={c} href={`/client/saved?tab=${encodeURIComponent(c)}`} className={tab === c ? "active" : ""} aria-current={tab === c ? "page" : undefined}>{c} <span>{saved.filter((f) => f.profile.disciplines.includes(c)).length}</span></Link>)}
        <Link href="/client/saved?tab=hired" className={tab === "hired" ? "active" : ""} aria-current={tab === "hired" ? "page" : undefined}><Icon name="repeat" size={14} /> Hired before <span>{hired.length}</span></Link>
      </nav>
      {shown.length ? (
        <div className="grid-3">
          {shown.map((f) => (
            <FreelancerCard
              key={f.user.id}
              f={f}
              saved={profile.saved.includes(f.user.id)}
              actions={<>
                <form action={startConversation}><input type="hidden" name="freelancerId" value={f.user.id} /><button className="btn btn-light btn-sm"><Icon name="chat" size={14} /> Message</button></form>
                <Link href={`/client/jobs/new?invite=${f.user.id}`} className="btn btn-primary btn-sm">{tab === "hired" ? "Hire again" : "Hire"}</Link>
              </>}
            />
          ))}
        </div>
      ) : (
        <Empty icon="heart" title={tab === "hired" ? "No past hires yet" : "No saved designers yet"} action={<Link href="/client/find" className="btn btn-outline">Browse talent</Link>}>
          {tab === "hired" ? "Freelancers you complete projects with appear here for quick rehiring." : "Tap the heart on any talent card to save it here."}
        </Empty>
      )}
    </>
  );
}
