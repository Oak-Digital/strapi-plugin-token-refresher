import { Entity, Strapi } from "@strapi/strapi";

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
});

export default service;
