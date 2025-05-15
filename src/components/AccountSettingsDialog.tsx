import { useState, useEffect } from "react";
import { jwtDecode } from "jwt-decode";
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

interface DecodedToken {
  email?: string;
}

function AccountSettingsDialog({ open, setOpen, username }: AccountSettingsDialogProps) {
  const [email, setEmail] = useState("");
  const [isEditingUsername, setIsEditingUsername] = useState(false);
  const [editableUsername, setEditableUsername] = useState(username);
  const [newPassword, setNewPassword] = useState(""); // State for the new password
  const [isEditingPassword, setIsEditingPassword] = useState(false); // State to track if password is being edited
  const { toast } = useToast();

  useEffect(() => {
    const token = sessionStorage.getItem("token");
    if (token) {
      try {
        const decodedToken = jwtDecode<DecodedToken>(token);
        if (decodedToken?.email) {
          setEmail(decodedToken.email);
        }
      } catch (error) {
        console.error("Failed to decode token:", error);
      }
    }
  }, []);

  const isValidEmail = (email: string) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  const updateUserField = async (field: string, value: string) => {
    const userId = sessionStorage.getItem("userId");
    const token = sessionStorage.getItem("token");

    if (!userId) {
      toast({
        title: "Error",
        description: "User ID not found in session storage.",
        variant: "destructive",
      });
      return;
    }

    if (!token) {
      toast({
        title: "Error",
        description: "Token not found in session storage.",
        variant: "destructive",
      });
      return;
    }

    try {
      const response = await fetch(`http://localhost:8080/admin/users/${userId}`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ [field]: value }),
      });

      if (response.ok) {
        toast({
          title: "Success",
          description: `${field.charAt(0).toUpperCase() + field.slice(1)} updated successfully.`,
        });
        if (field === "username") setIsEditingUsername(false);
      } else {
        const errorData = await response.json();
        toast({
          title: "Error",
          description: errorData.message || `Failed to update ${field}.`,
          variant: "destructive",
        });
      }
    } catch (error) {
      console.error(`Error updating ${field}:`, error);
      toast({
        title: "Error",
        description: `An error occurred while updating the ${field}.`,
        variant: "destructive",
      });
    }
  };

  const handleSaveUsername = () => {
    updateUserField("username", editableUsername);
  };

  const handleSaveEmail = () => {
    if (!isValidEmail(email)) {
      toast({
        title: "Error",
        description: "Please enter a valid email address.",
        variant: "destructive",
      });
      return;
    }
    updateUserField("email", email);
  };

  const handleChangePassword = (newPassword: string) => {
    if (!newPassword || newPassword.length < 6) {
      toast({
        title: "Error",
        description: "Password must be at least 6 characters long.",
        variant: "destructive",
      });
      return;
    }
    updateUserField("password", newPassword);
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
            <label htmlFor="name" className="text-right text-sm font-medium leading-none text-foreground">
              Username
            </label>
            <div className="col-span-3 flex items-center justify-between">
              {isEditingUsername ? (
                <Input
                  id="username"
                  value={editableUsername}
                  onChange={(e) => setEditableUsername(e.target.value)}
                  className="col-span-2"
                />
              ) : (
                <p className="text-foreground" style={{ fontSize: username.length > 13 ? '0.8rem' : '1rem' }}>
                  {username}
                </p>
              )}
              {isEditingUsername ? (
                <>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={handleSaveUsername}
                  >
                    Save
                  </Button>
                  <Button
                    variant="secondary"
                    size="sm"
                    onClick={() => {
                      setEditableUsername(username);
                      setIsEditingUsername(false);
                    }}
                  >
                    Cancel
                  </Button>
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
              {isEditingPassword ? (
                <div className="flex flex-col w-full">
                  <Input
                    type="password"
                    id="newPassword"
                    value={newPassword}
                    onChange={(e) => setNewPassword(e.target.value)}
                    placeholder="Enter new password"
                    className="mb-2"
                  />
                  <div className="flex justify-end gap-2">
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => {
                        handleChangePassword(newPassword);
                        setIsEditingPassword(false);
                        setNewPassword("");
                      }}
                    >
                      Save
                    </Button>
                    <Button
                      variant="secondary"
                      size="sm"
                      onClick={() => {
                        setIsEditingPassword(false);
                        setNewPassword("");
                      }}
                    >
                      Cancel
                    </Button>
                  </div>
                </div>
              ) : (
                <>
                  <p className="text-foreground">********</p>
                  <Button variant="outline" onClick={() => setIsEditingPassword(true)}>
                    Change password
                  </Button>
                </>
              )}
            </div>
          </div>
          <div className="grid grid-cols-4 items-center gap-4">
            <label htmlFor="email" className="text-right text-sm font-medium leading-none text-foreground">
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
            <label htmlFor="username" className="text-right text-sm font-medium leading-none text-foreground">
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
