"use client";

import { ZaibatsuAuthAndDaoClient } from "@/services/contract/authAndDaoClient";
import { ZaibatsuLoanClient } from "@/services/contract/loanClient";
import { SendTransactionFrom } from "@algorandfoundation/algokit-utils/types/transaction";
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

const createClients = (algodClient: Algodv2, sender?: SendTransactionFrom) => {
  const loanClient = new ZaibatsuLoanClient(
    {
      id: Number(process.env.NEXT_PUBLIC_LOAN_CONTRACT_APPLICATION_ID ?? ""),
      resolveBy: "id",
      sender,
    },
    algodClient,
  );

  const authAndDaoClient = new ZaibatsuAuthAndDaoClient(
    {
      id: Number(
        process.env.NEXT_PUBLIC_AUTH_AND_DAO_CONTRACT_APPLICATION_ID ?? "",
      ),
      resolveBy: "id",
      sender,
    },
    algodClient,
  );

  return { loanClient, authAndDaoClient };
};

const ContractClientsContext = React.createContext({
  algodClient,
  ...createClients(algodClient),
});

interface Props {
  children?: React.ReactNode;
}

export const ContractClientsProvider: React.FC<Props> = ({ children }) => {
  const { activeAddress, signer } = useWallet();
  const newAlgodClient = React.useMemo(() => {
    return createAlgodClient();
  }, []);

  const appClients = React.useMemo(() => {
    const clients = createClients(
      newAlgodClient,
      activeAddress ? { addr: activeAddress, signer } : undefined,
    );
    return clients;
  }, [newAlgodClient, activeAddress, signer]);

  return (
    <ContractClientsContext.Provider
      value={{
        algodClient: newAlgodClient,
        ...appClients,
      }}
    >
      {children}
    </ContractClientsContext.Provider>
  );
};

export const useContractClients = () => {
  return React.useContext(ContractClientsContext);
};
