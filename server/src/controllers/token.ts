import { Context } from 'koa';
import { isTokenType } from '../lib/is-token-type';
import { getPluginService } from '../lib/plugin-service';

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
});

export default tokenController;
