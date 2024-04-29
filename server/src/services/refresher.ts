import { Entity, Strapi } from "@strapi/strapi";
import { TokenTypes } from "../constants";
import { getPluginService } from "../lib/plugin-service";

const service = ({ strapi }: { strapi: Strapi }) => ({
  async refreshEntry(tokenId: Entity.ID) {
    const service = getPluginService("refresher");
    const tokenService = getPluginService("token");
    const entry = await tokenService.findOne(tokenId);

    const specificService = service.getRefresherService(entry.type);
    specificService.refreshEntry(entry.id);
  },

  getRefresherService(type: TokenTypes) {
    switch (type) {
      case "instagram":
        return getPluginService("instagram");
      default:
        throw new Error(`No refresher service for type ${type}`);
    }
  },
});

export default service;
