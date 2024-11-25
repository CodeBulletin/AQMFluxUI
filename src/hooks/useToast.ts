import { ToastContext } from "@/context/ToastContext";
import { ToastType } from "@/types/types";
import { useContext } from "react";

export const useToast = () => {
  const context = useContext(ToastContext);
  if (!context) {
    throw new Error("useToast must be used within a ToastProvider");
  }

  const toast = (options: ToastType) => {
    context.addToast({
      duration: 5000,
      ...options,
    });
  };

  const removeToast = (id: string) => {
    context.removeToast(id);
  };

  return { toast, removeToast };
};
