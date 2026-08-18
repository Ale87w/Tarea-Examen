import { useState, useEffect } from 'react';
import { FiX, FiBriefcase, FiPhone, FiSliders } from 'react-icons/fi';
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

  const inputClass = "w-full px-3.5 py-2.5 border border-[var(--color-ink-300)]/50 rounded-lg text-[var(--color-ink-950)] focus:ring-2 focus:ring-[var(--color-teal-500)]/40 focus:border-[var(--color-teal-500)] outline-none transition-all duration-150 bg-white";
  const labelClass = "block text-[13px] font-semibold text-[var(--color-ink-700)] mb-1.5";

  return (
    <div>
      {/* Encabezado */}
      <div className="flex items-start justify-between gap-4 px-6 sm:px-7 pt-6 pb-5 border-b border-[var(--color-line)]">
        <div>
          <p className="font-mono text-[11px] tracking-[0.2em] uppercase text-[var(--color-teal-600)] mb-1.5">
            {empresa ? 'Editar registro' : 'Nuevo registro'}
          </p>
          <h3 className="[font-family:var(--font-display)] text-2xl font-semibold text-[var(--color-ink-950)] leading-none">
            {empresa ? 'Editar Empresa' : 'Registrar Empresa'}
          </h3>
        </div>
        <button
          type="button"
          onClick={onClose}
          aria-label="Cerrar"
          className="shrink-0 w-9 h-9 flex items-center justify-center rounded-full text-[var(--color-ink-500)] bg-[var(--color-paper-100)] hover:bg-[var(--color-brick-100)] hover:text-[var(--color-brick-600)] transition-colors duration-150"
        >
          <FiX size={18} />
        </button>
      </div>

      <form onSubmit={handleSubmit}>
        <div className="px-6 sm:px-7 py-6 space-y-6">

          {/* Sección: datos generales */}
          <div>
            <div className="flex items-center gap-2 mb-3">
              <FiBriefcase className="text-[var(--color-teal-600)]" size={15} />
              <h4 className="font-mono text-[11px] uppercase tracking-wider text-[var(--color-ink-500)]">Datos generales</h4>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="sm:col-span-2">
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
            </div>
          </div>

          {/* Sección: contacto */}
          <div>
            <div className="flex items-center gap-2 mb-3">
              <FiPhone className="text-[var(--color-teal-600)]" size={15} />
              <h4 className="font-mono text-[11px] uppercase tracking-wider text-[var(--color-ink-500)]">Contacto</h4>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className={labelClass}>Persona de contacto</label>
                <input name="contacto" value={formData.contacto} onChange={handleChange} className={inputClass} placeholder="Nombre del contacto" />
              </div>
              <div>
                <label className={labelClass}>Teléfono</label>
                <input name="telefono" value={formData.telefono} onChange={handleChange} className={inputClass} placeholder="998 000 0000" />
              </div>
              <div className="sm:col-span-2">
                <label className={labelClass}>Correo Electrónico</label>
                <input name="correo" type="email" value={formData.correo} onChange={handleChange} className={inputClass} placeholder="contacto@empresa.com" />
              </div>
            </div>
          </div>

          {/* Sección: detalles de la vacante */}
          <div>
            <div className="flex items-center gap-2 mb-3">
              <FiSliders className="text-[var(--color-teal-600)]" size={15} />
              <h4 className="font-mono text-[11px] uppercase tracking-wider text-[var(--color-ink-500)]">Detalles de la vacante</h4>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              <div>
                <label className={labelClass}>Vacantes *</label>
                <input name="vacantes" type="number" min={0} value={formData.vacantes} onChange={handleChange} required className={inputClass} />
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
          </div>
        </div>

        {/* Pie / acciones */}
        <div className="flex justify-end gap-3 px-6 sm:px-7 py-5 border-t border-[var(--color-line)] bg-[var(--color-paper-50)] rounded-b-2xl">
          <button
            type="button"
            onClick={onClose}
            className="px-5 py-2.5 bg-white border border-[var(--color-ink-300)]/50 text-[var(--color-ink-700)] rounded-lg hover:bg-[var(--color-paper-100)] transition-all duration-150 font-medium"
          >
            Cancelar
          </button>
          <button
            type="submit"
            className="px-5 py-2.5 bg-[var(--color-teal-600)] text-white rounded-lg hover:bg-[var(--color-teal-700)] transition-all duration-150 font-semibold shadow-sm hover:shadow-md hover:-translate-y-0.5"
          >
            Guardar Cambios
          </button>
        </div>
      </form>
    </div>
  );
}