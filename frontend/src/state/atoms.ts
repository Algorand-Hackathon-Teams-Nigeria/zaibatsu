import { AppMetadata, AppReference } from "@algorandfoundation/algokit-utils/types/app";
import { atom } from "jotai";
import { ZaibatsuClient } from "../contracts/Zaibatsu";

const appRefAtom = atom<(AppMetadata | AppReference) | undefined>(undefined)
const appClientAtom = atom<ZaibatsuClient | undefined>(undefined)

export { appRefAtom, appClientAtom}
