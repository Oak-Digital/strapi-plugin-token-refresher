import { Context } from 'koa';
import { isTokenType } from '../lib/is-token-type';

const tokenController = () => ({
  async getToken(ctx: Context & { params: { type: string } }) {
    const type = ctx.params.type;
    if (!isTokenType(type)) {
      return ctx.throw(400, 'Invalid token type');
    }

    return "nice";
  },
});

export default tokenController;
