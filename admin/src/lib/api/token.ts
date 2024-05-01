import { TokenTypes } from '../constants';
import { useFetchClient } from '@strapi/helper-plugin';

export const getTokenRequests = (client: ReturnType<typeof useFetchClient>) => ({
  async get(type: TokenTypes) {
    return client.get(`/token-refresher/token/${type}`);
  },

  async refresh(type: TokenTypes) {
    return client.post(`/token-refresher/refresh/${type}`);
  },

  async set(type: TokenTypes, token: string) {
    return client.post(`/token-refresher/token/${type}`, {
      token,
    });
  },
});

export const useTokenRequests = () => {
  const client = useFetchClient();
  return getTokenRequests(client);
};
