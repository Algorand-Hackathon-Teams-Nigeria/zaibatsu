import { useWallet } from '@txnlab/use-wallet'
import { ConnectWallet, ConnectedAccount } from '../../wallet'

export default function NavBar() {
  const { activeAddress } = useWallet()
  return <div className="mb-7">{activeAddress ? <ConnectedAccount /> : <ConnectWallet />}</div>
}
