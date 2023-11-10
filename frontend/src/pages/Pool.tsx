import { PoolInfo } from '../components'
import { BiSearch } from 'react-icons/bi'

export default function Pool() {
  return (
    <main className="">
      <PoolInfo />
      <div className="flex mt-9 justify-between">
        <h4 className="font-medium text-lg">Pool</h4>
        <div className="flex items-center gap-3 bg-black/5 p-1 px-2 rounded transition-all focus-within:shadow-lg">
          <BiSearch />
          <input className="bg-transparent outline-none" placeholder="Search anything here" />
        </div>
      </div>
    </main>
  )
}
