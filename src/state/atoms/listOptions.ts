import {
  LoanFilterLoanOrderingListOptions,
  LoanTemplateFilterLoanTemplateOrderingListOptions,
  PoolFilterPoolOrderingListOptions,
  ActivityFilterActivityOrderingListOptions,
} from "@/services/graphql/generated";
import { atom } from "jotai";

const listOptionsAtoms = {
  p2pLoanTemplate: atom<LoanTemplateFilterLoanTemplateOrderingListOptions>({}),
  poolLoanTemplate: atom<LoanTemplateFilterLoanTemplateOrderingListOptions>({}),
  pools: atom<PoolFilterPoolOrderingListOptions>({}),
  activities: atom<ActivityFilterActivityOrderingListOptions>({}),
  loans: atom<LoanFilterLoanOrderingListOptions>({}),
};

export default listOptionsAtoms;
