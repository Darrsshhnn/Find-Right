import type { AiLevel, ClientProfile, DB, FreelancerProfile, Job, Project, User } from "./types";
import { hashPassword } from "./password";
import { DEMO_PASSWORD } from "./constants";

const day = 86_400_000;
const ago = (days: number, hours = 0) => new Date(Date.now() - days * day - hours * 3_600_000).toISOString();
const ahead = (days: number) => new Date(Date.now() + days * day).toISOString().slice(0, 10);

/** Example external portfolio links for the demo freelancers (reserved .example domains — replace with real ones). */
export const DEMO_LINKS: Record<string, { id: string; label: string; url: string }[]> = {
  u_umang: [{ id: "pl_u1", label: "Personal portfolio", url: "https://umang.portfolio.example/" }, { id: "pl_u2", label: "Case studies", url: "https://umang.portfolio.example/case-studies" }],
  u_darshan: [{ id: "pl_d1", label: "Personal portfolio", url: "https://darshan.portfolio.example/" }],
  u_yashraj: [{ id: "pl_y1", label: "UX research notes", url: "https://yashraj.portfolio.example/research" }],
  u_riya: [{ id: "pl_r1", label: "Motion reel", url: "https://riya.portfolio.example/reel" }],
};

export function createSeed(): DB {
  const passwordHash = hashPassword(DEMO_PASSWORD);
  const user = (id: string, role: User["role"], name: string, email: string, avatar?: string, createdDaysAgo = 300): User => ({
    id, role, name, email, passwordHash, avatar, onboarded: true, createdAt: ago(createdDaysAgo),
  });

  const users: User[] = [
    user("u_admin", "admin", "FindRight Trust Team", "admin@findright.in"),
    user("u_parekh", "client", "Mukul Parekh", "client@findright.in", undefined, 420),
    user("u_prerna", "client", "Prerna Vyas", "prerna@findright.in", undefined, 120),
    user("u_nikunj", "client", "Nikunj Patel", "nikunj@findright.in", undefined, 260),
    user("u_rahul", "client", "Rahul Shah", "rahul@findright.in", undefined, 6),
    user("u_umang", "freelancer", "Umang Donga", "freelancer@findright.in", "/assets/3f8c7.png", 380),
    user("u_yashraj", "freelancer", "Yashraj Gohil", "yashraj@findright.in", "/assets/f5bf1.png", 340),
    user("u_darshan", "freelancer", "Darshan Solanki", "darshan@findright.in", "/assets/bff29.png", 500),
    user("u_riya", "freelancer", "Riya Mehta", "riya@findright.in", "/assets/4f7cd.png", 290),
    user("u_vrushti", "freelancer", "Vrushti Lakhupota", "vrushti@findright.in", undefined, 90),
    user("u_siddharth", "freelancer", "Siddharth Sharma", "siddharth@findright.in", undefined, 60),
    user("u_jatin", "freelancer", "Jatin Vaghela", "jatin@findright.in", undefined, 700),
    user("u_kirtan", "freelancer", "Kirtan Dhanani", "kirtan@findright.in", undefined, 40),
  ];

  const client = (p: Partial<ClientProfile> & Pick<ClientProfile, "userId">): ClientProfile => ({
    accountType: "company", companyName: "", website: "", linkedin: "", verification: "verified", location: "Ahmedabad, India",
    bio: "", purposes: ["Primary job or business"], categories: [], creditsUsed: 0, saved: [],
    settings: { proposals: true, messages: true, milestones: true }, ...p,
  });

  const clients: ClientProfile[] = [
    client({ userId: "u_parekh", companyName: "Noble Paws Pet Health Co.", website: "https://noblepaws.in", bio: "Noble Paws creates thoughtful, organic pet nutrition products for modern Indian families.", categories: ["Brand Identity", "UI/UX Design", "Packaging Design"], creditsUsed: 1, saved: ["u_darshan", "u_riya", "u_yashraj"],
      role: "Founder", industry: "Organic pet food", companyType: "Brand / startup", phone: "+91 98250 12345", aiPreference: "AI ideation",
      defaultTerms: { schedule: "10-90", revisions: 2, ownership: "full" }, visibility: { company: true, spent: false, history: true, paymentBadge: true } }),
    client({ userId: "u_prerna", accountType: "personal", verification: "none", bio: "Small business owner creating Instagram, YouTube and ad content for a handmade decor brand.", categories: ["Video Editing", "Motion Design"] }),
    client({ userId: "u_nikunj", companyName: "Nikunj Design Institute", website: "https://nikunjdesign.in", bio: "A design institute that also runs a client studio for logos, packaging, UI/UX and campaigns.", categories: ["Graphic Design", "Brand Identity", "UI/UX Design"] }),
    client({ userId: "u_rahul", companyName: "Shah Ventures", linkedin: "https://www.linkedin.com/company/shah-ventures", verification: "pending", bio: "A growing D2C startup that regularly hires creative freelancers.", categories: ["Product Design", "Video Editing"] }),
  ];

  const ai = (entries: Record<string, AiLevel>) => entries;
  const freelancer = (p: Partial<FreelancerProfile> & Pick<FreelancerProfile, "userId">): FreelancerProfile => ({
    headline: "", location: "Ahmedabad, India", bio: "", level: "Intermediate", years: 2, disciplines: [], skills: [], tools: [],
    languages: ["English", "Hindi", "Gujarati"], education: "", hourlyRate: 1500, availability: "now", ai: {}, aiProcess: "",
    portfolio: [], experience: [], links: DEMO_LINKS[p.userId!]?.map((l) => ({ ...l })) ?? [], settings: { publicProfile: true, projectAlerts: true, messageAlerts: true }, ...p,
  });

  const freelancers: FreelancerProfile[] = [
    freelancer({
      userId: "u_umang", headline: "UI Designer · Mobile & SaaS", level: "Intermediate", years: 3, hourlyRate: 1800,
      bio: "I design clear, friendly mobile and SaaS interfaces — from user flows to polished, developer-ready Figma files. I use AI for early research and references, and craft every final screen by hand.",
      disciplines: ["UI/UX Design", "Product Design"], skills: ["UI/UX Design", "Mobile/iOS Design", "Design Systems", "Prototyping", "Figma"],
      tools: ["Figma", "FigJam", "Protopie", "Illustrator"], education: "B.Des, Interaction Design",
      ai: ai({ "UI/UX Design": "AI ideation", "Product Design": "AI ideation" }),
      aiProcess: "ChatGPT for research summaries and competitor scans; all wireframes, UI and prototypes are made by me in Figma.",
      portfolio: [
        { id: "pf_u1", title: "Pulse — Crypto Portfolio App", category: "UI/UX Design", image: "/assets/04b9e.png", images: ["/assets/04b9e.png", "/assets/56dc5.png"], tools: ["Figma", "Protopie"], description: "Dark-mode trading app with portfolio insights and market alerts. I led research, flows and the full UI kit across 24 screens.", tags: ["Mobile", "Fintech"], ai: "AI ideation", source: "outside" },
        { id: "pf_u4", title: "TripTales — Booking Flow Refresh", category: "UI/UX Design", image: "/assets/cafad.png", images: ["/assets/cafad.png"], tools: ["Figma"], description: "Redesigned the booking flow for a travel startup, cutting checkout steps from 7 to 4.", tags: ["Travel", "Mobile"], ai: "No AI", source: "outside" },
        { id: "pf_u2", title: "Skyline — Weather App", category: "UI/UX Design", image: "/assets/71e23.png", images: ["/assets/71e23.png"], tools: ["Figma", "Illustrator"], description: "Hour-by-hour forecasts with rich, glanceable cards.", tags: ["Mobile", "Data viz"], ai: "No AI", source: "outside" },
        { id: "pf_u3", title: "Noble Paws Storefront — Wireflows", category: "Product Design", image: "/assets/85fba.png", images: ["/assets/85fba.png"], tools: ["FigJam", "Figma"], description: "Checkout and subscription user flows for an organic pet food store.", tags: ["User flows", "E-commerce"], ai: "AI ideation", source: "platform", projectId: "pr_done", clientName: "Noble Paws Pet Health Co." },
      ],
      experience: [
        { id: "ex_u1", title: "UI Designer (Freelance)", organisation: "Independent", period: "2023 — Present", description: "Mobile and SaaS UI for startups across India." },
        { id: "ex_u2", title: "Design Intern", organisation: "Pixel Studio, Ahmedabad", period: "2022", description: "Supported a design system rebuild and usability testing." },
      ],
    }),
    freelancer({
      userId: "u_yashraj", headline: "UX Designer · Research & Travel products", level: "Intermediate", years: 2, hourlyRate: 2200, availability: "week",
      bio: "UX designer focused on research-led travel and lifestyle products. I map journeys, run quick usability tests and deliver annotated prototypes.",
      disciplines: ["UI/UX Design", "Product Design"], skills: ["User Research", "Prototyping", "UI/UX Design", "Figma"], tools: ["Figma", "Maze", "Notion"],
      ai: ai({ "UI/UX Design": "AI ideation", "Product Design": "AI ideation" }), aiProcess: "AI helps me synthesise interview notes; journeys, IA and UI are human-made.",
      portfolio: [
        { id: "pf_y1", title: "TripTales — Travel Booking App", category: "UI/UX Design", image: "/assets/cafad.png", description: "Tour discovery and booking with day-by-day itineraries.", tags: ["Travel", "Mobile"], ai: "AI ideation", source: "outside" },
        { id: "pf_y2", title: "Empathy Mapping Toolkit", category: "Product Design", image: "/assets/bc242.png", description: "A workshop kit for running research synthesis with clients.", tags: ["Research", "Workshop"], ai: "No AI", source: "outside" },
        { id: "pf_y4", title: "Explorer — Kids Map Research", category: "Product Design", image: "/assets/71e50.png", tools: ["Maze", "Figma"], description: "Usability study with 12 children for a kid-friendly maps concept.", tags: ["Research", "Kids"], ai: "No AI", source: "outside" },
        { id: "pf_y3", title: "Taskroning — Productivity Dashboard", category: "Product Design", image: "/assets/56dc5.png", description: "Case study for a focus and task management dashboard.", tags: ["SaaS", "Case study"], ai: "AI ideation", source: "outside" },
      ],
      experience: [{ id: "ex_y1", title: "UX Researcher", organisation: "Campus Innovation Lab", period: "2023 — 2024", description: "Ran 40+ interviews for student-facing products." }],
    }),
    freelancer({
      userId: "u_darshan", headline: "UI/UX Designer | Product Designer", level: "Expert", years: 6, hourlyRate: 2500,
      bio: "Product designer with six years of experience shipping kiosks, kids' apps and B2B dashboards. Fully human-made identity and product work, with source files at every milestone.",
      disciplines: ["UI/UX Design", "Product Design", "Brand Identity"], skills: ["Product Design", "UI/UX Design", "Design Systems", "Brand Identity", "User Research"],
      tools: ["Figma", "Illustrator", "Photoshop", "After Effects"], education: "M.Des, Product Design",
      ai: ai({ "UI/UX Design": "No AI", "Product Design": "No AI", "Brand Identity": "No AI" }), aiProcess: "I don't use generative AI for client deliverables.",
      portfolio: [
        { id: "pf_d1", title: "Nescafé — Campus Canteen Kiosk", category: "Product Design", image: "/assets/4646f.png", images: ["/assets/4646f.png"], tools: ["Figma", "Illustrator", "Photoshop"], description: "Self-serve ordering kiosk designed for busy college canteens.", tags: ["Kiosk", "Innovation"], ai: "No AI", source: "outside" },
        { id: "pf_d2", title: "Explorer — Kid-friendly Maps", category: "UI/UX Design", image: "/assets/71e50.png", description: "A playful, safe map experience for children in Ahmedabad.", tags: ["Kids", "Mobile"], ai: "No AI", source: "outside" },
        { id: "pf_d4", title: "Taskroning — Focus Dashboard", category: "UI/UX Design", image: "/assets/56dc5.png", tools: ["Figma"], description: "SaaS dashboard for deep-work tracking with a reusable component library.", tags: ["SaaS", "Design system"], ai: "No AI", source: "outside" },
        { id: "pf_d3", title: "Atelier Bloom — Botanical Identity", category: "Brand Identity", image: "/assets/567c5.png", images: ["/assets/567c5.png", "/assets/c96a1.png", "/assets/0b0c3.png"], tools: ["Illustrator", "Photoshop"], description: "Logo suite, packaging system and brand guidelines.", tags: ["Identity", "Packaging"], ai: "No AI", source: "platform", clientName: "Nikunj Design Institute" },
      ],
      experience: [
        { id: "ex_d1", title: "Senior Product Designer", organisation: "Orbit Labs", period: "2021 — 2024", description: "Led design for a logistics dashboard used by 300+ fleets." },
        { id: "ex_d2", title: "Product Designer", organisation: "Brandcraft Agency", period: "2019 — 2021", description: "Identity and web projects for D2C brands." },
      ],
    }),
    freelancer({
      userId: "u_riya", headline: "Motion & Brand Designer", location: "Vadodara, India", level: "Intermediate", years: 4, hourlyRate: 2100,
      bio: "I build flexible brand identities with motion-ready assets — logo animations, social kits and launch videos.",
      disciplines: ["Brand Identity", "Motion Design", "Graphic Design"], skills: ["Brand Identity", "Motion Graphics", "Logo Design", "After Effects"],
      tools: ["After Effects", "Illustrator", "Cinema 4D"], ai: ai({ "Brand Identity": "AI ideation", "Motion Design": "AI execution", "Graphic Design": "AI ideation" }),
      aiProcess: "AI assists with moodboards, and with in-between frames for some motion pieces. Logos and key frames are always hand-made.",
      portfolio: [
        { id: "pf_r1", title: "Verde Coffee — Roastery Dielines", category: "Packaging Design", image: "/assets/0b0c3.png", description: "Dielines and roast badges for a specialty coffee launch.", tags: ["Packaging", "Print"], ai: "No AI", source: "outside" },
        { id: "pf_r2", title: "Sol & Oat — Carton System", category: "Brand Identity", image: "/assets/c96a1.png", description: "Sustainable carton packaging and identity.", tags: ["Identity", "Carton"], ai: "AI ideation", source: "outside" },
        { id: "pf_r3", title: "Launch Reel — Motion Kit", category: "Motion Design", image: "/assets/11654.png", description: "Animated logo and social launch reel.", tags: ["Motion", "Social"], ai: "AI execution", source: "outside" },
      ],
    }),
    freelancer({
      userId: "u_vrushti", headline: "Brand & Packaging Designer · Rising talent", level: "Fresher", years: 0, hourlyRate: 900,
      bio: "Final-year design student specialising in packaging and brand identity. Looking for real client projects to grow my portfolio.",
      disciplines: ["Packaging Design", "Brand Identity", "Graphic Design"], skills: ["Packaging & Dielines", "Logo Design", "Typography", "Illustrator"],
      tools: ["Illustrator", "Photoshop"], ai: ai({ "Packaging Design": "No AI", "Brand Identity": "No AI", "Graphic Design": "AI ideation" }),
      aiProcess: "Only for reference gathering on social creatives.", education: "B.Des (final year), Communication Design",
      portfolio: [{ id: "pf_v1", title: "Chai Co. — Packaging Concept", category: "Packaging Design", image: "/assets/74ddf.png", description: "Academic project: tea packaging family.", tags: ["Packaging", "Academic"], ai: "No AI", source: "outside" }],
    }),
    freelancer({
      userId: "u_siddharth", headline: "Video Editor · Reels & Brand films", level: "Fresher", years: 1, hourlyRate: 1000,
      bio: "Freelance video editor for reels, YouTube and promotional videos. Fast turnarounds with clear revision rounds.",
      disciplines: ["Video Editing", "Motion Design"], skills: ["Video Editing", "Premiere Pro", "After Effects"], tools: ["Premiere Pro", "After Effects", "DaVinci Resolve"],
      ai: ai({ "Video Editing": "AI execution", "Motion Design": "AI ideation" }), aiProcess: "AI tools for auto-captions and noise clean-up; edits, pacing and grading are mine.",
      portfolio: [{ id: "pf_s1", title: "Handmade Decor — Reel Series", category: "Video Editing", image: "/assets/11654.png", description: "A 6-part reel series for a decor brand.", tags: ["Reels", "Social"], ai: "AI execution", source: "outside" }],
    }),
    freelancer({
      userId: "u_jatin", headline: "Graphic & UI Designer", level: "Expert", years: 8, hourlyRate: 2800, availability: "busy",
      bio: "Graphic designer specialising in branding, logos, social creatives, advertising and print — with UI/UX for brand websites.",
      disciplines: ["Graphic Design", "Brand Identity", "UI/UX Design"], skills: ["Brand Identity", "Logo Design", "Social Media Creatives", "Print Design"],
      tools: ["Illustrator", "Photoshop", "InDesign", "Figma"], ai: ai({ "Graphic Design": "AI ideation", "Brand Identity": "No AI", "UI/UX Design": "AI ideation" }),
      aiProcess: "AI is a thinking partner for concepts and copy; final artwork is human-made.",
      portfolio: [{ id: "pf_j1", title: "Interaction Patterns Explainer", category: "Graphic Design", image: "/assets/1f943.png", description: "Editorial illustration series for a design blog.", tags: ["Illustration", "Editorial"], ai: "No AI", source: "outside" }],
    }),
    freelancer({
      userId: "u_kirtan", headline: "UI/UX & Product Designer · Rising talent", level: "Fresher", years: 0, hourlyRate: 800,
      bio: "UI/UX designer who loves turning scattered requirements into structured flows. Chat-first, quick to respond.",
      disciplines: ["UI/UX Design", "Product Design"], skills: ["UI/UX Design", "Prototyping", "Figma"], tools: ["Figma", "FigJam"],
      ai: ai({ "UI/UX Design": "AI ideation", "Product Design": "AI ideation" }), aiProcess: "AI for ideation and research; UI by hand.",
      portfolio: [{ id: "pf_k1", title: "Campus App — User Flows", category: "Product Design", image: "/assets/85fba.png", description: "Flow mapping for a campus services app.", tags: ["Flows", "Academic"], ai: "AI ideation", source: "outside" }],
    }),
  ];

  const job = (p: Partial<Job> & Pick<Job, "id" | "clientId" | "title" | "category">): Job => ({
    jobType: "Freelance project", level: "Intermediate", objective: "", description: "", deliverables: "", references: "", budget: 20000,
    deadline: ahead(30), duration: "2–4 weeks", revisions: 2, creditReserved: false, status: "open", createdAt: ago(2), ...p,
  });

  const jobs: Job[] = [
    job({ id: "jb_store", clientId: "u_parekh", title: "Website design for Noble Paws online store", category: "UI/UX Design", level: "Intermediate", budget: 58000, deadline: ahead(28), duration: "3–4 weeks", createdAt: ago(3),
      objective: "Help pet owners find the right daily nutrition and subscribe in a few taps.",
      description: "Design a welcoming, accessible storefront for our organic pet food brand. Desktop and mobile layouts for home, product listing, product detail, cart and subscription checkout.",
      deliverables: "8 high-fidelity screens (desktop + mobile), clickable prototype, reusable component library.", references: "Brand guidelines and product photography will be shared after hiring.", creditReserved: true }),
    job({ id: "jb_launch", clientId: "u_parekh", title: "Launch campaign creatives for Noble Paws", category: "Graphic Design", level: "Fresher", budget: 18000, deadline: ahead(18), duration: "1–2 weeks", createdAt: ago(1),
      objective: "Announce our new grain-free range across Instagram and in-store.",
      description: "Create a launch kit: 6 Instagram posts, 3 story templates and one A3 in-store poster in our existing brand style.",
      deliverables: "Editable social templates (Figma/Canva), print-ready poster PDF." }),
    job({ id: "jb_reels", clientId: "u_prerna", title: "Instagram reel editing for a handmade decor brand", category: "Video Editing", level: "Fresher", budget: 12000, deadline: ahead(14), duration: "Ongoing — 4 reels", createdAt: ago(0, 5),
      objective: "Grow brand visibility with consistent short-form content.",
      description: "Edit 4 reels per month from raw phone footage: trending cuts, captions, music and brand colours.",
      deliverables: "4 vertical reels (1080×1920) with captions, plus project files." , revisions: 2 }),
    job({ id: "jb_institute", clientId: "u_nikunj", title: "Brand identity for a design institute's new studio", category: "Brand Identity", level: "Expert", budget: 65000, deadline: ahead(35), duration: "4–6 weeks", createdAt: ago(4),
      objective: "Launch a premium client studio arm with its own identity.",
      description: "Logo system, colour and type palette, stationery and a concise brand book. Must feel premium yet approachable for students.",
      deliverables: "Logo suite (SVG/AI), brand book PDF, stationery set.", revisions: 3 }),
    job({ id: "jb_app", clientId: "u_nikunj", title: "Student attendance app — UI/UX", category: "UI/UX Design", level: "Fresher", budget: 22000, deadline: ahead(21), duration: "2–3 weeks", createdAt: ago(2),
      objective: "Make attendance and timetable checks effortless for students.",
      description: "Design a simple mobile app for students to check attendance, timetables and notices.",
      deliverables: "12 mobile screens, prototype, basic style guide." }),
    job({ id: "jb_promo", clientId: "u_rahul", title: "30-second promotional product video", category: "Motion Design", level: "Intermediate", budget: 30000, deadline: ahead(20), duration: "2 weeks", createdAt: ago(1),
      objective: "A punchy launch ad for social and YouTube pre-roll.",
      description: "2D animated promo combining product shots and kinetic typography.",
      deliverables: "30s and 15s cuts, 16:9 and 9:16." }),
    job({ id: "jb_pack", clientId: "u_parekh", title: "Packaging for Noble Paws treats range", category: "Packaging Design", level: "Intermediate", budget: 26000, status: "hired", createdAt: ago(20),
      description: "Recyclable pouch packaging for a 3-flavour treats range.", deliverables: "Dielines, print-ready artwork, 3D mockups." }),
    job({ id: "jb_flows", clientId: "u_parekh", title: "Storefront user flows & wireframes", category: "Product Design", level: "Intermediate", budget: 15000, status: "hired", createdAt: ago(70),
      description: "Map checkout and subscription flows before visual design.", deliverables: "User flows, low-fi wireframes." }),
  ];

  const projects: Project[] = [
    {
      id: "pr_pack", jobId: "jb_pack", clientId: "u_parekh", freelancerId: "u_umang", title: "Packaging for Noble Paws treats range",
      scope: "Design recyclable pouch packaging for three treat flavours, aligned with the Noble Paws identity.", deliverables: "Dielines, print-ready artwork for 3 SKUs, 3D mockups.",
      deadline: ahead(12), price: 26000, discount: 3900, terms: { schedule: "20-30-50", revisions: 2, ai: "AI ideation", ownership: "full", extraRevisionRate: 1500 },
      milestones: [
        { id: "ms_p1", title: "Deposit", percent: 20, amount: 5200, charge: 4420, status: "released" },
        { id: "ms_p2", title: "First samples", percent: 30, amount: 7800, charge: 6630, status: "submitted" },
        { id: "ms_p3", title: "Final delivery", percent: 50, amount: 13000, charge: 11050, status: "pending" },
      ],
      deliveries: [{ id: "dl_p1", milestoneId: "ms_p2", note: "First samples: pouch front/back for all three flavours plus the dieline. Looking forward to your feedback!", files: [{ id: "seed", name: "NoblePaws_Treats_Samples_v1.pdf", size: 4_200_000 }], status: "review", createdAt: ago(0, 6) }],
      revisionsUsed: 0, status: "active", portfolioAdded: false, createdAt: ago(16), feePercent: 6,
    },
    {
      id: "pr_done", jobId: "jb_flows", clientId: "u_parekh", freelancerId: "u_umang", title: "Storefront user flows & wireframes",
      scope: "Map checkout and subscription flows before visual design.", deliverables: "User flows, low-fidelity wireframes.",
      deadline: ahead(-40), price: 15000, discount: 0, terms: { schedule: "10-90", revisions: 2, ai: "AI ideation", ownership: "full" },
      milestones: [
        { id: "ms_d1", title: "Advance to start", percent: 10, amount: 1500, charge: 1500, status: "released" },
        { id: "ms_d2", title: "Final delivery", percent: 90, amount: 13500, charge: 13500, status: "released" },
      ],
      deliveries: [{ id: "dl_d1", milestoneId: "ms_d2", note: "Final flows and wireframes attached.", files: [{ id: "seed", name: "Storefront_Flows_Final.pdf", size: 2_800_000 }], status: "approved", createdAt: ago(45) }],
      revisionsUsed: 1, status: "completed", portfolioAdded: true, createdAt: ago(65), completedAt: ago(44), feePercent: 8,
    },
  ];

  // Past completed projects with two-way reviews, so profiles have enough history to paginate.
  const past: { id: string; clientId: string; freelancerId: string; title: string; price: number; days: number; r: [number, number, number, number]; text: string; back?: string }[] = [
    { id: "pr_h1", clientId: "u_nikunj", freelancerId: "u_umang", title: "Student portal dashboard UI", price: 18000, days: 120, r: [5, 5, 4, 4], text: "Great at turning a rough brief into a polished UI. Revisions were quick.", back: "Clear feedback and fast approvals — a pleasure." },
    { id: "pr_h2", clientId: "u_prerna", freelancerId: "u_umang", title: "Decor shop landing page", price: 9000, days: 150, r: [4, 4, 5, 4], text: "Understood my brand quickly and kept me updated at every step." },
    { id: "pr_h3", clientId: "u_nikunj", freelancerId: "u_umang", title: "Workshop booking app", price: 22000, days: 190, r: [4, 3, 4, 4], text: "Solid work. Needed one extra round on the onboarding screens, handled well." },
    { id: "pr_h4", clientId: "u_parekh", freelancerId: "u_umang", title: "Subscription email templates", price: 7000, days: 220, r: [5, 4, 5, 5], text: "Fast, tidy and the AI disclosure matched exactly what we saw in the process." },
    { id: "pr_h5", clientId: "u_prerna", freelancerId: "u_umang", title: "Instagram story templates", price: 5000, days: 260, r: [3, 4, 3, 3], text: "Good designs, delivery was a couple of days late but communication was honest." },
    { id: "pr_h6", clientId: "u_parekh", freelancerId: "u_darshan", title: "Brand identity for Noble Paws", price: 42000, days: 100, r: [5, 5, 5, 5], text: "Fully human-crafted work and a reusable component library. Highly recommended.", back: "Thoughtful client, crystal-clear brief." },
    { id: "pr_h7", clientId: "u_parekh", freelancerId: "u_yashraj", title: "Packaging for Noble Paws", price: 26000, days: 90, r: [4, 4, 4, 4], text: "Good work and fast revisions. Dieline needed one extra round." },
    { id: "pr_h8", clientId: "u_nikunj", freelancerId: "u_darshan", title: "Institute website redesign", price: 55000, days: 160, r: [5, 4, 5, 4], text: "Deep product thinking — the IA alone was worth it." },
  ];
  for (const h of past) {
    const done = ago(h.days - 20);
    projects.push({
      id: h.id, jobId: "jb_flows", clientId: h.clientId, freelancerId: h.freelancerId, title: h.title, scope: h.title, deliverables: "Final design files and handoff.",
      deadline: done.slice(0, 10), price: h.price, discount: 0, terms: { schedule: "10-90", revisions: 2, ai: "AI ideation", ownership: "full" },
      milestones: [
        { id: h.id + "_m1", title: "Advance to start", percent: 10, amount: h.price * 0.1, charge: h.price * 0.1, status: "released" },
        { id: h.id + "_m2", title: "Final delivery", percent: 90, amount: h.price * 0.9, charge: h.price * 0.9, status: "released" },
      ],
      deliveries: [], revisionsUsed: 1, status: "completed", portfolioAdded: false, createdAt: ago(h.days), completedAt: done,
    });
  }
  const pastReviews: DB["reviews"] = past.flatMap((h) => {
    const [quality, communication, timeliness, value] = h.r;
    const rating = Math.round(((quality + communication + timeliness) / 3) * 10) / 10;
    const list: DB["reviews"] = [{ id: "rv_" + h.id, projectId: h.id, fromId: h.clientId, toId: h.freelancerId, rating, quality, communication, timeliness, value, aiMatched: "yes", text: h.text, createdAt: ago(h.days - 21) }];
    if (h.back) list.push({ id: "rv_" + h.id + "_b", projectId: h.id, fromId: h.freelancerId, toId: h.clientId, rating: 5, quality: 5, communication: 5, timeliness: 5, value: 5, aiMatched: "yes", text: h.back, createdAt: ago(h.days - 21) });
    return list;
  });
  const pastTransactions: DB["transactions"] = past.flatMap((h) => [
    { id: "tx_" + h.id + "_a", projectId: h.id, milestoneId: h.id + "_m1", clientId: h.clientId, freelancerId: h.freelancerId, type: "escrow_deposit" as const, amount: h.price * 0.1, method: "UPI", createdAt: ago(h.days) },
    { id: "tx_" + h.id + "_b", projectId: h.id, milestoneId: h.id + "_m1", clientId: h.clientId, freelancerId: h.freelancerId, type: "release" as const, amount: h.price * 0.1, method: "Escrow", createdAt: ago(h.days) },
    { id: "tx_" + h.id + "_c", projectId: h.id, milestoneId: h.id + "_m2", clientId: h.clientId, freelancerId: h.freelancerId, type: "escrow_deposit" as const, amount: h.price * 0.9, method: "UPI", createdAt: ago(h.days - 15) },
    { id: "tx_" + h.id + "_d", projectId: h.id, milestoneId: h.id + "_m2", clientId: h.clientId, freelancerId: h.freelancerId, type: "release" as const, amount: h.price * 0.9, method: "Escrow", createdAt: ago(h.days - 20) },
  ]);

  return {
    users,
    sessions: [],
    clients,
    freelancers,
    jobs,
    invitations: [
      { id: "iv_1", jobId: "jb_launch", clientId: "u_parekh", freelancerId: "u_umang", message: "Loved your work on our storefront flows — would you take on the launch kit too?", status: "pending", createdAt: ago(0, 20) },
      { id: "iv_2", jobId: "jb_app", clientId: "u_nikunj", freelancerId: "u_kirtan", message: "Your campus flows look like a great fit for this.", status: "pending", createdAt: ago(1) },
    ],
    proposals: [
      { id: "pp_1", extraRevisionRate: 2500, jobId: "jb_store", freelancerId: "u_darshan", coverLetter: "I can deliver a fully human-made storefront with an accessible component library. I've shipped two D2C stores this year and will share annotated handoff files.", amount: 56000, timeline: "3 weeks", ai: "No AI", samples: ["pf_d2"], invited: false, status: "shortlisted", createdAt: ago(2) },
      { id: "pp_2", extraRevisionRate: 2000, jobId: "jb_store", freelancerId: "u_yashraj", coverLetter: "I'll map the purchase journey, test it with 5 pet owners, then build the responsive UI kit and prototype.", amount: 54000, timeline: "4 weeks", ai: "AI ideation", samples: ["pf_y1", "pf_y3"], invited: false, status: "pending", createdAt: ago(1, 4) },
      { id: "pp_3", extraRevisionRate: 800, jobId: "jb_store", freelancerId: "u_kirtan", coverLetter: "Rising designer, chat-first and fast. I'll deliver clear flows and clean UI, with daily updates.", amount: 38000, timeline: "3 weeks", ai: "AI ideation", samples: ["pf_k1"], invited: false, status: "pending", createdAt: ago(0, 9) },
      { id: "pp_4", jobId: "jb_institute", freelancerId: "u_riya", coverLetter: "I'll build a flexible identity with motion-ready assets and a clear handoff for launch.", amount: 62000, timeline: "5 weeks", ai: "AI ideation", samples: ["pf_r2"], invited: false, status: "pending", createdAt: ago(2) },
      { id: "pp_5", jobId: "jb_reels", freelancerId: "u_siddharth", coverLetter: "I edit reels for decor and lifestyle brands — trending cuts, captions and brand colours. 48h turnaround per reel.", amount: 11000, timeline: "Monthly, 48h per reel", ai: "AI execution", samples: ["pf_s1"], invited: false, status: "pending", createdAt: ago(0, 3) },
      { id: "pp_6", jobId: "jb_pack", freelancerId: "u_umang", coverLetter: "I'd love to extend the storefront work into packaging.", amount: 26000, timeline: "3 weeks", ai: "AI ideation", samples: [], invited: true, status: "hired", createdAt: ago(18) },
    ],
    projects,
    conversations: [
      { id: "cv_pack", clientId: "u_parekh", freelancerId: "u_umang", projectId: "pr_pack", jobId: "jb_pack", updatedAt: ago(0, 6) },
      { id: "cv_darshan", clientId: "u_parekh", freelancerId: "u_darshan", jobId: "jb_store", updatedAt: ago(1) },
    ],
    messages: [
      { id: "m1", conversationId: "cv_pack", senderId: "system", text: "Contract started · Deposit of ₹5,200 paid to Umang.", kind: "system", createdAt: ago(15) },
      { id: "m2", conversationId: "cv_pack", senderId: "u_parekh", text: "Hi Umang, thrilled to work with you again! Brand assets are in the shared folder.", kind: "text", createdAt: ago(15) },
      { id: "m3", conversationId: "cv_pack", senderId: "u_umang", text: "Thanks Mukul! As per my disclosure, AI is only used for reference research — all artwork is drawn by me.", kind: "text", createdAt: ago(14) },
      { id: "m4", conversationId: "cv_pack", senderId: "u_umang", text: "First samples are uploaded for review in the Deliveries section.", kind: "text", createdAt: ago(0, 6) },
      { id: "m4b", conversationId: "cv_pack", senderId: "u_umang", text: "Moodboard walkthrough", kind: "meeting", createdAt: ago(0, 5), meeting: { title: "Moodboard walkthrough", when: new Date(Date.now() + day).toISOString(), minutes: 30, agenda: "Review samples, confirm brand colours, agree on the final milestone.", link: "https://meet.findright.in/noble-paws-treats" } },
      { id: "m5", conversationId: "cv_darshan", senderId: "u_parekh", text: "Hi Darshan, your proposal is shortlisted. Could we do a quick call this week?", kind: "text", createdAt: ago(1, 2) },
      { id: "m6", conversationId: "cv_darshan", senderId: "u_darshan", text: "Absolutely — Thursday 4 PM works for me.", kind: "text", createdAt: ago(1) },
    ],
    reviews: [
      ...pastReviews,
      { id: "rv_1", projectId: "pr_done", fromId: "u_parekh", toId: "u_umang", rating: 4.7, communication: 5, quality: 5, timeliness: 4, value: 4, aiMatched: "yes", text: "Clear communication and a clean handoff. Delivered the flows a day early and explained every decision.", createdAt: ago(43) },
      { id: "rv_2", projectId: "pr_done", fromId: "u_umang", toId: "u_parekh", rating: 5, communication: 5, quality: 5, timeliness: 5, text: "Ideal client — crystal-clear brief, prompt feedback and fast milestone releases.", createdAt: ago(43) },
    ],
    transactions: [
      ...pastTransactions,
      { id: "tx_f1", projectId: "pr_pack", milestoneId: "ms_p1", clientId: "u_parekh", freelancerId: "u_umang", type: "fee", amount: 312, method: "6% platform fee", createdAt: ago(15) },
      { id: "tx_f2", projectId: "pr_done", milestoneId: "ms_d1", clientId: "u_parekh", freelancerId: "u_umang", type: "fee", amount: 120, method: "8% platform fee", createdAt: ago(60) },
      { id: "tx_f3", projectId: "pr_done", milestoneId: "ms_d2", clientId: "u_parekh", freelancerId: "u_umang", type: "fee", amount: 1080, method: "8% platform fee", createdAt: ago(44) },
      { id: "tx_1", projectId: "pr_done", milestoneId: "ms_d1", clientId: "u_parekh", freelancerId: "u_umang", type: "escrow_deposit", amount: 1500, method: "UPI", createdAt: ago(64) },
      { id: "tx_2", projectId: "pr_done", milestoneId: "ms_d1", clientId: "u_parekh", freelancerId: "u_umang", type: "release", amount: 1500, method: "UPI", createdAt: ago(60) },
      { id: "tx_3", projectId: "pr_done", milestoneId: "ms_d2", clientId: "u_parekh", freelancerId: "u_umang", type: "escrow_deposit", amount: 13500, method: "UPI", createdAt: ago(50) },
      { id: "tx_4", projectId: "pr_done", milestoneId: "ms_d2", clientId: "u_parekh", freelancerId: "u_umang", type: "release", amount: 13500, method: "UPI", createdAt: ago(44) },
      { id: "tx_5", projectId: "pr_pack", milestoneId: "ms_p1", clientId: "u_parekh", freelancerId: "u_umang", type: "escrow_deposit", amount: 4420, method: "Card", createdAt: ago(15) },
      { id: "tx_6", projectId: "pr_pack", milestoneId: "ms_p1", clientId: "u_parekh", freelancerId: "u_umang", type: "release", amount: 5200, method: "Escrow", createdAt: ago(15) },
      { id: "tx_7", projectId: "pr_pack", milestoneId: "ms_p2", clientId: "u_parekh", freelancerId: "u_umang", type: "escrow_deposit", amount: 6630, method: "Card", createdAt: ago(9) },
    ],
    disputes: [],
    notifications: [
      { id: "nt_1", userId: "u_parekh", text: "Umang Donga submitted “First samples” for review.", href: "/client/projects/pr_pack", read: false, createdAt: ago(0, 6) },
      { id: "nt_2", userId: "u_parekh", text: "Kirtan Dhanani sent a proposal for “Website design for Noble Paws online store”.", href: "/client/jobs/jb_store", read: false, createdAt: ago(0, 9) },
      { id: "nt_3", userId: "u_umang", text: "Noble Paws invited you to “Launch campaign creatives for Noble Paws”.", href: "/freelancer/invitations", read: false, createdAt: ago(0, 20) },
    ],
    uploads: [],
  };
}
