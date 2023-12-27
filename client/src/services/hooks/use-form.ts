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
import { useSearchParams } from "react-router-dom";
import { AccService, FormService } from "..";

export const useForm = () => {
  const [searchParams] = useSearchParams();
  const regis_id = searchParams.get("RegisID");
  const accService = new AccService();
  const { setRegisList, setRegistration, setRegisListByAccount } =
    useAtomStore();
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
        showSuccess(data?.message, "");
        setRegistration(InitialRegistration);
        navigate("/registrations");
      } else {
        // showError("ลงทะเบียนไม่สำเร็จ", data?.message);
        showError("ลงทะเบียนไม่สำเร็จ", data?.message);
      }
    },
    onError: (error) => {
      closeSwal();
      showError(error?.message, error?.message);
    },
  });

  const { mutateAsync: mutateUpdateCustomer } = useMutation<
    TResponseAction,
    Error,
    TRegistrationForm
  >({
    mutationKey: [queryKey.UPDATE_REGIS_BY_ID],
    mutationFn: (data: TRegistrationForm) => formService.editCustomer(data),
    onMutate: () => {
      showLoading("กำลังทำรายการ...");
    },
    onSuccess: (data) => {
      queryClient.invalidateQueries({ queryKey: [queryKey.GET_REGIS_LIST] });
      closeSwal();
      if (data?.status === "success") {
        showSuccess(data?.message, "");
        setRegistration(InitialRegistration);
        // navigate("/registrations");
        setTimeout(() => {
          navigate("/registrations/customer/info?RegisID=" + regis_id, {
            state: {
              form_mode: "edit",
            },
          });
        }, 2000);
      } else {
        showError("แก้ไขข้อมูลไม่สำเร็จ", data?.message);
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

  const useGetRegisListByAccountId = () => {
    return useQuery({
      queryKey: [queryKey.GET_REGIS_BY_ACCOUNT_ID],
      queryFn: (): Promise<TRegisList[]> =>
        formService.getRegisListByAccountId(),
      select(data) {
        setRegisListByAccount(data);
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
    // onMutate: () => {
    //   showLoading("กำลังโหลดข้อมูล...");
    // },
    onSuccess: (data) => {
      // closeSwal();
      setRegistration({
        ...data,
        regis_id: data?.regis_id ?? "",
      });
    },
    onError: (error) => {
      closeSwal();
      showError("ไม่พบข้อมูล", error?.message);
      navigate("/registrations");
    },
  });

  const { mutateAsync: mutateDeleteDocById } = useMutation<
    TResponseAction,
    Error,
    { doc_name: string; regis_id: string }
  >({
    mutationKey: [queryKey.DELETE_DOC_BY_ID],
    mutationFn: (data: { doc_name: string; regis_id: string }) =>
      formService.deleteDoc({
        doc_name: data.doc_name,
        regis_id: data.regis_id,
      }),
    onMutate: () => {
      showLoading("กำลังทำรายการ...");
    },
    onSuccess: (data) => {
      queryClient.refetchQueries({
        queryKey: [queryKey.GET_DOC_BY_REGIS_ID],
      });
      closeSwal();
      if (data?.status === "error") {
        showError("ลบไฟล์ไม่สำเร็จ", data?.message);
      }
    },
    onError: (error) => {
      closeSwal();
      showError(error?.message, error?.message);
    },
  });

  const { mutateAsync: mutateConfirmDBDInfo } = useMutation<
    TResponseAction,
    Error,
    string
  >({
    mutationKey: [queryKey.CONFIRM_DBD_INFO],
    mutationFn: (data: string) => accService.confirmDBDInfo(data),
    onMutate: () => {
      showLoading("กำลังทำรายการ...");
    },
    onSuccess: (data) => {
      queryClient.refetchQueries({
        queryKey: [queryKey.GET_REGIS_BY_ID],
      });
      closeSwal();
      if (data?.status === "success") {
        showSuccess(data?.message, "");
        setTimeout(() => {
          navigate("/registrations");
        }, 2000);
      } else {
        showError("ยืนยันข้อมูลไม่สำเร็จ", data?.message);
      }
    },
    onError: (error) => {
      closeSwal();
      showError(error?.message, error?.message);
    },
  });

  return {
    mutateCreateNewCustomer,
    useGetRegisList,
    mutateUploadFile,
    mutateGetRegisById,
    mutateDeleteDocById,
    mutateUpdateCustomer,
    mutateConfirmDBDInfo,
    useGetRegisListByAccountId,
  };
};
