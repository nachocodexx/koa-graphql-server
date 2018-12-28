const { ApolloServer, gql } = require('apollo-server-koa')

const typeDefs = gql`
    type Query {
        hello:String
    }

`
const resolvers = {
    Query: {
        hello: () => 'Hello, Nacho! :)'
    }
}

export const apolloServer = new ApolloServer({ typeDefs, resolvers })
