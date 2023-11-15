import { URLType, urls } from '../../../constants'
import { Link, Outlet, useLocation } from 'react-router-dom'
import NavBar from './NavBar'
import { PROVIDER_ID, ProvidersArray, WalletProvider, useInitializeProviders } from '@txnlab/use-wallet'
import { DeflyWalletConnect } from '@blockshake/defly-connect'
import { PeraWalletConnect } from '@perawallet/connect'
import { DaffiWalletConnect } from '@daffiwallet/connect'
import { getAlgodConfigFromViteEnvironment } from '../../../utils/network/getAlgoClientConfigs'
import algosdk from 'algosdk'
import { SnackbarProvider } from 'notistack'
import AppDataProvider from '../AppDataProvider'

let providersArray: ProvidersArray
if (import.meta.env.VITE_ALGOD_NETWORK === '') {
  providersArray = [{ id: PROVIDER_ID.KMD }]
} else {
  providersArray = [
    { id: PROVIDER_ID.DEFLY, clientStatic: DeflyWalletConnect },
    { id: PROVIDER_ID.PERA, clientStatic: PeraWalletConnect },
    { id: PROVIDER_ID.DAFFI, clientStatic: DaffiWalletConnect },
    { id: PROVIDER_ID.EXODUS },
  ]
}

export default function NavLayout() {
  const location = useLocation()

  const isActive = (url: URLType) => location.pathname === url.href
  const algodConfig = getAlgodConfigFromViteEnvironment()


  const walletProviders = useInitializeProviders({
    providers: providersArray,
    nodeConfig: {
      network: algodConfig.network,
      nodeServer: algodConfig.server,
      nodePort: String(algodConfig.port),
      nodeToken: String(algodConfig.token),
    },
    algosdkStatic: algosdk,
  })
  return (
    <SnackbarProvider maxSnack={3}>
      <WalletProvider value={walletProviders}>
        <AppDataProvider>
          <div>
            <div className="drawer lg:drawer-open">
              <input id="my-drawer" type="checkbox" className="drawer-toggle" />
              <div className="drawer-content">
                <NavBar />
                <div className='p-4'>
                  <Outlet />
                </div>
              </div>
              <div className="drawer-side bg-primary/10">
                <div className="pl-20 p-4 pb-14">
                  <Link to="/">
                    <img className="max-w-[6rem]" src="/logo.svg" />
                  </Link>
                </div>
                <ul>
                  {urls.map((url) => (
                    <li
                      key={url.href}
                      className={`py-2 my-4 transition-all border-l-4 ${isActive(url) ? 'bg-white text-primary border-primary' : 'border-transparent'
                        }`}
                    >
                      <Link className="px-16 pr-20" to={url.href}>
                        {url.name}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </AppDataProvider>
      </WalletProvider>
    </SnackbarProvider>
  )
}
