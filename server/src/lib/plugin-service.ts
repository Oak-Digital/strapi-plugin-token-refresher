import { Strapi } from "@strapi/strapi";
import { PLUGIN_ID } from "./plugin-id";
import type services from "../services";

type Services = (typeof services);
type ServiceNames = keyof Services;

export const getPluginService = <ServiceName extends ServiceNames>(service: ServiceName): ReturnType<Services[ServiceName]> => {
  const pluginService = strapi.service(`plugin::${PLUGIN_ID}.${service}`);

  return pluginService as any;
};
