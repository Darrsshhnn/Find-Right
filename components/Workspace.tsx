import Link from "next/link";
import Icon from "./Icon";
import Contract from "./Contract";
import ContractBuilder from "./ContractBuilder";
import EscrowFlow from "./EscrowFlow";
import { ActionForm, Submit } from "./ActionForm";
import { ReviewCard } from "./cards";
import { AiBadge, Avatar, ProjectStatusBadge, Rating } from "./ui";
import { approveDelivery, buyExtraRevisions, fundMilestone, requestChanges, withdrawOffer } from "@/app/actions/client";
import { addProjectToPortfolio, respondOffer, submitDelivery } from "@/app/actions/freelancer";
import { leaveReview, raiseDispute } from "@/app/actions/shared";
import { SCHEDULES } from "@/lib/constants";
import { feeOf } from "@/lib/fees";
import { db } from "@/lib/db";
import { daysLeft, fileSize, money, shortDate, timeAgo } from "@/lib/format";
import { clientById, conversationFor, freelancerById } from "@/lib/queries";
import type { Project, User } from "@/lib/types";

const STAGES = ["Offer", "Agreement", "Advance paid", "Work & review", "Completed"];

function stageIndex(project: Project) {
  if (project.status === "offer" || project.status === "declined" || project.status === "cancelled") return 0;
  if (project.status === "awaiting_funding") return 1;
  if (project.status === "completed") return 5;
  return 3;
}

export default function Workspace({ project, viewer }: { project: Project; viewer: User }) {
  const data = db();
  const isClient = viewer.id === project.clientId;
  const client = clientById(project.clientId, data)!;
  const freelancer = freelancerById(project.freelancerId, data)!;
  const other = isClient ? freelancer.user : client.user;
  // Clients see what they pay (after any starter credit); freelancers see what they receive.
  const value = (m: Project["milestones"][number]) => (isClient ? m.charge : m.amount);
  const total = isClient ? project.price - project.discount : project.price;
  const released = project.milestones.filter((m) => m.status === "released").reduce((s, m) => s + value(m), 0);
  const escrow = project.milestones.filter((m) => ["funded", "submitted", "changes"].includes(m.status)).reduce((s, m) => s + value(m), 0);
  const current = project.milestones.find((m) => m.status !== "released");
  const currentIndex = current ? project.milestones.indexOf(current) : -1;
  const pendingDelivery = project.deliveries.find((d) => d.status === "review");
  const reviews = data.reviews.filter((r) => r.projectId === project.id);
  const myReview = reviews.find((r) => r.fromId === viewer.id);
  const conversation = conversationFor(data, project.clientId, project.freelancerId);
  const base = isClient ? "/client" : "/freelancer";
  const stage = stageIndex(project);
  const left = daysLeft(project.deadline);

  return (
    <div className="stack-lg">
      <header className="card stack">
        <div className="row-between">
          <div className="stack-sm">
            <div className="row"><ProjectStatusBadge status={project.status} /><span className="badge badge-outline">{SCHEDULES[project.terms.schedule].label}</span></div>
            <h1 style={{ fontSize: "1.45rem" }}>{project.title}</h1>
            <div className="meta">
              <span><Icon name="user" size={13} /> Client: {client.displayName}</span>
              <span><Icon name="briefcase" size={13} /> Freelancer: {freelancer.user.name}</span>
              <span><Icon name="calendar" size={13} /> Due {shortDate(project.deadline)}{project.status === "active" ? ` · ${left >= 0 ? `${left} days left` : `${-left} days overdue`}` : ""}</span>
            </div>
          </div>
          <div style={{ textAlign: "right" }}><div className="price" style={{ fontSize: 24 }}>{money(total)}</div><span className="small muted">{money(released)} paid · {money(escrow)} in escrow</span></div>
        </div>
        <div className="stepper" aria-label="Project progress">
          {STAGES.map((s, i) => <span key={s} className={i < stage ? "done" : i === stage ? "current" : ""}><i>{i < stage ? "✓" : i + 1}</i>{s}</span>)}
        </div>
      </header>

      <div className="layout-aside">
        <div className="stack-lg">
          {project.status === "offer" && (
            <section className="card stack">
              <div className="card-head" style={{ margin: 0 }}>
                <h2>Project agreement</h2>
                <div className="row">
                  <a className="btn btn-light btn-sm" href={`/api/agreements/${project.id}`} download><Icon name="download" size={14} /> Download PDF</a>
                  <span className="badge badge-amber">Review before work starts</span>
                </div>
              </div>
              <Contract project={project} clientName={client.displayName} freelancerName={freelancer.user.name} />
              {isClient ? (
                <>
                  <details className="faq" id="edit-agreement">
                    <summary><Icon name="edit" size={14} /> Edit agreement</summary>
                    <div>
                      <ContractBuilder
                        mode="edit"
                        id={project.id}
                        freelancerName={freelancer.user.name.split(" ")[0]!}
                        creditReserved={project.discount > 0}
                        creditsLeft={0}
                        fee={{ freelancer: { level: freelancer.profile.level, rating: freelancer.rating.average, completed: freelancer.completed }, client: { hires: client.hires, verified: client.verified } }}
                        defaults={{ scope: project.scope, deliverables: project.deliverables, deadline: project.deadline, price: project.price, revisions: project.terms.revisions, ai: project.terms.ai, schedule: project.terms.schedule, ownership: project.terms.ownership, extraRevisionRate: project.terms.extraRevisionRate }}
                      />
                    </div>
                  </details>
                  <div className="row-between">
                    <p className="muted">Waiting for {freelancer.user.name} to review and accept these terms.</p>
                    <ActionForm action={withdrawOffer}><input type="hidden" name="projectId" value={project.id} /><Submit className="btn btn-danger btn-sm">Withdraw offer</Submit></ActionForm>
                  </div>
                </>
              ) : (
                <ActionForm action={respondOffer} className="stack">
                  <input type="hidden" name="projectId" value={project.id} />
                  <label className="check"><input type="checkbox" name="agree" /> I&apos;ve read the agreement. The scope, payment schedule, {project.terms.revisions} revision rounds and AI terms match what we discussed.</label>
                  <div className="row">
                    <Submit name="decision" value="accept" pending="Accepting…">Accept agreement</Submit>
                    <Submit name="decision" value="decline" className="btn btn-ghost">Decline</Submit>
                    {conversation && <Link href={`${base}/messages?c=${conversation.id}`} className="btn btn-ghost">Discuss changes in chat</Link>}
                  </div>
                </ActionForm>
              )}
            </section>
          )}

          {(project.status === "declined" || project.status === "cancelled") && (
            <section className="alert alert-warn">This offer was {project.status === "declined" ? "declined by the freelancer" : "withdrawn"}. {isClient ? "You can message them and send revised terms from the job's proposals." : "No further action is needed."}</section>
          )}

          {project.status === "awaiting_funding" && current && (
            <section className="card stack">
              <h2>{isClient ? "Pay the advance to start" : "Waiting for the advance"}</h2>
              {isClient ? (
                <ActionForm action={fundMilestone} className="stack">
                  <input type="hidden" name="projectId" value={project.id} />
                  <p className="muted">{freelancer.user.name} accepted the agreement. The {current.title.toLowerCase()} ({current.percent}%) goes to them now so work never starts unpaid. Later milestones stay in escrow until you approve.</p>
                  {project.discount > 0 && <p className="small" style={{ color: "var(--green-ink)" }}>Starter credit applied: you pay {money(current.charge)}, {freelancer.user.name.split(" ")[0]} receives {money(current.amount)}.</p>}
                  <fieldset className="segmented" style={{ border: 0 }}>
                    <legend className="sr-only">Payment method</legend>
                    {["UPI", "Card", "Net banking"].map((m, i) => <label key={m}><input type="radio" name="method" value={m} defaultChecked={i === 0} />{m}</label>)}
                  </fieldset>
                  <p className="alert alert-info small"><Icon name="lock" size={16} /> Demo checkout — no real money moves. Connect a payment gateway (e.g. Razorpay) before going live.</p>
                  <div><Submit pending="Processing…">Pay {money(current.charge)} advance</Submit></div>
                </ActionForm>
              ) : (
                <p className="muted">You accepted the agreement. We&apos;ll notify you as soon as {client.displayName} pays your {money(current.amount)} advance — please don&apos;t start work until then.</p>
              )}
            </section>
          )}

          {(project.status === "active" || project.status === "completed") && (
            <section className="card stack">
              <div className="card-head" style={{ margin: 0 }}><h2>Milestones & payments</h2><span className="small muted">Revisions used: {project.revisionsUsed}/{project.terms.revisions}</span></div>
              <div className="milestones">
                {project.milestones.map((m, i) => (
                  <div key={m.id} className={`milestone ${m.status}`}>
                    <span className="num">{m.status === "released" ? "✓" : i + 1}</span>
                    <div><b>{m.title}</b><div className="small muted">{m.percent}% · {money(value(m))}</div></div>
                    <span className={`badge ${m.status === "released" ? "badge-green" : m.status === "pending" ? "badge-grey" : m.status === "changes" ? "badge-amber" : ""}`}>
                      {{ pending: "Not funded", funded: "In escrow", submitted: "Awaiting review", changes: "Changes requested", released: "Paid" }[m.status]}
                    </span>
                  </div>
                ))}
              </div>

              <details className="faq">
                <summary><Icon name="lock" size={14} /> Escrow flow for this project</summary>
                <div>
                  <EscrowFlow feePercent={project.feePercent ?? 0} steps={project.milestones.map((m) => ({ title: m.title, percent: m.percent, clientPays: m.charge, fee: feeOf(m.amount, project.feePercent), freelancerGets: m.amount - feeOf(m.amount, project.feePercent), status: m.status }))} />
                </div>
              </details>

              {project.status === "active" && isClient && (project.terms.extraRevisionRate ?? 0) > 0 && (
                <details className="faq" open={project.revisionsUsed >= project.terms.revisions}>
                  <summary><Icon name="repeat" size={14} /> Add extra revision rounds · {money(project.terms.extraRevisionRate!)} per round (agreed)</summary>
                  <ActionForm action={buyExtraRevisions} className="stack" style={{ marginTop: 16 }}>
                    <input type="hidden" name="projectId" value={project.id} />
                    <p className="small muted">You&apos;ve used {project.revisionsUsed} of {project.terms.revisions} rounds{project.extraRevisions ? ` (including ${project.extraRevisions} extra)` : ""}. Extra rounds are paid at the rate agreed at the start and released with the current milestone.</p>
                    <div className="form-grid">
                      <label className="field">Rounds to add<select name="rounds" defaultValue="1">{[1, 2, 3].map((n) => <option key={n} value={n}>{n} round{n > 1 ? "s" : ""} · {money(n * project.terms.extraRevisionRate!)}</option>)}</select></label>
                      <label className="field">Pay with<select name="method" defaultValue="UPI">{["UPI", "Card", "Net banking"].map((m) => <option key={m}>{m}</option>)}</select></label>
                    </div>
                    <div><Submit className="btn btn-outline" pending="Adding…"><Icon name="plus" size={16} /> Add extra rounds</Submit></div>
                  </ActionForm>
                </details>
              )}

              {project.status === "active" && current && isClient && current.status === "pending" && currentIndex > 0 && (
                <ActionForm action={fundMilestone} className="card-tint stack">
                  <input type="hidden" name="projectId" value={project.id} />
                  <b>Fund “{current.title}” ({money(current.charge)})</b>
                  <p className="small muted">Funds are held in escrow — the freelancer can see they&apos;re secured, and they&apos;re only released when you approve the delivery.</p>
                  <fieldset className="segmented" style={{ border: 0 }}>
                    <legend className="sr-only">Payment method</legend>
                    {["UPI", "Card", "Net banking"].map((m, i) => <label key={m}><input type="radio" name="method" value={m} defaultChecked={i === 0} />{m}</label>)}
                  </fieldset>
                  <div><Submit pending="Processing…">Fund milestone in escrow</Submit></div>
                </ActionForm>
              )}
              {project.status === "active" && current && !isClient && current.status === "pending" && (
                <p className="alert alert-info">Waiting for the client to fund “{current.title}” in escrow. You&apos;ll be notified — start this stage once it&apos;s secured.</p>
              )}

              {project.status === "active" && current && !isClient && (current.status === "funded" || current.status === "changes") && (
                <ActionForm action={submitDelivery} className="card-tint stack" resetOnOk>
                  <input type="hidden" name="projectId" value={project.id} />
                  <b>Submit “{current.title}” for review</b>
                  {current.status === "changes" && <p className="alert alert-warn small">Changes requested: {project.deliveries.find((d) => d.milestoneId === current.id && d.status === "changes")?.feedback}</p>}
                  <label className="field">What are you delivering?<textarea name="note" required placeholder="Summarise what's included, decisions you made and anything the client should check." /></label>
                  <label className="field">Files (up to 10 MB each)<input type="file" name="files" multiple required /></label>
                  <div><Submit pending="Uploading…"><Icon name="upload" size={16} /> Submit delivery</Submit></div>
                </ActionForm>
              )}

              {project.status === "active" && pendingDelivery && isClient && (
                <div className="card-tint stack">
                  <b>Review the latest delivery</b>
                  <p className="small">{pendingDelivery.note}</p>
                  <div className="stack-sm">{pendingDelivery.files.map((f) => <FileRow key={f.id} file={f} />)}</div>
                  <div className="row">
                    <ActionForm action={approveDelivery}>
                      <input type="hidden" name="projectId" value={project.id} />
                      <input type="hidden" name="deliveryId" value={pendingDelivery.id} />
                      <Submit className="btn btn-success" pending="Releasing…"><Icon name="check" size={16} /> Approve & release payment</Submit>
                    </ActionForm>
                  </div>
                  <details className="inline">
                    <summary className="btn btn-outline btn-sm">Request changes ({Math.max(0, project.terms.revisions - project.revisionsUsed)} rounds left)</summary>
                    <ActionForm action={requestChanges} className="stack">
                      <input type="hidden" name="projectId" value={project.id} />
                      <input type="hidden" name="deliveryId" value={pendingDelivery.id} />
                      <label className="field">What should change?<textarea name="feedback" required placeholder="Be specific — reference screens, pages or timestamps." /></label>
                      <div><Submit className="btn btn-outline" pending="Sending…">Send feedback</Submit></div>
                    </ActionForm>
                  </details>
                </div>
              )}
              {project.status === "active" && pendingDelivery && !isClient && <p className="alert alert-info">Delivered {timeAgo(pendingDelivery.createdAt)} — waiting for the client&apos;s review. Payment auto-releases 7 days after submission if they don&apos;t respond.</p>}
            </section>
          )}

          {project.deliveries.length > 0 && (
            <section className="card stack">
              <h2>Deliveries</h2>
              {project.deliveries.map((d) => (
                <article key={d.id} className="stack-sm" style={{ paddingBottom: 16, borderBottom: "1px solid var(--line)" }}>
                  <div className="row-between">
                    <b>{project.milestones.find((m) => m.id === d.milestoneId)?.title}</b>
                    <span className={`badge ${d.status === "approved" ? "badge-green" : d.status === "changes" ? "badge-amber" : ""}`}>{d.status === "review" ? "In review" : d.status === "approved" ? "Approved" : "Changes requested"}</span>
                  </div>
                  <p className="small">{d.note}</p>
                  {d.files.map((f) => <FileRow key={f.id} file={f} />)}
                  {d.feedback && <p className="small muted">Client feedback: “{d.feedback}”</p>}
                  <small className="muted">{timeAgo(d.createdAt)}</small>
                </article>
              ))}
            </section>
          )}

          {project.status === "completed" && (
            <section className="card stack">
              <div className="card-head" style={{ margin: 0 }}><h2>Two-way reviews</h2><span className="small muted">Both sides review each other</span></div>
              {reviews.map((r) => <ReviewCard key={r.id} review={r} author={data.users.find((u) => u.id === r.fromId)} />)}
              {!myReview && isClient && (
                <div className="card-tint row-between"><div><b>How was {freelancer.user.name.split(" ")[0]}?</b><p className="small muted">Rate quality, communication and deadlines, and confirm the AI usage matched the disclosure.</p></div><Link href={`/client/projects/${project.id}/review`} className="btn btn-primary"><Icon name="star" size={16} /> Rate & review</Link></div>
              )}
              {!myReview && !isClient && (
                <ActionForm action={leaveReview} className="card-tint stack">
                  <input type="hidden" name="projectId" value={project.id} />
                  <b>Rate {other.name}</b>
                  <div className="form-grid">
                    {(["communication", "quality", "timeliness"] as const).map((k) => (
                      <fieldset key={k} className="field" style={{ border: 0, padding: 0 }}>
                        <legend style={{ textTransform: "capitalize", marginBottom: 8 }}>{isClient ? k : k === "quality" ? "Brief clarity" : k === "timeliness" ? "Payment speed" : k}</legend>
                        <span className="star-input">
                          {[5, 4, 3, 2, 1].map((n) => (
                            <span key={n} style={{ display: "contents" }}><input type="radio" id={`${k}${n}`} name={k} value={n} defaultChecked={n === 5} /><label htmlFor={`${k}${n}`} aria-label={`${n} stars`}>★</label></span>
                          ))}
                        </span>
                      </fieldset>
                    ))}
                  </div>
                  <label className="field">Your review<textarea name="text" required placeholder={isClient ? "How was the work, communication and delivery?" : "How clear was the brief, feedback and payment?"} /></label>
                  <div><Submit pending="Publishing…">Publish review</Submit></div>
                </ActionForm>
              )}
            </section>
          )}

          {project.status === "completed" && !isClient && !project.portfolioAdded && (
            <section className="card stack">
              <h2>Add to your portfolio as client-verified work</h2>
              <p className="muted">Verified contract pieces carry a badge clients trust — proof the work was real, paid and delivered.</p>
              <ActionForm action={addProjectToPortfolio} className="stack">
                <input type="hidden" name="projectId" value={project.id} />
                <div className="form-grid">
                  <label className="field">Title<input name="title" defaultValue={project.title} /></label>
                  <label className="field">Cover image<input type="file" name="image" accept="image/*" /></label>
                  <label className="field full">Short description<textarea name="description" defaultValue={project.scope} /></label>
                </div>
                <div><Submit pending="Adding…">Add to portfolio</Submit></div>
              </ActionForm>
            </section>
          )}

          {project.status !== "offer" && (
            <details className="faq">
              <summary>View the signed agreement</summary>
              <a className="btn btn-light btn-sm" style={{ marginTop: 16 }} href={`/api/agreements/${project.id}`} download><Icon name="download" size={14} /> Download agreement (PDF)</a>
              <div><Contract project={project} clientName={client.displayName} freelancerName={freelancer.user.name} /></div>
            </details>
          )}
        </div>

        <aside>
          <section className="card stack">
            <div className="fl-id">
              <Avatar name={other.name} src={other.avatar} size="lg" />
              <div>
                <b>{isClient ? freelancer.user.name : client.displayName}</b>
                <small>{isClient ? freelancer.profile.headline : client.verified ? "Verified client" : "Client"}</small>
                <div style={{ marginTop: 4 }}><Rating {...(isClient ? freelancer.rating : client.rating)} /></div>
              </div>
            </div>
            <div className="row">
              {conversation && <Link href={`${base}/messages?c=${conversation.id}`} className="btn btn-outline btn-sm"><Icon name="chat" size={15} /> Message</Link>}
              {isClient && <Link href={`/client/freelancers/${freelancer.user.id}`} className="btn btn-ghost btn-sm">Profile</Link>}
              {isClient && project.status === "completed" && <Link href={`/client/jobs/new?invite=${freelancer.user.id}`} className="btn btn-primary btn-sm"><Icon name="repeat" size={15} /> Hire again</Link>}
            </div>
          </section>
          <section className="card stack">
            <h3>Payment summary</h3>
            <div className="kv">
              <div><span>Agreed fee</span><b>{money(project.price)}</b></div>
              {project.discount > 0 && (isClient
                ? <div><span>Starter credit (15%)</span><b>−{money(project.discount)}</b></div>
                : <div><span>Client starter credit</span><b>Covered by FindRight</b></div>)}
              <div><span>{isClient ? "Paid so far" : "Received"}</span><b>{money(released)}</b></div>
              <div><span>Held in escrow</span><b>{money(escrow)}</b></div>
              {(project.feePercent ?? 0) > 0 && <div><span>Platform fee ({project.feePercent}%{isClient ? ", paid by freelancer" : ""})</span><b>{isClient ? money(feeOf(project.price, project.feePercent)) : `−${money(feeOf(project.price, project.feePercent))}`}</b></div>}
              <div className="total"><span>{isClient ? "You pay in total" : "You receive in total"}</span><b>{money(isClient ? total : total - feeOf(project.price, project.feePercent))}</b></div>
            </div>
          </section>
          <section className="card stack">
            <h3>Agreed terms</h3>
            <div className="kv">
              <div><span>Revisions</span><b>{project.terms.revisions} rounds</b></div>
              <div><span>AI usage</span><b><AiBadge level={project.terms.ai} /></b></div>
              <div><span>Ownership</span><b>{project.terms.ownership === "full" ? "Full rights on final payment" : "Usage licence"}</b></div>
              <div><span>Delivery date</span><b>{shortDate(project.deadline)}</b></div>
            </div>
          </section>
          <details className="faq">
            <summary><Icon name="flag" size={14} /> Something wrong? Raise an issue</summary>
            <ActionForm action={raiseDispute} className="stack" style={{ marginTop: 16 }} resetOnOk>
              <input type="hidden" name="projectId" value={project.id} />
              <label className="field">Issue<select name="issue">{["Work is not as agreed", "Other party not responding", "Payment problem", "Scope change request", "Other"].map((i) => <option key={i}>{i}</option>)}</select></label>
              <label className="field">What happened?<textarea name="description" required /></label>
              <Submit className="btn btn-outline btn-sm" pending="Sending…">Contact FindRight support</Submit>
            </ActionForm>
          </details>
        </aside>
      </div>
    </div>
  );
}

function FileRow({ file }: { file: { id: string; name: string; size: number } }) {
  const sample = file.id === "seed";
  return (
    <div className="file-row">
      <Icon name="file" />
      <span className="grow truncate">{file.name} <span className="muted">· {fileSize(file.size)}</span></span>
      {sample ? <span className="small muted">Sample file</span> : <a className="link small" href={`/api/files/${file.id}`} target="_blank" rel="noreferrer"><Icon name="download" size={14} /> Download</a>}
    </div>
  );
}
