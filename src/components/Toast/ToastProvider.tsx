import { ToastContext } from "@/context/ToastContext";
import { ToastType } from "@/types/types";
import { useState } from "react";
import { ToastContainer } from "./ToastContainer";

export type ToastProviderProps = {
  children: React.ReactNode;
};

// Toast Provider Component
export const ToastProvider = ({ children }: ToastProviderProps) => {
  const [toasts, setToasts] = useState<ToastType[]>([]);

  const addToast = (toast: ToastType) => {
    const id = Math.random().toString(36);
    setToasts((prev) => [...prev, { ...toast, id }]);
  };

  const removeToast = (id: string) => {
    setToasts((prev) => prev.filter((toast) => toast.id !== id));
  };

  return (
    <ToastContext.Provider value={{ addToast, removeToast }}>
      {children}
      <ToastContainer toasts={toasts} />
    </ToastContext.Provider>
  );
};
