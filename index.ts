import bodyParser from 'body-parser';
import routerDatos  from "./routes/datos.routes";
import cors from 'cors';
import ServerIo from './classes/ServerIo';
import DbConnection from './db/config';
import routerSensor from './routes/sensor.routes';
import routerUsuario from './routes/usuario.routes';
import ServerMqtt from './classes/ServerMqtt';
import routerReportes from './routes/reportes.routes';
import routerConexion from './routes/conexion.routes';



const server = ServerIo.instance;
const mqtt = ServerMqtt.instance;


// base de datos
DbConnection.instance.dbConnection();

// body-parser
server.app.use(bodyParser.urlencoded({extended: true}));
server.app.use(bodyParser.json());



// CORS
server.app.use(cors({
    origin: true,
    credentials: true
}))

// rutas
server.app.use('/', routerDatos)
server.app.use('/', routerSensor)
server.app.use('/', routerUsuario)
server.app.use('/', routerReportes)
server.app.use('/', routerConexion)



server.start(()=>{
    console.log(`Servidor corriendo en el puerto ${server.port}`)
});
