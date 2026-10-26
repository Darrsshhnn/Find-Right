# FindRight

A trust-first freelance platform that matches verified clients with creative freelancers by skills, experience, project requirements and availability, not by bidding.

**Verified Clients + Work-Based Matching + Clear Project Briefs + Availability Matching + Secure Payments + Human–AI Transparency**

## Getting started

```bash
pnpm install
pnpm dev        # http://localhost:3000
```

The first request creates `data/db.json` with demo data. To start fresh, run `pnpm reset-db`.

| Role | Email | Password |
| --- | --- | --- |
| Client (Noble Paws) | client@findright.in | findright123 |
| Freelancer (Umang Donga) | freelancer@findright.in | findright123 |
| Trust team (admin) | admin@findright.in | findright123 |

You can also sign up as a new client or freelancer and go through onboarding.

## What's inside

**Clients:** structured four-step job briefs, experience-based match scores, an "available now" filter for urgent work, AI-usage filters, direct invitations, proposals ranked by match, chat with meeting scheduling, an auto-generated contract with selectable terms, milestone payments (advance + escrow), a capped number of revisions, two-way reviews, saved talent and rehiring, starter credits (15% off, paid for by FindRight), company verification, and support cases.

**Freelancers:** a six-step onboarding, a dashboard with invitations and recommended jobs, job filters (budget, deadline, level, duration, client type, verified clients only), proposals with portfolio samples and an AI disclosure, accept/decline for contract offers, file deliveries, earnings and escrow history, AI disclosure per discipline with an AI % meter, portfolio and outside experience, client-verified portfolio pieces, availability status, and trust-score progression.

**Trust team:** a company verification queue and support-case resolution.

## Production notes

- Payments are **simulated**. Connect a gateway (for example Razorpay Route) before handling real money.
- The JSON file store is for local use and demos. Move to a database such as Postgres before deploying to serverless hosting, whose filesystem is read-only.
- Social sign-in (Google/LinkedIn) and email verification need OAuth or email-provider credentials. Neither is wired up yet.
