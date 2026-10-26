import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import Icon from "@/components/Icon";
import SaveHeart from "@/components/SaveHeart";
import { PortfolioCard } from "@/components/cards";
import { AiBadge, Avatar, Rating } from "@/components/ui";
import { requireUser } from "@/lib/auth";
import { db } from "@/lib/db";
import { money, shortDate } from "@/lib/format";
import { freelancerById } from "@/lib/queries";

export const metadata: Metadata = { title: "Project" };

export default async function WorkItem({ params }: { params: Promise<{ id: string; itemId: string }> }) {
  const user = await requireUser("client");
  const { id, itemId } = await params;
  const data = db();
  const f = freelancerById(id, data);
  const item = f?.profile.portfolio.find((p) => p.id === itemId);
  if (!f || !item) notFound();
  const saved = data.clients.find((c) => c.userId === user.id)?.saved.includes(id) ?? false;
  const project = item.projectId ? data.projects.find((p) => p.id === item.projectId) : undefined;
  const review = project ? data.reviews.find((r) => r.projectId === project.id && r.toId === id) : undefined;
  const images = item.images?.length ? item.images : item.image ? [item.image] : [];
  const more = f.profile.portfolio.filter((p) => p.id !== itemId).slice(0, 3);
  const isLink = /^https?:\/\//.test(item.description);

  return (
    <>
      <Link href={`/client/freelancers/${id}`} className="back"><Icon name="arrowLeft" size={14} /> Back to {f.user.name}&apos;s profile</Link>
      <div className="layout-aside">
        <article className="stack-lg">
          <header className="stack-sm">
            <div className="row">
              <span className="badge">{item.category}</span>
              <AiBadge level={item.ai} />
              {item.source === "platform" ? <span className="badge badge-dark"><Icon name="shield" size={12} /> Verified FindRight contract</span> : <span className="badge badge-outline">Outside FindRight</span>}
            </div>
            <h1>{item.title}</h1>
            {item.clientName && <p className="muted">Delivered for {item.clientName}{project?.completedAt ? ` · ${shortDate(project.completedAt)}` : ""}</p>}
          </header>
          {images.length ? (
            <div className="gallery">{images.map((src, i) => <img key={src} src={src} alt={`${item.title} — image ${i + 1} of ${images.length}`} />)}</div>
          ) : <div className="empty"><span className="icon-tile"><Icon name={isLink ? "link" : "image"} size={24} /></span><p>No images uploaded for this project.</p></div>}
          <section className="card stack">
            <h2>About this project</h2>
            {isLink ? <a className="link" href={item.description} target="_blank" rel="noreferrer noopener">{item.description} <Icon name="external" size={14} /></a> : <p style={{ color: "var(--ink-2)" }}>{item.description || "No description provided."}</p>}
            {item.tags.length > 0 && <div className="chips">{item.tags.map((t) => <span key={t} className="tag">{t}</span>)}</div>}
          </section>
          {review && (
            <section className="card-tint stack-sm">
              <b>Client review</b>
              <p>“{review.text}”</p>
              <span className="small muted">★ {review.rating.toFixed(1)} · {item.clientName}</span>
            </section>
          )}
          {more.length > 0 && (
            <section className="stack">
              <h2>More from {f.user.name.split(" ")[0]}</h2>
              <div className="grid-3">{more.map((p) => <PortfolioCard key={p.id} item={p} href={`/client/freelancers/${id}/work/${p.id}`} />)}</div>
            </section>
          )}
        </article>
        <aside>
          <section className="card stack">
            <div className="row-between" style={{ flexWrap: "nowrap" }}>
              <div className="fl-id"><Avatar name={f.user.name} src={f.user.avatar} size="lg" /><div><b>{f.user.name}</b><small>{f.profile.headline}</small></div></div>
              <SaveHeart freelancerId={id} name={f.user.name} saved={saved} />
            </div>
            <Rating {...f.rating} />
            <div className="kv">
              <div><span>Category</span><b>{item.category}</b></div>
              <div><span>Tools</span><b>{(item.tools?.length ? item.tools : f.profile.tools).slice(0, 4).join(", ") || "—"}</b></div>
              <div><span>AI usage</span><b>{item.ai === "No AI" ? "100% human-made" : item.ai}</b></div>
              <div><span>Verified</span><b>{item.source === "platform" ? "Yes — paid contract" : "Self-reported"}</b></div>
              <div><span>Rate</span><b>{money(f.profile.hourlyRate)}/hr</b></div>
            </div>
            <Link href={`/client/jobs/new?invite=${id}`} className="btn btn-primary btn-block"><Icon name="check" size={16} /> Hire {f.user.name.split(" ")[0]}</Link>
            <Link href={`/client/freelancers/${id}`} className="btn btn-outline btn-block">View full profile</Link>
          </section>
        </aside>
      </div>
    </>
  );
}
