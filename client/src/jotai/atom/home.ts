import {
  DataMainCustomerRatioType,
  DataObjectivePurchasingRatioType,
  DataRegisCountType,
  DataRegisStatType,
  DataShareHolderRatioType,
} from "@/types";
import { atom } from "jotai";

export const regisCountAtom = atom<DataRegisCountType[]>(
  [] as DataRegisCountType[],
);
export const mainCustomerRatioAtom = atom<DataMainCustomerRatioType[]>(
  [] as DataMainCustomerRatioType[],
);
export const shareHolderRatioAtom = atom<DataShareHolderRatioType[]>(
  [] as DataShareHolderRatioType[],
);
export const objectivePurchasingRatioAtom = atom<
  DataObjectivePurchasingRatioType[]
>([] as DataObjectivePurchasingRatioType[]);
export const regisStatAtom = atom<DataRegisStatType[]>(
  [] as DataRegisStatType[],
);

if (process.env.NODE_ENV !== "production") {
  regisCountAtom.debugLabel = "regisCountAtom";
  mainCustomerRatioAtom.debugLabel = "mainCustomerRatioAtom";
  shareHolderRatioAtom.debugLabel = "shareHolderRatioAtom";
  objectivePurchasingRatioAtom.debugLabel = "objectivePurchasingRatioAtom";
  regisStatAtom.debugLabel = "regisStatAtom";
}
