import { useSwal } from "@/hooks/use-swal";
import { TRegistrationForm, TResponseAction } from "@/types";
import { useMutation } from "@tanstack/react-query";
import { CustomerService } from "../customer.service";

export const useCustomer = () => {
  const { showLoading, showError, closeSwal, showSuccess } = useSwal();
  const customerService = new CustomerService();
  const { mutateAsync: mutateRegisterCustomer } = useMutation<
    TResponseAction,
    Error,
    TRegistrationForm
  >({
    mutationKey: ["create_customer"],
    mutationFn: customerService.registerCustomer,
    onMutate: () => {
      showLoading();
    },
    onSuccess(data) {
      closeSwal();
      if (data.status === "success") {
        showSuccess(data.message, "");
      } else {
        showError(data.message, "");
      }
    },
    onError(error) {
      closeSwal();
      showError(error.message, "");
    },
  });
  return {
    mutateRegisterCustomer,
  };
};
