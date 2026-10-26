import Link from "next/link";
import MobileMenu from "./MobileMenu";
import { Logo } from "./ui";
import { currentUser, homeFor } from "@/lib/auth";

const SITE_LINKS = [
  { href: "/#how", label: "How it works", icon: "layers" },
  { href: "/#trust", label: "Our promise", icon: "shield" },
  { href: "/#reviews", label: "Reviews", icon: "star" },
  { href: "/signup?role=freelancer", label: "For freelancers", icon: "sparkle" },
];

export default async function PublicHeader({ minimal = false }: { minimal?: boolean }) {
  const user = await currentUser();
  return (
    <header className="public-header">
      <div className="container">
        <Logo />
        {!minimal && (
          <nav className="public-nav" aria-label="Site">
            {SITE_LINKS.map((l) => <Link key={l.href} href={l.href}>{l.label}</Link>)}
          </nav>
        )}
        <div className="public-actions">
          {user ? (
            <Link href={homeFor(user)} className="btn btn-primary btn-sm">Go to dashboard</Link>
          ) : (
            <>
              <Link href="/login" className="btn btn-light btn-sm">Log in</Link>
              <Link href="/get-started" className="btn btn-primary btn-sm">Sign up</Link>
            </>
          )}
          <span className="show-mobile">
            <MobileMenu
              sections={[
                { label: "Explore", items: SITE_LINKS },
                { label: "Account", items: user ? [{ href: homeFor(user), label: "Go to dashboard", icon: "home" }] : [{ href: "/login", label: "Log in", icon: "user" }, { href: "/get-started", label: "Sign up", icon: "plus" }] },
              ]}
              header={<Logo />}
              footer={!user ? <><Link href="/signup?role=client" className="btn btn-primary btn-block">Hire a designer</Link><Link href="/signup?role=freelancer" className="btn btn-light btn-block">Find work</Link></> : undefined}
            />
          </span>
        </div>
      </div>
    </header>
  );
}
