import { redirect } from "next/navigation";

export default async function CoursesPage({
  params,
}: {
  params: Promise<{ aid: string }>;
}) {
  const { aid } = await params;
  redirect(`/Courses/${aid}/Home`);
}
