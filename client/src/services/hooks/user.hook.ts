import { useMutation } from "@tanstack/react-query";
import { UserService } from "../user.service";

const userService = new UserService();

export const useUser = () => {
  const { mutateAsync, isError, error, data } = useMutation({
    mutationFn: () => userService.getUser(),
    onSuccess: (data) => {
      console.log("useUser onSuccess:", data);
    },
    onError: (error) => {
      console.error("useUser onError:", error);
    },
    onSettled: (data, error) => {
      console.log("useUser onSettled:", data, error);
    },
  });

  return { mutateAsync, isError, error, data };
};
