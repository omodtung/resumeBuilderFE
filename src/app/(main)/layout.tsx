"use client";

import { useState, useEffect } from 'react'; // Import hooks
import Navbar from "./Navbar";
import { usePathname } from 'next/navigation';
import SubscriptionLevelProvider from "./SubscriptionLevelProvider";

export default function Layout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const [hasMounted, setHasMounted] = useState(false); // Add mounted state

  useEffect(() => {
    setHasMounted(true); // Set mounted after initial render
  }, []);

  const isAdminPage = pathname?.startsWith('/admin');

  return (
    <div className="flex min-h-screen flex-col" suppressHydrationWarning>
      {/* Only render Navbar if mounted and not admin page */}
      {!isAdminPage && <Navbar />}
      <SubscriptionLevelProvider userSubscriptionLevel="free">
        {children}
      </SubscriptionLevelProvider>
    </div>
  );
}
