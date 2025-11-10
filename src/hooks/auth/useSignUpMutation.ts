import { useMutation } from "@tanstack/react-query";
import { signUp } from "@/services/authService";

export const useSignUpMutation = () => {
  return useMutation({
    mutationFn: signUp
  });
};