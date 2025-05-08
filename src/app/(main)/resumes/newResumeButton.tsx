"use client";

import { Button } from "@/components/ui/button";
import { PlusSquare } from "lucide-react";
import { useEffect, useState } from "react";
import { useAuth } from "@/lib/auth";
import { useLoginModal } from "@/context/LoginModalContext";
import LoginModal from "@/components/LoginModal";
import React from "react";
import { useRouter } from "next/navigation";

export default function NewResumeButton() {
  const { token } = useAuth();
  const { setIsLoginModalOpen } = useLoginModal();
  const router = useRouter();

  /*
  const handleNewResumeClick = async () => {
    if (!token) {
      setIsLoginModalOpen(true);
      return;
    }

    try {
      const response = await fetch("http://localhost:8080/admin/resumes", {
        method: "POST",
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
        body: null,
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
  */
  const handleNewResumeClick = () => {
    router.push('/resumes/themes');
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
