import { TSummaryPart1, TSummaryPart2 } from "@/types";
import { atom } from "jotai";

export const summaryAtomPart1 = atom<TSummaryPart1[]>([]);
export const summaryAtomPart2 = atom<TSummaryPart2[]>([]);

if (process.env.NODE_ENV !== "production") {
  summaryAtomPart1.debugLabel = "summaryAtomPart1";
  summaryAtomPart2.debugLabel = "summaryAtomPart2";
}
