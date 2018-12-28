import { OnConnect, OnDisconnect, SocketController, ConnectedSocket } from 'socket-controllers'
import { Socket } from 'socket.io';

@SocketController()
export class AppController {

    @OnConnect()
    connection(@ConnectedSocket() socket: Socket) {
        console.log(`Socket ID : ${socket.id}`);
    }

    @OnDisconnect()
    disconnect(@ConnectedSocket() socket: Socket) {
        console.log(`Socket ${socket.id} disconnected`);

    }



}