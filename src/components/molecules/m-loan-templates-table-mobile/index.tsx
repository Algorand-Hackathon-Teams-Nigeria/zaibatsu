import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import Link from "next/link";
import { useAtomValue } from "jotai";
import listOptionsAtoms from "@state/atoms/listOptions";
import { Card } from "@/components/ui/card";
import {
  Avatar,
  AvatarFallback,
  AvatarGroup,
  AvatarImage,
} from "@/components/ui/avatar";
import { Skeleton } from "@/components/ui/skeleton";
import { LoanTemplateQuery } from "../../../services/graphql/generated";
import Image from "next/image";

import React from "react";
import { useRouter } from "next/navigation";
import { Button } from "@ui/button";
import { ellipseAddress } from "@utils/text";
import { useLoanTemplatesQuery } from "@graphql/generated";
import { getMultiplierForDecimalPlaces } from "@utils/math";
import { Popover, PopoverContent, PopoverTrigger } from "@ui/popover";
import { Command, CommandGroup, CommandItem, CommandList } from "@ui/command";
import TdesignUndertake from "~icons/tdesign/undertake.jsx";
import MiOptionsVertical from "~icons/mi/options-vertical.jsx";

interface loanTemplatesCardProps {
  templates: LoanTemplateQuery["loanTemplate"][] | any[];
  fetching: boolean;
}

const LoanTemplatesCard: React.FC<loanTemplatesCardProps> = ({
  templates,
  fetching,
}) => {
  return (
    <div className="w-full lg:hidden gap-5 flex flex-col">
      {templates.length > 0 &&
        !fetching &&
        templates.map((template) => (
          <Card
            key={template.id}
            className=" gap-3 text-white text-base  leading-[18px] rounded-lg p-3 flex flex-col"
          >
            <div className=" border-b-[1px] border-[#F7F7F7] flex flex-col gap-1">
              <div className="py-2  leading-4 font-bold text-left flex flex-row items-center gap-2 ">
                <Image
                  src={template.asset.imageUrl}
                  alt={template.asset.name}
                  width={30}
                  height={30}
                />
                <span>{template.asset.unitName}</span>
              </div>
              <div className="py-1  font-normal flex flex-row justify-between ">
                <div className="py-2">Max Amount</div>
                <div className="py-2">
                  {" "}
                  {(
                    template.malgoanAmount /
                    getMultiplierForDecimalPlaces(template.asset.decimals)
                  ).toFixed(8)}
                </div>
              </div>
              <div className="py-1  font-normal flex flex-row justify-between ">
                <div className="py-2">Interest Rate</div>
                <div className="py-2"> {template.interestRate}</div>
              </div>
            </div>

            <div className=" border-b-[1px] border-[#F7F7F7] flex flex-col gap-1">
              <div className="py-1  font-normal flex flex-row justify-between ">
                <div className="py-2">Collateral Percentage</div>
                <div className="py-2"> {template.collateralPercentage}</div>
              </div>
              <div className="py-1   font-normal flex flex-row justify-between ">
                <div className="py-2">Repayments Periods</div>
                <div className="py-2">{template.repaymentPeriods}</div>
              </div>
            </div>

            <div className=" border-b-[1px] border-[#F7F7F7] flex flex-col gap-1">
              <div className="py-1  font-normal flex flex-row justify-between ">
                <div className="py-2">Max Tenure</div>
                <div className="py-2"> {template.malgoanTenure}</div>
              </div>
              <div className="py-1   font-normal flex flex-row justify-between ">
                <div className="py-2">Creator</div>
                <div className="py-2 underline">
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
                </div>
              </div>
            </div>
            <div className="pt-1 gap-4 flex flex-row h-10 ">
              <Link
                className="border border-primary/60 w-full  text-center p-2 rounded-md hover:text-primary-foreground hover:bg-primary/60 transition-all"
                href={`/p2p/offers/${template.id}`}
              >
                Collect
              </Link>
            </div>
          </Card>
        ))}
      {fetching &&
        Array.from({ length: 10 }).map((_, id) => (
          <LoanTemplatesCardSkelton key={id} />
        ))}
      {templates.length === 0 && !fetching && (
        <Card className="p-2 py-4">
          <div className="flex items-center justify-center text-muted-foreground p-10 py-16">
            <p className="border p-2 rounded-md px-4 opacity-60 text-center">
              There are currently no templates offerings available
            </p>
          </div>
        </Card>
      )}
      <LoanTemplatesCardSkelton />
    </div>
  );
};
export default LoanTemplatesCard;
const LoanTemplatesCardSkelton = () => {
  return (
    <Card className=" gap-3 text-white text-base  leading-[18px] rounded-lg p-3 flex flex-col">
      <div className=" border-b-[1px] border-[#F7F7F7] flex flex-col gap-1">
        <div className="py-2  leading-4 font-bold text-left flex items-center gap-2 flex-row ">
          <div className="py-2">
            {" "}
            <AvatarGroup>
              {Array.from({ length: 1 }).map((_, id) => (
                <Skeleton key={id} className="w-7 h-7 rounded-full" />
              ))}
            </AvatarGroup>
          </div>{" "}
          <Skeleton className="h-8 w-screen max-w-14" />
        </div>
        <div className=" border-b-[1px] border-[#F7F7F7] flex flex-col gap-1">
          <div className="py-1   font-normal flex flex-row justify-between ">
            <Skeleton className="h-7 max-w-14 w-screen " />
            <Skeleton className="py-2 max-w-14 w-screen " />
          </div>
          <div className="py-1   font-normal flex flex-row justify-between ">
            <Skeleton className="h-7 max-w-14 w-screen " />
            <Skeleton className="py-2 max-w-14 w-screen " />
          </div>
        </div>
      </div>

      <div className=" border-b-[1px] border-[#F7F7F7] flex flex-col gap-1">
        <div className="py-1   font-normal flex flex-row justify-between ">
          <Skeleton className="h-7 max-w-14 w-screen " />
          <Skeleton className="py-2 max-w-14 w-screen " />
        </div>
        <div className="py-1   font-normal flex flex-row justify-between ">
          <Skeleton className="h-7 max-w-14 w-screen " />
          <Skeleton className="py-2 max-w-14 w-screen " />
        </div>
      </div>

      <div className=" border-b-[1px] border-[#F7F7F7] flex flex-col gap-1">
        <div className="py-1   font-normal flex flex-row justify-between ">
          <Skeleton className="h-7 max-w-14 w-screen " />
          <Skeleton className="py-2 max-w-14 w-screen " />
        </div>
        <div className="py-1   font-normal flex flex-row justify-between ">
          <Skeleton className="h-7 max-w-14 w-screen " />
          <Skeleton className="py-2 max-w-14 w-screen " />
        </div>
      </div>

      <div className="pt-1 gap-4 flex flex-row h-10 ">
        <Skeleton className="w-full h-full text-center  rounded " />
      </div>
    </Card>
  );
};
