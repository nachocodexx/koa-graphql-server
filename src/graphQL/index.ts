const { ApolloServer } = require('apollo-server-koa')
import { makeExecutableSchema } from 'graphql-tools'
import userResolvers from './resolvers/user.resolver';
const User = require('./schemas/user.schema');
const merge = require('lodash.merge');
const typeDefs = require('./schemas/query.schema');


const Query = typeDefs

const resolvers = {
    Query: {
        hello(obj: any, args: any, ctx: any): string {
            console.log(args);
            return `Hello, ${args.name ? args.name : 'World'}! :)`
        },
        bye(obj: any, args: any, ctx: any) {
            return `Bye ${args.name ? args.name : 'World!'}`
        },
        test(obj: any, args: any, ctx: any) {
            return 'TEST! WORKS!'
        }
    }
}






const schema = makeExecutableSchema({
    typeDefs: [Query, User],
    resolvers: merge(resolvers, userResolvers)
})

export const apolloServer = new ApolloServer({ schema })
