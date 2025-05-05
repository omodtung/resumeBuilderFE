"use client";

import { Metadata } from "next";
import Link from "next/link";
import NewResumeButton from "./newResumeButton";
import ResumeItem from "./ResumeItem";
import { ResumeServerData } from "@/lib/types";
import { useState, useEffect } from "react";
import { useAuth } from "@/lib/auth";



export default function Page() {
  const [resumes, setResumes] = useState<ResumeServerData[]>([]);
  // Call useAuth once here
  const { token } = useAuth();

  useEffect(() => {
    async function fetchResumes(token: string | null): Promise<ResumeServerData[]> {
      try {
        const response = await fetch("http://localhost:8080/user/resumes-individual", {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          cache: "no-store",
        });

        if (response.ok) {
          const data = await response.json();
          console.log("Resumes received from API:", data);
          return data || [];
        } else {
          console.error("Failed to fetch resumes");
          return [];
        }
      } catch (error) {
        console.error("Error fetching resumes:", error);
        return [];
      }
    }

    if (token) {
      fetchResumes(token).then(data => setResumes(data));
    }
  }, [token]); // Keep token dependency for fetching resumes when token becomes available

  return (
    <main className="mx-auto w-full max-w-7xl space-y-6 px-3 py-6">
      <NewResumeButton />
      <div className="flex w-full grid-cols-2 flex-col gap-3 sm:grid md:grid-cols-3 lg:grid-cols-4">
        {resumes.map((resume) => (
          // Pass token down as a prop
          <ResumeItem key={resume.id} resume={resume} token={token} />
        ))}
      </div>
    </main>
  );
}
