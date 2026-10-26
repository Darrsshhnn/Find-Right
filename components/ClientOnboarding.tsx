"use client";

import { useState } from "react";
import Icon from "./Icon";
import StepForm, { value, values } from "./Stepper";
import { completeClientOnboarding } from "@/app/actions/auth";
import { DISCIPLINES } from "@/lib/constants";

export default function ClientOnboarding() {
  const [accountType, setAccountType] = useState<"company" | "personal">("company");
  const [method, setMethod] = useState<"website" | "linkedin">("website");

  return (
    <StepForm
      action={completeClientOnboarding}
      finishLabel="Go to client dashboard"
      startOffset={1}
      totalOverride={4}
      steps={[
        {
          title: "Client profile",
          heading: "Who are you hiring for?",
          description: "We customise your project templates and invoices based on your setup. Company accounts are verified so freelancers can trust your briefs.",
          validate: (form) => {
            if (accountType === "company") {
              if (!value(form, "companyName")) return "Add your registered company name.";
              const source = value(form, "source");
              if (!/^https:\/\/\S+\.\S+/.test(source)) return method === "website" ? "Enter your company website, starting with https://" : "Enter your LinkedIn company page, starting with https://";
              if (method === "linkedin" && !source.includes("linkedin.com")) return "That doesn't look like a LinkedIn company URL.";
            }
            if (!values(form, "purposes").length) return "Choose at least one purpose.";
            return "";
          },
          content: (
            <>
              <div className="options">
                <label className="option"><input type="radio" name="accountType" value="company" checked={accountType === "company"} onChange={() => setAccountType("company")} /><b>I&apos;m hiring for a company</b><small>Brand, startup or agency — gets the verified badge</small></label>
                <label className="option"><input type="radio" name="accountType" value="personal" checked={accountType === "personal"} onChange={() => setAccountType("personal")} /><b>It&apos;s a personal project</b><small>Independent, creator or hobby work</small></label>
              </div>
              {accountType === "company" ? (
                <div className="card-tint stack">
                  <label className="field">Company name<input name="companyName" placeholder="Your registered company name" /></label>
                  <div className="stack-sm">
                    <b className="small">Verify your company with a public source</b>
                    <div className="segmented">
                      <label><input type="radio" name="method" value="website" checked={method === "website"} onChange={() => setMethod("website")} />Company website</label>
                      <label><input type="radio" name="method" value="linkedin" checked={method === "linkedin"} onChange={() => setMethod("linkedin")} />LinkedIn page</label>
                    </div>
                  </div>
                  <label className="field">{method === "website" ? "Company website" : "LinkedIn company page"}<input name="source" type="url" placeholder={method === "website" ? "https://example.com" : "https://www.linkedin.com/company/…"} /><small>Our trust team reviews this source. You can post jobs right away — the verified badge appears once approved.</small></label>
                </div>
              ) : (
                <label className="field">Location (optional)<input name="location" placeholder="Ahmedabad, India" /></label>
              )}
              <div className="stack-sm">
                <b>What do you plan to order services for?</b>
                <span className="muted small">There&apos;s something for everyone.</span>
                <div className="options">
                  {["Primary job or business", "Secondary business", "Non-business needs"].map((p, i) => (
                    <label className="option" key={p}><input type="checkbox" name="purposes" value={p} defaultChecked={i === 0} /><b>{p}</b></label>
                  ))}
                </div>
              </div>
            </>
          ),
        },
        {
          title: "Starter talent reward",
          heading: "Your three starter credits are ready",
          description: "Choose whether to use a credit when you post a job or hire. Each saves 15%, up to ₹5,000, on a hire — and the freelancer still receives their full fee.",
          content: (
            <div className="grid-3">
              {[1, 2, 3].map((n) => (
                <article key={n} className="card-tint stack-sm">
                  <div className="row-between"><span className="eyebrow">Starter credit {n}</span><span className="badge badge-green"><Icon name="check" size={12} /> Available</span></div>
                  <b style={{ fontSize: 28, color: "var(--primary-deep)" }}>15% OFF</b>
                  <span className="muted small">Save up to ₹5,000 · Choose when posting a job</span>
                </article>
              ))}
            </div>
          ),
        },
        {
          title: "Creative disciplines",
          heading: "Pick one or more topics",
          description: "Select the design categories you typically commission. We'll use them to recommend freelancers.",
          validate: (form) => (values(form, "categories").length ? "" : "Pick at least one category."),
          content: (
            <div className="topic-grid">
              {DISCIPLINES.map((d) => (
                <label className="topic" key={d.name}>
                  <input type="checkbox" name="categories" value={d.name} />
                  <img src={d.image} alt="" />
                  <div><b>{d.name}</b><small>{d.description}</small></div>
                </label>
              ))}
            </div>
          ),
        },
      ]}
    />
  );
}
