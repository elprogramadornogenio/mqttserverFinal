import * as mqtt from 'mqtt';
import { connect, Client } from 'mqtt';
import { MQTT } from '../global/enviorenment';
import mqttFunction from '../mqtt/mqtt';
import Topico from './Topico';


export default class ServerMqtt {

    private static _instance: ServerMqtt;
    public client: Client;
    public topicos: string[];

    constructor() {
        this.topicos = [];
        this.client = connect(MQTT)
        this.inicializarTopicsMqtt();
    }

    public static get instance() {
        return this._instance || (this._instance = new ServerMqtt());
    }

    public inicializarTopicsMqtt() {
        this.client.on('connect', async () => {
            this.topicos = await Topico.instance.consultarTopicos();
            console.log(`el valor es: ${this.topicos}`);
            mqttFunction.instance.subscripcion(this.client, this.topicos);
        });
        mqttFunction.instance.mensaje(this.client);



    }

}





/* client.on('connect', function () {
    client.subscribe('presence', function (err) {
        if (!err) {
            client.publish('presence', 'Hello mqtt')
        }
    })
})

client.on('message', function (topic, message) {
    // message is Buffer
    console.log(message.toString())
    client.end()
}) */