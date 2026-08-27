import { useQuery } from '@tanstack/react-query';
import { AuthQueryKeys } from '../../keys/AuthKeys';
import { AuthService } from '../../services/AuthService';
import type { IUseGetMeOptions } from './interfaces';

export function useGetMe({ enabled }: IUseGetMeOptions = {}) {
  const { data, refetch } = useQuery({
    queryKey: [AuthQueryKeys.GET_ME],
    queryFn: AuthService.getMe,
    staleTime: Number.POSITIVE_INFINITY,
    enabled: enabled ?? true
  });

  return {
    user: data,
    loadUser: refetch
  };
}
