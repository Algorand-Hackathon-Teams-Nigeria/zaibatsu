"use client";

import React from "react";
import CollapsibleFilter from "@/components/atoms/a-collapsible-filter";
import LoanFilter from "@molecules/m-loan-filter";

const LoanActions = () => {
	return (
		<CollapsibleFilter title="Filter Loans">
			<LoanFilter />
		</CollapsibleFilter>
	);
};

export default LoanActions;
