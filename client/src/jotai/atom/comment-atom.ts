import { TCommitList } from "@/types";
import { atom } from "jotai";

export const commentAtom = atom<TCommitList>({} as TCommitList);

export const commentR3Atom = atom<TCommitList>({} as TCommitList);
