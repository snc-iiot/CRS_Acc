import { queryKey } from "@/helpers/common.helper";
import { useSwal } from "@/hooks/use-swal";
import { useAtomStore } from "@/jotai/use-atom-store";
import MockBusinessTypeList from "@/mock/business-type-list.json";
import MockCompanyList from "@/mock/company-list.json";
import {
  TBenefitsList,
  TBusinessTypeList,
  TCertificatedList,
  TCompanyList,
  TCompanyPolicyList,
  TCountryCodeList,
  TDeliveryTermsList,
  TDocByRegisId,
  TDocumentKeyList,
  TResponseAction,
} from "@/types";
import { useMutation, useQuery } from "@tanstack/react-query";
import { FormService, UtilsService } from "..";

export const useUtils = () => {
  const { closeSwal, showError, showSuccess, showLoading } = useSwal();
  const utilsService = new UtilsService();
  const formService = new FormService();
  // const queryClient = useQueryClient();

  const {
    setBusinessTypeList,
    setDocumentKeyList,
    setCertificatedList,
    setBenefitsList,
    setDeliveryTermsList,
    setCompanyPolicyList,
    setCompanyList,
    setCountryCodeList,
    setDocByRegisId,
  } = useAtomStore();

  const useGetBusinessTypeList = async () => {
    return useQuery({
      queryKey: [queryKey.GET_BUSINESS_TYPE_LIST],
      queryFn: (): Promise<TBusinessTypeList[]> =>
        utilsService.getBusinessTypeList(),
      select(data: TBusinessTypeList[]) {
        if (data.length === 0) {
          setBusinessTypeList(MockBusinessTypeList);
        }
        setBusinessTypeList(MockBusinessTypeList);
        return data;
      },
    });
  };

  const useGetDocumentKeyList = async () => {
    return useQuery({
      queryKey: [queryKey.GET_DOCUMENT_KEY_LIST],
      queryFn: (): Promise<TDocumentKeyList> =>
        utilsService.getDocumentKeyList(),
      select(data: TDocumentKeyList) {
        setDocumentKeyList(data);
        return data;
      },
    });
  };

  const useGetCertificatedList = async () => {
    useQuery({
      queryKey: [queryKey.GET_CERTIFICATED_LIST],
      queryFn: (): Promise<TCertificatedList[]> =>
        utilsService.getCertificatedList(),
      select(data: TCertificatedList[]) {
        setCertificatedList(data);
        return data;
      },
    });
  };

  const useGetBenefitsList = async () => {
    useQuery({
      queryKey: [queryKey.GET_BENEFITS_LIST],
      queryFn: (): Promise<TBenefitsList[]> => utilsService.getBenefitsList(),
      select(data: TBenefitsList[]) {
        setBenefitsList(data);
        return data;
      },
    });
  };

  const useGetDeliveryTermsList = async () => {
    useQuery({
      queryKey: [queryKey.GET_DELIVERY_TERMS_LIST],
      queryFn: (): Promise<TDeliveryTermsList[]> =>
        utilsService.getDeliveryTermsList(),
      select(data: TDeliveryTermsList[]) {
        setDeliveryTermsList(data);
        return data;
      },
    });
  };

  const useGetCompanyPolicyList = async () => {
    useQuery({
      queryKey: [queryKey.GET_COMPANY_POLICY_LIST],
      queryFn: (): Promise<TCompanyPolicyList[]> =>
        utilsService.getCompanyPolicyList(),
      select(data: TCompanyPolicyList[]) {
        setCompanyPolicyList(data);
        return data;
      },
    });
  };

  const useGetCompanyList = async () => {
    useQuery({
      queryKey: [queryKey.GET_COMPANY_LIST],
      queryFn: (): Promise<TCompanyList[]> => utilsService.getCompanyList(),
      select(data: TCompanyList[]) {
        if (data.length === 0) {
          setCompanyList(MockCompanyList);
        }
        setCompanyList(data);
        return data;
      },
    });
  };

  const useGetCountryCodeList = async () => {
    useQuery<TCountryCodeList[], Error>({
      queryKey: [queryKey.GET_COUNTRY_CODE_LIST],
      queryFn: (): Promise<TCountryCodeList[]> =>
        utilsService.getCountryCodeList(),
      select: (data: TCountryCodeList[]) => {
        setCountryCodeList(data);
        return data;
      },
    });
  };

  const { mutateAsync: mutateGetDocByRegisId } = useMutation<
    TDocByRegisId,
    Error,
    string
  >({
    mutationKey: [queryKey.GET_DOC_BY_REGIS_ID],
    mutationFn: (regisId: string) => formService.getDocByRegisId(regisId),
    onSuccess: (data) => {
      setDocByRegisId(data);
    },
    onError: (error) => {
      closeSwal();
      showError("เกิดข้อผิดพลาด", error?.message);
    },
  });

  const { mutateAsync: mutateGetRegisterId, data: dataGetRegisterId } =
    useMutation<TResponseAction, Error>({
      mutationKey: [queryKey.CREATE_REGISTER_ID],
      mutationFn: utilsService.createRegisterId,
      onMutate: () => {
        showLoading("กำลังสร้างฟอร์มผู้ลงทะเบียน", "กรุณารอสักครู่");
      },
      onSuccess: (data) => {
        closeSwal();
        if (data.status == "success") {
          mutateGetDocByRegisId(data?.data?.[0]?.regis_id || "");
          showSuccess("สร้างฟอร์มผู้ลงทะเบียนสำเร็จ", data?.message);
        } else {
          showError("สร้างฟอร์มผู้ลงทะเบียนไม่สำเร็จ", data?.message);
        }
      },
      onError: (error) => {
        closeSwal();
        showError("เกิดข้อผิดพลาด", error?.message);
      },
    });

  return {
    useGetBusinessTypeList,
    useGetDocumentKeyList,
    useGetCertificatedList,
    useGetBenefitsList,
    useGetDeliveryTermsList,
    useGetCompanyPolicyList,
    useGetCompanyList,
    mutateGetRegisterId,
    dataGetRegisterId,
    useGetCountryCodeList,
    mutateGetDocByRegisId,
  };
};
