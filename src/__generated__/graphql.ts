/* eslint-disable */
export type Maybe<T> = T | null;
export type InputMaybe<T> = Maybe<T>;
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]?: Maybe<T[SubKey]> };
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]: Maybe<T[SubKey]> };
export type MakeEmpty<T extends { [key: string]: unknown }, K extends keyof T> = { [_ in K]?: never };
export type Incremental<T> = T | { [P in keyof T]?: P extends ' $fragmentName' | '__typename' ? T[P] : never };
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: { input: string; output: string; }
  String: { input: string; output: string; }
  Boolean: { input: boolean; output: boolean; }
  Int: { input: number; output: number; }
  Float: { input: number; output: number; }
  /** Date with time (isoformat) */
  DateTime: { input: any; output: any; }
  /** BigInt field */
  Union: { input: any; output: any; }
};

export type AveragePoolMetrics = {
  __typename?: 'AveragePoolMetrics';
  collateralPercentage: Scalars['Float']['output'];
  interestRate: Scalars['Float']['output'];
};

export type Mutation = {
  __typename?: 'Mutation';
  newPool: PoolType;
  newPoolContribution: PoolContributionType;
};


export type MutationNewPoolArgs = {
  input: PoolInputType;
};


export type MutationNewPoolContributionArgs = {
  input: PoolContributionInput;
};

export type PoolAssetHoldingsRecordFilter = {
  assetId?: InputMaybe<Scalars['String']['input']>;
  poolKey?: InputMaybe<Scalars['String']['input']>;
};

export type PoolAssetHoldingsRecordFilterPoolAssetHoldingsRecordOrderingListOptions = {
  filter?: InputMaybe<PoolAssetHoldingsRecordFilter>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  ordering?: InputMaybe<PoolAssetHoldingsRecordOrdering>;
};

export type PoolAssetHoldingsRecordOrdering = {
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
  key: Scalars['String']['output'];
  lastUpdated: Scalars['DateTime']['output'];
  payouts: Scalars['Float']['output'];
  pool: PoolType;
};

export type PoolContributionFilter = {
  assetId?: InputMaybe<Scalars['Int']['input']>;
  contributionSeason?: InputMaybe<Scalars['Int']['input']>;
  contributor?: InputMaybe<Scalars['String']['input']>;
  poolKey?: InputMaybe<Scalars['String']['input']>;
  refunded?: InputMaybe<Scalars['Boolean']['input']>;
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
  contractLastUpdate: Scalars['Union']['input'];
  contributionKey: Scalars['String']['input'];
  contributor: Scalars['String']['input'];
  poolAssetHoldingsKey: Scalars['String']['input'];
  poolKey: Scalars['String']['input'];
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
  contractLastUpdate: Scalars['Int']['output'];
  contributionSeason: Scalars['Int']['output'];
  contributor: UserType;
  dateAdded: Scalars['DateTime']['output'];
  id: Scalars['ID']['output'];
  key: Scalars['String']['output'];
  refunded: Scalars['Boolean']['output'];
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

export type PoolInputType = {
  collateralPercentage: Scalars['Float']['input'];
  dateCreated: Scalars['Union']['input'];
  interestRate: Scalars['Float']['input'];
  key: Scalars['String']['input'];
  manager: Scalars['String']['input'];
  name: Scalars['String']['input'];
};

export type PoolOrdering = {
  collateralPercentage?: InputMaybe<Scalars['Boolean']['input']>;
  collateralPercentageDesc?: InputMaybe<Scalars['Boolean']['input']>;
  dateCreated?: InputMaybe<Scalars['Boolean']['input']>;
  dateCreatedDesc?: InputMaybe<Scalars['Boolean']['input']>;
  interestRate?: InputMaybe<Scalars['Boolean']['input']>;
  interestRateDesc?: InputMaybe<Scalars['Boolean']['input']>;
};

export type PoolType = {
  __typename?: 'PoolType';
  collateralPercentage: Scalars['Float']['output'];
  dateAdded: Scalars['DateTime']['output'];
  dateCreated: Scalars['Union']['output'];
  id: Scalars['ID']['output'];
  interestRate: Scalars['Float']['output'];
  key: Scalars['String']['output'];
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
  averagePoolMetrics: AveragePoolMetrics;
  poolAssetHoldingsRecords: Array<PoolAssetHoldingsRecordType>;
  poolContributions: Array<PoolContributionType>;
  pools: Array<PoolType>;
  version: Scalars['String']['output'];
};


export type QueryPoolAssetHoldingsRecordsArgs = {
  opts?: InputMaybe<PoolAssetHoldingsRecordFilterPoolAssetHoldingsRecordOrderingListOptions>;
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
