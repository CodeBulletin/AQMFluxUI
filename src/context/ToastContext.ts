import { ToastType } from "@/types/types";
import { createContext } from "react";

type ToastContextType = {
  addToast: (toast: ToastType) => void;
  removeToast: (id: string) => void;
};

export const ToastContext = createContext<ToastContextType>({
  addToast: () => {},
  removeToast: () => {},
});
