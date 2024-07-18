"use client";
import { LoanTemplateFilter as ListTemplateFilterOpts } from "@graphql/generated";
import listOptionsAtoms from "@/state/atoms/listOptions";
import { useAtom } from "jotai";
import React from "react";
import LTFCollateralAndInterstRate from "./collatera-and-interest-rate";
import LTFEarlyRepaymentPenaltyAndRepaymentPeriod from "./early-repayment-penalty-and-repayment-period";
import LTFTenureAssetAndCreator from "./tenure-asset-and-creator";
import CollapsibleFilter from "@atoms/a-collapsible-filter";

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
		<CollapsibleFilter title="Loan Offers Filter">
			<div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-x-8 gap-y-6">
				<LTFCollateralAndInterstRate
					value={listOptions.filter}
					setListOpts={handleSetListOpts}
				/>
				<LTFEarlyRepaymentPenaltyAndRepaymentPeriod
					value={listOptions.filter}
					setListOpts={handleSetListOpts}
				/>
				<LTFTenureAssetAndCreator
					value={listOptions.filter}
					setListOpts={handleSetListOpts}
				/>
			</div>
		</CollapsibleFilter>
	);
};

export default LoanTemplateFilter;
