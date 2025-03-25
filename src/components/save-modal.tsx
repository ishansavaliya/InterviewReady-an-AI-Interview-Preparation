/**
 * Save Modal Component
 * Confirmation dialog for saving interview answers
 * Warns users about the permanent nature of saving answers
 */

import Modal from "./modal";
import { Button } from "./ui/button";

/**
 * Props for the SaveModal component
 * @property isOpen - Whether the modal is visible
 * @property onClose - Function to close the modal
 * @property onConfirm - Function to handle save confirmation
 * @property loading - Whether the save operation is in progress
 */
interface SaveModalProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: () => void;
  loading: boolean;
}

/**
 * SaveModal Component
 * Renders a confirmation dialog:
 * - Warning message about permanent action
 * - Cancel and Continue buttons
 * - Loading state handling
 */
export const SaveModal = ({
  isOpen,
  onClose,
  onConfirm,
  loading,
}: SaveModalProps) => {
  return (
    <Modal
      title="Are you sure?"
      description="This action cannot be undone you can't edit or re-answer this question again!"
      isOpen={isOpen}
      onClose={onClose}
    >
      {/* Action Buttons */}
      <div className="pt-6 space-x-2 flex items-center justify-end w-full">
        <Button disabled={loading} variant={"outline"} onClick={onClose}>
          Cancel
        </Button>
        <Button
          disabled={loading}
          className="bg-emerald-600 hover:bg-emerald-800"
          onClick={onConfirm}
        >
          Continue
        </Button>
      </div>
    </Modal>
  );
};
