import { z } from 'zod';
import { TokenTypes } from '../constants';
import { useFetchClient } from '@strapi/helper-plugin';

const tokenSchema = z.object({
  token: z.string().nullable(),
  type: z.string(),
  cron: z.string().nullable(),
});

export const getTokenRequests = (client: ReturnType<typeof useFetchClient>) => ({
  async get(type: TokenTypes) {
    const response = await client.get(`/token-refresher/token/${type}`);
    const data = tokenSchema.parse(response.data);
    return data;
  },

  async refresh(type: TokenTypes) {
    return client.post(`/token-refresher/refresh/${type}`);
  },

  async delete(type: TokenTypes) {
    return client.del(`/token-refresher/token/${type}`);
  },

  async set(
    type: TokenTypes,
    token: string,
    other: {
      cron?: string;
    } = {}
  ) {
    return client.post(`/token-refresher/token/${type}`, {
      token,
      cron: other?.cron,
    });
  },
});

export const useTokenRequests = () => {
  const client = useFetchClient();
  return getTokenRequests(client);
};
