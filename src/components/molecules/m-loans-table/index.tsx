"use client";

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { useLoansQuery } from "@/services/graphql/generated";
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
import TablerRubberStamp from "~icons/tabler/rubber-stamp.jsx";
import UiwPay from "~icons/uiw/pay.jsx";
import { useRouter } from "next/navigation";
import { Skeleton } from "@/components/ui/skeleton";
import React from "react";
import { getMultiplierForDecimalPlaces } from "@/lib/utils/math";
import { useWallet } from "@txnlab/use-wallet";

interface Props {
  variant: "marketplace" | "sold" | "collected";
}

const LoanTable: React.FC<Props> = ({ variant }) => {
  const router = useRouter();
  const { activeAddress } = useWallet();
  const listOpts = useAtomValue(listOptionsAtoms.loans);
  const opts = React.useMemo(() => {
    let opts = { ...listOpts };
    if (variant === "marketplace") {
      opts = {
        ...opts,
        filter: { ...opts.filter, collateralPaid: true, principalPaid: true },
      };
    } else if (variant === "collected") {
      opts = {
        ...opts,
        filter: { ...opts.filter, borrowerAddress: activeAddress },
      };
    } else {
      opts = {
        ...opts,
        filter: { ...opts.filter, lenderAddress: activeAddress },
      };
    }
    return opts;
  }, [listOpts]);
  const [{ fetching, data }] = useLoansQuery({
    variables: { opts },
  });

  const loans = data?.loans ?? [];
  return (
    <Card className="p-2 py-4">
      <Table borderless>
        <TableHeader>
          <TableRow>
            <TableHead className="text-center">Borrower</TableHead>
            <TableHead className="text-center">Principal Amount</TableHead>
            <TableHead className="hidden lg:table-cell text-center">
              Collateral Amount
            </TableHead>
            <TableHead className="hidden xl:table-cell text-center">
              Borrower Asset
            </TableHead>
            <TableHead className="hidden xl:table-cell text-center">
              Lender Asset
            </TableHead>
            <TableHead className="hidden xl:table-cell text-center">
              Remaining Payment Rounds
            </TableHead>
            <TableHead className="text-center">Tenure</TableHead>
            <TableHead className="text-center">Action</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {loans.length > 0 &&
            !fetching &&
            loans.map((loan) => (
              <TableRow key={loan.id}>
                <TableCell className="flex items-center justify-center">
                  {ellipseAddress(loan.borrower.address)}
                </TableCell>
                <TableCell className="text-center">
                  <div className="flex justify-center items-center gap-2">
                    <Image
                      src={loan.principalAsset.imageUrl}
                      alt={loan.principalAsset.name}
                      width={30}
                      height={30}
                    />
                    <span>
                      {(
                        Number(loan.principalAssetAmount) /
                        getMultiplierForDecimalPlaces(
                          loan.principalAsset.decimals
                        )
                      ).toFixed(4)}
                    </span>
                  </div>
                </TableCell>
                <TableCell className="hidden xl:table-cell text-center">
                  <div className="flex justify-center items-center gap-2">
                    <Image
                      src={loan.collateralAsset.imageUrl}
                      alt={loan.collateralAsset.name}
                      width={30}
                      height={30}
                    />
                    <span>
                      {(
                        Number(loan.collateralAssetAmount) /
                        getMultiplierForDecimalPlaces(
                          loan.collateralAsset.decimals
                        )
                      ).toFixed(4)}
                    </span>
                  </div>
                </TableCell>
                <TableCell className="hidden xl:table-cell text-center">
                  <Link
                    className="hover:underline"
                    href={`https://${loan.borrowerNftAsset?.network}.explorer.perawallet.app/asset/${loan.borrowerNftAsset?.assetId}/`}
                  >
                    {loan.borrowerNftAsset?.assetId}
                  </Link>
                </TableCell>
                <TableCell className="hidden  xl:table-cell text-center">
                  <Link
                    className="hover:underline"
                    href={`https://${loan.lenderNftAsset?.network}.explorer.perawallet.app/asset/${loan.lenderNftAsset?.assetId}/`}
                  >
                    {loan.lenderNftAsset?.assetId}
                  </Link>
                </TableCell>
                <TableCell className="table-cell text-center">
                  {loan.completedPaymentRounds === loan.paymentRounds
                    ? "Fully Paid"
                    : Number(loan.paymentRounds) -
                      Number(loan.completedPaymentRounds)}
                </TableCell>
                <TableCell className="text-center  table-cell ">
                  {loan.tenure}
                </TableCell>
                <TableCell className="text-center flex items-center justify-center ">
                  <Popover>
                    <PopoverTrigger>
                      <Button variant="outline" size="icon">
                        <MiOptionsVertical />
                        <span className="sr-only">Loan Actions</span>
                      </Button>
                    </PopoverTrigger>
                    <PopoverContent className="p-0">
                      <Command>
                        <CommandList>
                          <CommandGroup className="flex flex-col gap-2">
                            {variant === "collected" &&
                              loan.borrower.address === activeAddress && (
                                <CommandItem
                                  disabled={
                                    loan.completedPaymentRounds ===
                                    loan.paymentRounds
                                  }
                                  onSelect={() =>
                                    router.push(`/loans/${loan.id}/repay`)
                                  }
                                  className="flex items-center gap-2"
                                >
                                  <UiwPay />
                                  <span>Repay</span>
                                </CommandItem>
                              )}
                            {variant === "sold" && (
                              <CommandItem
                                disabled={loan.principalPaid}
                                onSelect={() =>
                                  router.push(`/loans/${loan.id}/confirm`)
                                }
                                className="flex items-center gap-2"
                              >
                                <TablerRubberStamp />
                                <span>Confirm</span>
                              </CommandItem>
                            )}
                            <CommandItem
                              onSelect={() => router.push(`/loans/${loan.id}`)}
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
      {loans.length === 0 && !fetching && (
        <div className="flex items-center justify-center text-muted-foreground p-10 py-16">
          <p className="border p-2 rounded-md px-4 opacity-60">
            There are currently no Loans available
          </p>
        </div>
      )}
    </Card>
  );
};

export default LoanTable;

const LoanTemplateRowSkeleton = () => {
  return (
    <TableRow>
      <TableCell>
        <div className="flex items-center justify-center gap-3">
          <Skeleton className="h-6 w-screen max-w-[60px]" />
        </div>
      </TableCell>
      <TableCell className="flex flex-col items-center">
        <Skeleton className="h-6 max-w-14 w-screen mx-auto" />
      </TableCell>
      <TableCell className="text-center">
        <Skeleton className="h-6 max-w-14 w-screen mx-auto" />
      </TableCell>
      <TableCell className="text-center">
        <Skeleton className="h-6 max-w-14 w-screen mx-auto" />
      </TableCell>
      <TableCell className="text-center">
        <Skeleton className="h-6 max-w-14 w-screen mx-auto" />
      </TableCell>
      <TableCell className="hidden xl:text-center">
        <Skeleton className="h-6 max-w-14 w-screen mx-auto" />
      </TableCell>
      <TableCell className="hidden xl:table-cell">
        <div className="flex items-center gap-3 justify-center">
          <Skeleton className="h-7 w-full  max-w-[150px]" />
        </div>
      </TableCell>
      <TableCell className="hidden xl:table-cell">
        <div className="flex items-center gap-3 justify-center">
          <Skeleton className="h-8 w-8" />
        </div>
      </TableCell>
    </TableRow>
  );
};
