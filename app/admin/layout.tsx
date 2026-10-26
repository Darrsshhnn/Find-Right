import Shell from "@/components/Shell";
import { requireUser } from "@/lib/auth";

export default async function AdminLayout({ children }: { children: React.ReactNode }) {
  const user = await requireUser("admin");
  return (
    <Shell user={user} subtitle="Trust & safety" nav={[{ href: "/admin", icon: "shield", label: "Trust console", short: "Trust", exact: true }]} menu={[]}>
      {children}
    </Shell>
  );
}
