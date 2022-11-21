import { Client } from "mqtt";
import Datos from "../controller/datos";
import ServerIo from '../classes/ServerIo';


export default class mqttFunction {

    private static _instance: mqttFunction;

    public static get instance() {
        return this._instance || (this._instance = new mqttFunction());
    }

    subscripcion(cliente: Client, topic: string[]) {
        cliente.subscribe(topic, (error: Error) => {
            // se realiza la suscripcion
        });

    }

    publicacion(cliente: Client, topic: string, mensaje: string) {
        cliente.publish(topic, mensaje);
    }

    mensaje(cliente: Client) {
        cliente.on('message', (Topico: string, payload: Buffer) => {
            const socket = ServerIo.instance.io;
            let dato: number = 0;
            // console.log(`El topico ${Topico} publica ${payload.toString()}`);
            let decodification = Buffer.from(payload.toString(), 'base64').toString('ascii');
            if (Number(decodification)) {
                dato = Number(decodification) - 3;
                Datos.instance.guardarDatos(Topico, dato);
                socket.emit(Topico, dato);
            } else {
                console.log(`El topico: ${Topico} esta recibiendo un dato: ${payload.toString()} no es número`)
            }

        });
    }

    noSuscripcion(cliente: Client, topic: string[]) {
        cliente.unsubscribe(topic);
    }
}