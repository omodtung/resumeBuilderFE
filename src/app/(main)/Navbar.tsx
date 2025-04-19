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
import {jwtDecode} from "jwt-decode";
import LoginModal from "@/components/LoginModal";
import AccountSettingsDialog from "@/components/AccountSettingsDialog";

function UserMenu({username}: {username: string}) {
  const [open, setOpen] = useState(false);
  const [accountSettingsOpen, setAccountSettingsOpen] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);

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
          <Link href="#" onClick={() => setAccountSettingsOpen(true)} className="flex items-center px-4 py-2 text-sm text-gray-700 border rounded-md hover:border-blue-500 bg-white hover:bg-gray-100">
            Account Settings
          </Link>
          <div className="mt-1" />
          <button
            onClick={() => {
              sessionStorage.removeItem('token');
              window.location.reload();
            }}
            className="flex items-center px-4 py-2 text-sm text-gray-700 border rounded-md hover:border-blue-500 bg-white hover:bg-gray-100 w-full"
          >
            Logout
          </button>
        </div>
      )}
      <AccountSettingsDialog open={accountSettingsOpen} setOpen={setAccountSettingsOpen} username={username}/>
    </div>
  );
}

export default function Navbar() {
  const { theme } = useTheme();
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [username, setUsername] = useState("");

  useEffect(() => {
    async function checkToken() {
      try {
        const token = sessionStorage.getItem('token'); // Retrieve token from sessionStorage
        console.log(token);
        if (token) {
          const decoded = jwtDecode<{ sub: string, username: string }>(token);
          if (decoded && decoded.sub) {
            setIsLoggedIn(true);
            setUsername(decoded.sub || "username");
          }
        } else {
          setIsLoggedIn(false);
          setUsername("");
        }
      } catch (error) {
        console.error("Error fetching token", error);
        setIsLoggedIn(false);
        setUsername("");
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
        <div className="flex items-center gap-3">
          <ThemeToggle />
          {isLoggedIn ? (
            <UserMenu username={username}/>
          ) : (
            <LoginModal />
          )}
        </div>
      </div>
    </header>
  );
}
