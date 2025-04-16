"use client";

import prisma from "@/lib/prisma";
import { ResumeServerData } from "@/lib/types";
import { Metadata } from "next";
import ResumeEditor from "./ResumeEditor";
import { useEffect, useState } from "react";
import { JwtPayload } from "jsonwebtoken";
import { useAuth } from "@/lib/auth";

interface PageProps {
  searchParams: Promise<{ resumeId?: string }>;
}



export default async function Page({ searchParams }: PageProps) {
  const { userId, token } = useAuth();
  const [resumeToEdit, setResumeToEdit] = useState<ResumeServerData | null>(null);
  const { resumeId } = await searchParams as { resumeId?: string };

  useEffect(() => {
    async function fetchResume(resumeId: string, token: string | null): Promise<ResumeServerData | null> {
      try {
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
          return null;
        }
      } catch (error) {
        console.error("Error fetching resume:", error);
        return null;
      }
    }

    if (token && resumeId) {
      fetchResume(resumeId, token).then(setResumeToEdit);
    }
  }, [resumeId, token]);

  if (!resumeToEdit) {
    return <div>Unauthorized - either the resume does not exist or you don't have access to it.</div>;
  }

  return <ResumeEditor resumeToEdit={resumeToEdit} />;
}
