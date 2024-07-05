import { useToast } from "@/components/ui/use-toast";
import SUCCESS from "@/constants/toasts/success";
import { getMultiplierForDecimalPlaces } from "@/lib/utils/math";
import { ellipseText } from "@/lib/utils/text";
import {
  AlgorandStandardAssetsQuery,
  PoolsQuery,
  useNewPoolContributionMutation,
} from "@/services/graphql/generated";
import ERRORS from "@constants/toasts/errors";
import { useContractClients } from "@providers/contract";
import { useWallet } from "@txnlab/use-wallet";
import algosdk from "algosdk";
import React from "react";

interface FundPoolArgs {
  asset: AlgorandStandardAssetsQuery["algorandStandardAssets"][number];
  pool: PoolsQuery["pools"][number];
  amount: number;
  onSuccess?: CallableFunction;
}

const useFundPool = () => {
  const { activeAddress } = useWallet();
  const { authAndDaoClient, loanClient, algodClient } = useContractClients();
  const [contractProcessing, setContractProcessing] = React.useState(false);
  const [{ fetching }, recordPoolContribution] =
    useNewPoolContributionMutation();

  const { toast } = useToast();

  const fund = React.useCallback(
    async (args: FundPoolArgs) => {
      if (!activeAddress) {
        toast(ERRORS.WALLET_DISCONNECTED);
        return;
      }
      const encoder = new TextEncoder();
      setContractProcessing(true);
      const sp = await algodClient.getTransactionParams().do();
      const loanAppRef = await loanClient.appClient.getAppReference();
      const txn = algosdk.makeAssetTransferTxnWithSuggestedParamsFromObject({
        from: activeAddress,
        to: loanAppRef.appAddress,
        assetIndex: Number(args.asset.assetId),
        note: encoder.encode(
          `Contribution to (${ellipseText(args.pool.name, 10)})`,
        ),
        amount: Math.ceil(
          args.amount * getMultiplierForDecimalPlaces(args.asset.decimals),
        ),
        suggestedParams: sp,
      });
      try {
        const res = await authAndDaoClient.fundPool({ txn });
        setContractProcessing(false);
        if (res.return?.success) {
          const { error } = await recordPoolContribution({
            input: {
              amount: Number(res.return.amount),
              assetId: args.asset.assetId,
              poolId: Number(args.pool.id),
              contributor: activeAddress,
            },
          });
          const graphqlErrors = error?.graphQLErrors ?? [];
          if (graphqlErrors.length > 0) {
            graphqlErrors.map((err) => toast(ERRORS.SERVER_ERROR(err)));
          } else {
            toast(
              SUCCESS.POOL_CONTRIBUTION_COMPLETE(
                Number(res.return.amount) /
                getMultiplierForDecimalPlaces(args.asset.decimals),
                args.asset.unitName,
              ),
            );
            args.onSuccess && args.onSuccess();
          }
        }
      } catch (error) {
        console.log(error);
        setContractProcessing(false);
        toast(ERRORS.CONTRACT_CALL_FAILED);
      }
    },
    [
      activeAddress,
      algodClient,
      authAndDaoClient,
      loanClient,
      toast,
      recordPoolContribution,
    ],
  );

  return { fund, processing: fetching || contractProcessing };
};

export default useFundPool;
