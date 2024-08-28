import { atom } from "jotai";

const sidebarAtom = atom<boolean | undefined>(false);

export default sidebarAtom;
