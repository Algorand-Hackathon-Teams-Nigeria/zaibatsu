import {
  ActivityFilterActivityOrderingListOptions,
  LoanFilterLoanOrderingListOptions,
  LoanTemplateFilterLoanTemplateOrderingListOptions,
  PoolAnalyticsFilterPoolAnalyticsOrderingListOptions,
  PoolFilterPoolOrderingListOptions,
  UserAnalyticsFilterUserAnalyticsOrderingListOptions,
  ZaibatsuAnalyticsFilterZaibatsuAnalyticsOrderingListOptions,
} from '@/services/graphql/generated';
import { atom } from 'jotai';

const listOptionsAtoms = {
  p2pLoanTemplate: atom<LoanTemplateFilterLoanTemplateOrderingListOptions>({}),
  poolLoanTemplate: atom<LoanTemplateFilterLoanTemplateOrderingListOptions>({}),
  pools: atom<PoolFilterPoolOrderingListOptions>({}),
  activities: atom<ActivityFilterActivityOrderingListOptions>({}),
  loans: atom<LoanFilterLoanOrderingListOptions>({}),
  zaibatsuAnalytics:atom<ZaibatsuAnalyticsFilterZaibatsuAnalyticsOrderingListOptions>({}),
  poolAnalytics:atom<PoolAnalyticsFilterPoolAnalyticsOrderingListOptions>({}),
  userAnalytics:atom<UserAnalyticsFilterUserAnalyticsOrderingListOptions>({})
};

export default listOptionsAtoms;
