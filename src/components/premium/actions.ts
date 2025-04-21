"use client";


export async function handleCheckoutPayment(planId: number, token: string): Promise<string | null> {

  if (!token) {
    throw new Error("Unauthorized");
  }

  try {
    const res = await fetch(`http://localhost:8080/checkout-payment?PlanId=${planId}`, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
    });

    if (res.ok) {
      const data = await res.json();
      return data.sessionUrl;
    } else {
      console.error("Checkout failed:", res.status, res.statusText);
      return null;
    }
  } catch (error) {
    console.error("Error during checkout:", error);
    return null;
  }
}
