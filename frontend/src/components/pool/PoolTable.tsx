import { PoolActions } from ".";
import { PoolData } from "../../types";

interface PoolTableProps {
  pools: PoolData[]
}

export default function PoolTable({ pools }: PoolTableProps) {
  return (
    <table className='table mt-3'>
      <thead>
        <tr>
          <th className="pl-0">Pool name</th>
          <th>Assets</th>
          <th>Total Supplied</th>
          <th>Total Borrowed</th>
          <th>Pool APR</th>
          <th>Tenor</th>
        </tr>
      </thead>
      <tbody>
        {pools.map((pool, id) => (
          <tr key={id}>
            <th className='font-medium pl-0'>{pool.name}</th>
            <td>-</td>
            <td>-</td>
            <td>-</td>
            <td>-</td>
            <td>-</td>
            <PoolActions pool={pool} />
          </tr>
        ))}
      </tbody>
    </table>
  )
}
