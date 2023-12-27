import { QUERY_KEYS } from "@/helpers/common.helper";
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
          setBusinessTypeList([]);
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
        setCertificatedList(data);
        return data;
      },
    });
  };

  const useGetBenefitsList = async () => {
    return useQuery({
      queryKey: [QUERY_KEYS.GET_BENEFITS_LIST],
      queryFn: (): Promise<TBenefitsList[]> => utilsService.getBenefitsList(),
      select(data: TBenefitsList[]) {
        setBenefitsList(data);
        return data;
      },
    });
  };

  const useGetDeliveryTermsList = async () => {
    return useQuery({
      queryKey: [QUERY_KEYS.GET_DELIVERY_TERMS_LIST],
      queryFn: (): Promise<TDeliveryTermsList[]> =>
        utilsService.getDeliveryTermsList(),
      select(data: TDeliveryTermsList[]) {
        setDeliveryTermsList(data);
        return data;
      },
    });
  };

  const useGetCompanyPolicyList = async () => {
    return useQuery({
      queryKey: [QUERY_KEYS.GET_COMPANY_POLICY_LIST],
      queryFn: (): Promise<TCompanyPolicyList[]> =>
        utilsService.getCompanyPolicyList(),
      select(data: TCompanyPolicyList[]) {
        setCompanyPolicyList(data);
        return data;
      },
    });
  };

  const useGetCompanyList = async () => {
    return useQuery({
      queryKey: [QUERY_KEYS.GET_COMPANY_LIST],
      queryFn: (): Promise<TCompanyList[]> => utilsService.getCompanyList(),
      select(data: TCompanyList[]) {
        setCompanyList(data);
        return data;
      },
    });
  };

  const useGetCountryCodeList = async () => {
    return useQuery<TCountryCodeList[], Error>({
      queryKey: [QUERY_KEYS.GET_COUNTRY_CODE_LIST],
      queryFn: (): Promise<TCountryCodeList[]> =>
        utilsService.getCountryCodeList(),
      select: (data: TCountryCodeList[]) => {
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
