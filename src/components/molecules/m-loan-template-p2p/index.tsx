"use client";

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { useLoanTemplatesQuery } from "@/services/graphql/generated";
import Image from "next/image";
import { ellipseAddress } from "@/lib/utils/address";
import Link from "next/link";
import { useAtomValue } from "jotai";
import listOptionsAtoms from "@state/atoms/listOptions";
import { Card } from "@/components/ui/card";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Button } from "@/components/ui/button";
import MiOptionsVertical from "~icons/mi/options-vertical.jsx";
import {
  Command,
  CommandGroup,
  CommandItem,
  CommandList,
} from "@/components/ui/command";
import TdesignUndertake from "~icons/tdesign/undertake.jsx";
import { useRouter } from "next/navigation";
import { Skeleton } from "@/components/ui/skeleton";
import { Key } from "react";

// Helper function to capitalize each word and add spacing
const formatHeader = (header: string) => {
  return header
    .replace(/([a-z])([A-Z])/g, "$1 $2")
    .replace(/_/g, " ")
    .replace(/\b\w/g, (char: string) => char.toUpperCase());
};

// Dynamic table component
const LoanTemplatesP2PTable = ({ data }: { data: any }) => {
  const router = useRouter();

  // Determine headers dynamically
  const headers = data.length > 0 ? Object.keys(data[0]) : [];

  return (
    <Card className="p-2 py-4">
      <Table borderless>
        <TableHeader>
          <TableRow>
            {headers.map((header) => (
              <TableHead key={header} className="text-center">
                {formatHeader(header)}
              </TableHead>
            ))}
          </TableRow>
        </TableHeader>
        <TableBody>
          {data.length > 0 &&
            data.map(
              (item: { [x: string]: any }, index: Key | null | undefined) => (
                <TableRow key={index}>
                  {headers.map((header) => (
                    <TableCell key={header} className="text-center">
                      {renderCellContent(header, item[header])}
                    </TableCell>
                  ))}
                </TableRow>
              )
            )}
          {data.length === 0 && (
            <div className="flex items-center justify-center text-muted-foreground p-10 py-16">
              <p className="border p-2 rounded-md px-4 opacity-60">
                There are currently no Loan offerings available
              </p>
            </div>
          )}
        </TableBody>
      </Table>
    </Card>
  );
};

// Helper function to render cell content based on the key
const renderCellContent = (key: string, value: any) => {
  switch (key) {
    case "asset":
      return (
        <div className="flex items-center gap-2">
          <Image src={value.imageUrl} alt={value.name} width={30} height={30} />
          <span>{value.unitName}</span>
        </div>
      );
    case "offerAddress":
      return <Link href={`/offers/${value}`}>{value}</Link>;
    case "status":
      return (
        <span className={value === "closed" ? "text-red-600" : ""}>
          {value}
        </span>
      );
    default:
      return value;
  }
};

export default LoanTemplatesP2PTable;

const LoanTemplateRowSkeleton = () => {
  return (
    <TableRow>
      {Array.from({ length: 7 }).map((_, index) => (
        <TableCell key={index} className="text-center">
          <Skeleton className="h-6 w-full max-w-[100px]" />
        </TableCell>
      ))}
    </TableRow>
  );
};
