import { ToastType } from "@/types/types";
import { createPortal } from "react-dom";
import { Toast } from "./Toast";

export type ToastContainerProps = {
  toasts: ToastType[];
};

export const ToastContainer = ({ toasts }: ToastContainerProps) => {
  if (typeof document === "undefined") return null;

  return createPortal(
    <div className="fixed bottom-4 right-4 z-50 flex flex-col gap-2">
      {toasts.map((toast) => (
        <Toast key={toast.id} {...toast} />
      ))}
    </div>,
    document.body
  );
};
