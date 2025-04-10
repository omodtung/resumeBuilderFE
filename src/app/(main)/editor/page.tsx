import prisma from "@/lib/prisma";
import { resumeDataInclude } from "@/lib/types";
import { Metadata } from "next";
import ResumeEditor from "./ResumeEditor";
import { jwtDecode } from "jwt-decode";


interface PageProps {
  searchParams: Promise<{ resumeId?: string }>;
}

interface JwtPayload {
  sub: string; // user id field
  // include any other fields if needed
}

export const metadata: Metadata = {
  title: "Design your resume",
};

// Replace this with your own authentication logic
async function getUserId() {
  // Hardcoded token for testing (replace with your test token)
  const token =
    "eyJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJqb2huZG9lIiwiaWF0IjoxNzQ0Mjk4MTUxLCJleHAiOjE3NDQzODQ1NTF9.CL10mN1UHiieR-F_gXh63CgmYXgd8DC8-YEc08jc_k0";
  
  try {
    const decoded = jwtDecode<JwtPayload>(token);
    return decoded.sub; // returns the user id
  } catch (error) {
    console.error("Invalid token", error);
    return null;
  }
}

export default async function Page({ searchParams }: PageProps) {
  const { resumeId } = await searchParams;

  const userId = await getUserId();

  if (!userId) {
    return null;
  }

  let resumeToEdit = null;
  if (resumeId) {
    const response = await fetch(`http://localhost:8080/admin/resumes/${resumeId}`, {
      headers: {
        "Content-Type": "application/json",
        // Pass the same token you use in getUserId (or a proper auth token)
        Authorization:
          "Bearer eyJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJqb2huZG9lIiwiaWF0IjoxNzQ0Mjk4MTUxLCJleHAiOjE3NDQzODQ1NTF9.CL10mN1UHiieR-F_gXh63CgmYXgd8DC8-YEc08jc_k0",
      },
      cache: "no-store", // optional: to always fetch fresh data
    });

    if (response.ok) {
      const data = await response.json();
      console.log("Resume data:", resumeToEdit);
      resumeToEdit = data.resume; // backend should return { resume: { ... } }
      
    }
  }

  if (!resumeToEdit) {
    return <div>Unauthorized - either the resume does not exist or you don't have access to it.</div>;
  }

  return <ResumeEditor resumeToEdit={resumeToEdit} />;
}
