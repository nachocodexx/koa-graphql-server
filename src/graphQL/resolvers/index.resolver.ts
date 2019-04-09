import { Resolver, Query, ResolverFactory, Mutation } from "../decorators";
import { GraphQLContext } from "../../typings";
import { create } from "../../helpers/user.helpers";

@Resolver
class IndexResolvers extends ResolverFactory {
  @Query
  hello(_: any, args: any, ctx: GraphQLContext): string {
    return `Hello, ${args.name ? args.name : "World"}! :)`;
  }
  @Query
  bye(_: any, args: any, ctx: GraphQLContext): string {
    return `Bye ${args.name ? args.name : "World!"}`;
  }

  @Mutation
  signup(_: any, args: any, ctx: GraphQLContext) {
    return create(args.user);
  }
}

export default new IndexResolvers().getContext();
