import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { X } from "lucide-react";
import { cn } from "@/lib/utils";

export interface Option {
  value: string;
  label: string;
  disabled?: boolean;
}

export interface StyledMultiSelectProps {
  options: Option[];
  placeholder?: string;
  selectedValues: string[];
  onSelectionChange: (values: string[]) => void;
  className?: string;
  disabled?: boolean;
  error?: boolean;
  required?: boolean;
  name?: string;
  defaultLabel?: string;
  containerClassName?: string;
}

const StyledMultiSelect = ({
  options,
  placeholder = "Select options",
  selectedValues,
  onSelectionChange,
  className,
  disabled = false,
  error = false,
  required = false,
  defaultLabel = "Select an option",
  name,
}: StyledMultiSelectProps) => {
  // Handle new selection
  const handleSelect = (newValue: string) => {
    if (!selectedValues.includes(newValue) && newValue !== "Select an option") {
      onSelectionChange([...selectedValues, newValue]);
    }
  };

  // Handle removing a selection
  const handleRemove = (valueToRemove: string) => {
    const newValues = selectedValues.filter((value) => value !== valueToRemove);
    onSelectionChange(newValues);
  };

  // Get label for a value
  const getLabelForValue = (value: string) => {
    return options.find((option) => option.value === value)?.label || value;
  };

  return (
    <div className="space-y-4">
      {/* Selected Items Badges */}
      {selectedValues.length > 0 && (
        <div className="flex flex-wrap gap-2">
          {selectedValues.map((value) => (
            <Badge
              key={value}
              variant="secondary"
              className="bg-zinc-800 text-zinc-100 hover:bg-zinc-700 px-3 py-1"
            >
              {getLabelForValue(value)}
              <button
                className="ml-2 hover:bg-zinc-600 rounded-full p-0.5"
                onClick={() => handleRemove(value)}
                disabled={disabled}
              >
                <X className="h-3 w-3" />
              </button>
            </Badge>
          ))}
        </div>
      )}

      {/* Select Input */}
      <Select
        onValueChange={handleSelect}
        value="Select an option"
        disabled={disabled}
        required={required}
        name={name}
      >
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
          <SelectItem
            value="Select an option"
            className={cn(
              "text-zinc-100 focus:bg-zinc-900 focus:text-zinc-100 hover:bg-zinc-900 opacity-50 cursor-not-allowed"
            )}
            disabled
          >
            {defaultLabel}
          </SelectItem>
          {options.map((option) => (
            <SelectItem
              key={option.value}
              value={option.value}
              disabled={
                option.disabled || selectedValues.includes(option.value)
              }
              className={cn(
                "text-zinc-100 focus:bg-zinc-900 focus:text-zinc-100 hover:bg-zinc-900",
                (option.disabled || selectedValues.includes(option.value)) &&
                  "opacity-50 cursor-not-allowed"
              )}
            >
              {option.label}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
    </div>
  );
};

export default StyledMultiSelect;
