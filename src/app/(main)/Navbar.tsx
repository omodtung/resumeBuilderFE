"use client";

import { useState, useEffect, useRef } from "react";
import logo from "@/assets/logo.png";
import avatar from "@/assets/avatar.png";
import ThemeToggle from "@/components/ThemeToggle";
// import { UserButton } from "@clerk/nextjs";
import { dark } from "@clerk/themes";
import { CreditCard } from "lucide-react";
import { useTheme } from "next-themes";
import Image from "next/image";
import Link from "next/link";
import { jwtDecode } from "jwt-decode";
import LoginModal from "@/components/LoginModal";
import AccountSettingsDialog from "@/components/AccountSettingsDialog";
import { useLoginModal } from "@/context/LoginModalContext";

function UserMenu({ username }: { username: string }) {
  const [open, setOpen] = useState(false);
  const [accountSettingsOpen, setAccountSettingsOpen] = useState(false);
  const [hasMounted, setHasMounted] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    setHasMounted(true);
  }, []);

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
        setOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <div className="relative" ref={menuRef}>
      <button onClick={() => setOpen(!open)} className="focus:outline-none">
        <Image
          src={avatar} // Update this path to use the correct user avatar
          alt="User Avatar"
          width={35}
          height={35}
          className="rounded-full"
        />
      </button>
      {open && (
        <div className="absolute right-0 mt-2 w-40 rounded-md bg-transparent shadow-lg z-10">
          <Link href="/billing" className="flex items-center px-4 py-2 text-sm text-gray-700 border rounded-md hover:border-blue-500 bg-white hover:bg-gray-100">
            
              <CreditCard className="mr-2" />
              Billing
            
          </Link>
          <button onClick={() => setAccountSettingsOpen(true)} className="flex items-center px-4 py-2 text-sm text-gray-700 border rounded-md hover:border-blue-500 bg-white hover:bg-gray-100 w-full">
            Account Settings
          </button>
          <Link href="/upload-cv" className="flex items-center px-4 py-2 text-sm text-gray-700 border rounded-md hover:border-blue-500 bg-white hover:bg-gray-100 w-full">
            Upload CV
          </Link>
          {/* <div className="mt-1" /> */}
          <button
            onClick={() => {
              sessionStorage.removeItem('token');
              window.location.href = '/landingpage';
            }}
            className="flex items-center px-4 py-2 text-sm text-gray-700 border rounded-md hover:border-blue-500 bg-white hover:bg-gray-100 w-full"
          >
            Logout
          </button>
        </div>
      )}
      {hasMounted && <AccountSettingsDialog open={accountSettingsOpen} setOpen={setAccountSettingsOpen} username={username}/>}
    </div>
  );
}

export default function Navbar() {
  // const { theme } = useTheme();
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [username, setUsername] = useState("");
  const { setIsLoginModalOpen } = useLoginModal();
  const [isLoading, setIsLoading] = useState(true); // Add a loading state
  const [hasMounted, setHasMounted] = useState(false); // Add hasMounted state

  useEffect(() => {
    setHasMounted(true); // Set hasMounted to true after component mounts
  }, []);

  useEffect(() => {
    async function checkToken() {
      try {
        const token = sessionStorage.getItem("token"); // Retrieve token from sessionStorage
        console.log(token);
        if (token) {
          try {
            const decoded = jwtDecode<{
              sub: string;
              username: string;
              exp: number;
            }>(token);
            if (decoded && decoded.exp) {
              const isExpired = decoded.exp * 1000 < Date.now();

              if (isExpired) {
                // Refresh the token
                try {
                  const token = sessionStorage.getItem("token");
                  const response = await fetch("/auth-controller/refreshToken", {
                    method: "POST",
                    headers: {
                      "Content-Type": "application/json",
                      Authorization: `Bearer ${token}`,
                    },
                  });

                  if (response.ok) {
                    const data = await response.json();
                    const newToken = data.accessToken; // Assuming the response contains a new token
                    sessionStorage.setItem("token", newToken); // Store the new token
                    const newDecoded = jwtDecode<{
                      sub: string;
                      username: string;
                    }>(newToken);
                    setIsLoggedIn(true);
                    setUsername(newDecoded.sub || "username");
                  } else {
                    console.error("Failed to refresh token", response.status);
                    setIsLoggedIn(false);
                    setUsername("");
                    sessionStorage.removeItem("token");
                    window.location.reload();
                  }
                } catch (refreshError) {
                  console.error("Error refreshing token", refreshError);
                  setIsLoggedIn(false);
                  setUsername("");
                  sessionStorage.removeItem("token");
                  window.location.reload();
                }
              } else {
                setIsLoggedIn(true);
                setUsername(decoded.sub || "username");
              }
            } else {
              setIsLoggedIn(false);
              setUsername("");
            }
          } catch (error) {
            console.error("Error decoding token", error);
            setIsLoggedIn(false);
            setUsername("");
          }
        } else {
          setIsLoggedIn(false);
          setUsername("");
        }
      } catch (error) {
        console.error("Error fetching token", error);
        setIsLoggedIn(false);
        setUsername("");
      } finally {
        setIsLoading(false); // Set loading to false after the check is complete
      }
    }

    checkToken();
  }, []);

  return (
    <header className="shadow-sm">
      <div className="mx-auto flex max-w-7xl items-center justify-between gap-3 p-3">
        <Link href="/resumes" className="flex items-center gap-2">
          <Image
            src={logo}
            alt="Logo"
            width={35}
            height={35}
            className="rounded-full"
          />
          <span className="text-xl font-bold tracking-tight">
            AI Resume Builder
          </span>
        </Link>
        <div className="flex items-center gap-3" suppressHydrationWarning={true}>
          {hasMounted && <ThemeToggle />} {/* Only render ThemeToggle if mounted */}
          {hasMounted && ( // Only render UserMenu or LoginModal if mounted
            isLoading ? ( // Conditionally render based on loading state
              <div>Loading...</div> // Or any other loading indicator
            ) : isLoggedIn ? (
              <UserMenu username={username} />
            ) : (
              <LoginModal initialIsLogin={true}  />
            )
          )}
        </div>
      </div>
    </header>
  );
}
