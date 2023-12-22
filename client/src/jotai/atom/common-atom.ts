import { atom } from "jotai";

interface ICommonAtom {
  isEditGeneralAssessmentForm: boolean;
}

export const commonAtom = atom<ICommonAtom>({
  isEditGeneralAssessmentForm: false,
});

if (process.env.NODE_ENV !== "production") {
  commonAtom.debugLabel = "commonAtom";
}
