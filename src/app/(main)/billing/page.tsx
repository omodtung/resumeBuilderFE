"use client";

import prisma from "@/lib/prisma";
import stripe from "@/lib/stripe";
import { formatDate } from "date-fns";
import { Metadata } from "next";
import Stripe from "stripe";
import { useEffect, useState } from "react";
import GetSubscriptionButton from "./GetSubscriptionButton";
import ManageSubscriptionButton from "./ManageSubscriptionButton";
import { useAuth } from "@/lib/auth";



interface PriceInfo {
  product: {
    name: string;
  };
}

interface Props {
  userId: string;
  token: string;
}

export default function Page() {
  const { userId, token } = useAuth();
  
  if (!userId) {
    return null;
  }

  if (typeof userId !== 'string' || typeof token !== 'string') {
    return null;
  }

  return <BillingPage userId={userId} token={token} />;
}

const BillingPage: React.FC<Props> = ({ userId, token }) => {
  const [priceInfo, setPriceInfo] = useState<PriceInfo | null>(null);

  useEffect(() => {

    if (!priceInfo) {
      async function fetchUserData(userId: string, token: string) {
        const res = await fetch(`http://localhost:8080/admin/users/${userId}`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        let priceInfo: PriceInfo | null = null;
        if (res.ok) {
          const userData = await res.json();
          if (userData.subscription) {
            priceInfo = {
              product: {
                name: userData.subscription.plan,
              },
            };
          }
        }
        setPriceInfo(priceInfo);
      }
      fetchUserData(userId, token);
    }
  }, [userId, token, priceInfo]);

  return (
    <main className="mx-auto w-full max-w-7xl space-y-6 px-3 py-6">
      <h1 className="text-3xl font-bold">Billing</h1>
      <p>
        Your current plan:{" "}
        <span className="font-bold">
          {priceInfo ? priceInfo.product.name : "Free"}
        </span>
      </p>
      {priceInfo ? (
        <>
          {/* {subscription.stripeCancelAtPeriodEnd && (
            <p className="text-destructive">
              Your subscription will be canceled on{" "}
              {formatDate(subscription.stripeCurrentPeriodEnd, "MMMM dd, yyyy")}
            </p>
          )} */}
          <ManageSubscriptionButton />
        </>
      ) : (
        <GetSubscriptionButton />
      )}
    </main>
  );
};
