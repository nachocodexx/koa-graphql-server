interface ResolverContext {
    Query: { [key: string]: Function },
    Mutation: { [key: string]: Function },
}

export class ResolverFactory {
    private resolvers: ResolverContext;
    getContext(): ResolverContext { return this.resolvers; }
};



function getPropertyDescriptor(target: any, key: string, descriptor: PropertyDescriptor, type: number) {
    let fn = descriptor.value;
    // console.log(`Decorator on [${key}]`);


    return {
        configurable: true,
        get: function () {
            // console.info(`--> [${key}] says hi!`);

            const boundFn: Function = fn.bind(this);
            Object.defineProperty(target, key, {
                configurable: true,
                get() { return boundFn },
            });


            return { fn: boundFn, type };
        }
    }

}

export function Resolver(target: any) {
    const keys: string[] = Object.getOwnPropertyNames(target.prototype).filter((key: string) => key !== "constructor")
    Object.defineProperty(target.prototype, 'resolvers', { configurable: true, value: { Query: {}, Mutation: {} } })


    keys.forEach((key: string) => {
        const { fn, type } = target.prototype[key],
            queries = target.prototype.resolvers.Query, mutations = target.prototype.resolvers.Mutation;
        // console.log(data);
        if (!type)
            target.prototype.resolvers.Query = { ...queries, [key]: fn }
        else
            target.prototype.resolvers.Mutation = { ...mutations, [key]: fn }


    });


    return target;
}


export function Mutation(target: any, key: string, descriptor: PropertyDescriptor): PropertyDescriptor {
    return getPropertyDescriptor(target, key, descriptor, 1);
}


export function Query(target: any, key: string, descriptor: PropertyDescriptor): PropertyDescriptor {
    return getPropertyDescriptor(target, key, descriptor, 0);
}

