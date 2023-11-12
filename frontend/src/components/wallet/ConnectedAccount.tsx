import { useWallet } from '@txnlab/use-wallet'
import { FaAngleDown, FaAngleUp } from 'react-icons/fa'
import React from 'react'
import { CreatePool } from '../pool'

export default function ConnectedAccoutn() {
  const { activeAccount, providers } = useWallet()
  const [open, setOpen] = React.useState(false)

  const modalRef = React.useRef() as React.MutableRefObject<HTMLDialogElement>

  function handleDisconect() {
    if (providers) {
      const activeProvider = providers.find((p) => p.isActive)
      if (activeProvider) {
        activeProvider.disconnect()
      } else {
        // Required for logout/cleanup of inactive providers
        // For instance, when you login to localnet wallet and switch network
        // to testnet/mainnet or vice verse.
        localStorage.removeItem('txnlab-use-wallet')
        window.location.reload()
      }
    }
  }

  function handleCopyAddress() {
    navigator.clipboard.writeText(activeAccount?.address ?? '')
  }

  return (
    <div className="flex items-center gap-4 justify-end">
      <button onClick={() => modalRef.current.show()} className="btn btn-lg btn-primary">
        Create Pool
      </button>
      <dialog ref={modalRef} className="modal">
        <CreatePool />
      </dialog>
      <div className="dropdown">
        <label tabIndex={0} onClick={() => setOpen((curr) => !curr)} className="btn btn-lg btn-outline btn-primary">
          <img src="/user.svg" />
          <p className="max-w-[15rem] overflow-hidden text-ellipsis">{activeAccount?.address}</p>
          {open ? <FaAngleUp /> : <FaAngleDown />}
        </label>
        <ul
          tabIndex={0}
          className={`
              dropdown-content menu bg-base-100 shadow rounded-xl flex gap-3
              flex-col items-center w-full p-3 mt-2 z-[1]
            `}
        >
          <button
            className="btn w-full rounded-b-none justify-start bg-base-100 border-base-100 border-b-base-200 flex"
            data-test-id="logout"
            onClick={handleCopyAddress}
          >
            Copy Address
          </button>
          <button
            className="btn w-full rounded-none justify-start bg-base-100 border-base-100 border-b-base-200 flex"
            data-test-id="logout"
            onClick={handleDisconect}
          >
            Disconnect
          </button>
        </ul>
      </div>
    </div>
  )
}
