"""
The plan
1 Lend:
    * User lends money
    * Somehow store the amount that the user lent -> LocalStorage
    * Store the amount of time the user lent it for
    * Calculate the total + interest to be paid back the the user based on the time and lent amount
    * Store all these in LocalStorage
    * Somehow run a process that constantly checks in the time to pay the user has reached
    * Then pay the lender the total + interest
    * Delete the above information
2 Pool:
    * On lend get the asset that is being lent and somehow store it in a list of asset pooled
    * Store the amount of each asset pooled so no one can borrow more than is currently available to pay back
    * All info on pools and assets should probably be in GlobalStorage
3 Borrow:
    * The borrower pays the full price with interest up front
"""

from beaker import * #type: ignore
from pyteal import * #type: ignore


class AppGlobalState:
    cash_pools = ReservedGlobalStateValue(
        stack_type=TealType.uint64,
        max_keys=40,
        descr="The various cash pools and their current amount"
    )
    pool_assets = ReservedGlobalStateValue(
        stack_type=TealType.uint64,
        max_keys=40,
        descr="The assets in pools and the total amount of that asset in available"
    )

app = Application("Zaibatsu")


# @app.external
# def lend(payment: abi.PaymentTransaction, pool: abi.String):
#     """
#     There's a single pool for each coin like a pool for lending algorand
#     A maximum of 40 people can add money to a pool
#     """
#     payment.get().xfer_asset()
#     payment.get().amount()
