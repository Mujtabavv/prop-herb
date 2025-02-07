import { Search } from "lucide-react";
import { Input } from "@/components/ui/input";

interface SearchBarProps {
  onSearch: (query: string) => void;
}

export function SearchBar({ onSearch }: SearchBarProps) {
  return (
    <div className="relative w-full max-w-2xl mx-auto">
      <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground" size={20} />
      <Input
        type="text"
        placeholder="Search properties..."
        className="pl-10 h-12 bg-background border-muted-foreground/20"
        onChange={(e) => onSearch(e.target.value)}
      />
    </div>
  );
}
