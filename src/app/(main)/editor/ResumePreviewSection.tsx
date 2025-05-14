import OriginalResumePreview from "@/components/ResumePreview"; // Aliased to avoid conflict
import Theme1 from "../resumes/themes/theme1";
import Theme2 from "../resumes/themes/theme2"; // Default export from theme2.tsx
import { cn } from "@/lib/utils";
import { ResumeValues } from "@/lib/validation";
import BorderStyleButton from "./BorderStyleButton";
import ColorPicker from "./ColorPicker";
import { forwardRef, Ref } from "react";

interface ResumePreviewSectionProps {
  resumeData: ResumeValues;
  setResumeData: (data: ResumeValues) => void;
  className?: string;
  contentRef?: React.RefObject<HTMLDivElement>; // Add contentRef prop
}

const ResumePreviewSection = forwardRef(
  (
    { resumeData, setResumeData, className, contentRef }: ResumePreviewSectionProps, // Destructure contentRef and themeId
    ref: Ref<HTMLDivElement>
  ) => {
    console.log("ResumePreviewSection resumeData:", resumeData); // Added console.log
    return (
      <div
        ref={ref}
        className={cn("group relative hidden w-full md:flex md:w-1/2", className)}
      >
        <div className="absolute left-1 top-1 flex flex-none flex-col gap-3 opacity-50 transition-opacity group-hover:opacity-100 lg:left-3 lg:top-3 xl:opacity-100">
          <ColorPicker
            color={resumeData.colorHex}
            onChange={(color) =>
              setResumeData({ ...resumeData, colorHex: color.hex })
            }
          />
          <BorderStyleButton
            borderStyle={resumeData.borderStyle}
            onChange={(borderStyle) =>
              setResumeData({ ...resumeData, borderStyle })
            }
          />
        </div>
        <div className="flex w-full justify-center overflow-y-auto bg-secondary p-3">
          {(() => {
            if (resumeData.type === "FPT") {
              // Theme1 only takes resumeData as per its definition.
              // If className and contentRef are needed, Theme1 component itself must be updated.
              return <Theme1 resumeData={resumeData} />;
            } else if (resumeData.type === "VNG") {
              return <Theme2 resumeData={resumeData} className="max-w-2xl shadow-md" contentRef={contentRef} />;
            } else {
              // Fallback to original preview if themeId is not FPT or VNG, or use resumeData.type as a secondary fallback
              return <OriginalResumePreview resumeData={resumeData} className="max-w-2xl shadow-md" contentRef={contentRef} />;
            }
          })()}
        </div>
      </div>
    );
  }
);

ResumePreviewSection.displayName = 'ResumePreviewSection';

export default ResumePreviewSection;
