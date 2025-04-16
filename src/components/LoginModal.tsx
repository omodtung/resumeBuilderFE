"use client";

import { useState } from 'react';
import { useToast } from "@/hooks/use-toast"
import { useRouter } from 'next/navigation';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Button } from "@/components/ui/button"

export default function LoginModal() {
  const [open, setOpen] = useState(false);
  const [isLogin, setIsLogin] = useState(true);
  const [email, setEmail] = useState('');
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const { toast } = useToast()
  const router = useRouter();
  const refreshToken = "";

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      const url = isLogin ? 'http://localhost:8080/auth/authenticate' : 'http://localhost:8080/auth/register';
      const response = await fetch(url, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, username, password, refreshToken }),
      });

      const data = await response.json();

      if (response.ok) {
        if (isLogin) {
          sessionStorage.setItem('token', data.access_token);
          toast({
            title: "Login successful",
          })
          setOpen(false);
          window.location.reload();
        } else {
          toast({
            title: "Sign up successful",
          })
          setOpen(false);
        }
      }  else {
        toast({
          variant: "destructive",
          title: isLogin ? "Login failed" : "Sign up failed",
          description: data.error,
        })
      }
    } catch (error) {
      console.error('Error logging in', error);
      toast({
        variant: "destructive",
        title: "Login failed",
        description: "An error occurred while logging in.",
      })
    }
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <div style={{ display: "flex" }}>
        <DialogTrigger asChild>
          <Button variant="outline" onClick={() => setIsLogin(true)} style={{ marginRight: "10px" }}>Login</Button>
        </DialogTrigger>
        <DialogTrigger asChild>
          <Button variant="outline" onClick={() => setIsLogin(false)}>Sign Up</Button>
        </DialogTrigger>
      </div>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>{isLogin ? "Login" : "Sign Up"}</DialogTitle>
          <DialogDescription>
            {isLogin ? "Enter your email, username and password to login." : "Enter your email, username and password to sign up."}
          </DialogDescription>
        </DialogHeader>
        <form onSubmit={handleSubmit}>
          <div className="grid gap-4 py-4">
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="email" className="text-right">
                Email
              </Label>
              <Input type="email" id="email" value={email} onChange={(e) => setEmail(e.target.value)} className="col-span-3" />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="username" className="text-right">
                Username
              </Label>
              <Input id="username" value={username} onChange={(e) => setUsername(e.target.value)} className="col-span-3" />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="password" className="text-right">
                Password
              </Label>
              <Input type="password" id="password" value={password} onChange={(e) => setPassword(e.target.value)} className="col-span-3" />
            </div>
          </div>
          <Button type="submit">{isLogin ? "Login" : "Sign Up"}</Button>
        </form>
      </DialogContent>
    </Dialog>
  );
}
