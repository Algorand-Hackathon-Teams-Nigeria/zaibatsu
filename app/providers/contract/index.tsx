import React, { createContext, useContext, useEffect, useState } from "react";
import { createZaibatsuServiceClient, getAlgodClient } from "@contract/utils";
import { useWallet } from "@txnlab/use-wallet";
import { ZaibatsuServiceClient } from "@contract/service";
import { Algodv2 } from "algosdk";
interface ContractContextType {
  serviceClient: ZaibatsuServiceClient; // Adjust the type according to your serviceClient
  algodClient: Algodv2
}
const ContractContext = createContext<ContractContextType | null>(null);

export const useContract = () => {
  const context = useContext(ContractContext);
  if (!context) {
    throw new Error("useContract must be used within a ContractProvider");
  }
  return context;
};

const ContractProvider: React.FC = ({ children }: any) => {
  const { activeAddress, signer } = useWallet();
  const [serviceClient, setServiceClient] = useState<any>(null);

  useEffect(() => {
    // @ts-ignore
    if (activeAddress && signer) {
      const client = createZaibatsuServiceClient({ addr: activeAddress, signer });
      setServiceClient(client);
    }
  }, [activeAddress, signer]);

  return <ContractContext.Provider value={{ serviceClient, algodClient: getAlgodClient() }}>{children}</ContractContext.Provider>;
};

export default ContractProvider;