import Link from "next/link";
import Icon from "@/components/Icon";
import Shell from "@/components/Shell";
import { requireUser } from "@/lib/auth";
import { db } from "@/lib/db";
import { runAutoRelease } from "@/lib/events";
import { clientById } from "@/lib/queries";

export default async function ClientLayout({ children }: { children: React.ReactNode }) {
  const user = await requireUser("client");
  runAutoRelease();
  const data = db();
  const client = clientById(user.id, data)!;
  const myJobs = data.jobs.filter((j) => j.clientId === user.id);
  const newProposals = data.proposals.filter((p) => p.status === "pending" && myJobs.some((j) => j.id === p.jobId && j.status === "open")).length;
  const needsAction = data.projects.filter((p) => p.clientId === user.id && (p.status === "awaiting_funding" || p.milestones.some((m) => m.status === "submitted"))).length;

  return (
    <Shell
      user={user}
      subtitle={client.displayName === user.name ? "Client account" : client.displayName}
      messagesHref="/client/messages"
      cta={<Link href="/client/jobs/new" className="btn btn-primary btn-sm"><Icon name="plus" size={16} /> Post a job</Link>}
      nav={[
        { href: "/client", icon: "home", label: "Home", exact: true },
        { href: "/client/find", icon: "search", label: "Find talent", short: "Find" },
        { href: "/client/jobs", icon: "briefcase", label: "Jobs", count: newProposals },
        { href: "/client/projects", icon: "folder", label: "Projects", count: needsAction },
        { href: "/client/saved", icon: "heart", label: "Saved" },
        { href: "/client/messages", icon: "chat", label: "Chat" },
      ]}
      bottomNav={[
        { href: "/client/profile", icon: "user", label: "Profile" },
        { href: "/client/settings", icon: "settings", label: "Settings" },
      ]}
      menu={[
        { href: "/client/profile", label: "Profile & company", icon: "user" },
        { href: "/client/payments", label: "Payments & receipts", icon: "wallet" },
        { href: "/client/credits", label: "Starter credits", icon: "sparkle" },
        { href: "/client/demo", label: "Hiring demo", icon: "zap" },
        { href: "/client/settings", label: "Settings", icon: "settings" },
        { href: "/client/support", label: "Help & support", icon: "help" },
      ]}
    >
      {children}
    </Shell>
  );
}
