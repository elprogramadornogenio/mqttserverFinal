"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const body_parser_1 = __importDefault(require("body-parser"));
const datos_routes_1 = __importDefault(require("./routes/datos.routes"));
const cors_1 = __importDefault(require("cors"));
const ServerIo_1 = __importDefault(require("./classes/ServerIo"));
const config_1 = __importDefault(require("./db/config"));
const sensor_routes_1 = __importDefault(require("./routes/sensor.routes"));
const usuario_routes_1 = __importDefault(require("./routes/usuario.routes"));
const ServerMqtt_1 = __importDefault(require("./classes/ServerMqtt"));
const reportes_routes_1 = __importDefault(require("./routes/reportes.routes"));
const server = ServerIo_1.default.instance;
const mqtt = ServerMqtt_1.default.instance;
// base de datos
config_1.default.instance.dbConnection();
// body-parser
server.app.use(body_parser_1.default.urlencoded({ extended: true }));
server.app.use(body_parser_1.default.json());
// CORS
server.app.use((0, cors_1.default)({
    origin: true,
    credentials: true
}));
// rutas
server.app.use('/', datos_routes_1.default);
server.app.use('/', sensor_routes_1.default);
server.app.use('/', usuario_routes_1.default);
server.app.use('/', reportes_routes_1.default);
server.start(() => {
    console.log(`Servidor corriendo en el puerto ${server.port}`);
});
