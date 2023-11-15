import React from "react";
import { PoolActions } from ".";
import { PoolData } from "../../types";

interface PoolTableProps {
  pools: PoolData[]
}

export default function PoolTable({ pools }: PoolTableProps) {
  return (
    <React.Fragment>
      <table className='table mt-3 lg:hidden'>
        <tbody>
          {pools.map((pool, id) => (
            <tr key={id} className="grid grid-cols-1">
              <th className='font-medium pl-0'>{pool.name}</th>
              <td>Assets  -</td>
              <td>Total Supplied: {pool.paidIn}</td>
              <td>Total Borrowed: {pool.paidOut}</td>
              <td>Pool MPR: {pool.mpr}</td>
              <td>Tenor: {pool.tenor}</td>
              <PoolActions pool={pool} />
            </tr>
          ))}
        </tbody>
      </table>
      <div className="hidden lg:block ">
        <table className='table mt-3'>
          <thead>
            <tr>
              <th className="pl-0">Pool name</th>
              <th>Assets</th>
              <th>Total Supplied</th>
              <th>Total Borrowed</th>
              <th>Pool MPR</th>
              <th>Tenor</th>
            </tr>
          </thead>
          <tbody>
            {pools.map((pool, id) => (
              <tr key={id}>
                <th className='font-medium pl-0'>{pool.name}</th>
                <td>-</td>
                <td>{pool.paidIn}</td>
                <td>{pool.paidOut}</td>
                <td>{pool.mpr}</td>
                <td>{pool.tenor}</td>
                <PoolActions pool={pool} />
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </React.Fragment>
  )
}
