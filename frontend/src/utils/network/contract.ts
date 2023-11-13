import * as algokit from '@algorandfoundation/algokit-utils'
import { AppDetails } from '@algorandfoundation/algokit-utils/types/app-client'
import { TransactionSigner } from 'algosdk'
import { getAlgodConfigFromViteEnvironment, getIndexerConfigFromViteEnvironment } from './getAlgoClientConfigs'
import { ZaibatsuClient } from '../../contracts/Zaibatsu'
import AlgodClient from 'algosdk/dist/types/client/v2/algod/algod'

export function getAlgodClient(): AlgodClient {
  const algodConfig = getAlgodConfigFromViteEnvironment()
  const algodClient = algokit.getAlgoClient({
    server: algodConfig.server,
    port: algodConfig.port,
    token: algodConfig.token,
  })
  return algodClient
}

export function createAppClient(signer: TransactionSigner, activeAddress: string): ZaibatsuClient {
  const algodClient = getAlgodClient()
  const indexerConfig = getIndexerConfigFromViteEnvironment()
  const indexer = algokit.getAlgoIndexerClient({
    server: indexerConfig.server,
    port: indexerConfig.port,
    token: indexerConfig.token,
  })
  const appDetails: AppDetails = {
    resolveBy: 'creatorAndName',
    sender: { signer, addr: activeAddress },
    creatorAddress: activeAddress,
    findExistingUsing: indexer,
  }

  const appClient = new ZaibatsuClient(appDetails, algodClient)
  return appClient
}
