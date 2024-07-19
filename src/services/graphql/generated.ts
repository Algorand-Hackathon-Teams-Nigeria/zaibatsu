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
  Upload: { input: any; output: any; }
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
  borrowerNftAssetId: Scalars['Union']['input'];
  collateralAssetAmount: Scalars['Union']['input'];
  collateralAssetId: Scalars['Union']['input'];
  collateralPaid: Scalars['Boolean']['input'];
  completedPaymentRounds: Scalars['Int']['input'];
  earlyPaymentPenaltyAmount: Scalars['Union']['input'];
  interestAssetAmount: Scalars['Union']['input'];
  lenderNftAssetId: Scalars['Union']['input'];
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

export type InitiateLoanPaymentRoundInput = {
  loanKey: Scalars['String']['input'];
  repaymentKey: Scalars['String']['input'];
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
  lenderAddress?: InputMaybe<Scalars['String']['input']>;
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

export type LoanRepaymentInfoType = {
  __typename?: 'LoanRepaymentInfoType';
  amount: Scalars['Union']['output'];
  completedRounds: Scalars['Int']['output'];
  paymentRounds: Scalars['Int']['output'];
};

export type LoanRequestInput = {
  borrowerAddress: Scalars['String']['input'];
  collateralAssetId: Scalars['Union']['input'];
  loanId?: InputMaybe<Scalars['Int']['input']>;
  loanType: LoanEnumType;
  principalAmount: Scalars['Int']['input'];
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
  collateralPercentage: Scalars['Float']['input'];
  creatorAddress?: InputMaybe<Scalars['String']['input']>;
  earlyRepaymentPenaltyPercentage?: InputMaybe<Scalars['Float']['input']>;
  interestRate: Scalars['Float']['input'];
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
  paymentComplete: Scalars['Boolean']['output'];
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
  createUpdatePoolLoanTemplateProposal: PoolLoanTemplateProposalType;
  initiateLoanPaymentRound: PendingLoanRoundPaymentType;
  newLoanTemplate: LoanTemplateType;
  newPool: PoolType;
  newPoolContribution: PoolContributionType;
  newPoolLoanTemplateProposalVote: PoolLoanTemplateProposalVoteType;
  saveAlgorandAstandardAsset: AlgorandStandardAssetType;
  updateLoanWithContractDetails: LoanType;
  updloadImage: Scalars['String']['output'];
};


export type MutationCalculateLoanSpecificsArgs = {
  args: LoanRequestInput;
};


export type MutationCreateUpdatePoolLoanTemplateProposalArgs = {
  input: PoolLoanTemplateProposalInput;
};


export type MutationInitiateLoanPaymentRoundArgs = {
  input: InitiateLoanPaymentRoundInput;
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


export type MutationNewPoolLoanTemplateProposalVoteArgs = {
  input: PoolLoanTemplateProposalVoteInput;
};


export type MutationSaveAlgorandAstandardAssetArgs = {
  args: AlgorandStandardAssetInput;
};


export type MutationUpdateLoanWithContractDetailsArgs = {
  args: ContractLoanDetails;
  loanId: Scalars['Int']['input'];
};


export type MutationUpdloadImageArgs = {
  image: Scalars['Upload']['input'];
};

export enum NetworkType {
  Betanet = 'BETANET',
  Mainnet = 'MAINNET',
  Testnet = 'TESTNET'
}

export type NewPoolInput = {
  creatorAddress: Scalars['String']['input'];
  imageUrl: Scalars['String']['input'];
  maxContributors: Scalars['Int']['input'];
  name: Scalars['String']['input'];
  poolAssetId: Scalars['Union']['input'];
  poolKey: Scalars['String']['input'];
  tokenAssetName: Scalars['String']['input'];
  tokenBalance: Scalars['Union']['input'];
  tokenUnitName: Scalars['String']['input'];
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

export type PendingLoanRoundPaymentType = {
  __typename?: 'PendingLoanRoundPaymentType';
  completed: Scalars['Boolean']['output'];
  dateAdded: Scalars['DateTime']['output'];
  id: Scalars['ID']['output'];
  lastUpdated: Scalars['DateTime']['output'];
  loanKey: Scalars['String']['output'];
  percentagePaid: Scalars['Int']['output'];
  recipients: Array<PaymentRecipientType>;
  repaymentAmount: Scalars['Int']['output'];
  repaymentKey: Scalars['String']['output'];
};


export type PendingLoanRoundPaymentTypeRecipientsArgs = {
  args?: InputMaybe<PaymentRecipientFilterPaymentRecipientOrderingListOptions>;
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

export type PoolLoanTemplateProposalFilter = {
  open?: InputMaybe<Scalars['Boolean']['input']>;
  poolId: Scalars['ID']['input'];
};

export type PoolLoanTemplateProposalFilterPoolLoanTemplateProposalOrderingListOptions = {
  filter?: InputMaybe<PoolLoanTemplateProposalFilter>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  ordering?: InputMaybe<PoolLoanTemplateProposalOrdering>;
};

export type PoolLoanTemplateProposalInput = {
  endTime: Scalars['DateTime']['input'];
  open?: InputMaybe<Scalars['Boolean']['input']>;
  poolId: Scalars['ID']['input'];
  proposalId?: InputMaybe<Scalars['ID']['input']>;
  senderAddress: Scalars['String']['input'];
  startTime: Scalars['DateTime']['input'];
};

export type PoolLoanTemplateProposalOrdering = {
  dateAdded?: InputMaybe<Scalars['Boolean']['input']>;
  dateAddedDesc?: InputMaybe<Scalars['Boolean']['input']>;
  lastUpdated?: InputMaybe<Scalars['Boolean']['input']>;
  lastUpdatedDesc?: InputMaybe<Scalars['Boolean']['input']>;
  totalVotes?: InputMaybe<Scalars['Boolean']['input']>;
  totalVotesDesc?: InputMaybe<Scalars['Boolean']['input']>;
};

export type PoolLoanTemplateProposalType = {
  __typename?: 'PoolLoanTemplateProposalType';
  dateAdded: Scalars['DateTime']['output'];
  endTime: Scalars['DateTime']['output'];
  id: Scalars['ID']['output'];
  lastUpdated: Scalars['DateTime']['output'];
  open: Scalars['Boolean']['output'];
  startTime: Scalars['DateTime']['output'];
  totalVotes: Scalars['Int']['output'];
};

export type PoolLoanTemplateProposalVoteInput = {
  assetId: Scalars['Union']['input'];
  collateralPercentage: Scalars['Float']['input'];
  earlyRepaymentPenaltyPercentage: Scalars['Float']['input'];
  interestRate: Scalars['Float']['input'];
  maxLoanAmount: Scalars['Int']['input'];
  maxLoanTenure: Scalars['Int']['input'];
  minLoanTenure: Scalars['Int']['input'];
  multiplier: Scalars['Int']['input'];
  proposalId: Scalars['ID']['input'];
  repaymentPeriods: Scalars['Int']['input'];
  voterAddress: Scalars['String']['input'];
};

export type PoolLoanTemplateProposalVoteType = {
  __typename?: 'PoolLoanTemplateProposalVoteType';
  assetId: Scalars['Union']['output'];
  collateralPercentage: Scalars['Float']['output'];
  dateAdded: Scalars['DateTime']['output'];
  earlyRepaymentPenaltyPercentage: Scalars['Float']['output'];
  id: Scalars['ID']['output'];
  interestRate: Scalars['Float']['output'];
  lastUpdated: Scalars['DateTime']['output'];
  maxLoanAmount: Scalars['Int']['output'];
  maxLoanTenure: Scalars['Int']['output'];
  minLoanTenure: Scalars['Int']['output'];
  multiplier: Scalars['Int']['output'];
  repaymentPeriods: Scalars['Int']['output'];
  voterAddress: Scalars['String']['output'];
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
  imageUrl: Scalars['String']['output'];
  lastUpdated: Scalars['DateTime']['output'];
  manager: UserType;
  maxContributors: Scalars['Int']['output'];
  name: Scalars['String']['output'];
  netValue: Scalars['Float']['output'];
  poolAssetId: Scalars['Union']['output'];
  poolKey: Scalars['String']['output'];
  tokenAssetName: Scalars['String']['output'];
  tokenBalance: Scalars['Union']['output'];
  tokenUnitName: Scalars['String']['output'];
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
  loanRepaymentInfo: LoanRepaymentInfoType;
  loanTemplate: LoanTemplateType;
  loanTemplateCreators: Array<Maybe<Scalars['String']['output']>>;
  loanTemplates: Array<LoanTemplateType>;
  loans: Array<LoanType>;
  pool: PoolType;
  poolAssetHoldings: Array<PoolAssetHoldingsRecordType>;
  poolContributions: Array<PoolContributionType>;
  poolTemplateProposals: Array<PoolLoanTemplateProposalType>;
  pools: Array<PoolType>;
  version: Scalars['String']['output'];
};


export type QueryAlgorandStandardAssetsArgs = {
  opts?: InputMaybe<AlgorandStandardAssetFilterNoneTypeListOptions>;
};


export type QueryLoanArgs = {
  loanId: Scalars['Int']['input'];
};


export type QueryLoanRepaymentInfoArgs = {
  loanId: Scalars['Union']['input'];
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
  poolId: Scalars['ID']['input'];
};


export type QueryPoolAssetHoldingsArgs = {
  opts?: InputMaybe<PoolAssetHoldingFilterPoolAssetHoldingOrderingListOptions>;
};


export type QueryPoolContributionsArgs = {
  opts?: InputMaybe<PoolContributionFilterPoolContributionOrderingListOptions>;
};


export type QueryPoolTemplateProposalsArgs = {
  opts: PoolLoanTemplateProposalFilterPoolLoanTemplateProposalOrderingListOptions;
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

export type InitiateLoanPaymentRoundMutationVariables = Exact<{
  input: InitiateLoanPaymentRoundInput;
}>;


export type InitiateLoanPaymentRoundMutation = { __typename?: 'Mutation', initiateLoanPaymentRound: { __typename?: 'PendingLoanRoundPaymentType', id: string, percentagePaid: number } };

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

export type CreateUpdatePoolLoanTemplateProposalMutationVariables = Exact<{
  input: PoolLoanTemplateProposalInput;
}>;


export type CreateUpdatePoolLoanTemplateProposalMutation = { __typename?: 'Mutation', createUpdatePoolLoanTemplateProposal: { __typename?: 'PoolLoanTemplateProposalType', id: string } };

export type NewPoolLoanTemplateProposalVoteMutationVariables = Exact<{
  input: PoolLoanTemplateProposalVoteInput;
}>;


export type NewPoolLoanTemplateProposalVoteMutation = { __typename?: 'Mutation', newPoolLoanTemplateProposalVote: { __typename?: 'PoolLoanTemplateProposalVoteType', assetId: any } };

export type UpdloadImageMutationVariables = Exact<{
  image: Scalars['Upload']['input'];
}>;


export type UpdloadImageMutation = { __typename?: 'Mutation', updloadImage: string };

export type AlgorandStandardAssetsQueryVariables = Exact<{
  opts?: InputMaybe<AlgorandStandardAssetFilterNoneTypeListOptions>;
}>;


export type AlgorandStandardAssetsQuery = { __typename?: 'Query', algorandStandardAssets: Array<{ __typename?: 'AlgorandStandardAssetType', imageUrl: string, id: number, decimals: number, assetId: any, unitName: string }> };

export type LoanRepaymentInfoQueryVariables = Exact<{
  loanId: Scalars['Union']['input'];
}>;


export type LoanRepaymentInfoQuery = { __typename?: 'Query', loanRepaymentInfo: { __typename?: 'LoanRepaymentInfoType', amount: any, completedRounds: number, paymentRounds: number } };

export type LoansQueryVariables = Exact<{
  opts?: InputMaybe<LoanFilterLoanOrderingListOptions>;
}>;


export type LoansQuery = { __typename?: 'Query', loans: Array<{ __typename?: 'LoanType', collateralAssetAmount: any, dateAdded: any, earlyPaymentPenaltyAmount: any, encodedId?: string | null, id: string, principalPaid: boolean, interestAssetAmount: any, lastUpdated: any, loanType: LoanEnumType, principalAssetAmount: any, tenure: number, paymentRounds: number, completedPaymentRounds: number, borrower: { __typename?: 'UserType', address: string, id: string }, collateralAsset: { __typename?: 'AlgorandStandardAssetType', assetId: any, decimals: number, id: number, imageUrl: string, name: string, unitName: string }, principalAsset: { __typename?: 'AlgorandStandardAssetType', assetId: any, decimals: number, id: number, imageUrl: string, name: string, unitName: string }, borrowerNftAsset?: { __typename?: 'AlgorandStandardAssetType', assetId: any, unitName: string, id: number, network: NetworkType } | null, lenderNftAsset?: { __typename?: 'AlgorandStandardAssetType', assetId: any, id: number, network: NetworkType, unitName: string } | null }> };

export type LoanQueryVariables = Exact<{
  loanId: Scalars['Int']['input'];
}>;


export type LoanQuery = { __typename?: 'Query', loan: { __typename?: 'LoanType', id: string, loanType: LoanEnumType, tenure: number, ipfsHash?: string | null, loanKey?: string | null, encodedId?: string | null, interestAssetAmount: any, principalAssetAmount: any, collateralAssetAmount: any, earlyPaymentPenaltyAmount: any, paymentRounds: number, completedPaymentRounds: number, paymentCompletionTimestamp: any, collateralPaid: boolean, principalPaid: boolean, dateAdded: any, lastUpdated: any, paymentRecipients: Array<{ __typename?: 'PaymentRecipientType', paymentPercentage: number, recipient: { __typename?: 'UserType', address: string, id: string } }>, principalAsset: { __typename?: 'AlgorandStandardAssetType', id: number, assetId: any, unitName: string, decimals: number, network: NetworkType, imageUrl: string }, collateralAsset: { __typename?: 'AlgorandStandardAssetType', id: number, assetId: any, unitName: string, decimals: number, network: NetworkType, imageUrl: string }, borrower: { __typename?: 'UserType', address: string, id: string }, borrowerIpfsAsset?: { __typename?: 'IPFSAssetType', id: number, ipfsHash: string } | null, lenderIpfsAsset?: { __typename?: 'IPFSAssetType', id: number, ipfsHash: string } | null } };

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

export type PoolTemplateProposalsQueryVariables = Exact<{
  opts: PoolLoanTemplateProposalFilterPoolLoanTemplateProposalOrderingListOptions;
}>;


export type PoolTemplateProposalsQuery = { __typename?: 'Query', poolTemplateProposals: Array<{ __typename?: 'PoolLoanTemplateProposalType', id: string, startTime: any, endTime: any, totalVotes: number, open: boolean, dateAdded: any, lastUpdated: any }> };

export type PoolsQueryVariables = Exact<{
  assetOpts?: InputMaybe<NoneTypeNoneTypeListOptions>;
  opts?: InputMaybe<PoolFilterPoolOrderingListOptions>;
}>;


export type PoolsQuery = { __typename?: 'Query', pools: Array<{ __typename?: 'PoolType', name: string, poolKey: string, poolAssetId: any, totalLoanTemplates: number, netValue: number, id: string, totalContributors: number, assets: Array<{ __typename?: 'AlgorandStandardAssetType', imageUrl: string, unitName: string, id: number }> }> };

export type PoolQueryVariables = Exact<{
  poolId: Scalars['ID']['input'];
}>;


export type PoolQuery = { __typename?: 'Query', pool: { __typename?: 'PoolType', totalLoansValue: number, totalLoanTemplates: number, totalContributors: number, totalContributions: number, netValue: number, name: string, id: string, imageUrl: string, poolKey: string, poolAssetId: any, tokenUnitName: string, tokenAssetName: string, dateAdded: any, manager: { __typename?: 'UserType', id: string, address: string } } };


export const InitiateLoanPaymentRoundDocument = gql`
    mutation InitiateLoanPaymentRound($input: InitiateLoanPaymentRoundInput!) {
  initiateLoanPaymentRound(input: $input) {
    id
    percentagePaid
  }
}
    `;

export function useInitiateLoanPaymentRoundMutation() {
  return Urql.useMutation<InitiateLoanPaymentRoundMutation, InitiateLoanPaymentRoundMutationVariables>(InitiateLoanPaymentRoundDocument);
};
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
export const CreateUpdatePoolLoanTemplateProposalDocument = gql`
    mutation CreateUpdatePoolLoanTemplateProposal($input: PoolLoanTemplateProposalInput!) {
  createUpdatePoolLoanTemplateProposal(input: $input) {
    id
  }
}
    `;

export function useCreateUpdatePoolLoanTemplateProposalMutation() {
  return Urql.useMutation<CreateUpdatePoolLoanTemplateProposalMutation, CreateUpdatePoolLoanTemplateProposalMutationVariables>(CreateUpdatePoolLoanTemplateProposalDocument);
};
export const NewPoolLoanTemplateProposalVoteDocument = gql`
    mutation NewPoolLoanTemplateProposalVote($input: PoolLoanTemplateProposalVoteInput!) {
  newPoolLoanTemplateProposalVote(input: $input) {
    assetId
  }
}
    `;

export function useNewPoolLoanTemplateProposalVoteMutation() {
  return Urql.useMutation<NewPoolLoanTemplateProposalVoteMutation, NewPoolLoanTemplateProposalVoteMutationVariables>(NewPoolLoanTemplateProposalVoteDocument);
};
export const UpdloadImageDocument = gql`
    mutation UpdloadImage($image: Upload!) {
  updloadImage(image: $image)
}
    `;

export function useUpdloadImageMutation() {
  return Urql.useMutation<UpdloadImageMutation, UpdloadImageMutationVariables>(UpdloadImageDocument);
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
export const LoanRepaymentInfoDocument = gql`
    query LoanRepaymentInfo($loanId: Union!) {
  loanRepaymentInfo(loanId: $loanId) {
    amount
    completedRounds
    paymentRounds
  }
}
    `;

export function useLoanRepaymentInfoQuery(options: Omit<Urql.UseQueryArgs<LoanRepaymentInfoQueryVariables>, 'query'>) {
  return Urql.useQuery<LoanRepaymentInfoQuery, LoanRepaymentInfoQueryVariables>({ query: LoanRepaymentInfoDocument, ...options });
};
export const LoansDocument = gql`
    query Loans($opts: LoanFilterLoanOrderingListOptions) {
  loans(opts: $opts) {
    borrower {
      address
      id
    }
    collateralAsset {
      assetId
      decimals
      id
      imageUrl
      name
      unitName
    }
    collateralAssetAmount
    dateAdded
    earlyPaymentPenaltyAmount
    encodedId
    id
    principalPaid
    interestAssetAmount
    lastUpdated
    loanType
    principalAsset {
      assetId
      decimals
      id
      imageUrl
      name
      unitName
    }
    principalAssetAmount
    tenure
    borrowerNftAsset {
      assetId
      unitName
      id
      network
    }
    lenderNftAsset {
      assetId
      id
      network
      unitName
    }
    paymentRounds
    completedPaymentRounds
  }
}
    `;

export function useLoansQuery(options?: Omit<Urql.UseQueryArgs<LoansQueryVariables>, 'query'>) {
  return Urql.useQuery<LoansQuery, LoansQueryVariables>({ query: LoansDocument, ...options });
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
    completedPaymentRounds
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
export const PoolTemplateProposalsDocument = gql`
    query PoolTemplateProposals($opts: PoolLoanTemplateProposalFilterPoolLoanTemplateProposalOrderingListOptions!) {
  poolTemplateProposals(opts: $opts) {
    id
    startTime
    endTime
    totalVotes
    open
    dateAdded
    lastUpdated
  }
}
    `;

export function usePoolTemplateProposalsQuery(options: Omit<Urql.UseQueryArgs<PoolTemplateProposalsQueryVariables>, 'query'>) {
  return Urql.useQuery<PoolTemplateProposalsQuery, PoolTemplateProposalsQueryVariables>({ query: PoolTemplateProposalsDocument, ...options });
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
    poolKey
    poolAssetId
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
    query Pool($poolId: ID!) {
  pool(poolId: $poolId) {
    totalLoansValue
    totalLoanTemplates
    totalContributors
    totalContributions
    netValue
    name
    id
    imageUrl
    poolKey
    poolAssetId
    tokenUnitName
    tokenAssetName
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