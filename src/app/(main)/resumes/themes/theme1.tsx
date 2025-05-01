"use client";

import ResumePreview from "@/components/ResumePreview";
import { ResumeValues } from "@/lib/validation";

interface Theme1Props {
  resumeData: ResumeValues;
}

const Theme1 = ({ resumeData }: Theme1Props) => {
  return (
    <ResumePreview resumeData={resumeData} />
  );
};

Theme1.typeId = "FPT";

export default Theme1;
