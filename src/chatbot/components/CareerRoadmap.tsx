import React, { useState, useRef, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { X, Download, FileText, File } from "lucide-react";
import ReactMarkdown from "react-markdown";
import { cn } from "@/lib/utils";
import { jsPDF } from "jspdf";
import { Download as DownloadIcon } from "lucide-react";
import "jspdf-autotable";

// Declare the types we're adding to the Window interface
declare global {
  interface Window {
    _roadmapScrollY?: number;
    _roadmapScrollX?: number;
  }
}

interface CareerRoadmapProps {
  content: string;
  title: string;
  onClose: () => void;
}

// Counter for ordered lists to handle numbering correctly
let orderListCounter = 0;

const CareerRoadmap: React.FC<CareerRoadmapProps> = ({
  content,
  title,
  onClose,
}) => {
  const [downloadType, setDownloadType] = useState<"pdf" | "text">("pdf");
  const containerRef = useRef<HTMLDivElement>(null);

  // Implement scroll lock for body without affecting modal content
  useEffect(() => {
    // Store original body overflow and position
    const originalOverflow = document.body.style.overflow;
    const originalPosition = document.body.style.position;
    const originalPaddingRight = document.body.style.paddingRight;

    // Store scroll position
    const scrollY = window.scrollY;

    // Calculate scroll bar width to prevent layout shift
    const scrollBarWidth =
      window.innerWidth - document.documentElement.clientWidth;

    // Apply scroll lock to body
    document.body.style.overflow = "hidden";
    document.body.style.paddingRight = `${scrollBarWidth}px`;

    // Return cleanup function
    return () => {
      document.body.style.overflow = originalOverflow;
      document.body.style.position = originalPosition;
      document.body.style.paddingRight = originalPaddingRight;

      // Restore scroll position
      window.scrollTo(0, scrollY);
    };
  }, []);

  const handleDownload = () => {
    const filename = title.toLowerCase().replace(/\s+/g, "-");

    if (downloadType === "pdf") {
      // Create a new document in portrait orientation
      const doc = new jsPDF({
        orientation: "portrait",
        unit: "mm",
        format: "a4",
      });

      // Set document metadata
      doc.setProperties({
        title: title,
        creator: "InterviewReady",
        subject: "Career Roadmap",
      });

      // Define page margins and content area
      const pageWidth = doc.internal.pageSize.width;
      const pageHeight = doc.internal.pageSize.height;
      const margin = {
        left: 20,
        right: 20,
        top: 20,
        bottom: 20,
      };
      const contentWidth = pageWidth - margin.left - margin.right;

      // Set default Times New Roman font for a professional look
      doc.setFont("times", "normal");

      // Function to create headers and footers on each page
      const addHeaderFooter = (pageNumber: number, totalPages: number) => {
        // Add border around page
        doc.setDrawColor(0, 0, 0);
        doc.setLineWidth(0.5);
        doc.rect(
          margin.left - 5,
          margin.top - 5,
          contentWidth + 10,
          pageHeight - margin.top - margin.bottom + 10
        );

        // Add title at top center
        doc.setFont("times", "bold");
        doc.setFontSize(14);
        doc.setTextColor(0, 0, 0);
        doc.text(title.toUpperCase(), pageWidth / 2, margin.top, {
          align: "center",
        });

        // Add horizontal line below title
        doc.setDrawColor(0, 0, 0);
        doc.setLineWidth(0.5);
        doc.line(
          margin.left,
          margin.top + 5,
          pageWidth - margin.right,
          margin.top + 5
        );

        // Add page number at bottom
        doc.setFont("times", "normal");
        doc.setFontSize(10);
        doc.text(
          `Page ${pageNumber} of ${totalPages}`,
          pageWidth / 2,
          pageHeight - margin.bottom / 2,
          { align: "center" }
        );
      };

      // Process content sections into a structured format
      let processedContent: Array<{
        title: string;
        content: Array<{ text: string; type: string }>;
        type: string;
      }> = [];
      let currentSection = {
        title: "",
        content: [] as Array<{ text: string; type: string }>,
        type: "text",
      };

      // Clean the markdown content
      const cleanedContent = content
        .replace(/#{2,}/g, "") // Remove markdown headings
        .replace(/\*\*/g, "") // Remove markdown bold
        .split("\n");

      // Helper function to add text with word wrapping
      const addWrappedText = (
        text: string,
        xPosition: number,
        options: {
          fontSize?: number;
          lineHeight?: number;
          maxWidth?: number;
          align?: string;
          fontStyle?: string;
        } = {}
      ) => {
        const fontSize = options.fontSize || 12;
        const lineHeight = options.lineHeight || 7;
        const maxWidth = options.maxWidth || contentWidth - 10;
        const align = options.align || "left";
        const fontStyle = options.fontStyle || "normal";

        // Set font style and size
        doc.setFont("times", fontStyle);
        doc.setFontSize(fontSize);

        // Split the text into lines that fit the width
        const textLines = doc.splitTextToSize(text, maxWidth);

        // Check if we need to add a new page
        if (
          yPosition + textLines.length * lineHeight >
          pageHeight - margin.bottom
        ) {
          doc.addPage();
          currentPage++;
          yPosition = margin.top + 10;
          addHeaderFooter(
            currentPage,
            Math.ceil(processedContent.length / 15) || 1
          );
        }

        // Add each line
        textLines.forEach((line: string) => {
          if (align === "center") {
            doc.text(line, pageWidth / 2, yPosition, { align: "center" });
          } else {
            doc.text(line, xPosition, yPosition);
          }
          yPosition += lineHeight;
        });

        // Return the new Y position
        return yPosition;
      };

      // Process the content
      cleanedContent.forEach((line) => {
        line = line.trim();

        // Skip empty lines
        if (line === "") return;

        // Check for section breaks
        if (line === "---") {
          if (currentSection.content.length > 0) {
            processedContent.push(currentSection);
            currentSection = { title: "", content: [], type: "text" };
          }
          return;
        }

        // Check for main headings (ALL CAPS headings)
        if (line.toUpperCase() === line && line.length > 5) {
          if (currentSection.content.length > 0) {
            processedContent.push(currentSection);
          }
          currentSection = { title: line, content: [], type: "heading" };
          return;
        }

        // Check for secondary headings
        if (
          line.includes("INSIGHTS") ||
          line.includes("FRAMEWORK") ||
          line.includes("RECOMMENDATIONS") ||
          line.includes("RESOURCES") ||
          line.includes("ANALYSIS") ||
          line.includes("Level") ||
          line.includes("Technologies") ||
          line.includes("Learning Path")
        ) {
          if (currentSection.content.length > 0) {
            processedContent.push(currentSection);
          }
          currentSection = { title: line, content: [], type: "subheading" };
          return;
        }

        // Check for numbered lists
        if (/^\d+\.\s/.test(line)) {
          currentSection.content.push({ text: line, type: "numbered" });
          return;
        }

        // Check for bullet points
        if (
          line.startsWith("•") ||
          line.startsWith("-") ||
          line.startsWith("*")
        ) {
          currentSection.content.push({
            text: line.substring(1).trim(),
            type: "bullet",
          });
          return;
        }

        // Check for sub-bullets (indented text)
        if (line.startsWith("  ") || line.startsWith("\t")) {
          currentSection.content.push({
            text: line.trim(),
            type: "sub-bullet",
          });
          return;
        }

        // Regular text
        currentSection.content.push({ text: line, type: "text" });
      });

      // Add the last section if it has content
      if (currentSection.content.length > 0) {
        processedContent.push(currentSection);
      }

      // Add content to the PDF with autoTable for consistent formatting
      let yPosition = margin.top + 10;
      let currentPage = 1;

      // Add header to first page
      addHeaderFooter(
        currentPage,
        Math.ceil(processedContent.length / 15) || 1
      );

      // Add each content section
      processedContent.forEach((section) => {
        // Add spacing between sections
        yPosition += 5;

        // Check if we need a new page
        if (yPosition > pageHeight - margin.bottom - 40) {
          doc.addPage();
          currentPage++;
          yPosition = margin.top + 10;
          addHeaderFooter(
            currentPage,
            Math.ceil(processedContent.length / 15) || 1
          );
        }

        // Add section heading
        if (section.type === "heading") {
          // Main section header - centered and underlined
          doc.setFont("times", "bold");
          doc.setFontSize(14);
          doc.text(section.title, pageWidth / 2, yPosition, {
            align: "center",
          });

          // Add underline
          doc.setDrawColor(0, 0, 0);
          doc.setLineWidth(0.2);
          doc.line(
            margin.left,
            yPosition + 3,
            pageWidth - margin.right,
            yPosition + 3
          );

          yPosition += 10; // Space after heading
        } else if (section.type === "subheading") {
          // Subheading - left aligned, bold
          doc.setFont("times", "bold");
          doc.setFontSize(13);
          doc.text(section.title, margin.left, yPosition);
          yPosition += 8; // Space after subheading
        }

        // Add section content
        section.content.forEach((item) => {
          // Check if we need a new page
          if (yPosition > pageHeight - margin.bottom - 20) {
            doc.addPage();
            currentPage++;
            yPosition = margin.top + 10;
            addHeaderFooter(
              currentPage,
              Math.ceil(processedContent.length / 15) || 1
            );
          }

          if (item.type === "numbered") {
            // Extract number and text
            const match = item.text.match(/^(\d+)\.(.*)$/);
            if (match) {
              const number = match[1];
              const text = match[2].trim();

              // Add number
              doc.setFont("times", "normal");
              doc.setFontSize(12);
              doc.text(number + ".", margin.left + 5, yPosition);

              // Add text with wrapping
              yPosition = addWrappedText(text, margin.left + 15, {
                maxWidth: contentWidth - 20,
                lineHeight: 6,
              });
            } else {
              yPosition = addWrappedText(item.text, margin.left);
            }

            yPosition += 3; // Space after list item
          } else if (item.type === "bullet") {
            // Add bullet point
            doc.setFillColor(0, 0, 0);
            doc.circle(margin.left + 5, yPosition - 2, 1.2, "F");

            // Add text with wrapping
            yPosition = addWrappedText(item.text, margin.left + 15, {
              maxWidth: contentWidth - 20,
              lineHeight: 6,
            });

            yPosition += 3; // Space after bullet point
          } else if (item.type === "sub-bullet") {
            // Add sub-bullet dash
            doc.setDrawColor(0, 0, 0);
            doc.line(
              margin.left + 15,
              yPosition - 2,
              margin.left + 18,
              yPosition - 2
            );

            // Add text with wrapping
            yPosition = addWrappedText(item.text, margin.left + 22, {
              maxWidth: contentWidth - 27,
              lineHeight: 6,
            });

            yPosition += 3; // Space after sub-bullet
          } else {
            // Regular text
            yPosition = addWrappedText(item.text, margin.left, {
              maxWidth: contentWidth,
              lineHeight: 6,
            });

            yPosition += 3; // Space after paragraph
          }
        });
      });

      doc.save(`${filename}.pdf`);
    } else {
      const blob = new Blob([content], { type: "text/plain" });
      const url = URL.createObjectURL(blob);
      const a = document.createElement("a");
      a.href = url;
      a.download = `${filename}.md`;
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
      URL.revokeObjectURL(url);
    }
  };

  // Always render the modal
  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm"
      onClick={(e) => {
        // Close when clicking outside the modal
        if (e.target === e.currentTarget) {
          onClose();
        }
      }}
    >
      <div
        ref={containerRef}
        className="bg-white rounded-lg shadow-xl w-full max-w-3xl max-h-[85vh] flex flex-col"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex items-center justify-between border-b p-4 bg-gradient-to-r from-purple-600 to-purple-700 text-white rounded-t-lg">
          <h2 className="text-lg font-bold">{title}</h2>
          <Button
            variant="ghost"
            size="icon"
            onClick={onClose}
            className="h-8 w-8 text-white hover:bg-purple-700/50"
          >
            <X className="h-4 w-4" />
          </Button>
        </div>
        <div
          className="overflow-y-auto p-4 font-['Times_New_Roman'] roadmap-content-container"
          style={{ position: "relative" }}
        >
          <div
            className="p-6 border-2 border-purple-200 rounded-lg shadow-md bg-white relative"
            style={{ position: "static" }}
          >
            <div className="absolute top-0 left-0 right-0 h-2 bg-gradient-to-r from-purple-400 to-purple-600 rounded-t-lg"></div>
            <div className="mb-4 pb-3 border-b border-purple-100">
              <h2 className="text-2xl font-bold text-purple-800 text-center">
                {title}
              </h2>
            </div>
            <div
              className={cn(
                "prose prose-sm max-w-none",
                "prose-headings:text-purple-700 prose-h1:text-xl prose-h2:text-lg prose-h3:text-base",
                "prose-headings:font-bold prose-headings:mt-8 prose-headings:mb-4",
                "prose-h1:pb-3 prose-h1:border-b prose-h1:border-purple-200",
                "prose-h2:pb-2 prose-h2:border-b prose-h2:border-purple-100",
                "prose-strong:font-bold prose-strong:text-purple-800",
                "prose-p:my-5 prose-a:text-blue-600 prose-a:hover:underline",
                "[&>*:first-child]:mt-0",
                "text-[16px] leading-relaxed tracking-wide"
              )}
            >
              <ReactMarkdown
                key={`roadmap-content-${Date.now()}`}
                skipHtml={true}
                unwrapDisallowed={true}
                remarkPlugins={[() => (tree) => tree]}
                components={{
                  h1: ({ node, ...props }) => (
                    <div className="bg-purple-50 py-2 px-4 rounded-md my-6 border-l-4 border-purple-500 shadow-sm">
                      <h1
                        {...props}
                        className="text-xl font-bold text-purple-800"
                      />
                    </div>
                  ),
                  h2: ({ node, ...props }) => (
                    <div className="bg-purple-50 rounded-md px-4 py-2 mb-6 mt-8 border-l-4 border-purple-300 shadow-sm">
                      <h2
                        {...props}
                        className="text-lg font-bold text-purple-700"
                      />
                    </div>
                  ),
                  h3: ({ node, ...props }) => (
                    <h3
                      {...props}
                      className="text-md font-bold text-purple-600 py-2 pt-5 mb-4 border-l-2 border-purple-200 pl-3 bg-purple-50/50 rounded-sm"
                    />
                  ),
                  li: ({ node, children, ...props }: any) => {
                    // Apply different styling based on whether it's ordered (numbered) or unordered (bullet) list
                    if (props.className?.includes("task-list-item")) {
                      // This is for checkboxes
                      return (
                        <li {...props} className="mb-6 mt-2 pb-3 block w-full">
                          {children}
                        </li>
                      );
                    }

                    // Check if this is a direct child of an ordered list by checking parent node
                    // We can detect this from context passed into ReactMarkdown
                    const isInOrderedList =
                      node?.parent?.type === "element" &&
                      node?.parent?.tagName === "ol";

                    // Detect if this is a phase header (contains "Phase" in the text)
                    const isPhaseHeader =
                      typeof children === "string"
                        ? children.includes("Phase")
                        : Array.isArray(children) &&
                          children.some(
                            (child) =>
                              typeof child === "string" &&
                              child.includes("Phase")
                          );

                    // For numbered lists, add custom styling with circle
                    if (isInOrderedList) {
                      // Increment counter for each list item (ensures sequential numbers)
                      orderListCounter++;

                      return (
                        <li
                          {...props}
                          className="mb-8 mt-4 pb-4 block w-full hover:bg-purple-50/50 transition-all duration-200 rounded-md pl-2"
                        >
                          <div className="flex items-start">
                            <div className="min-w-[28px] mr-3">
                              <div className="w-7 h-7 bg-purple-100 rounded-full flex items-center justify-center">
                                <span className="text-purple-800 font-bold text-sm">
                                  {orderListCounter}
                                </span>
                              </div>
                            </div>
                            <div className="flex-1">{children}</div>
                          </div>
                        </li>
                      );
                    }

                    // For bullet lists
                    return (
                      <li
                        {...props}
                        className={`mb-6 mt-3 pb-3 block w-full hover:bg-purple-50/50 transition-all duration-200 rounded-md pl-2 relative ${
                          isPhaseHeader ? "phase-header" : ""
                        }`}
                      >
                        <div className="flex items-start">
                          <div className="min-w-[10px] h-3 mt-6 mr-3">
                            <div className="w-3 h-3 bg-purple-500 rounded-full"></div>
                          </div>
                          <div>{children}</div>
                        </div>
                      </li>
                    );
                  },
                  ul: ({ node, children, ...props }) => (
                    <ul
                      {...props}
                      className="my-5 space-y-3 flex flex-col list-none"
                    >
                      {children}
                    </ul>
                  ),
                  ol: ({ node, children, ...props }) => {
                    // Reset counter for every new ordered list
                    orderListCounter = 0;

                    return (
                      <ol
                        {...props}
                        className="my-6 space-y-6 flex flex-col list-none"
                        style={{ counterReset: "step-counter" }}
                        data-is-ordered-list="true"
                      >
                        {children}
                      </ol>
                    );
                  },
                  p: ({ node, ...props }) => (
                    <p {...props} className="my-4 leading-relaxed" />
                  ),
                  hr: ({ node, ...props }) => (
                    <hr
                      {...props}
                      className="my-10 border-t-2 border-purple-100 rounded-full"
                    />
                  ),
                  strong: ({ node, ...props }) => (
                    <strong {...props} className="font-bold text-purple-800" />
                  ),
                }}
              >
                {content}
              </ReactMarkdown>
            </div>
          </div>
        </div>
        <div className="flex justify-between p-4 border-t">
          <div className="flex items-center space-x-2">
            <span className="text-sm text-muted-foreground">Download as:</span>
            <Button
              variant="outline"
              size="sm"
              className={`px-3 ${
                downloadType === "pdf"
                  ? "bg-purple-50 border-purple-200 text-purple-700"
                  : ""
              }`}
              onClick={() => setDownloadType("pdf")}
            >
              <File className="h-4 w-4 mr-1" />
              PDF
            </Button>
            <Button
              variant="outline"
              size="sm"
              className={`px-3 ${
                downloadType === "text"
                  ? "bg-purple-50 border-purple-200 text-purple-700"
                  : ""
              }`}
              onClick={() => setDownloadType("text")}
            >
              <FileText className="h-4 w-4 mr-1" />
              Text
            </Button>
          </div>
          <div className="flex gap-2">
            <Button
              variant="outline"
              onClick={onClose}
              className="border-gray-200"
            >
              Close
            </Button>
            <Button
              className="bg-purple-600 hover:bg-purple-700 text-white gap-2"
              onClick={handleDownload}
            >
              <Download className="h-4 w-4" />
              Download
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CareerRoadmap;
