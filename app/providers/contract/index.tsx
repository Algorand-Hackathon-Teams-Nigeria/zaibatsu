import { createZaibatsuServiceClient } from "@/services/contract/utils"
import { useWallet } from "@txnlab/use-wallet"

const ContractProvider = () => {
  const { activeAddress, signer } = useWallet()

  const serviceClient = createZaibatsuServiceClient(activeAddress ? { addr: activeAddress, signer } : undefined)
}


export default ContractProvider
