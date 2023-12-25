import { queryKey } from "@/helpers/common.helper";
import { useSwal } from "@/hooks/use-swal";
import { TResponseAction } from "@/types";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useNavigate } from "react-router-dom";
import { ApprovalsService } from "../approvals.service";

export const useApprovals = () => {
  const queryClient = useQueryClient();
  const navigate = useNavigate();
  const { showLoading, showError, showSuccess, closeSwal } = useSwal();
  const approvalsService = new ApprovalsService();
  /* The code is creating a mutation function called `mutateSendToEdit` using the `useMutation` hook from
the `react-query` library. */
  const { mutateAsync: mutateSendToEdit } = useMutation<
    TResponseAction,
    Error,
    { regis_id: string; comments: string }
  >({
    mutationKey: [queryKey.SENT_TO_EDIT],
    mutationFn: (data: { regis_id: string; comments: string }) =>
      approvalsService.sendToEdit(data),
    onMutate: () => {
      showLoading("กำลังทำรายการ...");
    },
    onSuccess: (data) => {
      queryClient.invalidateQueries({ queryKey: [queryKey.GET_REGIS_LIST] });
      closeSwal();
      if (data?.status === "success") {
        showSuccess(data?.message, "");
        navigate("/registrations");
      } else {
        showError(data?.message, "");
      }
    },
    onError: (error) => {
      closeSwal();
      showError(error?.message, error?.message);
    },
  });

  const { mutateAsync: mutateSendToSuspend } = useMutation<
    TResponseAction,
    Error,
    { regis_id: string; comments: string }
  >({
    mutationKey: [queryKey.SENT_TO_SUSPEND],
    mutationFn: (data: { regis_id: string; comments: string }) =>
      approvalsService.sendToSuspend(data),
    onMutate: () => {
      showLoading("กำลังทำรายการ...");
    },
    onSuccess: (data) => {
      queryClient.invalidateQueries({ queryKey: [queryKey.GET_REGIS_LIST] });
      closeSwal();
      if (data?.status === "success") {
        showSuccess(data?.message, "");
        navigate("/registrations");
      } else {
        showError(data?.message, "");
      }
    },
    onError: (error) => {
      closeSwal();
      showError(error?.message, error?.message);
    },
  });

  const { mutateAsync: mutateEnterCustomerCode } = useMutation<
    TResponseAction,
    Error,
    { regis_id: string; customer_code: string }
  >({
    mutationKey: [queryKey.ENTER_CUSTOMER_CODE],
    mutationFn: (data: { regis_id: string; customer_code: string }) =>
      approvalsService.enterCustomerCode(data),
    onMutate: () => {
      showLoading("กำลังทำรายการ...");
    },
    onSuccess: (data) => {
      queryClient.invalidateQueries({ queryKey: [queryKey.GET_REGIS_LIST] });
      closeSwal();
      if (data?.status === "success") {
        showSuccess(data?.message, "");
        navigate("/registrations");
      } else {
        showError(data?.message, "");
      }
    },
    onError: (error) => {
      closeSwal();
      showError(error?.message, error?.message);
    },
  });

  const { mutateAsync: mutateSentToApprove } = useMutation<
    TResponseAction,
    Error,
    { regis_id: string }
  >({
    mutationKey: [queryKey.SENT_TO_APPROVE],
    mutationFn: (data: { regis_id: string }) =>
      approvalsService.sendToApprove(data?.regis_id),
    onMutate: () => {
      showLoading("กำลังทำรายการ...");
    },
    onSuccess: (data) => {
      queryClient.invalidateQueries({ queryKey: [queryKey.GET_REGIS_LIST] });
      closeSwal();
      if (data?.status === "success") {
        showSuccess(data?.message, "");
        setTimeout(() => {
          navigate("/registrations");
        }, 1500);
      } else {
        showError(data?.message, "");
      }
    },
    onError: (error) => {
      closeSwal();
      showError(error?.message, error?.message);
    },
  });

  const { mutateAsync: mutateSentToReject } = useMutation<
    TResponseAction,
    Error,
    { regis_id: string; comments: string }
  >({
    mutationKey: [queryKey.SENT_TO_REJECT],
    mutationFn: (data: { regis_id: string; comments: string }) =>
      approvalsService.sendToReject(data),
    onMutate: () => {
      showLoading("กำลังทำรายการ...");
    },
    onSuccess: (data) => {
      queryClient.invalidateQueries({ queryKey: [queryKey.GET_REGIS_LIST] });
      closeSwal();
      if (data?.status === "success") {
        showSuccess(data?.message, "");
        setTimeout(() => {
          navigate("/registrations");
        }, 1500);
      } else {
        showError(data?.message, "");
      }
    },
    onError: (error) => {
      closeSwal();
      showError(error?.message, error?.message);
    },
  });

  return {
    mutateSendToEdit,
    mutateSendToSuspend,
    mutateEnterCustomerCode,
    mutateSentToApprove,
    mutateSentToReject,
  };
};
