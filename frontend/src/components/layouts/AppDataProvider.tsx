import React from 'react'
import { useAtom } from 'jotai'
import { appClientAtom, appRefAtom, userAccountAtom } from '../../state/atoms'
import { useWallet } from '@txnlab/use-wallet'
import { createAppClient, getAlgodClient } from '../../utils/network/contract'
import { enqueueSnackbar } from 'notistack'
import { Account } from "../../types/dataTypes"

interface AppDataProviderProps {
  children: React.ReactNode
}

export default function AppDataProvider({ children }: AppDataProviderProps) {
  const [, setAppRef] = useAtom(appRefAtom)
  const [, setAppClient] = useAtom(appClientAtom)
  const [, setUserAccount] = useAtom(userAccountAtom)
  const { signer, activeAddress, activeAccount } = useWallet()

  React.useEffect(() => {
    const getGlobalAppState = async () => {
      const algodClient = getAlgodClient()
      if (activeAddress && activeAccount) {
        const newAppClient = createAppClient(signer, activeAddress)
        const newAppRef = await newAppClient.appClient.getAppReference()
        const account = await algodClient.accountInformation(activeAccount.address).do()

        const deployParams = {
          onSchemaBreak: 'append',
          onUpdate: 'append',
          // eslint-disable-next-line @typescript-eslint/no-explicit-any
        } as any

        await newAppClient.deploy(deployParams).catch((err) => {
          enqueueSnackbar(`Deploy Error: ${err}`, { variant: 'error' })
          return
        })
        setAppClient(newAppClient)
        setAppRef(newAppRef)
        setUserAccount(account as Account)
      }
    }
    getGlobalAppState()
  }, [activeAddress])
  return <React.Fragment>{children}</React.Fragment>
}
