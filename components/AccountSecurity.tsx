import { ActionForm, Submit } from "./ActionForm";
import { changePassword } from "@/app/actions/shared";
import { logout } from "@/app/actions/auth";

export default function AccountSecurity() {
  return (
    <section className="card stack">
      <h2>Account security</h2>
      <ActionForm action={changePassword} className="stack" resetOnOk>
        <div className="form-grid">
          <label className="field">Current password<input type="password" name="current" autoComplete="current-password" /></label>
          <label className="field">New password<input type="password" name="next" minLength={8} autoComplete="new-password" /></label>
        </div>
        <div><Submit className="btn btn-outline" pending="Updating…">Change password</Submit></div>
      </ActionForm>
      <hr className="divider" />
      <form action={logout}><button className="btn btn-danger">Log out</button></form>
    </section>
  );
}
