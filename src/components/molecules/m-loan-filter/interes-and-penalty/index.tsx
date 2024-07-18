import React from "react";
import {
	LoanFilter,
	LoanFilterLoanOrderingListOptions,
} from "@graphql/generated";
import { Input } from "@/components/ui/input";

interface Props {
	value?: LoanFilterLoanOrderingListOptions["filter"];
	setListOpts: <K extends keyof LoanFilter>(
		value: LoanFilter[K],
		key: K,
	) => void;
}

const LFInterestAndPenalty: React.FC<Props> = ({ setListOpts, value }) => {
	return (
		<div className="grid gap-2 text-sm">
			<div className="grid grid-cols-6 items-center gap-2">
				<label htmlFor="minCollateralPercentage" className="col-span-4">
					Min Interest Amount
				</label>
				<Input
					type="number"
					id="minInterestAssetAmount"
					value={Number(value?.minInterestAssetAmount)}
					placeholder="0.00"
					className="col-span-2"
					onChange={(e) =>
						setListOpts(Number(e.currentTarget.value), "minInterestAssetAmount")
					}
				/>
			</div>
			<div className="grid grid-cols-6 items-center gap-2">
				<label htmlFor="minCollateralPercentage" className="col-span-4">
					Max Interest Amount
				</label>
				<Input
					type="number"
					id="maxInterestAssetAmount"
					value={Number(value?.maxInterestAssetAmount)}
					placeholder="0.00"
					className="col-span-2"
					onChange={(e) =>
						setListOpts(Number(e.currentTarget.value), "maxInterestAssetAmount")
					}
				/>
			</div>
			<div className="grid grid-cols-6 items-center gap-2">
				<label htmlFor="minCollateralPercentage" className="col-span-4">
					Min Early-Payment-Penalty Amount
				</label>
				<Input
					type="number"
					id="minEarlyPaymentPenaltyAmount"
					value={Number(value?.minEarlyPaymentPenaltyAmount)}
					placeholder="0.00"
					className="col-span-2"
					onChange={(e) =>
						setListOpts(
							Number(e.currentTarget.value),
							"minEarlyPaymentPenaltyAmount",
						)
					}
				/>
			</div>
			<div className="grid grid-cols-6 items-center gap-2">
				<label htmlFor="maxCollateralPercentage" className="col-span-4">
					Max Early-Payment-Penalty Amount
				</label>
				<Input
					type="number"
					id="maxEarlyPaymentPenaltyAmount"
					value={Number(value?.maxEarlyPaymentPenaltyAmount)}
					placeholder="0.00"
					className="col-span-2"
					onChange={(e) =>
						setListOpts(
							Number(e.currentTarget.value),
							"maxEarlyPaymentPenaltyAmount",
						)
					}
				/>
			</div>
		</div>
	);
};

export default LFInterestAndPenalty;
