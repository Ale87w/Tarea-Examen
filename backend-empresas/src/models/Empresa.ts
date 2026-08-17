import { Schema, model } from "mongoose";

const EmpresaSchema = new Schema({
  nombre: { type: String, required: true },
  sector: { type: String, required: true },
  ciudad: { type: String, required: true },
  contacto: { type: String, required: true },
  correo: { type: String, required: true },
  telefono: { type: String, required: true },
  vacantes: { type: Number, required: true, default: 0 },
  modalidad: { 
    type: String, 
    enum: ["Presencial", "Híbrida", "Remota"], 
    required: true 
  },
  estado: { 
    type: String, 
    enum: ["Disponible", "Sin vacantes", "Inactiva"], 
    required: true 
  }
});

export default model("Empresa", EmpresaSchema);