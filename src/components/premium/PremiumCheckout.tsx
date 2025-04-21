"use client";

import { useAuth } from "@/lib/auth";
import { handleCheckoutPayment } from "./actions";
import { useEffect } from "react";
import { useToast } from "@/hooks/use-toast";
import { useRouter } from "next/navigation";

interface PremiumCheckoutProps {
  planId: number;
  onSuccess: () => void;
  onError: () => void;
}

export default function PremiumCheckout({ planId, onSuccess, onError }: PremiumCheckoutProps) {
  const { token } = useAuth();
  const { toast } = useToast();
  const router = useRouter();

  useEffect(() => {
    async function checkout() {
      if (token) {
        try {
          const sessionUrl = await handleCheckoutPayment(planId, token);
          if (sessionUrl) {
            window.location.href = sessionUrl;
          } else {
            toast({
              variant: "destructive",
              description: "Something went wrong. Please try again.",
            });
            onError();
          }
        } catch (error) {
          console.error(error);
          toast({
            variant: "destructive",
            description: "Something went wrong. Please try again.",
          });
          onError();
        }
      }
    }

    checkout();
  }, [token, planId, onSuccess, onError, toast, router]);

  return null;
}
