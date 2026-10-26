"use client";

import { useState } from "react";
import Icon from "./Icon";

const STEPS = {
  client: [
    { icon: "file", title: "Post a clear brief", text: "Describe what you need — or let AI structure it for you.", points: ["Budget, deadline & revisions", "Attach references and brand files"] },
    { icon: "search", title: "Find & compare talent", text: "Matched by skills, experience level and availability.", points: ["Filter by AI usage", "See real, verified projects"] },
    { icon: "chat", title: "Chat, meet, agree", text: "Talk it through, then accept an auto-generated agreement.", points: ["Video calls in the chat", "Scope and terms in writing"] },
    { icon: "shield", title: "Pay safely & review", text: "Pay 10% to start; the rest waits in escrow until you approve.", points: ["Milestones and revisions tracked", "Two-way reviews"] },
  ],
  freelancer: [
    { icon: "user", title: "Build a trusted profile", text: "Show skills, real projects and how you use AI.", points: ["Experience level matching", "Availability status"] },
    { icon: "mail", title: "Get matched & invited", text: "Verified clients find you or invite you directly.", points: ["No bidding wars", "Right-sized projects"] },
    { icon: "send", title: "Send a focused proposal", text: "Your price, timeline, samples and AI disclosure.", points: ["Clear scope up front", "Capped revisions"] },
    { icon: "wallet", title: "Get paid on time", text: "Advance before you start, escrow for every milestone.", points: ["Auto-release after 7 days", "Client-verified portfolio"] },
  ],
};

export default function HowItWorks() {
  const [mode, setMode] = useState<keyof typeof STEPS>("client");
  return (
    <>
      <div className="how-tabs">
        <div className="segmented" role="tablist" aria-label="Show steps for">
          {(["client", "freelancer"] as const).map((m) => (
            <button key={m} type="button" role="tab" aria-selected={mode === m} className={mode === m ? "active" : ""} onClick={() => setMode(m)} style={{ padding: "8px 24px", fontSize: 14 }}>
              {m === "client" ? "I'm hiring" : "I'm a freelancer"}
            </button>
          ))}
        </div>
      </div>
      <ol className="how-steps" role="tabpanel" aria-label={mode === "client" ? "Steps for clients" : "Steps for freelancers"}>
        {STEPS[mode].map((s) => (
          <li key={s.title} className="how-step">
            <span className="how-num" aria-hidden="true" />
            <div className="how-card">
              <span className="icon-tile"><Icon name={s.icon} size={22} /></span>
              <b>{s.title}</b>
              <p>{s.text}</p>
              <ul>{s.points.map((p) => <li key={p}>{p}</li>)}</ul>
            </div>
          </li>
        ))}
      </ol>
    </>
  );
}
