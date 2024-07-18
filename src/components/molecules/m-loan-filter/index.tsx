"use client";

import { useAtom } from "jotai";
import LFCollateralAndLoanType from "./collateral-and-loan-type";
import listOptionsAtoms from "@state/atoms/listOptions";
import { LoanFilter as LoanFilterOpts } from "@/services/graphql/generated";
import LFPrincipalAndTenure from "./principal-and-tenure";
import LFInterestAndPenalty from "./interes-and-penalty";
import LFPaymentRounds from "./payment-rounds";

const LoanFilter = () => {
	const [listOptions, setListOptions] = useAtom(listOptionsAtoms.loans);

	const handleSetListOpts = <K extends keyof LoanFilterOpts>(
		value: LoanFilterOpts[K],
		key: K,
	) => {
		setListOptions((c) => ({ ...c, filter: { ...c?.filter, [key]: value } }));
	};
	return (
		<div className="grid grid-cols-1 lg:grid-cols-2 gap-x-8 gap-y-6">
			<LFCollateralAndLoanType
				value={listOptions?.filter}
				setListOpts={handleSetListOpts}
			/>
			<LFPrincipalAndTenure
				value={listOptions?.filter}
				setListOpts={handleSetListOpts}
			/>
			<LFInterestAndPenalty
				value={listOptions?.filter}
				setListOpts={handleSetListOpts}
			/>
			<LFPaymentRounds
				value={listOptions?.filter}
				setListOpts={handleSetListOpts}
			/>
		</div>
	);
};

export default LoanFilter;
