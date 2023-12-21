import { queryKey } from "@/helpers/common.helper";
import { useSwal } from "@/hooks/use-swal";
import { useAtomStore } from "@/jotai/use-atom-store";
import { TRegisList, TRegistrationForm, TResponseAction } from "@/types";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { FormService } from "..";

export const useForm = () => {
  const { setRegisList } = useAtomStore();
  const queryClient = useQueryClient();
  const formService = new FormService();
  const { closeSwal, showError, showSuccess, showLoading } = useSwal();

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
      if (data?.status == "success") {
        showSuccess("ลงทะเบียนสำเร็จ", data?.message);
      } else {
        console.log(data);
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

  return {
    mutateCreateNewCustomer,
    useGetRegisList,
  };
};
