"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const datos_1 = __importDefault(require("../controller/datos"));
const ServerIo_1 = __importDefault(require("../classes/ServerIo"));
class mqttFunction {
    static get instance() {
        return this._instance || (this._instance = new mqttFunction());
    }
    subscripcion(cliente, topic) {
        cliente.subscribe(topic, (error) => {
            // se realiza la suscripcion
        });
    }
    publicacion(cliente, topic, mensaje) {
        cliente.publish(topic, mensaje);
    }
    mensaje(cliente) {
        cliente.on('message', (Topico, payload) => {
            const socket = ServerIo_1.default.instance.io;
            let dato = 0;
            // console.log(`El topico ${Topico} publica ${payload.toString()}`);
            if (Number(payload.toString())) {
                dato = Number(payload.toString());
                datos_1.default.instance.guardarDatos(Topico, dato);
                socket.emit(Topico, dato);
            }
            else {
                console.log(`El topico: ${Topico} esta recibiendo un dato: ${payload.toString()} no es número`);
            }
        });
    }
    noSuscripcion(cliente, topic) {
        cliente.unsubscribe(topic);
    }
}
exports.default = mqttFunction;
