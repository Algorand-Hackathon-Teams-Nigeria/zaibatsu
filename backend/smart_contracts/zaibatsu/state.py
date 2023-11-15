from beaker.lib.storage import BoxMapping
import pyteal as P


class Pool(P.abi.NamedTuple):
    # Pool Account info
    address: P.abi.Field[P.abi.Address]
    private_key: P.abi.Field[P.abi.String]

    # General Pool Info
    name: P.abi.Field[P.abi.String]
    manager: P.abi.Field[P.abi.Address]
    mpr: P.abi.Field[P.abi.String]
    tenor: P.abi.Field[P.abi.String]
    asset_id: P.abi.Field[P.abi.String]

    # Pool Fund info
    total: P.abi.Field[P.abi.String]
    paid_in: P.abi.Field[P.abi.String]
    paid_out: P.abi.Field[P.abi.String]


class PoolFundRecord(P.abi.NamedTuple):
    pool_id: P.abi.Field[P.abi.String]
    mpr_at_fund: P.abi.Field[P.abi.String]
    amount: P.abi.Field[P.abi.String]
    funder_addr: P.abi.Field[P.abi.Address]
    txn_id: P.abi.Field[P.abi.String]


class PoolBorrowRecord(P.abi.NamedTuple):
    pool_id: P.abi.Field[P.abi.String]
    asset_collateralized_id: P.abi.Field[P.abi.String]
    amount_collateralized: P.abi.Field[P.abi.String]
    amount_borrowed: P.abi.Field[P.abi.String]
    mpr_at_borrow: P.abi.Field[P.abi.String]
    txn_id: P.abi.Field[P.abi.String]


class AppGlobalState:
    pools = BoxMapping(P.abi.String, P.abi.String)
    fund_records = BoxMapping(P.abi.String, PoolFundRecord) #(txn_id, pool_record)
    borrow_records = BoxMapping(P.abi.String, PoolBorrowRecord) #(txn_id, pool_record)
