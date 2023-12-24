import { TSummaryPart1, TSummaryPart2 } from "@/types";
import { atom } from "jotai";

export const summaryAtomPart1 = atom<TSummaryPart1[]>([]);
export const summaryAtomPart2 = atom<TSummaryPart2[]>([]);
