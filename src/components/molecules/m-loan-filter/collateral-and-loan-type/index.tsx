import React from "react";
import {
	LoanEnumType,
	LoanFilter,
	LoanFilterLoanOrderingListOptions,
} from "@graphql/generated";
import { Input } from "@/components/ui/input";
import AssetSelectCombobox from "@molecules/m-asset-select-combobox";
import BooleanInput from "@/components/ui/boolean-input";
import {
	Select,
	SelectContent,
	SelectGroup,
	SelectItem,
	SelectTrigger,
	SelectValue,
} from "@/components/ui/select";

interface Props {
	value?: LoanFilterLoanOrderingListOptions["filter"];
	setListOpts: <K extends keyof LoanFilter>(
		value: LoanFilter[K],
		key: K,
	) => void;
}

const LFCollateralAndLoanType: React.FC<Props> = ({ setListOpts, value }) => {
	return (
		<div className="grid gap-2 text-sm">
			<div className="grid grid-cols-6 items-center gap-2">
				<label htmlFor="maxInterestRate" className="col-span-3">
					Loan Type
				</label>
				<div className="col-span-3">
					<Select
						onValueChange={(v) =>
							setListOpts(
								LoanEnumType[v as keyof typeof LoanEnumType],
								"loanType",
							)
						}
					>
						<SelectTrigger className="w-full">
							<SelectValue placeholder="Select loan type" />
						</SelectTrigger>
						<SelectContent>
							<SelectGroup>
								{Object.keys(LoanEnumType).map((item) => (
									<SelectItem
										className="capitalize"
										key={String(item)}
										value={String(item)}
									>
										{item}
									</SelectItem>
								))}
							</SelectGroup>
						</SelectContent>
					</Select>
				</div>
			</div>
			<div className="grid items-center grid-cols-6 gap-2">
				<label htmlFor="minInterestRate" className="col-span-3">
					Collateral Asset
				</label>
				<div className="col-span-3">
					<AssetSelectCombobox
						id="assetId"
						onSelect={(v) => setListOpts(v?.assetId, "collateralAssetId")}
					/>
				</div>
			</div>
			<div className="grid grid-cols-6 items-center gap-2">
				<label htmlFor="maxInterestRate" className="col-span-3">
					Collateral Paid
				</label>
				<div className="col-span-3">
					<BooleanInput
						value={Boolean(value?.collateralPaid)}
						onValueChange={(v) => setListOpts(v, "collateralPaid")}
					/>
				</div>
			</div>
			<div className="grid grid-cols-6 items-center gap-2">
				<label htmlFor="minCollateralPercentage" className="col-span-4">
					Min Collateral Amount
				</label>
				<Input
					type="number"
					id="minCollateralAssetAmount"
					value={Number(value?.minCollateralAssetAmount)}
					placeholder="0.00"
					className="col-span-2"
					onChange={(e) =>
						setListOpts(
							Number(e.currentTarget.value),
							"minCollateralAssetAmount",
						)
					}
				/>
			</div>
			<div className="grid grid-cols-6 items-center gap-2">
				<label htmlFor="maxCollateralPercentage" className="col-span-4">
					Max Collateral Amount
				</label>
				<Input
					type="number"
					id="maxCollateralAssetAmount"
					value={Number(value?.maxCollateralAssetAmount)}
					placeholder="0.00"
					className="col-span-2"
					onChange={(e) =>
						setListOpts(
							Number(e.currentTarget.value),
							"maxCollateralAssetAmount",
						)
					}
				/>
			</div>
		</div>
	);
};

export default LFCollateralAndLoanType;
