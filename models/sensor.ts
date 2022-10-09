import { Schema, model } from 'mongoose';
import { ISensor } from '../interfaces/sensor';


const SensorSchema = new Schema<ISensor>({
    id_Usuario: {
        type: String,
        required: true
    },
    nombre: {
        type: String,
        required: true,
        unique: true
    },
    tipo: {
        type: String,
        required: true
    },
    topico: {
        type: String,
        required: true,
        unique: true
    }
});


export const Sensor = model<ISensor>('Sensor', SensorSchema);
