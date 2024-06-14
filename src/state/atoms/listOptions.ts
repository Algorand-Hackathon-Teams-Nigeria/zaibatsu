import { LoanTemplateFilterLoanTemplateOrderingListOptions } from "@/services/graphql/generated";
import { atom } from "jotai";

const listOptionsAtoms = {
  p2pLoanTemplate: atom<
    LoanTemplateFilterLoanTemplateOrderingListOptions | undefined
  >({}),
  poolLoanTemplate: atom<
    LoanTemplateFilterLoanTemplateOrderingListOptions | undefined
  >({}),
};

export default listOptionsAtoms;
