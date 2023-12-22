import { atom } from "jotai";

export const collapsedAtom = atom<boolean>(true);

if (process.env.NODE_ENV !== "production") {
  collapsedAtom.debugLabel = "collapsedAtom";
}

export * from "./utils-atom";
export * from "./registration-atom";
export * from "./general-form";
export * from "./common-atom";
export * from "./comment-atom";
