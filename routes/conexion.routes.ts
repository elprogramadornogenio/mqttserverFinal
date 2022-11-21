import { Router } from 'express';
import { check } from 'express-validator';
import Conexion from '../controller/conexion';
import ValidarCampos from '../middlewares/validarCampos';



const routerConexion = Router();


routerConexion.post('/conexion', [
    check('topico', 'El topico del sensor es obligatorio').not().isEmpty(),
    ValidarCampos.instance.validarCampos
] ,Conexion.instance.probarConexion);


export default routerConexion;