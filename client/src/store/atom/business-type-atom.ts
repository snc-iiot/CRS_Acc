// import MockBusinessTypeList from "@/mocks/business-type.json";
import { TBusinessTypeList } from "@/types";
import { atom } from "jotai";

export const businessTypeAtom = atom<TBusinessTypeList[]>([]);

if (process.env.NODE_ENV !== "production") {
  businessTypeAtom.debugLabel = "businessTypeAtom";
}
