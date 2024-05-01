import type { Strapi } from '@strapi/strapi';
import { getPluginService } from './lib/plugin-service';

const bootstrap = ({ strapi }: { strapi: Strapi }) => {
  const cronService = getPluginService('cron');
  cronService.setupCronForAllTokens();
};

export default bootstrap;
