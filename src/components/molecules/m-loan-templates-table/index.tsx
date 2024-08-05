"use client";

import React from "react";
import Link from "next/link";
import Image from "next/image";
import { useAtomValue } from "jotai";
import { useRouter } from "next/navigation";
import { Card } from "@ui/card";
import { Button } from "@ui/button";
import { Skeleton } from "@ui/skeleton";
import { ellipseAddress } from "@utils/text";
import listOptionsAtoms from "@state/atoms/listOptions";
import { useLoanTemplatesQuery } from "@graphql/generated";
import { getMultiplierForDecimalPlaces } from "@utils/math";
import { Popover, PopoverContent, PopoverTrigger } from "@ui/popover";
import { Command, CommandGroup, CommandItem, CommandList } from "@ui/command";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@ui/table";
import TdesignUndertake from "~icons/tdesign/undertake.jsx";
import MiOptionsVertical from "~icons/mi/options-vertical.jsx";
import LoanTemplatesCard from "../m-loan-templates-table-mobile";
interface Props {
  variant?: "P2P" | "Pool";
}

const LoanTemplatesTable: React.FC<Props> = ({ variant }) => {
  const router = useRouter();
  const listOpts = useAtomValue(
    variant === "Pool"
      ? listOptionsAtoms.poolLoanTemplate
      : listOptionsAtoms.p2pLoanTemplate
  );
  const [{ fetching, data }] = useLoanTemplatesQuery({
    variables: { opts: listOpts },
  });

  const templates = data?.loanTemplates ?? [];
  return (
    <div className="flex flex-col">
      <Card className="p-2 py-4 hidden lg:visible ">
        <Table borderless>
          <TableHeader>
            <TableRow>
              <TableHead className="text-center">Asset</TableHead>
              <TableHead className="text-center">Max Amount</TableHead>
              <TableHead className="hidden lg:table-cell text-center">
                Interest Rate
              </TableHead>
              <TableHead className="hidden lg:table-cell text-center">
                Collateral Percentage
              </TableHead>
              <TableHead className="hidden lg:table-cell text-center">
                Repayments Periods
              </TableHead>
              <TableHead className="hidden lg:table-cell text-center">
                Max Tenure
              </TableHead>
              <TableHead className="text-center">Creator</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {templates.length > 0 &&
              !fetching &&
              templates.map((template) => (
                <TableRow key={template.id}>
                  <TableCell className="flex items-center justify-center">
                    <div className="flex items-center gap-2">
                      <Image
                        src={template.asset.imageUrl}
                        alt={template.asset.name}
                        width={30}
                        height={30}
                      />
                      <span className="hidden xl:block">
                        {template.asset.unitName}
                      </span>
                    </div>
                  </TableCell>
                  <TableCell className="text-center">
                    {(
                      template.maxLoanAmount /
                      getMultiplierForDecimalPlaces(template.asset.decimals)
                    ).toFixed(8)}
                  </TableCell>
                  <TableCell className="hidden lg:table-cell text-center">
                    {template.interestRate}
                  </TableCell>
                  <TableCell className="hidden lg:table-cell text-center">
                    {template.collateralPercentage}
                  </TableCell>
                  <TableCell className="hidden  lg:table-cell text-center">
                    {template.repaymentPeriods}
                  </TableCell>
                  <TableCell className="hidden lg:table-cell text-center">
                    {template.maxLoanTenure}
                  </TableCell>
                  <TableCell className="text-center flex items-center justify-center gap-2">
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
              ))}
            {fetching &&
              Array.from({ length: 10 }).map((_, id) => (
                <LoanTemplateRowSkeleton key={id} />
              ))}
          </TableBody>
        </Table>
        {templates.length === 0 && !fetching && (
          <div className="flex items-center justify-center text-muted-foreground p-10 py-16">
            <p className="border p-2 rounded-md px-4 text-center opacity-60">
              There are currently no Loan offerings available
            </p>
          </div>
        )}
      </Card>

      <LoanTemplatesCard fetching={fetching} templates={templates} />
    </div>
  );
};

export default LoanTemplatesTable;

const LoanTemplateRowSkeleton = () => {
  return (
    <TableRow>
      <TableCell>
        <div className="flex items-center justify-center gap-3">
          <Skeleton className="w-8 h-8 rounded-full" />
          <Skeleton className="h-6 w-screen max-w-[60px] hidden xl:block" />
        </div>
      </TableCell>
      <TableCell className="flex flex-col items-center">
        <Skeleton className="h-6 max-w-14 w-screen mx-auto" />
      </TableCell>
      <TableCell className="text-center">
        <Skeleton className="h-6 max-w-14 w-screen mx-auto" />
      </TableCell>
      <TableCell className="hidden lg:table-cell text-center">
        <Skeleton className="h-6 max-w-14 w-screen mx-auto" />
      </TableCell>
      <TableCell className="hidden lg:table-cell text-center">
        <Skeleton className="h-6 max-w-14 w-screen mx-auto" />
      </TableCell>
      <TableCell className="hidden lg:table-cell text-center">
        <Skeleton className="h-6 max-w-14 w-screen mx-auto" />
      </TableCell>
      <TableCell className="hidden lg:table-cell">
        <div className="flex items-center gap-3 justify-center">
          <Skeleton className="h-7 w-full  max-w-[150px]" />
          <Skeleton className="h-8 w-8" />
        </div>
      </TableCell>
    </TableRow>
  );
};
