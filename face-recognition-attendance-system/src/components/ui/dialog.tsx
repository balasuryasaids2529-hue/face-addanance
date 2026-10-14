"use client";

import { Fragment, ReactNode } from "react";
import { X } from "lucide-react";
import { Button } from "./button";
import { cn } from "@/lib/utils";

interface DialogProps {
  isOpen: boolean;
  onClose: () => void;
  title?: string;
  description?: string;
  children: ReactNode;
  size?: "sm" | "md" | "lg" | "xl" | "full";
  showCloseButton?: boolean;
  closeOnOverlayClick?: boolean;
}

export function Dialog({
  isOpen,
  onClose,
  title,
  description,
  children,
  size = "md",
  showCloseButton = true,
  closeOnOverlayClick = true,
}: DialogProps) {
  if (!isOpen) return null;

  const sizes = {
    sm: "max-w-sm",
    md: "max-w-md",
    lg: "max-w-lg",
    xl: "max-w-xl",
    full: "max-w-4xl",
  };

  const handleOverlayClick = (e: React.MouseEvent) => {
    if (e.target === e.currentTarget && closeOnOverlayClick) {
      onClose();
    }
  };

  return (
    <Fragment>
      {/* Backdrop */}
      <div
        className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 transition-opacity animate-in fade-in"
        onClick={handleOverlayClick}
      />

      {/* Dialog */}
      <div
        className="fixed inset-0 z-50 flex items-center justify-center p-4 overflow-y-auto"
      >
        <div
          className={cn(
            "bg-white rounded-xl shadow-xl w-full",
            sizes[size],
            "animate-in zoom-in-95 slide-in-from-bottom-0"
          )}
        >
          {/* Header */}
          {(title || showCloseButton) && (
            <div className="flex items-start justify-between p-6 pb-0">
              <div>
                {title && (
                  <h2 className="text-lg font-semibold text-slate-900">{title}</h2>
                )}
                {description && (
                  <p className="mt-1 text-sm text-slate-500">{description}</p>
                )}
              </div>
              {showCloseButton && (
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={onClose}
                  className="p-1 -mr-2 -mt-1"
                >
                  <X className="w-4 h-4" />
                </Button>
              )}
            </div>
          )}

          {/* Content */}
          <div className="p-6">{children}</div>
        </div>
      </div>
    </Fragment>
  );
}

// Simple confirm dialog
export function ConfirmDialog({
  isOpen,
  onClose,
  onConfirm,
  title = "Confirm Action",
  message = "Are you sure you want to perform this action?",
  confirmText = "Confirm",
  cancelText = "Cancel",
  confirmVariant = "danger",
  cancelVariant = "secondary",
}: {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: () => void;
  title?: string;
  message?: string;
  confirmText?: string;
  cancelText?: string;
  confirmVariant?: "primary" | "secondary" | "ghost" | "danger" | "success";
  cancelVariant?: "primary" | "secondary" | "ghost" | "danger" | "success";
}) {
  return (
    <Dialog isOpen={isOpen} onClose={onClose} title={title} size="sm">
      <p className="text-slate-600 mb-6">{message}</p>
      <div className="flex justify-end space-x-3">
        <Button variant={cancelVariant} onClick={onClose}>
          {cancelText}
        </Button>
        <Button variant={confirmVariant} onClick={onConfirm}>
          {confirmText}
        </Button>
      </div>
    </Dialog>
  );
}
