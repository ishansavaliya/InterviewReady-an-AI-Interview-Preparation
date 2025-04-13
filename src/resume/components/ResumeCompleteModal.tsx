import Modal from "@/components/modal";
import { Button } from "@/components/ui/button";
import { Download, FileType, File } from "lucide-react";

interface ResumeCompleteModalProps {
  isOpen: boolean;
  onClose: () => void;
  projectCount: number;
  certificateCount: number;
  onExportPDF: () => void;
  onExportDOCX: () => void;
  onPrint: () => void;
}

export const ResumeCompleteModal = ({
  isOpen,
  onClose,
  projectCount,
  certificateCount,
  onExportPDF,
  onExportDOCX,
  onPrint,
}: ResumeCompleteModalProps) => {
  return (
    <Modal
      title="Resume Completed!"
      description={`Congratulations! You have successfully created your resume with ${projectCount} projects and ${certificateCount} certificates.`}
      isOpen={isOpen}
      onClose={onClose}
    >
      <div className="mt-6 space-y-4">
        <p className="text-gray-600">
          Your resume data is saved in your browser. You can now download your
          resume in various formats:
        </p>

        <div className="flex flex-col sm:flex-row gap-3 justify-center mt-4">
          <Button onClick={onExportPDF} className="flex items-center gap-2 bg-emerald-500 hover:bg-emerald-600">
            <Download size={16} />
            <span>Download PDF</span>
          </Button>

          <Button
            onClick={onExportDOCX}
            variant="outline"
            className="flex items-center gap-2"
          >
            <FileType size={16} />
            <span>Download DOCX</span>
          </Button>

          <Button
            onClick={onPrint}
            variant="outline"
            className="flex items-center gap-2"
          >
            <File size={16} />
            <span>Print</span>
          </Button>
        </div>

        <div className="text-center mt-4">
          <Button onClick={onClose} variant="ghost" className="text-gray-500">
            Close
          </Button>
        </div>
      </div>
    </Modal>
  );
};
