import { Label } from "@radix-ui/react-label";
import React from "react";

export interface StyledLabelProps
  extends React.HTMLAttributes<HTMLLabelElement> {
  children: React.ReactNode;
  labelFontSize?: string;
}

const StyledLabel = ({
  children,
  labelFontSize = "1.5rem",
  ...props
}: StyledLabelProps) => {
  return (
    <div className="relative">
      <Label
        htmlFor="input-field"
        className="text-zinc-300"
        style={{
          fontSize: labelFontSize,
        }}
        {...props}
      >
        {children}
      </Label>
    </div>
  );
};

export default StyledLabel;
