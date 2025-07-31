import { useMutation } from "@tanstack/react-query";
import { logout } from "@/services/authService";
import { useQueryClient } from "@tanstack/react-query";
import { useRouter } from "next/navigation";

export function useLogoutMutation() {
  const queryClient = useQueryClient();
  const router = useRouter();

  const { mutateAsync: performLogout, isPending } = useMutation({
    mutationFn: logout,
    onSuccess: () => {
      queryClient.clear();
      router.refresh();
    }
  });

  return { performLogout, isPending };
}