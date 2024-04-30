import { useQuery, UseQueryResult } from "@tanstack/react-query";
import { TokenTypes } from "../constants";
import { PLUGIN_ID } from "src/pluginId";
import { tokenRequests } from "../api/token";

export const useToken = (type: TokenTypes): UseQueryResult => {
  return useQuery({
    queryKey: ["plugin", PLUGIN_ID, type],
    queryFn: async () => {
      const response = await tokenRequests.get(type);
      return response.data;
    },
  });
}
