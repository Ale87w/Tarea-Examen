import { useState, useEffect } from "react";
import { registrarEmpresa, actualizarEmpresa } from "../services/empresaService";
import type { Empresa } from "../types/Empresa";

interface FormEmpresaProps {
  empresaEditar?: Empresa | null;
  onGuardar: () => void;
  onCancelado: () => void;
}

const FormEmpresa = ({ empresaEditar, onGuardar, onCancelado }: FormEmpresaProps) => {
  const [formData, setFormData] = useState<Omit<Empresa, "_id">>({
    nombre: "",
    sector: "",
    ciudad: "",
    contacto: "",
    correo: "",
    telefono: "",
    vacantes: 0,
    modalidad: "Presencial",
    estado: "Disponible"
  });

  useEffect(() => {
    if (empresaEditar) {
      const { _id, ...rest } = empresaEditar;
      setFormData(rest);
    } else {
      setFormData({
        nombre: "", sector: "", ciudad: "", contacto: "", correo: "", telefono: "",
        vacantes: 0, modalidad: "Presencial", estado: "Disponible"
      });
    }
  }, [empresaEditar]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: name === "vacantes" ? Number(value) : value
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (empresaEditar?._id) {
      await actualizarEmpresa(empresaEditar._id, formData);
    } else {
      await registrarEmpresa(formData);
    }
    onGuardar();
  };

  return (
    <form onSubmit={handleSubmit} className="bg-gray-100 p-4 rounded mb-6 grid grid-cols-2 gap-4 items-end">
      <div>
        <label className="block text-sm font-bold">Nombre</label>
        <input name="nombre" value={formData.nombre} onChange={handleChange} required className="w-full border p-2 rounded" />
      </div>
      <div>
        <label className="block text-sm font-bold">Sector</label>
        <input name="sector" value={formData.sector} onChange={handleChange} required className="w-full border p-2 rounded" />
      </div>
      <div>
        <label className="block text-sm font-bold">Ciudad</label>
        <input name="ciudad" value={formData.ciudad} onChange={handleChange} required className="w-full border p-2 rounded" />
      </div>
      <div>
        <label className="block text-sm font-bold">Vacantes</label>
        <input name="vacantes" type="number" value={formData.vacantes} onChange={handleChange} required className="w-full border p-2 rounded" />
      </div>
      <div>
        <label className="block text-sm font-bold">Modalidad</label>
        <select name="modalidad" value={formData.modalidad} onChange={handleChange} className="w-full border p-2 rounded">
          <option>Presencial</option>
          <option>Híbrida</option>
          <option>Remota</option>
        </select>
      </div>
      <div>
        <label className="block text-sm font-bold">Estado</label>
        <select name="estado" value={formData.estado} onChange={handleChange} className="w-full border p-2 rounded">
          <option>Disponible</option>
          <option>Sin vacantes</option>
          <option>Inactiva</option>
        </select>
      </div>
      <div>
        <label className="block text-sm font-bold">Contacto</label>
        <input name="contacto" value={formData.contacto} onChange={handleChange} className="w-full border p-2 rounded" />
      </div>
      <div>
        <label className="block text-sm font-bold">Correo</label>
        <input name="correo" type="email" value={formData.correo} onChange={handleChange} className="w-full border p-2 rounded" />
      </div>
      <div className="col-span-2 flex gap-2">
        <button type="submit" className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700">
          {empresaEditar ? "Actualizar" : "Registrar"}
        </button>
        <button type="button" onClick={onCancelado} className="bg-gray-500 text-white px-4 py-2 rounded hover:bg-gray-600">
          Cancelar
        </button>
      </div>
    </form>
  );
};

export default FormEmpresa;