import React from "react";
import algosdk from "algosdk";
import {
  WalletProvider,
  useInitializeProviders,
  PROVIDER_ID,
} from "@txnlab/use-wallet";
import { DeflyWalletConnect } from "@blockshake/defly-connect";
import { PeraWalletConnect } from "@perawallet/connect";
import { DaffiWalletConnect } from "@daffiwallet/connect";
import { WalletConnectModalSign } from "@walletconnect/modal-sign-html";
import { getAlgodConfigFromEnvironment, getEnv } from "@lib/utils";

interface Props {
  children?: React.ReactNode;
}

const Provider: React.FC<Props> = ({ children }) => {
  const env = getEnv();
  const algoConfig = getAlgodConfigFromEnvironment();
  const providers = useInitializeProviders({
    providers:
      env?.ALGORAND_ALGOD_NETWORK === ""
        ? [{ id: PROVIDER_ID.KMD }]
        : [
            { id: PROVIDER_ID.DEFLY, clientStatic: DeflyWalletConnect },
            { id: PROVIDER_ID.PERA, clientStatic: PeraWalletConnect },
            { id: PROVIDER_ID.DAFFI, clientStatic: DaffiWalletConnect },
            {
              id: PROVIDER_ID.WALLETCONNECT,
              clientStatic: WalletConnectModalSign,
              clientOptions: {
                projectId: env?.WALLET_CONNECT_PROJECT_ID ?? "",
                metadata: {
                  name: env?.WALLET_CONNECT_PROJECT_NAME ?? "",
                  description: env?.WALLET_CONNECT_PROJECT_DESCRIPTION ?? "",
                  url: env?.WALLET_CONNECT_PROJECT_URL ?? "",
                  icons: [env?.WALLET_CONNECT_PROJECT_ICON_URL ?? ""],
                },
                modalOptions: env?.WALLET_CONNECT_PROJECT_THEME ?? "light",
              },
            },
            { id: PROVIDER_ID.EXODUS },
          ],
    nodeConfig: algoConfig,
    algosdkStatic: algosdk,
  });

  return <WalletProvider value={providers}>{children}</WalletProvider>;
};

export default Provider;
