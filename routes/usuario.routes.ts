import { Router } from 'express';
import { check } from 'express-validator';
import Usuarios from '../controller/usuario';
import ValidarJwt from '../middlewares/validarJwt';
import ValidarCampos from '../middlewares/validarCampos';

const routerUsuario = Router();

routerUsuario.post('/registrar', [
    check('nombre', 'El nombre es obligatorio').not().isEmpty(),
    check('apellido', 'El apellido es obligatorio').not().isEmpty(),
    check('email', 'El email es obligatorio').isEmail(),
    check('password', 'La contraseña es obligatoria').isLength({min:6}),
    ValidarCampos.instance.validarCampos
] , Usuarios.instance.crearUsuario );

routerUsuario.post('/login', [
    check('email', 'El email es obligatorio').isEmail(),
    check('password', 'La contraseña es obligatoria').isLength({min:6}),
    ValidarCampos.instance.validarCampos
] , Usuarios.instance.loginUsuario);

routerUsuario.get('/jwt', ValidarJwt.instance.validarJWT, Usuarios.instance.revalidarToken);

export default routerUsuario;