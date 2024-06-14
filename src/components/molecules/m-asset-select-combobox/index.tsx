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
  AlgorandStandardAssetsQuery,
  useAlgorandStandardAssetsQuery,
} from "@/services/graphql/generated";
import Image from "next/image";

interface Props {
  id?: string;
  onSelect?: (
    asset?: AlgorandStandardAssetsQuery["algorandStandardAssets"][number],
  ) => void;
}

const AssetSelectCombobox: React.FC<Props> = ({ id, onSelect }) => {
  const [searchString, setSearchString] = React.useState<string>();
  const [open, setOpen] = React.useState(false);
  const [selected, setSelected] =
    React.useState<
      AlgorandStandardAssetsQuery["algorandStandardAssets"][number]
    >();
  const [{ data }] = useAlgorandStandardAssetsQuery({
    variables: {
      opts: {
        filter: {
          name: searchString,
        },
      },
    },
  });

  const assets = data?.algorandStandardAssets ?? [];

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button
          id={id}
          variant="outline"
          role="combobox"
          aria-expanded={open}
          className="w-full justify-between"
        >
          {selected ? (
            <div>
              <Image
                src={selected.imageUrl}
                alt={selected.unitName}
                className="rounded-full"
                width={30}
                height={30}
              />
              <span>{selected.unitName.toUpperCase()}</span>
            </div>
          ) : (
            "Select asset..."
          )}
          <CaretSortIcon className="ml-2 h-4 w-4 shrink-0 opacity-50" />
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-full p-0">
        <Command>
          <CommandInput
            onValueChange={(v) => setSearchString(v)}
            placeholder="Search asset..."
            className="h-9"
          />
          <CommandList>
            <CommandEmpty>No asset found.</CommandEmpty>
            <CommandGroup>
              {assets.map((asset) => (
                <CommandItem
                  key={asset.id}
                  value={asset.assetId}
                  onSelect={(currentValue) => {
                    const val = assets.find(
                      (i) => String(i.assetId) === currentValue,
                    );
                    onSelect &&
                      onSelect(
                        currentValue === String(selected?.assetId)
                          ? undefined
                          : val,
                      );
                    setSelected(
                      currentValue === String(selected?.assetId)
                        ? undefined
                        : val,
                    );
                    setOpen(false);
                  }}
                >
                  <Image
                    src={asset.imageUrl}
                    alt={asset.unitName}
                    width={30}
                    height={30}
                  />
                  <span>{asset.unitName.toUpperCase()}</span>
                  <CheckIcon
                    className={cn(
                      "ml-auto h-4 w-4",
                      selected?.assetId === asset.assetId
                        ? "opacity-100"
                        : "opacity-0",
                    )}
                  />
                </CommandItem>
              ))}
            </CommandGroup>
          </CommandList>
        </Command>
      </PopoverContent>
    </Popover>
  );
};

export default AssetSelectCombobox;
