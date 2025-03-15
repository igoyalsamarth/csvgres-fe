import { useQuery, useMutation, UseQueryOptions, UseMutationOptions } from '@tanstack/react-query';
import axiosInstance from '@/lib/axios';
import { AxiosError } from 'axios';
import { useAuthToken } from './useAuthToken';


export function useApiQuery<T>(
  key: string[],
  endpoint: string,
  options?: Omit<UseQueryOptions<T, AxiosError>, 'queryKey' | 'queryFn'>
) {
  const { isSignedIn, isLoaded } = useAuthToken(); // Get auth status

  return useQuery<T, AxiosError>({
    queryKey: key,
    queryFn: async () => {
      if (!isLoaded) throw new Error('Auth not loaded');
      if (!isSignedIn) throw new Error('Not signed in');

      const response = await axiosInstance.get(endpoint);
      return response.data;
    },
    enabled: isLoaded && isSignedIn, // Only run query when auth is ready
    ...options,
  });
}

export function useApiMutation<T, TVariables>(
  endpoint: string,
  options?: Omit<UseMutationOptions<T, AxiosError, TVariables>, 'mutationFn'>
) {
  const { isSignedIn, isLoaded } = useAuthToken();

  return useMutation<T, AxiosError, TVariables>({
    mutationFn: async (variables) => {
      if (!isLoaded) throw new Error('Auth not loaded');
      if (!isSignedIn) throw new Error('Not signed in');

      const response = await axiosInstance.post(endpoint, variables);
      return response.data;
    },
    ...options,
  });
}

export function useApiPut<T, TVariables>(
  endpoint: string,
  options?: Omit<UseMutationOptions<T, AxiosError, TVariables>, 'mutationFn'>
) {
  const { isSignedIn, isLoaded } = useAuthToken();

  return useMutation<T, AxiosError, TVariables>({
    mutationFn: async (variables) => {
      if (!isLoaded) throw new Error('Auth not loaded');
      if (!isSignedIn) throw new Error('Not signed in');

      const response = await axiosInstance.post(endpoint, variables);
      return response.data;
    },
    ...options,
  });
}

export function useApiDelete<T>(
  endpoint: string,
  options?: Omit<UseMutationOptions<T, AxiosError, string>, 'mutationFn'>
) {
  const { isSignedIn, isLoaded } = useAuthToken();

  return useMutation<T, AxiosError, string>({
    mutationFn: async (id) => {
      if (!isLoaded) throw new Error('Auth not loaded');
      if (!isSignedIn) throw new Error('Not signed in');

      const response = await axiosInstance.delete(`${endpoint}/${id}`);
      return response.data;
    },
    ...options,
  });
}