import { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useToast } from "@/hooks/use-toast";

interface AccountSettingsDialogProps {
  open: boolean;
  setOpen: (open: boolean) => void;
  username: string;
}

function AccountSettingsDialog({ open, setOpen, username }: AccountSettingsDialogProps) {
  const [email, setEmail] = useState("florian@codinginflow.com");
  const { toast } = useToast();

  const isValidEmail = (email: string) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  const handleSaveEmail = () => {
    if (isValidEmail(email)) {
      // Save email logic here
      toast({
        title: "Success",
        description: "Email saved successfully.",
      });
    } else {
      toast({
        title: "Error",
        description: "Please enter a valid email address.",
        variant: "destructive",
      });
    }
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Account</DialogTitle>
          <DialogDescription>
            Manage your account info.
          </DialogDescription>
        </DialogHeader>
        <div className="grid gap-4 py-4">
          <div className="grid grid-cols-4 items-center gap-4">
            <label htmlFor="name" className="text-right text-sm font-medium leading-none text-gray-800">
              Username
            </label>
            <div className="col-span-3 flex items-center justify-between">
              <p style={{ fontSize: username.length > 13 ? '0.8rem' : '1rem' }}>{username}</p>
              <Button variant="outline">Change username</Button>
            </div>
          </div>
          <div className="grid grid-cols-4 items-center gap-4">
            <label htmlFor="password" className="text-right text-sm font-medium leading-none text-gray-800">
              Password
            </label>
            <div className="col-span-3 flex items-center justify-between">
              <p>********</p>
              <Button variant="outline">Change password</Button>
            </div>
          </div>
          <div className="grid grid-cols-4 items-center gap-4">
            <label htmlFor="email" className="text-right text-sm font-medium leading-none text-gray-800">
              Email address
            </label>
            <div className="col-span-3">
              <Input type="email" id="email" value={email} onChange={(e) => setEmail(e.target.value)} className="mb-2" />
              <div className="flex justify-end">
                <Button variant="outline" onClick={handleSaveEmail}>Save email</Button>
              </div>
            </div>
          </div>
          <div className="grid grid-cols-4 items-center gap-4">
            <label htmlFor="username" className="text-right text-sm font-medium leading-none text-gray-800">
              Connected accounts
            </label>
            <div className="col-span-3">
              <Button variant="link">+ Connect account</Button>
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}

export default AccountSettingsDialog;
