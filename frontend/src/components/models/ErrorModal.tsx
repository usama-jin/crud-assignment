import ConfirmationModal from "./ConfirmationModal";

interface ErrorModalProps {
  isOpen: boolean;
  title?: string;
  message: string;
  onClose: () => void;
}

export default function ErrorModal({
  isOpen,
  title = "Something went wrong",
  message,
  onClose,
}: ErrorModalProps) {
  return (
    <ConfirmationModal
      isOpen={isOpen}
      title={title}
      message={message}
      iconBgColor="bg-danger-lt"
      icon={
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="icon icon-tabler icon-tabler-circle-x text-danger"
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
          <path d="M12 12m-9 0a9 9 0 1 0 18 0a9 9 0 1 0 -18 0" />
          <path d="M10 10l4 4m0 -4l-4 4" />
        </svg>
      }
      confirmText="Dismiss"
      onConfirm={onClose}
    />
  );
}
