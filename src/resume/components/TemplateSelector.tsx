/**
 * TemplateSelector Component
 * Allows users to select a resume template design
 */

import { useResumeContext, ResumeTemplate } from "../context/ResumeContext";
import { Button } from "@/components/ui/button";
import { Check } from "lucide-react";

interface TemplateSelectorProps {
  onNext: () => void;
}

export const TemplateSelector = ({ onNext }: TemplateSelectorProps) => {
  const { resumeData, updateTemplate } = useResumeContext();

  // Selected template
  const selectedTemplate = resumeData.template;

  // Handle template selection
  const handleSelectTemplate = (template: ResumeTemplate) => {
    updateTemplate(template);
  };

  return (
    <div>
      <h2 className="text-xl font-semibold mb-4">Choose a template</h2>
      <p className="text-gray-500 mb-6">
        Select a design template for your resume. You can change it anytime.
      </p>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-8">
        {/* Professional Template */}
        <div
          className={`border rounded-md p-4 cursor-pointer transition-all hover:shadow-md ${
            selectedTemplate === ResumeTemplate.PROFESSIONAL
              ? "border-emerald-500 bg-emerald-50"
              : "border-gray-200"
          }`}
          onClick={() => handleSelectTemplate(ResumeTemplate.PROFESSIONAL)}
        >
          <div className="flex justify-between mb-3">
            <h3 className="font-medium">Professional</h3>
            {selectedTemplate === ResumeTemplate.PROFESSIONAL && (
              <Check className="text-emerald-500" size={20} />
            )}
          </div>
          <div className="bg-gray-100 aspect-[3/4] rounded-md overflow-hidden flex items-center justify-center text-gray-400">
            <div className="w-full h-full">
              <div className="p-2 bg-white h-full">
                <div className="border-b pb-2 mb-2 text-center">
                  <div className="h-4 bg-gray-200 mb-2 mx-auto w-1/3 rounded"></div>
                  <div className="h-3 bg-gray-200 w-1/2 mx-auto rounded"></div>
                </div>
                <div className="border-b pb-2 mb-2">
                  <div className="h-3 bg-gray-200 mb-2 rounded"></div>
                  <div className="h-3 bg-gray-200 mb-2 w-3/4 rounded"></div>
                  <div className="h-3 bg-gray-200 w-5/6 rounded"></div>
                </div>
                <div className="border-b pb-2 mb-2">
                  <div className="h-3 bg-gray-200 mb-1 w-1/4 rounded"></div>
                  <div className="h-2 bg-gray-200 mb-1 rounded"></div>
                  <div className="h-2 bg-gray-200 mb-1 w-5/6 rounded"></div>
                  <div className="h-2 bg-gray-200 w-4/5 rounded"></div>
                </div>
              </div>
            </div>
          </div>
          <p className="text-sm text-gray-500 mt-2">
            A clean, traditional layout perfect for most industries
          </p>
        </div>

        {/* Modern Template */}
        <div
          className={`border rounded-md p-4 cursor-pointer transition-all hover:shadow-md ${
            selectedTemplate === ResumeTemplate.MODERN
              ? "border-emerald-500 bg-emerald-50"
              : "border-gray-200"
          }`}
          onClick={() => handleSelectTemplate(ResumeTemplate.MODERN)}
        >
          <div className="flex justify-between mb-3">
            <h3 className="font-medium">Modern</h3>
            {selectedTemplate === ResumeTemplate.MODERN && (
              <Check className="text-emerald-500" size={20} />
            )}
          </div>
          <div className="bg-gray-100 aspect-[3/4] rounded-md overflow-hidden flex items-center justify-center text-gray-400">
            <div className="w-full h-full flex">
              <div className="w-1/3 bg-gray-200 p-2">
                <div className="flex justify-center mb-3">
                  <div className="w-12 h-12 rounded-full bg-white"></div>
                </div>
                <div className="h-2 bg-white mb-1 rounded"></div>
                <div className="h-2 bg-white mb-3 w-2/3 mx-auto rounded"></div>

                <div className="h-2 bg-white mb-1 rounded"></div>
                <div className="h-2 bg-white mb-1 w-5/6 rounded"></div>
                <div className="h-2 bg-white mb-3 rounded"></div>

                <div className="h-2 bg-white mb-1 rounded"></div>
                <div className="h-2 bg-white mb-1 w-3/4 rounded"></div>
              </div>
              <div className="w-2/3 p-2 bg-white">
                <div className="h-3 bg-gray-200 mb-2 w-1/3 rounded"></div>
                <div className="h-2 bg-gray-200 mb-1 rounded"></div>
                <div className="h-2 bg-gray-200 mb-3 w-5/6 rounded"></div>

                <div className="h-3 bg-gray-200 mb-2 w-1/3 rounded"></div>
                <div className="flex mb-1">
                  <div className="h-2 bg-gray-200 w-1/2 rounded mr-1"></div>
                  <div className="h-2 bg-gray-200 w-1/4 rounded"></div>
                </div>
                <div className="h-2 bg-gray-200 mb-1 w-5/6 rounded"></div>
                <div className="h-2 bg-gray-200 mb-4 rounded"></div>
              </div>
            </div>
          </div>
          <p className="text-sm text-gray-500 mt-2">
            A contemporary design with visual elements, ideal for creative
            fields
          </p>
        </div>
      </div>

      <div className="flex justify-end">
        <Button
          onClick={onNext}
          className="bg-emerald-500 hover:bg-emerald-600 text-white"
        >
          Next
        </Button>
      </div>
    </div>
  );
};
