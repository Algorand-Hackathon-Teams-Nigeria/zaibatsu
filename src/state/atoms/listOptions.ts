import {
	LoanFilterLoanOrderingListOptions,
	LoanTemplateFilterLoanTemplateOrderingListOptions,
	PoolFilterPoolOrderingListOptions,
} from "@/services/graphql/generated";
import { atom } from "jotai";

const listOptionsAtoms = {
	p2pLoanTemplate: atom<LoanTemplateFilterLoanTemplateOrderingListOptions>({}),
	poolLoanTemplate: atom<LoanTemplateFilterLoanTemplateOrderingListOptions>({}),
	pools: atom<PoolFilterPoolOrderingListOptions>({}),
	loans: atom<LoanFilterLoanOrderingListOptions>({}),
};

export default listOptionsAtoms;
