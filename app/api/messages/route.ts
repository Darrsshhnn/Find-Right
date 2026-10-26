import { currentUser } from "@/lib/auth";
import { db } from "@/lib/db";

export async function GET(request: Request) {
  const user = await currentUser();
  if (!user) return Response.json({ error: "Sign in again." }, { status: 401 });
  const id = new URL(request.url).searchParams.get("c");
  const data = db();
  const conversation = data.conversations.find((c) => c.id === id && (c.clientId === user.id || c.freelancerId === user.id));
  if (!conversation) return Response.json({ error: "Conversation not found." }, { status: 404 });
  return Response.json({ messages: data.messages.filter((m) => m.conversationId === conversation.id) });
}
