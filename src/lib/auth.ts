"use client";

import { useEffect, useState } from "react";
import { jwtDecode, JwtPayload } from "jwt-decode";

export function useAuth() {
  const [userId, setUserId] = useState<string | null>(null);
  const [token, setToken] = useState<string | null>(null);
  const [userData, setUserData] = useState<any | null>(null);

  useEffect(() => {
    const storedToken = sessionStorage.getItem('token');
    setToken(storedToken);

    async function fetchUserData(userId: string, token: string) {
      const res = await fetch(`http://localhost:8080/admin/users/${userId}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      if (res.ok) {
        const userData = await res.json();
        setUserData(userData);
      } else {
        setUserData(null);
      }
    }

    if (storedToken) {
      try {
        const decoded = jwtDecode<JwtPayload>(storedToken);
        const userIdDecoded = decoded.sub || null;
        setUserId(userIdDecoded);
        if (userIdDecoded) {
          fetchUserData(userIdDecoded, storedToken);
        }
      } catch (error) {
        console.error("Invalid token", error);
        setUserId(null);
      }
    } else {
      console.log("No token found in session storage");
    }
  }, []);

  return { userId, token, userData };
}
