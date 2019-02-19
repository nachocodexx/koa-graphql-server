const { ApolloServer } = require('apollo-server-koa')
import { makeExecutableSchema } from 'graphql-tools'
import { importSchema } from 'graphql-import'
import { applyMiddleware } from 'graphql-middleware'
import * as path from 'path'
import middlewares from './middlewares'
import resolvers from './resolvers'

const Query = importSchema(path.resolve(__dirname, 'schemas', 'query.schema.graphql'))


const schema = applyMiddleware(
    //SCHEMA 
    makeExecutableSchema({
        typeDefs: [Query],
        resolvers,
        resolverValidationOptions: {
            requireResolversForResolveType: false
        }
    }),
    ...middlewares

)



// Apollo server (graphQL Schema and Koa context)
export const apolloServer = new ApolloServer({ schema, context: ({ ctx }: any) => ({ ctx }) })
