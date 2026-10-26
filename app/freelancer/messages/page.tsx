import type { Metadata } from "next";
import MessagesView from "@/components/MessagesView";
import { requireUser } from "@/lib/auth";

export const metadata: Metadata = { title: "Messages" };

export default async function FreelancerMessages({ searchParams }: { searchParams: Promise<{ c?: string; q?: string; call?: string }> }) {
  const user = await requireUser("freelancer");
  const { c, q, call } = await searchParams;
  return <MessagesView user={user} selected={c} query={q} call={call === "1"} />;
}
