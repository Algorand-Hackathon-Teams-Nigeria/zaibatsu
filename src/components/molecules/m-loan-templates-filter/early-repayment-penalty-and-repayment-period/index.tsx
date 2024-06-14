import React from "react";
import {
  LoanTemplateFilter,
  LoanTemplateFilterLoanTemplateOrderingListOptions,
} from "@graphql/generated";
import { Input } from "@/components/ui/input";

interface Props {
  value?: LoanTemplateFilterLoanTemplateOrderingListOptions["filter"];
  setListOpts: <K extends keyof LoanTemplateFilter>(
    value: LoanTemplateFilter[K],
    key: K,
  ) => void;
}

const LTFEarlyRepaymentPenaltyAndRepaymentPeriod: React.FC<Props> = ({
  setListOpts,
  value,
}) => {
  return (
    <div className="grid gap-2">
      <div className="grid grid-cols-6 gap-2">
        <label
          htmlFor="minEarlyRepaymentPenaltyPercentage"
          className="col-span-4"
        >
          Min Early Payment Penalty
        </label>
        <Input
          type="number"
          id="minEarlyRepaymentPenaltyPercentage"
          value={Number(value?.minEarlyRepaymentPenaltyPercentage)}
          placeholder="0.00"
          className="col-span-2"
          onChange={(e) =>
            setListOpts(
              Number(e.currentTarget.value),
              "minEarlyRepaymentPenaltyPercentage",
            )
          }
        />
      </div>
      <div className="grid grid-cols-6 gap-2">
        <label
          htmlFor="maxEarlyRepaymentPenaltyPercentage"
          className="col-span-4"
        >
          Max Early Payment Penalty
        </label>
        <Input
          type="number"
          id="maxEarlyRepaymentPenaltyPercentage"
          value={Number(value?.maxEarlyRepaymentPenaltyPercentage)}
          placeholder="0.00"
          className="col-span-2"
          onChange={(e) =>
            setListOpts(
              Number(e.currentTarget.value),
              "maxEarlyRepaymentPenaltyPercentage",
            )
          }
        />
      </div>
      <div className="grid grid-cols-6 gap-2">
        <label htmlFor="minRepaymentPeriods" className="col-span-4">
          Min Payment Periods
        </label>
        <Input
          type="number"
          id="minRepaymentPeriods"
          value={Number(value?.minRepaymentPeriods)}
          placeholder="0.00"
          className="col-span-2"
          onChange={(e) =>
            setListOpts(Number(e.currentTarget.value), "minRepaymentPeriods")
          }
        />
      </div>
      <div className="grid grid-cols-6 gap-2">
        <label htmlFor="maxRepaymentPeriods" className="col-span-4">
          Max Payment Periods
        </label>
        <Input
          type="number"
          id="maxRepaymentPeriods"
          className="col-span-2"
          value={Number(value?.maxRepaymentPeriods)}
          placeholder="0.00"
          onChange={(e) =>
            setListOpts(Number(e.currentTarget.value), "maxRepaymentPeriods")
          }
        />
      </div>
    </div>
  );
};

export default LTFEarlyRepaymentPenaltyAndRepaymentPeriod;
