"use client";

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import LoginModal from '@/components/LoginModal';

export default function LandingPage() {
  const router = useRouter();

  useEffect(() => {
    const token = sessionStorage.getItem('token');
    if (token) {
      router.push('/(main)/resumes');
    }
  }, [router]);

  return (
    <div className="flex justify-center items-center h-screen">
      <LoginModal initialIsLogin={true}/>
    </div>
  );
}
