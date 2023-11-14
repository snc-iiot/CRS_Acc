import { atom } from "jotai";

export const collapsedAtom = atom<boolean>(true);
if (process.env.NODE_ENV !== "production") {
  collapsedAtom.debugLabel = "collapsedAtom";
}

export * from "./registration-atom";
