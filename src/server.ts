import * as Koa from "koa";
import KoaBodyParser = require("koa-bodyparser");
import { PORT } from "./config";
import { apolloServer } from "./graphQL/";
const KoaCors = require("@koa/cors");

//Logger
const logger = require("koa-logger");

class KoaServer extends Koa {
  private port: number;
  readonly app: Koa;

  constructor(port: number) {
    super();
    this.port = port;
    // CONFIG KOA APP  / MIDDLEWARES
    this.setConfig();
    // INIT KOA ROUTER
    this.initRouter();
  }

  //SET PLUGINS (MIDDLEWARES)
  private setConfig(): void {
    //BODY PARSER MIDDLEWARE
    this.use(KoaBodyParser());
    //cors
    this.use(KoaCors());
    //logger
    this.use(logger());
  }

  //INIT ROUTER
  private initRouter(): void {}

  //GET APP
  public getApp(): Koa {
    return this.app;
  }

  //RUN APP
  public run(): void {
    this.listen(this.port, "0.0.0.0");
  }
}

export const app: KoaServer = new KoaServer(PORT);
apolloServer.applyMiddleware({ app });
