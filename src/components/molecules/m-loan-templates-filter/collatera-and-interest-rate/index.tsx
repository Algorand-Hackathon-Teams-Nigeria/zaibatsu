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

const LTFCollateralAndInterstRate: React.FC<Props> = ({
  setListOpts,
  value,
}) => {
  return (
    <div className="grid gap-2">
      <div className="grid grid-cols-6 gap-2">
        <label htmlFor="minInterestRate" className="col-span-4">
          Min Interest rate
        </label>
        <Input
          type="number"
          id="minInterestRate"
          value={Number(value?.minInterestRate)}
          placeholder="0.00"
          className="col-span-2"
          onChange={(e) =>
            setListOpts(Number(e.currentTarget.value), "minInterestRate")
          }
        />
      </div>
      <div className="grid grid-cols-6 gap-2">
        <label htmlFor="maxInterestRate" className="col-span-4">
          Max Interest rate
        </label>
        <Input
          type="number"
          id="maxInterestRate"
          value={Number(value?.maxInterestRate)}
          placeholder="0.00"
          className="col-span-2"
          onChange={(e) =>
            setListOpts(Number(e.currentTarget.value), "maxInterestRate")
          }
        />
      </div>
      <div className="grid grid-cols-6 gap-2">
        <label htmlFor="minCollateralPercentage" className="col-span-4">
          Min Collateral %
        </label>
        <Input
          type="number"
          id="minCollateralPercentage"
          value={Number(value?.minCollateralPercentage)}
          placeholder="0.00"
          className="col-span-2"
          onChange={(e) =>
            setListOpts(
              Number(e.currentTarget.value),
              "minCollateralPercentage",
            )
          }
        />
      </div>
      <div className="grid grid-cols-6 gap-2">
        <label htmlFor="maxCollateralPercentage" className="col-span-4">
          Max Collateral %
        </label>
        <Input
          type="number"
          id="maxCollateralPercentage"
          value={Number(value?.maxCollateralPercentage)}
          placeholder="0.00"
          className="col-span-2"
          onChange={(e) =>
            setListOpts(
              Number(e.currentTarget.value),
              "maxCollateralPercentage",
            )
          }
        />
      </div>
    </div>
  );
};

export default LTFCollateralAndInterstRate;
