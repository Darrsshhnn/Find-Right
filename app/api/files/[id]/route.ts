import fs from "node:fs";
import { currentUser } from "@/lib/auth";
import { db } from "@/lib/db";
import { uploadPath } from "@/lib/uploads";

export async function GET(_: Request, { params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const data = db();
  const upload = data.uploads.find((u) => u.id === id);
  if (!upload || !fs.existsSync(uploadPath(id))) return new Response("File not found", { status: 404 });
  if (!upload.public) {
    const user = await currentUser();
    const project = upload.projectId ? data.projects.find((p) => p.id === upload.projectId) : undefined;
    const conversation = upload.conversationId ? data.conversations.find((c) => c.id === upload.conversationId) : undefined;
    const allowed = user && (
      user.role === "admin" || user.id === upload.ownerId ||
      (project && (project.clientId === user.id || project.freelancerId === user.id)) ||
      (conversation && (conversation.clientId === user.id || conversation.freelancerId === user.id)) ||
      // Job attachments are part of the public brief for signed-in members.
      Boolean(upload.jobId && data.jobs.some((j) => j.id === upload.jobId))
    );
    if (!allowed) return new Response("Not allowed", { status: 403 });
  }
  const inline = upload.type.startsWith("image/") || upload.type === "application/pdf";
  return new Response(fs.readFileSync(uploadPath(id)), {
    headers: {
      "Content-Type": upload.type,
      "Content-Disposition": `${inline ? "inline" : "attachment"}; filename="${encodeURIComponent(upload.name)}"`,
      "Cache-Control": upload.public ? "public, max-age=86400" : "private, no-store",
      "X-Content-Type-Options": "nosniff",
    },
  });
}
