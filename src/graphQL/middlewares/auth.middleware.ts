import { Context } from "koa";
import { decodeToken } from "../../security";
import { AuthMiddlewareOptions } from "../../typings";
import { ForbiddenError } from "apollo-server-koa";



// Middleware Factory allows us to pass paramters 
const isAuth = (roles: string[], options: AuthMiddlewareOptions = { _id: false }) => {

    // Middleware 
    return async function (resolve: any, parent: any, args: any, ctx: any, info: any) {
        // Get koa context and get headers. 
        const _ctx: Context = ctx.ctx,
            token: string = _ctx.headers.authorization ? _ctx.headers.authorization.split(' ')[1] : null;



        try {

            // decode token to get user info(sub and role).
            const { role, sub } = await decodeToken(token);

            //
            if (options._id)
                _ctx.state = { _id: sub };


            if (roles.some(r => role === r) || roles[0] === '*') {
                return await resolve(parent, args, ctx, info);
            } else {
                return new ForbiddenError("No te quieras pasar de verga no puedes.");
            }


        } catch (error) {
            return error
        }



    }
}





//
export default {
    Query: {},
    Mutation: {
        addCars: isAuth(['driver'], { _id: true }),
        logout: isAuth(['*']),
        selectCar: isAuth(['driver'], { _id: true })
    }
}