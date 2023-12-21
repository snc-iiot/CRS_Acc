import { queryKey } from "@/helpers/common.helper";
import { InitialRegistration } from "@/helpers/register.helper";
import { useSwal } from "@/hooks/use-swal";
import { useAtomStore } from "@/jotai/use-atom-store";
import {
  TRegisList,
  TRegistrationForm,
  TResponseAction,
  TUploadFile,
} from "@/types";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useNavigate } from "react-router";
import { FormService } from "..";

export const useForm = () => {
  const { setRegisList, setRegistration } = useAtomStore();
  const queryClient = useQueryClient();
  const formService = new FormService();
  const { closeSwal, showError, showSuccess, showLoading } = useSwal();
  const navigate = useNavigate();

  const { mutateAsync: mutateCreateNewCustomer } = useMutation<
    TResponseAction,
    Error,
    TRegistrationForm
  >({
    mutationKey: [queryKey.CREATE_NEW_CUSTOMER],
    mutationFn: (data: TRegistrationForm) =>
      formService.createNewCustomer(data),
    onMutate: () => {
      showLoading("กำลังทำรายการ...");
    },
    onSuccess: (data) => {
      queryClient.invalidateQueries({ queryKey: [queryKey.GET_REGIS_LIST] });
      closeSwal();
      if (data?.status === "success") {
        showSuccess("ลงทะเบียนสำเร็จ", data?.message);
        setRegistration(InitialRegistration);
        navigate("/registrations");
      } else {
        showError("ลงทะเบียนไม่สำเร็จ", data?.message);
      }
    },
    onError: (error) => {
      closeSwal();
      showError(error?.message, error?.message);
    },
  });

  const useGetRegisList = () => {
    return useQuery({
      queryKey: [queryKey.GET_REGIS_LIST],
      queryFn: (): Promise<TRegisList[]> => formService.getRegisList(),
      select(data) {
        setRegisList(data);
        return data;
      },
      refetchOnWindowFocus: false,
      refetchInterval: 10000,
    });
  };

  const { mutateAsync: mutateUploadFile } = useMutation<
    TResponseAction,
    Error,
    { req: TUploadFile; setProgress: (progress: number) => void }
  >({
    mutationKey: [queryKey.UPLOAD_FILE],
    mutationFn: (data: {
      req: TUploadFile;
      setProgress: (progress: number) => void;
    }) => formService.uploadFile(data.req, data.setProgress),

    onSuccess: (data) => {
      queryClient.refetchQueries({
        queryKey: [queryKey.GET_DOC_BY_REGIS_ID],
      });
      closeSwal();
      if (data?.status === "error") {
        showError("อัพโหลดไฟล์ไม่สำเร็จ", data?.message);
      }
    },
    onError: (error) => {
      closeSwal();
      showError(error?.message, error?.message);
    },
  });

  const { mutateAsync: mutateGetRegisById } = useMutation<
    TRegistrationForm,
    Error,
    string
  >({
    mutationKey: [queryKey.GET_REGIS_BY_ID],
    mutationFn: (data: string) => formService.getRegisById(data),
    onMutate: () => {
      showLoading("กำลังโหลดข้อมูล...");
    },
    onSuccess: (data) => {
      closeSwal();
      setRegistration(data);
    },
    onError: (error) => {
      closeSwal();
      showError("ไม่พบข้อมูล", error?.message);
      navigate("/registrations");
    },
  });

  return {
    mutateCreateNewCustomer,
    useGetRegisList,
    mutateUploadFile,
    mutateGetRegisById,
  };
};
