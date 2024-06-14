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

export type CloudinaryImageType = {
  __typename?: 'CloudinaryImageType';
  dateAdded: Scalars['DateTime']['output'];
  description?: Maybe<Scalars['String']['output']>;
  id: Scalars['Int']['output'];
  lastUpdated: Scalars['DateTime']['output'];
  publicId: Scalars['String']['output'];
  secureUrl: Scalars['String']['output'];
};

export enum LoanEnumType {
  Dao = 'DAO',
  P2P = 'P2P',
  Zaibatsu = 'ZAIBATSU'
}

export type LoanRequestInput = {
  borrowerAddress: Scalars['String']['input'];
  collateralAssetId: Scalars['Int']['input'];
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
  collateralAsset: AlgorandStandardAssetType;
  collateralAssetAmount: Scalars['Int']['output'];
  collateralPaid: Scalars['Boolean']['output'];
  dateAdded: Scalars['DateTime']['output'];
  earlyPaymentPenaltyAmount: Scalars['Int']['output'];
  id: Scalars['Int']['output'];
  image?: Maybe<CloudinaryImageType>;
  interestAssetAmount: Scalars['Int']['output'];
  lastUpdated: Scalars['DateTime']['output'];
  lendAssetAmount: Scalars['Int']['output'];
  loanType: LoanEnumType;
  paymentCompletionTimestamp: Scalars['Union']['output'];
  paymentRecipients: Array<PaymentRecipientType>;
  paymentRounds: Scalars['Int']['output'];
  principalAsset: AlgorandStandardAssetType;
  principalPaid: Scalars['Boolean']['output'];
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

export enum NetworkType {
  Betanet = 'BETANET',
  Mainnet = 'MAINNET',
  Testnet = 'TESTNET'
}

export type NewPoolInput = {
  initialContribution: PoolContributionInput;
  name: Scalars['String']['input'];
};

export type PaymentRecipientFilter = {
  loanId?: InputMaybe<Scalars['Int']['input']>;
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
  amount: Scalars['Int']['input'];
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
  dateAdded: Scalars['DateTime']['output'];
  id: Scalars['ID']['output'];
  lastUpdated: Scalars['DateTime']['output'];
  manager: UserType;
  name: Scalars['String']['output'];
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
  loanTemplate: LoanTemplateType;
  loanTemplateCreators: Array<Maybe<Scalars['String']['output']>>;
  loanTemplates: Array<LoanTemplateType>;
  pool: PoolType;
  poolAssetHoldings: Array<PoolAssetHoldingsRecordType>;
  poolContributions: Array<PoolContributionType>;
  pools: Array<PoolType>;
  version: Scalars['String']['output'];
};


export type QueryAlgorandStandardAssetsArgs = {
  opts?: InputMaybe<AlgorandStandardAssetFilterNoneTypeListOptions>;
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

export type AlgorandStandardAssetsQueryVariables = Exact<{
  opts?: InputMaybe<AlgorandStandardAssetFilterNoneTypeListOptions>;
}>;


export type AlgorandStandardAssetsQuery = { __typename?: 'Query', algorandStandardAssets: Array<{ __typename?: 'AlgorandStandardAssetType', imageUrl: string, id: number, assetId: any, unitName: string }> };

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
export const AlgorandStandardAssetsDocument = gql`
    query AlgorandStandardAssets($opts: AlgorandStandardAssetFilterNoneTypeListOptions) {
  algorandStandardAssets(opts: $opts) {
    imageUrl
    id
    assetId
    unitName
  }
}
    `;

export function useAlgorandStandardAssetsQuery(options?: Omit<Urql.UseQueryArgs<AlgorandStandardAssetsQueryVariables>, 'query'>) {
  return Urql.useQuery<AlgorandStandardAssetsQuery, AlgorandStandardAssetsQueryVariables>({ query: AlgorandStandardAssetsDocument, ...options });
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