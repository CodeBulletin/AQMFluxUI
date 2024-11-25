import React, { useState } from "react";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Clock } from "lucide-react";

type StyledIntervalProps = {
  label?: string;
  intervalValue?: number;
  unit?: "seconds" | "minutes" | "hours" | "days";
  onChange?: (value: number) => void;
  min?: number;
  max?: number;
  labelSize?: string;
};

const StyledInterval = ({
  label = "Interval",
  intervalValue = 60,
  unit = "minutes",
  onChange = () => {},
  min = 1,
  max = 999,
  labelSize = "1.5rem",
}: StyledIntervalProps) => {
  const [intervalUnit, setIntervalUnit] = useState(unit);

  const units = [
    { value: "seconds", label: "Seconds" },
    { value: "minutes", label: "Minutes" },
    { value: "hours", label: "Hours" },
    { value: "days", label: "Days" },
  ];

  const handleValueChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newValue = e.target.value;
    if (newValue === "") {
      onChange(min);
    }

    const value = parseFloat(newValue);

    if (value < min || value > displayValue(max * 86400)) {
      return;
    }

    if (intervalUnit === "seconds") {
      onChange(Math.floor(value));
    } else if (intervalUnit === "minutes") {
      onChange(Math.floor(value * 60));
    } else if (intervalUnit === "hours") {
      onChange(Math.floor(value * 3600));
    } else if (intervalUnit === "days") {
      onChange(Math.floor(value * 86400));
    }
  };

  const handleUnitChange = (
    newUnit: "seconds" | "minutes" | "hours" | "days"
  ) => {
    setIntervalUnit((_) => newUnit);
  };

  const displayValue = (value: number) => {
    if (intervalUnit === "seconds") {
      return value;
    } else if (intervalUnit === "minutes") {
      return Math.floor((value / 60) * 10) / 10;
    } else if (intervalUnit === "hours") {
      return Math.floor((value / 3600) * 10) / 10;
    } else if (intervalUnit === "days") {
      return Math.floor((value / 86400) * 10) / 10;
    }
    return value;
  };

  return (
    <div className="flex items-start gap-8">
      <Label
        htmlFor="interval-input"
        className="min-w-24 pt-3 text-zinc-400"
        style={{
          fontSize: labelSize,
        }}
      >
        {label}
      </Label>

      <div className="flex-1">
        <div className="flex gap-3">
          <div className="relative flex-1">
            <Input
              id="interval-input"
              type="number"
              value={displayValue(intervalValue)}
              onChange={handleValueChange}
              placeholder="Enter number"
              className="bg-zinc-950 border-zinc-800 text-zinc-200 pr-8"
            />
            <Clock className="absolute right-2 top-2.5 h-4 w-4 text-zinc-400" />
          </div>

          <div className="w-40">
            <Select value={intervalUnit} onValueChange={handleUnitChange}>
              <SelectTrigger className="bg-zinc-950 border-zinc-800 text-zinc-200 ring-offset-zinc-900 focus:ring-zinc-700">
                <SelectValue />
              </SelectTrigger>
              <SelectContent className="bg-zinc-950 border-zinc-800">
                {units.map((unit) => (
                  <SelectItem
                    key={unit.value}
                    value={unit.value}
                    className="text-zinc-200 focus:bg-zinc-800 focus:text-zinc-200"
                  >
                    {unit.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        </div>

        {/* Optional helper text */}
        <p className="text-xs text-zinc-500 mt-1">
          Enter a value between {min} and {displayValue(max * 86400)}{" "}
          {intervalUnit}
        </p>
      </div>
    </div>
  );
};

export default StyledInterval;
