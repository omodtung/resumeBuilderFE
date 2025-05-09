"use client";

import { useAuth } from "@/lib/auth";

export function useIsAdmin() {
  const { userData } = useAuth();
  console.log("Is Admin:", userData?.user?.role === "ROLE_ADMIN");
  return userData?.user?.role === "ROLE_ADMIN";
}
