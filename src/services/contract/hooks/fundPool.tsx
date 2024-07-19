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
  const { activeAddress, getAccountInfo } = useWallet();
  const { authAndDaoClient, loanClient, algodClient } = useContractClients();
  const [contractProcessing, setContractProcessing] = React.useState(false);
  const [{ fetching }, recordPoolContribution] = useNewPoolContributionMutation();

  const { toast } = useToast();

  const fund = React.useCallback(
    async (args: FundPoolArgs) => {
      if (!activeAddress) {
        toast(ERRORS.WALLET_DISCONNECTED);
        return;
      }
      const encoder = new TextEncoder(); const fundAmount = Math.ceil(
        args.amount * getMultiplierForDecimalPlaces(args.asset.decimals),
      );
      setContractProcessing(true);
      const poolAsset = await (async () => {
        const info = await getAccountInfo();
        const poolAsset = info.assets?.find((item) => {
          const id = item["asset-id"];
          return id === Number(args.pool.poolAssetId);
        });
        return poolAsset;
      })();

      const sp = await algodClient.getTransactionParams().do();
      const loanAppRef = await loanClient.appClient.getAppReference();
      const daoAppRef = await authAndDaoClient.appClient.getAppReference();

      if (!poolAsset) {
        try {
          const txn = algosdk.makeAssetTransferTxnWithSuggestedParamsFromObject({
            from: activeAddress,
            to: activeAddress,
            assetIndex: Number(args.pool.poolAssetId),
            note: encoder.encode(`OptIn to ${ellipseText(args.pool.name, 10)}'s asset`),
            amount: 0,
            suggestedParams: sp,
          });
          await authAndDaoClient.optinPoolAsset({ optinTxn: txn, poolKey: args.pool.poolKey });
        } catch (e) {
          console.log({ e });
          setContractProcessing(false);
        }
      }

      const txn = algosdk.makeAssetTransferTxnWithSuggestedParamsFromObject({
        from: activeAddress,
        to: loanAppRef.appAddress,
        assetIndex: Number(args.asset.assetId),
        note: encoder.encode(`Contribution to (${ellipseText(args.pool.name, 10)})`),
        amount: fundAmount,
        suggestedParams: sp,
      });

      try {
        const res = await authAndDaoClient.fundPool(
          {
            txn,
            poolAsset: Number(args.pool.poolAssetId),
            poolKey: args.pool.poolKey,
            fundAmount,
            userAccount: activeAddress,
            folksFeedOracle: Number(process.env.NEXT_PUBLIC_FOLKS_FEED_ORACLE_APP_ID ?? ""),
            assetDecimalsMultiplier: getMultiplierForDecimalPlaces(args.asset.decimals),
          },
          { boxes: [{ appId: daoAppRef.appId, name: args.pool.poolKey }] },
        );
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
                Number(res.return.amount) / getMultiplierForDecimalPlaces(args.asset.decimals),
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
      getAccountInfo,
      recordPoolContribution,
    ],
  );

  return { fund, processing: fetching || contractProcessing };
};

export default useFundPool;
