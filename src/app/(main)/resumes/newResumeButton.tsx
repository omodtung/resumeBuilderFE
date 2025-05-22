"use client";

import { Button } from "@/components/ui/button";
import { PlusSquare } from "lucide-react";
import { useEffect, useState } from "react";
import { useAuth } from "@/lib/auth";
import { useLoginModal } from "@/context/LoginModalContext";
import LoginModal from "@/components/LoginModal";
import React from "react";
import { useRouter } from "next/navigation";
import { jwtDecode } from "jwt-decode";

interface NewResumeButtonProps {
  type: "blank" | "template";
  buttonText: string;
}

export default function NewResumeButton({ type, buttonText }: NewResumeButtonProps) {
  const { token } = useAuth();
  const { setIsLoginModalOpen } = useLoginModal();
  const router = useRouter();

  const handleNewResumeClick = async () => {
    if (!token) {
      setIsLoginModalOpen(true);
      return;
    }

    try {
      const decodedToken: { email: string } = jwtDecode(token);
      const email = decodedToken.email;

      console.log("Fetching new resume:", {
        url: "http://localhost:8080/admin/resumes",
        method: "POST",
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          "firstName": "None",
          "lastName": "None",
          "title": "Untitled",
          "description": "None",
          "photoUrl": "",
          "colorHex": "#000000",
          "borderStyle": "squircle",
          "summary": "None",
          "jobTitle": "None",
          "city": "None",
          "country": "None",
          "phone": "0000000000",
          "email": email,
          "type": "",
          "workExperiences": [
          ],
          "educations": [
          ],
          "skills": [
          ]
        }),
      });

      const response = await fetch("http://localhost:8080/admin/resumes", {
        method: "POST",
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          "firstName": "None",
          "lastName": "None",
          "title": "Untitled",
          "description": "None",
          "photoUrl": "",
          "colorHex": "#000000",
          "borderStyle": "squircle",
          "summary": "None",
          "jobTitle": "None",
          "city": "None",
          "country": "None",
          "phone": "0000000000",
          "email": email,
          "type": "",
          "workExperiences": [
          ],
          "educations": [
          ],
          "skills": [
          ]
        }),
      });

      if (!response.ok) {
        throw new Error("Failed to create resume");
      }

      const data = await response.json();
      const resumeId = data.resume.id;
      if (resumeId) {
        router.push(`/editor?resumeId=${resumeId}`);
      }
    } catch (error) {
      console.error("Error creating resume:", error);
    }
  };

  const handleNewTemplateResumeClick = () => {
    router.push('/resumes/themes');
  };

  const handleClick = type === "blank" ? handleNewResumeClick : handleNewTemplateResumeClick;

  return (
    <Button
      onClick={handleClick}
      className="flex w-fit items-center gap-2" suppressHydrationWarning
    >
      <PlusSquare className="size-5" />
      {buttonText}
    </Button>
  );
}
