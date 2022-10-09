import { Schema, model } from 'mongoose';
import { IDato } from '../interfaces/datos';


const DatoSchema = new Schema<IDato>({
    id_Sensor: {
        type: String,
        required: true
    },
    dato: {
        type: Number,
        required: true
    },
    fecha: {
        type: Date,
        required: true
    }
});


export const Dato = model<IDato>('Dato', DatoSchema);