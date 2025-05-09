"use client";

import useUnloadWarning from "@/hooks/useUnloadWarning";
import { cn, mapToResumeValues } from "@/lib/utils";
import { ResumeValues } from "@/lib/validation";
import { useSearchParams } from "next/navigation";
import { useRef, useState } from "react";
import Breadcrumbs from "./Breadcrumbs";
import Footer from "./Footer";
import ResumePreviewSection from "./ResumePreviewSection";
import { steps } from "./steps";
import useAutoSaveResume from "./useAutoSaveResume";
import { ResumeServerData, EditorFormProps } from "@/lib/types"; // Import EditorFormProps
import jsPDF from "jspdf";
// Remove static import: import html2pdf from 'html2pdf.js';
import dynamic from 'next/dynamic'; // Import next/dynamic
import { generateResumePdf } from '@/lib/pdfGenerator';

interface ResumeEditorProps {
  resumeToEdit: ResumeServerData | null;
  refetchResume: () => Promise<void>;
  initialThemeId: string | null; // New prop
}

export default function ResumeEditor({ resumeToEdit, refetchResume, initialThemeId }: ResumeEditorProps) {
  const searchParams = useSearchParams();
  const resumePreviewRef = useRef<HTMLDivElement>(null); // Keep this ref for the section if needed elsewhere
  const resumeContentRef = useRef<HTMLDivElement>(null); // Add ref for the inner content

  const [resumeData, setResumeData] = useState<ResumeValues>(
    resumeToEdit ? mapToResumeValues(resumeToEdit) : {},
  );

  const handleExportPdf = () => {
    generateResumePdf(resumeData);
  };

  const [showSmResumePreview, setShowSmResumePreview] = useState(false);

  const { isSaving, hasUnsavedChanges } = useAutoSaveResume(resumeData);

  useUnloadWarning(hasUnsavedChanges);

  const currentStep = searchParams.get("step") || steps[0].key;

  function setStep(key: string) {
    const newSearchParams = new URLSearchParams(searchParams);
    newSearchParams.set("step", key);
    window.history.pushState(null, "", `?${newSearchParams.toString()}`);
  }

  const FormComponent = steps.find(
    (step) => step.key === currentStep,
  )?.component;

  return (
    <div className="flex grow flex-col">
      <header className="space-y-1.5 border-b px-3 py-5 text-center">
        <div className="flex justify-center items-center">
          <div>
            <h1 className="text-2xl font-bold">Design your resume</h1>
            <p className="text-sm text-muted-foreground">
              Follow the steps below to create your resume. Your progress will be
              saved automatically.
            </p>
          </div>
        </div>
        {/* <button onClick={handleExportPdf} className="ml-auto block">Export to PDF</button> */}
      </header>
      <main className="relative grow">
        <div className="absolute bottom-0 top-0 flex w-full">
          <div
            className={cn(
              "w-full space-y-6 overflow-y-auto p-3 md:block md:w-1/2",
              showSmResumePreview && "hidden",
            )}
          >
            <Breadcrumbs currentStep={currentStep} setCurrentStep={setStep} />
            {FormComponent && (
              <FormComponent
                resumeData={resumeData}
                setResumeData={setResumeData}
                refetchResume={refetchResume} // Pass refetchResume down
              />
            )}
          </div>
          <div className="grow md:border-r" />
          <ResumePreviewSection
            ref={resumePreviewRef} // Keep ref for the section if needed
            contentRef={resumeContentRef} // Pass the new content ref down
            resumeData={resumeData}
            setResumeData={setResumeData}
            themeId={initialThemeId} // Pass the themeId from URL
            className={cn(showSmResumePreview && "flex")}
          />
        </div>
      </main>
      <Footer
        currentStep={currentStep}
        setCurrentStep={setStep}
        showSmResumePreview={showSmResumePreview}
        setShowSmResumePreview={setShowSmResumePreview}
        isSaving={isSaving}
      />
    </div>
  );
}
