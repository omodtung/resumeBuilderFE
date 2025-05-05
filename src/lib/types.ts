import { ResumeValues } from "./validation";

export interface EditorFormProps {
  resumeData: ResumeValues;
  setResumeData: (data: ResumeValues) => void;
  refetchResume: () => Promise<void>;
}

export interface ResumeServerData {
  id: number;
  title: string;
  description: string;
  photoUrl: string;
  colorHex: string;
  borderStyle: string;
  summary: string;
  firstName: string;
  lastName: string;
  jobTitle: string;
  city: string;
  country: string;
  phone: string;
  email: string;
  userValue: {
    id: number;
    createdAt: string;
    updatedAt: string;
    deletedAt: string | null;
    user: {
      id: number;
      username: string;
      password: string;
      email: string;
      role: string;
      refreshToken: string;
      userValues: string[];
      userSubscriptions: object[];
      createdAt: string;
      updatedAt: string;
      enabled: boolean;
      authorities: { authority: string }[];
      credentialsNonExpired: boolean;
      accountNonExpired: boolean;
      accountNonLocked: boolean;
    };
    resume: string[];
  };
  workExperiences: {
    id: number;
    position: string;
    company: string;
    startDate: string;
    endDate: string;
    description: string;
    resume: string;
    createdAt: string;
    updatedAt: string;
  }[];
  educations: {
    id: number;
    degree: string;
    school: string;
    startDate: string;
    endDate: string;
    resume: string;
    createdAt: string;
    updatedAt: string;
  }[];
  skills: string[];
  createdAt: string;
  updatedAt: string;
}
