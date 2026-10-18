import { useEffect, useMemo, useState } from "react";
import { supabase } from "./supabase";
import { projectId, publicAnonKey } from "../utils/supabase/info";

type View = "home" | "projects" | "workspace" | "progression" | "profile" | "settings";
type SettingsTab = "profile" | "reputation" | "ai" | "privacy";
type AiChoice = "No AI" | "AI ideation" | "AI execution";
type EntryStage = "landing" | "role" | "auth" | "onboarding" | "company-verification" | "app";
type Role = "designer" | "client";
type AuthMode = "sign-up" | "sign-in";

const A = "/assets";
const SERVER_URL = `https://${projectId}.supabase.co/functions/v1/make-server-1edb83a6`;

type CompanyReview = { companyName: string; method: "website" | "linkedin"; website: string; linkedin: string; status: "pending" | "verified" | "rejected"; reviewNote?: string };

async function companyVerificationRequest(method: "GET" | "POST", payload?: { companyName: string; method: "website" | "linkedin"; website: string; linkedin: string }) {
  const { data } = await supabase.auth.getSession();
  const token = data.session?.access_token;
  if (!token) throw new Error("Sign in again to continue company verification.");
  const response = await fetch(`${SERVER_URL}/company-verification/${method === "GET" ? "status" : "request"}`, {
    method,
    headers: { "Content-Type": "application/json", apikey: publicAnonKey, Authorization: `Bearer ${token}` },
    ...(payload ? { body: JSON.stringify(payload) } : {}),
  });
  const result = await response.json().catch(() => ({}));
  if (!response.ok) throw new Error(result.error || "Company verification could not be reached.");
  return result as { request: CompanyReview | null };
}

const navItems: { id: View; label: string; icon: string }[] = [
  { id: "home", label: "Home", icon: "8c6e6.svg" },
  { id: "projects", label: "Projects", icon: "eb6a2.svg" },
  { id: "workspace", label: "Workspace", icon: "ea8d0.svg" },
  { id: "progression", label: "Progression", icon: "754f2.svg" },
];

const opportunities = [
  {
    category: "Brand identity & logos",
    title: "Premium Botanical Skincare Brand Identity & Packaging",
    description: "Build a refined visual identity, logo suite, packaging system and production-ready brand guidelines.",
    budget: "₹42,000",
    deadline: "Oct 20, 2026",
    match: "96% match",
  },
  {
    category: "UI/UX & web design",
    title: "Fintech SaaS Dashboard Redesign & Design System",
    description: "Create an accessible dashboard experience and scalable component library for a growing finance platform.",
    budget: "₹36,000",
    deadline: "Oct 28, 2026",
    match: "91% match",
  },
  {
    category: "Packaging & merchandise",
    title: "Specialty Coffee Roastery Packaging & Badge System",
    description: "Design a tactile package family, roast badges and print-ready dielines for a specialty coffee launch.",
    budget: "₹28,000",
    deadline: "Nov 4, 2026",
    match: "88% match",
  },
];

const portfolio = [
  { image: "567c5.png", category: "Brand identity & logos", title: "Atelier Bloom — Botanical Skincare Identity", tags: ["Logo suite", "Packaging", "Guidelines"] },
  { image: "0b0c3.png", category: "Packaging & merchandise", title: "Coffee — Roastery Dielines & Badges", tags: ["Dielines", "Print", "Badges"] },
  { image: "c96a1.png", category: "Brand identity & logos", title: "Sol & Oat — Sustainable Carton System", tags: ["Identity", "Carton", "Typography"] },
];

const reviews = [
  {
    name: "Sarah Jenkins",
    body: '"Elena is exceptional. Her human touch, deep brand awareness, and attention to typographic weights elevated our entire product launch. Zero generic feel."',
    meta: "Sep 18, 2026 • Botanical Skincare Brand Identity & Packaging",
  },
  {
    name: "Marcus Cole",
    body: '"Delivered ahead of schedule with flawless production files. Elena respected our wish for zero AI in the final brand mark and provided full vector source outlines."',
    meta: "Aug 24, 2026 • Verde Specialty Roastery Packaging",
  },
];

const disciplines = [
  ["Brand identity & logos", "Visual identity systems, logos, guidelines, and typography."],
  ["UI/UX & web design", "Mobile apps, SaaS interfaces, websites, and design systems."],
  ["Vector & digital illustration", "Custom character art, editorial art, product spots, and icons."],
  ["Packaging & merchandise", "Dielines, boxes, labels, pouch wraps, and tactile print goods."],
  ["Motion & micro-interactions", "Animated brand assets, UI transitions, Lottie files, and explainer visuals."],
  ["Marketing & social creative", "Ad campaigns, social kits, pitch decks, and launch collateral."],
];

function Logo() {
  return (
    <div className="logo" aria-label="FindRight">
      <span className="logo-mark"><img src={`${A}/e88ce.svg`} alt="" /></span>
      <strong>FindRight</strong>
    </div>
  );
}

function Sidebar({ view, setView, logout }: { view: View; setView: (view: View) => void; logout: () => void }) {
  return (
    <aside className="sidebar">
      <button className="logo-button" onClick={() => setView("home")}><Logo /></button>
      <nav className="main-nav" aria-label="Main navigation">
        {navItems.map((item) => (
          <button key={item.id} className={view === item.id ? "nav-item active" : "nav-item"} onClick={() => setView(item.id)}>
            <img src={`${A}/${item.icon}`} alt="" />
            <span>{item.label}</span>
          </button>
        ))}
      </nav>
      <div className="secondary-nav">
        <button className={view === "profile" ? "nav-item active" : "nav-item"} onClick={() => setView("profile")}>
          <img src={`${A}/a27af.svg`} alt="" /><span>Profile</span>
        </button>
        <button className={view === "settings" ? "nav-item active" : "nav-item"} onClick={() => setView("settings")}>
          <img src={`${A}/e7255.svg`} alt="" /><span>Settings</span>
        </button>
        <button className="nav-item logout-item" onClick={logout}>
          <img src={`${A}/e3424.svg`} alt="" /><span>Log out</span>
        </button>
      </div>
    </aside>
  );
}

function Header({ title }: { title: string }) {
  return (
    <header className="topbar">
      <div>
        <span className="eyebrow">Designer account</span>
        <h1>{title}</h1>
      </div>
      <div className="header-actions">
        <button className="icon-button" aria-label="Notifications">3</button>
        <div className="mini-profile">
          <img src={`${A}/4f7cd.png`} alt="Elena Rodriguez" />
          <span><b>Elena Rodriguez</b><small>Verified designer</small></span>
        </div>
      </div>
    </header>
  );
}

function Dashboard({ setView }: { setView: (view: View) => void }) {
  const [query, setQuery] = useState("");
  const visibleJobs = useMemo(
    () => opportunities.filter((job) => `${job.title} ${job.category}`.toLowerCase().includes(query.toLowerCase())),
    [query],
  );
  return (
    <>
      <Header title="Designer workspace & stats" />
      <main className="page dashboard">
        <section className="welcome-card">
          <div>
            <span className="pill success">Verified designer profile</span>
            <h2>Good morning, Elena.</h2>
            <p>Your trust score is strong and three new projects match your brand identity and packaging experience.</p>
            <button className="primary-button" onClick={() => document.getElementById("opportunities")?.scrollIntoView({ behavior: "smooth" })}>
              Discover matched work
            </button>
          </div>
          <div className="trust-ring"><strong>94</strong><span>Trust score</span></div>
        </section>

        <section className="metric-grid">
          <article><span>Profile views</span><strong>248</strong><small>+18% this week</small></article>
          <article><span>Project invitations</span><strong>12</strong><small>4 need a response</small></article>
          <article><span>Completed projects</span><strong>28</strong><small>100% on-time delivery</small></article>
          <article><span>Average rating</span><strong>5.0</strong><small>From 22 verified reviews</small></article>
        </section>

        <section className="active-project card">
          <div>
            <span className="pill success">Active FindRight contract</span>
            <h3>Artisanal Oat Milk Brand Identity & Sustainable Carton Packaging</h3>
            <p>Client: Darshan Shridhar <span>•</span> Oct 15, 2026 <span>•</span> Funds safely in escrow</p>
          </div>
          <div className="project-progress"><span><i style={{ width: "62%" }} /></span><small>62% complete</small></div>
          <button className="primary-button" onClick={() => setView("workspace")}>Open workspace</button>
        </section>

        <section id="opportunities" className="section-heading">
          <div><span className="eyebrow">Relevant projects</span><h2>Recommended for your craft</h2></div>
          <label className="search"><img src={`${A}/f5fab.svg`} alt="" /><input value={query} onChange={(e) => setQuery(e.target.value)} placeholder="Search projects" /></label>
        </section>
        <div className="opportunity-grid">
          {visibleJobs.map((job) => (
            <article className="job-card" key={job.title}>
              <div className="job-top"><span className="pill">{job.category}</span><b>{job.match}</b></div>
              <h3>{job.title}</h3><p>{job.description}</p>
              <div className="job-meta"><span><small>Budget</small>{job.budget}</span><span><small>Deadline</small>{job.deadline}</span></div>
              <button className="text-button" onClick={() => setView("projects")}>View brief & apply <span>→</span></button>
            </article>
          ))}
        </div>
      </main>
    </>
  );
}

function Projects({ setView }: { setView: (view: View) => void }) {
  const [filter, setFilter] = useState("All disciplines");
  return (
    <>
      <Header title="Discover projects" />
      <main className="page">
        <div className="filter-bar">
          {["All disciplines", "Brand identity", "UI/UX & web", "Packaging"].map((item) => (
            <button key={item} className={filter === item ? "chip active" : "chip"} onClick={() => setFilter(item)}>{item}</button>
          ))}
        </div>
        <div className="list-grid">
          {opportunities.map((job) => (
            <article className="wide-job card" key={job.title}>
              <div><span className="pill">{job.category}</span><h2>{job.title}</h2><p>{job.description}</p></div>
              <div className="wide-job-side"><b>{job.budget}</b><small>{job.deadline}</small><button className="primary-button" onClick={() => setView("workspace")}>View brief & apply</button></div>
            </article>
          ))}
        </div>
      </main>
    </>
  );
}

function Profile() {
  const [tab, setTab] = useState<"portfolio" | "reviews" | "experience">("portfolio");
  return (
    <>
      <Header title="Designer profile" />
      <main className="page">
        <section className="profile-card card">
          <img className="avatar" src={`${A}/4f7cd.png`} alt="Elena Rodriguez" />
          <div className="profile-copy">
            <div className="profile-title"><h2>Elena Rodriguez</h2><span className="pill success">Identity verified</span></div>
            <h3>Brand Identity & Visual Systems Designer</h3>
            <p>Ahmedabad, India • 6 years experience • <b>5.0</b> (22 verified reviews) • 28 completed projects</p>
            <p>I create thoughtful identity systems, tactile packaging and production-ready visual guidelines for purpose-led brands. Every project includes a clear human–AI process disclosure.</p>
            <div className="tag-row">{["Brand Identity", "Typography", "Logo Design", "Packaging & Dielines", "Design Systems"].map((x) => <span key={x}>{x}</span>)}</div>
          </div>
          <button className="outline-button">Edit profile</button>
        </section>
        <div className="profile-tabs">
          <button className={tab === "portfolio" ? "active" : ""} onClick={() => setTab("portfolio")}>Portfolio & case studies (3)</button>
          <button className={tab === "reviews" ? "active" : ""} onClick={() => setTab("reviews")}>Reputation & reviews (2)</button>
          <button className={tab === "experience" ? "active" : ""} onClick={() => setTab("experience")}>Experience & background</button>
        </div>
        {tab === "portfolio" && <div className="portfolio-grid">{portfolio.map((item) => <article className="portfolio-card card" key={item.title}><img src={`${A}/${item.image}`} alt="" /><div><small>{item.category}</small><h3>{item.title}</h3><div className="tag-row">{item.tags.map((x) => <span key={x}>{x}</span>)}</div><p className="ai-note">No AI (100% human-made)</p></div></article>)}</div>}
        {tab === "reviews" && <div className="review-grid">{reviews.map((review) => <Review key={review.name} {...review} />)}</div>}
        {tab === "experience" && <section className="card experience"><span className="eyebrow">6 years professional experience</span><h2>Independent Brand & Visual Systems Designer</h2><p>Freelance creative designer working across graphic design, UI/UX, product design and video editing. Focused on strong professional identity, fair project structures and long-term client relationships.</p></section>}
      </main>
    </>
  );
}

function Review({ name, body, meta }: { name: string; body: string; meta: string }) {
  return <article className="review card"><div><h3>{name}</h3><b>★ 5.0</b></div><p>{body}</p><small>{meta}</small></article>;
}

function Settings() {
  const [tab, setTab] = useState<SettingsTab>("profile");
  const [choices, setChoices] = useState<Record<string, AiChoice>>(
    Object.fromEntries(disciplines.map(([name], index) => [name, index === 1 ? "AI ideation" : "No AI"])),
  );
  const [saved, setSaved] = useState(false);
  const [privacy, setPrivacy] = useState({ alerts: true, public: true });
  return (
    <>
      <Header title="Account & Settings" />
      <main className="page settings-page">
        <span className="pill">Designer Account</span>
        <h2 className="settings-title">Account & Settings</h2>
        <nav className="settings-tabs">
          {([
            ["profile", "1. Profile & portfolio"],
            ["reputation", "2. Reputation & trust (Two-way)"],
            ["ai", "3. AI usage disclosure"],
            ["privacy", "4. Account & privacy"],
          ] as [SettingsTab, string][]).map(([id, label]) => <button key={id} className={tab === id ? "active" : ""} onClick={() => setTab(id)}>{label}</button>)}
        </nav>
        {tab === "profile" && <ProfileSettings saved={saved} save={() => { setSaved(true); window.setTimeout(() => setSaved(false), 1800); }} />}
        {tab === "reputation" && <div className="two-columns"><section><div className="column-label"><h3>Ratings received (2)</h3><span>From clients</span></div>{reviews.map((x) => <Review key={x.name} {...x} />)}</section><section><div className="column-label"><h3>Ratings given (1)</h3><span>To clients</span></div><Review name="For contract milestone" body={'"Sarah was the ideal client — crystal-clear brief, prompt feedback on review rounds, and fast milestone escrow release. A pleasure to collaborate with."'} meta="Sep 19, 2026 • Botanical Skincare Brand Identity & Packaging" /></section></div>}
        {tab === "ai" && <section className="ai-settings">
          <div className="settings-intro"><img src={`${A}/1515f.svg`} alt="" /><div><h3>Public AI usage disclosure per discipline</h3><p>Instead of hiding AI or making vague claims, self-report your level per design category. These badges appear publicly on your profile so clients can hire with confidence.</p></div></div>
          {disciplines.map(([name, description]) => <div className="discipline" key={name}><div><h3>{name}</h3><p>{description}</p></div><div className="segmented">{(["No AI", "AI ideation", "AI execution"] as AiChoice[]).map((choice) => <button key={choice} className={choices[name] === choice ? "active" : ""} onClick={() => setChoices({ ...choices, [name]: choice })}>{choice}</button>)}</div></div>)}
        </section>}
        {tab === "privacy" && <section className="privacy-card card"><h2>Account credentials & privacy controls</h2><p>Manage authentication, communication alerts, and profile privacy.</p><Toggle label="Project and message alerts" detail="Receive an email when clients invite or message you." checked={privacy.alerts} change={() => setPrivacy({ ...privacy, alerts: !privacy.alerts })} /><Toggle label="Public profile visibility" detail="Allow verified clients to discover your profile and portfolio." checked={privacy.public} change={() => setPrivacy({ ...privacy, public: !privacy.public })} /><button className="outline-button">Change password</button></section>}
      </main>
    </>
  );
}

function ProfileSettings({ saved, save }: { saved: boolean; save: () => void }) {
  return <section className="profile-settings"><div className="form-card card"><h2>Profile information</h2><div className="form-grid"><label>Full name<input defaultValue="Elena Rodriguez" /></label><label>Location<input defaultValue="Ahmedabad, India" /></label><label>Professional title<input defaultValue="Brand Identity & Visual Systems Designer" /></label><label>Years of experience<input defaultValue="6 years" /></label><label className="full">Bio<textarea defaultValue="I create thoughtful identity systems, tactile packaging and production-ready visual guidelines for purpose-led brands." /></label></div><button className="primary-button" onClick={save}>{saved ? "Changes saved" : "Save changes"}</button></div><div className="portfolio-grid compact">{portfolio.map((item) => <article className="portfolio-card card" key={item.title}><img src={`${A}/${item.image}`} alt="" /><div><h3>{item.title}</h3><p className="ai-note">No AI (100% human-made)</p></div></article>)}</div></section>;
}

function Toggle({ label, detail, checked, change }: { label: string; detail: string; checked: boolean; change: () => void }) {
  return <div className="toggle-row"><div><h3>{label}</h3><p>{detail}</p></div><button className={checked ? "toggle on" : "toggle"} onClick={change} aria-pressed={checked}><span /></button></div>;
}

function Workspace() {
  const [messages, setMessages] = useState(["Hi Vrushti, thrilled to work with you on the Sol & Oat brand identity! We deposited the Rs. 1000 in your bank account.", "Thank you Mukul! As agreed in my AI disclosure, 100% of this work will be drafted and hand-vectorized by me with zero synthetic AI.", "I have uploaded the initial Phase 1 delivery: complete logo family, mark lockups, and preliminary 1L carton dielines below for your review!"]);
  const [draft, setDraft] = useState("");
  const send = () => { if (draft.trim()) { setMessages([...messages, draft.trim()]); setDraft(""); } };
  return (
    <>
      <Header title="Workspace overview" />
      <main className="page">
        <section className="workspace-project card"><div><span className="pill success">Active FindRight contract</span><h2>Artisanal Oat Milk Brand Identity & Sustainable Carton Packaging</h2><p>Client: Mukul Shridhar • Designer: Vrushti Lakhupota • <b>Oct 15, 2026 (16 days remaining)</b></p></div><strong>Rs. 8000</strong></section>
        <div className="workspace-grid">
          <section className="delivery card"><h2>Delivered files & packages</h2><p>Official milestone files submitted for review</p><div className="package"><span className="pill">v1.0</span><h3>Milestone 1 — Complete Logo Suite & Carton Dielines (v1.0)</h3><p>Included: Sol & Oat primary logotype, sustainable stamp emblem, 1L carton packaging dielines and high-res tactile 3D render.</p>{["Sol_and_Oat_Primary_Logo_Suite.pdf — 14.2 MB", "1L_Carton_Print_Ready_Dieline_v1.ai — 28.6 MB"].map((file) => <button className="file" key={file}>{file}<span>Download</span></button>)}</div></section>
          <section className="messages card"><div className="message-head">Direct workspace message thread <span>Viewing as <b>Designer</b></span></div><div className="thread">{messages.map((message, index) => <div key={`${message}-${index}`} className={index === 0 ? "message client" : "message designer"}><small>{index === 0 ? "Mukul Shridhar" : "Vrushti Lakhupota"}</small><p>{message}</p></div>)}</div><div className="composer"><input value={draft} onChange={(e) => setDraft(e.target.value)} onKeyDown={(e) => e.key === "Enter" && send()} placeholder="Type a message to Mukul Shridhar..." /><button onClick={send}>Send</button></div></section>
        </div>
      </main>
    </>
  );
}

function Progression() {
  return <><Header title="Trust & progression" /><main className="page"><section className="welcome-card progression-hero"><div><span className="pill success">Rising trusted talent</span><h2>Your profile is 92% complete</h2><p>Complete the final trust steps to improve your visibility in verified client searches.</p></div><div className="trust-ring"><strong>92%</strong><span>Complete</span></div></section><div className="list-grid">{["Identity & email verified", "Three client-verified portfolio projects", "Public AI usage disclosure completed", "Add one more recent client testimonial"].map((x, i) => <article className="card progression-row" key={x}><span className={i < 3 ? "check done" : "check"}>{i < 3 ? "✓" : i + 1}</span><div><h3>{x}</h3><p>{i < 3 ? "Completed and visible to verified clients." : "Strengthen your reputation and unlock the next trust tier."}</p></div></article>)}</div></main></>;
}

function PublicHeader({ start, signIn }: { start: () => void; signIn: () => void }) {
  return (
    <header className="public-header">
      <Logo />
      <div>
        <button className="public-link" onClick={signIn}>Sign in</button>
        <button className="primary-button" onClick={start}>Get started</button>
      </div>
    </header>
  );
}

function AnimatedBackground() {
  return (
    <div className="animated-background" aria-hidden="true">
      <img className="float-shape shape-one" src={`${A}/e5d86.png`} alt="" />
      <img className="float-shape shape-two" src={`${A}/693dd.png`} alt="" />
      <img className="float-shape shape-three" src={`${A}/b03fc.png`} alt="" />
      <img className="float-shape shape-four" src={`${A}/c0470.png`} alt="" />
    </div>
  );
}

function Landing({ begin }: { begin: (mode: AuthMode) => void }) {
  return (
    <div className="public-page">
      <AnimatedBackground />
      <PublicHeader start={() => begin("sign-up")} signIn={() => begin("sign-in")} />
      <main className="landing-main">
        <div className="hero-glow one" />
        <div className="hero-glow two" />
        <span className="hero-point"><i /> FindRight • Transparent freelancer find and hire platform</span>
        <h1>Real designers. Real work.<br /><em>Real portfolios.</em></h1>
        <p>The human, brand-aware alternative to generic AI imagery. Designers disclose their AI usage upfront, so you always know what you're paying for.</p>
        <div className="hero-actions">
          <button className="primary-button" onClick={() => begin("sign-up")}>Get started</button>
          <button className="outline-button" onClick={() => begin("sign-in")}>Sign in to your account</button>
        </div>
        <section className="trust-strip">
          <span><b>Verified clients</b><small>Know who you are working with</small></span>
          <span><b>Work-based matching</b><small>Relevance over bidding</small></span>
          <span><b>Secure milestones</b><small>Protected payments and scope</small></span>
          <span><b>Human–AI transparency</b><small>Clear disclosure on every profile</small></span>
        </section>
      </main>
    </div>
  );
}

function RoleSelection({ mode, choose, back }: { mode: AuthMode; choose: (role: Role) => void; back: () => void }) {
  const [selection, setSelection] = useState<Role | null>(null);
  return (
    <div className="entry-page">
      <AnimatedBackground />
      <PublicHeader start={() => choose("designer")} signIn={() => choose("designer")} />
      <main className="entry-card role-card">
        <div className="flow-heading"><span>Step 1/3 : Role Selection</span><b>FindRight Onboarding</b></div>
        <h1>What brings you to Findright?</h1>
        <p>We’ll tailor your experience to fit your needs</p>
        <div className="role-grid">
          <button className={selection === "client" ? "selected" : ""} onClick={() => setSelection("client")}>
            <span className="role-graphic"><img src={`${A}/c8d33.svg`} alt="" /></span>
            <b>I am a client <span className="choice-radio" /></b>
            <small>Find the right designer for your project. Filter by human craft vs AI assistance, manage contracts with protected escrow.</small>
            <i>Hire Creative Talent</i>
          </button>
          <button className={selection === "designer" ? "selected" : ""} onClick={() => setSelection("designer")}>
            <span className="role-graphic"><img src={`${A}/8d5fb.svg`} alt="" /></span>
            <b>I am a Freelancer <span className="choice-radio" /></b>
            <small>Find real projects, build your verified portfolio, get paid. Publicly disclose your AI usage and build durable reputation.</small>
            <i>Start Freelancing & get Verified</i>
          </button>
        </div>
        <div className="role-actions">
          <button className="back-link" onClick={back}>← Back</button>
          <div><button className="outline-button" onClick={() => choose(selection || "designer")}>Skip to Dashboard</button><button className="primary-button" disabled={!selection} onClick={() => selection && choose(selection)}>Continue</button></div>
        </div>
      </main>
    </div>
  );
}

function AuthScreen({ role, mode, setMode, continueFlow, back }: { role: Role; mode: AuthMode; setMode: (mode: AuthMode) => void; continueFlow: () => void; back: () => void }) {
  const roleLabel = role === "designer" ? "Designer Account" : "Client Account";
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [pending, setPending] = useState(false);
  const [verificationSent, setVerificationSent] = useState(false);
  const submit = async () => {
    setError("");
    if ((mode === "sign-up" && !name.trim()) || !email.trim() || !password) {
      setError("Fill in every field before continuing.");
      return;
    }
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      setError("Enter a valid email address.");
      return;
    }
    setPending(true);
    if (mode === "sign-up") {
      const { data, error: authError } = await supabase.auth.signUp({
        email,
        password,
        options: {
          emailRedirectTo: window.location.origin,
          data: { full_name: name.trim(), role },
        },
      });
      setPending(false);
      if (authError) return setError(authError.message);
      if (data.session) continueFlow();
      else setVerificationSent(true);
      return;
    }
    const { error: authError } = await supabase.auth.signInWithPassword({ email, password });
    setPending(false);
    if (authError) return setError(authError.message);
    continueFlow();
  };
  const socialLogin = async (provider: "google" | "linkedin_oidc") => {
    setError("");
    const { error: authError } = await supabase.auth.signInWithOAuth({
      provider,
      options: { redirectTo: window.location.origin },
    });
    if (authError) setError(authError.message);
  };
  const checkVerification = async () => {
    const { data } = await supabase.auth.getSession();
    if (data.session?.user.email_confirmed_at) continueFlow();
    else setError("Your email is not verified yet. Open the link in your verification email first.");
  };
  if (verificationSent) {
    return (
      <div className="entry-page">
        <AnimatedBackground />
        <PublicHeader start={() => setMode("sign-up")} signIn={() => setMode("sign-in")} />
        <main className="verification-card">
          <img src={`${A}/5ab47.svg`} alt="" />
          <span className="step-label">Verification email sent</span>
          <h1>Verify your email address</h1>
          <p>We sent a secure confirmation link to <b>{email}</b>. Open it before continuing to onboarding.</p>
          {error && <p className="form-error">{error}</p>}
          <button className="primary-button" onClick={checkVerification}>I've verified my email</button>
          <button className="back-link" onClick={() => setVerificationSent(false)}>Use a different email</button>
        </main>
      </div>
    );
  }
  return (
    <div className="entry-page">
      <AnimatedBackground />
      <PublicHeader start={() => setMode("sign-up")} signIn={() => setMode("sign-in")} />
      <main className="auth-card">
        <section className="auth-story">
          <Logo />
          <span>{roleLabel}</span>
          <h1>Real designers,<br />Real craft.<br /><em>Protected trust.</em></h1>
          <p>Join a creative marketplace where transparent AI disclosures, human taste, and milestone escrow protect your work and brand.</p>
        </section>
        <form className="auth-form" noValidate onSubmit={(event) => { event.preventDefault(); void submit(); }}>
          <div className="auth-switch">
            <button type="button" className={mode === "sign-up" ? "active" : ""} onClick={() => setMode("sign-up")}>Sign up</button>
            <button type="button" className={mode === "sign-in" ? "active" : ""} onClick={() => setMode("sign-in")}>Log in</button>
          </div>
          <h2>{mode === "sign-up" ? "Create an account" : "Welcome back"}</h2>
          <p>{mode === "sign-up" ? `Signing up as ${role === "designer" ? "designer" : "client (hirer)"}` : `Log in to your ${role.toLowerCase()} account`}</p>
          {mode === "sign-up" && <label>Full name<input required value={name} onChange={(event) => setName(event.target.value)} placeholder="Peter Parker" /></label>}
          <label>Email<input required type="email" value={email} onChange={(event) => setEmail(event.target.value)} placeholder="example@gmail.com" /></label>
          <label>Password<input required type="password" value={password} onChange={(event) => setPassword(event.target.value)} placeholder="At least 6 characters" minLength={6} /></label>
          {error && <p className="form-error" role="alert">{error}</p>}
          <button className="primary-button auth-continue" type="submit" disabled={pending}>{pending ? "Please wait..." : mode === "sign-up" ? "Continue" : "Log in"}</button>
          <div className="or"><span />OR<span /></div>
          <div className="social-row">
            <button type="button" onClick={() => void socialLogin("google")}><img src={`${A}/4e027.svg`} alt="" />Google</button>
            <button type="button" onClick={() => void socialLogin("linkedin_oidc")}><img src={`${A}/48100.svg`} alt="" />LinkedIn</button>
            <button type="button" onClick={() => document.querySelector<HTMLInputElement>('.auth-form input[type="email"]')?.focus()}><img src={`${A}/5ab47.svg`} alt="" />Mail</button>
          </div>
          <button type="button" className="back-link" onClick={back}>← Choose a different role</button>
          <small className="safe-note">Your payment stays safe in escrow until you approve the work.</small>
        </form>
      </main>
    </div>
  );
}

function Onboarding({ role, finish, back }: { role: Role; finish: (account: { kind: "personal" } | { kind: "company"; companyName: string; website: string; linkedin: string; method: "website" | "linkedin" }) => void; back: () => void }) {
  const [step, setStep] = useState(1);
  const [selected, setSelected] = useState<string[]>([]);
  const [setup, setSetup] = useState("");
  const [fields, setFields] = useState({ fullName: "", secondary: "", experience: "", companyName: "", method: "website" as "website" | "linkedin" });
  const [validationError, setValidationError] = useState("");
  const finalStep = role === "client" ? 3 : 2;
  const displayStep = step + 1;
  const toggle = (item: string) => setSelected(selected.includes(item) ? selected.filter((x) => x !== item) : [...selected, item]);
  const advance = () => {
    setValidationError("");
    if (step === 1) {
      if (!fields.fullName.trim() || (role === "designer" && (!fields.secondary.trim() || !fields.experience.trim())) || (role === "client" && setup === "company" && (!fields.companyName.trim() || !fields.secondary.trim()))) {
        setValidationError("Fill in every text field before continuing.");
        return;
      }
      if (role === "client" && !setup) {
        setValidationError("Choose who you are hiring for.");
        return;
      }
      if (role === "client" && setup === "company") {
        try {
          const sourceUrl = new URL(fields.secondary);
          if (sourceUrl.protocol !== "https:" || (fields.method === "linkedin" && sourceUrl.hostname !== "linkedin.com" && !sourceUrl.hostname.endsWith(".linkedin.com"))) throw new Error("invalid company source");
        } catch {
          setValidationError(fields.method === "website" ? "Enter a valid HTTPS company website." : "Enter a valid LinkedIn company page URL.");
          return;
        }
      }
      if (selected.length === 0) {
        setValidationError(role === "client" ? "Choose at least one service purpose." : "Choose at least one creative specialty.");
        return;
      }
    } else if ((role === "designer" || step === 3) && selected.length === 0) {
      setValidationError("Choose at least one topic before continuing.");
      return;
    }
    if (step === finalStep) finish(role === "client" && setup === "company" ? { kind: "company", companyName: fields.companyName.trim(), website: fields.method === "website" ? fields.secondary.trim() : "", linkedin: fields.method === "linkedin" ? fields.secondary.trim() : "", method: fields.method } : { kind: "personal" });
    else {
      setSelected([]);
      setStep(step + 1);
    }
  };
  const topics = [
    { title: "Brand identity & logos", image: "74ddf.png", description: "Visual identity systems, logos, guidelines, and typography.", tags: ["Logo Design", "Brand Identity"] },
    { title: "Video Editing", image: "11654.png", description: "Custom character art, editorial art, product spots, and icons.", tags: ["Editing", "After Effects"] },
    { title: "UI/UX Design", image: "1f943.png", description: "Mobile apps, SaaS interfaces, websites, and design systems.", tags: ["App", "Website"] },
    { title: "Packaging & Merch", image: "74ddf.png", description: "Boxes, labels, pouch wraps, and tactile print goods.", tags: ["Packaging", "Print"] },
    { title: "Illustrations", image: "11654.png", description: "Editorial art, custom characters, product spots, and icons.", tags: ["Vector", "Editorial"] },
    { title: "Motion Design", image: "1f943.png", description: "Animated brand assets, UI transitions, and explainers.", tags: ["Motion", "Lottie"] },
  ];
  return (
    <div className="onboarding-page">
      <AnimatedBackground />
      <header className="public-header"><Logo /><span className="onboarding-brand">FindRight Onboarding</span></header>
      <main className="onboarding-card">
        <div className="onboarding-progress"><span>Step {displayStep}/{role === "client" ? 4 : 3} : {step === 1 ? (role === "designer" ? "Designer Profile" : "Client profile") : step === 2 && role === "client" ? "Starter talent reward" : "Creative disciplines"}</span><b>{step === 2 && role === "client" ? "FindRight hiring incentives" : step > 1 ? "Hirer preferences" : "FindRight Onboarding"}</b><i><b style={{ width: `${(displayStep / (role === "client" ? 4 : 3)) * 100}%` }} /></i></div>
        {step === 1 && <>
          <div className="onboarding-heading"><h1>{role === "designer" ? "Tell us about your craft" : "Who are you hiring for?"}</h1><p>{role === "designer" ? "Clients search for verified designers using skills, location and transparent AI disclosures." : "We customize your project templates and invoice receipts based on your setup."}</p></div>
          {role === "client" && <div className="hiring-grid"><button className={setup === "company" ? "active" : ""} onClick={() => setSetup("company")}><b>I'm hiring for a company</b><small>Brand, startup, or agency</small></button><button className={setup === "personal" ? "active" : ""} onClick={() => setSetup("personal")}><b>It's a personal project</b><small>Independent or hobby work</small></button></div>}
          <div className="form-grid onboarding-form">
            <label>Full Name<input required value={fields.fullName} onChange={(event) => setFields({ ...fields, fullName: event.target.value })} placeholder={role === "designer" ? "ex. Yash Stark" : "Peter Parker"} /></label>
            {role === "designer" && <label>Location<input required value={fields.secondary} onChange={(event) => setFields({ ...fields, secondary: event.target.value })} placeholder="Bopal, Ahmedabad, India" /></label>}
            {role === "designer" && <label>Years of Professional Design Experience<input required value={fields.experience} onChange={(event) => setFields({ ...fields, experience: event.target.value })} placeholder="ex. 0 years UX Designer" /></label>}
            {role === "client" && setup === "company" && <label>Company name<input required value={fields.companyName} onChange={(event) => setFields({ ...fields, companyName: event.target.value })} placeholder="Your registered company name" /></label>}
            {role === "client" && setup === "personal" && <label>Location (optional)<input value={fields.secondary} onChange={(event) => setFields({ ...fields, secondary: event.target.value })} placeholder="Ahmedabad, India" /></label>}
          </div>
          {role === "client" && setup === "company" && <section className="company-verification-choice"><h3>Verify your company</h3><p>Choose a public source for review. Company accounts stay locked until verification is approved.</p><div className="company-method-options"><button type="button" className={fields.method === "website" ? "active" : ""} onClick={() => setFields({ ...fields, method: "website", secondary: "" })}><b>Company website</b><small>Submit your official business domain</small></button><button type="button" className={fields.method === "linkedin" ? "active" : ""} onClick={() => setFields({ ...fields, method: "linkedin", secondary: "" })}><b>LinkedIn company page</b><small>Submit the official company profile URL</small></button></div><label>{fields.method === "website" ? "Company website" : "LinkedIn company page"}<input required type="url" value={fields.secondary} onChange={(event) => setFields({ ...fields, secondary: event.target.value })} placeholder={fields.method === "website" ? "https://company.com" : "https://www.linkedin.com/company/..."} /></label><small>We’ll review this source and confirm the company before enabling the client account.</small></section>}
          {role === "designer" && <><h3 className="field-heading">Primary skills & creative specialties (multi-select)</h3><div className="skill-pills">{["UI/UX Design", "Brand Identity", "Typography", "Logo Design", "Vector Illustrations", "Packaging & Dielines", "Motion Graphics", "Design Systems", "Mobile/IoS Design", "Saas Design"].map((item) => <button key={item} className={selected.includes(item) ? "active" : ""} onClick={() => toggle(item)}>{item}</button>)}</div></>}
          {role === "client" && <><h3 className="field-heading">What do you plan to order services for?</h3><p className="field-note">There's something for everyone</p><div className="service-grid">{["Primary job or business", "Secondary business", "Non-business needs"].map((item) => <button key={item} className={selected.includes(item) ? "active" : ""} onClick={() => toggle(item)}><img src={`${A}/78ed7.svg`} alt="" />{item}</button>)}</div></>}
        </>}
        {step === 2 && role === "client" && <>
          <div className="onboarding-heading"><h1>Your three starter credits are ready</h1><p>You can choose whether to use a credit when you post a job. Each saves 15%, up to ₹5,000, on a hire.</p></div>
          <div className="credit-grid">{[1, 2, 3].map((item) => <article key={item}><div><span>STARTER CREDIT {item}</span><i>✓ Available</i></div><b>15% OFF</b><p>Save up to ₹5,000</p><small>Choose when posting a job</small></article>)}</div>
        </>}
        {((role === "designer" && step === 2) || (role === "client" && step === 3)) && <>
          <div className="onboarding-heading topics-heading"><h1>Pick one or more topics</h1><p>{role === "designer" ? "Choose the creative disciplines you actively design and accept client projects in." : "Select the design categories you typically commission or need creative support for."}</p></div>
          <div className={role === "designer" ? "topic-grid six" : "topic-grid"}>{topics.slice(0, role === "designer" ? 6 : 3).map((topic) => <button key={topic.title} className={selected.includes(topic.title) ? "topic-card active" : "topic-card"} onClick={() => toggle(topic.title)}><span className="topic-image"><img src={`${A}/${topic.image}`} alt="" /><i /></span><b>{topic.title}</b><p>{topic.description}</p><span className="topic-tags">{topic.tags.map((tag) => <small key={tag}>{tag}</small>)}</span></button>)}</div>
        </>}
        {validationError && <p className="form-error onboarding-error" role="alert">{validationError}</p>}
        <div className="onboarding-actions"><button className="back-link" onClick={() => { setValidationError(""); if (step === 1) back(); else { setSelected([]); setStep(step - 1); } }}>← Back</button><div><button className="primary-button" onClick={advance}>{step === finalStep ? (role === "client" ? "Go to Client Dashboard" : "Go to Dashboard") : "Continue →"}</button></div></div>
      </main>
    </div>
  );
}

type PostedJob = {
  id: string;
  title: string;
  description: string;
  category: string;
  budget: string;
  deadline: string;
  applicants: string[];
  creditReserved: boolean;
};

const clientProjects = [
  { title: "Packaging for Noble Paws", description: "Create recyclable packs for organic pet food, made for everyday wellbeing.", budget: "₹4000–₹6000", progress: 72, ai: "AI-supported design" },
  { title: "Website Design for Noble Paws", description: "Design a welcoming shop that helps pet owners find the right daily nutrition.", budget: "₹6000–₹10000", progress: 82, ai: "No AI included" },
  { title: "Brand Identity for Noble Paws", description: "Build a warm, trusted identity for an organic pet food brand with a purpose.", budget: "₹3500–₹5000", progress: 50, ai: "AI-supported design" },
];

const recommendedDesigners = [
  { name: "Umang Donga", title: "UI Designer", rating: "3.5", avatar: "3f8c7.png", works: ["85fba.png", "71e23.png", "04b9e.png"], ai: "AI-assisted ideation", aiLevel: "AI-Assisted", disciplines: ["UI/UX Design", "Product Design"], hourlyRate: 1800, location: "Ahmedabad, India" },
  { name: "Yashraj Gohil", title: "UX Designer", rating: "4.0", avatar: "cafad.png", works: ["35386.png", "56dc5.png", "4646f.png"], ai: "AI-assisted ideation", aiLevel: "AI-Assisted", disciplines: ["UI/UX Design", "Product Design"], hourlyRate: 2200, location: "Ahmedabad, India" },
  { name: "Darshan Solanki", title: "UI/UX Designer | Product Designer", rating: "4.5", avatar: "bff29.png", works: ["71e50.png", "567c5.png", "f5bf1.png"], ai: "No AI (100% human-made)", aiLevel: "Human-Made", disciplines: ["UI/UX Design", "Brand Identity", "Design Systems"], hourlyRate: 2500, location: "Ahmedabad, India" },
  { name: "Riya Mehta", title: "Motion & Brand Designer", rating: "4.8", avatar: "4f7cd.png", works: ["567c5.png", "0b0c3.png", "c96a1.png"], ai: "AI-supported production", aiLevel: "AI-Supported", disciplines: ["Brand Identity", "Graphic Design", "Motion Design"], hourlyRate: 2100, location: "Vadodara, India" },
];

const samplePostedJobs: PostedJob[] = [
  { id: "job-noble-brand", title: "Noble Paws brand refresh", description: "A warm, modern identity for an organic pet nutrition launch. Include a logo suite, packaging direction, and a concise brand guide.", category: "Brand Identity", budget: "₹42,000", deadline: "Nov 8, 2026", applicants: ["Umang Donga", "Darshan Solanki", "Riya Mehta"], creditReserved: false },
  { id: "job-noble-store", title: "Noble Paws online store redesign", description: "Create an accessible, responsive storefront that helps pet owners find the right daily nutrition.", category: "UI/UX Design", budget: "₹58,000", deadline: "Nov 18, 2026", applicants: ["Yashraj Gohil"], creditReserved: true },
];

const applicantProposals: Record<string, { proposal: string; amount: string; response: string }> = {
  "Umang Donga": { proposal: "I can shape the identity and packaging system, then prepare production-ready files with two review rounds.", amount: "₹40,000", response: "Responded 2 hours ago" },
  "Yashraj Gohil": { proposal: "I’ll map the storefront journey, build a responsive UI kit, and hand off annotated design files.", amount: "₹54,000", response: "Responded yesterday" },
  "Darshan Solanki": { proposal: "I can deliver a human-made logo system, packaging direction, and practical brand guidelines.", amount: "₹46,000", response: "Responded yesterday" },
  "Riya Mehta": { proposal: "I’ll build a flexible brand identity with motion-ready assets and a clear handoff for launch.", amount: "₹44,000", response: "Responded 4 hours ago" },
};

function ClientIcon({ name, size = 20 }: { name: string; size?: number }) {
  const paths: Record<string, React.ReactNode> = {
    home: <><path d="m3 10 9-7 9 7" /><path d="M5 9v11h14V9M9 20v-7h6v7" /></>,
    find: <><circle cx="10.8" cy="10.8" r="7.2" /><path d="m16 16 5 5" /></>,
    jobs: <><rect x="3" y="7" width="18" height="14" rx="2" /><path d="M8 7V5a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2M3 12h18M10 12v2h4v-2" /></>,
    projects: <><path d="M4 4h16v16H4z" /><path d="M8 8h8M8 12h8M8 16h5" /></>,
    chat: <><path d="M20 11.5a7.5 7.5 0 0 1-8 7.5 8.8 8.8 0 0 1-3.5-.7L4 20l1.4-3.5A7.1 7.1 0 0 1 4 12c0-4.1 3.6-7.5 8-7.5s8 3.1 8 7Z" /></>,
    settings: <><circle cx="12" cy="12" r="3" /><path d="m19.4 15 .1.1 1.2 1-1.5 2.6-1.5-.6a7.8 7.8 0 0 1-1.7 1l-.2 1.6h-3l-.3-1.6a7.8 7.8 0 0 1-1.7-1l-1.5.6-1.5-2.6 1.2-1a7.1 7.1 0 0 1 0-2l-1.2-1 1.5-2.6 1.5.6a7.8 7.8 0 0 1 1.7-1L12 7.4h3l.3 1.6a7.8 7.8 0 0 1 1.7 1l1.5-.6 1.5 2.6-1.2 1a7.1 7.1 0 0 1 .6 2Z" /></>,
    user: <><circle cx="12" cy="8" r="4" /><path d="M4 21a8 8 0 0 1 16 0" /></>,
    shield: <><path d="M12 22s8-4 8-11V5l-8-3-8 3v6c0 7 8 11 8 11Z" /><path d="m9 12 2 2 4-4" /></>,
    sparkle: <><path d="m12 3 1.8 5.2L19 10l-5.2 1.8L12 17l-1.8-5.2L5 10l5.2-1.8L12 3Z" /><path d="m19 16 .9 2.1L22 19l-2.1.9L19 22l-.9-2.1L16 19l2.1-.9L19 16Z" /></>,
    plus: <><path d="M12 5v14M5 12h14" /></>,
    switch: <><path d="m16 3 4 4-4 4M20 7H4m4 14-4-4 4-4m-4 4h16" /></>,
    check: <><circle cx="12" cy="12" r="10" /><path d="m7 12 3 3 7-7" /></>,
  };
  return <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">{paths[name] ?? paths.projects}</svg>;
}

function ClientSidebar({ active, setActive }: { active: string; setActive: (value: string) => void }) {
  const items = [
    ["home", "Home", "home"],
    ["find", "Find", "find"],
    ["jobs", "Jobs", "jobs"],
    ["projects", "Projects", "projects"],
    ["chat", "Chat", "chat"],
  ];
  return (
    <aside className="client-sidebar">
      <button className="client-logo" onClick={() => setActive("home")} aria-label="FindRight home"><span className="client-logo-mark"><ClientIcon name="check" size={26} /></span></button>
      <nav>{items.map(([id, label, icon]) => <button key={id} className={active === id ? "active" : ""} onClick={() => setActive(id)} aria-label={label}><ClientIcon name={icon} size={21} /><span>{label}</span></button>)}</nav>
    </aside>
  );
}

function ClientTopbar({ setActive, startJob, credits }: { setActive: (value: string) => void; startJob: () => void; credits: number }) {
  const [menuOpen, setMenuOpen] = useState(false);
  return <header className="client-topbar">
    <div className="client-brand-lockup"><span className="client-logo-mark"><ClientIcon name="check" size={25} /></span><b>FindRight</b></div>
    <div className="topbar-trust"><span className="topbar-badge escrow"><ClientIcon name="shield" size={16} /> Escrow Protected</span><span className="topbar-badge verified"><ClientIcon name="check" size={16} /> Verified Co: Noble Paws</span></div>
    <div className="topbar-actions"><span className="topbar-credit"><ClientIcon name="sparkle" size={16} /><b>Starter Credits: <i>{credits}</i></b><span>15% off</span></span><span className="topbar-role"><ClientIcon name="switch" size={16} /> Role: <b>Client</b></span><button className="topbar-post-button" onClick={startJob}><ClientIcon name="plus" size={18} /> Post a Job</button>
      <div className="topbar-profile"><button className="topbar-avatar" onClick={() => setMenuOpen(!menuOpen)} aria-label="Open account menu" aria-expanded={menuOpen}>MP</button>{menuOpen && <div className="topbar-menu"><button onClick={() => { setActive("profile"); setMenuOpen(false); }}><ClientIcon name="user" size={16} /> Profile</button><button onClick={() => { setActive("settings"); setMenuOpen(false); }}><ClientIcon name="settings" size={16} /> Settings</button></div>}</div>
    </div>
  </header>;
}

function JobPostFlow({ close, posted, creditsRemaining }: { close: () => void; posted: (job: Omit<PostedJob, "id" | "applicants" | "creditReserved">) => void; creditsRemaining: number }) {
  const [step, setStep] = useState(1);
  const [category, setCategory] = useState("");
  const [jobType, setJobType] = useState("Freelance project");
  const [experience, setExperience] = useState("");
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [budget, setBudget] = useState("");
  const [deadline, setDeadline] = useState("");
  const [useCredit, setUseCredit] = useState(false);
  const [error, setError] = useState("");
  const next = () => {
    setError("");
    if (step === 1 && (!category || !jobType || !experience)) return setError("Choose a job category, job type, and required experience level.");
    if (step === 2 && (!title.trim() || !description.trim())) return setError("Fill in the job title and description before continuing.");
    if (step === 3 && (!budget.trim() || !deadline)) return setError("Fill in the project budget and submission deadline.");
    if (step === 4) return posted({ title, description, category, budget: `₹${Number(budget).toLocaleString("en-IN")}`, deadline, creditReserved: useCredit });
    setStep(step + 1);
  };
  return (
    <div className="job-flow-page">
      <AnimatedBackground />
      <PublicHeader start={() => {}} signIn={() => {}} />
      <main className="job-flow-card">
        <div className="job-step">Step {step}/4 : {step === 1 ? "Job Details" : step === 2 ? "Description" : step === 3 ? "Budget & deadline" : "Preview & post"}</div>
        {step === 1 && <>
          <div className="job-flow-heading"><h1>Let’s find the right talent</h1><p>Choose the kind of work and experience your project needs.</p></div>
          <label className="flow-label">Job category</label>
          <div className="job-category-grid">{["UI/UX Design", "Graphic Design", "Product Design", "Motion Design"].map((item) => <button className={category === item ? "active" : ""} onClick={() => setCategory(item)} key={item}>{item}</button>)}</div>
          <label className="flow-label">Job type</label>
          <div className="job-type-row">{["Freelance project", "Part-time", "Full-time"].map((item) => <button className={jobType === item ? "active" : ""} onClick={() => setJobType(item)} key={item}>{item}</button>)}</div>
          <label className="flow-label">Required experience level</label>
          <div className="experience-grid">{[["Fresher / Entry", "New talent, fresh ideas"], ["Intermediate", "Proven project experience"], ["High-level / Expert", "Deep expertise, complex work"]].map(([item, detail]) => <button className={experience === item ? "active" : ""} onClick={() => setExperience(item)} key={item}><b>{item}</b><small>{detail}</small><i /></button>)}</div>
        </>}
        {step === 2 && <>
          <div className="job-flow-heading"><h1>Tell us about your project</h1><p>A clear brief helps the right freelancers understand your vision.</p></div>
          <label className="job-input">Job title<input required value={title} onChange={(event) => setTitle(event.target.value)} placeholder="Design a responsive website for a wellness brand" /></label>
          <label className="job-input">Job description<textarea required value={description} onChange={(event) => setDescription(event.target.value)} /></label>
        </>}
        {step === 3 && <>
          <div className="job-flow-heading"><h1>Set your budget and timeline</h1><p>Let freelancers know what you're investing and when you need the work.</p></div>
          <label className="job-input">Project budget (INR)<input required type="number" min="1" value={budget} onChange={(event) => setBudget(event.target.value)} placeholder="45000" /><small>Set the total budget in Indian rupees.</small></label>
          <label className="job-input">Project submission deadline<input required type="date" value={deadline} onChange={(event) => setDeadline(event.target.value)} /><small>Set the date for final deliverables.</small></label>
        </>}
        {step === 4 && <>
          <div className="job-flow-heading"><h1>Preview your job post</h1><p>Everything look right? Your next great collaborator is one post away.</p></div>
          <section className="job-preview">
            <span>JOB POST PREVIEW</span><h2>{title}</h2>
            <div><small>Category<b>{category}</b></small><small>Job type<b>{jobType}</b></small><small>Experience<b>{experience}</b></small></div>
            <p>{description}</p>
            <div className="preview-meta"><small>Project budget<b>₹{Number(budget).toLocaleString("en-IN")}</b></small><small>Submission deadline<b>{deadline}</b></small></div>
          </section>
          <section className="starter-credit-choice">
            <div><b>Use a starter credit?</b><p>Optional: save 15% on your first hire, up to ₹5,000. The credit is applied after you agree project details.</p><small>{creditsRemaining} of 3 credits available</small></div>
            <label><input type="checkbox" checked={useCredit} disabled={creditsRemaining === 0} onChange={(event) => setUseCredit(event.target.checked)} /><span>{creditsRemaining > 0 ? "Reserve one credit for this job" : "No credits remaining"}</span></label>
          </section>
        </>}
        {error && <p className="form-error" role="alert">{error}</p>}
        <footer className="job-flow-actions"><button className="back-link" onClick={() => step === 1 ? close() : setStep(step - 1)}>← Back</button><button className="primary-button" onClick={next}>{step === 4 ? "Post a Job" : "Continue →"}</button></footer>
      </main>
    </div>
  );
}

function ClientPageHeader({ eyebrow, title, description, action }: { eyebrow: string; title: string; description: string; action?: React.ReactNode }) {
  return <header className="client-page-header"><div><span>{eyebrow}</span><h1>{title}</h1><p>{description}</p></div>{action}</header>;
}

function DesignerDirectory({ saved, toggleSaved, openProfile }: { saved: string[]; toggleSaved: (name: string) => void; openProfile: (name: string) => void }) {
  const [query, setQuery] = useState("");
  const [category, setCategory] = useState("All designers");
  const [aiDisclosure, setAiDisclosure] = useState("All disclosure levels");
  const [maxRate, setMaxRate] = useState(3000);
  const matches = recommendedDesigners.filter((designer) => `${designer.name} ${designer.title} ${designer.disciplines.join(" ")}`.toLowerCase().includes(query.toLowerCase()) && (category === "All designers" || designer.disciplines.includes(category)) && (aiDisclosure === "All disclosure levels" || designer.aiLevel === aiDisclosure) && designer.hourlyRate <= maxRate);
  return (
    <>
      <ClientPageHeader eyebrow="Verified creative talent" title="Find the right designer" description="Search by discipline, compare real portfolio work, and review transparent AI usage." />
      <div className="client-search-row"><label><img src={`${A}/cae0c.svg`} alt="" /><input value={query} onChange={(event) => setQuery(event.target.value)} placeholder="Search by designer, skill, or discipline" /></label><select value={aiDisclosure} onChange={(event) => setAiDisclosure(event.target.value)}><option>All disclosure levels</option><option>Human-Made</option><option>AI-Assisted</option><option>AI-Supported</option></select></div>
      <div className="client-filter-chips">{["All designers", "UI/UX Design", "Brand Identity", "Graphic Design", "Product Design", "Motion Design", "Design Systems"].map((item) => <button key={item} className={category === item ? "active" : ""} onClick={() => setCategory(item)}>{item}</button>)}</div>
      <label className="budget-range">Maximum hourly budget <b>₹{maxRate.toLocaleString("en-IN")}/hr</b><input type="range" min="1000" max="5000" step="250" value={maxRate} onChange={(event) => setMaxRate(Number(event.target.value))} /></label>
      {matches.length ? <div className="directory-grid">{matches.map((designer) => <article className="directory-card" key={designer.name}><div className="designer-identity"><img src={`${A}/${designer.avatar}`} alt="" /><span><b>{designer.name}</b><small>{designer.title}</small></span><strong>★ {designer.rating}</strong></div><span className="designer-ai">{designer.ai}</span><div className="designer-work">{designer.works.map((work) => <img src={`${A}/${work}`} alt="" key={work} />)}</div><div className="directory-meta"><span>₹{designer.hourlyRate.toLocaleString("en-IN")}/hour · {designer.location}</span><span>Available this week</span></div><footer><button className={saved.includes(designer.name) ? "saved" : ""} onClick={() => toggleSaved(designer.name)}>{saved.includes(designer.name) ? "Saved" : "Save"}</button><button onClick={() => openProfile(designer.name)}>View Profile</button></footer></article>)}</div> : <div className="client-empty"><h2>No designers match these filters</h2><p>Try a different discipline, disclosure level, or budget.</p><button className="outline-button" onClick={() => { setCategory("All designers"); setAiDisclosure("All disclosure levels"); setMaxRate(3000); setQuery(""); }}>Clear filters</button></div>}
    </>
  );
}

function ClientProjectsPage({ projects, create }: { projects: typeof clientProjects; create: () => void }) {
  const [tab, setTab] = useState("Active");
  const [expanded, setExpanded] = useState<string | null>(null);
  return (
    <>
      <ClientPageHeader eyebrow="Project management" title="Your projects" description="Review briefs, monitor delivery progress, and manage active contracts." action={<button className="primary-button" onClick={create}>Create a new project</button>} />
      <div className="client-project-tabs">{["Active", "Drafts", "Completed"].map((item) => <button className={tab === item ? "active" : ""} onClick={() => setTab(item)} key={item}>{item}<span>{item === "Active" ? projects.length : item === "Drafts" ? 1 : 8}</span></button>)}</div>
      {tab === "Active" && <div className="project-table">{projects.map((project) => <article key={project.title} className={expanded === project.title ? "expanded" : ""}><div className="project-table-main"><span className="project-status">Active</span><div><h3>{project.title}</h3><p>{project.description}</p></div><b>{project.budget}</b><span>{project.progress}% complete</span><button onClick={() => setExpanded(expanded === project.title ? null : project.title)}>{expanded === project.title ? "Close brief" : "Read brief"}</button></div>{expanded === project.title && <div className="project-brief"><div><b>Project scope</b><p>Complete the agreed design system with production-ready files, two feedback rounds, and a documented handoff.</p></div><div><b>Current milestone</b><p>Visual direction and initial concepts are ready for client review.</p></div><button className="primary-button">Open project workspace</button></div>}</article>)}</div>}
      {tab === "Drafts" && <div className="client-empty"><h2>Website refresh for Noble Paws</h2><p>Your draft is saved. Complete the budget and deadline to publish it.</p><button className="primary-button" onClick={create}>Continue draft</button></div>}
      {tab === "Completed" && <div className="completed-grid">{["Organic pet food launch kit", "Noble Paws social campaign", "Retail display system"].map((item) => <article key={item}><span>Completed</span><h3>{item}</h3><p>Delivered on time • Funds released</p><button>View files</button></article>)}</div>}
    </>
  );
}

function PostedJobsPage({ jobs, create, openHire }: { jobs: PostedJob[]; create: () => void; openHire: (designer: (typeof recommendedDesigners)[number], job: PostedJob) => void }) {
  const [expanded, setExpanded] = useState(jobs[0]?.id ?? null);
  return <>
    <ClientPageHeader eyebrow="Hiring activity" title="Posted jobs & responses" description="Review every proposal and choose who you want to discuss the project with." action={<button className="primary-button" onClick={create}>Post a job <span>+</span></button>} />
    {jobs.length === 0 ? <div className="client-empty"><h2>No jobs posted yet</h2><p>Post a brief to start receiving designer proposals.</p><button className="primary-button" onClick={create}>Create your first job</button></div> : <div className="posted-job-list">{jobs.map((job) => {
      const isExpanded = expanded === job.id;
      const applicants = job.applicants.map((name) => recommendedDesigners.find((designer) => designer.name === name)).filter((designer): designer is (typeof recommendedDesigners)[number] => Boolean(designer));
      return <article className="posted-job-card" key={job.id}>
        <button className="posted-job-summary" onClick={() => setExpanded(isExpanded ? null : job.id)} aria-expanded={isExpanded}>
          <span className="posted-job-category">{job.category}</span><h2>{job.title}</h2><p>{job.description}</p>
          <span className="posted-job-meta"><b>{job.budget}</b><span>Deadline {job.deadline}</span><span>{applicants.length} {applicants.length === 1 ? "response" : "responses"}</span>{job.creditReserved && <i>Starter credit reserved</i>}</span>
        </button>
        {isExpanded && <div className="applicant-list">{applicants.length ? applicants.map((designer) => {
          const proposal = applicantProposals[designer.name];
          return <section className="applicant-card" key={designer.name}>
            <div className="designer-identity"><img src={`${A}/${designer.avatar}`} alt="" /><span><b>{designer.name}</b><small>{designer.title}</small></span><strong>★ {designer.rating}</strong></div>
            <span className="designer-ai">{designer.ai}</span>
            <p>{proposal?.proposal}</p>
            <div className="applicant-portfolio">{designer.works.map((work) => <img src={`${A}/${work}`} alt={`${designer.name} portfolio example`} key={work} />)}</div>
            <div className="applicant-response-meta"><span><b>Proposal</b>{proposal?.amount}</span><span><b>Response</b>{proposal?.response}</span></div>
            <button className="primary-button" onClick={() => openHire(designer, job)}>Discuss with {designer.name.split(" ")[0]}</button>
          </section>;
        }) : <div className="applicant-empty"><b>No responses yet</b><p>We’ll show proposals here as designers reply.</p></div>}</div>}
      </article>;
    })}</div>}
  </>;
}

type HireStep = "chat" | "call" | "agreement" | "confirmation" | "payment";

function HireFlow({ designer, jobs, initialJob, close, hired }: { designer: (typeof recommendedDesigners)[number]; jobs: PostedJob[]; initialJob: PostedJob; close: () => void; hired: (job: PostedJob, designer: (typeof recommendedDesigners)[number]) => void }) {
  const [step, setStep] = useState<HireStep>("chat");
  const [jobId, setJobId] = useState(initialJob.id);
  const job = jobs.find((item) => item.id === jobId) ?? initialJob;
  const [messages, setMessages] = useState([`Hi, thanks for reaching out about “${job.title}”. What would you like to discuss?`]);
  const [draft, setDraft] = useState("");
  const [callDate, setCallDate] = useState("");
  const [callTime, setCallTime] = useState("");
  const [callComplete, setCallComplete] = useState(false);
  const [callStarted, setCallStarted] = useState(false);
  const [cameraOn, setCameraOn] = useState(true);
  const [microphoneOn, setMicrophoneOn] = useState(true);
  const [scope, setScope] = useState(job.description);
  const [deliverables, setDeliverables] = useState("Design files, source assets, and a handoff guide");
  const [timeline, setTimeline] = useState(job.deadline);
  const [price, setPrice] = useState(applicantProposals[designer.name]?.amount.replace(/[^0-9]/g, "") ?? "45000");
  const [agreed, setAgreed] = useState(false);
  const [paymentMethod, setPaymentMethod] = useState("UPI");
  const [checkoutNotice, setCheckoutNotice] = useState(false);
  const proposalAmount = Number(applicantProposals[designer.name]?.amount.replace(/[^0-9]/g, "") ?? price);
  const basePrice = Number(price) || proposalAmount;
  const discount = job.creditReserved ? Math.min(Math.round(basePrice * 0.15), 5000) : 0;
  const total = basePrice - discount;
  const sendMessage = () => { if (draft.trim()) { setMessages([...messages, draft.trim()]); setDraft(""); } };
  const steps: { id: HireStep; label: string }[] = [{ id: "chat", label: "Chat" }, { id: "call", label: "Video call" }, { id: "agreement", label: "Project details" }, { id: "confirmation", label: "Confirm" }, { id: "payment", label: "Payment" }];
  const go = (next: HireStep) => { setCheckoutNotice(false); setStep(next); };
  return <div className="hire-flow-overlay" role="dialog" aria-modal="true" aria-label={`Discuss hiring ${designer.name}`}>
    <button className="hire-flow-backdrop" onClick={close} aria-label="Close hiring flow" />
    <section className="hire-flow-panel">
      <header className="hire-flow-header"><div><span className="eyebrow">Hire a designer</span><h2>{designer.name}</h2><p>{designer.title} · {designer.ai}</p></div><button onClick={close} aria-label="Close">×</button></header>
      <nav className="hire-stepper" aria-label="Hiring steps">{steps.map((item, index) => <span className={item.id === step ? "active" : steps.findIndex((x) => x.id === step) > index ? "done" : ""} key={item.id}><i>{index + 1}</i>{item.label}</span>)}</nav>
      {step === "chat" && <div className="hire-step-content"><div className="hire-step-title"><h3>Start with a conversation</h3><p>Talk through the brief and ask questions before scheduling a call or discussing payment.</p></div>
        {jobs.length > 0 && <label className="job-select-label">Job you’re discussing<select value={jobId} onChange={(event) => { const nextJob = jobs.find((item) => item.id === event.target.value); if (nextJob) { setJobId(nextJob.id); setScope(nextJob.description); setTimeline(nextJob.deadline); } }}><option value={job.id}>{job.title}</option>{jobs.filter((item) => item.id !== job.id).map((item) => <option key={item.id} value={item.id}>{item.title}</option>)}</select></label>}
        <div className="hire-chat-thread">{messages.map((message, index) => <p key={`${message}-${index}`} className={index % 2 === 1 ? "mine" : ""}><small>{index % 2 === 1 ? "You" : designer.name}</small>{message}</p>)}</div>
        <div className="hire-chat-compose"><input value={draft} onChange={(event) => setDraft(event.target.value)} onKeyDown={(event) => event.key === "Enter" && sendMessage()} placeholder={`Message ${designer.name.split(" ")[0]}`} /><button onClick={sendMessage}>Send</button></div>
        <div className="hire-flow-actions"><button className="primary-button" disabled={messages.length < 2} onClick={() => go("call")}>Schedule video discussion</button></div>
      </div>}
      {step === "call" && <div className="hire-step-content"><div className="hire-step-title"><h3>Meet before you decide</h3><p>Choose a time to discuss the brief together. Payment stays locked until the call and project details are complete.</p></div>
        <div className="call-schedule-card"><label>Date<input type="date" value={callDate} onChange={(event) => setCallDate(event.target.value)} /></label><label>Time<input type="time" value={callTime} onChange={(event) => setCallTime(event.target.value)} /></label><span>Timezone: Asia/Kolkata (IST)</span></div>
        {callDate && callTime && <div className="scheduled-call-note"><b>Video discussion scheduled</b><span>{callDate} at {callTime} IST · {designer.name}</span><small>Start a preview call room to complete this step. Live video requires a call provider.</small>{!callStarted && !callComplete && <button className="primary-button" onClick={() => setCallStarted(true)}>Start video discussion</button>}{callStarted && <div className="video-room"><div className="video-tile"><img src={`${A}/${designer.avatar}`} alt="" /><b>{designer.name}</b><small>Video preview placeholder</small></div><div className="video-tile self"><div className="video-initials">You</div><b>You</b><small>{cameraOn ? "Camera on" : "Camera off"}</small></div><div className="video-room-controls"><button onClick={() => setMicrophoneOn(!microphoneOn)}>{microphoneOn ? "Mute microphone" : "Turn microphone on"}</button><button onClick={() => setCameraOn(!cameraOn)}>{cameraOn ? "Turn camera off" : "Turn camera on"}</button><button className="danger-button" onClick={() => { setCallStarted(false); setCallComplete(true); }}>End discussion</button></div><small>No live audio or video is transmitted in this prototype.</small></div>}{callComplete && <b className="call-complete-note">Discussion complete</b>}</div>}
        <div className="hire-flow-actions"><button className="outline-button" onClick={() => go("chat")}>Back to chat</button><button className="primary-button" disabled={!callDate || !callTime || !callComplete} onClick={() => go("agreement")}>Continue to project details</button></div>
      </div>}
      {step === "agreement" && <div className="hire-step-content"><div className="hire-step-title"><h3>Agree on the project together</h3><p>Set the scope, deliverables, timeline, and price together.</p></div>
        <label className="hire-field">Scope of work<textarea value={scope} onChange={(event) => setScope(event.target.value)} /></label><label className="hire-field">Deliverables<textarea value={deliverables} onChange={(event) => setDeliverables(event.target.value)} /></label><div className="hire-fields-row"><label className="hire-field">Target date<input value={timeline} onChange={(event) => setTimeline(event.target.value)} placeholder="e.g. 20 Nov 2026" /></label><label className="hire-field">Agreed project price (₹)<input type="number" min="1" value={price} onChange={(event) => setPrice(event.target.value)} /></label></div>
        {job.creditReserved && <div className="credit-applied-note">Starter credit reserved: −₹{discount.toLocaleString("en-IN")} at checkout. Total after credit: ₹{total.toLocaleString("en-IN")}.</div>}
        <label className="mutual-agreement"><input type="checkbox" checked={agreed} onChange={(event) => setAgreed(event.target.checked)} /><span>Both sides agree to the scope, deliverables, timeline, and price above.</span></label>
        <div className="hire-flow-actions"><button className="outline-button" onClick={() => go("call")}>Back to video call</button><button className="primary-button" disabled={!scope.trim() || !deliverables.trim() || !timeline.trim() || basePrice <= 0 || !agreed} onClick={() => go("confirmation")}>Review agreement</button></div>
      </div>}
      {step === "confirmation" && <div className="hire-step-content"><div className="hire-step-title"><h3>Confirm the project</h3><p>Both sides have reviewed the agreed details. Payment starts only after you confirm this summary.</p></div><section className="hire-confirmation-summary"><span>{job.title}</span><h4>{designer.name}</h4><p><b>Scope</b>{scope}</p><p><b>Deliverables</b>{deliverables}</p><div><span>Timeline</span><b>{timeline}</b></div><div><span>Agreed price</span><b>₹{basePrice.toLocaleString("en-IN")}</b></div>{discount > 0 && <div><span>Starter credit</span><b>−₹{discount.toLocaleString("en-IN")}</b></div>}<div className="hire-summary-total"><span>Total after credit</span><b>₹{total.toLocaleString("en-IN")}</b></div></section><div className="hire-flow-actions"><button className="outline-button" onClick={() => go("agreement")}>Edit details</button><button className="primary-button" onClick={() => { hired(job, designer); go("payment"); }}>Confirm hire & continue to payment</button></div></div>}
      {step === "payment" && <div className="hire-step-content"><div className="hire-step-title"><h3>Secure project payment</h3><p>Your hiring details are confirmed. The advance is due now; the remaining balance is released after final delivery approval.</p></div><section className="payment-summary"><div><span>Agreed project total</span><b>₹{total.toLocaleString("en-IN")}</b></div><div><span>10% advance to start</span><b>₹{Math.ceil(total * 0.1).toLocaleString("en-IN")}</b></div><div><span>Remaining 90% after approved delivery</span><b>₹{Math.floor(total * 0.9).toLocaleString("en-IN")}</b></div></section><fieldset className="payment-methods"><legend>Choose a payment method</legend>{["UPI", "Card", "Net banking"].map((method) => <label key={method}><input type="radio" name="payment-method" checked={paymentMethod === method} onChange={() => setPaymentMethod(method)} />{method}</label>)}</fieldset><div className="payment-gateway-note"><b>Protected checkout</b><span>Payment provider setup is required before a real charge can be taken. No payment has been made.</span></div>{checkoutNotice && <p className="form-error" role="status">Secure checkout is not connected yet. Your confirmed project is saved and no charge was made.</p>}<div className="hire-flow-actions"><button className="outline-button" onClick={() => go("confirmation")}>Review agreement</button><button className="primary-button" onClick={() => setCheckoutNotice(true)}>Continue to secure payment</button></div></div>}
    </section>
  </div>;
}

function ClientChatPage() {
  const contacts = ["Umang Donga", "Yashraj Gohil", "Darshan Solanki"];
  const [contact, setContact] = useState(contacts[0]);
  const [draft, setDraft] = useState("");
  const [messages, setMessages] = useState<Record<string, string[]>>({
    "Umang Donga": ["Hi Mr. Parekh, I reviewed the Noble Paws brief.", "The packaging direction is clear. I can share an initial moodboard tomorrow."],
    "Yashraj Gohil": ["Thank you for saving my profile. Would you like to discuss the website project?"],
    "Darshan Solanki": ["I work fully human-made for identity projects and can share source files at every milestone."],
  });
  const send = () => {
    if (!draft.trim()) return;
    setMessages({ ...messages, [contact]: [...messages[contact], draft.trim()] });
    setDraft("");
  };
  return (
    <>
      <ClientPageHeader eyebrow="Client messages" title="Chat with designers" description="Keep briefs, feedback, and project decisions together." />
      <div className="client-chat-layout"><aside>{contacts.map((name, index) => <button className={contact === name ? "active" : ""} onClick={() => setContact(name)} key={name}><img src={`${A}/${recommendedDesigners[index].avatar}`} alt="" /><span><b>{name}</b><small>{index === 0 ? "Active now" : "Recently active"}</small></span></button>)}</aside><section><header><div className="designer-identity"><img src={`${A}/${recommendedDesigners[contacts.indexOf(contact)].avatar}`} alt="" /><span><b>{contact}</b><small>Verified designer</small></span></div><span className="chat-prehire-label">Pre-hire discussion</span></header><div className="client-chat-thread">{messages[contact].map((message, index) => <div className={index % 2 ? "mine" : ""} key={`${message}-${index}`}><small>{index % 2 ? "You" : contact}</small><p>{message}</p></div>)}</div><footer><input value={draft} onChange={(event) => setDraft(event.target.value)} onKeyDown={(event) => event.key === "Enter" && send()} placeholder={`Message ${contact}`} /><button onClick={send}>Send</button></footer></section></div>
    </>
  );
}

function ClientProfilePage() {
  const [saved, setSaved] = useState(false);
  const [profile, setProfile] = useState({ name: "Mr. Parekh", company: "Noble Paws", website: "https://noblepaws.in", location: "Ahmedabad, India", bio: "Noble Paws creates thoughtful, organic pet nutrition products for modern families." });
  return (
    <>
      <ClientPageHeader eyebrow="Client account" title="Profile & company" description="Keep your public hiring identity accurate for verified designers." />
      <section className="client-profile-card"><div className="client-profile-avatar">NP</div><div><h2>Noble Paws</h2><p>Verified client • 12 projects posted • 4.9 client rating</p><span>Payments verified</span></div></section>
      <section className="client-form-card"><div className="form-grid"><label>Full name<input value={profile.name} onChange={(event) => setProfile({ ...profile, name: event.target.value })} /></label><label>Company<input value={profile.company} onChange={(event) => setProfile({ ...profile, company: event.target.value })} /></label><label>Website<input value={profile.website} onChange={(event) => setProfile({ ...profile, website: event.target.value })} /></label><label>Location<input value={profile.location} onChange={(event) => setProfile({ ...profile, location: event.target.value })} /></label><label className="full">About your business<textarea value={profile.bio} onChange={(event) => setProfile({ ...profile, bio: event.target.value })} /></label></div><button className="primary-button" onClick={() => { setSaved(true); window.setTimeout(() => setSaved(false), 1800); }}>{saved ? "Profile saved" : "Save profile"}</button></section>
    </>
  );
}

function ClientSettingsPage({ logout }: { logout: () => void }) {
  const [settings, setSettings] = useState({ proposals: true, messages: true, milestones: true, discoverable: false });
  return (
    <>
      <ClientPageHeader eyebrow="Client account" title="Settings & privacy" description="Control project alerts, communication, account security, and privacy." />
      <section className="client-settings-card"><h2>Notifications</h2><Toggle label="New proposal alerts" detail="Notify me when a verified designer applies to a project." checked={settings.proposals} change={() => setSettings({ ...settings, proposals: !settings.proposals })} /><Toggle label="Messages from designers" detail="Receive email alerts for unread project messages." checked={settings.messages} change={() => setSettings({ ...settings, messages: !settings.messages })} /><Toggle label="Milestone and payment updates" detail="Get reminders for approvals, escrow deposits, and releases." checked={settings.milestones} change={() => setSettings({ ...settings, milestones: !settings.milestones })} /></section>
      <section className="client-settings-card"><h2>Privacy</h2><Toggle label="Allow talent recommendations" detail="Use project history to improve designer matching." checked={settings.discoverable} change={() => setSettings({ ...settings, discoverable: !settings.discoverable })} /><div className="settings-action-row"><button>Change password</button><button className="danger-button" onClick={logout}>Log out</button></div></section>
    </>
  );
}

function CompanyVerificationGate({ verified, updateDetails, logout }: { verified: () => void; updateDetails: () => void; logout: () => void }) {
  const [review, setReview] = useState<CompanyReview | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const refresh = async () => {
    setLoading(true);
    setError("");
    try {
      const result = await companyVerificationRequest("GET");
      setReview(result.request);
      if (result.request?.status === "verified") verified();
    } catch (issue) { setError(issue instanceof Error ? issue.message : "Unable to check the verification status."); }
    finally { setLoading(false); }
  };
  useEffect(() => { void refresh(); }, []);
  return <div className="company-gate-page"><div className="company-gate-card"><Logo /><span className="step-label">Client account verification</span><h1>{review?.status === "verified" ? "Company verified" : review?.status === "rejected" ? "More details needed" : "Your company is under review"}</h1><p>We check company accounts before opening the client workspace. Your submitted website or LinkedIn company page is reviewed by FindRight.</p>
    {review && <section className="company-review-summary"><div><b>{review.companyName}</b><span className={`company-review-status ${review.status}`}>{review.status === "pending" ? "In review" : review.status === "verified" ? "Verified" : "Needs changes"}</span></div><small>{review.method === "website" ? review.website : review.linkedin}</small>{review.status === "pending" && <p>We’ll unlock the workspace after a reviewer confirms the company details. A submitted URL alone does not count as approval.</p>}{review.reviewNote && <p>{review.reviewNote}</p>}</section>}
    {!review && !loading && <div className="company-review-summary"><b>No company verification request found</b><p>Complete your company details to submit a review.</p></div>}
    {loading && <p className="company-gate-status">Checking verification status…</p>}{error && <p className="form-error" role="alert">{error}</p>}
    <div className="company-gate-actions"><button className="primary-button" onClick={() => void refresh()} disabled={loading}>{loading ? "Checking…" : "Check verification status"}</button><button className="outline-button" onClick={updateDetails}>Update company details</button><button className="back-link" onClick={logout}>Sign out</button></div>
  </div></div>;
}

function ClientDashboard({ logout, userId }: { logout: () => void; userId: string }) {
  const [active, setActive] = useState("home");
  const [homeTab, setHomeTab] = useState("activity");
  const [posting, setPosting] = useState(false);
  const [projects, setProjects] = useState(clientProjects);
  const [jobs, setJobs] = useState<PostedJob[]>(samplePostedJobs);
  const [creditsRemaining, setCreditsRemaining] = useState(3);
  const [loadedUser, setLoadedUser] = useState("");
  const [notice, setNotice] = useState("");
  const [savedDesigners, setSavedDesigners] = useState<string[]>([]);
  const [selectedDesigner, setSelectedDesigner] = useState<string | null>(null);
  const [hire, setHire] = useState<{ designer: (typeof recommendedDesigners)[number]; job: PostedJob } | null>(null);
  useEffect(() => {
    if (!userId) return;
    try {
      const storedJobs = localStorage.getItem(`findright:${userId}:posted-jobs`);
      const parsedJobs = storedJobs ? JSON.parse(storedJobs) as unknown : null;
      setJobs(Array.isArray(parsedJobs) ? parsedJobs as PostedJob[] : samplePostedJobs);
      const storedCredits = localStorage.getItem(`findright:${userId}:starter-credits`);
      setCreditsRemaining(storedCredits === null ? 3 : Math.max(0, Number(storedCredits) || 0));
    } catch { setJobs(samplePostedJobs); setCreditsRemaining(3); }
    setLoadedUser(userId);
  }, [userId]);
  useEffect(() => { if (userId && loadedUser === userId) localStorage.setItem(`findright:${userId}:posted-jobs`, JSON.stringify(jobs)); }, [jobs, loadedUser, userId]);
  useEffect(() => { if (userId && loadedUser === userId) localStorage.setItem(`findright:${userId}:starter-credits`, String(creditsRemaining)); }, [creditsRemaining, loadedUser, userId]);
  const toggleSaved = (name: string) => setSavedDesigners(savedDesigners.includes(name) ? savedDesigners.filter((item) => item !== name) : [...savedDesigners, name]);
  const openProfile = (name: string) => { setSelectedDesigner(name); setActive("find"); };
  const openHire = (designer: (typeof recommendedDesigners)[number], job: PostedJob = jobs[0]) => { setSelectedDesigner(null); setHire({ designer, job }); };
  if (posting) return <JobPostFlow close={() => setPosting(false)} creditsRemaining={creditsRemaining} posted={(job) => { const nextJob: PostedJob = { ...job, id: `job-${Date.now()}`, applicants: [] }; setJobs([nextJob, ...jobs]); if (job.creditReserved) setCreditsRemaining(Math.max(0, creditsRemaining - 1)); setPosting(false); setActive("jobs"); setNotice(job.creditReserved ? "Job posted. A starter credit is reserved for your first hire." : "Job posted. Responses will appear in Posted jobs."); }} />;
  return (
    <div className="client-shell">
      <ClientTopbar setActive={setActive} startJob={() => setPosting(true)} credits={creditsRemaining} />
      <ClientSidebar active={active} setActive={setActive} />
      <main className="client-main">
        {notice && <div className="success-notice">{notice}<button onClick={() => setNotice("")}>Dismiss</button></div>}
        {active === "home" && <><header className="client-welcome"><div><h1>Welcome, Mr. Parekh</h1><p>Noble Paws Pet Health Co. · Manage active projects, escrow contracts & verified rising designers</p></div><div className="dashboard-discipline-pills">{["UI/UX Design", "Graphic Design", "Product Design", "Motion Design"].map((label, index) => <button className={index === 0 ? "active" : ""} onClick={() => setActive("find")} key={label}>{label}</button>)}</div></header><div className="client-escrow-status"><b><ClientIcon name="shield" size={16} /> Escrow Protected</b><span>10% advance after project confirmation · Remaining 90% after approved delivery</span></div><nav className="dashboard-tabs" aria-label="Dashboard activity"><button className={homeTab === "activity" ? "active" : ""} onClick={() => { setHomeTab("activity"); setActive("home"); }}>All Activity (5)</button><button className={homeTab === "jobs" ? "active" : ""} onClick={() => { setHomeTab("jobs"); setActive("jobs"); }}>Posted Jobs & Applicants <i>{jobs.length} live</i></button><button className={homeTab === "contracts" ? "active" : ""} onClick={() => { setHomeTab("contracts"); setActive("projects"); }}>Active Contracts <i className="green">{projects.length} in escrow</i></button></nav><div className="client-dashboard-grid">
          <section className="client-projects">
            <div className="dashboard-section-heading"><h2><i /> Your Posted Jobs & Replies ({jobs.length})</h2><button onClick={() => { setHomeTab("jobs"); setActive("jobs"); }}>All Posted Jobs & Applicants →</button><button className="text-post-job" onClick={() => setPosting(true)}><ClientIcon name="plus" size={15} /> Post Job</button></div>
            {jobs.slice(0, 1).map((job) => { const responders = job.applicants.slice(0, 3); return <article className="home-posted-job" key={job.id}><div className="home-job-heading"><div><span className="job-status-pill">● Open for Proposals</span><span className="posted-job-category">{job.category}</span><h3>{job.title}</h3><p>Budget: {job.budget} · Due {job.deadline}</p></div><button className="primary-button" onClick={() => { setHomeTab("jobs"); setActive("jobs"); }}><ClientIcon name="user" size={16} /> Review Proposals ({job.applicants.length})</button></div><button className="home-job-replies" onClick={() => { setHomeTab("jobs"); setActive("jobs"); }}><span className="reply-avatars">{responders.map((name) => <i key={name}>{name.split(" ").map((part) => part[0]).join("")}</i>)}</span><span><b>{job.applicants.length} Freelancers Replied & Sent Proposals</b><small>{responders.join(", ")}{job.applicants.length > responders.length ? ` +${job.applicants.length - responders.length} more` : ""}</small></span><strong>View Replies & Proposals →</strong></button></article>; })}
            <div className="dashboard-section-heading active-project-heading"><h2>Active Projects & Escrow Contracts ({projects.length})</h2><button className="primary-button" onClick={() => setPosting(true)}><ClientIcon name="plus" size={16} /> Create Project</button></div>
            {projects.map((project) => <article key={project.title}><div><h3>{project.title}</h3><p>{project.description}</p></div><button onClick={() => setActive("projects")}>Read Brief</button><span className="client-ai">{project.ai}</span><div className="client-project-meta"><b>Budget: {project.budget}</b><b>Timeline: 2–3 weeks · {project.progress}%</b></div><div className="client-progress"><i style={{ width: `${project.progress}%` }} /></div></article>)}
          </section>
          <section className="designer-results">
            <div className="designer-filters">{["UI/UX Design", "Graphic Design", "Product Design", "Motion Design"].map((item, index) => <button className={index === 0 ? "active" : ""} onClick={() => setActive("find")} key={item}>{item}</button>)}</div>
            {recommendedDesigners.map((designer) => <article className="designer-card" key={designer.name}><div className="designer-identity"><img src={`${A}/${designer.avatar}`} alt="" /><span><b>{designer.name}</b><small>{designer.title}</small></span><strong>★ {designer.rating}</strong></div><span className="designer-ai">{designer.ai}</span><div className="designer-work">{designer.works.map((work) => <img src={`${A}/${work}`} alt="" key={work} />)}</div><footer><span>• 32 completed projects</span><div><button onClick={() => toggleSaved(designer.name)}>{savedDesigners.includes(designer.name) ? "Saved" : "Save"}</button><button onClick={() => openProfile(designer.name)}>View Profile</button></div></footer></article>)}
          </section>
        </div></>}
        {active === "find" && <>{selectedDesigner && <div className="selected-designer-banner">Viewing {selectedDesigner}'s verified profile <button onClick={() => setSelectedDesigner(null)}>Close</button></div>}<DesignerDirectory saved={savedDesigners} toggleSaved={toggleSaved} openProfile={openProfile} /></>}
        {active === "jobs" && <PostedJobsPage jobs={jobs} create={() => setPosting(true)} openHire={openHire} />}
        {active === "projects" && <ClientProjectsPage projects={projects} create={() => setPosting(true)} />}
        {active === "chat" && <ClientChatPage />}
        {active === "profile" && <ClientProfilePage />}
        {active === "settings" && <ClientSettingsPage logout={logout} />}
      </main>
      {selectedDesigner && active === "find" && (() => {
        const designer = recommendedDesigners.find((item) => item.name === selectedDesigner)!;
        return <div className="designer-profile-overlay" role="dialog" aria-modal="true" aria-label={`${designer.name} profile`}><button className="overlay-backdrop" onClick={() => setSelectedDesigner(null)} aria-label="Close profile" /><section className="designer-profile-panel"><button className="profile-close" onClick={() => setSelectedDesigner(null)}>Close</button><div className="designer-profile-head"><img src={`${A}/${designer.avatar}`} alt="" /><div><span className="pill success">Identity verified</span><h2>{designer.name}</h2><p>{designer.title} • Ahmedabad, India</p><b>★ {designer.rating} • 32 completed projects</b></div></div><p className="designer-profile-bio">Multi-disciplinary designer focused on thoughtful brand systems, accessible digital experiences, and production-ready project delivery with clear human–AI disclosure.</p><div className="tag-row">{["Brand Identity", "UI/UX Design", "Typography", "Design Systems"].map((item) => <span key={item}>{item}</span>)}</div><h3>Selected portfolio work</h3><div className="profile-work-grid">{designer.works.map((work) => <img src={`${A}/${work}`} alt="" key={work} />)}</div><div className="profile-disclosure"><b>AI usage disclosure</b><span>{designer.ai}</span></div><footer><button className="outline-button" onClick={() => toggleSaved(designer.name)}>{savedDesigners.includes(designer.name) ? "Saved to shortlist" : "Save profile"}</button><button className="primary-button" onClick={() => openHire(designer)}>Start hiring discussion</button></footer></section></div>;
      })()}
      {hire && <HireFlow designer={hire.designer} jobs={jobs} initialJob={hire.job} close={() => setHire(null)} hired={(job, designer) => { setProjects([{ title: job.title, description: job.description, budget: job.budget, progress: 0, ai: designer.ai }, ...projects]); setNotice(`Hiring confirmed with ${designer.name}. Advance payment is available after project agreement.`); }} />}
    </div>
  );
}

export default function App() {
  const [view, setView] = useState<View>("home");
  const [stage, setStage] = useState<EntryStage>("landing");
  const [role, setRole] = useState<Role>("designer");
  const [authMode, setAuthMode] = useState<AuthMode>("sign-up");
  const [userId, setUserId] = useState("");
  useEffect(() => {
    void supabase.auth.getSession().then(async ({ data }) => {
      const user = data.session?.user;
      if (!user?.email_confirmed_at) return;
      setUserId(user.id);
      const metadata = user.user_metadata ?? {};
      const savedRole = metadata.role;
      if (savedRole === "client" || savedRole === "designer") setRole(savedRole);
      if (savedRole !== "client") { setStage("app"); return; }
      if (metadata.account_type === "personal") { setStage("app"); return; }
      if (metadata.account_type === "company") {
        try {
          const { request } = await companyVerificationRequest("GET");
          setStage(request?.status === "verified" ? "app" : "company-verification");
        } catch { setStage("company-verification"); }
        return;
      }
      setStage("onboarding");
    });
  }, []);
  const begin = (mode: AuthMode) => { setAuthMode(mode); setStage("role"); };
  const chooseRole = (nextRole: Role) => { setRole(nextRole); setStage("auth"); };
  const authenticate = async () => {
    if (authMode === "sign-up") { setStage("onboarding"); return; }
    const { data } = await supabase.auth.getSession();
    const authenticatedUser = data.session?.user;
    if (authenticatedUser) setUserId(authenticatedUser.id);
    const metadata = authenticatedUser?.user_metadata ?? {};
    const authenticatedRole = metadata.role === "client" || metadata.role === "designer" ? metadata.role : role;
    setRole(authenticatedRole);
    if (authenticatedRole !== "client") { setStage("app"); return; }
    if (metadata.account_type === "personal") { setStage("app"); return; }
    if (metadata.account_type === "company") {
      try {
        const { request } = await companyVerificationRequest("GET");
        setStage(request?.status === "verified" ? "app" : "company-verification");
      } catch { setStage("company-verification"); }
      return;
    }
    setStage("onboarding");
  };
  const finishOnboarding = async (account: { kind: "personal" } | { kind: "company"; companyName: string; website: string; linkedin: string; method: "website" | "linkedin" }) => {
    if (role !== "client") { setStage("app"); return; }
    if (account.kind === "personal") {
      const { data } = await supabase.auth.updateUser({ data: { account_type: "personal" } });
      if (data.user) setUserId(data.user.id);
      setStage("app");
      return;
    }
    const { data, error } = await supabase.auth.updateUser({ data: { account_type: "company" } });
    if (data.user) setUserId(data.user.id);
    if (error) { setStage("company-verification"); return; }
    try {
      await companyVerificationRequest("POST", account);
    } catch {
      setStage("company-verification");
      return;
    }
    setStage("company-verification");
  };
  const logout = () => { void supabase.auth.signOut(); setView("home"); setStage("landing"); };
  if (stage === "landing") return <Landing begin={begin} />;
  if (stage === "role") return <RoleSelection mode={authMode} choose={chooseRole} back={() => setStage("landing")} />;
  if (stage === "auth") return <AuthScreen role={role} mode={authMode} setMode={setAuthMode} continueFlow={authenticate} back={() => setStage("role")} />;
  if (stage === "onboarding") return <Onboarding role={role} finish={finishOnboarding} back={() => setStage("auth")} />;
  if (stage === "company-verification") return <CompanyVerificationGate verified={() => setStage("app")} updateDetails={() => setStage("onboarding")} logout={logout} />;
  if (role === "client") return <ClientDashboard logout={logout} userId={userId} />;
  return (
    <div className="app-shell">
      <Sidebar view={view} setView={setView} logout={logout} />
      <div className="content-shell">
        {view === "home" && <Dashboard setView={setView} />}
        {view === "projects" && <Projects setView={setView} />}
        {view === "workspace" && <Workspace />}
        {view === "progression" && <Progression />}
        {view === "profile" && <Profile />}
        {view === "settings" && <Settings />}
      </div>
    </div>
  );
}
