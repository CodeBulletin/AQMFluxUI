import { SelectHTMLAttributes } from "react";
import { ChevronDown } from "lucide-react";

export interface SearchSelectProps
  extends SelectHTMLAttributes<HTMLSelectElement> {
  options: { value: string; label: string; disabled?: boolean }[];
}

export const SearchSelect = ({
  options,
  className,
  ...props
}: SearchSelectProps) => {
  return (
    <div className="relative">
      <ChevronDown className="absolute right-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-zinc-400 pointer-events-none" />
      <select
        className={`w-full outline-none appearance-none pl-3 pr-10 py-2 bg-zinc-800 border border-zinc-700 text-zinc-100 rounded-md focus:ring-zinc-700 focus:border-zinc-700 disabled:cursor-not-allowed disabled:bg-zinc-700 disabled:text-zinc-500 ${className}`}
        {...props}
      >
        {options.map((option) => (
          <option
            key={option.value}
            value={option.value}
            disabled={option.disabled}
          >
            {option.label}
          </option>
        ))}
      </select>
    </div>
  );
};

export default SearchSelect;
