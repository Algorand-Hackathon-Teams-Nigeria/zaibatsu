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
from .state import AppGlobalState

app = B.Application("Zaibatsu", state=AppGlobalState())


@app.external
def create_pool(
    payment: P.abi.PaymentTransaction,
    pool_id: P.abi.String,
    pool_name: P.abi.String,
    pool_tenor: P.abi.Uint8,
    pool_mpr: P.abi.Uint8
) -> P.Expr:
    from .subroutines import pay_pool_creation_fee, handle_create_pool
    manager_address = P.abi.Address()
    return P.Seq(
        pay_pool_creation_fee(payment),
        manager_address.set(payment.get().sender()),
        handle_create_pool(
            pool_id,
            pool_name,
            manager_address,
            pool_tenor,
            pool_mpr
        ),
        P.Approve()
    )


@app.external
def lend_to_pool(
    txn: P.abi.AssetTransferTransaction,
    pool_id: P.abi.String,
) -> P.Expr:
    from .subroutines import fund_pool
    return P.Seq(
        fund_pool(txn, pool_id)
    )
