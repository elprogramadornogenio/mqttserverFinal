import { Schema, model } from 'mongoose';
import { IUsuario } from '../interfaces/usuario';

const UsuarioSchema = new Schema<IUsuario>({
    nombre: {
        type: String,
        required: true
    },
    apellido: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    }
})


export const Usuario = model<IUsuario>('Usuario', UsuarioSchema);