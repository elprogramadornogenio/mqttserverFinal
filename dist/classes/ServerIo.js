"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const http_1 = require("http");
const enviorenment_1 = require("../global/enviorenment");
// Socket io
const socket_io_1 = require("socket.io");
const socket_1 = __importDefault(require("../sockets/socket"));
const Topico_1 = __importDefault(require("./Topico"));
class ServerIo {
    constructor() {
        this.app = (0, express_1.default)();
        this.httpServer = (0, http_1.createServer)(this.app);
        this.port = enviorenment_1.SERVER_PORT;
        this.io = new socket_io_1.Server(this.httpServer, {
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
    inicializarSockets() {
        this.io.on('connect', (cliente) => __awaiter(this, void 0, void 0, function* () {
            this.topicos = yield Topico_1.default.instance.consultarTopicos();
            console.log(`el valor es: ${this.topicos}`);
            socket_1.default.instance.recibirMensaje(cliente, this.io, this.topicos);
        }));
    }
    static get instance() {
        return this._instance || (this._instance = new ServerIo());
    }
    start(callback) {
        this.httpServer.listen(this.port, callback);
    }
}
exports.default = ServerIo;
