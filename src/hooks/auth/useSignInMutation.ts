import { useMutation } from "@tanstack/react-query";
import { signIn } from "@/services/authService";
import toast from "react-hot-toast";
import { AxiosError } from "axios";
import { LoginSchemaType } from "@/lib/schema/SignInSchema";

export const useSignInMutation = () => {
  return useMutation<unknown, AxiosError, LoginSchemaType>({
    mutationFn: signIn,
    onSuccess: () => {
      toast.success("Login realizado com sucesso!");
    },
    onError: (error: AxiosError) => {
      if (error.response) {
        switch (error.response.status) {
          case 401:
            toast.error("Credenciais inválidas");
            break;
          case 403:
            toast.error("Acesso não autorizado");
            break;
          default:
            toast.error("Erro ao realizar login");
        }
      } else {
        toast.error("Erro de conexão");
      }
    },
  });
};
