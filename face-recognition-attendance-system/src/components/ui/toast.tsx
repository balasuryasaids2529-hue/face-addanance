"use client";

import { useState, useEffect, useContext, createContext, ReactNode } from "react";
import { cn } from "@/lib/utils";
import { CheckCircle, XCircle, Info, AlertTriangle, X } from "lucide-react";

export type ToastType = "success" | "error" | "info" | "warning";

interface ToastProps {
  id: string;
  type: ToastType;
  title?: string;
  message: string;
  duration?: number;
  onDismiss: (id: string) => void;
}

const ToastIcon: Record<ToastType, ReactNode> = {
  success: <CheckCircle className="w-5 h-5 text-emerald-500" />,
  error: <XCircle className="w-5 h-5 text-red-500" />,
  info: <Info className="w-5 h-5 text-blue-500" />,
  warning: <AlertTriangle className="w-5 h-5 text-amber-500" />,
};

const ToastColors: Record<ToastType, string> = {
  success: "bg-emerald-50 border-emerald-200 text-emerald-800",
  error: "bg-red-50 border-red-200 text-red-800",
  info: "bg-blue-50 border-blue-200 text-blue-800",
  warning: "bg-amber-50 border-amber-200 text-amber-800",
};

export function Toast({ id, type, title, message, duration = 5000, onDismiss }: ToastProps) {
  const [isVisible, setIsVisible] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsVisible(false);
      setTimeout(() => onDismiss(id), 300);
    }, duration);

    return () => clearTimeout(timer);
  }, [id, duration, onDismiss]);

  if (!isVisible) return null;

  return (
    <div
      className={cn(
        "p-4 rounded-lg border-l-4 flex items-start gap-3",
        ToastColors[type],
        "animate-in slide-in-from-right-0 fade-in"
      )}
    >
      <div className="flex-shrink-0">{ToastIcon[type]}</div>
      <div className="flex-1">
        {title && <p className="font-semibold mb-0.5">{title}</p>}
        <p className="text-sm">{message}</p>
      </div>
      <button
        onClick={() => {
          setIsVisible(false);
          setTimeout(() => onDismiss(id), 300);
        }}
        className="flex-shrink-0 p-1 rounded hover:bg-black/5 transition-colors"
      >
        <X className="w-4 h-4" />
      </button>
    </div>
  );
}

// Toast Container
interface ToastContainerProps {
  toasts: ToastProps[];
  onDismiss: (id: string) => void;
  position?: "top-right" | "top-left" | "bottom-right" | "bottom-left";
}

export function ToastContainer({
  toasts,
  onDismiss,
  position = "top-right",
}: ToastContainerProps) {
  const positions = {
    "top-right": "top-4 right-4",
    "top-left": "top-4 left-4",
    "bottom-right": "bottom-4 right-4",
    "bottom-left": "bottom-4 left-4",
  };

  return (
    <div
      className={cn(
        "fixed z-50 flex flex-col gap-3",
        positions[position]
      )}
    >
      {toasts.map((toast) => (
        <Toast key={toast.id} {...toast} onDismiss={onDismiss} />
      ))}
    </div>
  );
}

// Toast Hook
interface ToastContextType {
  addToast: (type: ToastType, message: string, title?: string, duration?: number) => void;
}

const ToastContext = createContext<ToastContextType | undefined>(undefined);

export function ToastProvider({ children }: { children: ReactNode }) {
  const [toasts, setToasts] = useState<Omit<ToastProps, 'onDismiss'>[]>([]);

  const addToast = (type: ToastType, message: string, title?: string, duration?: number) => {
    const id = Date.now().toString();
    setToasts((prev) => [...prev, { id, type, title, message, duration }]);
  };

  const handleDismiss = (id: string) => {
    setToasts((prev) => prev.filter((t) => t.id !== id));
  };

  return (
    <ToastContext.Provider value={{ addToast }}>
      {children}
      <ToastContainer
        toasts={toasts.map((t) => ({ ...t, onDismiss: handleDismiss }))}
        onDismiss={handleDismiss}
      />
    </ToastContext.Provider>
  );
}

export function useToast() {
  const context = useContext(ToastContext);
  if (!context) {
    throw new Error("useToast must be used within a ToastProvider");
  }
  return context;
}
