import { IMiddlewareWithOptions } from "graphql-middleware/dist/types";

// export interface Middleware

interface MiddlewareContext {
  data: [
    {
      type: number;
      key: string;
    }
  ];
  middleware: Function;
}

export interface Middlewares {
  [key: string]: MiddlewareContext;
}

export interface ResolverConfig {
  middlewares?: Function[];
}

export interface ResolverContext {
  Query: { [key: string]: Function };
  Mutation: { [key: string]: Function };
}

export class ResolverFactory {
  private resolvers: ResolverContext;
  private middlewares: IMiddlewareWithOptions[];
  getContext(): ResolverContext {
    return this.resolvers;
  }
  getMiddlewares(): IMiddlewareWithOptions[] {
    return this.middlewares;
  }
}
