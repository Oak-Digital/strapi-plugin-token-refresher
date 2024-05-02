import type { Strapi } from '@strapi/strapi';
import { getPluginService } from './lib/plugin-service';

const bootstrapCronJobs = async () => {
  const cronService = getPluginService('cron');
  await cronService.setupCronForAllTokens();
  strapi.log.info('Cron jobs setup complete');
};

const bootstrapLifecycles = async () => {
  const lifecycleService = getPluginService('lifecycle');
  lifecycleService.createTokenLifecycles();
  strapi.log.info('Lifecycles setup complete');
};

const bootstrap = ({ strapi }: { strapi: Strapi }) => {
  bootstrapCronJobs();
  bootstrapLifecycles();
};

export default bootstrap;
