import Link from "next/link";
import { Avatar, Empty, ProjectStatusBadge, Tabs } from "./ui";
import { db } from "@/lib/db";
import { money, shortDate } from "@/lib/format";
import { clientById, freelancerById } from "@/lib/queries";
import type { User } from "@/lib/types";

const GROUPS: Record<string, string[]> = {
  active: ["active", "awaiting_funding", "offer", "disputed"],
  completed: ["completed"],
  archived: ["declined", "cancelled"],
};

export default function ProjectList({ user, tab }: { user: User; tab: string }) {
  const data = db();
  const isClient = user.role === "client";
  const base = isClient ? "/client" : "/freelancer";
  const all = data.projects.filter((p) => (isClient ? p.clientId : p.freelancerId) === user.id);
  const group = GROUPS[tab] ? tab : "active";
  const shown = all.filter((p) => GROUPS[group]!.includes(p.status));

  return (
    <>
      <Tabs active={group} items={[
        { key: "active", label: "Active & offers", href: `${base}/projects?tab=active`, count: all.filter((p) => GROUPS.active!.includes(p.status)).length },
        { key: "completed", label: "Completed", href: `${base}/projects?tab=completed`, count: all.filter((p) => p.status === "completed").length },
        { key: "archived", label: "Archived", href: `${base}/projects?tab=archived`, count: all.filter((p) => GROUPS.archived!.includes(p.status)).length },
      ]} />
      {shown.length ? (
        <div className="table-wrap">
          <table>
            <thead><tr><th>Project</th><th>{isClient ? "Freelancer" : "Client"}</th><th>Status</th><th>Progress</th><th>Total</th><th>Due</th></tr></thead>
            <tbody>
              {shown.map((p) => {
                const f = freelancerById(p.freelancerId, data);
                const c = clientById(p.clientId, data);
                const released = p.milestones.filter((m) => m.status === "released").length;
                const action = isClient
                  ? p.status === "awaiting_funding" ? "Pay advance" : p.milestones.some((m) => m.status === "submitted") ? "Review delivery" : ""
                  : p.status === "offer" ? "Review offer" : p.milestones.some((m) => m.status === "funded" || m.status === "changes") ? "Deliver" : "";
                return (
                  <tr key={p.id}>
                    <td><Link href={`${base}/projects/${p.id}`} className="stack-sm" style={{ gap: 2, display: "grid" }}><b>{p.title}</b>{action && <span className="badge badge-amber" style={{ justifySelf: "start" }}>{action}</span>}</Link></td>
                    <td><div className="row" style={{ flexWrap: "nowrap" }}><Avatar name={isClient ? f?.user.name ?? "" : c?.displayName ?? ""} src={isClient ? f?.user.avatar : undefined} size="sm" /><span className="nowrap">{isClient ? f?.user.name : c?.displayName}</span></div></td>
                    <td><ProjectStatusBadge status={p.status} /></td>
                    <td style={{ minWidth: 120 }}><div className="bar bar-green"><i style={{ width: `${(released / p.milestones.length) * 100}%` }} /></div><span className="small muted">{released}/{p.milestones.length} milestones paid</span></td>
                    <td className="nowrap"><b>{money(isClient ? p.price - p.discount : p.price)}</b></td>
                    <td className="nowrap">{shortDate(p.deadline)}</td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      ) : (
        <Empty icon="folder" title="Nothing here yet" action={<Link className="btn btn-primary" href={isClient ? "/client/jobs" : "/freelancer/jobs"}>{isClient ? "Review proposals" : "Find work"}</Link>}>
          {isClient ? "When you send a contract to a freelancer it appears here with milestones, deliveries and payments." : "Contracts appear here once a client sends you an offer."}
        </Empty>
      )}
    </>
  );
}
