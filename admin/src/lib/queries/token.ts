import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import type * as _ from '@tanstack/react-query';
import { TokenTypes } from '../constants';
import { PLUGIN_ID } from '../../pluginId';
import { useTokenRequests } from '../api/token';
import z from 'zod';

export const useToken = (type: TokenTypes) => {
  const tokenRequests = useTokenRequests();
  return useQuery({
    queryKey: ['plugin', PLUGIN_ID, type],
    queryFn: async () => {
      const response = await tokenRequests.get(type);
      return response;
    },
  });
};

export const useSetToken = () => {
  const queryClient = useQueryClient();
  const tokenRequests = useTokenRequests();
  return useMutation<
    unknown,
    Error,
    {
      type: TokenTypes;
      token: string;
      cron: string;
    }
  >({
    mutationKey: ['plugin', PLUGIN_ID, 'setToken'],
    mutationFn: async ({ type, token, cron }) => {
      const response = await tokenRequests.set(type, token, {
        cron,
      });
      return response.data;
    },

    async onSuccess(data, { type }) {
      await queryClient.invalidateQueries({
        queryKey: ['plugin', PLUGIN_ID, type],
        exact: true,
      });
    },
  });
};

export const useRefreshToken = () => {
  const queryClient = useQueryClient();
  const tokenRequests = useTokenRequests();
  return useMutation<
    unknown,
    Error,
    {
      type: TokenTypes;
    }
  >({
    mutationKey: ['plugin', PLUGIN_ID, 'refreshToken'],
    mutationFn: async ({ type }) => {
      const response = await tokenRequests.refresh(type);
      return response.data;
    },

    async onSuccess(data, type) {
      await queryClient.invalidateQueries({
        queryKey: ['plugin', PLUGIN_ID, type],
        exact: true,
      });
    },
  });
};
