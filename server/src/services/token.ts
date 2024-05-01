import { Entity, Strapi } from '@strapi/strapi';
import { TokenTypes } from '../constants';
import { PLUGIN_ID } from '../lib/plugin-id';

const service = ({ strapi }: { strapi: Strapi }) => ({
  async findOne(id: Entity.ID) {
    const data = await strapi.entityService.findOne(`plugin::${PLUGIN_ID}.token`, id);

    return data;
  },

  async update(id: Entity.ID, data: Record<string, any>) {
    const updatedData = await strapi.entityService.update(`plugin::${PLUGIN_ID}.token`, id, {
      data,
    });

    return updatedData;
  },

  async findOneByType(type: TokenTypes) {
    const data = await strapi.entityService.findMany(`plugin::${PLUGIN_ID}.token`, {
      filters: {
        type,
      },
    });

    const first = data[0];

    return first;
  },

  async setTokenByType(
    type: TokenTypes,
    token: string,
    other: {
      cron?: string;
    } = {}
  ) {
    const tokenEntry = await this.findOneByType(type);

    if (!tokenEntry) {
      const created = await strapi.entityService.create(`plugin::${PLUGIN_ID}.token`, {
        data: {
          type,
          token,
          cron: other?.cron,
        },
      });

      return created;
    }

    await this.update(tokenEntry.id, {
      token,
      cron: other?.cron,
    });

    return tokenEntry;
  },
});

export default service;
