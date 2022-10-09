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
const mqtt_1 = require("mqtt");
const enviorenment_1 = require("../global/enviorenment");
const mqtt_2 = __importDefault(require("../mqtt/mqtt"));
const Topico_1 = __importDefault(require("./Topico"));
class ServerMqtt {
    constructor() {
        this.topicos = [];
        this.client = (0, mqtt_1.connect)(enviorenment_1.MQTT);
        this.inicializarTopicsMqtt();
    }
    static get instance() {
        return this._instance || (this._instance = new ServerMqtt());
    }
    inicializarTopicsMqtt() {
        this.client.on('connect', () => __awaiter(this, void 0, void 0, function* () {
            this.topicos = yield Topico_1.default.instance.consultarTopicos();
            console.log(`el valor es: ${this.topicos}`);
            mqtt_2.default.instance.subscripcion(this.client, this.topicos);
        }));
        mqtt_2.default.instance.mensaje(this.client);
    }
}
exports.default = ServerMqtt;
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
