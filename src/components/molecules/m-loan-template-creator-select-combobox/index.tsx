"use client";

import * as React from "react";
import { CaretSortIcon, CheckIcon } from "@radix-ui/react-icons";

import { cn } from "@/lib/utils/ui";
import { Button } from "@/components/ui/button";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import {
  LoanCreatorsQuery,
  useLoanCreatorsQuery,
} from "@/services/graphql/generated";
import { ellipseAddress } from "@/lib/utils/text";
import InView from "@/components/atoms/a-in-view";

const LIMIT = 40;

interface Props {
  id?: string;
  onSelect?: (
    asset?: LoanCreatorsQuery["loanTemplateCreators"][number],
  ) => void;
}

const LoanTemplateCreatorCombobox: React.FC<Props> = ({ id, onSelect }) => {
  const [open, setOpen] = React.useState(false);
  const [hasMore, setHasMore] = React.useState(false);
  const [offset, setOffset] = React.useState(0);
  const [searchString, setSearchString] = React.useState<string>();
  const [value, setValue] = React.useState<string | null>(null);
  const [creators, setCreators] = React.useState<
    LoanCreatorsQuery["loanTemplateCreators"]
  >([]);
  const [{ data }] = useLoanCreatorsQuery({
    variables: {
      address: searchString,
      limit: LIMIT,
      offset,
    },
  });

  React.useEffect(() => {
    setCreators([]);
  }, [searchString]);

  React.useEffect(() => {
    if (data?.loanTemplateCreators) {
      setCreators((c) => [...c, ...data.loanTemplateCreators]);
      setHasMore(data?.loanTemplateCreators.length === LIMIT);
    }
  }, [data]);

  const fetchMore = () => {
    if (hasMore) {
      setOffset(creators.length);
    }
  };

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button
          variant="outline"
          role="combobox"
          id={id}
          aria-expanded={open}
          className="w-full justify-between"
        >
          {value ? ellipseAddress(value) : "Select creator..."}
          <CaretSortIcon className="ml-2 h-4 w-4 shrink-0 opacity-50" />
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-full p-0">
        <Command>
          <CommandInput
            onValueChange={(v) => setSearchString(v)}
            placeholder="Search address..."
            className="h-9"
          />
          <CommandList>
            <CommandEmpty>No creator found.</CommandEmpty>
            <CommandGroup>
              {creators.map(
                (creator) =>
                  creator !== null && (
                    <CommandItem
                      key={creator}
                      value={creator ?? undefined}
                      onSelect={(currentValue) => {
                        setValue(currentValue === value ? "" : currentValue);
                        onSelect &&
                          onSelect(currentValue === value ? "" : currentValue);
                        setOpen(false);
                      }}
                    >
                      {ellipseAddress(creator)}
                      <CheckIcon
                        className={cn(
                          "ml-auto h-4 w-4",
                          value === creator ? "opacity-100" : "opacity-0",
                        )}
                      />
                    </CommandItem>
                  ),
              )}
              <InView inView={fetchMore} />
            </CommandGroup>
          </CommandList>
        </Command>
      </PopoverContent>
    </Popover>
  );
};

export default LoanTemplateCreatorCombobox;
