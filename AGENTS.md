# FindRight

Next.js 16 (App Router, TypeScript) marketplace that connects verified clients with creative freelancers. Product research and feature rationale live in the team's FigJam board; screen designs live in the Figma file. Exported Figma frames and the FigJam dump are in `.figma/` for reference.

## Running

- `pnpm install`, then `pnpm dev` (http://localhost:3000). `pnpm build && pnpm start` for production.
- Data is a JSON file at `data/db.json`, created from `lib/seed.ts` on first request. Uploaded files live in `data/uploads/`. Delete `data/` (`pnpm reset-db`) to reseed.
- Demo accounts (password `findright123`): `client@findright.in`, `freelancer@findright.in`, `admin@findright.in`.

## Structure

- `app/` — routes. `app/client/*` (hirer), `app/freelancer/*`, `app/admin` (trust team), public pages at the root, `app/onboarding/[role]`.
- `app/actions/*` — all mutations as server actions, returning `ActionState` (`{ error } | { ok }`) and calling `revalidatePath("/", "layout")`.
- `app/api/files/[id]` (permission-checked downloads) and `app/api/messages` (chat polling).
- `lib/db.ts` — load/persist the JSON store; mutate only through `mutate()`.
- `lib/auth.ts` — cookie sessions; use `requireUser(role)` at the top of every protected page and action.
- `lib/queries.ts` — derived views: `freelancerView` (rating, AI summary, trust score), `clientView`, `matchScore`, credits.
- `lib/events.ts` — notifications, shared chat thread events, auto-release of escrow after 7 days.
- `lib/milestones.ts` — milestone split: `amount` = freelancer payout, `charge` = client pays (starter credit difference covered by FindRight).
- `lib/fees.ts` — platform fee (2–10%, by budget, experience and client history), stored on the project as `feePercent` and recorded as `fee` transactions on each release (`releaseFunds` in `lib/events.ts`).
- `lib/agreement.ts` — structured agreement used by `components/Contract.tsx` and the PDF route `app/api/agreements/[id]`.
- Logo: `components/BrandMark.tsx` is the single logo mark (header, sidebar, intro). Set `BRAND_LOGO` to a file in `public/brand/` to use the official logo.
- `components/` — `Shell` (left sidebar + slim utility bar, `GuidedTour` for first-time users), `Workspace` (contract lifecycle), `Chat` + `MeetingDialog` + `VideoCall`, `JobPostForm` + `Attachments`, `DemoFlow`, `ReviewForm`, `cards`, `ui` primitives, `ActionForm`/`Submit` wrappers.
- `app/api/brief` (offline AI brief writer, `lib/jobs.ts`) and `app/api/receipts/[id]` (PDF receipts via `lib/pdf.ts`).

## Conventions

- Styling is plain CSS in `app/globals.css` with design tokens from Figma (Poppins, `--primary: #8a38f5`, `--ink: #130b1e`) and one 8px spacing scale (`--s1`…`--s12`, `.container`, 96/64px section gaps). Reuse existing classes (`card`, `btn btn-primary`, `badge`, `field`, `options`/`option`, `stack`, `row`) before adding new ones.
- Server components read with `db()`; client components only where interaction needs it.
- Payments are simulated — never present them as real charges.
- Use double quotes for strings containing apostrophes, and `&apos;` in JSX text.

<!-- BEGIN:nextjs-agent-rules -->

## This is NOT the Next.js you know

This version has breaking changes — APIs, conventions, and file structure may all differ from your training data. Read the relevant guide in `node_modules/next/dist/docs/` (resolved from this file's directory; in monorepos the `next` package may not be visible from the repo root) before writing any code. Heed deprecation notices.

This block is written and re-added by `next dev` — verify at `node_modules/next/dist/server/lib/generate-agent-files.js`. Removing it from a diff only re-creates the uncommitted change; committing it with your work keeps the tree clean.

<!-- END:nextjs-agent-rules -->
