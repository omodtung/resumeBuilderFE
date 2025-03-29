import { Metadata } from "next";
import ResumeEditor from "./ResumeEditor";

interface PageProps {
  searchParams: { resumeId?: string };
}

export const metadata: Metadata = {
  title: "Design your resume",
};

export default async function Page({ searchParams }: PageProps) {
  const { resumeId } = searchParams;

  const response = await fetch(`/api/resumes${resumeId ? `/${resumeId}` : ""}`, {
    cache: "no-store",
  });

  if (!response.ok) {
    return null;
  }

  const resumeToEdit = await response.json();

  return <ResumeEditor resumeToEdit={resumeToEdit} />;
}
