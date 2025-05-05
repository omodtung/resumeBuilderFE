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
// No need to import useTheme explicitly if only using Tailwind dark variants

interface AccountSettingsDialogProps {
  open: boolean;
  setOpen: (open: boolean) => void;
  username: string;
}

function AccountSettingsDialog({ open, setOpen, username }: AccountSettingsDialogProps) {
  const [email, setEmail] = useState("florian@codinginflow.com");
  const [isEditingUsername, setIsEditingUsername] = useState(false); // State to track if username is being edited
  const [editableUsername, setEditableUsername] = useState(username); // State for the editable username input
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
          {/* Apply dark mode text color to labels */}
          <div className="grid grid-cols-4 items-center gap-4">
            <label htmlFor="name" className="text-right text-sm font-medium leading-none text-foreground">
              Username
            </label>
            <div className="col-span-3 flex items-center justify-between">
              {isEditingUsername ? (
                <Input
                  id="username"
                  value={editableUsername}
                  onChange={(e) => setEditableUsername(e.target.value)}
                  className="col-span-2" // Adjust column span as needed
                />
              ) : (
                <p className="text-foreground" style={{ fontSize: username.length > 13 ? '0.8rem' : '1rem' }}>
                  {username}
                </p>
              )}
              {isEditingUsername ? (
                <>
                  <Button variant="outline" size="sm" onClick={() => { /* Save logic here */ setIsEditingUsername(false); }}>Save</Button>
                  <Button variant="secondary" size="sm" onClick={() => { setEditableUsername(username); setIsEditingUsername(false); }}>Cancel</Button>
                </>
              ) : (
                <Button variant="outline" onClick={() => setIsEditingUsername(true)}>Change username</Button>
              )}
            </div>
          </div>
          <div className="grid grid-cols-4 items-center gap-4">
            <label htmlFor="password" className="text-right text-sm font-medium leading-none text-foreground">
              Password
            </label>
            <div className="col-span-3 flex items-center justify-between">
              {/* Apply dark mode text color to paragraph */}
              <p className="text-foreground">********</p>
              <Button variant="outline">Change password</Button>
            </div>
          </div>
          <div className="grid grid-cols-4 items-center gap-4">
            <label htmlFor="email" className="text-right text-sm font-medium leading-none text-foreground">
              Email address
            </label>
            <div className="col-span-3">
              {/* Input and Button from shadcn/ui should handle theming automatically */}
              <Input type="email" id="email" value={email} onChange={(e) => setEmail(e.target.value)} className="mb-2" />
              <div className="flex justify-end">
                <Button variant="outline" onClick={handleSaveEmail}>Save email</Button>
              </div>
            </div>
          </div>
          <div className="grid grid-cols-4 items-center gap-4">
            <label htmlFor="username" className="text-right text-sm font-medium leading-none text-foreground">
              Connected accounts
            </label>
            <div className="col-span-3">
              {/* Button from shadcn/ui should handle theming automatically */}
              <Button variant="link">+ Connect account</Button>
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}

export default AccountSettingsDialog;
