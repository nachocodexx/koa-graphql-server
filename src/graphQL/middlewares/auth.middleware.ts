import { Context } from "koa";
import { decodeToken } from "../../security";


// Middleware function 
const isAuth = (...roles: string[]) => {

    return async function (resolve: any, parent: any, args: any, ctx: any, info: any) {
        // Get koa context and get headers. 
        const _ctx: Context = ctx.ctx,
            token: string = _ctx.headers.authorization ? _ctx.headers.authorization.split(' ')[1] : null;
        try {

            const { role, sub } = await decodeToken(token)

            if (roles.some(r => role === r)) {
                console.log("YEAH!");
            }

            console.log(`IS AUTH MIDDLEWARE WORKS ${roles}`)
            return await resolve(parent, args, ctx, info)

        } catch (error) {
            return error
        }



    }
}





//
export default {
    Query: {
        hello: isAuth('admin')
    }
}