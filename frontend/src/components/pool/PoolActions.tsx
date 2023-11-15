import React from "react";
import { PoolData } from "../../types";
import FundPool from "./FundPool";

interface PoolActionProps {
  pool: PoolData
}

export default function PoolAction({ pool }: PoolActionProps) {
  const fundRef = React.useRef() as React.MutableRefObject<HTMLDialogElement>
  return (
    <React.Fragment>
      <td className="flex items-center gap-4">
        <button type="button" onClick={() => fundRef.current.showModal()}
          className="btn btn-sm flex-1 lg:w-fit btn-primary rounded">Supply</button>
        <button className="btn flex-1 lg:w-fit  btn-sm btn-outline btn-primary rounded">Borrow</button>
      </td>
      <dialog className="modal" ref={fundRef}>
        <div className="modal-box rounded-lg">
          <FundPool pool={pool} />
        </div>
        <form method="dialog" className="modal-backdrop">
          <button />
        </form>
      </dialog>
    </React.Fragment>
  )
}
