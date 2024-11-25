import { useContext, useEffect, useState } from "react";
import { CheckCircle, Info, Loader2, XCircle, XIcon } from "lucide-react";
import { ToastContext } from "@/context/ToastContext";
import { ToastType } from "@/types/types";
import "./style.css";

export const Toast = ({
  id,
  title,
  description,
  variant = "default",
  duration = 5000,
}: ToastType) => {
  const { removeToast } = useContext(ToastContext);
  const [isExiting, setIsExiting] = useState(false);
  const [timer, setTimer] = useState<NodeJS.Timeout>();

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsExiting(true); // Start fade-out animation
      setTimeout(() => removeToast(id as string), 300); // Wait for animation before removal
    }, duration);
    setTimer(timer);
  }, [id, duration, removeToast]);

  const variants = {
    success: {
      icon: <CheckCircle className="h-5 w-5 text-green-500" />,
      containerClass: "border-green-600 bg-green-900/80",
    },
    error: {
      icon: <XCircle className="h-5 w-5 text-red-500" />,
      containerClass: "border-red-600 bg-red-900/80",
    },
    loading: {
      icon: <Loader2 className="h-5 w-5 text-zinc-400 animate-spin" />,
      containerClass: "border-zinc-600 bg-zinc-800",
    },
    default: {
      icon: <Info className="h-5 w-5 text-blue-400" />,
      containerClass: "border-blue-600 bg-blue-800/80",
    },
  };

  const currentVariant = variants[variant] || variants.default;

  return (
    <div
      className={`w-80 rounded-lg border p-4 shadow-lg transition-transform duration-300 ease-in-out 
        ${currentVariant.containerClass} ${
        isExiting ? "animate-slideOut" : "animate-slideIn"
      }`}
      role="alert"
      aria-live="assertive"
    >
      <div className="flex items-start gap-3">
        {currentVariant.icon && (
          <div className="flex-shrink-0">{currentVariant.icon}</div>
        )}
        <div className="flex-1">
          {title && <div className="text-sm font-bold text-white">{title}</div>}
          {description && (
            <div className="mt-1 text-sm text-zinc-300">{description}</div>
          )}
        </div>
        <button
          onClick={() => {
            setIsExiting(true);
            setTimeout(() => removeToast(id as string), 300);
            timer && clearTimeout(timer);
          }}
          className="flex-shrink-0 rounded-full p-1 hover:bg-zinc-700 transition-colors focus:outline-none focus:ring-2 focus:ring-zinc-500"
          aria-label="Close"
        >
          <XIcon className="h-5 w-5 text-zinc-500" />
        </button>
      </div>
    </div>
  );
};
