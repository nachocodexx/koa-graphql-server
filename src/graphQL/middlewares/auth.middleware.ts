import { Context } from "koa";
import { decodeToken } from "../../security";
import { AuthMiddlewareOptions } from "../../typings";
import { ForbiddenError } from "apollo-server-koa";

// Middleware Factory allows us to pass paramters
const isAuth = (options: AuthMiddlewareOptions = { _id: true }) => {
  // Middleware
  return async function(resolve: any, parent: any, args: any, ctx: any, info: any) {
    // Get koa context and get headers.
    const _ctx: Context = ctx.ctx,
      token: string = _ctx.headers.authorization ? _ctx.headers.authorization.split(" ")[1] : null;
    if (!token) throw new ForbiddenError(`You aren't authorized.`);

    try {
      // decode token to get user info(sub and role).
      const { sub } = await decodeToken(token);

      //
      if (options._id) _ctx.state = { _id: sub };
      return await resolve(parent, args, ctx, info);
    } catch (error) {
      return error;
    }
  };
};

//
export default {
  Query: {},
  Mutation: {}
};
