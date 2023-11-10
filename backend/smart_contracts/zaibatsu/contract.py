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


class Pool(P.abi.NamedTuple):
    id: P.abi.Field[P.abi.String]
    name: P.abi.Field[P.abi.String]
    manager: P.abi.Field[P.abi.Address]
    total: P.abi.Field[P.abi.Uint64]
    tenor: P.abi.Field[P.abi.Uint8]
    mpr: P.abi.Field[P.abi.Uint8]
    total_paid_in: P.abi.Field[P.abi.Uint64]
    total_paid_out: P.abi.Field[P.abi.Uint64]


class AppGlobalState:
    pools = BoxMapping(P.abi.String, Pool)
    can_create_pool = BoxMapping(P.abi.Address, P.abi.Bool)


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
    tenor: P.abi.Uint8,
    mpr: P.abi.Uint8
) -> P.Expr:
    pool_id = P.Sha256(name.get())

    pool = Pool()

    id = P.abi.String()
    total = P.abi.Uint64()
    total_paid_in = P.abi.Uint64()
    total_paid_out = P.abi.Uint64()
    return P.Seq(
        P.Assert(P.Not(app.state.pools[pool_id].exists())),
        id.set(pool_id),
        total.set(P.Int(0)),
        total_paid_in.set(P.Int(0)),
        total_paid_out.set(P.Int(0)),
        pool.set(id, name, manager_addr, total, tenor,
                 mpr, total_paid_in, total_paid_out),
        app.state.pools[id].set(pool)
    )


@P.Subroutine(P.TealType.none)
def fund_pool(pool_id: P.abi.String, amount: P.abi.Uint64) -> P.Expr:
    id = P.abi.String()
    name = P.abi.String()
    manager = P.abi.Address()
    total = P.abi.Uint64()
    tenor = P.abi.Uint8()
    mpr = P.abi.Uint8()
    total_paid_in = P.abi.Uint64()
    total_paid_out = P.abi.Uint64()

    pool = Pool()
    new_total = P.abi.Uint64()
    new_paid_in = P.abi.Uint64()

    return P.Seq(
        pool.decode(app.state.pools[pool_id.get()].get()),
        id.set(pool.id),
        name.set(pool.name),
        manager.set(pool.manager),
        total.set(pool.total),
        tenor.set(pool.tenor),
        mpr.set(pool.mpr),
        total_paid_in.set(pool.total_paid_in),
        total_paid_out.set(pool.total_paid_out),
        new_total.set(total.get() + amount.get()),
        new_paid_in.set(total_paid_in.get() + amount.get()),
        pool.set(id, name, manager, total, tenor,
                 mpr, total_paid_in, total_paid_out),
    )

#
# @P.Subroutine(P.TealType.none)
# def debit_pool(pool_id: P.abi.String, amount: P.abi.Uint64) -> P.Expr:
#     curr_pool_total = app.state.pool_total[pool_id.get()].get()
#     curr_pool_paid_out = app.state.pool_total_paid_out[pool_id.get()].get()
#     return P.Seq(
#         app.state.pool_total[pool_id.get()].set(
#             curr_pool_total - amount.get()),
#         app.state.pool_total_paid_out[pool_id.get()].set(
#             curr_pool_paid_out + amount.get())
#     )


@app.external
def create_pool(
    pool_name: P.abi.String,
    manager_addr: P.abi.Address,
    pool_tenor: P.abi.Uint8,
    pool_mpr: P.abi.Uint8
) -> P.Expr:
    return P.Seq(
        P.Assert(app.state.can_create_pool[manager_addr.get()].exists()),
        handle_create_pool(
            pool_name,
            manager_addr,
            pool_tenor,
            pool_mpr
        ),
        P.Pop(app.state.can_create_pool[manager_addr.get()].delete()),
        P.Approve()
    )


@app.external
def pay_pool_creation_fee(payment: P.abi.PaymentTransaction):
    address = P.abi.Address()
    paid = P.abi.Bool()
    return P.Seq(
        P.Assert(
            payment.get().receiver() == P.Global.current_application_address()
        ),
        P.Assert(payment.get().amount() == P.Int(200000)),
        address.set(payment.get().sender()),
        paid.set(P.Int(1)),
        app.state.can_create_pool[address.get()].set(paid),
        P.Approve()
    )
