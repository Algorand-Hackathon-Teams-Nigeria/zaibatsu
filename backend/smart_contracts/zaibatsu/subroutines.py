import pyteal as P
from algosdk import account
from .state import Pool  # , PoolLendRecord
from .contract import app


@P.Subroutine(P.TealType.none)
def handle_create_pool(
    pool_id: P.abi.String,
    name: P.abi.String,
    manager: P.abi.Address,
    mpr: P.abi.Uint8,
    tenor: P.abi.Uint8
) -> P.Expr:
    # Create Pool Account
    private_key, address = account.generate_account()
    address = P.abi.Address()
    private_key = P.abi.String()

    # Create Pool Funds - initially all 0
    total = P.abi.Uint64()
    paid_in = P.abi.Uint64()
    paid_out = P.abi.Uint64()

    pool = Pool()

    return P.Seq(
        # Set Pool Account values
        address.set(address),
        private_key.set(private_key),

        # Set Pool Fund Values
        total.set(P.Int(0)),
        paid_in.set(P.Int(0)),
        paid_out.set(P.Int(0)),

        # Set Pool acount, info and funds
        pool.set(
            address, private_key,
            name, manager, mpr, tenor,
            total, paid_in, paid_out
        ),
        app.state.pools[pool_id.get()].set(pool)
    )


@P.Subroutine(P.TealType.none)
def fund_pool(
    txn: P.abi.AssetTransferTransaction,
    pool_id: P.abi.String
) -> P.Expr:
    pool = Pool()

    # Pool Account info
    address = P.abi.Address()
    private_key = P.abi.String()

    # General Pool Info
    name = P.abi.String()
    manager = P.abi.Address()
    mpr = P.abi.Uint8()
    tenor = P.abi.Uint8()

    # Pool Fund info
    total = P.abi.Uint64()
    paid_in = P.abi.Uint64()
    paid_out = P.abi.Uint64()

    return P.Seq(
        # Get current pool values
        pool.decode(app.state.pools[pool_id.get()].get()),

        # Pool Account info
        address.set(pool.address),
        private_key.set(pool.private_key),

        # General Pool Info
        name.set(pool.name),
        manager.set(pool.manager),
        mpr.set(pool.mpr),
        tenor.set(pool.tenor),

        # Pool Fund info
        total.set(pool.total),
        paid_in.set(pool.paid_in),
        paid_out.set(pool.paid_out),

        # Update total and paid_in
        total.set(total.get() + txn.get().asset_amount()),
        paid_in.set(paid_in.get() + txn.get().asset_amount()),

        pool.set(
            address, private_key,
            name, manager, mpr, tenor,
            total, paid_in, paid_out
        ),
        app.state.pools[pool_id.get()].set(pool)
    )


@P.Subroutine(P.TealType.none)
def pay_pool_creation_fee(payment: P.abi.PaymentTransaction):
    return P.Seq(
        P.Assert(
            payment.get().receiver() == P.Global.current_application_address()
        ),
        P.Assert(payment.get().amount() == P.Int(200000)),
    )


# @P.Subroutine(P.TealType.none)
# def record_pool_fund_transaction(
# pool_id: P.abi.String, payment: P.abi.PaymentTransaction):
#     pool_record = PoolLendRecord()
#     pool = Pool()
#     pool_info = PoolInfo()
#     return P.Seq(
#         pool.decode(app.state.lending_records[pool_id.get()].get()),
#         pool_info.set(pool.info),
#         pool_record.set(pool_id, pool_info.mpr)
#     )
