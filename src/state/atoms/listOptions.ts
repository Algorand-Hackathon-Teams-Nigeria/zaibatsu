import {
  LoanTemplateFilterLoanTemplateOrderingListOptions,
  PoolFilterPoolOrderingListOptions,
} from "@/services/graphql/generated";
import { atom } from "jotai";

const listOptionsAtoms = {
  p2pLoanTemplate: atom<
    LoanTemplateFilterLoanTemplateOrderingListOptions | undefined
  >({}),
  poolLoanTemplate: atom<
    LoanTemplateFilterLoanTemplateOrderingListOptions | undefined
  >({}),
  pools: atom<PoolFilterPoolOrderingListOptions | undefined>({}),
};

export default listOptionsAtoms;
