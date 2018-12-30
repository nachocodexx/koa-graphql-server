// This is required for socket-controllers
import 'reflect-metadata'
import * as Koa from 'koa'
import KoaBodyParser = require("koa-bodyparser");
import { PORT } from './config'

import './websockets/app.controller'
import { createSocketServer } from 'socket-controllers'

import { apolloServer } from './graphQL/';
const KoaCors = require('@koa/cors');


//Logger
const logger = require('koa-logger')


class KoaServer extends Koa {
    private port: number
    readonly app: Koa

    constructor(port: number) {
        super()
        this.port = port
        //INIT SOCKET.IO
        if (process.env.NODE_ENV === 'dev' || process.env.NODE_ENV === 'production')
            this.configSocketIO()
        // CONFIG KOA APP  / MIDDLEWARES
        this.setConfig()
        // INIT KOA ROUTER 
        this.initRouter()
    }

    private configSocketIO() {
        createSocketServer(7001)
    }

    //SET PLUGINS (MIDDLEWARES)
    private setConfig(): void {
        //BODY PARSER MIDDLEWARE 
        this.use(KoaBodyParser())
        //cors
        this.use(KoaCors())
        //logger
        this.use(logger())
    }

    //INIT ROUTER 
    private initRouter(): void {
    }

    //GET APP
    public getApp(): Koa {
        return this.app
    }

    //RUN APP 
    public run(): void {
        this.listen(this.port, '0.0.0.0')
    }

}



export const App: KoaServer = new KoaServer(PORT)
apolloServer.applyMiddleware({ app: App })
