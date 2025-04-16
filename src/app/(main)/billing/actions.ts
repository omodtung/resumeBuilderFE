"use server";

import { env } from "@/env";
import stripe from "@/lib/stripe";
import { useAuth } from "@/lib/auth";

export async function createCustomerPortalSession() {
  const { userId, token } = useAuth();

  if (!userId) {
    throw new Error("Unauthorized");
  }

  // const stripeCustomerId = userId.privateMetadata.stripeCustomerId as
  //   | string
  //   | undefined;

  // if (!stripeCustomerId) {
  //   throw new Error("Stripe customer ID not found");
  // }

  // const session = await stripe.billingPortal.sessions.create({
  //   customer: stripeCustomerId,
  //   return_url: `${env.NEXT_PUBLIC_BASE_URL}/billing`,
  // });

  // if (!session.url) {
  //   throw new Error("Failed to create customer portal session");
  // }

  // return session.url;
}
