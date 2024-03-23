import React, { createContext, useContext, useEffect, useMemo, useState } from "react";
import { createZaibatsuServiceClient, getAlgodClient } from "@contract/utils";
import { useWallet } from "@txnlab/use-wallet";
import { ZaibatsuServiceClient } from "@contract/service";
import algosdk, { Algodv2 } from "algosdk";
interface ContractContextType {
  serviceClient?: ZaibatsuServiceClient; // Adjust the type according to your serviceClient
  algodClient?: Algodv2;
}
const ContractContext = createContext<ContractContextType | null>(null);

export const useContract = () => {
  const context = useContext(ContractContext);
  if (!context) {
    throw new Error("useContract must be used within a ContractProvider");
  }
  return context;
};


interface Props {
  children: React.ReactNode
}

const ContractProvider: React.FC<Props> = ({ children }) => {
  const { activeAddress, signer } = useWallet();
  const [serviceClient, setServiceClient] = useState<ZaibatsuServiceClient>();
  const [algodClient, setAlgodClient] = useState<algosdk.Algodv2 | null>(null);

  useEffect(() => {
    // @ts-ignore
    if (activeAddress && signer) {
      const client = createZaibatsuServiceClient({ addr: activeAddress, signer });
      setServiceClient(client);
    }
  }, [activeAddress]);

  useEffect(() => {
    if (!algodClient) {
      setAlgodClient(getAlgodClient());
    }
  }, []);
  // @ts-ignore
  return <ContractContext.Provider value={{ serviceClient, algodClient }}>{children}</ContractContext.Provider>;
};

export default ContractProvider;
