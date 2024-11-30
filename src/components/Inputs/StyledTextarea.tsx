import { Label } from "@/components/ui/label";
import { Textarea } from "../ui/textarea";

export interface StyledInputProps extends React.ComponentProps<"textarea"> {
  label?: string;
  placeholder?: string;
  value: string;
  icon?: React.ElementType;
  gap: string;
  direction: string;
  isTextArea?: boolean;
  labelFontSize: string;
}

const StyledTextarea = ({
  label = "Label",
  placeholder = "Enter text...",
  icon: Icon,
  gap,
  direction,
  labelFontSize,
  ...props
}: StyledInputProps) => {
  return (
    <div className={`flex items-start ${gap} ${direction} flex-grow`}>
      <Label
        htmlFor="input-field"
        className="min-w-24  text-zinc-300"
        style={{
          fontSize: labelFontSize,
        }}
      >
        {label}
      </Label>

      <div
        className="flex-1 h-full"
        style={{
          width: direction === "flex-col" ? "100%" : "auto",
        }}
      >
        <div className="relative h-full">
          <Textarea
            id="input-field"
            placeholder={placeholder}
            className="bg-zinc-950 border-zinc-800 text-zinc-200 pr-8 h-full"
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

export default StyledTextarea;
