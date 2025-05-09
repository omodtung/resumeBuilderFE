"use client";

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import resumePreview from "@/assets/resume-preview.jpg";
import logo from "@/assets/logo.png";
import Image from "next/image";
import LoginModal from '@/components/LoginModal';

export default function LandingPage() {
  const router = useRouter();

  useEffect(() => {
    const token = sessionStorage.getItem('token');
    if (token) {
      router.push('/resumes');
    }
  }, [router]);

  return (
    <div className="flex justify-center items-center h-screen bg-gradient-to-r from-purple-400 via-pink-500 to-red-500 bg-clip-border animate-gradient">
      <div className="max-w-prose space-y-3">
        <Image
          src={logo}
          alt="Logo"
          width={150}
          height={150}
          className="mx-auto md:ms-0"
        />
        <h1 className="scroll-m-20 text-4xl font-extrabold tracking-tight lg:text-5xl">
          Create the{" "}
          <span className="inline-block bg-gradient-to-r from-green-600 to-green-400 bg-clip-text text-transparent">
            Perfect Resume
          </span>{" "}
          in Minutes
        </h1>
          <LoginModal initialIsLogin={true}/>
      </div>
      <div className="ml-7">
        <Image
          src={resumePreview}
          alt="Resume preview"
          width={400}
          className="shadow-md lg:rotate-[1.5deg]"
        />
      </div>
      
      
    </div>
    
  );
}
