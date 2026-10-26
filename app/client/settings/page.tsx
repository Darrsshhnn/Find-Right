import type { Metadata } from "next";
import Link from "next/link";
import AccountSecurity from "@/components/AccountSecurity";
import EmailChange from "@/components/EmailChange";
import Icon from "@/components/Icon";
import { ActionForm, Submit } from "@/components/ActionForm";
import { Avatar, PageHead } from "@/components/ui";
import { updateClientSettings } from "@/app/actions/client";
import { updateAccount } from "@/app/actions/shared";
import { requireUser } from "@/lib/auth";
import { db } from "@/lib/db";

export const metadata: Metadata = { title: "Settings" };

export default async function ClientSettings() {
  const user = await requireUser("client");
  const data = db();
  const profile = data.clients.find((c) => c.userId === user.id)!;
  const lastMethod = data.transactions.find((t) => t.clientId === user.id && t.type === "escrow_deposit")?.method;
  const rows: [keyof typeof profile.settings, string, string][] = [
    ["proposals", "New hire requests", "When a freelancer applies or responds to an invitation."],
    ["messages", "Messages & meeting reminders", "Unread messages and calls you've scheduled."],
    ["milestones", "Payment & escrow updates", "Deliveries to review, advances and releases."],
  ];

  return (
    <>
      <PageHead title="Settings" description="Account, notifications, payments and security." />
      <div className="layout-settings">
        <nav className="card-flat settings-nav" aria-label="Settings sections">
          <a href="#account">Account</a>
          <a href="#notifications">Notifications</a>
          <a href="#payments">Payments</a>
          <a href="#security">Security</a>
          <Link href="/client/support">Help</Link>
        </nav>
        <div className="stack-lg">
          <section className="card stack" id="account" aria-labelledby="account-title">
            <h2 id="account-title">Account details</h2>
            <ActionForm action={updateAccount} className="stack">
              <div className="row" style={{ gap: 16 }}>
                <Avatar name={user.name} src={user.avatar} size="lg" />
                <div><b>{user.name}</b><div><Link href="/client/profile/edit" className="link small">Change photo & company details</Link></div></div>
              </div>
              <div className="form-grid">
                <label className="field">Full name<input name="name" defaultValue={user.name} required autoComplete="name" /></label>
                <label className="field">Company<input value={profile.companyName || "Personal account"} disabled /></label>
                <label className="field">Phone<input name="phone" type="tel" defaultValue={profile.phone} placeholder="+91 98XXX XXXXX" autoComplete="tel" /></label>
              </div>
              <div><Submit pending="Saving…">Save account details</Submit></div>
            </ActionForm>
            <hr className="divider" />
            <div className="stack-sm">
              <h3>Email address</h3>
              <EmailChange currentEmail={user.email} pendingEmail={user.pendingEmail?.email} />
            </div>
          </section>

          <ActionForm action={updateClientSettings} className="card stack">
            <h2 id="notifications">Notifications</h2>
            <div>
              {rows.map(([key, title, detail]) => (
                <label className="setting-row" key={key}>
                  <span><b>{title}</b><br /><span className="small muted">{detail}</span></span>
                  <span className="toggle"><input type="checkbox" name={key} defaultChecked={profile.settings[key]} /><span /></span>
                </label>
              ))}
            </div>
            <div><Submit pending="Saving…">Save preferences</Submit></div>
          </ActionForm>

          <section className="card stack" id="payments" aria-labelledby="payments-title">
            <div className="row-between"><h2 id="payments-title">Payment methods</h2><span className="badge badge-amber">Demo</span></div>
            <div className="file-row"><Icon name="wallet" /><span className="grow">{lastMethod ?? "UPI"} · {user.email.split("@")[0]}@upi</span><span className="badge badge-green">Default</span></div>
            <p className="small muted">Saved methods are simulated in this build. Connect a payment gateway to store real cards and UPI IDs.</p>
            <Link href="/client/payments" className="link small">View payments & receipts →</Link>
          </section>

          <div id="security"><AccountSecurity /></div>
        </div>
      </div>
    </>
  );
}
