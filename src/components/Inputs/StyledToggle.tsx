import { useState } from "react";

export interface ToggleButtonProps {
  defaultChecked?: boolean;
  onChange?: (checked: boolean) => void;
  disabled?: boolean;
  label?: string;
}

const StyledToggle = ({
  defaultChecked = false,
  onChange,
  disabled = false,
  label,
}: ToggleButtonProps) => {
  const [isChecked, setIsChecked] = useState(defaultChecked);

  const handleToggle = () => {
    if (!disabled) {
      const newCheckedState = !isChecked;
      setIsChecked(newCheckedState);
      onChange?.(newCheckedState);
    }
  };

  // Helper function to combine classNames
  const cn = (...classes: (string | undefined | null | boolean)[]) => {
    return classes.filter(Boolean).join(" ");
  };

  return (
    <div className="flex items-center space-x-2">
      <button
        type="button"
        role="switch"
        aria-checked={isChecked}
        onClick={handleToggle}
        disabled={disabled}
        className={cn(
          "relative inline-flex h-6 w-11 outline-none flex-shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus:outline-none",
          isChecked ? "bg-blue-600" : "bg-zinc-700",
          disabled && "cursor-not-allowed opacity-50"
        )}
      >
        <span
          className={cn(
            "pointer-events-none inline-block h-5 w-5 transform rounded-full bg-white shadow ring-0 transition duration-200 ease-in-out",
            isChecked ? "translate-x-5" : "translate-x-0"
          )}
        />
      </button>
      {label && <label className="text-sm text-zinc-300">{label}</label>}
    </div>
  );
};

export default StyledToggle;
