import { TRegistrationForm } from "@/types";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  FormState,
  useForm,
  UseFormRegister,
  UseFormReset,
  UseFormSetValue,
  UseFormWatch,
} from "react-hook-form";
import { registrationSchema } from "../validation/registration";

export const useRegistrationForm = (defaultValues?: TRegistrationForm) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
    watch,
    setValue,
    reset,
  } = useForm<TRegistrationForm>({
    resolver: zodResolver(registrationSchema),
    defaultValues: defaultValues,
  });

  return {
    register,
    handleSubmit,
    errors,
    watch,
    setValue,
    reset,
  };
};

export interface PropsRegistrationForm {
  errors: FormState<TRegistrationForm>["errors"];
  register: UseFormRegister<TRegistrationForm>;
  watch: UseFormWatch<TRegistrationForm>;
  setValue: UseFormSetValue<TRegistrationForm>;
  reset: UseFormReset<TRegistrationForm>;
}
