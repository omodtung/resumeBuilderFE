"use server";

import { canUseAITools } from "@/lib/permissions";
import { getUserSubscriptionLevel } from "@/lib/subscription";
import {
  GenerateSummaryInput,
  generateSummarySchema,
  GenerateWorkExperienceInput,
  generateWorkExperienceSchema,
  WorkExperience,
} from "@/lib/validation";

// Define interfaces that include auth info (passed from client)
interface GenerateSummaryInputWithAuth extends GenerateSummaryInput {
  userId: string;
  token: string;
}

interface GenerateWorkExperienceInputWithAuth extends GenerateWorkExperienceInput {
  userId: string;
  token: string;
}

export async function generateSummary(input: GenerateSummaryInputWithAuth) {
  // Extract auth info and form data
  const { userId, token, ...formData } = input;

  if (!userId || !token) {
    throw new Error("Unauthorized: Missing user ID or token");
  }

  // Check subscription level, passing the token
  const subscriptionLevel = await getUserSubscriptionLevel(userId, token);
  if (!canUseAITools(subscriptionLevel)) {
    throw new Error("Upgrade your subscription to use this feature");
  }

  // Validate form data
  const validatedData = generateSummarySchema.parse(formData);

  // Call backend API
  try {
    const response = await fetch("http://localhost:8080/api/openai/summary", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({
        jobTitle: validatedData.jobTitle,
        skills: validatedData.skills ? validatedData.skills.join(", ") : "",
      }),
    });

    console.log("Summary fetch request:", "http://localhost:8080/api/openai/summary", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({
        jobTitle: validatedData.jobTitle,
        skills: validatedData.skills ? validatedData.skills.join(", ") : "",
      }),
    });

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.message || `API request failed with status ${response.status}`);
    }

    // Assuming the backend returns the summary directly as text
    const summary = await response.text();
    return summary;

  } catch (error) {
    console.error("Error generating summary via backend:", error);
    throw new Error(`Failed to generate summary: ${error instanceof Error ? error.message : "Unknown error"}`);
  }
}

export async function generateWorkExperience(
  input: GenerateWorkExperienceInputWithAuth,
): Promise<WorkExperience> {
  // Extract auth info and form data
  const { userId, token, ...formData } = input;

  if (!userId || !token) {
    throw new Error("Unauthorized: Missing user ID or token");
  }

  // Check subscription level, passing the token
  const subscriptionLevel = await getUserSubscriptionLevel(userId, token);
  if (!canUseAITools(subscriptionLevel)) {
    throw new Error("Upgrade your subscription to use this feature");
  }

  // Validate form data
  const validatedData = generateWorkExperienceSchema.parse(formData);
  //console.log("FETCHING AI WORK EXPERIENCE", validatedData.description);
  // Call backend API
  try {
    const response = await fetch("http://localhost:8080/api/openai/work-experience", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({ description: validatedData.description }),
    });
    console.log(response.body);
    //console.log(JSON.stringify({ description: validatedData.description }));
    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.message || `API request failed with status ${response.status}`);
    }

    // Assuming the backend returns a JSON object matching the WorkExperience structure
    const workExperience: WorkExperience = await response.json();
    return workExperience;

  } catch (error) {
    console.error("Error generating work experience via backend:", error);
    throw new Error(`Failed to generate work experience: ${error instanceof Error ? error.message : "Unknown error"}`);
  }
}
