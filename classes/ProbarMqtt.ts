import { Client, connect } from "mqtt";
import { MQTT } from "../global/enviorenment";

export default class ProbarConexion {
    public client: Client;
    public conexion: boolean;
    public topico: string;

    constructor(topico: string) {
        this.topico = topico;
        this.conexion = false;
        this.client = connect(MQTT)
    }


    public booleanConexion(){
        return this.conexion;
    }


    public inicializarProbarConexion(){
        this.client.on('connect', ()=>{
            this.subscribe(this.topico);
            this.recibirMensajes();
        })
    }

    public subscribe(topico: string){
        this.client.subscribe(topico);
    }

    public recibirMensajes(){
        this.client.on('message', (topic: string, payload: Buffer)=>{
            this.conexion = true;
            this.unsubscribe();
            this.finalizarCliente();
        });
    }

    public finalizarCliente(){
        this.client.end();
    }

    public unsubscribe(){
        this.client.unsubscribe(this.topico);
    }
}