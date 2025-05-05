import { cache } from "react";
// Removed Prisma and env imports

export type SubscriptionLevel = "free" | "pro" | "pro_plus";

// Updated function signature to accept token
export const getUserSubscriptionLevel = cache(
  async (userId: string, token: string | null): Promise<SubscriptionLevel> => {
    // Handle case where token might be missing, default to free
    if (!token) {
      console.error("No token provided for getUserSubscriptionLevel for userId:", userId);
      return "free";
    }

    try {
      // Fetch subscription data from the backend endpoint provided by the user
      const res = await fetch(`http://localhost:8080/user/user-subscription-follow-userId`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (!res.ok) {
        console.error(`Failed to fetch subscription status for userId ${userId}: ${res.status} ${res.statusText}`);
        // Default to 'free' if fetch fails or returns error
        return "free";
      }

      const data = await res.json();

      // Extract plan name based on user feedback: data.plan.plansName
      const planName = data?.plan?.plansName;

      // Map plan name to SubscriptionLevel (case-insensitive)
      if (typeof planName === 'string') {
        const lowerCasePlanName = planName.toLowerCase();
        if (lowerCasePlanName === "pro") {
          return "pro";
        }
        // Allow for variations like "pro_plus" or "pro plus"
        if (lowerCasePlanName === "pro_plus" || lowerCasePlanName === "pro plus") {
          return "pro_plus";
        }
      }

      // Default to 'free' if plan name is missing, not recognized, or explicitly 'free'
      return "free";

    } catch (error) {
      console.error(`Error fetching user subscription level for userId ${userId}:`, error);
      // Default to 'free' in case of any exception during fetch
      return "free";
    }
  },
);
