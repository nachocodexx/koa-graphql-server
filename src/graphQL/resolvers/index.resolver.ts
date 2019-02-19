import { Resolver, Query, ResolverFactory } from '../decorators';
import { GraphQLContext } from '../../typings';
// import { Resolver, Query } from 'koa-graphql-decorators';


@Resolver
class IndexResolvers extends ResolverFactory {
    @Query
    private hello(obj: any, args: any, ctx: GraphQLContext): string {
        return `Hello, ${args.name ? args.name : 'World'}! :)`
    }
    @Query
    private bye(obj: any, args: any, ctx: GraphQLContext): string {
        return `Bye ${args.name ? args.name : 'World!'}`
    }
}



export default new IndexResolvers().getContext()