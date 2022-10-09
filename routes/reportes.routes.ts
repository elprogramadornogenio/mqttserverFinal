import { Router } from 'express';
import { check } from 'express-validator';
import Reportes from '../controller/reportes';
import ValidarCampos from '../middlewares/validarCampos';



const routerReportes = Router();


routerReportes.post('/consultarDatosFecha',[
    check('fecha_ini', 'La fecha inicial es obligatorio').not().isEmpty(),
    check('fecha_final', 'La fecha final es obligatorio').not().isEmpty(),
    ValidarCampos.instance.validarCampos
], Reportes.instance.consultarDatosFecha);

routerReportes.post('/consultarDatoMayor',[

], Reportes.instance.consultarDatoMayor);

routerReportes.post('/consultarDatoMenor',[

], Reportes.instance.consultarDatoMenor);

routerReportes.post('/consultarDatoPromedio',[

], Reportes.instance.consultarDatoPromedio);

routerReportes.post('/consultarDatosFechaId',[
    check('id_Sensor', 'El id del sensor es obligatorio').not().isEmpty(),
    check('fecha_ini', 'La fecha inicial es obligatorio').not().isEmpty(),
    check('fecha_final', 'La fecha final es obligatorio').not().isEmpty(),
    ValidarCampos.instance.validarCampos
], Reportes.instance.consultarDatosFechaId);

routerReportes.post('/consultarDatoMayorId',[
    check('id_Sensor', 'El id del sensor es obligatorio').not().isEmpty(),
    ValidarCampos.instance.validarCampos
], Reportes.instance.consultarDatoMayorId);

routerReportes.post('/consultarDatoMenorId',[
    check('id_Sensor', 'El id del sensor es obligatorio').not().isEmpty(),
    ValidarCampos.instance.validarCampos
], Reportes.instance.consultarDatoMenorId);


routerReportes.post('/consultarDatoPromedioId', [
    check('id_Sensor', 'El id del sensor es obligatorio').not().isEmpty(),
    ValidarCampos.instance.validarCampos
], Reportes.instance.consultarDatoPromedioId);

routerReportes.post('/consultarDatoMayorIds',[

], Reportes.instance.consultarDatoMayorIds);

routerReportes.post('/consultarDatoMenorIds',[

], Reportes.instance.consultarDatoMenorIds);

routerReportes.post('/consultarDatoPromedioIds',[

], Reportes.instance.consultarDatoPromedioIds);

export default routerReportes;