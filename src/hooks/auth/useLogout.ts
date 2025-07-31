"use client";

import { useRouter } from "next/navigation";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import axios from "@/lib/axios";
import toast from "react-hot-toast";

export function useLogout() {
  const router = useRouter();
  const queryClient = useQueryClient();

  const { mutate: logout, isPending } = useMutation({
    mutationFn: async () => {
      await axios.post("/auth/logout");
    },
    onSuccess: () => {
      queryClient.removeQueries();
      toast.success("Logout realizado com sucesso");
      router.push("/auth/signin");
    },
    onError: () => {
      toast.error("Erro ao tentar sair da conta");
    },
  });

  return { logout, isPending };
}
