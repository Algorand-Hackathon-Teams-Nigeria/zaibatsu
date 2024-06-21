"use client";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
} from "@/components/ui/card";
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible";
import { LoanTemplateFilter as ListTemplateFilterOpts } from "@/services/graphql/generated";
import listOptionsAtoms from "@/state/atoms/listOptions";
import { useAtom } from "jotai";
import React from "react";
import FlowbiteFilterSolid from "~icons/flowbite/filter-solid.jsx";
import LTFCollateralAndInterstRate from "./collatera-and-interest-rate";
import LTFEarlyRepaymentPenaltyAndRepaymentPeriod from "./early-repayment-penalty-and-repayment-period";
import LTFTenureAssetAndCreator from "./tenure-asset-and-creator";

interface Props {
  variant?: "P2P" | "Pool";
}

const LoanTemplateFilter: React.FC<Props> = ({ variant }) => {
  const [listOptions, setListOptions] = useAtom(
    variant == "P2P"
      ? listOptionsAtoms.p2pLoanTemplate
      : listOptionsAtoms.poolLoanTemplate,
  );

  const handleSetListOpts = <K extends keyof ListTemplateFilterOpts>(
    value: ListTemplateFilterOpts[K],
    key: K,
  ) => {
    setListOptions((c) => ({ ...c, filter: { ...c?.filter, [key]: value } }));
  };

  return (
    <Collapsible>
      <div className="flex items-center justify-between mb-4">
        <div></div>
        <CollapsibleTrigger>
          <Button size="icon" title="Loan offers filter">
            <FlowbiteFilterSolid />
            <span className="sr-only">Loan Offers Filter</span>
          </Button>
        </CollapsibleTrigger>
      </div>
      <CollapsibleContent>
        <Card>
          <CardHeader>
            <CardDescription>Filter loan offers</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-x-8 gap-y-6">
              <LTFCollateralAndInterstRate
                value={listOptions?.filter}
                setListOpts={handleSetListOpts}
              />
              <LTFEarlyRepaymentPenaltyAndRepaymentPeriod
                value={listOptions?.filter}
                setListOpts={handleSetListOpts}
              />
              <LTFTenureAssetAndCreator
                value={listOptions?.filter}
                setListOpts={handleSetListOpts}
              />
            </div>
          </CardContent>
        </Card>
      </CollapsibleContent>
    </Collapsible>
  );
};

export default LoanTemplateFilter;
