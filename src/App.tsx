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
  const [cargando, setCargando] = useState(true);

  const cargarEmpresas = async () => {
    setCargando(true);
    try {
      const datos = await obtenerEmpresas();
      setEmpresas(datos);
    } catch (error) {
      console.error("Error al cargar empresas:", error);
    } finally {
      setCargando(false);
    }
  };

  useEffect(() => {
    cargarEmpresas();
  }, []);

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

  const handleFiltroVacantes = async () => {
    const nuevoEstado = !soloConVacantes;
    setSoloConVacantes(nuevoEstado);
    
    try {
      let filtroUrl = '';
      if (nuevoEstado) {
        filtroUrl = '?conVacantes=true';
      }
      const respuesta = await fetch(`http://localhost:3002/api/empresas${filtroUrl}`);
      const datos = await respuesta.json();
      setEmpresas(datos);
    } catch (error) {
      console.error("Error al aplicar filtro:", error);
    }
  };

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

  const handleGuardar = () => {
    setMostrarFormulario(false);
    setEmpresaEditar(null);
    cargarEmpresas();
  };

  const handleEditar = (empresa: Empresa) => {
    setEmpresaEditar(empresa);
    setMostrarFormulario(true);
  };

  return (
    <div className="min-h-screen bg-gray-50 py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        
        {/* Encabezado */}
        <div className="bg-white rounded-lg shadow-md p-6 mb-6 border-l-4 border-blue-600">
          <h1 className="text-3xl font-bold text-gray-800">
            Sistema de Registro de Empresas para Estadías
          </h1>
          <p className="text-gray-500 mt-2">Gestión de vacantes y convenios profesionales</p>
        </div>

        {/* Panel de Control */}
        <div className="bg-white rounded-lg shadow-md p-6 mb-6">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            
            <button 
              onClick={() => { setEmpresaEditar(null); setMostrarFormulario(true); }} 
              className="w-full md:w-auto bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 px-6 rounded-lg transition duration-200 flex items-center justify-center gap-2 shadow-sm"
            >
              <span>+ Nueva Empresa</span>
            </button>

            <div className="flex flex-col md:flex-row gap-3 w-full md:w-auto">
              <div className="relative">
                <input
                  type="text"
                  placeholder="Buscar por nombre..."
                  value={busqueda}
                  onChange={(e) => setBusqueda(e.target.value)}
                  onKeyDown={(e) => e.key === 'Enter' && handleBuscar()}
                  className="w-full md:w-64 pl-4 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition"
                />
              </div>
              <button 
                onClick={handleBuscar} 
                className="bg-gray-800 hover:bg-gray-900 text-white font-semibold py-2 px-6 rounded-lg transition duration-200 shadow-sm"
              >
                Buscar
              </button>
              
              <label className="flex items-center gap-2 cursor-pointer select-none bg-gray-100 hover:bg-gray-200 px-4 py-2 rounded-lg transition">
                <input
                  type="checkbox"
                  checked={soloConVacantes}
                  onChange={handleFiltroVacantes}
                  className="w-4 h-4 text-blue-600 rounded focus:ring-blue-500"
                />
                <span className="text-gray-700 font-medium">Solo con Vacantes</span>
              </label>
            </div>
          </div>
        </div>

        {/* Formulario Modal (Condicional) */}
        {mostrarFormulario && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4 backdrop-blur-sm">
            <div className="bg-white rounded-xl shadow-2xl w-full max-w-2xl max-h-[90vh] overflow-y-auto">
              <div className="p-6">
                <FormEmpresa 
                  empresa={empresaEditar} 
                  onClose={() => { setMostrarFormulario(false); setEmpresaEditar(null); }} 
                  onSave={handleGuardar} 
                />
              </div>
            </div>
          </div>
        )}

        {/* Tabla de Datos */}
        <div className="bg-white rounded-lg shadow-md overflow-hidden">
          {cargando ? (
            <div className="p-8 text-center text-gray-500">Cargando datos...</div>
          ) : empresas.length === 0 ? (
            <div className="p-8 text-center text-gray-500">No se encontraron empresas registradas.</div>
          ) : (
            <TablaEmpresas 
              empresas={empresas} 
              onEditar={handleEditar} 
              onEliminar={handleEliminar} 
            />
          )}
        </div>

      </div>
    </div>
  );
}

export default App;