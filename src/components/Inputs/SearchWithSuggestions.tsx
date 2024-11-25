import React, {
  useState,
  useRef,
  useEffect,
  forwardRef,
  Ref,
  useImperativeHandle,
} from "react";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Search } from "lucide-react";
import { Skeleton } from "../ui/skeleton";

type SearchWithSuggestionsProps = {
  gap: string;
  direction: string;
  labelFontSize: string;
  setSelectedOption: (option: any) => void;
  optionSelector: (option: any) => any;
  optionRenderer: (option: any) => React.ReactNode;
  optionSuggestions: (option: any) => string;
  optionKey: (option: any) => string;
  suggestions: any[];
  label: string;
  value: string;
  isLoading: boolean;
  setValue: (value: string) => void;
};

export type SearchWithSuggestionsRef = {
  hasMatch: boolean;
};

const SearchWithSuggestions = (
  {
    gap,
    direction,
    labelFontSize,
    setSelectedOption,
    optionSelector,
    optionRenderer,
    optionSuggestions,
    optionKey,
    suggestions,
    label,
    value,
    isLoading,
    setValue,
  }: SearchWithSuggestionsProps,
  ref: Ref<SearchWithSuggestionsRef>
) => {
  const [isOpen, setIsOpen] = useState(false);
  const wrapperRef = useRef<HTMLDivElement>(null);

  const filteredSuggestions = suggestions.filter((suggestion) =>
    optionSuggestions(suggestion).toLowerCase().includes(value.toLowerCase())
  );

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        wrapperRef.current &&
        !wrapperRef.current.contains(event.target as Node)
      ) {
        setIsOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  useImperativeHandle(
    ref,
    () => ({
      hasMatch: filteredSuggestions.length > 0,
    }),
    [filteredSuggestions]
  );

  return (
    <div className={`flex items-start ${gap} ${direction}`}>
      <Label
        htmlFor="search"
        className="min-w-24 pt-3 text-zinc-300"
        style={{
          fontSize: labelFontSize,
        }}
      >
        {label}
      </Label>

      <div
        className={`flex-1`}
        style={{
          width: direction === "flex-col" ? "100%" : "auto",
        }}
        ref={wrapperRef}
      >
        <div className="relative">
          <div className="relative">
            <Input
              id="search"
              type="text"
              value={value}
              onChange={(e) => {
                setValue(e.target.value);
                setIsOpen(true);
              }}
              onFocus={() => setIsOpen(true)}
              placeholder="Type to search..."
              className="bg-zinc-950 border-zinc-800 text-zinc-200 pr-8"
            />
            <Search className="absolute right-2 top-2.5 h-4 w-4 text-zinc-400" />
          </div>

          {!isLoading && isOpen && value && filteredSuggestions.length > 0 && (
            <div className="absolute w-full mt-1 p-1 bg-zinc-950 border border-zinc-800 rounded-lg shadow-lg">
              {filteredSuggestions.map((suggestion, index) => (
                <div
                  key={optionKey(suggestion) + index}
                  onClick={() => {
                    setSelectedOption(optionSelector(suggestion));
                    setIsOpen(false);
                  }}
                  className="px-3 py-2 text-zinc-200 hover:bg-zinc-800 cursor-pointer rounded-md"
                >
                  {optionRenderer(suggestion)}
                </div>
              ))}
            </div>
          )}
          {isLoading && (
            <div className="absolute w-full mt-1 p-1 bg-zinc-950 border border-zinc-800 rounded-lg shadow-lg">
              <Skeleton className="h-10 bg-zinc-800" />
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default forwardRef(SearchWithSuggestions);
