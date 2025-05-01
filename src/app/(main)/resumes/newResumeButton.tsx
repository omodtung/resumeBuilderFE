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

  const handleNewResumeClick = () => {
    router.push("/resumes/themes");
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
