import { Provider, useWallet } from '@txnlab/use-wallet'
import React from 'react'
import { IoClose } from 'react-icons/io5'

export default function ConnectWallet() {
  const { providers, activeAddress } = useWallet()
  const modalRef = React.useRef() as React.MutableRefObject<HTMLDialogElement>
  const isKmd = (provider: Provider) => provider.metadata.name.toLowerCase() === 'kmd'

  return (
    <React.Fragment>
      <div className="w-full mb-7 flex items-center justify-end">
        <button onClick={() => modalRef.current.showModal()} className="btn btn-primary btn-outline">
          Connect Wallet
        </button>
      </div>
      <dialog className="modal" ref={modalRef}>
        <form className="bg-white p-10 rounded-3xl relative flex flex-col items-center" method="dialog">
          <h3 className="text-xl py-3 font-semibold">Connect Wallet</h3>
          <ul className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {!activeAddress &&
              providers?.map((provider) => (
                <button
                  data-test-id={`${provider.metadata.id}-connect`}
                  className={`
                    btn grid grid-cols-2 md:grid-cols-1 h-full p-4 rounded-3xl px-10 outline-none
                    items-center m-2
                  `}
                  key={`provider-${provider.metadata.id}`}
                  onClick={() => {
                    return provider.connect()
                  }}
                >
                  {!isKmd(provider) && (
                    <img
                      className="max-w-[3rem] md:max-w-[7rem] rounded-full"
                      alt={`wallet_icon_${provider.metadata.id}`}
                      src={provider.metadata.icon}
                    />
                  )}
                  <span>{isKmd(provider) ? 'LocalNet Wallet' : provider.metadata.name}</span>
                </button>
              ))}
          </ul>
          <button className="btn btn-sm absolute rounded-lg top-3 right-3">
            <IoClose />
          </button>
        </form>
      </dialog>
    </React.Fragment>
  )
}
