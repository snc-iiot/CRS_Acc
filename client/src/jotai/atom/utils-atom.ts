import {
  TBenefitsList,
  TBusinessTypeList,
  TCertificatedList,
  TCompanyList,
  TCompanyPolicyList,
  TDeliveryTermsList,
  TDocumentKeyList,
} from "@/types";
import { atom } from "jotai";

export const utilsAtom = atom({
  benefitsList: [] as TBenefitsList[],
  businessTypeList: [] as TBusinessTypeList[],
  certificatedList: [] as TCertificatedList[],
  companyList: [] as TCompanyList[],
  companyPolicyList: [] as TCompanyPolicyList[],
  deliveryTermsList: [] as TDeliveryTermsList[],
  documentKeyList: {} as TDocumentKeyList,
});

export const benefitsListAtom = atom<TBenefitsList[]>([]);
export const businessTypeListAtom = atom<TBusinessTypeList[]>([]);
export const certificatedListAtom = atom<TCertificatedList[]>([]);
export const companyListAtom = atom<TCompanyList[]>([]);
export const companyPolicyListAtom = atom<TCompanyPolicyList[]>([]);
export const deliveryTermsListAtom = atom<TDeliveryTermsList[]>([]);
export const documentKeyListAtom = atom<TDocumentKeyList>(
  {} as TDocumentKeyList,
);

if (process.env.NODE_ENV !== "production") {
  utilsAtom.debugLabel = "utilsAtom";
  benefitsListAtom.debugLabel = "benefitsListAtom";
  businessTypeListAtom.debugLabel = "businessTypeListAtom";
  certificatedListAtom.debugLabel = "certificatedListAtom";
  companyListAtom.debugLabel = "companyListAtom";
  companyPolicyListAtom.debugLabel = "companyPolicyListAtom";
  deliveryTermsListAtom.debugLabel = "deliveryTermsListAtom";
  documentKeyListAtom.debugLabel = "documentKeyListAtom";
}
