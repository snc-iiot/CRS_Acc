// import MockCompanyList from "@/mock/company-list.json";
import MockCountryCodesList from "@/mock/country-list.json";
import ThaiProvince from "@/mock/thai-province.json";
import {
  ImportExcelTDBDList,
  TBenefitsList,
  TBusinessTypeList,
  TCertificatedList,
  TCompanyList,
  TCompanyPolicyList,
  TCountryCodeList,
  TDBDSyncList,
  TDeliveryTermsList,
  TDocumentKeyList,
  TFinancialRatio,
  TThaiProvince,
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

export const thaiProvinceAtom = atom<TThaiProvince[]>(ThaiProvince);
export const countryCodeListAtom =
  atom<TCountryCodeList[]>(MockCountryCodesList);

export const dbdSyncListAtom = atom<TDBDSyncList>({} as TDBDSyncList);
export const dataDBDSyncListAtom = atom<ImportExcelTDBDList>({} as ImportExcelTDBDList);

export const financialRatioAtom = atom<TFinancialRatio>({} as TFinancialRatio);

if (process.env.NODE_ENV !== "production") {
  utilsAtom.debugLabel = "utilsAtom";
  benefitsListAtom.debugLabel = "benefitsListAtom";
  businessTypeListAtom.debugLabel = "businessTypeListAtom";
  certificatedListAtom.debugLabel = "certificatedListAtom";
  companyListAtom.debugLabel = "companyListAtom";
  companyPolicyListAtom.debugLabel = "companyPolicyListAtom";
  deliveryTermsListAtom.debugLabel = "deliveryTermsListAtom";
  documentKeyListAtom.debugLabel = "documentKeyListAtom";
  thaiProvinceAtom.debugLabel = "thaiProvinceAtom";
  countryCodeListAtom.debugLabel = "countryCodeListAtom";
  dbdSyncListAtom.debugLabel = "dbdSyncListAtom";
  financialRatioAtom.debugLabel = "financialRatioAtom";
}
