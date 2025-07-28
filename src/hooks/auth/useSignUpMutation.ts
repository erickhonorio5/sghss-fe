"use client";

import { useMutation } from "@tanstack/react-query";
import { signUp } from "@/services/authService";
import toast from "react-hot-toast";
import { AxiosError } from "axios";

export const useSignUpMutation = () => {

  return useMutation({
    mutationFn: signUp,
    onSuccess: () => {
      toast.success("Cadastro realizado com sucesso!");
    },
    onError: (error: AxiosError) => {
      toast.error(
          error.response?.status === 409
              ? "Usuário já existe"
              : "Erro ao realizar cadastro"
      );
    }
  });
};
