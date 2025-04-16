import prisma from "@/lib/prisma";
import stripe from "@/lib/stripe";
import { formatDate } from "date-fns";
import { Metadata } from "next";
import Stripe from "stripe";
import GetSubscriptionButton from "./GetSubscriptionButton";
import ManageSubscriptionButton from "./ManageSubscriptionButton";

export const metadata: Metadata = {
  title: "Billing",
};

async function getUserId() {
  try {
    const token = sessionStorage.getItem('token');
    if (!token) {
      console.error("No token found in session storage");
      return null;
    }
    const decoded = jwtDecode<JwtPayload>(token);
    return decoded.sub; // returns the user id
  } catch (error) {
    console.error("Invalid token", error);
    return null;
  }
}

export default async function Page() {
  const { userId } = await getUserId();

  if (!userId) {
    return null;
  }

  const subscription = await prisma.userSubscription.findUnique({
    where: { userId },
  });

  const priceInfo = subscription
    ? await stripe.prices.retrieve(subscription.stripePriceId, {
        expand: ["product"],
      })
    : null;

  return (
    <main className="mx-auto w-full max-w-7xl space-y-6 px-3 py-6">
      <h1 className="text-3xl font-bold">Billing</h1>
      <p>
        Your current plan:{" "}
        <span className="font-bold">
          {priceInfo ? (priceInfo.product as Stripe.Product).name : "Free"}
        </span>
      </p>
      {subscription ? (
        <>
          {subscription.stripeCancelAtPeriodEnd && (
            <p className="text-destructive">
              Your subscription will be canceled on{" "}
              {formatDate(subscription.stripeCurrentPeriodEnd, "MMMM dd, yyyy")}
            </p>
          )}
          <ManageSubscriptionButton />
        </>
      ) : (
        <GetSubscriptionButton />
      )}
    </main>
  );
}
