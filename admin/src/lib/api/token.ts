import axios from "axios";
import { TokenTypes } from "../constants";

export const tokenRequests = {
  async get(type: TokenTypes) {
    return axios.get(`/token-refresher/token/${type}`)
  },

  async refresh(type: TokenTypes) {
    return axios.post(`/token-refresher/refresh/${type}`)
  },

  async set(type: TokenTypes, token: string) {
    return axios.post(`/token-refresher/token/${type}`, {
      token,
    });
  }
};
