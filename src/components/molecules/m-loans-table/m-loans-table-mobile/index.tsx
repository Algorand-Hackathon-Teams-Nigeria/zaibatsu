"use client";
import PoolTableActions from "@/components/atoms/a-pool-table-actions";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Card } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import { getMultiplierForDecimalPlaces } from "@/lib/utils/math";
import { ellipseAddress } from "@/lib/utils/text";
import { LoanQuery } from "@/services/graphql/generated";
import Image from "next/image";
import React from "react";

interface LoansTableMobileProps {
  loans: LoanQuery["loan"][] | any[];
  fetching: boolean;
}

const LoansTableMobile: React.FC<LoansTableMobileProps> = ({
  loans,
  fetching,
}) => {
  return (
    <div className="w-full lg:hidden gap-5 flex flex-col">
      {loans.length > 0 && !fetching && (
        <Accordion
          collapsible
          type="single"
          defaultValue={loans[0].id + " " + 0}
          className="flex flex-col gap-4"
        >
          {loans.map((loan, key) => (
            <AccordionItem
              key={loan.id + " " + key}
              value={loan.id + " " + key}
              className="bg-[#012F01] px-4 rounded-2xl"
            >
              <AccordionTrigger>
                <div className="py-2 leading-4 font-bold text-left">
                  {ellipseAddress(loan.borrower.address)}
                </div>
              </AccordionTrigger>
              <AccordionContent key={loan.id} className="pb-6">
                <div
                  key={loan.id}
                  className="gap-4 text-white text-sm leading-[18px] rounded-lg p-4 flex flex-col bg-background font-normal"
                >
                  <div className="border-[#F7F7F7] flex flex-col gap-4">
                    <div className="py-1 font-normal flex flex-row justify-between">
                      <div className="py-2 text-[#b0c5b0]">
                        Principal Amount
                      </div>
                      <div className="py-2 flex items-center gap-2">
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
                          ).toPrecision(2)}
                        </span>
                      </div>
                    </div>
                    <div className="py-1 font-normal flex flex-row justify-between">
                      <div className="py-2 text-[#b0c5b0]">
                        Collateral Amount
                      </div>
                      <div className="py-2 flex items-center gap-2">
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
                          ).toPrecision(2)}
                        </span>
                      </div>
                    </div>
                  </div>

                  <div className="border-[#F7F7F7] flex flex-col gap-4">
                    <div className="py-1 font-normal flex flex-row justify-between">
                      <div className="py-2 text-[#b0c5b0]">
                        Remaining Payment Rounds
                      </div>
                      <div className="py-2">
                        {loan.completedPaymentRounds === loan.paymentRounds
                          ? "Fully Paid"
                          : Number(loan.paymentRounds) -
                            Number(loan.completedPaymentRounds)}
                      </div>
                    </div>
                    <div className="py-1 font-normal flex flex-row justify-between">
                      <div className="py-2 text-[#b0c5b0]">Tenure</div>
                      <div className="py-2">{loan.tenure}</div>
                    </div>
                  </div>

                  {/* Commented out section for additional table rows */}
                  {/* <div className="py-1 font-normal flex flex-row justify-between">
                      <div className="py-2 text-[#b0c5b0]">Borrower Address</div>
                      <div className="py-2">{loan.borrower.address}</div>
                    </div>
                    <div className="py-1 font-normal flex flex-row justify-between">
                      <div className="py-2 text-[#b0c5b0]">Repayment Date</div>
                      <div className="py-2">{loan.repaymentDate}</div>
                    </div>
                    <div className="py-1 font-normal flex flex-row justify-between">
                      <div className="py-2 text-[#b0c5b0]">Interest Rate</div>
                      <div className="py-2">{loan.interestRate}%</div>
                    </div> */}

                  <div className="pt-1 gap-4 flex flex-row h-10 justify-between items-center">
                    <div className="text-[#b0c5b0]">Actions</div>
                    <PoolTableActions pool={loan} />{" "}
                    {/* Replace this with LoanTableActions */}
                  </div>
                </div>
              </AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      )}

      {fetching &&
        Array.from({ length: 10 }).map((_, id) => (
          <LoansTableMobileSkeleton key={id} />
        ))}
      {loans.length === 0 && !fetching && (
        <Card className="p-2 py-4">
          <div className="flex items-center justify-center text-muted-foreground p-10 py-16">
            <p className="border p-2 rounded-md px-4 opacity-60 text-center">
              There are currently no loans available
            </p>
          </div>
        </Card>
      )}
    </div>
  );
};

export default LoansTableMobile;

const LoansTableMobileSkeleton = () => {
  return (
    <Card className="gap-3 text-white text-base leading-[18px] rounded-lg p-3 flex flex-col">
      <div className="border-[#F7F7F7] flex flex-col gap-1">
        <div className="py-2 leading-4 font-bold text-left">
          <Skeleton className="h-8 w-screen max-w-[300px]" />
        </div>
        <div className="py-1 font-normal flex flex-row justify-between">
          <div className="py-2 mt-2">Principal Amount</div>
          <Skeleton className="w-7 h-7 rounded-full" />
        </div>
        <div className="py-1 font-normal flex flex-row justify-between">
          <div className="py-2">Collateral Amount</div>
          <Skeleton className="w-7 h-7 rounded-full" />
        </div>
      </div>

      <div className="border-[#F7F7F7] flex flex-col gap-1">
        <div className="py-1 font-normal flex flex-row justify-between">
          <div className="py-2">Remaining Payment Rounds</div>
          <Skeleton className="h-7 max-w-14 w-screen" />
        </div>
        <div className="py-1 font-normal flex flex-row justify-between">
          <div className="py-2">Tenure</div>
          <Skeleton className="h-7 max-w-14 w-screen" />
        </div>

        {/* Commented out section for additional skeleton rows */}
        {/* <div className="py-1 font-normal flex flex-row justify-between">
            <div className="py-2">Borrower Address</div>
            <Skeleton className="h-7 max-w-[150px] w-screen" />
          </div>
          <div className="py-1 font-normal flex flex-row justify-between">
            <div className="py-2">Repayment Date</div>
            <Skeleton className="h-7 max-w-[150px] w-screen" />
          </div>
          <div className="py-1 font-normal flex flex-row justify-between">
            <div className="py-2">Interest Rate</div>
            <Skeleton className="h-7 max-w-[50px] w-screen" />
          </div> */}
      </div>

      <div className="pt-1 gap-4 flex flex-row h-10">
        <Skeleton className="w-full h-full text-center rounded" />
        <Skeleton className="w-full h-full text-center rounded" />
      </div>
    </Card>
  );
};
