/**
 * Summary Component
 * Manages professional summary for the resume
 */

import { useResumeContext } from "../context/ResumeContext";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";

interface SummaryProps {
  onPrevious: () => void;
  onNext: () => void;
}

export const Summary = ({ onPrevious, onNext }: SummaryProps) => {
  const { resumeData, updateSummary } = useResumeContext();

  // Handle summary text changes
  const handleChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    updateSummary(e.target.value);
  };

  return (
    <div>
      <h2 className="text-xl font-semibold mb-4">Professional Summary</h2>
      <p className="text-gray-500 mb-6">
        Add a concise overview of your professional background, skills, and
        career achievements.
      </p>

      <div className="mb-6">
        <Label htmlFor="summary">Summary</Label>
        <Textarea
          id="summary"
          value={resumeData.summary}
          onChange={handleChange}
          className="mt-1"
          rows={8}
          placeholder="Write a professional summary that highlights your strengths and experience..."
        />
        <p className="text-sm text-gray-500 mt-2">
          Aim for 3-5 sentences that give employers a clear idea of your value
          proposition.
        </p>
      </div>

      {/* Navigation buttons */}
      <div className="flex justify-between">
        <Button type="button" onClick={onPrevious} variant="outline">
          Previous
        </Button>
        <Button
          type="button"
          onClick={onNext}
          className="bg-emerald-500 hover:bg-emerald-600 text-white"
        >
          Next
        </Button>
      </div>
    </div>
  );
};
