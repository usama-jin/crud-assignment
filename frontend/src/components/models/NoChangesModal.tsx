import React from "react";
import ConfirmationModal from "./ConfirmationModal";

export interface NoChangesModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function NoChangesModal({
  isOpen,
  onClose,
}: NoChangesModalProps): React.JSX.Element {
  return (
    <ConfirmationModal
      isOpen={isOpen}
      title="No Changes Detected"
      message="You haven't modified any details yet. Please edit a field before submitting."
      iconBgColor="bg-warning-lt"
      icon={
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="icon icon-tabler icon-tabler-alert-circle text-warning"
          width="32"
          height="32"
          viewBox="0 0 24 24"
          strokeWidth="2"
          stroke="currentColor"
          fill="none"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <path stroke="none" d="M0 0h24v24H0z" fill="none" />
          <path d="M3 12a9 9 0 1 0 18 0a9 9 0 0 0 -18 0" />
          <path d="M12 8v4" />
          <path d="M12 16h.01" />
        </svg>
      }
      confirmText="Got it"
      onConfirm={onClose}
    />
  );
}
