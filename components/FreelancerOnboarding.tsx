"use client";

import { useState } from "react";
import StepForm, { value, values } from "./Stepper";
import { completeFreelancerOnboarding } from "@/app/actions/auth";
import { AI_LEVELS, AVAILABILITY, DISCIPLINES, LEVELS, SKILLS } from "@/lib/constants";

export default function FreelancerOnboarding({ name }: { name: string }) {
  const [disciplines, setDisciplines] = useState<string[]>([]);
  const toggle = (d: string) => setDisciplines((cur) => (cur.includes(d) ? cur.filter((x) => x !== d) : [...cur, d]));

  return (
    <StepForm
      action={completeFreelancerOnboarding}
      finishLabel="Publish profile & go to dashboard"
      startOffset={1}
      totalOverride={6}
      steps={[
        {
          title: "Designer profile",
          heading: `Tell us about your craft, ${name.split(" ")[0]}`,
          description: "Clients search verified freelancers by skills, experience level, location and transparent AI disclosures.",
          validate: (f) => (!value(f, "headline") ? "Add a professional title." : !value(f, "location") ? "Add your location." : ""),
          content: (
            <>
              <div className="form-grid">
                <label className="field">Professional title<input name="headline" placeholder="e.g. Brand & Packaging Designer" /></label>
                <label className="field">Location<input name="location" placeholder="Bopal, Ahmedabad, India" /></label>
                <label className="field">Years of professional experience<input name="years" type="number" min="0" max="50" defaultValue="0" /></label>
                <label className="field">Education (optional)<input name="education" placeholder="B.Des, Communication Design" /></label>
                <label className="field full">Languages you work in<input name="languages" defaultValue="English, Hindi, Gujarati" /><small>Comma separated — clients can search for local-language collaborators.</small></label>
              </div>
              <div className="stack-sm">
                <b>Experience level</b>
                <span className="muted small">We match you with right-sized projects — beginners aren&apos;t pitted against seniors.</span>
                <div className="options">
                  {LEVELS.map((l, i) => <label className="option" key={l.value}><input type="radio" name="level" value={l.value} defaultChecked={i === 0} /><b>{l.label}</b><small>{l.detail}</small></label>)}
                </div>
              </div>
            </>
          ),
        },
        {
          title: "Creative disciplines",
          heading: "Pick the work you take on",
          description: "Choose the disciplines you actively design and accept client projects in, then your strongest skills.",
          validate: (f) => (!values(f, "disciplines").length ? "Choose at least one discipline." : !values(f, "skills").length ? "Pick at least one skill." : ""),
          content: (
            <>
              <div className="topic-grid">
                {DISCIPLINES.map((d) => (
                  <label className="topic" key={d.name}>
                    <input type="checkbox" name="disciplines" value={d.name} checked={disciplines.includes(d.name)} onChange={() => toggle(d.name)} />
                    <img src={d.image} alt="" />
                    <div><b>{d.name}</b><small>{d.description}</small></div>
                  </label>
                ))}
              </div>
              <div className="stack-sm">
                <b>Primary skills & creative specialties (multi-select)</b>
                <div className="chips">{SKILLS.map((s) => <label className="chip" key={s}><input type="checkbox" name="skills" value={s} />{s}</label>)}</div>
              </div>
            </>
          ),
        },
        {
          title: "AI usage disclosure",
          heading: "Make your process transparent",
          description: "Instead of hiding AI or making vague claims, declare your level per discipline. These badges appear publicly so clients can hire with confidence.",
          validate: (f) => (value(f, "aiProcess").length < 10 ? "Describe your process in a sentence — or say you don't use AI." : ""),
          content: (
            <>
              {disciplines.length === 0 && <p className="alert alert-info">Choose your disciplines in the previous step first.</p>}
              {disciplines.map((d) => (
                <div key={d} className="row-between card-flat">
                  <b>{d}</b>
                  <div className="segmented">
                    {AI_LEVELS.map((a, i) => <label key={a.value} title={a.detail}><input type="radio" name={`ai:${d}`} value={a.value} defaultChecked={i === 0} />{a.value}</label>)}
                  </div>
                </div>
              ))}
              <label className="field">Describe your workflow<textarea name="aiProcess" placeholder="e.g. I use ChatGPT for research summaries; all sketches, vectors and final files are made by me." /><small>Shown on your profile and every proposal.</small></label>
            </>
          ),
        },
        {
          title: "Portfolio",
          heading: "Show your work",
          description: "Add portfolio or case-study links now — you can upload images and get client-verified pieces from your dashboard later.",
          content: (
            <div className="form-grid">
              <label className="field full">Portfolio links<textarea name="portfolioLinks" placeholder={"https://behance.net/yourname\nhttps://dribbble.com/yourname"} /><small>One link per line. Behance, Dribbble, Drive or your own site.</small></label>
              <label className="field full">Tools you use<input name="tools" placeholder="Figma, Illustrator, After Effects" /></label>
            </div>
          ),
        },
        {
          title: "Rate & availability",
          heading: "Set your rate, bio and availability",
          description: "Clients with urgent projects filter by who's available right now.",
          validate: (f) => (value(f, "bio").length < 30 ? "Write a short bio (at least 30 characters)." : ""),
          content: (
            <>
              <div className="form-grid">
                <label className="field">Indicative hourly rate (₹)<input name="hourlyRate" type="number" min="0" placeholder="1200" /></label>
                <label className="field full">Bio<textarea name="bio" placeholder="What kind of work do you love? Who have you worked with? What makes your process reliable?" /></label>
              </div>
              <div className="options">
                {(Object.keys(AVAILABILITY) as (keyof typeof AVAILABILITY)[]).map((k, i) => (
                  <label className="option" key={k}><input type="radio" name="availability" value={k} defaultChecked={i === 0} /><b>{AVAILABILITY[k].label}</b></label>
                ))}
              </div>
            </>
          ),
        },
      ]}
    />
  );
}
