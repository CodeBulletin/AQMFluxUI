import React from "react";
import { cn } from "@/lib/utils";
import { Loader2 } from "lucide-react";

interface StyledButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  children: React.ReactNode;
  variant?: "filled" | "inverted" | "text" | "invertedText";
  size?: "sm" | "default" | "lg";
  isLoading?: boolean;
  loadingText?: string;
  disabled?: boolean;
  icon?: React.ElementType;
  className?: string;
}

const StyledButton = ({
  children,
  variant = "filled", // 'filled' or 'text'
  size = "default", // 'sm', 'default', 'lg'
  isLoading = false,
  loadingText = "Loading...",
  disabled = false,
  icon: Icon,
  className,
  ...props
}: StyledButtonProps) => {
  const baseStyles =
    "inline-flex items-center justify-center rounded-md font-medium transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-zinc-700 disabled:pointer-events-none disabled:opacity-50";

  const variants = {
    filled: "bg-zinc-800 text-zinc-200 hover:bg-zinc-700 active:bg-zinc-600",
    inverted: "bg-zinc-200 text-zinc-800 hover:bg-zinc-300 active:bg-zinc-400",
    text: "text-zinc-200 hover:bg-zinc-800/50 active:bg-zinc-800",
    invertedText: "text-zinc-200 hover:bg-zinc-700/50 active:bg-zinc-500",
  };

  const sizes = {
    sm: "h-8 px-3 text-sm",
    default: "h-10 px-4",
    lg: "h-12 px-6 text-lg",
  };

  return (
    <button
      className={cn(baseStyles, variants[variant], sizes[size], className)}
      disabled={disabled || isLoading}
      {...props}
    >
      {isLoading ? (
        <>
          <Loader2 className="mr-2 h-4 w-4 animate-spin" />
          {loadingText}
        </>
      ) : (
        <>
          {Icon && <Icon className="mr-2 h-4 w-4" />}
          {children}
        </>
      )}
    </button>
  );
};

export default StyledButton;
