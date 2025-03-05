import prisma from "@/lib/prisma";
import { resumeDataInclude } from "@/lib/types";
import { Metadata } from "next";
import ResumeEditor from "./ResumeEditor";

interface PageProps {
  searchParams: Promise<{ resumeId?: string }>;
}

export const metadata: Metadata = {
  title: "Design your resume",
};

// Replace this with your own authentication logic
async function getUserId() {
  // Example: Replace with your actual authentication logic
  // Return a user ID if authenticated, otherwise return null
  return "exampleUserId"; // Replace with actual user ID retrieval logic
}

export default async function Page({ searchParams }: PageProps) {
  const { resumeId } = await searchParams;

  const userId = await getUserId();

  if (!userId) {
    return null;
  }

  const resumeToEdit = resumeId
    ? await prisma.resume.findUnique({
        where: { id: resumeId, userId },
        include: resumeDataInclude,
      })
    : null;

  return <ResumeEditor resumeToEdit={resumeToEdit} />;
}
