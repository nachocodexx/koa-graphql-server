const { ApolloServer } = require('apollo-server-koa')
import { makeExecutableSchema } from 'graphql-tools'
import userResolvers from './resolvers/user.resolver';
import IndexResolvers from './resolvers/index.resolver'
const merge = require('lodash.merge');
import { importSchema } from 'graphql-import'
import { applyMiddleware } from 'graphql-middleware'
import * as path from 'path'
import middlewares from './middlewares'


const Query = importSchema(path.resolve(__dirname, 'schemas', 'query.schema.graphql'))



const schema = applyMiddleware(
    //SCHEMA 
    makeExecutableSchema({
        typeDefs: [Query],
        resolvers: merge(IndexResolvers, userResolvers)
    }),
    ...middlewares
)



// Apollo server (graphQL Schema and Koa context)
export const apolloServer = new ApolloServer({ schema, context: ({ ctx }: any) => ({ ctx }) })
