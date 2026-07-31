import mongoose, { Schema, Document } from 'mongoose';

export interface ITour extends Document {
  nombre: string;
  destino: string;
  precio: number;
  duracion: string;
  cupos: number;
}

const TourSchema: Schema = new Schema({
  nombre: { type: String, required: true },
  destino: { type: String, required: true },
  precio: { type: Number, required: true },
  duracion: { type: String, required: true },
  cupos: { type: Number, required: true }
});

export default mongoose.model<ITour>('Tour', TourSchema);