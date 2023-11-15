export default function PoolInfo() {
  return (
    <ul className="flex flex-row w-full max-w-[93vw] overflow-x-auto gap-9">
      <div className="card min-w-[20rem] bg-primary flex-1 text-primary-content">
        <div className="card-body">
          <h3 className="card-title">Net Worth</h3>
          <p>$ 0.00</p>
        </div>
      </div>
      <div className="card min-w-[20rem] bg-primary flex-1 text-primary-content">
        <div className="card-body">
          <h3 className="card-title">Total Supply</h3>
          <p>$ 0.00</p>
        </div>
      </div>
      <div className="card min-w-[20rem] bg-primary flex-1 text-primary-content">
        <div className="card-body">
          <h3 className="card-title">Total Borrow</h3>
          <p>$ 0.00</p>
        </div>
      </div>
    </ul>
  )
}
