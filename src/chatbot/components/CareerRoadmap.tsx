import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { X, Download, FileText, File } from "lucide-react";
import ReactMarkdown from "react-markdown";
import { cn } from "@/lib/utils";
import { jsPDF } from "jspdf";

interface CareerRoadmapProps {
  content: string;
  title: string;
  onClose: () => void;
}

const CareerRoadmap: React.FC<CareerRoadmapProps> = ({
  content,
  title,
  onClose,
}) => {
  const [downloadType, setDownloadType] = useState<"pdf" | "text">("pdf");

  const handleDownload = () => {
    const filename = title.toLowerCase().replace(/\s+/g, "-");

    if (downloadType === "pdf") {
      const doc = new jsPDF();

      // Add title
      doc.setFontSize(18);
      doc.setTextColor(91, 33, 182); // Purple color
      doc.text(title, 20, 20);

      // Add content
      doc.setFontSize(12);
      doc.setTextColor(0, 0, 0);

      // Split content into lines and add with proper formatting
      const textLines = content
        .replace(/#{2,}/g, "") // Remove markdown headings
        .replace(/\*\*/g, "") // Remove markdown bold
        .split("\n");

      let y = 30;
      textLines.forEach((line) => {
        if (line.trim() === "") {
          y += 5;
          return;
        }

        if (y > 280) {
          doc.addPage();
          y = 20;
        }

        // Format headings with larger text
        if (
          line.includes("Level") ||
          line.includes("Technologies") ||
          line.includes("Learning Path")
        ) {
          doc.setFontSize(14);
          doc.setTextColor(91, 33, 182);
          doc.text(line, 20, y);
          doc.setFontSize(12);
          doc.setTextColor(0, 0, 0);
        } else if (line.trim().startsWith("•")) {
          // Format bullet points with indentation
          doc.text(line, 25, y);
        } else {
          doc.text(line, 20, y);
        }

        y += 7;
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

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm">
      <div className="bg-white rounded-lg shadow-xl w-full max-w-3xl max-h-[85vh] flex flex-col">
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
        <div className="overflow-y-auto p-6 font-['Times_New_Roman']">
          <div
            className={cn(
              "prose prose-sm max-w-none",
              "prose-headings:text-purple-700 prose-h1:text-xl prose-h2:text-lg prose-h3:text-base",
              "prose-headings:font-bold prose-headings:mt-8 prose-headings:mb-4",
              "prose-h1:pb-3 prose-h1:border-b prose-h1:border-purple-200",
              "prose-h2:pb-2 prose-h2:border-b prose-h2:border-purple-100",
              "prose-ul:pl-6 prose-ol:pl-6",
              "prose-li:mb-6 prose-li:pb-3",
              "prose-li:marker:text-purple-500",
              "prose-strong:font-bold prose-strong:text-purple-800",
              "prose-p:my-5 prose-a:text-blue-600 prose-a:hover:underline",
              "[&>*:first-child]:mt-0",
              "prose-li:mt-3",
              "[&>ul>li]:mb-6 [&>ol>li]:mb-6",
              "[&>ul]:space-y-5 [&>ol]:space-y-5",
              "[&>h2:last-of-type+ul>li]:mb-8 [&>h2:last-of-type+ul]:space-y-8",
              "prose-li:block",
              "text-[16px] leading-relaxed tracking-wide"
            )}
          >
            <ReactMarkdown
              components={{
                h1: ({ node, ...props }) => (
                  <h1
                    {...props}
                    className="text-xl font-bold text-purple-800 pb-3 pt-6 border-b border-purple-200 mb-5"
                  />
                ),
                h2: ({ node, ...props }) => (
                  <h2
                    {...props}
                    className="text-lg font-bold text-purple-700 pb-2 pt-6 border-b border-purple-100 mb-5"
                  />
                ),
                h3: ({ node, ...props }) => (
                  <h3
                    {...props}
                    className="text-md font-bold text-purple-600 pb-1 pt-5 mb-4"
                  />
                ),
                li: ({ node, children, ...props }) => (
                  <li {...props} className="mb-8 mt-4 pb-3 block w-full">
                    {children}
                  </li>
                ),
                ul: ({ node, children, ...props }) => (
                  <ul {...props} className="my-6 space-y-8 pl-6 flex flex-col">
                    {children}
                  </ul>
                ),
                ol: ({ node, children, ...props }) => (
                  <ol {...props} className="my-6 space-y-8 pl-6 flex flex-col">
                    {children}
                  </ol>
                ),
                p: ({ node, ...props }) => <p {...props} className="my-5" />,
              }}
            >
              {content}
            </ReactMarkdown>
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
