export type Role = "client" | "freelancer" | "admin";
export type Level = "Fresher" | "Intermediate" | "Expert";
export type Availability = "now" | "week" | "busy";
export type AiLevel = "No AI" | "AI ideation" | "AI execution";

export type User = {
  id: string;
  role: Role;
  name: string;
  email: string;
  passwordHash: string;
  avatar?: string;
  onboarded: boolean;
  /** Set the first time the guided tour opens, so it never auto-opens again on any device. */
  tourSeen?: boolean;
  createdAt: string;
  pendingEmail?: { email: string; codeHash: string; expiresAt: string; attempts: number };
};

export type ClientProfile = {
  userId: string;
  accountType: "company" | "personal";
  companyName: string;
  website: string;
  linkedin: string;
  verification: "none" | "pending" | "verified" | "rejected";
  verificationNote?: string;
  location: string;
  bio: string;
  purposes: string[];
  categories: string[];
  creditsUsed: number;
  saved: string[];
  settings: { proposals: boolean; messages: boolean; milestones: boolean };
  role?: string;
  industry?: string;
  companyType?: string;
  phone?: string;
  aiPreference?: AiLevel;
  defaultTerms?: { schedule: Terms["schedule"]; revisions: number; ownership: Terms["ownership"] };
  visibility?: { company: boolean; spent: boolean; history: boolean; paymentBadge: boolean };
};

export type PortfolioItem = {
  id: string;
  title: string;
  category: string;
  image: string;
  description: string;
  tags: string[];
  ai: AiLevel;
  source: "platform" | "outside";
  projectId?: string;
  clientName?: string;
  images?: string[];
  tools?: string[];
};

export type ExperienceItem = {
  id: string;
  title: string;
  organisation: string;
  period: string;
  description: string;
};

export type PortfolioLink = { id: string; label: string; url: string };

export type FreelancerProfile = {
  userId: string;
  headline: string;
  location: string;
  bio: string;
  level: Level;
  years: number;
  disciplines: string[];
  skills: string[];
  tools: string[];
  languages: string[];
  education: string;
  hourlyRate: number;
  availability: Availability;
  ai: Record<string, AiLevel>;
  aiProcess: string;
  portfolio: PortfolioItem[];
  /** Portfolios hosted outside FindRight (Behance, Dribbble, personal site…). */
  links?: PortfolioLink[];
  experience: ExperienceItem[];
  settings: { publicProfile: boolean; projectAlerts: boolean; messageAlerts: boolean };
};

export type JobStatus = "open" | "hired" | "closed";

export type Job = {
  id: string;
  clientId: string;
  title: string;
  category: string;
  jobType: string;
  level: Level;
  objective: string;
  description: string;
  deliverables: string;
  references: string;
  budget: number;
  deadline: string;
  duration: string;
  revisions: number;
  creditReserved: boolean;
  status: JobStatus;
  createdAt: string;
  budgetType?: "fixed" | "hourly";
  budgetMin?: number;
  hours?: number;
  schedule?: Terms["schedule"];
  aiPreference?: AiLevel | "Any";
  extraRevisionRate?: number;
  style?: string;
  candidate?: string;
  links?: string[];
  attachments?: FileRef[];
};

export type FileRef = { id: string; name: string; size: number; type?: string };

export type Invitation = {
  id: string;
  jobId: string;
  clientId: string;
  freelancerId: string;
  message: string;
  status: "pending" | "accepted" | "declined";
  createdAt: string;
};

export type ProposalStatus = "pending" | "shortlisted" | "declined" | "hired" | "withdrawn";

export type Proposal = {
  id: string;
  jobId: string;
  freelancerId: string;
  coverLetter: string;
  amount: number;
  timeline: string;
  ai: AiLevel;
  samples: string[];
  invited: boolean;
  status: ProposalStatus;
  createdAt: string;
  declineReason?: string;
  extraRevisionRate?: number;
};

export type MilestoneStatus = "pending" | "funded" | "submitted" | "changes" | "released";

export type Milestone = {
  id: string;
  title: string;
  percent: number;
  /** What the freelancer receives for this milestone. */
  amount: number;
  /** What the client pays for it — lower than `amount` when a starter credit applies. */
  charge: number;
  status: MilestoneStatus;
};

export type Delivery = {
  id: string;
  milestoneId: string;
  note: string;
  files: { id: string; name: string; size: number }[];
  status: "review" | "approved" | "changes";
  feedback?: string;
  createdAt: string;
};

export type ProjectStatus = "offer" | "declined" | "awaiting_funding" | "active" | "completed" | "cancelled" | "disputed";

export type Terms = {
  schedule: "10-90" | "20-30-50" | "50-50";
  revisions: number;
  ai: AiLevel;
  ownership: "full" | "licence";
  /** Agreed price (₹) for each revision round beyond the included ones. */
  extraRevisionRate?: number;
};

export type Project = {
  id: string;
  jobId: string;
  proposalId?: string;
  clientId: string;
  freelancerId: string;
  title: string;
  scope: string;
  deliverables: string;
  deadline: string;
  price: number;
  discount: number;
  terms: Terms;
  milestones: Milestone[];
  deliveries: Delivery[];
  revisionsUsed: number;
  status: ProjectStatus;
  portfolioAdded: boolean;
  createdAt: string;
  completedAt?: string;
  /** Platform fee (2–10%) deducted from the freelancer payout on each released milestone. */
  feePercent?: number;
  /** Extra paid revision rounds bought after the included ones were used. */
  extraRevisions?: number;
};

export type Conversation = {
  id: string;
  clientId: string;
  freelancerId: string;
  jobId?: string;
  projectId?: string;
  updatedAt: string;
};

export type Message = {
  id: string;
  conversationId: string;
  senderId: string;
  text: string;
  kind: "text" | "system" | "meeting";
  createdAt: string;
  files?: FileRef[];
  meeting?: { title: string; when: string; minutes: number; agenda: string; link: string };
};

export type Review = {
  id: string;
  projectId: string;
  fromId: string;
  toId: string;
  rating: number;
  communication: number;
  quality: number;
  timeliness: number;
  text: string;
  createdAt: string;
  value?: number;
  aiMatched?: "yes" | "partly" | "no";
};

export type Transaction = {
  id: string;
  projectId: string;
  milestoneId?: string;
  clientId: string;
  freelancerId: string;
  type: "escrow_deposit" | "release" | "refund" | "fee";
  amount: number;
  method: string;
  createdAt: string;
};

export type Dispute = {
  id: string;
  projectId?: string;
  userId: string;
  issue: string;
  description: string;
  status: "open" | "resolved";
  resolution?: string;
  createdAt: string;
};

export type Notification = {
  id: string;
  userId: string;
  text: string;
  href: string;
  read: boolean;
  createdAt: string;
};

export type Session = { id: string; userId: string; expiresAt: string };

export type Upload = { id: string; name: string; size: number; type: string; ownerId: string; projectId?: string; jobId?: string; conversationId?: string; public: boolean; createdAt: string };

export type DB = {
  users: User[];
  sessions: Session[];
  clients: ClientProfile[];
  freelancers: FreelancerProfile[];
  jobs: Job[];
  invitations: Invitation[];
  proposals: Proposal[];
  projects: Project[];
  conversations: Conversation[];
  messages: Message[];
  reviews: Review[];
  transactions: Transaction[];
  disputes: Dispute[];
  notifications: Notification[];
  uploads: Upload[];
};
