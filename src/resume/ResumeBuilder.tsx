/**
 * Resume Builder Component
 * Main component for building and exporting resumes
 */

import { useState, useRef, useEffect } from "react";
import { Container } from "@/components/container";
import { PersonalInfo } from "./components/PersonalInfo";
import { WorkExperience } from "../resume/components/WorkExperience";
import { Education } from "../resume/components/Education";
import { Skills } from "../resume/components/Skills";
import { Summary } from "../resume/components/Summary";
import { Projects } from "../resume/components/Projects";
import { Certificates } from "../resume/components/Certificates";
import { ResumePreview } from "../resume/components/ResumePreview";
import { TemplateSelector } from "../resume/components/TemplateSelector";
import {
  ResumeContextProvider,
  useResumeContext,
} from "../resume/context/ResumeContext";
import { Button } from "@/components/ui/button";
import { Download, FileType, File } from "lucide-react";
import html2canvas from "html2canvas";
import jsPDF from "jspdf";
import {
  Document,
  Paragraph,
  TextRun,
  HeadingLevel,
  AlignmentType,
  Packer,
} from "docx";
import { saveAs } from "file-saver";
import { Link } from "react-router-dom";

/**
 * Steps enum for the resume builder process
 */
export enum BuilderStep {
  TEMPLATE = "template",
  PERSONAL_INFO = "personal-info",
  SUMMARY = "summary",
  SKILLS = "skills",
  EXPERIENCE = "experience",
  PROJECTS = "projects",
  EDUCATION = "education",
  CERTIFICATES = "certificates",
}

/**
 * ResumeBuilder Component
 * Provides a multi-step form interface for resume creation
 * with live preview and export options
 */
export const ResumeBuilder = () => {
  return (
    <ResumeContextProvider>
      <ResumeBuilderContent />
    </ResumeContextProvider>
  );
};

const ResumeBuilderContent = () => {
  const [currentStep, setCurrentStep] = useState<BuilderStep>(
    BuilderStep.TEMPLATE
  );
  const resumePreviewRef = useRef<HTMLDivElement>(null);
  const { resumeData } = useResumeContext();

  // Monitor changes to resumeData
  useEffect(() => {
    // Empty useEffect to maintain functionality without logging
  }, [resumeData]);

  // Handle step navigation
  const goToStep = (step: BuilderStep) => setCurrentStep(step);

  // Export as PDF
  const handleExportPDF = async () => {
    if (!resumePreviewRef.current) return;

    try {
      // Add a class for PDF export optimization
      resumePreviewRef.current.classList.add("pdf-export-mode");

      // Create a temporary style element for PDF export
      const styleElement = document.createElement("style");
      styleElement.textContent = `
        .pdf-export-mode {
          width: 794px !important; /* Force A4 width */
          padding: 40px !important;
          background-color: white !important;
        }
        .pdf-export-mode a { text-decoration: none !important; }
        .pdf-export-mode .truncate { 
          white-space: normal !important; 
          overflow: visible !important;
        }
        .pdf-export-mode .break-all { word-break: normal !important; }
      `;
      document.head.appendChild(styleElement);

      // Use html2canvas with improved settings
      const canvas = await html2canvas(resumePreviewRef.current, {
        scale: 3, // Higher scale for better quality
        useCORS: true,
        logging: false,
        backgroundColor: "#ffffff",
        allowTaint: true,
        removeContainer: false,
        foreignObjectRendering: false, // Disable for better compatibility
      });

      // Create the PDF with proper dimensions
      const imgData = canvas.toDataURL("image/png");
      const pdf = new jsPDF({
        orientation: "portrait",
        unit: "mm",
        format: "a4",
      });

      // Calculate dimensions
      const pageWidth = 210; // A4 width in mm
      const imgWidth = pageWidth - 20; // Add margins
      const imgHeight = (canvas.height * imgWidth) / canvas.width;

      // Add the image to the PDF
      pdf.addImage(imgData, "PNG", 10, 10, imgWidth, imgHeight);

      // Generate filename
      const fileName =
        resumeData.personalInfo.firstName && resumeData.personalInfo.lastName
          ? `${resumeData.personalInfo.firstName.toLowerCase()}_${resumeData.personalInfo.lastName.toLowerCase()}_resume.pdf`
          : "resume.pdf";

      // Save the PDF
      pdf.save(fileName);

      // Clean up
      resumePreviewRef.current.classList.remove("pdf-export-mode");
      document.head.removeChild(styleElement);
    } catch (error) {
      console.error("Error exporting PDF:", error);
      alert("Failed to export PDF. Please try again.");

      // Clean up on error
      if (resumePreviewRef.current) {
        resumePreviewRef.current.classList.remove("pdf-export-mode");
      }
      const styleElement = document.querySelector("style[data-pdf-export]");
      if (styleElement) {
        document.head.removeChild(styleElement);
      }
    }
  };

  // Export as DOCX
  const handleExportDOCX = () => {
    try {
      // Create a new document with improved styling
      const doc = new Document({
        styles: {
          paragraphStyles: [
            {
              id: "Heading1",
              name: "Heading 1",
              basedOn: "Normal",
              next: "Normal",
              quickFormat: true,
              run: {
                size: 32, // Increased size for better prominence
                bold: true,
                color: "000000",
              },
              paragraph: {
                spacing: { after: 240 },
              },
            },
            {
              id: "Heading2",
              name: "Heading 2",
              basedOn: "Normal",
              next: "Normal",
              quickFormat: true,
              run: {
                size: 28, // Increased size
                bold: true,
                color: "000000",
              },
              paragraph: {
                spacing: { before: 300, after: 240 },
                border: {
                  bottom: {
                    color: "CCCCCC",
                    size: 1,
                    space: 8,
                    style: "single",
                  },
                },
              },
            },
            {
              id: "NormalParagraph",
              name: "Normal Paragraph",
              basedOn: "Normal",
              next: "Normal",
              run: {
                size: 24, // Increased for better readability
              },
              paragraph: {
                spacing: {
                  line: 276,
                  after: 200,
                },
              },
            },
          ],
        },
        sections: [
          {
            properties: {
              page: {
                margin: {
                  top: 1000,
                  right: 1000,
                  bottom: 1000,
                  left: 1000,
                },
              },
            },
            children: [
              // Header with name and job title
              new Paragraph({
                text: `${resumeData.personalInfo.firstName} ${resumeData.personalInfo.lastName}`,
                heading: HeadingLevel.HEADING_1,
                alignment: AlignmentType.CENTER,
              }),

              resumeData.personalInfo.jobTitle
                ? new Paragraph({
                    text: resumeData.personalInfo.jobTitle,
                    alignment: AlignmentType.CENTER,
                    spacing: { after: 300 },
                    style: "NormalParagraph",
                  })
                : new Paragraph({}),

              // Contact Information
              new Paragraph({
                children: [
                  new TextRun({ text: "Contact: ", bold: true }),
                  new TextRun({
                    text: `${resumeData.personalInfo.email || ""}  `,
                  }),
                  resumeData.personalInfo.phone
                    ? new TextRun({
                        text: `| ${resumeData.personalInfo.phone}  `,
                      })
                    : new TextRun({}),
                  resumeData.personalInfo.city ||
                  resumeData.personalInfo.country
                    ? new TextRun({
                        text: `| ${[
                          resumeData.personalInfo.city,
                          resumeData.personalInfo.country,
                        ]
                          .filter(Boolean)
                          .join(", ")}`,
                      })
                    : new TextRun({}),
                ],
                alignment: AlignmentType.CENTER,
                spacing: { after: 300 },
              }),

              // Links Section with improved formatting
              resumeData.personalInfo.linkedin ||
              resumeData.personalInfo.github ||
              resumeData.personalInfo.website
                ? new Paragraph({
                    children: [
                      new TextRun({ text: "Links: ", bold: true }),
                      resumeData.personalInfo.linkedin
                        ? new TextRun({
                            text: `LinkedIn: ${resumeData.personalInfo.linkedin}  `,
                          })
                        : new TextRun({}),
                      resumeData.personalInfo.github
                        ? new TextRun({
                            text: `| GitHub: ${resumeData.personalInfo.github}  `,
                          })
                        : new TextRun({}),
                      resumeData.personalInfo.website
                        ? new TextRun({
                            text: `| Website: ${resumeData.personalInfo.website}`,
                          })
                        : new TextRun({}),
                    ],
                    alignment: AlignmentType.CENTER,
                    spacing: { after: 400 },
                  })
                : new Paragraph({}),

              // Summary Section
              resumeData.summary
                ? new Paragraph({
                    text: "PROFESSIONAL SUMMARY",
                    heading: HeadingLevel.HEADING_2,
                    thematicBreak: true,
                    spacing: { after: 200 },
                  })
                : new Paragraph({}),

              resumeData.summary
                ? new Paragraph({
                    text: resumeData.summary,
                    spacing: { after: 400 },
                  })
                : new Paragraph({}),

              // Work Experience Section
              resumeData.workExperience.length > 0
                ? new Paragraph({
                    text: "WORK EXPERIENCE",
                    heading: HeadingLevel.HEADING_2,
                    thematicBreak: true,
                    spacing: { after: 200 },
                  })
                : new Paragraph({}),

              ...resumeData.workExperience.flatMap((job) => [
                new Paragraph({
                  children: [
                    new TextRun({ text: job.position, bold: true }),
                    new TextRun({ text: ` | ${job.company}` }),
                    job.location
                      ? new TextRun({ text: ` | ${job.location}` })
                      : new TextRun({}),
                  ],
                }),
                new Paragraph({
                  text: `${job.startDate || ""} - ${
                    job.current ? "Present" : job.endDate || ""
                  }`,
                  spacing: { after: 200 },
                }),
                new Paragraph({
                  text: job.description || "",
                  spacing: { after: 300 },
                }),
              ]),

              // Projects Section
              resumeData.projects.length > 0
                ? new Paragraph({
                    text: "PROJECTS",
                    heading: HeadingLevel.HEADING_2,
                    thematicBreak: true,
                    spacing: { after: 200 },
                  })
                : new Paragraph({}),

              ...resumeData.projects.flatMap((project) => [
                new Paragraph({
                  children: [
                    new TextRun({ text: project.title, bold: true }),
                    project.technologies
                      ? new TextRun({ text: ` | ${project.technologies}` })
                      : new TextRun({}),
                  ],
                }),
                project.githubUrl || project.liveUrl
                  ? new Paragraph({
                      children: [
                        project.githubUrl
                          ? new TextRun({
                              text: `GitHub: ${project.githubUrl}  `,
                            })
                          : new TextRun({}),
                        project.liveUrl
                          ? new TextRun({ text: `| Live: ${project.liveUrl}` })
                          : new TextRun({}),
                      ],
                    })
                  : new Paragraph({}),
                new Paragraph({
                  text: `${project.startDate || ""} - ${
                    project.current ? "Present" : project.endDate || ""
                  }`,
                  spacing: { after: 200 },
                }),
                new Paragraph({
                  text: project.description || "",
                  spacing: { after: 300 },
                }),
              ]),

              // Education Section
              resumeData.education.length > 0
                ? new Paragraph({
                    text: "EDUCATION",
                    heading: HeadingLevel.HEADING_2,
                    thematicBreak: true,
                    spacing: { after: 200 },
                  })
                : new Paragraph({}),

              ...resumeData.education.flatMap((edu) => [
                new Paragraph({
                  children: [
                    new TextRun({ text: edu.degree, bold: true }),
                    edu.institution
                      ? new TextRun({ text: ` | ${edu.institution}` })
                      : new TextRun({}),
                    edu.location
                      ? new TextRun({ text: ` | ${edu.location}` })
                      : new TextRun({}),
                  ],
                }),
                new Paragraph({
                  text: `${edu.startDate || ""} - ${
                    edu.current ? "Present" : edu.endDate || ""
                  }`,
                  spacing: { after: 200 },
                }),
                new Paragraph({
                  text: edu.description || "",
                  spacing: { after: 300 },
                }),
              ]),

              // Skills Section
              resumeData.skills.length > 0
                ? new Paragraph({
                    text: "SKILLS",
                    heading: HeadingLevel.HEADING_2,
                    thematicBreak: true,
                    spacing: { after: 200 },
                  })
                : new Paragraph({}),

              ...resumeData.skills.map(
                (skill) =>
                  new Paragraph({
                    children: [
                      new TextRun({ text: `${skill.name}: `, bold: true }),
                      new TextRun({ text: getSkillLevelText(skill.level) }),
                    ],
                    spacing: { after: 120 },
                  })
              ),

              // Certificates Section
              resumeData.certificates.length > 0
                ? new Paragraph({
                    text: "CERTIFICATES",
                    heading: HeadingLevel.HEADING_2,
                    thematicBreak: true,
                    spacing: { after: 200 },
                  })
                : new Paragraph({}),

              ...resumeData.certificates.flatMap((cert) => [
                new Paragraph({
                  children: [
                    new TextRun({ text: cert.name, bold: true }),
                    cert.issuer
                      ? new TextRun({ text: ` | ${cert.issuer}` })
                      : new TextRun({}),
                    cert.date
                      ? new TextRun({ text: ` | ${cert.date}` })
                      : new TextRun({}),
                  ],
                }),
                cert.url
                  ? new Paragraph({
                      text: `URL: ${cert.url}`,
                      spacing: { after: 300 },
                    })
                  : new Paragraph({ spacing: { after: 300 } }),
              ]),
            ],
          },
        ],
      });

      // Generate and save the document
      Packer.toBlob(doc).then((blob) => {
        const fileName =
          resumeData.personalInfo.firstName && resumeData.personalInfo.lastName
            ? `${resumeData.personalInfo.firstName.toLowerCase()}_${resumeData.personalInfo.lastName.toLowerCase()}_resume.docx`
            : "resume.docx";
        saveAs(blob, fileName);
      });
    } catch (error) {
      console.error("Error exporting DOCX:", error);
      alert("Failed to export DOCX. Please try again.");
    }
  };

  // Handle printing
  const handlePrint = () => {
    // Set a CSS class on the body to trigger print styling
    document.body.classList.add("printing-resume");

    // Focus on the resume for printing
    if (resumePreviewRef.current) {
      resumePreviewRef.current.setAttribute("ref", "resumePreviewRef");
    }

    // Print the window
    window.print();

    // Clean up after printing
    setTimeout(() => {
      document.body.classList.remove("printing-resume");
      if (resumePreviewRef.current) {
        resumePreviewRef.current.removeAttribute("ref");
      }
    }, 500);
  };

  // Get the current step component
  const renderCurrentStep = () => {
    switch (currentStep) {
      case BuilderStep.TEMPLATE:
        return (
          <TemplateSelector
            onNext={() => goToStep(BuilderStep.PERSONAL_INFO)}
          />
        );
      case BuilderStep.PERSONAL_INFO:
        return <PersonalInfo onNext={() => goToStep(BuilderStep.SUMMARY)} />;
      case BuilderStep.SUMMARY:
        return (
          <Summary
            onPrevious={() => goToStep(BuilderStep.PERSONAL_INFO)}
            onNext={() => goToStep(BuilderStep.SKILLS)}
          />
        );
      case BuilderStep.SKILLS:
        return (
          <Skills
            onPrevious={() => goToStep(BuilderStep.SUMMARY)}
            onNext={() => goToStep(BuilderStep.EXPERIENCE)}
          />
        );
      case BuilderStep.EXPERIENCE:
        return (
          <WorkExperience
            onPrevious={() => goToStep(BuilderStep.SKILLS)}
            onNext={() => goToStep(BuilderStep.PROJECTS)}
          />
        );
      case BuilderStep.PROJECTS:
        return (
          <Projects
            onPrevious={() => goToStep(BuilderStep.EXPERIENCE)}
            onNext={() => goToStep(BuilderStep.EDUCATION)}
          />
        );
      case BuilderStep.EDUCATION:
        return (
          <Education
            onPrevious={() => goToStep(BuilderStep.PROJECTS)}
            onNext={() => goToStep(BuilderStep.CERTIFICATES)}
          />
        );
      case BuilderStep.CERTIFICATES:
        return (
          <Certificates
            onPrevious={() => goToStep(BuilderStep.EDUCATION)}
            onExportPDF={handleExportPDF}
            onExportDOCX={handleExportDOCX}
            onPrint={handlePrint}
          />
        );
      default:
        return (
          <TemplateSelector
            onNext={() => goToStep(BuilderStep.PERSONAL_INFO)}
          />
        );
    }
  };

  return (
    <Container className="py-8">
      <div className="flex justify-center mb-6">
        <Link to="/" className="flex items-center gap-2">
          <img
            src="/assets/svg/logo.svg"
            alt="InterviewReady Logo"
            className="w-10 h-10"
          />
          <span className="text-xl font-bold text-gray-900">
            InterviewReady
          </span>
        </Link>
      </div>

      <div className="text-center mb-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">
          Design your resume
        </h1>
        <p className="text-gray-600">
          Follow the steps below to create your resume. Your progress will be
          saved automatically.
        </p>
      </div>

      <div className="flex flex-col lg:flex-row gap-8">
        {/* Left side: Form inputs */}
        <div className="lg:w-1/2">
          <div className="flex items-center mb-6 overflow-x-auto pb-2">
            <StepIndicator
              isActive={currentStep === BuilderStep.TEMPLATE}
              onClick={() => goToStep(BuilderStep.TEMPLATE)}
              label="Template"
            />
            <StepConnector />
            <StepIndicator
              isActive={currentStep === BuilderStep.PERSONAL_INFO}
              onClick={() => goToStep(BuilderStep.PERSONAL_INFO)}
              label="Personal Info"
            />
            <StepConnector />
            <StepIndicator
              isActive={currentStep === BuilderStep.SUMMARY}
              onClick={() => goToStep(BuilderStep.SUMMARY)}
              label="Summary"
            />
            <StepConnector />
            <StepIndicator
              isActive={currentStep === BuilderStep.SKILLS}
              onClick={() => goToStep(BuilderStep.SKILLS)}
              label="Skills"
            />
            <StepConnector />
            <StepIndicator
              isActive={currentStep === BuilderStep.EXPERIENCE}
              onClick={() => goToStep(BuilderStep.EXPERIENCE)}
              label="Experience"
            />
            <StepConnector />
            <StepIndicator
              isActive={currentStep === BuilderStep.PROJECTS}
              onClick={() => goToStep(BuilderStep.PROJECTS)}
              label="Projects"
            />
            <StepConnector />
            <StepIndicator
              isActive={currentStep === BuilderStep.EDUCATION}
              onClick={() => goToStep(BuilderStep.EDUCATION)}
              label="Education"
            />
            <StepConnector />
            <StepIndicator
              isActive={currentStep === BuilderStep.CERTIFICATES}
              onClick={() => goToStep(BuilderStep.CERTIFICATES)}
              label="Certificates"
            />
          </div>

          <div className="bg-white p-6 rounded-lg shadow-sm border">
            {renderCurrentStep()}
          </div>
        </div>

        {/* Right side: Resume preview */}
        <div className="lg:w-1/2">
          <div className="bg-white p-6 rounded-lg shadow-sm border mb-4">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-lg font-semibold">Preview</h2>
              <div className="flex gap-2">
                <Button
                  size="sm"
                  variant="outline"
                  className="flex items-center gap-1"
                  onClick={handleExportPDF}
                >
                  <Download size={16} />
                  <span>PDF</span>
                </Button>
                <Button
                  size="sm"
                  variant="outline"
                  className="flex items-center gap-1"
                  onClick={handleExportDOCX}
                >
                  <FileType size={16} />
                  <span>DOCX</span>
                </Button>
                <Button
                  size="sm"
                  variant="outline"
                  className="flex items-center gap-1"
                  onClick={handlePrint}
                >
                  <File size={16} />
                  <span>Print</span>
                </Button>
              </div>
            </div>
            <div
              className="border rounded-md bg-white shadow-sm"
              ref={resumePreviewRef}
              style={{
                width: "100%",
                maxWidth: "794px", // A4 width in pixels
                margin: "0 auto",
                padding: "24px", // Add padding for better content display
                boxSizing: "border-box",
              }}
            >
              <ResumePreview />
            </div>
          </div>
        </div>
      </div>
    </Container>
  );
};

/**
 * StepIndicator Component
 * Shows a step in the resume building process
 */
const StepIndicator = ({
  isActive,
  onClick,
  label,
}: {
  isActive: boolean;
  onClick: () => void;
  label: string;
}) => (
  <button
    onClick={onClick}
    className={`flex items-center ${
      isActive ? "text-emerald-600 font-medium" : "text-gray-500"
    }`}
  >
    <span className="whitespace-nowrap">{label}</span>
  </button>
);

/**
 * StepConnector Component
 * Visual connector between steps
 */
const StepConnector = () => (
  <div className="mx-2 text-gray-300">
    <span>›</span>
  </div>
);
// Create a visual representation of skill level for DOCX
const getSkillLevelText = (level: number) => {
  const maxLevel = 5;
  const filled = "★".repeat(level);
  const empty = "☆".repeat(maxLevel - level);
  return `${filled}${empty}`;
};
