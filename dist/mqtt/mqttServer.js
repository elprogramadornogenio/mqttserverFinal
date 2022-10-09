"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mqtt_1 = require("mqtt");
class MqttServer {
    constructor() {
        this.client = (0, mqtt_1.connect)('mqtt://localhost:1883');
    }
    escucharTopicsMqtt() {
        this.client.on('connect', (client) => {
            this.client.subscribe('presence', (client, check) => {
            });
        });
        this.client.on('message', (topic, message) => {
        });
    }
}
exports.default = MqttServer;
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
