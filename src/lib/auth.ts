"use client";

import { useEffect, useState } from "react";
import { jwtDecode, JwtPayload } from "jwt-decode";

export function useAuth() {
  const [userId, setUserId] = useState<string | null>(null);
  const [token, setToken] = useState<string | null>(null);

  useEffect(() => {
    const storedToken = sessionStorage.getItem('token');
    setToken(storedToken);

    if (storedToken) {
      try {
        const decoded = jwtDecode<JwtPayload>(storedToken);
        setUserId(decoded.sub || null);
      } catch (error) {
        console.error("Invalid token", error);
        setUserId(null);
      }
    } else {
      console.log("No token found in session storage");
    }
  }, []);

  return { userId, token };
}
