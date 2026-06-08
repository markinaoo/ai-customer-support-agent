import { redirect } from "next/navigation";
import { publicBusinessPath } from "@/lib/routes";

type PageProps = {
  params: Promise<{ slug: string }>;
};

export default async function LandingRedirectPage({ params }: PageProps) {
  const { slug } = await params;
  redirect(publicBusinessPath(slug));
}
