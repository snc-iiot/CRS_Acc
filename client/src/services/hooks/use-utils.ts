import { queryKey } from "@/helpers/common.helper";
import { useSwal } from "@/hooks/use-swal";
import { useAtomStore } from "@/jotai/use-atom-store";
import {
  TBenefitsList,
  TBusinessTypeList,
  TCertificatedList,
  TCommitList,
  TCompanyList,
  TCompanyPolicyList,
  TCountryCodeList,
  TDBDSyncList,
  TDeliveryTermsList,
  TDocByRegisId,
  TDocumentKeyList,
  TFinancialRatio,
  TResponseAction,
} from "@/types";
import { useMutation, useQuery } from "@tanstack/react-query";
import { useSearchParams } from "react-router-dom";
import { FormService, UtilsService } from "..";

export const useUtils = () => {
  const { setDBDSyncList, setFinancialRatio } = useAtomStore();
  const [searchParams] = useSearchParams();
  const regisId = searchParams.get("RegisID") as string;

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
    setComment,
    setCommentR3,
  } = useAtomStore();

  const useGetBusinessTypeList = async () => {
    return useQuery({
      queryKey: [queryKey.GET_BUSINESS_TYPE_LIST],
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
      showError("เกิดข้อผิดพลาด", error?.message);
    },
  });

  const { mutateAsync: mutateGetRegisterId } = useMutation<
    TResponseAction,
    Error
  >({
    mutationKey: [queryKey.CREATE_REGISTER_ID],
    mutationFn: utilsService.createRegisterId,
    onMutate: () => {
      showLoading("กำลังสร้างฟอร์มผู้ลงทะเบียน", "กรุณารอสักครู่");
    },
    onSuccess: (data) => {
      closeSwal();
      if (data.status == "success") {
        mutateGetDocByRegisId(data?.data?.[0]?.regis_id || "");
        showSuccess("สร้างฟอร์มผู้ลงทะเบียนสำเร็จ", "");
      } else {
        showError("สร้างฟอร์มผู้ลงทะเบียนไม่สำเร็จ", data?.message);
      }
    },
    onError: (error) => {
      closeSwal();
      showError("เกิดข้อผิดพลาด", error?.message);
    },
  });

  const { mutateAsync: mutateGetCommentByRegisId } = useMutation<
    TCommitList,
    Error,
    string
  >({
    mutationKey: [queryKey.GET_COMMENT_BY_REGIS_ID],
    mutationFn: (regisId: string) => utilsService.getCommentList(regisId),
    onSuccess: (data) => {
      setComment(data);
    },
    onError: (error) => {
      showError("เกิดข้อผิดพลาด", error?.message);
    },
  });

  const { mutateAsync: mutateGetCommentByRegisIdR3 } = useMutation<
    TCommitList,
    Error,
    string
  >({
    mutationKey: [queryKey.GET_COMMENT_BY_REGIS_ID_R3],
    mutationFn: (regisId: string) => utilsService.getCommentR3List(regisId),
    onSuccess: (data) => {
      setCommentR3(data);
    },
    onError: (error) => {
      showError("เกิดข้อผิดพลาด", error?.message);
    },
  });

  const { mutateAsync: mutateCreateComment } = useMutation<
    TResponseAction,
    Error,
    { regisId: string; comment: string }
  >({
    mutationKey: [queryKey.CREATE_COMMENT],
    mutationFn: ({ regisId, comment }) =>
      utilsService.createComment(regisId, comment),
    onMutate: () => {
      showLoading("กำลังสร้างข้อเสนอแนะ", "กรุณารอสักครู่");
    },
    onSuccess: (data) => {
      closeSwal();
      if (data.status == "success") {
        mutateGetCommentByRegisId(regisId);
        showSuccess(data?.message, "");
      } else {
        showError("สร้างข้อเสนอแนะไม่สำเร็จ", data?.message);
      }
    },
    onError: (error) => {
      closeSwal();
      showError("เกิดข้อผิดพลาด", error?.message);
    },
  });

  const { mutateAsync: mutateCreateCommentR3 } = useMutation<
    TResponseAction,
    Error,
    { regisId: string; comment: string }
  >({
    mutationKey: [queryKey.CREATE_COMMENT],
    mutationFn: ({ regisId, comment }) =>
      utilsService.createCommentR3(regisId, comment),
    onMutate: () => {
      showLoading("กำลังสร้างข้อเสนอแนะ", "กรุณารอสักครู่");
    },
    onSuccess: (data) => {
      closeSwal();
      if (data.status == "success") {
        mutateGetCommentByRegisId(regisId);
        mutateGetCommentByRegisIdR3(regisId);
        showSuccess(data?.message, "");
      } else {
        showError(data?.message, "");
      }
    },
    onError: (error) => {
      closeSwal();
      showError("เกิดข้อผิดพลาด", error?.message);
    },
  });

  const { mutateAsync: mutateSyncDBD } = useMutation<
    TDBDSyncList,
    Error,
    string
  >({
    mutationKey: [queryKey.GET_SYNC_DBD],
    mutationFn: (regisId: string) => utilsService.getDBDSyncList(regisId),
    onSuccess: (data) => {
      setDBDSyncList(data);
    },
    onError: (error) => {
      showError("เกิดข้อผิดพลาด", error?.message);
    },
  });

  const { mutateAsync: mutateGetDBDInfo } = useMutation<
    TDBDSyncList,
    Error,
    string
  >({
    mutationKey: [queryKey.GET_DBD_INFO],
    mutationFn: (regisId: string) => utilsService.getDBDInfo(regisId),
    onSuccess: (data) => {
      setDBDSyncList(data);
    },
    onError: (error) => {
      showError("เกิดข้อผิดพลาด", error?.message);
    },
  });

  const { mutateAsync: mutateGetFinancialRatio } = useMutation<
    TFinancialRatio,
    Error,
    string
  >({
    mutationKey: [queryKey.GET_FINANCIAL_RATIO],
    mutationFn: (regisId: string) => utilsService.getFinancialRatio(regisId),
    onSuccess: (data) => {
      setFinancialRatio(data);
    },
    onError: (error) => {
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
    useGetCountryCodeList,
    mutateGetDocByRegisId,
    mutateGetCommentByRegisId,
    mutateCreateComment,
    mutateSyncDBD,
    mutateGetDBDInfo,
    mutateGetCommentByRegisIdR3,
    mutateCreateCommentR3,
    mutateGetFinancialRatio,
  };
};
