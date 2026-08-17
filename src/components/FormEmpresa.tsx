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
    nombre: '', 
    sector: '', 
    ciudad: '', 
    contacto: '', 
    correo: '',
    telefono: '', 
    vacantes: 0, 
    modalidad: 'Presencial', 
    estado: 'Disponible'
  });

  useEffect(() => {
    if (empresa) {
      setFormData(empresa);
    }
  }, [empresa]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ 
      ...prev, 
      [name]: name === 'vacantes' ? Number(value) : value 
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    await guardarEmpresa(formData);
    onSave();
  };

  return (
    <form onSubmit={handleSubmit} style={{ display: 'grid', gap: '10px', maxWidth: '500px' }}>
      <h3>{empresa ? 'Editar Empresa' : 'Nueva Empresa'}</h3>
      
      <input name="nombre" placeholder="Nombre" value={formData.nombre} onChange={handleChange} required style={inputStyle} />
      <input name="sector" placeholder="Sector" value={formData.sector} onChange={handleChange} required style={inputStyle} />
      <input name="ciudad" placeholder="Ciudad" value={formData.ciudad} onChange={handleChange} required style={inputStyle} />
      <input name="contacto" placeholder="Contacto" value={formData.contacto} onChange={handleChange} style={inputStyle} />
      <input name="correo" placeholder="Correo" value={formData.correo} onChange={handleChange} style={inputStyle} />
      <input name="telefono" placeholder="Teléfono" value={formData.telefono} onChange={handleChange} style={inputStyle} />
      <input name="vacantes" type="number" placeholder="Vacantes" value={formData.vacantes} onChange={handleChange} required style={inputStyle} />
      
      <select name="modalidad" value={formData.modalidad} onChange={handleChange} style={inputStyle}>
        <option value="Presencial">Presencial</option>
        <option value="Híbrida">Híbrida</option>
        <option value="Remota">Remota</option>
      </select>
      
      <select name="estado" value={formData.estado} onChange={handleChange} style={inputStyle}>
        <option value="Disponible">Disponible</option>
        <option value="Sin vacantes">Sin vacantes</option>
        <option value="Inactiva">Inactiva</option>
      </select>
      
      <div style={{ display: 'flex', gap: '10px', marginTop: '10px' }}>
        <button type="submit" style={btnStyle}>Guardar</button>
        <button type="button" onClick={onClose} style={{...btnStyle, backgroundColor: '#6c757d'}}>Cancelar</button>
      </div>
    </form>
  );
}
const inputStyle = { padding: '8px', borderRadius: '4px', border: '1px solid #ccc' };
const btnStyle = { padding: '8px 16px', backgroundColor: '#007bff', color: 'white', border: 'none', borderRadius: '4px', cursor: 'pointer' };