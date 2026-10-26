import { currentUser } from "@/lib/auth";
import { draftBrief } from "@/lib/jobs";

export async function POST(request: Request) {
  const user = await currentUser();
  if (!user || user.role !== "client") return Response.json({ error: "Sign in as a client to use the brief writer." }, { status: 401 });
  const body = (await request.json().catch(() => ({}))) as { text?: string; title?: string; category?: string; level?: string };
  const text = String(body.text ?? "").slice(0, 4000);
  if (text.trim().length < 15) return Response.json({ error: "Describe your project in a sentence or two first." }, { status: 400 });
  return Response.json({ brief: draftBrief({ text, title: body.title, category: body.category, level: body.level }), source: "offline" });
}
