import { Context } from 'koa';
import { isTokenType } from '../lib/is-token-type';
import { getPluginService } from '../lib/plugin-service';
import { z } from 'zod';

const tokenController = () => ({
  async getToken(ctx: Context & { params: { type: string } }) {
    const type = ctx.params.type;
    if (!isTokenType(type)) {
      return ctx.throw(400, 'Invalid token type');
    }

    const tokenService = getPluginService('token');
    const tokenEntry = await tokenService.findOneByType(type);

    if (!tokenEntry) {
      return ctx.notFound('Token not found');
    }

    return tokenEntry;
  },

  async setToken(ctx: Context & { params: { type: string }; request: { body: unknown } }) {
    const type = ctx.params.type;
    if (!isTokenType(type)) {
      return ctx.throw(400, 'Invalid token type');
    }

    const schema = z.object({
      token: z.string(),
      cron: z.string().nullish(),
    });
    const body = schema.safeParse(ctx.request.body);
    if (!body.success) {
      return ctx.throw(400, 'Invalid request body');
    }
    const { token, cron } = body.data;

    const tokenService = getPluginService('token');
    const tokenEntry = await tokenService.setTokenByType(type, token, {
      cron,
    });
    return tokenEntry;
  },

  async refreshToken(ctx: Context & { params: { type: string } }) {
    const type = ctx.params.type;
    if (!isTokenType(type)) {
      return ctx.throw(400, 'Invalid token type');
    }

    const refresherService = getPluginService('refresher');
    try {
      const token = await refresherService.refreshEntryByType(type);

      ctx.status = 200;
      return token;
    } catch (error) {
      ctx.throw(500, 'Unable to refresh token');
    }
  },
});

export default tokenController;
