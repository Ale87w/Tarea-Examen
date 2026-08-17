import type { Empresa } from '../types/Empresa';

interface Props {
  empresas: Empresa[];
  onEditar: (e: Empresa) => void;
  onEliminar: (id: string) => void;
}

export default function TablaEmpresas({ empresas, onEditar, onEliminar }: Props) {
  if (empresas.length === 0) {
    return <p style={{ marginTop: '20px' }}>No se encontraron empresas.</p>;
  }
  if (!Array.isArray(empresas)) {
  return <p>Cargando empresas o error en la conexión...</p>;
}


  return (
    <table style={{ width: '100%', borderCollapse: 'collapse', marginTop: '20px' }}>
      <thead>
        <tr style={{ backgroundColor: '#f0f0f0', textAlign: 'left' }}>
          <th style={thStyle}>Empresa</th>
          <th style={thStyle}>Sector</th>
          <th style={thStyle}>Ciudad</th>
          <th style={thStyle}>Vacantes</th>
          <th style={thStyle}>Modalidad</th>
          <th style={thStyle}>Estado</th>
          <th style={thStyle}>Acciones</th>
        </tr>
      </thead>
      <tbody>
        {empresas.map((e) => (
          <tr key={e._id} style={{ borderBottom: '1px solid #ddd' }}>
            <td style={tdStyle}>{e.nombre}</td>
            <td style={tdStyle}>{e.sector}</td>
            <td style={tdStyle}>{e.ciudad}</td>
            <td style={tdStyle}>{e.vacantes}</td>
            <td style={tdStyle}>{e.modalidad}</td>
            <td style={tdStyle}>
              <span style={{ 
                color: e.estado === 'Disponible' ? 'green' : e.estado === 'Inactiva' ? 'red' : 'orange',
                fontWeight: 'bold'
              }}>{e.estado}</span>
            </td>
            <td style={tdStyle}>
              <button onClick={() => onEditar(e)} style={btnSmallStyle}>Editar</button>
              <button 
                onClick={() => onEliminar(e._id!)} 
                style={{...btnSmallStyle, backgroundColor: '#dc3545', marginLeft: '5px'}}
              >
                Eliminar
              </button>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}

const thStyle = { padding: '10px', borderBottom: '2px solid #ccc' };
const tdStyle = { padding: '10px' };
const btnSmallStyle = { 
  padding: '4px 8px', 
  backgroundColor: '#007bff', 
  color: 'white', 
  border: 'none', 
  borderRadius: '4px', 
  cursor: 'pointer', 
  fontSize: '12px' 
};