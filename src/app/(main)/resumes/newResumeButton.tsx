//// filepath: /c:/Users/LE HOANG/source/resumeBuilderFE/src/components/NewResumeButton.tsx
"use client";

import { Button } from "@/components/ui/button";
import { PlusSquare } from "lucide-react";

export default function NewResumeButton() {
  const createResume = async () => {
    try {
      const response = await fetch("http://localhost:8080/admin/resumes", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization:
            "Bearer eyJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJqb2huZG9lIiwiaWF0IjoxNzQ0Mjk4MTUxLCJleHAiOjE3NDQzODQ1NTF9.CL10mN1UHiieR-F_gXh63CgmYXgd8DC8-YEc08jc_k0",
        },
        body: null,
      });

      if (!response.ok) {
        throw new Error("Failed to create resume");
      }

      const data = await response.json();
      return data.resume.id; // Assuming the backend returns the new resume ID
    } catch (error) {
      console.error("Error creating resume:", error);
      return null;
    }
  };

  const handleNewResumeClick = async () => {
    const resumeId = await createResume();
    if (resumeId) {
      window.location.href = `/editor?resumeId=${resumeId}`;
    }
  };

  return (
    <Button
      onClick={handleNewResumeClick}
      className="mx-auto flex w-fit gap-2"
    >
      <PlusSquare className="size-5" />
      New resume
    </Button>
  );
}