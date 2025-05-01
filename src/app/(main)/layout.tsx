"use client";

import Navbar from "./Navbar";
import { usePathname } from 'next/navigation';

export default function Layout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const isAdminPage = pathname?.startsWith('/admin');

  return (
    <div className="flex min-h-screen flex-col">
      {!isAdminPage && <Navbar />}
      {children}
    </div>
  );
}
