import type { Metadata } from "next";
import SupportView from "@/components/SupportView";
import { requireUser } from "@/lib/auth";

export const metadata: Metadata = { title: "Help & support" };

export default async function FreelancerSupport() {
  const user = await requireUser("freelancer");
  return <SupportView user={user} />;
}
