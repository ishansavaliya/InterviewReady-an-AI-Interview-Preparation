/**
 * Modal Component
 * Reusable modal dialog component using shadcn/ui Dialog
 * Provides a consistent modal interface across the application
 */

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";

/**
 * Props for the Modal component
 * @property title - Modal dialog title
 * @property description - Modal dialog description text
 * @property isOpen - Whether the modal is visible
 * @property onClose - Function to close the modal
 * @property children - Optional child content to render in the modal
 */
interface ModalProps {
  title: string;
  description: string;
  isOpen: boolean;
  onClose: () => void;
  children?: React.ReactNode;
}

/**
 * Modal Component
 * Renders a modal dialog with:
 * - Title and description
 * - Custom content area
 * - Close handling
 */
const Modal = ({
  title,
  description,
  isOpen,
  onClose,
  children,
}: ModalProps) => {
  /**
   * Handles modal open state changes
   * Calls onClose when modal is closed
   */
  const onChange = (open: boolean) => {
    if (!open) {
      onClose();
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={onChange}>
      <DialogContent>
        {/* Modal Header */}
        <DialogHeader>
          <DialogTitle>{title}</DialogTitle>
          <DialogDescription>{description}</DialogDescription>
        </DialogHeader>

        {/* Modal Content */}
        <div>{children}</div>
      </DialogContent>
    </Dialog>
  );
};

export default Modal;
