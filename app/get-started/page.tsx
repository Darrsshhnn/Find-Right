import type { Metadata } from "next";
import Link from "next/link";
import Icon from "@/components/Icon";
import PublicHeader from "@/components/PublicHeader";
import { AnimatedBackground } from "@/components/ui";

export const metadata: Metadata = { title: "Get started" };

export default function GetStarted() {
  return (
    <div className="public">
      <AnimatedBackground />
      <PublicHeader />
      <form action="/signup" method="get" className="flow-card">
        <div className="flow-progress">
          <div className="flow-progress-top"><span>Step 1 of 3 · <b>Role selection</b></span><span>FindRight onboarding</span></div>
          <div className="bar"><i style={{ width: "33%" }} /></div>
        </div>
        <div className="flow-heading center"><h1>What brings you to FindRight?</h1><p>We&apos;ll tailor your experience to fit your needs.</p></div>
        <div className="role-grid">
          <label className="role-card">
            <input type="radio" name="role" value="client" required defaultChecked />
            <span className="role-check" aria-hidden="true"><Icon name="check" size={16} /></span>
            <span className="role-art"><Icon name="briefcase" size={48} /></span>
            <b>I&apos;m hiring</b>
            <p>Find the right designer for your project, with escrow-protected payments.</p>
            <ul className="role-perks"><li>Post a brief in minutes</li><li>3 starter credits · 15% off</li><li>Pay 10% to start</li></ul>
            <i>Hire creative talent →</i>
          </label>
          <label className="role-card">
            <input type="radio" name="role" value="freelancer" />
            <span className="role-check" aria-hidden="true"><Icon name="check" size={16} /></span>
            <span className="role-art"><Icon name="sparkle" size={48} /></span>
            <b>I&apos;m a freelancer</b>
            <p>Find real projects, build a verified portfolio and get paid safely.</p>
            <ul className="role-perks"><li>Matched to your level</li><li>Advance before you start</li><li>Capped revisions</li></ul>
            <i>Start freelancing →</i>
          </label>
        </div>
        <div className="flow-actions">
          <Link className="btn btn-ghost" href="/"><Icon name="arrowLeft" size={16} /> Back</Link>
          <button className="btn btn-primary">Continue <Icon name="arrowRight" size={16} /></button>
        </div>
      </form>
    </div>
  );
}
