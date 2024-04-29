import type { Strapi } from '@strapi/strapi';

const service = ({ strapi }: { strapi: Strapi }) => ({
  getWelcomeMessage() {
    return 'Welcome to Strapi 🚀';
  },
});

export default service;
