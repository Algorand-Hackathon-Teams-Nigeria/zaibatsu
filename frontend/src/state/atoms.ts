import { AppMetadata, AppReference } from "@algorandfoundation/algokit-utils/types/app";
import { atom } from "jotai";
import { ZaibatsuClient } from "../contracts/Zaibatsu";
import { Account, PoolData } from "../types/dataTypes"

const appRefAtom = atom<(AppMetadata | AppReference) | undefined>(undefined)
const appClientAtom = atom<ZaibatsuClient | undefined>(undefined)
const userAccountAtom = atom<Account | undefined>(undefined)
const poolsAtom = atom<PoolData[]>([])

export { appRefAtom, appClientAtom, userAccountAtom, poolsAtom }
