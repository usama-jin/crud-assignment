import ConfirmationModal from "./ConfirmationModal";

interface SuccessModalProps {
  isOpen: boolean;
  title?: string;
  message: string;
  onConfirm: () => void;
}

export default function SuccessModal({
  isOpen,
  title = "Success!",
  message,
  onConfirm,
}: SuccessModalProps) {
  return (
    <ConfirmationModal
      isOpen={isOpen}
      title={title}
      message={message}
      iconBgColor="bg-success-lt"
      icon={
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="icon icon-tabler icon-tabler-circle-check text-success"
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
          <path d="M9 12l2 2l4 -4" />
        </svg>
      }
      confirmText="Continue"
      onConfirm={onConfirm}
    />
  );
}
