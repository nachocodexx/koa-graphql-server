const { ApolloServer } = require('apollo-server-koa')
import { makeExecutableSchema } from 'graphql-tools'
import userResolvers from './resolvers/user.resolver';
import IndexResolvers from './resolvers/index.resolver'
const merge = require('lodash.merge');
import { importSchema } from 'graphql-import'
import * as path from 'path'


const Query = importSchema(path.resolve(__dirname, 'schemas', 'query.schema.graphql'))



const schema = makeExecutableSchema({
    typeDefs: [Query],
    resolvers: merge(IndexResolvers, userResolvers)
})

export const apolloServer = new ApolloServer({ schema, context: ({ ctx }: any) => ({ ctx }) })
