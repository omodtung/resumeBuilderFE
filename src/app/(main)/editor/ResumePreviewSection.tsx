import ResumePreview from "@/components/ResumePreview";
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
    { resumeData, setResumeData, className, contentRef }: ResumePreviewSectionProps, // Destructure contentRef
    ref: Ref<HTMLDivElement>
  ) => {
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
          <ResumePreview
            resumeData={resumeData}
            className="max-w-2xl shadow-md"
            contentRef={contentRef} // Pass contentRef down
          />
        </div>
      </div>
    );
  }
);

ResumePreviewSection.displayName = 'ResumePreviewSection';

export default ResumePreviewSection;
