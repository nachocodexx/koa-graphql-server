import autobind from 'autobind-decorator'
import { Resolver, Query } from '../decorators';

@Resolver
export class IndexResolvers {
    @Query
    private hello(obj: any, args: any, ctx: any): string {
        return `Hello, ${args.name ? args.name : 'World'}! :)`
    }
    @Query
    private bye(obj: any, args: any, ctx: any): string {
        return `Bye ${args.name ? args.name : 'World!'}`
    }
}



export default (<any>new IndexResolvers()).resolvers 