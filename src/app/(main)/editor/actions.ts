"use server";

import { resumeSchema, ResumeValues } from "@/lib/validation";

export async function saveResume(values: ResumeValues) {
  const { photo, ...resumeValues } = resumeSchema.parse(values);
  const id = (values as any).id; // Explicitly extract 'id' if it exists

  let newPhotoUrl: string | undefined | null = undefined;

  if (photo instanceof File) {
    const formData = new FormData();
    formData.append("file", photo);

    const response = await fetch("/api/upload", {
      method: "POST",
      body: formData,
    });

    if (!response.ok) {
      throw new Error("Failed to upload photo");
    }

    const { url } = await response.json();
    newPhotoUrl = url;
  } else if (photo === null) {
    newPhotoUrl = null;
  }

  const response = await fetch(`/api/resumes${id ? `/${id}` : ""}`, {
    method: id ? "PUT" : "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      ...resumeValues,
      photoUrl: newPhotoUrl,
    }),
  });

  if (!response.ok) {
    throw new Error("Failed to save resume");
  }

  return response.json();
}
