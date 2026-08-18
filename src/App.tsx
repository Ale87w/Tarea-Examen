import { useState, useEffect } from 'react';
import { FiPlus, FiSearch, FiFilter, FiUsers, FiCheckCircle, FiAlertCircle, FiXCircle } from 'react-icons/fi';
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

  const total = empresas.length;
  const disponibles = empresas.filter((e) => e.estado === 'Disponible').length;
  const sinVacantes = empresas.filter((e) => e.estado === 'Sin vacantes').length;
  const inactivas = empresas.filter((e) => e.estado === 'Inactiva').length;

  return (
    <div className="min-h-screen py-10 px-4 sm:px-6 lg:px-10">
    
      <div className="max-w-7xl mx-auto">

        {/* Encabezado */}
        <div className="relative rounded-2xl shadow-pop p-8 sm:p-10 mb-6 overflow-hidden bg-[var(--color-ink-950)]">
          <div
            className="absolute inset-0 opacity-90"
            style={{
  background: 'linear-gradient(135deg, #387b95 0%, #328679 50%, #3aa8ed 130%)'
}}
          />
          <div className="absolute -top-16 -right-10 w-64 h-64 rounded-full bg-[var(--color-teal-500)]/20 blur-2xl pointer-events-none" />
          <div className="absolute -bottom-20 left-1/3 w-72 h-72 rounded-full bg-[var(--color-amber-500)]/10 blur-3xl pointer-events-none" />

          <p className="relative font-mono text-xs tracking-[0.25em] uppercase text-[var(--color-teal-100)]/80 mb-3">
            Registro · Estadías Profesionales
          </p>
          <h1 className="relative [font-family:var(--font-display)] text-3xl sm:text-4xl font-semibold text-white leading-tight">
            Directorio de Empresas
          </h1>
          <p className="relative text-[var(--color-ink-300)] mt-2 max-w-xl">
            Gestión de vacantes y convenios con empresas para estadías profesionales.
          </p>
        </div>

        {/* Franja de indicadores */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mb-6">
          {[
            { label: 'Registradas', valor: total, color: 'var(--color-ink-950)', bg: 'var(--color-paper-50)', icon: FiUsers },
            { label: 'Disponibles', valor: disponibles, color: 'var(--color-teal-600)', bg: 'var(--color-teal-50)', icon: FiCheckCircle },
            { label: 'Sin vacantes', valor: sinVacantes, color: 'var(--color-amber-600)', bg: 'var(--color-amber-100)', icon: FiAlertCircle },
            { label: 'Inactivas', valor: inactivas, color: 'var(--color-brick-600)', bg: 'var(--color-brick-100)', icon: FiXCircle },
          ].map((stat) => (
            <div
              key={stat.label}
              className="group bg-white rounded-xl shadow-card hover:shadow-card-hover transition-all duration-300 hover:-translate-y-0.5 px-5 py-4 flex items-center gap-4"
            >
              <div
                className="shrink-0 w-11 h-11 rounded-lg flex items-center justify-center transition-transform duration-300 group-hover:scale-105"
                style={{ backgroundColor: stat.bg, color: stat.color }}
              >
                <stat.icon size={20} />
              </div>
              <div>
                <p className="[font-family:var(--font-display)] text-2xl font-semibold leading-none" style={{ color: stat.color }}>
                  {stat.valor}
                </p>
                <p className="font-mono text-[11px] uppercase tracking-wider text-[var(--color-ink-500)] mt-1.5">
                  {stat.label}
                </p>
              </div>
            </div>
          ))}
        </div>

        {/* Panel de Control */}
        <div className="bg-white rounded-xl shadow-card p-6 mb-6">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">

            <button
              onClick={() => { setEmpresaEditar(null); setMostrarFormulario(true); }}
              className="w-full md:w-auto bg-[var(--color-teal-600)] hover:bg-[var(--color-teal-700)] text-white font-semibold py-2.5 px-6 rounded-lg transition-all duration-200 flex items-center justify-center gap-2 shadow-sm hover:shadow-md hover:-translate-y-0.5"
            >
              <FiPlus size={18} />
              <span>Nueva Empresa</span>
            </button>

            <div className="flex flex-col md:flex-row gap-3 w-full md:w-auto">
              <div className="relative">
                <FiSearch className="absolute left-3.5 top-1/2 -translate-y-1/2 text-[var(--color-ink-300)]" size={17} />
                <input
                  type="text"
                  placeholder="Buscar por nombre..."
                  value={busqueda}
                  onChange={(e) => setBusqueda(e.target.value)}
                  onKeyDown={(e) => e.key === 'Enter' && handleBuscar()}
                  className="w-full md:w-64 pl-10 pr-4 py-2 border border-[var(--color-line)] rounded-lg focus:ring-2 focus:ring-[var(--color-teal-500)] focus:border-[var(--color-teal-500)] outline-none transition bg-[var(--color-paper-50)]"
                />
              </div>
              <button
                onClick={handleBuscar}
                className="bg-[var(--color-ink-950)] hover:bg-[var(--color-ink-900)] text-white font-semibold py-2 px-6 rounded-lg transition-all duration-200 shadow-sm hover:shadow-md hover:-translate-y-0.5"
              >
                Buscar
              </button>

              <label className="flex items-center gap-2 cursor-pointer select-none bg-[var(--color-paper-50)] hover:bg-[var(--color-teal-50)] border border-[var(--color-line)] px-4 py-2 rounded-lg transition">
                <FiFilter className="text-[var(--color-ink-500)]" size={15} />
                <input
                  type="checkbox"
                  checked={soloConVacantes}
                  onChange={handleFiltroVacantes}
                  className="w-4 h-4 accent-[var(--color-teal-600)] rounded focus:ring-[var(--color-teal-500)]"
                />
                <span className="text-[var(--color-ink-700)] font-medium">Solo con Vacantes</span>
              </label>
            </div>
          </div>
        </div>

        {/* Formulario Modal (Condicional) */}
        {mostrarFormulario && (
          <div className="fixed inset-0 bg-[var(--color-ink-950)]/60 flex items-center justify-center z-50 p-4 backdrop-blur-sm">
            <div className="bg-white rounded-2xl shadow-pop w-full max-w-2xl max-h-[90vh] overflow-y-auto">
              <FormEmpresa 
                empresa={empresaEditar} 
                onClose={() => { setMostrarFormulario(false); setEmpresaEditar(null); }} 
                onSave={handleGuardar} 
              />
            </div>
          </div>
        )}

        {/* Tabla de Datos */}
        <div className="bg-white rounded-xl shadow-card overflow-hidden">
          {cargando ? (
            <div className="p-10 text-center text-[var(--color-ink-500)] font-mono text-sm">Cargando datos...</div>
          ) : empresas.length === 0 ? (
            <div className="p-10 text-center text-[var(--color-ink-500)] font-mono text-sm">No se encontraron empresas registradas.</div>
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