import { jsPDF } from "jspdf";
import { toPng } from "html-to-image";
import type { ResumeData } from "@/resume/context/ResumeContext";

// Better PDF export using html-to-image
export async function generateBetterPDF(
  element: HTMLElement,
  resumeData: ResumeData
): Promise<string> {
  // Calculate optimal dimensions
  const aspectRatio = element.clientHeight / element.clientWidth;
  const pageWidth = 210; // A4 width in mm
  const pageHeight = 297; // A4 height in mm

  // Create a new PDF document
  const pdf = new jsPDF({
    orientation: "portrait",
  });
}
