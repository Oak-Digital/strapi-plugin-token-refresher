import { getPluginService } from '../lib/plugin-service';
import { PLUGIN_ID } from '../lib/plugin-id';
import { z } from 'zod';
import { SubscriberFn } from '@strapi/database/dist/lifecycles/types';

const withTokenResultSchema = z.object({
  result: z.object({
    id: z.string().or(z.number()),
    cron: z.string(),
  }),
});

const withResultEventHanlder: SubscriberFn = async (event) => {
  const cronService = getPluginService('cron');
  const eventWithResult = withTokenResultSchema.safeParse(event);
  if (!eventWithResult.success) {
    strapi.log.error('Failed to parse event result', eventWithResult.error);
    return;
  }
  const { id, cron } = eventWithResult.data.result;
  cronService.setCronForToken(id, cron);
};

const lifecycleService = () => ({
  createTokenLifecycles() {
    const modelName = `plugin::${PLUGIN_ID}.token`;
    strapi.db.lifecycles.subscribe({
      models: [modelName],
      async afterCreate(event) {
        withResultEventHanlder(event);
      },

      async afterCreateMany(event) {
        // TODO
      },

      async afterUpdate(event) {
        withResultEventHanlder(event);
      },

      async afterUpdateMany(event) {},

      async afterDelete(event) {
        console.log('afterDelete', event);
        const cronService = getPluginService('cron');
        const eventWithResult = withTokenResultSchema.safeParse(event);
        if (!eventWithResult.success) {
          strapi.log.error('Failed to parse event result', eventWithResult.error);
          return;
        }
        const { id } = eventWithResult.data.result;
        cronService.removeCronForToken(id);
      },

      async afterDeleteMany(event) {},
    });
  },
});

export default lifecycleService;
