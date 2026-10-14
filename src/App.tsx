import { useEffect, useMemo, useState } from "react";
import { supabase } from "./supabase";

type View = "home" | "projects" | "workspace" | "progression" | "profile" | "settings";
type SettingsTab = "profile" | "reputation" | "ai" | "privacy";
type AiChoice = "No AI" | "AI ideation" | "AI execution";
type EntryStage = "landing" | "role" | "auth" | "onboarding" | "app";
type Role = "designer" | "client";
type AuthMode = "sign-up" | "sign-in";

const A = "/assets";

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

function Onboarding({ role, finish, back }: { role: Role; finish: () => void; back: () => void }) {
  const [step, setStep] = useState(1);
  const [selected, setSelected] = useState<string[]>([]);
  const [setup, setSetup] = useState("");
  const [fields, setFields] = useState({ fullName: "", secondary: "", experience: "" });
  const [validationError, setValidationError] = useState("");
  const finalStep = role === "client" ? 3 : 2;
  const displayStep = step + 1;
  const toggle = (item: string) => setSelected(selected.includes(item) ? selected.filter((x) => x !== item) : [...selected, item]);
  const advance = () => {
    setValidationError("");
    if (step === 1) {
      if (!fields.fullName.trim() || !fields.secondary.trim() || (role === "designer" && !fields.experience.trim())) {
        setValidationError("Fill in every text field before continuing.");
        return;
      }
      if (role === "client" && !setup) {
        setValidationError("Choose who you are hiring for.");
        return;
      }
      if (selected.length === 0) {
        setValidationError(role === "client" ? "Choose at least one service purpose." : "Choose at least one creative specialty.");
        return;
      }
    } else if ((role === "designer" || step === 3) && selected.length === 0) {
      setValidationError("Choose at least one topic before continuing.");
      return;
    }
    if (step === finalStep) finish();
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
            <label>{role === "designer" ? "Location" : "Website"}<input required value={fields.secondary} onChange={(event) => setFields({ ...fields, secondary: event.target.value })} placeholder={role === "designer" ? "ex. Bopal, Ahmedabad, India" : "http//example.com"} /></label>
            {role === "designer" && <label>Years of Professional Design Experience<input required value={fields.experience} onChange={(event) => setFields({ ...fields, experience: event.target.value })} placeholder="ex. 0 years UX Designer" /></label>}
          </div>
          {role === "designer" && <><h3 className="field-heading">Primary skills & creative specialties (multi-select)</h3><div className="skill-pills">{["UI/UX Design", "Brand Identity", "Typography", "Logo Design", "Vector Illustrations", "Packaging & Dielines", "Motion Graphics", "Design Systems", "Mobile/IoS Design", "Saas Design"].map((item) => <button key={item} className={selected.includes(item) ? "active" : ""} onClick={() => toggle(item)}>{item}</button>)}</div></>}
          {role === "client" && <><h3 className="field-heading">What do you plan to order services for?</h3><p className="field-note">There's something for everyone</p><div className="service-grid">{["Primary job or business", "Secondary business", "Non-business needs"].map((item) => <button key={item} className={selected.includes(item) ? "active" : ""} onClick={() => toggle(item)}><img src={`${A}/78ed7.svg`} alt="" />{item}</button>)}</div></>}
        </>}
        {step === 2 && role === "client" && <>
          <div className="onboarding-heading"><h1>Your starter hire credits are unlocked</h1><p>Try new talent with less risk. Give rising talent a chance.</p></div>
          <div className="credit-grid">{["1st hire", "1st hire", "1st hire"].map((item, index) => <article key={`${item}-${index}`}><div><span>CREDIT 1</span><i>✓ Available</i></div><b>15% OFF</b><p>Up to $500 on rising talent</p><small>Valid for your {item}</small></article>)}</div>
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

const clientProjects = [
  { title: "Packaging for Noble Paws", description: "Create recyclable packs for organic pet food, made for everyday wellbeing.", budget: "₹4000–₹6000", progress: 72, ai: "AI-supported design" },
  { title: "Website Design for Noble Paws", description: "Design a welcoming shop that helps pet owners find the right daily nutrition.", budget: "₹6000–₹10000", progress: 82, ai: "No AI included" },
  { title: "Brand Identity for Noble Paws", description: "Build a warm, trusted identity for an organic pet food brand with a purpose.", budget: "₹3500–₹5000", progress: 50, ai: "AI-supported design" },
];

const recommendedDesigners = [
  { name: "Umang Donga", title: "UI Designer", rating: "3.5", avatar: "3f8c7.png", works: ["85fba.png", "71e23.png", "04b9e.png"], ai: "AI-assisted ideation" },
  { name: "Yashraj Gohil", title: "UX Designer", rating: "4.0", avatar: "cafad.png", works: ["35386.png", "56dc5.png", "4646f.png"], ai: "AI-assisted ideation" },
  { name: "Darshan Solanki", title: "UI/UX Designer | Product Designer", rating: "4.5", avatar: "bff29.png", works: ["71e50.png", "567c5.png", "f5bf1.png"], ai: "No AI (100% human-made)" },
];

function ClientSidebar({ active, setActive, logout }: { active: string; setActive: (value: string) => void; logout: () => void }) {
  const items = [
    ["home", "Home", "3cb37.svg"],
    ["find", "Find", "cae0c.svg"],
    ["projects", "Projects", "eb6a2.svg"],
    ["chat", "Chat", "0dcf1.svg"],
  ];
  return (
    <aside className="client-sidebar">
      <button className="client-logo" onClick={() => setActive("home")}><img src={`${A}/10540.svg`} alt="FindRight" /></button>
      <nav>{items.map(([id, label, icon]) => <button key={id} className={active === id ? "active" : ""} onClick={() => setActive(id)}><img src={`${A}/${icon}`} alt="" /><span>{label}</span></button>)}</nav>
      <div className="client-side-bottom">
        <button className={active === "profile" ? "active" : ""} onClick={() => setActive("profile")}><img src={`${A}/a27af.svg`} alt="" /><span>Profile</span></button>
        <button className={active === "settings" ? "active" : ""} onClick={() => setActive("settings")}><img src={`${A}/e7255.svg`} alt="" /><span>Settings</span></button>
        <button onClick={logout}><img src={`${A}/e3424.svg`} alt="" /><span>Log out</span></button>
      </div>
    </aside>
  );
}

function JobPostFlow({ close, posted }: { close: () => void; posted: (title: string) => void }) {
  const [step, setStep] = useState(1);
  const [category, setCategory] = useState("");
  const [jobType, setJobType] = useState("Freelance project");
  const [experience, setExperience] = useState("");
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [budget, setBudget] = useState("");
  const [deadline, setDeadline] = useState("");
  const [error, setError] = useState("");
  const next = () => {
    setError("");
    if (step === 1 && (!category || !jobType || !experience)) return setError("Choose a job category, job type, and required experience level.");
    if (step === 2 && (!title.trim() || !description.trim())) return setError("Fill in the job title and description before continuing.");
    if (step === 3 && (!budget.trim() || !deadline)) return setError("Fill in the project budget and submission deadline.");
    if (step === 4) return posted(title);
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
          <label className="job-input">Project budget<input required value={budget} onChange={(event) => setBudget(event.target.value)} placeholder="$ 1,500" /><small>Total project budget in USD. Freelancers will propose within this amount.</small></label>
          <label className="job-input">Project submission deadline<input required type="date" value={deadline} onChange={(event) => setDeadline(event.target.value)} /><small>Final deliverables are due by this date. Give your freelancer time to do their best work.</small></label>
        </>}
        {step === 4 && <>
          <div className="job-flow-heading"><h1>Preview your job post</h1><p>Everything look right? Your next great collaborator is one post away.</p></div>
          <section className="job-preview">
            <span>JOB POST PREVIEW</span><h2>{title}</h2>
            <div><small>Category<b>{category}</b></small><small>Job type<b>{jobType}</b></small><small>Experience<b>{experience}</b></small></div>
            <p>{description}</p>
            <div className="preview-meta"><small>Project budget · USD<b>{budget}</b></small><small>Submission deadline<b>{deadline}</b></small></div>
            <button className="preview-file"><img src={`${A}/d9418.svg`} alt="" /><span>Website brief.pdf<small>PDF · 2.4 MB · Reference file</small></span><b>View file</b></button>
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
  const matches = recommendedDesigners.filter((designer) => `${designer.name} ${designer.title}`.toLowerCase().includes(query.toLowerCase()));
  return (
    <>
      <ClientPageHeader eyebrow="Verified creative talent" title="Find the right designer" description="Search by discipline, compare real portfolio work, and review transparent AI usage." />
      <div className="client-search-row"><label><img src={`${A}/cae0c.svg`} alt="" /><input value={query} onChange={(event) => setQuery(event.target.value)} placeholder="Search by designer, skill, or discipline" /></label><select><option>Available now</option><option>This week</option><option>This month</option></select></div>
      <div className="client-filter-chips">{["All designers", "UI/UX Design", "Graphic Design", "Product Design", "Motion Design"].map((item) => <button key={item} className={category === item ? "active" : ""} onClick={() => setCategory(item)}>{item}</button>)}</div>
      <div className="directory-grid">{matches.map((designer) => <article className="directory-card" key={designer.name}><div className="designer-identity"><img src={`${A}/${designer.avatar}`} alt="" /><span><b>{designer.name}</b><small>{designer.title}</small></span><strong>★ {designer.rating}</strong></div><span className="designer-ai">{designer.ai}</span><div className="designer-work">{designer.works.map((work) => <img src={`${A}/${work}`} alt="" key={work} />)}</div><div className="directory-meta"><span>32 completed projects</span><span>Available this week</span></div><footer><button className={saved.includes(designer.name) ? "saved" : ""} onClick={() => toggleSaved(designer.name)}>{saved.includes(designer.name) ? "Saved" : "Save"}</button><button onClick={() => openProfile(designer.name)}>View Profile</button></footer></article>)}</div>
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
      <div className="client-chat-layout"><aside>{contacts.map((name, index) => <button className={contact === name ? "active" : ""} onClick={() => setContact(name)} key={name}><img src={`${A}/${recommendedDesigners[index].avatar}`} alt="" /><span><b>{name}</b><small>{index === 0 ? "Active now" : "Recently active"}</small></span></button>)}</aside><section><header><div className="designer-identity"><img src={`${A}/${recommendedDesigners[contacts.indexOf(contact)].avatar}`} alt="" /><span><b>{contact}</b><small>Verified designer</small></span></div><button>View contract</button></header><div className="client-chat-thread">{messages[contact].map((message, index) => <div className={index % 2 ? "mine" : ""} key={`${message}-${index}`}><small>{index % 2 ? "You" : contact}</small><p>{message}</p></div>)}</div><footer><input value={draft} onChange={(event) => setDraft(event.target.value)} onKeyDown={(event) => event.key === "Enter" && send()} placeholder={`Message ${contact}`} /><button onClick={send}>Send</button></footer></section></div>
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

function ClientDashboard({ logout }: { logout: () => void }) {
  const [active, setActive] = useState("home");
  const [posting, setPosting] = useState(false);
  const [projects, setProjects] = useState(clientProjects);
  const [notice, setNotice] = useState("");
  const [savedDesigners, setSavedDesigners] = useState<string[]>([]);
  const [selectedDesigner, setSelectedDesigner] = useState<string | null>(null);
  const toggleSaved = (name: string) => setSavedDesigners(savedDesigners.includes(name) ? savedDesigners.filter((item) => item !== name) : [...savedDesigners, name]);
  const openProfile = (name: string) => { setSelectedDesigner(name); setActive("find"); };
  if (posting) return <JobPostFlow close={() => setPosting(false)} posted={(title) => { setProjects([{ title, description: "Your newly posted project is ready to receive matched designer applications.", budget: "Budget pending", progress: 0, ai: "AI preference pending" }, ...projects]); setPosting(false); setNotice("Your job was posted successfully."); }} />;
  return (
    <div className="client-shell">
      <ClientSidebar active={active} setActive={setActive} logout={logout} />
      <main className="client-main">
        {notice && <div className="success-notice">{notice}<button onClick={() => setNotice("")}>Dismiss</button></div>}
        {active === "home" && <><header className="client-welcome"><h1>Welcome, Mr.Parekh</h1><button className="primary-button" onClick={() => setPosting(true)}>Create a new project <span>+</span></button></header><div className="client-dashboard-grid">
          <section className="client-projects">
            <h2>Active Projects</h2>
            {projects.map((project) => <article key={project.title}><div><h3>{project.title}</h3><p>{project.description}</p></div><button onClick={() => setActive("projects")}>Read Brief</button><span className="client-ai">{project.ai}</span><div className="client-project-meta"><b>Budget: {project.budget}</b><b>Timeline: 2–3 weeks · {project.progress}%</b></div><div className="client-progress"><i style={{ width: `${project.progress}%` }} /></div></article>)}
          </section>
          <section className="designer-results">
            <div className="designer-filters">{["UI/UX Design", "Graphic Design", "Product Design", "Motion Design"].map((item, index) => <button className={index === 0 ? "active" : ""} onClick={() => setActive("find")} key={item}>{item}</button>)}</div>
            {recommendedDesigners.map((designer) => <article className="designer-card" key={designer.name}><div className="designer-identity"><img src={`${A}/${designer.avatar}`} alt="" /><span><b>{designer.name}</b><small>{designer.title}</small></span><strong>★ {designer.rating}</strong></div><span className="designer-ai">{designer.ai}</span><div className="designer-work">{designer.works.map((work) => <img src={`${A}/${work}`} alt="" key={work} />)}</div><footer><span>• 32 completed projects</span><div><button onClick={() => toggleSaved(designer.name)}>{savedDesigners.includes(designer.name) ? "Saved" : "Save"}</button><button onClick={() => openProfile(designer.name)}>View Profile</button></div></footer></article>)}
          </section>
        </div></>}
        {active === "find" && <>{selectedDesigner && <div className="selected-designer-banner">Viewing {selectedDesigner}'s verified profile <button onClick={() => setSelectedDesigner(null)}>Close</button></div>}<DesignerDirectory saved={savedDesigners} toggleSaved={toggleSaved} openProfile={openProfile} /></>}
        {active === "projects" && <ClientProjectsPage projects={projects} create={() => setPosting(true)} />}
        {active === "chat" && <ClientChatPage />}
        {active === "profile" && <ClientProfilePage />}
        {active === "settings" && <ClientSettingsPage logout={logout} />}
      </main>
      {selectedDesigner && active === "find" && (() => {
        const designer = recommendedDesigners.find((item) => item.name === selectedDesigner)!;
        return <div className="designer-profile-overlay" role="dialog" aria-modal="true" aria-label={`${designer.name} profile`}><button className="overlay-backdrop" onClick={() => setSelectedDesigner(null)} aria-label="Close profile" /><section className="designer-profile-panel"><button className="profile-close" onClick={() => setSelectedDesigner(null)}>Close</button><div className="designer-profile-head"><img src={`${A}/${designer.avatar}`} alt="" /><div><span className="pill success">Identity verified</span><h2>{designer.name}</h2><p>{designer.title} • Ahmedabad, India</p><b>★ {designer.rating} • 32 completed projects</b></div></div><p className="designer-profile-bio">Multi-disciplinary designer focused on thoughtful brand systems, accessible digital experiences, and production-ready project delivery with clear human–AI disclosure.</p><div className="tag-row">{["Brand Identity", "UI/UX Design", "Typography", "Design Systems"].map((item) => <span key={item}>{item}</span>)}</div><h3>Selected portfolio work</h3><div className="profile-work-grid">{designer.works.map((work) => <img src={`${A}/${work}`} alt="" key={work} />)}</div><div className="profile-disclosure"><b>AI usage disclosure</b><span>{designer.ai}</span></div><footer><button className="outline-button" onClick={() => toggleSaved(designer.name)}>{savedDesigners.includes(designer.name) ? "Saved to shortlist" : "Save profile"}</button><button className="primary-button" onClick={() => { setSelectedDesigner(null); setNotice(`Project invitation sent to ${designer.name}.`); setActive("home"); }}>Send a project</button></footer></section></div>;
      })()}
    </div>
  );
}

export default function App() {
  const [view, setView] = useState<View>("home");
  const [stage, setStage] = useState<EntryStage>("landing");
  const [role, setRole] = useState<Role>("designer");
  const [authMode, setAuthMode] = useState<AuthMode>("sign-up");
  useEffect(() => {
    void supabase.auth.getSession().then(({ data }) => {
      if (data.session?.user.email_confirmed_at) {
        const savedRole = data.session.user.user_metadata.role;
        if (savedRole === "client" || savedRole === "designer") setRole(savedRole);
        setStage("app");
      }
    });
  }, []);
  const begin = (mode: AuthMode) => { setAuthMode(mode); setStage("role"); };
  const chooseRole = (nextRole: Role) => { setRole(nextRole); setStage("auth"); };
  const authenticate = () => setStage(authMode === "sign-up" ? "onboarding" : "app");
  const logout = () => { void supabase.auth.signOut(); setView("home"); setStage("landing"); };
  if (stage === "landing") return <Landing begin={begin} />;
  if (stage === "role") return <RoleSelection mode={authMode} choose={chooseRole} back={() => setStage("landing")} />;
  if (stage === "auth") return <AuthScreen role={role} mode={authMode} setMode={setAuthMode} continueFlow={authenticate} back={() => setStage("role")} />;
  if (stage === "onboarding") return <Onboarding role={role} finish={() => setStage("app")} back={() => setStage("auth")} />;
  if (role === "client") return <ClientDashboard logout={logout} />;
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
