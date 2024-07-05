import gql from 'graphql-tag';
import * as Urql from 'urql';
export type Maybe<T> = T | null;
export type InputMaybe<T> = Maybe<T>;
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]?: Maybe<T[SubKey]> };
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]: Maybe<T[SubKey]> };
export type MakeEmpty<T extends { [key: string]: unknown }, K extends keyof T> = { [_ in K]?: never };
export type Incremental<T> = T | { [P in keyof T]?: P extends ' $fragmentName' | '__typename' ? T[P] : never };
export type Omit<T, K extends keyof T> = Pick<T, Exclude<keyof T, K>>;
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: { input: string; output: string; }
  String: { input: string; output: string; }
  Boolean: { input: boolean; output: boolean; }
  Int: { input: number; output: number; }
  Float: { input: number; output: number; }
  DateTime: { input: any; output: any; }
  Union: { input: any; output: any; }
  Void: { input: any; output: any; }
};

export type AlgorandStandardAssetFilter = {
  assetId?: InputMaybe<Scalars['Union']['input']>;
  name?: InputMaybe<Scalars['String']['input']>;
  network?: InputMaybe<NetworkType>;
  unitName?: InputMaybe<Scalars['String']['input']>;
};

export type AlgorandStandardAssetFilterNoneTypeListOptions = {
  filter?: InputMaybe<AlgorandStandardAssetFilter>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  ordering?: InputMaybe<Scalars['Void']['input']>;
};

export type AlgorandStandardAssetInput = {
  assetId: Scalars['Union']['input'];
  decimals: Scalars['Int']['input'];
  imageUrl: Scalars['String']['input'];
  name: Scalars['String']['input'];
  network: NetworkType;
  unitName: Scalars['String']['input'];
};

export type AlgorandStandardAssetType = {
  __typename?: 'AlgorandStandardAssetType';
  assetId: Scalars['Union']['output'];
  dateAdded: Scalars['DateTime']['output'];
  decimals: Scalars['Int']['output'];
  id: Scalars['Int']['output'];
  imageUrl: Scalars['String']['output'];
  lastUpdated: Scalars['DateTime']['output'];
  name: Scalars['String']['output'];
  network: NetworkType;
  unitName: Scalars['String']['output'];
};

export type ContractLoanDetails = {
  borrower: Scalars['String']['input'];
  borrowerNftAsserId: Scalars['Union']['input'];
  collateralAssetAmount: Scalars['Union']['input'];
  collateralAssetId: Scalars['Union']['input'];
  collateralPaid: Scalars['Boolean']['input'];
  completedPaymentRounds: Scalars['Int']['input'];
  earlyPaymentPenaltyAmount: Scalars['Union']['input'];
  interestAssetAmount: Scalars['Union']['input'];
  lenderNftAsserId: Scalars['Union']['input'];
  loanKey: Scalars['String']['input'];
  loanType: Scalars['String']['input'];
  paymentCompletionTimestamp: Scalars['Union']['input'];
  paymentRecipients: Array<Array<Scalars['Union']['input']>>;
  paymentRounds: Scalars['Int']['input'];
  principalAssetAmount: Scalars['Union']['input'];
  principalAssetId: Scalars['Union']['input'];
  principalPaid: Scalars['Boolean']['input'];
  tenure: Scalars['Int']['input'];
};

export type IpfsAssetType = {
  __typename?: 'IPFSAssetType';
  extension?: Maybe<Scalars['String']['output']>;
  id: Scalars['Int']['output'];
  ipfsHash: Scalars['String']['output'];
  isDuplicate?: Maybe<Scalars['Boolean']['output']>;
  pinSize: Scalars['Union']['output'];
  timestamp: Scalars['String']['output'];
};

export enum LoanEnumType {
  Dao = 'DAO',
  P2P = 'P2P',
  Zaibatsu = 'ZAIBATSU'
}

export type LoanFilter = {
  borrowerAddress?: InputMaybe<Scalars['String']['input']>;
  collateralAssetId?: InputMaybe<Scalars['Union']['input']>;
  collateralPaid?: InputMaybe<Scalars['Boolean']['input']>;
  loanType?: InputMaybe<LoanEnumType>;
  maxCollateralAssetAmount?: InputMaybe<Scalars['Union']['input']>;
  maxCompletedPaymentRounds?: InputMaybe<Scalars['Int']['input']>;
  maxEarlyPaymentPenaltyAmount?: InputMaybe<Scalars['Union']['input']>;
  maxInterestAssetAmount?: InputMaybe<Scalars['Union']['input']>;
  maxPaymentRounds?: InputMaybe<Scalars['Int']['input']>;
  maxPrincipalAssetAmount?: InputMaybe<Scalars['Union']['input']>;
  minCollateralAssetAmount?: InputMaybe<Scalars['Union']['input']>;
  minCompletedPaymentRounds?: InputMaybe<Scalars['Int']['input']>;
  minEarlyPaymentPenaltyAmount?: InputMaybe<Scalars['Union']['input']>;
  minInterestAssetAmount?: InputMaybe<Scalars['Union']['input']>;
  minPaymentRounds?: InputMaybe<Scalars['Int']['input']>;
  minPrincipalAssetAmount?: InputMaybe<Scalars['Union']['input']>;
  principalAssetId?: InputMaybe<Scalars['Union']['input']>;
  principalPaid?: InputMaybe<Scalars['Boolean']['input']>;
  templateId?: InputMaybe<Scalars['ID']['input']>;
  tenure?: InputMaybe<Scalars['Int']['input']>;
};

export type LoanFilterLoanOrderingListOptions = {
  filter?: InputMaybe<LoanFilter>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  ordering?: InputMaybe<LoanOrdering>;
};

export type LoanOrdering = {
  dateAdded: Scalars['DateTime']['input'];
  dateAddedDesc: Scalars['DateTime']['input'];
  lastUpdated: Scalars['DateTime']['input'];
  lastUpdatedDesc: Scalars['DateTime']['input'];
};

export type LoanRequestInput = {
  borrowerAddress: Scalars['String']['input'];
  collateralAssetId: Scalars['Union']['input'];
  loanAmount: Scalars['Int']['input'];
  loanId?: InputMaybe<Scalars['Int']['input']>;
  loanType: LoanEnumType;
  templateId: Scalars['Int']['input'];
  tenure: Scalars['Int']['input'];
};

export type LoanTemplateFilter = {
  assetId?: InputMaybe<Scalars['Union']['input']>;
  creatorAddress?: InputMaybe<Scalars['String']['input']>;
  loanType?: InputMaybe<LoanEnumType>;
  maxCollateralPercentage?: InputMaybe<Scalars['Float']['input']>;
  maxEarlyRepaymentPenaltyPercentage?: InputMaybe<Scalars['Float']['input']>;
  maxInterestRate?: InputMaybe<Scalars['Float']['input']>;
  maxLoanTenure?: InputMaybe<Scalars['Int']['input']>;
  maxRepaymentPeriods?: InputMaybe<Scalars['Int']['input']>;
  minCollateralPercentage?: InputMaybe<Scalars['Float']['input']>;
  minEarlyRepaymentPenaltyPercentage?: InputMaybe<Scalars['Float']['input']>;
  minInterestRate?: InputMaybe<Scalars['Float']['input']>;
  minLoanTenure?: InputMaybe<Scalars['Int']['input']>;
  minRepaymentPeriods?: InputMaybe<Scalars['Int']['input']>;
  poolId?: InputMaybe<Scalars['Int']['input']>;
};

export type LoanTemplateFilterLoanTemplateOrderingListOptions = {
  filter?: InputMaybe<LoanTemplateFilter>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  ordering?: InputMaybe<LoanTemplateOrdering>;
};

export type LoanTemplateInput = {
  assetId: Scalars['String']['input'];
  collateralPercentage: Scalars['Int']['input'];
  creatorAddress?: InputMaybe<Scalars['String']['input']>;
  earlyRepaymentPenaltyPercentage?: InputMaybe<Scalars['Int']['input']>;
  interestRate: Scalars['Int']['input'];
  loanType: LoanEnumType;
  maxLoanAmount: Scalars['Union']['input'];
  maxLoanTenure: Scalars['Int']['input'];
  minLoanTenure: Scalars['Int']['input'];
  poolId?: InputMaybe<Scalars['Int']['input']>;
  repaymentPeriods?: InputMaybe<Scalars['Int']['input']>;
};

export type LoanTemplateOrdering = {
  collateralPercentage?: InputMaybe<Scalars['Boolean']['input']>;
  collateralPercentageDesc?: InputMaybe<Scalars['Boolean']['input']>;
  dateAdded?: InputMaybe<Scalars['Boolean']['input']>;
  dateAddedDesc?: InputMaybe<Scalars['Boolean']['input']>;
  earlyRepaymentPenaltyPercentage?: InputMaybe<Scalars['Boolean']['input']>;
  earlyRepaymentPenaltyPercentageDesc?: InputMaybe<Scalars['Boolean']['input']>;
  interestRate?: InputMaybe<Scalars['Boolean']['input']>;
  interestRateDesc?: InputMaybe<Scalars['Boolean']['input']>;
  lastUpdated?: InputMaybe<Scalars['Boolean']['input']>;
  lastUpdatedDesc?: InputMaybe<Scalars['Boolean']['input']>;
  repaymentPeriods?: InputMaybe<Scalars['Boolean']['input']>;
  repaymentPeriodsDesc?: InputMaybe<Scalars['Boolean']['input']>;
};

export type LoanTemplateType = {
  __typename?: 'LoanTemplateType';
  asset: AlgorandStandardAssetType;
  collateralPercentage: Scalars['Float']['output'];
  creator?: Maybe<UserType>;
  dateAdded: Scalars['DateTime']['output'];
  earlyRepaymentPenaltyPercentage: Scalars['Float']['output'];
  id: Scalars['Int']['output'];
  interestRate: Scalars['Float']['output'];
  lastUpdated: Scalars['DateTime']['output'];
  loanType: LoanEnumType;
  maxLoanAmount: Scalars['Union']['output'];
  maxLoanTenure: Scalars['Int']['output'];
  minLoanTenure: Scalars['Int']['output'];
  pool?: Maybe<PoolType>;
  repaymentPeriods: Scalars['Int']['output'];
};

export type LoanType = {
  __typename?: 'LoanType';
  borrower: UserType;
  borrowerIpfsAsset?: Maybe<IpfsAssetType>;
  borrowerNftAsset?: Maybe<AlgorandStandardAssetType>;
  collateralAsset: AlgorandStandardAssetType;
  collateralAssetAmount: Scalars['Union']['output'];
  collateralPaid: Scalars['Boolean']['output'];
  completedPaymentRounds: Scalars['Int']['output'];
  dateAdded: Scalars['DateTime']['output'];
  earlyPaymentPenaltyAmount: Scalars['Union']['output'];
  encodedId?: Maybe<Scalars['String']['output']>;
  id: Scalars['ID']['output'];
  interestAssetAmount: Scalars['Union']['output'];
  ipfsHash?: Maybe<Scalars['String']['output']>;
  lastUpdated: Scalars['DateTime']['output'];
  lenderIpfsAsset?: Maybe<IpfsAssetType>;
  lenderNftAsset?: Maybe<AlgorandStandardAssetType>;
  loanKey?: Maybe<Scalars['String']['output']>;
  loanType: LoanEnumType;
  paymentCompletionTimestamp: Scalars['Union']['output'];
  paymentRecipients: Array<PaymentRecipientType>;
  paymentRounds: Scalars['Int']['output'];
  principalAsset: AlgorandStandardAssetType;
  principalAssetAmount: Scalars['Union']['output'];
  principalPaid: Scalars['Boolean']['output'];
  template: LoanTemplateType;
  tenure: Scalars['Int']['output'];
};


export type LoanTypePaymentRecipientsArgs = {
  args?: InputMaybe<PaymentRecipientFilterPaymentRecipientOrderingListOptions>;
};

export type Mutation = {
  __typename?: 'Mutation';
  calculateLoanSpecifics: LoanType;
  newLoanTemplate: LoanTemplateType;
  newPool: PoolType;
  newPoolContribution: PoolContributionType;
  saveAlgorandAstandardAsset: AlgorandStandardAssetType;
  updateLoanWithContractDetails: LoanType;
};


export type MutationCalculateLoanSpecificsArgs = {
  args: LoanRequestInput;
};


export type MutationNewLoanTemplateArgs = {
  input: LoanTemplateInput;
};


export type MutationNewPoolArgs = {
  input: NewPoolInput;
};


export type MutationNewPoolContributionArgs = {
  input: PoolContributionInput;
};


export type MutationSaveAlgorandAstandardAssetArgs = {
  args: AlgorandStandardAssetInput;
};


export type MutationUpdateLoanWithContractDetailsArgs = {
  args: ContractLoanDetails;
  loanId: Scalars['Int']['input'];
};

export enum NetworkType {
  Betanet = 'BETANET',
  Mainnet = 'MAINNET',
  Testnet = 'TESTNET'
}

export type NewPoolInput = {
  initialContribution: PoolContributionInput;
  name: Scalars['String']['input'];
};

export type NoneTypeNoneTypeListOptions = {
  filter?: InputMaybe<Scalars['Void']['input']>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  ordering?: InputMaybe<Scalars['Void']['input']>;
};

export type PaymentRecipientFilter = {
  loanId?: InputMaybe<Scalars['ID']['input']>;
  recipientAddress?: InputMaybe<Scalars['String']['input']>;
};

export type PaymentRecipientFilterPaymentRecipientOrderingListOptions = {
  filter?: InputMaybe<PaymentRecipientFilter>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  ordering?: InputMaybe<PaymentRecipientOrdering>;
};

export type PaymentRecipientOrdering = {
  dateAdded?: InputMaybe<Scalars['Boolean']['input']>;
  dateAddedDesc?: InputMaybe<Scalars['Boolean']['input']>;
  lastUpdated?: InputMaybe<Scalars['Boolean']['input']>;
  lastUpdatedDesc?: InputMaybe<Scalars['Boolean']['input']>;
  paymentPercentage?: InputMaybe<Scalars['Boolean']['input']>;
  paymentPercentageDesc?: InputMaybe<Scalars['Boolean']['input']>;
};

export type PaymentRecipientType = {
  __typename?: 'PaymentRecipientType';
  dateAdded: Scalars['DateTime']['output'];
  id: Scalars['Int']['output'];
  lastUpdated: Scalars['DateTime']['output'];
  loan: LoanType;
  paymentPercentage: Scalars['Float']['output'];
  recipient: UserType;
};

export type PoolAssetHoldingFilter = {
  assetId?: InputMaybe<Scalars['Int']['input']>;
  maxBalance?: InputMaybe<Scalars['Int']['input']>;
  maxDeposits?: InputMaybe<Scalars['Int']['input']>;
  maxPayouts?: InputMaybe<Scalars['Int']['input']>;
  minBalance?: InputMaybe<Scalars['Int']['input']>;
  minDeposits?: InputMaybe<Scalars['Int']['input']>;
  minPayouts?: InputMaybe<Scalars['Int']['input']>;
  poolId?: InputMaybe<Scalars['Int']['input']>;
};

export type PoolAssetHoldingFilterPoolAssetHoldingOrderingListOptions = {
  filter?: InputMaybe<PoolAssetHoldingFilter>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  ordering?: InputMaybe<PoolAssetHoldingOrdering>;
};

export type PoolAssetHoldingOrdering = {
  balance?: InputMaybe<Scalars['Boolean']['input']>;
  balanceDesc?: InputMaybe<Scalars['Boolean']['input']>;
  dateAdded?: InputMaybe<Scalars['Boolean']['input']>;
  dateAddedDesc?: InputMaybe<Scalars['Boolean']['input']>;
  deposits?: InputMaybe<Scalars['Boolean']['input']>;
  depositsDesc?: InputMaybe<Scalars['Boolean']['input']>;
  payouts?: InputMaybe<Scalars['Boolean']['input']>;
  payoutsDesc?: InputMaybe<Scalars['Boolean']['input']>;
};

export type PoolAssetHoldingsRecordType = {
  __typename?: 'PoolAssetHoldingsRecordType';
  assetId: Scalars['Union']['output'];
  balance: Scalars['Float']['output'];
  dateAdded: Scalars['DateTime']['output'];
  deposits: Scalars['Float']['output'];
  id: Scalars['ID']['output'];
  lastUpdated: Scalars['DateTime']['output'];
  payouts: Scalars['Float']['output'];
  pool: PoolType;
};

export type PoolContributionFilter = {
  assetId?: InputMaybe<Scalars['Int']['input']>;
  contributor?: InputMaybe<Scalars['String']['input']>;
  maxAmount?: InputMaybe<Scalars['Boolean']['input']>;
  minAmount?: InputMaybe<Scalars['Boolean']['input']>;
  poolId?: InputMaybe<Scalars['Int']['input']>;
};

export type PoolContributionFilterPoolContributionOrderingListOptions = {
  filter?: InputMaybe<PoolContributionFilter>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  ordering?: InputMaybe<PoolContributionOrdering>;
};

export type PoolContributionInput = {
  amount: Scalars['Union']['input'];
  assetId: Scalars['Union']['input'];
  contributor: Scalars['String']['input'];
  poolId: Scalars['Int']['input'];
};

export type PoolContributionOrdering = {
  amount?: InputMaybe<Scalars['Boolean']['input']>;
  amountDesc?: InputMaybe<Scalars['Boolean']['input']>;
  dateAdded?: InputMaybe<Scalars['Boolean']['input']>;
  dateAddedDesc?: InputMaybe<Scalars['Boolean']['input']>;
};

export type PoolContributionType = {
  __typename?: 'PoolContributionType';
  amount: Scalars['Float']['output'];
  assetId: Scalars['Int']['output'];
  contributor: UserType;
  dateAdded: Scalars['DateTime']['output'];
  id: Scalars['ID']['output'];
};

export type PoolFilter = {
  manager?: InputMaybe<Scalars['String']['input']>;
  name?: InputMaybe<Scalars['String']['input']>;
};

export type PoolFilterPoolOrderingListOptions = {
  filter?: InputMaybe<PoolFilter>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  ordering?: InputMaybe<PoolOrdering>;
};

export type PoolOrdering = {
  dateAdded?: InputMaybe<Scalars['Boolean']['input']>;
  dateAddedDesc?: InputMaybe<Scalars['Boolean']['input']>;
};

export type PoolType = {
  __typename?: 'PoolType';
  assets: Array<AlgorandStandardAssetType>;
  dateAdded: Scalars['DateTime']['output'];
  id: Scalars['ID']['output'];
  lastUpdated: Scalars['DateTime']['output'];
  manager: UserType;
  name: Scalars['String']['output'];
  netValue: Scalars['Float']['output'];
  totalContributions: Scalars['Int']['output'];
  totalContributors: Scalars['Int']['output'];
  totalLoanTemplates: Scalars['Int']['output'];
  totalLoansValue: Scalars['Float']['output'];
};


export type PoolTypeAssetsArgs = {
  opts?: InputMaybe<NoneTypeNoneTypeListOptions>;
};

export type ProfileType = {
  __typename?: 'ProfileType';
  email?: Maybe<Scalars['String']['output']>;
  firstName?: Maybe<Scalars['String']['output']>;
  id: Scalars['ID']['output'];
  lastName?: Maybe<Scalars['String']['output']>;
  user: UserType;
};

export type Query = {
  __typename?: 'Query';
  algorandStandardAssets: Array<AlgorandStandardAssetType>;
  loan: LoanType;
  loanTemplate: LoanTemplateType;
  loanTemplateCreators: Array<Maybe<Scalars['String']['output']>>;
  loanTemplates: Array<LoanTemplateType>;
  loans: Array<LoanType>;
  pool: PoolType;
  poolAssetHoldings: Array<PoolAssetHoldingsRecordType>;
  poolContributions: Array<PoolContributionType>;
  pools: Array<PoolType>;
  version: Scalars['String']['output'];
};


export type QueryAlgorandStandardAssetsArgs = {
  opts?: InputMaybe<AlgorandStandardAssetFilterNoneTypeListOptions>;
};


export type QueryLoanArgs = {
  loanId: Scalars['Int']['input'];
};


export type QueryLoanTemplateArgs = {
  templateId: Scalars['Int']['input'];
};


export type QueryLoanTemplateCreatorsArgs = {
  address?: InputMaybe<Scalars['String']['input']>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
};


export type QueryLoanTemplatesArgs = {
  opts?: InputMaybe<LoanTemplateFilterLoanTemplateOrderingListOptions>;
};


export type QueryLoansArgs = {
  opts?: InputMaybe<LoanFilterLoanOrderingListOptions>;
};


export type QueryPoolArgs = {
  poolId: Scalars['Int']['input'];
};


export type QueryPoolAssetHoldingsArgs = {
  opts?: InputMaybe<PoolAssetHoldingFilterPoolAssetHoldingOrderingListOptions>;
};


export type QueryPoolContributionsArgs = {
  opts?: InputMaybe<PoolContributionFilterPoolContributionOrderingListOptions>;
};


export type QueryPoolsArgs = {
  opts?: InputMaybe<PoolFilterPoolOrderingListOptions>;
};

export type UserType = {
  __typename?: 'UserType';
  address: Scalars['String']['output'];
  id: Scalars['ID']['output'];
  profile?: Maybe<ProfileType>;
};

export type NewLoanTemplateMutationVariables = Exact<{
  input: LoanTemplateInput;
}>;


export type NewLoanTemplateMutation = { __typename?: 'Mutation', newLoanTemplate: { __typename?: 'LoanTemplateType', id: number } };

export type CalculateLoanSpecificsMutationVariables = Exact<{
  args: LoanRequestInput;
}>;


export type CalculateLoanSpecificsMutation = { __typename?: 'Mutation', calculateLoanSpecifics: { __typename?: 'LoanType', id: string } };

export type UpdateLoanWithContractDetailsMutationVariables = Exact<{
  args: ContractLoanDetails;
  loanId: Scalars['Int']['input'];
}>;


export type UpdateLoanWithContractDetailsMutation = { __typename?: 'Mutation', updateLoanWithContractDetails: { __typename?: 'LoanType', id: string } };

export type NewPoolMutationVariables = Exact<{
  input: NewPoolInput;
}>;


export type NewPoolMutation = { __typename?: 'Mutation', newPool: { __typename?: 'PoolType', id: string, name: string, manager: { __typename?: 'UserType', address: string, id: string } } };

export type NewPoolContributionMutationVariables = Exact<{
  input: PoolContributionInput;
}>;


export type NewPoolContributionMutation = { __typename?: 'Mutation', newPoolContribution: { __typename?: 'PoolContributionType', id: string } };

export type AlgorandStandardAssetsQueryVariables = Exact<{
  opts?: InputMaybe<AlgorandStandardAssetFilterNoneTypeListOptions>;
}>;


export type AlgorandStandardAssetsQuery = { __typename?: 'Query', algorandStandardAssets: Array<{ __typename?: 'AlgorandStandardAssetType', imageUrl: string, id: number, decimals: number, assetId: any, unitName: string }> };

export type LoanQueryVariables = Exact<{
  loanId: Scalars['Int']['input'];
}>;


export type LoanQuery = { __typename?: 'Query', loan: { __typename?: 'LoanType', id: string, loanType: LoanEnumType, tenure: number, ipfsHash?: string | null, loanKey?: string | null, encodedId?: string | null, interestAssetAmount: any, principalAssetAmount: any, collateralAssetAmount: any, earlyPaymentPenaltyAmount: any, paymentRounds: number, paymentCompletionTimestamp: any, collateralPaid: boolean, principalPaid: boolean, dateAdded: any, lastUpdated: any, paymentRecipients: Array<{ __typename?: 'PaymentRecipientType', paymentPercentage: number, recipient: { __typename?: 'UserType', address: string, id: string } }>, principalAsset: { __typename?: 'AlgorandStandardAssetType', id: number, assetId: any, unitName: string, decimals: number, network: NetworkType, imageUrl: string }, collateralAsset: { __typename?: 'AlgorandStandardAssetType', id: number, assetId: any, unitName: string, decimals: number, network: NetworkType, imageUrl: string }, borrower: { __typename?: 'UserType', address: string, id: string }, borrowerIpfsAsset?: { __typename?: 'IPFSAssetType', id: number, ipfsHash: string } | null, lenderIpfsAsset?: { __typename?: 'IPFSAssetType', id: number, ipfsHash: string } | null } };

export type LoanTemplateQueryVariables = Exact<{
  templateId: Scalars['Int']['input'];
}>;


export type LoanTemplateQuery = { __typename?: 'Query', loanTemplate: { __typename?: 'LoanTemplateType', collateralPercentage: number, dateAdded: any, earlyRepaymentPenaltyPercentage: number, id: number, interestRate: number, lastUpdated: any, loanType: LoanEnumType, maxLoanAmount: any, maxLoanTenure: number, minLoanTenure: number, repaymentPeriods: number, asset: { __typename?: 'AlgorandStandardAssetType', imageUrl: string, id: number, decimals: number, assetId: any, name: string, network: NetworkType, unitName: string }, creator?: { __typename?: 'UserType', id: string, address: string } | null, pool?: { __typename?: 'PoolType', name: string, netValue: number, totalLoanTemplates: number, id: string } | null } };

export type LoanTemplatesQueryVariables = Exact<{
  opts?: InputMaybe<LoanTemplateFilterLoanTemplateOrderingListOptions>;
}>;


export type LoanTemplatesQuery = { __typename?: 'Query', loanTemplates: Array<{ __typename?: 'LoanTemplateType', collateralPercentage: number, id: number, interestRate: number, loanType: LoanEnumType, maxLoanTenure: number, minLoanTenure: number, earlyRepaymentPenaltyPercentage: number, dateAdded: any, repaymentPeriods: number, maxLoanAmount: any, asset: { __typename?: 'AlgorandStandardAssetType', imageUrl: string, assetId: any, id: number, name: string, unitName: string, decimals: number }, creator?: { __typename?: 'UserType', address: string, id: string } | null, pool?: { __typename?: 'PoolType', name: string, id: string, manager: { __typename?: 'UserType', address: string, id: string } } | null }> };

export type LoanCreatorsQueryVariables = Exact<{
  address?: InputMaybe<Scalars['String']['input']>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
}>;


export type LoanCreatorsQuery = { __typename?: 'Query', loanTemplateCreators: Array<string | null> };

export type PoolsQueryVariables = Exact<{
  assetOpts?: InputMaybe<NoneTypeNoneTypeListOptions>;
  opts?: InputMaybe<PoolFilterPoolOrderingListOptions>;
}>;


export type PoolsQuery = { __typename?: 'Query', pools: Array<{ __typename?: 'PoolType', name: string, totalLoanTemplates: number, netValue: number, id: string, totalContributors: number, assets: Array<{ __typename?: 'AlgorandStandardAssetType', imageUrl: string, unitName: string, id: number }> }> };

export type PoolQueryVariables = Exact<{
  poolId: Scalars['Int']['input'];
}>;


export type PoolQuery = { __typename?: 'Query', pool: { __typename?: 'PoolType', totalLoansValue: number, totalLoanTemplates: number, totalContributors: number, totalContributions: number, netValue: number, name: string, id: string, dateAdded: any, manager: { __typename?: 'UserType', id: string, address: string } } };


export const NewLoanTemplateDocument = gql`
    mutation NewLoanTemplate($input: LoanTemplateInput!) {
  newLoanTemplate(input: $input) {
    id
  }
}
    `;

export function useNewLoanTemplateMutation() {
  return Urql.useMutation<NewLoanTemplateMutation, NewLoanTemplateMutationVariables>(NewLoanTemplateDocument);
};
export const CalculateLoanSpecificsDocument = gql`
    mutation CalculateLoanSpecifics($args: LoanRequestInput!) {
  calculateLoanSpecifics(args: $args) {
    id
  }
}
    `;

export function useCalculateLoanSpecificsMutation() {
  return Urql.useMutation<CalculateLoanSpecificsMutation, CalculateLoanSpecificsMutationVariables>(CalculateLoanSpecificsDocument);
};
export const UpdateLoanWithContractDetailsDocument = gql`
    mutation UpdateLoanWithContractDetails($args: ContractLoanDetails!, $loanId: Int!) {
  updateLoanWithContractDetails(args: $args, loanId: $loanId) {
    id
  }
}
    `;

export function useUpdateLoanWithContractDetailsMutation() {
  return Urql.useMutation<UpdateLoanWithContractDetailsMutation, UpdateLoanWithContractDetailsMutationVariables>(UpdateLoanWithContractDetailsDocument);
};
export const NewPoolDocument = gql`
    mutation NewPool($input: NewPoolInput!) {
  newPool(input: $input) {
    manager {
      address
      id
    }
    id
    name
  }
}
    `;

export function useNewPoolMutation() {
  return Urql.useMutation<NewPoolMutation, NewPoolMutationVariables>(NewPoolDocument);
};
export const NewPoolContributionDocument = gql`
    mutation NewPoolContribution($input: PoolContributionInput!) {
  newPoolContribution(input: $input) {
    id
  }
}
    `;

export function useNewPoolContributionMutation() {
  return Urql.useMutation<NewPoolContributionMutation, NewPoolContributionMutationVariables>(NewPoolContributionDocument);
};
export const AlgorandStandardAssetsDocument = gql`
    query AlgorandStandardAssets($opts: AlgorandStandardAssetFilterNoneTypeListOptions) {
  algorandStandardAssets(opts: $opts) {
    imageUrl
    id
    decimals
    assetId
    unitName
  }
}
    `;

export function useAlgorandStandardAssetsQuery(options?: Omit<Urql.UseQueryArgs<AlgorandStandardAssetsQueryVariables>, 'query'>) {
  return Urql.useQuery<AlgorandStandardAssetsQuery, AlgorandStandardAssetsQueryVariables>({ query: AlgorandStandardAssetsDocument, ...options });
};
export const LoanDocument = gql`
    query Loan($loanId: Int!) {
  loan(loanId: $loanId) {
    id
    loanType
    tenure
    ipfsHash
    loanKey
    encodedId
    interestAssetAmount
    principalAssetAmount
    collateralAssetAmount
    earlyPaymentPenaltyAmount
    paymentRounds
    paymentCompletionTimestamp
    collateralPaid
    principalPaid
    dateAdded
    lastUpdated
    paymentRecipients {
      recipient {
        address
        id
      }
      paymentPercentage
    }
    principalAsset {
      id
      assetId
      unitName
      decimals
      network
      imageUrl
    }
    collateralAsset {
      id
      assetId
      unitName
      decimals
      network
      imageUrl
    }
    borrower {
      address
      id
    }
    borrowerIpfsAsset {
      id
      ipfsHash
    }
    lenderIpfsAsset {
      id
      ipfsHash
    }
  }
}
    `;

export function useLoanQuery(options: Omit<Urql.UseQueryArgs<LoanQueryVariables>, 'query'>) {
  return Urql.useQuery<LoanQuery, LoanQueryVariables>({ query: LoanDocument, ...options });
};
export const LoanTemplateDocument = gql`
    query LoanTemplate($templateId: Int!) {
  loanTemplate(templateId: $templateId) {
    asset {
      imageUrl
      id
      decimals
      assetId
      name
      network
      unitName
    }
    collateralPercentage
    creator {
      id
      address
    }
    dateAdded
    earlyRepaymentPenaltyPercentage
    id
    interestRate
    lastUpdated
    loanType
    maxLoanAmount
    maxLoanTenure
    minLoanTenure
    repaymentPeriods
    pool {
      name
      netValue
      totalLoanTemplates
      id
    }
  }
}
    `;

export function useLoanTemplateQuery(options: Omit<Urql.UseQueryArgs<LoanTemplateQueryVariables>, 'query'>) {
  return Urql.useQuery<LoanTemplateQuery, LoanTemplateQueryVariables>({ query: LoanTemplateDocument, ...options });
};
export const LoanTemplatesDocument = gql`
    query LoanTemplates($opts: LoanTemplateFilterLoanTemplateOrderingListOptions) {
  loanTemplates(opts: $opts) {
    asset {
      imageUrl
      assetId
      id
      name
      unitName
      decimals
    }
    collateralPercentage
    id
    interestRate
    loanType
    maxLoanTenure
    minLoanTenure
    creator {
      address
      id
    }
    earlyRepaymentPenaltyPercentage
    dateAdded
    repaymentPeriods
    pool {
      name
      id
      manager {
        address
        id
      }
    }
    maxLoanAmount
  }
}
    `;

export function useLoanTemplatesQuery(options?: Omit<Urql.UseQueryArgs<LoanTemplatesQueryVariables>, 'query'>) {
  return Urql.useQuery<LoanTemplatesQuery, LoanTemplatesQueryVariables>({ query: LoanTemplatesDocument, ...options });
};
export const LoanCreatorsDocument = gql`
    query LoanCreators($address: String, $limit: Int, $offset: Int) {
  loanTemplateCreators(address: $address, limit: $limit, offset: $offset)
}
    `;

export function useLoanCreatorsQuery(options?: Omit<Urql.UseQueryArgs<LoanCreatorsQueryVariables>, 'query'>) {
  return Urql.useQuery<LoanCreatorsQuery, LoanCreatorsQueryVariables>({ query: LoanCreatorsDocument, ...options });
};
export const PoolsDocument = gql`
    query Pools($assetOpts: NoneTypeNoneTypeListOptions, $opts: PoolFilterPoolOrderingListOptions) {
  pools(opts: $opts) {
    assets(opts: $assetOpts) {
      imageUrl
      unitName
      id
    }
    name
    totalLoanTemplates
    netValue
    id
    totalContributors
  }
}
    `;

export function usePoolsQuery(options?: Omit<Urql.UseQueryArgs<PoolsQueryVariables>, 'query'>) {
  return Urql.useQuery<PoolsQuery, PoolsQueryVariables>({ query: PoolsDocument, ...options });
};
export const PoolDocument = gql`
    query Pool($poolId: Int!) {
  pool(poolId: $poolId) {
    totalLoansValue
    totalLoanTemplates
    totalContributors
    totalContributions
    netValue
    name
    id
    dateAdded
    manager {
      id
      address
    }
  }
}
    `;

export function usePoolQuery(options: Omit<Urql.UseQueryArgs<PoolQueryVariables>, 'query'>) {
  return Urql.useQuery<PoolQuery, PoolQueryVariables>({ query: PoolDocument, ...options });
};