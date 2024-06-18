import { Input } from "@/components/ui/input";
import { Search } from "lucide-react";
import React from "react";

interface Props extends React.InputHTMLAttributes<HTMLInputElement> { }
const SearchInput: React.FC<Props> = (props) => {
  return (
    <div className="relative ml-auto flex-1 md:grow-0">
      <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
      <Input
        {...props}
        type="search"
        className="w-full rounded-lg bg-background pl-8 md:w-[200px] lg:w-[320px]"
      />
    </div>
  );
};

export default SearchInput;
