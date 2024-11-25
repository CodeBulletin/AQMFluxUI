import { Input } from "../ui/input";
import { Search } from "lucide-react";

export interface SearchInputProps {
  value: string;
  setValue: (value: string) => void;
}

export const SearchInput = ({ value, setValue }: SearchInputProps) => {
  return (
    <div className="relative">
      <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-zinc-400" />
      <Input
        type="search"
        placeholder="Search..."
        className="w-full pl-10 bg-zinc-800 border-zinc-700 text-zinc-100 placeholder:text-zinc-400 focus:ring-zinc-700 focus:border-zinc-700"
        value={value}
        onChange={(e) => setValue(e.target.value)}
      />
    </div>
  );
};

export default Search;
