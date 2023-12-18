import { TRegistrationForm, TResponseAction } from "@/types";
import { useMutation } from "@tanstack/react-query";
import { CustomerService } from "../customer.service";

export const useCustomer = () => {
  const customerService = new CustomerService();
  const { mutateAsync: mutateRegisterCustomer } = useMutation<
    TResponseAction,
    Error,
    TRegistrationForm
  >({
    mutationKey: ["create_customer"],
    mutationFn: customerService.registerCustomer,
  });

  return {
    mutateRegisterCustomer,
  };
};
