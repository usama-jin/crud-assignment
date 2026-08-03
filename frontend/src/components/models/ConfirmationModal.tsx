import React, { useState } from "react";

interface ConfirmationModalProps {
  isOpen: boolean;
  title: string;
  message: string;
  icon?: React.ReactNode;
  iconBgColor?: string;
  confirmText?: string;
  cancelText?: string;
  confirmBgColor: String;
  onConfirm: () => void;
  onCancel?: () => void;
}
export default function ConfirmationModal({
  isOpen,
  title,
  message,
  icon,
  iconBgColor,
  confirmText = "OK",
  confirmBgColor,
  cancelText,
  onConfirm,
  onCancel,
}: ConfirmationModalProps) {
  if (!isOpen) return null;

  return (
    <div
      className="modal modal-blur fade show d-block"
      tabIndex={-1}
      role="dialog"
      style={{ backgroundColor: "rgba(0, 0, 0, 0.5)" }}
    >
      <div
        className="modal-dialog modal-dialog-centered modal-sm"
        role="document"
      >
        <div className="modal-content">
          <div className="modal-body text-center py-4">
            {icon && (
              <div
                className={`avatar avatar-lg rounded-circle mx-auto mb-3 ${iconBgColor}`}
              >
                {icon}
              </div>
            )}
            <h3>{title}</h3>
            <div className="text-secondary">{message}</div>
          </div>
          <div className="modal-footer">
            <div className="w-100">
              <div className="row">
                {cancelText && onCancel && (
                  <div className="col">
                    <button
                      type="button"
                      className="btn w-100"
                      onClick={onCancel}
                    >
                      {cancelText}
                    </button>
                  </div>
                )}
                <div className="col">
                  <button
                    type="button"
                    className={`btn btn-primary w-100 ${confirmBgColor}`}
                    onClick={onConfirm}
                  >
                    {confirmText}
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
