import { ResolverConfig, Middlewares } from "./types";

function getPropertyDescriptor(target: any, key: string, descriptor: PropertyDescriptor, type: number) {
  let fn = descriptor.value;

  return {
    configurable: true,
    get: function() {
      const boundFn: Function = fn.bind(this);
      Object.defineProperty(target, key, {
        configurable: true,
        get() {
          return boundFn;
        }
      });

      return { fn: boundFn, type };
    }
  };
}

export function Resolver(target: any) {
  const keys: string[] = Object.getOwnPropertyNames(target.prototype).filter(
      (key: string) => key !== "constructor" && key !== "_middlewares"
    ),
    _middlewares = target.prototype._middlewares;

  // console.log(_middlewares);
  Object.defineProperty(target.prototype, "middlewares", {
    configurable: true,
    enumerable: false,
    value: generateMiddlewares(_middlewares)
  });

  Object.defineProperty(target.prototype, "resolvers", {
    configurable: true,
    value: { Query: {}, Mutation: {} }
  });

  keys.forEach((key: string) => {
    const { fn, type } = target.prototype[key],
      queries = target.prototype.resolvers.Query,
      mutations = target.prototype.resolvers.Mutation;

    if (!type) target.prototype.resolvers.Query = { ...queries, [key]: fn };
    else target.prototype.resolvers.Mutation = { ...mutations, [key]: fn };
  });

  if (Object.keys(target.prototype.resolvers.Mutation).length == 0) {
    delete target.prototype.resolvers.Mutation;
  }

  if (Object.keys(target.prototype.resolvers.Query).length == 0) {
    delete target.prototype.resolvers.Query;
  }

  return target;
}

export function Mutation(config: ResolverConfig = { middlewares: [] }) {
  return function(target: any, key: string, descriptor: PropertyDescriptor): PropertyDescriptor {
    processMiddlewares(key, target, config.middlewares, 1);
    return getPropertyDescriptor(target, key, descriptor, 1);
  };
}

export function Query(config: ResolverConfig = { middlewares: [] }) {
  return function(target: any, key: string, descriptor: PropertyDescriptor): PropertyDescriptor {
    processMiddlewares(key, target, config.middlewares);
    return getPropertyDescriptor(target, key, descriptor, 0);
  };
}

function generateMiddlewares(middlewares: Middlewares) {
  const res: any[] = [];
  for (let key in middlewares) {
    const { middleware, data } = middlewares[key],
      _res = { Query: {}, Mutation: {} };

    data.forEach(({ key, type }) => {
      if (!type) {
        _res.Query = { ..._res.Query, [key]: middleware };
      } else {
        _res.Mutation = { ..._res.Mutation, [key]: middleware };
      }
    });
    res.push(_res);
  }
  return res;
}

function processMiddlewares(key: string, target: any, middlewares: Function[], type: number = 0) {
  const PROPERTY_KEY: string = "_middlewares";

  if (!target.hasOwnProperty(PROPERTY_KEY)) {
    Object.defineProperty(target, PROPERTY_KEY, {
      configurable: true,
      enumerable: false,
      value: {}
    });
  }
  setMiddlewares(key, target, middlewares, type);
}

function setMiddlewares(key: string, target: any, middlewares: Function[], type: number = 0) {
  const targetKeys: string[] = Object.keys(target._middlewares) || [];

  middlewares.forEach((middleware: Function) => {
    if (targetKeys.includes(middleware.name)) {
      target._middlewares[middleware.name].data.push({ key, type });
    } else {
      target._middlewares[middleware.name] = { middleware, data: [{ key, type }] };
    }
  });
}
