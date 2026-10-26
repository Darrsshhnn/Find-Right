import Link from "next/link";
import Chat from "./Chat";
import Icon from "./Icon";
import { AvailabilityBadge, Avatar, Empty, PageHead, ProjectStatusBadge } from "./ui";
import { db } from "@/lib/db";
import { fileSize, money, timeAgo } from "@/lib/format";
import { clientById, freelancerById } from "@/lib/queries";
import type { FileRef, User } from "@/lib/types";

const meetingLabel = (value: string) => new Date(value).toLocaleString("en-IN", { weekday: "short", day: "numeric", month: "short", hour: "numeric", minute: "2-digit", timeZone: "Asia/Kolkata" });
const upcoming = (when: string, minutes: number) => new Date(when).getTime() + minutes * 60_000 > Date.now();

export default function MessagesView({ user, selected, query = "", call = false }: { user: User; selected?: string; query?: string; call?: boolean }) {
  const data = db();
  const isClient = user.role === "client";
  const base = isClient ? "/client" : "/freelancer";
  const party = (c: (typeof data.conversations)[number]) => {
    if (isClient) {
      const f = freelancerById(c.freelancerId, data);
      return { name: f?.user.name ?? "Freelancer", avatar: f?.user.avatar, sub: f?.profile.headline ?? "", href: `/client/freelancers/${c.freelancerId}`, availability: f?.profile.availability };
    }
    const cl = clientById(c.clientId, data);
    return { name: cl?.displayName ?? "Client", avatar: undefined, sub: cl?.verified ? "Verified client" : "Client", href: "", availability: undefined };
  };
  const all = data.conversations
    .filter((c) => (isClient ? c.clientId : c.freelancerId) === user.id)
    .sort((a, b) => b.updatedAt.localeCompare(a.updatedAt));
  const conversations = query ? all.filter((c) => party(c).name.toLowerCase().includes(query.toLowerCase())) : all;

  if (!all.length) {
    return (
      <>
        <PageHead title="Messages" description="Briefs, references, calls and decisions — kept in one place instead of scattered across WhatsApp and email." />
        <Empty icon="chat" title="No conversations yet" action={<Link className="btn btn-primary" href={isClient ? "/client/find" : "/freelancer/jobs"}>{isClient ? "Find talent" : "Find work"}</Link>}>
          {isClient ? "Message a freelancer from their profile or a proposal to start discussing your project." : "Clients can message you after you apply or when they invite you to a job."}
        </Empty>
      </>
    );
  }

  const active = all.find((c) => c.id === selected) ?? conversations[0] ?? all[0]!;
  const info = party(active);
  const thread = data.messages.filter((m) => m.conversationId === active.id);
  const project = active.projectId ? data.projects.find((p) => p.id === active.projectId) : undefined;
  const job = active.jobId ? data.jobs.find((j) => j.id === active.jobId) : undefined;
  const names = Object.fromEntries(data.users.map((u) => [u.id, u.role === "client" ? clientById(u.id, data)?.displayName ?? u.name : u.name]));
  const nextMeeting = thread.filter((m) => m.meeting && upcoming(m.meeting.when, m.meeting.minutes)).sort((a, b) => a.meeting!.when.localeCompare(b.meeting!.when))[0];
  const sharedFiles: FileRef[] = [
    ...thread.flatMap((m) => m.files ?? []),
    ...(project ? project.deliveries.flatMap((d) => d.files.filter((f) => f.id !== "seed")) : []),
  ];
  const paid = project ? project.milestones.filter((m) => m.status === "released").reduce((s, m) => s + m.amount, 0) : 0;
  const callHref = `${base}/messages?c=${active.id}&call=1`;

  return (
    <>
      <h1 className="sr-only">Messages</h1>
      <div className="chat-layout chat-full">
        <nav className="chat-list" aria-label="Conversations">
          <form className="chat-search" role="search">
            <input type="hidden" name="c" value={active.id} />
            <label className="sr-only" htmlFor="chat-search">Search chats</label>
            <input id="chat-search" className="input" type="search" name="q" defaultValue={query} placeholder="Search chats" />
          </form>
          {conversations.map((c) => {
            const p = party(c);
            const last = data.messages.filter((m) => m.conversationId === c.id).at(-1);
            return (
              <Link key={c.id} href={`${base}/messages?c=${c.id}`} className={c.id === active.id ? "active" : ""} aria-current={c.id === active.id ? "true" : undefined}>
                <Avatar name={p.name} src={p.avatar} />
                <span className="grow" style={{ minWidth: 0 }}>
                  <b className="truncate">{p.name}</b>
                  <small className="truncate">{last ? (last.files?.length && !last.text ? "📎 Attachment" : last.text) : "No messages yet"}</small>
                </span>
                <small>{timeAgo(c.updatedAt)}</small>
              </Link>
            );
          })}
          {conversations.length === 0 && <p className="small muted" style={{ padding: 16 }}>No chats match “{query}”.</p>}
        </nav>

        <Chat
          key={`${active.id}-${call}`}
          conversationId={active.id}
          meId={user.id}
          initial={thread}
          names={names}
          otherName={info.name}
          callHref={callHref}
          autoCall={call}
          agenda={nextMeeting?.meeting?.agenda}
          header={
            <div className="row" style={{ minWidth: 0 }}>
              <Avatar name={info.name} src={info.avatar} size="sm" />
              <div style={{ minWidth: 0 }}>
                <b>{info.href ? <Link href={info.href}>{info.name}</Link> : info.name}</b>
                <div className="small muted truncate">{project ? project.title : job ? job.title : info.sub}</div>
              </div>
              {info.availability && <span className="hide-mobile"><AvailabilityBadge value={info.availability} /></span>}
            </div>
          }
        />

        <aside className="chat-side" aria-label="Project details">
          <b>Project</b>
          {project ? (
            <Link href={`${base}/projects/${project.id}`} className="card-tint stack-sm">
              <b>{project.title}</b>
              <ProjectStatusBadge status={project.status} />
              <div className="kv">
                <div><span>Contract</span><b>{money(project.price)}</b></div>
                <div><span>Progress</span><b>{Math.round((paid / project.price) * 100)}%</b></div>
              </div>
            </Link>
          ) : job ? (
            <Link href={isClient ? `/client/jobs/${job.id}` : `/freelancer/jobs/${job.id}`} className="card-flat stack-sm"><b>{job.title}</b><span className="small muted">Discussing before hiring</span></Link>
          ) : <p className="small muted">No project linked yet.</p>}
          <div className="card-flat stack-sm">
            <b className="row"><Icon name="calendar" size={16} /> Upcoming meeting</b>
            {nextMeeting?.meeting ? (
              <>
                <span>{nextMeeting.meeting.title}</span>
                <span className="small muted">{meetingLabel(nextMeeting.meeting.when)} IST</span>
                <Link href={callHref} className="btn btn-primary btn-sm"><Icon name="video" size={16} /> Join video call</Link>
              </>
            ) : <span className="small muted">Nothing scheduled.</span>}
          </div>
          <b>Shared files</b>
          {sharedFiles.length ? sharedFiles.slice(-8).reverse().map((f) => (
            <a key={f.id} href={`/api/files/${f.id}`} target="_blank" rel="noreferrer" className="row small link" style={{ flexWrap: "nowrap" }}>
              <Icon name="file" size={16} /><span className="truncate grow">{f.name}</span><span className="muted">{fileSize(f.size)}</span>
            </a>
          )) : <span className="small muted">Files you share appear here.</span>}
        </aside>
      </div>
    </>
  );
}
