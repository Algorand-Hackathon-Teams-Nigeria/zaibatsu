import { atom } from "recoil";
import { ATOM_KEYS } from "./keys";

const navAtom = atom<boolean>({
  key: ATOM_KEYS.NAV_ATOM,
  default: false,
});

export default navAtom;
