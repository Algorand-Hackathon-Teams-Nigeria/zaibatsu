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
import { ellipseAddress } from "@/lib/utils/text";
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
import React from "react";

interface Props {
  variant?: "P2P" | "Pool";
}

const LoanTemplatesTable: React.FC<Props> = ({ variant }) => {
  const router = useRouter();
  const listOpts = useAtomValue(
    variant === "Pool"
      ? listOptionsAtoms.poolLoanTemplate
      : listOptionsAtoms.p2pLoanTemplate,
  );
  const [{ fetching, data }] = useLoanTemplatesQuery({
    variables: { opts: listOpts },
  });

  const templates = data?.loanTemplates ?? [];

  return (
    <Card className="p-2 py-4">
      <Table borderless>
        <TableHeader>
          <TableRow>
            {[
              "Asset",
              "Max Amount",
              "Interest Rate",
              "Collateral Percentage",
              "Repayment Periods",
              "Max Tenure",
              "Creator",
            ].map((header, index) => (
              <TableHead
                key={index}
                className="text-center hidden xl:table-cell"
              >
                {header}
              </TableHead>
            ))}
          </TableRow>
        </TableHeader>
        <TableBody>
          {templates.length > 0 && !fetching
            ? templates.map((template) => (
                <TableRow key={template.id}>
                  <TableCell className="flex items-center justify-center">
                    <div className="flex items-center gap-2">
                      <Image
                        src={template.asset.imageUrl}
                        alt={template.asset.name}
                        width={30}
                        height={30}
                      />
                      <span>{template.asset.unitName}</span>
                    </div>
                  </TableCell>
                  <TableCell className="text-center">
                    {(template.maxLoanAmount / template.asset.decimals).toFixed(
                      2
                    )}
                  </TableCell>
                  <TableCell className="hidden xl:table-cell text-center">
                    {template.interestRate}
                  </TableCell>
                  <TableCell className="hidden xl:table-cell text-center">
                    {template.collateralPercentage}
                  </TableCell>
                  <TableCell className="hidden xl:table-cell text-center">
                    {template.repaymentPeriods}
                  </TableCell>
                  <TableCell className="hidden xl:table-cell text-center">
                    {template.maxLoanTenure}
                  </TableCell>
                  <TableCell className="text-center flex items-center justify-center gap-4">
                    <Link
                      href={
                        template.creator
                          ? `/profiles/${template.creator.address}`
                          : `/pools/${template.pool?.id}`
                      }
                    >
                      {template.creator?.address
                        ? ellipseAddress(template.creator.address)
                        : template.pool?.name}
                    </Link>
                    <Popover>
                      <PopoverTrigger>
                        <Button variant="outline" size="icon">
                          <MiOptionsVertical />
                        </Button>
                      </PopoverTrigger>
                      <PopoverContent className="p-0">
                        <Command>
                          <CommandList>
                            <CommandGroup>
                              <CommandItem
                                onSelect={() =>
                                  router.push(`/p2p/offers/${template.id}`)
                                }
                                className="flex items-center gap-2"
                              >
                                <TdesignUndertake />
                                <span>Collect</span>
                              </CommandItem>
                            </CommandGroup>
                          </CommandList>
                        </Command>
                      </PopoverContent>
                    </Popover>
                  </TableCell>
                </TableRow>
              ))
            : fetching &&
              Array.from({ length: 10 }).map((_, id) => (
                <LoanTemplateRowSkeleton key={id} />
              ))}
        </TableBody>
      </Table>
      {!templates.length && !fetching && (
        <div className="flex items-center justify-center text-muted-foreground p-10 py-16">
          <p className="border p-2 rounded-md px-4 opacity-60">
            There are currently no Loan offerings available
          </p>
        </div>
      )}
    </Card>
  );
};

const LoanTemplateRowSkeleton = () => (
  <TableRow>
    {Array.from({ length: 7 }).map((_, index) => (
      <TableCell key={index} className="text-center">
        <Skeleton className="h-6 w-full max-w-[100px]" />
      </TableCell>
    ))}
  </TableRow>
);

export default LoanTemplatesTable;
