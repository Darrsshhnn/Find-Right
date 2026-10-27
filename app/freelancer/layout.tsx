import Shell from "@/components/Shell";
import { requireUser } from "@/lib/auth";
import { db } from "@/lib/db";
import { runAutoRelease } from "@/lib/events";
import { freelancerById } from "@/lib/queries";

export default async function FreelancerLayout({ children }: { children: React.ReactNode }) {
  const user = await requireUser("freelancer");
  runAutoRelease();
  const data = db();
  const f = freelancerById(user.id, data)!;
  const invites = data.invitations.filter((i) => i.freelancerId === user.id && i.status === "pending" && data.jobs.find((j) => j.id === i.jobId)?.status === "open").length;
  const todo = data.projects.filter((p) => p.freelancerId === user.id && (p.status === "offer" || p.milestones.some((m) => m.status === "funded" || m.status === "changes"))).length;

  return (
    <Shell
      user={user}
      subtitle={`${f.tier} freelancer`}
      messagesHref="/freelancer/messages"
      nav={[
        { href: "/freelancer", icon: "home", label: "Home", exact: true },
        { href: "/freelancer/jobs", icon: "search", label: "Find work", short: "Work" },
        { href: "/freelancer/invitations", icon: "mail", label: "Invitations", short: "Invites", count: invites },
        { href: "/freelancer/proposals", icon: "send", label: "Proposals" },
        { href: "/freelancer/projects", icon: "folder", label: "Projects", count: todo },
        { href: "/freelancer/messages", icon: "chat", label: "Chat" },
        { href: "/freelancer/analytics", icon: "chart", label: "Analytics", short: "Stats" },
      ]}
      bottomNav={[
        { href: "/freelancer/profile", icon: "user", label: "Profile" },
        { href: "/freelancer/settings", icon: "settings", label: "Settings" },
      ]}
      menu={[
        { href: "/freelancer/profile", label: "Profile & portfolio", icon: "user" },
        { href: "/freelancer/analytics", label: "Analytics", icon: "chart" },
        { href: "/freelancer/earnings", label: "Earnings & payouts", icon: "wallet" },
        { href: "/freelancer/progression", label: "Trust & progression", icon: "award" },
        { href: "/freelancer/settings", label: "Settings", icon: "settings" },
        { href: "/freelancer/support", label: "Help & support", icon: "help" },
      ]}
    >
      {children}
    </Shell>
  );
}
