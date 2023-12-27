import { QUERY_KEYS } from "@/helpers/common.helper";
import BU_BENEFITS from "@/mocks/initial-value/benefit-list.json";
import BU_BUSINESS_TYPE from "@/mocks/initial-value/business-types-list.json";
import BU_CERTIFICATE from "@/mocks/initial-value/certificate-list.json";
import BU_COMPANY_LIST from "@/mocks/initial-value/company-list.json";
import BU_COMPANY_POLICY from "@/mocks/initial-value/company-policy.json";
import BU_COUNTRY_CODE from "@/mocks/initial-value/county-code-list.json";
import BU_DELIVERY_TERMS from "@/mocks/initial-value/delivery-list.json";
import { useAtomStore } from "@/store/use-atom-store";
import {
  TBenefitsList,
  TBusinessTypeList,
  TCertificatedList,
  TCompanyList,
  TCompanyPolicyList,
  TCountryCodeList,
  TDeliveryTermsList,
} from "@/types";
import { useQuery } from "@tanstack/react-query";
import { UtilsService } from "../utils.service";

export const useUtils = () => {
  const utilsService = new UtilsService();
  const {
    setBusinessTypeList,
    setCertificatedList,
    setBenefitsList,
    setDeliveryTermsList,
    setCompanyPolicyList,
    setCompanyList,
    setCountryCodeList,
  } = useAtomStore();

  const useGetBusinessTypeList = async () => {
    return useQuery({
      queryKey: [QUERY_KEYS.GET_BUSINESS_TYPE_LIST],
      queryFn: (): Promise<TBusinessTypeList[]> =>
        utilsService.getBusinessTypeList(),
      select(data: TBusinessTypeList[]) {
        if (data.length === 0) {
          setBusinessTypeList(BU_BUSINESS_TYPE);
        }
        setBusinessTypeList(data);
        return data;
      },
    });
  };

  const useGetCertificatedList = async () => {
    return useQuery({
      queryKey: [QUERY_KEYS.GET_CERTIFICATED_LIST],
      queryFn: (): Promise<TCertificatedList[]> =>
        utilsService.getCertificatedList(),
      select(data: TCertificatedList[]) {
        if (data.length === 0) {
          setCertificatedList(BU_CERTIFICATE);
        } else {
          setCertificatedList(data);
          return data;
        }
      },
    });
  };

  const useGetBenefitsList = async () => {
    return useQuery({
      queryKey: [QUERY_KEYS.GET_BENEFITS_LIST],
      queryFn: (): Promise<TBenefitsList[]> => utilsService.getBenefitsList(),
      select(data: TBenefitsList[]) {
        if (data.length === 0) {
          setBenefitsList(BU_BENEFITS);
        } else {
          setBenefitsList(data);
          return data;
        }
      },
    });
  };

  const useGetDeliveryTermsList = async () => {
    return useQuery({
      queryKey: [QUERY_KEYS.GET_DELIVERY_TERMS_LIST],
      queryFn: (): Promise<TDeliveryTermsList[]> =>
        utilsService.getDeliveryTermsList(),
      select(data: TDeliveryTermsList[]) {
        if (data.length === 0) {
          setDeliveryTermsList(BU_DELIVERY_TERMS);
        } else {
          setDeliveryTermsList(data);
          return data;
        }
      },
    });
  };

  const useGetCompanyPolicyList = async () => {
    return useQuery({
      queryKey: [QUERY_KEYS.GET_COMPANY_POLICY_LIST],
      queryFn: (): Promise<TCompanyPolicyList[]> =>
        utilsService.getCompanyPolicyList(),
      select(data: TCompanyPolicyList[]) {
        if (data.length === 0) {
          setCompanyPolicyList(BU_COMPANY_POLICY);
        } else {
          setCompanyPolicyList(data);
          return data;
        }
      },
    });
  };

  const useGetCompanyList = async () => {
    return useQuery({
      queryKey: [QUERY_KEYS.GET_COMPANY_LIST],
      queryFn: (): Promise<TCompanyList[]> => utilsService.getCompanyList(),
      select(data: TCompanyList[]) {
        if (data.length === 0) {
          setCompanyList(BU_COMPANY_LIST);
        } else {
          setCompanyList(data);
          return data;
        }
      },
    });
  };

  const useGetCountryCodeList = async () => {
    return useQuery<TCountryCodeList[], Error>({
      queryKey: [QUERY_KEYS.GET_COUNTRY_CODE_LIST],
      queryFn: (): Promise<TCountryCodeList[]> =>
        utilsService.getCountryCodeList(),
      select: (data: TCountryCodeList[]) => {
        if (data.length === 0) {
          setCountryCodeList(BU_COUNTRY_CODE);
        }
        setCountryCodeList(data);
        return data;
      },
    });
  };

  return {
    useGetBusinessTypeList,
    useGetCertificatedList,
    useGetBenefitsList,
    useGetDeliveryTermsList,
    useGetCompanyPolicyList,
    useGetCompanyList,
    useGetCountryCodeList,
  };
};
