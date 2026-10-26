import Link from "next/link";
import { AnimatedBackground, Logo } from "@/components/ui";

export default function NotFound() {
  return (
    <div className="public">
      <AnimatedBackground />
      <header className="public-header"><Logo /></header>
      <main className="flow-card center" style={{ maxWidth: 560 }}>
        <span className="eyebrow">404</span>
        <h1>We couldn&apos;t find that page</h1>
        <p className="muted">It may have moved, or you might not have access to it.</p>
        <div><Link href="/" className="btn btn-primary">Back to FindRight</Link></div>
      </main>
    </div>
  );
}
