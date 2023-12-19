import { queryKey } from "@/helpers/common.helper";
import { useAtomStore } from "@/jotai/use-atom-store";
import {
  TBenefitsList,
  TBusinessTypeList,
  TCertificatedList,
  TCompanyPolicyList,
  TDeliveryTermsList,
  TDocumentKeyList,
} from "@/types";
import { useQuery } from "@tanstack/react-query";
import { UtilsService } from "..";

export const useUtils = () => {
  const utilsService = new UtilsService();
  const {
    setBusinessTypeList,
    setDocumentKeyList,
    setCertificatedList,
    setBenefitsList,
    setDeliveryTermsList,
    setCompanyPolicyList,
  } = useAtomStore();

  const {
    isPending: isBusinessTypeListPending,
    isError: isBusinessTypeListError,
    error: businessTypeListError,
    data: businessTypeList,
  } = useQuery({
    queryKey: [queryKey.GET_BUSINESS_TYPE_LIST],
    queryFn: (): Promise<TBusinessTypeList[]> =>
      utilsService.getBusinessTypeList(),
    select(data: TBusinessTypeList[]) {
      // setUtils((prev) => ({ ...prev, businessTypeList: data }));
      setBusinessTypeList(data);
      return data;
    },
  });

  const {
    isPending: isDocumentKeyListPending,
    isError: isDocumentKeyListError,
    error: documentKeyListError,
    data: documentKeyList,
  } = useQuery({
    queryKey: [queryKey.GET_DOCUMENT_KEY_LIST],
    queryFn: (): Promise<TDocumentKeyList> => utilsService.getDocumentKeyList(),
    select(data: TDocumentKeyList) {
      // setUtils((prev) => ({ ...prev, documentKeyList: data }));
      setDocumentKeyList(data);
      return data;
    },
  });

  const {
    isPending: isCertificatedListPending,
    isError: isCertificatedListError,
    error: certificatedListError,
    data: certificatedList,
  } = useQuery({
    queryKey: [queryKey.GET_CERTIFICATED_LIST],
    queryFn: (): Promise<TCertificatedList[]> =>
      utilsService.getCertificatedList(),
    select(data: TCertificatedList[]) {
      // setUtils((prev) => ({ ...prev, certificatedList: data }));
      setCertificatedList(data);
      return data;
    },
  });

  const {
    isPending: isBenefitsListPending,
    isError: isBenefitsListError,
    error: benefitsListError,
    data: benefitsList,
  } = useQuery({
    queryKey: [queryKey.GET_BENEFITS_LIST],
    queryFn: (): Promise<TBenefitsList[]> => utilsService.getBenefitsList(),
    select(data: TBenefitsList[]) {
      // setUtils((prev) => ({ ...prev, benefitsList: data }));
      setBenefitsList(data);
      return data;
    },
  });

  const {
    isPending: isDeliveryTermsListPending,
    isError: isDeliveryTermsListError,
    error: deliveryTermsListError,
    data: deliveryTermsList,
  } = useQuery({
    queryKey: [queryKey.GET_DELIVERY_TERMS_LIST],
    queryFn: (): Promise<TDeliveryTermsList[]> =>
      utilsService.getDeliveryTermsList(),
    select(data: TDeliveryTermsList[]) {
      // setUtils((prev) => ({ ...prev, deliveryTermsList: data }));
      setDeliveryTermsList(data);
      return data;
    },
  });

  const {
    isPending: isCompanyPolicyListPending,
    isError: isCompanyPolicyListError,
    error: companyPolicyListError,
    data: companyPolicyList,
  } = useQuery({
    queryKey: [queryKey.GET_COMPANY_POLICY_LIST],
    queryFn: (): Promise<TCompanyPolicyList[]> =>
      utilsService.getCompanyPolicyList(),
    select(data: TCompanyPolicyList[]) {
      // setUtils((prev) => ({ ...prev, companyPolicyList: data }));
      setCompanyPolicyList(data);
      return data;
    },
  });

  return {
    isBusinessTypeListPending,
    isBusinessTypeListError,
    businessTypeListError,
    businessTypeList,
    isDocumentKeyListPending,
    isDocumentKeyListError,
    documentKeyListError,
    documentKeyList,
    isCertificatedListPending,
    isCertificatedListError,
    certificatedListError,
    certificatedList,
    isBenefitsListPending,
    isBenefitsListError,
    benefitsListError,
    benefitsList,
    isDeliveryTermsListPending,
    isDeliveryTermsListError,
    deliveryTermsListError,
    deliveryTermsList,
    isCompanyPolicyListPending,
    isCompanyPolicyListError,
    companyPolicyListError,
    companyPolicyList,
  };
};
