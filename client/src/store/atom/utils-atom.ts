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
  documentKeyList: [] as TDocumentKeyList[],
});
