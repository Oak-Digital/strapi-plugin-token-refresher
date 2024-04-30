import { useQuery, UseQueryResult } from "@tanstack/react-query";
import { TokenTypes } from "../constants";
import { PLUGIN_ID } from "../../pluginId";
import { tokenRequests } from "../api/token";

export const useToken = (type: TokenTypes) => {
  return useQuery<any, unknown>({
    queryKey: ["plugin", PLUGIN_ID, type],
    queryFn: async () => {
      const response = await tokenRequests.get(type);
      return response.data;
    },
    retry: false,
  });
}
