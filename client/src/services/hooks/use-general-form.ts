import { queryKey } from "@/helpers/common.helper";
import { useSwal } from "@/hooks/use-swal";
import { useAtomStore } from "@/jotai/use-atom-store";
import { TApprovalList, TGeneralAssessmentForm } from "@/types";
import { useMutation } from "@tanstack/react-query";
import { FormGeneralService } from "..";

export const useFormGeneral = () => {
  const { setApprovalList, setGeneralAssessmentForm } = useAtomStore();
  const { showError, closeSwal } = useSwal();
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

  return {
    mutateGetApprovalsById,
    mutateGetTemplateGeneralAssessmentById,
  };
};
