import algosdk from "algosdk"
import { AppDetails } from "@algorandfoundation/algokit-utils/types/app-client"
import { TransactionSignerAccount } from "@algorandfoundation/algokit-utils/types/account"
import { getEnv } from "@/lib/utils"
import { ZaibatsuServiceClient } from "./service"


export const getAlgodClient = () => {
  const env = getEnv()
  env?.ALGORAND_ALGOD_PORT
  console.log({ env })
  const client = new algosdk.Algodv2(env?.ALGORAND_ALGOD_TOKEN ?? "", env?.ALGORAND_ALGOD_SERVER ?? "", env?.ALGORAND_ALGOD_PORT ?? "")
  return client
}

export const createZaibatsuServiceClient = (sender?: TransactionSignerAccount) => {
  const env = getEnv()
  const client = getAlgodClient()
  const appDetails: AppDetails = {
    resolveBy: "id",
    id: Number(env?.ZAIBATSU_SERVICE_APPLICATION_ID),
    sender
  }
  return new ZaibatsuServiceClient(appDetails, client)
}
