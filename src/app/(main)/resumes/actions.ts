"use server";

import prisma from "@/lib/prisma";
import { del } from "@vercel/blob";
import { revalidatePath } from "next/cache";
import { jwtDecode } from "jwt-decode";
import { JwtPayload } from "jsonwebtoken";
import { cookies } from "next/headers";

export async function deleteResume(id: number, token: string | null) {
  async function getUserId(token: string | null) {
    if (!token) {
      console.error("No token found in session storage");
      return null;
    }
    try {
      const decoded = jwtDecode<JwtPayload>(token);
      return decoded.sub; // returns the user id
    } catch (error) {
      console.error("Invalid token", error);
      return null;
    }
  }

  const userId = await getUserId(token);

  if (!userId) {
    throw new Error("User not authenticated");
  }

  let resumeToEdit = null;
  
  const response = await fetch(`http://localhost:8080/user/resumes-individual/`, {
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    cache: "no-store", // optional: to always fetch fresh data
  });

  if (response.ok) {
    const data = await response.json();
    console.log("Resume data:", resumeToEdit);
    resumeToEdit = data.resume; // backend should return { resume: { ... } }
    
  }
  

  if (!resumeToEdit) {
    throw new Error("Resume not found");
  }

  // if (resumeToEdit.photoUrl) {
  //   await del(resumeToEdit.photoUrl);
  // }
  
  // Instead of deleting the resume via prisma, send a DELETE request to the backend API
  const deleteResponse = await fetch(`http://localhost:8080/admin/resumes/${id}`, {
    method: "DELETE",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    cache: "no-store",
  });
  
  if (!deleteResponse.ok) {
    throw new Error("Failed to delete resume");
  }

  revalidatePath("/resumes");
}
