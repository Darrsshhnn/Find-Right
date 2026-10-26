import Link from "next/link";
import { Logo } from "./ui";
import { currentUser, homeFor } from "@/lib/auth";

export default async function PublicHeader({ minimal = false }: { minimal?: boolean }) {
  const user = await currentUser();
  return (
    <header className="public-header">
      <div className="container">
        <Logo />
        {!minimal && (
          <nav className="public-nav" aria-label="Site">
            <Link href="/#how">How it works</Link>
            <Link href="/#trust">Our promise</Link>
            <Link href="/#reviews">Reviews</Link>
            <Link href="/signup?role=freelancer">For freelancers</Link>
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
        </div>
      </div>
    </header>
  );
}
