import { useMutation } from "@tanstack/react-query";
import { signIn } from "@/services/authService";
import { AxiosError } from "axios";
import { LoginSchemaType } from "@/lib/schema/SignInSchema";

export const useSignInMutation = () => {
  return useMutation<unknown, AxiosError, LoginSchemaType>({
    mutationFn: signIn,
  });
};