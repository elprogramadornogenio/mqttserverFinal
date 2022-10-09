import express from 'express';
import http from 'http';
import {createServer} from 'http';
import { SERVER_PORT } from '../global/enviorenment';
// Socket io
import { Server, Socket } from 'socket.io';
import SocketFunction from '../sockets/socket';
import Topico from './Topico';




export default class ServerIo {

    private static _instance: ServerIo;
    public app: express.Application;
    public port: number;
    public io: Server;
    public client!: Socket;
    public httpServer: http.Server;
    public topicos: string[];

    constructor() {
        this.app = express();
        this.httpServer = createServer(this.app);
        this.port = SERVER_PORT;
        this.io = new Server(this.httpServer, {
            cors: {
                origin: "http://localhost:4200",
                methods: ["GET", "POST", "PUT", "DELETE"],
                allowedHeaders: ["my-custom-header"],
                credentials: true
            }
        });
        this.topicos = [];
        this.inicializarSockets();
    }


    public inicializarSockets() {
        this.io.on('connect', async (cliente) => {
            this.topicos = await Topico.instance.consultarTopicos();
            console.log(`el valor es: ${this.topicos}`);
            SocketFunction.instance.recibirMensaje(cliente , this.io, this.topicos);
        });

    }

    public static get instance() {
        return this._instance || (this._instance = new ServerIo());
    }

    start(callback: ()=> void) {
        this.httpServer.listen(this.port, callback);
    }

}