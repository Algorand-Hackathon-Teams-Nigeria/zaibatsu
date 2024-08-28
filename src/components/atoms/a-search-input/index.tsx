import { Input } from "@/components/ui/input";
import { Search } from "lucide-react";
import React from "react";

interface Props extends React.InputHTMLAttributes<HTMLInputElement> {}
const SearchInput: React.FC<Props> = (props) => {
  return (
    <div className="relative ml-auto flex items-center flex-1 md:grow-0   ">
      <Search className="absolute left-3.5 h-4 w-4 text-muted-foreground" />
      <Input
        {...props}
        type="search"
        className="w-full py-[22px] rounded-lg bg-card pl-11 md:w-[200px] lg:w-[25.875rem]"
      />
    </div>
  );
};

export default SearchInput;
