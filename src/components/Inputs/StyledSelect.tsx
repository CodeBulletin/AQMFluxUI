import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { cn } from "@/lib/utils";
import { Label } from "../ui/label";

export interface Option {
  value: string;
  label: string;
  disabled?: boolean;
}

export interface StyledSelectProps {
  options: Option[];
  placeholder?: string;
  value?: string;
  onValueChange?: (value: string) => void;
  className?: string;
  disabled?: boolean;
  error?: boolean;
  required?: boolean;
  name?: string;
  label?: string;
  labelFontSize?: string;
}

const StyledSelect = ({
  options,
  placeholder = "Select an option",
  value,
  onValueChange,
  className,
  disabled = false,
  error = false,
  required = false,
  name,
  label,
  labelFontSize = "text-lg",
}: StyledSelectProps) => {
  return (
    <Select
      value={value}
      onValueChange={onValueChange}
      disabled={disabled}
      required={required}
      name={name}
    >
      <div className="flex flex-row gap-2 items-center">
        {label && (
          <Label
            htmlFor="input-field"
            className="text-zinc-300"
            style={{
              fontSize: labelFontSize,
            }}
          >
            {label}
          </Label>
        )}
        <SelectTrigger
          className={cn(
            "w-full bg-zinc-950 border-zinc-800 text-zinc-100 ring-offset-zinc-950",
            "focus:ring-zinc-800 hover:bg-zinc-900 [&>span]:text-zinc-400",
            error && "border-red-500 focus:ring-red-500",
            disabled && "opacity-50 cursor-not-allowed",
            className
          )}
        >
          <SelectValue placeholder={placeholder} />
        </SelectTrigger>
        <SelectContent className="bg-zinc-950 border-zinc-800">
          {options.map((option) => (
            <SelectItem
              key={option.value}
              value={option.value}
              disabled={option.disabled}
              className={cn(
                "text-zinc-100 focus:bg-zinc-900 focus:text-zinc-100 hover:bg-zinc-900",
                option.disabled && "opacity-50 cursor-not-allowed"
              )}
            >
              {option.label}
            </SelectItem>
          ))}
        </SelectContent>
      </div>
    </Select>
  );
};

export default StyledSelect;
