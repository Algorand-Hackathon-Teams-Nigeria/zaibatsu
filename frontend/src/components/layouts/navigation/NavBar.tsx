import { useWallet } from '@txnlab/use-wallet'
import { ConnectWallet, ConnectedAccount } from '../../wallet'
import { BiMenu } from 'react-icons/bi'
import { GrClose } from 'react-icons/gr'
import React from 'react'
import { urls } from '../../../constants'
import { Link } from 'react-router-dom'

export default function NavBar() {
  const [open, setOpen] = React.useState(false);
  const { activeAddress } = useWallet()
  return (
    <div className='mb-20 lg:mb-0'>
      <div className={`mb-7 lg:mb-0 z-[1000] w-full p-4 rounded-b absolute md:relative ${open ? "bg-white" : ""}`}>
        <div className='flex w-full lg:hidden items-center justify-between pb-3'>
          <img src='/logo.svg' />
          <button onClick={() => setOpen(curr => !curr)}>
            {open ? <GrClose size={30} /> : <BiMenu size={30} />}
          </button>
        </div>
        <div className={`${open ? "block" : "hidden"} transition-all lg:block`}>
          {activeAddress ? <ConnectedAccount /> : <ConnectWallet />}
        </div>
        <ul className={`${open ? "block" : "hidden"} lg:hidden p-1 bg-base-200 rounded-md mt-2 flex flex-col gap-2`}>
          {urls.map((url, id) => (
            <li key={id}>
              <Link className='btn btn-sm btn-ghost border-b-2 border-b-base-100 outline-none w-full justify-start' to={url.href}>{url.name}</Link>
            </li>
          ))}
        </ul>
      </div>
    </div>
  )
}
