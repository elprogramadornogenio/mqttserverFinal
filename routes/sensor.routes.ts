import { Router } from 'express';
import { check } from 'express-validator';
import Sensores from '../controller/sensores';
import ValidarCampos from '../middlewares/validarCampos';

const routerSensor = Router();


routerSensor.post('/sensor', [
    check('id_Usuario', 'El id del usuario es obligatorio').not().isEmpty(),
    check('nombre', 'El nombre del sensor es obligatorio').not().isEmpty(),
    check('tipo', 'El tipo del sensor es obligatorio').not().isEmpty(),
    check('topico', 'El tipo del sensor es obligatorio').not().isEmpty(),
    ValidarCampos.instance.validarCampos
], Sensores.instance.crearSensor );

routerSensor.get('/listarSensores', Sensores.instance.listarSensores );

routerSensor.get('/listarSensoresUsuario',[
    check('id', 'El id del usuario es obligatorio').not().isEmpty(),
    ValidarCampos.instance.validarCampos
], Sensores.instance.listarSensoresUsuario );

routerSensor.put('/sensor', [
    check('_id', 'El id del sensor es obligatorio').not().isEmpty(),
    check('id_Usuario', 'El id del usuario es obligatorio').not().isEmpty(),
    check('nombre', 'El nombre del sensor es obligatorio').not().isEmpty(),
    check('tipo', 'El tipo del sensor es obligatorio').not().isEmpty(),
    check('topico', 'El topico del sensor es obligatorio').not().isEmpty(),
    ValidarCampos.instance.validarCampos
], Sensores.instance.editarSensor);

routerSensor.delete('/sensor', [
    check('id', 'El id del sensor es obligatorio').not().isEmpty(),
    ValidarCampos.instance.validarCampos
], Sensores.instance.eliminarSensor);

routerSensor.delete('/sensorDatos', [
    check('id_Sensor', 'El id del usuario es obligatorio').not().isEmpty(),
    check('topico', 'El topico del sensor es obligatorio').not().isEmpty(),
    ValidarCampos.instance.validarCampos
], Sensores.instance.eliminarDatosSensor);

routerSensor.get('/buscarSensor', [
    check('id', 'El id del sensor es obligatorio').not().isEmpty(),
    ValidarCampos.instance.validarCampos
] ,Sensores.instance.buscarSensor );

export default routerSensor;