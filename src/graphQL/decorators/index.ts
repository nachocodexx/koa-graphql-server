import 'reflect-metadata';

interface GrpahQLResolvers {
    Query: object,
    Mutation: object
}


export function Resolver(target: any) {
    const resolvers = Reflect.getMetadata('resolvers', target.prototype)


    Reflect.defineProperty(target.prototype, 'resolvers', {
        enumerable: true,
        value: resolvers
    })



}


export function Query(target: any, property: string, descriptor: PropertyDescriptor) {
    let resolvers: GrpahQLResolvers = Reflect.getMetadata('resolvers', target),
        fn = descriptor.value;



    if (!resolvers)
        Reflect.defineMetadata('resolvers', resolvers = { Mutation: {}, Query: {} }, target)


    resolvers.Query = { ...resolvers.Query, [property]: fn }
}

export function Mutation(target: any, property: string, descriptor: PropertyDescriptor) {
    let resolvers: GrpahQLResolvers = Reflect.getMetadata('resolvers', target),
        fn = descriptor.value;



    if (!resolvers)
        Reflect.defineMetadata('resolvers', resolvers = { Mutation: {}, Query: {} }, target)
    resolvers.Mutation = { ...resolvers.Mutation, [property]: fn }
}

