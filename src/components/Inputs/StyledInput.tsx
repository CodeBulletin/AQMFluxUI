import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";

export interface StyledInputProps extends React.ComponentProps<"input"> {
  label?: string;
  placeholder?: string;
  value: string;
  icon?: React.ElementType;
  gap: string;
  direction: string;
  isTextArea?: boolean;
  labelFontSize: string;
}

const StyledInput = ({
  label = "Label",
  placeholder = "Enter text...",
  icon: Icon,
  gap,
  direction,
  labelFontSize,
  ...props
}: StyledInputProps) => {
  return (
    <div
      className={`flex ${gap} ${direction} ${
        direction === "flex-col" ? "justify-center" : "items-center"
      }`}
    >
      <Label
        htmlFor="input-field"
        className="text-zinc-300"
        style={{
          fontSize: labelFontSize,
        }}
      >
        {label}
      </Label>

      <div
        className="flex-1"
        style={{
          width: direction === "flex-col" ? "100%" : "auto",
        }}
      >
        <div className="relative">
          <Input
            id="input-field"
            placeholder={placeholder}
            className={
              "bg-zinc-950 border-zinc-800 text-zinc-200 pr-8 disabled:bg-zinc-900 disabled:border-none disabled:text-zinc-300 disabled:cursor-not-allowed"
            }
            {...props}
          />
          {Icon && (
            <Icon className="absolute right-2 top-2.5 h-4 w-4 text-zinc-400" />
          )}
        </div>
      </div>
    </div>
  );
};

export default StyledInput;
