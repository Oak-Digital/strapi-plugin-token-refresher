import { Entity, Strapi } from '@strapi/strapi';
import { PLUGIN_ID } from '../lib/plugin-id';
import { getPluginService } from '../lib/plugin-service';
import cron from 'cron-validate';

const getCronName = (id: Entity.ID) => `plugin::${PLUGIN_ID}.token-cron-${id}`;

const cronService = ({ strapi }: { strapi: Strapi }) => ({
  setCronForToken(id: Entity.ID, cronString: string) {
    const name = getCronName(id);
    const cronResult = cron(cronString);
    if (!cronResult.isValid()) {
      throw new Error(`Invalid cron string: ${cronResult.getError().join(', ')}`);
    }
    // strapi.cron.remove(name);
    strapi.cron.add({
      [name]: {
        async task({ strapi }) {
          const refresherService = getPluginService('refresher');
          strapi.log.info(`Refreshing token with id: ${id}...`);
          try {
            // TODO uncomment this line
            // await refresherService.refreshEntry(id);
            strapi.log.info(`Refreshed token with id: ${id}`);
          } catch (error) {
            strapi.log.error(`Failed to refresh token with id: ${id}`);
            console.error(error);
          }
        },
        options: {
          rule: cronString,
        } as any,
      },
    });
  },

  removeCronForToken(id: Entity.ID) {
    const name = getCronName(id);
    strapi.cron.remove(name);
  },

  async setupCronForAllTokens() {
    const tokens = await strapi.entityService.findMany(`plugin::${PLUGIN_ID}.token`, {
      fields: ['id', 'cron'],
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
