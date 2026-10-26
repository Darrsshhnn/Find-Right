import type { Metadata } from "next";
import Link from "next/link";
import Icon from "@/components/Icon";
import { ActionForm, Submit } from "@/components/ActionForm";
import { Avatar, PageHead } from "@/components/ui";
import { requestDeactivation, submitVerification, updateClientProfile } from "@/app/actions/client";
import { requireUser } from "@/lib/auth";
import { AI_LEVELS, CATEGORY_NAMES, SCHEDULES } from "@/lib/constants";
import { db } from "@/lib/db";
import { clientById } from "@/lib/queries";
import type { Terms } from "@/lib/types";

export const metadata: Metadata = { title: "Edit client profile" };

export default async function EditClientProfile() {
  const user = await requireUser("client");
  const data = db();
  const client = clientById(user.id, data)!;
  const p = client.profile;
  const terms = p.defaultTerms ?? { schedule: "10-90" as Terms["schedule"], revisions: 2, ownership: "full" as const };
  const vis = p.visibility ?? { company: true, spent: false, history: true, paymentBadge: true };
  const paid = data.transactions.some((t) => t.clientId === user.id && t.type === "escrow_deposit");
  const toggles = [["v_company", "Company name & website", vis.company], ["v_spent", "Total amount spent", vis.spent], ["v_history", "Hiring history & ratings given", vis.history], ["v_payment", "Payment verified badge", vis.paymentBadge]] as const;

  return (
    <>
      <Link href="/client/profile" className="back"><Icon name="arrowLeft" size={14} /> Back to profile</Link>
      <ActionForm action={updateClientProfile} className="stack-lg">
        <PageHead title="Edit client profile" description="This is shown to freelancers who view your jobs." actions={<><Link href="/client/profile" className="btn btn-light">Preview as freelancer</Link><Submit pending="Saving…">Save changes</Submit></>} />
        <div className="layout-aside">
          <div className="stack-lg">
            <section className="card stack">
              <h2>Personal & company</h2>
              <div className="row" style={{ gap: 16 }}>
                <Avatar name={user.name} src={user.avatar} size="xl" />
                <label className="field"><span className="btn btn-outline btn-sm" style={{ width: "fit-content" }}><Icon name="upload" size={14} /> Upload photo</span><input type="file" name="photo" accept="image/png,image/jpeg,image/webp" className="sr-only" /><small>JPG or PNG, up to 5 MB</small></label>
              </div>
              <div className="form-grid">
                <label className="field">Full name<input name="name" defaultValue={user.name} required /></label>
                <label className="field">Role<input name="role" defaultValue={p.role} placeholder="Founder" /></label>
                <label className="field">Company name<input name="companyName" defaultValue={p.companyName} disabled={client.verified} />{client.verified && <small>Locked after verification — contact support to change.</small>}</label>
                <label className="field">Website<input name="website" type="url" defaultValue={p.website} disabled={client.verified} placeholder="https://" /></label>
                <label className="field">Industry<input name="industry" defaultValue={p.industry} placeholder="Organic pet food" /></label>
                <label className="field">Company type<select name="companyType" defaultValue={p.companyType ?? ""}><option value="">Select…</option>{["Brand / startup", "Agency", "Enterprise", "Institute / education", "Creator / individual"].map((t) => <option key={t}>{t}</option>)}</select></label>
                <label className="field">Location<input name="location" defaultValue={p.location} /></label>
                <label className="field full">About the company<textarea name="bio" defaultValue={p.bio} /></label>
              </div>
            </section>
            <section className="card stack">
              <h2>Hiring preferences</h2>
              <fieldset className="stack-sm" style={{ border: 0, padding: 0, margin: 0 }}>
                <legend className="field" style={{ marginBottom: 8 }}>Categories you hire for</legend>
                <div className="chips">{CATEGORY_NAMES.map((c) => <label key={c} className="chip chip-lg"><input type="checkbox" name="categories" value={c} defaultChecked={p.categories.includes(c)} />{c}</label>)}</div>
              </fieldset>
              <fieldset className="stack-sm" style={{ border: 0, padding: 0, margin: 0 }}>
                <legend className="field" style={{ marginBottom: 8 }}>Preferred AI usage</legend>
                <div className="options">{AI_LEVELS.map((a) => <label key={a.value} className="option"><input type="radio" name="aiPreference" value={a.value} defaultChecked={p.aiPreference === a.value} /><b>{a.value === "No AI" ? "No AI" : a.value === "AI ideation" ? "AI-assisted ideation" : "AI-supported design"}</b></label>)}</div>
              </fieldset>
            </section>
            <section className="card stack">
              <h2>Default terms & conditions</h2>
              <p className="small muted">Pre-filled whenever you send a contract — you can still change them per project.</p>
              <div className="form-grid">
                <label className="field">Payment<select name="schedule" defaultValue={terms.schedule}>{(Object.keys(SCHEDULES) as Terms["schedule"][]).map((k) => <option key={k} value={k}>{SCHEDULES[k].label}</option>)}</select></label>
                <label className="field">Revisions<select name="revisions" defaultValue={String(terms.revisions)}>{[1, 2, 3, 4, 5, 6, 7, 8].map((r) => <option key={r} value={r}>{r} round{r > 1 ? "s" : ""}</option>)}</select></label>
                <label className="field">Ownership<select name="ownership" defaultValue={terms.ownership}><option value="full">Full rights transfer after final payment</option><option value="licence">Usage licence only</option></select></label>
              </div>
            </section>
          </div>
          <aside>
            <section className="card stack">
              <h3>What freelancers can see</h3>
              <div>
                {toggles.map(([name, label, on]) => (
                  <label key={name} className="setting-row"><span className="small">{label}</span><span className="toggle"><input type="checkbox" name={name} defaultChecked={on} /><span /></span></label>
                ))}
              </div>
            </section>
            <section className="card-tint stack-sm" id="verify">
              <h3 className="row"><Icon name="shield" size={16} /> Verification</h3>
              <span className="row small"><Icon name="check" size={14} /> Email verified</span>
              <span className={`row small${paid ? "" : " muted"}`}><Icon name="check" size={14} /> Payment method verified</span>
              <span className={`row small${client.verified ? "" : " muted"}`}><Icon name={client.verified ? "check" : "clock"} size={14} /> Company details {client.verified ? "verified" : p.verification === "pending" ? "in review" : "not verified"}</span>
            </section>
          </aside>
        </div>
      </ActionForm>

      <div className="grid-2" style={{ marginTop: 24 }}>
        {!client.verified && p.verification !== "pending" && (
          <ActionForm action={submitVerification} className="card stack">
            <h3>Verify your company</h3>
            {p.verification === "rejected" && <p className="alert alert-error small">{p.verificationNote}</p>}
            <p className="small muted">Verified companies get a badge on every brief. Our trust team reviews a public source.</p>
            <div className="form-grid">
              <label className="field">Company name<input name="companyName" defaultValue={p.companyName} /></label>
              <label className="field">Source<select name="method" defaultValue={p.linkedin ? "linkedin" : "website"}><option value="website">Company website</option><option value="linkedin">LinkedIn company page</option></select></label>
              <label className="field full">URL<input name="source" type="url" defaultValue={p.website || p.linkedin} placeholder="https://" /></label>
            </div>
            <div><Submit className="btn btn-outline" pending="Submitting…">Verify company</Submit></div>
          </ActionForm>
        )}
        <ActionForm action={requestDeactivation} className="card stack" style={{ borderColor: "#f5c6c7", background: "#fffafa" }}>
          <h3 style={{ color: "var(--red)" }}>Deactivate account</h3>
          <p className="small muted">Active projects must be completed first. Our trust team confirms before anything is removed.</p>
          <div><Submit className="btn btn-danger" pending="Sending…">Request deactivation</Submit></div>
        </ActionForm>
      </div>
    </>
  );
}
