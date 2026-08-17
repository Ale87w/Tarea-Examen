import type { Empresa } from '../types/Empresa';

interface Props {
  empresas: Empresa[];
  onEditar: (e: Empresa) => void;
  onEliminar: (id: string) => void;
}

export default function TablaEmpresas({ empresas, onEditar, onEliminar }: Props) {
  const getEstadoColor = (estado: string) => {
    switch (estado) {
      case 'Disponible': return 'bg-green-100 text-green-800 border-green-200';
      case 'Sin vacantes': return 'bg-yellow-100 text-yellow-800 border-yellow-200';
      case 'Inactiva': return 'bg-red-100 text-red-800 border-red-200';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getModalidadIcon = (modalidad: string) => {
    if (modalidad === 'Remota') return '🌐';
    if (modalidad === 'Híbrida') return '🔄';
    return '🏢';
  };

  return (
    <div className="overflow-x-auto">
      <table className="w-full text-left border-collapse">
        <thead>
          <tr className="bg-gray-800 text-white text-sm uppercase tracking-wider">
            <th className="p-4 font-semibold">Empresa</th>
            <th className="p-4 font-semibold">Sector</th>
            <th className="p-4 font-semibold">Ciudad</th>
            <th className="p-4 font-semibold text-center">Vacantes</th>
            <th className="p-4 font-semibold">Modalidad</th>
            <th className="p-4 font-semibold">Estado</th>
            <th className="p-4 font-semibold text-center">Acciones</th>
          </tr>
        </thead>
        <tbody className="divide-y divide-gray-200">
          {empresas.map((e) => (
            <tr key={e._id} className="hover:bg-gray-50 transition duration-150">
              <td className="p-4 font-medium text-gray-900">{e.nombre}</td>
              <td className="p-4 text-gray-600">{e.sector}</td>
              <td className="p-4 text-gray-600">{e.ciudad}</td>
              <td className="p-4 text-center">
                <span className={`font-bold ${e.vacantes === 0 ? 'text-red-600' : 'text-gray-700'}`}>
                  {e.vacantes}
                </span>
              </td>
              <td className="p-4 text-gray-600 flex items-center gap-2">
                <span>{getModalidadIcon(e.modalidad)}</span> {e.modalidad}
              </td>
              <td className="p-4">
                <span className={`px-3 py-1 rounded-full text-xs font-semibold border ${getEstadoColor(e.estado)}`}>
                  {e.estado}
                </span>
              </td>
              <td className="p-4 text-center">
                <div className="flex justify-center gap-2">
                  <button 
                    onClick={() => onEditar(e)} 
                    className="bg-blue-500 hover:bg-blue-600 text-white text-xs font-medium py-1.5 px-3 rounded transition shadow-sm"
                  >
                    Editar
                  </button>
                  <button 
                    onClick={() => onEliminar(e._id!)} 
                    className="bg-red-500 hover:bg-red-600 text-white text-xs font-medium py-1.5 px-3 rounded transition shadow-sm"
                  >
                    Eliminar
                  </button>
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
} 