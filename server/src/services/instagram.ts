import { Entity } from '@strapi/strapi';
import axios from 'axios';
import { getPluginService } from '../lib/plugin-service';
import { z } from 'zod';

const BASE_URL = 'https://graph.instagram.com';

const service = () => ({
  async refresh(token: string) {
    const response = await axios.get(`${BASE_URL}/refresh_access_token`, {
      params: {
        access_token: token,
        grant_type: 'ig_refresh_token',
      },
    });

    const responseScehma = z.object({
      access_token: z.string(),
      token_type: z.string().nullish(),
      expires_in: z.number().nullish(),
    });

    const responseData = responseScehma.parse(response.data);

    console.log('Refreshed instagram token', responseData);

    return {
      token: responseData.access_token,
      expiresAt: responseData.expires_in ? new Date(Date.now() + responseData.expires_in * 1000) : null,
    };
  },

  async refreshEntry(id: Entity.ID) {
    const tokenService = getPluginService('token');
    const entry = await tokenService.findOne(id);

    const refreshedToken = await this.refresh(entry.token);

    await tokenService.update(id, {
      token: refreshedToken.token,
      expiresAt: refreshedToken.expiresAt,
    });
  },
});

export default service;
