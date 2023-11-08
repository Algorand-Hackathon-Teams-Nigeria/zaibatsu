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

import beaker as be
import pyteal as pt
from beaker.lib.storage import BoxMapping


class AppGlobalState:
    pool_name = BoxMapping(pt.abi.String, pt.abi.String)
    # The address of the person managing this pool
    pool_manager = BoxMapping(pt.abi.String, pt.abi.Address)
    # The total amount of money in a pool
    pool_total = BoxMapping(pt.abi.String, pt.abi.Uint64)
    # The tenor for lend to the poll to mature in months
    pool_tenor = BoxMapping(pt.abi.String, pt.abi.String)
    # The Monthly Percentage Rate of the pool
    pool_mpr = BoxMapping(pt.abi.String, pt.abi.String)
    # The total amount paid into this pool ever
    pool_total_paid_in = BoxMapping(pt.abi.String, pt.abi.String)
    # The total amount paid out by this pool ever
    pool_total_paid_out = BoxMapping(pt.abi.String, pt.abi.String)


app = be.Application("Zaibatsu", state=AppGlobalState())


@pt.Subroutine(pt.TealType.none)
def transfer_asset(
    asset_id: pt.abi.Uint64,
    asset_amount: pt.abi.Uint64,
    asset_sender: pt.abi.Address,
    asset_reciever: pt.abi.Address
):
    return pt.Seq(pt.InnerTxnBuilder.Execute({
        pt.TxnField.type_enum: pt.TxnType.AssetTransfer,
        pt.TxnField.xfer_asset: asset_id.get(),
        pt.TxnField.asset_amount: asset_amount.get(),
        pt.TxnField.sender: asset_sender.get(),
        pt.TxnField.asset_receiver: asset_reciever.get()
    }))


@pt.Subroutine(pt.TealType.none)
def handle_create_pool(
    pool_name: pt.abi.String,
    manager_addr: pt.abi.Address,
    pool_tenor: pt.abi.Uint8,
    pool_mpr: pt.abi.Uint8
) -> pt.Expr:
    pool_id = pt.Sha256(pool_name.get())
    return pt.Seq(
        pt.Assert(pt.Not(app.state.pool_name[pool_id].exists())),
        app.state.pool_name[pool_id].set(pool_name.get()),
        app.state.pool_manager[pool_id].set(manager_addr.get()),
        app.state.pool_total[pool_id].set(pt.Itob(pt.Int(0))),
        app.state.pool_total_paid_in[pool_id].set(pt.Itob(pt.Int(0))),
        app.state.pool_total_paid_out[pool_id].set(pt.Itob(pt.Int(0))),
        app.state.pool_tenor[pool_id].set(pt.Itob(pool_tenor.get())),
        app.state.pool_mpr[pool_id].set(pt.Itob(pool_mpr.get()))
    )


@pt.Subroutine(pt.TealType.none)
def add_to_pool(pool_id: pt.abi.String, amount: pt.abi.Uint64) -> pt.Expr:
    curr_pool_total = app.state.pool_total[pool_id.get()].get()
    curr_pool_paid_in = app.state.pool_total_paid_in[pool_id.get()].get()
    return pt.Seq(
        app.state.pool_total[pool_id.get()].set(
            curr_pool_total + amount.get()),
        app.state.pool_total_paid_in[pool_id.get()].set(
            curr_pool_paid_in + amount.get())
    )


@pt.Subroutine(pt.TealType.none)
def remove_from_pool(pool_id: pt.abi.String, amount: pt.abi.Uint64) -> pt.Expr:
    curr_pool_total = app.state.pool_total[pool_id.get()].get()
    curr_pool_paid_out = app.state.pool_total_paid_out[pool_id.get()].get()
    return pt.Seq(
        app.state.pool_total[pool_id.get()].set(
            curr_pool_total - amount.get()),
        app.state.pool_total_paid_out[pool_id.get()].set(
            curr_pool_paid_out + amount.get())
    )


@app.external
def create_pool(
    payment: pt.abi.PaymentTransaction,
    pool_name: pt.abi.String,
    manager_addr: pt.abi.Address,
    pool_tenor: pt.abi.Uint8,
    pool_mpr: pt.abi.Uint8
) -> pt.Expr:
    return pt.Seq(
        pt.Assert(
            payment.get().receiver() == pt.Global.current_application_address()
        ),
        pt.Assert(payment.get().amount() == pt.Int(1000)),
        handle_create_pool(
            pool_name,
            manager_addr,
            pool_tenor,
            pool_mpr
        ),
        pt.Approve()
    )
