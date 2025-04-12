/**
 * Resume Context
 * Provides state management for resume data across all builder components
 */

import { createContext, useContext, useState, ReactNode } from "react";

// Resume template options
export enum ResumeTemplate {
  PROFESSIONAL = "professional",
  MODERN = "modern",
}

// Resume data structure
export interface ResumeData {
  template: ResumeTemplate;
  personalInfo: {
    firstName: string;
    lastName: string;
    jobTitle: string;
    photo: string | null;
    city: string;
    country: string;
    phone: string;
    email: string;
    linkedin: string;
    github: string;
    website: string;
    additionalLinks: Array<{
      id: string;
      label: string;
      url: string;
    }>;
  };
  summary: string;
  workExperience: Array<{
    id: string;
    position: string;
    company: string;
    location: string;
    startDate: string;
    endDate: string;
    current: boolean;
    description: string;
  }>;
  projects: Array<{
    id: string;
    title: string;
    description: string;
    technologies: string;
    githubUrl: string;
    liveUrl: string;
    startDate: string;
    endDate: string;
    current: boolean;
  }>;
  education: Array<{
    id: string;
    degree: string;
    institution: string;
    location: string;
    startDate: string;
    endDate: string;
    current: boolean;
    description: string;
    grade: string;
    percentage: string;
    percentileRank: string;
  }>;
  skills: Array<{
    id: string;
    name: string;
    level: number;
  }>;
  certificates: Array<{
    id: string;
    name: string;
    issuer: string;
    date: string;
    url: string;
  }>;
}

// Default empty resume data
const defaultResumeData: ResumeData = {
  template: ResumeTemplate.PROFESSIONAL,
  personalInfo: {
    firstName: "",
    lastName: "",
    jobTitle: "",
    photo: null,
    city: "",
    country: "",
    phone: "",
    email: "",
    linkedin: "",
    github: "",
    website: "",
    additionalLinks: [],
  },
  summary: "",
  workExperience: [],
  projects: [],
  education: [],
  skills: [],
  certificates: [],
};

// Context interface
interface ResumeContextType {
  resumeData: ResumeData;
  updateTemplate: (template: ResumeTemplate) => void;
  updatePersonalInfo: (data: Partial<ResumeData["personalInfo"]>) => void;
  addPersonalLink: (
    item: Omit<ResumeData["personalInfo"]["additionalLinks"][0], "id">
  ) => void;
  updatePersonalLink: (
    id: string,
    data: Partial<Omit<ResumeData["personalInfo"]["additionalLinks"][0], "id">>
  ) => void;
  removePersonalLink: (id: string) => void;
  updateSummary: (summary: string) => void;
  addWorkExperience: (
    item: Omit<ResumeData["workExperience"][0], "id">
  ) => void;
  updateWorkExperience: (
    id: string,
    data: Partial<Omit<ResumeData["workExperience"][0], "id">>
  ) => void;
  removeWorkExperience: (id: string) => void;
  addProject: (item: Omit<ResumeData["projects"][0], "id">) => void;
  updateProject: (
    id: string,
    data: Partial<Omit<ResumeData["projects"][0], "id">>
  ) => void;
  removeProject: (id: string) => void;
  addEducation: (item: Omit<ResumeData["education"][0], "id">) => void;
  updateEducation: (
    id: string,
    data: Partial<Omit<ResumeData["education"][0], "id">>
  ) => void;
  removeEducation: (id: string) => void;
  addSkill: (item: Omit<ResumeData["skills"][0], "id">) => void;
  updateSkill: (
    id: string,
    data: Partial<Omit<ResumeData["skills"][0], "id">>
  ) => void;
  removeSkill: (id: string) => void;
  addCertificate: (item: Omit<ResumeData["certificates"][0], "id">) => void;
  updateCertificate: (
    id: string,
    data: Partial<Omit<ResumeData["certificates"][0], "id">>
  ) => void;
  removeCertificate: (id: string) => void;
}

// Create context with default values
const ResumeContext = createContext<ResumeContextType>({
  resumeData: defaultResumeData,
  updateTemplate: () => {},
  updatePersonalInfo: () => {},
  addPersonalLink: () => {},
  updatePersonalLink: () => {},
  removePersonalLink: () => {},
  updateSummary: () => {},
  addWorkExperience: () => {},
  updateWorkExperience: () => {},
  removeWorkExperience: () => {},
  addProject: () => {},
  updateProject: () => {},
  removeProject: () => {},
  addEducation: () => {},
  updateEducation: () => {},
  removeEducation: () => {},
  addSkill: () => {},
  updateSkill: () => {},
  removeSkill: () => {},
  addCertificate: () => {},
  updateCertificate: () => {},
  removeCertificate: () => {},
});

// Generate unique ID helper
const generateId = () => Math.random().toString(36).substring(2, 9);

// Provider component for the Resume Context
export const ResumeContextProvider = ({
  children,
}: {
  children: ReactNode;
}) => {
  const [resumeData, setResumeData] = useState<ResumeData>(defaultResumeData);

  // Template method
  const updateTemplate = (template: ResumeTemplate) => {
    setResumeData((prev) => ({
      ...prev,
      template,
    }));
  };

  // Personal Info methods
  const updatePersonalInfo = (data: Partial<ResumeData["personalInfo"]>) => {
    setResumeData((prev) => ({
      ...prev,
      personalInfo: {
        ...prev.personalInfo,
        ...data,
      },
    }));
  };

  // Personal Links methods
  const addPersonalLink = (
    item: Omit<ResumeData["personalInfo"]["additionalLinks"][0], "id">
  ) => {
    setResumeData((prev) => ({
      ...prev,
      personalInfo: {
        ...prev.personalInfo,
        additionalLinks: [
          ...prev.personalInfo.additionalLinks,
          { ...item, id: generateId() },
        ],
      },
    }));
  };

  const updatePersonalLink = (
    id: string,
    data: Partial<Omit<ResumeData["personalInfo"]["additionalLinks"][0], "id">>
  ) => {
    setResumeData((prev) => ({
      ...prev,
      personalInfo: {
        ...prev.personalInfo,
        additionalLinks: prev.personalInfo.additionalLinks.map((item) =>
          item.id === id ? { ...item, ...data } : item
        ),
      },
    }));
  };

  const removePersonalLink = (id: string) => {
    setResumeData((prev) => ({
      ...prev,
      personalInfo: {
        ...prev.personalInfo,
        additionalLinks: prev.personalInfo.additionalLinks.filter(
          (item) => item.id !== id
        ),
      },
    }));
  };

  // Summary method
  const updateSummary = (summary: string) => {
    setResumeData((prev) => ({
      ...prev,
      summary,
    }));
  };

  // Work Experience methods
  const addWorkExperience = (
    item: Omit<ResumeData["workExperience"][0], "id">
  ) => {
    setResumeData((prev) => ({
      ...prev,
      workExperience: [...prev.workExperience, { ...item, id: generateId() }],
    }));
  };

  const updateWorkExperience = (
    id: string,
    data: Partial<Omit<ResumeData["workExperience"][0], "id">>
  ) => {
    setResumeData((prev) => ({
      ...prev,
      workExperience: prev.workExperience.map((item) =>
        item.id === id ? { ...item, ...data } : item
      ),
    }));
  };

  const removeWorkExperience = (id: string) => {
    setResumeData((prev) => ({
      ...prev,
      workExperience: prev.workExperience.filter((item) => item.id !== id),
    }));
  };

  // Projects methods
  const addProject = (item: Omit<ResumeData["projects"][0], "id">) => {
    setResumeData((prev) => ({
      ...prev,
      projects: [...prev.projects, { ...item, id: generateId() }],
    }));
  };

  const updateProject = (
    id: string,
    data: Partial<Omit<ResumeData["projects"][0], "id">>
  ) => {
    setResumeData((prev) => ({
      ...prev,
      projects: prev.projects.map((item) =>
        item.id === id ? { ...item, ...data } : item
      ),
    }));
  };

  const removeProject = (id: string) => {
    setResumeData((prev) => ({
      ...prev,
      projects: prev.projects.filter((item) => item.id !== id),
    }));
  };

  // Education methods
  const addEducation = (item: Omit<ResumeData["education"][0], "id">) => {
    setResumeData((prev) => ({
      ...prev,
      education: [...prev.education, { ...item, id: generateId() }],
    }));
  };

  const updateEducation = (
    id: string,
    data: Partial<Omit<ResumeData["education"][0], "id">>
  ) => {
    setResumeData((prev) => ({
      ...prev,
      education: prev.education.map((item) =>
        item.id === id ? { ...item, ...data } : item
      ),
    }));
  };

  const removeEducation = (id: string) => {
    setResumeData((prev) => ({
      ...prev,
      education: prev.education.filter((item) => item.id !== id),
    }));
  };

  // Skills methods
  const addSkill = (item: Omit<ResumeData["skills"][0], "id">) => {
    setResumeData((prev) => ({
      ...prev,
      skills: [...prev.skills, { ...item, id: generateId() }],
    }));
  };

  const updateSkill = (
    id: string,
    data: Partial<Omit<ResumeData["skills"][0], "id">>
  ) => {
    setResumeData((prev) => ({
      ...prev,
      skills: prev.skills.map((item) =>
        item.id === id ? { ...item, ...data } : item
      ),
    }));
  };

  const removeSkill = (id: string) => {
    setResumeData((prev) => ({
      ...prev,
      skills: prev.skills.filter((item) => item.id !== id),
    }));
  };

  // Certificates methods
  const addCertificate = (item: Omit<ResumeData["certificates"][0], "id">) => {
    setResumeData((prev) => ({
      ...prev,
      certificates: [...prev.certificates, { ...item, id: generateId() }],
    }));
  };

  const updateCertificate = (
    id: string,
    data: Partial<Omit<ResumeData["certificates"][0], "id">>
  ) => {
    setResumeData((prev) => ({
      ...prev,
      certificates: prev.certificates.map((item) =>
        item.id === id ? { ...item, ...data } : item
      ),
    }));
  };

  const removeCertificate = (id: string) => {
    setResumeData((prev) => ({
      ...prev,
      certificates: prev.certificates.filter((item) => item.id !== id),
    }));
  };

  return (
    <ResumeContext.Provider
      value={{
        resumeData,
        updateTemplate,
        updatePersonalInfo,
        addPersonalLink,
        updatePersonalLink,
        removePersonalLink,
        updateSummary,
        addWorkExperience,
        updateWorkExperience,
        removeWorkExperience,
        addProject,
        updateProject,
        removeProject,
        addEducation,
        updateEducation,
        removeEducation,
        addSkill,
        updateSkill,
        removeSkill,
        addCertificate,
        updateCertificate,
        removeCertificate,
      }}
    >
      {children}
    </ResumeContext.Provider>
  );
};

// Custom hook for using the Resume Context
export const useResumeContext = () => useContext(ResumeContext);
