import React from "react";
import {
  LoanTemplateFilter,
  LoanTemplateFilterLoanTemplateOrderingListOptions,
} from "@graphql/generated";
import { Input } from "@/components/ui/input";
import AssetSelectCombobox from "../../m-asset-select-combobox";
import LoanTemplateCreatorCombobox from "../../m-loan-template-creator-select-combobox";

interface Props {
  value?: LoanTemplateFilterLoanTemplateOrderingListOptions["filter"];
  setListOpts: <K extends keyof LoanTemplateFilter>(
    value: LoanTemplateFilter[K],
    key: K,
  ) => void;
}

const LTFTenureAssetAndCreator: React.FC<Props> = ({ setListOpts, value }) => {
  return (
    <div className="grid gap-2">
      <div className="grid grid-cols-6 gap-2">
        <label htmlFor="minLoanTenure" className="col-span-4">
          Min Loan Tenure
        </label>
        <Input
          type="number"
          id="minLoanTenure"
          value={Number(value?.minLoanTenure)}
          placeholder="0.00"
          className="col-span-2"
          onChange={(e) =>
            setListOpts(Number(e.currentTarget.value), "minLoanTenure")
          }
        />
      </div>
      <div className="grid grid-cols-6 gap-2">
        <label htmlFor="maxLoanTenure" className="col-span-4">
          Max Loan Tenure
        </label>
        <Input
          type="number"
          id="maxLoanTenure"
          value={Number(value?.maxLoanTenure)}
          placeholder="0.00"
          className="col-span-2"
          onChange={(e) =>
            setListOpts(Number(e.currentTarget.value), "maxLoanTenure")
          }
        />
      </div>
      <div className="grid grid-cols-6 gap-2">
        <label htmlFor="assetId" className="col-span-3">
          Asset
        </label>
        <div className="col-span-3">
          <AssetSelectCombobox
            id="assetId"
            onSelect={(v) => setListOpts(v?.assetId, "assetId")}
          />
        </div>
      </div>
      <div className="grid grid-cols-6 gap-2">
        <label htmlFor="creatorAddress" className="col-span-3">
          Creator
        </label>
        <div className="col-span-3">
          <LoanTemplateCreatorCombobox
            id="creatorAddress"
            onSelect={(v) => setListOpts(v, "creatorAddress")}
          />
        </div>
      </div>
    </div>
  );
};

export default LTFTenureAssetAndCreator;
