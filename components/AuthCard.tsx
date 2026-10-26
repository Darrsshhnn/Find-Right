import Icon from "./Icon";
import { Logo } from "./ui";

export default function AuthCard({ children, label }: { children: React.ReactNode; label: string }) {
  return (
    <div className="auth-wrap">
      <div className="auth-card">
        <section className="auth-story">
          <span style={{ filter: "brightness(1.1)" }}><Logo /></span>
          <span className="badge" style={{ background: "rgba(255,255,255,.12)", color: "#fff", justifySelf: "start" }}>{label}</span>
          <h1>Real designers,<br />Real craft.<br /><em>Protected trust.</em></h1>
          <p>Join a creative marketplace where transparent AI disclosures, human taste, and milestone escrow protect your work and brand.</p>
          <ul>
            {["Verified clients and genuine briefs", "Experience-based matching — no bidding wars", "Advance + escrow milestone payments", "Public AI-usage disclosure on every profile"].map((t) => (
              <li key={t}><Icon name="checkCircle" size={16} /> {t}</li>
            ))}
          </ul>
        </section>
        {children}
      </div>
    </div>
  );
}
