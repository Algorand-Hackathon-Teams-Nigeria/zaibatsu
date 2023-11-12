"""
The plan
1 Lend:
    *   User lends money
    *   Somehow store the amount that the user lent -> LocalStorage
    *   Store the amount of time the user lent it for
    *   Calculate the total + interest to be paid back the the user based
        on the time and lent amount
    *   Store all these in LocalStorage
    *   Somehow run a process that constantly checks in the time to pay
        the user has reached
    *   Then pay the lender the total + interest
    *   Delete the above information
2 Pool:
    *   On lend get the asset that is being lent and somehow store it in a
        list of asset pooled
    *   Store the amount of each asset pooled so no one can borrow more than
        is currently available to pay back
    *   All info on pools and assets should probably be in GlobalStorage
3 Borrow:
    *   The borrower pays the full price with interest up front
"""

import beaker as B
import pyteal as P
from beaker.lib.storage import BoxMapping


class PoolInfo(P.abi.NamedTuple):
    id: P.abi.Field[P.abi.String]
    name: P.abi.Field[P.abi.String]
    manager: P.abi.Field[P.abi.Address]
    mpr: P.abi.Field[P.abi.Uint8]
    tenor: P.abi.Field[P.abi.Uint8]


class PoolFunds(P.abi.NamedTuple):
    total: P.abi.Field[P.abi.Uint64]
    paid_in: P.abi.Field[P.abi.Uint64]
    paid_out: P.abi.Field[P.abi.Uint64]


class Pool(P.abi.NamedTuple):
    info: P.abi.Field[PoolInfo]
    funds: P.abi.Field[PoolFunds]


class AppGlobalState:
    pools = BoxMapping(P.abi.String, Pool)


app = B.Application("Zaibatsu", state=AppGlobalState())


@P.Subroutine(P.TealType.none)
def transfer_asset(
    asset_id: P.abi.Uint64,
    asset_amount: P.abi.Uint64,
    asset_sender: P.abi.Address,
    asset_reciever: P.abi.Address
):
    return P.Seq(P.InnerTxnBuilder.Execute({
        P.TxnField.type_enum: P.TxnType.AssetTransfer,
        P.TxnField.xfer_asset: asset_id.get(),
        P.TxnField.asset_amount: asset_amount.get(),
        P.TxnField.sender: asset_sender.get(),
        P.TxnField.asset_receiver: asset_reciever.get()
    }))


@P.Subroutine(P.TealType.none)
def handle_create_pool(
    name: P.abi.String,
    manager_addr: P.abi.Address,
    mpr: P.abi.Uint8,
    tenor: P.abi.Uint8
) -> P.Expr:
    id = P.abi.String()
    pool_info = PoolInfo()
    pool_funds = PoolFunds()
    pool = Pool()
    total = P.abi.Uint64()
    paid_in = P.abi.Uint64()
    paid_out = P.abi.Uint64()
    return P.Seq(
        id.set(P.Sha256(name.get())),
        total.set(P.Int(0)),
        paid_in.set(P.Int(0)),
        paid_out.set(P.Int(0)),
        pool_info.set(id, name, manager_addr, mpr, tenor),
        pool_funds.set(total, paid_in, paid_out),
        pool.set(pool_info, pool_funds),
        app.state.pools[id.get()].set(pool)
    )


@P.Subroutine(P.TealType.none)
def fund_pool(pool_id: P.abi.String, amount: P.abi.Uint64) -> P.Expr:
    pool = Pool()
    new_total = P.abi.Uint64()
    new_paid_in = P.abi.Uint64()
    paid_out = P.abi.Uint64()
    pool_funds = PoolFunds()
    pool_info = PoolInfo()
    return P.Seq(
        pool.decode(app.state.pools[pool_id.get()].get()),
        pool_funds.set(pool.funds),
        pool_info.set(pool.info),

        new_total.set(pool_funds.total),
        new_paid_in.set(pool_funds.paid_in),
        new_total.set(new_total.get() + amount.get()),
        new_paid_in.set(new_paid_in.get() + amount.get()),

        paid_out.set(pool_funds.paid_out),
        pool_funds.set(new_total, new_paid_in, paid_out),
        pool.set(pool_info, pool_funds),
        app.state.pools[pool_id].set(pool)
    )


@P.Subroutine(P.TealType.none)
def pay_pool_creation_fee(payment: P.abi.PaymentTransaction):
    return P.Seq(
        P.Assert(
            payment.get().receiver() == P.Global.current_application_address()
        ),
        P.Assert(payment.get().amount() == P.Int(200000)),
    )


@app.external
def create_pool(
    payment: P.abi.PaymentTransaction,
    pool_name: P.abi.String,
    pool_tenor: P.abi.Uint8,
    pool_mpr: P.abi.Uint8
) -> P.Expr:
    address = P.abi.Address()
    return P.Seq(
        pay_pool_creation_fee(payment),
        address.set(payment.get().sender()),
        handle_create_pool(
            pool_name,
            address,
            pool_tenor,
            pool_mpr
        ),
        P.Approve()
    )
