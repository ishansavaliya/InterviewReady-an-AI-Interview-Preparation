import { jsPDF } from "jspdf";
import type { ResumeData } from "@/resume/context/ResumeContext";

// PDF export helper function
export async function generateBetterPDF(
  element: HTMLElement,
  resumeData: ResumeData
): Promise<string> {
  // Create a new PDF document
  const pdf = new jsPDF({
    orientation: "portrait",
    unit: "mm",
    format: "a4",
  });

  try {
    // Generate filename based on user's name
    const fileName =
      resumeData.personalInfo.firstName && resumeData.personalInfo.lastName
        ? `${resumeData.personalInfo.firstName.toLowerCase()}_${resumeData.personalInfo.lastName.toLowerCase()}_resume.pdf`
        : "resume.pdf";

    return fileName;
  } catch (error) {
    console.error("Error generating PDF:", error);
    throw new Error("Failed to generate PDF");
  }
}
