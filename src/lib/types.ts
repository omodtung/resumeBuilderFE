import { ResumeValues } from "./validation";

export interface EditorFormProps {
  resumeData: ResumeValues;
  setResumeData: (data: ResumeValues) => void;
}

export interface ResumeServerData extends ResumeValues {
  id: string;
  userId: string;
  photoUrl?: string | null;
  createdAt: string;
  updatedAt: string;
}
