import { useState, useEffect } from 'react';
import FormEmpresa from './components/FormEmpresa';
import TablaEmpresas from './components/TablaEmpresas';
import { obtenerEmpresas, buscarEmpresas, eliminarEmpresa } from './services/empresaService';
import type { Empresa } from './types/Empresa';

function App() {
  const [empresas, setEmpresas] = useState<Empresa[]>([]);
  const [busqueda, setBusqueda] = useState('');
  const [soloConVacantes, setSoloConVacantes] = useState(false);
  const [empresaEditar, setEmpresaEditar] = useState<Empresa | null>(null);
  const [mostrarFormulario, setMostrarFormulario] = useState(false);

  // Cargar todas las empresas al iniciar
  const cargarEmpresas = async () => {
    try {
      const datos = await obtenerEmpresas();
      setEmpresas(datos);
    } catch (error) {
      console.error("Error al cargar empresas:", error);
    }
  };

  useEffect(() => {
    cargarEmpresas();
  }, []);

  // Manejar búsqueda en el backend
  const handleBuscar = async () => {
    if (busqueda.trim() === '') {
      cargarEmpresas();
      return;
    }
    try {
      const resultados = await buscarEmpresas(busqueda);
      setEmpresas(resultados);
    } catch (error) {
      console.error("Error al buscar:", error);
    }
  };

  // Manejar filtro de vacantes en el backend (Reto 1)
  const handleFiltroVacantes = async () => {
    const nuevoEstado = !soloConVacantes;
    setSoloConVacantes(nuevoEstado);
    
    try {
      let filtroUrl = '';
      if (nuevoEstado) {
        filtroUrl = '?conVacantes=true'; // Pasar parámetro al backend
      }
      const respuesta = await fetch(`http://localhost:3002/api/empresas${filtroUrl}`);
      const datos = await respuesta.json();
      setEmpresas(datos);
    } catch (error) {
      console.error("Error al aplicar filtro:", error);
    }
  };

  // Eliminar empresa
  const handleEliminar = async (id: string) => {
    if (confirm('¿Estás seguro de eliminar esta empresa?')) {
      try {
        await eliminarEmpresa(id);
        cargarEmpresas();
      } catch (error) {
        console.error("Error al eliminar:", error);
      }
    }
  };

  // Guardar (desde el formulario)
  const handleGuardar = () => {
    setMostrarFormulario(false);
    setEmpresaEditar(null);
    cargarEmpresas();
  };

  // Abrir formulario para editar
  const handleEditar = (empresa: Empresa) => {
    setEmpresaEditar(empresa);
    setMostrarFormulario(true);
  };

  return (
    <div style={{ padding: '20px', fontFamily: 'Arial, sans-serif' }}>
      <h1 style={{ marginBottom: '20px' }}>Sistema de Registro de Empresas para Estadías</h1>

      {/* Controles Superiores */}
      <div style={{ marginBottom: '20px', display: 'flex', gap: '10px', alignItems: 'center', flexWrap: 'wrap' }}>
        <button onClick={() => { setEmpresaEditar(null); setMostrarFormulario(true); }} style={btnStyle}>
          + Nueva Empresa
        </button>

        <input
          type="text"
          placeholder="Buscar por nombre..."
          value={busqueda}
          onChange={(e) => setBusqueda(e.target.value)}
          onKeyDown={(e) => e.key === 'Enter' && handleBuscar()}
          style={inputStyle}
        />
        <button onClick={handleBuscar} style={btnStyle}>Buscar</button>

        <label style={{ display: 'flex', alignItems: 'center', gap: '5px', cursor: 'pointer' }}>
          <input
            type="checkbox"
            checked={soloConVacantes}
            onChange={handleFiltroVacantes}
          />
          Solo con Vacantes
        </label>
      </div>

      {/* Formulario Modal o Inline */}
      {mostrarFormulario && (
        <div style={{ marginBottom: '20px', padding: '15px', border: '1px solid #ccc', borderRadius: '8px', backgroundColor: '#f9f9f9' }}>
          <FormEmpresa 
            empresa={empresaEditar} 
            onClose={() => { setMostrarFormulario(false); setEmpresaEditar(null); }} 
            onSave={handleGuardar} 
          />
        </div>
      )}

      {/* Tabla */}
      <TablaEmpresas 
        empresas={empresas} 
        onEditar={handleEditar} 
        onEliminar={handleEliminar} 
      />
    </div>
  );
}

// Estilos básicos en JS
const btnStyle = {
  padding: '8px 16px',
  backgroundColor: '#007bff',
  color: 'white',
  border: 'none',
  borderRadius: '4px',
  cursor: 'pointer'
};

const inputStyle = {
  padding: '8px',
  borderRadius: '4px',
  border: '1px solid #ccc',
  minWidth: '200px'
};

export default App;