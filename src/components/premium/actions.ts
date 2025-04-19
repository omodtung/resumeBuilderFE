"use server";

import { env } from "@/env";
import stripe from "@/lib/stripe";
import { useAuth } from "@/lib/auth";

export async function createCheckoutSession(priceId: string) {
  const { userId, token, userData } = useAuth();

  if (!userId) {
    throw new Error("Unauthorized");
  }

  const stripeCustomerId = userData.user_subscriptions.stripe_customer_id  as
    | string
    | undefined;

  const session = await stripe.checkout.sessions.create({
    line_items: [{ price: priceId, quantity: 1 }],
    mode: "subscription",
    success_url: `${env.NEXT_PUBLIC_BASE_URL}/billing/success`,
    cancel_url: `${env.NEXT_PUBLIC_BASE_URL}/billing`,
    customer: stripeCustomerId,
    customer_email: stripeCustomerId
      ? undefined
      : userData.email,
    metadata: {
      userId: userData.id,
    },
    subscription_data: {
      metadata: {
        userId: userData.id,
      },
    },
    custom_text: {
      terms_of_service_acceptance: {
        message: `I have read AI Resume Builder's [terms of service](${env.NEXT_PUBLIC_BASE_URL}/tos) and agree to them.`,
      },
    },
    consent_collection: {
      terms_of_service: "required",
    },
  });

  if (!session.url) {
    throw new Error("Failed to create checkout session");
  }

  return session.url;
}
