"use client";

import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";
import useDebounce from "@/hooks/useDebounce";
import { ResumeValues } from "@/lib/validation";
import { useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import { saveResume } from "./actions";
import { fileReplacer } from "@/lib/utils";
import { useAuth } from "@/lib/auth";

export default function useAutoSaveResume(resumeData: ResumeValues) {
  const searchParams = useSearchParams();
  const { toast } = useToast();
  const debouncedResumeData = useDebounce(resumeData, 1500);
  const [resumeId, setResumeId] = useState(resumeData.id);
  const [lastSavedData, setLastSavedData] = useState(structuredClone(resumeData));
  const [isSaving, setIsSaving] = useState(false);
  const [isError, setIsError] = useState(false);
  const { token } = useAuth();

  useEffect(() => {
    setIsError(false);
  }, [debouncedResumeData]);

  useEffect(() => {
    async function save(token: string | null) {
      try {
        setIsSaving(true);
        setIsError(false);

        const newData = structuredClone(debouncedResumeData);

        console.log("RESUME DATA:"+resumeData.id);
        // Make a POST request to the backend API
        const response = await fetch(`http://localhost:8080/admin/resumes/${debouncedResumeData.id || ""}`, {
          method: "PATCH",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify(newData),
        });

        if (!response.ok) {
          throw new Error(`Failed to save resume: ${response.statusText}`);
        }

        const updatedResume = await response.json();

        setResumeId(updatedResume.id);
        setLastSavedData(newData);

        // Update the URL with the new resume ID if it has changed and is defined
        if (updatedResume.id && searchParams.get("resumeId") !== updatedResume.id) {
          const newSearchParams = new URLSearchParams(searchParams);
          newSearchParams.set("resumeId", updatedResume.id);
          window.history.replaceState(
            null,
            "",
            `?${newSearchParams.toString()}`
          );
        }
      } catch (error) {
        setIsError(true);
        console.error(error);

        // Show a toast notification for the error
        const { dismiss } = toast({
          variant: "destructive",
          description: (
            <div className="space-y-3">
              <p>Could not save changes.</p>
              <Button
                variant="secondary"
                onClick={() => {
                  dismiss();
                  save(token); // Retry saving
                }}
              >
                Retry
              </Button>
            </div>
          ),
        });
      } finally {
        setIsSaving(false);
      }
    }

    console.log(
      "debouncedResumeData",
      JSON.stringify(debouncedResumeData, fileReplacer),
    );
    console.log("lastSavedData", JSON.stringify(lastSavedData, fileReplacer));

    const hasUnsavedChanges =
      JSON.stringify(debouncedResumeData, fileReplacer) !==
      JSON.stringify(lastSavedData, fileReplacer);

    // Only save if there are unsaved changes, data is available, not already saving, no error, and debouncedResumeData has an ID
    if (hasUnsavedChanges && debouncedResumeData && !isSaving && !isError && debouncedResumeData.id) {
      save(token);
      console.log("SAVING");
    }
    console.log("RESUME ID:" + resumeId);
  }, [
    debouncedResumeData,
    isSaving,
    lastSavedData,
    isError,
    resumeId,
    searchParams,
    toast,
    token,
  ]);

  return {
    isSaving,
    hasUnsavedChanges:
      JSON.stringify(resumeData) !== JSON.stringify(lastSavedData),
  };
}
