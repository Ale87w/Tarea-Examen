import { Schema, model } from "mongoose";
import type { IEmpresa } from "../types/Empresa.js";

const EmpresaSchema = new Schema<IEmpresa>({
  nombre: { type: String, required: true },
  sector: { type: String, required: true },
  ciudad: { type: String, required: true },
  contacto: String,
  correo: String,
  telefono: String,
  vacantes: { type: Number, default: 0 },
  modalidad: { type: String, enum: ["Presencial", "Híbrida", "Remota"], default: "Presencial" },
  estado: { type: String, enum: ["Disponible", "Sin vacantes", "Inactiva"], default: "Disponible" }
}, {
  collection: "empresas",
  timestamps: true
});

export const Empresa = model<IEmpresa>("Empresa", EmpresaSchema);