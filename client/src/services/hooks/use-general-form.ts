import { queryKey } from "@/helpers/common.helper";
import { useSwal } from "@/hooks/use-swal";
import { useAtomStore } from "@/jotai/use-atom-store";
import {
  TApprovalList,
  TCompanyProfile,
  TGeneralAssessmentForm,
  TResponseAction,
  TSummaryPart1,
  TSummaryPart2,
} from "@/types";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useNavigate } from "react-router-dom";
import { FormGeneralService } from "..";

export const useFormGeneral = () => {
  const queryClient = useQueryClient();
  const navigate = useNavigate();
  const {
    setApprovalList,
    setGeneralAssessmentForm,
    setSummaryPart2,
    setCompanyProfile,
    setSummaryPart1,
  } = useAtomStore();
  const { showError, closeSwal, showSuccess, showLoading } = useSwal();
  const formGeneralService = new FormGeneralService();

  const { mutateAsync: mutateGetApprovalsById } = useMutation<
    TApprovalList[],
    Error,
    string
  >({
    mutationKey: [queryKey.GET_DOC_BY_REGIS_ID],
    mutationFn: (regisId: string) =>
      formGeneralService.getApprovalsById(regisId),
    onSuccess: (data) => {
      setApprovalList(data);
    },
    onError: (error) => {
      closeSwal();
      showError("เกิดข้อผิดพลาด", error?.message);
    },
  });

  const { mutateAsync: mutateGetTemplateGeneralAssessmentById } = useMutation<
    TGeneralAssessmentForm,
    Error,
    string
  >({
    mutationKey: [queryKey.GET_TEMPLATE_GENERAL_ASSESSMENT_BY_ID],
    mutationFn: (regisId: string) =>
      formGeneralService.getTemplateGeneralAssessmentById(regisId),
    onSuccess: (data) => {
      setGeneralAssessmentForm(data);
    },
    onError: (error) => {
      closeSwal();
      showError("เกิดข้อผิดพลาด", error?.message);
    },
  });

  const { mutateAsync: mutateCreateGeneralAssessment } = useMutation<
    TResponseAction,
    Error,
    TGeneralAssessmentForm
  >({
    mutationKey: [queryKey.CREATE_GENERAL_ASSESSMENT],
    mutationFn: (payload: TGeneralAssessmentForm) =>
      formGeneralService.createGeneralAssessment(payload),
    onMutate: () => {
      showLoading("กำลังทำรายการ...");
    },
    onSuccess: (data) => {
      queryClient.invalidateQueries({
        queryKey: [queryKey.GET_REGIS_LIST],
      });
      closeSwal();
      if (data.status === "success") {
        showSuccess(data.message, "");
        navigate("/registrations");
      } else {
        showError("เกิดข้อผิดพลาด", data.message);
      }
    },
    onError: (error) => {
      closeSwal();
      showError("เกิดข้อผิดพลาด", error?.message);
    },
  });

  const { mutateAsync: mutateUpdateGeneralAssessment } = useMutation<
    TResponseAction,
    Error,
    TGeneralAssessmentForm
  >({
    mutationKey: [queryKey.UPDATE_GENERAL_ASSESSMENT],
    mutationFn: (payload: TGeneralAssessmentForm) =>
      formGeneralService.updateGeneralAssessment(payload),
    onMutate: () => {
      showLoading("กำลังทำรายการ...");
    },
    onSuccess: (data) => {
      queryClient.invalidateQueries({
        queryKey: [queryKey.GET_REGIS_LIST],
      });
      closeSwal();
      if (data.status === "success") {
        showSuccess(data.message, "");
        navigate("/registrations");
      } else {
        showError("เกิดข้อผิดพลาด", data.message);
      }
    },
    onError: (error) => {
      closeSwal();
      showError("เกิดข้อผิดพลาด", error?.message);
    },
  });

  const { mutateAsync: mutateGetSummaryPart1 } = useMutation<
    TSummaryPart1[],
    Error,
    string
  >({
    mutationKey: [queryKey.GET_SUMMARY_BY_REGIS_ID_PART_1],
    mutationFn: (regisId: string) =>
      formGeneralService.getSummaryByRegisIdPart1(regisId),
    onSuccess: (data) => {
      setSummaryPart1(data);
    },
    onError: (error) => {
      closeSwal();
      showError("เกิดข้อผิดพลาด", error?.message);
    },
  });

  const { mutateAsync: mutateGetSummaryPart2 } = useMutation<
    TSummaryPart2[],
    Error,
    string
  >({
    mutationKey: [queryKey.GET_SUMMARY_BY_REGIS_ID_PART_2],
    mutationFn: (regisId: string) =>
      formGeneralService.getSummaryByRegisIdPart2(regisId),
    onSuccess: (data) => {
      setSummaryPart2(data);
    },
    onError: (error) => {
      closeSwal();
      showError("เกิดข้อผิดพลาด", error?.message);
    },
  });

  const { mutateAsync: mutateGetCompanyProfile } = useMutation<
    TCompanyProfile,
    Error,
    string
  >({
    mutationKey: [queryKey.GET_COMPANY_PROFILE],
    mutationFn: (regisId: string) =>
      formGeneralService.getCompanyProfile(regisId),
    onSuccess: (data) => {
      setCompanyProfile(data);
    },
    onError: (error) => {
      closeSwal();
      showError("เกิดข้อผิดพลาด", error?.message);
    },
  });

  return {
    mutateGetApprovalsById,
    mutateGetTemplateGeneralAssessmentById,
    mutateCreateGeneralAssessment,
    mutateUpdateGeneralAssessment,
    mutateGetSummaryPart2,
    mutateGetCompanyProfile,
    mutateGetSummaryPart1,
  };
};
