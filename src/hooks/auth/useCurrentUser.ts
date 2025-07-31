import { useQuery } from "@tanstack/react-query";
import { getProfile } from "@/services/authService";
import { UserResponse } from "@/types/user";

export const useCurrentUser = () => {
  return useQuery<UserResponse>({
    queryKey: ["current-user"],
    queryFn: getProfile,
    staleTime: 1000 * 60 * 5,
    retry: false,
  });
};
