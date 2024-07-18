import React from "react";
import {
	LoanFilter,
	LoanFilterLoanOrderingListOptions,
} from "@graphql/generated";
import { Input } from "@/components/ui/input";
import AssetSelectCombobox from "@molecules/m-asset-select-combobox";
import BooleanInput from "@/components/ui/boolean-input";

interface Props {
	value?: LoanFilterLoanOrderingListOptions["filter"];
	setListOpts: <K extends keyof LoanFilter>(
		value: LoanFilter[K],
		key: K,
	) => void;
}

const LFPrincipalAndTenure: React.FC<Props> = ({ setListOpts, value }) => {
	return (
		<div className="grid gap-2 text-sm">
			<div className="grid grid-cols-6 items-center gap-2">
				<label htmlFor="minCollateralPercentage" className="col-span-3">
					Tenure
				</label>
				<Input
					type="number"
					id="tenure"
					value={Number(value?.tenure)}
					placeholder="0.00"
					className="col-span-3"
					onChange={(e) => setListOpts(Number(e.currentTarget.value), "tenure")}
				/>
			</div>
			<div className="grid items-center grid-cols-6 gap-2">
				<label htmlFor="minInterestRate" className="col-span-3">
					Principal Asset
				</label>
				<div className="col-span-3">
					<AssetSelectCombobox
						onSelect={(v) => setListOpts(v?.assetId, "principalAssetId")}
					/>
				</div>
			</div>
			<div className="grid grid-cols-6 items-center gap-2">
				<label htmlFor="maxInterestRate" className="col-span-3">
					Principal Paid
				</label>
				<div className="col-span-3">
					<BooleanInput
						value={Boolean(value?.principalPaid)}
						onValueChange={(v) => setListOpts(v, "principalPaid")}
					/>
				</div>
			</div>
			<div className="grid grid-cols-6 items-center gap-2">
				<label htmlFor="minCollateralPercentage" className="col-span-4">
					Min Principal Amount
				</label>
				<Input
					type="number"
					id="minPrincipalAssetAmount"
					value={Number(value?.minPrincipalAssetAmount)}
					placeholder="0.00"
					className="col-span-2"
					onChange={(e) =>
						setListOpts(
							Number(e.currentTarget.value),
							"minPrincipalAssetAmount",
						)
					}
				/>
			</div>
			<div className="grid grid-cols-6 items-center gap-2">
				<label htmlFor="maxCollateralPercentage" className="col-span-4">
					Max Principal Amount
				</label>
				<Input
					type="number"
					id="maxPrincipalAssetAmount"
					value={Number(value?.maxPrincipalAssetAmount)}
					placeholder="0.00"
					className="col-span-2"
					onChange={(e) =>
						setListOpts(
							Number(e.currentTarget.value),
							"maxPrincipalAssetAmount",
						)
					}
				/>
			</div>
		</div>
	);
};

export default LFPrincipalAndTenure;
