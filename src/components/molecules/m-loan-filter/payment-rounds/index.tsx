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

const LFPaymentRounds: React.FC<Props> = ({ setListOpts, value }) => {
	return (
		<div className="grid gap-2 text-sm">
			<div className="grid grid-cols-6 items-center gap-2">
				<label htmlFor="minCollateralPercentage" className="col-span-4">
					Min Payment Rounds
				</label>
				<Input
					type="number"
					id="minPaymentRounds"
					value={Number(value?.minPaymentRounds)}
					placeholder="0.00"
					className="col-span-2"
					onChange={(e) =>
						setListOpts(Number(e.currentTarget.value), "minPaymentRounds")
					}
				/>
			</div>
			<div className="grid grid-cols-6 items-center gap-2">
				<label htmlFor="minCollateralPercentage" className="col-span-4">
					Max Payment Rounds
				</label>
				<Input
					type="number"
					id="maxPaymentRounds"
					value={Number(value?.maxPaymentRounds)}
					placeholder="0.00"
					className="col-span-2"
					onChange={(e) =>
						setListOpts(Number(e.currentTarget.value), "maxPaymentRounds")
					}
				/>
			</div>
			<div className="grid grid-cols-6 items-center gap-2">
				<label htmlFor="minCollateralPercentage" className="col-span-4">
					Min Completed-Payment Rounds
				</label>
				<Input
					type="number"
					id="minCompletedPaymentRounds"
					value={Number(value?.minCompletedPaymentRounds)}
					placeholder="0.00"
					className="col-span-2"
					onChange={(e) =>
						setListOpts(
							Number(e.currentTarget.value),
							"minCompletedPaymentRounds",
						)
					}
				/>
			</div>
			<div className="grid grid-cols-6 items-center gap-2">
				<label htmlFor="maxCollateralPercentage" className="col-span-4">
					Max Completed-Payment Rounds
				</label>
				<Input
					type="number"
					id="maxCompletedPaymentRounds"
					value={Number(value?.maxCompletedPaymentRounds)}
					placeholder="0.00"
					className="col-span-2"
					onChange={(e) =>
						setListOpts(
							Number(e.currentTarget.value),
							"maxCompletedPaymentRounds",
						)
					}
				/>
			</div>
		</div>
	);
};

export default LFPaymentRounds;
