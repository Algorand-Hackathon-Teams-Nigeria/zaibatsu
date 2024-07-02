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
  className?: string;
  onSelect?: (
    asset?: AlgorandStandardAssetsQuery["algorandStandardAssets"][number],
  ) => void;
}

const AssetSelectCombobox: React.FC<Props> = ({ id, onSelect, className }) => {
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
  const btnRef = React.useRef<HTMLButtonElement>(null);

  return (
    <Popover open={open} onOpenChange={setOpen} modal>
      <PopoverTrigger asChild>
        <Button
          id={id}
          variant="outline"
          role="combobox"
          ref={btnRef}
          aria-expanded={open}
          className={cn("w-full justify-between", className)}
        >
          {selected ? (
            <div className="flex items-center gap-2">
              <Image
                src={selected.imageUrl}
                alt={selected.unitName}
                className="rounded-full"
                width={23}
                height={23}
              />
              <span>{selected.unitName.toUpperCase()}</span>
            </div>
          ) : (
            "Select asset..."
          )}
          <CaretSortIcon className="ml-2 h-4 w-4 shrink-0 opacity-50" />
        </Button>
      </PopoverTrigger>
      <PopoverContent
        style={{ width: `${btnRef.current?.clientWidth}px` }}
        id="content-popover"
        className="p-0"
      >
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
                      (i) =>
                        String(i.assetId) ===
                        (currentValue.split("-") ?? [""])[0],
                    );
                    onSelect &&
                      onSelect(
                        String(val?.assetId) === String(selected?.assetId)
                          ? undefined
                          : val,
                      );
                    setSelected(
                      String(val?.assetId) === String(selected?.assetId)
                        ? undefined
                        : val,
                    );
                    setOpen(false);
                  }}
                >
                  <Image
                    src={asset.imageUrl}
                    alt={asset.unitName}
                    className="rounded-full mr-2"
                    width={25}
                    height={25}
                  />
                  <span className="hidden">
                    {String(asset.assetId).toUpperCase()}-
                  </span>
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
