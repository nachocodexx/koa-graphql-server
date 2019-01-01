const { ApolloServer } = require('apollo-server-koa')
import { makeExecutableSchema } from 'graphql-tools'
import userResolvers from './resolvers/user.resolver';
import IndexResolvers from './resolvers/index.resolver'
const merge = require('lodash.merge');
import { importSchema } from 'graphql-import'
import { applyMiddleware } from 'graphql-middleware'
import * as path from 'path'


const Query = importSchema(path.resolve(__dirname, 'schemas', 'query.schema.graphql'))


const testMiddleware = {
    Query: {
        async hello(resolve: any, parent: any, args: any, context: any, info: any) {
            console.log(args);

            return await resolve(parent, { name: "TEST" }, context, info)
        }
    }
}

const schema = applyMiddleware(
    //SCHEMA 
    makeExecutableSchema({
        typeDefs: [Query],
        resolvers: merge(IndexResolvers, userResolvers)
    }),
    testMiddleware
)




export const apolloServer = new ApolloServer({ schema, context: ({ ctx }: any) => ({ ctx }) })
