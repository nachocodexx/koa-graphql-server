import { Context } from "koa";
import { SecurityService } from '../../security'
const { decodeToken } = new SecurityService()
import { AuthenticationError } from 'apollo-server-koa'


// Middleware function 
async function isAuth(resolve: any, parent: any, args: any, ctx: any, info: any) {
    // Get koa context and get headers. 
    const _ctx: Context = ctx.ctx,
        token: string = _ctx.headers.authorization.split(' ')[1];
    try {
        const { role, sub } = await decodeToken(token)
        console.log("IS AUTH MIDDLEWARE WORKS")
        console.log(token);
        return await resolve(parent, args, ctx, info)

    } catch (error) {
        console.log(error);

        return new AuthenticationError(`You're not authorized to access.`)
    }



}



//
export default {
    Query: {
        hello: isAuth
    }
}