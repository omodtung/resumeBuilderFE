"use client";

import { Button } from "@/components/ui/button";
import { PlusSquare } from "lucide-react";
import { useEffect, useState } from "react";
import { useAuth } from "@/lib/auth";
import { useLoginModal } from "@/context/LoginModalContext";
import  LoginModal  from "@/components/LoginModal";
import React from "react";

export default function NewResumeButton() {
  const { token } = useAuth();
  const { setIsLoginModalOpen } = useLoginModal();

  const createResume = async (token: string | null) => {
    try {
      const response = await fetch("http://localhost:8080/admin/resumes", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
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
    if (!token) {
      setIsLoginModalOpen(true);
      return;
    }
    const resumeId = await createResume(token);
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
