import 'reflect-metadata';

interface GrpahQLResolvers {
    Query: object,
    Mutation: object
}


function bindMethod(target: any, key: string, descriptor: PropertyDescriptor): PropertyDescriptor {
    let fn = descriptor.value

    if (typeof fn !== 'function')
        throw new TypeError(`The bind is only applied to functions not for ${typeof fn}`)

    let definingProperty: boolean = false
    // console.log("HERE 0");

    return {
        configurable: true,
        get() {
            if (definingProperty || this === target.prototype || this.hasOwnProperty(key) ||
                typeof fn !== 'function') {
                console.log("HERE");

                return fn;
            }

            const bindFn = fn.bind(this);

            definingProperty = true;
            console.log("HERE 2");

            Object.defineProperty(this, key, {
                configurable: true,
                get() {
                    return bindFn;
                },
                set(value) {
                    fn = value;
                    delete this[key];
                }
            })
            definingProperty = false;
            return bindFn;
        },
        set(value) {
            fn = value
        }
    }
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

    // console.log(Object.defineProperty(this,));


    if (!resolvers)
        Reflect.defineMetadata('resolvers', resolvers = { Mutation: {}, Query: {} }, target)

    // console.log(this);

    resolvers.Query = { ...resolvers.Query, [property]: fn }
    // bindMethod(target, property, descriptor)
}

export function Mutation(target: any, property: string, descriptor: PropertyDescriptor) {
    let resolvers: GrpahQLResolvers = Reflect.getMetadata('resolvers', target),
        fn = descriptor.value;



    if (!resolvers)
        Reflect.defineMetadata('resolvers', resolvers = { Mutation: {}, Query: {} }, target)
    resolvers.Mutation = { ...resolvers.Mutation, [property]: fn }
    // bindMethod(target, property, descriptor)
}

