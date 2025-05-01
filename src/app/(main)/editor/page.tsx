
"use client";

import prisma from "@/lib/prisma";
import { ResumeServerData } from "@/lib/types";
import { Metadata } from "next";
import ResumeEditor from "./ResumeEditor";
import { useEffect, useState } from "react";
import { JwtPayload } from "jsonwebtoken";
import { useAuth } from "@/lib/auth";
import AIChatbox from "@/components/AIChatbox";

interface PageProps {
  searchParams: Promise<{ resumeId?: string }>;
}

export default function Page({ searchParams }: PageProps) {
  const { userId, token } = useAuth();
  const [isChatboxOpen, setIsChatboxOpen] = useState(false);
  const [resumeToEdit, setResumeToEdit] = useState<ResumeServerData | null>(null);
  const [resumeId, setResumeId] = useState<string | null>(null);

  useEffect(() => {
    async function resolveSearchParams() {
      try {
        const resolvedSearchParams = await searchParams;
        setResumeId(resolvedSearchParams.resumeId || null);
      } catch (error) {
        console.error("Error resolving searchParams:", error);
      }
    }

    resolveSearchParams();
  }, [searchParams]);

  useEffect(() => {
    async function fetchResume(resumeId: string, token: string) {
      const response = await fetch(`http://localhost:8080/admin/resumes/${resumeId}`, {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        cache: "no-store",
      });

      if (response.ok) {
        const data = await response.json();
        console.log("Resume data:", data.resume);
        return data.resume;
      } else {
        console.error("Failed to fetch resume");
      }
    }

    if (token && resumeId) {
      fetchResume(resumeId, token).then(setResumeToEdit);
    }
  }, [resumeId, token]);

  if (!resumeToEdit) {
    return <div>Unauthorized - either the resume does not exist or you don't have access to it.</div>;
  }

  return (
    <div className="flex grow flex-col">
      <ResumeEditor resumeToEdit={resumeToEdit} />
      <button
        className="absolute bottom-8 right-8 bg-blue-500 text-white rounded-full p-2 hover:bg-blue-600 focus:outline-none focus:ring focus:ring-blue-200"
        onClick={() => setIsChatboxOpen(!isChatboxOpen)}
      >
        Open AI Chatbox
      </button>
      <AIChatbox isOpen={isChatboxOpen} onClose={() => setIsChatboxOpen(false)} />
    </div>
  );
}
