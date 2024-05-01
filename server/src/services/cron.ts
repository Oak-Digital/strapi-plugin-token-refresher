import { Entity, Strapi } from '@strapi/strapi';
import { PLUGIN_ID } from '../lib/plugin-id';
import { getPluginService } from '../lib/plugin-service';
import cron from 'cron-validate';

const cronService = ({ strapi }: { strapi: Strapi }) => ({
  setCronForToken(id: Entity.ID, cronString: string) {
    const name = `plugin::${PLUGIN_ID}.token-cron-${id}`;
    const cronResult = cron(cronString);
    if (!cronResult.isValid()) {
      throw new Error(`Invalid cron string: ${cronResult.getError().join(', ')}`);
    }
    // strapi.cron.remove(name);
    strapi.cron.add({
      [name]: {
        async task({ strapi }) {
          const refresherService = getPluginService('refresher');
          strapi.log.info(`Refreshing token with id: ${id}`);
          await refresherService.refreshEntry(id);
          strapi.log.info(`Refreshed token with id: ${id}`);
        },
        options: {
          rule: cronString,
        } as any,
      },
    });
  },

  async setupCronForAllTokens() {
    const tokens = await strapi.entityService.findMany(`plugin::${PLUGIN_ID}.token`, {
      filters: {
        cron: {
          $notNull: true,
        },
      },
    });

    const service = getPluginService('cron');
    return Promise.allSettled(
      tokens.map(async (token) => {
        try {
          service.setCronForToken(token.id, token.cron);
        } catch (error) {
          const message = `Failed to setup cron for token with id: ${token.id}`;
          strapi.log.error(message);
          console.error(message, error);
        }
      })
    );
  },
});

export default cronService;
