import MockThaiProvince from "@/mocks/thai-province.json";
import { TThaiProvince } from "@/types";
import { atom } from "jotai";

export const thaiProvinceAtom = atom<TThaiProvince[]>(MockThaiProvince);
