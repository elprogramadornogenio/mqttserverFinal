import { Router } from 'express';
import Datos from '../controller/datos';


const routerDatos = Router();


routerDatos.post('/dato', Datos.instance.crearDatos);


routerDatos.get('/buscarDatos', Datos.instance.consultarDatos);


export default routerDatos;