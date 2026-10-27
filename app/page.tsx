import Link from "next/link";
import HowItWorks from "@/components/HowItWorks";
import Icon from "@/components/Icon";
import LogoIntro from "@/components/LogoIntro";
import PublicHeader from "@/components/PublicHeader";
import ReviewSlider, { type Testimonial } from "@/components/ReviewSlider";
import { AnimatedBackground, Avatar, Logo } from "@/components/ui";

const TEAM = ["Darshan", "Umang", "Prachi", "Yashraj", "Vrushti"];
const TEAM_PHOTOS: Record<string, string> = { Darshan: "/assets/bff29.png", Umang: "/assets/3f8c7.png", Yashraj: "/assets/f5bf1.png" };

// Placeholder testimonials drawn from our user-research interviews — replace with live reviews before launch.
const TESTIMONIALS: Testimonial[] = [
  { name: "Rahul Shah", role: "Founder, D2C brand", rating: 5, text: "I found a designer who was available the same day, saw her real projects and paid only 10% to start." },
  { name: "Kirtan Dhanani", role: "UI/UX designer · Rising talent", rating: 5, text: "As a beginner I finally get briefs that match my level instead of competing on price." },
  { name: "Nikunj Patel", role: "Design institute owner", rating: 4, text: "Seeing who is available right now changed everything for urgent projects." },
  { name: "Siddharth Sharma", role: "Video editor", rating: 5, text: "The advance arrives before I start and revisions are capped. Freelancing feels safe again." },
  { name: "Prerna Vyas", role: "Small business owner", rating: 5, text: "The AI disclosure is honest and clear — I knew exactly what I was paying for." },
  { name: "Jatin Vaghela", role: "Graphic & UI designer", rating: 4, text: "Clients come with a structured brief and a verified badge. Fewer vague requirements." },
];

const PROMISES = [
  { icon: "bot", title: "AI usage disclosed", text: "Know whether work is human-made, AI-assisted or AI-supported before you hire." },
  { icon: "lock", title: "Escrow payments", text: "Money is held safely and released only when you approve the work." },
  { icon: "sparkle", title: "3 starter credits", text: "New clients get three 15%-off credits to try rising talent." },
];

export default function Landing() {
  return (
    <div className="public landing">
      <LogoIntro />
      <AnimatedBackground lively />
      <PublicHeader />
      <main className="public-main" id="main">
        <div className="container">
          <section className="hero">
            <div className="hero-copy">
              <span className="hero-pill"><span className="dot dot-green" /> Escrow-protected · AI usage disclosed</span>
              <h1>Hire the right designer, <em>with confidence.</em></h1>
              <p>Verified freelancers, honest AI disclosure, and payments that only move when you approve the work.</p>
              <div className="row" style={{ justifyContent: "center" }}>
                <Link href="/signup?role=client" className="btn btn-primary btn-lg">Hire a designer <Icon name="arrowRight" size={18} /></Link>
                <Link href="/signup?role=freelancer" className="btn btn-light btn-lg">Find work</Link>
              </div>
              <div className="hero-points">
                <span><Icon name="checkCircle" size={16} /> Pay 10% to start</span>
                <span><Icon name="checkCircle" size={16} /> Verified clients</span>
                <span><Icon name="checkCircle" size={16} /> Capped revisions</span>
              </div>
            </div>
          </section>
        </div>

        <section className="section" id="how">
          <div className="container">
            <div className="section-title center"><span className="eyebrow">How it works</span><h2>Four simple steps</h2></div>
            <HowItWorks />
          </div>
        </section>

        <section className="section-band" id="trust" aria-labelledby="trust-title">
          <div className="container">
            <div className="section-title center"><span className="eyebrow">Our promise</span><h2 id="trust-title">Built-in trust on every project</h2><p>Three protections that come with every hire — no extra setup.</p></div>
            <div className="usp-grid">
              {PROMISES.map((p) => (
                <div key={p.title} className="card">
                  <span className="icon-tile"><Icon name={p.icon} /></span>
                  <b>{p.title}</b>
                  <p>{p.text}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section className="section" id="reviews">
          <div className="container">
            <div className="section-title center"><span className="eyebrow">Reviews</span><h2>Loved by clients and freelancers</h2></div>
            <ReviewSlider items={TESTIMONIALS} />
            <div className="built-by">
              <span className="avatar-stack">{TEAM.map((n) => <Avatar key={n} name={n} src={TEAM_PHOTOS[n]} />)}</span>
              <span className="small">Built by <b>{TEAM.slice(0, -1).join(", ")} &amp; {TEAM.at(-1)}</b></span>
            </div>
          </div>
        </section>

        <section className="section">
          <div className="container">
            <div className="cta-band">
              <div><h2>Ready to hire your next designer?</h2><p>Post a job in minutes and get matched proposals today.</p></div>
              <div className="row"><Link href="/signup?role=client" className="btn btn-light btn-lg">Post a job</Link><Link href="/signup?role=freelancer" className="btn btn-lg" style={{ color: "#fff", border: "1px solid rgba(255,255,255,.5)" }}>Join as freelancer</Link></div>
            </div>
          </div>
        </section>
      </main>
      <footer className="public-footer">
        <div className="container">
          <div className="stack-sm"><Logo /><span>Hire creative freelancers with confidence.</span></div>
          <nav aria-label="Product"><b>Product</b><Link href="/#how">How it works</Link><Link href="/#trust">Our promise</Link><Link href="/signup?role=freelancer">For freelancers</Link></nav>
          <nav aria-label="Company"><b>Company</b><Link href="/#reviews">Reviews</Link><Link href="/login">Log in</Link><Link href="/get-started">Sign up</Link></nav>
          <nav aria-label="Support"><b>Support</b><Link href="/login?next=/client/support">Help centre</Link><Link href="/login?next=/client/support">Raise a dispute</Link></nav>
        </div>
        <div className="footer-bottom"><div className="container small">© {new Date().getFullYear()} FindRight · Made in Ahmedabad</div></div>
      </footer>
    </div>
  );
}
