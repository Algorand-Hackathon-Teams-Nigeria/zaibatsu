"use client";

import { ZaibatsuServiceClient } from "@/services/contract/zaibatsuClient";
import { useWallet } from "@txnlab/use-wallet";
import { Algodv2 } from "algosdk";
import React from "react";

const createAlgodClient = () => {
  const ALGOD_TOKEN = process.env.NEXT_PUBLIC_ALGOD_TOKEN ?? "";
  const ALGOD_SERVER = process.env.NEXT_PUBLIC_ALGOD_SERVER ?? "";

  const algodClient = new Algodv2(ALGOD_TOKEN, ALGOD_SERVER);
  return algodClient;
};

const algodClient = createAlgodClient();
const appClient = new ZaibatsuServiceClient(
  {
    id: Number(process.env.NEXT_PUBLIC_CONTRACT_APPLICATION_ID ?? ""),
    resolveBy: "id",
  },
  algodClient
);

const ContractClientsContext = React.createContext({ algodClient, appClient });

interface Props {
  children?: React.ReactNode;
}

export const ContractClientsProvider: React.FC<Props> = ({ children }) => {
  const { activeAddress, signer } = useWallet();
  const newAlgodClient = React.useMemo(() => {
    return createAlgodClient();
  }, []);
  const newAppClient = React.useMemo(() => {
    return new ZaibatsuServiceClient(
      {
        id: Number(process.env.NEXT_PUBLIC_CONTRACT_APPLICATION_ID ?? ""),
        resolveBy: "id",
        sender: activeAddress
          ? {
              addr: activeAddress,
              signer,
            }
          : undefined,
      },
      newAlgodClient
    );
  }, [activeAddress, signer, newAlgodClient]);

  return (
    <ContractClientsContext.Provider
      value={{ algodClient: newAlgodClient, appClient: newAppClient }}
    >
      {children}
    </ContractClientsContext.Provider>
  );
};

export const useContractClients = () => {
  return React.useContext(ContractClientsContext);
};
