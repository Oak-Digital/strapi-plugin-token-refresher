import { Entity, Strapi } from "@strapi/strapi";
import { TokenTypes } from "src/constants";

const service = ({ strapi }: { strapi: Strapi }) => ({
  async findOne(id: Entity.ID) {
    const data = await strapi.entityService.findOne('plugin::token-refresher.token', id);

    return data;
  },

  async update(id: Entity.ID, data: Record<string, any>) {
    const updatedData = await strapi.entityService.update('plugin::token-refresher.token', id, {
      data,
    });

    return updatedData;
  },

  async findOneByType(type: TokenTypes) {
    const data = await strapi.entityService.findMany('plugin::token-refresher.token', {
      filters: {
        type,
      },
    });

    const first = data[0];

    return first;
  },
});

export default service;
