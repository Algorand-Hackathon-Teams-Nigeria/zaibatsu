from beaker.lib.storage import BoxMapping
import pyteal as P


class Pool(P.abi.NamedTuple):
    # Pool Account info
    address: P.abi.Field[P.abi.Address]
    private_key: P.abi.Field[P.abi.String]

    # General Pool Info
    name: P.abi.Field[P.abi.String]
    manager: P.abi.Field[P.abi.Address]
    mpr: P.abi.Field[P.abi.Uint8]
    tenor: P.abi.Field[P.abi.Uint8]

    # Pool Fund info
    total: P.abi.Field[P.abi.Uint64]
    paid_in: P.abi.Field[P.abi.Uint64]
    paid_out: P.abi.Field[P.abi.Uint64]


class PoolLendRecord(P.abi.NamedTuple):
    pool_id: P.abi.Field[P.abi.String]
    pool_mpr: P.abi.Field[P.abi.Uint8]
    amount: P.abi.Field[P.abi.Uint64]
    lender_addr: P.abi.Field[P.abi.Address]
    lend_timestamp: P.abi.Field[P.abi.String]


class AppGlobalState:
    pools = BoxMapping(P.abi.String, Pool)
    lending_records = BoxMapping(P.abi.String, PoolLendRecord)
