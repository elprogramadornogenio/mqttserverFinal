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
    },
    imagen: {
        type: String
    }
})


export const Usuario = model<IUsuario>('Usuario', UsuarioSchema);