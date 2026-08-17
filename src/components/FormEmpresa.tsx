import { useState, useEffect } from 'react';
import { guardarEmpresa } from '../services/empresaService';
import type { Empresa } from '../types/Empresa';

interface FormProps {
  empresa: Empresa | null;
  onClose: () => void;
  onSave: () => void;
}

export default function FormEmpresa({ empresa, onClose, onSave }: FormProps) {
  const [formData, setFormData] = useState<Empresa>({
    nombre: '', sector: '', ciudad: '', contacto: '', correo: '',
    telefono: '', vacantes: 0, modalidad: 'Presencial', estado: 'Disponible'
  });

  useEffect(() => {
    if (empresa) setFormData(empresa);
  }, [empresa]);

  const handleChange = (e: any) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: name === 'vacantes' ? Number(value) : value }));
  };

  const handleSubmit = async (e: any) => {
    e.preventDefault();
    await guardarEmpresa(formData);
    onSave();
  };

  const inputClass = "w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition";
  const labelClass = "block text-sm font-medium text-gray-700 mb-1";

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div className="flex justify-between items-center border-b pb-2">
        <h3 className="text-xl font-bold text-gray-800">
          {empresa ? 'Editar Empresa' : 'Registrar Nueva Empresa'}
        </h3>
        <button type="button" onClick={onClose} className="text-gray-400 hover:text-gray-600 text-2xl">&times;</button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <label className={labelClass}>Nombre de la Empresa *</label>
          <input name="nombre" value={formData.nombre} onChange={handleChange} required className={inputClass} placeholder="Ej. Data Maya" />
        </div>
        <div>
          <label className={labelClass}>Sector *</label>
          <input name="sector" value={formData.sector} onChange={handleChange} required className={inputClass} placeholder="Ej. Tecnologías" />
        </div>
        <div>
          <label className={labelClass}>Ciudad *</label>
          <input name="ciudad" value={formData.ciudad} onChange={handleChange} required className={inputClass} placeholder="Ej. Cancún" />
        </div>
        <div>
          <label className={labelClass}>Vacantes *</label>
          <input name="vacantes" type="number" value={formData.vacantes} onChange={handleChange} required className={inputClass} />
        </div>
        <div>
          <label className={labelClass}>Contacto</label>
          <input name="contacto" value={formData.contacto} onChange={handleChange} className={inputClass} />
        </div>
        <div>
          <label className={labelClass}>Teléfono</label>
          <input name="telefono" value={formData.telefono} onChange={handleChange} className={inputClass} />
        </div>
        <div className="md:col-span-2">
          <label className={labelClass}>Correo Electrónico</label>
          <input name="correo" type="email" value={formData.correo} onChange={handleChange} className={inputClass} />
        </div>
        <div>
          <label className={labelClass}>Modalidad</label>
          <select name="modalidad" value={formData.modalidad} onChange={handleChange} className={inputClass}>
            <option value="Presencial">Presencial</option>
            <option value="Híbrida">Híbrida</option>
            <option value="Remota">Remota</option>
          </select>
        </div>
        <div>
          <label className={labelClass}>Estado</label>
          <select name="estado" value={formData.estado} onChange={handleChange} className={inputClass}>
            <option value="Disponible">Disponible</option>
            <option value="Sin vacantes">Sin vacantes</option>
            <option value="Inactiva">Inactiva</option>
          </select>
        </div>
      </div>
      
      <div className="flex justify-end gap-3 mt-6 pt-4 border-t">
        <button type="button" onClick={onClose} className="px-6 py-2 bg-gray-200 text-gray-700 rounded-lg hover:bg-gray-300 transition font-medium">Cancelar</button>
        <button type="submit" className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition font-medium shadow-md">Guardar Cambios</button>
      </div>
    </form>
  );
}