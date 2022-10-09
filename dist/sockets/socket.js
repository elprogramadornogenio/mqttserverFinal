"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class SocketFunction {
    static get instance() {
        return this._instance || (this._instance = new SocketFunction());
    }
    recibirMensaje(cliente, io, topicos) {
        for (let topico of topicos) {
            cliente.on(topico, (payload) => {
                console.log(`Socket con topico: ${topico}`);
            });
        }
    }
    enviarMensaje(cliente, topico, dato) {
        console.log(topico, dato);
        cliente.emit(topico, dato);
    }
    desconectar(cliente, io) {
        cliente.on('disconnect', () => {
            console.log(`Cliente ${cliente.id} desconectado`);
        });
    }
}
exports.default = SocketFunction;
