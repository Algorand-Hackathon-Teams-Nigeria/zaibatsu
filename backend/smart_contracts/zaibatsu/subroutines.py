import pyteal as P
from algosdk import account
from .state import Pool, PoolBorrowRecord, PoolFundRecord
from .contract import app


@P.Subroutine(P.TealType.none)
def handle_create_pool(
    pool_id: P.abi.String,
    name: P.abi.String,
    manager: P.abi.Address,
    mpr: P.abi.String,
    tenor: P.abi.String,
    asset_id: P.abi.String
) -> P.Expr:
    # Create Pool Account
    private_key_str, address_str = account.generate_account()

    return P.Seq(
        # Set Pool Account values
        (address := P.abi.Address()).set(address_str),
        (private_key := P.abi.String()).set(P.Bytes(private_key_str)),

        # Set Pool Fund Values
        (total := P.abi.String()).set(P.Bytes("0")),
        (paid_in := P.abi.String()).set(P.Bytes("0")),
        (paid_out := P.abi.String()).set(P.Bytes("0")),

        # Set Pool acount, info and funds
        (pool := Pool()).set(
            address, private_key,
            name, manager, mpr, tenor, asset_id,
            total, paid_in, paid_out
        ),
        app.state.pools[pool_id.get()].set(pool.encode())
    )


@P.Subroutine(P.TealType.none)
def fund_pool(
    txn: P.abi.AssetTransferTransaction,
    pool_id: P.abi.String
) -> P.Expr:
    # Pool Fund info
    return P.Seq(
        # Get current pool values
        (pool := Pool()).decode(app.state.pools[pool_id].get()),
        (asset_id := P.abi.String()).set(pool.asset_id),

        P.Assert(txn.get().xfer_asset() == P.Btoi(asset_id.get())),

        # Pool Account info
        (address := P.abi.Address()).set(pool.address),
        (private_key := P.abi.String()).set(pool.private_key),

        # General Pool Info
        (name := P.abi.String()).set(pool.name),
        (manager := P.abi.Address()).set(pool.manager),
        (mpr := P.abi.String()).set(pool.mpr),
        (tenor := P.abi.String()).set(pool.tenor),

        # Pool Fund info
        (total := P.abi.String()).set(pool.total),
        (paid_in := P.abi.String()).set(pool.paid_in),
        (paid_out := P.abi.String()).set(pool.paid_out),

        # Update total and paid_in
        total.set(P.Itob(P.Btoi(total.get()) + txn.get().asset_amount())),
        paid_in.set(P.Itob(P.Btoi(paid_in.get()) + txn.get().asset_amount())),

        pool.set(
            address, private_key,
            name, manager, mpr, tenor, asset_id,
            total, paid_in, paid_out
        ),
        app.state.pools[pool_id.get()].set(pool.encode())
    )


@P.Subroutine(P.TealType.none)
def pay_pool_creation_fee(payment: P.abi.PaymentTransaction):
    return P.Seq(
        P.Assert(
            payment.get().receiver() == P.Global.current_application_address()
        ),
        P.Assert(payment.get().amount() == P.Int(300000)),
    )


@P.Subroutine(P.TealType.none)
def handle_pool_borrow(
    txn: P.abi.AssetTransferTransaction,
    dollar_rate: P.abi.Uint64,
    pool_id: P.abi.String,
    amount: P.abi.Uint64
):
    return P.Seq(
        (amt_in_dolls := P.abi.Uint64()).set(txn.get().asset_amount() * dollar_rate.get()),
        (pool := Pool()).decode(app.state.pools[pool_id].get()),
        (pool_mpr := P.abi.String()).set(pool.mpr),
        (pool_addr := P.abi.Address()).set(pool.address),
        (pool_asset_id := P.abi.String()).set(pool.asset_id),
        P.Assert((((amt_in_dolls.get() * P.Btoi(pool_mpr.get())) / P.Int(100)) + amt_in_dolls.get()) == amount.get()),
        P.InnerTxnBuilder.Execute({
            P.TxnField.type_enum: P.TxnType.AssetTransfer,
            P.TxnField.asset_amount: amount.get(),
            P.TxnField.asset_receiver: txn.get().sender(),
            P.TxnField.asset_sender: pool_addr.get(),
            P.TxnField.xfer_asset: P.Btoi(pool_asset_id.get()),
        })
    )


@P.Subroutine(P.TealType.none)
def record_pool_fund_transaction(
    pool_id: P.abi.String,
    txn: P.abi.AssetTransferTransaction,
):
    return P.Seq(
        (pool := Pool()).decode(app.state.fund_records[pool_id].get()),
        (mpr_at_fund := P.abi.String()).set(pool.mpr),
        (amount := P.abi.String()).set(P.Itob(txn.get().asset_amount())),
        (funder_addr := P.abi.Address()).set(txn.get().sender()),
        (txn_id := P.abi.String()).set(txn.get().tx_id()),
        (pool_record := PoolFundRecord()).set(
            pool_id, mpr_at_fund,
            amount, funder_addr, txn_id
        ),
        app.state.fund_records[txn_id.get()].set(pool_record.encode())
    )


@P.Subroutine(P.TealType.none)
def record_pool_borrow_transaction(
    pool_id: P.abi.String,
    txn: P.abi.AssetTransferTransaction,
    amount_borrowed: P.abi.Uint64
):
    return P.Seq(
        (pool := Pool()).decode(app.state.pools[pool_id.get()].get()),
        (asset_collateralized_id := P.abi.String()).set(P.Itob(txn.get().xfer_asset())),
        (amount_collateralized := P.abi.String()).set(P.Itob(txn.get().asset_amount())),
        (mpr_at_borrow := P.abi.String()).set(pool.mpr),
        (txn_id := P.abi.String()).set(txn.get().tx_id()),

        # Convert Int to Bytes
        (amount_borrowed_str := P.abi.String()).set(P.Itob(amount_borrowed.get())),
        (borrow_record := PoolBorrowRecord()).set(
            pool_id, asset_collateralized_id,
            amount_collateralized, amount_borrowed_str,
            mpr_at_borrow, txn_id
        ),
        app.state.borrow_records[txn_id.get()].set(borrow_record.encode())
    )
