import { DataMainCustomerRatioType, DataObjectivePurchasingRatioType, DataRegisCountType, DataShareHolderRatioType } from "@/types";
import { atom } from "jotai";

export const regisCountAtom = atom<DataRegisCountType[]>([] as DataRegisCountType[])
export const mainCustomerRatioAtom = atom<DataMainCustomerRatioType[]>([] as DataMainCustomerRatioType[])
export const shareHolderRatioAtom = atom<DataShareHolderRatioType[]>([] as DataShareHolderRatioType[])
export const objectivePurchasingRatioAtom = atom<DataObjectivePurchasingRatioType[]>([] as DataObjectivePurchasingRatioType[])