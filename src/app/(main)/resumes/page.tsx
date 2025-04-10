//// filepath: /c:/Users/LE HOANG/source/resumeBuilderFE/src/app/(main)/resumes/page.tsx
import { Metadata } from "next";
import Link from "next/link";
import NewResumeButton from "./newResumeButton";

export const metadata: Metadata = {
  title: "Your resumes",
};

export default function Page() {
  return (
    <main className="mx-auto w-full max-w-7xl space-y-6 px-3 py-6">
      <NewResumeButton />
    </main>
  );
}